---
layout: page
title: Pwnagotchi 🧸
permalink: /projects/Pwngotchi/
---


* Placeholder
{:toc}

[Pwnagotchi](https://pwnagotchi.ai) è un progetto open-source progettato per catturare gli handshake di autenticazione WPA/[WPA2](/notes/network-security/wpa2-4way-handshake/) dalle reti wireless circostanti. Ciò che rende questo progetto particolarmente interessante è che, qualora non rilevi un *4-way handshake*, invia frame di deautenticazione ai dispositivi connessi per intercettare i messaggi nel momento in cui tentano di riconnettersi; successivamente, esegue anche attacchi a dizionario.

<img src="https://nicofragale.github.io/assets/images/got.jpg" alt="pwnagotchi" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" />


### **Piattaforma Hardware**

Il progetto viene solitamente implementato su piattaforme hardware piccole ed economiche, come:

- **Raspberry Pi Zero W/2W**
- Batteria, la mia è una [PiSugar](https://www.pisugar.com/products/pisugar-s-raspberry-pi-zero-battery)
- Display e-Paper da 2.13 pollici, il mio è [questo](https://www.amazon.it/dp/B07Q5PZMGT?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1)

L'intero sistema è progettato per essere portatile ed efficiente dal punto di vista energetico, consentendogli di funzionare per lunghi periodi di tempo.

Il display mostra un semplice personaggio animato che riflette lo stato attuale del dispositivo, includendo:

- reti nelle vicinanze
- handshake catturati
- interazione con altri dispositivi Pwnagotchi
- stato della batteria e della memoria


### **Algoritmo di Apprendimento**

Uno degli aspetti più distintivi di Pwnagotchi è l'utilizzo del **reinforcement learning** (apprendimento per rinforzo).

Invece di ripetere sempre le stesse azioni, il dispositivo cerca di apprendere quali strategie siano più efficaci nell'ambiente in cui si trova.

Ad esempio, può imparare:

- quali canali sono più attivi
- quali reti generano più frequentemente eventi di autenticazione
- come ottimizzare nel tempo il proprio comportamento di osservazione

Il modello di apprendimento adatta il comportamento del dispositivo con l'obiettivo di massimizzare il numero di handshake catturati.


### **Una volta catturati gli Handshake**

È possibile connettersi al dispositivo tramite SSH e trasferire i file di cattura sul proprio computer per analizzarli utilizzando gli strumenti della [suite Aircrack-ng](/notes/network-security/Aircrack-ng/).  
È inoltre possibile accedere alla Web UI per modificare alcune funzionalità e l'interfaccia grafica visualizzata sul display Waveshare.


### **Cosa ho imparato**

Questo progetto ha rappresentato anche la mia prima esperienza con un **Raspberry Pi**, aiutandomi a comprendere meglio il funzionamento di questo tipo di hardware; ho inoltre imparato a installare e configurare il firmware sul sistema, un passaggio fondamentale per rendere il dispositivo operativo.

Una delle parti più interessanti del progetto è stata l'aggiornamento del dispositivo alla **versione “g0d”** (così chiamata dal creatore del progetto). Questa versione potenziata introduce funzionalità aggiuntive e diversi miglioramenti, e il progetto è disponibile qui:  
[Project Pwnag0dchi](https://github.com/SHUR1K-N/Project-Pwnag0dchi).

<img src="https://nicofragale.github.io/assets/images/god.jpg" alt="pwng0dchi" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" />