import React, { useState } from 'react';
import { useNinoShield } from '../../context/NinoShieldContext';
import communityLoginVisual from '../../assets/community_login_visual.jpg';
import { 
  Shield, 
  Mail, 
  Lock, 
  User, 
  MapPin, 
  ArrowRight, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  X
} from 'lucide-react';

export default function CommunityRegister() {
  const { registerCommunity, navigate, locations } = useNinoShield();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [community, setCommunity] = useState('Madurai Community');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Please enter your email or phone number.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter a password.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      registerCommunity({ fullName, email, password, community });
      setIsLoading(false);
      navigate('/community/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F8FC] via-white to-[#EBF3FA] text-slate-900 font-sans flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        
        {/* Left Side — Branding */}
        <div className="w-full lg:w-[50%] space-y-6 text-left">
          
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="font-black text-xl text-slate-900 tracking-tight">NinoShield</div>
              <div className="text-xs text-slate-500 font-semibold">AI-Powered El Niño Early Action</div>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
              Create <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Community Account</span>
            </h1>
            <p className="text-base sm:text-lg font-bold text-slate-700">
              Join NinoShield to access local climate risk intelligence.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Empower your neighborhood with early warning signals, community readiness maps, and collective emergency planning.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md min-h-[200px]">
            <img 
              src={communityLoginVisual} 
              alt="Community Town" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          </div>

        </div>

        {/* Right Side — Registration Form Card */}
        <div className="w-full lg:w-[46%] max-w-md">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xl space-y-4 text-left">
            
            <div className="flex flex-col items-center text-center space-y-1 pb-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md mb-1">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Create Community Account</h2>
              <p className="text-xs text-slate-500 font-medium">Enter your details to set up your community portal profile.</p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-semibold">
              
              <div>
                <label className="block font-extrabold text-slate-800 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-extrabold text-slate-800 mb-1">Email or Phone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address or phone"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-extrabold text-slate-800 mb-1">Select Community / Area</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    value={community}
                    onChange={(e) => setCommunity(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {locations.map(loc => (
                      <option key={loc.id} value={`${loc.name} Community`}>
                        {loc.name} Community ({loc.district})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-extrabold text-slate-800 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create password"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-extrabold text-slate-800 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-xs shadow-md flex items-center justify-center space-x-2 cursor-pointer mt-2"
              >
                <span>{isLoading ? 'Creating Account...' : 'Create Account →'}</span>
              </button>

            </form>

            <div className="pt-2 text-center">
              <p className="text-xs text-slate-600 font-medium">
                Already have a community account?{' '}
                <button
                  onClick={() => navigate('/community/login')}
                  className="font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Sign In →
                </button>
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
