import React, { useState } from 'react';

export default function CorridorCoordinationPanel() {
  const [corridorData] = useState({
    systemMode: 'HIERARCHICAL_MARL_COORDINATED',
    meanBandwidth: 33.75,
    stopsAvoidedPct: 28.5,
    carbonAbatementKgH: 41.12,
    corridors: [
      { id: 'COR-NS-01', name: 'North-South Arterial Expressway', junctions: 'junc_00 ↔ junc_02', cycleSec: 90, bandwidthPct: 36.5, speedKmh: '45.0 km/h', status: 'SYNCHRONIZED' },
      { id: 'COR-EW-02', name: 'East-West Transit Boulevard', junctions: 'junc_01 ↔ junc_03', cycleSec: 90, bandwidthPct: 31.0, speedKmh: '40.0 km/h', status: 'SYNCHRONIZED' }
    ]
  });

  return (
    <div style={{ background: 'rgba(15, 23, 42, 0.75)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(168, 85, 247, 0.25)', marginTop: '20px', color: '#f8fafc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#c084fc' }}>🌐 Hierarchical MARL Regional Corridor Progression</h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>Day 26: High-Level Arterial Green-Wave Bandwidth & Regional Dispersal</p>
        </div>
        <span style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid #a855f7', borderRadius: '9999px', padding: '4px 12px', fontSize: '12px', fontWeight: 600 }}>● H-MARL Active</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px' }}><div style={{ fontSize: '12px', color: '#94a3b8' }}>Bandwidth</div><div style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8' }}>{corridorData.meanBandwidth}%</div></div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px' }}><div style={{ fontSize: '12px', color: '#94a3b8' }}>Stops Cut</div><div style={{ fontSize: '20px', fontWeight: 'bold', color: '#4ade80' }}>-{corridorData.stopsAvoidedPct}%</div></div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px' }}><div style={{ fontSize: '12px', color: '#94a3b8' }}>CO2 Saved</div><div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fbbf24' }}>-{corridorData.carbonAbatementKgH} kg/h</div></div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px' }}><div style={{ fontSize: '12px', color: '#94a3b8' }}>Tier</div><div style={{ fontSize: '18px', fontWeight: 'bold', color: '#c084fc' }}>Meta + Micro</div></div>
      </div>
    </div>
  );
}