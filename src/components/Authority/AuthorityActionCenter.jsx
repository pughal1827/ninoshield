import React from 'react';
import { SAMPLE_LOCATIONS, getRiskCategory } from '../../data/climateData';
import { ShieldAlert, CheckCircle2, AlertTriangle, Building2, ChevronRight, Zap } from 'lucide-react';

export default function AuthorityActionCenter({ selectedLocation, onActivateResponsePlan, onGenerateWarning }) {
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-extrabold text-white">Authority Action Center</h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Multi-district emergency coordination & anticipatory resource deployment portal.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onActivateResponsePlan}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 flex items-center space-x-2"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>ACTIVATE RESPONSE PLAN</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: High-Risk District Comparison + Response Priorities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* District Risk Comparison Table */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              High-Risk District Comparison
            </h3>
            <span className="text-[10px] text-slate-500">Sorted by Severity</span>
          </div>

          <div className="space-y-2.5">
            {SAMPLE_LOCATIONS.map((loc) => {
              const cat = getRiskCategory(loc.temperatureRisk);
              return (
                <div 
                  key={loc.id} 
                  className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-all text-xs"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div>
                      <h4 className="font-bold text-white">{loc.name} District</h4>
                      <p className="text-[11px] text-slate-400">{loc.mainThreat}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-slate-400 text-[11px] hidden sm:inline">Pop: {loc.populationAtRisk}</span>
                    <span className={`font-extrabold text-xs px-2.5 py-1 rounded ${cat.badge}`}>
                      {loc.temperatureRisk} / 100
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Operational Priorities */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Top Departmental Priorities
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20">
              <span className="text-[10px] font-bold text-red-400 uppercase block">Priority #1 • Water Department</span>
              <h4 className="font-bold text-white mt-0.5">Reservoir Drawdown Protocol</h4>
              <p className="text-[11px] text-slate-300 mt-1">Initiate daily inflow metering across Poondi & Mettur reservoirs.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <span className="text-[10px] font-bold text-orange-400 uppercase block">Priority #2 • Health Department</span>
              <h4 className="font-bold text-white mt-0.5">Heat-Health Alert Setup</h4>
              <p className="text-[11px] text-slate-300 mt-1">Equip 120 primary health centers with IV fluids and cooling wards.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[10px] font-bold text-emerald-400 uppercase block">Priority #3 • Agriculture Cell</span>
              <h4 className="font-bold text-white mt-0.5">Crop Advisory Broadcast</h4>
              <p className="text-[11px] text-slate-300 mt-1">Distribute dryland seed kits and micro-irrigation guidance.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
