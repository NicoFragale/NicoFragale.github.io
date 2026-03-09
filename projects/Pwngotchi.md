---
layout: page
title: Pwnagotchi 🧸​
permalink: /projects/Pwngotchi/
---

[Pwnagotchi](https://pwnagotchi.ai) is an open-source project designed to capture WPA/[WPA2](/notes/network-security/wpa2-4way-handshake/) authentication handshakes from nearby wireless networks and what makes this project particularly interesting is that if it does not detect a 4 way handshake, it sends deauthentication frames to the devices connected in order to obtain the messagges once they try to reconnect; after that it performs dictionary attack too.

![pwnagotchi](https://nicofragale.github.io/assets/images/got.jpg)

---

## Hardware Platform

The project is typically deployed on small and inexpensive hardware platforms, such as:

- **Raspberry Pi Zero W/2W**
- Battery, mine is [Pisugar](https://www.pisugar.com/products/pisugar-s-raspberry-pi-zero-battery)
- 2.13inch E-paper Display, mine is [this](https://www.amazon.it/dp/B07Q5PZMGT?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1)

The entire system is designed to be portable and energy-efficient, allowing it to run for extended periods of time.

The display shows a simple animated character that reflects the current state of the device, including:

- nearby networks
- captured handshakes
- interaction with other Pwnagotchi devices.
- battery and memory status 

---

## Learning Algorithm

One of the most distinctive aspects of Pwnagotchi is its use of **reinforcement learning**.

Instead of performing the same actions repeatedly, the device tries to learn which strategies are most effective in its environment.

For example, it can learn:

- which channels are most active
- which networks frequently generate authentication events
- how to optimize its observation behavior over time

The learning model adjusts the device's behavior in order to maximize the number of handshakes captured.

---

## Once catched Handshakes

You can connect to the device via SSH and transfer the capture files to your computer that can be analyzed using tools from the [Aircrack-ng suite](/notes/network-security/Aircrack-ng/).
You can connect to the Web UI too if you want change some functionalities and UI on the waveshare.

---

## What I Learned

This project was also my first time working with a **Raspberry Pi**, which helped me better understand how this type of hardware works,
I also learned how to install and configure firmware on the system, which was an important step in getting the device ready for use.

One of the most interesting parts of the project was upgrading the device to the **“g0d” version** (as referred to by the project's creator). This enhanced version introduces additional features and improvements, and the project can be found here:  
[Project Pwnag0dchi](https://github.com/SHUR1K-N/Project-Pwnag0dchi).

![pwng0dchi](https://nicofragale.github.io/assets/images/god.jpg)
