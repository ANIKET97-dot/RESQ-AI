import React, { useState } from 'react';
import { Search, Sparkles, AlertTriangle, Clock, GitBranch, ShieldCheck, FileText } from 'lucide-react';
import { VoiceInputButton } from '../components/VoiceInputButton';
import { executeResearchQuery } from '../services/api';
import type { QueryResearchResponse } from '../types';

export const ResearchPage: React.FC = () => {
  const [query, setQuery] = useState('Find safe shelters near flooded Mission district and verify route accessibility from SF General Hospital');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<QueryResearchResponse | null>(null);

  const handleSearch = async (queryToRun?: string) => {
    const q = queryToRun || query;
    if (!q.trim()) return;
    setLoading(true);
    try {
      const data = await executeResearchQuery(q);
      setResponse(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono">
          <Sparkles className="w-6 h-6 text-cyan-400" /> AI EMERGENCY RESEARCH WORKSPACE
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Evidence-grounded multi-agent RAG reasoning engine with query decomposition, temporal verification, and contradiction detection.
        </p>
      </div>

      {/* Query Bar */}
      <div className="p-4 rounded-xl glass-panel space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Ask RESQAI a complex emergency question..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans shadow-inner"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <VoiceInputButton onSpeechResult={(txt) => { setQuery(txt); handleSearch(txt); }} />
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-md shadow-cyan-500/20 hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Analyzing Evidence...' : 'Execute Research'}
            </button>
          </div>
        </div>

        {/* Quick Sample Queries */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
          <span className="font-semibold text-slate-500">Preset Queries:</span>
          {[
            'Find safe shelters near flooded region',
            'Is Mission Street blocked right now?',
            'Which hospitals have open ICU beds?',
            'What is the current rainfall risk?'
          ].map((sample) => (
            <button
              key={sample}
              onClick={() => { setQuery(sample); handleSearch(sample); }}
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800 text-[11px] transition-all"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State Skeleton */}
      {loading && (
        <div className="p-8 rounded-xl glass-panel text-center space-y-4 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/40 mx-auto flex items-center justify-center text-cyan-400">
            <GitBranch className="w-6 h-6 animate-spin" />
          </div>
          <p className="text-sm text-slate-300 font-semibold">Decomposing Query & Executing Specialized Agents...</p>
          <div className="max-w-md mx-auto space-y-2">
            <div className="h-3 bg-slate-800 rounded"></div>
            <div className="h-3 bg-slate-800 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      )}

      {/* Response Display */}
      {response && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Synthesized Answer & Citations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Synthesized Answer Box */}
            <div className="p-6 rounded-xl glass-panel border border-cyan-500/30 bg-slate-950/90 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-extrabold uppercase text-cyan-400 flex items-center gap-2 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> AI EVIDENCE SYNTHESIS
                </span>
                <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 font-semibold">
                  {response.confidence_indicator}
                </span>
              </div>

              <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-line font-sans">
                {response.synthesized_answer}
              </div>

              <div className="pt-2 text-[11px] text-slate-400 flex justify-between">
                <span>Retrieval Latency: <strong className="text-cyan-400">{response.retrieval_latency_ms} ms</strong></span>
                <span>Total Multi-Agent Latency: <strong className="text-cyan-400">{response.total_latency_ms} ms</strong></span>
              </div>
            </div>

            {/* Contradiction Detection Banner */}
            {response.contradictions.length > 0 && (
              <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/40 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  CONFLICTING EMERGENCY REPORTS DETECTED
                </div>
                {response.contradictions.map((c, idx) => (
                  <div key={idx} className="bg-slate-900/90 p-3.5 rounded-lg border border-slate-800 text-xs space-y-2">
                    <p className="text-slate-200 font-medium">{c.conflict_summary}</p>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                      <div>
                        <span className="text-amber-400 font-semibold">Report A ({c.source_a} · {c.timestamp_a}):</span>
                        <p className="text-slate-300 mt-0.5">{c.claim_a}</p>
                      </div>
                      <div>
                        <span className="text-amber-400 font-semibold">Report B ({c.source_b} · {c.timestamp_b}):</span>
                        <p className="text-slate-300 mt-0.5">{c.claim_b}</p>
                      </div>
                    </div>
                    <div className="text-[11px] text-emerald-400 bg-emerald-500/10 p-2 rounded border border-emerald-500/20 font-medium">
                      💡 <strong>Resolution:</strong> {c.resolution_suggestion}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Citations Grid */}
            <div className="p-5 rounded-xl glass-panel space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2 font-mono">
                <FileText className="w-4 h-4 text-cyan-400" /> VERIFIED EVIDENCE CITATIONS ({response.citations.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {response.citations.map((cit) => (
                  <div key={cit.id} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono font-bold text-cyan-400">{cit.id} {cit.agency}</span>
                      <span className="text-slate-500">{cit.published_at.split('T')[1]}</span>
                    </div>
                    <h5 className="font-semibold text-slate-100 text-xs">{cit.title}</h5>
                    <p className="text-slate-400 text-[11px] italic">"{cit.snippet}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Query Decomposition Execution Plan & Timeline */}
          <div className="space-y-6">
            {/* Query Decomposition Plan Tree */}
            <div className="p-5 rounded-xl glass-panel space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2 font-mono">
                <GitBranch className="w-4 h-4 text-cyan-400" /> QUERY DECOMPOSITION EXECUTION PLAN
              </h4>
              <div className="space-y-2">
                {response.decomposed_steps.map((step) => (
                  <div key={step.step_id} className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-xs flex items-start gap-2.5">
                    <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded shrink-0">
                      {step.step_id}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-200 text-xs">{step.action}</p>
                      <span className="text-[10px] text-slate-500 font-mono">Agent: {step.target_agent} ({step.tool})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="p-5 rounded-xl glass-panel space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2 font-mono">
                <Clock className="w-4 h-4 text-blue-400" /> INCIDENT TIMELINE
              </h4>
              <div className="relative border-l-2 border-slate-800 ml-3 space-y-4 text-xs py-1">
                {response.timeline.map((item, idx) => (
                  <div key={idx} className="ml-4 relative">
                    <span className="absolute -left-[23px] top-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-slate-950"></span>
                    <span className="font-mono text-[11px] font-bold text-cyan-300">{item.time} UTC</span>
                    <p className="text-slate-300 mt-0.5 text-xs">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
