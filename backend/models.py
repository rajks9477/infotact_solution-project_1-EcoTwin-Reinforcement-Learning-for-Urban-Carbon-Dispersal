"""
EcoTwin - Pydantic Telemetry & Simulation Data Models
Author: Ashutosh Sahoo (Day 3 Deliverable)
Description: Defines type-safe schemas for simulation state, traffic telemetry,
             carbon emission tracking, and RL agent actions.
"""

from typing import List, Optional, Dict
from pydantic import BaseModel, Field


class VehicleTelemetry(BaseModel):
    """Real-time telemetry data point for an individual vehicle."""
    vehicle_id: str = Field(..., description="Unique SUMO vehicle identifier")
    vehicle_type: str = Field(..., description="Vehicle emission class (e.g. passenger_petrol, heavy_truck, electric)")
    speed: float = Field(..., ge=0.0, description="Current vehicle speed in m/s")
    acceleration: float = Field(0.0, description="Current acceleration in m/s^2")
    co2_emission: float = Field(..., ge=0.0, description="Carbon dioxide emission rate in mg/s")
    fuel_consumption: float = Field(0.0, ge=0.0, description="Fuel consumption rate in ml/s")
    edge_id: str = Field(..., description="ID of the road edge the vehicle is currently traversing")
    position_x: float = Field(..., description="X coordinate in 2D simulation plane")
    position_y: float = Field(..., description="Y coordinate in 2D simulation plane")


class EdgeEmissionStats(BaseModel):
    """Aggregated carbon and traffic statistics for a specific road corridor/edge."""
    edge_id: str = Field(..., description="Road segment identifier")
    total_vehicles: int = Field(0, ge=0, description="Number of vehicles currently on this edge")
    mean_speed: float = Field(0.0, ge=0.0, description="Average speed across all vehicles on this edge (m/s)")
    total_co2_emission: float = Field(0.0, ge=0.0, description="Summed CO2 emission on this edge (mg/s)")
    congestion_level: float = Field(0.0, ge=0.0, le=1.0, description="Congestion ratio (0.0=free flow, 1.0=jammed)")


class SimulationStepState(BaseModel):
    """Comprehensive snapshot emitted at each simulation step."""
    step: int = Field(..., ge=0, description="Current simulation timestamp/second")
    active_vehicles_count: int = Field(0, ge=0, description="Total active vehicles in the network")
    cumulative_co2: float = Field(0.0, ge=0.0, description="Total cumulative CO2 emitted so far in grams")
    edge_metrics: Dict[str, EdgeEmissionStats] = Field(default_factory=dict, description="Per-edge emission summaries")
    highest_emission_edge: Optional[str] = Field(None, description="Edge ID currently suffering the worst carbon hotspot")


class RLControlAction(BaseModel):
    """Control payload dispatched to adjust traffic signal phases or routing."""
    intersection_id: str = Field(..., description="Target traffic light junction ID (e.g. J_C)")
    action_type: str = Field(..., description="Action category: 'set_phase', 'extend_green', or 'reroute'")
    duration: float = Field(5.0, ge=1.0, le=60.0, description="Duration in seconds for the signal state")
    target_phase: int = Field(0, ge=0, description="Index of signal phase to enact")


class SimulationControlRequest(BaseModel):
    """API payload for starting, pausing, or stepping the SUMO simulation."""
    command: str = Field(..., description="Command to execute: 'start', 'pause', 'resume', 'reset'")
    steps_to_run: int = Field(1, ge=1, le=3600, description="Number of steps to advance if running in discrete mode")
    random_seed: Optional[int] = Field(42, description="Random seed for deterministic runs")