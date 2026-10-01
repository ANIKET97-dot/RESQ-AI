import React from 'react';
import { Home } from 'lucide-react';
import type { Shelter } from '../types';

interface SheltersPageProps {
  shelters: Shelter[];
}

export const SheltersPage: React.FC<SheltersPageProps> = ({ shelters }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono">
          <Home className="w-6 h-6 text-blue-400" /> EMERGENCY RESOURCE ENGINE — SHELTERS
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Real-time shelter occupancy tracking, operating hours, and capacity availability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shelters.map((s) => {
          const occupancyPct = Math.round((s.current_occupancy / s.capacity) * 100);
          return (
            <div key={s.id} className="p-5 rounded-xl glass-card space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                    s.status === 'Open' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}>
                    {s.status}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{s.name}</h3>
                  <p className="text-xs text-slate-400">{s.type}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-white font-mono">{occupancyPct}%</span>
                  <span className="text-[10px] text-slate-400 block">Occupied</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all ${
                    occupancyPct > 90 ? 'bg-red-500' : occupancyPct > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${occupancyPct}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                <div>Capacity: <strong>{s.current_occupancy} / {s.capacity} beds</strong></div>
                <div>Contact: <strong>{s.contact}</strong></div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between">
                <span>{s.source}</span>
                <span className="text-emerald-400 font-medium">✓ {s.verification_status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
