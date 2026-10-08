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
  HelpCircle
} from 'lucide-react';

export default function CommunityDashboard({ onNavigateLanding, onSwitchPersonMode }) {
  const {
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex">
      
      {/* 1. LEFT SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between shrink-0 hidden lg:flex sticky top-0 h-screen">
        <div className="space-y-6">
          
          {/* Logo Header */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onNavigateLanding}>
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-base text-slate-900 tracking-tight">NinoShield</div>
              <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Community Portal</div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => navigate('/community')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition cursor-pointer ${isMainDashboard ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => navigate('/community/risk')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition cursor-pointer ${isRiskPage ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Community Risk</span>
            </button>

            <button
              onClick={() => handleAskAi("Community alerts")}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span>Alerts</span>
            </button>

            <button
              onClick={() => navigate('/community/risk')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition cursor-pointer ${isRiskPage ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Shield className="w-4 h-4" />
              <span>Community Map</span>
            </button>

            <button
              onClick={() => navigate('/community/actions')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition cursor-pointer ${isActionsPage ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>Action Plan</span>
            </button>

            <button
              onClick={() => navigate('/community/reports')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition cursor-pointer ${isReportsPage ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <FileText className="w-4 h-4" />
              <span>Reports ({userReports.length})</span>
            </button>

            <button
              onClick={() => handleAskAi("Community action plan")}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask AI</span>
            </button>
          </nav>

        </div>

        {/* Bottom Switch Mode Button */}
        <button
          onClick={onSwitchPersonMode}
          className="w-full flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-blue-600" />
            <span>Switch to Person Mode</span>
          </div>
          <ChevronRight className="w-4 h-4" />
        </button>
      </aside>

      {/* 2. MAIN VIEW AREA */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-6xl mx-auto space-y-6">

        {/* HEADER BANNER */}
        <HeaderBanner
          title={`${selectedLocation.name} Community`}
          subtitle="Prepare together for a climate-resilient neighborhood."
          mode="community"
          onOpenLocationModal={() => setShowLocationModal(true)}
        />

        {/* PRIMARY QUESTION BANNER */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <div className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Primary Question</div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                "How prepared is our community?"
              </h2>
            </div>
          </div>
          <span className="hidden sm:inline-block text-xs font-bold px-3 py-1 bg-white rounded-md border border-emerald-200 text-emerald-800">
            Current Risk: {selectedLocation.overallRisk}/100
          </span>
        </div>

        {/* SUB-PAGES OR MAIN DASHBOARD */}
        {isRiskPage ? (
          /* SUB-PAGE: COMMUNITY MAP */
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/community')} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-extrabold text-slate-900">Community Risk Map</h2>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
              <RealInteractiveMap height="500px" />
            </div>
          </div>
        ) : isReportsPage ? (
          /* SUB-PAGE: COMMUNITY REPORTS */
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/community')} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-extrabold text-slate-900">Community Signals Feed</h2>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold text-slate-900">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
                  <div className="text-slate-600">Water Shortage</div>
                  <div className="text-lg font-black text-blue-600 mt-1">{reportCounts.water}</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-center">
                  <div className="text-slate-600">Extreme Heat</div>
                  <div className="text-lg font-black text-red-600 mt-1">{reportCounts.heat}</div>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-center">
                  <div className="text-slate-600">Crop Problems</div>
                  <div className="text-lg font-black text-amber-600 mt-1">{reportCounts.crop}</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-center">
                  <div className="text-slate-600">Heavy Rainfall</div>
                  <div className="text-lg font-black text-purple-600 mt-1">{reportCounts.rain}</div>
                </div>
              </div>

              <div className="space-y-2">
                {userReports.map(rep => (
                  <div key={rep.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
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
        ) : isActionsPage ? (
          /* SUB-PAGE: ACTION PLAN */
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/community')} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-extrabold text-slate-900">Community Action Plan</h2>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="text-sm font-bold text-slate-900">Overall Readiness Rating</div>
                <div className="text-base font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                  {communityReadinessScore}% Ready
                </div>
              </div>

              <div className="space-y-2.5 text-xs font-semibold">
                {communityTasks.map(task => (
                  <label
                    key={task.id}
                    className={`flex items-start space-x-3 p-3.5 rounded-lg border cursor-pointer transition ${task.completed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'}`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleCommunityTask(task.id)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 mt-0.5"
                    />
                    <div>
                      <div className="font-bold text-slate-900">{task.name}</div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{task.category} PREPAREDNESS</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* MAIN COMMUNITY DASHBOARD */
          <div className="space-y-6">
            
            {/* 1. COMMUNITY READINESS SCORE */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm text-slate-900">COMMUNITY READINESS</h3>
                <span className="text-xs text-slate-500 font-medium">Updated Real-Time</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                
                {/* Score Circle */}
                <div className="w-24 h-24 rounded-full border-4 border-emerald-600 flex flex-col items-center justify-center shrink-0 bg-emerald-50 shadow-inner">
                  <span className="text-2xl font-black text-emerald-700">{communityReadinessScore}%</span>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">READY</span>
                </div>

                {/* Readiness Breakdown Bars */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-xs font-semibold">
                  
                  <div>
                    <div className="flex justify-between text-slate-700 mb-1">
                      <span>Water</span>
                      <span className="font-bold text-emerald-700">80%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full w-[80%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-700 mb-1">
                      <span>Health</span>
                      <span className="font-bold text-amber-600">60%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[60%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-700 mb-1">
                      <span>Emergency</span>
                      <span className="font-bold text-amber-600">55%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[55%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-700 mb-1">
                      <span>Communication</span>
                      <span className="font-bold text-emerald-700">78%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full w-[78%]" />
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* 2. COMMUNITY RISK MAP */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm text-slate-900">COMMUNITY RISK MAP</h3>
                <button
                  onClick={() => navigate('/community/risk')}
                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  View Full Map →
                </button>
              </div>

              <RealInteractiveMap height="320px" />
            </div>

            {/* 3. COMMUNITY SIGNALS */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm text-slate-900">COMMUNITY SIGNALS</h3>
                <button onClick={() => navigate('/community/reports')} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                  View Reports Feed →
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold">
                
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-center space-y-1">
                  <div className="text-slate-600">Water Shortage</div>
                  <div className="text-xl font-black text-blue-600">{reportCounts.water}</div>
                  <div className="text-[10px] text-slate-400">reports</div>
                </div>

                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-center space-y-1">
                  <div className="text-slate-600">Extreme Heat</div>
                  <div className="text-xl font-black text-red-600">{reportCounts.heat}</div>
                  <div className="text-[10px] text-slate-400">reports</div>
                </div>

                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-center space-y-1">
                  <div className="text-slate-600">Crop Problems</div>
                  <div className="text-xl font-black text-amber-600">{reportCounts.crop}</div>
                  <div className="text-[10px] text-slate-400">reports</div>
                </div>

                <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 text-center space-y-1">
                  <div className="text-slate-600">Heavy Rainfall</div>
                  <div className="text-xl font-black text-purple-600">{reportCounts.rain}</div>
                  <div className="text-[10px] text-slate-400">reports</div>
                </div>

              </div>
            </div>

            {/* 4. VULNERABLE GROUPS & COMMUNITY RESOURCES */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* VULNERABLE GROUPS */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-sm text-slate-900">VULNERABLE GROUPS</h3>
                  <span className="text-xs text-slate-500 font-medium">Aggregated Count</span>
                </div>

                <div className="space-y-2 text-xs font-semibold">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="flex items-center space-x-2 text-slate-800">
                      <User className="w-4 h-4 text-purple-600" />
                      <span>Elderly people</span>
                    </span>
                    <span className="font-black text-slate-900">120</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="flex items-center space-x-2 text-slate-800">
                      <User className="w-4 h-4 text-amber-600" />
                      <span>Children</span>
                    </span>
                    <span className="font-black text-slate-900">185</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="flex items-center space-x-2 text-slate-800">
                      <Sprout className="w-4 h-4 text-emerald-600" />
                      <span>Smallholder farmers</span>
                    </span>
                    <span className="font-black text-slate-900">310</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="flex items-center space-x-2 text-slate-800">
                      <User className="w-4 h-4 text-blue-600" />
                      <span>Outdoor workers</span>
                    </span>
                    <span className="font-black text-slate-900">240</span>
                  </div>
                </div>
              </div>

              {/* COMMUNITY RESOURCES */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-sm text-slate-900">COMMUNITY RESOURCES</h3>
                  <span className="text-xs text-slate-500 font-medium">Stock Status</span>
                </div>

                <div className="space-y-2 text-xs font-semibold">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="flex items-center space-x-2 text-slate-800">
                      <Droplets className="w-4 h-4 text-blue-600" />
                      <span>Water tanks</span>
                    </span>
                    <span className="font-bold text-emerald-700">3 available</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="flex items-center space-x-2 text-slate-800">
                      <Cross className="w-4 h-4 text-red-500" />
                      <span>Medical centres</span>
                    </span>
                    <span className="font-bold text-emerald-700">1 nearby</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="flex items-center space-x-2 text-slate-800">
                      <Home className="w-4 h-4 text-amber-500" />
                      <span>Safe shelters</span>
                    </span>
                    <span className="font-bold text-slate-900">2 operational</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="flex items-center space-x-2 text-slate-800">
                      <Ambulance className="w-4 h-4 text-red-600" />
                      <span>Emergency vehicles</span>
                    </span>
                    <span className="font-bold text-slate-900">1 unit</span>
                  </div>
                </div>
              </div>

            </div>

            {/* 5. COMMUNITY ACTION PLAN */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm text-slate-900">COMMUNITY ACTION PLAN</h3>
                <button onClick={() => navigate('/community/actions')} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                  Manage Tasks →
                </button>
              </div>

              <div className="space-y-2.5 text-xs font-semibold">
                {communityTasks.slice(0, 4).map(task => (
                  <label
                    key={task.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition ${task.completed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'}`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleCommunityTask(task.id)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 mt-0.5"
                    />
                    <div>
                      <div className="font-bold text-slate-900">{task.name}</div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{task.category} PREPAREDNESS</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* LOCATION SELECTOR MODAL */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200 relative">
            <button
              onClick={() => setShowLocationModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-md bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-slate-900">Select Community Region</h3>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {locations.map(loc => (
                <div
                  key={loc.id}
                  onClick={() => {
                    changeLocation(loc.id);
                    setShowLocationModal(false);
                  }}
                  className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between transition ${selectedLocation.id === loc.id ? 'bg-emerald-50 border-emerald-600' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
                >
                  <div>
                    <div className="font-bold text-xs text-slate-900">{loc.name}</div>
                    <div className="text-[11px] text-slate-500">{loc.district}</div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${loc.overallRisk >= 75 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'}`}>
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
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200 relative text-xs">
            <button
              onClick={() => setShowAiModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-md bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Bot className="w-4 h-4 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">Community AI Advisor</h3>
            </div>

            <p className="text-slate-700 font-medium">{aiAnalysis.summary}</p>

            <div className="space-y-2">
              {aiAnalysis.recommendations.map((rec, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>{rec.category}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">{rec.priority}</span>
                  </div>
                  <p className="text-slate-800 font-medium">{rec.action}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAiModal(false)}
              className="w-full py-2 bg-emerald-600 text-white font-bold rounded-lg cursor-pointer"
            >
              Close Advisor
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
