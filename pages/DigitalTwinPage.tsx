import React, { useState, useEffect } from 'react';
import { Clock, Layers } from 'lucide-react';

export const DigitalTwinPage: React.FC = () => {
  const [twinData, setTwinData] = useState<any | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<string>('NOW');

  useEffect(() => {
    fetch('/api/digital_twin/timeline')
      .then((res) => res.json())
      .then((data) => {
        setTwinData(data);
        setSelectedFrame('NOW');
      })
      .catch(console.error);
  }, []);

  const timeFrames = ['T-24h', 'T-12h', 'T-6h', 'NOW', '+6h', '+12h', '+24h'];

  const currentFrameData = twinData?.timeline_frames?.[selectedFrame];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono">
          <Clock className="w-6 h-6 text-cyan-400" /> DISASTER DIGITAL TWIN & SPATIOTEMPORAL TIMELINE
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Versioned spatiotemporal state simulation representing physical disaster evolution across timeline steps.
        </p>
      </div>

      {twinData && currentFrameData && (
        <div className="space-y-6">
          {/* Interactive Timeline Slider Bar */}
          <div className="p-6 rounded-xl glass-panel space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                SPATIOTEMPORAL TIMELINE STEP SELECTION
              </span>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/30">
                ACTIVE STEP: {selectedFrame} ({currentFrameData.timestamp})
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2 pt-2">
              {timeFrames.map((frame) => {
                const isActive = selectedFrame === frame;
                const isNow = frame === 'NOW';
                return (
                  <button
                    key={frame}
                    onClick={() => setSelectedFrame(frame)}
                    className={`py-3 px-2 rounded-xl text-xs font-mono font-bold transition-all text-center ${
                      isActive
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400'
                        : isNow
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <div>{frame}</div>
                    <span className="text-[9px] font-sans text-slate-400 block mt-0.5">
                      {twinData.timeline_frames[frame]?.risk_score}/100 Risk
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Frame State Grid */}
          <div className="p-6 rounded-xl glass-panel space-y-5 bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" /> Digital Twin State Summary ({selectedFrame})
              </h3>
              <span className="text-xs text-red-400 font-bold font-mono">
                Status: {currentFrameData.disaster_status}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block font-sans">Accumulated Rainfall</span>
                <span className="text-2xl font-extrabold text-cyan-300 mt-1 block">{currentFrameData.rainfall_accumulated_mm} mm</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block font-sans">Stream Gauge Level</span>
                <span className="text-2xl font-extrabold text-blue-400 mt-1 block">{currentFrameData.water_level_m} meters</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block font-sans">Road Closures</span>
                <span className="text-2xl font-extrabold text-amber-400 mt-1 block">{currentFrameData.blocked_roads} Arterial Blockages</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block font-sans">Shelter Occupancy</span>
                <span className="text-2xl font-extrabold text-emerald-400 mt-1 block">{currentFrameData.shelter_occupancy_pct}% Capacity</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
