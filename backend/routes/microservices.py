"""
EcoTwin - Microservices & Smart City Module Router
Author: Ashutosh Sahoo & Rajendra Kumar Swain
Description: Aggregates endpoints for dynamic scenarios, weather conditions,
             congestion pricing, fleet electrification, atmospheric dispersion,
             incident injector, emergency preemption, and regulatory export.
"""

from fastapi import APIRouter, Query
from typing import Dict, Any, Optional
from pydantic import BaseModel

from backend.services.scenario_manager import scenario_manager
from backend.services.weather_service import weather_service
from backend.services.pricing_service import pricing_service
from backend.services.fleet_service import fleet_service
from backend.services.dispersion_service import dispersion_service
from backend.services.incident_service import incident_service
from backend.services.preemption_service import preemption_service
from backend.services.lifecycle_analytics_service import lifecycle_service
from backend.services.export_service import export_service
from backend.services.heartbeat_service import heartbeat_service

router = APIRouter(tags=["Smart City Microservices"])


# 1. Scenarios
@router.get("/api/scenarios/active")
async def get_active_scenario():
    return scenario_manager.get_active_scenario()


@router.post("/api/scenarios/apply")
async def apply_scenario(id: str = Query(..., description="Scenario ID")):
    return scenario_manager.switch_scenario(id)


@router.post("/api/scenarios/switch")
async def switch_scenario(scenario: str = Query("normal_flow", description="Scenario profile ID")):
    return scenario_manager.switch_scenario(scenario)


# 2. Weather
@router.post("/api/weather/set")
async def set_weather(condition: str = Query("clear", description="Weather condition")):
    return weather_service.set_condition(condition)


@router.get("/api/weather/current")
async def get_current_weather():
    return weather_service.get_current_weather()


# 3. Dynamic Congestion Pricing
@router.get("/api/pricing/tariffs")
async def get_pricing_tariffs():
    return pricing_service.get_pricing_tariffs()


# 4. Fleet Electrification & EV Grid
@router.get("/api/fleet/telemetry")
async def get_fleet_telemetry():
    return fleet_service.get_fleet_telemetry()


# 5. Atmospheric Dispersion & Green Wave
@router.get("/api/dispersion/grid")
async def get_dispersion_grid():
    return dispersion_service.get_spatial_aqi_grid()


@router.get("/api/dispersion/coordination")
async def get_corridor_coordination():
    return dispersion_service.get_corridor_coordination()


# 6. Incident Injector
class IncidentReportPayload(BaseModel):
    edge: str = "top0to00"
    type: str = "lane_closure"
    severity: float = 0.7


@router.get("/api/incident/active")
async def get_active_incidents():
    return incident_service.get_active_incidents()


@router.post("/api/incident/report")
async def report_incident(payload: Optional[IncidentReportPayload] = None, edge: str = "top0to00", type: str = "lane_closure", severity: float = 0.7):
    if payload:
        return incident_service.report_incident(payload.edge, payload.type, payload.severity)
    return incident_service.report_incident(edge, type, severity)


@router.post("/api/incident/resolve")
async def resolve_incident(incident_id: str = Query(..., description="Incident ID")):
    return incident_service.resolve_incident(incident_id)


# 7. Emergency Preemption
class EmergencyDispatchPayload(BaseModel):
    vehicle_type: str = "ambulance"
    origin: str = "top0to00"
    destination: str = "31to32"


@router.get("/api/emergency/active")
async def get_active_preemptions():
    return preemption_service.get_active_preemptions()


@router.post("/api/emergency/dispatch")
async def dispatch_emergency(payload: Optional[EmergencyDispatchPayload] = None, vehicle_type: str = "ambulance", origin: str = "top0to00", destination: str = "31to32"):
    if payload:
        return preemption_service.dispatch_emergency(payload.vehicle_type, payload.origin, payload.destination)
    return preemption_service.dispatch_emergency(vehicle_type, origin, destination)


@router.post("/api/emergency/clear")
async def clear_emergency(dispatch_id: str = Query(..., description="Dispatch ID")):
    return preemption_service.clear_emergency(dispatch_id)


# 8. Lifecycle Analytics
@router.get("/api/lifecycle/summary")
async def get_lifecycle_summary():
    return lifecycle_service.get_lifecycle_summary()


# 9. Carbon Regulatory Export
@router.get("/api/export/audit")
async def get_export_audit():
    return export_service.generate_carbon_audit_report()


# 10. Connection Health & Heartbeat
@router.get("/api/health/connection")
async def get_connection_health():
    return heartbeat_service.get_connection_health()
