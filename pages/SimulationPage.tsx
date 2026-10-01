import React, { useState } from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';

export const SimulationPage: React.FC = () => {
  const [scenarioType, setScenarioType] = useState('road_closure');
  const [targetEntity, setTargetEntity] = useState('Geary Boulevard Corridor');
  const [parameterDelta, setParameterDelta] = useState(30.0);
  const [simResult, setSimResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const runSimulation = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/simulation/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario_type: scenarioType,
          target_entity: targetEntity,
          parameter_delta: parameterDelta
        })
      });
      const data = await res.json();
      setSimResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono">
          <Cpu className="w-6 h-6 text-purple-400" /> WHAT-IF COUNTERFACTUAL SCENARIO SIMULATOR
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Evaluates hypothetical structural failures, precipitation surges, and shelter saturations before human operational decision-making.
        </p>
      </div>

      {/* Simulator Controls */}
      <div className="p-5 rounded-xl glass-panel space-y-4">
        <h3 className="text-xs font-bold uppercase text-slate-300 tracking-wider font-mono">Configure Counterfactual Scenario</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Scenario Type</label>
            <select
              value={scenarioType}
              onChange={(e) => setScenarioType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200"
            >
              <option value="road_closure">Road / Bridge Failure ("What if Road X closes?")</option>
              <option value="rainfall_spike">Rainfall Surge ("What if rainfall increases +30%?")</option>
              <option value="shelter_capacity">Shelter Saturation ("What if Shelter X fills?")</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Target Entity / Corridor</label>
            <input
              type="text"
              value={targetEntity}
              onChange={(e) => setTargetEntity(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Parameter Delta (%)</label>
            <input
              type="number"
              value={parameterDelta}
              onChange={(e) => setParameterDelta(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200"
            />
          </div>
        </div>

        <button
          onClick={runSimulation}
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold hover:brightness-110 shadow-md transition-all font-mono"
        >
          {loading ? 'Executing Counterfactual Math...' : 'Run What-If Simulation'}
        </button>
      </div>

      {/* Simulation Result */}
      {simResult && (
        <div className="p-6 rounded-xl glass-panel space-y-5 border border-purple-500/30 bg-slate-950">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-purple-400 uppercase font-mono">{simResult.simulation_id} • {simResult.scenario_name}</span>
            <span className="text-xs text-red-400 font-mono font-bold">Simulated Risk Delta: +{simResult.simulated_outcome.risk_increase} Points</span>
          </div>

          {/* Baseline vs Scenario Metric Cards */}
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-sans font-bold block">BASELINE STATE</span>
              <div className="mt-2 text-xl font-bold text-slate-200">{simResult.baseline.risk_score} / 100 Risk</div>
              <span className="text-[11px] text-slate-400 block mt-1">Level: {simResult.baseline.risk_level}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/40">
              <span className="text-[10px] text-purple-400 uppercase font-sans font-bold block">COUNTERFACTUAL SIMULATED STATE</span>
              <div className="mt-2 text-xl font-bold text-purple-300">{simResult.simulated_outcome.risk_score} / 100 Risk</div>
              <span className="text-[11px] text-red-400 block mt-1 font-bold">Level: {simResult.simulated_outcome.risk_level}</span>
            </div>
          </div>

          {/* New Risks & Affected Entities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px] font-mono">NEWLY EXPOSED RISKS</h4>
              <ul className="space-y-1 text-slate-300">
                {simResult.new_risks.map((r: string, i: number) => <li key={i}>• {r}</li>)}
              </ul>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-cyan-400 uppercase tracking-wider text-[11px] font-mono">AFFECTED ENTITIES</h4>
              <div className="flex flex-wrap gap-1">
                {simResult.affected_entities.map((e: string, i: number) => (
                  <span key={i} className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800 text-slate-200">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Human Review Tasks */}
          <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl space-y-2 text-xs">
            <h4 className="font-bold text-purple-300 uppercase tracking-wider font-mono">RECOMMENDED HUMAN REVIEW TASKS</h4>
            <div className="space-y-1 text-slate-200">
              {simResult.recommended_human_tasks.map((task: string, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-[11px] text-amber-300">
            ⚠️ {simResult.disclaimer}
          </div>
        </div>
      )}
    </div>
  );
};
