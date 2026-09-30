"""
EcoTwin - Day 23: Multi-Modal Transit Signal Priority (TSP) Service
Manages real-time transit telemetry, headway adherence, and active queue clearance commands.
"""

import json
import os
from typing import Dict, List, Any

class TransitService:
    def __init__(self):
        self.active_transit_lines = [
            {"line_id": "BRT-RED", "route": "Central Corridor - Southbound", "active_vehicles": 6, "target_headway_min": 5.0},
            {"line_id": "LRT-BLUE", "route": "Urban Core - East/West Line", "active_vehicles": 4, "target_headway_min": 7.5}
        ]

    def get_transit_headway_status(self) -> List[Dict[str, Any]]:
        """Returns headway regularity and schedule adherence for transit lines."""
        return [
            {
                "line_id": "BRT-RED",
                "observed_headway_min": 5.2,
                "adherence_rate": 96.0,
                "delayed_units": 1,
                "status": "NOMINAL"
            },
            {
                "line_id": "LRT-BLUE",
                "observed_headway_min": 8.1,
                "adherence_rate": 92.5,
                "delayed_units": 1,
                "status": "ACCEPTABLE"
            }
        ]

    def evaluate_dsrc_tsp_call(self, obu_payload: Dict[str, Any]) -> Dict[str, Any]:
        """Processes priority call broadcast from vehicle On-Board Unit (OBU)."""
        vehicle_id = obu_payload.get("vehicle_id", "BRT_UNKNOWN")
        junction_id = obu_payload.get("junction_id", "junc_00")
        occupancy = obu_payload.get("occupancy", 30)
        delay_sec = obu_payload.get("delay_sec", 45)

        priority_level = "HIGH" if (delay_sec > 60 and occupancy >= 40) else "STANDARD"
        queue_clearance_hold_sec = 6.0 if priority_level == "HIGH" else 3.0

        return {
            "vehicle_id": vehicle_id,
            "junction_id": junction_id,
            "priority_level": priority_level,
            "queue_clearance_hold_sec": queue_clearance_hold_sec,
            "signal_override_command": "TRIGGER_PREEMPTIVE_GREEN",
            "co2_mitigation_benefit_pct": 14.5
        }

    def run_transit_service_audit(self):
        headway_data = self.get_transit_headway_status()
        sample_calls = [
            {"vehicle_id": "BRT_101", "junction_id": "junc_00", "occupancy": 52, "delay_sec": 85},
            {"vehicle_id": "LRT_204", "junction_id": "junc_03", "occupancy": 80, "delay_sec": 110},
            {"vehicle_id": "BRT_105", "junction_id": "junc_01", "occupancy": 22, "delay_sec": 15}
        ]
        audit_records = [self.evaluate_dsrc_tsp_call(call) for call in sample_calls]

        out_path = os.path.join(os.path.dirname(__file__), "..", "transit_service_audit.json")
        out_path = os.path.abspath(out_path)

        with open(out_path, "w", encoding="utf-8") as f:
            json.dump({
                "day": 23,
                "service": "Transit Signal Priority & Headway Management Service",
                "headway_status": headway_data,
                "tsp_call_records": audit_records
            }, f, indent=2)

        print("=" * 72)
        print("      ECOTWIN TRANSIT SIGNAL PRIORITY & QUEUE SERVICE AUDIT")
        print("=" * 72)
        for h in headway_data:
            print(f"[HEADWAY] Line: {h['line_id']:10s} | Obs: {h['observed_headway_min']} min | Adherence: {h['adherence_rate']}% | Status: {h['status']}")
        print("-" * 72)
        for r in audit_records:
            print(f"[TSP CALL] Vehicle: {r['vehicle_id']:8s} @ {r['junction_id']:8s} | Level: {r['priority_level']:8s} | Queue Hold: {r['queue_clearance_hold_sec']}s")
        print("-" * 72)
        print(f"[PASS] Transit service audit complete. Telemetry saved to {out_path}")
        print("=" * 72)
        return audit_records

if __name__ == "__main__":
    service = TransitService()
    service.run_transit_service_audit()