import React from "react";

export default function Navbar() {
  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/30">
          ??
        </div>
        <div>
          <h1 className="font-bold text-lg text-white tracking-wide flex items-center gap-2">
            EcoTwin <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">AI Dispersal</span>
          </h1>
          <p className="text-xs text-slate-400">Urban Carbon Dispersal & Traffic Optimization</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-md border border-slate-700">
          Assignment: <span className="font-mono text-emerald-400">ITS/DSML/1040</span> (Group 8)
        </div>
        <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-medium text-slate-300">Simulation Ready</span>
        </div>
      </div>
    </header>
  );
}
