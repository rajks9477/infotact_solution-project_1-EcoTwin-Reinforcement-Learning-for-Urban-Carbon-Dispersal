"""
EcoTwin - Telemetry REST & WebSocket Router
Author: Ashutosh Sahoo (Backend Lead - Day 5 Deliverable)
Description: Provides high-speed REST and WebSocket streaming endpoints
             for real-time vehicle coordinates, corridor emission stats,
             and simulation step advancement.
"""

import asyncio
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, HTTPException
from backend.services.simulation_service import sim_manager
from backend.models import SimulationStepState, SimulationControlRequest

router = APIRouter(prefix="/api/telemetry", tags=["Telemetry & Streaming"])


@router.get("/latest", response_model=SimulationStepState)
async def get_latest_telemetry():
    """Returns the most recent single-frame simulation snapshot."""
    snapshot = sim_manager.get_telemetry_snapshot()
    if not snapshot:
        raise HTTPException(status_code=500, detail="Simulation state unavailable.")
    return snapshot


@router.post("/step", response_model=SimulationStepState)
async def advance_simulation_step():
    """Forces the simulation engine to step forward by 1 second."""
    new_state = sim_manager.advance_step()
    return new_state


@router.post("/control")
async def control_simulation(payload: SimulationControlRequest):
    """Handles commands like start, pause, resume, reset."""
    if payload.command == "start":
        sim_manager.initialize_simulation()
        return {"status": "started", "step": sim_manager.current_step}
    elif payload.command == "pause":
        return sim_manager.pause_simulation()
    elif payload.command == "reset":
        sim_manager.initialize_simulation()
        return {"status": "reset", "step": 0}
    else:
        raise HTTPException(status_code=400, detail=f"Unknown command: {payload.command}")


@router.websocket("/ws")
async def telemetry_websocket_stream(websocket: WebSocket):
    """
    Continuous bidirectional WebSocket stream broadcasting live
    simulation snapshots every 1000ms.
    """
    await websocket.accept()
    try:
        while True:
            # Advance step and broadcast to connected client
            state = sim_manager.advance_step()
            await websocket.send_json(state.dict())
            await asyncio.sleep(1.0)
    except WebSocketDisconnect:
        print("[WS] Client disconnected from telemetry stream.")
    except Exception as e:
        print(f"[WS ERROR] Streaming terminated: {e}")

from backend.services.vehicle_stream import vehicle_stream

@router.get("/vehicles")
async def get_live_vehicles(step: int = 1):
    """Returns real-time vehicle GPS coordinates and emissions for frontend dot rendering."""
    return {
        "step": step,
        "count": 12,
        "vehicles": vehicle_stream.get_live_vehicles(step)
    }

from backend.services.async_engine import async_engine

@router.post("/playback")
async def control_playback(command: str = "step", speed: float = 1.0):
    """Controls simulation playback: play, pause, step, reset, speed."""
    if command == "play":
        return async_engine.play()
    elif command == "pause":
        return async_engine.pause()
    elif command == "step":
        return async_engine.step_forward()
    elif command == "reset":
        return async_engine.reset()
    elif command == "speed":
        return async_engine.set_speed(speed)
    return {"error": "Invalid playback command"}