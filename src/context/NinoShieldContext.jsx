import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_LOCATIONS, INITIAL_COMMUNITY_SIGNALS, calculateRiskScore } from '../data/climateData';
import { translations } from '../data/translations';

const NinoShieldContext = createContext();

export function NinoShieldProvider({ children }) {
  // 1. LANGUAGE STATE & PERSISTENCE
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('ninoshield_lang') || 'en';
  });

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'ta' : 'en';
    setLang(nextLang);
    localStorage.setItem('ninoshield_lang', nextLang);
  };

  const t = translations[lang] || translations.en;

  // 2. LOCATIONS STATE
  const [locations, setLocations] = useState(SAMPLE_LOCATIONS);
  const [selectedLocationId, setSelectedLocationId] = useState('madurai');

  const selectedLocation = locations.find(l => l.id === selectedLocationId) || locations[0];

  const changeLocation = (locId) => {
    setSelectedLocationId(locId);
    localStorage.setItem('ninoshield_location_id', locId);
  };

  // 2B. FARMER MODE & CROP STATE & GEOLOCATION
  const [isFarmerMode, setIsFarmerMode] = useState(() => {
    const saved = localStorage.getItem('ninoshield_farmer_mode');
    return saved !== null ? saved === 'true' : true; // Default ON for farmer mode
  });

  const toggleFarmerMode = (overrideVal) => {
    setIsFarmerMode(prev => {
      const nextVal = typeof overrideVal === 'boolean' ? overrideVal : !prev;
      localStorage.setItem('ninoshield_farmer_mode', String(nextVal));
      return nextVal;
    });
  };

  const [selectedCrop, setSelectedCropState] = useState(() => {
    return localStorage.getItem('ninoshield_farmer_crop') || 'Paddy (Rice)';
  });

  const changeCrop = (newCrop) => {
    setSelectedCropState(newCrop);
    localStorage.setItem('ninoshield_farmer_crop', newCrop);
  };

  const supportedCrops = [
    'Paddy (Rice)',
    'Sugarcane',
    'Banana',
    'Cotton',
    'Groundnut',
    'Vegetables',
    'Other'
  ];

  // Browser Geolocation State
  const [userGeoStatus, setUserGeoStatus] = useState({
    active: true,
    locationText: 'Madurai, Tamil Nadu',
    isDetecting: false,
    error: null
  });

  const requestBrowserLocation = () => {
    if (!navigator.geolocation) {
      setUserGeoStatus(prev => ({ ...prev, error: 'Geolocation not supported by browser' }));
      return;
    }

    setUserGeoStatus(prev => ({ ...prev, isDetecting: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Match with closest sample location or set geocoded text
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then(res => res.json())
          .then(data => {
            const city = data.address?.city || data.address?.town || data.address?.county || 'Madurai';
            const state = data.address?.state || 'Tamil Nadu';
            const locationText = `${city}, ${state}`;
            
            setUserGeoStatus({
              active: true,
              locationText,
              isDetecting: false,
              error: null
            });

            // Find closest location by name if matching
            const matchLoc = locations.find(l => l.name.toLowerCase() === city.toLowerCase() || l.district.toLowerCase() === city.toLowerCase());
            if (matchLoc) {
              setSelectedLocationId(matchLoc.id);
            }
          })
          .catch(() => {
            setUserGeoStatus({
              active: true,
              locationText: `${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E`,
              isDetecting: false,
              error: null
            });
          });
      },
      (err) => {
        setUserGeoStatus(prev => ({
          ...prev,
          isDetecting: false,
          error: err.message || 'Permission denied'
        }));
      },
      { timeout: 8000 }
    );
  };

  // Load saved location on init
  useEffect(() => {
    const savedLoc = localStorage.getItem('ninoshield_location_id');
    if (savedLoc && locations.some(l => l.id === savedLoc)) {
      setSelectedLocationId(savedLoc);
    }
  }, []);

  // 2C. COMMUNITY PORTAL AUTHENTICATION STATE & LOGOUT
  const [communityAuth, setCommunityAuth] = useState(() => {
    const saved = localStorage.getItem('ninoshield_community_auth');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [communityLocationConfirmed, setCommunityLocationConfirmed] = useState(() => {
    return localStorage.getItem('ninoshield_community_location_confirmed') === 'true';
  });

  const loginCommunity = (emailOrPhone, password, rememberMe = true) => {
    const user = {
      name: emailOrPhone.toLowerCase().includes('demo') ? 'Demo Community Member' : 'Pughal',
      email: emailOrPhone,
      community: `${selectedLocation.name} Community`,
      role: 'Community Representative',
      avatar: null
    };

    const authData = { user, authenticated: true, loginTime: new Date().toISOString() };
    setCommunityAuth(authData);

    if (rememberMe) {
      localStorage.setItem('ninoshield_community_auth', JSON.stringify(authData));
    }
    return { success: true, user };
  };

  const registerCommunity = ({ fullName, email, password, community }) => {
    const user = {
      name: fullName || 'Community Member',
      email: email || 'community.member@ninoshield.ai',
      community: community || `${selectedLocation.name} Community`,
      role: 'Community Representative'
    };

    const authData = { user, authenticated: true, loginTime: new Date().toISOString() };
    setCommunityAuth(authData);
    localStorage.setItem('ninoshield_community_auth', JSON.stringify(authData));
    return { success: true, user };
  };

  const logoutCommunity = () => {
    setCommunityAuth(null);
    localStorage.removeItem('ninoshield_community_auth');
    navigate('/community/login');
  };

  const confirmCommunityLocation = (locationId) => {
    if (locationId) changeLocation(locationId);
    setCommunityLocationConfirmed(true);
    localStorage.setItem('ninoshield_community_location_confirmed', 'true');
  };

  // 2D. DECISION-MAKER PORTAL AUTHENTICATION STATE & LOGOUT
  const [decisionMakerAuth, setDecisionMakerAuth] = useState(() => {
    const saved = localStorage.getItem('ninoshield_decision_maker_auth');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [decisionMakerRegionConfirmed, setDecisionMakerRegionConfirmed] = useState(() => {
    return localStorage.getItem('ninoshield_decision_maker_region_confirmed') === 'true';
  });

  const loginDecisionMaker = (emailOrPhone, password, rememberMe = true) => {
    const user = {
      name: emailOrPhone.toLowerCase().includes('demo') ? 'District Collector / Administrator' : 'Pughal (Admin)',
      email: emailOrPhone,
      dept: 'Madurai District Administration',
      role: 'Decision-Maker / Administrator',
      avatar: null
    };

    const authData = { user, authenticated: true, loginTime: new Date().toISOString() };
    setDecisionMakerAuth(authData);

    if (rememberMe) {
      localStorage.setItem('ninoshield_decision_maker_auth', JSON.stringify(authData));
    }
    return { success: true, user };
  };

  const registerDecisionMaker = ({ fullName, email, org, role, password }) => {
    const user = {
      name: fullName || 'District Official',
      email: email || 'demo.admin@ninoshield.ai',
      dept: org || 'Madurai District Administration',
      role: role || 'Decision-Maker'
    };

    const authData = { user, authenticated: true, loginTime: new Date().toISOString() };
    setDecisionMakerAuth(authData);
    localStorage.setItem('ninoshield_decision_maker_auth', JSON.stringify(authData));
    return { success: true, user };
  };

  const logoutDecisionMaker = () => {
    setDecisionMakerAuth(null);
    localStorage.removeItem('ninoshield_decision_maker_auth');
    navigate('/decision-maker/login');
  };

  const confirmDecisionMakerRegion = (locationId) => {
    if (locationId) changeLocation(locationId);
    setDecisionMakerRegionConfirmed(true);
    localStorage.setItem('ninoshield_decision_maker_region_confirmed', 'true');
  };

  // 3. ROUTING & BROWSER URL SYNC
  const getPathFromHash = () => {
    const hash = window.location.hash.replace('#', '');
    return hash || '/';
  };

  const [currentRoute, setCurrentRoute] = useState(getPathFromHash);

  const navigate = (path) => {
    window.location.hash = path;
    setCurrentRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(getPathFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 4. PEOPLE PREPAREDNESS CHECKLIST
  const initialPeopleChecklist = {
    water: true,
    medicines: true,
    powerbank: true,
    contacts: false,
    info: false,
  };

  const [peopleChecklist, setPeopleChecklist] = useState(() => {
    const saved = localStorage.getItem('ninoshield_people_checklist');
    return saved ? JSON.parse(saved) : initialPeopleChecklist;
  });

  const togglePeopleChecklist = (key) => {
    setPeopleChecklist(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem('ninoshield_people_checklist', JSON.stringify(updated));
      return updated;
    });
  };

  const preparedCount = Object.values(peopleChecklist).filter(Boolean).length;
  const totalPreparedCount = Object.keys(peopleChecklist).length;

  // 5. SHARED COMMUNITY REPORTS & SIGNALS STATE
  const [userReports, setUserReports] = useState(() => {
    const saved = localStorage.getItem('ninoshield_user_reports');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_SIGNALS;
  });

  const addReport = (newReportData) => {
    const newReport = {
      id: Date.now(),
      type: newReportData.category === 'Water Shortage' ? 'water' : newReportData.category === 'Extreme Heat' ? 'heat' : newReportData.category === 'Crop Problem' ? 'crop' : 'rain',
      icon: newReportData.category === 'Water Shortage' ? '💧' : newReportData.category === 'Extreme Heat' ? '🌡️' : newReportData.category === 'Crop Problem' ? '🌾' : '🌧️',
      category: newReportData.category || 'Water Shortage',
      title: `${newReportData.category} reported by local citizen`,
      location: newReportData.locationName || selectedLocation.name,
      locationId: newReportData.locationId || selectedLocation.id,
      count: 1,
      time: 'Just now',
      urgent: true,
      desc: newReportData.description || 'Citizen climate observation submitted via NinoShield People Portal.',
      image: newReportData.image || null,
    };

    const updatedReports = [newReport, ...userReports];
    setUserReports(updatedReports);
    localStorage.setItem('ninoshield_user_reports', JSON.stringify(updatedReports));

    // Also update community report counters on the location
    setLocations(prevLocs => prevLocs.map(loc => {
      if (loc.id === (newReportData.locationId || selectedLocation.id)) {
        const catKey = newReportData.category === 'Water Shortage' ? 'waterShortage' :
                       newReportData.category === 'Extreme Heat' ? 'extremeHeat' :
                       newReportData.category === 'Crop Problem' ? 'cropProblem' : 'heavyRainfall';
        return {
          ...loc,
          communityReports: {
            ...loc.communityReports,
            [catKey]: (loc.communityReports[catKey] || 0) + 1
          }
        };
      }
      return loc;
    }));
  };

  // 6. COMMUNITY READINESS & TASKS STATE
  const initialCommunityTasks = [
    { id: 'c1', category: 'water', name: 'Inspect shared municipal water tanks and reservoirs', completed: true, weight: 20 },
    { id: 'c2', category: 'water', name: 'Deploy 5 additional community water storage units', completed: true, weight: 20 },
    { id: 'c3', category: 'health', name: 'Establish village hydration station at primary health center', completed: true, weight: 15 },
    { id: 'c4', category: 'health', name: 'Stock ORS packets & heatstroke emergency kits', completed: false, weight: 15 },
    { id: 'c5', category: 'emergency', name: 'Verify community emergency siren & radio broadcast system', completed: true, weight: 15 },
    { id: 'c6', category: 'communication', name: 'Send local SMS alert to vulnerable elderly & farmers', completed: true, weight: 15 },
  ];

  const [communityTasks, setCommunityTasks] = useState(() => {
    const saved = localStorage.getItem('ninoshield_community_tasks');
    return saved ? JSON.parse(saved) : initialCommunityTasks;
  });

  const toggleCommunityTask = (taskId) => {
    setCommunityTasks(prev => {
      const updated = prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
      localStorage.setItem('ninoshield_community_tasks', JSON.stringify(updated));
      return updated;
    });
  };

  // Recalculate community readiness score
  const completedTaskWeight = communityTasks.filter(t => t.completed).reduce((sum, t) => sum + t.weight, 0);
  const totalTaskWeight = communityTasks.reduce((sum, t) => sum + t.weight, 0);
  const communityReadinessScore = Math.round((completedTaskWeight / totalTaskWeight) * 100);

  // 7. DECISION-MAKER ACTION RESPONSE PLAN STATE
  const initialActionPlan = [
    { id: 1, priority: 'P1 HIGH', dept: 'Water Resources Dept (WRD)', action: 'Deploy 45 emergency water supply tankers to Madurai South & West zones', timeline: '48 Hours', status: 'In Progress', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 2, priority: 'P1 HIGH', dept: 'Health & Family Welfare', action: 'Setup 18 Heatstroke Relief & Hydration Centers in high-risk taluks', timeline: '24 Hours', status: 'Approved', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 3, priority: 'P2 MED', dept: 'Agriculture & Farmers Welfare', action: 'Broadcast micro-irrigation advisories to 12,000 paddy farmers', timeline: '3 Days', status: 'Pending', bg: 'bg-[#F8FBFF] text-slate-700 border-slate-200' },
    { id: 4, priority: 'P2 MED', dept: 'Public Info & Disaster Mgmt', action: 'Transmit bilingual SMS & radio advisories regarding water conservation', timeline: '12 Hours', status: 'Approved', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  ];

  const [actionPlan, setActionPlan] = useState(() => {
    const saved = localStorage.getItem('ninoshield_action_plan');
    return saved ? JSON.parse(saved) : initialActionPlan;
  });

  const updateActionStatus = (actionId, newStatus) => {
    setActionPlan(prev => {
      const updated = prev.map(act => {
        if (act.id === actionId) {
          const bg = newStatus === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                     newStatus === 'In Progress' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                     'bg-[#F8FBFF] text-slate-700 border-slate-200';
          return { ...act, status: newStatus, bg };
        }
        return act;
      });
      localStorage.setItem('ninoshield_action_plan', JSON.stringify(updated));
      return updated;
    });
  };

  // Department Coordination Counters
  const departmentCoordination = {
    water: { pending: actionPlan.filter(a => a.dept.includes('Water') && a.status !== 'Approved').length, total: actionPlan.filter(a => a.dept.includes('Water')).length },
    health: { pending: actionPlan.filter(a => a.dept.includes('Health') && a.status !== 'Approved').length, total: actionPlan.filter(a => a.dept.includes('Health')).length },
    ag: { pending: actionPlan.filter(a => a.dept.includes('Ag') && a.status !== 'Approved').length, total: actionPlan.filter(a => a.dept.includes('Ag')).length },
    publicComm: { pending: actionPlan.filter(a => a.dept.includes('Public') && a.status !== 'Approved').length, total: actionPlan.filter(a => a.dept.includes('Public')).length },
  };

  // 8. RESOURCE MANAGEMENT STATE
  const initialResources = [
    { id: 'tankers', name: 'Emergency Water Tankers', available: 12, required: 20, unit: 'trucks' },
    { id: 'kits', name: 'Emergency Health & ORS Kits', available: 140, required: 200, unit: 'kits' },
    { id: 'teams', name: 'Mobile Medical Teams', available: 4, required: 6, unit: 'teams' },
    { id: 'shelters', name: 'Heat & Safe Shelters', available: 5, required: 8, unit: 'centers' },
    { id: 'vehicles', name: 'Emergency Support Vehicles', available: 8, required: 10, unit: 'vehicles' }
  ];

  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem('ninoshield_resources');
    return saved ? JSON.parse(saved) : initialResources;
  });

  const updateResource = (id, delta) => {
    setResources(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, available: Math.max(0, r.available + delta) } : r);
      localStorage.setItem('ninoshield_resources', JSON.stringify(updated));
      return updated;
    });
  };

  // 9. DETERMINISTIC AI RECOMMENDATION ENGINE (FALLBACK)
  const generateAiRecommendation = (locationObj = selectedLocation, query = '') => {
    const loc = locationObj || selectedLocation;
    const recommendations = [];

    if (loc.waterStress >= 70 || loc.communityReports.waterShortage > 15) {
      recommendations.push({
        priority: 'HIGH',
        category: 'Water Resources',
        action: 'Deploy emergency municipal water tankers & inspect reservoir release channels',
        reason: `Water stress is ${loc.waterStress}/100 with ${loc.anomalies.waterAvailability} storage deficit and ${loc.communityReports.waterShortage} citizen water shortage reports.`
      });
    }

    if (loc.temperatureRisk >= 75 || loc.communityReports.extremeHeat > 10) {
      recommendations.push({
        priority: 'HIGH',
        category: 'Public Health',
        action: 'Activate 18 heatstroke hydration stations & issue outdoor worker advisories',
        reason: `Temperature anomaly of ${loc.anomalies.tempAnomaly} poses critical health risk to ${loc.vulnerableGroups.outdoorWorkers.toLocaleString()} outdoor workers and ${loc.vulnerableGroups.elderly.toLocaleString()} elderly residents.`
      });
    }

    if (loc.agricultureRisk >= 70 || loc.communityReports.cropProblem > 10) {
      recommendations.push({
        priority: 'MEDIUM',
        category: 'Agriculture',
        action: 'Issue drought-resistant crop advisories & canal rotation schedules',
        reason: `Rainfall deficit of ${loc.anomalies.rainAnomaly} threatens paddy and dryland crops across ${loc.vulnerableGroups.farmers.toLocaleString()} agricultural households.`
      });
    }

    recommendations.push({
      priority: 'MEDIUM',
      category: 'Community Engagement',
      action: 'Broadcast bilingual SMS emergency alerts & activate local radio advisories',
      reason: `El Niño signal is ${loc.elNinoStatus} with localized climate signals requiring multi-channel public warning.`
    });

    return {
      location: loc.name,
      district: loc.district,
      riskScore: loc.overallRisk,
      query: query || "General Priority Recommendations",
      recommendations,
      summary: `NinoShield AI Risk Intelligence recommends prioritizing ${recommendations[0]?.category || 'Water Resources'} for ${loc.name} due to active ${loc.anomalies.tempAnomaly} temperature and ${loc.anomalies.rainAnomaly} rainfall anomalies.`
    };
  };

  return (
    <NinoShieldContext.Provider value={{
      lang,
      setLang,
      toggleLanguage,
      t,
      locations,
      selectedLocation,
      selectedLocationId,
      changeLocation,
      isFarmerMode,
      setIsFarmerMode,
      toggleFarmerMode,
      selectedCrop,
      changeCrop,
      supportedCrops,
      userGeoStatus,
      requestBrowserLocation,
      communityAuth,
      communityLocationConfirmed,
      loginCommunity,
      registerCommunity,
      logoutCommunity,
      confirmCommunityLocation,
      decisionMakerAuth,
      decisionMakerRegionConfirmed,
      loginDecisionMaker,
      registerDecisionMaker,
      logoutDecisionMaker,
      confirmDecisionMakerRegion,
      currentRoute,
      navigate,
      peopleChecklist,
      togglePeopleChecklist,
      preparedCount,
      totalPreparedCount,
      userReports,
      addReport,
      communityTasks,
      toggleCommunityTask,
      communityReadinessScore,
      actionPlan,
      updateActionStatus,
      departmentCoordination,
      resources,
      updateResource,
      generateAiRecommendation
    }}>
      {children}
    </NinoShieldContext.Provider>
  );
}

export function useNinoShield() {
  const context = useContext(NinoShieldContext);
  if (!context) {
    throw new Error('useNinoShield must be used within a NinoShieldProvider');
  }
  return context;
}
