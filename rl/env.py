"""
EcoTwin - Gymnasium Reinforcement Learning Environment
Author: Saswat Priyadarsan Sahoo (RL & Emissions Lead - Day 4 Deliverable)
Description: Custom OpenAI Gymnasium environment for dynamic traffic signal phase
             control optimizing for dual-objective: minimal delay & carbon dispersal.
"""

import numpy as np

# Gymnasium interface definition
try:
    import gymnasium as gym
    from gymnasium import spaces
except ImportError:
    # Lightweight fallback shim for non-gym test environments
    class GymShim:
        class Env: pass
        class spaces:
            class Box:
                def __init__(self, low, high, shape, dtype):
                    self.shape = shape
                    self.low = low
                    self.high = high
                    self.dtype = dtype
                def sample(self):
                    return np.random.uniform(self.low, self.high, size=self.shape).astype(self.dtype)
            class Discrete:
                def __init__(self, n):
                    self.n = n
                def sample(self):
                    return np.random.randint(0, self.n)
    gym = GymShim()
    spaces = gym.spaces


class EcoTwinEnv(gym.Env):
    """
    EcoTwin Traffic Light Reinforcement Learning Environment.
    
    Observation Space:
        8-dimensional continuous vector representing 4 inbound and 4 outbound corridors:
        [Queue_N, Queue_S, Queue_E, Queue_W, CO2_N, CO2_S, CO2_E, CO2_W]
    
    Action Space:
        Discrete(4):
        0: North-South Green (Phase 0)
        1: North-South Yellow (Phase 1)
        2: East-West Green (Phase 2)
        3: East-West Yellow (Phase 3)
    """

    metadata = {"render_modes": ["human"]}

    def __init__(self, alpha_delay=0.4, beta_carbon=0.6, max_steps=300):
        super().__init__()
        self.alpha_delay = alpha_delay
        self.beta_carbon = beta_carbon
        self.max_steps = max_steps
        self.current_step = 0

        # Actions: 4 discrete traffic light phases
        self.action_space = spaces.Discrete(4)

        # Observations: 4 queue lengths [0, 50] + 4 normalized CO2 rates [0.0, 10.0 g/s]
        low = np.array([0.0] * 4 + [0.0] * 4, dtype=np.float32)
        high = np.array([50.0] * 4 + [10.0] * 4, dtype=np.float32)
        self.observation_space = spaces.Box(low=low, high=high, shape=(8,), dtype=np.float32)

        self.state = np.zeros(8, dtype=np.float32)

    def reset(self, seed=None, options=None):
        super().reset(seed=seed) if hasattr(super(), "reset") else None
        self.current_step = 0
        # Initialize realistic initial traffic state
        self.state = np.array([
            np.random.uniform(5, 20),   # Queue North
            np.random.uniform(5, 20),   # Queue South
            np.random.uniform(5, 15),   # Queue East
            np.random.uniform(5, 15),   # Queue West
            np.random.uniform(0.5, 2.5),# CO2 North (g/s)
            np.random.uniform(0.5, 3.0),# CO2 South (g/s)
            np.random.uniform(0.4, 2.0),# CO2 East (g/s)
            np.random.uniform(0.4, 2.0) # CO2 West (g/s)
        ], dtype=np.float32)

        info = {"status": "Environment reset successfully", "initial_co2": float(np.sum(self.state[4:]))}
        return self.state, info

    def step(self, action):
        self.current_step += 1

        # Simulate physics effect of action on queues and carbon
        # If green for N-S (action 0), N-S queues clear faster, E-W queues accumulate
        if action == 0:
            self.state[0] = max(0.0, self.state[0] - 2.5)  # North clears
            self.state[1] = max(0.0, self.state[1] - 2.5)  # South clears
            self.state[2] += np.random.uniform(0.5, 1.5)   # East queues
            self.state[3] += np.random.uniform(0.5, 1.5)   # West queues
            self.state[4] = max(0.3, self.state[4] * 0.85) # North CO2 drops
            self.state[5] = max(0.3, self.state[5] * 0.85) # South CO2 drops
            self.state[6] += 0.3                          # East idling CO2 accumulates
            self.state[7] += 0.3                          # West idling CO2 accumulates
        elif action == 2:  # East-West green
            self.state[0] += np.random.uniform(0.5, 1.5)
            self.state[1] += np.random.uniform(0.5, 1.5)
            self.state[2] = max(0.0, self.state[2] - 2.5)
            self.state[3] = max(0.0, self.state[3] - 2.5)
            self.state[4] += 0.3
            self.state[5] += 0.3
            self.state[6] = max(0.3, self.state[6] * 0.85)
            self.state[7] = max(0.3, self.state[7] * 0.85)
        else:  # Yellow transition phases
            # Acceleration spikes happen during phase switches
            self.state[4:] += 0.15

        # Compute Dual-Penalty Reward
        total_queue_delay = float(np.sum(self.state[:4]))
        total_carbon_rate = float(np.sum(self.state[4:]))
        
        # Dual-objective reward: negative penalty for both delay and carbon spikes
        reward = -1.0 * (self.alpha_delay * total_queue_delay + self.beta_carbon * total_carbon_rate * 10.0)

        terminated = bool(self.current_step >= self.max_steps)
        truncated = False
        info = {
            "step": self.current_step,
            "total_delay": total_queue_delay,
            "total_co2_rate_gps": total_carbon_rate,
            "reward": reward
        }

        return self.state, reward, terminated, truncated, info


if __name__ == "__main__":
    env = EcoTwinEnv()
    obs, info = env.reset()
    print("=" * 65)
    print("      ECOTWIN GYMNASIUM ENVIRONMENT VALIDATION")
    print("=" * 65)
    print(f"Observation Shape : {obs.shape}")
    print(f"Action Space Size : {env.action_space.n}")
    print(f"Initial State     : {obs}")
    
    # Run 5 test steps
    total_reward = 0.0
    for i in range(5):
        act = env.action_space.sample()
        obs, r, term, trunc, inf = env.step(act)
        total_reward += r
        print(f"Step {i+1} | Action Taken: {act} | Reward: {r:.2f} | Total CO2: {inf['total_co2_rate_gps']:.2f} g/s")
    
    print("-" * 65)
    print(f"[SUCCESS] EcoTwinEnv stepped successfully! Cumulative reward: {total_reward:.2f}")
    print("=" * 65)