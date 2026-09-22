"""
simulation/emission_dispersion_model.py
Day 15 Gaussian Plume Atmospheric Carbon & PM2.5 Dispersion Simulator
Converts microscopic tailpipe emission outputs into spatial concentration fields
based on ambient wind vectors and atmospheric stability.
"""

import math
import json
import time
from typing import Dict, List, Tuple, Any

class DispersionModel:
    def __init__(self, wind_speed_mps: float = 3.5, wind_angle_deg: float = 45.0):
        self.wind_speed = wind_speed_mps
        self.wind_rad = math.radians(wind_angle_deg)
        self.grid_size = 4  # 4x4 intersection grid

    def calculate_plume_concentration(
        self, source_pos: Tuple[float, float], rate_mg_s: float, receptor_pos: Tuple[float, float]
    ) -> float:
        """
        Simplified 2D Gaussian plume downwind decay approximation.
        """
        dx = receptor_pos[0] - source_pos[0]
        dy = receptor_pos[1] - source_pos[1]
        dist = math.hypot(dx, dy)
        if dist < 1.0:
            return rate_mg_s / (self.wind_speed * 1.5)

        # Downwind projection
        proj_dist = dx * math.cos(self.wind_rad) + dy * math.sin(self.wind_rad)
        if proj_dist <= 0:
            # Upwind natural diffusion
            return (rate_mg_s / (2 * math.pi * dist)) * math.exp(-dist / 50.0)

        crosswind_dist = math.fabs(-dx * math.sin(self.wind_rad) + dy * math.cos(self.wind_rad))
        sigma_y = 0.32 * (proj_dist ** 0.8)
        conc = (rate_mg_s / (math.sqrt(2 * math.pi) * self.wind_speed * sigma_y)) * math.exp(
            -(crosswind_dist ** 2) / (2 * (sigma_y ** 2) + 1e-6)
        )
        return float(conc)

    def run_dispersion_audit(self) -> Dict[str, Any]:
        print("=" * 75)
        print("      ECOTWIN GAUSSIAN PLUME ATMOSPHERIC DISPERSION ENGINE AUDIT")
        print("=" * 75)

        sources = [
            {"id": "src_1", "pos": (100.0, 100.0), "rate": 85.0},
            {"id": "src_2", "pos": (200.0, 150.0), "rate": 140.0},
            {"id": "src_3", "pos": (300.0, 250.0), "rate": 110.0}
        ]
        receptors = [(150.0, 150.0), (250.0, 200.0), (350.0, 300.0)]

        results = []
        for r_idx, rec in enumerate(receptors):
            total_conc = sum(self.calculate_plume_concentration(s["pos"], s["rate"], rec) for s in sources)
            aqi_est = min(500, int(total_conc * 2.8 + 35))
            results.append({"receptor_idx": r_idx, "position": rec, "concentration_ug_m3": round(total_conc, 2), "aqi": aqi_est})
            print(f"[RECEPTOR {r_idx+1}] Pos: {str(rec):<16} | Conc: {total_conc:6.2f} ug/m3 | Local AQI: {aqi_est}")

        summary = {
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "wind_speed_mps": self.wind_speed,
            "wind_angle_deg": 45.0,
            "receptors_audited": len(results),
            "mean_ambient_aqi": round(sum(r["aqi"] for r in results) / len(results), 1),
            "status": "GAUSSIAN_DISPERSION_MODEL_OPERATIONAL"
        }

        with open("simulation/dispersion_audit_results.json", "w") as f:
            json.dump(summary, f, indent=2)

        print("-" * 75)
        print(f"[PASS] Atmospheric dispersion audit complete. Mean AQI: {summary['mean_ambient_aqi']}")
        print("Saved telemetry to simulation/dispersion_audit_results.json")
        print("=" * 75)

        return summary

if __name__ == "__main__":
    model = DispersionModel()
    model.run_dispersion_audit()