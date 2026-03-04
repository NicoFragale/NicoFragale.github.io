---
layout: page
title: WPA3
permalink: /notes/network-security/wpa3/
---

## Prerequisites

- **Diffie-Hellman Key Exchange**  

    Essential to understand how SAE establishes a secure session key without transmitting the password.

- **Discrete Logarithm Problem**  

  The security of Diffie-Hellman based protocols relies on the computational hardness of solving the discrete logarithm problem that prevents an attacker from deriving the shared secret even if the public parameters exchanged during the protocol are observed.

- **Forward Secrecy**  

  This means that even if the WiFi password is compromised in the future, previously captured traffic cannot be decrypted, significantly improving security compared to WPA2-PSK.

- **WPA2 4-Way Handshake**  

  WPA3 still relies on the 4-Way Handshake for key installation and confirmation. 
  Follow the link [here](/notes/network-security/wpa2-4way-handshake/) if you missed it!

--- 

## Technical Mechanism

WPA3-Personal replaces the WPA2 pre-shared key authentication model with **Simultaneous Authentication of Equals (SAE)**, a password-authenticated key exchange protocol derived from the Dragonfly handshake.

In WPA2-PSK the password is directly used to derive the **Pairwise Master Key (PMK)** through a deterministic function (PBKDF2). This means that the same password always produces the same PMK, which makes it possible to test password guesses offline.

WPA3 changes this model completely, instead of deriving a static key from the password, the password is used to generate a **Password Element (PWE)** that acts as the basis for an interactive Diffie–Hellman style key exchange. The result is that the final session key is derived dynamically through a negotiation between the client and the access point.

The two entities involved in the protocol are:

- **STA (Station)** – the client device
- **AP (Access Point)** – the wireless access point

Both devices share the same password, but they never directly transmit it nor any value that could be used to verify password guesses offline.


### 1. Password Element (PWE) Derivation

The first step of the SAE protocol is the derivation of the **Password Element (PWE)**.

The PWE is a point on an elliptic curve that is deterministically derived from:

- the shared password
- the MAC address of the station
- the MAC address of the access point

Including the MAC addresses ensures that the resulting value is bound to the specific pair of devices involved in the authentication. This prevents attackers from reusing protocol data across different devices or sessions.

Once derived, the PWE becomes the base element used in the Diffie–Hellman exchange that follows.


### 2. SAE Loop (Hunting-and-Pecking)

The original SAE method derives the Password Element through an iterative process commonly known as **hunting-and-pecking**.

In this approach, the password and device identifiers are repeatedly processed through a hash function in order to generate candidate values that are then tested to determine whether they correspond to a valid point on the elliptic curve.

Conceptually, the process can be described as:

password + MAC_AP + MAC_STA -> hash function -> candidate value -> check if valid elliptic curve point -> if invalid -> repeat with new counter

This process continues until you found a valid point on the curve and once it is identified, it becomes the **Password Element (PWE)** used for the remainder of the authentication protocol.

Because the process depends on finding a valid point, the number of iterations required may vary depending on the inputs. Nevertheless, the final result is always the same deterministic element for a given password and pair of devices.


### 2. SAE Constant-Time (Hash-to-Element)

To provide a more deterministic derivation method, newer implementations support a **hash-to-element** construction.

Instead of iteratively searching for a valid curve point, the password and device identifiers are processed through a specialized cryptographic function that maps the input directly onto a valid point of the elliptic curve.

Conceptually:

password + MAC_AP + MAC_STA -> hash-to-element function -> Password Element (PWE)

This method produces the same type of cryptographic element as the hunting-and-pecking approach, but without requiring repeated attempts to find a valid point.

The resulting Password Element is then used exactly in the same way during the SAE authentication exchange.


### 3. SAE Authentication Exchange (Dragonfly Handshake)

Once the Password Element has been derived, the station and the access point begin the **SAE authentication exchange**, which is composed of two main phases:

1. Commit phase  
2. Confirm phase  

#### 3.1 Commit Phase

During the commit phase, each device generates:

- a **random private scalar**
- a corresponding **public element** derived from the PWE and the chosen scalar

These public elementes are exchanged between the STA and the AP to generate a **shared secret** performing elliptic curve operations used to derive the **Pairwise Master Key (PMK)** after Confirm phase.


#### 3.2 Confirm Phase

In this phase, both devices exchange confirmation messages that contain authentication tokens derived from the shared secret and the previously exchanged parameters.

The purpose of these messages is to ensure that both parties:

- derived the same secret
- are communicating with the intended peer (no MITM)
- possess knowledge of the shared password

If the confirmation values match, authentication succeeds.

### 4. Key Installation Phase

Once the PMK has been established through the SAE exchange, the protocol proceeds with the **4-Way Handshake**, which is the same key installation mechanism used in WPA2.

Therefore, the main difference between WPA2 and WPA3 lies in the **authentication phase that generates the PMK**. The subsequent key installation and encryption mechanisms remain largely unchanged.

---

## Dragonblood Attacks

In 2019 a group of researchers disclosed a set of vulnerabilities collectively referred to as **Dragonblood**, targeting weaknesses in early implementations of WPA3 and its SAE (Simultaneous Authentication of Equals) authentication protocol. 

Follow this [link](https://wpa3.mathyvanhoef.com) to deeply understand!

Rather than breaking the underlying cryptographic primitives, these attacks exploit side-channel leakage, downgrade scenarios and implementation flaws that may occur in real-world deployments of WPA3 networks.

The attacks demonstrated that certain implementations of SAE could leak information during the password element derivation process, especially when using the original hunting-and-pecking method. In addition, networks configured in **WPA2/WPA3 transition mode** were shown to be susceptible to downgrade attacks, allowing an attacker to force a client to connect using WPA2 instead of WPA3.

A detailed explanation of the Dragonblood research can be found in this presentation:  
[Dragonblood – WPA3 vulnerabilities explained](https://www.youtube.com/watch?v=msTugNs8bnM)
