import React, { useState } from 'react';
import { useNinoShield } from '../../context/NinoShieldContext';
import HeaderBanner from '../Layout/HeaderBanner';
import RealInteractiveMap from '../Map/RealInteractiveMap';
import { 
  Home, 
  MapPin, 
  Bell, 
  MessageSquare, 
  ChevronRight, 
  Droplets, 
  User, 
  X, 
  Users, 
  ClipboardList, 
  FileText, 
  Shield, 
  Ambulance, 
  Cross,
  Sprout,
  ArrowLeft,
  HelpCircle,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  Sun,
  Flame,
  CloudRain,
  Camera,
  Bot,
  Compass,
  ListChecks,
  Activity,
  Megaphone
} from 'lucide-react';

export default function CommunityDashboard({ onNavigateLanding }) {
  const {
    lang,
    toggleLanguage,
    t,
    locations,
    selectedLocation,
    changeLocation,
    currentRoute,
    navigate,
    userReports,
    communityTasks,
    toggleCommunityTask,
    communityReadinessScore,
    generateAiRecommendation,
    communityAuth,
    logoutCommunity,
    addReport
  } = useNinoShield();

  // Modals & State
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportCategory, setReportCategory] = useState('Water Shortage');
  const [reportDescription, setReportDescription] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  // Sub-page route matching
  const isRiskPage = currentRoute === '/community/risk';
  const isMapPage = currentRoute === '/community/map';
  const isAlertsPage = currentRoute === '/community/alerts';
  const isPreparePage = currentRoute === '/community/prepare';
  const isReportsPage = currentRoute === '/community/reports';
  const isMainDashboard = !isRiskPage && !isMapPage && !isAlertsPage && !isPreparePage && !isReportsPage;

  const userName = communityAuth?.user?.name || 'Pughal';

  const handleAskAi = (query) => {
    const res = generateAiRecommendation(selectedLocation, query || "Community climate readiness");
    setAiAnalysis(res);
    setShowAiModal(true);
  };

  const reportCounts = {
    water: userReports.filter(r => r.type === 'water' || r.category === 'Water Shortage').length + (selectedLocation.communityReports?.waterShortage || 24),
    heat: userReports.filter(r => r.type === 'heat' || r.category === 'Extreme Heat').length + (selectedLocation.communityReports?.extremeHeat || 16),
    crop: userReports.filter(r => r.type === 'crop' || r.category === 'Crop Problem').length + (selectedLocation.communityReports?.cropProblem || 12),
    rain: userReports.filter(r => r.type === 'rain' || r.category === 'Heavy Rainfall').length + (selectedLocation.communityReports?.heavyRainfall || 7),
  };

  const handleReportSubmit = (e) => {
    if (e) e.preventDefault();
    addReport({
      category: reportCategory,
      locationId: selectedLocation.id,
      locationName: selectedLocation.name,
      description: reportDescription || `${reportCategory} reported in ${selectedLocation.name} community.`,
    });

    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setShowReportModal(false);
      setReportDescription('');
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-slate-900 font-sans flex">
      
      {/* ============================================================ */}
      {/* 1. LEFT SIDEBAR (STRICTLY NO MODE SWITCHER BUTTONS)          */}
      {/* ============================================================ */}
      <aside className="w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between shrink-0 hidden lg:flex sticky top-0 h-screen">
        <div className="space-y-6">
          
          {/* Logo Header */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onNavigateLanding}>
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-base text-slate-900 tracking-tight">NinoShield</div>
              <div className="text-[10px] text-slate-500 font-medium">Community Portal</div>
            </div>
          </div>

          {/* Clean Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => navigate('/community')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition cursor-pointer ${isMainDashboard ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Home className="w-4 h-4 text-blue-600" />
              <span>{lang === 'ta' ? 'முகப்பு' : 'Home'}</span>
            </button>

            <button
              onClick={() => navigate('/community/risk')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition cursor-pointer ${isRiskPage ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Activity className="w-4 h-4 text-slate-500" />
              <span>{lang === 'ta' ? 'சமூக அபாயம்' : 'Community Risk'}</span>
            </button>

            <button
              onClick={() => navigate('/community/map')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition cursor-pointer ${isMapPage ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <MapPin className="w-4 h-4 text-slate-500" />
              <span>{lang === 'ta' ? 'சமூக வரைபடம்' : 'Community Map'}</span>
            </button>

            <button
              onClick={() => navigate('/community/alerts')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition cursor-pointer ${isAlertsPage ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Bell className="w-4 h-4 text-slate-500" />
              <span>{lang === 'ta' ? 'எச்சரிக்கைகள்' : 'Alerts'}</span>
            </button>

            <button
              onClick={() => navigate('/community/prepare')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition cursor-pointer ${isPreparePage ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <ListChecks className="w-4 h-4 text-slate-500" />
              <span>{lang === 'ta' ? 'தயார்படுத்துதல்' : 'Prepare'}</span>
            </button>

            <button
              onClick={() => navigate('/community/reports')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition cursor-pointer ${isReportsPage ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>{lang === 'ta' ? 'அறிக்கைகள்' : 'Reports'} ({userReports.length})</span>
            </button>

            <button
              onClick={() => handleAskAi("Community climate readiness")}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-slate-500" />
              <span>{lang === 'ta' ? 'AI கேள்வி' : 'Ask AI'}</span>
            </button>
          </nav>

        </div>

        {/* CLEAN SIDEBAR FOOTER (NO PROFILE CARD & NO MODE SWITCHER) */}
        <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center font-medium">
          NinoShield Community Portal
        </div>

      </aside>

      {/* ============================================================ */}
      {/* 2. MAIN CONTENT VIEW AREA                                    */}
      {/* ============================================================ */}
      <main className="flex-1 p-4 sm:p-6 lg:p-7 overflow-y-auto max-w-7xl mx-auto space-y-5">
        
        {/* TOP HEADER LANDSCAPE BANNER */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs bg-slate-900 text-white min-h-[190px] flex flex-col justify-between p-5 sm:p-6">
          
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop" 
            alt="Community Landscape Header" 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/50 to-transparent" />

          {/* Header Top Actions Bar */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <div />

            <div className="flex items-center space-x-3">
              
              {/* Language Switcher */}
              <div className="bg-white/90 backdrop-blur-md p-1 rounded-xl border border-white/40 flex items-center space-x-1 shadow-xs text-xs font-bold">
                <button
                  onClick={() => { if (lang !== 'en') toggleLanguage(); }}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer ${lang === 'en' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  English
                </button>
                <button
                  onClick={() => { if (lang !== 'ta') toggleLanguage(); }}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer ${lang === 'ta' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  தமிழ்
                </button>
              </div>

              {/* Notification Icon */}
              <button 
                onClick={() => navigate('/community/alerts')}
                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:bg-white transition cursor-pointer shadow-xs"
                title="Notifications"
              >
                <Bell className="w-4.5 h-4.5 text-blue-600" />
              </button>

              {/* User Menu Icon */}
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:bg-white transition cursor-pointer shadow-xs"
                  title="User Profile Menu"
                >
                  <User className="w-4.5 h-4.5 text-slate-800" />
                </button>

                {/* User Dropdown Menu with Logout */}
                {showUserMenu && (
                  <div className="absolute right-0 top-11 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 space-y-2 z-50 text-slate-900 text-xs font-semibold">
                    <div className="pb-2 border-b border-slate-100">
                      <div className="font-extrabold text-sm">{userName}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{selectedLocation.name} Community</div>
                    </div>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logoutCommunity();
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-extrabold flex items-center justify-between transition cursor-pointer"
                    >
                      <span>Logout</span>
                      <LogOut className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                )}
              </div>

              {/* Community Portal Badge */}
              <div className="hidden md:flex items-center space-x-2.5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-blue-200 text-slate-900 shadow-xs">
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 tracking-tight leading-tight">Community Portal</div>
                  <div className="text-[10px] text-slate-500 font-medium leading-tight">Neighborhood climate action</div>
                </div>
              </div>

            </div>
          </div>

          {/* Header Bottom Left */}
          <div className="relative z-10 space-y-2 mt-4 sm:mt-6">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-xs">
              Good morning, {userName}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-100 font-medium drop-shadow-xs">
              {selectedLocation.name} Community — Local climate risk, readiness &amp; collective early action.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1.5">
              <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-slate-900 text-xs font-bold shadow-xs">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>📍 {selectedLocation.name}, {selectedLocation.district}</span>
              </div>

              <button
                onClick={() => setShowLocationModal(true)}
                className="flex items-center space-x-1.5 bg-white/90 hover:bg-white text-blue-700 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer border border-blue-100"
              >
                <Compass className="w-3.5 h-3.5 text-blue-600" />
                <span>Change Location</span>
              </button>
            </div>
          </div>

        </div>

        {/* SUB-PAGES OR MAIN COMMUNITY DASHBOARD */}
        {isRiskPage ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/community')} className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-extrabold text-slate-900">Community Risk Breakdown</h2>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900">{selectedLocation.name} Regional Climate Vulnerability</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Multi-sensor telemetry indicates severe water drawdown and heat thermal departures affecting {selectedLocation.vulnerableGroups.elderly} elderly residents and {selectedLocation.vulnerableGroups.outdoorWorkers} outdoor workers.
              </p>
            </div>
          </div>
        ) : isMapPage ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/community')} className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-extrabold text-slate-900">Interactive Community Risk Map</h2>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
              <RealInteractiveMap height="500px" />
            </div>
          </div>
        ) : isAlertsPage ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/community')} className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-extrabold text-slate-900">Community Active Notices &amp; Warnings</h2>
            </div>
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-amber-900 font-extrabold text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>WATER SHORTAGE &amp; HEAT WARNING — {selectedLocation.name}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold text-xs">Active Notice</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Local municipal water supply reservoirs are running lower than average. Community members should prioritize essential household water usage.
              </p>
            </div>
          </div>
        ) : isReportsPage ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/community')} className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-extrabold text-slate-900">Community Signals Feed ({userReports.length} Reports)</h2>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 space-y-4 shadow-xs">
              <div className="space-y-2">
                {userReports.map(rep => (
                  <div key={rep.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-900">{rep.category}</span>
                      <span className="text-slate-400">{rep.time}</span>
                    </div>
                    <p className="text-slate-600 font-medium">{rep.desc}</p>
                    <div className="text-blue-600 font-bold">{rep.location}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* MAIN POST-LOGIN COMMUNITY DASHBOARD (1:1 Visual Match) */
          <div className="space-y-5">
            
            {/* ROW 1 (3 COLUMNS) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* 1. COMMUNITY CLIMATE STATUS */}
              <div className="bg-gradient-to-br from-red-50/90 via-pink-50/30 to-white border border-red-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between border-b border-red-100/80 pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                        <Sun className="w-4 h-4" />
                      </div>
                      <h3 className="font-extrabold text-sm text-slate-900">Community Climate Status</h3>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 my-3">
                    <div className="w-12 h-12 rounded-2xl bg-red-100 border border-red-200 flex items-center justify-center shrink-0">
                      <Sun className="w-7 h-7 text-red-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-red-600 tracking-tight">High Risk</div>
                      <p className="text-xs text-slate-600 font-medium leading-snug">
                        High heat and low rainfall conditions are affecting your community.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-red-100 text-center space-y-0.5">
                    <div className="text-[10px] font-bold text-slate-500">Temperature</div>
                    <div className="text-xs font-black text-red-600">Above normal</div>
                    <div className="text-[10px] font-bold text-slate-700">{selectedLocation.anomalies.tempAnomaly}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-red-100 text-center space-y-0.5">
                    <div className="text-[10px] font-bold text-slate-500">Rainfall</div>
                    <div className="text-xs font-black text-red-600">Below normal</div>
                    <div className="text-[10px] font-bold text-slate-700">{selectedLocation.anomalies.rainAnomaly}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-red-100 text-center space-y-0.5">
                    <div className="text-[10px] font-bold text-slate-500">Water</div>
                    <div className="text-xs font-black text-red-600">Decreasing</div>
                    <div className="text-[10px] font-bold text-slate-700">{selectedLocation.anomalies.waterAvailability}</div>
                  </div>
                </div>
              </div>

              {/* 2. COMMUNITY READINESS SCORE */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <ListChecks className="w-4 h-4" />
                    </div>
                    <h3 className="font-extrabold text-sm text-slate-900">Community Readiness</h3>
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                    {communityReadinessScore}% Ready
                  </span>
                </div>

                <div className="space-y-2 text-xs font-semibold my-1">
                  <div>
                    <div className="flex justify-between text-slate-700 text-[11px] mb-1">
                      <span>Water Readiness</span>
                      <span className="font-bold text-emerald-700">80%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full w-[80%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-700 text-[11px] mb-1">
                      <span>Health Preparedness</span>
                      <span className="font-bold text-amber-600">60%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[60%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-700 text-[11px] mb-1">
                      <span>Emergency Systems</span>
                      <span className="font-bold text-emerald-700">75%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full w-[75%]" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/community/prepare')}
                  className="w-full py-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <span>View Action Plan</span>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>

              {/* 3. CURRENT COMMUNITY ALERT */}
              <div className="bg-gradient-to-br from-amber-50/90 via-yellow-50/30 to-white border border-amber-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between border-b border-amber-100/80 pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <h3 className="font-extrabold text-sm text-slate-900">Current Community Alert</h3>
                    </div>
                    
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 font-bold text-[10px] flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
                      <span>Monitoring</span>
                    </span>
                  </div>

                  <div className="my-3 space-y-1.5">
                    <h4 className="text-base font-black text-red-600 leading-tight">
                      Water availability may decrease in the coming days.
                    </h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Check shared water sources, prepare additional water storage and follow local advisories.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => navigate('/community/alerts')}
                    className="w-8 h-8 rounded-full bg-white border border-amber-200 flex items-center justify-center text-slate-700 hover:bg-amber-100 transition cursor-pointer shadow-xs"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-800" />
                  </button>
                </div>
              </div>

            </div>

            {/* ROW 2 (2 COLUMNS): MAP & SIGNALS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* COMMUNITY RISK MAP */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h3 className="font-extrabold text-sm text-slate-900">Community Risk Map</h3>
                  </div>
                  <button onClick={() => navigate('/community/map')} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                    View Full Map →
                  </button>
                </div>

                <RealInteractiveMap height="280px" />
              </div>

              {/* COMMUNITY SIGNALS */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Activity className="w-4 h-4" />
                    </div>
                    <h3 className="font-extrabold text-sm text-slate-900">Community Signals</h3>
                  </div>
                  <button onClick={() => navigate('/community/reports')} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                    View Feed →
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-semibold my-1">
                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-center space-y-1">
                    <div className="text-slate-600 font-bold">Water Shortage</div>
                    <div className="text-2xl font-black text-blue-600">{reportCounts.water}</div>
                    <div className="text-[10px] text-slate-400">citizen reports</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-center space-y-1">
                    <div className="text-slate-600 font-bold">Extreme Heat</div>
                    <div className="text-2xl font-black text-red-600">{reportCounts.heat}</div>
                    <div className="text-[10px] text-slate-400">citizen reports</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-center space-y-1">
                    <div className="text-slate-600 font-bold">Crop Problems</div>
                    <div className="text-2xl font-black text-amber-600">{reportCounts.crop}</div>
                    <div className="text-[10px] text-slate-400">citizen reports</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-center space-y-1">
                    <div className="text-slate-600 font-bold">Heavy Rainfall</div>
                    <div className="text-2xl font-black text-purple-600">{reportCounts.rain}</div>
                    <div className="text-[10px] text-slate-400">citizen reports</div>
                  </div>
                </div>

                <button
                  onClick={() => setShowReportModal(true)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Report a Community Issue →</span>
                </button>
              </div>

            </div>

            {/* ROW 3 (3 COLUMNS) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* VULNERABLE GROUPS */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-sm text-slate-900">People Needing Support</h3>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Count</span>
                </div>

                <div className="space-y-2 text-xs font-semibold">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-slate-800">Elderly residents</span>
                    <span className="font-black text-slate-900">{selectedLocation.vulnerableGroups.elderly.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-slate-800">Children under 5</span>
                    <span className="font-black text-slate-900">{selectedLocation.vulnerableGroups.children.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-slate-800">Outdoor workers</span>
                    <span className="font-black text-slate-900">{selectedLocation.vulnerableGroups.outdoorWorkers.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* ASK NINOSHIELD */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <h3 className="font-extrabold text-sm text-slate-900">Ask NinoShield</h3>
                    </div>
                  </div>

                  <div className="space-y-1.5 my-2 text-xs font-semibold">
                    {[
                      "How prepared is our community?",
                      "Are local water tanks stocked?",
                      "What is the heat plan?",
                      "How to support elderly people?"
                    ].map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAskAi(q)}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-blue-50 text-slate-800 transition flex items-center justify-between text-left cursor-pointer"
                      >
                        <span>{q}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleAskAi()}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Ask AI Advisor →
                </button>
              </div>

              {/* REPORT ISSUE */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Megaphone className="w-4 h-4" />
                      </div>
                      <h3 className="font-extrabold text-sm text-slate-900">Report Community Issue</h3>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 my-2 font-medium">Select issue category to alert district decision-makers:</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                    {['Water Shortage', 'Extreme Heat', 'Heavy Rainfall', 'Flooding'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setReportCategory(cat);
                          setShowReportModal(true);
                        }}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 hover:bg-emerald-50 transition cursor-pointer text-center"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowReportModal(true)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
                >
                  Report Observation →
                </button>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* LOCATION MODAL */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowLocationModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-extrabold text-slate-900">Select Community Region</h3>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {locations.map(loc => (
                <div
                  key={loc.id}
                  onClick={() => {
                    changeLocation(loc.id);
                    setShowLocationModal(false);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition ${selectedLocation.id === loc.id ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}
                >
                  <div>
                    <div className="font-extrabold text-xs text-slate-900">{loc.name} Community</div>
                    <div className="text-[10px] text-slate-500">{loc.district}</div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${loc.overallRisk >= 75 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'}`}>
                    Risk: {loc.overallRisk}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* REPORT MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 relative text-xs">
            <button
              onClick={() => setShowReportModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-extrabold text-slate-900">Report Community Observation</h3>
            {reportSuccess ? (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-1 text-emerald-900">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold">Report Submitted Successfully</div>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-3 font-semibold">
                <div>
                  <label className="block mb-1 font-bold">Category</label>
                  <select
                    value={reportCategory}
                    onChange={(e) => setReportCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                  >
                    <option value="Water Shortage">Water Shortage</option>
                    <option value="Extreme Heat">Extreme Heat</option>
                    <option value="Heavy Rainfall">Heavy Rainfall</option>
                    <option value="Flooding">Flooding</option>
                    <option value="Crop Problem">Crop Problem</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-bold">Description</label>
                  <textarea
                    rows={3}
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    placeholder="Describe local community observation..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                  />
                </div>
                <button type="submit" className="w-full py-2.5 bg-emerald-600 text-white font-extrabold rounded-xl cursor-pointer">
                  Submit Observation
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* AI GUIDANCE MODAL */}
      {showAiModal && aiAnalysis && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 relative text-xs">
            <button
              onClick={() => setShowAiModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Bot className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-extrabold text-slate-900">Community AI Advisor</h3>
            </div>

            <p className="text-slate-700 font-medium">{aiAnalysis.summary}</p>

            <div className="space-y-2">
              {aiAnalysis.recommendations.map((rec, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
                  <div className="font-bold text-slate-900">{rec.category}</div>
                  <p className="text-slate-600 text-[11px]">{rec.action}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAiModal(false)}
              className="w-full py-2.5 bg-blue-600 text-white font-extrabold rounded-xl cursor-pointer"
            >
              Close Advisor
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
