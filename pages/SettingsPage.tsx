import React, { useState, useEffect } from 'react';
import { Sliders } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [phaseInfo, setPhaseInfo] = useState<any | null>(null);
  const [redteamResults, setRedteamResults] = useState<any[]>([]);
  const [testing, setTesting] = useState(false);

  const fetchPhase = async () => {
    try {
      const res = await fetch('/api/phase');
      const data = await res.json();
      setPhaseInfo(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPhase();
  }, []);

  const changePhase = async (phaseName: string) => {
    try {
      const res = await fetch('/api/phase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phase_name: phaseName })
      });
      const data = await res.json();
      setPhaseInfo(data);
    } catch (e) {
      console.error(e);
    }
  };

  const runRedteam = async () => {
    setTesting(true);
    try {
      const res = await fetch('/api/redteam/run');
      const data = await res.json();
      setRedteamResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono">
          <Sliders className="w-6 h-6 text-cyan-400" /> DISASTER PHASE MODEL & RED-TEAM SETTINGS
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Configure active operational disaster phases and execute automated Red-Team adversarial resilience tests.
        </p>
      </div>

      {/* Disaster Phase Selector */}
      {phaseInfo && (
        <div className="p-6 rounded-xl glass-panel space-y-4">
          <h3 className="text-xs font-bold uppercase text-slate-300 tracking-wider font-mono">
            ACTIVE DISASTER OPERATIONS PHASE: <span className="text-cyan-400 font-extrabold">{phaseInfo.current_phase}</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {phaseInfo.available_phases.map((pName: string) => {
              const isActive = phaseInfo.current_phase === pName;
              return (
                <button
                  key={pName}
                  onClick={() => changePhase(pName)}
                  className={`p-3 rounded-xl text-xs font-mono font-bold transition-all text-center ${
                    isActive
                      ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30 border border-cyan-400'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {pName}
                </button>
              );
            })}
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
            <div>Priority Focus: <strong>{phaseInfo.profile?.priority}</strong></div>
            <div>Agent Focus Swarm: <strong>{phaseInfo.profile?.agent_focus?.join(', ')}</strong></div>
          </div>
        </div>
      )}

      {/* Red-Team Failure Testing Suite */}
      <div className="p-6 rounded-xl glass-panel space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase text-slate-300 tracking-wider font-mono">
            RED-TEAM ADVERSARIAL FAILURE SUITE
          </h3>
          <button
            onClick={runRedteam}
            disabled={testing}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-bold shadow-md hover:brightness-110 font-mono transition-all"
          >
            {testing ? 'Running Tests...' : 'Run Red-Team Failure Tests'}
          </button>
        </div>

        {redteamResults.length > 0 && (
          <div className="space-y-2">
            {redteamResults.map((t) => (
              <div key={t.test_id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between font-mono font-bold">
                  <span className="text-cyan-300">{t.test_id} • {t.test_name}</span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    ✓ {t.status} (Resilience: {(t.resilience_score * 100).toFixed(0)}%)
                  </span>
                </div>
                <p className="text-slate-300">{t.description}</p>
                <p className="text-emerald-300 text-[11px]">💡 Result: {t.expected}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
