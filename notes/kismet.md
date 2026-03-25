---
layout: page
title: Kismet ​🚧​ 
permalink: /notes/kismet/
---

[Kismet](https://www.kismetwireless.net/docs/readme/logging/logging/) is an open source sniffer, WIDS, wardriver, and packet capture tool for Wi-Fi, Bluetooth, BTLE, wireless thermometers, airplanes, power meters, Zigbee, and more.

It operates almost entirely passively, with a few exceptions and is not an attack tool (generally).

You can use Kismet for passive reconnaissance and to weak or misconfigured networks, but also to monitor suspicious activity inside your network and support activities like wardriving. It is more user-friendly and complete compared to airodump-ng, let's have a look!

## 🖥️ Kismet Web Interface – Home Overview

![kismet](https://nicofragale.github.io/assets/images/kismet.png) 

The image shows the main dashboard of Kismet, accessible through its web interface that collects and displays in real time all detected wireless activity thanks to monitor mode.

At the top, there are different tabs like **Alerts, SSIDs, and ADSB live**, which let you switch between the types of information gathered by Kismet.

The main part of the page is a table that lists all detected wireless networks (Access Points). For each network, Kismet provides useful details such as:

- **Type** → what kind of device it is (e.g. Access Point)  
- **PHY** → the wireless standard used (like IEEE 802.11)  
- **Encryption** → the security protocol (WPA2, WPA3, etc.)  
- **Signal (Sgn)** → signal strength, helpful to estimate how close the network is  
- **Channel (Chan)** → the radio channel being used  
- **Data / Packets** → how much traffic has been captured  
- **Clients** → number of devices connected  

Each row represents a detected network, and the table updates continuously as new devices are found or activity changes.


## 🚨 Kismet Alerts – Real-Time Threat Detection

![Alert1](https://nicofragale.github.io/assets/images/kAlert1.png) 

The image shows the **Alerts panel in Kismet**, which highlights one of its most powerful features: the ability to detect suspicious activity and potential attacks in real time.

In this case, we can see multiple alerts related to **broadcast deauthentication/disassociation events (BCASTDISCON)** that I performed usign Bruce firmware.
The important aspect here is that the alerts are generated **immediately**, as soon as the behavior is observed.

![Alert2](https://nicofragale.github.io/assets/images/kAlert2.png) 

Additionally, the panel shows system-related warnings (such as running Kismet as root), which help improve both **security and configuration awareness**.

The image shows more details on how the DoS attack was performed, Bruce firmware performs Deauth Attack spoofing AP's Mac Address.

---

## Access Point Information

![Kismet AP]( /assets/images/kismet-ap.png )

The image shows key information about a detected Access Point (AP):

- **SSID** → the network name  
- **BSSID (MAC address)** → unique identifier of the AP  
- **Manufacturer** → derived from the MAC address (OUI lookup)  
- **Channel** → the WiFi channel in use  
- **Frequency range** → for example, channel 11 typically spans from **2452 MHz to 2472 MHz**

The **bar graph** represents how packets are distributed across the channel frequency.
Each WiFi channel is a **range of frequencies** and the graph shows where signal activity is concentrated within that range. Sometimes, you may also notice activity from **adjacent channels**, due to overlapping frequencies.

To better understand this:

- The **channel** = the entire highway  
- The **frequencies** = the lanes  
- The **packets** = the cars  

Packets do not occupy a single fixed frequency, instead they are distributed across the channel depending on the transmission.This behavior is due to **OFDM (Orthogonal Frequency Division Multiplexing)**, where data is spread across multiple subcarriers.

The **donut chart** labeled **Packet Types** shows the nature of the traffic:

- **Management / LLC**
  - Beacon frames  
  - Probe requests/responses  
  - Authentication frames  
- **Data**
  - Real user traffic (web browsing, applications, etc.)

---

## SSID Behavior

### Advertised SSID

- The network name actively broadcasted by the AP  
- Sent through **beacon frames**  
- Visible during passive scanning  

### Responded SSID

- The network name returned when a client actively searches for networks  
- Sent via **probe response frames**  

This distinction highlights the difference between:
- passive discovery  
- active probing  


## Security Feature: MFP

**MFP (Management Frame Protection)** protects management frames from tampering.

- If **enabled** → protection against certain attacks  
- If **unavailable** → the network is vulnerable  

For example, lack of MFP allows attacks such as:
- **deauthentication attacks**


## Channel Width (HT Mode)

The **HT mode** indicates the channel bandwidth:

- **HT20** → 20 MHz  
- **HT40** → 40 MHz  

Wider channels allow higher throughput but increase interference risk.


## WiFi Bridging

When a device is marked as **WiFi Bridged**, it means:

- it is not just a client  
- it acts as a **bridge between two networks**

This can happen, for example, in:
- repeaters  
- hotspots  
- routing devices  

---

Stay tuned for more!