import React, { useState } from 'react';
import { useNinoShield } from '../../context/NinoShieldContext';
import HeaderBanner from '../Layout/HeaderBanner';
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
  Calendar, 
  Bot, 
  User, 
  Info, 
  X, 
  Leaf, 
  Shield, 
  Users, 
  Camera, 
  CheckCircle2, 
  ArrowLeft,
  Activity,
  HelpCircle
} from 'lucide-react';

export default function PeopleDashboard({ onNavigateLanding, onSwitchFarmerMode }) {
  const {
    lang,
    t,
    locations,
    selectedLocation,
    changeLocation,
    currentRoute,
    navigate,
    peopleChecklist,
    togglePeopleChecklist,
    preparedCount,
    totalPreparedCount,
    addReport,
    generateAiRecommendation
  } = useNinoShield();

  // Modals & State
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState(null);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportCategory, setReportCategory] = useState('Water Shortage');
  const [reportDescription, setReportDescription] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  // Sub-Page Routes
  const isAlertsPage = currentRoute === '/people/alerts';
  const isPreparePage = currentRoute === '/people/prepare';
  const isReportPage = currentRoute === '/people/report';
  const isMainDashboard = !isAlertsPage && !isPreparePage && !isReportPage;

  const handleReportSubmit = (category = reportCategory) => {
    addReport({
      category,
      locationId: selectedLocation.id,
      locationName: selectedLocation.name,
      description: reportDescription || `${category} reported by citizen in ${selectedLocation.name}`,
    });

    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setShowReportModal(false);
      setReportDescription('');
      navigate('/people');
    }, 1500);
  };

  const handleAskAiSubmit = (qText) => {
    const query = qText || aiQuestion || "How is the climate risk today?";
    const result = generateAiRecommendation(selectedLocation, query);
    setAiAnalysis(result);
    setShowAiModal(true);
  };

  // Human-readable risk status
  const getRiskLabel = (score) => {
    if (score >= 80) return { text: lang === 'ta' ? 'கடுமையான அபாயம்' : 'CRITICAL', color: 'bg-red-600 text-white', border: 'border-red-600' };
    if (score >= 70) return { text: lang === 'ta' ? 'அதிக அபாயம்' : 'HIGH', color: 'bg-red-500 text-white', border: 'border-red-500' };
    if (score >= 50) return { text: lang === 'ta' ? 'மிதமான அபாயம்' : 'MODERATE', color: 'bg-amber-500 text-white', border: 'border-amber-500' };
    return { text: lang === 'ta' ? 'குறைந்த அபாயம்' : 'LOW', color: 'bg-emerald-600 text-white', border: 'border-emerald-600' };
  };

  const riskBadge = getRiskLabel(selectedLocation.overallRisk);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex">
      
      {/* 1. LEFT SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between shrink-0 hidden lg:flex sticky top-0 h-screen">
        <div className="space-y-6">
          
          {/* Logo Header */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onNavigateLanding}>
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-base text-slate-900 tracking-tight">NinoShield</div>
              <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">People Portal</div>
            </div>
          </div>

          {/* Clean Navigation Items */}
          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => navigate('/people')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition cursor-pointer ${isMainDashboard ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Home className="w-4 h-4" />
              <span>{t.home || "Home"}</span>
            </button>

            <button
              onClick={() => setShowLocationModal(true)}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>My Area ({selectedLocation.name})</span>
            </button>

            <button
              onClick={() => navigate('/people/alerts')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition cursor-pointer ${isAlertsPage ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Bell className="w-4 h-4" />
              <span>{t.alerts || "Alerts"}</span>
            </button>

            <button
              onClick={() => navigate('/people/prepare')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition cursor-pointer ${isPreparePage ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.prepare || "Prepare"}</span>
            </button>

            <button
              onClick={() => navigate('/people/report')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition cursor-pointer ${isReportPage ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.report || "Report"}</span>
            </button>

            <button
              onClick={() => handleAskAiSubmit("Climate guidance for " + selectedLocation.name)}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.askAi || "Ask AI"}</span>
            </button>
          </nav>

        </div>

        {/* Bottom Switch Mode Button */}
        <button
          onClick={onSwitchFarmerMode}
          className="w-full flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>Switch to Farmer Mode</span>
          </div>
          <ChevronRight className="w-4 h-4" />
        </button>
      </aside>

      {/* 2. MAIN VIEW AREA */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-6xl mx-auto space-y-6">

        {/* HEADER BANNER */}
        <HeaderBanner
          title={lang === 'ta' ? 'வணக்கம்!' : 'Good morning!'}
          subtitle={lang === 'ta' ? 'உங்கள் பகுதியின் காலநிலை அபாயத்தை அறிந்து பாதுகாப்பாக தயாராகுங்கள்.' : 'Understand your local risk and know what action to take.'}
          mode="people"
          onOpenLocationModal={() => setShowLocationModal(true)}
        />

        {/* PRIMARY QUESTION BANNER */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <div className="text-xs text-blue-600 font-bold uppercase tracking-wider">Primary Question</div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                "Am I at risk, and what should I do?"
              </h2>
            </div>
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold px-3 py-1 bg-white rounded-md border border-blue-200 text-blue-800">
            {selectedLocation.name} Zone
          </span>
        </div>

        {/* SEPARATE DEDICATED SUB-PAGES */}
        {isAlertsPage ? (
          /* SUB-PAGE: ALERTS */
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/people')} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-extrabold text-slate-900">Safety Alerts & Advisories</h2>
            </div>

            <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>WATER STRESS & HEAT ADVISORY — {selectedLocation.name}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-amber-200 text-amber-900 font-semibold text-xs">
                  Active Notice
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Water availability is decreasing in local reservoirs while daily temperatures remain {selectedLocation.anomalies.tempAnomaly} above normal.
              </p>

              <div className="bg-white rounded-lg p-3 border border-amber-200 space-y-1.5 text-xs text-slate-800 font-medium">
                <div className="font-bold text-slate-900">What you can do:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li>Store clean drinking water for household needs.</li>
                  <li>Avoid direct outdoor activity during peak afternoon heat (12 PM - 3 PM).</li>
                  <li>Check on elderly family members and neighbors.</li>
                </ul>
              </div>
            </div>
          </div>
        ) : isPreparePage ? (
          /* SUB-PAGE: PREPARE CHECKLIST */
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/people')} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-extrabold text-slate-900">Household Readiness Checklist</h2>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="text-sm font-bold text-slate-900">Preparedness Rating</div>
                  <p className="text-xs text-slate-500">Check completed items to improve your household readiness.</p>
                </div>
                <div className="text-lg font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                  {preparedCount} / {totalPreparedCount} Prepared
                </div>
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full transition-all duration-300" style={{ width: `${(preparedCount/totalPreparedCount)*100}%` }} />
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  { key: 'water', label: 'Drinking water available', desc: 'Stored clean drinking water for essential household needs.' },
                  { key: 'medicines', label: 'Important medicines ready', desc: 'First aid kit and basic emergency medications.' },
                  { key: 'contacts', label: 'Emergency contacts saved', desc: 'District helpline (1077) and local health center numbers.' },
                  { key: 'powerbank', label: 'Power bank charged', desc: 'Mobile phone charged for weather advisories.' },
                  { key: 'info', label: 'Local safe shelter info saved', desc: 'Identified nearest hydration and community relief location.' },
                ].map(item => (
                  <label key={item.key} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition">
                    <input
                      type="checkbox"
                      checked={peopleChecklist[item.key]}
                      onChange={() => togglePeopleChecklist(item.key)}
                      className="w-4 h-4 text-emerald-600 rounded mt-0.5 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="font-bold text-slate-900">{item.label}</div>
                      <div className="text-slate-500 font-normal">{item.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ) : isReportPage ? (
          /* SUB-PAGE: REPORT ISSUE */
          <div className="space-y-4 max-w-xl mx-auto">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/people')} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-extrabold text-slate-900">Report an Issue</h2>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4">
              <p className="text-xs text-slate-600">
                Reporting what you observe in your area helps alert community members and district decision-makers.
              </p>

              {reportSuccess ? (
                <div className="p-6 bg-emerald-50 rounded-lg border border-emerald-200 text-center space-y-2 text-emerald-900">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="font-bold text-sm">Report Submitted Successfully</div>
                  <p className="text-xs text-slate-600">Your observation has been logged in community signal intelligence.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleReportSubmit(); }} className="space-y-4 text-xs font-semibold">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Issue Category</label>
                    <select
                      value={reportCategory}
                      onChange={(e) => setReportCategory(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="Water Shortage">Water Shortage</option>
                      <option value="Extreme Heat">Extreme Heat</option>
                      <option value="Crop Problem">Crop Problem</option>
                      <option value="Heavy Rainfall">Heavy Rainfall</option>
                      <option value="Flooding">Flooding</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Description & Location Details</label>
                    <textarea
                      rows={3}
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      placeholder="Describe what you observed (e.g. Ward 4 municipal tap dry for 2 consecutive days)..."
                      className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => navigate('/people')}
                      className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
                    >
                      Submit Report
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        ) : (
          /* MAIN SIMPLE PEOPLE DASHBOARD */
          <div className="space-y-6">
            
            {/* 1. YOUR AREA RIGHT NOW */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <h3 className="font-extrabold text-sm text-slate-900">YOUR AREA RIGHT NOW</h3>
                </div>
                <span className={`px-3 py-1 rounded-md text-xs font-black tracking-wider ${riskBadge.color}`}>
                  {riskBadge.text}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Current Status</div>
                  <p className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                    Temperature is above normal and rainfall is below normal.
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Water availability in {selectedLocation.name} is decreasing gradually.
                  </p>
                </div>
                
                <button
                  onClick={() => setShowSourceModal(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-blue-600 hover:bg-blue-50 transition shrink-0 cursor-pointer"
                >
                  Source & Explanation →
                </button>
              </div>
            </div>

            {/* 2. WHY? (KEY DRIVERS) */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm text-slate-900">WHY IS THERE A RISK?</h3>
                <span className="text-xs text-slate-500 font-medium">4 Key Drivers</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                
                {/* Driver 1: Temperature */}
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-500">
                    <span>Temperature</span>
                    <Thermometer className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="text-sm font-black text-red-600">Above normal</div>
                  <div className="text-[11px] text-slate-600">{selectedLocation.anomalies.tempAnomaly}</div>
                </div>

                {/* Driver 2: Rainfall */}
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-500">
                    <span>Rainfall</span>
                    <CloudRain className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-sm font-black text-amber-600">Below normal</div>
                  <div className="text-[11px] text-slate-600">{selectedLocation.anomalies.rainAnomaly}</div>
                </div>

                {/* Driver 3: Water Availability */}
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-500">
                    <span>Water availability</span>
                    <Droplets className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="text-sm font-black text-blue-600">Decreasing</div>
                  <div className="text-[11px] text-slate-600">{selectedLocation.anomalies.waterAvailability}</div>
                </div>

                {/* Driver 4: El Niño Signal */}
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-500">
                    <span>El Niño Signal</span>
                    <Activity className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="text-sm font-black text-purple-600">{selectedLocation.elNinoStatus}</div>
                  <div className="text-[11px] text-slate-600">Pacific Anomaly Active</div>
                </div>

              </div>
            </div>

            {/* 3. WHAT YOU SHOULD KNOW (CURRENT ALERT) */}
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>WHAT YOU SHOULD KNOW</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                  Current Notice
                </span>
              </div>

              <div className="text-sm font-bold text-slate-900">
                Water availability may decrease in the coming days due to low rainfall.
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Store essential water for family needs and avoid wasting water for non-essential activities.
              </p>
            </div>

            {/* 4. WHAT YOU CAN DO (RECOMMENDATIONS) */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm text-slate-900">WHAT YOU CAN DO</h3>
                <span className="text-xs text-slate-500 font-medium">Actionable Safety Steps</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                <div onClick={() => handleAskAiSubmit("Conserve water tips")} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-blue-50/50 hover:border-blue-200 transition cursor-pointer flex items-start justify-between">
                  <div>
                    <div className="font-bold text-slate-900">Conserve Water</div>
                    <p className="text-slate-600 text-[11px] mt-0.5">Store drinking water and minimize non-essential usage.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                </div>

                <div onClick={() => handleAskAiSubmit("Avoid heat tips")} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-amber-50/50 hover:border-amber-200 transition cursor-pointer flex items-start justify-between">
                  <div>
                    <div className="font-bold text-slate-900">Avoid Peak Afternoon Heat</div>
                    <p className="text-slate-600 text-[11px] mt-0.5">Avoid direct outdoor work between 12 PM and 3 PM.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                </div>

                <div onClick={() => handleAskAiSubmit("Farming advisory")} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-emerald-50/50 hover:border-emerald-200 transition cursor-pointer flex items-start justify-between">
                  <div>
                    <div className="font-bold text-slate-900">Follow Farming Advisory</div>
                    <p className="text-slate-600 text-[11px] mt-0.5">Adjust irrigation schedules according to local rainfall forecasts.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                </div>

                <div onClick={() => handleAskAiSubmit("Check on vulnerable people")} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-purple-50/50 hover:border-purple-200 transition cursor-pointer flex items-start justify-between">
                  <div>
                    <div className="font-bold text-slate-900">Check on Vulnerable People</div>
                    <p className="text-slate-600 text-[11px] mt-0.5">Ensure elderly neighbors and children stay hydrated.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                </div>

              </div>
            </div>

            {/* 5. ASK NINOSHIELD AI & REPORT AN ISSUE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* ASK NINOSHIELD AI */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                    <Bot className="w-4 h-4 text-blue-600" />
                    <h3 className="font-extrabold text-sm text-slate-900">ASK NINOSHIELD AI</h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Ask simple questions about your area's climate risk.</p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 font-semibold">
                    <button onClick={() => handleAskAiSubmit("Will it rain soon?")} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-left hover:bg-blue-50 transition cursor-pointer">
                      Will it rain soon?
                    </button>
                    <button onClick={() => handleAskAiSubmit("How is the heat today?")} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-left hover:bg-blue-50 transition cursor-pointer">
                      How is the heat today?
                    </button>
                    <button onClick={() => handleAskAiSubmit("Can I irrigate crops?")} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-left hover:bg-blue-50 transition cursor-pointer">
                      Can I irrigate crops?
                    </button>
                    <button onClick={() => handleAskAiSubmit("What should I do now?")} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-left hover:bg-blue-50 transition cursor-pointer">
                      What should I do now?
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleAskAiSubmit("General guidance")}
                  className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition cursor-pointer mt-3"
                >
                  Ask NinoShield AI →
                </button>
              </div>

              {/* REPORT AN ISSUE */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                    <Camera className="w-4 h-4 text-blue-600" />
                    <h3 className="font-extrabold text-sm text-slate-900">REPORT AN ISSUE</h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Select what you observe in your local area to alert your community:</p>

                  <div className="flex flex-wrap gap-2 pt-3">
                    {['Water shortage', 'Extreme heat', 'Heavy rainfall', 'Crop problem', 'Flooding', 'Other'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setReportCategory(cat);
                          navigate('/people/report');
                        }}
                        className="px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-200 transition cursor-pointer"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate('/people/report')}
                  className="w-full py-2.5 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition cursor-pointer mt-3"
                >
                  Report Observation →
                </button>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* DATA SOURCES EXPLANATION MODAL */}
      {showSourceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200 relative text-xs">
            <button
              onClick={() => setShowSourceModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-md bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Info className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">How Risk Was Calculated</h3>
            </div>

            <p className="text-slate-600 font-medium">
              NinoShield combines multi-sensor observations to calculate risk levels without complex terminology:
            </p>

            <ul className="space-y-2 text-slate-700 font-medium list-disc list-inside">
              <li>El Niño Pacific ocean surface temperature anomaly data</li>
              <li>Local thermal observation departure ({selectedLocation.anomalies.tempAnomaly})</li>
              <li>Monsoon rainfall deficit telemetry ({selectedLocation.anomalies.rainAnomaly})</li>
              <li>Reservoir &amp; groundwater storage levels ({selectedLocation.anomalies.waterAvailability})</li>
              <li>Crowdsourced citizen reports submitted in {selectedLocation.name}</li>
            </ul>

            <button
              onClick={() => setShowSourceModal(false)}
              className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg cursor-pointer"
            >
              Close Explanation
            </button>
          </div>
        </div>
      )}

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

            <h3 className="text-base font-bold text-slate-900">Select Location</h3>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {locations.map(loc => (
                <div
                  key={loc.id}
                  onClick={() => {
                    changeLocation(loc.id);
                    setShowLocationModal(false);
                  }}
                  className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between transition ${selectedLocation.id === loc.id ? 'bg-blue-50 border-blue-600' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
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

      {/* AI ADVISOR MODAL */}
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
              <Bot className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">NinoShield AI Guidance</h3>
            </div>

            <p className="text-slate-700 font-medium">{aiAnalysis.summary}</p>

            <div className="space-y-2">
              {aiAnalysis.recommendations.map((rec, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>{rec.category}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800 font-bold">{rec.priority}</span>
                  </div>
                  <p className="text-slate-800 font-medium">{rec.action}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAiModal(false)}
              className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg cursor-pointer"
            >
              Close Guidance
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
