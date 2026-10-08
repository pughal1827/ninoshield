import React, { useState } from 'react';
import { SAMPLE_LOCATIONS, getRiskCategory } from '../../data/climateData';
import { MapPin, AlertTriangle, Users, Flame, Droplets, CloudRain, ChevronRight, X } from 'lucide-react';

export default function RiskMap({ selectedLocation, setSelectedLocation, onViewLocationProfile }) {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <div className="glass-card rounded-2xl border border-slate-800 p-4 lg:p-5 relative overflow-hidden">
      
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-bold text-white">Interactive Climate Risk Map</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
              TAMIL NADU REGION
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Click any district pin to inspect localized risk breakdown & AI recommended actions.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-3 text-[11px] bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 self-start">
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span className="text-slate-300">Critical (71-100)</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
            <span className="text-slate-300">High (51-70)</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
            <span className="text-slate-300">Moderate (31-50)</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-slate-300">Low (&lt;30)</span>
          </span>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[380px] sm:h-[420px] rounded-xl bg-[#090d16] border border-slate-800/80 overflow-hidden flex flex-col justify-between">
        
        {/* Stylized SVG Map Layer for South India / Tamil Nadu */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0d1424] to-slate-950">
          
          {/* Decorative Grid Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#1f293d_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
          
          {/* Region Outline Simulation */}
          <svg className="w-full h-full opacity-20" viewBox="0 0 800 600" fill="none">
            <path d="M 350 80 L 520 120 L 680 220 L 650 350 L 480 500 L 320 540 L 220 420 L 260 260 Z" stroke="#3b82f6" strokeWidth="2" fill="url(#mapGrad)" />
            <defs>
              <linearGradient id="mapGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Location Pins */}
          {SAMPLE_LOCATIONS.map((loc) => {
            const isSelected = selectedLocation?.id === loc.id;
            const category = getRiskCategory(loc.temperatureRisk); // or overall
            
            // Map coordinates to pixel relative percentages
            const posMap = {
              chennai: { top: '24%', left: '72%' },
              madurai: { top: '68%', left: '46%' },
              trichy: { top: '48%', left: '55%' },
              salem: { top: '38%', left: '42%' },
              coimbatore: { top: '44%', left: '26%' }
            };

            const pos = posMap[loc.id] || { top: '50%', left: '50%' };
            const pinColor = loc.temperatureRisk >= 80 ? 'bg-red-500' : loc.temperatureRisk >= 70 ? 'bg-orange-500' : 'bg-yellow-500';
            const ringColor = loc.temperatureRisk >= 80 ? 'border-red-500/50' : 'border-orange-500/50';

            return (
              <div
                key={loc.id}
                style={{ top: pos.top, left: pos.left }}
                onClick={() => setSelectedLocation(loc)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10 transition-transform hover:scale-110"
              >
                {/* Ping animation */}
                <div className={`absolute -inset-2 rounded-full border-2 ${ringColor} animate-ping opacity-40`} />
                
                {/* Pin Badge */}
                <div className={`relative flex items-center space-x-1.5 px-2.5 py-1 rounded-full shadow-lg ${
                  isSelected 
                    ? 'bg-blue-600 text-white ring-2 ring-white scale-110 z-20' 
                    : 'bg-slate-900/90 text-slate-100 border border-slate-700 hover:border-blue-400'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${pinColor}`} />
                  <span className="text-xs font-bold">{loc.name}</span>
                  <span className={`text-[10px] font-extrabold px-1 rounded ${
                    loc.temperatureRisk >= 80 ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {loc.temperatureRisk}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Location Bottom Drawer / Detail Panel */}
        {selectedLocation && (
          <div className="relative z-20 m-3 p-3.5 rounded-xl bg-slate-900/95 border border-slate-800 backdrop-blur-md shadow-xl animate-fade-in flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-white">{selectedLocation.name} District</span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${getRiskCategory(selectedLocation.temperatureRisk).badge}`}>
                  {getRiskCategory(selectedLocation.temperatureRisk).level} RISK ({selectedLocation.temperatureRisk}/100)
                </span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-1">
                <strong className="text-amber-400">Primary Threat:</strong> {selectedLocation.mainThreat}
              </p>
              <div className="flex items-center space-x-4 text-[11px] text-slate-400 pt-0.5">
                <span className="flex items-center space-x-1">
                  <Flame className="w-3 h-3 text-red-400" />
                  <span>Heat: {selectedLocation.temperatureRisk}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Droplets className="w-3 h-3 text-blue-400" />
                  <span>Water Stress: {selectedLocation.waterStress}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Users className="w-3 h-3 text-emerald-400" />
                  <span>Population: {selectedLocation.populationAtRisk}</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => onViewLocationProfile(selectedLocation)}
              className="w-full sm:w-auto flex items-center justify-center space-x-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
            >
              <span>Inspect Full Profile</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
