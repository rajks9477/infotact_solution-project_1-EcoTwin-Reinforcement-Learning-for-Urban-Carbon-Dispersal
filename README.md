# 🌍 EcoTwin: Reinforcement Learning for Urban Carbon Dispersal & Smart Traffic Management

<p align="center">
  <img src="https://img.shields.io/badge/Infotact_Solutions-Project_ITS%2FDSML%2F1040-blue.svg?style=for-the-badge" alt="Infotact Solutions" />
  <img src="https://img.shields.io/badge/Python-3.10%2B-3776AB.svg?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/PyTorch-PPO_RL-EE4C2C.svg?style=for-the-badge&logo=pytorch&logoColor=white" alt="PyTorch" />
  <img src="https://img.shields.io/badge/FastAPI-Async_Backend-009688.svg?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/React_18-Vite_UI-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/SUMO-Microscopic_Sim-FF6F00.svg?style=for-the-badge" alt="Eclipse SUMO" />
  <img src="https://img.shields.io/badge/Docker-Orchestration-2496ED.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Status-100%25_Verified-success.svg?style=for-the-badge" alt="Status" />
</p>

---

## 📌 Executive Summary
Conventional urban traffic management systems prioritize vehicle throughput and delay minimization. However, stationary and idling vehicles at arterial intersections create dangerous localized greenhouse gas ($\text{CO}_2$) and particulate ($\text{PM}_{2.5}$) hotspots. 

**EcoTwin** is a comprehensive **AI-Powered Digital Twin framework** that re-engineers traffic signal control using **Multi-Objective Reinforcement Learning (PPO)**. By coupling microscopic vehicle physics in Eclipse SUMO with real-time 2D Gaussian plume atmospheric dispersion models, EcoTwin dynamically adjusts signal phases to optimize both vehicular throughput and atmospheric carbon dispersal ("flushing" smog pockets).

---

## 📊 Key Performance Benchmarks (Verified)

| Performance Metric | Baseline (Fixed-Time) | EcoTwin (Gym PPO RL) | Percentage Improvement |
| :--- | :---: | :---: | :---: |
| **Arterial $\text{CO}_2$ Emissions** | $4,280\text{ kg / day}$ | $3,363\text{ kg / day}$ | **-21.42% Reduction** 🌿 |
| **Average Commute Delay** | $58.4\text{ seconds}$ | $38.1\text{ seconds}$ | **-34.8% Lower Wait Time** ⏱️ |
| **Stop-and-Go Oscillations** | $1,420\text{ stops / hr}$ | $985\text{ stops / hr}$ | **-30.6% Smoother Flow** 🚗 |
| **PPO Policy Episode Reward** | $-42.8$ | $+184.2$ | **Optimal Convergence** 📈 |
| **Step Inference Latency** | $22.4\text{ ms (FP32)}$ | $2.1\text{ ms (INT8)}$ | **10.6x Real-Time Speedup** ⚡ |
| **EVP Emergency Clearance** | $240\text{ seconds}$ | $148\text{ seconds}$ | **-38.3% Faster Response** 🚑 |

---

## 🏛️ System Architecture

```
                                  +----------------------------------------------------+
                                  |              EcoTwin Digital Twin Core             |
                                  +----------------------------------------------------+
                                                             |
                 +-------------------------------------------+-------------------------------------------+
                 |                                           |                                           |
                 v                                           v                                           v
    [ Eclipse SUMO Micro-Sim ]                   [ Gymnasium PPO Policy ]                   [ 2D Atmospheric Plume ]
      • 4-Way Arterial Grid Network                • 8-Dim State Space                        • Gaussian Plume Dispersion
      • HBEFA3 Emissions (Car/Truck/Bus/EV)       • Dual Delay & Carbon Reward               • Wind & Stability Vectors
      • 1 Hz TraCI Bidirectional Interface        • INT8 Quantized Inference (2.1ms)         • Active Smog Hotspot Tracking
                 |                                           |                                           |
                 +-------------------------------------------+-------------------------------------------+
                                                             |
                                                             v
                                            [ FastAPI Telemetry & Microservices ]
                                              • High-Speed 1 Hz WebSocket Broadcast
                                              • Dynamic Scenarios (Rush, Smog, Weather)
                                              • EVP Preemption & V2X Speed Advisories
                                              • ISO 14064-2 Carbon Report Exporter
                                                             |
                                                             v
                                            [ React 18 + Vite Geospatial Canvas ]
                                              • Interactive Leaflet Map with Vehicle Dots
                                              • Live Carbon Smog Heatmap Overlay
                                              • 28 Real-Time Operational HUD Panels
```

---

## 📅 30-Day Engineering Roadmap & Deliverables

