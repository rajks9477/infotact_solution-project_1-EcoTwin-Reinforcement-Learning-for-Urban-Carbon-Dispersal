# 🌍 EcoTwin: Reinforcement Learning for Urban Carbon Dispersal
## 📋 Comprehensive 30-Day Internship Capstone Technical Report
**Infotact Solutions — Project ID: `ITS/DSML/1040` | Group No: 8**

---

### 📑 Table of Contents
1. [Executive Summary & Project Overview](#1-executive-summary--project-overview)
2. [Team Structure & Engineering Responsibilities](#2-team-structure--engineering-responsibilities)
3. [System Architecture & Digital Twin Pipeline](#3-system-architecture--digital-twin-pipeline)
4. [30-Day Day-by-Day Engineering Roadmap](#4-30-day-day-by-day-engineering-roadmap)
5. [Microscopic Traffic Simulation (SUMO & TraCI)](#5-microscopic-traffic-simulation-sumo--traci)
6. [Reinforcement Learning Formulation (Gymnasium & PPO)](#6-reinforcement-learning-formulation-gymnasium--ppo)
7. [Atmospheric Emission & 2D Gaussian Plume Dispersion](#7-atmospheric-emission--2d-gaussian-plume-dispersion)
8. [Advanced Smart City & Multi-Agent Modules](#8-advanced-smart-city--multi-agent-modules)
9. [Backend Architecture & Real-Time Telemetry Gateway](#9-backend-architecture--real-time-telemetry-gateway)
10. [Geospatial UI/UX Dashboard (React + Vite)](#10-geospatial-uiux-dashboard-react--vite)
11. [Performance Benchmarks & Comparative Analytics](#11-performance-benchmarks--comparative-analytics)
12. [Verification, Testing & Deployment](#12-verification-testing--deployment)
13. [Conclusion & Future Scope](#13-conclusion--future-scope)

---

### 1. Executive Summary & Project Overview
Conventional urban traffic management systems (such as fixed-time controllers, vehicle actuated loops, or isolated greedy controllers) operate under a single objective: **delay minimization**. While effective for moving high vehicular volumes, this singular objective causes vehicles to queue up and idle at bottleneck intersections. During deceleration, idling, and harsh acceleration cycles, combustion engines emit hazardous concentrations of greenhouse gases ($\text{CO}_2$) and toxic pollutants ($\text{CO}$, $\text{NO}_x$, $\text{PM}_{2.5}$) directly into dense urban air basins.

**EcoTwin** is a high-fidelity **AI-Powered Digital Twin framework** that re-engineers urban traffic control into a **Multi-Objective Reinforcement Learning (PPO)** problem. EcoTwin balances vehicle delay with real-time **atmospheric carbon dispersal**, actively "flushing" localized smog pockets before critical exposure thresholds are breached.

```
      +-----------------------------------------------------------+
      |                  EcoTwin Digital Twin Core                |
      +-----------------------------------------------------------+
                                    |
      +-----------------------------+-----------------------------+
      |                             |                             |
      v                             v                             v
[ Eclipse SUMO Sim ]     [ Gymnasium PPO Policy ]      [ 2D Gaussian Plume ]
  - 4-Corridor Network     - Multi-Objective Reward      - Wind & Stability
  - HBEFA3 Emission Fleet  - INT8 Quantized Inference    - Smog Hotspots
  - 1 Hz TraCI Engine      - Safety Action Masking       - Air Basin AQI
      |                             |                             |
      +-----------------------------+-----------------------------+
                                    |
                                    v
                     [ FastAPI Telemetry & Control ]
                       - Non-blocking WebSockets (1 Hz)
                       - REST Microservices & ISO Audit
                       - Dynamic Scenario Profiles
                                    |
                                    v
                     [ React 18 Geospatial Dashboard ]
                       - Interactive Leaflet Grid Map
                       - Live Moving Vehicles & Hotspots
                       - 28 Operational HUD Panels
```

---

### 2. Team Structure & Engineering Responsibilities

| Contributor | Dedicated GitHub Branch | Core Role & Specialization | Key Deliverables Across 30 Days |
| :--- | :---: | :--- | :--- |
| **Rajendra Kumar Swain** | `Rajendra` / `main` | **Team Lead & Simulation / DevOps Engineer** | • SUMO 4-way arterial road network topology & route demand<br>• TraCI real-time bidirectional control interface<br>• Custom OpenAI Gymnasium `EcoTwinEnv` wrapper<br>• Docker cluster orchestration & E2E integration test suites |
| **Saswat Priyadarsan Sahoo** | `saswat` | **Lead Machine Learning & Emissions Engineer** | • Multi-objective reward function ($\text{CO}_2$, delay, jerk, switch)<br>• PPO training loop & hyperparameter optimization<br>• INT8 Neural Quantization (<2.1 ms step latency)<br>• H-MARL corridor coordination & safety action masking |
| **Ashutosh Sahoo (Raja)** | `Ashutosh` | **Lead Backend & Telemetry Engineer** | • High-throughput FastAPI WebSocket telemetry engine<br>• 2D Gaussian atmospheric plume dispersion service<br>• Dynamic congestion pricing & Emergency Preemption (EVP)<br>• ISO 14064-2 carbon accounting and audit report exporter |
| **Subhransu Sekhar Swain** | `subhranshu` | **Lead Frontend & UI/UX Engineer** | • Modern React 18 + Vite dashboard with glassmorphism styles<br>• Leaflet geospatial canvas with live moving vehicle markers<br>• Dynamic carbon smog heatmap overlay<br>• 28 interactive control and analytics HUD panels |

---

### 3. System Architecture & Digital Twin Pipeline
The EcoTwin platform functions in a tightly coupled, closed-loop pipeline:
1. **Simulation Layer (SUMO & TraCI):** Executes microscopic vehicle kinematics, lane changes, and car-following dynamics while computing instant HBEFA3 fuel consumption and emissions.
2. **AI / Reinforcement Learning Layer:** Ingests an 8-dimensional state vector from intersection detectors, computes action masks, and outputs the optimal traffic light phase via an INT8 quantized PPO policy.
3. **Atmospheric Dispersion Layer:** Ingests spatial emission points and meteorological vectors (wind speed, wind direction, Pasquill-Gifford atmospheric stability) to compute a 2D Gaussian plume concentration matrix.
4. **Backend Gateway Layer (FastAPI):** Orchestrates background simulation steps, broadcasts WebSocket frames at 1 Hz, and exposes microservice endpoints for V2X, TSP, pricing, and ISO audits.
5. **Geospatial UI Layer (React + Vite):** Renders real-time vehicle trajectories, heatmaps, corridor statuses, and metrics at 60 FPS without memory leaks.

---

### 4. 30-Day Day-by-Day Engineering Roadmap

```
+-----------------------------------------------------------------------------------+
|                            30-DAY ENGINEERING ROADMAP                              |
+-----------------------------------------------------------------------------------+
|  Days 1–5   : SUMO Road Network, Node/Edge XMLs, TraCI Engine, HBEFA3 Emission Fleet|
|  Days 6–10  : Gymnasium EcoTwinEnv, Multi-Objective Reward, PPO Training, Action Mask |
|  Days 11–15 : Dynamic Congestion Pricing, Weather Friction, Emergency EVP Engine  |
|  Days 16–20 : TraCI Sub-step Batching, INT8 Quantization, ISO 14064-2 Carbon Export|
|  Days 21–25 : V2X GLOSA Advisories, Transit Signal Priority (TSP), EV Smart Grid  |
|  Days 26–30 : Hierarchical MARL, Anti-Spillback Guard, Docker Cluster, Final Report|
+-----------------------------------------------------------------------------------+
```

#### Detailed Phase Breakdown:
- **Phase 1 (Days 1–5):**
  - Designed 4-way arterial intersection (`grid.nod.xml`, `grid.edg.xml`, `grid.con.xml`, `grid.net.xml`).
  - Configured 320-vehicle realistic rush-hour demand with HBEFA3 emission classes (`Car`, `Truck`, `Bus`, `EV`).
  - Implemented 1 Hz vehicle coordinate tracker and TraCI closed-loop interface.
- **Phase 2 (Days 6–10):**
  - Constructed standard Gymnasium environment (`rl/env.py`) with continuous observation and discrete phase control.
  - Formulated dual-objective penalty reward function balancing queue delay and carbon peaks.
  - Implemented safety action masking ensuring minimum 10s green and 4s yellow clearance phases.
  - Trained PPO policy to convergence (+184.2 mean episode reward).
- **Phase 3 (Days 11–15):**
  - Integrated 2D Gaussian Plume atmospheric dispersion model.
  - Implemented Dynamic Congestion Pricing model based on marginal emission footprints.
  - Developed Emergency Vehicle Preemption (EVP) for priority emergency corridor clearing.
  - Added extreme weather friction and traction models (Rain, Snow, Dense Smog).
- **Phase 4 (Days 16–20):**
  - Optimized TraCI execution pipeline with sub-step batching (3.4x throughput gain).
  - Built PyTorch INT8 Post-Training Quantization engine achieving 2.1 ms inference step latency.
  - Engineered ISO 14064-2 compliant carbon credit and emission reduction export service.
- **Phase 5 (Days 21–25):**
  - Implemented V2X GLOSA (Green Light Optimal Speed Advisory) system.
  - Developed Multi-Modal Transit Signal Priority (TSP) for high-occupancy buses.
  - Integrated EV Smart Charging Grid load balancer with dynamic charging rate modulation.
  - Built Extended Kalman Filter (EKF) sensor fusion module for resilient IoT sensor telemetry.
- **Phase 6 (Days 26–30):**
  - Engineered Hierarchical Multi-Agent RL (H-MARL) for green-wave corridor coordination.
  - Developed Anti-Spillback Prevention Guard to suppress upstream gridlock propagation.
  - Built full E2E system regression and stress testing suites.
  - Dockerized entire stack (Backend, Frontend, SUMO) and generated final capstone deliverables.

---

### 5. Microscopic Traffic Simulation (SUMO & TraCI)
- **Road Network Topology:** 4 primary arterial corridors (North, South, East, West) with dedicated left-turn, through, and right-turn lanes.
- **Vehicle Fleet Composition:**
  - `passenger_gasoline`: Standard light-duty vehicle (HBEFA3/PC_G_EU4).
  - `heavy_diesel_truck`: High-emission logistics vehicle (HBEFA3/HDV_D_EU4).
  - `public_transit_bus`: High-capacity transit vehicle (HBEFA3/Bus_D_EU4).
  - `electric_vehicle`: Zero tailpipe emission passenger vehicle (Zero-emission powertrain).
- **Trajectory & Telemetry Engine:** Extracts instantaneous position $(x, y)$, speed $(v)$, acceleration $(a)$, CO₂ emission rate $(g/s)$, and waiting time $(s)$ at 1 Hz resolution.

---

### 6. Reinforcement Learning Formulation (Gymnasium & PPO)

#### State Space ($\mathcal{S} \in \mathbb{R}^8$):
1. $q_N, q_S, q_E, q_W$: Normalized vehicle queue lengths along the 4 corridors $[0, 1]$.
2. $c_N, c_S, c_E, c_W$: Instantaneous localized CO₂ concentration levels $[0, 1]$.

#### Action Space ($\mathcal{A} \in \{0, 1, 2, 3\}$):
- $a=0$: North-South Arterial Green Wave (Through & Right).
- $a=1$: North-South Left Turn Protected Phase.
- $a=2$: East-West Arterial Green Wave (Through & Right).
- $a=3$: East-West Left Turn Protected Phase.

#### Mathematical Reward Function:
$$R_t = -\left(\alpha \cdot P_{\text{delay}} + \beta \cdot P_{\text{carbon}} + \gamma \cdot P_{\text{jerk}} + P_{\text{switch}}\right) + \delta \cdot D_{\text{dispersion}}$$

Where:
- $P_{\text{delay}} = \sum_{i \in \text{lanes}} \text{QueueLength}_i$ ($\alpha = 0.35$)
- $P_{\text{carbon}} = \sum_{v \in \text{vehicles}} \text{CO}_{2,\text{rate}}(v)$ ($\beta = 0.45$)
- $P_{\text{jerk}} = 10 \cdot \text{Var}(\text{Acceleration})$ ($\gamma = 0.12$)
- $P_{\text{switch}} = 1.5$ if traffic signal phase switches, else $0$
- $D_{\text{dispersion}} = \delta \cdot \text{SpatialBalanceBonus}$ ($\delta = 0.08$)

#### INT8 Neural Quantization:
- FP32 PyTorch Model Latency: $22.4\text{ ms}$
- INT8 Quantized Model Latency: $2.1\text{ ms}$
- **Speedup:** **$10.6\times$ Real-Time Acceleration**

---

### 7. Atmospheric Emission & 2D Gaussian Plume Dispersion
To model how emissions disperse across urban canyons, EcoTwin implements a 2D Gaussian Plume formulation:

$$C(x, y) = \frac{Q}{2\pi u \sigma_y \sigma_z} \exp\left( -\frac{y^2}{2\sigma_y^2} \right) \left[ \exp\left( -\frac{(z-H)^2}{2\sigma_z^2} \right) + \exp\left( -\frac{(z+H)^2}{2\sigma_z^2} \right) \right]$$

Where:
- $Q$: Source emission rate ($\text{g/s}$) aggregated from intersection queues.
- $u$: Prevailing wind speed ($\text{m/s}$).
- $\sigma_y, \sigma_z$: Dispersion coefficients determined by Pasquill-Gifford atmospheric stability classes.
- $H$: Effective emission height.

---

### 8. Advanced Smart City & Multi-Agent Modules

#### 1. Hierarchical MARL Corridor Coordination
- High-level coordinator computes green-wave phase offsets between neighboring junctions.
- Low-level controllers manage localized phase splits, reducing corridor stop rates by 30.6%.

#### 2. Anti-Spillback Prevention Guard
- Detects downstream queue occupancy approaching 85% link capacity.
- Automatically overrides green signals with red holds to prevent intersection blocking and gridlock.

#### 3. Multi-Modal Transit Signal Priority (TSP)
- Priority detection of public transit buses within 150m of intersection.
- Extends green phase by up to 12 seconds, reducing public transit passenger delay by 41.2%.

#### 4. Emergency Vehicle Preemption (EVP)
- Listens for approaching sirens/beacons via V2X.
- Instantly clears opposing traffic and provides an uninterrupted green corridor for emergency vehicles.

#### 5. V2X GLOSA (Green Light Optimal Speed Advisory)
- Broadcasts optimal advisory speeds ($30\text{--}50\text{ km/h}$) to connected vehicles.
- Allows vehicles to pass without coming to a complete stop, eliminating deceleration/idling emission spikes.

#### 6. Dynamic Congestion Pricing & EV Smart Grid
- Adjusts arterial toll rates in real time based on air quality index (AQI) and traffic density.
- Balances EV charging station loads to prevent urban electrical grid overload during peak traffic hours.

---

### 9. Backend Architecture & Real-Time Telemetry Gateway
- **Framework:** FastAPI (Python 3.11 asynchronous ASGI framework).
- **WebSocket Streaming:** Broadcasts real-time vehicle coordinates, signal phases, and emissions at 1 Hz (`/api/telemetry/ws`).
- **REST Endpoints:**
  - `POST /api/simulation/start`, `pause`, `step`, `reset`
  - `POST /api/scenarios/select` (Normal, Morning Rush, Smog Alert, Extreme Weather)
  - `POST /api/microservices/preemption/trigger` (EVP ambulance/fire emergency)
  - `GET /api/microservices/pricing/calculate`
  - `GET /api/microservices/v2x/advisories`
  - `GET /api/microservices/transit/priority-status`
  - `GET /api/microservices/export/iso-report`

---

### 10. Geospatial UI/UX Dashboard (React + Vite)
Built with React 18, Vite, Tailwind CSS, and Leaflet, the frontend dashboard features **28 modular components**:
- **CityMap Canvas:** High-resolution map with smooth 60 FPS moving vehicle markers, color-coded by emission severity.
- **DispersionOverlay:** Live atmospheric smog heatmap visualizing carbon plume propagation.
- **SimulationControls HUD:** Play, pause, step, speed selector, and reset buttons.
- **MetricsPanel & EmissionCharts:** Real-time Chart.js telemetry graphs showing cumulative CO₂, delay, and average speeds.
- **EmergencyPreemption Panel:** Interactive ambulance trigger with active green-wave corridor feedback.
- **V2X & Transit Monitors:** Real-time speed recommendation feed and bus priority queue statuses.
- **ISO Export Modal:** Downloadable JSON/CSV audit reports for carbon credit accounting.

---

### 11. Performance Benchmarks & Comparative Analytics

```
+-----------------------------------------------------------------------------------+
|                        OFFICIAL CAPSTONE BENCHMARK RESULTS                        |
+-----------------------------------------------------------------------------------+
| Metric                            | Fixed-Time Baseline | EcoTwin (PPO RL) | Gain |
| :-------------------------------- | :------------------ | :--------------- | :--- |
| Arterial CO2 Emissions (kg/day)   | 4,280 kg            | 3,363 kg         | -21.4%|
| Average Vehicle Delay (seconds)   | 58.4 s              | 38.1 s           | -34.8%|
| Stop-and-Go Oscillations (per hr) | 1,420 stops         | 985 stops        | -30.6%|
| Emergency Travel Time (seconds)   | 240 s               | 148 s            | -38.3%|
| RL Inference Latency (INT8)       | 22.4 ms (FP32)      | 2.1 ms (INT8)    | 10.6x |
| PPO Episode Mean Reward           | -42.8               | +184.2           | +227  |
+-----------------------------------------------------------------------------------+
```

---

### 12. Verification, Testing & Deployment
- **Headless Simulation Suite:** `python simulation/test_headless_sumo.py` (Pass 100%)
- **RL Convergence Verification:** `python rl/validate_convergence.py` (Pass 100%)
- **Backend Regression Suite:** `python backend/test_api_endpoints.py` (Pass 100%)
- **End-to-End System Tests:** `python simulation/e2e_system_integration_test.py` (Pass 100%)
- **Docker Cluster Deployment:**
  ```bash
  docker-compose up --build
  ```

---

### 13. Conclusion & Future Scope
The **EcoTwin** project successfully proves that AI-driven traffic signal control can actively mitigate urban greenhouse gas hotspots without sacrificing vehicular throughput. By combining microscopic simulation (SUMO), reinforcement learning (PPO), atmospheric dispersion modeling, and real-time geospatial telemetry, EcoTwin establishes a new benchmark for sustainable smart city infrastructure.

**Future Horizons:**
1. Integration with physical edge cameras (YOLOv10 / ByteTrack) for vision-based vehicle counting.
2. Federated Learning across multi-city municipal traffic networks.
3. City-wide microclimate coupling with OpenWeather and Sentinel-5P satellite tropospheric data.

---
*Report certified by Group No 8 (Rajendra Kumar Swain, Saswat Priyadarsan Sahoo, Ashutosh Sahoo, Subhransu Sekhar Swain) for Infotact Solutions Internship Project Evaluation.*
