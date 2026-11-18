---
layout: page
title: Rayhunter 🦈
permalink: /projects/Rayhunter/
---


* Placeholder
{:toc}

## Rayhunter

[Rayhunter](https://github.com/EFForg/rayhunter) è un progetto progettato per rilevare gli **IMSI catcher**, noti anche come **cell-site simulator** o **Stingray**.

Mi sono imbattuto in questo progetto mentre studiavo le **infrastrutture di rete mobile** durante il mio corso di *Network Security*. In particolare, l'argomento riguardava il momento in cui un dispositivo mobile si connette a una nuova stazione radio base cellulare per autenticarsi e ottenere l'accesso ai servizi forniti dall'operatore mobile, come chiamate vocali, SMS e connettività dati.

---

## Piattaforma Hardware

Il progetto è stato originariamente progettato per funzionare su un **economico hotspot mobile chiamato Orbic RC400L**, operativo esclusivamente negli Stati Uniti.

Grazie al contributo della community, lo stesso progetto può essere installato anche sul **TP-Link M7350** nel resto del mondo.

Questo dispositivo si trova solitamente a un prezzo relativamente contenuto su piattaforme come Amazon, e spesso a cifre ancora più basse su mercati dell'usato come Vinted o eBay. Quando si acquista hardware usato, è fondamentale verificare l'**esatta revisione hardware**, poiché non tutte le versioni sono compatibili con il firmware.

La guida ufficiale che descrive la procedura di installazione per il TP-Link M7350 e le versioni supportate è disponibile [qui](https://efforg.github.io/rayhunter/tplink-m7350.html).

Installare il firmware è relativamente semplice: la documentazione ufficiale su GitHub fornisce una chiara procedura passo-passo e online sono disponibili anche diversi video tutorial.

---

## Perché esiste questo progetto?

Per comprendere le motivazioni alla base di Rayhunter, è necessario osservare brevemente come i **dispositivi mobili si autenticano alle reti cellulari**.

Quando uno smartphone viene acceso o entra nell'area di copertura di una nuova stazione radio base connettendosi a una nuova cella per la prima volta, deve prima stabilire una comunicazione con la rete. Durante questo processo il dispositivo deve identificarsi affinché l'operatore mobile possa:

- verificare l'abbonato
- autorizzare l'accesso alla rete
- associare il dispositivo a uno specifico account
- abilitare servizi come chiamate, SMS e rete dati

L'identificativo utilizzato a questo scopo, inviato dal terminale mobile alla stazione radio base, è l'**IMSI (International Mobile Subscriber Identity)**.

---

## Cos'è l'IMSI?

L'IMSI è un identificativo univoco memorizzato all'interno della **scheda SIM** che identifica l'abbonato all'interno della rete mobile.

È composto da tre parti principali:

- **MCC (Mobile Country Code)** – identifica il Paese
- **MNC (Mobile Network Code)** – identifica l'operatore mobile
- **MSIN (Mobile Subscriber Identification Number)** – identifica univocamente l'abbonato

Insieme, questi valori identificano in modo univoco un utente nella rete cellulare globale.

---

## Il Problema: gli IMSI Catcher

La vulnerabilità nasce dal fatto che un dispositivo mobile **non può verificare inizialmente se una stazione radio base sia legittima**, poiché è solo il terminale mobile ad autenticarsi verso la rete.

Un attaccante può sfruttare questo comportamento dispiegando una falsa stazione radio base, comunemente definita **IMSI catcher**.

Questi dispositivi simulano una torre cellulare legittima e inducono i telefoni nelle vicinanze a connettersi ad essi. Una volta stabilita la connessione, l'attaccante può:

- costringere i dispositivi a rivelare il proprio IMSI
- tracciare l'identità degli abbonati
- monitorare la presenza dei dispositivi in una determinata area geografica
- effettuare potenzialmente un *downgrade* della sicurezza di rete

Poiché i dispositivi mobili si connettono automaticamente al segnale disponibile più forte, possono agganciarsi inconsapevolmente a queste stazioni radio base malevole (*rogue base stations*).

<img src="https://nicofragale.github.io/assets/images/rayhunter.jpg" alt="rayhunter" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" />

Se la barra è verde, non viene rilevata alcuna falsa stazione radio base. Fortunatamente, finora non ho mai visto una barra rossa.

---

## Considerazioni Difensive

### Identificativi Temporanei dell'Abbonato

Le moderne reti cellulari cercano di ridurre l'esposizione dell'IMSI utilizzando identificativi temporanei come il **TMSI (Temporary Mobile Subscriber Identity)**, che cambia frequentemente.

Invece di trasmettere l'IMSI permanente ogni volta che il dispositivo si connette alla rete, l'operatore assegna un identificativo temporaneo che viene aggiornato periodicamente, limitando la possibilità per gli attaccanti di tracciare gli utenti nel tempo.

### Autenticazione Reciproca nelle Reti Moderne

Le tecnologie cellulari più recenti, come il **4G (LTE)** e il **5G**, introducono meccanismi di autenticazione più robusti tra dispositivo e rete e l'**autenticazione reciproca** (*mutual authentication*); inoltre, il 5G introduce **SUPI** e **SUCI**, che rappresentano la versione cifrata di **IMSI** e **TMSI**.

In questi sistemi:

- il dispositivo si autentica verso la rete
- anche la rete deve dimostrare la propria legittimità al dispositivo

Questa autenticazione reciproca riduce significativamente l'efficacia delle stazioni radio base malevole rispetto alle generazioni precedenti come il 2G.

### Evitare le Reti Legacy

Molti attacchi basati su IMSI catcher puntano a forzare i dispositivi a effettuare un **downgrade verso tecnologie cellulari più datate**, in particolare il **2G**, dove le protezioni di sicurezza sono più deboli. Questo è il tipo di attacco più comune, dal momento che i dispositivi danno priorità al mantenimento della connettività in qualsiasi situazione.

---

## Come operano i moderni IMSI Catcher

1. L'attaccante simula una **stazione radio base 4G o 3G**.
2. I dispositivi mobili nelle vicinanze tentano di connettersi a questa cella.
3. La stazione radio base malevola segnala che il **servizio LTE non è disponibile**.
4. Il dispositivo mobile effettua automaticamente il **downgrade a una rete legacy**, tipicamente 2G.
5. L'attaccante attiva quindi una **falsa stazione radio base GSM** per catturare gli identificativi degli abbonati.

I dispositivi mobili selezionano la cella servente in base a diversi parametri radio, tra cui:

- **Potenza del segnale**
- **Priorità radio**
- **Parametri di configurazione broadcast**

Di conseguenza, i dispositivi possono agganciarsi automaticamente all'infrastruttura malevola.

---

## Perché gli IMSI Catcher sono difficili da rilevare

Gli IMSI catcher sono progettati per comportarsi in modo simile alle stazioni radio base legittime, il che li rende difficili da individuare.

Tuttavia, presentano spesso caratteristiche anomale come:

- **celle adiacenti (*neighboring cells*) assenti o in numero molto ridotto**
- **parametri radio anomali**
- **potenza del segnale insolitamente elevata**
- **frequenti richieste di identità da parte della rete**

---

## Tracciamento degli IMSI Catturati

Tracciare i dispositivi utilizzando gli IMSI catturati non implica necessariamente l'intercettazione delle comunicazioni.  
Nella maggior parte dei casi, l'obiettivo è semplicemente determinare se uno specifico dispositivo sia presente in una determinata area e, se possibile, stimarne la posizione.  
Una volta identificato un dispositivo target, il tracciamento può essere effettuato misurando l'**intensità del segnale ricevuto (RSSI)**.  
Spostando l'antenna o il ricevitore — ad esempio tramite un veicolo o un drone — è possibile osservare come varia la potenza del segnale.

In presenza di più ricevitori o antenne, è possibile stimare la posizione di un dispositivo tramite **triangolazione**, misurando l'RSSI del dispositivo target.

Anche senza triangolazione, gli IMSI catcher possono comunque eseguire un **tracciamento temporale**. Registrando quando e dove viene osservato un IMSI, diventa possibile ricostruire un percorso approssimativo degli spostamenti del dispositivo nel tempo.

---

## Limiti del Tracciamento basato su IMSI

Sebbene gli IMSI catcher possano fornire informazioni utili sulla localizzazione, questo metodo presenta diversi limiti:

- la precisione è generalmente **inferiore rispetto al posizionamento basato su GPS**
- le misurazioni del segnale possono risultare inaffidabili in **ambienti urbani densi**
- edifici e riflessioni possono distorcere le misurazioni radio

Per queste ragioni, il tracciamento basato su IMSI viene spesso combinato con altre tecniche investigative o analitiche.