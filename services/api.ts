import type {
  DisasterZone, Shelter, Hospital, RoadSegment, SensorReading,
  IncidentReport, WeatherData, QueryResearchResponse, SituationReport, EvalMetric
} from '../types';

const API_BASE = '/api';

export const fetchDisasters = async (): Promise<DisasterZone[]> => {
  try {
    const res = await fetch(`${API_BASE}/disasters`);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (e) {
    return [
      {
        id: 'DIS-001',
        name: 'Bay Area Coastal Surge & Flash Flood',
        type: 'Flood',
        severity: 'Critical',
        latitude: 37.7749,
        longitude: -122.4194,
        affected_radius_km: 12.5,
        description: 'Atmospheric river event causing rapid urban flooding along lower Mission District.',
        status: 'Active',
        created_at: '2026-10-01T08:00:00Z',
        updated_at: '2026-10-01T22:30:00Z'
      }
    ];
  }
};

export const fetchShelters = async (): Promise<Shelter[]> => {
  try {
    const res = await fetch(`${API_BASE}/shelters`);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (e) {
    return [
      {
        id: 'SHL-101',
        name: 'Civic Center Emergency Shelter',
        type: 'Public Shelter',
        latitude: 37.7793,
        longitude: -122.4184,
        capacity: 500,
        current_occupancy: 320,
        status: 'Open',
        contact: '+1 (415) 555-0199',
        operating_hours: '24/7 Active',
        last_updated: '2026-10-01T22:15:00Z',
        source: 'SF Department of Emergency Management',
        verification_status: 'Verified'
      },
      {
        id: 'SHL-102',
        name: 'Mission High School Evacuation Center',
        type: 'School Gym',
        latitude: 37.7615,
        longitude: -122.4278,
        capacity: 300,
        current_occupancy: 285,
        status: 'Near Capacity',
        contact: '+1 (415) 555-0144',
        operating_hours: '24/7 Active',
        last_updated: '2026-10-01T22:00:00Z',
        source: 'Red Cross Bay Area',
        verification_status: 'Verified'
      }
    ];
  }
};

export const fetchHospitals = async (): Promise<Hospital[]> => {
  try {
    const res = await fetch(`${API_BASE}/hospitals`);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (e) {
    return [
      {
        id: 'HSP-201',
        name: 'Zuckerberg SF General Trauma Center',
        type: 'Trauma Center',
        latitude: 37.7558,
        longitude: -122.4053,
        total_beds: 400,
        available_beds: 42,
        icu_available: 6,
        status: 'High Load',
        contact: '+1 (415) 206-8000',
        accessibility: 'Reduced - Potrero Ave flooded',
        last_updated: '2026-10-01T22:30:00Z',
        source: 'Hospital Emergency Command'
      },
      {
        id: 'HSP-202',
        name: 'UCSF Medical Center at Parnassus',
        type: 'Regional Medical Center',
        latitude: 37.7631,
        longitude: -122.4578,
        total_beds: 600,
        available_beds: 115,
        icu_available: 18,
        status: 'Operational',
        contact: '+1 (415) 476-1000',
        accessibility: 'Clear via 9th Avenue',
        last_updated: '2026-10-01T22:25:00Z',
        source: 'UCSF Operations Center'
      }
    ];
  }
};

export const fetchRoads = async (): Promise<RoadSegment[]> => {
  try {
    const res = await fetch(`${API_BASE}/roads`);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (e) {
    return [
      {
        id: 'RD-301',
        road_name: 'Mission Street (14th St to 18th St)',
        start_lat: 37.7680,
        start_lng: -122.4190,
        end_lat: 37.7620,
        end_lng: -122.4195,
        status: 'Flooded',
        reason: '1.2m standing water due to storm drain overflow',
        last_updated: '2026-10-01T22:20:00Z',
        source: 'SF Police Dept / Traffic Watch',
        verification_status: 'Verified'
      }
    ];
  }
};

export const fetchSensors = async (): Promise<SensorReading[]> => {
  try {
    const res = await fetch(`${API_BASE}/sensors`);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (e) {
    return [
      {
        id: 'SNS-401',
        sensor_code: 'HYD-MSN-04',
        sensor_type: 'water_level',
        latitude: 37.7650,
        longitude: -122.4185,
        location_name: 'Mission Creek Basin Gauge #4',
        current_value: 3.42,
        unit: 'meters',
        threshold: 2.50,
        status: 'Anomaly',
        last_updated: '2026-10-01T22:35:00Z'
      }
    ];
  }
};

export const fetchIncidents = async (): Promise<IncidentReport[]> => {
  try {
    const res = await fetch(`${API_BASE}/incidents`);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (e) {
    return [
      {
        id: 'INC-501',
        category: 'Flood',
        description: 'Flash flooding overflowing sidewalks into underground parking.',
        latitude: 37.7655,
        longitude: -122.4170,
        location_name: '16th & Valencia St',
        source_type: 'Citizen Report',
        verification_status: 'Verified',
        severity: 'Critical',
        created_at: '2026-10-01T21:30:00Z'
      }
    ];
  }
};

export const fetchWeather = async (): Promise<WeatherData> => {
  try {
    const res = await fetch(`${API_BASE}/weather`);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (e) {
    return {
      location_name: 'San Francisco Metro Coastal Area',
      temperature_c: 15.2,
      humidity_pct: 94,
      wind_speed_kmh: 48.5,
      wind_direction: 'SSW',
      rainfall_mm: 62.4,
      pressure_hpa: 998.2,
      forecast_summary: 'Atmospheric River system continuing with sustained rainfall through midnight.',
      severe_alerts: ['FLASH FLOOD WARNING in effect until 04:00 AM'],
      last_updated: '2026-10-01T22:35:00Z',
      provider: 'National Weather Service Demo'
    };
  }
};

export const executeResearchQuery = async (query: string): Promise<QueryResearchResponse> => {
  const res = await fetch(`${API_BASE}/research/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  if (!res.ok) throw new Error('Query execution failed');
  return await res.json();
};

export const fetchRiskAssessment = async () => {
  const res = await fetch(`${API_BASE}/risk/evaluate`);
  if (!res.ok) throw new Error('Risk evaluation failed');
  return await res.json();
};

export const generateSitRep = async (regionName: string = 'San Francisco Metro'): Promise<SituationReport> => {
  const res = await fetch(`${API_BASE}/reports/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ region_name: regionName })
  });
  if (!res.ok) throw new Error('Report generation failed');
  return await res.json();
};

export const fetchEvalMetrics = async (): Promise<EvalMetric[]> => {
  const res = await fetch(`${API_BASE}/evaluation/metrics`);
  if (!res.ok) throw new Error('Evaluation fetch failed');
  return await res.json();
};

export const fetchKnowledgeGraph = async () => {
  const res = await fetch(`${API_BASE}/graph/subgraph`);
  if (!res.ok) throw new Error('Graph fetch failed');
  return await res.json();
};
