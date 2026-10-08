import React, { useState } from 'react';
import { SlidersHorizontal, RefreshCw, Flame, Droplets, CloudRain, Sprout, HeartPulse, TrendingUp, AlertTriangle } from 'lucide-react';
import { EL_NINO_WEIGHTS, calculateRiskScore, getRiskCategory } from '../../data/climateData';

export default function WhatIfSimulator({ selectedLocation, onSimulationUpdate }) {
  const [tempIncrease, setTempIncrease] = useState(2.0); // +2.0°C
  const [rainReduction, setRainReduction] = useState(20); // -20%
  const [elNinoIntensity, setElNinoIntensity] = useState("Moderate");
  const [waterDepletion, setWaterDepletion] = useState(17); // -17%
  const [isSimulating, setIsSimulating] = useState(false);

  // Compute baseline
  const baseIndicators = {
    temperatureRisk: selectedLocation?.temperatureRisk || 82,
    rainfallRisk: selectedLocation?.rainfallRisk || 65,
    waterStress: selectedLocation?.waterStress || 76,
    agricultureRisk: selectedLocation?.agricultureRisk || 71,
    healthRisk: selectedLocation?.healthRisk || 65,
    elNinoStatus: selectedLocation?.elNinoStatus || "Moderate",
    vulnerability: selectedLocation?.vulnerability || 70,
  };

  const baselineScore = calculateRiskScore(baseIndicators);

  // Dynamic simulation adjustments
  const simulatedTempRisk = Math.min(100, Math.round(baseIndicators.temperatureRisk + (tempIncrease * 6)));
  const simulatedRainRisk = Math.min(100, Math.round(baseIndicators.rainfallRisk + (rainReduction * 0.7)));
  const simulatedWaterRisk = Math.min(100, Math.round(baseIndicators.waterStress + (waterDepletion * 0.8)));
  const simulatedAgRisk = Math.min(100, Math.round(baseIndicators.agricultureRisk + (rainReduction * 0.5) + (tempIncrease * 3)));
  const simulatedHealthRisk = Math.min(100, Math.round(baseIndicators.healthRisk + (tempIncrease * 5)));

  const simulatedIndicators = {
    temperatureRisk: simulatedTempRisk,
    rainfallRisk: simulatedRainRisk,
    waterStress: simulatedWaterRisk,
    agricultureRisk: simulatedAgRisk,
    healthRisk: simulatedHealthRisk,
    elNinoStatus: elNinoIntensity,
    vulnerability: baseIndicators.vulnerability,
  };

  const simulatedScore = calculateRiskScore(simulatedIndicators);
  const scoreDelta = simulatedScore - baselineScore;
  const simCategory = getRiskCategory(simulatedScore);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      if (onSimulationUpdate) {
        onSimulationUpdate(simulatedScore, simulatedIndicators);
      }
    }, 400);
  };

  const resetSliders = () => {
    setTempIncrease(2.0);
    setRainReduction(20);
    setElNinoIntensity("Moderate");
    setWaterDepletion(17);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-gradient-to-r from-slate-900 via-[#131b2e] to-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-extrabold text-white">What-If Climate Risk Simulator</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Stress-test climate anomalies for <strong className="text-white">{selectedLocation?.name || 'Chennai'}</strong> by tuning temperature, rainfall deficit, and El Niño ocean signals.
            </p>
          </div>

          <button
            onClick={resetSliders}
            className="flex items-center space-x-1 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 self-start"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Sliders</span>
          </button>
        </div>
      </div>

      {/* Grid: Sliders Left vs Results Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Sliders Input Panel */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Simulated Climate Drivers
          </h3>

          {/* Slider 1: Temperature Increase */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center space-x-1.5">
                <Flame className="w-3.5 h-3.5 text-red-400" />
                <span>Temperature Anomaly (+°C)</span>
              </span>
              <span className="font-bold text-red-400">+{tempIncrease.toFixed(1)}°C</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="4.5"
              step="0.1"
              value={tempIncrease}
              onChange={(e) => setTempIncrease(parseFloat(e.target.value))}
              className="w-full accent-red-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>+0.5°C (Mild)</span>
              <span>+2.5°C (Severe)</span>
              <span>+4.5°C (Catastrophic)</span>
            </div>
          </div>

          {/* Slider 2: Rainfall Reduction */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center space-x-1.5">
                <CloudRain className="w-3.5 h-3.5 text-sky-400" />
                <span>Monsoon Rainfall Shortfall (%)</span>
              </span>
              <span className="font-bold text-sky-400">-{rainReduction}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={rainReduction}
              onChange={(e) => setRainReduction(parseInt(e.target.value))}
              className="w-full accent-sky-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>-5% (Normal)</span>
              <span>-25% (Deficit)</span>
              <span>-50% (Drought)</span>
            </div>
          </div>

          {/* Slider 3: Water Depletion */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center space-x-1.5">
                <Droplets className="w-3.5 h-3.5 text-blue-400" />
                <span>Reservoir Storage Loss (%)</span>
              </span>
              <span className="font-bold text-blue-400">-{waterDepletion}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="45"
              step="1"
              value={waterDepletion}
              onChange={(e) => setWaterDepletion(parseInt(e.target.value))}
              className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Dropdown: El Niño Intensity */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium block">
              El Niño Pacific Signal Strength
            </label>
            <select
              value={elNinoIntensity}
              onChange={(e) => setElNinoIntensity(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-semibold focus:outline-none focus:border-blue-500"
            >
              <option value="Weak">Weak (Anomaly +0.5°C to +0.9°C)</option>
              <option value="Moderate">Moderate (Anomaly +1.0°C to +1.4°C)</option>
              <option value="Strong">Strong (Anomaly +1.5°C to +1.9°C)</option>
              <option value="Very Strong">Very Strong (Anomaly ≥ +2.0°C)</option>
            </select>
          </div>

          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center space-x-2"
          >
            {isSimulating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <TrendingUp className="w-4 h-4" />
            )}
            <span>{isSimulating ? 'Recalculating Scenario Risk...' : 'RUN SCENARIO SIMULATION'}</span>
          </button>
        </div>

        {/* Dynamic Simulation Results Card */}
        <div className="glass-card rounded-2xl p-5 border border-amber-500/30 bg-gradient-to-br from-slate-900 via-[#131b2e] to-slate-950 flex flex-col justify-between space-y-4">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Simulated Risk Output
            </h3>
            <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${simCategory.badge}`}>
              {simCategory.level} ({simulatedScore} / 100)
            </span>
          </div>

          {/* Score Comparison */}
          <div className="flex items-center justify-around py-3 bg-slate-900/80 rounded-xl border border-slate-800 text-center">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Current Baseline</span>
              <div className="text-2xl font-bold text-slate-300">{baselineScore}</div>
            </div>
            
            <div className="text-xs font-extrabold text-slate-500">→</div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Simulated Risk</span>
              <div className="text-3xl font-black text-amber-400">{simulatedScore}</div>
            </div>

            <div className="border-l border-slate-800 pl-4">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Risk Delta</span>
              <div className={`text-base font-bold ${scoreDelta >= 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {scoreDelta >= 0 ? `+${scoreDelta}` : scoreDelta} pts
              </div>
            </div>
          </div>

          {/* Recalculated Indicator Cards */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-300">Heat Risk</span>
              <span className="font-bold text-red-400">{simulatedTempRisk} / 100</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-300">Water Stress</span>
              <span className="font-bold text-blue-400">{simulatedWaterRisk} / 100</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-300">Agriculture Stress</span>
              <span className="font-bold text-emerald-400">{simulatedAgRisk} / 100</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-300">Health Risk</span>
              <span className="font-bold text-amber-400">{simulatedHealthRisk} / 100</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-300 text-xs flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Simulation Alert:</strong> At score {simulatedScore}, municipal water rationing and emergency agricultural seed dispatches will be triggered automatically.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
