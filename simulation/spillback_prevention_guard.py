"""
EcoTwin - Day 27: Cross-Corridor Traffic Spillback Prevention & Gridlock Guard
Detects downstream bay saturation and meters upstream inflow to protect junction box clearance.
"""

import json
import os

class SpillbackPreventionGuard:
    def __init__(self, critical_occupancy_threshold=0.85, link_capacity_veh=30):
        self.critical_threshold = critical_occupancy_threshold
        self.link_capacity = link_capacity_veh
        self.corridor_links = [
            {"link_id": "LINK_00_02", "upstream": "junc_00", "downstream": "junc_02", "queue_veh": 27, "flow_capacity": 30},
            {"link_id": "LINK_01_03", "upstream": "junc_01", "downstream": "junc_03", "queue_veh": 14, "flow_capacity": 30},
            {"link_id": "LINK_02_00", "upstream": "junc_02", "downstream": "junc_00", "queue_veh": 11, "flow_capacity": 30},
            {"link_id": "LINK_03_01", "upstream": "junc_03", "downstream": "junc_01", "queue_veh": 26, "flow_capacity": 30}
        ]

    def evaluate_spillback_risk(self, link):
        """Calculates spillback risk index and meters upstream green time if critical."""
        occupancy_ratio = link["queue_veh"] / link["flow_capacity"]

        if occupancy_ratio >= self.critical_threshold:
            guard_status = "CRITICAL_SPILLBACK_RISK"
            upstream_metering_pct = 45.0  # Reduce upstream green by 45%
            action = "UPSTREAM_METERING_ACTIVE"
            gridlock_prevention_score = 0.96
        elif occupancy_ratio >= 0.70:
            guard_status = "ELEVATED_DENSITY"
            upstream_metering_pct = 20.0
            action = "ADVISORY_THROTTLING"
            gridlock_prevention_score = 0.88
        else:
            guard_status = "FLOW_NOMINAL"
            upstream_metering_pct = 0.0
            action = "NORMAL_PROGRESSION"
            gridlock_prevention_score = 1.0

        co2_gridlock_spike_avoided_kg = round(link["queue_veh"] * 0.048 * (upstream_metering_pct / 10.0), 3)

        return {
            "link_id": link["link_id"],
            "upstream_junction": link["upstream"],
            "downstream_junction": link["downstream"],
            "occupancy_pct": round(occupancy_ratio * 100, 1),
            "guard_status": guard_status,
            "action": action,
            "upstream_metering_pct": upstream_metering_pct,
            "co2_spike_avoided_kg": co2_gridlock_spike_avoided_kg,
            "prevention_score": gridlock_prevention_score
        }

    def run_guard_audit(self):
        evaluations = [self.evaluate_spillback_risk(l) for l in self.corridor_links]
        critical_links = sum(1 for e in evaluations if e["guard_status"] == "CRITICAL_SPILLBACK_RISK")
        total_co2_prevented = sum(e["co2_spike_avoided_kg"] for e in evaluations)

        audit_path = os.path.join(os.path.dirname(__file__), "spillback_guard_audit.json")
        audit_data = {
            "day": 27,
            "module": "Cross-Corridor Traffic Spillback Prevention & Gridlock Guard",
            "critical_links_detected": critical_links,
            "total_co2_spike_prevented_kg": round(total_co2_prevented, 2),
            "evaluations": evaluations
        }

        with open(audit_path, "w", encoding="utf-8") as f:
            json.dump(audit_data, f, indent=2)

        print("=" * 72)
        print("      ECOTWIN GRIDLOCK GUARD & ANTI-SPILLBACK AUDIT")
        print("=" * 72)
        for e in evaluations:
            print(f"[LINK] {e['link_id']:12s} ({e['upstream_junction']} -> {e['downstream_junction']}) | Occ: {e['occupancy_pct']:4.1f}% | Status: {e['guard_status']:23s} | Action: {e['action']}")
        print("-" * 72)
        print(f"[AVOIDANCE] Total Gridlock CO2 Spike Prevented: {total_co2_prevented} kg")
        print(f"[PASS] Spillback guard audit complete. Telemetry saved to {audit_path}")
        print("=" * 72)
        return audit_data

if __name__ == "__main__":
    guard = SpillbackPreventionGuard()
    guard.run_guard_audit()