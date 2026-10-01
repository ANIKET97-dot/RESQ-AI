import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

export const ObservabilityPage: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/observability/logs')
      .then((res) => res.json())
      .then(setLogs)
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono">
          <Terminal className="w-6 h-6 text-cyan-400" /> AI OBSERVABILITY & DEVELOPER LATENCY TRACE
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Detailed query traces, tool invocations, token counts, cache hits, and latency breakdowns.
        </p>
      </div>

      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log.query_id} className="p-5 rounded-xl glass-panel space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold">{log.query_id} • {log.category}</span>
              <span className="text-emerald-400 font-bold">STATUS: {log.status}</span>
            </div>

            <p className="text-slate-200 font-sans text-sm">"{log.query_text}"</p>

            <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 pt-1">
              <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                Retrieval: <strong className="text-cyan-300">{log.retrieval_latency_ms} ms</strong>
              </span>
              <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                Rerank: <strong className="text-cyan-300">{log.rerank_latency_ms} ms</strong>
              </span>
              <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                LLM Synthesis: <strong className="text-cyan-300">{log.llm_latency_ms} ms</strong>
              </span>
              <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                Tokens: <strong className="text-emerald-300">{log.tokens_used}</strong>
              </span>
              <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                Cache Hit: <strong className="text-amber-300">{log.cache_hit ? 'YES' : 'NO'}</strong>
              </span>
            </div>

            <div className="pt-2 text-[11px] text-slate-400">
              <span className="text-slate-500 font-bold">Tools Invoked:</span> {log.tools_called.join(' → ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
