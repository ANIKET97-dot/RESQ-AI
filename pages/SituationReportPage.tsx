import React, { useState } from 'react';
import { FileText, Printer } from 'lucide-react';
import { generateSitRep } from '../services/api';
import type { SituationReport } from '../types';

export const SituationReportPage: React.FC = () => {
  const [region, setRegion] = useState('San Francisco Bay Area Metro');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<SituationReport | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateSitRep(region);
      setReport(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono">
            <FileText className="w-6 h-6 text-blue-400" /> AI SITUATION REPORT GENERATOR (SITREP)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Generates standardized emergency operation situation reports with 100% citation coverage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Target Region"
            className="bg-slate-900 border border-slate-700 text-xs rounded-xl px-3 py-2 text-slate-200"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-md hover:brightness-110 transition-all"
          >
            {loading ? 'Generating SITREP...' : 'Generate New SITREP'}
          </button>
        </div>
      </div>

      {report && (
        <div className="p-8 rounded-2xl glass-panel bg-slate-950 border border-slate-800 space-y-6 text-slate-200">
          {/* SITREP Header */}
          <div className="border-b border-slate-800 pb-6 flex justify-between items-start">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/30">
                {report.report_id}
              </span>
              <h1 className="text-2xl font-extrabold text-white mt-2">{report.incident_name}</h1>
              <p className="text-xs text-slate-400 mt-0.5">{report.location} • Generated at {report.generated_at}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => window.print()} className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800">
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Report Sections */}
          <div className="space-y-5 text-xs leading-relaxed font-sans">
            <div>
              <h4 className="font-bold text-cyan-400 uppercase tracking-wider mb-1">1. EXECUTIVE SUMMARY</h4>
              <p className="text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">{report.summary}</p>
            </div>

            <div>
              <h4 className="font-bold text-cyan-400 uppercase tracking-wider mb-1">2. CURRENT METEOROLOGICAL & METRO CONDITIONS</h4>
              <p className="text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">{report.current_conditions}</p>
            </div>

            <div>
              <h4 className="font-bold text-cyan-400 uppercase tracking-wider mb-1">3. AFFECTED IMPACT ZONES</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                {report.affected_areas.map((area, i) => <li key={i}>{area}</li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-cyan-400 uppercase tracking-wider mb-1">4. INFRASTRUCTURE & ROAD CLOSURES</h4>
              <p className="text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">{report.infrastructure_road_status}</p>
            </div>

            <div>
              <h4 className="font-bold text-cyan-400 uppercase tracking-wider mb-1">5. EMERGENCY SHELTERS STATUS</h4>
              <p className="text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">{report.shelters_summary}</p>
            </div>

            <div>
              <h4 className="font-bold text-cyan-400 uppercase tracking-wider mb-1">6. HOSPITALS & ICU CAPACITY</h4>
              <p className="text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">{report.hospitals_summary}</p>
            </div>

            <div>
              <h4 className="font-bold text-cyan-400 uppercase tracking-wider mb-1">7. STREAM GAUGE & SENSOR TELEMETRY</h4>
              <p className="text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">{report.sensor_observations}</p>
            </div>

            {report.conflicting_information.length > 0 && (
              <div>
                <h4 className="font-bold text-amber-400 uppercase tracking-wider mb-1">8. CONFLICTING INFORMATION RESOLUTIONS</h4>
                <div className="space-y-1 bg-amber-500/10 p-3 rounded-lg border border-amber-500/30 text-amber-200">
                  {report.conflicting_information.map((conf, i) => <p key={i}>• {conf}</p>)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
