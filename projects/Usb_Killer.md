---
layout: page
title: USB Killer 🗡️​
permalink: /projects/Usb_Killer/
---

Something not difficult I have made during these days is an USB Killer that did not kill, but activated windows defender that detected a threat in my computer, I consider it a win anyway.

For this project you can use a RP2040 (you can buy it on AliExpress), or an official Raspberry Pi PICO, or an official Rubber Ducky by Hack5.

## RP2040

The **RP2040** is a microcontroller very versatile for embedded systems and hardware projects designed to control hardware and interact with electronic components such as sensors, LEDs, motors, and displays programmable in **C/C++ or MicroPython**.

![rp2040](https://nicofragale.github.io/assets/images/rp2040.png) 


One of the most interesting features of the RP2040 is its **Programmable I/O (PIO)** subsystem, which allows developers to implement custom hardware interfaces directly in software, but this is not in mine personal interests...

## How USB Killer

Actually I did not do a lot, because I just setup the RP2040 following this [link](https://github.com/dbisu/pico-ducky) of Hack5 e uploaded the payload founde [here](https://github.com/hak5/usbrubberducky-payloads/tree/master/payloads/library/prank/-RD-ADV-RickRoll).

Once everything was ready, I plugged the USB device into my Windows PC to test the payload.  
The script executed almost correctly, but the final step failed to run as expected.

To verify whether it was just a temporary issue, I disconnected the device and plugged it in again. However, during the second attempt Windows Defender immediately detected the activity and blocked the USB payload.

## Final Thoughts

I am aware that this was nothing particularly impressive by the moment it was mostly a simple setup, uploading the payload, and testing it. 

However, I still wanted to try it because these kinds of techniques are often mentioned in cybersecurity courses and widely portrayed in movies, so I was curious to see **how they actually work in practice** and to understand firsthand whether something like this is difficult or surprisingly simple to implement.

