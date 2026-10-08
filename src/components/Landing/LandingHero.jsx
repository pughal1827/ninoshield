import React from 'react';
import { 
  User, 
  Users, 
  Landmark, 
  ArrowRight, 
  Thermometer, 
  ShieldCheck, 
  Bell, 
  Sprout, 
  MessageSquare, 
  BarChart3, 
  Target, 
  FileText 
} from 'lucide-react';
import { useNinoShield } from '../../context/NinoShieldContext';

export default function LandingHero() {
  const { navigate } = useNinoShield();

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#dbeafe] via-[#eff6ff] to-[#ffffff] text-[#0b1736] flex flex-col justify-between overflow-hidden font-sans selection:bg-[#1769FF] selection:text-white">
      
      {/* 1. BACKGROUND ATMOSPHERE: CLOUDS & TRANSLUCENT WAVE CURVES */}
      {/* Top Background Atmospheric Cloud & Wave Overlays */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-sky-200/50 via-sky-100/30 to-transparent pointer-events-none z-0" />

      {/* Vector Wave Flowing Graphics */}
      <svg className="absolute top-0 left-0 w-full h-[500px] opacity-40 pointer-events-none z-0" viewBox="0 0 1440 400" fill="none">
        <path d="M -100 120 C 300 280 700 -40 1200 180 C 1350 240 1500 100 1600 80 L 1600 0 L -100 0 Z" fill="url(#wave-grad-1)" />
        <path d="M -100 200 C 400 40 800 320 1300 120 C 1450 60 1550 180 1600 160 L 1600 0 L -100 0 Z" fill="url(#wave-grad-2)" />
        <defs>
          <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wave-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* 2. MAIN CONTAINER */}
      <div className="relative z-10 max-w-[1380px] w-full mx-auto px-5 lg:px-10 pt-6 sm:pt-8 pb-10 flex-1 flex flex-col justify-between space-y-6">
        
        {/* HEADER BRANDING & TITLES */}
        <div className="text-center space-y-3 max-w-4xl mx-auto">
          
          {/* CENTERED NINOSHIELD LOGO */}
          <div className="flex justify-center items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex items-center space-x-3">
              {/* Circular Climate / Globe Icon */}
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
          </div>

          {/* TAGLINE WITH ACCENT LINES */}
          <div className="flex items-center justify-center space-x-3 pt-1">
            <div className="h-[1px] w-12 bg-slate-300" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-500">
              FROM AWARENESS TO ACTION
            </span>
            <div className="h-[1px] w-12 bg-slate-300" />
          </div>

          {/* MAIN HEADLINE */}
          <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-black tracking-tight leading-[1.08] text-[#0b1736]">
            One Platform.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1769FF] via-[#00B8C8] to-[#12B886]">
              Three Levels of Action.
            </span>
          </h1>

          {/* SUBTITLE */}
          <p className="text-xs sm:text-sm lg:text-base text-slate-600 font-medium max-w-2xl mx-auto">
            Different needs. A common goal — a safer, more climate-resilient tomorrow.
          </p>

        </div>

        {/* 3. THREE ROLE CARDS (EXACT VISUAL RECREATION MATCHING REFERENCE IMAGE 1:1) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch pt-2">
          
          {/* CARD 1 — FOR PEOPLE */}
          <div className="rounded-[28px] bg-gradient-to-b from-[#e0f2fe]/90 via-[#f0f9ff]/90 to-white/95 border border-white/80 p-6 sm:p-7 shadow-xl shadow-blue-900/5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group min-h-[580px]">
            
            {/* Top Content */}
            <div className="space-y-4 relative z-10">
              
              {/* Icon */}
              <div className="w-11 h-11 rounded-full bg-[#1769FF] text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <User className="w-5 h-5 stroke-[2.5]" />
              </div>

              {/* Title & Subtitle */}
              <div>
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">FOR</span>
                <h2 className="text-3xl font-black text-[#0b1736] tracking-tight">People</h2>
                <div className="text-xs sm:text-sm font-semibold mt-1">
                  <span className="text-slate-600">Stay informed. </span>
                  <span className="text-[#1769FF] font-bold">Stay prepared.</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Get simple, easy-to-understand climate risk information for your area and know what actions you can take.
              </p>

              {/* Feature Rows */}
              <div className="space-y-2.5 pt-1 text-xs text-slate-700 font-semibold">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                    <Thermometer className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span>View local climate risks</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-[#1769FF] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span>Get safety recommendations</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Bell className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span>Receive early warnings</span>
                </div>
              </div>

            </div>

            {/* Bottom Button & Scenic Coastal Image */}
            <div className="relative z-10 space-y-4 pt-4">
              
              {/* Explore Button */}
              <button
                onClick={() => navigate('/people')}
                className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#1769FF] to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Explore as a Person</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Scenic Environmental Photo */}
              <div className="relative h-40 -mx-6 -mb-7 overflow-hidden rounded-b-[28px]">
                <img
                  src="/people_coastal.jpg"
                  alt="Coastal City Beach & Landscape"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

            </div>

          </div>

          {/* CARD 2 — FOR COMMUNITIES */}
          <div className="rounded-[28px] bg-gradient-to-b from-[#dcfce7]/80 via-[#f0fdf4]/80 to-white/95 border border-white/80 p-6 sm:p-7 shadow-xl shadow-emerald-900/5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group min-h-[580px]">
            
            {/* Top Content */}
            <div className="space-y-4 relative z-10">
              
              {/* Icon */}
              <div className="w-11 h-11 rounded-full bg-[#12B886] text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                <Users className="w-5 h-5 stroke-[2.5]" />
              </div>

              {/* Title & Subtitle */}
              <div>
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">FOR</span>
                <h2 className="text-3xl font-black text-[#0b1736] tracking-tight">Communities</h2>
                <div className="text-xs sm:text-sm font-semibold mt-1">
                  <span className="text-slate-600">Stronger communities. </span>
                  <span className="text-[#12B886] font-bold">Safer tomorrows.</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Understand local risks, identify vulnerable groups, and prepare together for climate challenges.
              </p>

              {/* Feature Rows */}
              <div className="space-y-2.5 pt-1 text-xs text-slate-700 font-semibold">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span>Identify vulnerable groups</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Sprout className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span>Plan community resources</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span>Report local observations</span>
                </div>
              </div>

            </div>

            {/* Bottom Button & Scenic Valley Image */}
            <div className="relative z-10 space-y-4 pt-4">
              
              {/* Explore Button */}
              <button
                onClick={() => navigate('/community')}
                className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#12B886] to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/25 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Explore as a Community</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Scenic Environmental Photo */}
              <div className="relative h-40 -mx-6 -mb-7 overflow-hidden rounded-b-[28px]">
                <img
                  src="/community_landscape.jpg"
                  alt="Green Valley Community & River Landscape"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

            </div>

          </div>

          {/* CARD 3 — FOR DECISION-MAKERS */}
          <div className="rounded-[28px] bg-gradient-to-b from-[#f3e8ff]/80 via-[#faf5ff]/80 to-white/95 border border-white/80 p-6 sm:p-7 shadow-xl shadow-purple-900/5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group min-h-[580px]">
            
            {/* Top Content */}
            <div className="space-y-4 relative z-10">
              
              {/* Icon */}
              <div className="w-11 h-11 rounded-full bg-[#6246EA] text-white flex items-center justify-center shadow-md shadow-purple-500/20">
                <Landmark className="w-5 h-5 stroke-[2.5]" />
              </div>

              {/* Title & Subtitle */}
              <div>
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">FOR</span>
                <h2 className="text-3xl font-black text-[#0b1736] tracking-tight">Decision-Makers</h2>
                <div className="text-xs sm:text-sm font-semibold mt-1">
                  <span className="text-slate-600">Insight today. </span>
                  <span className="text-[#6246EA] font-bold">Better decisions tomorrow.</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                View high-risk areas, analyze potential impacts and plan early responses with AI-driven insights.
              </p>

              {/* Feature Rows */}
              <div className="space-y-2.5 pt-1 text-xs text-slate-700 font-semibold">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-full bg-orange-100 text-red-500 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span>View high-risk areas</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-full bg-purple-100 text-[#6246EA] flex items-center justify-center shrink-0">
                    <Target className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span>Analyze potential impacts</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span>Get prioritized action plans</span>
                </div>
              </div>

            </div>

            {/* Bottom Button & Scenic Administration Building Image */}
            <div className="relative z-10 space-y-4 pt-4">
              
              {/* Explore Button */}
              <button
                onClick={() => navigate('/decision-maker')}
                className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#6246EA] to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/25 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Explore as a Decision-Maker</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Scenic Environmental Photo */}
              <div className="relative h-40 -mx-6 -mb-7 overflow-hidden rounded-b-[28px]">
                <img
                  src="/civic_building.jpg"
                  alt="Civic Administration Building with Indian Flag"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
