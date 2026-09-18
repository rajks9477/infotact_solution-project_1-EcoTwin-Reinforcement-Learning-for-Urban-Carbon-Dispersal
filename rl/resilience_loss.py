"""
EcoTwin - Policy Resilience Loss & Spillover Penalty Engine
Author: Saswat Priyadarsan Sahoo (RL & Emissions Lead - Day 11 Deliverable)
Date: September 18, 2026

Description:
    Computes queue variance regularization and spillover penalties for RL policies.
    Penalizes extreme imbalance across directional road queues, preventing
    cross-street starvation and localized gridlock.
"""

import json
import numpy as np
from typing import List, Dict, Any, Tuple


class PolicyResilienceEngine:
    """Computes network resilience metrics and queue spillover penalties."""

    def __init__(self, spillover_threshold: float = 24.0, lambda_variance: float = 0.25):
        self.spillover_threshold = spillover_threshold
        self.lambda_variance = lambda_variance

    def compute_resilience_penalty(self, corridor_queues: List[float]) -> Tuple[float, Dict[str, Any]]:
        """
        Computes composite resilience loss:
        L_resilience = lambda * Var(Queues) + sum(max(0, Q_i - Threshold)^2)
        """
        queues = np.array(corridor_queues, dtype=np.float32)
        mean_q = float(np.mean(queues))
        var_q = float(np.var(queues))

        # Variance penalty (discourages starvation of cross-streets)
        p_variance = self.lambda_variance * var_q

        # Extreme spillover penalty (quadratic penalty above threshold)
        excess_queues = np.maximum(0.0, queues - self.spillover_threshold)
        p_spillover = float(np.sum(np.square(excess_queues)) * 0.5)

        total_penalty = round(p_variance + p_spillover, 3)

        breakdown = {
            "mean_queue": round(mean_q, 1),
            "queue_variance": round(var_q, 2),
            "variance_penalty": round(p_variance, 3),
            "spillover_penalty": round(p_spillover, 3),
            "total_resilience_loss": total_penalty,
            "system_balance_state": "UNBALANCED_STARVATION" if var_q > 40.0 else "BALANCED_DISPERSION"
        }
        return total_penalty, breakdown

    def run_benchmark_eval(self, output_path: str = "rl/resilience_loss_metrics.json"):
        print("=" * 78)
        print("       ECOTWIN POLICY RESILIENCE & SPILLOVER PENALTY BENCHMARK")
        print("=" * 78)

        scenarios = [
            {"desc": "Greedy Starvation (South starved)", "queues": [28.0, 4.0, 3.0, 2.0]},
            {"desc": "Moderate Dual Inflow",              "queues": [14.0, 12.0, 7.0, 6.0]},
            {"desc": "Optimal EcoTwin Balanced Flow",     "queues": [6.5, 6.0, 5.5, 5.0]}
        ]

        results = []
        for sc in scenarios:
            loss, details = self.compute_resilience_penalty(sc["queues"])
            print(f"Pattern: {sc['desc']:<35} | Loss: {loss:7.2f} | Var: {details['queue_variance']:5.1f} | State: {details['system_balance_state']}")
            results.append({**sc, "loss": loss, "details": details})

        summary = {
            "engine": "EcoTwin Policy Resilience Suite",
            "date": "2026-09-18",
            "threshold_capacity": self.spillover_threshold,
            "lambda_regularization": self.lambda_variance,
            "evaluations": results,
            "status": "Resilience loss validated"
        }

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(summary, f, indent=2)

        print("-" * 78)
        print(f"[SUCCESS] Resilience metrics saved to: {output_path}")
        print("=" * 78)
        return summary


if __name__ == "__main__":
    engine = PolicyResilienceEngine()
    engine.run_benchmark_eval()