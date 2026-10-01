import React from 'react';
import { CloudRain, Wind, Thermometer, Gauge, AlertOctagon } from 'lucide-react';
import type { WeatherData } from '../types';

interface WeatherPageProps {
  weather: WeatherData | null;
}

export const WeatherPage: React.FC<WeatherPageProps> = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono">
          <CloudRain className="w-6 h-6 text-cyan-400" /> REAL-TIME WEATHER ENGINE
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Atmospheric precipitation metrics, severe weather warnings, and meteorological forecasts.
        </p>
      </div>

      {/* Severe Weather Alerts */}
      {weather.severe_alerts.length > 0 && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 space-y-2">
          <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
            <AlertOctagon className="w-4 h-4" /> SEVERE WEATHER ALERTS ACTIVE
          </div>
          {weather.severe_alerts.map((alert, idx) => (
            <p key={idx} className="text-xs text-red-200 font-semibold pl-6">
              • {alert}
            </p>
          ))}
        </div>
      )}

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl glass-card text-center">
          <Thermometer className="w-6 h-6 text-amber-400 mx-auto mb-2" />
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Temperature</span>
          <span className="text-2xl font-extrabold text-white font-mono">{weather.temperature_c}°C</span>
        </div>

        <div className="p-4 rounded-xl glass-card text-center">
          <CloudRain className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Rainfall</span>
          <span className="text-2xl font-extrabold text-cyan-300 font-mono">{weather.rainfall_mm} mm</span>
        </div>

        <div className="p-4 rounded-xl glass-card text-center">
          <Wind className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Wind Speed</span>
          <span className="text-2xl font-extrabold text-white font-mono">{weather.wind_speed_kmh} km/h</span>
          <span className="text-[10px] text-slate-500 block">{weather.wind_direction}</span>
        </div>

        <div className="p-4 rounded-xl glass-card text-center">
          <Gauge className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Barometric Pressure</span>
          <span className="text-2xl font-extrabold text-white font-mono">{weather.pressure_hpa} hPa</span>
        </div>
      </div>

      {/* Forecast Box */}
      <div className="p-5 rounded-xl glass-panel space-y-2">
        <h4 className="text-xs font-bold uppercase text-slate-300 tracking-wider">Meteorological Forecast Summary</h4>
        <p className="text-xs text-slate-200 leading-relaxed">{weather.forecast_summary}</p>
        <div className="pt-2 text-[10px] text-slate-400 flex justify-between border-t border-slate-800">
          <span>Provider: {weather.provider}</span>
          <span>Last Updated: {weather.last_updated}</span>
        </div>
      </div>
    </div>
  );
};
