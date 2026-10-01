import React, { useState } from 'react';
import { AlertCircle, Plus, Camera, MapPin } from 'lucide-react';
import type { IncidentReport } from '../types';

interface IncidentsPageProps {
  incidents: IncidentReport[];
  onAddIncident: (inc: any) => void;
}

export const IncidentsPage: React.FC<IncidentsPageProps> = ({ incidents, onAddIncident }) => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('Flood');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('16th & Valencia St');
  const [severity, setSeverity] = useState('Critical');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddIncident({ category, description, location_name: locationName, severity });
    setShowModal(false);
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono">
            <AlertCircle className="w-6 h-6 text-pink-400" /> INCIDENT REPORTING FEED
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time citizen & field officer incident reports with preliminary AI vision validation.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-pink-600 text-white text-xs font-bold shadow-md hover:bg-pink-500 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Report New Incident
        </button>
      </div>

      {/* Incidents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {incidents.map((inc) => (
          <div key={inc.id} className="p-4 rounded-xl glass-card space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              {inc.image_url && (
                <div className="h-40 rounded-lg overflow-hidden relative">
                  <img src={inc.image_url} alt={inc.category} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-pink-400 border border-pink-500/30">
                    📍 {inc.category}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-100 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" /> {inc.location_name}
                </span>
                <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded border border-red-500/30">
                  {inc.severity}
                </span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-3">{inc.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Source: {inc.source_type}</span>
              <span className="text-emerald-400 font-medium">✓ {inc.verification_status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Report Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 text-slate-100 shadow-2xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-pink-400" /> Submit Incident Report
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200"
                >
                  <option value="Flood">Flood & Water Surge</option>
                  <option value="Wildfire">Wildfire & Smoke</option>
                  <option value="Obstruction">Road Obstruction / Tree Down</option>
                  <option value="Structural Damage">Structural Damage</option>
                  <option value="Medical Emergency">Medical Rescue</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Location Name</label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Severity</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200"
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Description & Field Evidence</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe trapped vehicles, water depth, or road blockages..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200"
                  required
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-amber-300">
                ⚠️ Note: AI will perform automatic preliminary classification. Certified responders will verify on scene.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-pink-600 text-white font-bold hover:bg-pink-500 shadow-md"
                >
                  Submit Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
