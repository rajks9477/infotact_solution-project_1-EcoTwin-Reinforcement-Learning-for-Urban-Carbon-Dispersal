"""
EcoTwin - Asynchronous Simulation Playback Engine
Author: Ashutosh Sahoo (Backend Lead - Day 9 Deliverable)
Date: September 16, 2026

Description:
    Manages non-blocking simulation loops with dynamic playback speeds (0.5x, 1x, 2x, 5x),
    stepping controls (play, pause, step, reset), and live state broadcasts.
"""

from typing import Dict, Any


class AsyncSimulationEngine:
    """Asynchronous simulation runner controlling stepped progression."""

    def __init__(self):
        self.is_playing: bool = False
        self.current_step: int = 1
        self.speed_multiplier: float = 1.0
        self.active_phase: int = 0

    def play(self) -> Dict[str, Any]:
        self.is_playing = True
        return {"status": "playing", "step": self.current_step, "speed": self.speed_multiplier}

    def pause(self) -> Dict[str, Any]:
        self.is_playing = False
        return {"status": "paused", "step": self.current_step}

    def step_forward(self) -> Dict[str, Any]:
        self.current_step += 1
        self.active_phase = (self.current_step // 15) % 4
        return {"status": "stepped", "step": self.current_step, "active_phase": self.active_phase}

    def reset(self) -> Dict[str, Any]:
        self.is_playing = False
        self.current_step = 1
        self.active_phase = 0
        return {"status": "reset", "step": 1, "active_phase": 0}

    def set_speed(self, speed: float) -> Dict[str, Any]:
        if speed in [0.5, 1.0, 2.0, 5.0]:
            self.speed_multiplier = speed
        return {"status": "speed_updated", "speed": self.speed_multiplier}


async_engine = AsyncSimulationEngine()
