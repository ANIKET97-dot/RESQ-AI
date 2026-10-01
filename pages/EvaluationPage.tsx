import React, { useState, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { fetchEvalMetrics } from '../services/api';
import type { EvalMetric } from '../types';

export const EvaluationPage: React.FC = () => {
  const [metrics, setMetrics] = useState<EvalMetric[]>([]);

  useEffect(() => {
    fetchEvalMetrics().then(setMetrics).catch(console.error);
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono">
          <BarChart3 className="w-6 h-6 text-emerald-400" /> RAG EVALUATION BENCHMARK DASHBOARD
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Comparative empirical benchmark across Vector Search, BM25, Hybrid Search, Hybrid + Reranker, and GraphRAG.
        </p>
      </div>

      {metrics.length > 0 && (
        <div className="space-y-6">
          {/* Chart Card */}
          <div className="p-6 rounded-xl glass-panel space-y-4">
            <h3 className="text-xs font-bold uppercase text-slate-300 tracking-wider font-mono">
              RETRIEVAL QUALITY METRICS (Recall@K, Precision@K, MRR, Context Relevance, Faithfulness)
            </h3>
            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="pipeline_name" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0.5, 1.0]} stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                  <Bar dataKey="recall_at_k" name="Recall@K" fill="#38bdf8" />
                  <Bar dataKey="precision_at_k" name="Precision@K" fill="#818cf8" />
                  <Bar dataKey="mrr" name="MRR" fill="#34d399" />
                  <Bar dataKey="context_relevance" name="Context Relevance" fill="#f43f5e" />
                  <Bar dataKey="faithfulness" name="Faithfulness" fill="#fbbf24" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table Breakdown */}
          <div className="p-5 rounded-xl glass-panel space-y-3 overflow-x-auto">
            <h4 className="text-xs font-bold uppercase text-slate-300 tracking-wider font-mono">Detailed Benchmark Metrics Table</h4>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="py-2.5 px-3">Pipeline Name</th>
                  <th className="py-2.5 px-3">Recall@K</th>
                  <th className="py-2.5 px-3">Precision@K</th>
                  <th className="py-2.5 px-3">MRR</th>
                  <th className="py-2.5 px-3">Relevance</th>
                  <th className="py-2.5 px-3">Faithfulness</th>
                  <th className="py-2.5 px-3">Retrieval Latency</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((m, idx) => (
                  <tr key={idx} className="border-b border-slate-800/60 hover:bg-slate-900/50">
                    <td className="py-3 px-3 font-semibold text-slate-100">{m.pipeline_name}</td>
                    <td className="py-3 px-3 text-cyan-300 font-mono">{(m.recall_at_k * 100).toFixed(0)}%</td>
                    <td className="py-3 px-3 text-indigo-300 font-mono">{(m.precision_at_k * 100).toFixed(0)}%</td>
                    <td className="py-3 px-3 text-emerald-300 font-mono">{(m.mrr * 100).toFixed(0)}%</td>
                    <td className="py-3 px-3 text-rose-300 font-mono">{(m.context_relevance * 100).toFixed(0)}%</td>
                    <td className="py-3 px-3 text-amber-300 font-mono">{(m.faithfulness * 100).toFixed(0)}%</td>
                    <td className="py-3 px-3 text-slate-400 font-mono">{m.retrieval_latency_ms} ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
