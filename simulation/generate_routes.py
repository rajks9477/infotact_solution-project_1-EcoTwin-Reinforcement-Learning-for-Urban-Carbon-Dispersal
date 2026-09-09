"""
EcoTwin Dynamic Traffic Demand & Route Generator
Author: Rajendra Kumar Swain (Team Lead - Group 8)
Description: Generates stochastic vehicle trips and departure schedules across 8 turning corridors with HBEFA3 emission classes.
"""

import os
import random

def generate_traffic_demand(filepath="simulation/traffic.rou.xml", total_vehicles=320, duration=3600):
    """
    Generates realistic urban traffic flow with peak arrivals and commercial vehicle ratios.
    """
    # 8 Directional Turning Corridors on our 4-Way Grid
    corridors = [
        ("route_NS", "N2C C2S"),  # North to South (Arterial Through)
        ("route_SN", "S2C C2N"),  # South to North (Arterial Through)
        ("route_EW", "E2C C2W"),  # East to West (Arterial Through)
        ("route_WE", "W2C C2E"),  # West to East (Arterial Through)
        ("route_NE", "N2C C2E"),  # North to East (Left Turn)
        ("route_SW", "S2C C2W"),  # South to West (Left Turn)
        ("route_NW", "N2C C2W"),  # North to West (Right Turn)
        ("route_SE", "S2C C2E"),  # South to East (Right Turn)
    ]

    with open(filepath, "w", encoding="utf-8") as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        f.write('<routes xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://sumo.dlr.de/xsd/routes_file.xsd">\n\n')
        
        # Vehicle Type Definitions (HBEFA3 European Standard Emission Classes)
        f.write('    <!-- Vehicle Types with HBEFA3 Emission Signatures -->\n')
        f.write('    <vType id="passenger_car" accel="2.6" decel="4.5" sigma="0.5" length="5.0" minGap="2.5" maxSpeed="13.89" color="0,150,255" emissionClass="HBEFA3/PC_G_EU4" guiShape="passenger"/>\n')
        f.write('    <vType id="heavy_truck" accel="1.2" decel="3.0" sigma="0.5" length="10.0" minGap="3.0" maxSpeed="10.0" color="255,100,0" emissionClass="HBEFA3/HDV" guiShape="truck"/>\n')
        f.write('    <vType id="eco_electric" accel="3.0" decel="4.5" sigma="0.3" length="4.8" minGap="2.0" maxSpeed="13.89" color="0,255,120" emissionClass="Zero/unknown" guiShape="passenger/sedan"/>\n\n')

        # Corridor Route Definitions
        f.write('    <!-- 8 Directional Turning Corridors -->\n')
        for route_id, edges in corridors:
            f.write(f'    <route id="{route_id}" edges="{edges}"/>\n')
        f.write('\n    <!-- Vehicle Departures over Simulation Timeline -->\n')

        # Generate Stochastic Departures with Peak Density
        vehicles = []
        for i in range(total_vehicles):
            # Non-uniform arrival distribution (rush periods)
            depart_time = round(random.triangular(1.0, duration, duration * 0.4), 1)
            
            # Fleet Composition: 70% Passenger Cars, 20% Heavy Commercial Trucks, 10% EVs
            rand = random.random()
            if rand < 0.20:
                vtype = "heavy_truck"
            elif rand < 0.30:
                vtype = "eco_electric"
            else:
                vtype = "passenger_car"
                
            route = random.choice(corridors)[0]
            vehicles.append((depart_time, i, vtype, route))

        # Sort by departure time for valid SUMO chronology
        vehicles.sort(key=lambda x: x[0])

        for depart_time, i, vtype, route in vehicles:
            f.write(f'    <vehicle id="veh_{i:03d}" type="{vtype}" route="{route}" depart="{depart_time}"/>\n')

        f.write('</routes>\n')

    print(f"[SUCCESS] Generated {total_vehicles} dynamic vehicle trips in: {filepath}")

if __name__ == "__main__":
    os.makedirs("simulation", exist_ok=True)
    generate_traffic_demand()
    print("[READY] Realistic traffic and carbon emission demand successfully built by Rajendra!")