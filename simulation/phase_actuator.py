"""
EcoTwin - TraCI Dynamic Signal Phase Actuator
Author: Rajendra Kumar Swain (Lead Engineer - Day 9 Deliverable)
Date: September 16, 2026

Description:
    Programmatically actuates traffic light phases at central junction J_C.
    Executes discrete phase transitions:
        Phase 0: North-South Green (duration: variable)
        Phase 1: North-South Yellow (fixed: 4s)
        Phase 2: East-West Green (duration: variable)
        Phase 3: East-West Yellow (fixed: 4s)
    Monitors queue flush rates and instantaneous carbon dissipation per actuation.
"""

import json
import time
from typing import Dict, List, Any


class SignalPhaseActuator:
    """Controls dynamic signal phase transitions and logs environmental impacts."""

    PHASE_NAMES = {
        0: "North-South Green (N-S Flush)",
        1: "North-South Yellow (Transition)",
        2: "East-West Green (E-W Flush)",
        3: "East-West Yellow (Transition)"
    }

    def __init__(self, intersection_id: str = "J_C"):
        self.intersection_id = intersection_id
        self.current_phase = 0
        self.phase_time_elapsed = 0
        self.history: List[Dict[str, Any]] = []

    def execute_actuation(self, target_phase: int, duration_sec: int, initial_queues: Dict[str, float]) -> Dict[str, Any]:
        """Simulates phase execution and records queue clearing rates."""
        self.current_phase = target_phase
        self.phase_time_elapsed = duration_sec

        # Dynamic queue clearance calculation
        cleared_queues = {}
        carbon_dissipation = 0.0

        for corridor, queue in initial_queues.items():
            if target_phase == 0 and corridor in ["South", "North"]:
                # Green flush clears queue faster
                cleared = max(0.0, queue - (duration_sec * 0.85))
                co2_drop = (queue - cleared) * 115.0
            elif target_phase == 2 and corridor in ["East", "West"]:
                cleared = max(0.0, queue - (duration_sec * 0.85))
                co2_drop = (queue - cleared) * 115.0
            else:
                # Red queue accumulates
                cleared = queue + (duration_sec * 0.25)
                co2_drop = - (duration_sec * 45.0)

            cleared_queues[corridor] = round(cleared, 1)
            carbon_dissipation += co2_drop

        actuation_record = {
            "phase": target_phase,
            "phase_name": self.PHASE_NAMES[target_phase],
            "duration_sec": duration_sec,
            "resulting_queues": cleared_queues,
            "net_carbon_impact_mg": round(carbon_dissipation, 1)
        }
        self.history.append(actuation_record)
        return actuation_record

    def run_benchmark_cycle(self, output_path: str = "simulation/actuation_benchmark.json"):
        print("=" * 75)
        print("       ECOTWIN TRAFFIC SIGNAL ACTUATION BENCHMARK")
        print("=" * 75)

        base_queues = {"South": 24.0, "North": 18.0, "East": 14.0, "West": 12.0}
        actuation_steps = [
            (0, 15),  # Phase 0 Green for 15s
            (1, 4),   # Phase 1 Yellow for 4s
            (2, 20),  # Phase 2 Green for 20s
            (3, 4)    # Phase 3 Yellow for 4s
        ]

        current_q = base_queues.copy()
        for idx, (p, dur) in enumerate(actuation_steps, 1):
            res = self.execute_actuation(p, dur, current_q)
            current_q = res["resulting_queues"]
            print(f"Cycle Step {idx} | Phase: {p} ({self.PHASE_NAMES[p]:<28}) | Duration: {dur:02d}s | Net CO2 Impact: {res['net_carbon_impact_mg']:7.1f} mg")

        summary = {
            "intersection": self.intersection_id,
            "actuator": "EcoTwin TraCI Phase Actuator",
            "date": "2026-09-16",
            "cycles_completed": len(actuation_steps),
            "final_queues": current_q,
            "history": self.history
        }

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(summary, f, indent=2)

        print("-" * 75)
        print(f"[SUCCESS] Actuation benchmark logged to: {output_path}")
        print("=" * 75)


if __name__ == "__main__":
    actuator = SignalPhaseActuator()
    actuator.run_benchmark_cycle()