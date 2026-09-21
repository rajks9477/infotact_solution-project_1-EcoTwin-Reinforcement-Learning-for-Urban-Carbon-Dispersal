import React, { useState } from 'react';

const IncidentControl = ({ onTriggerIncident }) => {
  const [selectedType, setSelectedType] = useState('lane_closure');
  const [selectedEdge, setSelectedEdge] = useState('top0to00');
  const [activeIncident, setActiveIncident] = useState(null);

  const handleDispatch = () => {
    const incident = {
      id: `inc_${Date.now()}`,
      type: selectedType,
      edge: selectedEdge,
      timestamp: new Date().toLocaleTimeString(),
    };
    setActiveIncident(incident);
    if (onTriggerIncident) onTriggerIncident(incident);
  };

  const handleClear = () => {
    setActiveIncident(null);
    if (onTriggerIncident) onTriggerIncident(null);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg space-y-3">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
          <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
            Incident & Disruption Injector
          </h3>
        </div>
        {activeIncident && (
          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-medium">
            Active
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="text-[10px] text-zinc-400 block mb-1">Disruption Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-zinc-200 text-xs focus:outline-hidden focus:border-rose-500"
          >
            <option value="lane_closure">Lane Closure</option>
            <option value="emergency_corridor">Emergency Vehicle</option>
            <option value="construction_zone">Construction Zone</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-zinc-400 block mb-1">Target Arterial</label>
          <select
            value={selectedEdge}
            onChange={(e) => setSelectedEdge(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-zinc-200 text-xs focus:outline-hidden focus:border-rose-500"
          >
            <option value="top0to00">top0to00 (North Gateway)</option>
            <option value="11to12">11to12 (Central Arterial)</option>
            <option value="21to22">21to22 (South Corridor)</option>
            <option value="31to32">31to32 (East Exit)</option>
          </select>
        </div>
      </div>

      <div className="flex space-x-2 pt-1">
        <button
          onClick={handleDispatch}
          className="flex-1 bg-rose-600/80 hover:bg-rose-600 text-white font-medium py-1.5 px-3 rounded-lg text-xs transition cursor-pointer"
        >
          Inject Disruption
        </button>
        {activeIncident && (
          <button
            onClick={handleClear}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-1.5 px-3 rounded-lg text-xs transition cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {activeIncident && (
        <div className="p-2.5 bg-rose-950/40 border border-rose-500/30 rounded-lg text-[11px] text-rose-300/90 leading-tight">
          <strong>PPO Flush Active:</strong> Dynamic rerouting applied for {activeIncident.edge} ({activeIncident.type}). Clearance priority +40%.
        </div>
      )}
    </div>
  );
};

export default IncidentControl;