import React, { useState } from 'react';

const ReportExportModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleExport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert('Official EcoTwin Carbon Audit Report (ISO 14064-2) exported successfully!');
    }, 800);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg space-y-3">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
          <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
            Municipal Regulatory Audit
          </h3>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-400 border border-teal-500/30 font-medium">
          ISO 14064-2
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 bg-zinc-950/60 rounded-lg border border-zinc-800/80">
            <span className="text-[10px] text-zinc-400 block mb-0.5">Economic Fuel Saved</span>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-mono text-emerald-400 font-bold text-sm">$54.81</span>
              <span className="text-[10px] text-zinc-500 font-mono">(37.8 L)</span>
            </div>
          </div>

          <div className="p-2.5 bg-zinc-950/60 rounded-lg border border-zinc-800/80">
            <span className="text-[10px] text-zinc-400 block mb-0.5">Green Credits</span>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-mono text-teal-400 font-bold text-sm">+$5.76</span>
              <span className="text-[10px] text-zinc-500 font-mono">Offset</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-teal-600/80 hover:bg-teal-600 text-white font-medium py-2 px-3 rounded-lg text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Generate Official Carbon Audit</span>
        </button>
      </div>

      {/* Audit Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Municipal Carbon Verification Statement</span>
                </h3>
                <p className="text-xs text-zinc-400">Standard: ISO 14064-2: Green Transport Protocol</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white text-lg font-bold px-2 py-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Baseline Simulated Emissions</span>
                <span className="font-mono text-zinc-200">410.9 kg CO2</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">PPO Quantized Policy Emissions</span>
                <span className="font-mono text-emerald-400 font-bold">323.3 kg CO2 (-21.32%)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Avoided Liquid Fuel Consumption</span>
                <span className="font-mono text-zinc-200">37.8 Liters ($54.81 USD)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">Carbon Credit Equivalent ($65/ton)</span>
                <span className="font-mono text-teal-400 font-bold">$5.76 USD / Hour</span>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleExport}
                disabled={downloading}
                className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs rounded-lg transition cursor-pointer shadow-md"
              >
                {downloading ? 'Compiling PDF...' : 'Download Certified Audit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportExportModal;