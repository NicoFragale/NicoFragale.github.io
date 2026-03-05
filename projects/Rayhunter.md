---
layout: page
title: Rayhunter
permalink: /projects/Rayhunter/
---

## Rayhunter

[Rayhunter](https://github.com/EFForg/rayhunter) is a project designed to detect **IMSI catchers**, also known as **cell-site simulators** or **Stingrays**.

I came across this project while studying **mobile network infrastructures** during my Network Security course. In particular, the topic was related to the moment when a mobile device connects to a new cellular base station in order to authenticate itself and gain access to the services provided by the mobile operator, such as voice calls, SMS and mobile data connectivity.

---

## Hardware Platform

The project was originally designed to run on a **cheap mobile hotspot device called the Orbic RC400L** and works only in the United States.

Thanks to community efforts, the same project can also be deployed using the **TP-Link M7350** in the rest of the world.

This device can usually be found at a relatively low price on platforms such as Amazon, and often even cheaper on second-hand marketplaces like Vinted or eBay. When buying used hardware, it is important to check the **exact hardware revision**, since not all versions are compatible with the firmware.

The official guide describing the installation process for the TP-Link M7350 and working versions can be found [here](https://efforg.github.io/rayhunter/tplink-m7350.html).

Installing the firmware is relatively straightforward and the official documentation on GitHub provides a clear step-by-step procedure, and there are also several video tutorials available online.

---

## Why Does This Project Exist?

To understand the motivation behind Rayhunter, it is necessary to briefly look at how **mobile devices authenticate to cellular networks**.

When a smartphone powers on or moves into the coverage area of a new base station connects to a new cell for the first time, it must first establish communication with the network. During this process the device needs to identify itself so that the mobile operator can:

- verify the subscriber
- authorize network access
- associate the device with a specific account
- enable services such as calls, SMS and mobile data

The identifier used for this purpose, sent from the Station to the Base Station is the **IMSI (International Mobile Subscriber Identity)**.

---

## What is the IMSI?

The IMSI is a unique identifier stored in the **SIM card** that identifies the subscriber within the mobile network.

It is composed of three main parts:

- **MCC (Mobile Country Code)** – identifies the country
- **MNC (Mobile Network Code)** – identifies the mobile operator
- **MSIN (Mobile Subscriber Identification Number)** – uniquely identifies the subscriber

Together, these values uniquely identify a user in the global cellular network.

---

## The Problem: IMSI Catchers

The weakness arises from the fact that a mobile device **cannot initially verify whether a base station is legitimate** because only the station autheticates itself.

An attacker can exploit this behavior by deploying a fake base station, commonly referred to as an **IMSI catcher**.

These devices simulate a legitimate cellular tower and trick nearby phones into connecting to them. Once connected, the attacker can:

- force devices to reveal their IMSI
- track subscriber identities
- monitor device presence in a geographic area
- potentially downgrade network security

Because mobile devices automatically connect to the strongest available signal, they may unknowingly attach to these rogue base stations.

---

## Rayhunter's Role

Rayhunter was created to help **detect suspicious cellular behavior** that may indicate the presence of an IMSI catcher acting as a **defensive monitoring tool**.

This is the how It looks once installed:

![rayhunter](https://nicofragale.github.io/assets/images/rayhunter.jpg)

If the bar is green no Fake Base Station are detected. Until now I did not see a red bar fortunately.

---

## Defensive Considerations

### Temporary Subscriber Identifiers

Modern cellular networks attempt to reduce IMSI exposure by using temporary identifiers such as **TMSI (Temporary Mobile Subscriber Identity)** that changes frequently.

Instead of transmitting the permanent IMSI every time the device connects to the network, the operator assigns a temporary identifier that changes periodically, limiting the possibility of attackers to track users over time.


### Mutual Authentication in Modern Networks

Newer cellular technologies such as **4G (LTE)** and **5G** introduce stronger authentication mechanisms between the device and the network and **mutual authentication**, and the second one introduces **SUPI** and **SUCI** which are the encrypted version of **IMSI** and **TMSI**.

In these systems:

- the device authenticates to the network
- the network must also prove its legitimacy to the device

This mutual authentication significantly reduces the effectiveness of rogue base stations compared to earlier generations such as 2G.


### Avoiding Legacy Networks

Many IMSI catcher attacks rely on forcing devices to **downgrade to older cellular technologies**, especially **2G** where security protections are weaker, this is the mosto common type of attack by the moment the devices have priority to keep the connectivity in any situation.

---

## How Modern IMSI Catchers Operate


1. The attacker simulates a **4G or 3G base station**.
2. Nearby mobile devices attempt to connect to this cell.
3. The rogue base station signals that **LTE service is unavailable**.
4. The mobile device automatically **downgrades to a legacy network**, typically 2G.
5. The attacker then activates a **fake GSM base station** in order to catch subscriber identifiers.

Mobile devices select the serving cell based on several radio parameters, including:

- **Signal strength**
- **Radio priority**
- **Broadcast configuration parameters**

As a result, devices may automatically attach to the malicious infrastructure.

---

## Why IMSI Catchers Are Difficult to Detect

IMSI catchers are designed to behave similarly to legitimate cellular base stations, which makes them difficult to detect.

However, they often exhibit unusual characteristics such as:

- **missing or very few neighboring cells**
- **abnormal radio parameters**
- **unusually high signal strength**
- **frequent identity requests from the network**

---

## Tracking Captured IMSIs

Tracking devices using captured IMSIs does not necessarily involve intercepting communications.  
In most cases, the objective is simply to determine whether a specific device is present in a given area and, if possible, estimate its location.
Once a target device has been identified, tracking can be performed by measuring the **received signal strength (RSSI)**.
By moving the antenna or receiver — for example from a vehicle or drone — it is possible to observe how the signal strength changes. 

In case of multiple receivers or antennas, it is possible to estimate the location of a device through **triangulation** measuring the RSSI od the target device.


Even without triangulation, IMSI catchers can still perform **temporal tracking**. By recording when and where an IMSI is observed, it becomes possible to reconstruct an approximate movement path of the device over time.

---

## Limitations of IMSI-Based Tracking

Although IMSI catchers can provide useful location information, this method has several limitations:

- the accuracy is generally **lower than GPS-based positioning**
- signal measurements can be unreliable in **dense urban environments**
- buildings and reflections can distort radio measurements

For these reasons, IMSI-based tracking is often combined with other investigative or analytical techniques.