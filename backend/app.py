"""
EcoTwin - Central FastAPI Application Gateway
Author: Ashutosh Sahoo (Backend Lead - Day 6 Deliverable)
Description: Integrates CORS middleware, health checks, telemetry streams,
             and mounts the RL agent controller policy switcher.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.config import settings
from backend.routes.telemetry import router as telemetry_router
from backend.routes.rl_controller import router as rl_router

app = FastAPI(
    title="EcoTwin API Gateway",
    description="Microscopic carbon emission monitoring and RL signal control API",
    version="1.0.0"
)

# CORS Configuration allowing React Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Telemetry & RL Controller Routers
app.include_router(telemetry_router)
app.include_router(rl_router)


@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint to verify backend operational readiness."""
    return {
        "status": "healthy",
        "service": "EcoTwin Telemetry Gateway",
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.py:app", host="0.0.0.0", port=8000, reload=True)