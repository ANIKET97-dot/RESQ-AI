import networkx as nx
from typing import List, Dict, Any, Optional

class KnowledgeGraphEngine:
    """
    In-memory Knowledge Graph engine backed by NetworkX (and expandable to Neo4j).
    Maintains graph nodes (Disasters, Shelters, Hospitals, Roads, Sensors, Incidents, Locations, Reports)
    and typed edges (AFFECTS, CONTAINS, CONNECTS, STATUS, DESCRIBES, OCCURRED_AT, LOCATED_AT).
    """
    def __init__(self):
        self.graph = nx.DiGraph()
        self._build_default_graph()

    def _build_default_graph(self):
        # Add Nodes
        # Disasters
        self.graph.add_node("DIS-001", type="Disaster", label="Bay Area Flood", severity="Critical")
        self.graph.add_node("DIS-002", type="Disaster", label="North Bay Wildfire", severity="High")

        # Locations
        self.graph.add_node("LOC-SF-MISSION", type="Location", label="Mission District")
        self.graph.add_node("LOC-SF-CIVIC", type="Location", label="Civic Center Area")
        self.graph.add_node("LOC-SF-POTRERO", type="Location", label="Potrero Hill")
        self.graph.add_node("LOC-SF-RICHMOND", type="Location", label="Richmond District")
        self.graph.add_node("LOC-NAPA", type="Location", label="North Bay Ridge")

        # Shelters
        self.graph.add_node("SHL-101", type="Shelter", label="Civic Center Shelter", status="Open", capacity=500)
        self.graph.add_node("SHL-102", type="Shelter", label="Mission High Shelter", status="Near Capacity", capacity=300)
        self.graph.add_node("SHL-104", type="Shelter", label="Richmond Armory", status="Open", capacity=450)

        # Hospitals
        self.graph.add_node("HSP-201", type="Hospital", label="SF General Hospital", status="High Load", icu=6)
        self.graph.add_node("HSP-202", type="Hospital", label="UCSF Parnassus", status="Operational", icu=18)

        # Roads
        self.graph.add_node("RD-301", type="Road", label="Mission Street", status="Flooded")
        self.graph.add_node("RD-302", type="Road", label="Embarcadero", status="Blocked")
        self.graph.add_node("RD-304", type="Road", label="Geary Blvd", status="Open")

        # Sensors
        self.graph.add_node("SNS-401", type="Sensor", label="Mission Creek Gauge #4", status="Anomaly")
        self.graph.add_node("SNS-402", type="Sensor", label="North Bay Air Monitor", status="Warning")

        # Incidents
        self.graph.add_node("INC-501", type="Incident", label="16th & Valencia Water Rescue", severity="Critical")
        self.graph.add_node("INC-502", type="Incident", label="19th Ave Tree Down", severity="Moderate")

        # Reports
        self.graph.add_node("CHK-001", type="Report", label="FEMA Flood Action Plan", agency="FEMA")
        self.graph.add_node("CHK-002", type="Report", label="CalOES Transit Directive", agency="CalOES")

        # Add Edges (Relationships)
        self.graph.add_edge("DIS-001", "LOC-SF-MISSION", relation="AFFECTS")
        self.graph.add_edge("DIS-001", "LOC-SF-CIVIC", relation="AFFECTS")
        self.graph.add_edge("DIS-002", "LOC-NAPA", relation="AFFECTS")

        self.graph.add_edge("LOC-SF-CIVIC", "SHL-101", relation="CONTAINS")
        self.graph.add_edge("LOC-SF-MISSION", "SHL-102", relation="CONTAINS")
        self.graph.add_edge("LOC-SF-RICHMOND", "SHL-104", relation="CONTAINS")

        self.graph.add_edge("LOC-SF-POTRERO", "HSP-201", relation="CONTAINS")
        self.graph.add_edge("LOC-SF-RICHMOND", "HSP-202", relation="CONTAINS")

        self.graph.add_edge("RD-301", "LOC-SF-MISSION", relation="CONNECTS")
        self.graph.add_edge("RD-302", "LOC-SF-CIVIC", relation="CONNECTS")
        self.graph.add_edge("RD-304", "LOC-SF-RICHMOND", relation="CONNECTS")

        self.graph.add_edge("INC-501", "LOC-SF-MISSION", relation="OCCURRED_AT")
        self.graph.add_edge("INC-502", "LOC-SF-RICHMOND", relation="OCCURRED_AT")

        self.graph.add_edge("SNS-401", "LOC-SF-MISSION", relation="LOCATED_AT")
        self.graph.add_edge("SNS-402", "LOC-NAPA", relation="LOCATED_AT")

        self.graph.add_edge("CHK-001", "SHL-101", relation="DESCRIBES")
        self.graph.add_edge("CHK-002", "RD-301", relation="DESCRIBES")

    def get_full_graph_json(self) -> Dict[str, Any]:
        nodes = []
        for n, data in self.graph.nodes(data=True):
            node_info = {"id": n}
            node_info.update(data)
            nodes.append(node_info)

        edges = []
        for u, v, data in self.graph.edges(data=True):
            edges.append({
                "source": u,
                "target": v,
                "relation": data.get("relation", "CONNECTED_TO")
            })

        return {"nodes": nodes, "edges": edges}

    def query_subgraph_by_entity(self, entity_id: str, depth: int = 2) -> Dict[str, Any]:
        if entity_id not in self.graph:
            return {"nodes": [], "edges": []}

        sub_nodes = {entity_id}
        current_layer = {entity_id}

        for _ in range(depth):
            next_layer = set()
            for node in current_layer:
                neighbors = set(self.graph.successors(node)).union(set(self.graph.predecessors(node)))
                next_layer.update(neighbors)
            sub_nodes.update(next_layer)
            current_layer = next_layer

        subgraph = self.graph.subgraph(sub_nodes)

        nodes = []
        for n, data in subgraph.nodes(data=True):
            node_info = {"id": n}
            node_info.update(data)
            nodes.append(node_info)

        edges = []
        for u, v, data in subgraph.edges(data=True):
            edges.append({
                "source": u,
                "target": v,
                "relation": data.get("relation", "CONNECTED_TO")
            })

        return {"nodes": nodes, "edges": edges}

knowledge_graph = KnowledgeGraphEngine()