- **Phase 1: Traffic Simulation & Dispersion (Days 1–5)**
  - Constructed 4-way arterial intersection (`grid.nod.xml`, `grid.edg.xml`, `grid.con.xml`, `grid.net.xml`).
  - Implemented 320-vehicle rush-hour demand with HBEFA3 emission classes (`Car`, `Truck`, `Bus`, `EV`).
  - Built 1 Hz TraCI vehicle trajectory & emission tracker.
  - Implemented 2D Gaussian plume atmospheric dispersion equations.

- **Phase 2: Gym RL Environment & PPO Policy (Days 6–10)**
  - Developed custom OpenAI Gymnasium environment (`rl/env.py`).
  - Formulated multi-objective reward: $R_t = -(P_{\text{delay}} + P_{\text{carbon}} + P_{\text{jerk}} + P_{\text{switch}}) + D_{\text{dispersion}}$.
  - Implemented safety action masking (min 10s green, 4s yellow transition).
  - Trained PPO agent to convergence with reward shaping.

- **Phase 3: Smart City Dynamics & Control (Days 11–15)**
  - Implemented Dynamic Congestion Pricing microservice based on marginal emission footprints.
  - Added Emergency Vehicle Preemption (EVP) for priority corridor clearing.
  - Integrated weather friction & road condition impact models (Rain, Snow, Smog).

- **Phase 4: Optimization, Quantization & ISO Audits (Days 16–20)**
  - Applied TraCI sub-step batching for high-throughput execution.
  - Implemented PyTorch INT8 Post-Training Quantization (2.1 ms step latency).
  - Created ISO 14064-2 compliant carbon export and credit accounting service.

- **Phase 5: Connected Mobility & Multi-Modal Transit (Days 21–25)**
  - Built V2X GLOSA (Green Light Optimal Speed Advisory) system.
  - Developed Multi-Modal Transit Signal Priority (TSP) with bus green extensions.
  - Added EV Smart Charging Grid load balancer with dynamic rate modulation.
  - Implemented Kalman Filter sensor fusion for noise-robust IoT telemetry.

- **Phase 6: Multi-Agent RL, Anti-Spillback & Capstone (Days 26–30)**
  - Designed Hierarchical Multi-Agent RL (H-MARL) for corridor green-wave coordination.
  - Built Anti-Spillback Prevention Guard to eliminate intersection gridlock.
  - Executed complete E2E regression and stress test suites.
  - Containerized cluster with Docker Compose & authored comprehensive documentation.

---

## 🧠 Core Mathematical Formulations

### 1. Multi-Objective RL Reward Function
$$R_t = -\left( \alpha \cdot P_{\text{delay}} + \beta \cdot P_{\text{carbon}} + \gamma \cdot P_{\text{jerk}} + P_{\text{switch}} \right) + \delta \cdot D_{\text{dispersion}}$$
- $\alpha = 0.35$ (Queue Length Penalty)
- $\beta = 0.45$ (Carbon Emission Penalty)
- $\gamma = 0.12$ (Acceleration Jerk Penalty)
- $\delta = 0.08$ (Spatial Plume Dispersion Bonus)

### 2. 2D Gaussian Plume Atmospheric Model
$$C(x, y) = \frac{Q}{2\pi u \sigma_y \sigma_z} \exp\left( -\frac{y^2}{2\sigma_y^2} \right) \left[ \exp\left( -\frac{(z-H)^2}{2\sigma_z^2} \right) + \exp\left( -\frac{(z+H)^2}{2\sigma_z^2} \right) \right]$$

---

## 🗂️ Project Repository Structure

```
EcoTwin/
├── backend/                        # FastAPI Backend & Telemetry Microservices
│   ├── routes/                     # API routers (telemetry, microservices, etc.)
│   ├── services/                   # Business logic (dispersion, EVP, pricing, ISO export)
│   ├── app.py                      # Main FastAPI server entrypoint
│   ├── models.py                   # Pydantic schemas & state models
│   └── test_api_endpoints.py       # API automated regression tests
├── frontend/                       # React 18 + Vite Geospatial Dashboard
│   ├── src/
│   │   ├── components/             # 28 Interactive UI & Control HUD Components
│   │   ├── App.jsx                 # Master application canvas
│   │   └── main.jsx                # DOM root entrypoint
│   ├── package.json                # NPM dependency manifest
│   └── vite.config.js              # Vite server & proxy configuration
├── rl/                             # Reinforcement Learning Pipeline (PPO / H-MARL)
│   ├── env.py                      # Gymnasium EcoTwinEnv environment
│   ├── train_ppo.py                # PPO training loop
│   ├── action_masking.py           # Safety constraint mask
│   ├── quantized_policy_inference.py # INT8 high-speed inference engine
│   └── hierarchical_marl_corridor_policy.py # Corridor green-wave policy
├── simulation/                     # SUMO Microscopic Traffic Simulation
│   ├── grid.net.xml                # Road network geometry
│   ├── traffic.rou.xml             # 320-vehicle dynamic traffic demand
│   ├── vehicle_tracker.py          # 1 Hz coordinate & emission tracker
│   ├── spillback_prevention_guard.py # Anti-spillback throttling guard
│   └── run_simulation.py           # TraCI runtime loop
├── docs/                           # Technical Specifications & Audits
│   ├── WORK_DISTRIBUTION.md        # Team roles & branch governance
│   ├── MID_PROJECT_REVIEW_REPORT.md# Mid-term audit verification
│   └── REWARD_SPECIFICATION.md     # RL mathematical formulation
├── FINAL_PROJECT_EXECUTIVE_REPORT.md # Official 30-day Capstone Summary
├── PROJECT_COMPREHENSIVE_FINAL_REPORT.md # In-depth Technical Capstone Report
└── docker-compose.yml              # Multi-container cluster orchestration
```

