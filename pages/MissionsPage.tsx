import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle2, XCircle } from 'lucide-react';

export const MissionsPage: React.FC = () => {
  const [missions, setMissions] = useState<any[]>([]);

  const fetchMissions = async () => {
    try {
      const res = await fetch('/api/missions');
      const data = await res.json();
      setMissions(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const handleAction = async (missionId: string, action: string) => {
    try {
      await fetch('/api/missions/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mission_id: missionId,
          action: action,
          actor: 'Commander J. Miller',
          note: `Action ${action} executed by coordinator`
        })
      });
      fetchMissions();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono">
          <FileText className="w-6 h-6 text-cyan-400" /> MISSION CONTROL & HUMAN-IN-THE-LOOP APPROVAL BOARD
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          HUMAN-IN-THE-LOOP SAFETY GUARANTEE: All high-impact emergency actions require explicit human coordinator review and approval prior to operational dispatch.
        </p>
      </div>

      <div className="space-y-4">
        {missions.map((m) => (
          <div key={m.id} className="p-6 rounded-xl glass-panel border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-300">{m.id}</span>
                  <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded border border-red-500/30">
                    {m.priority}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">{m.task_name}</h3>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                  m.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {m.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-950/80 p-4 rounded-xl border border-slate-900 font-sans">
              <div>
                <span className="text-slate-500 block text-[10px] font-mono">Target Location</span>
                <span className="font-semibold text-slate-200">{m.location}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-mono">Assigned Response Team</span>
                <span className="font-semibold text-slate-200">{m.assigned_team}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-slate-500 block text-[10px] font-mono">Supporting Evidence & Lineage</span>
                <span className="text-slate-300 italic">{m.evidence_summary}</span>
              </div>
            </div>

            {/* Audit Trail */}
            {m.human_approval && (
              <div className="p-3 bg-slate-900 rounded-lg text-xs border border-slate-800 text-emerald-300 font-mono">
                ✓ <strong>Action Logged:</strong> {m.human_approval.action} by {m.human_approval.approver} at {m.human_approval.timestamp} ({m.human_approval.note})
              </div>
            )}

            {/* Human Approval Control Buttons */}
            {m.status === 'PENDING APPROVAL' && (
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
                <span className="text-xs text-slate-400 font-semibold mr-2 font-mono">Human Decision Action:</span>
                <button
                  onClick={() => handleAction(m.id, 'APPROVE')}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Approve Mission
                </button>
                <button
                  onClick={() => handleAction(m.id, 'REJECT')}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white font-bold text-xs hover:bg-red-500 transition-all flex items-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" /> Reject Task
                </button>
                <button
                  onClick={() => handleAction(m.id, 'REQUEST_EVIDENCE')}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700 transition-all"
                >
                  Request More Evidence
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
