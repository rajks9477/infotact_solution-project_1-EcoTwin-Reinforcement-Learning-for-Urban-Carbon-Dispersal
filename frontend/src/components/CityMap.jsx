import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import VehicleLegend from './VehicleLegend';

const CENTER_LAT = 20.2961;
const CENTER_LNG = 85.8245;
const SCALE = 0.0008;

const NODES = {
  J_C: [CENTER_LAT, CENTER_LNG],
  N_N: [CENTER_LAT + (500 * SCALE * 0.001), CENTER_LNG],
  N_S: [CENTER_LAT - (500 * SCALE * 0.001), CENTER_LNG],
  N_E: [CENTER_LAT, CENTER_LNG + (500 * SCALE * 0.001)],
  N_W: [CENTER_LAT, CENTER_LNG - (500 * SCALE * 0.001)],
};

const CORRIDORS = [
  { id: 'E_N2C', name: 'North Corridor Inbound', from: NODES.N_N, to: NODES.J_C, color: '#3b82f6', baseEmission: 450, capacity: 80 },
  { id: 'E_C2N', name: 'North Corridor Outbound', from: NODES.J_C, to: NODES.N_N, color: '#10b981', baseEmission: 120, capacity: 95 },
  { id: 'E_S2C', name: 'South Corridor Inbound', from: NODES.N_S, to: NODES.J_C, color: '#ef4444', baseEmission: 1850, capacity: 45 },
  { id: 'E_C2S', name: 'South Corridor Outbound', from: NODES.J_C, to: NODES.N_S, color: '#10b981', baseEmission: 210, capacity: 90 },
  { id: 'E_E2C', name: 'East Corridor Inbound', from: NODES.N_E, to: NODES.J_C, color: '#f59e0b', baseEmission: 850, capacity: 65 },
  { id: 'E_C2E', name: 'East Corridor Outbound', from: NODES.J_C, to: NODES.N_E, color: '#10b981', baseEmission: 180, capacity: 92 },
  { id: 'E_W2C', name: 'West Corridor Inbound', from: NODES.N_W, to: NODES.J_C, color: '#8b5cf6', baseEmission: 620, capacity: 70 },
  { id: 'E_C2W', name: 'West Corridor Outbound', from: NODES.J_C, to: NODES.N_W, color: '#10b981', baseEmission: 150, capacity: 95 },
];

// Helper to pan/zoom map programmatically
function MapController({ targetCenter, targetZoom }) {
  const map = useMap();
  useEffect(() => {
    if (targetCenter) {
      map.flyTo(targetCenter, targetZoom || 16, { duration: 1.2 });
    }
  }, [targetCenter, targetZoom, map]);
  return null;
}

