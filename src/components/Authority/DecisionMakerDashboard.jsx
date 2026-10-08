import React, { useState } from 'react';
import { useNinoShield } from '../../context/NinoShieldContext';
import HeaderBanner from '../Layout/HeaderBanner';
import RealInteractiveMap from '../Map/RealInteractiveMap';
import {
  Shield,
  MapPin,
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
  X,
  Plus,
  Minus,
  Megaphone,
  LayoutDashboard,
  Settings,
  Package,
  ClipboardList,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Zap,
  Info,
  LogOut
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
  onNavigateLanding
}) {
  const {
    lang,
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
    generateAiRecommendation,
    decisionMakerAuth,
    logoutDecisionMaker
  } = useNinoShield();

  // Modals & State
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userName = decisionMakerAuth?.user?.name || 'Pughal (Admin)';

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
    const res = generateAiRecommendation(selectedLocation, query || "What should we prioritize today?");
    setAiResponse(res);
    setShowAiModal(true);
  };

  const waterReportCount = userReports.filter(r => r.type === 'water' || r.category === 'Water Shortage').length + (selectedLocation.communityReports?.waterShortage || 24);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex">
      
      {/* 1. LEFT SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between shrink-0 hidden lg:flex sticky top-0 h-screen">
        <div className="space-y-6">
          
          {/* Logo Header */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onNavigateLanding}>
            <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-base text-slate-900 tracking-tight">NinoShield</div>
              <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Decision Intelligence</div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => navigate('/decision-maker')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition cursor-pointer ${isMainDashboard ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate('/decision-maker/risk')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition cursor-pointer ${isRiskPage ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Regional Risk Map</span>
            </button>

            <button
              onClick={() => setShowWarningModal(true)}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span>Alerts</span>
            </button>

            <button
              onClick={() => navigate('/decision-maker/impact')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition cursor-pointer ${isImpactPage ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Impact Analysis</span>
            </button>

            <button
              onClick={() => navigate('/decision-maker/actions')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition cursor-pointer ${isActionsPage ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>Action Plan</span>
            </button>

            <button
              onClick={() => navigate('/decision-maker/resources')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition cursor-pointer ${isResourcesPage ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Package className="w-4 h-4" />
              <span>Resource Management</span>
            </button>

            <button
              onClick={() => navigate('/decision-maker/reports')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition cursor-pointer ${isReportsPage ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <FileText className="w-4 h-4" />
              <span>Reports &amp; Signals</span>
            </button>

            <button
              onClick={() => handleAiAsk("What should we prioritize today?")}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <Bot className="w-4 h-4 text-purple-600" />
              <span>AI Advisor</span>
            </button>

            <button
              onClick={() => setShowLocationModal(true)}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>

        </div>

        {/* Clean Sidebar Footer */}
        <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center font-medium">
          NinoShield Decision-Maker Portal
        </div>
      </aside>

      {/* 2. MAIN VIEW AREA */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-6xl mx-auto space-y-6">

        {/* HEADER BANNER */}
        <HeaderBanner
          title={`${selectedLocation.name} District Administration`}
          subtitle="Climate intelligence for informed decisions and early action."
          mode="decision-maker"
          onOpenLocationModal={() => setShowLocationModal(true)}
        />

        {/* PRIMARY QUESTION BANNER */}
        <div className="bg-slate-900 text-white rounded-xl p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3">
            <HelpCircle className="w-5 h-5 text-blue-400 shrink-0" />
            <div>
              <div className="text-xs text-blue-400 font-bold uppercase tracking-wider">Primary Question</div>
              <h2 className="text-base sm:text-lg font-black text-white">
                "Where should we act first?"
              </h2>
            </div>
          </div>
          <span className="hidden sm:inline-block text-xs font-bold px-3 py-1 bg-slate-800 rounded-md text-blue-300 border border-slate-700">
            Selected District: {selectedLocation.name}
          </span>
        </div>

        {/* SUB-PAGES OR MAIN DASHBOARD */}
        {isRiskPage ? (
          /* SUB-PAGE: REGIONAL RISK MAP */
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/decision-maker')} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-extrabold text-slate-900">Regional Climate Risk Map</h2>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
              <RealInteractiveMap height="550px" />
            </div>
          </div>
        ) : isImpactPage ? (
          /* SUB-PAGE: IMPACT ANALYSIS */
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/decision-maker')} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-extrabold text-slate-900">Sectoral Impact Analysis &amp; 30-Day Trajectory</h2>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-semibold">
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">Population</div>
                  <div className="text-xl font-black text-slate-900 mt-0.5">1.2M</div>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">Farmers</div>
                  <div className="text-xl font-black text-slate-900 mt-0.5">310K</div>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">Outdoor Workers</div>
                  <div className="text-xl font-black text-slate-900 mt-0.5">240K</div>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">Elderly</div>
                  <div className="text-xl font-black text-slate-900 mt-0.5">120K</div>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">Children</div>
                  <div className="text-xl font-black text-slate-900 mt-0.5">185K</div>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">Critical Facilities</div>
                  <div className="text-xl font-black text-slate-900 mt-0.5">34</div>
                </div>
              </div>

              <div className="h-60 w-full pt-3 border-t border-slate-100">
                <div className="text-sm font-bold text-slate-900 mb-2">30-Day Scenario Risk Trajectory</div>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                    <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                    <Line type="monotone" dataKey="score" stroke="#dc2626" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : isActionsPage ? (
          /* SUB-PAGE: ACTION PLAN */
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/decision-maker')} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-extrabold text-slate-900">Recommended Early Action Plan</h2>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                      <th className="p-3">Priority</th>
                      <th className="p-3">Department</th>
                      <th className="p-3">Action</th>
                      <th className="p-3">Timeline</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-900">
                    {actionPlan.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50">
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
                            className={`px-3 py-1 rounded-md text-xs font-bold border cursor-pointer transition ${item.bg}`}
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
          /* SUB-PAGE: RESOURCES */
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/decision-maker')} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-extrabold text-slate-900">Resource Management</h2>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {resources.map(res => {
                  const gap = Math.max(0, res.required - res.available);
                  return (
                    <div key={res.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
                      <div className="font-bold text-slate-900 text-xs">{res.name}</div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Avail: <strong>{res.available}</strong></span>
                        <span>Req: <strong>{res.required}</strong></span>
                      </div>
                      {gap > 0 ? (
                        <div className="text-[11px] font-bold text-red-600 bg-red-50 p-1.5 rounded border border-red-100 text-center">
                          Gap: -{gap} {res.unit}
                        </div>
                      ) : (
                        <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 p-1.5 rounded border border-emerald-100 text-center">
                          Adequate
                        </div>
                      )}

                      <div className="flex justify-center space-x-2 pt-1">
                        <button onClick={() => updateResource(res.id, -1)} className="w-7 h-7 rounded bg-slate-200 text-slate-800 font-bold flex items-center justify-center cursor-pointer">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => updateResource(res.id, 1)} className="w-7 h-7 rounded bg-blue-600 text-white font-bold flex items-center justify-center cursor-pointer">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : isReportsPage ? (
          /* SUB-PAGE: CITIZEN REPORTS */
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/decision-maker')} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-extrabold text-slate-900">Reports &amp; Community Signals</h2>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
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
        ) : (
          /* MAIN DECISION-MAKER DASHBOARD */
          <div className="space-y-6">
            
            {/* 1. TOP SUMMARY METRICS (Compact, Not Visually Dominant) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              
              <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-xs">
                <div className="text-slate-500 font-medium text-[11px]">Overall Regional Risk</div>
                <div className="text-xl font-black text-red-600 mt-0.5">78 / 100</div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-xs">
                <div className="text-slate-500 font-medium text-[11px]">High-Risk Areas</div>
                <div className="text-xl font-black text-slate-900 mt-0.5">7 / 14 Districts</div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-xs">
                <div className="text-slate-500 font-medium text-[11px]">Population Affected</div>
                <div className="text-xl font-black text-slate-900 mt-0.5">1.8M People</div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-xs">
                <div className="text-slate-500 font-medium text-[11px]">Active Alerts</div>
                <div className="text-xl font-black text-amber-600 mt-0.5">3 Active</div>
              </div>

            </div>

            {/* 2. PRIMARY ELEMENT: REGIONAL RISK MAP & INTERACTION CARD */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">REGIONAL RISK MAP (PRIMARY ANALYSIS)</h3>
                </div>
                <span className="text-xs font-semibold text-slate-500">Interactive OpenStreetMap</span>
              </div>

              {/* Large Map Component */}
              <RealInteractiveMap height="460px" />

              {/* Region Details Breakdown Card */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase">Selected Region</span>
                    <h4 className="text-lg font-black text-slate-900">{selectedLocation.name}</h4>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-600">Risk Score:</span>
                    <span className="px-3 py-1 rounded bg-red-600 text-white font-black text-sm">
                      {selectedLocation.overallRisk} HIGH
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-800 font-semibold">
                  <div className="bg-white p-2.5 rounded border border-slate-200">
                    <div className="text-slate-500 text-[10px]">Heat Risk</div>
                    <div className="text-red-600 font-bold text-sm">{selectedLocation.temperatureRisk}</div>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-slate-200">
                    <div className="text-slate-500 text-[10px]">Water Stress</div>
                    <div className="text-red-600 font-bold text-sm">{selectedLocation.waterStress}</div>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-slate-200">
                    <div className="text-slate-500 text-[10px]">Rainfall Deficit</div>
                    <div className="text-amber-600 font-bold text-sm">{selectedLocation.rainfallRisk}</div>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-slate-200">
                    <div className="text-slate-500 text-[10px]">Ag Stress</div>
                    <div className="text-red-600 font-bold text-sm">{selectedLocation.agricultureRisk}</div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded border border-slate-200 text-xs text-slate-800 space-y-1">
                  <div className="font-bold text-slate-900">WHY IS THERE A RISK?</div>
                  <p className="text-slate-600">
                    Rainfall is {selectedLocation.anomalies.rainAnomaly}, water availability is {selectedLocation.anomalies.waterAvailability}, and {waterReportCount} community water shortage reports have been submitted.
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => navigate('/decision-maker/actions')}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer"
                  >
                    View Action Plan →
                  </button>
                </div>
              </div>
            </div>

            {/* 3. AI DECISION ADVISOR */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-purple-600" />
                  <h3 className="font-extrabold text-sm text-slate-900">AI DECISION ADVISOR</h3>
                </div>
                <span className="text-xs font-bold text-slate-500">Decision-Oriented Guidance</span>
              </div>

              <div className="text-xs text-slate-600 font-bold uppercase tracking-wider">
                Question: "What should we prioritize today?"
              </div>

              <div className="space-y-3 text-xs">
                
                {/* Rec 1 */}
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span className="flex items-center space-x-2">
                      <span className="w-5 h-5 rounded bg-red-100 text-red-700 flex items-center justify-center text-[10px] font-black">1</span>
                      <span>Inspect water sources &amp; deploy emergency water tankers</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white font-extrabold text-[10px]">HIGH PRIORITY</span>
                  </div>
                  <p className="text-slate-600 font-medium text-[11px] leading-relaxed pl-7">
                    <strong>WHY:</strong> Recommended because rainfall is {selectedLocation.anomalies.rainAnomaly}, water availability has declined {selectedLocation.anomalies.waterAvailability}, and {waterReportCount} citizen water-shortage reports were received in {selectedLocation.name}.
                  </p>
                </div>

                {/* Rec 2 */}
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span className="flex items-center space-x-2">
                      <span className="w-5 h-5 rounded bg-red-100 text-red-700 flex items-center justify-center text-[10px] font-black">2</span>
                      <span>Issue heat-health advisory &amp; activate hydration centers</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white font-extrabold text-[10px]">HIGH PRIORITY</span>
                  </div>
                  <p className="text-slate-600 font-medium text-[11px] leading-relaxed pl-7">
                    <strong>WHY:</strong> Temperature departure is {selectedLocation.anomalies.tempAnomaly} with high thermal risk for 240,000 outdoor workers and 120,000 elderly residents.
                  </p>
                </div>

                {/* Rec 3 */}
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span className="flex items-center space-x-2">
                      <span className="w-5 h-5 rounded bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-black">3</span>
                      <span>Support agricultural planning &amp; micro-irrigation advice</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-500 text-white font-extrabold text-[10px]">MEDIUM PRIORITY</span>
                  </div>
                  <p className="text-slate-600 font-medium text-[11px] leading-relaxed pl-7">
                    <strong>WHY:</strong> Rainfall deficit threatens standing paddy crops across 310,000 agricultural households.
                  </p>
                </div>

              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => navigate('/decision-maker/actions')}
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition cursor-pointer"
                >
                  Generate Early Action Plan →
                </button>
              </div>
            </div>

            {/* 4. EARLY ACTION PLAN TABLE */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm text-slate-900">EARLY ACTION PLAN</h3>
                <button onClick={() => navigate('/decision-maker/actions')} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                  Manage Full Plan →
                </button>
              </div>

              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                      <th className="p-2.5">Action</th>
                      <th className="p-2.5">Department</th>
                      <th className="p-2.5">Priority</th>
                      <th className="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-900">
                    {actionPlan.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold">{item.action}</td>
                        <td className="p-2.5 text-slate-600">{item.dept}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${item.priority.includes('HIGH') ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'}`}>
                            {item.priority.includes('HIGH') ? 'HIGH' : 'MEDIUM'}
                          </span>
                        </td>
                        <td className="p-2.5">
                          <button
                            onClick={() => {
                              const nextStatus = item.status === 'Pending' ? 'In Progress' : item.status === 'In Progress' ? 'Approved' : 'Pending';
                              updateActionStatus(item.id, nextStatus);
                            }}
                            className={`px-2.5 py-1 rounded text-xs font-bold border cursor-pointer ${item.bg}`}
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

            {/* 5. COMMUNITY SIGNAL LOOP (CORE DIFFERENTIATOR) */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                <div className="flex items-center space-x-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span>COMMUNITY SIGNAL LOOP (CORE DIFFERENTIATOR)</span>
                </div>
                <span className="text-[10px] font-bold text-blue-700">End-to-End Pipeline</span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Demonstrating live how citizen observations dynamically inform community readiness and drive decision-maker action:
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-800 pt-1">
                <div className="p-2.5 bg-white rounded-lg border border-blue-200 text-center flex-1 min-w-[120px]">
                  <div className="text-blue-600 text-[10px] uppercase">1. Person Report</div>
                  <div className="text-slate-900 text-xs mt-0.5">Water Shortage</div>
                </div>
                <span className="text-blue-400">→</span>

                <div className="p-2.5 bg-white rounded-lg border border-blue-200 text-center flex-1 min-w-[120px]">
                  <div className="text-blue-600 text-[10px] uppercase">2. Local Signal</div>
                  <div className="text-slate-900 text-xs mt-0.5">{waterReportCount} Reports</div>
                </div>
                <span className="text-blue-400">→</span>

                <div className="p-2.5 bg-white rounded-lg border border-blue-200 text-center flex-1 min-w-[120px]">
                  <div className="text-blue-600 text-[10px] uppercase">3. Community Map</div>
                  <div className="text-slate-900 text-xs mt-0.5">Hotspot Pin</div>
                </div>
                <span className="text-blue-400">→</span>

                <div className="p-2.5 bg-white rounded-lg border border-blue-200 text-center flex-1 min-w-[120px]">
                  <div className="text-blue-600 text-[10px] uppercase">4. AI Rationale</div>
                  <div className="text-slate-900 text-xs mt-0.5">Priority Flag</div>
                </div>
                <span className="text-blue-400">→</span>

                <div className="p-2.5 bg-emerald-600 text-white rounded-lg border border-emerald-700 text-center flex-1 min-w-[120px]">
                  <div className="text-emerald-200 text-[10px] uppercase">5. Early Action</div>
                  <div className="text-white text-xs mt-0.5">Tanker Deploy</div>
                </div>
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

            <h3 className="text-base font-bold text-slate-900">Select Region</h3>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {locations.map(loc => (
                <div
                  key={loc.id}
                  onClick={() => {
                    changeLocation(loc.id);
                    setShowLocationModal(false);
                  }}
                  className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between transition ${selectedLocation.id === loc.id ? 'bg-slate-100 border-slate-900' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
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
      {showAiModal && aiResponse && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200 relative text-xs">
            <button
              onClick={() => setShowAiModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-md bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Bot className="w-4 h-4 text-purple-600" />
              <h3 className="text-base font-bold text-slate-900">AI Decision Support Rationale</h3>
            </div>

            <p className="text-slate-700 font-medium">{aiResponse.summary}</p>

            <div className="space-y-2">
              {aiResponse.recommendations.map((rec, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>{rec.category}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-red-100 text-red-700 font-bold">{rec.priority}</span>
                  </div>
                  <p className="text-slate-900 font-bold">{rec.action}</p>
                  <p className="text-slate-600 font-medium text-[11px]">WHY: {rec.reason}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAiModal(false)}
              className="w-full py-2 bg-slate-900 text-white font-bold rounded-lg cursor-pointer"
            >
              Close Advisor
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
