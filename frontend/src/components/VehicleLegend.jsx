import React from 'react';

/**
 * VehicleLegend Component - Explains fleet markers and emission indicators
 * Author: Subhransu Sekhar Swain (Frontend Lead - Day 8 Deliverable)
 */
export default function VehicleLegend() {
  const ITEMS = [
    { label: 'Passenger Car (Clean)', color: 'bg-emerald-400', desc: '< 400 mg/s' },
    { label: 'Delivery Truck (Moderate)', color: 'bg-amber-400', desc: '400 - 800 mg/s' },
    { label: 'Heavy Bus (High Smog)', color: 'bg-red-400', desc: '> 800 mg/s' },
  ];

  return (
    <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3.5 py-2 rounded-xl text-xs space-y-1 shadow-lg">
      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Vehicle Fleet & Emissions</p>
      <div className="flex flex-wrap items-center gap-3">
        {ITEMS.map((it, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${it.color}`}></span>
            <span className="text-slate-300 text-[11px]">{it.label}</span>
            <span className="text-slate-500 text-[10px]">({it.desc})</span>
          </div>
        ))}
      </div>
    </div>
  );
}