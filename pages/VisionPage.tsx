import React, { useState } from 'react';
import { Eye, Layers, Camera } from 'lucide-react';

export const VisionPage: React.FC = () => {
  const [photoAnalysis, setPhotoAnalysis] = useState<any | null>(null);
  const [satelliteAnalysis, setSatelliteAnalysis] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeSamplePhoto = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/vision/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: 'sample.jpg', description: 'trapped vehicles in flood water' })
      });
      const data = await res.json();
      setPhotoAnalysis(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const analyzeSatelliteFrame = async () => {
    try {
      const res = await fetch('/api/vision/satellite');
      const data = await res.json();
      setSatelliteAnalysis(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono">
          <Eye className="w-6 h-6 text-purple-400" /> MULTIMODAL COMPUTER VISION & SATELLITE ENGINE
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Automated disaster image damage classification and multi-spectral satellite inundation segmentation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incident Photo Classifier Card */}
        <div className="p-5 rounded-xl glass-panel space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-purple-400" /> Incident Damage Classifier
            </h3>
            <button
              onClick={analyzeSamplePhoto}
              disabled={loading}
              className="px-3.5 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition-all disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Analyze Sample Photo'}
            </button>
          </div>

          <div className="h-44 rounded-lg overflow-hidden relative border border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=800&auto=format&fit=crop"
              alt="Disaster Sample"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-3">
              <span className="text-xs font-mono font-bold text-white bg-slate-900/90 px-2 py-1 rounded border border-slate-700">
                FRAME: SF-FLOOD-MISSION-16TH
              </span>
            </div>
          </div>

          {photoAnalysis && (
            <div className="p-4 bg-slate-900/90 rounded-lg border border-purple-500/30 space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold">
                <span className="text-purple-300">Classification: {photoAnalysis.primary_classification}</span>
                <span className="text-red-400">Severity: {photoAnalysis.severity_assessment}</span>
              </div>
              <p className="text-slate-300">Confidence Score: <strong>{(photoAnalysis.confidence_score * 100).toFixed(0)}%</strong></p>
              <div className="flex flex-wrap gap-1 text-[10px]">
                {photoAnalysis.detected_features.map((feat: string, idx: number) => (
                  <span key={idx} className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    {feat}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-amber-300 pt-1 italic">{photoAnalysis.verification_note}</p>
            </div>
          )}
        </div>

        {/* Satellite Analysis Card */}
        <div className="p-5 rounded-xl glass-panel space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" /> Sentinel-2 Satellite Segmentation
            </h3>
            <button
              onClick={analyzeSatelliteFrame}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-500 transition-all"
            >
              Fetch Satellite Frame
            </button>
          </div>

          <div className="h-44 rounded-lg overflow-hidden relative border border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
              alt="Satellite Imagery"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded text-[10px] font-mono border border-cyan-500/30">
              Copernicus Sentinel-2
            </div>
          </div>

          {satelliteAnalysis && (
            <div className="p-4 bg-slate-900/90 rounded-lg border border-cyan-500/30 space-y-2 text-xs">
              <span className="font-bold text-cyan-300">{satelliteAnalysis.satellite_id}</span>
              <div className="space-y-1">
                {satelliteAnalysis.detected_zones.map((z: any, idx: number) => (
                  <div key={idx} className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between">
                    <span>{z.type} ({z.area_sq_km} sq km)</span>
                    <span className="text-emerald-400 font-bold">{(z.confidence * 100).toFixed(0)}% Conf</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
