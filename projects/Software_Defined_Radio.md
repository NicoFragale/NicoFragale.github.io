---
layout: page
title: Software Defined Radio
permalink: /projects/Software_Defined_Radio/
---

## Hardware used
- RTL-SDR v3
- 1090 MHz antenna (dipole antenna)

## Aircraft Tracking with RTL-SDR

Using an RTL-SDR receiver it is possible to passively monitor aircraft broadcasts transmitted on the **1090 MHz** frequency band because commercial aircraft periodically transmit telemetry information using the **ADS-B (Automatic Dependent Surveillance–Broadcast)** protocol, whom signals are unencrypted and publicly broadcast so that air traffic control systems and nearby aircraft can receive situational information.

In my setup I used an RTL-SDR dongle together with the tool `dump1090`, which decodes raw Mode-S / ADS-B frames received by the SDR device.


![dump1090](https://nicofragale.github.io/assets/images/dump1090.png)

The tool parses the received frames and displays information such as:

- **Hex** – unique identifier of a specific aircraft assigned by the International Civil Aviation Organization (ICAO)
- **Flight** – aircraft callsign  
- **Alt** – altitude (feet)  
- **Spd** – ground speed  
- **Hdg** – The **direction of the aircraft’s movement** relative to geographic north, expressed in degrees (0–360°). For example, a heading of **90°** means the aircraft is moving east, while **180°** indicates south.
- **Lat / Long** – GPS position transmitted by the aircraft  
- **RSSI** – received signal strength  
- **Msgs** – number of decoded messages

Each aircraft periodically broadcasts these packets, typically **twice per second**, allowing receivers to continuously update its position.

To visualize the decoded aircraft positions, I compared the data with public aggregators such as **OpenSky Network**, which collects ADS-B telemetry from thousands of receivers around the world, and in the example below you can observe several aircraft flying around Rome.

![opensky](https://nicofragale.github.io/assets/images/opensky.png)

### Vulnerabilities 

Several academic studies have demonstrated that ADS-B lacks authentication and encryption mechanisms, making it theoretically vulnerable to message injection and spoofing attacks that could generate “ghost aircraft” using specific SDRs.  

Further reading on ADS-B security and message injection attacks:

- **Martin Strohmeier, Vincent Lenders, Ivan Martinovic**  
  *On the Security of the ADS-B Protocol*  
  https://ieeexplore.ieee.org/document/6940209

- **Eren Kocaağa, M. Oguzhan Külekci**  
  *Security Analysis of ADS-B*  
  https://ieeexplore.ieee.org/document/7960506

- **Matthias Schäfer**  
  *Ghost Planes: Injecting False Aircraft into Air Traffic Control Systems*  
  https://www.researchgate.net/figure/Attack-scenario-an-attacker-injects-ghost-aircraft-to-mislead-the-instruments-of_fig1_279923668


- **Mohsen Riahi Manesh, Naima Kaabouch**  
  *Aviation Cybersecurity: ADS-B Vulnerabilities and Defenses*  
  https://www.sciencedirect.com/science/article/abs/pii/S1874548217300446