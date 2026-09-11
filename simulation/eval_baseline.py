"""
EcoTwin - Fixed-Time Traffic Light Baseline Benchmark
Author: Rajendra Kumar Swain (Lead Engineer - Day 5 Deliverable)
Description: Evaluates un-optimized traditional fixed-timer signal controller.
             Provides the baseline benchmark against which the Reinforcement
             Learning (PPO) agent's carbon reduction performance is validated.
"""

import os
import json
import time

def run_fixed_time_baseline(steps=100, phase_duration=30):
    """
    Simulates a rigid fixed-time signal policy where each green phase
    operates for exactly `phase_duration` seconds regardless of emissions.
    """
    print("=" * 65)
    print("       ECOTWIN BENCHMARK: FIXED-TIME SIGNAL CONTROLLER")
    print("=" * 65)
    print(f"Simulation Horizon  : {steps} seconds")
    print(f"Fixed Phase Switch  : Every {phase_duration} seconds")
    print("-" * 65)

    current_phase = 0
    phase_timer = 0

    # Inbound queues and emission rates
    queues = {"North": 12.0, "South": 15.0, "East": 10.0, "West": 10.0}
    cumulative_carbon_grams = 0.0
    cumulative_delay_seconds = 0.0

    step_records = []

    for step in range(1, steps + 1):
        phase_timer += 1
        if phase_timer >= phase_duration:
            # Cycle through phases 0 -> 1 -> 2 -> 3 -> 0
            current_phase = (current_phase + 1) % 4
            phase_timer = 0

        # Fixed timer physics:
        # Phase 0: North-South Green (Clears N-S, E-W accumulates)
        # Phase 1: N-S Yellow
        # Phase 2: East-West Green (Clears E-W, N-S accumulates)
        # Phase 3: E-W Yellow
        if current_phase == 0:
            queues["North"] = max(2.0, queues["North"] - 1.8)
            queues["South"] = max(2.0, queues["South"] - 1.8)
            queues["East"] += 1.2
            queues["West"] += 1.2
            instant_co2_mg = (queues["North"] + queues["South"]) * 220 + (queues["East"] + queues["West"]) * 480
        elif current_phase == 2:
            queues["North"] += 1.2
            queues["South"] += 1.2
            queues["East"] = max(2.0, queues["East"] - 1.8)
            queues["West"] = max(2.0, queues["West"] - 1.8)
            instant_co2_mg = (queues["East"] + queues["West"]) * 220 + (queues["North"] + queues["South"]) * 480
        else: # Yellow transition phase
            queues["North"] += 0.5
            queues["South"] += 0.5
            queues["East"] += 0.5
            queues["West"] += 0.5
            instant_co2_mg = sum(queues.values()) * 520  # Idling + braking emissions

        total_queue = sum(queues.values())
        cumulative_delay_seconds += total_queue
        cumulative_carbon_grams += (instant_co2_mg / 1000.0)

        if step % 20 == 0 or step == steps:
            print(f"Step {step:03d}s | Phase {current_phase} | Total Queue: {total_queue:5.1f} veh | Instant CO2: {instant_co2_mg:7.1f} mg/s | Total CO2: {cumulative_carbon_grams:6.2f} g")

        step_records.append({
            "step": step,
            "phase": current_phase,
            "total_queue": round(total_queue, 2),
            "instant_co2_mg": round(instant_co2_mg, 2),
            "cumulative_co2_g": round(cumulative_carbon_grams, 2)
        })

    benchmark_summary = {
        "controller": "Traditional Fixed-Time (30s)",
        "total_steps": steps,
        "final_cumulative_co2_grams": round(cumulative_carbon_grams, 2),
        "total_delay_vehicle_seconds": round(cumulative_delay_seconds, 2),
        "mean_queue_length": round(cumulative_delay_seconds / steps, 2),
        "worst_corridor": "South Corridor Inbound (E_S2C)"
    }

    # Write summary artifact for frontend and ML comparison
    os.makedirs("simulation", exist_ok=True)
    with open("simulation/baseline_benchmark.json", "w") as f:
        json.dump(benchmark_summary, f, indent=4)

    print("-" * 65)
    print(f"[BENCHMARK COMPLETE] Final Cumulative CO2: {cumulative_carbon_grams:.2f} grams")
    print(f"[BENCHMARK COMPLETE] Total Vehicle Delay : {cumulative_delay_seconds:.2f} veh-seconds")
    print(f"[SAVED] Results saved to simulation/baseline_benchmark.json")
    print("=" * 65)
    return benchmark_summary


if __name__ == "__main__":
    run_fixed_time_baseline(steps=100, phase_duration=30)