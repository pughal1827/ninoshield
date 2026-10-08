import React from 'react';
import { useNinoShield } from '../../context/NinoShieldContext';
import { MapPin, Globe, Calendar, User, ChevronDown, Plus } from 'lucide-react';

export default function HeaderBanner({
  title,
  subtitle,
  mode = 'people',
  onOpenLocationModal
}) {
  const { lang, toggleLanguage, selectedLocation } = useNinoShield();

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900/10 via-sky-50 to-[#EBF3FF] p-6 border border-blue-100 shadow-xs mb-6">
      
      {/* Background Landscape / Temple Graphic */}
      <div 
        className="absolute inset-0 bg-cover bg-right-top opacity-20 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: `url('/madurai_header_bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#F8FBFF] via-[#F8FBFF]/90 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Title & Location */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B1736]">
              {title || "Good morning!"}
            </h1>

            {/* Location Selector Pill */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenLocationModal}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white border border-blue-200 text-xs font-bold text-[#0B1736] shadow-xs hover:bg-blue-50 transition"
              >
                <MapPin className="w-3.5 h-3.5 text-[#1769FF]" />
                <span>{selectedLocation.name}, Tamil Nadu</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={onOpenLocationModal}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-blue-50 text-[#1769FF] border border-blue-200 text-xs font-bold hover:bg-blue-100 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{mode === 'decision-maker' ? 'Change Region' : 'Change Location'}</span>
              </button>
            </div>
          </div>

          <p className="text-sm font-medium text-slate-600">
            {subtitle}
          </p>
        </div>

        {/* Right Language, User Profile & Date Card */}
        <div className="flex items-center space-x-3">
          
          {/* Language Toggle */}
          <div className="flex items-center bg-white p-1 rounded-full border border-slate-200 shadow-xs text-xs font-bold">
            <button
              onClick={() => lang !== 'en' && toggleLanguage()}
              className={`px-3 py-1 rounded-full transition ${lang === 'en' ? 'bg-[#1769FF] text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              English
            </button>
            <button
              onClick={() => lang !== 'ta' && toggleLanguage()}
              className={`px-3 py-1 rounded-full transition ${lang === 'ta' ? 'bg-[#1769FF] text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              தமிழ்
            </button>
          </div>

          {/* User Icon Circle */}
          <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-xs cursor-pointer hover:bg-slate-50">
            <User className="w-4 h-4" />
          </div>

          {/* Date Card */}
          <div className="bg-white rounded-2xl p-2.5 px-4 border border-blue-100 shadow-xs flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1769FF] flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-black text-[#0B1736]">1 Oct 2026</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Thursday</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
