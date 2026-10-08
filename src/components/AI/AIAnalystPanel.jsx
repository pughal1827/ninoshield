import React from 'react';
import { generateAIAnalysis } from '../../utils/aiAnalyst';
import { 
  BrainCircuit, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Clock, 
  Users, 
  Flame, 
  Zap,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import PriorityActionEngine from './PriorityActionEngine';

export default function AIAnalystPanel({ selectedLocation, onGenerateWarning, onActivateResponsePlan }) {
  const analysis = generateAIAnalysis(selectedLocation);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 border border-blue-500/30 bg-gradient-to-r from-blue-950/30 via-slate-900 to-indigo-950/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <BrainCircuit className="w-6 h-6 animate-pulse-subtle" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-white tracking-tight">AI Climate Analyst</h2>
                <p className="text-xs text-blue-300">
                  Autonomous Scenario Synthesis for <strong className="text-white">{selectedLocation?.name} District</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onGenerateWarning}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold shadow-lg shadow-amber-500/20"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Generate Early Warning</span>
            </button>
            <button
              onClick={onActivateResponsePlan}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Activate Response Plan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Situation Summary + Primary Risk & Impacts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Situation Summary & Main Risk */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>Current Climate Situation</span>
              </span>
              <span className="text-[10px] text-slate-500">Updated Real-Time</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              "{analysis.summary}"
            </p>
            
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Primary Emerging Threat</span>
                <div className="text-sm font-extrabold text-white">{analysis.primaryRisk}</div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-500 text-white">
                HIGH URGENCY
              </span>
            </div>
          </div>

          {/* Potential Impacts List */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Potential Cascading Impacts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {analysis.secondaryRisks.map((impact, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-2.5 text-xs text-slate-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{impact}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Feature 10: Vulnerability Analysis Sidebar */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Vulnerability Analysis</span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
            <span className="text-xs text-slate-400 block">Total Population at Risk</span>
            <div className="text-2xl font-black text-white mt-0.5">{selectedLocation?.populationAtRisk || '1.2 Million'}</div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Elderly Citizens (&gt;65)</span>
              <span className="font-bold text-white">{selectedLocation?.vulnerableGroups?.elderly || '85,000'}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Children &amp; Infants</span>
              <span className="font-bold text-white">{selectedLocation?.vulnerableGroups?.children || '120,000'}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Agricultural Farmers</span>
              <span className="font-bold text-emerald-400">{selectedLocation?.vulnerableGroups?.farmers || '120,000'}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Outdoor Labor Force</span>
              <span className="font-bold text-amber-400">{selectedLocation?.vulnerableGroups?.outdoorWorkers || '75,000'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Feature 9: Priority Action Engine */}
      <PriorityActionEngine priorityActions={analysis.priorityActions} />

      {/* Feature 8: Action Playbooks (Immediate, Short-Term, Community) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Immediate Actions */}
        <div className="glass-card rounded-2xl p-5 border border-red-500/20 bg-slate-900/80 space-y-3">
          <div className="flex items-center space-x-2 text-red-400 text-xs font-bold">
            <Clock className="w-4 h-4" />
            <span>Immediate Actions (0 - 48h)</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {analysis.immediateActions.map((act, i) => (
              <li key={i} className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Short-Term Actions */}
        <div className="glass-card rounded-2xl p-5 border border-amber-500/20 bg-slate-900/80 space-y-3">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold">
            <Clock className="w-4 h-4" />
            <span>Short-Term Actions (3 - 7d)</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {analysis.shortTermActions.map((act, i) => (
              <li key={i} className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Community Actions */}
        <div className="glass-card rounded-2xl p-5 border border-blue-500/20 bg-slate-900/80 space-y-3">
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold">
            <Users className="w-4 h-4" />
            <span>Community Safety Guidance</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {analysis.communityActions.map((act, i) => (
              <li key={i} className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
}
