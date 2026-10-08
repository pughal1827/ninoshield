import React from 'react';
import { Calendar, Clock, AlertTriangle, ChevronRight, ShieldAlert } from 'lucide-react';

export default function RiskProjection() {
  const timeline = [
    {
      period: "TODAY",
      title: "Early Climate Signals Detected",
      status: "ACTIVE",
      risk: "MODERATE (65)",
      badge: "bg-yellow-500 text-black",
      desc: "Pacific thermal anomaly detected (+1.5°C). Initial reservoir drawdown monitoring initiated."
    },
    {
      period: "7 DAYS",
      title: "Increasing Heat & Water Stress",
      status: "PROJECTED",
      risk: "HIGH (74)",
      badge: "bg-orange-500 text-white",
      desc: "Thermal heat index rises. Secondary reservoir capacity projected to drop below 50%."
    },
    {
      period: "14 DAYS",
      title: "Agricultural Moisture Deficit",
      status: "PROJECTED",
      risk: "HIGH (79)",
      badge: "bg-orange-500 text-white",
      desc: "Soil moisture depletion impacts dryland crops. Targeted irrigation advisories required."
    },
    {
      period: "30 DAYS",
      title: "Potential Severe Urban Water Stress",
      status: "PROJECTED",
      risk: "CRITICAL (86)",
      badge: "bg-red-500 text-white",
      desc: "Potential drinking water scarcity in urban zones without early water conservation intervention."
    }
  ];

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Potential Risk Trajectory</h3>
          </div>
          <p className="text-xs text-slate-400">30-Day Scenario-Based Anticipatory Action Timeline</p>
        </div>

        <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 self-start">
          ⚠️ Scenario-Based Projection
        </span>
      </div>

      {/* Timeline Progression */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
        {timeline.map((item, idx) => (
          <div 
            key={idx} 
            className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-2 relative"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                {item.period}
              </span>
              <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${item.badge}`}>
                {item.risk}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white mb-1">{item.title}</h4>
              <p className="text-[11px] text-slate-400 leading-tight">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Safety Disclaimer */}
      <p className="text-[10px] text-slate-500 italic border-t border-slate-800/80 pt-2">
        Disclaimer: Prototype for decision support. Risk trajectories are scenario-based simulations derived from El Niño teleconnection models and should be validated against official emergency management sources before operational deployment.
      </p>
    </div>
  );
}
