from typing import Dict, Any, List

DEMO_DISASTERS: List[Dict[str, Any]] = [
    {
        "id": "DIS-001",
        "name": "Bay Area Coastal Surge & Flash Flood",
        "type": "Flood",
        "severity": "Critical",
        "latitude": 37.7749,
        "longitude": -122.4194,
        "affected_radius_km": 12.5,
        "description": "Atmospheric river event causing rapid urban flooding along lower Mission District and Embarcadero. High tide compound risk.",
        "status": "Active",
        "created_at": "2026-10-01T08:00:00Z",
        "updated_at": "2026-10-01T22:30:00Z"
    },
    {
        "id": "DIS-002",
        "name": "North Bay Ridge Wildfire Incident",
        "type": "Wildfire",
        "severity": "High",
        "latitude": 38.1000,
        "longitude": -122.2500,
        "affected_radius_km": 8.0,
        "description": "Brush fire ignited near ridge line. Gusty winds driving smoke south toward population centers.",
        "status": "Containment 35%",
        "created_at": "2026-10-01T14:15:00Z",
        "updated_at": "2026-10-01T22:00:00Z"
    }
]

DEMO_SHELTERS: List[Dict[str, Any]] = [
    {
        "id": "SHL-101",
        "name": "Civic Center Emergency Shelter",
        "type": "Public Shelter",
        "latitude": 37.7793,
        "longitude": -122.4184,
        "capacity": 500,
        "current_occupancy": 320,
        "status": "Open",
        "contact": "+1 (415) 555-0199",
        "operating_hours": "24/7 Active",
        "last_updated": "2026-10-01T22:15:00Z",
        "source": "SF Department of Emergency Management",
        "verification_status": "Verified"
    },
    {
        "id": "SHL-102",
        "name": "Mission High School Evacuation Center",
        "type": "School Gym",
        "latitude": 37.7615,
        "longitude": -122.4278,
        "capacity": 300,
        "current_occupancy": 285,
        "status": "Near Capacity",
        "contact": "+1 (415) 555-0144",
        "operating_hours": "24/7 Active",
        "last_updated": "2026-10-01T22:00:00Z",
        "source": "Red Cross Bay Area",
        "verification_status": "Verified"
    },
    {
        "id": "SHL-103",
        "name": "Soma Community Relief Hub",
        "type": "Community Center",
        "latitude": 37.7812,
        "longitude": -122.4045,
        "capacity": 200,
        "current_occupancy": 80,
        "status": "Open",
        "contact": "+1 (415) 555-0188",
        "operating_hours": "24/7 Active",
        "last_updated": "2026-10-01T21:45:00Z",
        "source": "City Emergency Operations",
        "verification_status": "Verified"
    },
    {
        "id": "SHL-104",
        "name": "Richmond Armory Evacuation Site",
        "type": "Armory Shelter",
        "latitude": 37.7780,
        "longitude": -122.4600,
        "capacity": 450,
        "current_occupancy": 110,
        "status": "Open",
        "contact": "+1 (415) 555-0210",
        "operating_hours": "24/7 Active",
        "last_updated": "2026-10-01T22:20:00Z",
        "source": "County Emergency Management",
        "verification_status": "Verified"
    }
]

