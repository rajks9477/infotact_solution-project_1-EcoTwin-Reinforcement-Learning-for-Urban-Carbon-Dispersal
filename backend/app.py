from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI(
    title="EcoTwin API Gateway",
    description="Backend API and telemetry streaming service for EcoTwin RL Urban Carbon Dispersal",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "project": "EcoTwin: Reinforcement Learning for Urban Carbon Dispersal",
        "assignment_id": "ITS/DSML/1040",
        "status": "online",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "ecotwin-backend",
        "simulation_engine": "SUMO",
        "version": "1.0.0"
    }