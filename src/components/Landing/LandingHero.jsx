import React from 'react';
import { 
  ArrowRight, 
  Thermometer, 
  Users, 
  Landmark 
} from 'lucide-react';
import { useNinoShield } from '../../context/NinoShieldContext';

export default function LandingHero({ onExplore }) {
  const { navigate } = useNinoShield();

  const handleExploreClick = () => {
    if (onExplore) {
      onExplore();
    } else {
      navigate('/three-levels');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#dbeafe] via-[#eff6ff] to-[#ffffff] text-[#0b1736] flex flex-col justify-between overflow-hidden font-sans selection:bg-[#1769FF] selection:text-white">
      
      {/* 1. ATMOSPHERIC CLOUDS & SUNSET RAYS BACKGROUND */}
      {/* Sunburst Glow on Upper Left */}
      <div className="absolute -top-24 -left-24 w-[700px] h-[700px] bg-radial from-amber-100/70 via-sky-200/40 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-sky-200/30 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Atmospheric Soft Clouds on Left & Bottom */}
      <div 
        className="absolute inset-0 bg-cover bg-left-bottom opacity-45 pointer-events-none z-0 mix-blend-soft-light"
        style={{ backgroundImage: `url('/community_landscape.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-0" />

      {/* 2. MAIN HERO CONTAINER */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 lg:px-12 pt-8 sm:pt-12 pb-6 flex-1 flex flex-col justify-between">
        
        {/* TWO-COLUMN GRID: LEFT CONTENT (~52%) | RIGHT EARTH (~48%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
          
          {/* LEFT COLUMN: LOGO, HEADLINE, SUBTITLE, EXPLORE BUTTON */}
          <div className="lg:col-span-6 flex flex-col items-center text-center space-y-6 lg:pr-4">
            
            {/* CENTERED NINOSHIELD LOGO */}
            <div className="flex flex-col items-center justify-center cursor-pointer" onClick={handleExploreClick}>
              <div className="flex items-center space-x-3">
                {/* Circular Climate / Earth Wave Badge */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#1769FF] via-[#00B8C8] to-[#0ea5e9] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                    <path d="M2 12h20"/>
                    <path d="M12 16c2.5 0 4.5 1.5 6 1.5"/>
                  </svg>
                </div>

                <div className="text-3xl font-black tracking-tight flex items-center">
                  <span className="text-[#0b1736]">Nino</span>
                  <span className="text-[#1769FF]">Shield</span>
                </div>
              </div>

              {/* Horizontal Accent Line below Logo */}
              <div className="w-12 h-[2px] bg-slate-300 rounded-full mt-2.5" />
            </div>

            {/* MAIN HERO HEADLINE */}
            <div className="space-y-1 max-w-lg mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.06] text-[#0b1736]">
                Detect Climate<br />
                Risks Early.<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1769FF] via-[#00B8C8] to-[#06b6d4]">
                  Act Before Disaster.
                </span>
              </h1>
            </div>

            {/* SUPPORTING SUBTITLE */}
            <p className="text-sm sm:text-base text-slate-500 font-medium text-center max-w-md mx-auto leading-relaxed">
              AI-powered early action for El Niño–driven<br className="hidden sm:inline" /> climate risks.
            </p>

            {/* ONE SINGLE EXPLORE BUTTON */}
            <div className="pt-2">
              <button
                onClick={handleExploreClick}
                className="px-10 py-3.5 rounded-full bg-gradient-to-r from-[#1769FF] via-[#1d4ed8] to-[#00B8C8] hover:from-blue-600 hover:to-cyan-500 text-white font-bold text-base shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.03] transition-all flex items-center space-x-2.5 cursor-pointer"
              >
                <span>Explore</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: HUGE EARTH / EL NIÑO VISUALIZATION (~48% width) */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[560px] aspect-square flex items-center justify-center">
              
              {/* Photorealistic Satellite Earth Globe */}
              <img
                src="/earth_el_nino_globe.jpg"
                alt="Realistic Satellite Earth showing Asia, Australia and Pacific Ocean with El Niño Heatmap"
                className="w-full h-full object-contain drop-shadow-2xl rounded-full"
              />

              {/* EL NIÑO LABEL BADGE */}
              <div className="absolute top-[48%] right-[18%] z-20 flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#991b1b]/90 text-white text-[11px] font-black tracking-widest uppercase shadow-2xl border border-red-400/40 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>EL NIÑO</span>
              </div>

              {/* HEATMAP PULSE HALO RINGS */}
              <div className="absolute top-[44%] right-[15%] w-36 h-36 rounded-full border border-red-500/40 animate-ping pointer-events-none" />
              <div className="absolute top-[46%] right-[16%] w-28 h-28 rounded-full border border-amber-400/30 pointer-events-none" />

            </div>
          </div>

        </div>

        {/* 3. THREE BOTTOM FEATURE CARDS (EXACT HORIZONTAL ALIGNMENT) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl w-full mx-auto pt-6 pb-2">
          
          {/* CARD 1: FOR PEOPLE */}
          <div 
            onClick={() => navigate('/people')}
            className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/80 p-5 sm:p-6 shadow-md shadow-blue-900/5 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex items-center space-x-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-red-100/80 text-red-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Thermometer className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0b1736]">For People</h3>
              <p className="text-xs text-slate-500 font-medium leading-snug mt-0.5">
                Understand your local climate risk and stay safe.
              </p>
            </div>
          </div>

          {/* CARD 2: FOR COMMUNITIES */}
          <div 
            onClick={() => navigate('/community')}
            className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/80 p-5 sm:p-6 shadow-md shadow-blue-900/5 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex items-center space-x-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0b1736]">For Communities</h3>
              <p className="text-xs text-slate-500 font-medium leading-snug mt-0.5">
                Prepare together for a stronger tomorrow.
              </p>
            </div>
          </div>

          {/* CARD 3: FOR DECISION-MAKERS */}
          <div 
            onClick={() => navigate('/decision-maker')}
            className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/80 p-5 sm:p-6 shadow-md shadow-blue-900/5 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex items-center space-x-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100/80 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Landmark className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0b1736]">For Decision-Makers</h3>
              <p className="text-xs text-slate-500 font-medium leading-snug mt-0.5">
                Identify high-risk areas and take early action.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
