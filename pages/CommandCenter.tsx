import React from 'react';
import { DisasterMap } from '../components/DisasterMap';
import { ArrowUpRight } from 'lucide-react';
import type { DisasterZone, Shelter, Hospital, RoadSegment, SensorReading, IncidentReport, WeatherData } from '../types';

interface CommandCenterProps {
  disasters: DisasterZone[];
  shelters: Shelter[];
  hospitals: Hospital[];
  roads: RoadSegment[];
  sensors: SensorReading[];
  incidents: IncidentReport[];
  weather: WeatherData | null;
  onNavigate: (view: string) => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  disasters,
  shelters,
  hospitals,
  roads,
  sensors,
  incidents,
  weather,
  onNavigate
}) => {
  const activeDisaster = disasters[0] || { name: 'Active Flood Event', severity: 'Critical' };
  const blockedRoadsCount = roads.filter((r) => r.status === 'Blocked' || r.status === 'Flooded').length;
  const anomalySensorsCount = sensors.filter((s) => s.status === 'Anomaly').length;
  const totalBeds = hospitals.reduce((acc, h) => acc + h.available_beds, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
            <h2 className="text-xl font-bold text-white tracking-wide font-mono">
              COMMAND CENTER — UNIFIED DISASTER RESPONSE
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Impact Zone: <strong className="text-slate-200">{activeDisaster.name}</strong> • Status: <strong className="text-red-400">{activeDisaster.severity}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => onNavigate('research')}
            className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 font-semibold flex items-center gap-1.5 transition-all"
          >
            Ask RESQAI Assistant <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('reports')}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 shadow-md transition-all"
          >
            Generate Situation Report
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Risk Metrics Panel */}
        <div className="space-y-4 lg:col-span-1">
          {/* Risk Card */}
          <div className="p-4 rounded-xl glass-panel border border-red-500/30">
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider flex items-center justify-between">
              <span>ESTIMATED RISK LEVEL</span>
              <span className="bg-red-500/20 px-2 py-0.5 rounded">CRITICAL</span>
            </span>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-red-400 font-mono">88.5</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <p className="text-xs text-slate-300 mt-2 font-medium">
              High flood surge risk along Mission District basin. Sensor anomaly detected.
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl glass-card">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Open Beds</span>
              <span className="text-xl font-bold text-emerald-400 font-mono mt-1 block">{totalBeds}</span>
              <span className="text-[10px] text-slate-500">Across {hospitals.length} hospitals</span>
            </div>

            <div className="p-3 rounded-xl glass-card">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Blocked Roads</span>
              <span className="text-xl font-bold text-amber-400 font-mono mt-1 block">{blockedRoadsCount}</span>
              <span className="text-[10px] text-slate-500">Active closures</span>
            </div>

            <div className="p-3 rounded-xl glass-card">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Sensor Alerts</span>
              <span className="text-xl font-bold text-red-400 font-mono mt-1 block">{anomalySensorsCount}</span>
              <span className="text-[10px] text-slate-500">Gauge anomaly</span>
            </div>

            <div className="p-3 rounded-xl glass-card">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Rainfall</span>
              <span className="text-xl font-bold text-cyan-400 font-mono mt-1 block">{weather?.rainfall_mm || 62.4} mm</span>
              <span className="text-[10px] text-slate-500">Precipitation</span>
            </div>
          </div>

          {/* Active Incidents Feed Widget */}
          <div className="p-4 rounded-xl glass-panel space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase text-slate-300 tracking-wider">Recent Incidents</h4>
              <button onClick={() => onNavigate('incidents')} className="text-[11px] text-cyan-400 hover:underline">
                View All ({incidents.length})
              </button>
            </div>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {incidents.slice(0, 3).map((inc) => (
                <div key={inc.id} className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span className="text-pink-400">📍 {inc.category}</span>
                    <span className="text-slate-500">{inc.created_at.split('T')[1]?.slice(0, 5)}</span>
                  </div>
                  <p className="text-slate-300 mt-1 text-[11px] line-clamp-2">{inc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Main GIS Map & AI Situation Summary */}
        <div className="lg:col-span-3 space-y-4">
          <DisasterMap
            disasters={disasters}
            shelters={shelters}
            hospitals={hospitals}
            roads={roads}
            sensors={sensors}
            incidents={incidents}
            height="460px"
          />

          {/* AI Situation Summary Box */}
          <div className="p-5 rounded-xl glass-panel border border-cyan-500/20 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span> AI SITUATION SUMMARY & EVIDENCE ANALYSIS
              </span>
              <span className="text-[11px] text-slate-400">Verified at 22:35 UTC</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              An active <strong>Atmospheric River flood surge</strong> is impacting the lower Mission District basin. Civic Center Shelter (SHL-101) is open with 180 available beds, while Mission High School Shelter is near capacity (285/300 occupied). Zuckerberg SF General Trauma Center is under High Load status with 6 ICU beds available. Mission Street is flooded between 14th St and 18th St with 1.2m water inundation.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700">
                Source: FEMA Region IX Directive
              </span>
              <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700">
                Source: Caltrans Incident Feed
              </span>
              <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700">
                Source: Mission Creek Water Gauge #4
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
