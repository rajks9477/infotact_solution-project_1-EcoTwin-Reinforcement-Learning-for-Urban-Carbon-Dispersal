import React from 'react';

const CongestionPricing = ({
  zones = [
    { name: 'Central Arterial Core', toll: 4.92, surge: 1.64, diversion: 41.0, highDemand: true },
    { name: 'East Highline Bypass', toll: 3.50, surge: 1.40, diversion: 29.2, highDemand: true },
    { name: 'North Gateway Entry', toll: 2.50, surge: 1.00, diversion: 20.8, highDemand: false },
    { name: 'South Industrial Park', toll: 2.00, surge: 1.00, diversion: 16.7, highDemand: false },
  ],
  projectedEcoFund = 581.40,
}) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg space-y-3">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
          <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
            Dynamic Congestion Tolling
          </h3>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-medium">
          Elastic Reroute
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800/80">
          <div>
            <span className="text-[10px] text-zinc-400 block">Municipal Eco-Fund</span>
            <span className="text-sm font-bold text-amber-400 font-mono">${projectedEcoFund}/hr</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-zinc-400 block">Avg Route Diversion</span>
            <span className="text-sm font-bold text-emerald-400 font-mono">26.9%</span>
          </div>
        </div>

        <div className="space-y-1.5 pt-1">
          {zones.map((z, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-lg bg-zinc-950/40 border border-zinc-800/60 text-[11px]"
            >
              <div>
                <span className="text-zinc-200 font-medium block">{z.name}</span>
                <span className="text-[10px] text-zinc-500">
                  Surge: {z.surge}x • Diversion: {z.diversion}%
                </span>
              </div>
              <div className="text-right">
                <span
                  className={`font-mono font-bold ${
                    z.highDemand ? 'text-amber-400' : 'text-zinc-300'
                  }`}
                >
                  ${z.toll.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-2 bg-amber-950/30 border border-amber-500/20 rounded-lg text-[11px] text-amber-300/90 leading-tight">
          <strong>Demand-Side Elasticity:</strong> Dynamic toll surge throttles inflow into saturated sectors while PPO flushes green corridors.
        </div>
      </div>
    </div>
  );
};

export default CongestionPricing;