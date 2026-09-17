import React from 'react';

/**
 * ScenarioSelector Component - Interactive Traffic Profile & AQI Gauge
 * Author: Subhransu Sekhar Swain (Frontend Lead - Day 10 Deliverable)
 */
export default function ScenarioSelector({ activeScenario = 'normal_flow', onSelectScenario }) {
  const SCENARIOS = [
    {
      id: 'normal_flow',
      label: 'Standard Flow',
      aqi: 'Grade A (Good)',
      badgeColor: 'bg-emerald-950 border-emerald-800 text-emerald-300',
      tag: '1.0x Flow'
    },
    {
      id: 'morning_rush_surge',
      label: 'Rush Hour Surge',
      aqi: 'Grade C (Unhealthy)',
      badgeColor: 'bg-amber-950 border-amber-800 text-amber-300',
      tag: '+80% Surge'
    },
    {
      id: 'toxic_smog_crisis',
      label: 'Smog Emergency',
      aqi: 'Grade E (Hazardous)',
      badgeColor: 'bg-red-950 border-red-800 text-red-300',
      tag: 'Heavy Diesel'
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Simulation Profile:
        </span>
        <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 p-1 rounded-xl">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => onSelectScenario && onSelectScenario(sc.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeScenario === sc.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>{sc.label}</span>
              <span className="text-[10px] opacity-75 font-mono">({sc.tag})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Live AQI Indicator Badge */}
      {(() => {
        const current = SCENARIOS.find((s) => s.id === activeScenario) || SCENARIOS[0];
        return (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Environmental Status:</span>
            <span className={`text-xs px-3 py-1 rounded-full border font-bold ${current.badgeColor}`}>
              {current.aqi}
            </span>
          </div>
        );
      })()}
    </div>
  );
}