import React, { useState } from 'react';

export default function SensorHealthMonitor() {
  const [telemetryData] = useState({
    activeSensors: 4,
    meanHealthPct: 94.2,
    packetLossPct: 0.42,
    noiseRejectionDb: '+8.4 dB',
    sensors: [
      { id: 'IOT-LOOP-01', type: 'Inductive Loop', junction: 'junc_00', health: 98.5, noiseFloor: '-42.0 dB', filterState: 'EKF Calibrated', status: 'OPTIMAL' },
      { id: 'IOT-NDIR-02', type: 'NDIR CO2 Sensor', junction: 'junc_02', health: 91.2, noiseFloor: '-28.4 dB', filterState: 'Drift Corrected', status: 'REPAIRED' },
      { id: 'IOT-RADAR-03', type: 'Doppler Radar', junction: 'junc_01', health: 99.1, noiseFloor: '-48.2 dB', filterState: 'EKF Calibrated', status: 'OPTIMAL' },
      { id: 'IOT-NDIR-04', type: 'NDIR CO2 Sensor', junction: 'junc_03', health: 88.0, noiseFloor: '-24.1 dB', filterState: 'Kalman Filtered', status: 'REPAIRED' }
    ]
  });

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.75)',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid rgba(245, 158, 11, 0.25)',
      marginTop: '20px',
      color: '#f8fafc',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#fbbf24' }}>
            📡 Digital Twin Sensor Fusion & Hardware Health Monitor
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>
            Day 25 Telemetry: Edge IoT Induction Loops, Doppler Radar & NDIR CO2 Sensor Kalman Filtering
          </p>
        </div>
        <span style={{
          background: 'rgba(245, 158, 11, 0.15)',
          color: '#fbbf24',
          border: '1px solid #f59e0b',
          borderRadius: '9999px',
          padding: '4px 12px',
          fontSize: '12px',
          fontWeight: 600
        }}>
          ● EKF Noise Rejection Active
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Connected Nodes</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8' }}>{telemetryData.activeSensors} Online</div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Fleet Mean Health</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#4ade80' }}>{telemetryData.meanHealthPct}%</div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Packet Loss Rate</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fbbf24' }}>{telemetryData.packetLossPct}%</div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Noise Attenuation</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#a78bfa' }}>{telemetryData.noiseRejectionDb}</div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
              <th style={{ padding: '8px' }}>Node ID</th>
              <th style={{ padding: '8px' }}>Sensor Type</th>
              <th style={{ padding: '8px' }}>Junction</th>
              <th style={{ padding: '8px' }}>Health</th>
              <th style={{ padding: '8px' }}>Noise Floor</th>
              <th style={{ padding: '8px' }}>Filter State</th>
              <th style={{ padding: '8px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {telemetryData.sensors.map((node) => (
              <tr key={node.id} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.4)' }}>
                <td style={{ padding: '10px 8px', fontWeight: 600, color: '#f1f5f9' }}>{node.id}</td>
                <td style={{ padding: '10px 8px', color: '#cbd5e1' }}>{node.type}</td>
                <td style={{ padding: '10px 8px', color: '#38bdf8', fontWeight: 500 }}>{node.junction}</td>
                <td style={{ padding: '10px 8px', color: '#4ade80', fontWeight: 600 }}>{node.health}%</td>
                <td style={{ padding: '10px 8px', color: '#cbd5e1' }}>{node.noiseFloor}</td>
                <td style={{ padding: '10px 8px', color: '#fbbf24' }}>{node.filterState}</td>
                <td style={{ padding: '10px 8px' }}>
                  <span style={{
                    color: node.status === 'OPTIMAL' ? '#4ade80' : '#fbbf24',
                    fontWeight: 'bold'
                  }}>
                    ● {node.status}
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