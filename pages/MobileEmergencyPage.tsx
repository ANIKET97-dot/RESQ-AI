import React from 'react';
import { Mic, AlertTriangle } from 'lucide-react';
import type { Shelter, Hospital } from '../types';

interface MobileEmergencyPageProps {
  shelters: Shelter[];
  hospitals: Hospital[];
  onNavigate: (view: string) => void;
}

export const MobileEmergencyPage: React.FC<MobileEmergencyPageProps> = ({ shelters, hospitals, onNavigate }) => {
  const closestShelter = shelters[0];
  const closestHospital = hospitals[0];

  return (
    <div className="space-y-4 max-w-md mx-auto p-2">
      {/* Top Mobile Emergency Header */}
      <div className="bg-red-500/20 border border-red-500/40 p-3 rounded-2xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
          <div>
            <span className="font-extrabold text-white block">EMERGENCY ASSISTANCE MODE</span>
            <span className="text-[10px] text-red-300">San Francisco Bay Area Impact Zone</span>
          </div>
        </div>
        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">LIVE</span>
      </div>

      {/* Large Touch Buttons Grid */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate('research')}
          className="p-4 rounded-2xl bg-cyan-600 text-white text-left font-bold flex flex-col justify-between h-28 shadow-lg shadow-cyan-600/30 hover:brightness-110 active:scale-95 transition-all"
        >
          <Mic className="w-7 h-7 text-cyan-200" />
          <div>
            <span className="text-sm block">Voice Assistant</span>
            <span className="text-[10px] text-cyan-200 font-normal">Ask for Shelters / Routes</span>
          </div>
        </button>

        <button
          onClick={() => onNavigate('incidents')}
          className="p-4 rounded-2xl bg-pink-600 text-white text-left font-bold flex flex-col justify-between h-28 shadow-lg shadow-pink-600/30 hover:brightness-110 active:scale-95 transition-all"
        >
          <AlertTriangle className="w-7 h-7 text-pink-200" />
          <div>
            <span className="text-sm block">Report Incident</span>
            <span className="text-[10px] text-pink-200 font-normal">Upload Photo & Location</span>
          </div>
        </button>
      </div>

      {/* Nearest Resources Cards */}
      <div className="space-y-3">
        {closestShelter && (
          <div className="p-4 rounded-2xl glass-card flex items-center justify-between border-l-4 border-l-blue-500">
            <div>
              <span className="text-[10px] font-bold text-blue-400 uppercase">NEAREST OPEN SHELTER</span>
              <h4 className="font-bold text-white text-sm mt-0.5">{closestShelter.name}</h4>
              <p className="text-xs text-slate-300 mt-0.5">Beds: {closestShelter.current_occupancy}/{closestShelter.capacity} ({closestShelter.status})</p>
            </div>
            <button
              onClick={() => onNavigate('shelters')}
              className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold shrink-0"
            >
              Directions
            </button>
          </div>
        )}

        {closestHospital && (
          <div className="p-4 rounded-2xl glass-card flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase">NEAREST TRAUMA CENTER</span>
              <h4 className="font-bold text-white text-sm mt-0.5">{closestHospital.name}</h4>
              <p className="text-xs text-slate-300 mt-0.5">{closestHospital.available_beds} beds open ({closestHospital.status})</p>
            </div>
            <button
              onClick={() => onNavigate('hospitals')}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shrink-0"
            >
              Directions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
