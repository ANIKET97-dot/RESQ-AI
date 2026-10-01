from typing import Dict, Any, List
from datetime import datetime
from backend.db.database import db
from backend.risk.risk_engine import risk_engine
from backend.rag.contradiction import contradiction_detector
from backend.models.schemas import SituationReport

class SituationReportGenerator:
    """
    Generates evidence-grounded AI Disaster Situation Reports following standardized emergency operations formats.
    """
    def __init__(self):
        pass

    def generate_report(self, region_name: str = "San Francisco Bay Area Metro") -> SituationReport:
        disasters = db.get_disasters()
        primary_disaster = disasters[0] if disasters else {"name": "General Disaster Event"}
        
        weather = db.get_weather()
        shelters = db.get_shelters()
        hospitals = db.get_hospitals()
        roads = db.get_roads()
        sensors = db.get_sensors()
        incidents = db.get_incidents()
        documents = db.get_documents()
        
        risk_res = risk_engine.evaluate_risk(region_name)
        contradictions = contradiction_detector.detect_contradictions(documents, roads, shelters)

        # Build structured sections
        current_cond = f"Atmospheric river event producing sustained precipitation of {weather.get('rainfall_mm')}mm. Wind speeds recorded at {weather.get('wind_speed_kmh')} km/h ({weather.get('wind_direction')}). Risk Level evaluated as {risk_res['overall_risk_level']} (Score: {risk_res['risk_score']}/100)."

        affected_areas = [
            "Mission District (Heavy urban flash flooding & storm drain overflow)",
            "Embarcadero Waterfront (High tide surge compound risk)",
            "North Bay Ridge Corridor (Wildfire & smoke aerosol dispersion)"
        ]

        # Infrastructure
        blocked_r = [r for r in roads if r.get("status") in ["Blocked", "Flooded"]]
        road_summary = f"{len(blocked_r)} major road closures identified. " + "; ".join([f"{r['road_name']} ({r['status']}: {r.get('reason','')})" for r in blocked_r])

        # Shelters
        open_shl = [s for s in shelters if s.get("status") in ["Open", "Near Capacity"]]
        shelters_summary = f"{len(open_shl)} active shelters operating. " + "; ".join([f"{s['name']}: {s['current_occupancy']}/{s['capacity']} capacity ({s['status']})" for s in open_shl])

        # Hospitals
        hosp_summary = "; ".join([f"{h['name']}: Status {h['status']} with {h['available_beds']} open beds and {h['icu_available']} ICU beds. Access: {h['accessibility']}" for h in hospitals])

        # Sensors
        anomaly_sensors = [s for s in sensors if s.get("status") == "Anomaly"]
        sensor_summary = f"{len(anomaly_sensors)} gauge anomalies recorded. " + "; ".join([f"{s['location_name']}: {s['current_value']} {s['unit']} (Threshold: {s['threshold']})" for s in anomaly_sensors])

        # Updates
        recent_updates = [
            f"[{inc.get('created_at', '22:15')}] {inc.get('location_name')}: {inc.get('description')} ({inc.get('verification_status')})"
            for inc in incidents[:3]
        ]

        # Conflicts
        conflicts = [
            f"{c.claim_a} vs {c.claim_b} -> {c.resolution_suggestion}"
            for c in contradictions
        ]

        # Citations
        citations = [
            {"source": doc.get("agency"), "title": doc.get("title"), "timestamp": doc.get("published_at"), "url": doc.get("source_url")}
            for doc in documents
        ]

        return SituationReport(
            report_id=f"SITREP-{datetime.utcnow().strftime('%Y%m%d-%H%M')}",
            generated_at=datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC"),
            incident_name=primary_disaster.get("name", "Bay Area Flood"),
            location=region_name,
            summary=f"OFFICIAL SITUATION REPORT: {primary_disaster.get('name')} active in {region_name}. Multi-agency response deployed under unified command.",
            current_conditions=current_cond,
            affected_areas=affected_areas,
            infrastructure_road_status=road_summary,
            shelters_summary=shelters_summary,
            hospitals_summary=hosp_summary,
            weather_summary=weather.get("forecast_summary", "Rainfall ongoing"),
            sensor_observations=sensor_summary,
            recent_updates=recent_updates,
            conflicting_information=conflicts,
            unverified_reports=["Citizen video upload of embankment crack along Telegraph Hill — Preliminary AI verification underway."],
            risk_indicators=risk_res["contributing_signals"],
            citations=citations
        )

report_generator = SituationReportGenerator()
