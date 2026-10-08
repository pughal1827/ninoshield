import React, { useState } from 'react';
import { useNinoShield } from '../../context/NinoShieldContext';
import decisionMakerLoginVisual from '../../assets/decision_maker_login_visual.jpg';
import { 
  Shield, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  BarChart3,
  MapPin,
  FileCheck2,
  Copy,
  Check,
  Play,
  UserPlus,
  Key,
  X
} from 'lucide-react';

export default function DecisionMakerLogin() {
  const { loginDecisionMaker, navigate } = useNinoShield();

  // Form State
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Handle Form Submit
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    if (!emailOrPhone.trim()) {
      setErrorMessage('Please enter your official email or phone number.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      loginDecisionMaker(emailOrPhone, password, rememberMe);
      setIsLoading(false);
      navigate('/decision-maker/dashboard');
    }, 600);
  };

  // Instant Demo Account Handler
  const handleInstantDemoLogin = () => {
    setEmailOrPhone('demo.admin@ninoshield.ai');
    setPassword('NinoAdmin@2026');
    setIsLoading(true);

    setTimeout(() => {
      loginDecisionMaker('demo.admin@ninoshield.ai', 'NinoAdmin@2026', true);
      setIsLoading(false);
      navigate('/decision-maker/dashboard');
    }, 500);
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1500);
    } else {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 1500);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotInput) return;
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setShowForgotModal(false);
      setForgotInput('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F8FC] via-white to-[#EBF3FA] text-slate-900 font-sans flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        
        {/* ============================================================ */}
        {/* LEFT SIDE — BRANDING & DECISION-MAKER VISUAL (~55% WIDTH)    */}
        {/* ============================================================ */}
        <div className="w-full lg:w-[55%] space-y-5 text-left">
          
          {/* Top Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="font-black text-xl text-slate-900 tracking-tight flex items-center space-x-1">
                <span>NinoShield</span>
              </div>
              <div className="text-xs text-slate-500 font-semibold tracking-wide">AI-Powered El Niño Early Action</div>
            </div>
          </div>

          {/* Hero Headlines */}
          <div className="space-y-1.5">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
              Decision-Maker <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Portal</span>
            </h1>
            <p className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
              Climate intelligence for informed decisions and early action.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xl">
              Access real-time climate risks, community insights, and AI-powered decision support to plan and implement early actions for a safer and more resilient region.
            </p>
          </div>

          {/* 4 Feature Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            
            {/* Regional Risk Intelligence */}
            <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/80 shadow-xs flex flex-col items-center space-y-2">
              <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-900 leading-tight">
                Regional<br />Risk Intelligence
              </div>
            </div>

            {/* Priority Areas */}
            <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/80 shadow-xs flex flex-col items-center space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-900 leading-tight">
                Priority<br />Areas
              </div>
            </div>

            {/* AI Decision Support */}
            <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/80 shadow-xs flex flex-col items-center space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-900 leading-tight">
                AI Decision<br />Support
              </div>
            </div>

            {/* Early Action Planning */}
            <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/80 shadow-xs flex flex-col items-center space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-900 leading-tight">
                Early Action<br />Planning
              </div>
            </div>

          </div>

          {/* Aerial City Environment Image with Geospatial Data Overlays */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg min-h-[220px] sm:min-h-[260px] group">
            <img 
              src={decisionMakerLoginVisual} 
              alt="Civic City Aerial Visual" 
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

            {/* Floating Data Card 1: High Risk Areas Identified */}
            <div className="absolute top-[20%] left-[10%] bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-red-400/40 text-white flex items-center space-x-2 shadow-lg">
              <div className="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center">
                <BarChart3 className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-300 font-bold leading-tight">High Risk Areas</div>
                <div className="text-[11px] font-black text-white leading-tight">Identified</div>
              </div>
            </div>

            {/* Floating Data Card 2: Community Reports */}
            <div className="absolute top-[20%] right-[15%] bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-blue-400/40 text-white flex items-center space-x-2 shadow-lg">
              <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-300 font-bold leading-tight">Community Reports</div>
                <div className="text-xs font-black text-white leading-tight">2,430+</div>
              </div>
            </div>

            {/* Glowing Map Pin 1 (Red Alert) */}
            <div className="absolute top-[50%] left-[32%] flex items-center space-x-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-red-200 shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-[10px]">
                !
              </div>
            </div>

            {/* Glowing Map Pin 2 (Blue Water) */}
            <div className="absolute top-[48%] left-[50%] flex items-center space-x-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-blue-200 shadow-md">
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                💧
              </div>
            </div>

            {/* Glowing Map Pin 3 (Green Crop) */}
            <div className="absolute top-[55%] right-[25%] flex items-center space-x-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-200 shadow-md">
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                🌱
              </div>
            </div>

            {/* Floating Data Card 3: Population Potentially Affected */}
            <div className="absolute bottom-[15%] left-[8%] bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-400/40 text-white flex items-center space-x-2 shadow-lg">
              <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-300 font-bold leading-tight">Population Potentially Affected</div>
                <div className="text-xs font-black text-white leading-tight">1.8M</div>
              </div>
            </div>

            {/* Floating Data Card 4: Early Action In Progress */}
            <div className="absolute bottom-[15%] right-[10%] bg-emerald-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-400/40 text-white flex items-center space-x-2 shadow-lg">
              <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                ✓
              </div>
              <div className="text-left">
                <div className="text-[10px] text-emerald-200 font-bold leading-tight">Early Action In Progress</div>
                <div className="text-xs font-black text-white leading-tight">12</div>
              </div>
            </div>

          </div>

        </div>

        {/* ============================================================ */}
        {/* RIGHT SIDE — DECISION-MAKER LOGIN CARD (~45% WIDTH)           */}
        {/* ============================================================ */}
        <div className="w-full lg:w-[45%] max-w-md">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xl space-y-4 text-left relative">
            
            {/* Top Centered Logo */}
            <div className="flex flex-col items-center text-center space-y-1.5 pb-1">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 mb-1">
                <Shield className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Decision-Maker Portal</h2>
              <p className="text-xs text-slate-500 font-medium">
                Sign in to access regional climate risk intelligence and early-action tools.
              </p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs font-semibold">
              
              {/* Official Email or Phone */}
              <div className="space-y-1">
                <label className="block font-extrabold text-slate-800">Official Email or Phone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="Enter your official email or phone number"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block font-extrabold text-slate-800">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center space-x-2 pt-0.5">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Remember me
                </label>
              </div>

              {/* Primary Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs transition shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[10px] text-slate-400 font-semibold uppercase tracking-wider absolute">
                or
              </span>
            </div>

            {/* DEMO ACCOUNT CONTAINER (EXACT MATCH TO REFERENCE IMAGE) */}
            <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs space-y-2">
              <div className="flex items-center space-x-2 text-blue-900 font-bold">
                <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-extrabold text-xs">Demo Account</div>
                  <div className="text-[10px] text-slate-500 font-normal">Use the demo account to quickly explore the portal.</div>
                </div>
              </div>

              {/* Email & Password Copy Fields */}
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 font-medium">
                
                <div className="p-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="truncate">
                    <div className="text-[9px] text-slate-400 uppercase font-bold">Email</div>
                    <div className="font-bold text-slate-900 truncate">demo.admin@ninoshield.ai</div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => copyToClipboard('demo.admin@ninoshield.ai', 'email')}
                    className="p-1 text-slate-400 hover:text-blue-600 cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="p-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="truncate">
                    <div className="text-[9px] text-slate-400 uppercase font-bold">Password</div>
                    <div className="font-bold text-slate-900 truncate">NinoAdmin@2026</div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => copyToClipboard('NinoAdmin@2026', 'pass')}
                    className="p-1 text-slate-400 hover:text-blue-600 cursor-pointer"
                    title="Copy Password"
                  >
                    {copiedPass ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

              </div>

              {/* Direct Demo Login Button */}
              <button
                type="button"
                onClick={handleInstantDemoLogin}
                className="w-full py-2 rounded-xl bg-white hover:bg-blue-100 text-blue-700 font-extrabold text-xs transition cursor-pointer flex items-center justify-center space-x-1.5 border border-blue-300 shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                <span>Demo Login →</span>
              </button>
            </div>

            {/* Create Account Section */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1.5">
              <p className="text-xs text-slate-600 font-semibold">Don't have an account?</p>
              <button
                onClick={() => navigate('/decision-maker/register')}
                className="w-full py-2.5 rounded-xl bg-white border border-blue-200 hover:bg-blue-50 text-blue-700 font-bold text-xs transition flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-blue-600" />
                <span>Create Decision-Maker Account →</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* FORGOT PASSWORD MODAL */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 relative text-xs">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Key className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Forgot Password</h3>
            </div>

            {forgotSuccess ? (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-1 text-emerald-900">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-extrabold text-xs">Reset Link Dispatched</div>
                <p className="text-[11px] text-slate-600">Official password reset link sent to {forgotInput}.</p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3 font-semibold">
                <p className="text-slate-600">Enter your official email or phone number to receive password recovery instructions:</p>
                <input
                  type="text"
                  value={forgotInput}
                  onChange={(e) => setForgotInput(e.target.value)}
                  placeholder="Enter official email or phone number"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 text-white font-extrabold rounded-xl cursor-pointer"
                >
                  Send Reset Link
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
