import React, { useState } from 'react';

const WeatherControl = ({ onWeatherChange }) => {
  const [activeWeather, setActiveWeather] = useState('clear');

  const weatherOptions = [
    { id: 'clear', label: 'Clear & Dry', mu: 0.85, surge: '1.00x', icon: '☀️' },
    { id: 'heavy_rain', label: 'Torrential Rain', mu: 0.52, surge: '1.28x', icon: '🌧️' },
    { id: 'dense_smog', label: 'Dense Smog', mu: 0.70, surge: '1.42x', icon: '🌫️' },
    { id: 'heat_island', label: 'Heat Island', mu: 0.75, surge: '1.35x', icon: '🔥' },
  ];

  const handleSelect = (id) => {
    setActiveWeather(id);
    if (onWeatherChange) onWeatherChange(id);
  };

  const current = weatherOptions.find((w) => w.id === activeWeather);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg space-y-3">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse"></span>
          <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
            Meteorology & Pavement Friction
          </h3>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30 font-medium">
          Tire-Road μ: {current.mu}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        {weatherOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            className={`p-2 rounded-lg border text-left transition cursor-pointer flex flex-col justify-between ${
              activeWeather === opt.id
                ? 'bg-sky-950/60 border-sky-500/60 text-white shadow-sm'
                : 'bg-zinc-950/40 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">{opt.label}</span>
              <span>{opt.icon}</span>
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
              <span>μ={opt.mu}</span>
              <span className={opt.id !== 'clear' ? 'text-rose-400' : 'text-emerald-400'}>
                {opt.surge} CO2
              </span>
            </div>
          </button>
        ))}
      </div>

      {activeWeather !== 'clear' && (
        <div className="p-2 bg-sky-950/30 border border-sky-500/20 rounded-lg text-[11px] text-sky-300/90 leading-tight">
          <strong>Weather Guard Active:</strong> PPO yellow interval extended to 6.0s. Anti-jerk deceleration buffer engaged to prevent wet-surface skidding.
        </div>
      )}
    </div>
  );
};

export default WeatherControl;