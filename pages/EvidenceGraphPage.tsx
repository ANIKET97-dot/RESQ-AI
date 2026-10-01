import React, { useState, useEffect } from 'react';
import { ShieldCheck, GitBranch, Database } from 'lucide-react';

export const EvidenceGraphPage: React.FC = () => {
  const [evidenceGraph, setEvidenceGraph] = useState<any | null>(null);
  const [traceResult, setTraceResult] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/evidence/graph')
      .then((res) => res.json())
      .then(setEvidenceGraph)
      .catch(console.error);
  }, []);

  const traceClaim = async (claimId: string = 'CLM-RD301-BLOCKED') => {
    try {
      const res = await fetch(`/api/evidence/trace/${claimId}`);
      const data = await res.json();
      setTraceResult(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono">
          <ShieldCheck className="w-6 h-6 text-emerald-400" /> EVIDENCE GRAPH & CLAIM TRACEABILITY
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Lineage chain representation: SOURCE → OBSERVATION → CLAIM → ENTITY → LOCATION → TIME → EVENT.
        </p>
      </div>

      {evidenceGraph && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Claim Nodes List */}
          <div className="p-5 rounded-xl glass-panel space-y-3">
            <h3 className="text-xs font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2 font-mono">
              <Database className="w-4 h-4 text-cyan-400" /> CLAIMS IN EVIDENCE GRAPH
            </h3>
            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
              {evidenceGraph.nodes
                .filter((n: any) => n.type === 'Claim')
                .map((claim: any) => (
                  <div
                    key={claim.id}
                    onClick={() => traceClaim(claim.id)}
                    className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-cyan-300 font-bold">{claim.id}</span>
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        claim.confidence === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {claim.confidence}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200">{claim.statement}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Lineage Trace Result Panel */}
          <div className="lg:col-span-2 p-6 rounded-xl glass-panel space-y-4">
            <h3 className="text-xs font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2 font-mono">
              <GitBranch className="w-4 h-4 text-purple-400" /> EVIDENCE LINEAGE TRACE INSPECTOR
            </h3>

            {traceResult ? (
              <div className="p-5 rounded-xl bg-slate-950 border border-purple-500/30 space-y-4 text-xs font-mono">
                <div>
                  <span className="text-purple-400 font-bold uppercase text-[10px]">1. TARGET CLAIM</span>
                  <h4 className="text-sm font-bold text-white mt-1">{traceResult.claim_data?.statement}</h4>
                </div>

                <div>
                  <span className="text-cyan-400 font-bold uppercase text-[10px]">2. SUPPORTING OBSERVATIONS</span>
                  <div className="mt-1 space-y-1">
                    {traceResult.supporting_observations.map((obs: any, i: number) => (
                      <div key={i} className="p-2.5 bg-slate-900 rounded border border-slate-800 text-slate-200">
                        • {obs.text} ({obs.timestamp})
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-emerald-400 font-bold uppercase text-[10px]">3. PRODUCING SOURCES</span>
                  <div className="mt-1 space-y-1">
                    {traceResult.supporting_sources.map((src: any, i: number) => (
                      <div key={i} className="p-2.5 bg-slate-900 rounded border border-slate-800 text-slate-200 flex justify-between">
                        <span>• {src.name} ({src.category})</span>
                        <span className="text-emerald-400">Reliability: {(src.reliability * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                Click any Claim node on the left to trace its evidence lineage chain.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
