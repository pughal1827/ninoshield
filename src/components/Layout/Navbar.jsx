import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { useNinoShield } from '../../context/NinoShieldContext';

export default function Navbar({ activeNav, setActiveNav, onGetStarted, onNavigate }) {
  const { lang, toggleLanguage } = useNinoShield();

  const navItems = [
    { id: 'home', label: lang === 'ta' ? 'முகப்பு' : 'Home' },
    { id: 'features', label: lang === 'ta' ? 'அறிமுகம்' : 'Overview' },
    { id: 'how-it-works', label: lang === 'ta' ? 'செயல்முறை' : 'Product Loop' },
    { id: 'impact', label: lang === 'ta' ? 'தாக்கம்' : 'Impact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 lg:px-12 py-3.5 h-[68px] flex items-center transition-all">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        
        {/* LEFT LOGO */}
        <div 
          onClick={() => {
            if (setActiveNav) setActiveNav('home');
            if (onNavigate) onNavigate('home');
          }}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition">
            <Shield className="w-4 h-4" />
          </div>

          <div className="text-lg font-black tracking-tight text-slate-900">
            Nino<span className="text-blue-600">Shield</span>
          </div>
        </div>

        {/* CENTER NAVIGATION */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (setActiveNav) setActiveNav(item.id);
                  if (onNavigate) onNavigate(item.id);
                }}
                className={`relative py-1 transition-colors cursor-pointer ${
                  isActive 
                    ? 'text-blue-600 font-bold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* RIGHT CONTROLS: LANGUAGE TOGGLE & GET STARTED BUTTON */}
        <div className="flex items-center space-x-3">
          
          {/* True Language Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => lang !== 'en' && toggleLanguage()}
              className={`px-2.5 py-0.5 rounded-md transition cursor-pointer ${lang === 'en' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              English
            </button>
            <button
              onClick={() => lang !== 'ta' && toggleLanguage()}
              className={`px-2.5 py-0.5 rounded-md transition cursor-pointer ${lang === 'ta' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              தமிழ்
            </button>
          </div>

          <button
            onClick={onGetStarted}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
          >
            <span>{lang === 'ta' ? 'தொடங்கவும்' : 'Explore NinoShield'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </header>
  );
}
