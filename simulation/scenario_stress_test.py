"""
EcoTwin - Multi-Scenario Traffic Stress Testing & Resilience Engine
Author: Rajendra Kumar Swain (Lead Engineer - Day 10 Deliverable)
Date: September 17, 2026

Description:
    Evaluates junction resilience across 3 real-world stress scenarios:
    1. Normal Flow (Standard 320 veh demand)
    2. Morning Rush Hour Surge (+80% inbound queue spike)
    3. Toxic Smog Crisis (Heavy diesel truck fleet on South Corridor)
    Computes comparative queue clearance times, peak emissions, and clearance efficiency.
"""

import json
from typing import Dict, List, Any


class ScenarioStressTestEngine:
    """Stress tests junction signal response against acute urban traffic surges."""

    SCENARIOS = {
        "normal_flow": {
            "name": "Standard Urban Flow",
            "traffic_load_multiplier": 1.0,
            "diesel_ratio": 0.15,
            "base_queues": {"South": 12.0, "North": 10.0, "East": 8.0, "West": 6.0},
            "emission_factor": 1.0
        },
        "morning_rush_surge": {
            "name": "Morning Rush Hour Surge (+80%)",
            "traffic_load_multiplier": 1.8,
            "diesel_ratio": 0.20,
            "base_queues": {"South": 32.0, "North": 24.0, "East": 20.0, "West": 14.0},
            "emission_factor": 1.55
        },
        "toxic_smog_crisis": {
            "name": "Toxic Industrial Smog Emergency",
            "traffic_load_multiplier": 1.4,
            "diesel_ratio": 0.55,
            "base_queues": {"South": 40.0, "North": 15.0, "East": 12.0, "West": 10.0},
            "emission_factor": 2.40
        }
    }

    def evaluate_scenario(self, scenario_key: str, sim_steps: int = 40) -> Dict[str, Any]:
        cfg = self.SCENARIOS[scenario_key]
        queues = cfg["base_queues"].copy()
        
        cumulative_co2_grams = 0.0
        max_single_step_co2_mg = 0.0

        for step in range(1, sim_steps + 1):
            # Alternate signal phases: 0 (N-S Flush) vs 2 (E-W Flush)
            phase = 0 if (step % 20 < 10) else 2
            step_co2_mg = 0.0

            for corridor, q in queues.items():
                is_active = (phase == 0 and corridor in ["South", "North"]) or (phase == 2 and corridor in ["East", "West"])
                
                if is_active:
                    # Dissipate queue
                    cleared = max(2.0, q - 1.2)
                    queues[corridor] = round(cleared, 1)
                    step_co2_mg += cleared * 75.0 * cfg["emission_factor"]
                else:
                    # Inactive corridor idles and pollutes
                    accumulated = q + (0.35 * cfg["traffic_load_multiplier"])
                    queues[corridor] = round(accumulated, 1)
                    step_co2_mg += accumulated * 110.0 * cfg["emission_factor"]

            cumulative_co2_grams += (step_co2_mg / 1000.0)
            if step_co2_mg > max_single_step_co2_mg:
                max_single_step_co2_mg = step_co2_mg

        total_remaining_vehicles = sum(queues.values())
        initial_vehicles = sum(cfg["base_queues"].values())
        clearance_rate_pct = round(max(0.0, (1.0 - (total_remaining_vehicles / (initial_vehicles * 1.5)))) * 100, 1)

        return {
            "scenario_key": scenario_key,
            "scenario_name": cfg["name"],
            "traffic_load_multiplier": cfg["traffic_load_multiplier"],
            "total_co2_grams": round(cumulative_co2_grams, 2),
            "peak_emission_rate_mg_s": round(max_single_step_co2_mg, 1),
            "final_queues": queues,
            "clearance_efficiency_pct": clearance_rate_pct,
            "air_quality_impact": "Hazardous" if cumulative_co2_grams > 300 else "Moderate" if cumulative_co2_grams > 150 else "Good"
        }

    def run_full_stress_benchmark(self, output_path: str = "simulation/stress_test_report.json"):
        print("=" * 78)
        print("       ECOTWIN MULTI-SCENARIO TRAFFIC STRESS BENCHMARK")
        print("=" * 78)

        benchmark_results = {}
        for key in self.SCENARIOS:
            report = self.evaluate_scenario(key)
            benchmark_results[key] = report
            print(f"Scenario: {report['scenario_name']:<35} | Total CO2: {report['total_co2_grams']:6.1f}g | Peak: {report['peak_emission_rate_mg_s']:7.1f} mg/s | AQI: {report['air_quality_impact']}")

        summary = {
            "engine": "EcoTwin Multi-Scenario Stress Testing Suite",
            "date": "2026-09-17",
            "tested_scenarios": len(self.SCENARIOS),
            "results": benchmark_results,
            "status": "All stress tests executed successfully"
        }

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(summary, f, indent=2)

        print("-" * 78)
        print(f"[SUCCESS] Stress benchmark report saved to: {output_path}")
        print("=" * 78)
        return summary


if __name__ == "__main__":
    engine = ScenarioStressTestEngine()
    engine.run_full_stress_benchmark()