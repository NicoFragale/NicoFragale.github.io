---
layout: page ​
title: Airgeddon 🚜
permalink: /notes/airgeddon/
---


Airgeddon is an open-source Bash script designed to automate and simplify Wi-Fi security auditing. It acts as a wrapper around well-known tools such as `aircrack-ng`, `airodump-ng`, `aireplay-ng`, and others, providing a guided and interactive interface.

Instead of manually executing multiple commands, Airgeddon allows you to perform complex wireless attacks step-by-step through a menu-driven workflow.

#### Airgeddon Main Menu Overview

![Airmenu]( /assets/images/airmenu.png )


Each option in Airgeddon represents a specific phase or category of Wi-Fi auditing. Below is a concise description of each available action.

0. Exit the script → Closes Airgeddon and terminates the session.

1. Select another network interface → Allows switching between available network adapters (useful if multiple Wi-Fi cards are connected).

2. Put interface in monitor mode → Enables monitor mode to capture raw 802.11 frames (required for most attacks).

3. Put interface in managed mode → Restores normal Wi-Fi mode to reconnect to networks.

4. DoS attack menu → Contains denial-of-service techniques (e.g., deauthentication flooding).

5. Handshake/PMKID/Decloaking tools → Used to capture WPA/WPA2 handshakes or PMKIDs and reveal hidden SSIDs.

6. WPA/WPA2 offline cracking menu → Allows password cracking using captured handshakes or PMKIDs.

7. Evil Twin attack menu → Creates a fake access point to trick users into connecting and potentially capturing credentials.

8. WPS attack menu → Includes attacks against WPS (e.g., PIN brute force, Pixie Dust).

9. WEP attack menu → Legacy attacks targeting WEP networks (mainly educational today).

10. Enterprise attack menu → Targets WPA/WPA2 Enterprise networks (e.g., credential harvesting via rogue AP).

11. WPA3 attack menu → Contains experimental or specific attacks related to WPA3.

12. Information & Credits → Displays project info, contributors, and acknowledgments.

13. Options and language menu → Configuration settings, interface preferences, and language selection.

#### DoS Attack Menu (Practical Overview)

![Air4]( /assets/images/air4.png )

Before launching any attack in this section, you must first identify a target network.  
This is done using option **4 (Explore for targets)**, which scans nearby Wi-Fi networks and allows you to select a specific access point (BSSID, channel, ESSID).

Once a target is selected, the following attacks become available:

5. Deauthentication / Disassociation (mdk4) → Performs a high-speed deauthentication attack using `mdk4`. It forces connected clients to disconnect from the access point by sending forged deauth frames. This is often used to capture WPA/WPA2 handshakes when clients reconnect. Here for [more](/notes/deauthentication)

6. Deauthentication (aireplay-ng) → Similar to the previous attack but uses `aireplay-ng`. It is more controlled and precise, often targeting specific clients instead of flooding the entire network. Here for [more](/notes/deauthentication)

7. Authentication DoS → Sends a large number of fake authentication requests to the access point, attempting to exhaust its resources. This can prevent legitimate users from connecting.

I higly reccomend to use this attacks **on your own network** and using meanwhile [kismet](/notes/kismet) in order to have a feedback about what is actually going on!

(Older / less effective attacks)

8. Beacon Flood → Generates a large number of fake access points by broadcasting forged beacon frames. This clutters the Wi-Fi environment and can confuse users or network scanners.

9. WIDS / WIPS / WDS Confusion → Attempts to interfere with wireless intrusion detection/prevention systems by generating misleading or anomalous traffic patterns. In some cases, this creates a window where a real attack can be performed while the defense system is distracted.


10. Michael Shutdown Exploitation (TKIP) → Targets networks using the outdated TKIP protocol. By exploiting weaknesses in the Michael MIC algorithm, it can trigger a shutdown of communication as a defensive mechanism of the protocol itself. Unfortunately TKIP is deprecated,modern networks use AES (CCMP) or WPA3 and many devices disable TKIP by default  

#### Decloaking Attacks (Deauthentication vs Dictionary-Based)

![Air5]( /assets/images/air5.png )

Decloaking attacks are used to reveal **hidden Wi-Fi networks (hidden SSIDs)**.  
In these networks, the access point does not broadcast its name in beacon frames, making it appear as “<hidden>” during scans. However, the SSID is **not truly secret** beacause it is still transmitted during normal communication between clients and the access point > “hidden” does NOT mean “protected”.

In **Decloaking via Deauthentication (Option 8)**

1. A target network is selected (BSSID + channel)  
2. The attacker monitors traffic waiting for connected clients  
3. A deauthentication attack is launched  
4. Clients are forced to disconnect  
5. When reconnecting, clients send requests containing the SSID  
6. The attacker captures these frames and reveals the network name  

This method is **very fast and aggressive**, therefore noisy and easy detectable, but still the most effective method.


In **Decloaking via Dictionary (Option 9)**

1. The attacker captures probe/association traffic  
2. A wordlist (dictionary) of possible SSIDs is used  
3. The tool compares captured data with possible SSIDs  
4. If a match is found, the hidden SSID is revealed  

In some cases:
- It leverages patterns in captured frames  
- Or correlates client behavior with known SSIDs  

This method is **passive and stealthy**, therefore slower and less reliable and depends on dictionary quality.

---

Stay tuned for more...