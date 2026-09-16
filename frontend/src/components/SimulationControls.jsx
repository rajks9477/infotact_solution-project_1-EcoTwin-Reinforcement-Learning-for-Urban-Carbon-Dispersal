import React from 'react';

/**
 * SimulationControls Component - Play/Pause/Step HUD and Speed Slider
 * Author: Subhransu Sekhar Swain (Frontend Lead - Day 9 Deliverable)
 */
export default function SimulationControls({ 
  isPlaying = false, 
  onTogglePlay, 
  onStepForward, 
  onReset, 
  currentStep = 1,
  speed = 1.0,
  onChangeSpeed
}) {
  const SPEEDS = [0.5, 1.0, 2.0, 5.0];

  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4">
      {/* Playback Control Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onTogglePlay}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 ${
            isPlaying 
              ? 'bg-amber-600 hover:bg-amber-500 text-white' 
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
        >
          <span>{isPlaying ? '⏸ Pause' : '▶ Play'}</span>
        </button>

        <button
          onClick={onStepForward}
          disabled={isPlaying}
          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 transition-all border border-slate-700"
        >
          ⏭ Step (+1s)
        </button>

        <button
          onClick={onReset}
          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-red-900/60 text-slate-300 hover:text-red-300 transition-all border border-slate-700"
        >
          ↺ Reset
        </button>
      </div>

      {/* Real-time Time Clock Badge */}
      <div className="flex items-center gap-3">
        <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-xs">
          <span className="text-slate-400">Time: </span>
          <span className="text-emerald-400 font-bold">{currentStep}s</span>
        </div>

        {/* Speed Multiplier Buttons */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-0.5">
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => onChangeSpeed && onChangeSpeed(s)}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                speed === s 
                  ? 'bg-blue-600 text-white shadow' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}