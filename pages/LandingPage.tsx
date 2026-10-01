import React from 'react';
import { Shield, Activity, Map, Search, Cpu, Database, Eye, ChevronRight, ArrowRight, AlertCircle } from 'lucide-react';
import { DisasterMap } from '../components/DisasterMap';

interface LandingPageProps {
  onLaunchCommandCenter: () => void;
  onExploreDemo: () => void;
  disasters: any[];
  shelters: any[];
  hospitals: any[];
  roads: any[];
  sensors: any[];
  incidents: any[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchCommandCenter,
  onExploreDemo,
  disasters,
  shelters,
  hospitals,
  roads,
  sensors,
  incidents
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          NEXT-GEN DISASTER INTELLIGENCE PLATFORM
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          AI-Powered <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Disaster Intelligence</span> & Decision Support
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal">
          Unify real-time data, geospatial intelligence, emergency agency reports, and AI-powered analysis into one evidence-grounded platform.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={onLaunchCommandCenter}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/25 hover:brightness-110 transition-all flex items-center gap-2"
          >
            Launch Command Center <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={onExploreDemo}
            className="px-8 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            Explore Interactive Demo
          </button>
        </div>

        {/* Hero Interactive Map Visualization */}
        <div className="mt-14 max-w-5xl mx-auto text-left">
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" /> LIVE INTELLIGENCE PREVIEW STREAM
            </span>
            <span className="text-xs text-emerald-400 font-mono">100% EVIDENCE GROUNDED</span>
          </div>
          <DisasterMap
            disasters={disasters}
            shelters={shelters}
            hospitals={hospitals}
            roads={roads}
            sensors={sensors}
            incidents={incidents}
            height="480px"
          />
        </div>
      </section>

      {/* Section 1: Problem */}
      <section className="py-16 bg-slate-900/50 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white">The Fragmented Disaster Data Problem</h2>
            <p className="mt-3 text-slate-400">
              During floods, wildfires, and earthquakes, critical emergency information is scattered across hundreds of disconnected channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl glass-card">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Fragmented Sources</h3>
              <p className="text-sm text-slate-400">
                Government bulletins, weather APIs, transit updates, news reports, and citizen tweets exist in silos without unified synthesis.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mb-4">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Stale vs Live Info</h3>
              <p className="text-sm text-slate-400">
                Deciding which road closure or shelter capacity report supersedes another is difficult under time pressure.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">RESQAI Solution</h3>
              <p className="text-sm text-slate-400">
                Aggregates real-time streams, applies hybrid vector search, knowledge graph traversal, and ML risk estimation into one interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Architecture Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white">Full-Stack AI/ML Architecture</h2>
          <p className="mt-3 text-slate-400">
            Powered by modern Agentic AI, Hybrid RAG, GraphRAG, Geospatial GIS, and Computer Vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl glass-card glass-card-hover">
            <Cpu className="w-8 h-8 text-cyan-400 mb-3" />
            <h4 className="font-bold text-white text-base">Agentic Orchestration</h4>
            <p className="text-xs text-slate-400 mt-2">
              Query decomposer breaks complex tasks into subtasks routed to specialized agents (Weather, GIS, RAG, Risk).
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card glass-card-hover">
            <Search className="w-8 h-8 text-blue-400 mb-3" />
            <h4 className="font-bold text-white text-base">Hybrid RAG + Reranking</h4>
            <p className="text-xs text-slate-400 mt-2">
              Combines Vector similarity + BM25 keyword matching with cross-encoder style reranking and recency weighting.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card glass-card-hover">
            <Map className="w-8 h-8 text-emerald-400 mb-3" />
            <h4 className="font-bold text-white text-base">Geospatial GIS Engine</h4>
            <p className="text-xs text-slate-400 mt-2">
              Spatial radius queries, bounding box search, and route calculation that bypasses blocked or flooded roads.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card glass-card-hover">
            <Eye className="w-8 h-8 text-purple-400 mb-3" />
            <h4 className="font-bold text-white text-base">Multimodal Vision & IoT</h4>
            <p className="text-xs text-slate-400 mt-2">
              Incident photo damage classifier, satellite inundation segmenter, and ML anomaly detection on stream gauges.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 text-center px-4">
        <h3 className="text-2xl font-bold text-white">Ready to Explore RESQAI Command Center?</h3>
        <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
          Test the interactive disaster map, run RAG research queries, generate situation reports, and inspect AI observability metrics.
        </p>
        <button
          onClick={onLaunchCommandCenter}
          className="mt-6 px-8 py-3 rounded-xl bg-cyan-500 text-white font-bold shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all inline-flex items-center gap-2"
        >
          Enter Command Center Dashboard <ChevronRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
