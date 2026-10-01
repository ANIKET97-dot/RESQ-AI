import React, { useState } from 'react';
import { Navigation, ArrowRight } from 'lucide-react';
import type { RoadSegment } from '../types';

interface RoadsPageProps {
  roads: RoadSegment[];
}

export const RoadsPage: React.FC<RoadsPageProps> = ({ roads }) => {
  const [routeResult, setRouteResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateRoute = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/routing/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start_lat: 37.7558, start_lng: -122.4053,
          end_lat: 37.7793, end_lng: -122.4184,
          origin_name: 'Zuckerberg SF General Hospital',
          destination_name: 'Civic Center Emergency Shelter'
        })
      });
      const data = await res.json();
      setRouteResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono">
            <Navigation className="w-6 h-6 text-amber-400" /> ROAD & ROUTE INTELLIGENCE
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time arterial road closure filtering and safe emergency route optimization.
          </p>
        </div>

        <button
          onClick={calculateRoute}
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold shadow-md hover:brightness-110 transition-all flex items-center gap-2"
        >
          {loading ? 'Calculating Route...' : 'Calculate Safe Route (SF General → Civic Center)'}
        </button>
      </div>

      {/* Calculated Route Banner */}
      {routeResult && (
        <div className="p-5 rounded-xl glass-panel border border-emerald-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase font-mono">
              ✓ VIABLE ROUTE CALCULATED (Bypasses {routeResult.avoided_blocked_segments?.length || 1} Blocked Segments)
            </span>
            <span className="text-xs text-slate-400 font-mono">Time: {routeResult.estimated_travel_time_min} mins ({routeResult.distance_km} km)</span>
          </div>

          <div className="text-xs text-slate-200">
            <strong>Origin:</strong> {routeResult.origin} <ArrowRight className="inline w-3 h-3 text-slate-400 mx-1" /> <strong>Destination:</strong> {routeResult.destination}
          </div>

          <p className="text-xs text-emerald-300 font-medium">
            💡 {routeResult.detour_note}
          </p>

          <div className="p-2.5 bg-slate-900 rounded-lg text-[11px] text-amber-300 border border-slate-800">
            ⚠️ <strong>Caveat:</strong> {routeResult.caveat} (Source: {routeResult.data_source} · {routeResult.timestamp})
          </div>
        </div>
      )}

      {/* Road Segment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roads.map((r) => (
          <div key={r.id} className="p-4 rounded-xl glass-card space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                r.status === 'Flooded' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' : r.status === 'Blocked' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              }`}>
                {r.status}
              </span>
              <span className="text-[10px] text-slate-500">{r.last_updated}</span>
            </div>

            <h4 className="font-bold text-white text-sm">{r.road_name}</h4>
            <p className="text-xs text-slate-300">{r.reason || 'Normal traffic flow'}</p>

            <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between">
              <span>Source: {r.source}</span>
              <span className="text-emerald-400">✓ {r.verification_status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
