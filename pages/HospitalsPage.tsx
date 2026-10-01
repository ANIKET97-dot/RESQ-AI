import React from 'react';
import { Activity } from 'lucide-react';
import type { Hospital } from '../types';

interface HospitalsPageProps {
  hospitals: Hospital[];
}

export const HospitalsPage: React.FC<HospitalsPageProps> = ({ hospitals }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono">
          <Activity className="w-6 h-6 text-emerald-400" /> EMERGENCY RESOURCE ENGINE — HOSPITALS
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Trauma center operational statuses, ICU bed availability, and ambulance access corridor alerts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hospitals.map((h) => (
          <div key={h.id} className="p-5 rounded-xl glass-card space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                  h.status === 'Operational' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}>
                  {h.status}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{h.name}</h3>
                <p className="text-xs text-slate-400">{h.type}</p>
              </div>

              <div className="text-right">
                <span className="text-2xl font-extrabold text-emerald-400 font-mono">{h.available_beds}</span>
                <span className="text-[10px] text-slate-400 block">Beds Open</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <div>
                <span className="text-slate-500 block text-[10px]">ICU Capacity</span>
                <span className="font-bold text-emerald-300">{h.icu_available} ICU Beds Available</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Total Bed Count</span>
                <span className="font-bold text-slate-200">{h.total_beds} Total Beds</span>
              </div>
            </div>

            <div className="text-xs text-amber-300 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
              🚨 <strong>Accessibility:</strong> {h.accessibility}
            </div>

            <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between">
              <span>{h.source}</span>
              <span>Updated: {h.last_updated.split('T')[1]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
