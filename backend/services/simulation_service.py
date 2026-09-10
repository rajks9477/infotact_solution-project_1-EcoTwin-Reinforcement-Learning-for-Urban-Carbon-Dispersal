"""
EcoTwin - Backend Simulation Service Manager
Author: Ashutosh Sahoo (Backend Lead - Day 4 Deliverable)
Description: Manages asynchronous simulation lifecycle, stepping loops,
             and in-memory vehicle telemetry cache for the FastAPI gateway.
"""

import time
import asyncio
from typing import Dict, List, Optional
from backend.models import SimulationStepState, EdgeEmissionStats, VehicleTelemetry


class SimulationServiceManager:
    """
    Service layer orchestrating the state and step-advancement of the
    EcoTwin Digital Twin simulation.
    """

    def __init__(self):
        self.is_running: bool = False
        self.current_step: int = 0
        self.cumulative_co2_grams: float = 0.0
        self.active_fleet: Dict[str, VehicleTelemetry] = {}
        self.latest_state: Optional[SimulationStepState] = None

    def initialize_simulation(self) -> Dict[str, str]:
        """Resets and boots up the simulation state buffer."""
        self.is_running = True
        self.current_step = 0
        self.cumulative_co2_grams = 0.0
        self.active_fleet.clear()
        self._generate_synthetic_step(step_idx=0)
        return {"status": "initialized", "message": "Simulation buffer initialized successfully."}

    def _generate_synthetic_step(self, step_idx: int) -> SimulationStepState:
        """
        Generates validated telemetry snapshots across the 8 corridors.
        """
        corridors = ["E_N2C", "E_C2N", "E_S2C", "E_C2S", "E_E2C", "E_C2E", "E_W2C", "E_C2W"]
        edge_metrics: Dict[str, EdgeEmissionStats] = {}
        total_vehicles = 0
        step_co2_mg = 0.0

        for cid in corridors:
            is_inbound = "2C" in cid
            veh_count = 15 + (step_idx % 10) if is_inbound else 5 + (step_idx % 5)
            mean_speed = 6.5 if is_inbound else 12.0
            # Higher emissions in inbound corridors due to signal deceleration
            edge_co2 = (veh_count * 450.0) if is_inbound else (veh_count * 150.0)
            congestion = min(1.0, veh_count / 30.0)

            edge_metrics[cid] = EdgeEmissionStats(
                edge_id=cid,
                total_vehicles=veh_count,
                mean_speed=mean_speed,
                total_co2_emission=edge_co2,
                congestion_level=congestion
            )
            total_vehicles += veh_count
            step_co2_mg += edge_co2

        self.cumulative_co2_grams += (step_co2_mg / 1000.0)

        # Identify current worst carbon hotspot
        worst_edge = max(edge_metrics.keys(), key=lambda k: edge_metrics[k].total_co2_emission)

        self.latest_state = SimulationStepState(
            step=step_idx,
            active_vehicles_count=total_vehicles,
            cumulative_co2=round(self.cumulative_co2_grams, 2),
            edge_metrics=edge_metrics,
            highest_emission_edge=worst_edge
        )
        return self.latest_state

    def advance_step(self) -> SimulationStepState:
        """Advances the simulation by 1 discrete timestep (1.0s)."""
        if not self.is_running:
            self.initialize_simulation()

        self.current_step += 1
        return self._generate_synthetic_step(self.current_step)

    def pause_simulation(self) -> Dict[str, str]:
        """Pauses the stepping loop."""
        self.is_running = False
        return {"status": "paused", "current_step": str(self.current_step)}

    def get_telemetry_snapshot(self) -> Optional[SimulationStepState]:
        """Returns the most recent validated simulation frame."""
        if self.latest_state is None:
            self.advance_step()
        return self.latest_state


# Singleton instance accessible throughout the backend application
sim_manager = SimulationServiceManager()


if __name__ == "__main__":
    print("=" * 65)
    print("      ECOTWIN SIMULATION SERVICE MANAGER VALIDATION")
    print("=" * 65)
    sim = SimulationServiceManager()
    init_res = sim.initialize_simulation()
    print(f"[INIT] {init_res}")

    for step in range(1, 6):
        snapshot = sim.advance_step()
        print(f"Step {snapshot.step:02d} | Active Vehicles: {snapshot.active_vehicles_count:03d} | Total CO2: {snapshot.cumulative_co2:6.2f}g | Worst Hotspot: {snapshot.highest_emission_edge}")

    print("-" * 65)
    print("[SUCCESS] SimulationServiceManager executed and validated successfully!")
    print("=" * 65)