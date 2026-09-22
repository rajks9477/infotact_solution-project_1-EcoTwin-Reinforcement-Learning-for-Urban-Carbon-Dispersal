import React from 'react';

const DispersionOverlay = ({ windSpeed = 3.5, windDirection = 'NE 45°', greenWaveEfficiency = 84.5 }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg space-y-3">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
            Atmospheric Plume & Green Wave
          </h3>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-medium">
          Gaussian 2D
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 bg-zinc-950/60 rounded-lg border border-zinc-800/80">
          <span className="text-[10px] text-zinc-400 block mb-0.5">Ambient Wind Vector</span>
          <div className="flex items-baseline space-x-1.5">
            <span className="font-mono text-cyan-400 font-bold text-sm">{windSpeed} m/s</span>
            <span className="text-[10px] text-zinc-500 font-mono">({windDirection})</span>
          </div>
        </div>

        <div className="p-2.5 bg-zinc-950/60 rounded-lg border border-zinc-800/80">
          <span className="text-[10px] text-zinc-400 block mb-0.5">Green Wave Bandwidth</span>
          <div className="flex items-baseline space-x-1.5">
            <span className="font-mono text-emerald-400 font-bold text-sm">{greenWaveEfficiency}%</span>
            <span className="text-[10px] text-emerald-500/80 font-medium">Synced</span>
          </div>
        </div>
      </div>

      <div className="p-2.5 bg-cyan-950/30 border border-cyan-500/20 rounded-lg text-xs space-y-1">
        <div className="flex justify-between text-[11px]">
          <span className="text-zinc-400">Progression Corridor:</span>
          <span className="text-cyan-300 font-medium">Arterial East-West</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-zinc-400">Coordinated Nodes:</span>
          <span className="text-zinc-200 font-mono">junc_00 → junc_03</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-zinc-400">Plume Dispersal Rate:</span>
          <span className="text-emerald-400 font-mono">+18.6% Faster</span>
        </div>
      </div>
    </div>
  );
};

export default DispersionOverlay;