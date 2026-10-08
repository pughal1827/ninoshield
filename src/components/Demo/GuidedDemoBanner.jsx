import React, { useState } from 'react';
import { Play, ChevronRight, ChevronLeft, X, Sparkles, CheckCircle2 } from 'lucide-react';

export default function GuidedDemoBanner({ 
  onClose, 
  setActiveView, 
  setSelectedLocation, 
  SAMPLE_LOCATIONS,
  onGenerateWarning,
  onActivateResponsePlan 
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      step: 1,
      title: "Step 1: El Niño Global Signal Status",
      talkingPoint: "Point to the top header: 'El Niño Status: Moderate'. Global Pacific thermal anomaly detected.",
      action: () => setActiveView('dashboard')
    },
    {
      step: 2,
      title: "Step 2: Chennai Risk Score (78/100)",
      talkingPoint: "Show Chennai District Overall Climate Risk: 78 / 100 HIGH Risk.",
      action: () => {
        setActiveView('dashboard');
        setSelectedLocation(SAMPLE_LOCATIONS[0]); // Chennai
      }
    },
    {
      step: 3,
      title: "Step 3: Click & Inspect District Details",
      talkingPoint: "Click Chennai pin on Risk Map. Explain temperature (+2.1°C), rain shortfall (-22%), water deficit (-17%).",
      action: () => {
        setActiveView('risk-analysis');
        setSelectedLocation(SAMPLE_LOCATIONS[0]);
      }
    },
    {
      step: 4,
      title: "Step 4: Explainable Climate Impact Chain",
      talkingPoint: "Show how El Niño cascades: Ocean anomaly → Rainfall reduction → Reservoir depletion → Crop stress → Human vulnerability.",
      action: () => setActiveView('risk-analysis')
    },
    {
      step: 5,
      title: "Step 5: AI Climate Analyst Diagnosis",
      talkingPoint: "Open AI Climate Analyst. Show: 'Water stress is the primary emerging risk for 1.2M citizens.'",
      action: () => setActiveView('ai-analyst')
    },
    {
      step: 6,
      title: "Step 6: AI Action Recommendations",
      talkingPoint: "Highlight 4 prioritized actions: Reservoir monitoring (Critical), Health alert (High), Farmer advisory (High).",
      action: () => setActiveView('ai-analyst')
    },
    {
      step: 7,
      title: "Step 7: What-If Scenario Stress Testing",
      talkingPoint: "Open Simulator. Drag Temp slider to +2.5°C & Rain to -30%. Show live score recalculation to 88/100 CRITICAL.",
      action: () => setActiveView('simulator')
    },
    {
      step: 8,
      title: "Step 8: Generate Public Early Warning",
      talkingPoint: "Click 'Generate Early Warning' to produce 1-click citizen alert advisory.",
      action: () => {
        setActiveView('dashboard');
        onGenerateWarning();
      }
    },
    {
      step: 9,
      title: "Step 9: Activate Authority Response Plan",
      talkingPoint: "Click 'Activate Response Plan' to dispatch departmental directives to Water, Health & Agriculture cells.",
      action: () => {
        setActiveView('authority');
        onActivateResponsePlan();
      }
    },
    {
      step: 10,
      title: "Step 10: Citizen View & Community Signals",
      talkingPoint: "Switch to Citizen View to show simple safety guidance + crowdsourced water/heat observation reporting.",
      action: () => setActiveView('citizen')
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextIdx = currentStep + 1;
      setCurrentStep(nextIdx);
      steps[nextIdx].action();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevIdx = currentStep - 1;
      setCurrentStep(prevIdx);
      steps[prevIdx].action();
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-b border-blue-500/30 px-4 py-2.5 text-xs text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 z-30 relative">
      <div className="flex items-center space-x-3">
        <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-blue-500 text-white font-extrabold text-[10px]">
          <Sparkles className="w-3 h-3" />
          <span>PITCH MODE ({currentStep + 1}/{steps.length})</span>
        </span>
        <div>
          <strong className="text-blue-300 font-bold">{steps[currentStep].title}: </strong>
          <span className="text-slate-200">{steps[currentStep].talkingPoint}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center space-x-1"
        >
          <span>Next Pitch Step</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
