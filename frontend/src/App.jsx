import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AlertBanner from './components/AlertBanner';
import ScenarioSelector from './components/ScenarioSelector';
import SimulationControls from './components/SimulationControls';
import CityMap from './components/CityMap';
import MetricsPanel from './components/MetricsPanel';
import ReroutingStats from './components/ReroutingStats';
import EmissionCharts from './components/EmissionCharts';

/**
 * Root Application Container
 * Author: Subhransu Sekhar Swain (Frontend Lead - Day 10 Deliverable)
 * Integrates Navbar, Alert Banner, Scenario Selector, Playback Controls, Map, Metrics & Charts.
 */

export default function App() {
  const [selectedCorridor, setSelectedCorridor] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [simStep, setSimStep] = useState(1);
  const [isAiEnabled, setIsAiEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [activeScenario, setActiveScenario] = useState('normal_flow');

  const handleStepSimulation = () => {
    setSimStep((prev) => prev + 1);
    setCurrentPhase((prev) => (prev + 1) % 4);
  };

  const handleResetSimulation = () => {
    setSimStep(1);
    setCurrentPhase(0);
    setSelectedCorridor(null);
    setIsPlaying(false);
  };

  const handleToggleAi = () => {
    setIsAiEnabled((prev) => !prev);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Dynamic values adjusted by scenario profile
  const scenarioMultiplier = activeScenario === 'morning_rush_surge' ? 1.8 : activeScenario === 'toxic_smog_crisis' ? 2.4 : 1.0;
  const vehicleCount = Math.round((120 + (simStep * 2)) * scenarioMultiplier);
  const co2Rate = (
    (isAiEnabled ? (3.35 + (simStep * 0.03)) : (5.2 + (simStep * 0.08))) * scenarioMultiplier
  ).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Dashboard Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Dynamic Air Quality & Hotspot Alert Banner */}
        <AlertBanner 
          isAiEnabled={isAiEnabled}
          onToggleAi={handleToggleAi}
          hotspotCorridor="E_S2C (South Inbound)"
          emissionRate={isAiEnabled ? `${(1432 * scenarioMultiplier).toFixed(0)} mg/s` : `${(4950 * scenarioMultiplier).toFixed(0)} mg/s`}
        />

        {/* Metric Highlights Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
            <p className="text-xs text-slate-400 uppercase font-semibold">Active Vehicles</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{vehicleCount}</p>
            <p className="text-[11px] text-slate-500 mt-1">
              {activeScenario === 'toxic_smog_crisis' ? 'Heavy Diesel Fleet Active' : 'Multi-fleet: Petrol, HDV & EV'}
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
            <p className="text-xs text-slate-400 uppercase font-semibold">CO2 Emission Rate</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">{co2Rate} g/s</p>
            <p className="text-[11px] text-amber-500/80 mt-1">
              {isAiEnabled ? "PPO Optimized (-21.4%)" : "Uncontrolled Baseline"}
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
            <p className="text-xs text-slate-400 uppercase font-semibold">Vehicles Diverted</p>
            <p className="text-2xl font-bold text-blue-400 mt-1">{activeScenario === 'toxic_smog_crisis' ? 8 : 4}</p>
            <p className="text-[11px] text-blue-400/80 mt-1">Bypass Corridors Active</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
            <p className="text-xs text-slate-400 uppercase font-semibold">Active Controller</p>
            <p className={`text-2xl font-bold mt-1 ${isAiEnabled ? 'text-emerald-400' : 'text-red-400'}`}>
              {isAiEnabled ? 'PPO-EcoDisperse' : 'Fixed-Time'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              {isAiEnabled ? "Dynamic Dispersal" : "Rigid 30s Timer"}
            </p>
          </div>
        </div>

        {/* Scenario Stress Profile Selector (Day 10) */}
        <ScenarioSelector 
          activeScenario={activeScenario}
          onSelectScenario={(sc) => setActiveScenario(sc)}
        />

        {/* Playback Controls & Speed Multiplier HUD */}
        <SimulationControls 
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onStepForward={handleStepSimulation}
          onReset={handleResetSimulation}
          currentStep={simStep}
          speed={speed}
          onChangeSpeed={(s) => setSpeed(s)}
        />

        {/* 2-Column Grid: Geospatial Map Canvas + Controls/Metrics & Rerouting Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CityMap 
              selectedCorridor={selectedCorridor?.id} 
              onSelectCorridor={(c) => setSelectedCorridor(c)} 
              simStep={simStep}
            />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <ReroutingStats totalDiverted={activeScenario === 'toxic_smog_crisis' ? 8 : 4} />
            <MetricsPanel 
              currentPhase={currentPhase}
              onStepSimulation={handleStepSimulation}
              onReset={handleResetSimulation}
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