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

export default function ThreeLevelsPage({ onExplorePerson, onExploreCommunity, onExploreDecisionMaker }) {
  return (
    <div className="relative min-h-[calc(100vh-70px)] bg-[#F8FBFF] text-[#0B1736] flex flex-col justify-between overflow-hidden">
      
      {/* Background Subtle Gradient Blobs & Flowing Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-blue-100/30 via-teal-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      
      {/* MAIN CONTAINER */}
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-10 pt-6 pb-12 flex-1 flex flex-col justify-between">
        
        {/* HERO SECTION */}
        <div className="text-center space-y-3 max-w-4xl mx-auto mb-8 lg:mb-10">
          
          {/* Eyebrow */}
          <div className="flex items-center justify-center space-x-3">
            <div className="h-[1px] w-12 bg-blue-300" />
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#64748B]">
              FROM AWARENESS TO ACTION
            </span>
            <div className="h-[1px] w-12 bg-blue-300" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold tracking-tight leading-[1.05] text-[#0B1736]">
            One Platform.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1769FF] via-[#00B8C8] to-[#12B886]">
              Three Levels of Action.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-[#475569] font-normal max-w-2xl mx-auto pt-1">
            Different needs. A common goal — a safer, more climate-resilient tomorrow.
          </p>

        </div>

        {/* THREE LARGE FEATURE PANELS (SIDE-BY-SIDE DESKTOP LAYOUT) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          
          {/* CARD 1 — FOR PEOPLE */}
          <div className="rounded-[32px] bg-gradient-to-b from-[#EAF4FF] via-[#F2F8FF] to-white border border-blue-200/60 p-6 sm:p-7 shadow-lg shadow-blue-500/5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group min-h-[580px]">
            
            {/* Top Content */}
            <div className="space-y-4 relative z-10">
              
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-[#1769FF] text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <User className="w-6 h-6 stroke-[2.5]" />
              </div>

              {/* Title & Subtitle */}
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">For</span>
                <h2 className="text-3xl font-extrabold text-[#0B1736] tracking-tight">People</h2>
                <div className="text-sm font-semibold mt-1">
                  <span className="text-[#0B1736]">Stay informed. </span>
                  <span className="text-[#1769FF]">Stay prepared.</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Get simple, easy-to-understand climate risk information for your area and know what actions you can take.
              </p>

              {/* Feature Rows */}
              <div className="space-y-2 pt-1 text-xs sm:text-sm text-[#1e293b] font-medium">
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white/70 backdrop-blur-sm border border-blue-100/80">
                  <Thermometer className="w-4 h-4 text-red-500 shrink-0" />
                  <span>View local climate risks</span>
                </div>
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white/70 backdrop-blur-sm border border-blue-100/80">
                  <ShieldCheck className="w-4 h-4 text-[#1769FF] shrink-0" />
                  <span>Get safety recommendations</span>
                </div>
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white/70 backdrop-blur-sm border border-blue-100/80">
                  <Bell className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Receive early warnings</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={onExplorePerson}
                className="w-full py-3 rounded-full bg-[#1769FF] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
              >
                <span>Explore as a Person</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

            </div>

            {/* Bottom Environmental Visual (Coastal City) */}
            <div className="relative h-44 mt-6 -mx-6 -mb-6 overflow-hidden rounded-b-[32px]">
              <img
                src="/people_coastal.jpg"
                alt="Coastal City Landscape"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Subtle Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Floating UI Badge */}
              <div className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/40 shadow-lg flex items-center space-x-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-bold text-[#0B1736]">Local Risk:</span>
                <span className="font-extrabold text-red-600">72 / 100 HIGH</span>
              </div>
            </div>

          </div>

          {/* CARD 2 — FOR COMMUNITIES */}
          <div className="rounded-[32px] bg-gradient-to-b from-[#EAFBF4] via-[#F2FCF8] to-white border border-emerald-200/60 p-6 sm:p-7 shadow-lg shadow-emerald-500/5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group min-h-[580px]">
            
            {/* Top Content */}
            <div className="space-y-4 relative z-10">
              
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-[#12B886] text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                <Users className="w-6 h-6 stroke-[2.5]" />
              </div>

              {/* Title & Subtitle */}
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">For</span>
                <h2 className="text-3xl font-extrabold text-[#0B1736] tracking-tight">Communities</h2>
                <div className="text-sm font-semibold mt-1">
                  <span className="text-[#0B1736]">Stronger communities. </span>
                  <span className="text-[#12B886]">Safer tomorrows.</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Understand local risks, identify vulnerable groups, and prepare together for climate challenges.
              </p>

              {/* Feature Rows */}
              <div className="space-y-2 pt-1 text-xs sm:text-sm text-[#1e293b] font-medium">
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white/70 backdrop-blur-sm border border-emerald-100/80">
                  <Users className="w-4 h-4 text-[#12B886] shrink-0" />
                  <span>Identify vulnerable groups</span>
                </div>
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white/70 backdrop-blur-sm border border-emerald-100/80">
                  <Sprout className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Plan community resources</span>
                </div>
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white/70 backdrop-blur-sm border border-emerald-100/80">
                  <MessageSquare className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Report local observations</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={onExploreCommunity}
                className="w-full py-3 rounded-full bg-[#12B886] hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/25 transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
              >
                <span>Explore as a Community</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

            </div>

            {/* Bottom Environmental Visual (Green Village Community) */}
            <div className="relative h-44 mt-6 -mx-6 -mb-6 overflow-hidden rounded-b-[32px]">
              <img
                src="/community_landscape.jpg"
                alt="Green Community Landscape"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Floating UI Badge */}
              <div className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/40 shadow-lg flex items-center space-x-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="font-bold text-[#0B1736]">Community Risk:</span>
                <span className="font-extrabold text-amber-600">68 / 100 MODERATE</span>
              </div>
            </div>

          </div>

          {/* CARD 3 — FOR DECISION-MAKERS */}
          <div className="rounded-[32px] bg-gradient-to-b from-[#F1EEFF] via-[#F6F4FF] to-white border border-indigo-200/60 p-6 sm:p-7 shadow-lg shadow-indigo-500/5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group min-h-[580px]">
            
            {/* Top Content */}
            <div className="space-y-4 relative z-10">
              
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-[#6246EA] text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                <Landmark className="w-6 h-6 stroke-[2.5]" />
              </div>

              {/* Title & Subtitle */}
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">For</span>
                <h2 className="text-3xl font-extrabold text-[#0B1736] tracking-tight">Decision-Makers</h2>
                <div className="text-sm font-semibold mt-1">
                  <span className="text-[#0B1736]">Insight today. </span>
                  <span className="text-[#6246EA]">Better decisions tomorrow.</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                View high-risk areas, analyze potential impacts, and plan early responses with AI-driven insights.
              </p>

              {/* Feature Rows */}
              <div className="space-y-2 pt-1 text-xs sm:text-sm text-[#1e293b] font-medium">
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white/70 backdrop-blur-sm border border-indigo-100/80">
                  <BarChart3 className="w-4 h-4 text-red-500 shrink-0" />
                  <span>View high-risk areas</span>
                </div>
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white/70 backdrop-blur-sm border border-indigo-100/80">
                  <Target className="w-4 h-4 text-[#6246EA] shrink-0" />
                  <span>Analyze potential impacts</span>
                </div>
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white/70 backdrop-blur-sm border border-indigo-100/80">
                  <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Get prioritized action plans</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={onExploreDecisionMaker}
                className="w-full py-3 rounded-full bg-[#6246EA] hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
              >
                <span>Explore as a Decision-Maker</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

            </div>

            {/* Bottom Environmental Visual (Civic Government Building) */}
            <div className="relative h-44 mt-6 -mx-6 -mb-6 overflow-hidden rounded-b-[32px]">
              <img
                src="/civic_building.jpg"
                alt="Civic Government Building"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Floating UI Badge */}
              <div className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/40 shadow-lg flex items-center space-x-2 text-xs">
                <span className="font-bold text-[#0B1736]">High-Risk Areas:</span>
                <span className="font-extrabold text-[#6246EA]">Chennai (78) • Madurai (74)</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
