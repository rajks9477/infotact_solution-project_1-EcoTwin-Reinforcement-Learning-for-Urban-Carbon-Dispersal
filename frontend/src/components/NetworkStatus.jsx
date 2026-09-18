import React from 'react';

/**
 * NetworkStatus Component - Real-time WebSocket Health & Latency Monitor
 * Author: Subhransu Sekhar Swain (Frontend Lead - Day 11 Deliverable)
 */
export default function NetworkStatus({ isConnected = true, latencyMs = 18, uptimeSec = 120 }) {
  return (
    <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs">
      {/* Connection State */}
      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
        <span className="font-bold text-slate-200">
          {isConnected ? 'WebSocket Stream Active' : 'Disconnected - Retrying...'}
        </span>
        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
          1 Hz Heartbeat
        </span>
      </div>

      {/* Health Telemetry Tags */}
      <div className="flex items-center gap-4 text-[11px] font-mono">
        <div className="flex items-center gap-1">
          <span className="text-slate-400">Ping:</span>
          <span className="text-emerald-400 font-bold">{latencyMs} ms</span>
        </div>
        <div className="flex items-center gap-1 border-l border-slate-800 pl-3">
          <span className="text-slate-400">Packet Loss:</span>
          <span className="text-emerald-400 font-bold">0.0%</span>
        </div>
        <div className="flex items-center gap-1 border-l border-slate-800 pl-3">
          <span className="text-slate-400">Buffer:</span>
          <span className="text-blue-400 font-bold">30 Frames Ready</span>
        </div>
      </div>
    </div>
  );
}