import React from 'react';

const FleetElectrification = ({
  evPenetration = 35.0,
  bevCount = 112,
  iceCount = 144,
  hybridCount = 64,
  chargingPortsUtil = 64.7,
  co2OffsetKg = 25.28,
}) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg space-y-3">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
            Fleet Electrification & EV Grid
          </h3>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
          {evPenetration}% BEV Adoption
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <div>
          <div className="flex justify-between text-zinc-400 mb-1 text-[11px]">
            <span>Fleet Powertrain Mix</span>
            <span className="font-mono text-zinc-300">{bevCount + hybridCount + iceCount} Total</span>
          </div>
          {/* Multi-segment progress bar */}
          <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden flex">
            <div className="bg-emerald-500 h-full" style={{ width: '35%' }} title="BEV (35%)"></div>
            <div className="bg-blue-500 h-full" style={{ width: '20%' }} title="Hybrid (20%)"></div>
            <div className="bg-zinc-600 h-full" style={{ width: '45%' }} title="ICE Fossil (45%)"></div>
          </div>
          <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> BEV ({bevCount})
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span> Hybrid ({hybridCount})
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-500"></span> ICE ({iceCount})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="p-2.5 bg-zinc-950/60 rounded-lg border border-zinc-800/80">
            <span className="text-[10px] text-zinc-400 block mb-0.5">EV Charging Ports</span>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-mono text-emerald-400 font-bold text-sm">{chargingPortsUtil}%</span>
              <span className="text-[10px] text-zinc-500 font-mono">In Use</span>
            </div>
          </div>

          <div className="p-2.5 bg-zinc-950/60 rounded-lg border border-zinc-800/80">
            <span className="text-[10px] text-zinc-400 block mb-0.5">Displaced Tailpipe</span>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-mono text-cyan-400 font-bold text-sm">+{co2OffsetKg}</span>
              <span className="text-[10px] text-zinc-500 font-mono">kg/hr</span>
            </div>
          </div>
        </div>

        <div className="p-2 bg-emerald-950/30 border border-emerald-500/20 rounded-lg text-[11px] text-emerald-300/90 leading-tight">
          <strong>PPO Powertrain Priority:</strong> Emitting ICE vehicle queues given +80% clearance weight to accelerate urban carbon flushing.
        </div>
      </div>
    </div>
  );
};

export default FleetElectrification;