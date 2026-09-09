import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * CityMap Component - Digital Twin Geospatial Canvas
 * Author: Subhransu Sekhar Swain (Day 3 Deliverable)
 * Visualizes 4-way urban corridor network, central signalized junction,
 * and dynamic carbon emission heatmap overlays.
 */

// SUMO Grid coordinate mappings to geographic offsets centered at [20.2961, 85.8245]
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
  { id: 'E_N2C', name: 'North Corridor Inbound', from: NODES.N_N, to: NODES.J_C, color: '#3b82f6', emission: 450 },
  { id: 'E_C2N', name: 'North Corridor Outbound', from: NODES.J_C, to: NODES.N_N, color: '#10b981', emission: 120 },
  { id: 'E_S2C', name: 'South Corridor Inbound', from: NODES.N_S, to: NODES.J_C, color: '#ef4444', emission: 1850 },
  { id: 'E_C2S', name: 'South Corridor Outbound', from: NODES.J_C, to: NODES.N_S, color: '#10b981', emission: 210 },
  { id: 'E_E2C', name: 'East Corridor Inbound', from: NODES.N_E, to: NODES.J_C, color: '#f59e0b', emission: 850 },
  { id: 'E_C2E', name: 'East Corridor Outbound', from: NODES.J_C, to: NODES.N_E, color: '#10b981', emission: 180 },
  { id: 'E_W2C', name: 'West Corridor Inbound', from: NODES.N_W, to: NODES.J_C, color: '#8b5cf6', emission: 620 },
  { id: 'E_C2W', name: 'West Corridor Outbound', from: NODES.J_C, to: NODES.N_W, color: '#10b981', emission: 150 },
];

export default function CityMap({ selectedCorridor, onSelectCorridor }) {
  const [corridorData] = useState(CORRIDORS);

  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-900">
      {/* HUD Header Overlay */}
      <div className="absolute top-4 left-4 z-[1000] bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-4 py-3 rounded-xl shadow-lg">
        <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          EcoTwin Live Grid Canvas
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">Monitoring 4 Radial Corridors & Central Intersection J_C</p>
      </div>

      <MapContainer
        center={[CENTER_LAT, CENTER_LNG]}
        zoom={16}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        style={{ background: '#0b1120' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Central Junction Node J_C */}
        <CircleMarker
          center={NODES.J_C}
          radius={12}
          pathOptions={{ fillColor: '#10b981', fillOpacity: 0.9, color: '#34d399', weight: 3 }}
        >
          <Popup className="custom-popup">
            <div className="text-slate-900 text-xs font-semibold p-1">
              <p className="font-bold text-emerald-700">Central Intersection (J_C)</p>
              <p>Type: 4-Way Traffic Signal</p>
              <p>RL Agent Controller: Active</p>
            </div>
          </Popup>
        </CircleMarker>

        {/* Outer Boundary Nodes */}
        {Object.entries(NODES).filter(([k]) => k !== 'J_C').map(([key, coord]) => (
          <CircleMarker
            key={key}
            center={coord}
            radius={7}
            pathOptions={{ fillColor: '#64748b', fillOpacity: 0.8, color: '#94a3b8', weight: 2 }}
          >
            <Popup>
              <span className="text-xs font-bold text-slate-800">Node: {key}</span>
            </Popup>
          </CircleMarker>
        ))}

        {/* Corridor Polylines */}
        {corridorData.map((corridor) => (
          <Polyline
            key={corridor.id}
            positions={[corridor.from, corridor.to]}
            pathOptions={{
              color: corridor.emission > 1000 ? '#ef4444' : corridor.emission > 500 ? '#f59e0b' : '#10b981',
              weight: selectedCorridor === corridor.id ? 8 : 5,
              opacity: 0.85,
              dashArray: corridor.id.includes('2C') ? '6, 6' : undefined
            }}
            eventHandlers={{
              click: () => onSelectCorridor && onSelectCorridor(corridor),
            }}
          >
            <Popup>
              <div className="text-xs text-slate-900 p-1 space-y-1">
                <p className="font-bold text-slate-800">{corridor.name}</p>
                <p>Corridor ID: <code className="bg-slate-200 px-1 py-0.5 rounded">{corridor.id}</code></p>
                <p>Micro-CO2 Rate: <strong className={corridor.emission > 1000 ? 'text-red-600' : 'text-emerald-600'}>{corridor.emission} mg/s</strong></p>
              </div>
            </Popup>
          </Polyline>
        ))}
      </MapContainer>
    </div>
  );
}