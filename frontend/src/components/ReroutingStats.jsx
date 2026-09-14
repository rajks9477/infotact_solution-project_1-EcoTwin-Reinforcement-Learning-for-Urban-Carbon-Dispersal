import React from 'react';

/**
 * ReroutingStats Component - Dynamic Carbon Bypass & Vehicle Diversion HUD
 * Author: Subhransu Sekhar Swain (Frontend Lead - Day 7 Deliverable)
 * Visualizes proactive vehicle rerouting actions triggered when corridors
 * breach hazardous localized carbon emission thresholds.
 */

export default function ReroutingStats({ totalDiverted = 4, targetHotspot = 'E_S2C (South)' }) {
  const DIVERSION_CHANNELS = [
    { from: 'E_S2C (South Hotspot)', to: 'E_E2C (East Bypass)', count: 2, status: 'Active Routing', color: 'text-emerald-400' },
    { from: 'E_S2C (South Hotspot)', to: 'E_W2C (West Bypass)', count: 2, status: 'Active Routing', color: 'text-emerald-400' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping"></span>
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Active Carbon Diversions
          </h3>
        </div>
        <span className="text-xs bg-blue-950 border border-blue-800 text-blue-300 px-2.5 py-0.5 rounded-full font-bold">
          {totalDiverted} Vehicles Diverted
        </span>
      </div>

      <p className="text-xs text-slate-400">
        TraCI dynamic rerouting actively relieves congested stop-bars to prevent stationary carbon buildup.
      </p>

      {/* Active Diversion Channels */}
      <div className="space-y-2.5">
        {DIVERSION_CHANNELS.map((channel, idx) => (
          <div key={idx} className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-slate-300 font-semibold">{channel.from}</span>
                <span className="text-slate-500">➔</span>
                <span className="text-emerald-400 font-semibold">{channel.to}</span>
              </div>
              <p className="text-[10px] text-slate-500">Threshold: &gt;1,500 mg/s Trigger</p>
            </div>
            <div className="text-right font-mono">
              <span className="font-bold text-white text-sm">{channel.count}</span>
              <p className={`text-[10px] ${channel.color}`}>{channel.status}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Rerouting Efficiency Badge */}
      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80">
        <span>Hotspot Clearing Efficiency</span>
        <span className="font-bold text-emerald-400">96.4% Success</span>
      </div>
    </div>
  );
}