DEMO_HOSPITALS: List[Dict[str, Any]] = [
    {
        "id": "HSP-201",
        "name": "Zuckerberg SF General Trauma Center",
        "type": "Trauma Center",
        "latitude": 37.7558,
        "longitude": -122.4053,
        "total_beds": 400,
        "available_beds": 42,
        "icu_available": 6,
        "status": "High Load",
        "contact": "+1 (415) 206-8000",
        "accessibility": "Reduced - Potrero Ave flooded northbound",
        "last_updated": "2026-10-01T22:30:00Z",
        "source": "Hospital Emergency Command"
    },
    {
        "id": "HSP-202",
        "name": "UCSF Medical Center at Parnassus",
        "type": "Regional Medical Center",
        "latitude": 37.7631,
        "longitude": -122.4578,
        "total_beds": 600,
        "available_beds": 115,
        "icu_available": 18,
        "status": "Operational",
        "contact": "+1 (415) 476-1000",
        "accessibility": "Clear via 9th Avenue",
        "last_updated": "2026-10-01T22:25:00Z",
        "source": "UCSF Operations Center"
    },
    {
        "id": "HSP-203",
        "name": "Kaiser Permanente SF Medical Center",
        "type": "General Hospital",
        "latitude": 37.7825,
        "longitude": -122.4431,
        "total_beds": 250,
        "available_beds": 38,
        "icu_available": 4,
        "status": "Operational",
        "contact": "+1 (415) 833-2000",
        "accessibility": "Clear via Geary Blvd",
        "last_updated": "2026-10-01T22:10:00Z",
        "source": "Regional Health Network"
    }
]

DEMO_ROADS: List[Dict[str, Any]] = [
    {
        "id": "RD-301",
        "road_name": "Mission Street (14th St to 18th St)",
        "start_lat": 37.7680,
        "start_lng": -122.4190,
        "end_lat": 37.7620,
        "end_lng": -122.4195,
        "status": "Flooded",
        "reason": "1.2m standing water due to storm drain overflow",
        "last_updated": "2026-10-01T22:20:00Z",
        "source": "SF Police Dept / Traffic Watch",
        "verification_status": "Verified"
    },
    {
        "id": "RD-302",
        "road_name": "Embarcadero Southbound under I-80",
        "start_lat": 37.7900,
        "start_lng": -122.3900,
        "end_lat": 37.7820,
        "end_lng": -122.3920,
        "status": "Blocked",
        "reason": "Debris and fallen power line",
        "last_updated": "2026-10-01T21:50:00Z",
        "source": "Caltrans Incident Log",
        "verification_status": "Verified"
    },
    {
        "id": "RD-303",
        "road_name": "US-101 Southbound near Caesar Chavez",
        "start_lat": 37.7500,
        "start_lng": -122.4060,
        "end_lat": 37.7440,
        "end_lng": -122.4050,
        "status": "Restricted",
        "reason": "Emergency vehicles only - right 2 lanes submerged",
        "last_updated": "2026-10-01T22:15:00Z",
        "source": "California Highway Patrol",
        "verification_status": "Verified"
    },
    {
        "id": "RD-304",
        "road_name": "Geary Boulevard Corridor",
        "start_lat": 37.7810,
        "start_lng": -122.4300,
        "end_lat": 37.7800,
        "end_lng": -122.4700,
        "status": "Open",
        "reason": "All lanes clear",
        "last_updated": "2026-10-01T22:30:00Z",
        "source": "Caltrans Incident Log",
        "verification_status": "Verified"
    }
]

DEMO_SENSORS: List[Dict[str, Any]] = [
    {
        "id": "SNS-401",
        "sensor_code": "HYD-MSN-04",
        "sensor_type": "water_level",
        "latitude": 37.7650,
        "longitude": -122.4185,
        "location_name": "Mission Creek Basin Gauge #4",
        "current_value": 3.42,
        "unit": "meters",
        "threshold": 2.50,
        "status": "Anomaly",
        "last_updated": "2026-10-01T22:35:00Z",
        "historical_series": [1.1, 1.2, 1.3, 1.5, 1.8, 2.3, 2.9, 3.42]
    },
    {
        "id": "SNS-402",
        "sensor_code": "SMK-NB-12",
        "sensor_type": "smoke",
        "latitude": 38.0950,
        "longitude": -122.2550,
        "location_name": "North Bay Air Quality Monitor",
        "current_value": 185.0,
        "unit": "AQI",
        "threshold": 100.0,
        "status": "Warning",
        "last_updated": "2026-10-01T22:30:00Z",
        "historical_series": [25, 30, 45, 80, 120, 165, 185]
    },
    {
        "id": "SNS-403",
        "sensor_code": "TMP-SOMA-01",
        "sensor_type": "temperature",
        "latitude": 37.7780,
        "longitude": -122.4080,
        "location_name": "SoMa Weather & Temp Node",
        "current_value": 15.4,
        "unit": "°C",
        "threshold": 35.0,
        "status": "Normal",
        "last_updated": "2026-10-01T22:38:00Z",
        "historical_series": [14.1, 14.5, 14.8, 15.2, 15.4]
    }
]

