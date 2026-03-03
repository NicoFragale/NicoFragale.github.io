---
layout: page
title: WPA2 Deauthentication
permalink: /projects/WPA2_Deauthentication/
---

## Project Overview

This project describes the phases involved in assessing the security of my own WiFi network in a controlled environment.

The objective was to understand how WPA2-PSK security behaves in practice and how the 4-Way Handshake can be leveraged for offline password auditing.

The analysis was performed using tools from the [Aircrack-ng](/notes/network-security/Aircrack-ng/) suite and  
The attack was successfully reproduced against my own TV device, while modern devices such as my iPhone did not respond in the same way.

If you are unfamiliar with the WPA2 4-Way Handshake, refer to the detailed explanation [here](/notes/network-security/wpa2-4way-handshake/).

---

## 1. Reconnaissance and Environment Mapping (Passive Observation)

The first phase consists of observing the wireless environment.

The goal is to identify:

- SSID  
- BSSID (AP MAC address)  
- Channel and frequency band  
- Signal strength  
- Security configuration (WPA2-PSK, WPA2-Enterprise, PMF support)  
- Encryption type  
- Active client devices  

This requires a wireless interface capable of operating in **monitor mode**, which allows capturing raw IEEE 802.11 frames at Layer 2, including:

- Management frames  
- Control frames  
- Data frames  
- Frames not addressed to the local device  

Unlike managed mode, monitor mode passively observes all wireless traffic.

![monitor](https://nicofragale.github.io/assets/images/monitor.png)

In my lab setup, I used compatible the followgin external adapters: TL-WN722Nv1 and AWUS036AXML

Finally I suggest you to use Airgraph-ng to better understand the relationship between access points and associated stations.

![airodump](https://nicofragale.github.io/assets/images/airodump.png)


## 2. Triggering Reassociation and Capturing the Handshake

The 4-Way Handshake occurs whenever a client connects or reconnects to an access point.

In legacy WPA2 configurations without Protected Management Frames (802.11w), it may be possible to induce a reconnection event via Aireplay-ng deauthenticating the victim, and when this happens the monitoring interface can capture the handshake in a .pcap file and store it which contains the EAPOL-Key frames exchanged between the AP and the client.

Modern devices, such as recent smartphones, may implement additional protections that prevent forced reconnections or ignore unauthenticated management frames.

![aireplay](https://nicofragale.github.io/assets/images/aireplay.png)


## 3. Protocol Inspection with Wireshark

The captured traffic can be inspected using Wireshark, by filtering for EAPOL frames it is possible to observe the 4 handshake messages.

Particular attention on Message 1 and 2 by the moment they include data for PTK generation.

![wireshark](https://nicofragale.github.io/assets/images/wireshark.png)


## 4. Offline Password Verification

For each candidate passphrase from the dictionary (i.e rockyou.txt):

1. Derive The PMK using PBKDF2.
2. Derive The PTK using the captured nonces and MAC addresses.
3. The MIC is recomputed.
4. The computed MIC is compared to the captured one.

If the values match, the passphrase is correct.

This process does not break AES encryption.  
It exploits weak passphrase entropy.

![aircrack1](https://nicofragale.github.io/assets/images/aircrack1.png)

![aircrack2](https://nicofragale.github.io/assets/images/aircrack2.png)

The experiment confirmed that strong, high-entropy passwords are essential for WPA2-PSK security.