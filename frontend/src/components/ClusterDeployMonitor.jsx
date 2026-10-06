import React, { useState } from 'react';

export default function ClusterDeployMonitor() {
  const [clusterData] = useState({
    orchestration: 'Docker Compose / Kubernetes Cluster',
    containersOnline: 4,
    uptimeHours: 99.98,
    containers: [
      { name: 'ecotwin-sumo-sim', image: 'ecotwin/sumo:latest', port: '8813', status: 'HEALTHY' },
      { name: 'ecotwin-ppo-agent', image: 'ecotwin/rl-agent:v1.0', port: '8001', status: 'HEALTHY' },
      { name: 'ecotwin-backend-api', image: 'ecotwin/backend:v1.0', port: '8000', status: 'HEALTHY' },
      { name: 'ecotwin-frontend-ui', image: 'ecotwin/ui:v1.0', port: '3000', status: 'HEALTHY' }
    ]
  });

  return (
    <div style={{ background: 'rgba(15, 23, 42, 0.75)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(56, 189, 248, 0.25)', marginTop: '20px', color: '#f8fafc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#38bdf8' }}>🐳 Day 29: Production Container & Cluster Health</h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>Multi-Container Microservices Deployment Stack</p>
        </div>
        <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid #38bdf8', borderRadius: '9999px', padding: '4px 12px', fontSize: '12px', fontWeight: 600 }}>● 4/4 Pods Online</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {clusterData.containers.map((c) => (
          <div key={c.name} style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#f8fafc' }}>{c.name}</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>Port: {c.port}</div>
            <div style={{ fontSize: '12px', color: '#4ade80', fontWeight: 'bold', marginTop: '6px' }}>● {c.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}