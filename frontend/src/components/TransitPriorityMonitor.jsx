import React, { useState } from 'react';

export default function TransitPriorityMonitor() {
  const [transitMetrics] = useState({
    activeBuses: 10,
    hourlyPassengerThroughput: 1420,
    passengerDelayAvoidedMin: 184.5,
    carbonOffsetKg: 38.6,
    priorityEvents: [
      { id: 'BRT-101', route: 'Red Corridor', junction: 'junc_00', delaySec: '+85s', pax: 52, action: 'Green Extension (+12s)', status: 'ACTIVE' },
      { id: 'LRT-204', route: 'Blue Rail', junction: 'junc_03', delaySec: '+110s', pax: 80, action: 'Queue Clearance Hold (6s)', status: 'ACTIVE' },
      { id: 'BRT-105', route: 'Red Corridor', junction: 'junc_01', delaySec: '+15s', pax: 22, action: 'Coordination Maintained', status: 'COMPLETED' }
    ]
  });

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.75)',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid rgba(16, 185, 129, 0.25)',
      marginTop: '20px',
      color: '#f8fafc',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#34d399' }}>
            🚌 Multi-Modal Transit Signal Priority (TSP) & Headway Monitor
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>
            Day 23 Telemetry: High-Occupancy BRT & LRT Delay Minimization vs Carbon Plume Dispersion
          </p>
        </div>
        <span style={{
          background: 'rgba(16, 185, 129, 0.15)',
          color: '#34d399',
          border: '1px solid #10b981',
          borderRadius: '9999px',
          padding: '4px 12px',
          fontSize: '12px',
          fontWeight: 600
        }}>
          ● Multi-Modal TSP Online
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Active Transit Fleet</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#34d399' }}>{transitMetrics.activeBuses} Units</div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Hourly Pax Throughput</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8' }}>{transitMetrics.hourlyPassengerThroughput} pax/h</div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Passenger Delay Avoided</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fbbf24' }}>{transitMetrics.passengerDelayAvoidedMin} min</div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>CO2 Offset Benefit</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#a78bfa' }}>-{transitMetrics.carbonOffsetKg} kg</div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
              <th style={{ padding: '8px' }}>Vehicle ID</th>
              <th style={{ padding: '8px' }}>Line / Route</th>
              <th style={{ padding: '8px' }}>Junction</th>
              <th style={{ padding: '8px' }}>Schedule Delay</th>
              <th style={{ padding: '8px' }}>Occupancy</th>
              <th style={{ padding: '8px' }}>TSP Control Action</th>
              <th style={{ padding: '8px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transitMetrics.priorityEvents.map((evt) => (
              <tr key={evt.id} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.4)' }}>
                <td style={{ padding: '10px 8px', fontWeight: 600, color: '#f1f5f9' }}>{evt.id}</td>
                <td style={{ padding: '10px 8px', color: '#cbd5e1' }}>{evt.route}</td>
                <td style={{ padding: '10px 8px', color: '#38bdf8', fontWeight: 500 }}>{evt.junction}</td>
                <td style={{ padding: '10px 8px', color: '#f87171' }}>{evt.delaySec}</td>
                <td style={{ padding: '10px 8px', color: '#cbd5e1' }}>{evt.pax} pax</td>
                <td style={{ padding: '10px 8px', color: '#34d399', fontWeight: 600 }}>{evt.action}</td>
                <td style={{ padding: '10px 8px' }}>
                  <span style={{
                    color: evt.status === 'ACTIVE' ? '#34d399' : '#94a3b8',
                    fontWeight: 'bold'
                  }}>
                    ● {evt.status}
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