"""
EcoTwin - Scenario Management & Dynamic AQI Service
Author: Ashutosh Sahoo (Backend Lead - Day 10 Deliverable)
Date: September 17, 2026

Description:
    Manages active traffic simulation profiles (Normal, Rush Hour Surge, Toxic Smog)
    and computes real-time Air Quality Index (AQI) ratings for dashboard display.
"""

from typing import Dict, Any


class ScenarioManagerService:
    """Service tracking active traffic stress profiles and environmental AQI."""

    PROFILES = {
        "normal_flow": {
            "id": "normal_flow",
            "name": "Standard Urban Flow",
            "traffic_multiplier": 1.0,
            "emission_factor": 1.0,
            "aqi_grade": "Grade A (Good)",
            "aqi_color": "emerald"
        },
        "morning_rush_surge": {
            "id": "morning_rush_surge",
            "name": "Morning Rush Hour Surge (+80%)",
            "traffic_multiplier": 1.8,
            "emission_factor": 1.55,
            "aqi_grade": "Grade C (Unhealthy)",
            "aqi_color": "amber"
        },
        "toxic_smog_crisis": {
            "id": "toxic_smog_crisis",
            "name": "Toxic Smog Emergency",
            "traffic_multiplier": 1.4,
            "emission_factor": 2.4,
            "aqi_grade": "Grade E (Hazardous)",
            "aqi_color": "red"
        }
    }

    def __init__(self):
        self.active_scenario_key: str = "normal_flow"

    def get_active_scenario(self) -> Dict[str, Any]:
        """Returns the active scenario profile."""
        profile = self.PROFILES.get(self.active_scenario_key, self.PROFILES["normal_flow"])
        return {
            "active_scenario": profile,
            "available_scenarios": list(self.PROFILES.values())
        }

    def switch_scenario(self, scenario_key: str) -> Dict[str, Any]:
        """Updates active scenario if valid."""
        if scenario_key in self.PROFILES:
            self.active_scenario_key = scenario_key
            return {
                "status": "success",
                "message": f"Active scenario switched to {self.PROFILES[scenario_key]['name']}",
                "profile": self.PROFILES[scenario_key]
            }
        return {"status": "error", "message": f"Unknown scenario: {scenario_key}"}


scenario_manager = ScenarioManagerService()