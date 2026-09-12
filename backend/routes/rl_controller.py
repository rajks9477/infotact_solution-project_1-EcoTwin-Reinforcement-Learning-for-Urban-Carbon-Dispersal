"""
EcoTwin - RL Policy Switcher & Agent Actuator Controller
Author: Ashutosh Sahoo (Backend Lead - Day 6 Deliverable)
Description: Provides REST API endpoints to toggle between Fixed-Time baseline
             and PPO-EcoDisperse Reinforcement Learning policies, and queries agent status.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Dict, Any

router = APIRouter(prefix="/api/rl", tags=["RL Controller & Policy Switcher"])


class PolicyToggleRequest(BaseModel):
    mode: str = Field(..., description="Target policy: 'baseline' or 'ppo'")
    target_corridor_priority: str = Field("E_S2C", description="Corridor prioritizing carbon flush")


# In-memory controller state
controller_state: Dict[str, Any] = {
    "active_policy": "PPO-EcoDisperse",
    "is_ai_enabled": True,
    "carbon_mitigation_active": True,
    "alpha_delay": 0.4,
    "beta_carbon": 0.6,
    "status": "Operational"
}


@router.get("/status")
async def get_rl_agent_status():
    """Returns the current operational state and hyperparameter weights of the RL policy."""
    return controller_state


@router.post("/toggle")
async def toggle_policy(payload: PolicyToggleRequest):
    """Dynamically activates or deactivates the RL Carbon Dispersal policy."""
    if payload.mode == "ppo":
        controller_state["active_policy"] = "PPO-EcoDisperse"
        controller_state["is_ai_enabled"] = True
        controller_state["carbon_mitigation_active"] = True
        return {"status": "success", "message": "PPO-EcoDisperse AI Controller Activated", "mode": "ppo"}
    elif payload.mode == "baseline":
        controller_state["active_policy"] = "Traditional Fixed-Time"
        controller_state["is_ai_enabled"] = False
        controller_state["carbon_mitigation_active"] = False
        return {"status": "success", "message": "Fixed-Time Baseline Controller Activated", "mode": "baseline"}
    else:
        raise HTTPException(status_code=400, detail=f"Unsupported mode '{payload.mode}'. Use 'ppo' or 'baseline'.")