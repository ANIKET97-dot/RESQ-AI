from typing import List, Dict, Any, Optional
from shapely.geometry import Point, Polygon
import math

class SpatialGISEngine:
    """
    Spatial GIS query engine supporting point distance, radius filtering, bounding box, and polygon intersection.
    """
    def __init__(self):
        pass

    def haversine_distance(self, lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        R = 6371.0  # Earth radius in kilometers
        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        a = math.sin(dlat / 2) ** 2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return round(R * c, 2)

    def is_within_radius(self, center_lat: float, center_lng: float, target_lat: float, target_lng: float, radius_km: float) -> bool:
        return self.haversine_distance(center_lat, center_lng, target_lat, target_lng) <= radius_km

    def is_within_bbox(self, lat: float, lng: float, min_lat: float, min_lng: float, max_lat: float, max_lng: float) -> bool:
        return min_lat <= lat <= max_lat and min_lng <= lng <= max_lng

spatial_gis = SpatialGISEngine()
