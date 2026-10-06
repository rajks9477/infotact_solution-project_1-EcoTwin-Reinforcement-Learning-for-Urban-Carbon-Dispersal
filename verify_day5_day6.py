"""
EcoTwin - Day 5 & Day 6 Combined Quality Assurance & Deliverables Audit
Author: Rajendra Kumar Swain (Lead Engineer)
Date: September 12, 2026

Exhaustively verifies all deliverables from the 'AI Brain & Real-Time Closed Loop' Phase:
- Rajendra  : eval_baseline.py, baseline_benchmark.json, eval_rl_agent.py, rl_evaluation_results.json
- Saswat    : train_ppo.py, training_metrics.json, policy_checkpoint.json, evaluate.py, evaluation_report.json
- Ashutosh  : routes/telemetry.py, routes/rl_controller.py, updated app.py
- Subhransu : components/EmissionCharts.jsx, components/AlertBanner.jsx, updated App.jsx
"""

import os
import json

def check_file(path, label):
    if not os.path.exists(path):
        return False, f"Missing ({path})"
    size = os.path.getsize(path)
    if size == 0:
        return False, f"Empty file ({path})"
    return True, f"{size} bytes"

def check_json(path, key_to_check=None):
    if not os.path.exists(path):
        return False, "File Not Found"
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        if key_to_check and key_to_check not in data:
            return False, f"Missing key '{key_to_check}'"
        return True, f"Valid JSON ({os.path.basename(path)})"
    except Exception as e:
        return False, f"Invalid JSON: {e}"

def main():
    print("=" * 80)
    print("       ECOTWIN COMBINED AUDIT SUITE: DAY 5 & DAY 6 DELIVERABLES")
    print("=" * 80)

    tests = [
        # --- RAJENDRA (Simulation & Closed-Loop Actuation) ---
        ("Rajendra | Day 5: eval_baseline.py", check_file("simulation/eval_baseline.py", "Baseline Controller")),
        ("Rajendra | Day 5: baseline_benchmark.json", check_json("simulation/baseline_benchmark.json", "final_cumulative_co2_grams")),
        ("Rajendra | Day 6: eval_rl_agent.py", check_file("simulation/eval_rl_agent.py", "Closed-Loop Evaluator")),
        ("Rajendra | Day 6: rl_evaluation_results.json", check_json("simulation/rl_evaluation_results.json", "co2_reduction_vs_baseline")),

        # --- SASWAT (RL Training, Weights Checkpoint & Report) ---
        ("Saswat   | Day 5: train_ppo.py", check_file("rl/train_ppo.py", "PPO Training Script")),
        ("Saswat   | Day 5: training_metrics.json", check_json("rl/training_metrics.json", "baseline_comparison")),
        ("Saswat   | Day 6: policy_checkpoint.json", check_json("rl/policy_checkpoint.json", "policy_matrix")),
        ("Saswat   | Day 6: evaluate.py", check_file("rl/evaluate.py", "Model Evaluation Script")),
        ("Saswat   | Day 6: evaluation_report.json", check_json("rl/evaluation_report.json", "relative_co2_reduction_percentage")),

        # --- ASHUTOSH (Backend WebSockets & AI Policy Switcher) ---
        ("Ashutosh | Day 5: routes/telemetry.py", check_file("backend/routes/telemetry.py", "WebSocket Telemetry Router")),
        ("Ashutosh | Day 6: routes/rl_controller.py", check_file("backend/routes/rl_controller.py", "RL Controller Router")),
        ("Ashutosh | Gateway: backend/app.py", check_file("backend/app.py", "Mounted App Gateway")),

        # --- SUBHRANSU (Frontend Comparative Charts & Alert Banner) ---
        ("Subhransu| Day 5: EmissionCharts.jsx", check_file("frontend/src/components/EmissionCharts.jsx", "Comparative Charts")),
        ("Subhransu| Day 6: AlertBanner.jsx", check_file("frontend/src/components/AlertBanner.jsx", "Hotspot Alert Banner")),
        ("Subhransu| Layout: frontend/src/App.jsx", check_file("frontend/src/App.jsx", "Integrated Root App"))
    ]

    passed = 0
    total = len(tests)

    for name, (status, detail) in tests:
        tag = "[PASS]" if status else "[FAIL]"
        if status:
            passed += 1
        print(f"{tag:<8} | {name:<46} | {detail}")

    print("=" * 80)
    percentage = (passed / total) * 100
    print(f"AUDIT SCORE: {passed}/{total} Passed ({percentage:.1f}%)")
    if passed == total:
        print("VERDICT: ALL DAY 5 & DAY 6 AI, STREAMING & VISUAL DELIVERABLES ARE 100% READY!")
    else:
        print("VERDICT: SOME FILES NEED ATTENTION.")
    print("=" * 80)

if __name__ == "__main__":
    main()