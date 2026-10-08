import React from 'react';
import { getRiskCategory } from '../../data/climateData';
import { 
  Flame, 
  Droplets, 
  CloudRain, 
  Sprout, 
  HeartPulse, 
  AlertCircle,
  HelpCircle,
  TrendingUp,
  MapPin,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import ImpactChain from './ImpactChain';
import RiskProjection from './RiskProjection';

export default function LocationProfile({ location }) {
  if (!location) return null;

  const category = getRiskCategory(location.temperatureRisk);

  const breakdown = [
    { label: 'Heat Risk', val: location.temperatureRisk, icon: Flame, color: 'bg-red-500' },
    { label: 'Water Stress', val: location.waterStress, icon: Droplets, color: 'bg-blue-500' },
    { label: 'Agriculture Risk', val: location.agricultureRisk, icon: Sprout, color: 'bg-emerald-500' },
    { label: 'Health Risk', val: location.healthRisk, icon: HeartPulse, color: 'bg-amber-500' },
    { label: 'Rainfall Risk', val: location.rainfallRisk, icon: CloudRain, color: 'bg-sky-500' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Location Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-gradient-to-r from-slate-900 via-[#131b2e] to-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-black text-white tracking-tight">{location.name} District Profile</h2>
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${category.badge}`}>
                {category.level} RISK
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {location.district} • Coordinates: {location.coordinates.join(', ')} • El Niño Signal: <strong className="text-amber-400">Moderate</strong>
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-800 self-start">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Overall Climate Risk</div>
              <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                {location.temperatureRisk} / 100
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Grid: Risk Breakdown + Explainable Risk (Why this score?) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Risk Indicators Breakdown */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span>Multi-Dimensional Risk Breakdown</span>
            </h3>
            <span className="text-[11px] text-slate-400">Weighted Index</span>
          </div>

          <div className="space-y-3.5">
            {breakdown.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center space-x-2 text-slate-300 font-medium">
                      <Icon className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.label}</span>
                    </span>
                    <span className="font-bold text-white">{item.val} / 100</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.val}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FEATURE 4 — Explainable AI (Why is score high?) */}
        <div className="glass-card rounded-2xl p-5 border border-amber-500/20 bg-gradient-to-b from-amber-950/10 via-slate-900 to-slate-900 space-y-4">
          <div className="flex items-center space-x-2 text-amber-400 text-sm font-bold">
            <HelpCircle className="w-4 h-4" />
            <span>Why is this Risk Score High?</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Climate risk is elevated because of compounding temperature anomalies, below-normal rainfall, and declining reservoir storage under moderate El Niño Pacific ocean warming.
          </p>

          <div className="grid grid-cols-2 gap-2.5 text-xs pt-1">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[11px]">Temperature Anomaly</span>
              <div className="text-base font-bold text-red-400 mt-0.5">{location.anomalies.tempAnomaly}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[11px]">Rainfall Shortfall</span>
              <div className="text-base font-bold text-sky-400 mt-0.5">{location.anomalies.rainAnomaly}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[11px]">Water Availability</span>
              <div className="text-base font-bold text-blue-400 mt-0.5">{location.anomalies.waterAvailability}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[11px]">El Niño Teleconnection</span>
              <div className="text-base font-bold text-amber-400 mt-0.5">{location.anomalies.elNinoSignal}</div>
            </div>
          </div>
        </div>

      </div>

      {/* FEATURE 5 — Climate Impact Chain */}
      <ImpactChain locationName={location.name} />

      {/* FEATURE 6 — Future Risk Projection */}
      <RiskProjection />

    </div>
  );
}
