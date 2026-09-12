import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AlertBanner from './components/AlertBanner';
import CityMap from './components/CityMap';
import MetricsPanel from './components/MetricsPanel';
import EmissionCharts from './components/EmissionCharts';

/**
 * Root Application Container
 * Author: Subhransu Sekhar Swain (Frontend Lead - Day 6 Deliverable)
 * Integrates Navbar, Alert Banner, Leaflet Map, Metrics Panel, and Comparative Charts.
 */

export default function App() {
  const [selectedCorridor, setSelectedCorridor] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [simStep, setSimStep] = useState(1);
  const [isAiEnabled, setIsAiEnabled] = useState(true);

  const handleStepSimulation = () => {
    setSimStep((prev) => prev + 1);
    setCurrentPhase((prev) => (prev + 1) % 4);
  };

  const handleResetSimulation = () => {
    setSimStep(1);
    setCurrentPhase(0);
    setSelectedCorridor(null);
  };

  const handleToggleAi = () => {
    setIsAiEnabled((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Dashboard Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Dynamic Air Quality / Hotspot Alert Banner */}
        <AlertBanner 
          isAiEnabled={isAiEnabled}
          onToggleAi={handleToggleAi}
          hotspotCorridor="E_S2C (South Inbound)"
          emissionRate={isAiEnabled ? "1,850 mg/s" : "4,950 mg/s"}
        />

        {/* Metric Highlights Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
            <p className="text-xs text-slate-400 uppercase font-semibold">Active Vehicles</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{120 + (simStep * 2)}</p>
            <p className="text-[11px] text-slate-500 mt-1">Multi-fleet: Petrol, HDV & EV</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
            <p className="text-xs text-slate-400 uppercase font-semibold">CO2 Emission Rate</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">
              {isAiEnabled ? (3.8 + (simStep * 0.05)).toFixed(2) : (5.2 + (simStep * 0.08)).toFixed(2)} g/s
            </p>
            <p className="text-[11px] text-amber-500/80 mt-1">
              {isAiEnabled ? "PPO Optimized (-21.4%)" : "Uncontrolled Baseline"}
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
            <p className="text-xs text-slate-400 uppercase font-semibold">Simulation Step</p>
            <p className="text-2xl font-bold text-blue-400 mt-1">{simStep}s</p>
            <p className="text-[11px] text-blue-400/80 mt-1">Clock Sync: 1.0s</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
            <p className="text-xs text-slate-400 uppercase font-semibold">Active Controller</p>
            <p className={`text-2xl font-bold mt-1 ${isAiEnabled ? 'text-emerald-400' : 'text-red-400'}`}>
              {isAiEnabled ? 'PPO-Eco' : 'Fixed-Time'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              {isAiEnabled ? "Dynamic Dispersal" : "Rigid 30s Timer"}
            </p>
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