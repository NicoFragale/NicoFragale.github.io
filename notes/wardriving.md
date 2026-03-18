---
layout: page
title: Wardriving 🚗
permalink: /notes/wardriving/
---

**Wardriving** is the activity of detecting and recording Wi-Fi networks while physically moving through an area, typically by car, bicycle, or on foot.  
To perform wardriving, people usually use a **laptop or portable device equipped with a Wi-Fi adapter** combined with a **GPS receiver** in order to record the geographic coordinates of each detected network.

The main goal of wardriving is to **identify wireless access points (APs) and log their location**, effectively creating a map of the Wi-Fi networks available in a given area.  
The collected information can later be shared or uploaded to online databases that map wireless networks.

A useful analogy is to think of wardriving as **mapping house numbers in a neighborhood**: instead of listing buildings and mailboxes, the wardriver records the position of wireless access points broadcasting their signals.

---

### Legitimate Use and Misuse

Wardriving itself does not necessarily involve illegal behavior. In its basic form, it simply consists of **detecting wireless networks and collecting technical information about them**.

However, some individuals take advantage of **weak or poorly configured security settings** to access the network they discover. In these situations the goals may include:

- accessing files available on the local network
- using the Internet connection without authorization
- exploiting available bandwidth for free

When wardriving is used for these purposes, it falls under the broader category of **unauthorized use of wireless networks**, sometimes referred to as *wireless theft* or *thiefing*.

---

### Warchalking

This is the technique to identify wireless networks and list their characteristics in an easy way by **drawing symbols in public spaces**:

- whether the network is open or protected
- whether Internet access is available
- what type of security is used

---

### Warkitting

A more advanced and potentially dangerous concept is **warkitting**, which combines wardriving with firmware-level attacks.

In a warkitting attack, an attacker **replaces or modifies the firmware of a targeted wireless router**, gaining control over the device. Once compromised, the attacker may be able to:

- monitor all traffic passing through the router
- manipulate communications
- alter content downloaded by users

The concept of warkitting was described in 2006 by researchers **Tsow, Jakobsson, Yang, and Wetzel** in this [paper](https://markus-jakobsson.com/papers/jakobsson-jdfp06-warkit.pdf).

---

### Passive Wardriving

The most common form of wardriving is **passive wardriving**, which simply listens for signals transmitted by wireless access points.

Tools such as:

- **Kismet**
- **KisMAC**

capture the **beacon frames** periodically broadcast by Wi-Fi networks and record information such as the SSID, BSSID, and signal strength.

In this scenario the device **does not interact with the network**, it only listens to radio transmissions that are publicly broadcast.  

---

### Active Wardriving

Some tools perform a more active type of scanning. For example, **NetStumbler** sends **probe requests** to nearby wireless networks.

Access points automatically respond to these requests, providing information about the network. During this process the scanning device may become **temporarily associated with the network**, even though no actual data traffic is exchanged.

For this reason, **active wardriving raises more legal and ethical questions**, since it involves direct interaction with the network.

Some wardrivers reduce the likelihood of their device being registered on the network by configuring a **static IP address**, avoiding the automatic assignment of an address through DHCP.

---

You can easely found how to wardrive on internet!

