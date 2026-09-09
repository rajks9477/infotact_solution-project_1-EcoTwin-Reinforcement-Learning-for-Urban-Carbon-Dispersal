# EcoTwin Micro-Emission Modeling & Environmental Physics
## Author: Saswat Priyadarsan Sahoo (Reinforcement Learning & Emissions Lead)

---

### 1. The HBEFA3 Standard in Eclipse SUMO
In traditional traffic systems, pollution is estimated using coarse macro-averages. **EcoTwin** utilizes the European **HBEFA3 (Handbook Emission Factors for Road Transport)** model embedded within Eclipse SUMO to compute microscopic, instantaneous emissions per vehicle at every simulation timestep (1.0s).

---

### 2. Fleet Emission Signatures

#### A. Passenger Cars (Euro 4 Petrol - `HBEFA3/PC_G_EU4`)
- **Cruising Emission (50 km/h):** ~450 - 650 mg/s of CO2
- **Idling Emission (0 km/h, stationary):** ~320 - 400 mg/s of CO2
- **Acceleration Spike (0 -> 50 km/h):** ~1200 - 1800 mg/s of CO2

#### B. Heavy Duty Commercial Trucks (`HBEFA3/HDV`)
- **Cruising Emission:** ~1800 - 2400 mg/s of CO2
- **Idling Emission:** ~1100 - 1400 mg/s of CO2 + elevated Particulate Matter (PMx)
- **Acceleration Spike:** ~3500 - 5200 mg/s of CO2 

#### C. Eco / Electric Vehicles (`Zero/unknown`)
- **Direct Tailpipe Emission:** 0 mg/s (Clean vehicle reference benchmark).

---

### 3. The "Idling Smog Pocket" Phenomenon
When vehicles stop at a red signal:
1. They accumulate in high-density stationary queues within a 50m radius of the stop-bar.
2. Even at idle, a queue of 15 cars and 3 heavy trucks generates:
   $$\text{Total CO}_2 = (15 \times 350\text{ mg/s}) + (3 \times 1200\text{ mg/s}) = 8850\text{ mg/s}$$
3. Without adequate wind dispersion, this localized emission creates a hazardous toxic smog cloud.

---

### 4. Mathematical Integration with RL Reward
Our Reinforcement Learning Agent (PPO) optimizes a dual-penalty reward function:
$$R_t = - \left( \alpha \sum_{v} \text{WaitTime}_v + \beta \sum_{e} \max(0, \text{CO}_{2, e} - \text{Threshold}) \right)$$
Where $\beta$ penalizes localized emission spikes, incentivizing the agent to cycle signals dynamically to flush trapped carbon.