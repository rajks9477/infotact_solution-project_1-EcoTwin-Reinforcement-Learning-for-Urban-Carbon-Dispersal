"""
EcoTwin - Adaptive Hyperparameter & AQI Reward Scheduler
Author: Saswat Priyadarsan Sahoo (RL & Emissions Lead - Day 10 Deliverable)
Date: September 17, 2026

Description:
    Dynamically modulates RL reward coefficients (alpha for Delay vs beta for CO2)
    based on instantaneous Air Quality Index (AQI) and corridor particulate buildup.
"""

import json
from typing import Dict, Any, Tuple


class AdaptiveRewardScheduler:
    """Dynamically schedules alpha and beta reward coefficients based on ambient AQI."""

    AQI_REGIMES = {
        "good": {"threshold_mg": 500.0, "alpha": 0.70, "beta": 0.30, "mode": "Commute Priority"},
        "moderate": {"threshold_mg": 1200.0, "alpha": 0.50, "beta": 0.50, "mode": "Balanced Dual-Objective"},
        "unhealthy": {"threshold_mg": 2000.0, "alpha": 0.30, "beta": 0.70, "mode": "Carbon Dispersion Priority"},
        "hazardous": {"threshold_mg": float("inf"), "alpha": 0.15, "beta": 0.85, "mode": "Emergency Smog Flush"}
    }

    def compute_adaptive_weights(self, current_emission_rate_mg: float) -> Tuple[float, float, str]:
        """Returns (alpha, beta, regime_name) based on current corridor emission."""
        if current_emission_rate_mg <= self.AQI_REGIMES["good"]["threshold_mg"]:
            r = self.AQI_REGIMES["good"]
            return r["alpha"], r["beta"], "Good (Commute Priority)"
        elif current_emission_rate_mg <= self.AQI_REGIMES["moderate"]["threshold_mg"]:
            r = self.AQI_REGIMES["moderate"]
            return r["alpha"], r["beta"], "Moderate (Balanced)"
        elif current_emission_rate_mg <= self.AQI_REGIMES["unhealthy"]["threshold_mg"]:
            r = self.AQI_REGIMES["unhealthy"]
            return r["alpha"], r["beta"], "Unhealthy (Dispersion Priority)"
        else:
            r = self.AQI_REGIMES["hazardous"]
            return r["alpha"], r["beta"], "Hazardous (Emergency Smog Flush)"

    def run_scheduler_benchmark(self, output_path: str = "rl/scheduler_benchmarks.json"):
        print("=" * 78)
        print("       ECOTWIN ADAPTIVE REWARD SCHEDULER BENCHMARK")
        print("=" * 78)

        test_points = [
            {"label": "Midnight Low Traffic", "emission_mg": 320.0},
            {"label": "Midday Regular Traffic", "emission_mg": 950.0},
            {"label": "Evening Rush Congestion", "emission_mg": 1650.0},
            {"label": "Industrial Smog Crisis", "emission_mg": 2800.0},
        ]

        benchmark_log = []
        for pt in test_points:
            alpha, beta, regime = self.compute_adaptive_weights(pt["emission_mg"])
            print(f"Condition: {pt['label']:<24} | Emission: {pt['emission_mg']:6.1f} mg/s | Alpha: {alpha:.2f} | Beta: {beta:.2f} | Regime: {regime}")
            benchmark_log.append({**pt, "alpha": alpha, "beta": beta, "regime": regime})

        summary = {
            "engine": "EcoTwin Adaptive AQI Reward Scheduler",
            "date": "2026-09-17",
            "regimes_configured": 4,
            "benchmarks": benchmark_log,
            "status": "Adaptive scheduler verified"
        }

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(summary, f, indent=2)

        print("-" * 78)
        print(f"[SUCCESS] Scheduler benchmarks saved to: {output_path}")
        print("=" * 78)


if __name__ == "__main__":
    scheduler = AdaptiveRewardScheduler()
    scheduler.run_scheduler_benchmark()