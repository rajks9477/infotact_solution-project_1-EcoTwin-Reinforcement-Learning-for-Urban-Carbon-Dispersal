import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CityMap from './components/CityMap';

/**
 * Root Application Container
 * Author: Subhransu Sekhar Swain (Day 3 Deliverable)
 * Orchestrates Navbar, Leaflet Geospatial View, and Telemetry Summary HUD.
 */

export default function App() {
  const [selectedCorridor, setSelectedCorridor] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Dashboard Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Metric Highlights Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
            <p className="text-xs text-slate-400 uppercase font-semibold">Active Vehicles</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">320</p>
            <p className="text-[11px] text-slate-500 mt-1">Multi-fleet: Petrol, HDV & EV</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
            <p className="text-xs text-slate-400 uppercase font-semibold">CO2 Emission Rate</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">4.28 g/s</p>
            <p className="text-[11px] text-amber-500/80 mt-1">HBEFA3 Micro-model active</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
            <p className="text-xs text-slate-400 uppercase font-semibold">RL Agent Policy</p>
            <p className="text-2xl font-bold text-blue-400 mt-1">PPO-EcoDisperse</p>
            <p className="text-[11px] text-blue-400/80 mt-1">Cycle duration: 45s</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
            <p className="text-xs text-slate-400 uppercase font-semibold">Worst Hotspot</p>
            <p className="text-2xl font-bold text-red-400 mt-1">E_S2C (South)</p>
            <p className="text-[11px] text-red-400/80 mt-1">Queueing delay: 38s</p>
          </div>
        </div>

        {/* Geospatial Map Canvas */}
        <div className="w-full">
          <CityMap 
            selectedCorridor={selectedCorridor?.id} 
            onSelectCorridor={(c) => setSelectedCorridor(c)} 
          />
        </div>
      </main>
    </div>
  );
}