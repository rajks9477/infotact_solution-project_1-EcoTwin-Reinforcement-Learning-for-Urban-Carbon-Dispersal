"""
EcoTwin - Day 24: Smart EV Charging Grid Telemetry & Dynamic Pricing Service
Exposes REST telemetry for urban EV fast-charging hubs, renewable generation mix, and slot reservations.
"""

import json
import os
from typing import Dict, List, Any

class EVGridService:
    def __init__(self):
        self.charging_stations = [
            {"id": "HUB-01-N", "name": "North Gate Superhub", "capacity_chargers": 8, "available_ports": 2, "load_kw": 300, "rate_per_kwh": 0.12},
            {"id": "HUB-02-C", "name": "Central Arterial Plaza", "capacity_chargers": 12, "available_ports": 1, "load_kw": 550, "rate_per_kwh": 0.18},
            {"id": "HUB-03-E", "name": "East Logistic Depot", "capacity_chargers": 6, "available_ports": 4, "load_kw": 100, "rate_per_kwh": 0.10},
            {"id": "HUB-04-S", "name": "South Interchange Hub", "capacity_chargers": 10, "available_ports": 5, "load_kw": 250, "rate_per_kwh": 0.14}
        ]

    def get_grid_telemetry(self) -> Dict[str, Any]:
        """Provides urban EV charging network summary."""
        total_load = sum(s["load_kw"] for s in self.charging_stations)
        total_ports = sum(s["capacity_chargers"] for s in self.charging_stations)
        available_ports = sum(s["available_ports"] for s in self.charging_stations)

        return {
            "network_status": "ONLINE",
            "total_hubs": len(self.charging_stations),
            "total_ports": total_ports,
            "available_ports": available_ports,
            "total_grid_draw_kw": total_load,
            "clean_energy_share_pct": 74.2,
            "average_tariff_usd_kwh": 0.135,
            "hubs": self.charging_stations
        }

    def reserve_smart_charging_slot(self, reservation_req: Dict[str, Any]) -> Dict[str, Any]:
        """Reserves a charger port for an in-transit low-SoC vehicle."""
        vehicle_id = reservation_req.get("vehicle_id", "EV_UNKNOWN")
        preferred_hub = reservation_req.get("hub_id", "HUB-03-E")

        hub = next((h for h in self.charging_stations if h["id"] == preferred_hub), self.charging_stations[0])

        return {
            "reservation_id": f"RES-{vehicle_id[:6]}-2026",
            "vehicle_id": vehicle_id,
            "assigned_hub": hub["name"],
            "hub_id": hub["id"],
            "allocated_power_kw": 50.0,
            "dynamic_tariff": hub["rate_per_kwh"],
            "status": "CONFIRMED",
            "green_routing_clearance": True
        }

    def run_service_audit(self):
        telemetry = self.get_grid_telemetry()
        sample_reservations = [
            {"vehicle_id": "EV_FLEET_01", "hub_id": "HUB-03-E"},
            {"vehicle_id": "EV_FLEET_03", "hub_id": "HUB-04-S"}
        ]
        res_records = [self.reserve_smart_charging_slot(r) for r in sample_reservations]

        out_path = os.path.join(os.path.dirname(__file__), "..", "ev_grid_service_audit.json")
        out_path = os.path.abspath(out_path)

        with open(out_path, "w", encoding="utf-8") as f:
            json.dump({
                "day": 24,
                "service": "EV Smart Grid Telemetry & Priority Dispatch Service",
                "telemetry": telemetry,
                "reservation_records": res_records
            }, f, indent=2)

        print("=" * 72)
        print("      ECOTWIN EV SMART CHARGING GRID SERVICE AUDIT")
        print("=" * 72)
        print(f"[GRID TELEMETRY] Total Load: {telemetry['total_grid_draw_kw']} kW | Available Ports: {telemetry['available_ports']}/{telemetry['total_ports']}")
        print(f"                 Renewable Mix: {telemetry['clean_energy_share_pct']}% | Mean Rate: ${telemetry['average_tariff_usd_kwh']}/kWh")
        print("-" * 72)
        for r in res_records:
            print(f"[RESERVATION] {r['reservation_id']} -> {r['vehicle_id']:12s} @ {r['assigned_hub']:22s} | Status: {r['status']}")
        print("-" * 72)
        print(f"[PASS] EV grid service audit complete. Telemetry saved to {out_path}")
        print("=" * 72)
        return telemetry

if __name__ == "__main__":
    service = EVGridService()
    service.run_service_audit()