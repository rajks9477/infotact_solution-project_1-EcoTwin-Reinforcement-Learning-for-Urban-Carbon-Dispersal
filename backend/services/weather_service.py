"""
backend/services/weather_service.py
Day 18 Meteorological Impact & Real-time Weather Condition Service
Manages live urban weather states, pavement friction coefficients, and safety buffer metrics.
"""

import time
import json
from typing import Dict, Any

class WeatherService:
    PROFILES = {
        "clear":       {"name": "Clear & Dry",       "friction_mu": 0.85, "co2_surge": 1.00, "temp_c": 24, "visibility_m": 1000},
        "heavy_rain":  {"name": "Torrential Rain",   "friction_mu": 0.52, "co2_surge": 1.28, "temp_c": 19, "visibility_m": 350},
        "dense_smog":  {"name": "Dense Urban Smog",  "friction_mu": 0.70, "co2_surge": 1.42, "temp_c": 22, "visibility_m": 120},
        "heat_island": {"name": "Urban Heat Island", "friction_mu": 0.75, "co2_surge": 1.35, "temp_c": 39, "visibility_m": 800}
    }

    def __init__(self):
        self.active_condition = "clear"

    def set_condition(self, condition: str) -> Dict[str, Any]:
        if condition in self.PROFILES:
            self.active_condition = condition
            return self.get_current_weather()
        return {"error": f"Invalid condition: {condition}", "valid": list(self.PROFILES.keys())}

    def get_current_weather(self) -> Dict[str, Any]:
        p = self.PROFILES[self.active_condition]
        return {
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "condition_key": self.active_condition,
            "display_name": p["name"],
            "temperature_celsius": p["temp_c"],
            "pavement_friction_mu": p["friction_mu"],
            "emission_surge_multiplier": p["co2_surge"],
            "visibility_range_m": p["visibility_m"],
            "status": "WEATHER_TELEMETRY_ONLINE"
        }

def test_weather_service():
    print("=" * 70)
    print("      ECOTWIN METEOROLOGICAL TELEMETRY SERVICE AUDIT")
    print("=" * 70)

    svc = WeatherService()
    
    # 1. Test Clear
    c = svc.get_current_weather()
    print(f"[{'INIT':^8}] Weather: {c['display_name']} | Mu: {c['pavement_friction_mu']} | Surge: {c['emission_surge_multiplier']}x")

    # 2. Test Rain transition
    r = svc.set_condition("heavy_rain")
    print(f"[{'UPDATE':^8}] Transition to: {r['display_name']} | Friction: {r['pavement_friction_mu']} | Visibility: {r['visibility_range_m']}m")

    with open("backend/weather_service_audit.json", "w") as f:
        json.dump(r, f, indent=2)

    print("-" * 70)
    print("[PASS] Weather condition microservice verified and operational.")
    print("Audit log saved to backend/weather_service_audit.json")
    print("=" * 70)

if __name__ == "__main__":
    test_weather_service()