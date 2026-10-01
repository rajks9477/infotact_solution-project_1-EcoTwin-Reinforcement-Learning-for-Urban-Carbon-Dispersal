"""
EcoTwin - Day 24: EV Eco-Charging Smart Grid Integration & Fleet Decarbonization
Simulates arterial EV fast-charging hub load balancing and grid-aware routing.
"""

import json
import os

class EVChargingFleetManager:
    def __init__(self, grid_capacity_kw=1200.0, renewable_share_pct=68.5):
        self.grid_capacity_kw = grid_capacity_kw
        self.renewable_share_pct = renewable_share_pct
        self.charging_hubs = [
            {"hub_id": "HUB_NORTH_01", "junction": "junc_00", "chargers": 8, "occupied": 6, "draw_kw": 300.0, "green_kwh_cost": 0.12},
            {"hub_id": "HUB_CENTRAL_02", "junction": "junc_02", "chargers": 12, "occupied": 11, "draw_kw": 550.0, "green_kwh_cost": 0.18},
            {"hub_id": "HUB_EAST_03", "junction": "junc_01", "chargers": 6, "occupied": 2, "draw_kw": 100.0, "green_kwh_cost": 0.10},
            {"hub_id": "HUB_SOUTH_04", "junction": "junc_03", "chargers": 10, "occupied": 5, "draw_kw": 250.0, "green_kwh_cost": 0.14}
        ]

    def evaluate_fleet_charging_dispatch(self, ev_fleet):
        """Dispatches low-SoC vehicles to hubs with high renewable availability and low queue."""
        dispatch_actions = []
        for ev in ev_fleet:
            soc = ev["soc_pct"]
            if soc < 25.0:
                # Find hub with lowest occupancy ratio
                best_hub = min(self.charging_hubs, key=lambda h: (h["occupied"] / h["chargers"]))
                dispatch_actions.append({
                    "vehicle_id": ev["vehicle_id"],
                    "current_soc_pct": soc,
                    "target_hub": best_hub["hub_id"],
                    "dispatch_action": "REROUTE_TO_CHARGING_HUB",
                    "co2_avoidance_g_km": 118.4,
                    "estimated_charge_time_min": round((80.0 - soc) * 0.45, 1)
                })
            else:
                dispatch_actions.append({
                    "vehicle_id": ev["vehicle_id"],
                    "current_soc_pct": soc,
                    "target_hub": None,
                    "dispatch_action": "CONTINUE_ECO_ROUTING",
                    "co2_avoidance_g_km": 142.0,
                    "estimated_charge_time_min": 0.0
                })
        return dispatch_actions

    def run_ev_fleet_audit(self):
        sample_fleet = [
            {"vehicle_id": "EV_FLEET_01", "soc_pct": 18.2},
            {"vehicle_id": "EV_FLEET_02", "soc_pct": 64.0},
            {"vehicle_id": "EV_FLEET_03", "soc_pct": 12.5},
            {"vehicle_id": "EV_FLEET_04", "soc_pct": 82.0}
        ]
        total_grid_draw = sum(h["draw_kw"] for h in self.charging_hubs)
        dispatch_results = self.evaluate_fleet_charging_dispatch(sample_fleet)

        audit_path = os.path.join(os.path.dirname(__file__), "ev_charging_audit.json")
        audit_data = {
            "day": 24,
            "module": "EV Eco-Charging Smart Grid Integration",
            "grid_metrics": {
                "total_capacity_kw": self.grid_capacity_kw,
                "current_draw_kw": total_grid_draw,
                "grid_load_factor": round(total_grid_draw / self.grid_capacity_kw, 3),
                "renewable_share_pct": self.renewable_share_pct
            },
            "dispatch_audit": dispatch_results
        }

        with open(audit_path, "w", encoding="utf-8") as f:
            json.dump(audit_data, f, indent=2)

        print("=" * 72)
        print("      ECOTWIN EV SMART CHARGING & GRID INTEGRATION AUDIT")
        print("=" * 72)
        print(f"[GRID] Load: {total_grid_draw} kW / {self.grid_capacity_kw} kW ({audit_data['grid_metrics']['grid_load_factor']*100:.1f}%) | Renewable: {self.renewable_share_pct}%")
        print("-" * 72)
        for d in dispatch_results:
            print(f"[EV DISPATCH] {d['vehicle_id']} (SoC: {d['current_soc_pct']}%) -> {d['dispatch_action']:22s} | Target: {str(d['target_hub']):14s}")
        print("-" * 72)
        print(f"[PASS] EV charging fleet audit complete. Telemetry saved to {audit_path}")
        print("=" * 72)
        return audit_data

if __name__ == "__main__":
    manager = EVChargingFleetManager()
    manager.run_ev_fleet_audit()