import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';

export default function Navbar({ activeNav, setActiveNav, onGetStarted, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'impact', label: 'Impact' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F7FAFF]/90 backdrop-blur-md border-b border-blue-100/60 px-6 lg:px-12 py-3.5 h-[70px] flex items-center transition-all">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        
        {/* LEFT LOGO */}
        <div 
          onClick={() => {
            if (setActiveNav) setActiveNav('home');
            if (onNavigate) onNavigate('home');
          }}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          {/* Logo Badge with Globe & Wave */}
          <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-[#1769FF] via-[#1687FF] to-[#00B8C8] shadow-md shadow-[#1769FF]/20 group-hover:scale-105 transition-transform">
            <Globe className="w-5 h-5 text-white" />
            <svg className="absolute -bottom-0.5 w-6 h-2 text-white/90" viewBox="0 0 24 8" fill="none">
              <path d="M 0 4 Q 6 8 12 4 T 24 4" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>

          <div className="text-xl font-black tracking-tight flex items-center">
            <span className="text-[#0B1736]">Nino</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1769FF] to-[#1687FF]">
              Shield
            </span>
          </div>
        </div>

        {/* CENTER NAVIGATION */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (setActiveNav) setActiveNav(item.id);
                  if (onNavigate) onNavigate(item.id);
                }}
                className={`relative py-1 transition-colors ${
                  isActive 
                    ? 'text-[#1769FF] font-bold' 
                    : 'text-slate-600 hover:text-[#0B1736]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1769FF] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* RIGHT GET STARTED BUTTON */}
        <button
          onClick={onGetStarted}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1769FF] via-[#2563eb] to-[#4f46e5] hover:from-blue-600 hover:to-indigo-600 text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#1769FF]/25 transition-all flex items-center space-x-1.5 cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>

      </div>
    </header>
  );
}
