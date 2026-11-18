---
layout: page
title: Deauthentication Attacks 🔫
permalink: /notes/deauthentication/
---


* Placeholder
{:toc}

Gli attacchi di deautenticazione (*deauthentication attacks*) rappresentano una delle tecniche più comuni e rilevanti nell'auditing di sicurezza delle reti Wi-Fi.  
Sfruttano una debolezza strutturale del protocollo IEEE 802.11: **i management frame non sono autenticati** in molte configurazioni (specialmente nelle reti WPA2 prive di meccanismi di protezione come lo standard 802.11w).

Ciò significa che un attaccante può falsificare (*forge*) frame di deautenticazione e costringere i client legittimi a disconnettersi da un access point.

#### Come funziona la Deautenticazione

In una normale connessione Wi-Fi, un client rimane associato a un access point finché una delle due parti non decide di terminare la sessione.

Un attacco di deautenticazione interrompe questa relazione inviando frame falsificati che sembrano provenire:
- dall'Access Point → per disconnettere il client  
- oppure dal Client → per disconnettersi dall'AP  

Di conseguenza, la vittima è costretta a riconnettersi, un evento estremamente utile in attacchi come:
- Cattura dell'handshake WPA/WPA2  
- Attacchi Evil Twin  

#### Deautenticazione con mdk4

`mdk4` è un potente strumento progettato per **attacchi wireless aggressivi e ad alta velocità**.

Caratteristiche principali:
- Invia frame di deautenticazione a frequenza molto elevata  
- Può colpire più client contemporaneamente  
- Può inondare l'intera rete (attacco *broadcast*)  
- Meno preciso, ma molto efficace in ambienti affollati  

Caso d'uso tipico:
- Quando si vuole **costringere rapidamente qualsiasi dispositivo connesso a riconnettersi**
- Utile quando nessun client si sta riconnettendo autonomamente

Limitazioni:
- Molto rumoroso (facilmente rilevabile)
- Può compromettere pesantemente il funzionamento dell'intera rete
- Minore controllo sui singoli target specifici

#### Deautenticazione con aireplay-ng

`aireplay-ng` fa parte della suite Aircrack-ng e offre un **approccio più controllato e mirato**.

Caratteristiche principali:
- Può colpire un singolo client specifico (utilizzando il suo indirizzo MAC)  
- Consente un controllo preciso sul numero e sulla temporizzazione dei pacchetti  
- Più discreto (*stealth*) rispetto a `mdk4`  
- Più semplice da integrare in flussi di attacco mirati  

Caso d'uso tipico:
- Quando si vuole disconnettere **un singolo dispositivo specifico**  
- Quando si esegue un test controllato in laboratorio  
- Quando si desidera minimizzare il rumore ed evitare il rilevamento  

Limitazioni:
- Più lento rispetto a `mdk4`  
- Richiede una configurazione più manuale  
- Meno efficace se è necessario colpire molti client contemporaneamente  

#### Differenze Principali (mdk4 vs aireplay-ng)

| Caratteristica           | mdk4                          | aireplay-ng                  |
|--------------------------|-------------------------------|------------------------------|
| Stile di attacco         | Aggressivo / Flood            | Controllato / Mirato         |
| Velocità                 | Molto elevata                 | Moderata                     |
| Precisione               | Bassa                         | Alta                         |
| Targeting                | Multiplo / Broadcast          | Singolo client o AP          |
| Rumore / Rilevabilità    | Alto                          | Inferiore                    |
| Utilizzo tipico          | Forzare qualsiasi riconnessione | Disconnessione mirata      |

#### Misure Difensive

Le moderne reti Wi-Fi possono mitigare questi attacchi utilizzando:

- **802.11w (Protected Management Frames)** → impedisce l'accettazione di frame di deautenticazione falsificati (*spoofed*)  
- **WPA3** → include protezioni crittografiche più robuste e rende obbligatorio l'uso dei PMF  
- **Sistemi di Intrusion Detection (WIDS/WIPS)** → rilevano pattern anomali di pacchetti di deautenticazione  

Tuttavia, molte reti rimangono tuttora vulnerabili, in particolare le configurazioni WPA2 legacy.