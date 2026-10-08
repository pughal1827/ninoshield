import React, { useState } from 'react';
import { generateAIAnalysis } from '../../utils/aiAnalyst';
import { Zap, Copy, Check, X, Send } from 'lucide-react';

export default function EarlyWarningModal({ selectedLocation, onClose }) {
  const analysis = generateAIAnalysis(selectedLocation);
  const [copied, setCopied] = useState(false);
  const [sentStatus, setSentStatus] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(analysis.publicWarning);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleActivate = () => {
    setSentStatus(true);
    setTimeout(() => {
      setSentStatus(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-card rounded-2xl p-6 border border-amber-500/30 max-w-lg w-full space-y-4 bg-[#131b2e] shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2.5 text-amber-400">
          <Zap className="w-5 h-5 fill-current" />
          <h3 className="text-base font-bold text-white">AI-Generated Public Early Warning</h3>
        </div>

        <p className="text-xs text-slate-300">
          Public emergency broadcast advisory prepared for <strong className="text-white">{selectedLocation?.name} District</strong>:
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono leading-relaxed whitespace-pre-line">
          {analysis.publicWarning}
        </div>

        {sentStatus ? (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold text-center">
            ✓ Early warning broadcast initiated successfully! Local alert systems notified.
          </div>
        ) : (
          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Alert'}</span>
            </button>

            <button
              onClick={handleActivate}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold shadow-lg shadow-amber-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>SEND / BROADCAST ALERT</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
