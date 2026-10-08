import React, { useState } from 'react';
import { useNinoShield } from '../../context/NinoShieldContext';
import HeaderBanner from '../Layout/HeaderBanner';
import RealInteractiveMap from '../Map/RealInteractiveMap';
import {
  Shield,
  MapPin,
  Globe,
  Bell,
  AlertTriangle,
  Droplets,
  Thermometer,
  CloudRain,
  Sprout,
  Users,
  ChevronRight,
  TrendingUp,
  Activity,
  CheckCircle2,
  Clock,
  Building2,
  FileText,
  Bot,
  Send,
  X,
  Layers,
  Filter,
  BarChart3,
  ExternalLink,
  Info,
  Sliders,
  Sparkles,
  ArrowRight,
  Plus,
  Minus,
  Megaphone,
  LayoutDashboard,
  Settings,
  Package,
  ClipboardList,
  ArrowLeft
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function DecisionMakerDashboard({
  onNavigateLanding,
  onSwitchCommunityMode,
  onSwitchPersonMode
}) {
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
    actionPlan,
    updateActionStatus,
    departmentCoordination,
    resources,
    updateResource,
    generateAiRecommendation
  } = useNinoShield();

  // Modals & State
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);

  // Sub-page route matching
  const isRiskPage = currentRoute === '/decision-maker/risk';
  const isImpactPage = currentRoute === '/decision-maker/impact';
  const isActionsPage = currentRoute === '/decision-maker/actions';
  const isResourcesPage = currentRoute === '/decision-maker/resources';
  const isReportsPage = currentRoute === '/decision-maker/reports';
  const isMainDashboard = !isRiskPage && !isImpactPage && !isActionsPage && !isResourcesPage && !isReportsPage;

  // 30-Day Scenario Chart Projection
  const projectionData = [
    { day: 'Today', score: 78 },
    { day: '7 Days', score: 81 },
    { day: '14 Days', score: 84 },
    { day: '30 Days', score: 87 },
  ];

  const handleAiAsk = (query) => {
    const res = generateAiRecommendation(selectedLocation, query || "Decision Support Priorities");
    setAiResponse(res);
    setShowAiModal(true);
  };

  return (
    <div className="min-h-screen bg-[#F7FAFF] text-[#0B1736] font-sans flex">
      
      {/* 1. LEFT SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-white border-r border-blue-100 p-5 flex flex-col justify-between shrink-0 hidden lg:flex sticky top-0 h-screen">
        <div className="space-y-6">
          
          {/* Logo Header */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onNavigateLanding}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1769FF] to-[#0B1736] flex items-center justify-center text-white shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-lg text-[#0B1736] tracking-tight">NinoShield</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI-Powered El Niño Early Action</div>
            </div>
          </div>

          {/* Direct Sidebar Navigation Options */}
          <nav className="space-y-1.5 text-xs font-bold">
            <button
              onClick={() => navigate('/decision-maker')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl transition ${isMainDashboard ? 'bg-[#EBF3FF] text-[#1769FF]' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate('/decision-maker/risk')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl transition ${isRiskPage ? 'bg-[#EBF3FF] text-[#1769FF]' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <MapPin className="w-4 h-4" />
              <span>Regional Risk</span>
            </button>

            <button
              onClick={() => setShowWarningModal(true)}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-slate-600 hover:bg-slate-50 transition"
            >
              <Bell className="w-4 h-4" />
              <span>Alerts</span>
            </button>

            <button
              onClick={() => navigate('/decision-maker/impact')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl transition ${isImpactPage ? 'bg-[#EBF3FF] text-[#1769FF]' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Impact Analysis</span>
            </button>

            <button
              onClick={() => navigate('/decision-maker/actions')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl transition ${isActionsPage ? 'bg-[#EBF3FF] text-[#1769FF]' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>Action Plan</span>
            </button>

            <button
              onClick={() => navigate('/decision-maker/resources')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl transition ${isResourcesPage ? 'bg-[#EBF3FF] text-[#1769FF]' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Package className="w-4 h-4" />
              <span>Resource Management</span>
            </button>

            <button
              onClick={() => navigate('/decision-maker/reports')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl transition ${isReportsPage ? 'bg-[#EBF3FF] text-[#1769FF]' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <FileText className="w-4 h-4" />
              <span>Reports & Signals</span>
            </button>

            <button
              onClick={() => handleAiAsk("Detailed decision support priorities")}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-slate-600 hover:bg-slate-50 transition"
            >
              <Bot className="w-4 h-4" />
              <span>AI Advisor</span>
            </button>

            <button
              onClick={() => setShowLocationModal(true)}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-slate-600 hover:bg-slate-50 transition"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>

        </div>

        {/* Bottom Switch Mode Button */}
        <button
          onClick={onSwitchCommunityMode}
          className="w-full flex items-center justify-between p-3 rounded-2xl bg-purple-50 border border-purple-200 text-xs font-bold text-purple-800 hover:bg-purple-100 transition shadow-xs"
        >
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-purple-600" />
            <span>Switch to Community Mode</span>
          </div>
          <ChevronRight className="w-4 h-4" />
        </button>
      </aside>

      {/* 2. MAIN VIEW AREA */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto space-y-6">

        {/* HEADER BANNER */}
        <HeaderBanner
          title={`Good morning!\n🏛️ ${selectedLocation.name} District Administration`}
          subtitle="Climate intelligence for informed decisions and early action."
          mode="decision-maker"
          onOpenLocationModal={() => setShowLocationModal(true)}
        />

        {/* SEPARATE DEDICATED SUB-PAGES */}
        {isRiskPage ? (
          /* SEPARATE PAGE: REGIONAL RISK MAP & GIS ANALYSIS */
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/decision-maker')} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-black text-[#0B1736]">Regional Risk Map & GIS District Analysis</h2>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-blue-100 shadow-xs space-y-4">
              <RealInteractiveMap height="550px" />
            </div>
          </div>
        ) : isImpactPage ? (
          /* SEPARATE PAGE: IMPACT ANALYSIS & 30-DAY PROJECTION */
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/decision-maker')} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-black text-[#0B1736]">Impact Analysis & 30-Day Risk Trajectory</h2>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-blue-100 shadow-xs space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs font-semibold">
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
                  <div className="text-slate-400">Total Population</div>
                  <div className="text-2xl font-black text-[#0B1736]">1.2M</div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                  <div className="text-slate-400">Farmers</div>
                  <div className="text-2xl font-black text-[#0B1736]">310K</div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
                  <div className="text-slate-400">Outdoor Workers</div>
                  <div className="text-2xl font-black text-[#0B1736]">240K</div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
                  <div className="text-slate-400">Elderly People</div>
                  <div className="text-2xl font-black text-[#0B1736]">120K</div>
                </div>

                <div className="p-4 rounded-2xl bg-red-50/60 border border-red-100">
                  <div className="text-slate-400">Children</div>
                  <div className="text-2xl font-black text-[#0B1736]">185K</div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
                  <div className="text-slate-400">Critical Facilities</div>
                  <div className="text-2xl font-black text-[#0B1736]">34</div>
                </div>
              </div>

              <div className="h-64 w-full pt-4 border-t border-slate-100">
                <div className="text-base font-extrabold text-[#0B1736] mb-2">30-Day Scenario Risk Trajectory</div>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                    <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#0B1736', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="score" stroke="#dc2626" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : isActionsPage ? (
          /* SEPARATE PAGE: ACTION RESPONSE PLAN */
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/decision-maker')} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-black text-[#0B1736]">Recommended Early Action Response Plan</h2>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-blue-100 shadow-xs space-y-6">
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                      <th className="p-3">Priority</th>
                      <th className="p-3">Department</th>
                      <th className="p-3">Preventive Action</th>
                      <th className="p-3">Timeline</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-[#0B1736]">
                    {actionPlan.map(item => (
                      <tr key={item.id} className="hover:bg-blue-50/50 transition">
                        <td className="p-3 font-bold text-red-600">{item.priority}</td>
                        <td className="p-3 font-semibold">{item.dept}</td>
                        <td className="p-3 text-slate-700">{item.action}</td>
                        <td className="p-3 text-slate-500">{item.timeline}</td>
                        <td className="p-3">
                          <button
                            onClick={() => {
                              const nextStatus = item.status === 'Pending' ? 'In Progress' : item.status === 'In Progress' ? 'Approved' : 'Pending';
                              updateActionStatus(item.id, nextStatus);
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-bold border transition cursor-pointer ${item.bg}`}
                          >
                            {item.status} 🔄
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : isResourcesPage ? (
          /* SEPARATE PAGE: RESOURCE MANAGEMENT */
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/decision-maker')} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-black text-[#0B1736]">Emergency Resource Management & Stock Gaps</h2>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-blue-100 shadow-xs space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {resources.map(res => {
                  const gap = Math.max(0, res.required - res.available);
                  return (
                    <div key={res.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                      <div className="font-extrabold text-[#0B1736] text-sm">{res.name}</div>
                      <div className="flex items-center justify-between text-slate-600 font-semibold">
                        <span>Available: <strong>{res.available}</strong></span>
                        <span>Required: <strong>{res.required}</strong></span>
                      </div>
                      {gap > 0 ? (
                        <div className="text-xs font-bold text-red-600 bg-red-50 p-2 rounded-xl border border-red-100 text-center">
                          Gap: -{gap} {res.unit}
                        </div>
                      ) : (
                        <div className="text-xs font-bold text-emerald-600 bg-emerald-50 p-2 rounded-xl border border-emerald-100 text-center">
                          Adequate Stock
                        </div>
                      )}

                      <div className="flex justify-center space-x-3 pt-2">
                        <button
                          onClick={() => updateResource(res.id, -1)}
                          className="w-8 h-8 rounded-xl bg-slate-200 text-slate-800 font-bold flex items-center justify-center hover:bg-slate-300"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateResource(res.id, 1)}
                          className="w-8 h-8 rounded-xl bg-[#1769FF] text-white font-bold flex items-center justify-center hover:bg-blue-700 shadow-sm"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : isReportsPage ? (
          /* SEPARATE PAGE: CITIZEN REPORTS & COMMUNITY SIGNALS */
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/decision-maker')} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-black text-[#0B1736]">Citizen Reports & Community Signals Feed</h2>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-blue-100 shadow-xs space-y-4">
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
        ) : (
          /* DEFAULT: FULL MAIN OVERVIEW DASHBOARD MATCHING REFERENCE IMAGE 1:1 */
          <>
            {/* ROW 1: TOP 5 EXECUTIVE METRIC CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Card 1: Overall Regional Risk */}
              <div className="bg-white rounded-3xl p-4 border border-blue-100 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Overall Regional Risk ⓘ</span>
                  <Activity className="w-4 h-4 text-red-500" />
                </div>
                <div className="my-2 flex items-center justify-between">
                  <div className="w-16 h-16 rounded-full border-4 border-red-500 flex flex-col items-center justify-center shrink-0 bg-red-50">
                    <span className="text-xl font-black text-red-600">78</span>
                    <span className="text-[9px] font-extrabold text-red-700">HIGH</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-red-600">↑ +12%</span>
                    <div className="text-[10px] text-slate-400 font-bold">vs last week</div>
                  </div>
                </div>
              </div>

              {/* Card 2: High Risk Areas */}
              <div className="bg-white rounded-3xl p-4 border border-blue-100 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>High Risk Areas ⓘ</span>
                  <MapPin className="w-4 h-4 text-red-500" />
                </div>
                <div className="my-2">
                  <div className="text-2xl font-black text-[#0B1736]">7 / 14</div>
                  <div className="text-[10px] text-slate-400 font-bold">areas</div>
                </div>
                <div className="text-xs font-bold text-red-600">↑ +2 areas</div>
              </div>

              {/* Card 3: Population Potentially Affected */}
              <div className="bg-white rounded-3xl p-4 border border-blue-100 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Population Potentially Affected ⓘ</span>
                  <Users className="w-4 h-4 text-[#1769FF]" />
                </div>
                <div className="my-2">
                  <div className="text-2xl font-black text-[#0B1736]">1.8M</div>
                  <div className="text-[10px] text-slate-400 font-bold">people</div>
                </div>
                <div className="text-xs font-bold text-red-600">↑ +24%</div>
              </div>

              {/* Card 4: Active Alerts */}
              <div className="bg-white rounded-3xl p-4 border border-blue-100 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Active Alerts ⓘ</span>
                  <Bell className="w-4 h-4 text-amber-500" />
                </div>
                <div className="my-2">
                  <div className="text-2xl font-black text-[#0B1736]">3</div>
                  <div className="text-[10px] text-slate-400 font-bold">alerts</div>
                </div>
                <div className="text-xs font-bold text-slate-500">- 0% vs last week</div>
              </div>

              {/* Card 5: Emerging Threats */}
              <div className="bg-white rounded-3xl p-4 border border-blue-100 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Emerging Threats ⓘ</span>
                  <AlertTriangle className="w-4 h-4 text-purple-600" />
                </div>
                <div className="my-2">
                  <div className="text-2xl font-black text-[#0B1736]">4</div>
                  <div className="text-[10px] text-slate-400 font-bold">identified</div>
                </div>
                <div className="text-xs font-bold text-purple-600">↑ +1</div>
              </div>

            </div>

            {/* ROW 2: MIDDLE 3-COLUMN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* 1. REGIONAL CLIMATE RISK MAP */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-sm text-[#0B1736]">Regional Climate Risk Map ⓘ</h3>
                  <button onClick={() => navigate('/decision-maker/risk')} className="text-xs font-bold text-[#1769FF] hover:underline">
                    View Full Map →
                  </button>
                </div>

                <RealInteractiveMap height="320px" />
              </div>

              {/* 2. TOP PRIORITY AREAS */}
              <div className="lg:col-span-3.5 lg:col-span-3 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-sm text-[#0B1736]">Top Priority Areas</h3>
                  <span onClick={() => navigate('/decision-maker/risk')} className="text-xs font-bold text-[#1769FF] cursor-pointer hover:underline">View All →</span>
                </div>

                <div className="space-y-2 text-xs">
                  {locations.slice(0, 5).map((loc, idx) => (
                    <div
                      key={loc.id}
                      onClick={() => changeLocation(loc.id)}
                      className={`p-2.5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${selectedLocation.id === loc.id ? 'bg-blue-50 border-[#1769FF]' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] ${idx < 2 ? 'bg-red-600 text-white' : 'bg-amber-500 text-white'}`}>
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-extrabold text-[#0B1736]">{loc.name}</div>
                          <div className="text-[10px] text-slate-400">Risk Score: {loc.overallRisk}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black ${loc.overallRisk >= 75 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'}`}>
                          {loc.overallRisk >= 75 ? 'HIGH' : 'MODERATE'}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. EMERGING CLIMATE THREATS */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-sm text-[#0B1736]">Emerging Climate Threats</h3>
                  <span onClick={() => handleAiAsk("Emerging climate threats")} className="text-xs font-bold text-[#1769FF] cursor-pointer hover:underline">View All →</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div onClick={() => handleAiAsk("Water stress threats")} className="p-2.5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-1 cursor-pointer hover:bg-blue-100/60 transition">
                    <div className="flex items-center justify-between font-extrabold text-[#0B1736]">
                      <span className="flex items-center space-x-1.5">
                        <span>💧</span>
                        <span>Water Stress</span>
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] bg-red-100 text-red-700">HIGH</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">Declining rainfall and water availability. Increased community reports.</p>
                  </div>

                  <div onClick={() => handleAiAsk("Extreme heat threats")} className="p-2.5 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1 cursor-pointer hover:bg-amber-100/60 transition">
                    <div className="flex items-center justify-between font-extrabold text-[#0B1736]">
                      <span className="flex items-center space-x-1.5">
                        <span>☀️</span>
                        <span>Extreme Heat</span>
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] bg-red-100 text-red-700">HIGH</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">Rising temperatures across multiple areas. High risk for vulnerable population.</p>
                  </div>

                  <div onClick={() => handleAiAsk("Agricultural stress threats")} className="p-2.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1 cursor-pointer hover:bg-emerald-100/60 transition">
                    <div className="flex items-center justify-between font-extrabold text-[#0B1736]">
                      <span className="flex items-center space-x-1.5">
                        <span>🌾</span>
                        <span>Agricultural Stress</span>
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] bg-amber-100 text-amber-800">MEDIUM</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">Below normal rainfall may affect standing paddy crops.</p>
                  </div>

                  <div onClick={() => handleAiAsk("Heavy rainfall threats")} className="p-2.5 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1 cursor-pointer hover:bg-purple-100/60 transition">
                    <div className="flex items-center justify-between font-extrabold text-[#0B1736]">
                      <span className="flex items-center space-x-1.5">
                        <span>🌧️</span>
                        <span>Heavy Rainfall (Localized)</span>
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] bg-amber-100 text-amber-800">MEDIUM</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">Isolated heavy rainfall expected in mountain runoff pockets.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* ROW 3: LOWER MIDDLE 3-COLUMN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* 1. WHY IS MADURAI HIGH RISK? */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-sm text-[#0B1736]">Why is {selectedLocation.name} High Risk?</h3>
                  <span onClick={() => handleAiAsk("Why is " + selectedLocation.name + " high risk")} className="text-xs font-bold text-[#1769FF] cursor-pointer hover:underline">View Details →</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-2xl bg-red-50/60 border border-red-100">
                    <div className="text-[10px] text-slate-400 font-bold">Temperature</div>
                    <div className="font-black text-red-600 text-sm">{selectedLocation.anomalies.tempAnomaly}</div>
                    <div className="text-[10px] text-red-700 font-bold">Above normal</div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-red-50/60 border border-red-100">
                    <div className="text-[10px] text-slate-400 font-bold">Rainfall</div>
                    <div className="font-black text-red-600 text-sm">{selectedLocation.anomalies.rainAnomaly}</div>
                    <div className="text-[10px] text-red-700 font-bold">Below normal</div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-blue-50/60 border border-blue-100">
                    <div className="text-[10px] text-slate-400 font-bold">Water availability</div>
                    <div className="font-black text-blue-600 text-sm">{selectedLocation.anomalies.waterAvailability}</div>
                    <div className="text-[10px] text-blue-700 font-bold">Decreasing</div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                    <div className="text-[10px] text-slate-400 font-bold">Agriculture</div>
                    <div className="font-black text-red-600 text-sm">High</div>
                    <div className="text-[10px] text-red-700 font-bold">Increased crop stress</div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-xs space-y-1">
                  <div className="font-extrabold text-red-900 flex items-center space-x-1">
                    <span>🎯</span>
                    <span>Primary driver: Water stress</span>
                  </div>
                  <p className="text-[11px] text-red-800">
                    Combination of below normal rainfall, declining water availability and increased local reports.
                  </p>
                </div>
              </div>

              {/* 2. RISK PROJECTION (SCENARIO-BASED) */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-sm text-[#0B1736]">Risk Projection (Scenario-based) ⓘ</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">Next 30 Days ∨</span>
                </div>

                <div className="h-44 w-full pt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectionData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} />
                      <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={10} />
                      <Tooltip contentStyle={{ backgroundColor: '#0B1736', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
                      <Line type="monotone" dataKey="score" stroke="#dc2626" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="text-[11px] text-slate-400 font-medium">
                  ⓘ Scenario-based projection using current climate signals. Not an official forecast.
                </div>
              </div>

              {/* 3. IMPACT ASSESSMENT */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-sm text-[#0B1736]">Impact Assessment (Next 30 Days)</h3>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                  <div className="p-2.5 rounded-2xl bg-blue-50/60 border border-blue-100">
                    <div className="text-slate-400 text-[10px]">Population</div>
                    <div className="text-base font-black text-[#0B1736]">1.2M</div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                    <div className="text-slate-400 text-[10px]">Farmers</div>
                    <div className="text-base font-black text-[#0B1736]">310K</div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-amber-50/60 border border-amber-100">
                    <div className="text-slate-400 text-[10px]">Outdoor workers</div>
                    <div className="text-base font-black text-[#0B1736]">240K</div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-purple-50/60 border border-purple-100">
                    <div className="text-slate-400 text-[10px]">Elderly people</div>
                    <div className="text-base font-black text-[#0B1736]">120K</div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-red-50/60 border border-red-100">
                    <div className="text-slate-400 text-[10px]">Children</div>
                    <div className="text-base font-black text-[#0B1736]">185K</div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-blue-50/60 border border-blue-100">
                    <div className="text-slate-400 text-[10px]">Critical facilities</div>
                    <div className="text-base font-black text-[#0B1736]">34</div>
                  </div>
                </div>
              </div>

            </div>

            {/* ROW 4: BOTTOM 3-COLUMN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* 1. DEPARTMENT COORDINATION */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-sm text-[#0B1736]">Department Coordination</h3>
                  <span onClick={() => navigate('/decision-maker/actions')} className="text-xs font-bold text-[#1769FF] cursor-pointer hover:underline">View All →</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                  <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-1">
                    <div className="text-blue-600 font-bold">Water Department</div>
                    <div className="text-red-600 text-[11px] font-extrabold">{departmentCoordination.water.pending} actions pending</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-red-50/60 border border-red-100 space-y-1">
                    <div className="text-red-600 font-bold">Health Department</div>
                    <div className="text-red-600 text-[11px] font-extrabold">{departmentCoordination.health.pending} actions pending</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                    <div className="text-emerald-700 font-bold">Agriculture Dept</div>
                    <div className="text-emerald-600 text-[11px] font-extrabold">{departmentCoordination.ag.pending} action pending</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1">
                    <div className="text-purple-700 font-bold">Public Comm</div>
                    <div className="text-red-600 text-[11px] font-extrabold">{departmentCoordination.publicComm.pending} actions pending</div>
                  </div>
                </div>
              </div>

              {/* 2. RECOMMENDED EARLY ACTION PLAN */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-sm text-[#0B1736]">Recommended Early Action Plan</h3>
                  <span onClick={() => navigate('/decision-maker/actions')} className="text-xs font-bold text-[#1769FF] cursor-pointer hover:underline">View All →</span>
                </div>

                <div className="overflow-x-auto text-[11px]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-slate-400 font-bold border-b border-slate-100">
                        <th className="pb-1.5">Action</th>
                        <th className="pb-1.5">Priority</th>
                        <th className="pb-1.5">Dept</th>
                        <th className="pb-1.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-[#0B1736]">
                      {actionPlan.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="py-2 pr-2">{item.action.slice(0, 24)}...</td>
                          <td className="py-2"><span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${item.priority.includes('HIGH') ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'}`}>{item.priority.includes('HIGH') ? 'HIGH' : 'MEDIUM'}</span></td>
                          <td className="py-2 text-slate-500">{item.dept.split(' ')[0]}</td>
                          <td className="py-2">
                            <button
                              onClick={() => {
                                const nextStatus = item.status === 'Pending' ? 'In Progress' : item.status === 'In Progress' ? 'Approved' : 'Pending';
                                updateActionStatus(item.id, nextStatus);
                              }}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : item.status === 'In Progress' ? 'bg-blue-100 text-[#1769FF]' : 'bg-amber-100 text-amber-800'}`}
                            >
                              {item.status}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3. AI DECISION ADVISOR */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-[#1769FF]" />
                      <h3 className="font-extrabold text-sm text-[#0B1736]">AI Decision Advisor</h3>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1769FF]">
                      AI-powered insights
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 pt-1">Based on current data, here are the key priorities:</p>

                  <div className="space-y-2 text-xs pt-2">
                    <div className="flex items-start space-x-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#1769FF] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">1</span>
                      <div>
                        <div className="font-bold text-[#0B1736] flex items-center space-x-1.5">
                          <span>Water resources</span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] bg-red-100 text-red-700 font-extrabold">HIGH</span>
                        </div>
                        <p className="text-slate-500 text-[11px]">Inspect reservoirs, deploy additional water resources.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#1769FF] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">2</span>
                      <div>
                        <div className="font-bold text-[#0B1736] flex items-center space-x-1.5">
                          <span>Heat preparedness</span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] bg-red-100 text-red-700 font-extrabold">HIGH</span>
                        </div>
                        <p className="text-slate-500 text-[11px]">Activate heat-health response and awareness.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#1769FF] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">3</span>
                      <div>
                        <div className="font-bold text-[#0B1736] flex items-center space-x-1.5">
                          <span>Agricultural support</span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-100 text-amber-800 font-extrabold">MEDIUM</span>
                        </div>
                        <p className="text-slate-500 text-[11px]">Issue irrigation advisory and monitor crop health.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleAiAsk("Detailed decision support priorities")}
                  className="w-full py-3 rounded-2xl bg-[#1769FF] text-white font-extrabold text-xs shadow-md shadow-blue-500/20 hover:bg-blue-700 transition"
                >
                  Ask for Detailed Recommendations →
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

            <h3 className="text-lg font-black text-[#0B1736]">Select District Region</h3>
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
      {showAiModal && aiResponse && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-blue-100 relative text-xs">
            <button
              onClick={() => setShowAiModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1769FF] to-[#6246EA] flex items-center justify-center text-white">
                <Bot className="w-6 h-6 text-cyan-300" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0B1736]">AI Decision Advisor</h3>
                <p className="text-xs text-slate-500">{aiResponse.summary}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              {aiResponse.recommendations.map((rec, i) => (
                <div key={i} className="p-3 bg-blue-50 rounded-2xl border border-blue-200 space-y-1">
                  <div className="flex items-center justify-between font-bold text-[#0B1736]">
                    <span>{rec.category}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-red-100 text-red-700">{rec.priority}</span>
                  </div>
                  <div className="font-bold text-slate-900">{rec.action}</div>
                  <div className="text-slate-600 text-[11px]">{rec.reason}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAiModal(false)}
              className="w-full py-2.5 bg-[#1769FF] text-white font-bold text-xs rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* EARLY WARNING BULLETIN MODAL */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-blue-100 relative text-xs">
            <button
              onClick={() => setShowWarningModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0B1736]">Generate Official Climate Warning</h3>
                <p className="text-xs text-slate-500">Transmit official district advisory bulletin.</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target District</label>
                <input type="text" readOnly value={`${selectedLocation.name} District Administration`} className="w-full p-2.5 rounded-xl bg-slate-100 border border-slate-200 font-bold" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Bulletin Preview (Bilingual)</label>
                <textarea
                  rows={3}
                  readOnly
                  value={`OFFICIAL ADVISORY: ${selectedLocation.name} District alerts citizens of elevated heat (${selectedLocation.anomalies.tempAnomaly}) and water storage deficit (${selectedLocation.anomalies.waterAvailability}). Please conserve water and avoid direct afternoon sun exposure.`}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowWarningModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Official Climate Warning Broadcasted to ${(selectedLocation.population || 1200000).toLocaleString()} citizens in ${selectedLocation.name}.`);
                  setShowWarningModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition"
              >
                Broadcast Warning Bulletin
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
