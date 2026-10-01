from typing import Dict, Any, List

class DisasterPhaseManager:
    """
    Manages the active Disaster Operations Phase:
    PREPAREDNESS, EARLY WARNING, RESPONSE, RELIEF, RECOVERY, AFTER-ACTION ANALYSIS.
    Adapts system priorities and agent tool selection based on phase context.
    """
    def __init__(self):
        self.current_phase = "RESPONSE"

    def get_phase_info(self) -> Dict[str, Any]:
        phase_profiles = {
            "PREPAREDNESS": {"priority": "Infrastructure Pre-check & Shelter Readiness", "agent_focus": ["Resource Agent", "GIS Agent"]},
            "EARLY WARNING": {"priority": "Sensor Anomaly Monitoring & Severe Weather Alerts", "agent_focus": ["Weather Agent", "Risk Agent"]},
            "RESPONSE": {"priority": "Life Safety, Evacuation, Safe Routing & Water Rescues", "agent_focus": ["GIS Routing Agent", "Resource Agent", "Disaster RAG Agent"]},
            "RELIEF": {"priority": "Shelter Supply Distribution, Medical Care & Food Delivery", "agent_focus": ["Resource Agent", "Task Agent"]},
            "RECOVERY": {"priority": "Debris Clearance, Road Reopening & Damage Assessment", "agent_focus": ["Vision Agent", "GIS Agent"]},
            "AFTER-ACTION ANALYSIS": {"priority": "RAG Evaluation, Post-Incident Review & Memory Storage", "agent_focus": ["Report Agent", "Experience RAG"]}
        }
        return {
            "current_phase": self.current_phase,
            "profile": phase_profiles.get(self.current_phase, phase_profiles["RESPONSE"]),
            "available_phases": list(phase_profiles.keys())
        }

    def set_phase(self, phase_name: str) -> Dict[str, Any]:
        if phase_name in ["PREPAREDNESS", "EARLY WARNING", "RESPONSE", "RELIEF", "RECOVERY", "AFTER-ACTION ANALYSIS"]:
            self.current_phase = phase_name
        return self.get_phase_info()

phase_manager = DisasterPhaseManager()
