"""
EcoTwin - High-Frequency Vehicle Telemetry Streaming Service
Author: Ashutosh Sahoo (Backend Lead - Day 8 Deliverable)
Date: September 15, 2026
"""

from typing import List, Dict, Any

CENTER_LAT = 20.2961
CENTER_LNG = 85.8245


class VehicleStreamService:
    """Service providing live coordinates of vehicles progressing along corridors."""

    def __init__(self):
        self.corridor_anchors = {
            "E_S2C": {"name": "South Inbound", "start": [CENTER_LAT - 0.0035, CENTER_LNG], "end": [CENTER_LAT, CENTER_LNG], "type": "passenger_petrol", "emission_base": 420.0},
            "E_N2C": {"name": "North Inbound", "start": [CENTER_LAT + 0.0035, CENTER_LNG], "end": [CENTER_LAT, CENTER_LNG], "type": "delivery_truck", "emission_base": 850.0},
            "E_E2C": {"name": "East Inbound",  "start": [CENTER_LAT, CENTER_LNG + 0.0035], "end": [CENTER_LAT, CENTER_LNG], "type": "passenger_petrol", "emission_base": 380.0},
            "E_W2C": {"name": "West Inbound",  "start": [CENTER_LAT, CENTER_LNG - 0.0035], "end": [CENTER_LAT, CENTER_LNG], "type": "city_bus", "emission_base": 1120.0},
        }

    def get_live_vehicles(self, step: int = 1) -> List[Dict[str, Any]]:
        """Returns instantaneous vehicle fleet coordinates and emission profiles."""
        vehicles = []
        v_counter = 1

        for cid, cfg in self.corridor_anchors.items():
            for slot in range(3):
                progress = ((step * 0.05) + (slot * 0.33)) % 1.0
                lat = cfg["start"][0] + (cfg["end"][0] - cfg["start"][0]) * progress
                lng = cfg["start"][1] + (cfg["end"][1] - cfg["start"][1]) * progress

                speed_mps = round(9.0 * (1.0 - (progress * 0.35)), 2)
                idling_spike = 1.4 if progress > 0.75 else 1.0
                co2_rate = round(cfg["emission_base"] * (speed_mps / 10.0 + 0.3) * idling_spike, 1)

                vehicles.append({
                    "vehicle_id": f"veh_{v_counter:02d}",
                    "corridor_id": cid,
                    "corridor_name": cfg["name"],
                    "vehicle_type": cfg["type"],
                    "lat": round(lat, 6),
                    "lng": round(lng, 6),
                    "speed_mps": speed_mps,
                    "instant_co2_mg": co2_rate,
                    "progress": round(progress, 2)
                })
                v_counter += 1

        return vehicles


vehicle_stream = VehicleStreamService()