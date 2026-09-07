# INFOTACT SOLUTIONS - INTERNSHIP WORK DISTRIBUTION
## Project 3: EcoTwin - Reinforcement Learning for Urban Carbon Dispersal
### Assignment No: ITS/DSML/1040 | Team: Group No 8 | Month 1 Cycle

---

### 1. Project Overview & Objectives
EcoTwin is an AI-powered Digital Twin that tackles urban carbon hotspots at traffic intersections. Using Eclipse SUMO and Multi-Objective Reinforcement Learning (PPO), the system balances vehicle delay minimization with localized carbon dispersal.

---

### 2. Team Structure & Weekly Leadership Matrix

| Week | Primary Module | Module Lead (Owner) | Supporting Contributors |
| :---: | :--- | :--- | :--- |
| **Week 1** | Simulation Grid & Core Scaffolding | **Rajendra Kumar Swain (Lead)** | Saswat, Ashutosh, Subhransu |
| **Week 2** | Custom Gym RL Env & WebSockets | **Ashutosh Sahoo** | Rajendra, Saswat, Subhransu |
| **Week 3** | RL Agent Training (PPO) & Heatmap | **Saswat Priyadarsan Sahoo** | Subhransu, Ashutosh, Rajendra |
| **Week 4** | Closed-Loop Control & Dashboard | **Subhransu Sekhar Swain** | Rajendra, Ashutosh, Saswat |

---

### 3. Individual Member Roles & Dedicated Branches

#### 👑 Member 1: Rajendra Kumar Swain (Overall Team Lead)
- **Dedicated GitHub Branch:** `Rajendra`
- **Core Domain:** System Architecture, Microscopic Traffic Simulation (SUMO) & Integration Lead.
- **Key Responsibilities:**
  - Design of 4-way arterial road network (`grid.nod.xml`, `grid.edg.xml`, `grid.net.xml`).
  - Master simulation configuration (`simulation.sumocfg`) and TraCI interface.
  - Custom OpenAI Gymnasium environment wrapper implementation (`EcoTwinEnv`).
  - Pull Request reviews, merge resolution into `main`, and GitHub compliance tracking.

#### 🔹 Member 2: Saswat Priyadarsan Sahoo
- **Dedicated GitHub Branch:** `saswat`
- **Core Domain:** Reinforcement Learning & Emission Dynamics.
- **Key Responsibilities:**
  - HBEFA3 emission modeling for passenger vehicles and heavy diesel trucks.
  - Multi-objective reward function formulation (penalizing delay + localized CO2 peaks).
  - PPO (Proximal Policy Optimization) agent policy training and hyperparameter tuning.
  - Comparative benchmark analytics between traditional fixed-time controllers and EcoTwin RL.

#### 🔹 Member 3: Ashutosh Sahoo
- **Dedicated GitHub Branch:** `Ashutosh`
- **Core Domain:** Backend API Gateway & Real-Time Telemetry Streaming.
- **Key Responsibilities:**
  - FastAPI server architecture with CORS middleware and Pydantic schemas.
  - High-throughput WebSocket endpoints for low-latency simulation state broadcast.
  - Micro-emission grid matrix aggregation service.
  - Docker containerization for reproducible deployment.

#### 🔹 Member 4: Subhransu Sekhar Swain
- **Dedicated GitHub Branch:** `subhranshu`
- **Core Domain:** Geospatial Visualization & Interactive Analytics Dashboard.
- **Key Responsibilities:**
  - React + Vite dashboard scaffolding with modern UI architecture.
  - Leaflet / Deck.gl interactive map canvas rendering road network and live vehicle markers.
  - Dynamic Carbon Heatmap overlay layer visualizing pollution concentration pockets.
  - Real-time KPI charts for cumulative CO2 emissions and average commute wait times.