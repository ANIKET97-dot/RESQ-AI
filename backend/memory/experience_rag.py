from typing import List, Dict, Any

class ExperienceRAGEngine:
    """
    Long-Term Incident Memory RAG retrieving past disaster interventions,
    lessons learned, and response strategies while clearly marking them as HISTORICAL EXPERIENCE.
    """
    def __init__(self):
        self.past_incidents = [
            {
                "id": "HIST-2023-FLOOD-01",
                "title": "2023 New Year's SF Atmospheric River Inundation",
                "event_type": "Flood",
                "location": "Mission Creek Basin & Highway 101 Corridor",
                "summary": "Rapid storm drain overflow at 16th St caused 1.0m inundation. Secondary shelter deployment at Richmond Armory reduced overcrowding by 40%.",
                "successful_interventions": [
                    "Early activation of Richmond Armory shelter avoided Mission High School overflow",
                    "Potrero Ave northbound bypass saved an estimated 14 mins ambulance transit time"
                ],
                "failed_strategies": [
                    "Relying solely on lower Mission Street pumps without auxiliary generators"
                ],
                "lessons_learned": "Pre-stage swiftwater rescue boats near 16th BART prior to high tide peak."
            },
            {
                "id": "HIST-2021-WILDFIRE-04",
                "title": "2021 Napa Ridge Ridge-Line Brush Fire",
                "event_type": "Wildfire",
                "location": "North Bay Ridge Line",
                "summary": "Ridge line brush fire driven by 45 mph gusting winds toward urban fringe.",
                "successful_interventions": [
                    "Early ridge-line air drop containment before 14:00 wind shift"
                ],
                "failed_strategies": [
                    "Delayed evacuation warning to south ridge residents"
                ],
                "lessons_learned": "Issue early warning advisories as soon as AQI exceeds 150."
            }
        ]

    def query_similar_experiences(self, current_event_type: str = "Flood") -> List[Dict[str, Any]]:
        matched = []
        for inc in self.past_incidents:
            if inc["event_type"].lower() == current_event_type.lower():
                inc_copy = dict(inc)
                inc_copy["evidence_tag"] = "HISTORICAL EXPERIENCE (For Strategy Guidance Only)"
                matched.append(inc_copy)
        return matched

experience_rag = ExperienceRAGEngine()
