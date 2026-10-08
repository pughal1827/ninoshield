import React, { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  Thermometer, 
  Users, 
  Landmark, 
  X, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';

export default function LandingHero({ onExplore, onWatchDemo, onGetStarted }) {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <div className="relative min-h-[calc(100vh-70px)] bg-[#F7FAFF] text-[#0B1736] flex flex-col justify-between overflow-hidden">
      
      {/* Background Subtle Gradient Blobs & Atmospheric Clouds */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-blue-100/40 via-sky-50/60 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-teal-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main First Viewport Container */}
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-12 pt-6 lg:pt-10 pb-10 flex-1 flex flex-col justify-between">
        
        {/* TWO-COLUMN HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT HERO: ~46% width (5.5 cols on lg) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* EYEBROW */}
            <div className="flex items-center space-x-3">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#64748B]">
                AI FOR A SAFER TOMORROW
              </span>
              <div className="h-[1.5px] w-10 bg-[#1769FF]" />
            </div>

            {/* MAIN TITLE */}
            <h1 className="text-5xl sm:text-6xl lg:text-[66px] font-extrabold tracking-tight leading-[1.02] text-[#0B1736]">
              Detect Climate<br />
              Risks Early.<br />
              <span className="text-gradient-title">
                Act Before Disaster.
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-base sm:text-[19px] text-[#475569] max-w-[580px] font-normal leading-[1.6]">
              NinoShield uses AI to identify El Niño–related climate risks and help people, communities and decision-makers take early action.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              
              {/* PRIMARY BUTTON */}
              <button
                onClick={onExplore}
                className="px-7 py-3.5 rounded-full btn-gradient-primary text-white font-semibold text-sm sm:text-base shadow-lg shadow-[#1769FF]/25 hover:shadow-xl hover:shadow-[#1769FF]/35 transition-all transform hover:-translate-y-0.5 flex items-center space-x-2.5 cursor-pointer"
              >
                <span>Explore Now</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* SECONDARY BUTTON */}
              <button
                onClick={() => setShowDemoModal(true)}
                className="px-7 py-3.5 rounded-full bg-white text-[#0B1736] font-semibold text-sm sm:text-base border border-slate-200 shadow-sm hover:bg-slate-50 transition-all transform hover:-translate-y-0.5 flex items-center space-x-2.5 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#0B1736] text-white flex items-center justify-center pl-0.5">
                  <Play className="w-2.5 h-2.5 fill-current" />
                </div>
                <span>Watch Demo</span>
              </button>

            </div>

          </div>

          {/* RIGHT HERO — EARTH VISUAL: ~54% width (6.5 cols on lg) */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[620px] aspect-square flex items-center justify-center">
              
              {/* Realistic Satellite Earth Image */}
              <img
                src="/earth_el_nino_globe.jpg"
                alt="Realistic Satellite Earth showing Asia, Australia and Pacific El Niño Heatmap"
                className="w-full h-full object-contain drop-shadow-2xl rounded-full"
              />

              {/* FLOATING EL NIÑO BADGE */}
              <div className="absolute top-[46%] right-[16%] z-20 flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#881337]/90 text-white text-[11px] font-extrabold tracking-widest uppercase shadow-2xl border border-red-400/40 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>EL NIÑO</span>
              </div>

              {/* CONCENTRIC RADAR RINGS */}
              <div className="absolute top-[40%] right-[12%] w-40 h-40 rounded-full border border-red-500/40 animate-ping pointer-events-none" />
              <div className="absolute top-[43%] right-[14%] w-32 h-32 rounded-full border border-amber-400/30 pointer-events-none" />

            </div>
          </div>

        </div>

        {/* FEATURE CARDS (EXACTLY THREE CARDS IN A ROW AT BOTTOM OF HERO) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 lg:mt-12">
          
          {/* CARD 1 */}
          <div className="rounded-2xl bg-white border border-blue-100/70 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-start space-x-4">
            <div className="p-3.5 rounded-full bg-red-50 text-[#FF4B45] shrink-0">
              <Thermometer className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B1736] mb-1">Understand Risk</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                Know climate risks in your area in simple terms.
              </p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="rounded-2xl bg-white border border-blue-100/70 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-start space-x-4">
            <div className="p-3.5 rounded-full bg-blue-50 text-[#1769FF] shrink-0">
              <Users className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B1736] mb-1">Take Early Action</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                Get AI-driven recommendations for people and communities.
              </p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="rounded-2xl bg-white border border-blue-100/70 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-start space-x-4">
            <div className="p-3.5 rounded-full bg-emerald-50 text-[#16A878] shrink-0">
              <Landmark className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B1736] mb-1">Support Decision-Makers</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                View high-risk areas and plan responses before disasters.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* WATCH DEMO MODAL */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative text-left border border-slate-100">
            
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 text-[#1769FF]">
              <div className="p-2.5 rounded-2xl bg-blue-50">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1736]">NinoShield Early Action Demo</h3>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              "NinoShield converts climate signals into localized risk insights and early-action recommendations."
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-700">
              <div className="flex items-center space-x-2 font-bold text-[#0B1736]">
                <ShieldCheck className="w-4 h-4 text-[#16A878]" />
                <span>Live Interactive Prototype Capabilities</span>
              </div>
              <ul className="space-y-1.5 pl-6 list-disc text-slate-600">
                <li>Real-time El Niño Pacific anomaly risk calculation</li>
                <li>District-level interactive risk map &amp; impact cascade</li>
                <li>AI Priority Action Engine &amp; What-If Scenario Simulator</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowDemoModal(false)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowDemoModal(false);
                  onWatchDemo();
                }}
                className="px-6 py-2.5 rounded-full btn-gradient-primary text-white text-xs font-semibold shadow-md"
              >
                Launch Live Demo Pitch Mode
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
