---
layout: page
title: Software Defined Radio ✈️
permalink: /projects/Software_Defined_Radio/
---

### **Hardware utilizzato**
- RTL-SDR v3
- Antenna a 1090 MHz (antenna a dipolo)

### **Tracciamento degli Aerei con RTL-SDR**

Utilizzando un ricevitore RTL-SDR è possibile monitorare passivamente le trasmissioni degli aeromobili sulla banda di frequenza a **1090 MHz**, poiché gli aerei commerciali inviano periodicamente informazioni telemetriche tramite il protocollo **ADS-B (Automatic Dependent Surveillance–Broadcast)**, i cui segnali sono trasmessi in chiaro (non cifrati) e in broadcast affinché i sistemi di controllo del traffico aereo e gli altri velivoli nelle vicinanze possano ricevere informazioni sulla posizione e sullo stato del volo.

Nel mio setup ho utilizzato un dongle RTL-SDR insieme al tool `dump1090`, che decodifica i frame grezzi Mode-S / ADS-B ricevuti dal dispositivo SDR.

<img src="https://nicofragale.github.io/assets/images/dump1090.png" alt="dump1090" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" />

Il software analizza i frame ricevuti e mostra informazioni come:

- **Hex** – identificativo univoco di uno specifico aeromobile assegnato dall'International Civil Aviation Organization (ICAO)
- **Flight** – nominativo di chiamata (*callsign*) del volo  
- **Alt** – altitudine (espressa in piedi)  
- **Spd** – velocità al suolo (*ground speed*)  
- **Hdg** – la **direzione del movimento dell'aereo** (*heading*) rispetto al nord geografico, espressa in gradi (0–360°). Ad esempio, una rotta di **90°** indica che l'aereo si sta dirigendo verso est, mentre **180°** indica sud.
- **Lat / Long** – posizione GPS trasmessa dall'aeromobile  
- **RSSI** – potenza del segnale ricevuto  
- **Msgs** – numero di messaggi decodificati

Ogni aeromobile trasmette periodicamente questi pacchetti, tipicamente **due volte al secondo**, consentendo ai ricevitori di aggiornarne costantemente la posizione.

Per visualizzare su mappa le posizioni decodificate, ho confrontato i dati con aggregatori pubblici come **OpenSky Network**, che raccoglie telemetria ADS-B da migliaia di ricevitori in tutto il mondo; nell'esempio seguente si possono osservare diversi aerei in volo intorno a Roma.

<img src="https://nicofragale.github.io/assets/images/opensky.png" alt="opensky" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" />

### **Vulnerabilità**

Diversi studi accademici hanno dimostrato che il protocollo ADS-B è privo di meccanismi di autenticazione e cifratura, rendendolo teoricamente vulnerabile ad attacchi di *message injection* e *spoofing* in grado di generare "aerei fantasma" (*ghost aircraft*) mediante specifici trasmettitori SDR.  

Approfondimenti sulla sicurezza ADS-B e sugli attacchi di iniezione dei messaggi:

- **Martin Strohmeier, Vincent Lenders, Ivan Martinovic**  
  *On the Security of the ADS-B Protocol*  
  [link](https://ieeexplore.ieee.org/document/6940209)

- **Eren Kocaağa, M. Oguzhan Külekci**  
  *Security Analysis of ADS-B*  
  [link](https://ieeexplore.ieee.org/document/7960506)

- **Matthias Schäfer**  
  *Ghost Planes: Injecting False Aircraft into Air Traffic Control Systems*  
  [link](https://www.researchgate.net/figure/Attack-scenario-an-attacker-injects-ghost-aircraft-to-mislead-the-instruments-of_fig1_279923668)

- **Mohsen Riahi Manesh, Naima Kaabouch**  
  *Aviation Cybersecurity: ADS-B Vulnerabilities and Defenses*  
  [link](https://www.sciencedirect.com/science/article/abs/pii/S1874548217300446)