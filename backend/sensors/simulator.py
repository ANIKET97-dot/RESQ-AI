from typing import List, Dict, Any
import random
from datetime import datetime
from backend.db.database import db
from backend.sensors.anomaly import anomaly_detector

class IoTSensorSimulator:
    """
    Simulates real-time telemetry from ESP32, Arduino, and Raspberry Pi IoT emergency sensors.
    """
    def __init__(self):
        pass

    def get_live_sensor_stream(self) -> List[Dict[str, Any]]:
        sensors = db.get_sensors()
        results = []

        for s in sensors:
            history = s.get("historical_series", [1.0, 1.2, 1.4])
            # Run anomaly analysis
            anomaly_res = anomaly_detector.analyze_sensor_series(history, s["threshold"])

            s_copy = dict(s)
            s_copy["anomaly_analysis"] = anomaly_res
            if anomaly_res["is_anomaly"]:
                s_copy["status"] = "Anomaly"
            results.append(s_copy)

        return results

sensor_simulator = IoTSensorSimulator()
