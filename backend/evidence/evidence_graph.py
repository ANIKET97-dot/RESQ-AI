from typing import List, Dict, Any, Optional
import networkx as nx

class EvidenceGraphEngine:
    """
    Maintains an explicit Evidence Graph separate from the Knowledge Graph.
    Tracks lineage: SOURCE -> OBSERVATION -> CLAIM -> ENTITY -> LOCATION -> TIME -> EVENT.
    Supports claim verification, corroborating source discovery, and contradiction tracing.
    """
    def __init__(self):
        self.graph = nx.DiGraph()
        self._build_default_evidence_graph()

    def _build_default_evidence_graph(self):
        # Add Source Nodes
        self.graph.add_node("SRC-FEMA-01", type="Source", name="FEMA Region IX Directive", reliability=0.98, category="Government")
        self.graph.add_node("SRC-CALTRANS-02", type="Source", name="Caltrans Live Incident Log", reliability=0.95, category="Infrastructure")
        self.graph.add_node("SRC-CITIZEN-88", type="Source", name="Verified Field Reporter #88", reliability=0.75, category="Citizen")

        # Add Observation Nodes
        self.graph.add_node("OBS-MSN-WATER", type="Observation", text="Standing water measured at 1.2m on Mission St", timestamp="2026-10-01T22:00:00Z")
        self.graph.add_node("OBS-CIVIC-SHELTER", type="Observation", text="Civic Center Shelter operating at 320/500 capacity", timestamp="2026-10-01T22:15:00Z")

        # Add Claim Nodes
        self.graph.add_node("CLM-RD301-BLOCKED", type="Claim", statement="Mission Street (14th-18th St) is strictly CLOSED due to flood inundation", confidence="VERIFIED", status="Active")
        self.graph.add_node("CLM-SHL101-OPEN", type="Claim", statement="Civic Center Emergency Shelter has 180 available beds", confidence="HIGH CONFIDENCE", status="Active")
        self.graph.add_node("CLM-RD301-CLEAR", type="Claim", statement="Unverified tweet claims Mission Street is open", confidence="CONFLICTED", status="Contradicted")

        # Add Entity & Location Nodes
        self.graph.add_node("ENT-RD-301", type="Entity", name="Mission Street Segment RD-301")
        self.graph.add_node("ENT-SHL-101", type="Entity", name="Civic Center Shelter SHL-101")
        self.graph.add_node("LOC-MISSION-DISTRICT", type="Location", lat=37.7650, lng=-122.4185, name="Mission District")

        # Add Edges (Lineage Chains)
        self.graph.add_edge("SRC-CALTRANS-02", "OBS-MSN-WATER", relation="PRODUCED")
        self.graph.add_edge("OBS-MSN-WATER", "CLM-RD301-BLOCKED", relation="SUPPORTS")
        self.graph.add_edge("CLM-RD301-BLOCKED", "ENT-RD-301", relation="TARGETS")
        self.graph.add_edge("ENT-RD-301", "LOC-MISSION-DISTRICT", relation="LOCATED_IN")

        self.graph.add_edge("SRC-FEMA-01", "OBS-CIVIC-SHELTER", relation="PRODUCED")
        self.graph.add_edge("OBS-CIVIC-SHELTER", "CLM-SHL101-OPEN", relation="SUPPORTS")
        self.graph.add_edge("CLM-SHL101-OPEN", "ENT-SHL-101", relation="TARGETS")

        # Contradiction edge
        self.graph.add_edge("SRC-CITIZEN-88", "CLM-RD301-CLEAR", relation="PRODUCED")
        self.graph.add_edge("CLM-RD301-CLEAR", "CLM-RD301-BLOCKED", relation="CONTRADICTS")

    def get_evidence_graph_json(self) -> Dict[str, Any]:
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

    def trace_claim_lineage(self, claim_id: str) -> Dict[str, Any]:
        if claim_id not in self.graph:
            return {"error": "Claim not found in evidence graph"}

        predecessors = list(self.graph.predecessors(claim_id))
        successors = list(self.graph.successors(claim_id))

        supporting_sources = []
        for p in predecessors:
            p_data = self.graph.nodes[p]
            if p_data.get("type") == "Observation":
                sources = list(self.graph.predecessors(p))
                for s in sources:
                    supporting_sources.append(self.graph.nodes[s])

        return {
            "claim_id": claim_id,
            "claim_data": self.graph.nodes[claim_id],
            "supporting_observations": [self.graph.nodes[p] for p in predecessors],
            "supporting_sources": supporting_sources,
            "target_entities": [self.graph.nodes[s] for s in successors]
        }

evidence_graph = EvidenceGraphEngine()
