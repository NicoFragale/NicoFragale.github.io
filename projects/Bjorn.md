---
layout: page
title: Bjorn ☃️
permalink: /projects/Bjorn/
---

Questo è il mio **Bjorn**!

<img src="https://nicofragale.github.io/assets/images/bjorn.jpg" alt="Bjorn" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" />

Sviluppato da [infinition](https://github.com/infinition/Bjorn), **Bjorn** esegue *network scanning*, *vulnerability assessment* e *offensive security*, è progettato per girare su **Raspberry Pi Zero W / Zero 2 W** abbinato a un display **Waveshare e-Paper (e-Ink) da 2.13 pollici**.

### Architettura e componenti principali

1. **Orchestrator Autonomo**
   Una volta collegato alla rete, Bjorn decide quali azioni intraprendere in base ai target rilevati, passando sequenzialmente dalla scoperta degli host fino ai test sui singoli servizi, senza richiedere intervento manuale.

2. **Network Discovery e Port Scanning**
   Nella prima fase, Bjorn sfrutta **Nmap** per scansionare la subnet, identificare gli host attivi (*live hosts*) e mappare le porte aperte insieme ai relativi servizi in esecuzione.

3. **Brute-Force e Auditing dei Servizi**
   Individuati i servizi esposti, l'orchestrator attiva specifici moduli offensivi per testare la robustezza delle autenticazioni tramite attacchi a dizionario su protocolli diffusi in ambito aziendale e domestico, tra cui:
   - **SSH** e **Telnet**
   - **SMB** (condivisioni di rete Windows/Samba)
   - **FTP**
   - **RDP** (Remote Desktop Protocol)
   - **Database SQL**

4. **Post-Exploitation ed Esfiltrazione**
   Se uno dei moduli riesce a ottenere credenziali valide, Bjorn passa automaticamente alla fase successiva: si autentica sul servizio compromesso (ad esempio tramite SMB, SSH o FTP), esplora le directory accessibili ed estrae file di interesse, archiviandoli ordinatamente sul Raspberry Pi per la successiva analisi.

5. **Display e-Paper e Web GUI**
   - **Schermo e-Ink:** mostra l'avatar del personaggio con espressioni e messaggi di stato che cambiano dinamicamente in base all'attività in corso (scansione, attacco, attesa, credenziali trovate), garantendo consumi energetici minimi.
   - **Web Dashboard:** accessibile via HTTP, offre una panoramica completa della topologia di rete scoperta, lo stato dei singoli host, le credenziali recuperate, i file estratti e la possibilità di avviare, mettere in pausa o configurare manualmente i vari script.

