from typing import List, Dict, Any
import math

class ResourceOptimizationEngine:
    """
    Optimizes emergency resource allocation across rescue teams, swiftwater boats,
    ambulances, mobile triage units, and food/water supply trucks.
    """
    def __init__(self):
        self.fleet = [
            {"id": "FLT-BOAT-01", "name": "SF Fire Swiftwater Rescue Boat #1", "type": "Water Rescue Boat", "capacity": 6, "status": "Available", "lat": 37.7780, "lng": -122.4080},
            {"id": "FLT-BOAT-02", "name": "Red Cross Inflatable Rescue Boat #2", "type": "Water Rescue Boat", "capacity": 8, "status": "Deployed", "lat": 37.7650, "lng": -122.4180},
            {"id": "FLT-AMB-12", "name": "SF General Emergency Triage Ambulance #12", "type": "Ambulance", "capacity": 2, "status": "Available", "lat": 37.7558, "lng": -122.4053},
            {"id": "FLT-TRUCK-05", "name": "Disaster Relief Supply Truck #5", "type": "Food & Water Truck", "capacity": 500, "status": "Available", "lat": 37.7793, "lng": -122.4184},
            {"id": "FLT-TEAM-04", "name": "CalOES Urban Search & Rescue Team #4", "type": "Rescue Team", "capacity": 12, "status": "Available", "lat": 37.7615, "lng": -122.4278}
        ]

    def optimize_allocation(self, target_lat: float = 37.7655, target_lng: float = -122.4170, incident_type: str = "Flood") -> List[Dict[str, Any]]:
        results = []
        for r in self.fleet:
            # Haversine distance
            dlat = math.radians(target_lat - r["lat"])
            dlon = math.radians(target_lng - r["lng"])
            a = math.sin(dlat / 2) ** 2 + math.cos(math.radians(r["lat"])) * math.cos(math.radians(target_lat)) * math.sin(dlon / 2) ** 2
            dist_km = round(6371.0 * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a)), 2)

            est_eta_min = round((dist_km / 30.0) * 60 + 2.0, 1)

            # Match priority
            priority_score = 1.0
            if incident_type.lower() in ["flood", "water"] and "boat" in r["type"].lower():
                priority_score = 1.8
            elif incident_type.lower() in ["medical", "injury"] and "ambulance" in r["type"].lower():
                priority_score = 1.9

            r_copy = dict(r)
            r_copy["distance_km"] = dist_km
            r_copy["estimated_eta_min"] = est_eta_min
            r_copy["match_score"] = round(priority_score * (1.0 / (dist_km + 0.5)), 2)
            results.append(r_copy)

        results.sort(key=lambda x: x["match_score"], reverse=True)
        return results

resource_optimizer = ResourceOptimizationEngine()
