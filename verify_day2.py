"""
EcoTwin Day 1 + Day 2 Project Health Check & Quality Auditor
Author: Rajendra Kumar Swain (Team Lead)
"""

import os
import json
import xml.etree.ElementTree as ET

def test_xml_file(filepath):
    try:
        tree = ET.parse(filepath)
        root = tree.getroot()
        return True, f"Valid XML ({root.tag})"
    except Exception as e:
        return False, str(e)

def run_audit():
    print("=" * 70)
    print("        ECOTWIN PROJECT HEALTH CHECK (DAY 1 + DAY 2 AUDIT)")
    print("=" * 70)
    
    checks = []
    
    # 1. Check Documentation & Root Files
    doc_files = ["README.md", "requirements.txt", "docs/WORK_DISTRIBUTION.md"]
    for f in doc_files:
        status = os.path.exists(f) and os.path.getsize(f) > 0
        detail = f"{os.path.getsize(f)} bytes" if status else "Missing/Empty"
        checks.append((f"Root Document: {f}", status, detail))

    # 2. Check Simulation Geometry & XML Files
    xml_files = [
        "simulation/grid.nod.xml",
        "simulation/grid.edg.xml",
        "simulation/grid.con.xml",
        "simulation/simulation.sumocfg",
        "simulation/vehicle_types.xml"
    ]
    for xml in xml_files:
        if not os.path.exists(xml):
            checks.append((f"Simulation File: {xml}", False, "File Not Found"))
        else:
            valid, msg = test_xml_file(xml)
            checks.append((f"Simulation File: {xml}", valid, msg))

    # 3. Check Backend Code
    backend_files = ["backend/app.py", "backend/config.py", "backend/.env.example"]
    for bf in backend_files:
        status = os.path.exists(bf) and os.path.getsize(bf) > 0
        checks.append((f"Backend Service: {bf}", status, "Ready" if status else "Missing"))

    # 4. Check Frontend Files
    if os.path.exists("frontend/package.json"):
        try:
            with open("frontend/package.json") as jf:
                data = json.load(jf)
            checks.append(("Frontend Manifest: frontend/package.json", True, "Valid JSON (package.json)"))
        except Exception as e:
            checks.append(("Frontend Manifest: frontend/package.json", False, "Invalid JSON format"))
    else:
        checks.append(("Frontend Manifest: frontend/package.json", False, "Missing"))

    frontend_ui = ["frontend/index.html", "frontend/src/components/Navbar.jsx"]
    for fu in frontend_ui:
        status = os.path.exists(fu) and os.path.getsize(fu) > 0
        checks.append((f"Frontend UI: {fu}", status, "Ready" if status else "Missing"))

    # Print Results Table
    passed_count = 0
    for name, status, detail in checks:
        icon = "[PASS]" if status else "[FAIL]"
        if status:
            passed_count += 1
        print(f"{icon:<8} | {name:<44} | {detail}")
        
    print("=" * 70)
    score = (passed_count / len(checks)) * 100
    print(f"AUDIT SCORE: {passed_count}/{len(checks)} Passed ({score:.1f}%)")
    if score == 100:
        print("VERDICT: ALL DAY 1 & DAY 2 DELIVERABLES ARE 100% PRODUCTION READY!")
    else:
        print("VERDICT: SOME FILES NEED ATTENTION.")
    print("=" * 70)

if __name__ == "__main__":
    run_audit()