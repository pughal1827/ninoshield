import React from 'react';
import { 
  Flame, 
  Droplets, 
  CloudRain, 
  Sprout, 
  HeartPulse, 
  ShieldAlert, 
  SlidersHorizontal, 
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  BrainCircuit,
  Zap,
  CheckCircle2
} from 'lucide-react';
import RiskMap from './RiskMap';

export default function CommandCenter({ 
  selectedLocation, 
  setSelectedLocation, 
  calculatedRiskScore, 
  onGenerateWarning, 
  onActivateResponsePlan, 
  onLaunchSimulator,
  onViewLocationProfile,
  setActiveView
}) {
  const kpiData = [
    { title: 'Temperature Risk', val: selectedLocation?.temperatureRisk || 82, icon: Flame, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', desc: '+2.1°C thermal anomaly' },
    { title: 'Rainfall Deficit Risk', val: selectedLocation?.rainfallRisk || 65, icon: CloudRain, color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20', desc: '-22% monsoon shortfall' },
    { title: 'Water Stress', val: selectedLocation?.waterStress || 76, icon: Droplets, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', desc: '-17% reservoir drawdown' },
    { title: 'Agriculture Risk', val: selectedLocation?.agricultureRisk || 71, icon: Sprout, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', desc: 'High soil moisture deficit' },
    { title: 'Health & Heat Risk', val: selectedLocation?.healthRisk || 64, icon: HeartPulse, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', desc: 'Vulnerable populations alert' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner & Quick Triggers */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 bg-gradient-to-r from-slate-900 via-[#11192e] to-slate-900 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-extrabold text-white tracking-tight">Climate Command Center</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              🟠 El Niño: MODERATE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Live AI risk monitoring for <span className="text-white font-semibold">{selectedLocation?.name || 'Chennai'} District</span>. Real-time translation of climate signals into early response actions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <button
            onClick={onGenerateWarning}
            className="flex-1 lg:flex-none flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold shadow-lg shadow-amber-500/20 transition-all"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Generate Early Warning</span>
          </button>

          <button
            onClick={onActivateResponsePlan}
            className="flex-1 lg:flex-none flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Activate Response Plan</span>
          </button>

          <button
            onClick={onLaunchSimulator}
            className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
            <span>What-If Simulator</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
        
        {/* Overall Climate Risk Score Card */}
        <div className="sm:col-span-2 lg:col-span-1 glass-card rounded-2xl p-4 border border-orange-500/30 bg-gradient-to-br from-orange-950/30 via-slate-900 to-slate-950 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Overall Climate Risk</span>
            <TrendingUp className="w-4 h-4 text-orange-400" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              {calculatedRiskScore} <span className="text-sm font-semibold text-slate-400">/ 100</span>
            </div>
            <div className="text-xs font-bold text-orange-400 mt-0.5 flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-orange-500 inline-block animate-ping"></span>
              <span>HIGH RISK CATEGORY</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500">Formula: 30% T + 25% R + 20% W + 15% E + 10% V</p>
        </div>

        {/* 5 Indicator KPI Cards */}
        {kpiData.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div 
              key={idx} 
              className={`glass-card rounded-2xl p-3.5 border ${kpi.border} bg-slate-900/60 hover:bg-slate-900 transition-all flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">{kpi.title}</span>
                <div className={`p-1.5 rounded-lg ${kpi.bg}`}>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>
              <div className="my-1.5">
                <div className="text-2xl font-bold text-white">{kpi.val}</div>
                <div className="text-[10px] font-medium text-slate-400 line-clamp-1">{kpi.desc}</div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${kpi.val >= 75 ? 'bg-red-500' : kpi.val >= 60 ? 'bg-orange-500' : 'bg-yellow-500'}`} 
                  style={{ width: `${kpi.val}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Map + Emerging Threat Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Map Component (Spans 2 columns) */}
        <div className="lg:col-span-2">
          <RiskMap 
            selectedLocation={selectedLocation} 
            setSelectedLocation={setSelectedLocation} 
            onViewLocationProfile={onViewLocationProfile}
          />
        </div>

        {/* Right Sidebar: AI Recommended Actions & Emerging Threats */}
        <div className="space-y-4">
          
          {/* AI Urgent Action Box */}
          <div className="glass-card rounded-2xl p-4 border border-blue-500/30 bg-gradient-to-b from-blue-950/20 to-slate-900">
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 mb-2">
              <BrainCircuit className="w-4 h-4 text-blue-400" />
              <span>AI PRIORITIZED ACTION</span>
            </div>
            <h4 className="text-sm font-extrabold text-white">
              1. Monitor Reservoir Outflows & Aquifer Levels
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Chennai reservoir storage is at 52% of seasonal capacity. Initiating water conservation alerts now prevents emergency supply rationing in 3 weeks.
            </p>
            <div className="mt-3 flex items-center justify-between text-[11px]">
              <span className="font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                CRITICAL PRIORITY
              </span>
              <button 
                onClick={() => setActiveView('ai-analyst')} 
                className="text-blue-400 hover:underline flex items-center space-x-0.5 font-semibold"
              >
                <span>View All 4 Actions</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Quick Threat Summary Card */}
          <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Vulnerable Population Breakdown
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Elderly (&gt;65 yrs)</span>
                <span className="text-sm font-bold text-white">85,000</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Children</span>
                <span className="text-sm font-bold text-white">120,000</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Farmers</span>
                <span className="text-sm font-bold text-emerald-400">120,000</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Outdoor Labor</span>
                <span className="text-sm font-bold text-amber-400">75,000</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
              <span className="text-[11px] text-blue-300 font-medium">
                Total Affected: <strong className="text-white">1.2 Million Citizens</strong>
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
