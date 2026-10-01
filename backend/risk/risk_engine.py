from typing import List, Dict, Any
from datetime import datetime
from backend.db.database import db
from backend.sensors.simulator import sensor_simulator

class DisasterRiskEngine:
    """
    ML Decision-Support Risk Engine that synthesizes multi-modal signals:
    rainfall, river basin water levels, active sensor anomalies, road blockage density,
    and verified citizen incident reports into a normalized risk score (0-100).
    """
    def __init__(self):
        pass

    def evaluate_risk(self, region_name: str = "Mission District Basin") -> Dict[str, Any]:
        weather = db.get_weather()
        sensors = sensor_simulator.get_live_sensor_stream()
        incidents = db.get_incidents()
        roads = db.get_roads()

        signals: List[str] = []
        score: float = 20.0  # Base risk baseline

        # 1. Weather Signal (Rainfall & Wind)
        rain_mm = weather.get("rainfall_mm", 0.0)
        if rain_mm > 50.0:
            score += 30.0
            signals.append(f"Severe precipitation detected ({rain_mm} mm accumulated)")
        elif rain_mm > 20.0:
            score += 15.0
            signals.append(f"Moderate rainfall detected ({rain_mm} mm accumulated)")

        # 2. Sensor Anomaly Signal
        anomaly_count = sum(1 for s in sensors if s.get("status") == "Anomaly")
        if anomaly_count > 0:
            score += (anomaly_count * 20.0)
            signals.append(f"Critical stream gauge anomaly detected at Mission Creek Basin ({anomaly_count} sensors active)")

        # 3. Incident Density Signal
        critical_incidents = [inc for inc in incidents if inc.get("severity") == "Critical"]
        if critical_incidents:
            score += (len(critical_incidents) * 15.0)
            signals.append(f"Active critical field incident reports ({len(critical_incidents)} verified rescues underway)")

        # 4. Infrastructure Bottleneck Signal
        blocked_roads = [r for r in roads if r.get("status") in ["Flooded", "Blocked"]]
        if blocked_roads:
            score += (len(blocked_roads) * 8.0)
            signals.append(f"Road network blockage along key access corridors ({len(blocked_roads)} arterial closures)")

        # Normalize score
        final_score = round(min(98.5, max(5.0, score)), 1)

        if final_score >= 80.0:
            risk_level = "CRITICAL"
        elif final_score >= 60.0:
            risk_level = "HIGH"
        elif final_score >= 40.0:
            risk_level = "MODERATE"
        else:
            risk_level = "LOW"

        return {
            "region_name": region_name,
            "overall_risk_level": risk_level,
            "risk_score": final_score,
            "contributing_signals": signals,
            "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC"),
            "disclaimer": "DECISION-SUPPORT ESTIMATE: This AI-generated risk index is intended for situational awareness only and does not replace official emergency agency evacuations or public safety warnings."
        }

risk_engine = DisasterRiskEngine()
