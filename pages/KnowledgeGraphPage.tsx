import React, { useState, useEffect } from 'react';
import { GitFork, Layers, Database } from 'lucide-react';
import { fetchKnowledgeGraph } from '../services/api';

export const KnowledgeGraphPage: React.FC = () => {
  const [graphData, setGraphData] = useState<any | null>(null);

  useEffect(() => {
    fetchKnowledgeGraph().then(setGraphData).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono">
          <GitFork className="w-6 h-6 text-cyan-400" /> KNOWLEDGE GRAPH & GRAPHRAG EXPLORER
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Relational entity-relationship network connecting Disasters, Shelters, Hospitals, Blocked Roads, Sensors, and Emergency Directives.
        </p>
      </div>

      {graphData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Nodes List */}
          <div className="p-5 rounded-xl glass-panel space-y-3">
            <h3 className="text-xs font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2 font-mono">
              <Database className="w-4 h-4 text-cyan-400" /> GRAPH NODES ({graphData.nodes.length})
            </h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {graphData.nodes.map((node: any) => (
                <div key={node.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between font-mono font-bold text-cyan-300">
                    <span>{node.id}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{node.type}</span>
                  </div>
                  <p className="text-slate-200 font-semibold">{node.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Edges List */}
          <div className="lg:col-span-2 p-5 rounded-xl glass-panel space-y-3">
            <h3 className="text-xs font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2 font-mono">
              <Layers className="w-4 h-4 text-purple-400" /> RELATIONSHIP EDGES ({graphData.edges.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {graphData.edges.map((edge: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono flex items-center justify-between">
                  <span className="text-cyan-300 font-bold">{edge.source}</span>
                  <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-[10px] border border-purple-500/30">
                    --[{edge.relation}]--&gt;
                  </span>
                  <span className="text-emerald-300 font-bold">{edge.target}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
