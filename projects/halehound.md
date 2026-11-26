---
layout: page
title: HaleHound 🦈
permalink: /projects/HaleHound/
---

* Placeholder
{:toc}


**HaleHound** è un progetto open source di sicurezza offensiva hardware, sviluppato
attorno a schede ESP32 economiche, in particolare i modelli **CYD** (Cheap Yellow Display).
Il firmware raccoglie in un unico dispositivo più moduli di analisi e test su diversi
protocolli radio, con un'interfaccia a schermo touch.

Il punto di forza del progetto è la **copertura**: un solo dispositivo copre protocolli
che normalmente richiederebbero strumenti separati.

### Protocolli supportati

| Radio | Area di utilizzo |
|---|---|
| **WiFi** | Analisi del traffico, rilevamento di reti e client, test su punti di accesso |
| **Bluetooth (BLE)** | Scansione e analisi di dispositivi, test su servizi GATT |
| **2.4 GHz (NRF24)** | Analisi dei dispositivi a radiofrequenza come mouse e tastiere wireless |
| **SubGHz (CC1101)** | Ricezione e analisi di segnali sub-GHz |


### Uso responsabile e legale

Gli strumenti di questo tipo sono legali solo sui dispositivi e sulle reti per cui
si ha **autorizzazione esplicita**. Interferire con comunicazioni radio, intercettare
traffico o accedere a sistemi altrui è reato in molti paesi, Italia inclusa.
