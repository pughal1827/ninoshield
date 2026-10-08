import React, { useState, useEffect } from 'react';
import { useNinoShield } from '../../context/NinoShieldContext';
import farmerHeaderBg from '../../assets/farmer_header_bg.jpg';
import farmWaterReservoir from '../../assets/farm_water_reservoir.jpg';
import { 
  Home, 
  MapPin, 
  Bell, 
  ShieldCheck, 
  PlusCircle, 
  MessageSquare, 
  ChevronRight, 
  Thermometer, 
  CloudRain, 
  Droplets, 
  AlertTriangle, 
  Bot, 
  User, 
  Info, 
  X, 
  Leaf, 
  Shield, 
  CheckCircle2, 
  ArrowLeft,
  Activity,
  HelpCircle,
  Compass,
  Crosshair,
  Camera,
  Wheat,
  Sprout,
  Sun,
  Flame,
  CornerDownRight,
  Sparkles,
  Check,
  Megaphone,
  Plus,
  ArrowRight
} from 'lucide-react';

export default function FarmerDashboard({ onNavigateLanding }) {
  const {
    lang,
    toggleLanguage,
    t,
    locations,
    selectedLocation,
    changeLocation,
    isFarmerMode,
    toggleFarmerMode,
    selectedCrop,
    changeCrop,
    supportedCrops,
    userGeoStatus,
    requestBrowserLocation,
    currentRoute,
    navigate,
    addReport,
    generateAiRecommendation
  } = useNinoShield();

  // Modals & State
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  
  const [showCropModal, setShowCropModal] = useState(false);
  
  const [showSourceModal, setShowSourceModal] = useState(false);
  
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiQuestionText, setAiQuestionText] = useState('');
  const [aiResponse, setAiResponse] = useState(null);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportCategory, setReportCategory] = useState('Water shortage');
  const [reportDescription, setReportDescription] = useState('');
  const [reportImagePreview, setReportImagePreview] = useState(null);
  const [reportSuccess, setReportSuccess] = useState(false);

  // Auto-request location on first mount if not detected yet
  useEffect(() => {
    if (userGeoStatus.isDetecting === false && userGeoStatus.locationText === 'Madurai, Tamil Nadu') {
      requestBrowserLocation();
    }
  }, []);

  // Filtered location list for search
  const filteredLocations = locations.filter(loc => 
    loc.name.toLowerCase().includes(locationSearchQuery.toLowerCase()) ||
    loc.district.toLowerCase().includes(locationSearchQuery.toLowerCase())
  );

  // Crop-specific dynamic advice rule engine
  const getCropAdvisories = (cropName) => {
    switch (cropName) {
      case 'Sugarcane':
        return {
          irrigationAdvice: "Sugarcane requires high soil moisture during vegetative growth. Utilize furrow irrigation & apply trash mulching to reduce evaporation.",
          mainConcern: "High water deficit may reduce cane length and sugar recovery yield if unmitigated.",
          waterStressLevel: "High",
          heatSensitivity: "High"
        };
      case 'Banana':
        return {
          irrigationAdvice: "Maintain regular micro-irrigation. Protect pseudostems from wind stress and ensure adequate drainage in low-lying plots.",
          mainConcern: "Extended drought and high thermal departure cause leaf scorch and bunch weight loss.",
          waterStressLevel: "Critical",
          heatSensitivity: "High"
        };
      case 'Cotton':
        return {
          irrigationAdvice: "Prioritize moisture during boll formation phase. Avoid excess field flooding during high thermal hours.",
          mainConcern: "Heat stress may cause boll shedding; regulate irrigation to early morning hours.",
          waterStressLevel: "Moderate",
          heatSensitivity: "Very High"
        };
      case 'Groundnut':
        return {
          irrigationAdvice: "Maintain moisture at pegging and pod development stages. Drip irrigation recommended to conserve groundwater.",
          mainConcern: "Dry soil hardening during peg penetration reduces pod count significantly.",
          waterStressLevel: "Moderate",
          heatSensitivity: "Moderate"
        };
      case 'Vegetables':
        return {
          irrigationAdvice: "Apply frequent light drip irrigation during early morning or evening. Use shade netting for sensitive seedlings.",
          mainConcern: "Soil moisture evaporation is rapid under present heat departure (+2.1°C above normal).",
          waterStressLevel: "High",
          heatSensitivity: "High"
        };
      case 'Paddy (Rice)':
      default:
        return {
          irrigationAdvice: "Conserve water and prioritize essential irrigation for your crop. Maintain 2-3 cm shallow water depth during flowering.",
          mainConcern: "Water availability may decrease, which can affect paddy crop growth in your area.",
          waterStressLevel: "High",
          heatSensitivity: "Moderate"
        };
    }
  };

  const cropAdvisories = getCropAdvisories(selectedCrop);

  // Handle Ask AI Submit
  const handleAskAi = (question = "") => {
    const q = question || aiQuestionText || `Climate and irrigation advice for ${selectedCrop} in ${selectedLocation.name}`;
    setAiQuestionText(q);

    const baseRec = generateAiRecommendation(selectedLocation, q);
    
    // Add crop-specific response
    setAiResponse({
      title: `${selectedCrop} Advisory — ${selectedLocation.name}`,
      question: q,
      crop: selectedCrop,
      summary: `For ${selectedCrop} in ${selectedLocation.name}: ${cropAdvisories.irrigationAdvice}`,
      riskLevel: selectedLocation.overallRisk >= 75 ? 'HIGH RISK' : 'MODERATE RISK',
      details: [
        { topic: 'Irrigation Timing', advice: 'Irrigate during low-evaporation hours (5:00 AM - 8:00 AM or after 6:00 PM).' },
        { topic: 'Heat Protection', advice: `Current temperature is ${selectedLocation.anomalies.tempAnomaly} above normal. Protect vulnerable foliage.` },
        { topic: 'Water Conservation', advice: `Local reservoir & groundwater levels are low (${selectedLocation.anomalies.waterAvailability}). Use mulching.` }
      ]
    });

    setShowAiModal(true);
  };

  // Handle Report Submission
  const handleReportSubmit = (e) => {
    if (e) e.preventDefault();
    addReport({
      category: reportCategory,
      locationId: selectedLocation.id,
      locationName: selectedLocation.name,
      description: reportDescription || `${reportCategory} reported on farm in ${selectedLocation.name} (${selectedCrop} field).`,
      image: reportImagePreview
    });

    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setShowReportModal(false);
      setReportDescription('');
      setReportImagePreview(null);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-slate-900 font-sans flex">
      
      {/* 1. LEFT SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between shrink-0 hidden lg:flex sticky top-0 h-screen">
        <div className="space-y-6">
          
          {/* Logo Header */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onNavigateLanding}>
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-base text-slate-900 tracking-tight flex items-center space-x-1">
                <span>NinoShield</span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">AI-Powered El Niño Early Action</div>
            </div>
          </div>

          {/* Sidebar Links */}
          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => navigate('/people')}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg bg-blue-50 text-blue-700 font-bold transition cursor-pointer"
            >
              <Home className="w-4 h-4 text-blue-600" />
              <span>{lang === 'ta' ? 'முகப்பு' : 'Home'}</span>
            </button>

            <button
              onClick={() => setShowLocationModal(true)}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{lang === 'ta' ? 'என் பகுதி' : 'My Area'}</span>
            </button>

            <button
              onClick={() => navigate('/people/alerts')}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <Bell className="w-4 h-4 text-slate-500" />
              <span>{lang === 'ta' ? 'எச்சரிக்கைகள்' : 'Alerts'}</span>
            </button>

            <button
              onClick={() => navigate('/people/prepare')}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              <span>{lang === 'ta' ? 'தயார்படுத்துதல்' : 'Prepare'}</span>
            </button>

            <button
              onClick={() => navigate('/people/report')}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-slate-500" />
              <span>{lang === 'ta' ? 'அறிவிப்பு' : 'Report'}</span>
            </button>

            <button
              onClick={() => handleAskAi(`Climate advice for ${selectedCrop}`)}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-slate-500" />
              <span>{lang === 'ta' ? 'AI கேள்வி' : 'Ask AI'}</span>
            </button>
          </nav>

        </div>

        {/* BOTTOM FARMER MODE TOGGLE CARD (NO PROFILE CARD AT BOTTOM) */}
        <div 
          onClick={() => toggleFarmerMode(false)}
          className="p-3.5 rounded-xl bg-[#EAF8F0] border border-emerald-200/80 hover:border-emerald-400 transition cursor-pointer flex items-center justify-between shadow-xs"
        >
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">Farmer Mode</div>
              <div className="text-[10px] text-emerald-800 font-bold">ON</div>
            </div>
          </div>

          {/* Toggle Switch Pill */}
          <div className="w-10 h-5 rounded-full bg-emerald-600 p-0.5 flex items-center justify-end transition-all duration-300">
            <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
          </div>
        </div>

      </aside>

      {/* 2. MAIN CONTENT VIEW */}
      <main className="flex-1 p-4 sm:p-6 lg:p-7 overflow-y-auto max-w-7xl mx-auto space-y-5">
        
        {/* TOP HEADER LANDSCAPE BANNER */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs bg-slate-900 text-white min-h-[190px] flex flex-col justify-between p-5 sm:p-6">
          
          {/* Background Image */}
          <img 
            src={farmerHeaderBg} 
            alt="Farmer Field Header Background" 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
          />
          
          {/* Gradient Overlay for Crisp Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/40 to-transparent" />

          {/* Header Top Actions Bar */}
          <div className="relative z-10 flex items-center justify-between w-full">
            
            {/* Empty space on left for header content */}
            <div />

            {/* Header Right Action Items */}
            <div className="flex items-center space-x-3">
              
              {/* Language Switcher Button */}
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

              {/* Notification Bell Icon */}
              <button 
                onClick={() => navigate('/people/alerts')}
                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:bg-white transition cursor-pointer shadow-xs"
                title="Notifications"
              >
                <Bell className="w-4.5 h-4.5 text-blue-600" />
              </button>

              {/* User Profile Icon */}
              <button 
                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:bg-white transition cursor-pointer shadow-xs"
                title="Profile"
              >
                <User className="w-4.5 h-4.5 text-slate-800" />
              </button>

              {/* Farmer Mode Badge Card */}
              <div className="hidden md:flex items-center space-x-2.5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-emerald-200 text-slate-900 shadow-xs">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Leaf className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 tracking-tight leading-tight">Farmer Mode</div>
                  <div className="text-[10px] text-slate-500 font-medium leading-tight">Crop-focused climate insights</div>
                </div>
              </div>

            </div>

          </div>

          {/* Header Content Bottom Left */}
          <div className="relative z-10 space-y-2 mt-4 sm:mt-6">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-xs">
              {lang === 'ta' ? 'காலை வணக்கம், புகழ்! 🌱' : 'Good morning, Pughal! 🌱'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-100 font-medium drop-shadow-xs">
              {lang === 'ta' ? 'உங்கள் பகுதிக்கான காலநிலை மற்றும் பண்ணைத் தகவல்கள் இதோ.' : 'Here is the climate and farm information for your area.'}
            </p>

            {/* Location Pill & Change Location Button */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1.5">
              
              {/* Location Pill */}
              <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-slate-900 text-xs font-bold shadow-xs">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{userGeoStatus.locationText || `${selectedLocation.name}, ${selectedLocation.district}`}</span>
                <span className="flex items-center space-x-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg border border-emerald-200 text-[10px] font-bold">
                  <Crosshair className="w-3 h-3 text-emerald-600 animate-pulse" />
                  <span>Using your current location</span>
                </span>
              </div>

              {/* Change Location Button */}
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

        {/* ROW 1 CARDS (3 COLUMNS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* CARD 1: TODAY'S CLIMATE STATUS */}
          <div className="bg-gradient-to-br from-red-50/90 via-pink-50/30 to-white border border-red-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-red-100/80 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                    <Sun className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">Today's Climate Status</h3>
                </div>
                <button onClick={() => setShowSourceModal(true)} title="Source explanation" className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <Info className="w-4 h-4" />
                </button>
              </div>

              {/* Large Risk Badge & Title */}
              <div className="flex items-center space-x-3 my-3">
                <div className="w-12 h-12 rounded-2xl bg-red-100 border border-red-200 flex items-center justify-center shrink-0">
                  <Sun className="w-7 h-7 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-black text-red-600 tracking-tight">High Risk</div>
                  <p className="text-xs text-slate-600 font-medium leading-snug">
                    High temperature and low rainfall conditions are affecting your area.
                  </p>
                </div>
              </div>
            </div>

            {/* 3 Metric Boxes */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-red-100 text-center space-y-0.5">
                <div className="flex items-center justify-center text-slate-500 space-x-1">
                  <Thermometer className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-[10px] font-bold">Temperature</span>
                </div>
                <div className="text-xs font-black text-red-600">Above normal</div>
                <div className="text-[10px] font-bold text-slate-700">{selectedLocation.anomalies.tempAnomaly}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-red-100 text-center space-y-0.5">
                <div className="flex items-center justify-center text-slate-500 space-x-1">
                  <CloudRain className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-[10px] font-bold">Rainfall</span>
                </div>
                <div className="text-xs font-black text-red-600">Below normal</div>
                <div className="text-[10px] font-bold text-slate-700">{selectedLocation.anomalies.rainAnomaly}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-red-100 text-center space-y-0.5">
                <div className="flex items-center justify-center text-slate-500 space-x-1">
                  <Droplets className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-[10px] font-bold">Water</span>
                </div>
                <div className="text-xs font-black text-red-600">Decreasing</div>
                <div className="text-[10px] font-bold text-slate-700">{selectedLocation.anomalies.waterAvailability}</div>
              </div>
            </div>

          </div>

          {/* CARD 2: MY CROP */}
          <div className="bg-gradient-to-br from-emerald-50/70 via-green-50/30 to-white border border-emerald-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between border-b border-emerald-100/80 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">My Crop</h3>
                </div>
                <button onClick={() => setShowCropModal(true)} title="Crop info" className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <Info className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center space-x-4 my-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100/90 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 shadow-xs">
                  <Wheat className="w-8 h-8 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900">{selectedCrop}</h4>
                  <p className="text-xs text-slate-500 font-medium">Active Crop Selected</p>
                </div>
              </div>
            </div>

            {/* Change Crop Button */}
            <button
              onClick={() => setShowCropModal(true)}
              className="w-full py-2.5 rounded-xl bg-white border border-blue-200 hover:bg-blue-50 text-blue-700 text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer z-10"
            >
              <span>Change Crop</span>
              <ChevronRight className="w-4 h-4 text-blue-600" />
            </button>

            {/* Decorative Wheat Stalks at Bottom Right */}
            <div className="absolute -bottom-2 -right-2 opacity-15 pointer-events-none">
              <Wheat className="w-24 h-24 text-emerald-800" />
            </div>
          </div>

          {/* CARD 3: CURRENT ALERT */}
          <div className="bg-gradient-to-br from-amber-50/90 via-yellow-50/30 to-white border border-amber-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-amber-100/80 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">Current Alert</h3>
                </div>
                
                {/* Monitoring Badge */}
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
                  Prepare water for essential farming needs and follow local advisories.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => navigate('/people/alerts')}
                className="w-8 h-8 rounded-full bg-white border border-amber-200 flex items-center justify-center text-slate-700 hover:bg-amber-100 transition cursor-pointer shadow-xs"
              >
                <ChevronRight className="w-4 h-4 text-slate-800" />
              </button>
            </div>

          </div>

        </div>

        {/* ROW 2 CARDS (2 COLUMNS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* CARD 1: FARM WATER STATUS */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 relative overflow-hidden min-h-[220px]">
            
            {/* Background Image of Lake / Dry Reservoir on Right */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none rounded-r-2xl">
              <img 
                src={farmWaterReservoir} 
                alt="Water reservoir dry soil" 
                className="w-full h-full object-cover object-right opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
            </div>

            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">Farm Water Status</h3>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-[10px] flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span>Low</span>
                </span>
              </div>

              <p className="text-xs text-slate-700 font-bold max-w-sm">
                Water availability is lower than normal in your area.
              </p>
            </div>

            {/* Blue Callout Box: Irrigation Advice */}
            <div className="relative z-10 bg-blue-50/95 backdrop-blur-md border border-blue-200/80 rounded-xl p-3.5 flex items-center justify-between space-x-3 shadow-xs">
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">Irrigation Advice</div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed mt-0.5">
                    {cropAdvisories.irrigationAdvice}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => handleAskAi(`Irrigation schedule for ${selectedCrop}`)}
                className="text-slate-400 hover:text-blue-700 shrink-0 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-blue-600" />
              </button>
            </div>

          </div>

          {/* CARD 2: WEATHER & CLIMATE OUTLOOK */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                    <Sun className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">Weather & Climate Outlook</h3>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">Based on current climate signals</span>
              </div>
            </div>

            {/* 4 Forecast Timeline Items */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              
              {/* Today */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
                <div className="text-[11px] font-bold text-slate-500">Today</div>
                <div className="w-8 h-8 rounded-full bg-amber-100 mx-auto flex items-center justify-center text-amber-600">
                  <Sun className="w-5 h-5" />
                </div>
                <div className="text-xs font-black text-red-600">Hot</div>
                <div className="text-[10px] text-slate-500 font-semibold">34°C - 38°C</div>
              </div>

              {/* Tomorrow */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
                <div className="text-[11px] font-bold text-slate-500">Tomorrow</div>
                <div className="w-8 h-8 rounded-full bg-red-100 mx-auto flex items-center justify-center text-red-600">
                  <Flame className="w-5 h-5" />
                </div>
                <div className="text-xs font-black text-red-600">Very Hot</div>
                <div className="text-[10px] text-slate-500 font-semibold">35°C - 39°C</div>
              </div>

              {/* Next 3 Days */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
                <div className="text-[11px] font-bold text-slate-500">Next 3 Days</div>
                <div className="w-8 h-8 rounded-full bg-blue-100 mx-auto flex items-center justify-center text-blue-600">
                  <Droplets className="w-5 h-5" />
                </div>
                <div className="text-xs font-black text-slate-900 leading-tight">Water stress may increase ↑</div>
                <div className="text-[10px] text-slate-500 font-semibold">Low rainfall expected</div>
              </div>

              {/* Next 7 Days */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
                <div className="text-[11px] font-bold text-slate-500">Next 7 Days</div>
                <div className="w-8 h-8 rounded-full bg-slate-200 mx-auto flex items-center justify-center text-slate-600">
                  <CloudRain className="w-5 h-5" />
                </div>
                <div className="text-xs font-black text-slate-900 leading-tight">Rainfall below normal</div>
                <div className="text-[10px] text-slate-500 font-semibold">Lower than usual</div>
              </div>

            </div>

          </div>

        </div>

        {/* ROW 3 CARDS (3 COLUMNS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* CARD 1: CROP RISK FOR YOUR AREA */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">Crop Risk for Your Area</h3>
                </div>
                <button onClick={() => setShowCropModal(true)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <Info className="w-4 h-4" />
                </button>
              </div>

              {/* 3 Risk Bar Cards */}
              <div className="grid grid-cols-3 gap-2 my-3 text-xs">
                
                {/* Water Stress */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
                  <div className="flex items-center justify-center space-x-1 text-slate-500">
                    <Droplets className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-[10px] font-bold">Water Stress</span>
                  </div>
                  <div className="text-xs font-black text-red-600">{cropAdvisories.waterStressLevel}</div>
                  <p className="text-[10px] text-slate-500 leading-tight">Low rainfall and reduced water.</p>
                </div>

                {/* Heat Stress */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
                  <div className="flex items-center justify-center space-x-1 text-slate-500">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[10px] font-bold">Heat Stress</span>
                  </div>
                  <div className="text-xs font-black text-amber-600">{cropAdvisories.heatSensitivity}</div>
                  <p className="text-[10px] text-slate-500 leading-tight">Higher temp may affect growth.</p>
                </div>

                {/* Rainfall Risk */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
                  <div className="flex items-center justify-center space-x-1 text-slate-500">
                    <CloudRain className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-[10px] font-bold">Rainfall Risk</span>
                  </div>
                  <div className="text-xs font-black text-amber-600">Moderate</div>
                  <p className="text-[10px] text-slate-500 leading-tight">Rainfall likely below normal.</p>
                </div>

              </div>
            </div>

            {/* Red Concern Box */}
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs flex items-start space-x-2.5">
              <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                !
              </div>
              <div>
                <div className="font-extrabold text-red-900">Main Concern</div>
                <p className="text-slate-700 text-[11px] font-medium leading-relaxed mt-0.5">
                  {cropAdvisories.mainConcern}
                </p>
              </div>
            </div>

          </div>

          {/* CARD 2: ASK NINOSHIELD (AI GUIDANCE) */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">Ask NinoShield</h3>
                    <div className="text-[10px] text-slate-500 font-medium">AI-powered guidance</div>
                  </div>
                </div>
              </div>

              {/* 4 Interactive Quick Chips */}
              <div className="space-y-1.5 my-3 text-xs font-semibold">
                {[
                  `Can I irrigate today?`,
                  `Will it rain this week?`,
                  `Is the heat dangerous for my crop?`,
                  `What should I do now?`
                ].map((qText, i) => (
                  <button
                    key={i}
                    onClick={() => handleAskAi(qText)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-blue-50/80 hover:border-blue-200 text-slate-800 transition flex items-center justify-between text-left cursor-pointer group"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold group-hover:bg-blue-600 group-hover:text-white transition">
                        +
                      </div>
                      <span>{qText}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
                  </button>
                ))}
              </div>
            </div>

            {/* Blue Primary Button */}
            <button
              onClick={() => handleAskAi(`General crop guidance for ${selectedCrop}`)}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>Ask NinoShield →</span>
            </button>

          </div>

          {/* CARD 3: SEE SOMETHING ON YOUR FARM? */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">See Something on Your Farm?</h3>
                    <div className="text-[10px] text-slate-500 font-medium">Report local conditions to help your community and improve climate insights.</div>
                  </div>
                </div>
              </div>

              {/* 4 Quick Category Chips */}
              <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                {[
                  { label: 'Water shortage', icon: Droplets, color: 'text-blue-600' },
                  { label: 'Crop problem', icon: Wheat, color: 'text-amber-600' },
                  { label: 'Heavy rainfall', icon: CloudRain, color: 'text-blue-500' },
                  { label: 'Other issue', icon: Leaf, color: 'text-emerald-600' }
                ].map(item => {
                  const IconComp = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        setReportCategory(item.label);
                        setShowReportModal(true);
                      }}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-emerald-50/80 hover:border-emerald-200 text-slate-800 font-bold transition flex flex-col items-center justify-center space-y-1 cursor-pointer text-center"
                    >
                      <IconComp className={`w-5 h-5 ${item.color}`} />
                      <span className="text-[11px]">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Green Primary Button */}
            <button
              onClick={() => setShowReportModal(true)}
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Report Farm Condition →</span>
            </button>

          </div>

        </div>

      </main>

      {/* MODAL 1: CROP SELECTOR MODAL */}
      {showCropModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowCropModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Wheat className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Select Your Farm Crop</h3>
                <p className="text-xs text-slate-500">Choosing your crop customizes irrigation &amp; risk advisories.</p>
              </div>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {supportedCrops.map(cropItem => (
                <div
                  key={cropItem}
                  onClick={() => {
                    changeCrop(cropItem);
                    setShowCropModal(false);
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition ${selectedCrop === cropItem ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}
                >
                  <div className="flex items-center space-x-3">
                    <Wheat className={`w-5 h-5 ${selectedCrop === cropItem ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-extrabold">{cropItem}</span>
                  </div>

                  {selectedCrop === cropItem && (
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowCropModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: CHANGE LOCATION MODAL */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowLocationModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Change Farm Location</h3>
                <p className="text-xs text-slate-500">Select a district to update climate risks &amp; forecasts.</p>
              </div>
            </div>

            {/* Auto Browser Geolocation Button */}
            <button
              onClick={() => {
                requestBrowserLocation();
                setShowLocationModal(false);
              }}
              className="w-full py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 font-bold text-xs flex items-center justify-center space-x-2 cursor-pointer transition shadow-xs"
            >
              <Crosshair className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>📍 Detect My Current Browser Location</span>
            </button>

            {/* Search Input */}
            <input
              type="text"
              value={locationSearchQuery}
              onChange={(e) => setLocationSearchQuery(e.target.value)}
              placeholder="Search district name..."
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
            />

            {/* Location List */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {filteredLocations.map(loc => (
                <div
                  key={loc.id}
                  onClick={() => {
                    changeLocation(loc.id);
                    setShowLocationModal(false);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition ${selectedLocation.id === loc.id ? 'bg-blue-50 border-blue-600' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
                >
                  <div>
                    <div className="font-extrabold text-xs text-slate-900">{loc.name}</div>
                    <div className="text-[10px] text-slate-500">{loc.district}</div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${loc.overallRisk >= 75 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'}`}>
                    Risk: {loc.overallRisk}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* MODAL 3: FARM CONDITION REPORT MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowReportModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Report Farm Condition</h3>
                <p className="text-xs text-slate-500">Alert community members &amp; district agricultural officers.</p>
              </div>
            </div>

            {reportSuccess ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2 text-emerald-900">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <div className="font-extrabold text-sm">Farm Condition Report Submitted!</div>
                <p className="text-xs text-slate-600">Your observation has been shared into NinoShield local signal intelligence.</p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Observation Category</label>
                  <select
                    value={reportCategory}
                    onChange={(e) => setReportCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Water shortage">Water shortage</option>
                    <option value="Crop problem">Crop problem</option>
                    <option value="Heavy rainfall">Heavy rainfall</option>
                    <option value="Other issue">Other issue</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Details / Field Notes</label>
                  <textarea
                    rows={3}
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    placeholder={`Describe crop condition in your ${selectedCrop} plot (e.g. Irrigation channel water levels dropped 30% this week)...`}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                {/* Optional Photo Attachment */}
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Attach Farm Photo (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setReportImagePreview(URL.createObjectURL(file));
                      }
                    }}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-600 cursor-pointer"
                  />
                  {reportImagePreview && (
                    <img src={reportImagePreview} alt="Preview" className="w-full h-24 object-cover rounded-xl mt-2 border border-slate-200" />
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition cursor-pointer"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* MODAL 4: ASK NINOSHIELD AI GUIDANCE MODAL */}
      {showAiModal && aiResponse && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 relative text-xs">
            <button
              onClick={() => setShowAiModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">{aiResponse.title}</h3>
                <p className="text-[11px] text-blue-600 font-bold">Query: "{aiResponse.question}"</p>
              </div>
            </div>

            <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 space-y-1 text-slate-900 font-medium leading-relaxed">
              <div className="font-extrabold text-xs text-blue-900">AI Summary:</div>
              <p>{aiResponse.summary}</p>
            </div>

            <div className="space-y-2">
              {aiResponse.details.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-0.5">
                  <div className="font-bold text-slate-900">{item.topic}</div>
                  <p className="text-slate-600 text-[11px]">{item.advice}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAiModal(false)}
              className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-xl cursor-pointer"
            >
              Close Guidance
            </button>
          </div>
        </div>
      )}

      {/* MODAL 5: DATA SOURCE EXPLANATION MODAL */}
      {showSourceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 relative text-xs">
            <button
              onClick={() => setShowSourceModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Info className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Farmer Risk Calculation Sources</h3>
            </div>

            <p className="text-slate-600 font-medium">
              NinoShield integrates regional and satellite climate signals with local telemetry to project crop-level risks:
            </p>

            <ul className="space-y-2 text-slate-700 font-medium list-disc list-inside">
              <li>ENSO / El Niño Pacific Sea Surface Temperature Anomaly telemetry</li>
              <li>Local thermal observation departure ({selectedLocation.anomalies.tempAnomaly})</li>
              <li>Monsoon rainfall shortfall deficit ({selectedLocation.anomalies.rainAnomaly})</li>
              <li>Local reservoir storage level ({selectedLocation.anomalies.waterAvailability})</li>
              <li>Crop-specific thermal &amp; moisture vulnerability thresholds for {selectedCrop}</li>
              <li>Crowdsourced farm condition reports in {selectedLocation.name}</li>
            </ul>

            <button
              onClick={() => setShowSourceModal(false)}
              className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-xl cursor-pointer"
            >
              Close Explanation
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
