from typing import List, Dict, Any, Optional
from datetime import datetime

class MissionControlEngine:
    """
    Manages proposed response missions and enforces Human-in-the-Loop approval workflows.
    Maintains an immutable audit log of all human coordinator actions.
    """
    def __init__(self):
        self.missions = [
            {
                "id": "MSN-901",
                "task_name": "Deploy Swiftwater Rescue Boat #1 to 16th & Valencia",
                "priority": "P1 - CRITICAL",
                "location": "16th & Valencia St Inundation Zone",
                "assigned_team": "SF Fire Swiftwater Rescue Boat #1",
                "status": "PENDING APPROVAL",
                "evidence_summary": "Verified citizen report INC-501 + Stream gauge anomaly at Mission Creek Gauge #4",
                "confidence": "VERIFIED (0.96)",
                "created_time": "2026-10-01T22:30:00Z",
                "last_updated": "2026-10-01T22:35:00Z",
                "human_approval": None,
                "audit_log": [
                    {"action": "PROPOSED_BY_AGENT", "timestamp": "2026-10-01T22:30:00Z", "actor": "Task Agent"}
                ]
            },
            {
                "id": "MSN-902",
                "task_name": "Re-route Emergency Ambulances via Potrero Ave Northbound",
                "priority": "P2 - HIGH",
                "location": "Zuckerberg SF General Trauma Center Access Corridor",
                "assigned_team": "SF Emergency Dispatch",
                "status": "APPROVED",
                "evidence_summary": "CalOES Directive DOC-CALOES-2026-14 confirming Mission St flooded 1.2m",
                "confidence": "VERIFIED (0.98)",
                "created_time": "2026-10-01T22:05:00Z",
                "last_updated": "2026-10-01T22:10:00Z",
                "human_approval": {
                    "approver": "Commander J. Miller (Incident Command)",
                    "action": "APPROVED",
                    "timestamp": "2026-10-01T22:10:00Z",
                    "note": "Approved re-routing for non-trauma cases to UCSF Parnassus."
                },
                "audit_log": [
                    {"action": "PROPOSED_BY_AGENT", "timestamp": "2026-10-01T22:05:00Z", "actor": "Task Agent"},
                    {"action": "APPROVED", "timestamp": "2026-10-01T22:10:00Z", "actor": "Commander J. Miller"}
                ]
            }
        ]

    def get_missions(self) -> List[Dict[str, Any]]:
        return self.missions

    def update_mission_status(
        self,
        mission_id: str,
        action: str, # APPROVE, REJECT, MODIFY, REQUEST_EVIDENCE
        actor: str = "Emergency Coordinator",
        note: Optional[str] = None
    ) -> Dict[str, Any]:
        for m in self.missions:
            if m["id"] == mission_id:
                now_str = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
                new_status = "PENDING APPROVAL"

                if action == "APPROVE":
                    new_status = "APPROVED"
                elif action == "REJECT":
                    new_status = "BLOCKED"
                elif action == "MODIFY":
                    new_status = "PENDING APPROVAL"
                elif action == "REQUEST_EVIDENCE":
                    new_status = "PENDING APPROVAL"

                m["status"] = new_status
                m["last_updated"] = now_str
                m["human_approval"] = {
                    "approver": actor,
                    "action": action,
                    "timestamp": now_str,
                    "note": note or f"Action {action} performed by coordinator."
                }
                m["audit_log"].append({
                    "action": action,
                    "timestamp": now_str,
                    "actor": actor,
                    "note": note
                })
                return m

        return {"error": "Mission ID not found"}

mission_control = MissionControlEngine()
