import os
from pydantic import BaseModel

class SimulationSettings(BaseModel):
    app_name: str = "EcoTwin API Gateway"
    version: str = "1.0.0"
    host: str = os.getenv("HOST", "127.0.0.1")
    port: int = int(os.getenv("PORT", 8000))
    
    # Simulation Engine Parameters
    sumo_gui: bool = os.getenv("SUMO_GUI", "False").lower() in ("true", "1")
    step_length: float = float(os.getenv("STEP_LENGTH", 1.0))
    max_simulation_steps: int = int(os.getenv("MAX_STEPS", 3600))
    
    # Environmental & Telemetry Limits
    co2_alert_threshold: float = float(os.getenv("CO2_ALERT_THRESHOLD", 1200.0))  # mg/s
    websocket_broadcast_hz: int = int(os.getenv("WS_RATE_HZ", 2))  # 2 updates per second

settings = SimulationSettings()
'