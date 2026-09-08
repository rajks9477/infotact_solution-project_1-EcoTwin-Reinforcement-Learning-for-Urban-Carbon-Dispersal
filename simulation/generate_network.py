"""
EcoTwin City Grid Network & Geometry Generator
Author: Rajendra Kumar Swain (Team Lead - Group 8)
Description: Generates nodes, edges, connections, and master SUMOCFG for the 4-way urban intersection.
"""

import os

def create_nodes(filepath="simulation/grid.nod.xml"):
    """Defines center traffic light junction and 4 arterial terminal nodes."""
    content = """<?xml version="1.0" encoding="UTF-8"?>
<nodes xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://sumo.dlr.de/xsd/nodes_file.xsd">
    <!-- Center Controlled Intersection (Traffic Light Controlled) -->
    <node id="center" x="0.0" y="0.0" type="traffic_light" tl="center"/>
    
    <!-- Outer Inflow and Outflow Boundary Terminals (300m Corridors) -->
    <node id="north" x="0.0" y="300.0" type="priority"/>
    <node id="south" x="0.0" y="-300.0" type="priority"/>
    <node id="east" x="300.0" y="0.0" type="priority"/>
    <node id="west" x="-300.0" y="0.0" type="priority"/>
</nodes>
"""
    with open(filepath, "w") as f:
        f.write(content)
    print(f"[SUCCESS] Nodes written to: {filepath}")

def create_edges(filepath="simulation/grid.edg.xml"):
    """Defines 2-lane dual-direction corridors with 50 km/h (13.89 m/s) speed limits."""
    content = """<?xml version="1.0" encoding="UTF-8"?>
<edges xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://sumo.dlr.de/xsd/edges_file.xsd">
    <!-- North Corridor (2 Lanes, 13.89 m/s) -->
    <edge id="N2C" from="north" to="center" priority="75" numLanes="2" speed="13.89"/>
    <edge id="C2N" from="center" to="north" priority="75" numLanes="2" speed="13.89"/>

    <!-- South Corridor -->
    <edge id="S2C" from="south" to="center" priority="75" numLanes="2" speed="13.89"/>
    <edge id="C2S" from="center" to="south" priority="75" numLanes="2" speed="13.89"/>

    <!-- East Corridor -->
    <edge id="E2C" from="east" to="center" priority="75" numLanes="2" speed="13.89"/>
    <edge id="C2E" from="center" to="east" priority="75" numLanes="2" speed="13.89"/>

    <!-- West Corridor -->
    <edge id="W2C" from="west" to="center" priority="75" numLanes="2" speed="13.89"/>
    <edge id="C2W" from="center" to="west" priority="75" numLanes="2" speed="13.89"/>
</edges>
"""
    with open(filepath, "w") as f:
        f.write(content)
    print(f"[SUCCESS] Edges written to: {filepath}")

def create_connections(filepath="simulation/grid.con.xml"):
    """Specifies collision-free lane-to-lane turning connections at the center junction."""
    content = """<?xml version="1.0" encoding="UTF-8"?>
<connections xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://sumo.dlr.de/xsd/connections_file.xsd">
    <!-- From North: Lane 0 goes Right & Straight, Lane 1 goes Left -->
    <connection from="N2C" to="C2W" fromLane="0" toLane="0"/>
    <connection from="N2C" to="C2S" fromLane="0" toLane="0"/>
    <connection from="N2C" to="C2S" fromLane="1" toLane="1"/>
    <connection from="N2C" to="C2E" fromLane="1" toLane="1"/>

    <!-- From South: Lane 0 goes Right & Straight, Lane 1 goes Left -->
    <connection from="S2C" to="C2E" fromLane="0" toLane="0"/>
    <connection from="S2C" to="C2N" fromLane="0" toLane="0"/>
    <connection from="S2C" to="C2N" fromLane="1" toLane="1"/>
    <connection from="S2C" to="C2W" fromLane="1" toLane="1"/>

    <!-- From East: Lane 0 goes Right & Straight, Lane 1 goes Left -->
    <connection from="E2C" to="C2N" fromLane="0" toLane="0"/>
    <connection from="E2C" to="C2W" fromLane="0" toLane="0"/>
    <connection from="E2C" to="C2W" fromLane="1" toLane="1"/>
    <connection from="E2C" to="C2S" fromLane="1" toLane="1"/>

    <!-- From West: Lane 0 goes Right & Straight, Lane 1 goes Left -->
    <connection from="W2C" to="C2S" fromLane="0" toLane="0"/>
    <connection from="W2C" to="C2E" fromLane="0" toLane="0"/>
    <connection from="W2C" to="C2E" fromLane="1" toLane="1"/>
    <connection from="W2C" to="C2N" fromLane="1" toLane="1"/>
</connections>
"""
    with open(filepath, "w") as f:
        f.write(content)
    print(f"[SUCCESS] Lane Connections written to: {filepath}")

def create_sumocfg(filepath="simulation/simulation.sumocfg"):
    """Master simulation configuration file."""
    content = """<?xml version="1.0" encoding="UTF-8"?>
<configuration xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://sumo.dlr.de/xsd/sumoConfiguration.xsd">
    <input>
        <net-file value="grid.net.xml"/>
        <route-files value="traffic.rou.xml"/>
    </input>
    <time>
        <begin value="0"/>
        <end value="3600"/>
        <step-length value="1.0"/>
    </time>
    <processing>
        <ignore-route-errors value="true"/>
        <collision.action value="none"/>
    </processing>
    <report>
        <verbose value="true"/>
        <no-step-log value="true"/>
    </report>
</configuration>
"""
    with open(filepath, "w") as f:
        f.write(content)
    print(f"[SUCCESS] SUMOCFG file written to: {filepath}")

if __name__ == "__main__":
    os.makedirs("simulation", exist_ok=True)
    create_nodes()
    create_edges()
    create_connections()
    create_sumocfg()
    print("\n[READY] All 4 road geometry files generated successfully!")