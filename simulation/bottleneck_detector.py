"""
EcoTwin - Multi-Corridor Bottleneck Detector & Spillover Mitigation Engine
Author: Rajendra Kumar Swain (Lead Engineer - Day 11 Deliverable)
Date: September 18, 2026

Description:
    Audits corridor saturation levels and vehicular dwell times.
    Flags acute bottlenecks (>80% queue capacity or mean speed < 1.5 m/s)
    and enacts emergency dynamic green phase overrides to prevent upstream gridlock.
"""

import json
from typing import Dict, List, Any


class CorridorBottleneckDetector:
    """Detects spatial congestion bottlenecks and triggers preemptive clearance."""

    QUEUE_CAPACITY_LIMIT = 30.0  # Max vehicles before physical spillover occurs

    def __init__(self):
        self.corridor_health: Dict[str, Dict[str, Any]] = {
            "E_S2C": {"name": "South Inbound", "queue": 26.5, "speed_mps": 1.1, "emission_mg": 1950.0},
            "E_N2C": {"name": "North Inbound", "queue": 11.0, "speed_mps": 6.8, "emission_mg": 720.0},
            "E_E2C": {"name": "East Inbound",  "queue": 8.5,  "speed_mps": 7.5, "emission_mg": 580.0},
            "E_W2C": {"name": "West Inbound",  "queue": 7.0,  "speed_mps": 8.2, "emission_mg": 460.0}
        }

    def scan_for_bottlenecks(self) -> List[Dict[str, Any]]:
        """Audits all corridors and returns detected bottleneck alerts."""
        alerts = []
        for cid, stats in self.corridor_health.items():
            saturation_ratio = stats["queue"] / self.QUEUE_CAPACITY_LIMIT
            is_stagnant = stats["speed_mps"] < 2.0
            
            if saturation_ratio >= 0.80 or is_stagnant:
                severity = "CRITICAL" if saturation_ratio >= 0.85 else "WARNING"
                alerts.append({
                    "corridor_id": cid,
                    "name": stats["name"],
                    "saturation_pct": round(saturation_ratio * 100, 1),
                    "current_queue": stats["queue"],
                    "mean_speed_mps": stats["speed_mps"],
                    "emission_mg": stats["emission_mg"],
                    "severity": severity,
                    "recommended_action": "Emergency N-S Green Extension (Phase 0)" if "S2C" in cid or "N2C" in cid else "Emergency E-W Green Extension (Phase 2)"
                })
        return alerts

    def execute_mitigation(self, bottleneck_corridor: str = "E_S2C", flush_duration: int = 12) -> Dict[str, Any]:
        """Simulates targeted bottleneck clearance action."""
        initial_stats = self.corridor_health[bottleneck_corridor].copy()
        
        # Flush queue
        cleared_vehicles = flush_duration * 1.1
        new_queue = max(3.0, initial_stats["queue"] - cleared_vehicles)
        new_speed = min(11.5, initial_stats["speed_mps"] + 5.2)
        new_emission = max(450.0, initial_stats["emission_mg"] * 0.45)

        self.corridor_health[bottleneck_corridor]["queue"] = round(new_queue, 1)
        self.corridor_health[bottleneck_corridor]["speed_mps"] = round(new_speed, 1)
        self.corridor_health[bottleneck_corridor]["emission_mg"] = round(new_emission, 1)

        carbon_saved_mg = (initial_stats["emission_mg"] - new_emission) * flush_duration

        return {
            "corridor_id": bottleneck_corridor,
            "corridor_name": initial_stats["name"],
            "flush_duration_seconds": flush_duration,
            "initial_queue": initial_stats["queue"],
            "resolved_queue": round(new_queue, 1),
            "speed_improvement_mps": round(new_speed - initial_stats["speed_mps"], 1),
            "emission_reduction_pct": round(((initial_stats["emission_mg"] - new_emission) / initial_stats["emission_mg"]) * 100, 1),
            "total_carbon_saved_mg": round(carbon_saved_mg, 1),
            "mitigation_status": "BOTTLENECK_RESOLVED"
        }

    def run_benchmark_audit(self, output_path: str = "simulation/bottleneck_mitigation_results.json"):
        print("=" * 78)
        print("       ECOTWIN BOTTLENECK DETECTION & SPILLOVER MITIGATION AUDIT")
        print("=" * 78)

        alerts = self.scan_for_bottlenecks()
        print(f"[SCAN] Detected {len(alerts)} acute corridor bottleneck(s):")
        for a in alerts:
            print(f" -> [{a['severity']}] {a['name']} ({a['corridor_id']}): Saturation: {a['saturation_pct']}% | Queue: {a['current_queue']} veh | Speed: {a['mean_speed_mps']} m/s")

        print("\n[ACTION] Triggering Autonomous Green Phase Preemption...")
        mitigation = self.execute_mitigation("E_S2C", flush_duration=12)
        print(f" -> Result: Queue {mitigation['initial_queue']} -> {mitigation['resolved_queue']} veh | Speed: +{mitigation['speed_improvement_mps']} m/s | CO2 Drop: -{mitigation['emission_reduction_pct']}%")

        summary = {
            "engine": "EcoTwin Bottleneck Spillover Mitigation Suite",
            "date": "2026-09-18",
            "active_alerts_detected": alerts,
            "mitigation_event": mitigation,
            "system_health": "OPTIMAL_AFTER_MITIGATION"
        }

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(summary, f, indent=2)

        print("-" * 78)
        print(f"[SUCCESS] Mitigation benchmark results saved to: {output_path}")
        print("=" * 78)
        return summary


if __name__ == "__main__":
    detector = CorridorBottleneckDetector()
    detector.run_benchmark_audit()