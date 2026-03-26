---
layout: page
title: Deauthentication Attacks 🔫
permalink: /notes/deauthentication
---

Deauthentication attacks are one of the most common and important techniques in Wi-Fi security auditing.  
They exploit a fundamental weakness in the IEEE 802.11 protocol: **management frames are not authenticated** in many configurations (especially WPA2 without protection mechanisms like 802.11w).

This means an attacker can forge deauthentication frames and force legitimate clients to disconnect from an access point.

#### How Deauthentication Works

In a normal Wi-Fi connection, a client remains associated with an access point until one of the two decides to terminate the connection.

A deauthentication attack breaks this relationship by sending forged frames that appear to come from:
- the Access Point → to disconnect the client  
- or the Client → to disconnect from the AP  

As a result, the victim is forced to reconnect, which is extremely useful in attacks like:
- WPA/WPA2 handshake capture  
- Evil Twin attacks  


#### Deauthentication with mdk4

`mdk4` is a powerful tool designed for **high-speed and aggressive wireless attacks**.

Key characteristics:
- Sends deauthentication frames at very high rates  
- Can target multiple clients simultaneously  
- Can flood the entire network (broadcast attack)  
- Less precise but very effective in noisy environments  

Typical use case:
- You want to **quickly force any connected device to reconnect**
- Useful when no clients are actively reconnecting on their own

Limitations:
- Very noisy (easy to detect)
- Can disrupt the entire network heavily
- Less control over specific targets


#### Deauthentication with aireplay-ng

`aireplay-ng` is part of the Aircrack-ng suite and provides a more **controlled and targeted approach**.

Key characteristics:
- Can target a specific client (using its MAC address)  
- Allows fine control over the number and timing of packets  
- More stealthy compared to mdk4  
- Easier to integrate in precise attack workflows  

Typical use case:
- You want to disconnect **one specific device**  
- You are performing a controlled lab test  
- You want to minimize noise and avoid detection  

Limitations:
- Slower than mdk4  
- Requires more manual setup  
- Less effective if you need to attack many clients at once  


#### Key Differences (mdk4 vs aireplay-ng)

| Feature                  | mdk4                          | aireplay-ng                  |
|--------------------------|-------------------------------|------------------------------|
| Attack style             | Aggressive / Flood            | Controlled / Targeted        |
| Speed                    | Very high                     | Moderate                     |
| Precision                | Low                           | High                         |
| Targeting                | Multiple / Broadcast          | Single client or AP          |
| Noise / Detectability    | High                          | Lower                        |
| Typical use              | Force any reconnection        | Targeted disconnection       |



#### Defensive Measures

Modern Wi-Fi networks can mitigate these attacks using:

- **802.11w (Protected Management Frames)** → prevents spoofed deauth frames  
- WPA3 → includes stronger protections  and mandatory PMF
- Intrusion Detection Systems (WIDS/WIPS) → detect abnormal deauth patterns  

However, many networks still remain vulnerable, especially legacy WPA2 configurations.

