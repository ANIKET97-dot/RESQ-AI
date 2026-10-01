from typing import List, Dict, Any, Optional
import math
from datetime import datetime
from backend.db.seed_data import (
    DEMO_DISASTERS, DEMO_SHELTERS, DEMO_HOSPITALS, 
    DEMO_ROADS, DEMO_SENSORS, DEMO_INCIDENTS, 
    DEMO_WEATHER, DEMO_DOCUMENTS, DEMO_NEWS
)

class InMemoryDatabase:
    def __init__(self):
        self.disasters = list(DEMO_DISASTERS)
        self.shelters = list(DEMO_SHELTERS)
        self.hospitals = list(DEMO_HOSPITALS)
        self.roads = list(DEMO_ROADS)
        self.sensors = list(DEMO_SENSORS)
        self.incidents = list(DEMO_INCIDENTS)
        self.weather = dict(DEMO_WEATHER)
        self.documents = list(DEMO_DOCUMENTS)
        self.news = list(DEMO_NEWS)

    def calculate_distance_km(self, lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        # Haversine distance formula
        R = 6371.0 # Radius of Earth in kilometers
        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        a = math.sin(dlat / 2) ** 2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return R * c

    def get_disasters(self) -> List[Dict[str, Any]]:
        return self.disasters

    def get_shelters(self, near_lat: Optional[float] = None, near_lng: Optional[float] = None, radius_km: Optional[float] = None) -> List[Dict[str, Any]]:
        res = []
        for s in self.shelters:
            if near_lat is not None and near_lng is not None:
                dist = self.calculate_distance_km(near_lat, near_lng, s["latitude"], s["longitude"])
                if radius_km and dist > radius_km:
                    continue
                s_copy = dict(s)
                s_copy["distance_km"] = round(dist, 2)
                res.append(s_copy)
            else:
                res.append(s)
        if near_lat is not None and near_lng is not None:
            res.sort(key=lambda x: x.get("distance_km", 0))
        return res

    def get_hospitals(self, near_lat: Optional[float] = None, near_lng: Optional[float] = None, radius_km: Optional[float] = None) -> List[Dict[str, Any]]:
        res = []
        for h in self.hospitals:
            if near_lat is not None and near_lng is not None:
                dist = self.calculate_distance_km(near_lat, near_lng, h["latitude"], h["longitude"])
                if radius_km and dist > radius_km:
                    continue
                h_copy = dict(h)
                h_copy["distance_km"] = round(dist, 2)
                res.append(h_copy)
            else:
                res.append(h)
        if near_lat is not None and near_lng is not None:
            res.sort(key=lambda x: x.get("distance_km", 0))
        return res

    def get_roads(self, status: Optional[str] = None) -> List[Dict[str, Any]]:
        if status:
            return [r for r in self.roads if r["status"].lower() == status.lower()]
        return self.roads

    def get_sensors(self) -> List[Dict[str, Any]]:
        return self.sensors

    def get_incidents(self) -> List[Dict[str, Any]]:
        return self.incidents

    def add_incident(self, incident_data: Dict[str, Any]) -> Dict[str, Any]:
        incident_id = f"INC-{len(self.incidents) + 501}"
        new_inc = {
            "id": incident_id,
            "category": incident_data.get("category", "Unspecified Incident"),
            "description": incident_data.get("description", ""),
            "latitude": incident_data.get("latitude", 37.7749),
            "longitude": incident_data.get("longitude", -122.4194),
            "location_name": incident_data.get("location_name", "Reported Location"),
            "image_url": incident_data.get("image_url"),
            "source_type": incident_data.get("source_type", "Citizen Report"),
            "verification_status": "Preliminary AI Assessment",
            "severity": incident_data.get("severity", "Moderate"),
            "created_at": datetime.utcnow().strftime("%Y-%m-%d%TH:%M:%SZ")
        }
        self.incidents.insert(0, new_inc)
        return new_inc

    def get_weather(self) -> Dict[str, Any]:
        return self.weather

    def get_documents(self) -> List[Dict[str, Any]]:
        return self.documents

    def get_news(self) -> List[Dict[str, Any]]:
        return self.news

db = InMemoryDatabase()
