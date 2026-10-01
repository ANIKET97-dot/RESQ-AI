import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.rag.hybrid import hybrid_retriever
from backend.rag.temporal import temporal_validator
from backend.rag.contradiction import contradiction_detector
from backend.gis.routing import route_engine
from backend.risk.risk_engine import risk_engine
from backend.agents.orchestrator import orchestrator

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["app"] == "RESQAI"
    assert data["demo_mode"] is True

def test_disasters_endpoint():
    response = client.get("/api/disasters")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert "name" in data[0]

def test_shelters_endpoint():
    response = client.get("/api/shelters")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1

def test_hospitals_endpoint():
    response = client.get("/api/hospitals")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1

def test_roads_endpoint():
    response = client.get("/api/roads")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1

def test_routing_engine():
    route = route_engine.calculate_viable_route(
        start_lat=37.7558, start_lng=-122.4053,
        end_lat=37.7793, end_lng=-122.4184,
        origin_name="SF General Hospital",
        destination_name="Civic Center Shelter"
    )
    assert route["detour_applied"] is True
    assert len(route["waypoints"]) == 3
    assert "CAUTION" in route["caveat"]

def test_risk_engine():
    risk = risk_engine.evaluate_risk("Mission District Basin")
    assert risk["overall_risk_level"] in ["CRITICAL", "HIGH", "MODERATE", "LOW"]
    assert 0 <= risk["risk_score"] <= 100
    assert len(risk["contributing_signals"]) > 0

def test_research_query():
    response = client.post(
        "/api/research/query",
        json={"query": "Find shelters near flooded area and safe hospital route"}
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data["decomposed_steps"]) > 0
    assert len(data["citations"]) > 0
    assert "synthesized_answer" in data

def test_situation_report():
    response = client.post(
        "/api/reports/generate",
        json={"region_name": "San Francisco Bay Metro"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "SITREP-" in data["report_id"]
    assert len(data["affected_areas"]) > 0
