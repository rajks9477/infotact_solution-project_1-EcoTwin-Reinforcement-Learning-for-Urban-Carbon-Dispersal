# EcoTwin Simulation Specification Blueprint
## 4-Way Urban Intersection Network Specifications

### 1. Network Geometry
- **Center Junction:** Coordinates (0.0, 0.0) - Controlled by an actuated 4-phase Traffic Light (TLS).
- **North Inflow/Outflow Node:** (0.0, 300.0)
- **South Inflow/Outflow Node:** (0.0, -300.0)
- **East Inflow/Outflow Node:** (300.0, 0.0)
- **West Inflow/Outflow Node:** (-300.0, 0.0)
- **Total Road Length:** 600m arterial corridor (North-South) x 600m arterial corridor (East-West).
- **Lanes:** 2 lanes per directional edge (Lane 0: Right Turn & Through, Lane 1: Left Turn & Through).
- **Speed Limit:** 50 km/h (13.89 m/s).

### 2. Vehicle Classes & Emission Profiles
- **Class A (Standard Passenger Car):** Length 5.0m, Max Speed 13.89 m/s, Emission Model: `HBEFA3/PC_G_EU4` (Euro 4 Petrol).
- **Class B (Heavy Commercial Truck):** Length 10.0m, Max Speed 10.0 m/s, Emission Model: `HBEFA3/HDV` (Heavy Duty Diesel Vehicle).

### 3. Environmental Objective
Mitigate idling-induced localized carbon accumulation exceeding 1200 mg/s of CO2 per road segment through dynamic phase reallocation.