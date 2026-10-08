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
  Globe, 
  ChevronRight, 
  Sun, 
  CloudRain, 
  Droplets, 
  Thermometer, 
  AlertTriangle, 
  Calendar, 
  CheckSquare, 
  Bot, 
  Megaphone, 
  User, 
  Info, 
  X, 
  Send, 
  Leaf, 
  ChevronDown,
  Shield,
  Users,
  Camera,
  CheckCircle2,
  Clock,
  ArrowLeft
} from 'lucide-react';

export default function PeopleDashboard({ onNavigateLanding, onSwitchFarmerMode }) {
  const {
    lang,
    toggleLanguage,
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

  // Determine Sub-Page Route
  const isAlertsPage = currentRoute === '/people/alerts';
  const isPreparePage = currentRoute === '/people/prepare';
  const isReportPage = currentRoute === '/people/report';
  const isMainDashboard = !isAlertsPage && !isPreparePage && !isReportPage;

  const handleReportSubmit = (category = reportCategory) => {
    addReport({
      category,
      locationId: selectedLocation.id,
      locationName: selectedLocation.name,
      description: reportDescription || `${category} reported by local citizen in ${selectedLocation.name}`,
    });

    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setShowReportModal(false);
      setReportDescription('');
      navigate('/people');
    }, 1800);
  };

  const handleAskAiSubmit = (qText) => {
    const query = qText || aiQuestion || "How is the heat today?";
    const result = generateAiRecommendation(selectedLocation, query);
    setAiAnalysis(result);
    setShowAiModal(true);
  };

  return (
    <div className="min-h-screen bg-[#F7FAFF] text-[#0B1736] font-sans flex">
      
      {/* 1. LEFT SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-white border-r border-blue-100 p-5 flex flex-col justify-between shrink-0 hidden lg:flex sticky top-0 h-screen">
        <div className="space-y-6">
          
          {/* Logo Header */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onNavigateLanding}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1769FF] to-[#00B8C8] flex items-center justify-center text-white shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-lg text-[#0B1736] tracking-tight">NinoShield</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI-Powered El Niño Early Action</div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5 text-xs font-bold">
            <button
              onClick={() => navigate('/people')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl transition ${isMainDashboard ? 'bg-[#EBF3FF] text-[#1769FF]' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Home className="w-4 h-4" />
              <span>{t.home || "Home"}</span>
            </button>

            <button
              onClick={() => setShowLocationModal(true)}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-slate-600 hover:bg-slate-50 transition"
            >
              <MapPin className="w-4 h-4" />
              <span>My Area ({selectedLocation.name})</span>
            </button>

            <button
              onClick={() => navigate('/people/alerts')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl transition ${isAlertsPage ? 'bg-[#EBF3FF] text-[#1769FF]' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Bell className="w-4 h-4" />
              <span>{t.alerts || "Alerts"}</span>
            </button>

            <button
              onClick={() => navigate('/people/prepare')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl transition ${isPreparePage ? 'bg-[#EBF3FF] text-[#1769FF]' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.prepare || "Prepare"}</span>
            </button>

            <button
              onClick={() => navigate('/people/report')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl transition ${isReportPage ? 'bg-[#EBF3FF] text-[#1769FF]' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.report || "Report"}</span>
            </button>

            <button
              onClick={() => handleAskAiSubmit("Climate guidance for " + selectedLocation.name)}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-slate-600 hover:bg-slate-50 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.askAi || "Ask AI"}</span>
            </button>
          </nav>

        </div>

        {/* Bottom Switch Mode Button */}
        <button
          onClick={onSwitchFarmerMode}
          className="w-full flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition shadow-xs"
        >
          <div className="flex items-center space-x-2">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>Switch to Farmer Mode</span>
          </div>
          <ChevronRight className="w-4 h-4" />
        </button>
      </aside>

      {/* 2. MAIN VIEW AREA */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto space-y-6">

        {/* HEADER BANNER */}
        <HeaderBanner
          title="Good morning!"
          subtitle="Stay informed. Stay prepared."
          mode="people"
          onOpenLocationModal={() => setShowLocationModal(true)}
        />

        {/* SEPARATE DEDICATED SUB-PAGES */}
        {isAlertsPage ? (
          /* SEPARATE PAGE: ALERTS & ADVISORIES */
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/people')} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-black text-[#0B1736]">Personal Safety Alerts & Advisories</h2>
            </div>

            <div className="bg-[#FFFBF0] rounded-3xl p-6 border border-amber-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-amber-800 font-extrabold text-base">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>CRITICAL WATER STRESS & HEATWAVE ADVISORY — {selectedLocation.name}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs">
                  Active Issue Date: 1 Oct 2026
                </span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                Water storage in local reservoirs is down by {selectedLocation.anomalies.waterAvailability} while daily temperatures remain {selectedLocation.anomalies.tempAnomaly} above normal. High risk of thermal stress for outdoor laborers and elderly citizens.
              </p>

              <div className="bg-amber-100/70 rounded-2xl p-4 border border-amber-200 space-y-2 text-xs font-semibold text-amber-900">
                <div className="font-extrabold text-sm">Recommended Citizen Safety Actions:</div>
                <ul className="list-disc list-inside space-y-1">
                  <li>Store at least 3 days of essential drinking water for household needs.</li>
                  <li>Avoid direct outdoor work between 11:00 AM and 3:00 PM.</li>
                  <li>Ensure elderly family members remain in shaded, ventilated areas.</li>
                  <li>Follow official municipal water supply distribution announcements.</li>
                </ul>
              </div>
            </div>
          </div>
        ) : isPreparePage ? (
          /* SEPARATE PAGE: PREPAREDNESS CHECKLIST */
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/people')} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-black text-[#0B1736]">Personal Safety Preparedness Checklist</h2>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-blue-100 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="text-base font-extrabold text-[#0B1736]">Household Readiness Rating</div>
                  <p className="text-xs text-slate-500">Check completed items to increase your preparedness score.</p>
                </div>
                <div className="text-2xl font-black text-emerald-600 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200">
                  {preparedCount} / {totalPreparedCount} Prepared
                </div>
              </div>

              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${(preparedCount/totalPreparedCount)*100}%` }}></div>
              </div>

              <div className="space-y-3 text-xs font-semibold">
                <label className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition">
                  <input
                    type="checkbox"
                    checked={peopleChecklist.water}
                    onChange={() => togglePeopleChecklist('water')}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div>
                    <div className="text-sm font-bold text-[#0B1736]">Drinking water available</div>
                    <div className="text-slate-500 font-normal">Stored clean drinking water for all family members (min 15 liters).</div>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition">
                  <input
                    type="checkbox"
                    checked={peopleChecklist.medicines}
                    onChange={() => togglePeopleChecklist('medicines')}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div>
                    <div className="text-sm font-bold text-[#0B1736]">Important medicines ready</div>
                    <div className="text-slate-500 font-normal">First aid kit, ORS hydration packets, and prescription medications.</div>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition">
                  <input
                    type="checkbox"
                    checked={peopleChecklist.contacts}
                    onChange={() => togglePeopleChecklist('contacts')}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div>
                    <div className="text-sm font-bold text-[#0B1736]">Emergency contacts saved</div>
                    <div className="text-slate-500 font-normal">District helpline (1077), health center, and local water officer saved on phone.</div>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition">
                  <input
                    type="checkbox"
                    checked={peopleChecklist.powerbank}
                    onChange={() => togglePeopleChecklist('powerbank')}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div>
                    <div className="text-sm font-bold text-[#0B1736]">Power bank charged</div>
                    <div className="text-slate-500 font-normal">Mobile device and backup battery charged for severe weather alerts.</div>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition">
                  <input
                    type="checkbox"
                    checked={peopleChecklist.info}
                    onChange={() => togglePeopleChecklist('info')}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div>
                    <div className="text-sm font-bold text-[#0B1736]">Local emergency information saved</div>
                    <div className="text-slate-500 font-normal">Location of nearest safe shelter and hydration center identified.</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        ) : isReportPage ? (
          /* SEPARATE PAGE: SUBMIT OBSERVATION */
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/people')} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-black text-[#0B1736]">Submit Climate Observation</h2>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-blue-100 shadow-xs space-y-4">
              <p className="text-xs text-slate-500">
                Sharing what you observe in your area helps update local climate signal intelligence for your community and district decision-makers.
              </p>

              {reportSuccess ? (
                <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 text-emerald-900">
                  <div className="text-3xl">✅</div>
                  <div className="font-extrabold text-base">Observation Submitted Successfully!</div>
                  <p className="text-xs">Your report has been added to the local climate signal feed.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleReportSubmit(); }} className="space-y-4 text-xs font-semibold">
                  <div>
                    <label className="block font-extrabold text-slate-700 mb-1.5">Observation Category</label>
                    <select
                      value={reportCategory}
                      onChange={(e) => setReportCategory(e.target.value)}
                      className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-[#1769FF]"
                    >
                      <option value="Water Shortage">💧 Water Shortage</option>
                      <option value="Extreme Heat">🌡️ Extreme Heat</option>
                      <option value="Crop Problem">🌾 Crop Stress / Problem</option>
                      <option value="Heavy Rainfall">🌧️ Heavy Rainfall / Runoff</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-extrabold text-slate-700 mb-1.5">Location & Details</label>
                    <textarea
                      rows={4}
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      placeholder="Describe what you observed in detail (e.g. Ward 4 municipal tap dry for 2 consecutive days)..."
                      className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-[#1769FF]"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => navigate('/people')}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition shadow-sm"
                    >
                      Submit Report
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        ) : (
          /* DEFAULT: FULL MAIN OVERVIEW DASHBOARD MATCHING REFERENCE IMAGE 1:1 */
          <>
            {/* ROW 1: TOP 3 CARDS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* CARD 1: TODAY'S CLIMATE STATUS */}
              <div className="lg:col-span-5 bg-[#FFF5F5] rounded-3xl p-5 border border-red-100 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500">⚙️</span>
                    <h3 className="font-extrabold text-sm text-[#0B1736]">Today's Climate Status ⓘ</h3>
                  </div>
                  <button
                    onClick={() => setShowSourceModal(true)}
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
                      High heat and low rainfall conditions are affecting your area.
                    </p>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-3.5 border border-red-100 space-y-2">
                  <div className="text-xs font-extrabold text-[#0B1736]">Why is the risk high? ⓘ</div>
                  <div className="grid grid-cols-3 gap-2 text-[11px]">
                    <div>
                      <div className="text-slate-400 font-bold">Temperature</div>
                      <div className="font-extrabold text-red-600">Above normal</div>
                      <div className="font-bold text-slate-700">{selectedLocation.anomalies.tempAnomaly}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-bold">Rainfall</div>
                      <div className="font-extrabold text-red-600">Below normal</div>
                      <div className="font-bold text-slate-700">{selectedLocation.anomalies.rainAnomaly}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-bold">Water availability</div>
                      <div className="font-extrabold text-red-600">Decreasing</div>
                      <div className="font-bold text-slate-700">{selectedLocation.anomalies.waterAvailability}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: CURRENT ALERT */}
              <div className="lg:col-span-3 bg-[#FFFBF0] rounded-3xl p-5 border border-amber-200/80 shadow-xs flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1.5 text-amber-700 font-bold text-xs">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span>Current Alert</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold border border-amber-200">
                      ● Monitoring
                    </span>
                  </div>

                  <div className="font-black text-sm text-[#0B1736] leading-snug pt-1">
                    Water availability may decrease in the coming days.
                  </div>
                  <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                    Prepare water for essential needs and follow local advisories.
                  </p>
                </div>

                <button
                  onClick={() => navigate('/people/alerts')}
                  className="w-full flex items-center justify-between text-xs font-bold text-amber-800 hover:underline pt-2"
                >
                  <span>View full advisory details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* CARD 3: NEXT FEW DAYS */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center space-x-1.5 text-[#0B1736] font-bold text-xs">
                    <Calendar className="w-4 h-4 text-[#1769FF]" />
                    <span>Next Few Days</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">Based on climate signals ⓘ</span>
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
              </div>

            </div>

            {/* ROW 2: MIDDLE 3-COLUMN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* 1. WHAT YOU CAN DO NOW */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-3">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-extrabold text-sm text-[#0B1736]">What You Can Do Now</h3>
                </div>

                <div className="space-y-2 text-xs">
                  <div onClick={() => handleAskAiSubmit("Water conservation tips")} className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start justify-between cursor-pointer hover:bg-blue-100/60 transition">
                    <div className="flex items-start space-x-2.5">
                      <span className="text-base">💧</span>
                      <div>
                        <div className="font-bold text-[#0B1736]">Conserve Water</div>
                        <p className="text-slate-500 text-[11px]">Reduce unnecessary water usage and keep essential drinking water available.</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                  </div>

                  <div onClick={() => handleAskAiSubmit("Avoid heat tips")} className="p-3 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-start justify-between cursor-pointer hover:bg-amber-100/60 transition">
                    <div className="flex items-start space-x-2.5">
                      <span className="text-base">☀️</span>
                      <div>
                        <div className="font-bold text-[#0B1736]">Avoid Peak Afternoon Heat</div>
                        <p className="text-slate-500 text-[11px]">Avoid unnecessary outdoor activity during the hottest part of the day.</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                  </div>

                  <div onClick={() => handleAskAiSubmit("Farming crop advice")} className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start justify-between cursor-pointer hover:bg-emerald-100/60 transition">
                    <div className="flex items-start space-x-2.5">
                      <span className="text-base">🌾</span>
                      <div>
                        <div className="font-bold text-[#0B1736]">Follow Farming Advisory</div>
                        <p className="text-slate-500 text-[11px]">Plan irrigation carefully and monitor crop health.</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                  </div>

                  <div onClick={() => handleAskAiSubmit("Support elderly and children in heat")} className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-start justify-between cursor-pointer hover:bg-purple-100/60 transition">
                    <div className="flex items-start space-x-2.5">
                      <span className="text-base">👥</span>
                      <div>
                        <div className="font-bold text-[#0B1736]">Check on Vulnerable People</div>
                        <p className="text-slate-500 text-[11px]">Look after elderly people, children, and others affected by heat.</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                  </div>
                </div>
              </div>

              {/* 2. PREPARE YOURSELF CHECKLIST */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center space-x-2">
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-extrabold text-sm text-[#0B1736]">Prepare Yourself</h3>
                  </div>
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {preparedCount} / {totalPreparedCount}
                  </span>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${(preparedCount/totalPreparedCount)*100}%` }}></div>
                </div>

                <div className="space-y-2 text-xs font-semibold pt-1">
                  <label className="flex items-center space-x-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100 transition">
                    <input
                      type="checkbox"
                      checked={peopleChecklist.water}
                      onChange={() => togglePeopleChecklist('water')}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span>Drinking water available</span>
                  </label>

                  <label className="flex items-center space-x-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100 transition">
                    <input
                      type="checkbox"
                      checked={peopleChecklist.medicines}
                      onChange={() => togglePeopleChecklist('medicines')}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span>Important medicines ready</span>
                  </label>

                  <label className="flex items-center space-x-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100 transition">
                    <input
                      type="checkbox"
                      checked={peopleChecklist.contacts}
                      onChange={() => togglePeopleChecklist('contacts')}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span>Emergency contacts saved</span>
                  </label>

                  <label className="flex items-center space-x-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100 transition">
                    <input
                      type="checkbox"
                      checked={peopleChecklist.powerbank}
                      onChange={() => togglePeopleChecklist('powerbank')}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span>Power bank charged</span>
                  </label>

                  <label className="flex items-center space-x-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100 transition">
                    <input
                      type="checkbox"
                      checked={peopleChecklist.info}
                      onChange={() => togglePeopleChecklist('info')}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span>Local emergency information saved</span>
                  </label>
                </div>
              </div>

              {/* 3. ASK NINOSHIELD */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-[#1769FF]" />
                      <h3 className="font-extrabold text-sm text-[#0B1736]">Ask NinoShield</h3>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1769FF]">
                      AI-assisted guidance
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 pt-1">Get simple answers about your area.</p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-3">
                    <button
                      onClick={() => handleAskAiSubmit("Will it rain soon?")}
                      className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-left font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-300 transition flex items-center justify-between"
                    >
                      <span>Will it rain soon?</span>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </button>

                    <button
                      onClick={() => handleAskAiSubmit("How is the heat?")}
                      className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-left font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-300 transition flex items-center justify-between"
                    >
                      <span>How is the heat?</span>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </button>

                    <button
                      onClick={() => handleAskAiSubmit("Can I irrigate today?")}
                      className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-left font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-300 transition flex items-center justify-between"
                    >
                      <span>Can I irrigate today?</span>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </button>

                    <button
                      onClick={() => handleAskAiSubmit("What should I do?")}
                      className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-left font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-300 transition flex items-center justify-between"
                    >
                      <span>What should I do?</span>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleAskAiSubmit("Climate recommendations")}
                  className="w-full py-3 rounded-2xl bg-[#1769FF] text-white font-extrabold text-xs shadow-md shadow-blue-500/20 hover:bg-blue-700 transition"
                >
                  Ask NinoShield →
                </button>
              </div>

            </div>

            {/* ROW 3: REPORT SOMETHING */}
            <div className="bg-[#EBF3FF] rounded-3xl p-5 border border-blue-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1769FF] text-white flex items-center justify-center shrink-0">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#0B1736]">Report Something</h3>
                  <p className="text-xs text-slate-600">Help improve local awareness by sharing what you see in your area.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {['Water shortage', 'Extreme heat', 'Heavy rainfall', 'Crop problem', 'Flooding', 'Other'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setReportCategory(cat);
                      setShowReportModal(true);
                    }}
                    className="px-3 py-1.5 rounded-full bg-white border border-blue-200 text-xs font-semibold text-slate-700 hover:bg-blue-50 transition"
                  >
                    {cat}
                  </button>
                ))}

                <button
                  onClick={() => setShowReportModal(true)}
                  className="flex items-center space-x-1.5 px-5 py-2 rounded-full bg-[#1769FF] text-white text-xs font-extrabold shadow-sm hover:bg-blue-700 transition"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Report Now →</span>
                </button>
              </div>
            </div>

            <div className="text-center text-[11px] text-slate-400 font-medium">
              ⓘ Predictions are based on current climate signals and are not an official forecast.
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

            <h3 className="text-lg font-black text-[#0B1736]">Select Demo Location</h3>
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
              <h3 className="text-lg font-black text-[#0B1736]">NinoShield AI Guidance</h3>
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
              Got it
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
