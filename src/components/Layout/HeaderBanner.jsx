import React from 'react';
import { useNinoShield } from '../../context/NinoShieldContext';
import { MapPin, Calendar, User, ChevronDown, Plus, ArrowLeft } from 'lucide-react';

export default function HeaderBanner({
  title,
  subtitle,
  mode = 'people',
  onOpenLocationModal
}) {
  const { lang, toggleLanguage, selectedLocation, t, navigate } = useNinoShield();

  // Dynamic Date Formatting
  const today = new Date();
  const dateFormatted = today.toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  const dayName = today.toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-US', {
    weekday: 'long'
  });

  return (
    <div className="relative w-full rounded-2xl bg-white p-5 lg:p-6 border border-slate-200 shadow-xs mb-6">
      
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-72 h-full bg-gradient-to-l from-blue-50/50 to-transparent rounded-r-2xl pointer-events-none" />

      {/* Top Navigation Row: Return to Landing Page */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 relative z-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 text-xs font-bold transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{lang === 'ta' ? '← முகப்பு பக்கத்திற்குச் செல்லவும்' : '← Return to Landing Page'}</span>
        </button>

        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="capitalize">{mode} Mode Active</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Title & Location */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {title || (lang === 'ta' ? 'வணக்கம்!' : 'Good morning!')}
            </h1>

            {/* Location Selector Pill */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenLocationModal}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>{selectedLocation.name}, Tamil Nadu</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={onOpenLocationModal}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 text-xs font-semibold hover:bg-blue-100 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{mode === 'decision-maker' ? (t.changeRegion || 'Change Region') : (t.changeLocation || 'Change Location')}</span>
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {subtitle}
          </p>
        </div>

        {/* Right Controls: Language Toggle & Dynamic Date Card */}
        <div className="flex items-center space-x-3">
          
          {/* True Language Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => lang !== 'en' && toggleLanguage()}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${lang === 'en' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              English
            </button>
            <button
              onClick={() => lang !== 'ta' && toggleLanguage()}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${lang === 'ta' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              தமிழ்
            </button>
          </div>

          {/* User Badge */}
          <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 shadow-xs">
            <User className="w-4 h-4" />
          </div>

          {/* Dynamic Date Card */}
          <div className="bg-slate-50 rounded-lg p-2 px-3 border border-slate-200 shadow-xs flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-900">{dateFormatted}</div>
              <div className="text-[10px] text-slate-500 font-medium capitalize">{dayName}</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
