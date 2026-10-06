import React, { useState } from 'react';

export default function SpillbackGuardPanel() {
  const [guardData] = useState({
    engineState: 'ACTIVE_DEFENSE',
    criticalLinks: 2,
    meanOccupancy: 67.5,
    co2SurgeAvoidedKg: 24.65,
    links: [
      { id: 'LINK_00_02', upstream: 'junc_00', downstream: 'junc_02', queue: 27, capacity: 30, occPct: 90, metering: '45% Throttled', status: 'CRITICAL_RISK' },
      { id: 'LINK_01_03', upstream: 'junc_01', downstream: 'junc_03', queue: 14, capacity: 30, occPct: 46.7, metering: '0% (Nominal)', status: 'FLOW_NOMINAL' }
    ]
  });

  return (
    <div style={{ background: 'rgba(15, 23, 42, 0.75)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(239, 68, 68, 0.25)', marginTop: '20px', color: '#f8fafc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#f87171' }}>🛡️ Cross-Corridor Spillback Prevention & Gridlock Guard</h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>Day 27: Storage Bay Protection & Upstream Metering</p>
        </div>
        <span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid #ef4444', borderRadius: '9999px', padding: '4px 12px', fontSize: '12px', fontWeight: 600 }}>● Active Defense</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px' }}><div style={{ fontSize: '12px', color: '#94a3b8' }}>State</div><div style={{ fontSize: '16px', fontWeight: 'bold', color: '#38bdf8' }}>{guardData.engineState}</div></div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px' }}><div style={{ fontSize: '12px', color: '#94a3b8' }}>Bottlenecks</div><div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f87171' }}>{guardData.criticalLinks} Links</div></div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px' }}><div style={{ fontSize: '12px', color: '#94a3b8' }}>Storage</div><div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fbbf24' }}>{guardData.meanOccupancy}%</div></div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px' }}><div style={{ fontSize: '12px', color: '#94a3b8' }}>Surge Prevented</div><div style={{ fontSize: '20px', fontWeight: 'bold', color: '#4ade80' }}>-{guardData.co2SurgeAvoidedKg} kg</div></div>
      </div>
    </div>
  );
}