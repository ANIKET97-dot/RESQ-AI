export interface DisasterZone {
  id: string;
  name: string;
  type: string;
  severity: 'Critical' | 'High' | 'Moderate' | 'Low';
  latitude: number;
  longitude: number;
  affected_radius_km: number;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Shelter {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  capacity: number;
  current_occupancy: number;
  status: 'Open' | 'Near Capacity' | 'Full' | 'Closed';
  contact: string;
  operating_hours: string;
  last_updated: string;
  source: string;
  verification_status: string;
  distance_km?: number;
}

export interface Hospital {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  total_beds: number;
  available_beds: number;
  icu_available: number;
  status: 'Operational' | 'High Load' | 'Diverting';
  contact: string;
  accessibility: string;
  last_updated: string;
  source: string;
  distance_km?: number;
}

export interface RoadSegment {
  id: string;
  road_name: string;
  start_lat: number;
  start_lng: number;
  end_lat: number;
  end_lng: number;
  status: 'Open' | 'Blocked' | 'Flooded' | 'Damaged' | 'Restricted';
  reason?: string;
  last_updated: string;
  source: string;
  verification_status: string;
}

export interface SensorReading {
  id: string;
  sensor_code: string;
  sensor_type: string;
  latitude: number;
  longitude: number;
  location_name: string;
  current_value: number;
  unit: string;
  threshold: number;
  status: 'Normal' | 'Warning' | 'Anomaly';
  last_updated: string;
  historical_series?: number[];
  anomaly_analysis?: {
    is_anomaly: boolean;
    z_score: number;
    baseline_mean: number;
    confidence: number;
  };
}

export interface IncidentReport {
  id: string;
  category: string;
  description: string;
  latitude: number;
  longitude: number;
  location_name: string;
  image_url?: string;
  source_type: string;
  verification_status: string;
  severity: string;
  created_at: string;
}

export interface WeatherData {
  location_name: string;
  temperature_c: number;
  humidity_pct: number;
  wind_speed_kmh: number;
  wind_direction: string;
  rainfall_mm: number;
  pressure_hpa: number;
  forecast_summary: string;
  severe_alerts: string[];
  last_updated: string;
  provider: string;
}

export interface QueryResearchResponse {
  query: string;
  decomposed_steps: { step_id: string; action: string; target_agent: string; tool: string }[];
  agents_executed: string[];
  synthesized_answer: string;
  citations: { id: string; agency: string; title: string; published_at: string; url: string; snippet: string }[];
  contradictions: { claim_a: string; source_a: string; timestamp_a: string; claim_b: string; source_b: string; timestamp_b: string; conflict_summary: string; resolution_suggestion: string }[];
  sources_used: { source_id: string; source_name: string; source_type: string; publication_time: string; update_time: string; url: string; verification_status: string; corroborating_sources: string[] }[];
  map_context: any;
  timeline: { time: string; event: string; type: string }[];
  confidence_indicator: string;
  retrieval_latency_ms: number;
  total_latency_ms: number;
}

export interface SituationReport {
  report_id: string;
  generated_at: string;
  incident_name: string;
  location: string;
  summary: string;
  current_conditions: string;
  affected_areas: string[];
  infrastructure_road_status: string;
  shelters_summary: string;
  hospitals_summary: string;
  weather_summary: string;
  sensor_observations: string;
  recent_updates: string[];
  conflicting_information: string[];
  unverified_reports: string[];
  risk_indicators: string[];
  citations: any[];
}

export interface EvalMetric {
  pipeline_name: string;
  recall_at_k: number;
  precision_at_k: number;
  mrr: number;
  context_relevance: number;
  faithfulness: number;
  retrieval_latency_ms: number;
  generation_latency_ms: number;
}
