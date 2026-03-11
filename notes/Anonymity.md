---
layout: page
title: Anonymity 👻​
permalink: /notes/Anonymity/
---


Every device connected to a network must identify itself in order to communicate with other systems via the **IP address** and this means that every time we access a website or service, some form of **network identity** is exposed.


### 1. Local IP Addresses (Private Networks)
Inside a home or office network, devices are connected to a **local network (LAN)** managed by a router that assigns each device a **private IP address** using the **DHCP (Dynamic Host Configuration Protocol)**.

Typical private address ranges is 192.168.0.0 – 192.168.255.255 and are only valid **inside the local network** and cannot be reached from the Internet.


### 2. From Local Network to the Internet (NAT)
NAT allows multiple devices inside a network to share a single public address, therefore When a device sends a packet to the Internet:
1. The packet leaves the device with its private IP
2. The router replaces it with the public IP
3. The packet is sent to the Internet

The router keeps track of these translations using a NAT table.


### 3. Public IP Address and Internet Routing
Public IP address is assigned by your Internet Service Provider (ISP) (TIM, Vodafone ...) when your router connects to the network and is the address that websites and servers see when you connect.

You can discover your public IP using: curl ipinfo.io

{
  "ip": "93.45.210.17",
  "city": "Rome",
  "region": "Lazio",
  "country": "IT",
  "org": "AS3269 Telecom Italia"
}


### 4. IP Can Reveal Information
Even though an IP address does not directly reveal a person’s identity, it can expose several pieces of information.

Examples include:
- approximate geographic location
- Internet provider
- Autonomous System (ASN)
- country and region
- type of network (residential, hosting provider, mobile)

Even if the IP address changes, users can still be tracked through other mechanisms such as Browser Fingerprinting ([link](https://amiunique.org))


### 5. Defensive Mechanisms
Several mechanisms exist to improve privacy and reduce traceability:
- Web Browser (i.e Brave)
- OS (i.e Tails or Linux Kodachi)
- (Virtual Private Network)
- Tor Network
- DNS over HTTPS
- DNS over TLS

---

## Browser 

The browser I feel safe with is **Brave** by the moment it focuses strongly on **privacy and security**.

Brave includes:

- **Built-in ad and tracker blocking** – Brave automatically blocks advertising networks and tracking scripts that collect data about your browsing habits.
- **Fingerprinting protection** – it attempts to prevent websites from uniquely identifying your device using browser and hardware characteristics.
- **HTTPS upgrades** – whenever possible, Brave automatically forces websites to use the secure HTTPS version instead of HTTP.
- **Third-party cookie blocking** – reduces cross-site tracking from advertising networks.

All these features can be easely managed from the settings and checked everytime via **brave shields**.

This browser also integrates **Tor private windows**, which route your traffic through the Tor network to increase anonymity when browsing sensitive content. However, it is important to remember that this is **not a full replacement for the Tor Browser**, but rather a convenient way to add an extra layer of privacy.

Unlike many other browsers that claim to protect users from tracking, Brave actually blocks most tracking mechanisms in practice.

For example, I monitor my website using **Google Analytics** and even when users browse with browsers that advertise privacy features, they are often still detected and counted by Google Analytics. Brave, on the other hand, blocks it and does not appear in analytics dashboards at all.

[About Brave](https://www.youtube.com/watch?v=4mgMZFHv1uM)

---

## Tails OS

**Tails (The Amnesic Incognito Live System)** is a privacy-focused operating system designed to preserve anonymity and leave no traces on the computer you use.

Unlike traditional operating systems that are installed permanently on a disk, Tails is a **live operating system** that runs directly from a **USB stick or DVD**. This means you can boot almost any computer with Tails without modifying the existing system.

### Amnesic system

The word **amnesic** means that the system does not keep memory of your activity after shutdown.

By default:

- no browsing history is saved  
- no files remain on the system  
- no logs persist after shutdown  

Everything runs in **RAM**, and when the computer is turned off the memory is wiped.

This makes Tails particularly useful when working on **shared computers or untrusted machines**, unfortunately we know the RAM could contains some traces anyway.

### Built-in privacy tools

Tails comes with several tools already configured for privacy and security:

- **Tor Browser** for anonymous web browsing  
- **KeePassXC** for password management  
- **Electrum** for Bitcoin wallets  
- **OnionShare** for anonymous file sharing  
- **GnuPG** tools for encryption and secure communication  

These tools are preconfigured so users do not need to manually set up privacy protections.

### Persistent storage (optional)

Although Tails is designed to forget everything, it is possible to create an **encrypted persistent storage** on the USB device.

This allows you to save:

- files
- encryption keys
- configuration settings
- passwords

[Tails by one of my favourites](https://www.youtube.com/watch?v=IOTCGUQ51xo)

---

A lot lot lot more to talk about obv! Stay Tuned!