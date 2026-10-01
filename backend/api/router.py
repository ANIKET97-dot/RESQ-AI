from fastapi import APIRouter, HTTPException, Query, UploadFile, File, Form
from typing import Optional, List, Dict, Any

from backend.db.database import db
from backend.models.schemas import (
    IncidentReport, QueryResearchResponse, SituationReportRequest, 
    SituationReport, RiskAssessment, EvalMetric
)
from backend.agents.orchestrator import orchestrator
from backend.gis.routing import route_engine
from backend.graph.knowledge_graph import knowledge_graph
from backend.evidence.evidence_graph import evidence_graph
from backend.uncertainty.uncertainty_engine import uncertainty_engine
from backend.simulation.sim_engine import sim_engine
from backend.resources.optimizer import resource_optimizer
from backend.missions.mission_control import mission_control
from backend.digital_twin.twin_engine import digital_twin
from backend.memory.experience_rag import experience_rag
from backend.phase.phase_manager import phase_manager
from backend.redteam.tester import redteam_tester
from backend.sensors.simulator import sensor_simulator
from backend.risk.risk_engine import risk_engine
from backend.reports.generator import report_generator
from backend.evaluation.eval_engine import eval_engine
from backend.vision.damage_analyzer import vision_analyzer
from backend.vision.satellite_analyzer import satellite_analyzer

router = APIRouter(prefix="/api")

@router.get("/disasters")
def get_disasters():
    return db.get_disasters()

@router.get("/shelters")
def get_shelters(near_lat: Optional[float] = None, near_lng: Optional[float] = None, radius_km: Optional[float] = None):
    return db.get_shelters(near_lat, near_lng, radius_km)

@router.get("/hospitals")
def get_hospitals(near_lat: Optional[float] = None, near_lng: Optional[float] = None, radius_km: Optional[float] = None):
    return db.get_hospitals(near_lat, near_lng, radius_km)

@router.get("/roads")
def get_roads(status: Optional[str] = None):
    return db.get_roads(status)

@router.get("/sensors")
def get_sensors():
    return sensor_simulator.get_live_sensor_stream()

@router.get("/incidents")
def get_incidents():
    return db.get_incidents()

@router.post("/incidents")
def create_incident(
    category: str = Form("Flood"),
    description: str = Form(""),
    latitude: float = Form(37.7749),
    longitude: float = Form(-122.4194),
    location_name: str = Form("Reported Location"),
    severity: str = Form("Moderate")
):
    inc_data = {
        "category": category,
        "description": description,
        "latitude": latitude,
        "longitude": longitude,
        "location_name": location_name,
        "severity": severity,
        "source_type": "Citizen Report (Mobile Upload)",
        "image_url": "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=800&auto=format&fit=crop"
    }
    return db.add_incident(inc_data)

@router.get("/weather")
def get_weather():
    return db.get_weather()

@router.post("/research/query", response_model=QueryResearchResponse)
def research_query(body: Dict[str, Any]):
    query_text = body.get("query", "Find safe shelters near flooded Mission district")
    near_lat = body.get("latitude", 37.7749)
    near_lng = body.get("longitude", -122.4194)
    return orchestrator.process_query(query_text, near_lat, near_lng)

@router.post("/routing/plan")
def plan_route(body: Dict[str, Any]):
    start_lat = body.get("start_lat", 37.7558)
    start_lng = body.get("start_lng", -122.4053)
    end_lat = body.get("end_lat", 37.7793)
    end_lng = body.get("end_lng", -122.4184)
    origin_name = body.get("origin_name", "SF General Hospital")
    dest_name = body.get("destination_name", "Civic Center Shelter")
    return route_engine.calculate_viable_route(start_lat, start_lng, end_lat, end_lng, origin_name, dest_name)

@router.get("/graph/subgraph")
def get_graph(entity_id: Optional[str] = None):
    if entity_id:
        return knowledge_graph.query_subgraph_by_entity(entity_id)
    return knowledge_graph.get_full_graph_json()

