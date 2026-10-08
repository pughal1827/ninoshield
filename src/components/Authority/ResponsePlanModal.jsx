import React, { useState } from 'react';
import { generateAIAnalysis } from '../../utils/aiAnalyst';
import { ShieldAlert, CheckCircle2, X, Download } from 'lucide-react';

export default function ResponsePlanModal({ selectedLocation, onClose }) {
  const analysis = generateAIAnalysis(selectedLocation);
  const [activated, setActivated] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-card rounded-2xl p-6 border border-blue-500/30 max-w-xl w-full space-y-4 bg-[#131b2e] shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2.5 text-blue-400">
          <ShieldAlert className="w-6 h-6" />
          <div>
            <h3 className="text-base font-extrabold text-white">
              {selectedLocation?.name || 'Chennai'} Early Response Plan
            </h3>
            <span className="text-[10px] text-blue-300 font-semibold">
              Inter-Departmental Action Protocol
            </span>
          </div>
        </div>

        <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
          {analysis.departmentalPlan.map((dept, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center space-x-2">
                  <span>{dept.icon}</span>
                  <span>{dept.department}</span>
                </span>
                <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-red-500 text-white">
                  {dept.priority}
                </span>
              </div>
              <p className="text-slate-300 mt-1">{dept.action}</p>
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span>Execution Timeline: <strong className="text-blue-300">{dept.timeline}</strong></span>
                <span className="text-emerald-400 font-semibold">✓ {dept.status}</span>
              </div>
            </div>
          ))}
        </div>

        {activated ? (
          <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold text-center">
            ✓ Response Plan Activated! Operational directives dispatched to Water, Health &amp; Ag heads.
          </div>
        ) : (
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => alert("Plan exported to PDF format for authority distribution.")}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Directives</span>
            </button>

            <button
              onClick={() => {
                setActivated(true);
                setTimeout(() => {
                  setActivated(false);
                  onClose();
                }, 2000);
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20"
            >
              CONFIRM &amp; DISPATCH PLAN
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