DEMO_INCIDENTS: List[Dict[str, Any]] = [
    {
        "id": "INC-501",
        "category": "Flood",
        "description": "Flash flooding overflowing sidewalks into underground parking. Multiple trapped vehicles.",
        "latitude": 37.7655,
        "longitude": -122.4170,
        "location_name": "16th & Valencia St",
        "image_url": "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=800&auto=format&fit=crop",
        "source_type": "Citizen Report",
        "verification_status": "Verified by SF Fire Unit 12",
        "severity": "Critical",
        "created_at": "2026-10-01T21:30:00Z"
    },
    {
        "id": "INC-502",
        "category": "Obstruction",
        "description": "Downed oak tree blocking northbound lane of 19th Ave near Golden Gate Park entrance.",
        "latitude": 37.7690,
        "longitude": -122.4770,
        "location_name": "19th Ave & Lincoln Way",
        "image_url": "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=800&auto=format&fit=crop",
        "source_type": "Field Officer",
        "verification_status": "Verified",
        "severity": "Moderate",
        "created_at": "2026-10-01T22:05:00Z"
    },
    {
        "id": "INC-503",
        "category": "Structural Damage",
        "description": "Retaining wall crack observed on steep slope along Telegraph Hill Blvd.",
        "latitude": 37.8020,
        "longitude": -122.4060,
        "location_name": "Telegraph Hill Blvd",
        "image_url": "https://images.unsplash.com/photo-1590059301980-8bfaeb8e94a8?q=80&w=800&auto=format&fit=crop",
        "source_type": "Citizen Report",
        "verification_status": "Preliminary",
        "severity": "High",
        "created_at": "2026-10-01T22:15:00Z"
    }
]

DEMO_WEATHER: Dict[str, Any] = {
    "location_name": "San Francisco Metro Coastal Area",
    "temperature_c": 15.2,
    "humidity_pct": 94,
    "wind_speed_kmh": 48.5,
    "wind_direction": "SSW",
    "rainfall_mm": 62.4,
    "pressure_hpa": 998.2,
    "forecast_summary": "Atmospheric River system continuing with sustained rainfall up to 15mm/hr through midnight. Heavy wind gusts up to 65 km/h.",
    "severe_alerts": [
        "FLASH FLOOD WARNING in effect until 04:00 AM",
        "HIGH SURGICAL WATER LEVEL ADVISORY for Embarcadero shoreline"
    ],
    "last_updated": "2026-10-01T22:35:00Z",
    "provider": "National Weather Service / OpenMeteo Demo Abstraction"
}