export default function CityMap({
  selectedCorridor,
  onSelectCorridor,
  simStep = 1,
  vehicles = [],
  activeEmergency = null,
  activeWeather = 'clear',
  showPlumeOverlay = true,
}) {
  const [mapCenter, setMapCenter] = useState([CENTER_LAT, CENTER_LNG]);
  const [mapZoom, setMapZoom] = useState(16);
  const [showPlume, setShowPlume] = useState(showPlumeOverlay);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Compute Traffic Signal Phase (Simulated PPO Phase Cycle)
  const cycleTime = 40;
  const cycleProgress = (simStep % cycleTime);
  let nsSignal = 'GREEN';
  let ewSignal = 'RED';
  let signalTimer = 20 - (cycleProgress % 20);

  if (activeEmergency) {
    nsSignal = 'GREEN';
    ewSignal = 'RED';
    signalTimer = 45;
  } else if (cycleProgress < 17) {
    nsSignal = 'GREEN';
    ewSignal = 'RED';
  } else if (cycleProgress < 20) {
    nsSignal = 'YELLOW';
    ewSignal = 'RED';
  } else if (cycleProgress < 37) {
    nsSignal = 'RED';
    ewSignal = 'GREEN';
  } else {
    nsSignal = 'RED';
    ewSignal = 'YELLOW';
  }

  // Generate or map live dynamic vehicles
  const displayVehicles = vehicles && vehicles.length > 0
    ? vehicles.map((v, i) => {
        const type = v.vehicle_type || (i % 4 === 0 ? 'Bus' : i % 3 === 0 ? 'Truck' : i % 5 === 0 ? 'EV' : 'Car');
        return {
          id: v.vehicle_id || v.id || `veh_${i + 1}`,
          type: type,
          lat: v.lat,
          lng: v.lng,
          emission: v.instant_co2_mg || (type === 'EV' ? 0 : type === 'Truck' ? 880 : type === 'Bus' ? 1150 : 390),
          speed: v.speed_mps || (type === 'EV' ? 11.2 : 8.5),
          corridor: v.corridor_name || 'Arterial Grid',
          glosaSpeed: type === 'EV' ? '45 km/h' : nsSignal === 'GREEN' ? '42 km/h' : '28 km/h (Glide)'
        };
      })
    : [
        { id: 'veh_01', type: 'Bus', lat: NODES.N_S[0] + ((NODES.J_C[0] - NODES.N_S[0]) * (((simStep * 0.08) + 0.1) % 1)), lng: CENTER_LNG, emission: 1120, speed: 7.2, corridor: 'South Corridor Inbound', glosaSpeed: '38 km/h' },
        { id: 'veh_02', type: 'Car', lat: NODES.N_S[0] + ((NODES.J_C[0] - NODES.N_S[0]) * (((simStep * 0.08) + 0.5) % 1)), lng: CENTER_LNG, emission: 410, speed: 9.0, corridor: 'South Corridor Inbound', glosaSpeed: '45 km/h' },
        { id: 'veh_03', type: 'Truck', lat: NODES.N_N[0] + ((NODES.J_C[0] - NODES.N_N[0]) * (((simStep * 0.07) + 0.2) % 1)), lng: CENTER_LNG, emission: 850, speed: 6.5, corridor: 'North Corridor Inbound', glosaSpeed: '32 km/h' },
        { id: 'veh_04', type: 'EV', lat: CENTER_LAT, lng: NODES.N_E[1] + ((NODES.J_C[1] - NODES.N_E[1]) * (((simStep * 0.09) + 0.3) % 1)), emission: 0, speed: 10.1, corridor: 'East Corridor Inbound', glosaSpeed: '50 km/h' },
        { id: 'veh_05', type: 'Bus', lat: CENTER_LAT, lng: NODES.N_W[1] + ((NODES.J_C[1] - NODES.N_W[1]) * (((simStep * 0.06) + 0.4) % 1)), emission: 980, speed: 5.8, corridor: 'West Corridor Inbound', glosaSpeed: '30 km/h' },
        { id: 'veh_06', type: 'Car', lat: CENTER_LAT, lng: NODES.N_W[1] + ((NODES.J_C[1] - NODES.N_W[1]) * (((simStep * 0.08) + 0.7) % 1)), emission: 390, speed: 9.4, corridor: 'West Corridor Inbound', glosaSpeed: '42 km/h' },
      ];

  const getVehicleColor = (type, emission) => {
    if (type === 'EV') return '#06b6d4'; // Cyan for EV
    if (emission > 900) return '#ef4444'; // Red for heavy bus
    if (emission > 600) return '#f97316'; // Orange for diesel truck
    if (emission > 300) return '#facc15'; // Amber
    return '#10b981'; // Emerald for clean car
  };

  return (
    <div className="relative w-full h-[620px] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-950 flex flex-col">
      {/* Top Left Status & Controls HUD */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2 pointer-events-none">
        <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/80 px-4 py-3 rounded-xl shadow-2xl pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                EcoTwin Live Digital Twin
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                  PPO Active
                </span>
              </h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Microscopic TraCI Engine • 1 Hz Bidirectional Feedback
              </p>
            </div>
          </div>
        </div>

        {/* Traffic Light State HUD */}
        <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/80 p-2.5 rounded-xl shadow-lg pointer-events-auto flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-400 uppercase font-semibold">N-S Phase:</span>
            <span className={`px-2 py-0.5 rounded font-bold font-mono text-[11px] ${
              nsSignal === 'GREEN' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse' :
              nsSignal === 'YELLOW' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
              'bg-red-500/20 text-red-400 border border-red-500/40'
            }`}>
              ● {nsSignal}
            </span>
          </div>

          <div className="h-4 w-px bg-zinc-700"></div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-400 uppercase font-semibold">E-W Phase:</span>
            <span className={`px-2 py-0.5 rounded font-bold font-mono text-[11px] ${
              ewSignal === 'GREEN' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse' :
              ewSignal === 'YELLOW' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
              'bg-red-500/20 text-red-400 border border-red-500/40'
            }`}>
              ● {ewSignal}
            </span>
          </div>

          <div className="h-4 w-px bg-zinc-700"></div>

          <div className="font-mono text-xs text-blue-400 font-bold">
            ⏱️ {signalTimer}s
          </div>
        </div>
      </div>

      {/* Top Right Camera Presets & Layer Toggles */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col items-end gap-2">
        <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/80 p-1.5 rounded-xl shadow-lg flex items-center gap-1.5 text-xs">
          <button
            onClick={() => { setMapCenter([CENTER_LAT, CENTER_LNG]); setMapZoom(16); }}
            className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition text-[11px] font-medium"
          >
            🎯 Center
          </button>
          <button
            onClick={() => { setMapCenter(NODES.N_N); setMapZoom(17); }}
            className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition text-[11px] font-medium"
          >
            ⬆️ North
          </button>
          <button
            onClick={() => { setMapCenter(NODES.N_S); setMapZoom(17); }}
            className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition text-[11px] font-medium"
          >
            ⬇️ South
          </button>
          <button
            onClick={() => setShowPlume(!showPlume)}
            className={`px-2.5 py-1 rounded-lg transition text-[11px] font-medium flex items-center gap-1.5 ${
              showPlume
                ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
                : 'bg-zinc-800 text-zinc-400'
            }`}
          >
            💨 Plume {showPlume ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Emergency Blue-Light Banner */}
        {activeEmergency && (
          <div className="bg-rose-950/90 backdrop-blur-md border border-rose-500/60 p-2.5 rounded-xl shadow-2xl text-xs text-rose-200 flex items-center gap-2 animate-bounce">
            <span className="text-base">🚨</span>
            <div>
              <div className="font-bold text-rose-300 uppercase text-[10px]">Blue-Light EVP Active</div>
              <div className="text-[10px] text-rose-200/90">{activeEmergency.type} Corridor Cleared</div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Left Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] pointer-events-auto">
        <VehicleLegend />
      </div>

      {/* Leaflet Map Canvas */}
      <MapContainer
        center={[CENTER_LAT, CENTER_LNG]}
        zoom={16}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        style={{ background: '#030712' }}
      >
        <MapController targetCenter={mapCenter} targetZoom={mapZoom} />

        {/* Clean, Watermark-free, Free Dark Gray Canvas Basemap */}
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>, HERE, Garmin, &copy; OpenStreetMap contributors'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        />

        {/* 2D Atmospheric Gaussian Plume Dispersion Rings */}
        {showPlume && (
          <>
            <Circle
              center={NODES.J_C}
              radius={70}
              pathOptions={{
                fillColor: '#ef4444',
                fillOpacity: 0.18,
                color: '#ef4444',
                weight: 1,
                dashArray: '4, 4'
              }}
            />
            <Circle
              center={NODES.J_C}
              radius={140}
              pathOptions={{
                fillColor: '#f59e0b',
                fillOpacity: 0.12,
                color: '#f59e0b',
                weight: 1,
                dashArray: '6, 6'
              }}
            />
            <Circle
              center={NODES.J_C}
              radius={240}
              pathOptions={{
                fillColor: '#10b981',
                fillOpacity: 0.06,
                color: '#10b981',
                weight: 1
              }}
            />
          </>
        )}

        {/* Central Junction J_C */}
        <CircleMarker
          center={NODES.J_C}
          radius={14}
          pathOptions={{
            fillColor: nsSignal === 'GREEN' ? '#10b981' : '#3b82f6',
            fillOpacity: 0.95,
            color: '#ffffff',
            weight: 2.5
          }}
        >
          <Popup>
            <div className="text-zinc-100 text-xs font-semibold p-1 space-y-1">
              <p className="font-bold text-emerald-400 text-sm">Central Intersection (J_C)</p>
              <p className="text-zinc-300">Type: 4-Way Connected Arterial Hub</p>
              <p className="text-zinc-300">RL Policy: <span className="text-emerald-400">PPO-EcoDisperse INT8</span></p>
              <p className="text-zinc-300">North-South Phase: <strong className={nsSignal === 'GREEN' ? 'text-emerald-400' : 'text-red-400'}>{nsSignal}</strong></p>
              <p className="text-zinc-300">East-West Phase: <strong className={ewSignal === 'GREEN' ? 'text-emerald-400' : 'text-red-400'}>{ewSignal}</strong></p>
            </div>
          </Popup>
        </CircleMarker>

        {/* Traffic Signal Heads at Approaches */}
        <CircleMarker
          center={[CENTER_LAT + 0.0006, CENTER_LNG]}
          radius={5}
          pathOptions={{ fillColor: nsSignal === 'GREEN' ? '#10b981' : nsSignal === 'YELLOW' ? '#facc15' : '#ef4444', fillOpacity: 1, color: '#ffffff', weight: 1.5 }}
        />
        <CircleMarker
          center={[CENTER_LAT - 0.0006, CENTER_LNG]}
          radius={5}
          pathOptions={{ fillColor: nsSignal === 'GREEN' ? '#10b981' : nsSignal === 'YELLOW' ? '#facc15' : '#ef4444', fillOpacity: 1, color: '#ffffff', weight: 1.5 }}
        />
        <CircleMarker
          center={[CENTER_LAT, CENTER_LNG + 0.0006]}
          radius={5}
          pathOptions={{ fillColor: ewSignal === 'GREEN' ? '#10b981' : ewSignal === 'YELLOW' ? '#facc15' : '#ef4444', fillOpacity: 1, color: '#ffffff', weight: 1.5 }}
        />
        <CircleMarker
          center={[CENTER_LAT, CENTER_LNG - 0.0006]}
          radius={5}
          pathOptions={{ fillColor: ewSignal === 'GREEN' ? '#10b981' : ewSignal === 'YELLOW' ? '#facc15' : '#ef4444', fillOpacity: 1, color: '#ffffff', weight: 1.5 }}
        />

        {/* Arterial Corridors */}
        {CORRIDORS.map((corridor) => {
          const isEmergencyCorridor = activeEmergency && corridor.id.includes('S2C');
          return (
            <Polyline
              key={corridor.id}
              positions={[corridor.from, corridor.to]}
              pathOptions={{
                color: isEmergencyCorridor ? '#38bdf8' : corridor.baseEmission > 1000 ? '#ef4444' : corridor.baseEmission > 500 ? '#f59e0b' : '#10b981',
                weight: selectedCorridor === corridor.id ? 8 : isEmergencyCorridor ? 7 : 5,
                opacity: isEmergencyCorridor ? 1.0 : 0.85,
                dashArray: isEmergencyCorridor ? '8, 8' : corridor.id.includes('2C') ? '6, 6' : undefined
              }}
              eventHandlers={{
                click: () => onSelectCorridor && onSelectCorridor(corridor),
              }}
            >
              <Popup>
                <div className="text-zinc-100 text-xs p-1 space-y-1">
                  <p className="font-bold text-blue-400">{corridor.name}</p>
                  <p>Baseline Emission: <strong>{corridor.baseEmission} mg/s</strong></p>
                  <p>Corridor Capacity: <strong>{corridor.capacity}%</strong></p>
                  <p>Status: <span className="text-emerald-400">Green Wave Coordinated</span></p>
                </div>
              </Popup>
            </Polyline>
          );
        })}

        {/* Moving Vehicle Dots with Telemetry Tooltips */}
        {displayVehicles.map((v) => {
          const color = getVehicleColor(v.type, v.emission);
          return (
            <CircleMarker
              key={v.id}
              center={[v.lat, v.lng]}
              radius={v.type === 'Bus' || v.type === 'Truck' ? 7.5 : 5.5}
              pathOptions={{
                fillColor: color,
                fillOpacity: 0.95,
                color: '#ffffff',
                weight: 1.5
              }}
              eventHandlers={{
                click: () => setSelectedVehicle(v)
              }}
            >
              <Popup>
                <div className="text-xs text-zinc-100 p-1 space-y-1.5 min-w-[170px]">
                  <div className="flex justify-between items-center border-b border-zinc-700 pb-1">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      {v.type === 'Bus' ? '🚌' : v.type === 'Truck' ? '🚚' : v.type === 'EV' ? '⚡' : '🚗'} {v.id}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {v.type}
                    </span>
                  </div>
                  <div className="space-y-0.5 text-[11px] text-zinc-300">
                    <p>Speed: <strong className="text-blue-400">{v.speed} m/s</strong> ({(v.speed * 3.6).toFixed(1)} km/h)</p>
                    <p>CO₂ Tailpipe: <strong className={v.emission > 600 ? 'text-red-400' : 'text-emerald-400'}>{v.emission} mg/s</strong></p>
                    <p>Corridor: <span className="text-zinc-400">{v.corridor}</span></p>
                    <p>V2X GLOSA Advisory: <strong className="text-violet-400">{v.glosaSpeed}</strong></p>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}