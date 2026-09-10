import React from 'react';

/**
 * MetricsPanel Component - Telemetry & Signal Controller Widget
 * Author: Subhransu Sekhar Swain (Frontend Lead - Day 4 Deliverable)
 * Provides real-time corridor carbon comparisons, live traffic light phase state,
 * and simulation execution controls.
 */

export default function MetricsPanel({ 
  currentPhase = 0, 
  onStepSimulation, 
  onResetSimulation,
  isSimulating = false 
}) {
  const PHASES = [
    { id: 0, label: 'North - South Green', color: 'bg-emerald-500', duration: '35s' },
    { id: 1, label: 'North - South Yellow', color: 'bg-amber-500', duration: '4s' },
    { id: 2, label: 'East - West Green', color: 'bg-emerald-500', duration: '30s' },
    { id: 3, label: 'East - West Yellow', color: 'bg-amber-500', duration: '4s' },
  ];

  const CORRIDOR_LEADERBOARD = [
    { corridor: 'E_S2C (South Inbound)', co2: '1,850 mg/s', status: 'High Alert', color: 'text-red-400' },
    { corridor: 'E_E2C (East Inbound)', co2: '850 mg/s', status: 'Moderate', color: 'text-amber-400' },
    { corridor: 'E_W2C (West Inbound)', co2: '620 mg/s', status: 'Moderate', color: 'text-amber-400' },
    { corridor: 'E_N2C (North Inbound)', co2: '450 mg/s', status: 'Clean Flow', color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-6">
      {/* Simulation Control Card */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>Digital Twin Controls</span>
          <span className="text-xs font-normal text-slate-500">FastAPI TraCI Engine</span>
        </h3>
        <div className="flex gap-3">
          <button
            onClick={onStepSimulation}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition duration-150 shadow-lg shadow-emerald-950 flex items-center justify-center gap-2"
          >
            <span>▶</span> Step Simulation (1s)
          </button>
          <button
            onClick={onResetSimulation}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 px-4 rounded-xl text-xs transition duration-150 border border-slate-700"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Traffic Signal Phase Indicator Card */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
          <span>Junction J_C Signal Phase</span>
          <span className="text-[11px] bg-blue-950 border border-blue-800 text-blue-400 px-2 py-0.5 rounded-full font-mono">
            Phase {currentPhase}
          </span>
        </h3>
        <div className="space-y-2 mt-3">
          {PHASES.map((phase) => (
            <div
              key={phase.id}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                currentPhase === phase.id
                  ? 'bg-slate-800 border-slate-600 shadow-md'
                  : 'bg-slate-950/60 border-slate-900 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${phase.color} ${currentPhase === phase.id ? 'animate-pulse' : ''}`}></span>
                <span className="text-xs font-medium text-slate-200">{phase.label}</span>
              </div>
              <span className="text-xs font-mono text-slate-400">{phase.duration}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Corridor Carbon Hotspot Leaderboard */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
          Corridor Emission Intensity
        </h3>
        <div className="space-y-3 mt-2">
          {CORRIDOR_LEADERBOARD.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/80 last:border-none">
              <span className="text-slate-300">{item.corridor}</span>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-slate-100">{item.co2}</span>
                <span className={`text-[11px] font-semibold ${item.color}`}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}