DEMO_DOCUMENTS: List[Dict[str, Any]] = [
    {
        "chunk_id": "CHK-001",
        "doc_id": "DOC-FEMA-2026-09",
        "title": "SF Bay Area Flood Action Plan & Shelter Operating Standard",
        "agency": "FEMA Region IX",
        "content": "During major atmospheric river events causing storm surge above 2.5m in Mission Creek Basin, Civic Center Shelter (SHL-101) serves as primary triage hub. Medical personnel are stationed at entrance. Evacuees requiring wheelchair access should use 9th Street entrance ramps.",
        "location": "San Francisco Civic Center",
        "published_at": "2026-10-01T08:00:00Z",
        "valid_from": "2026-10-01T08:00:00Z",
        "valid_until": "2026-10-05T00:00:00Z",
        "source_url": "https://fema.gov/reports/2026/sf-flood-action-plan.pdf",
        "verification_status": "Official Government Release"
    },
    {
        "chunk_id": "CHK-002",
        "doc_id": "DOC-CALOES-2026-14",
        "title": "Emergency Transit Directive: Blocked Arterial Routes",
        "agency": "California Governor's Office of Emergency Services (CalOES)",
        "content": "As of 22:00 PST, Mission Street between 14th St and 18th St is strictly closed due to 1.2m water inundation. Emergency vehicles traveling from Zuckerberg SF General Trauma Center to UCSF Parnassus must re-route via Potrero Ave northbound to I-80 West, or use 19th Street connector.",
        "location": "Mission District Transit Corridor",
        "published_at": "2026-10-01T22:00:00Z",
        "valid_from": "2026-10-01T22:00:00Z",
        "valid_until": "2026-10-02T12:00:00Z",
        "source_url": "https://caloes.ca.gov/directives/2026-10-01-transit.pdf",
        "verification_status": "Official Emergency Directive"
    },
    {
        "chunk_id": "CHK-003",
        "doc_id": "DOC-SFDEM-2026-88",
        "title": "Hospital Emergency Load & ICU Capacity Status Bulletin",
        "agency": "San Francisco Department of Emergency Management",
        "content": "Zuckerberg SF General Hospital is operating under High Load status with 42 remaining general beds and 6 ICU beds available. Emergency ambulance transport is diverted for non-trauma cases to UCSF Parnassus (115 beds available, 18 ICU beds).",
        "location": "San Francisco County Hospitals",
        "published_at": "2026-10-01T21:45:00Z",
        "valid_from": "2026-10-01T21:45:00Z",
        "valid_until": "2026-10-02T06:00:00Z",
        "source_url": "https://sfdem.org/bulletins/hospitals-capacity-oct1.pdf",
        "verification_status": "Verified Agency Update"
    },
    {
        "chunk_id": "CHK-004",
        "doc_id": "DOC-REDCR-2026-02",
        "title": "Shelter Capacity & Resource Availability Matrix",
        "agency": "American Red Cross Bay Area Chapter",
        "content": "Mission High School Evacuation Center (SHL-102) is currently at 95% capacity (285/300 beds occupied). New evacuees are being redirected to Richmond Armory (SHL-104) which has 340 open beds and full generator support.",
        "location": "Bay Area Emergency Shelters",
        "published_at": "2026-10-01T22:10:00Z",
        "valid_from": "2026-10-01T22:10:00Z",
        "valid_until": "2026-10-02T12:00:00Z",
        "source_url": "https://redcross.org/bayarea/shelters-update.pdf",
        "verification_status": "Verified NGO Report"
    }
]

DEMO_NEWS: List[Dict[str, Any]] = [
    {
        "id": "NWS-601",
        "headline": "Storm Surge Causes Severe Inundation in Lower Mission; Rescues Underway",
        "publisher": "Bay Area News Emergency Bureau",
        "published_at": "2026-10-01T22:15:00Z",
        "summary": "First responders are conducting water rescues near 16th and Mission as water levels reached over 3 feet. Public transit on Mission corridor is suspended.",
        "url": "https://bayareanews.demo/article/storm-surge-mission-flooding",
        "verification_status": "News Agency Verified"
    },
    {
        "id": "NWS-602",
        "headline": "Caltrans Issues Warning: Key Offramps Blocked along Embarcadero",
        "publisher": "California Infrastructure Monitor",
        "published_at": "2026-10-01T21:40:00Z",
        "summary": "Power lines downed near Embarcadero south of Bay Bridge. Motorists urged to avoid downtown lower level streets.",
        "url": "https://calinframonitor.demo/embarcadero-blocked",
        "verification_status": "Corroborated by Caltrans Log"
    }
]
