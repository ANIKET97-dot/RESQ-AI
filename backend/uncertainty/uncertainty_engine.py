from typing import List, Dict, Any

class UncertaintyEngine:
    """
    Evaluates evidence confidence and uncertainty bounds across source agreement,
    freshness, spatial precision, temporal precision, and contradiction level.
    """
    def __init__(self):
        pass

    def evaluate_confidence(
        self,
        num_sources: int,
        has_official_agency: bool,
        hours_old: float,
        contradiction_present: bool,
        has_telemetry_sensor: bool = False
    ) -> Dict[str, Any]:
        
        explanations = []

        if contradiction_present:
            category = "CONFLICTED"
            score = 0.45
            explanations.append("Active contradiction detected between multiple field reports.")
        elif has_official_agency and num_sources >= 2 and hours_old < 2.0:
            category = "VERIFIED"
            score = 0.96
            explanations.append("Corroborated by official government agency directives and recent field updates.")
        elif num_sources >= 2 and hours_old < 4.0:
            category = "HIGH CONFIDENCE"
            score = 0.88
            explanations.append("Multiple independent reports agree within a 4-hour temporal window.")
        elif num_sources == 1 and hours_old < 6.0:
            category = "MODERATE CONFIDENCE"
            score = 0.72
            explanations.append("Single uncorroborated report from verified channel. Secondary verification pending.")
        elif hours_old >= 6.0:
            category = "LOW CONFIDENCE"
            score = 0.48
            explanations.append("Information exceeds 6 hours in age. Field conditions may have shifted.")
        else:
            category = "UNKNOWN"
            score = 0.30
            explanations.append("Insufficient verified evidence available.")

        if has_telemetry_sensor:
            score = min(0.99, score + 0.05)
            explanations.append("Calibrated IoT stream gauge data provides physical telemetry confirmation.")

        return {
            "confidence_category": category,
            "confidence_score": round(score, 2),
            "explanation_breakdown": explanations,
            "metrics": {
                "num_sources": num_sources,
                "has_official_agency": has_official_agency,
                "hours_old": hours_old,
                "contradiction_present": contradiction_present,
                "has_telemetry_sensor": has_telemetry_sensor
            }
        }

uncertainty_engine = UncertaintyEngine()
