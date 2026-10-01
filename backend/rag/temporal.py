from typing import List, Dict, Any
from datetime import datetime

class TemporalValidator:
    """
    Validates temporal recency, checks document validity windows, and flags superseded reports.
    """
    def __init__(self):
        pass

    def parse_timestamp(self, ts_str: str) -> datetime:
        try:
            # Handle ISO formats
            clean_ts = ts_str.replace("Z", "+00:00")
            return datetime.fromisoformat(clean_ts)
        except Exception:
            return datetime.utcnow()

    def filter_and_rank_by_recency(self, docs: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Sorts documents by timestamp (latest first) and appends recency weight metadata.
        """
        def get_sort_key(doc):
            ts = doc.get("published_at") or doc.get("last_updated") or doc.get("created_at") or "2020-01-01T00:00:00Z"
            return self.parse_timestamp(ts)

        sorted_docs = sorted(docs, key=get_sort_key, reverse=True)
        now = datetime.utcnow()

        for idx, doc in enumerate(sorted_docs):
            ts = get_sort_key(doc)
            hours_old = (now - ts.replace(tzinfo=None)).total_seconds() / 3600.0
            doc["hours_old"] = round(hours_old, 1)
            # Recency multiplier for scoring
            doc["recency_score"] = round(max(0.2, 1.0 - (hours_old / 24.0)), 2)

        return sorted_docs

    def check_superseding(self, claim_earlier: Dict[str, Any], claim_later: Dict[str, Any]) -> Dict[str, Any]:
        ts_earlier = self.parse_timestamp(claim_earlier.get("timestamp", ""))
        ts_later = self.parse_timestamp(claim_later.get("timestamp", ""))

        is_newer = ts_later > ts_earlier
        return {
            "is_newer": is_newer,
            "time_difference_minutes": abs((ts_later - ts_earlier).total_seconds()) / 60.0,
            "recommended_primary": claim_later if is_newer else claim_earlier,
            "supersedes_note": f"Update at {claim_later.get('timestamp')} may supersede earlier report at {claim_earlier.get('timestamp')}"
        }

temporal_validator = TemporalValidator()
