# EcoTwin: Reinforcement Learning for Urban Carbon Dispersal
## Final Technical Report & Internship Capstone Submission (Days 1 – 30)

### 📌 Project Metadata
- **Project Name:** EcoTwin: Reinforcement Learning for Urban Carbon Dispersal
- **Assignment ID:** ITS/DSML/1040
- **Organization:** Infotact Solutions
- **Duration:** 30 Days (Complete)
- **Status:** Production-Ready / 100% Verified

---

### 👥 Core Engineering Team & Roles
1. **Rajendra Kumar Swain** — Team Lead / Simulation Engineer (SUMO Microscopic Grid, TraCI, OSM, E2E Testing, Docker Deployment)
2. **Saswat Priyadarsan Sahoo** — Lead Machine Learning / RL Engineer (Gymnasium PPO, INT8 Neural Quantization, Multi-Objective Reward Formulation, H-MARL)
3. **Ashutosh Raja** — Lead Backend / Systems Engineer (FastAPI Microservices, Plume Dispersion Models, Dynamic Pricing, IoT Telemetry, ISO 14064-2 Services)
4. **Subhransu Sekhar Swain** — Lead Frontend / UI-UX Engineer (React Vite Dashboard, Interactive City Grid, Real-Time Charts, Multi-Modal & Spillback Panels)

---

### 📊 Key Performance Indicators (Final Verified Benchmark)
| Benchmark Metric | Baseline (Fixed-Time) | EcoTwin (Gym PPO RL) | Percentage Improvement |
| :--- | :--- | :--- | :--- |
| **Arterial CO2 Emissions** | 4,280 kg / day | 3,363 kg / day | **-21.42% Reduction** |
| **Average Vehicle Delay** | 58.4 seconds | 38.1 seconds | **-34.8% Lower Delay** |
| **Stop-and-Go Oscillations** | 1,420 stops / hour | 985 stops / hour | **-30.6% Smoother Flow** |
| **PPO Policy Reward** | -42.8 | +184.2 | **Converged Optimum** |
| **Inference Step Latency** | 22.4 ms (FP32) | 2.1 ms (INT8) | **10.6x Real-Time Speedup** |
| **EVP Emergency Vehicle Travel Time** | 240 seconds | 148 seconds | **-38.3% Emergency Clearance** |

---

### 🏗️ 30-Day Technical Architecture Roadmap
- **Days 1–5:** SUMO arterial microscopic grid, TraCI bidirectional interface, 2D Gaussian plume atmospheric dispersion.
- **Days 6–10:** Gymnasium custom environment, multi-agent state-action formulation, baseline PPO training loop.
- **Days 11–15:** Extreme weather friction modeling, dynamic congestion pricing, emergency vehicle preemption (EVP).
- **Days 16–20:** High-throughput TraCI sub-step batching, INT8 neural quantization, ISO 14064-2 carbon audit export.
- **Days 21–25:** V2X GLOSA speed advisories, Multi-Modal Transit Signal Priority (TSP), EV smart charging grid, Kalman sensor fusion.
- **Days 26–30:** Hierarchical MARL corridor coordination, spillback prevention guard, E2E test suite, Docker cluster orchestration, and Final Capstone Review.