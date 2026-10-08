import React, { useEffect, useState } from 'react';
import { useNinoShield } from '../../context/NinoShieldContext';
import { Shield, MapPin, Crosshair, CheckCircle2, ArrowRight, Compass } from 'lucide-react';

export default function CommunityLocationSetup() {
  const { 
    userGeoStatus, 
    requestBrowserLocation, 
    confirmCommunityLocation, 
    selectedLocation, 
    locations, 
    changeLocation,
    navigate 
  } = useNinoShield();

  const [showManualSelect, setShowManualSelect] = useState(false);

  useEffect(() => {
    if (!userGeoStatus.isDetecting && userGeoStatus.locationText === 'Madurai, Tamil Nadu') {
      requestBrowserLocation();
    }
  }, []);

  const handleConfirm = () => {
    confirmCommunityLocation(selectedLocation.id);
    navigate('/community/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F8FC] via-white to-[#EBF3FA] text-slate-900 font-sans flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-2xl max-w-md w-full text-center space-y-6">
        
        {/* Header Logo */}
        <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md shadow-blue-500/20">
          <Shield className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Finding your community...</h2>
          <p className="text-xs text-slate-500 font-medium">
            NinoShield detects your location to connect you with local community climate risk data.
          </p>
        </div>

        {/* Location Display Card */}
        <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-2 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider">DETECTED COMMUNITY LOCATION</span>
            <span className="flex items-center space-x-1 text-emerald-700 font-bold text-[10px] bg-emerald-100 px-2 py-0.5 rounded">
              <Crosshair className="w-3 h-3 text-emerald-600 animate-pulse" />
              <span>GPS Telemetry</span>
            </span>
          </div>

          <div className="flex items-center space-x-2 text-slate-900 font-black text-base">
            <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
            <span>📍 {userGeoStatus.locationText || `${selectedLocation.name}, ${selectedLocation.district}`}</span>
          </div>

          <p className="text-[11px] text-slate-600 font-medium">
            Assigned Community Region: <strong className="text-slate-900">{selectedLocation.name} Community Zone</strong>
          </p>
        </div>

        {/* Manual Select Options */}
        {showManualSelect ? (
          <div className="space-y-2 text-left max-h-48 overflow-y-auto pr-1">
            <div className="text-xs font-bold text-slate-800 mb-1">Select Community Area:</div>
            {locations.map(loc => (
              <div
                key={loc.id}
                onClick={() => {
                  changeLocation(loc.id);
                  setShowManualSelect(false);
                }}
                className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition ${selectedLocation.id === loc.id ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}
              >
                <span className="text-xs font-bold">{loc.name} Community ({loc.district})</span>
                {selectedLocation.id === loc.id && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
              </div>
            ))}
          </div>
        ) : null}

        {/* Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleConfirm}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Confirm Location →</span>
          </button>

          <button
            onClick={() => setShowManualSelect(!showManualSelect)}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-slate-600" />
            <span>{showManualSelect ? 'Hide Options' : 'Change Location'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
