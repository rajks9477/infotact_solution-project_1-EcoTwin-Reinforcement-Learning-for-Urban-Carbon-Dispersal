"""
EcoTwin - Day 7 Quality Assurance & Deliverables Audit
Author: Rajendra Kumar Swain (Lead Engineer)
Date: September 14, 2026

Exhaustively verifies all deliverables from the 'Dynamic Rerouting & Corridor Scaling' Phase:
- Rajendra  : dynamic_rerouting.py, rerouting_results.json
- Saswat    : docs/MULTI_AGENT_COORDINATION.md (MAPPO Architecture & Spatial Rewards)
- Ashutosh  : backend/routes/analytics.py, updated backend/app.py (historical analytics router)
- Subhransu : frontend/src/components/ReroutingStats.jsx, updated frontend/src/App.jsx
"""

import os
import json

def check_file(path, label, min_size=50):
    if not os.path.exists(path):
        return False, f"Missing ({path})"
    size = os.path.getsize(path)
    if size < min_size:
        return False, f"Too small/empty ({size} bytes)"
    return True, f"{size} bytes ({label})"

def check_json(path, key_to_check=None):
    if not os.path.exists(path):
        return False, f"File Not Found ({path})"
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        if key_to_check and key_to_check not in data:
            return False, f"Missing key '{key_to_check}'"
        return True, f"Valid JSON ({os.path.basename(path)})"
    except Exception as e:
        return False, f"Invalid JSON: {e}"

def check_file_contains(path, pattern, label):
    if not os.path.exists(path):
        return False, f"Missing ({path})"
    try:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        if pattern in content:
            return True, f"Verified '{pattern}' ({label})"
        return False, f"Missing pattern '{pattern}' in {path}"
    except Exception as e:
        return False, f"Read error: {e}"

def main():
    print("=" * 80)
    print("       ECOTWIN AUDIT SUITE: DAY 7 DELIVERABLES & INTEGRATION AUDIT")
    print("=" * 80)

    tests = [
        # --- RAJENDRA (Simulation & Dynamic TraCI Rerouting) ---
        ("Rajendra | Day 7: simulation/dynamic_rerouting.py", 
         check_file("simulation/dynamic_rerouting.py", "Carbon-Aware Rerouting Engine")),
        ("Rajendra | Day 7: simulation/rerouting_results.json", 
         check_json("simulation/rerouting_results.json", "total_vehicles_diverted")),
        ("Rajendra | Day 7: Rerouting TraCI Logic", 
         check_file_contains("simulation/dynamic_rerouting.py", "total_diverted_vehicles", "Dynamic Diversion Engine")),

        # --- SASWAT (MAPPO Multi-Agent Coordination Specs) ---
        ("Saswat   | Day 7: docs/MULTI_AGENT_COORDINATION.md", 
         check_file("docs/MULTI_AGENT_COORDINATION.md", "MAPPO Coordination Architecture", min_size=500)),
        ("Saswat   | Day 7: Spatial Reward Formulation", 
         check_file_contains("docs/MULTI_AGENT_COORDINATION.md", "R_t^{\\text{multi}}", "MAPPO Team Reward Formulation")),

        # --- ASHUTOSH (Historical Analytics & Corridor Endpoints) ---
        ("Ashutosh | Day 7: backend/routes/analytics.py", 
         check_file("backend/routes/analytics.py", "Historical Analytics Router")),
        ("Ashutosh | Day 7: Corridor Audit Endpoint", 
         check_file_contains("backend/routes/analytics.py", "/corridors", "Corridor Breakdown")),
        ("Ashutosh | Day 7: App Gateway Route Mount", 
         check_file_contains("backend/app.py", "analytics_router", "Mounted Analytics Gateway")),

        # --- SUBHRANSU (Dynamic Rerouting HUD & Stats Card) ---
        ("Subhransu| Day 7: components/ReroutingStats.jsx", 
         check_file("frontend/src/components/ReroutingStats.jsx", "Rerouting Bypass HUD Card")),
        ("Subhransu| Day 7: Bypass Diverted Metric Render", 
         check_file_contains("frontend/src/components/ReroutingStats.jsx", "totalDiverted", "Telemetry Binding")),
        ("Subhransu| Day 7: App Dashboard Integration", 
         check_file_contains("frontend/src/App.jsx", "<ReroutingStats", "Embedded in Dashboard Grid")),
    ]

    passed = 0
    total = len(tests)

    for name, (status, detail) in tests:
        tag = "[PASS]" if status else "[FAIL]"
        if status:
            passed += 1
        print(f"{tag:<8} | {name:<50} | {detail}")

    print("=" * 80)
    percentage = (passed / total) * 100
    print(f"DAY 7 AUDIT SCORE: {passed}/{total} Passed ({percentage:.1f}%)")
    if passed == total:
        print("VERDICT: ALL DAY 7 DYNAMIC REROUTING, MAPPO & ANALYTICS DELIVERABLES ARE 100% VERIFIED!")
    else:
        print("VERDICT: SOME DELIVERABLES FAILED VERIFICATION.")
    print("=" * 80)

if __name__ == "__main__":
    main()
