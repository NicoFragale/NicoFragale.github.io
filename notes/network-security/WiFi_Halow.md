---
layout: page
title: WiFi Halow ⛓️‍💥
permalink: /notes/WiFi_Halow/
---

* Placeholder
{:toc}

Il **Wi-Fi HaLow** è il nome commerciale, assegnato dalla Wi-Fi Alliance, dello standard **IEEE 802.11ah**. È una variante del Wi-Fi progettata per l'**Internet of Things (IoT)**: opera nelle bande **sub-1 GHz** invece che a 2.4/5 GHz, per ottenere **lungo raggio** e **basso consumo energetico**.

### **Caratteristiche principali**

* **Frequenze:** bande ISM sotto il GHz, che variano per regione (circa 863–868 MHz in Europa, 902–928 MHz negli USA).
* **Copertura:** fino a circa 1 km in condizioni favorevoli, con buona penetrazione attraverso muri e ostacoli.
* **Canali:** larghezza di 1, 2, 4, 8 e 16 MHz, con velocità da poche centinaia di kbps a decine di Mbps.
* **Scalabilità:** un singolo access point può gestire migliaia di dispositivi (fino a 8191 stazioni).
* **Risparmio energetico:** meccanismi come il *Target Wake Time (TWT)* permettono ai sensori di restare in sleep a lungo.
* **Topologia:** infrastruttura classica (AP + client) con supporto a *relay* per estendere la copertura.

### **Vantaggi e svantaggi**

| Vantaggi | Svantaggi |
|----------|-----------|
| Portata molto superiore al Wi-Fi tradizionale | Throughput limitato rispetto a Wi-Fi 5/6 |
| Ottima penetrazione degli ostacoli | Hardware ancora poco diffuso e più costoso |
| Consumi ridotti, adatto a dispositivi a batteria | Spettro sub-1 GHz regolamentato in modo diverso per regione |
| Gestisce un gran numero di dispositivi per AP | Banda condivisa con altre tecnologie ISM (es. LoRa) |
| Basato su IP, quindi integrabile con reti Wi-Fi esistenti | Duty cycle limitato in alcune regioni (es. Europa) |

### **Aspetto sicurezza**

La certificazione Wi-Fi HaLow richiede l'uso di **WPA3** (autenticazione **SAE**) e dei **Protected Management Frames**. Questo rende HaLow meno esposto agli attacchi di deauthentication e al cracking offline della PSK, che sono invece classici sul WPA2. Il rovescio della medaglia è che molti dispositivi IoT hanno risorse limitate e firmware poco aggiornati, quindi la superficie d'attacco si sposta spesso sull'implementazione, non sul protocollo.

### **Confronto con altre tecnologie IoT**

* **Wi-Fi tradizionale (2.4/5 GHz):** più veloce, ma con portata ridotta e consumi più alti.
* **LoRa/LoRaWAN:** portata ancora maggiore e consumi minimi, ma velocità molto bassa e niente IP nativo.
* **Bluetooth Low Energy:** consumi bassi, ma portata breve.
* **Zigbee/Thread:** reti mesh a basso consumo, con throughput limitato.

HaLow si colloca come compromesso tra **portata, velocità e compatibilità IP**.
