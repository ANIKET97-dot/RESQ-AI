from typing import List, Dict, Any

class QueryDecomposer:
    """
    Decomposes complex emergency queries into structured, executable subtask plans.
    """
    def __init__(self):
        pass

    def decompose(self, query: str) -> List[Dict[str, Any]]:
        q_lower = query.lower()

        if "shelter" in q_lower and "hospital" in q_lower:
            return [
                {"step_id": "Q1", "action": "Identify active disaster impact region", "target_agent": "Geospatial Agent", "tool": "get_disaster_zones"},
                {"step_id": "Q2", "action": "Query open shelters within impact radius", "target_agent": "Resource Agent", "tool": "get_nearby_shelters"},
                {"step_id": "Q3", "action": "Check hospital ICU & bed capacity", "target_agent": "Resource Agent", "tool": "get_nearby_hospitals"},
                {"step_id": "Q4", "action": "Filter blocked/flooded arterial roads", "target_agent": "GIS Routing Agent", "tool": "get_road_status"},
                {"step_id": "Q5", "action": "Calculate safe route bypassing bottlenecks", "target_agent": "GIS Routing Agent", "tool": "calculate_route"},
                {"step_id": "Q6", "action": "Retrieve supporting official agency documents & verify timestamps", "target_agent": "Disaster RAG Agent", "tool": "search_disaster_reports"},
                {"step_id": "Q7", "action": "Execute GraphRAG multi-hop relational path", "target_agent": "Knowledge Graph Agent", "tool": "query_knowledge_graph"},
                {"step_id": "Q8", "action": "Synthesize evidence with strict citations", "target_agent": "Verification Agent", "tool": "verify_and_synthesize"}
            ]
        elif "risk" in q_lower or "weather" in q_lower or "water" in q_lower:
            return [
                {"step_id": "Q1", "action": "Fetch real-time weather & atmospheric precipitation", "target_agent": "Weather Agent", "tool": "get_weather"},
                {"step_id": "Q2", "action": "Fetch stream gauge & sensor telemetry", "target_agent": "IoT Sensor Agent", "tool": "detect_anomaly"},
                {"step_id": "Q3", "action": "Compute ML Disaster Risk Score & signal factors", "target_agent": "Risk Analysis Agent", "tool": "calculate_risk"},
                {"step_id": "Q4", "action": "Cross-reference recent news & field incident reports", "target_agent": "News Agent", "tool": "search_news"},
                {"step_id": "Q5", "action": "Synthesize risk dashboard summary", "target_agent": "Report Generation Agent", "tool": "generate_summary"}
            ]
        else:
            return [
                {"step_id": "Q1", "action": "Perform Hybrid RAG retrieval over emergency corpus", "target_agent": "Disaster RAG Agent", "tool": "search_disaster_reports"},
                {"step_id": "Q2", "action": "Query live GIS map layers and nearby resources", "target_agent": "Geospatial Agent", "tool": "get_nearby_shelters"},
                {"step_id": "Q3", "action": "Check for temporal recency and claim contradictions", "target_agent": "Verification Agent", "tool": "detect_contradictions"},
                {"step_id": "Q4", "action": "Synthesize final response with source provenance", "target_agent": "Report Generation Agent", "tool": "synthesize_answer"}
            ]

decomposer = QueryDecomposer()
