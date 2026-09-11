import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CityMap from './components/CityMap';
import MetricsPanel from './components/MetricsPanel';
import EmissionCharts from './components/EmissionCharts';

/**
 * Root Application Container
 * Author: Subhransu Sekhar Swain (Frontend Lead - Day 5 Deliverable)
 * Integrates Navbar, Leaflet Geospatial View, Metrics Panel, and Comparative Charts.
 */

export default function App() {
  const [selectedCorridor, setSelectedCorridor] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [simStep, setSimStep] = useState(1);

  const handleStepSimulation = () => {
    setSimStep((prev) => prev + 1);
    setCurrentPhase((prev) => (prev + 1) % 4);
  };

  const handleResetSimulation = () => {
    setSimStep(1);
    setCurrentPhase(0);
    setSelectedCorridor(null);
  };

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
            <p className="text-2xl font-bold text-emerald-400 mt-1">{120 + (simStep * 2)}</p>
            <p className="text-[11px] text-slate-500 mt-1">Multi-fleet: Petrol, HDV & EV</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
            <p className="text-xs text-slate-400 uppercase font-semibold">CO2 Emission Rate</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">{(3.8 + (simStep * 0.05)).toFixed(2)} g/s</p>
            <p className="text-[11px] text-amber-500/80 mt-1">HBEFA3 Micro-model active</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
            <p className="text-xs text-slate-400 uppercase font-semibold">Simulation Step</p>
            <p className="text-2xl font-bold text-blue-400 mt-1">{simStep}s</p>
            <p className="text-[11px] text-blue-400/80 mt-1">Clock Sync: 1.0s</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
            <p className="text-xs text-slate-400 uppercase font-semibold">Worst Hotspot</p>
            <p className="text-2xl font-bold text-red-400 mt-1">E_S2C (South)</p>
            <p className="text-[11px] text-red-400/80 mt-1">Queueing delay: 38s</p>
          </div>
        </div>

        {/* 2-Column Grid: Geospatial Map Canvas + Controls/Metrics Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CityMap 
              selectedCorridor={selectedCorridor?.id} 
              onSelectCorridor={(c) => setSelectedCorridor(c)} 
            />
          </div>
          <div className="lg:col-span-1">
            <MetricsPanel 
              currentPhase={currentPhase}
              onStepSimulation={handleStepSimulation}
              onResetSimulation={handleResetSimulation}
            />
          </div>
        </div>

        {/* Real-time Environmental Comparison Charts */}
        <div className="w-full">
          <EmissionCharts />
        </div>
      </main>
    </div>
  );
}