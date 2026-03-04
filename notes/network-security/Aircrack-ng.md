---
layout: page
title: Aircrack-ng suite
permalink: /notes/network-security/Aircrack-ng/
---

# Wireless Interface Configuration

Before performing any wireless analysis or packet capture, it is necessary to correctly configure the wireless interface. These commands allow modifying regulatory settings, transmission parameters and interface modes.

## Set Regulatory Domain


1. **sudo iw reg set US**
Sets the regulatory domain for the wireless interface.
This determines which channels and transmission powers are allowed by the system according to regional regulations.

2. **sudo ifconfig wlan0 down** -> **sudo iwconfig wlan0 txpower 30** -> **sudo ifconfig wlan0 up**
In order to modify interface settings you need for first disable the interface and then re-enables

3. **iwlist wlan0 scan \| grep 'Cell\|Quality\|ESSID\|IEEE'**
Performs a scan of nearby WiFi networks and filters relevant information such as:
	•	detected access points
	•	signal quality
	•	network name (SSID)
	•	protocol type

4. **sudo ifconfig wlan0 down** -> **sudo iwconfig wlan0 channel 64** -> **sudo ifconfig wlan0 up**
Manually sets the wireless interface to operate on a specific channel.

5. **sudo ifconfig wlan0 down** -> **sudo iwconfig wlan0 freq "5.52G"** -> **sudo ifconfig wlan0 up**
Configures the interface to operate on a specific frequency band.

6. **sudo ifconfig wlan0 down** -> **sudo iwconfig wlan0 mode managed** -> **sudo ifconfig wlan0 up**
Sets the interface to managed mode, which is the standard operating mode used to connect to wireless networks.

7. **sudo ifconfig wlan0 down** -> **sudo iwconfig wlan0 monitor control** -> **sudo ifconfig wlan0 up**
Places the interface into monitor mode, allowing the capture of raw IEEE 802.11 frames such as:
	•	management frames
	•	control frames
	•	data frames

    Monitor mode is essential for wireless traffic analysis and packet capture.

8. **sudo iwconfig wlan0 mode ad-hoc** -> **sudo iwconfig wlan0 essid HTB-Mesh**
Configures the interface to operate in ad-hoc mode, allowing direct communication between devices without an access point.

9. **sudo iw dev wlan0 set type mesh**
Configures the interface to operate in mesh networking mode, enabling decentralized wireless communication between multiple nodes.

## Aircrack-ng

For the official site check [here](https://www.aircrack-ng.org/doku.php?id=Main)!

1. **sudo airmon-ng start wlan0**

    You can use this command to create a monitor interface  (typically wlan0mon) which can capture raw wireless frames. Eventually you can specify a channel: *sudo airmon-ng start wlan0 4*.

2. **sudo airodump-ng wlan0mon**
Passively scans nearby wireless networks and displays:
	•	BSSID
	•	channel
	•	signal strength
	•	encryption type
	•	connected clients

    You can specify a channel (-c 4), in order to focus on a particular access point.
    You can spcify a frequency band (--band a/b/g) to show only 5 GHz networks, 2.4 Ghz or both.

3. **sudo airodump-ng wlan0mon -w file**
Captures wireless traffic and saves it into capture files for later analysis.

4. **airgraph-ng -i file.csv -g CAPR -o file_CAPR.png**
Generates a graph showing relationships between clients and access points.

5. **airgraph-ng -i file.csv -g CPG -o file_CPG.png**
Generates a graph showing common probe requests from wireless devices.

6. **sudo aireplay-ng --test wlan0mon**
Verifies whether the wireless adapter supports packet injection, which is required for certain wireless testing techniques.

7. **aireplay-ng -0 0 -a MAC_AP -c MAC_Client wlan0mon**
This command uses aireplay-ng to transmit deauthentication frames to a wireless client and because these frames are not authenticated in legacy WiFi configurations, they can be forged and transmitted by an external device. *- 0* specifies the attack mode in this case deauthentication management frames (check for other attacks in the official site) and *0* send deauthentication frames continuously.


8. **aircrack-ng file.pcap -w /opt/wordlist.txt** 
Performs an offline dictionary attack against captured WPA/WPA2 authentication handshakes using a wordlist.