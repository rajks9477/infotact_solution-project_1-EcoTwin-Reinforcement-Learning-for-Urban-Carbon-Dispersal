# EcoTwin Environmentally-Aware RL Reward Specification
## Author: Saswat Priyadarsan Sahoo (Reinforcement Learning & Emissions Lead)
## Date: September 15, 2026 (Week 2 - Day 8 Deliverable)

### 1. Mathematical Formulation
$$R_t = - \left( P_{\text{delay}} + P_{\text{carbon}} + P_{\text{jerk}} + P_{\text{switch}} \right) + D_{\text{dispersion}}$$

Where:
- P_delay: alpha * total queue length (alpha = 0.35)
- P_carbon: beta * total CO2 emissions (beta = 0.45)
- P_jerk: gamma * acceleration variance * 10 (gamma = 0.12)
- P_switch: 1.5 if signal phase changed, else 0
- D_dispersion: delta * spatial balance bonus (delta = 0.08)