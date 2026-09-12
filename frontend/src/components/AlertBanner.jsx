import React from 'react';

/**
 * AlertBanner Component - Real-time Carbon Hotspot Warning & AI Actuator
 * Author: Subhransu Sekhar Swain (Frontend Lead - Day 6 Deliverable)
 * Detects hazardous corridor idling smog spikes and provides direct
 * UI actuation to toggle PPO Reinforcement Learning Dispersal.
 */

export default function AlertBanner({ 
  isAiEnabled = true, 
  onToggleAi, 
  hotspotCorridor = 'E_S2C (South Inbound)', 
  emissionRate = '1,850 mg/s' 
}) {
  return (
    <div className={`p-4 rounded-2xl border transition-all duration-300 shadow-xl ${
      isAiEnabled 
        ? 'bg-slate-900/90 border-emerald-800/60 text-slate-100' 
        : 'bg-red-950/80 border-red-700 text-red-100 animate-pulse'
    }`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner ${
            isAiEnabled ? 'bg-emerald-950 border border-emerald-700 text-emerald-400' : 'bg-red-900 border border-red-500 text-white'
          }`}>
            {isAiEnabled ? '🌿' : '⚠️'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                isAiEnabled ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-red-900 text-red-200 border border-red-600'
              }`}>
                {isAiEnabled ? 'Active Mitigation' : 'Smog Pocket Hazard'}
              </span>
              <span className="text-xs text-slate-400 font-mono">Location: {hotspotCorridor}</span>
            </div>
            <p className="text-sm font-semibold mt-1">
              {isAiEnabled 
                ? `PPO-EcoDisperse active: Trapped carbon being flushed dynamically (${emissionRate})` 
                : `Severe Idling Carbon Accumulation detected! Flushed exhaust threshold breached!`}
            </p>
          </div>
        </div>

        {/* Dynamic Action Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleAi}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-150 shadow-lg ${
              isAiEnabled 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900 animate-bounce'
            }`}
          >
            {isAiEnabled ? 'Switch to Baseline Fixed-Timer' : '🚀 Activate AI Dispersal Policy'}
          </button>
        </div>
      </div>
    </div>
  );
}