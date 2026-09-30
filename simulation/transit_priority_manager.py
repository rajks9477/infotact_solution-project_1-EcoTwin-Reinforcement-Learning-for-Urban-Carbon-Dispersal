"""
EcoTwin - Day 23: Multi-Modal Transit Signal Priority (TSP) & Active Queue Clearance
Simulates priority green extension and red truncation for high-occupancy transit vehicles.
"""

import json
import os

class TransitPriorityManager:
    def __init__(self, headway_threshold_sec=60, passenger_weight_factor=25.0):
        self.headway_threshold = headway_threshold_sec
        self.passenger_weight = passenger_weight_factor
        self.transit_fleet = [
            {"bus_id": "BRT_101", "junction": "junc_00", "passengers": 45, "eta_seconds": 12.5, "schedule_delay_sec": 75},
            {"bus_id": "BRT_102", "junction": "junc_02", "passengers": 52, "eta_seconds": 8.0, "schedule_delay_sec": 120},
            {"bus_id": "BRT_103", "junction": "junc_01", "passengers": 38, "eta_seconds": 24.0, "schedule_delay_sec": -10},
            {"bus_id": "BRT_104", "junction": "junc_03", "passengers": 60, "eta_seconds": 5.2, "schedule_delay_sec": 180}
        ]

    def evaluate_priority_request(self, transit_vehicle):
        delay = transit_vehicle["schedule_delay_sec"]
        passengers = transit_vehicle["passengers"]
        eta = transit_vehicle["eta_seconds"]
        urgency_score = (delay / 60.0) * (passengers / 20.0)

        if urgency_score > 2.0 and eta <= 15.0:
            action = "ACTIVE_GREEN_EXTENSION"
            extension_sec = min(15.0, round(eta + 5.0, 1))
            status = "GRANTED_HIGH_PRIORITY"
        elif urgency_score > 1.0 and eta <= 25.0:
            action = "EARLY_GREEN_TRUNCATION"
            extension_sec = 8.0
            status = "GRANTED_MEDIUM_PRIORITY"
        else:
            action = "MAINTAIN_COORDINATION"
            extension_sec = 0.0
            status = "INSPECTION_ONLY"

        carbon_penalty_offset = round(passengers * 0.018 * (extension_sec / 10.0), 3)

        return {
            "bus_id": transit_vehicle["bus_id"],
            "junction": transit_vehicle["junction"],
            "passengers": passengers,
            "urgency_score": round(urgency_score, 2),
            "tsp_action": action,
            "granted_extension_sec": extension_sec,
            "status": status,
            "carbon_offset_kg": carbon_penalty_offset
        }

    def execute_tsp_audit(self):
        results = [self.evaluate_priority_request(b) for b in self.transit_fleet]
        audit_path = os.path.join(os.path.dirname(__file__), "transit_priority_audit.json")
        with open(audit_path, "w", encoding="utf-8") as f:
            json.dump({
                "day": 23,
                "module": "Multi-Modal Transit Signal Priority (TSP)",
                "fleet_size": len(self.transit_fleet),
                "audit_results": results
            }, f, indent=2)

        print("=" * 72)
        print("      ECOTWIN MULTI-MODAL TRANSIT SIGNAL PRIORITY (TSP) AUDIT")
        print("=" * 72)
        for r in results:
            print(f"[TSP] Bus: {r['bus_id']} @ {r['junction']} | Pax: {r['passengers']:2d} | Urgency: {r['urgency_score']:4.2f} | Action: {r['tsp_action']:24s} | Offset: {r['carbon_offset_kg']} kg CO2")
        print("-" * 72)
        print(f"[PASS] Transit Priority Audit complete. Telemetry saved to {audit_path}")
        print("=" * 72)
        return results

if __name__ == "__main__":
    manager = TransitPriorityManager()
    manager.execute_tsp_audit()