"""
EcoTwin - TraCI Simulation Engine Runner
Author: Rajendra Kumar Swain (Lead Engineer - Day 4 Deliverable)
Description: Programmatic runner for Eclipse SUMO using the TraCI interface.
             Steps the simulation, captures real-time vehicle-level HBEFA3 emissions,
             and measures corridor bottleneck metrics.
"""

import os
import sys
import time

# Ensure SUMO_HOME is set in system environment
if "SUMO_HOME" in os.environ:
    tools = os.path.join(os.environ["SUMO_HOME"], "tools")
    if tools not in sys.path:
        sys.path.append(tools)
else:
    print("[WARN] SUMO_HOME environment variable not explicitly set. Attempting traci import...")

try:
    import traci
except ImportError:
    traci = None
    print("[INFO] TraCI library not found in current environment. Mock simulation runner will be supported.")


def run_standalone_simulation(sumocfg_path="simulation/simulation.sumocfg", total_steps=100, gui=False):
    """
    Executes a discrete SUMO simulation batch, logging instantaneous carbon emissions.
    """
    if not os.path.exists(sumocfg_path):
        raise FileNotFoundError(f"Configuration file {sumocfg_path} does not exist. Run generate_network.py first!")

    sumo_binary = "sumo-gui" if gui else "sumo"
    sumo_cmd = [
        sumo_binary,
        "-c", sumocfg_path,
        "--step-length", "1.0",
        "--tripinfo-output", "simulation/tripinfo.xml",
        "--duration-log.disable", "true",
        "--no-step-log", "true",
        "--waiting-time-memory", "1000"
    ]

    print("=" * 65)
    print("      ECOTWIN SIMULATION RUNNER (TraCI Micro-Emission Logger)")
    print("=" * 65)
    print(f"Target Configuration : {sumocfg_path}")
    print(f"Total Target Steps   : {total_steps} seconds")
    print(f"SUMO Binary          : {sumo_binary}")
    print("-" * 65)

    if traci is None:
        print("[MOCK MODE] TraCI not installed. Simulating execution timeline...")
        for step in range(1, 11):
            mock_active = step * 12
            mock_co2 = step * 385.4
            print(f"Step {step*10:03d}s | Active Vehicles: {mock_active:03d} | Instantaneous CO2: {mock_co2:.2f} mg/s | Signal Phase: {step % 4}")
            time.sleep(0.05)
        print("=" * 65)
        print("[SUCCESS] Mock simulation batch completed successfully!")
        print("=" * 65)
        return True

    try:
        traci.start(sumo_cmd)
        print("[CONNECTED] TraCI socket connected to SUMO process successfully.")

        cumulative_co2_mg = 0.0
        for step in range(1, total_steps + 1):
            traci.simulationStep()

            # Retrieve active vehicle list
            vehicle_ids = traci.vehicle.getIDList()
            active_count = len(vehicle_ids)

            step_co2_mg = 0.0
            for vid in vehicle_ids:
                step_co2_mg += traci.vehicle.getCO2Emission(vid)

            cumulative_co2_mg += step_co2_mg

            # Log metrics every 10 steps
            if step % 10 == 0 or step == 1:
                current_phase = traci.trafficlight.getPhase("J_C") if "J_C" in traci.trafficlight.getIDList() else "N/A"
                print(f"Step {step:03d}s | Active: {active_count:03d} | Step CO2: {step_co2_mg:8.1f} mg/s | Total CO2: {cumulative_co2_mg/1000:6.2f} g | Phase: {current_phase}")

        traci.close()
        print("-" * 65)
        print(f"[COMPLETED] Ran {total_steps} steps. Total emitted carbon: {cumulative_co2_mg/1000:.2f} grams.")
        print("=" * 65)
        return True

    except Exception as e:
        print(f"[ERROR] Simulation run failed: {e}")
        try:
            traci.close()
        except Exception:
            pass
        return False


if __name__ == "__main__":
    run_standalone_simulation(total_steps=100, gui=False)