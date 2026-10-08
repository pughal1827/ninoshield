import React, { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  User, 
  Users, 
  Building2, 
  X, 
  Sparkles, 
  ShieldCheck,
  Activity,
  Radio,
  Bell,
  Cpu
} from 'lucide-react';
import { useNinoShield } from '../../context/NinoShieldContext';

export default function LandingHero({ onExplore, onWatchDemo, onGetStarted }) {
  const { lang, navigate } = useNinoShield();
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <div className="relative min-h-[calc(100vh-68px)] bg-slate-50 text-slate-900 flex flex-col justify-between overflow-hidden">
      
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-12 pt-8 lg:pt-12 pb-12 flex-1 flex flex-col justify-between">
        
        {/* TWO-COLUMN HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT HERO: Title, Subtitle, CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* BRANDING EYEBROW */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>NINOSHIELD CLIMATE INTELLIGENCE</span>
            </div>

            {/* MAIN TITLE */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-slate-900">
              DETECT. PREPARE. ACT.
            </h1>

            {/* SUBTITLE */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-[560px] font-medium leading-relaxed">
              AI-powered early action for El Niño-driven climate risks.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onGetStarted || (() => navigate('/people'))}
                className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Explore NinoShield</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExplore || (() => navigate('/three-levels'))}
                className="px-6 py-3.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-200 shadow-xs transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>See How It Works</span>
              </button>
            </div>

          </div>

          {/* RIGHT HERO — EARTH VISUAL */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
              <img
                src="/earth_el_nino_globe.jpg"
                alt="Satellite Earth showing El Niño Climate Signals"
                className="w-full h-full object-contain drop-shadow-xl rounded-full"
              />

              {/* Minimal Clean Indicator Badge */}
              <div className="absolute bottom-6 left-6 z-20 flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-semibold backdrop-blur-xs border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Active El Niño Signal Monitoring</span>
              </div>
            </div>
          </div>

        </div>

        {/* PRODUCT LOOP BAR */}
        <div className="my-10 bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            Product Philosophy Loop
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-bold text-slate-700">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-100">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              <span>Climate Signals</span>
            </div>
            <span className="text-slate-300 font-normal">→</span>

            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-100 text-blue-800">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>AI Risk Detection</span>
            </div>
            <span className="text-slate-300 font-normal">→</span>

            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-100">
              <Radio className="w-3.5 h-3.5 text-cyan-600" />
              <span>Local Community Signals</span>
            </div>
            <span className="text-slate-300 font-normal">→</span>

            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-amber-50 border border-amber-100 text-amber-800">
              <Bell className="w-3.5 h-3.5 text-amber-600" />
              <span>Early Warning</span>
            </div>
            <span className="text-slate-300 font-normal">→</span>

            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Early Action</span>
            </div>
          </div>
        </div>

        {/* THREE USER GROUPS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* USER GROUP 1: PEOPLE */}
          <div 
            onClick={() => navigate('/people')}
            className="rounded-xl bg-white border border-slate-200 p-6 shadow-xs hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
              <User className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">PEOPLE</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Understand your risk.
            </p>
            <div className="mt-4 flex items-center space-x-1 text-xs font-bold text-blue-600 group-hover:underline">
              <span>Explore Person Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* USER GROUP 2: COMMUNITIES */}
          <div 
            onClick={() => navigate('/community')}
            className="rounded-xl bg-white border border-slate-200 p-6 shadow-xs hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">COMMUNITIES</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Prepare together.
            </p>
            <div className="mt-4 flex items-center space-x-1 text-xs font-bold text-emerald-600 group-hover:underline">
              <span>Explore Community Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* USER GROUP 3: DECISION-MAKERS */}
          <div 
            onClick={() => navigate('/decision-maker')}
            className="rounded-xl bg-white border border-slate-200 p-6 shadow-xs hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">DECISION-MAKERS</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Act where it matters most.
            </p>
            <div className="mt-4 flex items-center space-x-1 text-xs font-bold text-purple-600 group-hover:underline">
              <span>Explore Decision-Maker Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