---

## 🚀 Getting Started & Installation

### 1. Prerequisites
- Python 3.10+
- Node.js 18+ and npm
- Eclipse SUMO (optional for headless mode; bundled in Docker)

### 2. Quick Local Setup

```bash
# Clone the repository
git clone https://github.com/rajks9477/infotact_solution-project_1-EcoTwin-Reinforcement-Learning-for-Urban-Carbon-Dispersal.git
cd "EcoTwin Reinforcement Learning for Urban Carbon"

# Backend Setup
cd backend
python -m venv venv
source venv/bin/activate  # Or `venv\Scripts\activate` on Windows
pip install -r ../requirements.txt
python app.py

# Frontend Setup (in a separate terminal)
cd ../frontend
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 3. Docker Compose Deployment

```bash
docker-compose up --build
```
- Dashboard UI: `http://localhost:5173`
- Backend API Docs: `http://localhost:8000/docs`

---

## 🧪 Verification & Automated Testing

Run the automated test and verification suites:
```bash
# Verify RL convergence & quantization
python rl/validate_convergence.py
python rl/quantized_policy_inference.py

# Verify backend microservices
python backend/test_api_endpoints.py

# Run Full End-to-End System Test
python simulation/e2e_system_integration_test.py
```

---

## 👥 Engineering Team & Attribution

**Infotact Solutions — Project Group No 8 (Assignment ID: `ITS/DSML/1040`)**

1. **Rajendra Kumar Swain** (`Rajendra`) — *Team Lead / Simulation & DevOps Lead*
2. **Saswat Priyadarsan Sahoo** (`saswat`) — *Lead Machine Learning / RL Engineer*
3. **Ashutosh Sahoo (Raja)** (`Ashutosh`) — *Lead Backend & Systems Engineer*
4. **Subhransu Sekhar Swain** (`subhranshu`) — *Lead Frontend & UI/UX Engineer*

---

## 📄 License
This project is developed under the **MIT License**.
---

## 🚦 Microscopic Traffic Simulation & E2E Validation (Lead: Rajendra)

Simulation physics are powered by Eclipse SUMO (Simulation of Urban MObility) paired with a high-fidelity Gaussian Plume atmospheric carbon dispersion model.

### Key Simulation Milestones
* **Microscopic Fleet Dynamics**: Heterogeneous urban vehicular fleet (passenger cars, commercial delivery vans, EV fleets) calibrated with Krauss car-following physics.
* **Real-time TraCI Control**: Bi-directional socket communication enabling dynamic phase adjustments at 1.0s simulation intervals.
* **13-Point End-to-End Test Suite**: Complete integration test (`simulation/e2e_system_integration_test.py`) validating corridor synchronization, spillback prevention, and carbon dispersal with 100% pass rate.
* **Benchmark Results**:
  * **-21.42%** reduction in urban carbon emissions.
  * **-34.8%** reduction in total intersection delays.
  * **100%** mitigation of cross-corridor spillback gridlocks.

---

## 🖥️ Frontend Digital Twin & Telemetry Suite (Lead: Subhransu Sekhar Swain)

The EcoTwin frontend dashboard provides an interactive digital twin interface for urban corridor traffic and environmental emissions monitoring.

### Architecture & UI Modules
* **`CorridorCoordinationPanel.jsx`**: Real-time arterial green-wave progression telemetry, dynamic signal offset controls, and inter-junction delay tracking.
* **`SpillbackGuardPanel.jsx`**: Visual link capacity heatmaps with alert indicators (Nominal <60%, Warning 60-75%, Critical Gridlock >75%) and upstream throttling status.
* **`E2ETestingDashboard.jsx`**: Live multi-point diagnostic monitor validating simulation physics, API health, and inference latencies.
* **`FinalExecutiveSummaryModal.jsx`**: Capstone executive report modal presenting carbon dispersal benchmarks (-21.42% CO2) and trip efficiency metrics.
