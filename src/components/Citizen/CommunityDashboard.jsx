import React, { useState } from 'react';
import { useNinoShield } from '../../context/NinoShieldContext';
import HeaderBanner from '../Layout/HeaderBanner';
import RealInteractiveMap from '../Map/RealInteractiveMap';
import { 
  Home, 
  MapPin, 
  Bell, 
  ShieldCheck, 
  PlusCircle, 
  MessageSquare, 
  Globe, 
  ChevronRight, 
  Sun, 
  CloudRain, 
  Droplets, 
  Thermometer, 
  AlertTriangle, 
  Calendar, 
  Bot, 
  Megaphone, 
  User, 
  Info, 
  X, 
  Send, 
  Users, 
  Map as MapIcon, 
  Package, 
  ClipboardList, 
  FileText, 
  Heart, 
  Shield, 
  Radio, 
  CheckCircle2, 
  Lightbulb, 
  Building2, 
  Ambulance, 
  Cross,
  Leaf,
  Sprout,
  ArrowLeft
} from 'lucide-react';

export default function CommunityDashboard({ onNavigateLanding, onSwitchPersonMode }) {
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
    generateAiRecommendation
  } = useNinoShield();

  // Modals & State
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  // Sub-page route matching
  const isRiskPage = currentRoute === '/community/risk';
  const isReportsPage = currentRoute === '/community/reports';
  const isActionsPage = currentRoute === '/community/actions';
  const isMainDashboard = !isRiskPage && !isReportsPage && !isActionsPage;

  const handleAskAi = (query) => {
    const res = generateAiRecommendation(selectedLocation, query || "Community water & heat preparedness");
    setAiAnalysis(res);
    setShowAiModal(true);
  };

  const reportCounts = {
    water: userReports.filter(r => r.type === 'water' || r.category === 'Water Shortage').length + (selectedLocation.communityReports?.waterShortage || 24),
    heat: userReports.filter(r => r.type === 'heat' || r.category === 'Extreme Heat').length + (selectedLocation.communityReports?.extremeHeat || 16),
    crop: userReports.filter(r => r.type === 'crop' || r.category === 'Crop Problem').length + (selectedLocation.communityReports?.cropProblem || 12),
    rain: userReports.filter(r => r.type === 'rain' || r.category === 'Heavy Rainfall').length + (selectedLocation.communityReports?.heavyRainfall || 7),
  };

  return (
    <div className="min-h-screen bg-[#F7FAFF] text-[#0B1736] font-sans flex">
      
      {/* 1. LEFT SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-white border-r border-blue-100 p-5 flex flex-col justify-between shrink-0 hidden lg:flex sticky top-0 h-screen">
        <div className="space-y-6">
          
          {/* Logo Header */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onNavigateLanding}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1769FF] to-[#12B886] flex items-center justify-center text-white shadow-md">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-lg text-[#0B1736] tracking-tight">NinoShield</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI-Powered El Niño Early Action</div>
            </div>
          </div>

          {/* Direct Sidebar Navigation Options */}
          <nav className="space-y-1.5 text-xs font-bold">
            <button
              onClick={() => navigate('/community')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl transition ${isMainDashboard ? 'bg-[#EBF3FF] text-[#1769FF]' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => navigate('/community/risk')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl transition ${isRiskPage ? 'bg-[#EBF3FF] text-[#1769FF]' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <MapPin className="w-4 h-4" />
              <span>Community Risk</span>
            </button>

            <button
              onClick={() => handleAskAi("Community alerts")}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-slate-600 hover:bg-slate-50 transition"
            >
              <Bell className="w-4 h-4" />
              <span>Alerts</span>
            </button>

            <button
              onClick={() => navigate('/community/risk')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl transition ${isRiskPage ? 'bg-[#EBF3FF] text-[#1769FF]' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Shield className="w-4 h-4" />
              <span>Community Map</span>
            </button>

            <button
              onClick={() => navigate('/community/actions')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl transition ${isActionsPage ? 'bg-[#EBF3FF] text-[#1769FF]' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>Action Plan</span>
            </button>

            <button
              onClick={() => navigate('/community/reports')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl transition ${isReportsPage ? 'bg-[#EBF3FF] text-[#1769FF]' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <FileText className="w-4 h-4" />
              <span>Reports ({userReports.length})</span>
            </button>

            <button
              onClick={() => handleAskAi("Community water & heat action plan")}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-slate-600 hover:bg-slate-50 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask AI</span>
            </button>
          </nav>

        </div>

        {/* Bottom Switch Mode Button */}
        <button
          onClick={onSwitchPersonMode}
          className="w-full flex items-center justify-between p-3 rounded-2xl bg-blue-50 border border-blue-200 text-xs font-bold text-[#1769FF] hover:bg-blue-100 transition shadow-xs"
        >
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-[#1769FF]" />
            <span>Switch to Person Mode</span>
          </div>
          <ChevronRight className="w-4 h-4" />
        </button>
      </aside>

      {/* 2. MAIN VIEW AREA */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto space-y-6">

        {/* HEADER BANNER */}
        <HeaderBanner
          title={`Good morning!\n👥 ${selectedLocation.name} Community`}
          subtitle="Let's stay prepared together for a safer tomorrow."
          mode="community"
          onOpenLocationModal={() => setShowLocationModal(true)}
        />

        {/* SEPARATE DEDICATED SUB-PAGES */}
        {isRiskPage ? (
          /* SEPARATE PAGE: COMMUNITY RISK MAP */
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/community')} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-black text-[#0B1736]">Community Risk Map & Geographic Hotspots</h2>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-blue-100 shadow-xs space-y-4">
              <RealInteractiveMap height="500px" />
            </div>
          </div>
        ) : isReportsPage ? (
          /* SEPARATE PAGE: COMMUNITY REPORTS */
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/community')} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-black text-[#0B1736]">Recent Community Reports & Signal Feed</h2>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-blue-100 shadow-xs space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold">
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                  <div className="text-2xl">💧</div>
                  <div className="text-slate-600 mt-1">Water Shortage</div>
                  <div className="text-xl font-black text-blue-600">{reportCounts.water} reports</div>
                </div>

                <div className="p-4 bg-red-50 rounded-2xl border border-red-100 text-center">
                  <div className="text-2xl">☀️</div>
                  <div className="text-slate-600 mt-1">Extreme Heat</div>
                  <div className="text-xl font-black text-red-600">{reportCounts.heat} reports</div>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-center">
                  <div className="text-2xl">🌾</div>
                  <div className="text-slate-600 mt-1">Crop Stress</div>
                  <div className="text-xl font-black text-amber-600">{reportCounts.crop} reports</div>
                </div>

                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-center">
                  <div className="text-2xl">🌧️</div>
                  <div className="text-slate-600 mt-1">Heavy Rain Anomaly</div>
                  <div className="text-xl font-black text-purple-600">{reportCounts.rain} reports</div>
                </div>
              </div>

              <div className="space-y-3">
                {userReports.map(rep => (
                  <div key={rep.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-sm text-[#0B1736]">{rep.icon} {rep.category}</span>
                      <span className="text-slate-400">{rep.time}</span>
                    </div>
                    <p className="text-slate-700 font-medium">{rep.desc}</p>
                    <div className="text-blue-600 font-bold">{rep.location}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : isActionsPage ? (
          /* SEPARATE PAGE: COMMUNITY ACTION PLAN */
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/community')} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-black text-[#0B1736]">Community Action Plan & Readiness Tasks</h2>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-blue-100 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="text-base font-extrabold text-[#0B1736]">Community Readiness Score</div>
                  <p className="text-xs text-slate-500">Toggle tasks to update neighborhood climate readiness rating.</p>
                </div>
                <div className="text-2xl font-black text-emerald-700 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200">
                  {communityReadinessScore}% Ready
                </div>
              </div>

              <div className="space-y-3 text-xs font-semibold">
                {communityTasks.map(task => (
                  <label
                    key={task.id}
                    className={`flex items-start space-x-3 p-4 rounded-2xl border cursor-pointer transition ${task.completed ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'}`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleCommunityTask(task.id)}
                      className="w-5 h-5 text-[#1769FF] rounded focus:ring-blue-500 mt-0.5"
                    />
                    <div>
                      <div className="text-sm font-bold text-[#0B1736]">{task.name}</div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{task.category} PREPAREDNESS</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* DEFAULT: FULL MAIN OVERVIEW DASHBOARD MATCHING REFERENCE IMAGE 1:1 */
          <>
            {/* ROW 1: TOP 3 CARDS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* CARD 1: COMMUNITY CLIMATE STATUS */}
              <div className="lg:col-span-5 bg-[#FFF5F5] rounded-3xl p-5 border border-red-100 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500">⚙️</span>
                    <h3 className="font-extrabold text-sm text-[#0B1736]">Community Climate Status ⓘ</h3>
                  </div>
                  <button
                    onClick={() => handleAskAi("Data sources")}
                    className="px-2.5 py-1 rounded-full bg-blue-50 text-[#1769FF] border border-blue-200 text-[11px] font-bold hover:bg-blue-100 transition"
                  >
                    Source &gt;
                  </button>
                </div>

                <div className="flex items-center space-x-4 pt-1">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-red-500 flex items-center justify-center text-white text-2xl shadow-md shrink-0">
                    ☀️
                  </div>
                  <div>
                    <div className="text-2xl font-black text-red-600 tracking-tight">HIGH RISK</div>
                    <p className="text-xs text-slate-600 font-medium leading-snug">
                      High heat and decreasing water availability may affect the community in the coming days.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold pt-1">
                  <div className="bg-white/80 p-2 rounded-2xl border border-red-100">
                    <div className="text-base">🌡️</div>
                    <div className="text-slate-500 text-[10px]">Heat</div>
                    <div className="text-red-600">High</div>
                  </div>

                  <div className="bg-white/80 p-2 rounded-2xl border border-red-100">
                    <div className="text-base">💧</div>
                    <div className="text-slate-500 text-[10px]">Water</div>
                    <div className="text-red-600">High</div>
                  </div>

                  <div className="bg-white/80 p-2 rounded-2xl border border-red-100">
                    <div className="text-base">🌧️</div>
                    <div className="text-slate-500 text-[10px]">Rainfall</div>
                    <div className="text-amber-600">Moderate</div>
                  </div>

                  <div className="bg-white/80 p-2 rounded-2xl border border-red-100">
                    <div className="text-base">🌾</div>
                    <div className="text-slate-500 text-[10px]">Agriculture</div>
                    <div className="text-red-600">High</div>
                  </div>
                </div>
              </div>

              {/* CARD 2: CURRENT COMMUNITY ALERT */}
              <div className="lg:col-span-3 bg-[#FFFBF0] rounded-3xl p-5 border border-amber-200/80 shadow-xs flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1.5 text-amber-700 font-bold text-xs">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span>Current Community Alert</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold border border-amber-200">
                      ● Monitoring
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-amber-800 font-black text-sm pt-1">
                    <Megaphone className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Water Stress Alert</span>
                  </div>
                  <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                    Water availability in your area may decrease in the coming days.
                  </p>
                </div>

                <div className="bg-amber-100/60 p-2.5 rounded-2xl border border-amber-200 text-xs text-amber-900 font-semibold space-y-1">
                  <div className="flex items-center space-x-1 text-[11px] font-bold">
                    <Users className="w-3.5 h-3.5 text-amber-700" />
                    <span>Recommended community action</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-tight">
                    Check shared water sources, prepare additional water storage and follow local advisories.
                  </p>
                </div>
              </div>

              {/* CARD 3: COMMUNITY READINESS */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-sm text-[#0B1736]">Community Readiness ⓘ</h3>
                </div>

                <div className="flex items-center space-x-4 pt-1">
                  <div className="w-20 h-20 rounded-full border-4 border-emerald-500 flex flex-col items-center justify-center shrink-0 bg-emerald-50 shadow-inner">
                    <span className="text-xl font-black text-emerald-700">{communityReadinessScore}%</span>
                    <span className="text-[9px] font-bold text-emerald-800 uppercase">Ready</span>
                  </div>

                  <div className="flex-1 space-y-1.5 text-[11px]">
                    <div>
                      <div className="flex justify-between font-bold text-slate-700">
                        <span>💧 Water preparedness</span>
                        <span>80%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[80%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold text-slate-700">
                        <span>🏥 Health preparedness</span>
                        <span>60%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-[60%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold text-slate-700">
                        <span>🚨 Emergency preparedness</span>
                        <span>55%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-[55%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold text-slate-700">
                        <span>📣 Communication</span>
                        <span>78%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[78%]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-2.5 rounded-2xl border border-blue-100 text-[11px] text-blue-900 font-medium leading-tight">
                  💡 Your community is moderately prepared. Water and emergency preparedness need attention.
                </div>
              </div>

            </div>

            {/* ROW 2: MIDDLE 3-COLUMN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* 1. COMMUNITY RISK MAP */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-sm text-[#0B1736]">Community Risk Map ⓘ</h3>
                  <button
                    onClick={() => navigate('/community/risk')}
                    className="text-xs font-bold text-[#1769FF] hover:underline"
                  >
                    View Full Map →
                  </button>
                </div>

                <RealInteractiveMap height="320px" />
              </div>

              {/* 2. VULNERABLE GROUPS IN OUR COMMUNITY */}
              <div className="lg:col-span-3.5 lg:col-span-3 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-sm text-[#0B1736]">Vulnerable Groups ⓘ</h3>
                </div>

                <div className="space-y-2.5 text-xs font-semibold">
                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-purple-600" />
                      <span>Elderly people</span>
                    </span>
                    <span className="font-black text-[#0B1736]">120</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-orange-500" />
                      <span>Children</span>
                    </span>
                    <span className="font-black text-[#0B1736]">185</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-blue-500" />
                      <span>People with disabilities</span>
                    </span>
                    <span className="font-black text-[#0B1736]">40</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="flex items-center space-x-2">
                      <Sprout className="w-4 h-4 text-emerald-600" />
                      <span>Farmers</span>
                    </span>
                    <span className="font-black text-[#0B1736]">310</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-amber-600" />
                      <span>Outdoor workers</span>
                    </span>
                    <span className="font-black text-[#0B1736]">240</span>
                  </div>
                </div>
              </div>

              {/* 3. COMMUNITY RESOURCES */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-sm text-[#0B1736]">Community Resources ⓘ</h3>
                </div>

                <div className="space-y-2.5 text-xs font-semibold">
                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="flex items-center space-x-2">
                      <Droplets className="w-4 h-4 text-blue-600" />
                      <span>Water tanks</span>
                    </span>
                    <span className="font-extrabold text-emerald-600">3 available</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="flex items-center space-x-2">
                      <Cross className="w-4 h-4 text-red-500" />
                      <span>Medical centre</span>
                    </span>
                    <span className="font-extrabold text-emerald-600">1 nearby</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="flex items-center space-x-2">
                      <Home className="w-4 h-4 text-amber-500" />
                      <span>Safe shelters</span>
                    </span>
                    <span className="font-black text-[#0B1736]">2</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="flex items-center space-x-2">
                      <Ambulance className="w-4 h-4 text-red-600" />
                      <span>Emergency vehicle</span>
                    </span>
                    <span className="font-black text-[#0B1736]">1</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-purple-600" />
                      <span>Emergency kits</span>
                    </span>
                    <span className="font-black text-[#0B1736]">14</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ROW 3: BOTTOM 3-COLUMN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* 1. RECENT COMMUNITY REPORTS */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-sm text-[#0B1736]">Recent Community Reports</h3>
                  <button onClick={() => navigate('/community/reports')} className="text-xs font-bold text-[#1769FF] hover:underline">
                    View All →
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-blue-50 rounded-2xl border border-blue-100 text-center space-y-1">
                    <div className="text-base">💧</div>
                    <div className="font-bold text-[#0B1736]">Water shortage</div>
                    <div className="text-[11px] font-black text-blue-600">{reportCounts.water} reports</div>
                  </div>

                  <div className="p-2.5 bg-red-50 rounded-2xl border border-red-100 text-center space-y-1">
                    <div className="text-base">☀️</div>
                    <div className="font-bold text-[#0B1736]">Extreme heat</div>
                    <div className="text-[11px] font-black text-red-600">{reportCounts.heat} reports</div>
                  </div>

                  <div className="p-2.5 bg-amber-50 rounded-2xl border border-amber-100 text-center space-y-1">
                    <div className="text-base">🌾</div>
                    <div className="font-bold text-[#0B1736]">Crop problem</div>
                    <div className="text-[11px] font-black text-amber-600">{reportCounts.crop} reports</div>
                  </div>

                  <div className="p-2.5 bg-purple-50 rounded-2xl border border-purple-100 text-center space-y-1">
                    <div className="text-base">🌧️</div>
                    <div className="font-bold text-[#0B1736]">Heavy rainfall</div>
                    <div className="text-[11px] font-black text-purple-600">{reportCounts.rain} reports</div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 font-semibold space-y-1">
                  <div className="flex items-center space-x-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Water shortage is becoming a strong local signal.</span>
                  </div>
                  <p className="text-[11px] text-emerald-700">Multiple reports have been received from different areas.</p>
                </div>
              </div>

              {/* 2. WHAT MAY HAPPEN NEXT? */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-sm text-[#0B1736]">What May Happen Next? ⓘ</h3>
                  <span className="text-[10px] text-slate-400 font-bold">Based on climate signals</span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs pt-1">
                  <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 space-y-1">
                    <div className="text-[10px] text-slate-400 font-bold">Today</div>
                    <div className="text-base">☀️</div>
                    <div className="font-black text-red-600">Hot</div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 space-y-1">
                    <div className="text-[10px] text-slate-400 font-bold">Tomorrow</div>
                    <div className="text-base">☀️</div>
                    <div className="font-black text-red-600">Very Hot</div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 space-y-1">
                    <div className="text-[10px] text-slate-400 font-bold">Next 3 Days</div>
                    <div className="text-base">💧</div>
                    <div className="font-bold text-blue-600 text-[10px] leading-tight">Water stress may increase</div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 space-y-1">
                    <div className="text-[10px] text-slate-400 font-bold">Next 7 Days</div>
                    <div className="text-base">🌧️</div>
                    <div className="font-bold text-blue-600 text-[10px] leading-tight">Rainfall below normal</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 font-medium pt-2">
                  ⓘ Scenario-based prediction using current climate signals. Not an official forecast.
                </div>
              </div>

              {/* 3. WHAT SHOULD OUR COMMUNITY DO? */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs flex flex-col justify-between space-y-3 relative">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="font-extrabold text-sm text-[#0B1736]">What Should Our Community Do?</h3>
                    <button onClick={() => navigate('/community/actions')} className="text-xs font-bold text-[#1769FF] hover:underline">
                      View All →
                    </button>
                  </div>

                  <div className="space-y-2 text-xs pt-1">
                    <div onClick={() => handleAskAi("Water sources action")} className="p-2.5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-1 cursor-pointer hover:bg-blue-100/60 transition">
                      <div className="flex items-center justify-between font-bold text-[#0B1736]">
                        <span className="flex items-center space-x-1.5">
                          <span>💧</span>
                          <span>Check shared water sources</span>
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] bg-red-100 text-red-700 font-extrabold">HIGH</span>
                      </div>
                      <p className="text-slate-500 text-[11px]">Inspect water tanks and prepare additional storage.</p>
                    </div>

                    <div onClick={() => handleAskAi("Support vulnerable residents")} className="p-2.5 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1 cursor-pointer hover:bg-amber-100/60 transition">
                      <div className="flex items-center justify-between font-bold text-[#0B1736]">
                        <span className="flex items-center space-x-1.5">
                          <span>👥</span>
                          <span>Support vulnerable people</span>
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] bg-red-100 text-red-700 font-extrabold">HIGH</span>
                      </div>
                      <p className="text-slate-500 text-[11px]">Identify and check on elderly residents needing assistance.</p>
                    </div>

                    <div onClick={() => handleAskAi("Health response plan")} className="p-2.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1 cursor-pointer hover:bg-emerald-100/60 transition">
                      <div className="flex items-center justify-between font-bold text-[#0B1736]">
                        <span className="flex items-center space-x-1.5">
                          <span>🏥</span>
                          <span>Prepare health response</span>
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] bg-amber-100 text-amber-800 font-extrabold">MEDIUM</span>
                      </div>
                      <p className="text-slate-500 text-[11px]">Ensure basic medical supplies and support.</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleAskAi("Community action recommendations")}
                  className="px-4 py-2 rounded-full bg-[#1769FF] text-white text-xs font-bold shadow-lg shadow-blue-500/30 flex items-center space-x-2 self-end hover:bg-blue-700 transition"
                >
                  <Bot className="w-4 h-4 text-cyan-200" />
                  <span>Ask NinoShield</span>
                </button>
              </div>

            </div>

          </>
        )}

      </main>

      {/* LOCATION SELECTOR MODAL */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-blue-100 relative">
            <button
              onClick={() => setShowLocationModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-[#0B1736]">Select Community Region</h3>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {locations.map(loc => (
                <div
                  key={loc.id}
                  onClick={() => {
                    changeLocation(loc.id);
                    setShowLocationModal(false);
                  }}
                  className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition ${selectedLocation.id === loc.id ? 'bg-blue-50 border-[#1769FF]' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
                >
                  <div>
                    <div className="font-bold text-xs text-[#0B1736]">{loc.name}</div>
                    <div className="text-[11px] text-slate-500">{loc.district}</div>
                  </div>
                  <span className={`text-xs font-black px-2 py-0.5 rounded ${loc.overallRisk >= 75 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'}`}>
                    Risk: {loc.overallRisk}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI GUIDANCE MODAL */}
      {showAiModal && aiAnalysis && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-blue-100 relative text-xs">
            <button
              onClick={() => setShowAiModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-[#1769FF]" />
              <h3 className="text-lg font-black text-[#0B1736]">Community AI Advisor</h3>
            </div>

            <p className="text-slate-600 font-medium">{aiAnalysis.summary}</p>

            <div className="space-y-2 pt-1">
              {aiAnalysis.recommendations.map((rec, i) => (
                <div key={i} className="p-3 bg-blue-50 rounded-2xl border border-blue-100 space-y-1">
                  <div className="font-bold text-[#0B1736] flex items-center justify-between">
                    <span>{rec.category}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-red-100 text-red-700 font-bold">{rec.priority}</span>
                  </div>
                  <p className="text-slate-800 font-semibold">{rec.action}</p>
                  <p className="text-slate-500 text-[11px]">{rec.reason}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAiModal(false)}
              className="w-full py-2.5 bg-[#1769FF] text-white font-bold rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
