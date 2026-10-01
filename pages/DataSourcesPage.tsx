import React from 'react';
import { Database, ExternalLink } from 'lucide-react';

export const DataSourcesPage: React.FC = () => {
  const sources = [
    { name: 'FEMA Region IX Emergency Operations Plan', type: 'Official Government Directive', url: 'https://fema.gov', status: 'Official Verified', time: '2026-10-01T08:00:00Z' },
    { name: 'California CalOES Highway & Transit Alerts', type: 'State Infrastructure Agency', url: 'https://caloes.ca.gov', status: 'Official Directive', time: '2026-10-01T22:00:00Z' },
    { name: 'SF DEM Emergency Management Operations', type: 'Municipal Agency', url: 'https://sfdem.org', status: 'Verified Agency', time: '2026-10-01T21:45:00Z' },
    { name: 'Red Cross Bay Area Shelter Capacity Matrix', type: 'Verified NGO Partner', url: 'https://redcross.org', status: 'Verified Field Log', time: '2026-10-01T22:10:00Z' },
    { name: 'Mission Creek Basin Water Level Gauge #4', type: 'IoT Telemetry Sensor', url: '#', status: 'Sensor Stream', time: '2026-10-01T22:35:00Z' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono">
          <Database className="w-6 h-6 text-cyan-400" /> DATA SOURCES & PROVENANCE AUDITOR
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Full metadata lineage tracking, verification statuses, publication times, and corroborating agency sources.
        </p>
      </div>

      <div className="space-y-3">
        {sources.map((src, idx) => (
          <div key={idx} className="p-4 rounded-xl glass-card flex items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-cyan-400 uppercase font-mono">{src.type}</span>
              <h4 className="font-bold text-white text-sm">{src.name}</h4>
              <p className="text-slate-400 text-[11px]">Publication Time: {src.time}</p>
            </div>

            <div className="text-right space-y-1">
              <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded text-[10px] font-bold border border-emerald-500/30 inline-block">
                ✓ {src.status}
              </span>
              <a href={src.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-300 block text-[11px] flex items-center justify-end gap-1">
                View Source <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
