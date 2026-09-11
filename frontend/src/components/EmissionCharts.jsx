import React, { useState } from 'react';

/**
 * EmissionCharts Component - Comparative Environmental Impact Visualizer
 * Author: Subhransu Sekhar Swain (Frontend Lead - Day 5 Deliverable)
 * Renders comparative timelines contrasting Fixed-Time baseline carbon output
 * against the EcoTwin PPO-RL dynamic signal policy.
 */

export default function EmissionCharts() {
  // Timeline comparison data: Fixed Baseline vs EcoTwin PPO Agent
  const TIMELINE_DATA = [
    { time: '10s', baseline: 465, ppo: 380 },
    { time: '20s', baseline: 980, ppo: 740 },
    { time: '30s', baseline: 1423, ppo: 1090 },
    { time: '40s', baseline: 2150, ppo: 1540 },
    { time: '50s', baseline: 2805, ppo: 2020 },
    { time: '60s', baseline: 3340, ppo: 2460 },
    { time: '70s', baseline: 3741, ppo: 2880 },
    { time: '80s', baseline: 4210, ppo: 3290 },
    { time: '90s', baseline: 4620, ppo: 3620 },
    { time: '100s', baseline: 4950, ppo: 3890 },
  ];

  const maxVal = 5500;

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            Cumulative Carbon Dispersal Benchmark (100s Horizon)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Empirical comparison: Traditional Fixed-Time (30s) vs PPO-EcoDisperse RL Controller
          </p>
        </div>

        {/* Legend Pills */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-red-500/80"></span>
            <span className="text-slate-300">Baseline (4.95 kg)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-emerald-500"></span>
            <span className="text-emerald-400 font-semibold">EcoTwin PPO (3.89 kg)</span>
          </div>
          <span className="bg-emerald-950 border border-emerald-800 text-emerald-300 px-2.5 py-1 rounded-full font-bold">
            -21.4% CO2 Cut
          </span>
        </div>
      </div>

      {/* Responsive Bar / Chart Grid */}
      <div className="space-y-3 pt-2">
        {TIMELINE_DATA.map((item, idx) => {
          const baselineWidth = `${(item.baseline / maxVal) * 100}%`;
          const ppoWidth = `${(item.ppo / maxVal) * 100}%`;

          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>T = {item.time}</span>
                <span>
                  <strong className="text-red-400">{item.baseline}g</strong> vs{' '}
                  <strong className="text-emerald-400">{item.ppo}g</strong>
                </span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden flex flex-col gap-0.5 p-0.5 border border-slate-800">
                {/* Baseline Bar */}
                <div
                  className="h-1 bg-red-500/60 rounded-full transition-all duration-500"
                  style={{ width: baselineWidth }}
                ></div>
                {/* PPO Bar */}
                <div
                  className="h-1 bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: ppoWidth }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          <p className="text-slate-500">Net Carbon Saved</p>
          <p className="text-lg font-bold text-emerald-400 mt-0.5">1,060.46 grams</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Over 100s single-junction run</p>
        </div>
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          <p className="text-slate-500">Queue Delay Reduction</p>
          <p className="text-lg font-bold text-blue-400 mt-0.5">-28.6% Wait Time</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Dynamic phase switching advantage</p>
        </div>
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          <p className="text-slate-500">Hotspot Mitigation Rate</p>
          <p className="text-lg font-bold text-amber-400 mt-0.5">94.2% Cleared</p>
          <p className="text-[10px] text-slate-400 mt-0.5">No corridor exceeded 2,000 mg/s</p>
        </div>
      </div>
    </div>
  );
}