@router.get("/evidence/graph")
def get_evidence_graph():
    return evidence_graph.get_evidence_graph_json()

@router.get("/evidence/trace/{claim_id}")
def trace_claim(claim_id: str):
    return evidence_graph.trace_claim_lineage(claim_id)

@router.post("/uncertainty/evaluate")
def evaluate_uncertainty(body: Dict[str, Any]):
    num_sources = body.get("num_sources", 2)
    has_official_agency = body.get("has_official_agency", True)
    hours_old = body.get("hours_old", 1.5)
    contradiction_present = body.get("contradiction_present", False)
    has_telemetry_sensor = body.get("has_telemetry_sensor", True)
    return uncertainty_engine.evaluate_confidence(num_sources, has_official_agency, hours_old, contradiction_present, has_telemetry_sensor)

@router.post("/simulation/run")
def run_simulation(body: Dict[str, Any]):
    scenario_type = body.get("scenario_type", "road_closure")
    target_entity = body.get("target_entity", "Geary Boulevard Corridor")
    parameter_delta = body.get("parameter_delta", 30.0)
    return sim_engine.run_simulation(scenario_type, target_entity, parameter_delta)

@router.get("/resources/optimize")
def optimize_resources(target_lat: float = 37.7655, target_lng: float = -122.4170, incident_type: str = "Flood"):
    return resource_optimizer.optimize_allocation(target_lat, target_lng, incident_type)

@router.get("/missions")
def get_missions():
    return mission_control.get_missions()

@router.post("/missions/action")
def mission_action(body: Dict[str, Any]):
    mission_id = body.get("mission_id")
    action = body.get("action", "APPROVE") # APPROVE, REJECT, MODIFY, REQUEST_EVIDENCE
    actor = body.get("actor", "Commander J. Miller")
    note = body.get("note", "Approved via Mission Control")
    return mission_control.update_mission_status(mission_id, action, actor, note)

@router.get("/digital_twin/timeline")
def get_digital_twin_timeline():
    return digital_twin.get_timeline_frames()

@router.get("/memory/experience")
def get_similar_experiences(event_type: str = "Flood"):
    return experience_rag.query_similar_experiences(event_type)

@router.get("/phase")
def get_phase():
    return phase_manager.get_phase_info()

@router.post("/phase")
def set_phase(body: Dict[str, Any]):
    phase_name = body.get("phase_name", "RESPONSE")
    return phase_manager.set_phase(phase_name)

@router.get("/redteam/run")
def run_redteam_tests():
    return redteam_tester.run_redteam_suite()

@router.get("/risk/evaluate")
def evaluate_risk(region_name: str = "Mission District Basin"):
    return risk_engine.evaluate_risk(region_name)

@router.post("/reports/generate", response_model=SituationReport)
def generate_situation_report(body: SituationReportRequest):
    return report_generator.generate_report(body.region_name)

@router.get("/evaluation/metrics", response_model=List[EvalMetric])
def get_evaluation_metrics():
    return eval_engine.run_benchmark()

@router.post("/vision/analyze")
def analyze_vision(body: Dict[str, Any]):
    image_url = body.get("image_url", "sample_image.jpg")
    description = body.get("description", "flood damage")
    return vision_analyzer.analyze_incident_image(image_url, description)

@router.get("/vision/satellite")
def analyze_satellite():
    return satellite_analyzer.analyze_satellite_frame()

@router.get("/observability/logs")
def get_observability_logs():
    return [
        {
            "query_id": "QR-9012",
            "timestamp": "2026-10-01 22:38:12",
            "query_text": "Find shelters within 5 km of flooded region and calculate safe hospital route",
            "category": "Complex Multi-Agent Geospatial RAG",
            "tools_called": ["get_disaster_zones", "get_nearby_shelters", "get_nearby_hospitals", "calculate_route", "search_disaster_reports"],
            "retrieval_latency_ms": 28.4,
            "rerank_latency_ms": 14.1,
            "llm_latency_ms": 312.0,
            "tokens_used": 1420,
            "cache_hit": False,
            "status": "Success"
        }
    ]
