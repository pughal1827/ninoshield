import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  LineChart, 
  SlidersHorizontal, 
  BrainCircuit, 
  ShieldAlert, 
  Radio, 
  Users, 
  Info 
} from 'lucide-react';

export default function Sidebar({ activeView, setActiveView, isCitizenMode }) {
  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard, badge: null },
    { id: 'risk-map', label: 'Interactive Risk Map', icon: Map, badge: 'TN' },
    { id: 'risk-analysis', label: 'Location Risk Profile', icon: LineChart, badge: null },
    { id: 'simulator', label: 'What-If Simulator', icon: SlidersHorizontal, badge: 'AI' },
    { id: 'ai-analyst', label: 'AI Climate Analyst', icon: BrainCircuit, badge: 'Live' },
    { id: 'authority', label: 'Authority Action Center', icon: ShieldAlert, badge: 'Plan' },
    { id: 'signals', label: 'Community Signals', icon: Radio, badge: '34' },
    { id: 'citizen', label: 'Citizen View', icon: Users, badge: null },
    { id: 'about', label: 'Explainable AI', icon: Info, badge: null },
  ];

  return (
    <aside className="w-64 bg-[#0b0f19] border-r border-slate-800/80 flex flex-col justify-between hidden md:flex shrink-0">
      <div className="py-4 px-3 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Platform Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                  isActive ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Status Card */}
      <div className="p-3 m-3 rounded-xl glass-card border border-blue-500/20 bg-gradient-to-b from-slate-900 to-blue-950/40">
        <div className="flex items-center space-x-2 text-xs font-semibold text-blue-300 mb-1">
          <BrainCircuit className="w-4 h-4 text-blue-400" />
          <span>Anticipatory Engine</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-tight">
          Translating climate signals into localized action plans before disaster hits.
        </p>
      </div>
    </aside>
  );
}
