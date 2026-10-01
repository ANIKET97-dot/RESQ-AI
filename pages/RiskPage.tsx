import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { fetchRiskAssessment } from '../services/api';

export const RiskPage: React.FC = () => {
  const [risk, setRisk] = useState<any | null>(null);

  useEffect(() => {
    fetchRiskAssessment().then(setRisk).catch(console.error);
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono">
          <TrendingUp className="w-6 h-6 text-red-400" /> ML DISASTER RISK ESTIMATION ENGINE
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Synthesizes rainfall, stream gauge anomalies, field incident density, and road blockages into a decision-support risk index.
        </p>
      </div>

      {risk && (
        <div className="p-6 rounded-xl glass-panel space-y-6">
          {/* Risk Dial Display */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-red-500/30">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Target Region</span>
              <h3 className="text-xl font-extrabold text-white mt-1">{risk.region_name}</h3>
              <span className="text-xs text-slate-400 mt-1 block">Evaluated at {risk.timestamp}</span>
            </div>

            <div className="text-center sm:text-right">
              <span className="bg-red-500/20 text-red-400 text-xs font-extrabold px-3 py-1 rounded-full border border-red-500/40">
                {risk.overall_risk_level} RISK
              </span>
              <div className="text-5xl font-black text-red-400 font-mono mt-2">{risk.risk_score}</div>
              <span className="text-xs text-slate-400">/ 100 Risk Index</span>
            </div>
          </div>

          {/* Contributing Signals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-300 tracking-wider">Contributing Risk Signals</h4>
            <div className="space-y-2">
              {risk.contributing_signals.map((sig: string, idx: number) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{sig}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300">
            ⚠️ <strong>Disclaimer:</strong> {risk.disclaimer}
          </div>
        </div>
      )}
    </div>
  );
};
