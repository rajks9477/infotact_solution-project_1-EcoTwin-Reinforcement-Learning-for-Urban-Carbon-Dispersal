import React, { useState } from 'react';

export default function EVChargingGridPanel() {
  const [gridData] = useState({
    totalLoadKw: 1200,
    currentDrawKw: 850,
    renewableSharePct: 74.2,
    availablePorts: 12,
    totalPorts: 36,
    hubs: [
      { id: 'HUB-01-N', name: 'North Superhub', junction: 'junc_00', occupied: 6, total: 8, rate: '$0.12/kWh', status: 'Optimal' },
      { id: 'HUB-02-C', name: 'Central Arterial', junction: 'junc_02', occupied: 11, total: 12, rate: '$0.18/kWh', status: 'High Demand' },
      { id: 'HUB-03-E', name: 'East Depot', junction: 'junc_01', occupied: 2, total: 6, rate: '$0.10/kWh', status: 'Available' },
      { id: 'HUB-04-S', name: 'South Interchange', junction: 'junc_03', occupied: 5, total: 10, rate: '$0.14/kWh', status: 'Moderate' }
    ]
  });

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.75)',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid rgba(59, 130, 246, 0.25)',
      marginTop: '20px',
      color: '#f8fafc',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#60a5fa' }}>
            ⚡ Smart EV Eco-Charging & Grid Decarbonization Hub
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>
            Day 24 Telemetry: Arterial Fast-Charger Load Balancing & Clean Energy Dispatch
          </p>
        </div>
        <span style={{
          background: 'rgba(59, 130, 246, 0.15)',
          color: '#60a5fa',
          border: '1px solid #3b82f6',
          borderRadius: '9999px',
          padding: '4px 12px',
          fontSize: '12px',
          fontWeight: 600
        }}>
          ● Grid Interconnect Active
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Grid Power Draw</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8' }}>{gridData.currentDrawKw} / {gridData.totalLoadKw} kW</div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Clean Energy Share</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#4ade80' }}>{gridData.renewableSharePct}% Solar/Wind</div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Available Ports</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fbbf24' }}>{gridData.availablePorts} of {gridData.totalPorts}</div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Fleet Decarbonization</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#a78bfa' }}>-138.5 g CO2/km</div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
              <th style={{ padding: '8px' }}>Hub ID</th>
              <th style={{ padding: '8px' }}>Station Name</th>
              <th style={{ padding: '8px' }}>Junction</th>
              <th style={{ padding: '8px' }}>Occupancy</th>
              <th style={{ padding: '8px' }}>Dynamic Rate</th>
              <th style={{ padding: '8px' }}>Grid Status</th>
            </tr>
          </thead>
          <tbody>
            {gridData.hubs.map((hub) => (
              <tr key={hub.id} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.4)' }}>
                <td style={{ padding: '10px 8px', fontWeight: 600, color: '#f1f5f9' }}>{hub.id}</td>
                <td style={{ padding: '10px 8px', color: '#cbd5e1' }}>{hub.name}</td>
                <td style={{ padding: '10px 8px', color: '#38bdf8', fontWeight: 500 }}>{hub.junction}</td>
                <td style={{ padding: '10px 8px', color: '#cbd5e1' }}>{hub.occupied} / {hub.total} ports</td>
                <td style={{ padding: '10px 8px', color: '#4ade80', fontWeight: 600 }}>{hub.rate}</td>
                <td style={{ padding: '10px 8px' }}>
                  <span style={{
                    color: hub.status === 'Available' ? '#4ade80' : hub.status === 'Optimal' ? '#38bdf8' : hub.status === 'Moderate' ? '#fbbf24' : '#f87171',
                    fontWeight: 'bold'
                  }}>
                    ● {hub.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}