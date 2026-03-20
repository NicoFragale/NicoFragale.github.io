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

---

## 🚨 Kismet Alerts – Real-Time Threat Detection

![Alert1](https://nicofragale.github.io/assets/images/kAlert1.png) 

The image shows the **Alerts panel in Kismet**, which highlights one of its most powerful features: the ability to detect suspicious activity and potential attacks in real time.

In this case, we can see multiple alerts related to **broadcast deauthentication/disassociation events (BCASTDISCON)** that I performed usign Bruce firmware.
The important aspect here is that the alerts are generated **immediately**, as soon as the behavior is observed.

![Alert2](https://nicofragale.github.io/assets/images/kAlert2.png) 

Additionally, the panel shows system-related warnings (such as running Kismet as root), which help improve both **security and configuration awareness**.

The image shows more details on how the DoS attack was performed, Bruce firmware performs Deauth Attack spoofing AP's Mac Address.

---

Stay tuned for more!