import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { CommandCenter } from './pages/CommandCenter';
import { DisasterMap } from './components/DisasterMap';
import { ResearchPage } from './pages/ResearchPage';
import { IncidentsPage } from './pages/IncidentsPage';
import { SheltersPage } from './pages/SheltersPage';
import { HospitalsPage } from './pages/HospitalsPage';
import { RoadsPage } from './pages/RoadsPage';
import { WeatherPage } from './pages/WeatherPage';
import { VisionPage } from './pages/VisionPage';
import { RiskPage } from './pages/RiskPage';
import { KnowledgeGraphPage } from './pages/KnowledgeGraphPage';
import { SituationReportPage } from './pages/SituationReportPage';
import { DataSourcesPage } from './pages/DataSourcesPage';
import { EvaluationPage } from './pages/EvaluationPage';
import { ObservabilityPage } from './pages/ObservabilityPage';
import { MobileEmergencyPage } from './pages/MobileEmergencyPage';
import { EvidenceGraphPage } from './pages/EvidenceGraphPage';
import { DigitalTwinPage } from './pages/DigitalTwinPage';
import { MissionsPage } from './pages/MissionsPage';
import { SimulationPage } from './pages/SimulationPage';
import { SettingsPage } from './pages/SettingsPage';

import {
  fetchDisasters, fetchShelters, fetchHospitals, fetchRoads,
  fetchSensors, fetchIncidents, fetchWeather
} from './services/api';
import type { DisasterZone, Shelter, Hospital, RoadSegment, SensorReading, IncidentReport, WeatherData } from './types';

export function App() {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [isMobileMode, setIsMobileMode] = useState<boolean>(false);

  const [disasters, setDisasters] = useState<DisasterZone[]>([]);
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [roads, setRoads] = useState<RoadSegment[]>([]);
  const [sensors, setSensors] = useState<SensorReading[]>([]);
  const [incidents, setIncidents] = useState<IncidentReport[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetchDisasters().then(setDisasters).catch(console.error);
    fetchShelters().then(setShelters).catch(console.error);
    fetchHospitals().then(setHospitals).catch(console.error);
    fetchRoads().then(setRoads).catch(console.error);
    fetchSensors().then(setSensors).catch(console.error);
    fetchIncidents().then(setIncidents).catch(console.error);
    fetchWeather().then(setWeather).catch(console.error);
  }, []);

  const handleAddIncident = (newIncData: any) => {
    const newInc: IncidentReport = {
      id: `INC-${incidents.length + 501}`,
      category: newIncData.category,
      description: newIncData.description,
      latitude: 37.7655 + (Math.random() - 0.5) * 0.01,
      longitude: -122.4170 + (Math.random() - 0.5) * 0.01,
      location_name: newIncData.location_name,
      source_type: 'Citizen Mobile Upload',
      verification_status: 'Preliminary AI Assessment',
      severity: newIncData.severity || 'Moderate',
      created_at: new Date().toISOString()
    };
    setIncidents([newInc, ...incidents]);
  };

  const renderCurrentView = () => {
    if (isMobileMode) {
      return (
        <MobileEmergencyPage
          shelters={shelters}
          hospitals={hospitals}
          onNavigate={setCurrentView}
        />
      );
    }

    switch (currentView) {
      case 'landing':
        return (
          <LandingPage
            onLaunchCommandCenter={() => setCurrentView('dashboard')}
            onExploreDemo={() => setCurrentView('map')}
            disasters={disasters}
            shelters={shelters}
            hospitals={hospitals}
            roads={roads}
            sensors={sensors}
            incidents={incidents}
          />
        );
      case 'dashboard':
      case 'command-center':
        return (
          <CommandCenter
            disasters={disasters}
            shelters={shelters}
            hospitals={hospitals}
            roads={roads}
            sensors={sensors}
            incidents={incidents}
            weather={weather}
            onNavigate={setCurrentView}
          />
        );
      case 'incidents':
        return <IncidentsPage incidents={incidents} onAddIncident={handleAddIncident} />;
      case 'map':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white font-mono">LIVE GIS INTERACTIVE EMERGENCY MAP</h2>
            <DisasterMap
              disasters={disasters}
              shelters={shelters}
              hospitals={hospitals}
              roads={roads}
              sensors={sensors}
              incidents={incidents}
              height="650px"
            />
          </div>
        );
      case 'research':
        return <ResearchPage />;
      case 'evidence':
        return <EvidenceGraphPage />;
      case 'timeline':
        return <DigitalTwinPage />;
      case 'satellite':
      case 'vision':
        return <VisionPage />;
      case 'sensors':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-mono">📡 IOT SENSOR FUSION TELEMETRY STREAM</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sensors.map((s) => (
                <div key={s.id} className="p-4 rounded-xl glass-card space-y-2 text-xs">
                  <div className="flex justify-between font-mono">
                    <span className="text-cyan-300 font-bold">{s.sensor_code}</span>
                    <span className={`px-2 py-0.5 rounded font-bold ${s.status === 'Anomaly' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {s.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{s.location_name}</h4>
                  <p className="text-slate-200">Reading: <strong className="text-cyan-300">{s.current_value} {s.unit}</strong> (Threshold: {s.threshold})</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'resources':
      case 'shelters':
        return <SheltersPage shelters={shelters} />;
      case 'hospitals':
        return <HospitalsPage hospitals={hospitals} />;
      case 'roads':
        return <RoadsPage roads={roads} />;
      case 'weather':
        return <WeatherPage weather={weather} />;
      case 'risk':
        return <RiskPage />;
      case 'missions':
        return <MissionsPage />;
      case 'simulation':
        return <SimulationPage />;
      case 'knowledge-graph':
      case 'graph':
        return <KnowledgeGraphPage />;
      case 'reports':
        return <SituationReportPage />;
      case 'sources':
        return <DataSourcesPage />;
      case 'evaluation':
      case 'eval':
        return <EvaluationPage />;
      case 'observability':
        return <ObservabilityPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <CommandCenter
            disasters={disasters}
            shelters={shelters}
            hospitals={hospitals}
            roads={roads}
            sensors={sensors}
            incidents={incidents}
            weather={weather}
            onNavigate={setCurrentView}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 flex flex-col">
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        isMobileMode={isMobileMode}
        setIsMobileMode={setIsMobileMode}
      />

      {currentView === 'landing' && !isMobileMode ? (
        renderCurrentView()
      ) : (
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          {!isMobileMode && (
            <Sidebar activeView={currentView} onSelectView={setCurrentView} />
          )}
          <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
            {renderCurrentView()}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
