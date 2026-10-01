from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class LocationPoint(BaseModel):
    latitude: float
    longitude: float
    name: Optional[str] = None

class DisasterZone(BaseModel):
    id: str
    name: str
    type: str  # Flood, Wildfire, Earthquake, Storm
    severity: str  # Critical, High, Moderate, Low
    latitude: float
    longitude: float
    affected_radius_km: float
    description: str
    status: str  # Active, Containment, Resolved
    created_at: str
    updated_at: str

class Shelter(BaseModel):
    id: str
    name: str
    type: str  # Public Shelter, School Gym, Community Center
    latitude: float
    longitude: float
    capacity: int
    current_occupancy: int
    status: str  # Open, Near Capacity, Full, Closed
    contact: str
    operating_hours: str
    last_updated: str
    source: str
    verification_status: str  # Verified, Pending, Unverified

class Hospital(BaseModel):
    id: str
    name: str
    type: str  # Trauma Center, Regional Hospital, Field Clinic
    latitude: float
    longitude: float
    total_beds: int
    available_beds: int
    icu_available: int
    status: str  # Operational, High Load, Diverting
    contact: str
    accessibility: str  # Clear, Reduced, Blocked
    last_updated: str
    source: str

class RoadSegment(BaseModel):
    id: str
    road_name: str
    start_lat: float
    start_lng: float
    end_lat: float
    end_lng: float
    status: str  # Open, Blocked, Flooded, Damaged, Restricted
    reason: Optional[str] = None
    last_updated: str
    source: str
    verification_status: str

class SensorReading(BaseModel):
    id: str
    sensor_code: str
    sensor_type: str  # water_level, temperature, smoke, pressure, vibration
    latitude: float
    longitude: float
    location_name: str
    current_value: float
    unit: str
    threshold: float
    status: str  # Normal, Warning, Anomaly
    last_updated: str
    historical_series: Optional[List[float]] = None

class IncidentReport(BaseModel):
    id: str
    category: str  # Flood, Fire, Obstruction, Structural Damage, Medical Request
    description: str
    latitude: float
    longitude: float
    location_name: str
    image_url: Optional[str] = None
    source_type: str  # Citizen Report, Field Officer, Sensor Alert
    verification_status: str  # Preliminary, Verified, Flagged
    severity: str  # Critical, High, Moderate, Low
    created_at: str

class WeatherData(BaseModel):
    location_name: str
    temperature_c: float
    humidity_pct: int
    wind_speed_kmh: float
    wind_direction: str
    rainfall_mm: float
    pressure_hpa: float
    forecast_summary: str
    severe_alerts: List[str]
    last_updated: str
    provider: str

class DisasterDocumentChunk(BaseModel):
    chunk_id: str
    doc_id: str
    title: str
    agency: str
    content: str
    location: str
    published_at: str
    valid_from: str
    valid_until: Optional[str] = None
    source_url: str
    verification_status: str
    relevance_score: Optional[float] = None
    bm25_score: Optional[float] = None
    vector_score: Optional[float] = None
    rerank_score: Optional[float] = None

class SourceMetadata(BaseModel):
    source_id: str
    source_name: str
    source_type: str  # Government Agency, Weather API, Citizen Report, Sensor, News
    publication_time: str
    update_time: str
    url: str
    verification_status: str
    corroborating_sources: List[str]

class ContradictionItem(BaseModel):
    claim_a: str
    source_a: str
    timestamp_a: str
    claim_b: str
    source_b: str
    timestamp_b: str
    conflict_summary: str
    resolution_suggestion: str

class RiskAssessment(BaseModel):
    overall_risk_level: str  # CRITICAL, HIGH, MODERATE, LOW
    risk_score: float  # 0.0 to 100.0
    contributing_signals: List[str]
    timestamp: str
    disclaimer: str

class QueryResearchResponse(BaseModel):
    query: str
    decomposed_steps: List[Dict[str, Any]]
    agents_executed: List[str]
    synthesized_answer: str
    citations: List[Dict[str, Any]]
    contradictions: List[ContradictionItem]
    sources_used: List[SourceMetadata]
    map_context: Dict[str, Any]
    timeline: List[Dict[str, Any]]
    confidence_indicator: str
    retrieval_latency_ms: float
    total_latency_ms: float

class SituationReportRequest(BaseModel):
    disaster_id: Optional[str] = None
    region_name: str
    include_sections: Optional[List[str]] = None

class SituationReport(BaseModel):
    report_id: str
    generated_at: str
    incident_name: str
    location: str
    summary: str
    current_conditions: str
    affected_areas: List[str]
    infrastructure_road_status: str
    shelters_summary: str
    hospitals_summary: str
    weather_summary: str
    sensor_observations: str
    recent_updates: List[str]
    conflicting_information: List[str]
    unverified_reports: List[str]
    risk_indicators: List[str]
    citations: List[Dict[str, Any]]

class EvalMetric(BaseModel):
    pipeline_name: str
    recall_at_k: float
    precision_at_k: float
    mrr: float
    context_relevance: float
    faithfulness: float
    retrieval_latency_ms: float
    generation_latency_ms: float

class ObservabilityLog(BaseModel):
    query_id: str
    timestamp: str
    query_text: str
    category: str
    tools_called: List[str]
    retrieval_latency_ms: float
    rerank_latency_ms: float
    llm_latency_ms: float
    tokens_used: int
    cache_hit: bool
    status: str
