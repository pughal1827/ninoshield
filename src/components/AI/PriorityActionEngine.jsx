import React from 'react';
import { ShieldAlert, AlertTriangle, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function PriorityActionEngine({ priorityActions }) {
  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>Priority Action Engine</span>
          </h3>
          <p className="text-xs text-slate-400">
            AI ranked early intervention playbooks sorted by severity and impact window.
          </p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
          RANKED BY IMPACT
        </span>
      </div>

      <div className="space-y-3">
        {priorityActions.map((item) => (
          <div 
            key={item.id} 
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            <div className="flex items-start space-x-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-slate-200 text-xs font-black shrink-0 mt-0.5">
                #{item.rank}
              </span>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded ${item.badgeColor}`}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  <strong className="text-slate-400">Why Priority:</strong> {item.reason}
                </p>
              </div>
            </div>

            <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg self-start md:self-center shrink-0">
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
