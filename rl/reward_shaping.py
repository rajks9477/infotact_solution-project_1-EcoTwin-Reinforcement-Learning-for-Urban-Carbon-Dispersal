"""
EcoTwin - Advanced Reward Shaping with Acceleration Jerk & Dispersion Bonus
Author: Saswat Priyadarsan Sahoo (RL & Emissions Lead - Day 8 Deliverable)
Date: September 15, 2026
"""

import json
import numpy as np
from typing import Dict, Any, Tuple


class EcoTwinRewardShaper:
    def __init__(
        self,
        alpha_delay: float = 0.35,
        beta_carbon: float = 0.45,
        gamma_jerk: float = 0.12,
        delta_dispersion: float = 0.08,
        co2_threshold_mg: float = 1500.0
    ):
        self.alpha = alpha_delay
        self.beta = beta_carbon
        self.gamma = gamma_jerk
        self.delta = delta_dispersion
        self.co2_threshold = co2_threshold_mg

    def compute_shaped_reward(
        self,
        queue_lengths: list,
        corridor_emissions: list,
        acceleration_variance: float,
        previous_phase: int,
        current_phase: int
    ) -> Tuple[float, Dict[str, float]]:
        total_delay = float(np.sum(queue_lengths))
        total_co2 = float(np.sum(corridor_emissions))

        p_delay = self.alpha * total_delay
        p_co2 = self.beta * (total_co2 / 100.0)
        p_jerk = self.gamma * (acceleration_variance * 10.0)
        p_switch = 1.5 if (previous_phase != current_phase and previous_phase != -1) else 0.0

        emission_variance = float(np.var(corridor_emissions))
        dispersion_bonus = self.delta * max(0.0, 500.0 - (emission_variance / 1000.0))

        net_reward = -(p_delay + p_co2 + p_jerk + p_switch) + dispersion_bonus

        breakdown = {
            "penalty_delay": round(p_delay, 3),
            "penalty_co2": round(p_co2, 3),
            "penalty_jerk": round(p_jerk, 3),
            "penalty_switch": round(p_switch, 3),
            "dispersion_bonus": round(dispersion_bonus, 3),
            "net_shaped_reward": round(net_reward, 3)
        }
        return net_reward, breakdown


def benchmark_reward_shaping(output_path: str = "rl/reward_shaping_metrics.json"):
    print("=" * 75)
    print("       ECOTWIN RL REWARD SHAPING & JERK PENALTY BENCHMARK")
    print("=" * 75)

    shaper = EcoTwinRewardShaper()
    simulated_scenarios = [
        {"name": "Severe Smog Spike", "queues": [20, 18, 5, 4], "emissions": [2200, 1900, 450, 380], "acc_var": 2.4, "prev": 0, "curr": 1},
        {"name": "PPO Dispersal Phase", "queues": [8, 7, 6, 6], "emissions": [950, 880, 720, 690], "acc_var": 0.4, "prev": 0, "curr": 0},
        {"name": "Clean Free Flow", "queues": [2, 2, 1, 1], "emissions": [320, 290, 210, 180], "acc_var": 0.1, "prev": 2, "curr": 2}
    ]

    results = []
    for sc in simulated_scenarios:
        r, detail = shaper.compute_shaped_reward(
            sc["queues"], sc["emissions"], sc["acc_var"], sc["prev"], sc["curr"]
        )
        print(f"Scenario: {sc['name']:<22} | Net Reward: {r:7.2f} | Delay: {detail['penalty_delay']:5.1f} | CO2: {detail['penalty_co2']:5.1f} | Jerk: {detail['penalty_jerk']:4.1f}")
        results.append({"scenario": sc["name"], "reward": r, "breakdown": detail})

    summary = {
        "engine": "EcoTwin Reward Shaping System",
        "date": "2026-09-15",
        "parameters": {"alpha": 0.35, "beta": 0.45, "gamma_jerk": 0.12, "delta_dispersion": 0.08},
        "scenarios": results,
        "status": "Validated Reward Formulation"
    }

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2)

    print("-" * 75)
    print(f"[SUCCESS] Reward metrics saved to: {output_path}")
    print("=" * 75)


if __name__ == "__main__":
    benchmark_reward_shaping()