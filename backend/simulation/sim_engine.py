from typing import Dict, Any, List
from backend.db.database import db
from backend.risk.risk_engine import risk_engine
from backend.gis.routing import route_engine

class WhatIfSimulationEngine:
    """
    Executes counterfactual What-If disaster scenario simulations.
    Simulates hypothetical structural failures, rainfall spikes, shelter saturations, and road closures.
    """
    def __init__(self):
        pass

    def run_simulation(
        self,
        scenario_type: str = "road_closure",
        target_entity: str = "Geary Boulevard Corridor",
        parameter_delta: float = 30.0
    ) -> Dict[str, Any]:

        baseline_risk = risk_engine.evaluate_risk()
        baseline_roads = db.get_roads()
        baseline_shelters = db.get_shelters()

        affected_entities = []
        new_risks = []
        recommended_tasks = []

        if scenario_type == "road_closure":
            sim_name = f"Counterfactual Closure: {target_entity}"
            sim_risk_score = min(99.0, baseline_risk["risk_score"] + 12.0)
            affected_entities = [target_entity, "Civic Center Shelter Transit Connector", "Richmond District Ambulance Route"]
            new_risks = [
                f"Emergency ambulance reroute delay (+8.5 mins) between UCSF Parnassus and SF General",
                f"Traffic spillover onto 19th Ave bottleneck corridor"
            ]
            recommended_tasks = [
                f"Human Review: Deploy traffic dispatch officers to 19th Ave & Geary Blvd intersection",
                f"Human Review: Issue emergency detour notice for non-vital emergency vehicles"
            ]
        elif scenario_type == "rainfall_spike":
            sim_name = f"Counterfactual Precipitation Surge (+{parameter_delta}% Rainfall)"
            sim_risk_score = min(99.0, baseline_risk["risk_score"] + 18.5)
            affected_entities = ["Mission Creek Basin Gauge #4", "16th & Valencia St Inundation Zone", "Submerged Parking Garages"]
            new_risks = [
                "Mission Creek water level projected to exceed 4.1m (0.7m above flood wall top)",
                "Secondary flash flood surge reaching SoMa relief hub"
            ]
            recommended_tasks = [
                "Human Review: Pre-stage water rescue boat teams near 16th St BART station",
                "Human Review: Open Richmond Armory Shelter (SHL-104) for secondary evacuees"
            ]
        elif scenario_type == "shelter_capacity":
            sim_name = f"Counterfactual Shelter Saturation: {target_entity}"
            sim_risk_score = min(99.0, baseline_risk["risk_score"] + 8.0)
            affected_entities = [target_entity, "Mission High School Evacuation Center", "Richmond Armory"]
            new_risks = [
                "Primary shelter saturation reaches 100%; 85 evacuees requiring redirection",
                "Increased demand for emergency food & water distribution trucks"
            ]
            recommended_tasks = [
                "Human Review: Activate secondary overflow shelter facilities at Richmond Armory",
                "Human Review: Re-route incoming evacuation buses from Mission District"
            ]
        else:
            sim_name = f"General Counterfactual Simulation: {scenario_type}"
            sim_risk_score = baseline_risk["risk_score"] + 5.0
            affected_entities = [target_entity]
            new_risks = ["Minor operational delay in secondary response quadrant"]
            recommended_tasks = ["Human Review: Monitor live telemetry streams"]

        return {
            "simulation_id": f"SIM-{scenario_type.upper()}-01",
            "scenario_name": sim_name,
            "scenario_type": scenario_type,
            "target_entity": target_entity,
            "parameter_delta": parameter_delta,
            "baseline": {
                "risk_score": baseline_risk["risk_score"],
                "risk_level": baseline_risk["overall_risk_level"],
                "open_shelters": len([s for s in baseline_shelters if s["status"] == "Open"])
            },
            "simulated_outcome": {
                "risk_score": sim_risk_score,
                "risk_level": "CRITICAL" if sim_risk_score >= 80 else "HIGH",
                "risk_increase": round(sim_risk_score - baseline_risk["risk_score"], 1)
            },
            "affected_entities": affected_entities,
            "new_risks": new_risks,
            "recommended_human_tasks": recommended_tasks,
            "disclaimer": "COUNTERFACTUAL SIMULATION: These projected outcomes are mathematical estimates for what-if scenario planning and must be reviewed by emergency coordinators prior to operational action."
        }

sim_engine = WhatIfSimulationEngine()
