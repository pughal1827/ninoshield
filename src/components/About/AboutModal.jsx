import React from 'react';
import { Info, X, ShieldCheck, CheckCircle2, Code2 } from 'lucide-react';
import { RISK_WEIGHTS } from '../../data/climateData';

export default function AboutModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-card rounded-2xl p-6 border border-blue-500/30 max-w-lg w-full space-y-4 bg-[#131b2e] shadow-2xl relative text-xs">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2.5 text-blue-400">
          <Info className="w-5 h-5" />
          <h3 className="text-base font-extrabold text-white">Transparency &amp; Explainable AI Model</h3>
        </div>

        <p className="text-slate-300 leading-relaxed">
          NinoShield operates on a transparent, configurable multi-hazard climate risk model rather than an opaque black box.
        </p>

        {/* Weighted Formula Breakdown */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
          <h4 className="font-bold text-white uppercase text-[10px] tracking-wider text-blue-400">
            Explainable Risk Scoring Formula
          </h4>
          <div className="font-mono text-blue-300 text-[11px] bg-slate-900 p-2 rounded border border-slate-800">
            Risk Score = (0.30 × Temp) + (0.25 × Rain) + (0.20 × Water) + (0.15 × ElNiño) + (0.10 × Vuln)
          </div>

          <div className="space-y-1.5 pt-1 text-slate-300">
            <div className="flex justify-between">
              <span>Temperature Anomaly Risk:</span>
              <strong className="text-red-400">30% Weight</strong>
            </div>
            <div className="flex justify-between">
              <span>Rainfall Deficit Risk:</span>
              <strong className="text-sky-400">25% Weight</strong>
            </div>
            <div className="flex justify-between">
              <span>Reservoir Water Stress:</span>
              <strong className="text-blue-400">20% Weight</strong>
            </div>
            <div className="flex justify-between">
              <span>El Niño Pacific Signal:</span>
              <strong className="text-amber-400">15% Weight</strong>
            </div>
            <div className="flex justify-between">
              <span>Population Vulnerability:</span>
              <strong className="text-emerald-400">10% Weight</strong>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-slate-300">
          <strong className="text-blue-300 block mb-1">Hackathon MVP Trust Disclaimer:</strong>
          Prototype for decision support. Risk estimates are scenario-based and should be validated against official meteorological and emergency-management sources before operational deployment.
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
