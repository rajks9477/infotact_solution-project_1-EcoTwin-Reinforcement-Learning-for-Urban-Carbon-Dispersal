@'
import React, { useState } from 'react';

export default function V2XAdvisoryPanel() {
  const [glosaData] = useState({
    activeAdvisories: 48,
    greenWaveCompliance: 87.4,
    fuelSavedLitres: 142.6,
    co2DispersalEfficiency: '+18.9%',
    spatBroadcasts: [
      { id: 'TL-01', signal: 'GREEN', timeRemaining: 18, recommendedSpeed: '42 km/h' },
      { id: 'TL-02', signal: 'YELLOW', timeRemaining: 4, recommendedSpeed: '28 km/h' },
      { id: 'TL-03', signal: 'RED', timeRemaining: 22, recommendedSpeed: 'Decelerate (0 km/h)' },
      { id: 'TL-04', signal: 'GREEN', timeRemaining: 31, recommendedSpeed: '48 km/h' }
    ]
  });

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.75)',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid rgba(56, 189, 248, 0.2)',
      marginTop: '20px',
      color: '#f8fafc',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#38bdf8' }}>
            🛰️ V2X GLOSA Speed Advisory & SPaT Broadcast
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>
            Day 22 Telemetry: Green Light Optimal Speed Advisory & Signal Timing Broadcasts
          </p>
        </div>
        <span style={{
          background: 'rgba(34, 197, 94, 0.15)',
          color: '#4ade80',
          border: '1px solid #22c55e',
          borderRadius: '9999px',
          padding: '4px 12px',
          fontSize: '12px',
          fontWeight: 600
        }}>
          ● Active DSRC/C-V2X
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Active Vehicles</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8' }}>{glosaData.activeAdvisories}</div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Green-Wave Pass Rate</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#4ade80' }}>{glosaData.greenWaveCompliance}%</div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Fuel Conserved</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fbbf24' }}>{glosaData.fuelSavedLitres} L</div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Dispersal Efficiency</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#a78bfa' }}>{glosaData.co2DispersalEfficiency}</div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
              <th style={{ padding: '8px' }}>Intersection ID</th>
              <th style={{ padding: '8px' }}>Signal State</th>
              <th style={{ padding: '8px' }}>Time to Switch</th>
              <th style={{ padding: '8px' }}>GLOSA Recommended Speed</th>
            </tr>
          </thead>
          <tbody>
            {glosaData.spatBroadcasts.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.4)' }}>
                <td style={{ padding: '10px 8px', fontWeight: 600, color: '#f1f5f9' }}>{item.id}</td>
                <td style={{ padding: '10px 8px' }}>
                  <span style={{
                    color: item.signal === 'GREEN' ? '#4ade80' : item.signal === 'YELLOW' ? '#facc15' : '#f87171',
                    fontWeight: 'bold'
                  }}>
                    ● {item.signal}
                  </span>
                </td>
                <td style={{ padding: '10px 8px', color: '#cbd5e1' }}>{item.timeRemaining}s</td>
                <td style={{ padding: '10px 8px', color: '#38bdf8', fontWeight: 500 }}>{item.recommendedSpeed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
'@ | Set-Content -Path "frontend/src/components/V2XAdvisoryPanel.jsx" -Encoding UTF8