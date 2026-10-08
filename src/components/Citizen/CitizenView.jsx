import React, { useState } from 'react';
import { SAMPLE_LOCATIONS, INITIAL_COMMUNITY_SIGNALS } from '../../data/climateData';
import { Users, Droplets, Flame, AlertCircle, CheckCircle2, Radio, Send, Plus } from 'lucide-react';

export default function CitizenView({ selectedLocation, setSelectedLocation }) {
  const [signals, setSignals] = useState(INITIAL_COMMUNITY_SIGNALS);
  const [showModal, setShowModal] = useState(false);
  const [reportCategory, setReportCategory] = useState('Water Shortage');
  const [reportDesc, setReportDesc] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportDesc.trim()) return;

    const newSig = {
      id: Date.now(),
      type: reportCategory.toLowerCase().includes('water') ? 'water' : 'heat',
      icon: reportCategory.toLowerCase().includes('water') ? '💧' : '🌡️',
      category: reportCategory,
      title: reportDesc,
      location: `${selectedLocation?.name || 'Chennai'} Local Ward`,
      count: 1,
      time: 'Just now',
      urgent: true
    };

    setSignals([newSig, ...signals]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowModal(false);
      setReportDesc('');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 via-slate-900 to-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-extrabold text-white">Citizen Climate Portal</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Simplified hyper-local climate safety guidance & community observation reporting.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Community Signal</span>
        </button>
      </div>

      {/* Grid: Citizen Risk Status + Safety Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Your Local Risk Card */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              YOUR LOCAL CLIMATE RISK
            </span>
            <select
              value={selectedLocation?.id}
              onChange={(e) => {
                const loc = SAMPLE_LOCATIONS.find(l => l.id === e.target.value);
                if (loc) setSelectedLocation(loc);
              }}
              className="bg-slate-900 border border-slate-800 text-xs text-white px-2.5 py-1 rounded-lg"
            >
              {SAMPLE_LOCATIONS.map(l => (
                <option key={l.id} value={l.id}>{l.name} District</option>
              ))}
            </select>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">District Risk Score</span>
              <div className="text-3xl font-black text-amber-400 mt-0.5">
                {selectedLocation?.temperatureRisk || 78} <span className="text-sm font-semibold text-slate-400">/ 100</span>
              </div>
            </div>
            <span className="text-xs font-extrabold px-3 py-1.5 rounded-full bg-orange-500 text-white">
              HIGH RISK
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-200">
            <strong className="text-amber-400 block mb-1">MAIN CONCERN TODAY:</strong>
            Water stress &amp; unseasonal heatwave anomalies are elevated across {selectedLocation?.name}.
          </div>
        </div>

        {/* What You Can Do Today Checklist */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            WHAT YOU CAN DO TODAY
          </h3>

          <ul className="space-y-2.5 text-xs text-slate-200">
            <li className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Conserve Water:</strong> Avoid non-essential hose washing or lawn watering during dry spells.</span>
            </li>
            <li className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Stay Hydrated:</strong> Avoid direct outdoor sun exposure during peak thermal hours (11 AM - 3 PM).</span>
            </li>
            <li className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Care for Vulnerable Neighbors:</strong> Check on elderly relatives and young children during heat events.</span>
            </li>
            <li className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Follow Official Alerts:</strong> Monitor NinoShield SMS or local government emergency advisories.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Feature 17: Community Signals Stream */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-blue-400 animate-pulse-subtle" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Live Community Signals &amp; Observations
            </h3>
          </div>
          <span className="text-[10px] text-slate-400">Crowdsourced Signal Feed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {signals.map((sig) => (
            <div key={sig.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-3 text-xs">
              <span className="text-xl">{sig.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{sig.category}</span>
                  <span className="text-[10px] text-slate-400">{sig.time}</span>
                </div>
                <p className="text-slate-300 mt-0.5">{sig.title}</p>
                <div className="text-[10px] text-slate-500 mt-1">{sig.location} • {sig.count} verification votes</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Submitting Report */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card rounded-2xl p-6 border border-slate-700 max-w-md w-full space-y-4 bg-[#131b2e]">
            <h3 className="text-base font-bold text-white">Submit Local Observation</h3>
            <p className="text-xs text-slate-400">
              Report emerging water, heat, or agricultural issues to enhance district decision awareness.
            </p>

            {submittedMessage ? (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs text-center font-bold">
                ✓ Observation Signal Submitted Successfully!
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">Observation Category</label>
                  <select
                    value={reportCategory}
                    onChange={(e) => setReportCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded-xl p-2.5"
                  >
                    <option value="Water Shortage">💧 Water Shortage / Pipeline Deficit</option>
                    <option value="Extreme Heat">🌡️ Extreme Thermal Heat / Stress</option>
                    <option value="Crop Stress">🌾 Crop Wilting / Agricultural Stress</option>
                    <option value="Heavy Rainfall">🌧️ Heavy Rainfall / Flash Flood</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">Description</label>
                  <textarea
                    rows="3"
                    value={reportDesc}
                    onChange={(e) => setReportDesc(e.target.value)}
                    placeholder="e.g. Borewell water supply has dropped significantly in our ward..."
                    className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
