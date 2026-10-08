import React, { useState } from 'react';
import { ArrowRight, Flame, Droplets, CloudRain, Sprout, Users, Info } from 'lucide-react';

export default function ImpactChain({ locationName }) {
  const [selectedStep, setSelectedStep] = useState(2);

  const chainSteps = [
    {
      id: 0,
      title: "El Niño Signal",
      icon: Flame,
      color: "border-amber-500 bg-amber-500/10 text-amber-400",
      desc: "Equatorial Pacific ocean temperature anomaly reaches +1.5°C."
    },
    {
      id: 1,
      title: "Rainfall Deficit",
      icon: CloudRain,
      color: "border-sky-500 bg-sky-500/10 text-sky-400",
      desc: "Monsoon precipitation drops 22% below historical 30-year average."
    },
    {
      id: 2,
      title: "Lower Water Storage",
      icon: Droplets,
      color: "border-blue-500 bg-blue-500/10 text-blue-400",
      desc: "Municipal reservoirs and groundwater aquifers experience rapid drawdown."
    },
    {
      id: 3,
      title: "Agricultural Stress",
      icon: Sprout,
      color: "border-emerald-500 bg-emerald-500/10 text-emerald-400",
      desc: "Soil moisture deficit triggers crop wilting and harvest yield reductions."
    },
    {
      id: 4,
      title: "Community Impact",
      icon: Users,
      color: "border-red-500 bg-red-500/10 text-red-400",
      desc: "Increased water scarcity, economic stress & health emergencies across 1.2M citizens."
    }
  ];

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white">Climate Impact Chain</h3>
          <p className="text-xs text-slate-400">
            How a global El Niño signal cascades into hyper-local societal impacts in {locationName}.
          </p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
          CLICK STAGE TO INSPECT
        </span>
      </div>

      {/* Chain Timeline Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 relative">
        {chainSteps.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = selectedStep === idx;
          return (
            <div
              key={step.id}
              onClick={() => setSelectedStep(idx)}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                isSelected 
                  ? `${step.color} ring-2 ring-blue-400 shadow-lg scale-105 z-10` 
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Stage 0{idx + 1}</span>
                <Icon className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white leading-tight">{step.title}</h4>
            </div>
          );
        })}
      </div>

      {/* Selected Stage Detail Panel */}
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-3 text-xs">
        <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">{chainSteps[selectedStep].title}: </strong>
          <span className="text-slate-300">{chainSteps[selectedStep].desc}</span>
        </div>
      </div>
    </div>
  );
}
