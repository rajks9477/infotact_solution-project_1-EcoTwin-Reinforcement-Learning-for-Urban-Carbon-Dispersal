"""
simulation/congestion_pricing_model.py
Day 17 Dynamic Congestion Pricing & Elastic Eco-Rerouting Model
Simulates price-elastic route diversion away from hyper-congested carbon zones
into high-capacity peripheral arterials based on real-time toll pricing.
"""

import math
import json
import time
from typing import Dict, List, Any

class CongestionPricingModel:
    def __init__(self, base_toll_usd: float = 2.50, elasticity_beta: float = 0.45):
        self.base_toll = base_toll_usd
        self.beta = elasticity_beta  # Price sensitivity coefficient

    def calculate_dynamic_toll(self, current_density_veh: int, capacity_max: int = 40) -> float:
        """
        Computes dynamic surge toll based on edge volume-to-capacity (V/C) ratio.
        """
        vc_ratio = current_density_veh / max(1, capacity_max)
        if vc_ratio < 0.6:
            return self.base_toll
        # Exponential surge pricing for severe gridlock
        surge = self.base_toll * math.exp(1.2 * (vc_ratio - 0.6))
        return round(min(18.0, surge), 2)

    def compute_diversion_rate(self, toll_usd: float) -> float:
        """
        Logit model estimating percentage of commuters diverting to bypass corridors.
        """
        prob_divert = 1.0 / (1.0 + math.exp(-self.beta * (toll_usd - self.base_toll)))
        # Normalize to 0.0 - 0.65 max diversion
        return round(prob_divert * 0.65, 3)

    def run_pricing_audit(self) -> Dict[str, Any]:
        print("=" * 75)
        print("      ECOTWIN DYNAMIC CONGESTION PRICING & REROUTING AUDIT")
        print("=" * 75)

        corridors = [
            {"corridor": "Central Arterial (11to12)", "density": 38, "capacity": 40},
            {"corridor": "North Gateway   (top0to00)", "density": 22, "capacity": 35},
            {"corridor": "South Corridor  (21to22)", "density": 12, "capacity": 30},
            {"corridor": "East Highline   (31to32)", "density": 35, "capacity": 35}
        ]

        results = []
        for c in corridors:
            toll = self.calculate_dynamic_toll(c["density"], c["capacity"])
            divert_rate = self.compute_diversion_rate(toll)
            diverted_veh = int(c["density"] * divert_rate)
            print(f"[TOLL] {c['corridor']:<28} | Dens: {c['density']:2d}/{c['capacity']} -> Toll: ${toll:5.2f} | Diversion: {divert_rate*100:4.1f}% (-{diverted_veh} veh)")
            results.append({
                "corridor": c["corridor"],
                "density": c["density"],
                "dynamic_toll_usd": toll,
                "diversion_rate_pct": round(divert_rate * 100, 1),
                "diverted_vehicles": diverted_veh
            })

        audit_summary = {
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "corridors_analyzed": len(results),
            "mean_dynamic_toll_usd": round(sum(r["dynamic_toll_usd"] for r in results) / len(results), 2),
            "total_vehicles_diverted": sum(r["diverted_vehicles"] for r in results),
            "status": "CONGESTION_PRICING_MODEL_OPERATIONAL"
        }

        with open("simulation/congestion_pricing_audit.json", "w") as f:
            json.dump(audit_summary, f, indent=2)

        print("-" * 75)
        print(f"[PASS] Dynamic pricing simulated. Diverted {audit_summary['total_vehicles_diverted']} vehicles away from hotspots.")
        print("Telemetry saved to simulation/congestion_pricing_audit.json")
        print("=" * 75)

        return audit_summary

if __name__ == "__main__":
    model = CongestionPricingModel()
    model.run_pricing_audit()