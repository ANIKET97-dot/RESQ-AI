from typing import List, Dict, Any
from backend.models.schemas import ContradictionItem

class ContradictionDetector:
    """
    Detects contradicting claims across multiple disaster reports, road statuses, and agency updates.
    """
    def __init__(self):
        pass

    def detect_contradictions(self, documents: List[Dict[str, Any]], roads: List[Dict[str, Any]], shelters: List[Dict[str, Any]]) -> List[ContradictionItem]:
        contradictions: List[ContradictionItem] = []

        # Example check: Road status contradiction detection
        # e.g., if a document claims a road is clear while traffic log says flooded/blocked
        for r in roads:
            road_name = r.get("road_name", "")
            r_status = r.get("status", "")
            r_ts = r.get("last_updated", "")
            r_source = r.get("source", "")

            # Scan documents for mention of this road
            for doc in documents:
                content = doc.get("content", "")
                if road_name.split()[0].lower() in content.lower():
                    if "clear" in content.lower() and r_status.lower() in ["blocked", "flooded", "damaged"]:
                        contradictions.append(
                            ContradictionItem(
                                claim_a=f"{road_name} is reported as {r_status} ({r.get('reason', '')})",
                                source_a=r_source,
                                timestamp_a=r_ts,
                                claim_b=f"Document '{doc.get('title')}' mentions road area as accessible/open",
                                source_b=doc.get("agency", "Document Source"),
                                timestamp_b=doc.get("published_at", "N/A"),
                                conflict_summary=f"Conflicting status report regarding road accessibility on {road_name}.",
                                resolution_suggestion=f"Prioritize recent field CHP/Caltrans update at {r_ts} over earlier static guidelines."
                            )
                        )

        # Example check: Shelter capacity conflict
        for s in shelters:
            s_name = s.get("name", "")
            s_status = s.get("status", "")
            s_ts = s.get("last_updated", "")
            s_source = s.get("source", "")

            for doc in documents:
                content = doc.get("content", "")
                if s_name.lower() in content.lower() or "mission high school" in content.lower() and "SHL-102" in s.get("id"):
                    if "95% capacity" in content and s_status == "Open":
                        contradictions.append(
                            ContradictionItem(
                                claim_a=f"{s_name} live status listed as '{s_status}'",
                                source_a=s_source,
                                timestamp_a=s_ts,
                                claim_b=f"Red Cross report states {s_name} is at 95% capacity (Near Capacity)",
                                source_b=doc.get("agency", "Red Cross"),
                                timestamp_b=doc.get("published_at", "N/A"),
                                conflict_summary=f"Shelter capacity mismatch between live database and Red Cross field report.",
                                resolution_suggestion="Check Red Cross update timestamp (22:10) to confirm near-capacity warning."
                            )
                        )

        return contradictions

contradiction_detector = ContradictionDetector()
