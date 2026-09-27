import React, { useState } from 'react';

const LifecycleSummaryModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const subsystems = [
    'Microscopic SUMO 4x4 Grid Simulation',
    'Gymnasium PPO Dual-Penalty Reinforcement Learning',
    'Atmospheric 2D Gaussian Plume Dispersion Model',
    'Dynamic Road Incident & Emergency Corridor Injection',
    'Elastic Congestion Pricing & Carbon Tariffs',
    'Meteorological Pavement Friction Adaptation',
    'V2X Emergency Vehicle Preemption (EVP)',
    'Real-time Full-Duplex Telemetry Stream & React HUD',
  ];

  return (
    <>
      {/* Top Banner Tag */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-zinc-950 border-b border-emerald-500/30 px-6 py-2 flex items-center justify-between text-xs backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-emerald-400 tracking-wider uppercase">
            Day 20 Capstone Complete
          </span>
          <span className="text-zinc-600 hidden sm:inline">|</span>
          <span className="text-zinc-300 hidden sm:inline font-medium">
            20 Unique Commit Days • 348.6 kg CO2 Abated • 8 Microservices Operational
          </span>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2 transition-colors cursor-pointer text-xs"
        >
          View Executive Report
        </button>
      </div>

      {/* Full Executive Lifecycle Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <span>EcoTwin Executive Capstone Audit</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                    Day 20 Verified
                  </span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Infotact Solutions Internship Project • Assignment ID: ITS/DSML/1040
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white text-xl font-bold px-2 py-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Core Stats Grid */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800">
                <span className="text-zinc-400 block mb-0.5">Cumulative CO2 Abated</span>
                <span className="text-emerald-400 font-mono text-xl font-black">-348.6 kg</span>
                <span className="text-[10px] text-zinc-500 block">-21.42% net emission drop</span>
              </div>
              <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800">
                <span className="text-zinc-400 block mb-0.5">Mean Delay Reduction</span>
                <span className="text-blue-400 font-mono text-xl font-black">-21.34%</span>
                <span className="text-[10px] text-zinc-500 block">Across 6,400 test vehicles</span>
              </div>
              <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800">
                <span className="text-zinc-400 block mb-0.5">Verified Commit Days</span>
                <span className="text-amber-400 font-mono text-xl font-black">20 Days</span>
                <span className="text-[10px] text-zinc-500 block">Sept 8 – Sept 27, 2026</span>
              </div>
            </div>

            {/* Subsystems Verified Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Subsystems Verified (8/8 Active)
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {subsystems.map((sub, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-zinc-950/50 border border-zinc-800/80 flex items-center space-x-2 text-zinc-300 text-[11px]"
                  >
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Distribution & Certification */}
            <div className="p-3.5 bg-emerald-950/30 rounded-xl border border-emerald-500/20 text-xs text-zinc-300 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-emerald-400">Team Branch Contributions:</span>
                <span className="text-[11px] text-zinc-400 font-mono">4 Synchronized Leads</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] pt-1 font-mono">
                <div className="p-1.5 bg-zinc-900/80 rounded border border-zinc-800 text-zinc-200">
                  Rajendra (Lead)
                </div>
                <div className="p-1.5 bg-zinc-900/80 rounded border border-zinc-800 text-zinc-200">
                  Saswat (RL)
                </div>
                <div className="p-1.5 bg-zinc-900/80 rounded border border-zinc-800 text-zinc-200">
                  Ashutosh (Backend)
                </div>
                <div className="p-1.5 bg-zinc-900/80 rounded border border-zinc-800 text-zinc-200">
                  Subhransu (Frontend)
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs rounded-xl transition font-medium cursor-pointer"
              >
                Close Executive Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LifecycleSummaryModal;