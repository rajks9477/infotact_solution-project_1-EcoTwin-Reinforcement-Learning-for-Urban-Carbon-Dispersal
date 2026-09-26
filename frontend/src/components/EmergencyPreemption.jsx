import React, { useState } from 'react';

const EmergencyPreemption = ({ onDispatch }) => {
  const [activeDispatch, setActiveDispatch] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState('ambulance');

  const emergencyOptions = [
    { id: 'ambulance', label: 'Ambulance (Code 3)', icon: '🚑', color: 'from-rose-500 to-red-600', priority: 'Tier-1' },
    { id: 'fire_truck', label: 'Fire Engine', icon: '🚒', color: 'from-orange-500 to-amber-600', priority: 'Tier-1' },
    { id: 'police_unit', label: 'Police Interceptor', icon: '🚓', color: 'from-blue-600 to-indigo-700', priority: 'Tier-2' },
  ];

  const handleDispatch = () => {
    const selected = emergencyOptions.find((o) => o.id === selectedVehicle);
    const dispatchData = {
      id: `evp_${Date.now()}`,
      type: selected.label,
      icon: selected.icon,
      priority: selected.priority,
      corridor: 'junc_00 → junc_01 → junc_02 → junc_03',
      eta: '62s',
      status: 'BLUE_LIGHT_ACTIVE',
    };
    setActiveDispatch(dispatchData);
    if (onDispatch) onDispatch(dispatchData);
  };

  const handleClear = () => {
    setActiveDispatch(null);
    if (onDispatch) onDispatch(null);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg space-y-3">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
          <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
            Emergency Preemption (EVP)
          </h3>
        </div>
        {activeDispatch ? (
          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/40 font-bold uppercase animate-pulse">
            Corridor Active
          </span>
        ) : (
          <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-medium">
            Standby
          </span>
        )}
      </div>

      <div className="space-y-2 text-xs">
        <div>
          <label className="text-[10px] text-zinc-400 block mb-1">Select Emergency Unit</label>
          <div className="grid grid-cols-3 gap-1.5">
            {emergencyOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedVehicle(opt.id)}
                className={`p-2 rounded-lg border text-center transition cursor-pointer flex flex-col items-center justify-center ${
                  selectedVehicle === opt.id
                    ? 'bg-blue-950/60 border-blue-500 text-white shadow-sm'
                    : 'bg-zinc-950/40 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                <span className="text-base mb-0.5">{opt.icon}</span>
                <span className="text-[10px] font-medium leading-tight">{opt.id.replace('_', ' ')}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex space-x-2 pt-1">
          <button
            onClick={handleDispatch}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-1.5 px-3 rounded-lg text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/30"
          >
            <span>Trigger Blue-Light Corridor</span>
          </button>
          {activeDispatch && (
            <button
              onClick={handleClear}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-1.5 px-3 rounded-lg text-xs transition cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {activeDispatch && (
          <div className="p-2.5 bg-blue-950/40 border border-blue-500/30 rounded-lg text-[11px] text-blue-200 space-y-1">
            <div className="flex justify-between items-center font-semibold text-blue-300">
              <span>{activeDispatch.icon} {activeDispatch.type}</span>
              <span className="font-mono text-emerald-400">ETA {activeDispatch.eta}</span>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">
              Green Corridor: {activeDispatch.corridor}
            </div>
            <div className="text-[10px] text-blue-400/90">
              Cross-streets held at All-Red. PPO post-clearance recovery queued.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyPreemption;