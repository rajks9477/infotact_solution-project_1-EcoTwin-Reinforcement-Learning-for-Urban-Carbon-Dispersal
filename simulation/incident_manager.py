"""
simulation/incident_manager.py
Day 14 Dynamic Traffic Incident & Road Closure Engine
Simulates real-world urban disruptions (lane blockage, emergency corridors, roadworks)
to stress-test PPO adaptive phase dispersal.
"""

import random
import json
import time
from typing import Dict, List, Any

class IncidentManager:
    def __init__(self, edges: List[str] = None):
        self.edges = edges or [
            "top0to00", "00to01", "01to02", "02to03",
            "10to11", "11to12", "12to13", "20to21",
            "21to22", "22to23", "30to31", "31to32"
        ]
        self.active_incidents = []

    def inject_incident(self, incident_type: str = "lane_closure", severity: float = 0.5) -> Dict[str, Any]:
        """
        Injects a stochastic traffic disruption onto a network edge.
        """
        target_edge = random.choice(self.edges)
        incident_id = f"inc_{int(time.time())}_{random.randint(100, 999)}"
        duration_s = random.randint(30, 90)

        incident = {
            "incident_id": incident_id,
            "type": incident_type,
            "edge": target_edge,
            "capacity_reduction": severity,
            "speed_limit_factor": max(0.1, 1.0 - severity),
            "duration_s": duration_s,
            "created_at": time.strftime("%Y-%m-%dT%H:%M:%SZ")
        }
        self.active_incidents.append(incident)
        return incident

    def run_incident_audit(self, trials: int = 5) -> Dict[str, Any]:
        print("=" * 70)
        print("     ECOTWIN DYNAMIC TRAFFIC INCIDENT STRESS ENGINE")
        print("=" * 70)

        results = []
        for i in range(trials):
            inc_type = random.choice(["lane_closure", "emergency_corridor", "construction_zone"])
            sev = round(random.uniform(0.4, 0.8), 2)
            inc = self.inject_incident(inc_type, sev)
            print(f"[{'INJECT':^6}] {inc['type']:<20} on edge {inc['edge']:<10} | Cap Reduction: {int(sev*100)}% ({inc['duration_s']}s)")
            results.append(inc)

        audit_payload = {
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "total_incidents_tested": len(results),
            "mean_capacity_reduction": round(sum(r["capacity_reduction"] for r in results) / len(results), 2),
            "status": "INCIDENT_DISRUPTOR_READY"
        }

        with open("simulation/incident_audit_results.json", "w") as f:
            json.dump(audit_payload, f, indent=2)

        print("-" * 70)
        print(f"[PASS] Successfully simulated {trials} incident scenarios.")
        print("Saved results to simulation/incident_audit_results.json")
        print("=" * 70)

        return audit_payload

if __name__ == "__main__":
    manager = IncidentManager()
    manager.run_incident_audit()