from typing import List, Dict, Any
from backend.graph.knowledge_graph import knowledge_graph

class GraphRAGEngine:
    """
    Executes relational Graph RAG traversal to resolve multi-hop queries.
    """
    def __init__(self, kg=knowledge_graph):
        self.kg = kg

    def retrieve_relational_context(self, disaster_id: str = "DIS-001") -> Dict[str, Any]:
        """
        Extracts multi-hop connected subgraph for a disaster zone including:
        affected locations -> available shelters/hospitals -> road segment statuses.
        """
        sub = self.kg.query_subgraph_by_entity(disaster_id, depth=3)

        accessible_hospitals = []
        open_shelters = []
        blocked_roads = []

        for node in sub["nodes"]:
            ntype = node.get("type")
            if ntype == "Hospital":
                accessible_hospitals.append(node)
            elif ntype == "Shelter":
                open_shelters.append(node)
            elif ntype == "Road" and node.get("status") in ["Blocked", "Flooded"]:
                blocked_roads.append(node)

        relational_summary = f"Disaster {disaster_id} affects {len(sub['nodes'])} graph entities. Identified {len(open_shelters)} connected shelters, {len(accessible_hospitals)} hospitals, and {len(blocked_roads)} blocked road bottlenecks."

        return {
            "summary": relational_summary,
            "subgraph": sub,
            "open_shelters": open_shelters,
            "accessible_hospitals": accessible_hospitals,
            "blocked_roads": blocked_roads
        }

graph_rag = GraphRAGEngine()
