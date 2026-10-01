import numpy as np
from sklearn.ensemble import IsolationForest
from typing import List, Dict, Any

class SensorAnomalyDetector:
    """
    ML-based time-series anomaly detector using Z-Score statistics and Isolation Forest algorithm.
    """
    def __init__(self):
        self.iso_forest = IsolationForest(contamination=0.1, random_state=42)

    def analyze_sensor_series(self, series: List[float], threshold_val: float) -> Dict[str, Any]:
        if not series or len(series) < 3:
            return {"is_anomaly": False, "confidence": 0.0, "method": "Insufficient data"}

        arr = np.array(series).reshape(-1, 1)

        # 1. Z-Score test on latest value
        mean = float(np.mean(arr[:-1])) if len(arr) > 1 else float(arr[0])
        std = float(np.std(arr[:-1])) if len(arr) > 1 and np.std(arr[:-1]) > 0 else 0.5
        latest = float(series[-1])

        z_score = abs(latest - mean) / std if std > 0 else 0.0

        # 2. Isolation Forest fit
        self.iso_forest.fit(arr)
        preds = self.iso_forest.predict([[latest]])
        is_iso_anomaly = (preds[0] == -1)

        # Threshold exceedance
        exceeds_threshold = (latest >= threshold_val)

        is_anomaly = bool((z_score > 2.2 and is_iso_anomaly) or exceeds_threshold)
        confidence = round(min(0.99, max(0.4, (z_score / 4.0))), 2)

        return {
            "is_anomaly": is_anomaly,
            "z_score": round(z_score, 2),
            "latest_value": latest,
            "baseline_mean": round(mean, 2),
            "exceeds_threshold": exceeds_threshold,
            "confidence": confidence,
            "method": "Isolation Forest + Z-Score Ensembled"
        }

anomaly_detector = SensorAnomalyDetector()
