---
layout: page
title: Wardriving 🚗
permalink: /notes/wardriving/
---


* Placeholder
{:toc}

Il **Wardriving** è l'attività di rilevamento e registrazione delle reti Wi-Fi mentre ci si sposta fisicamente attraverso un'area, tipicamente in auto, in bicicletta o a piedi.  
Per praticare il wardriving si utilizza solitamente un **laptop o un dispositivo portatile dotato di un adattatore Wi-Fi** abbinato a un **ricevitore GPS**, al fine di registrare le coordinate geografiche di ciascuna rete rilevata.

L'obiettivo principale del wardriving è **identificare gli access point (AP) wireless e registrarne la posizione**, creando di fatto una mappa delle reti Wi-Fi disponibili in una determinata area.  
Le informazioni raccolte possono essere successivamente condivise o caricate su database online dedicati alla mappatura delle reti wireless (come WiGLE).

Un'analogia efficace consiste nel pensare al wardriving come alla **mappatura dei numeri civici di un quartiere**: invece di annotare edifici e cassette postali, il *wardriver* registra la posizione degli access point wireless che trasmettono il proprio segnale nell'etere.

---

### Uso Legittimo e Abuso

Il wardriving di per sé non implica necessariamente un comportamento illegale. Nella sua forma base, consiste semplicemente nel **rilevare le reti wireless e raccogliere informazioni tecniche** trasmesse pubblicamente.

Tuttavia, alcuni soggetti approfittano di **impostazioni di sicurezza deboli o mal configurate** per accedere alle reti individuate. In questi scenari, gli obiettivi possono includere:

- accedere ai file condivisi sulla rete locale
- utilizzare la connessione Internet senza autorizzazione
- sfruttare gratuitamente la banda disponibile

Quando il wardriving viene utilizzato per questi scopi, rientra nella categoria più ampia dell'**uso non autorizzato di reti wireless**, talvolta indicato come *wireless theft* o *thiefing*.

---

### Warchalking

È una tecnica nata per identificare le reti wireless ed elencarne rapidamente le caratteristiche **disegnando appositi simboli con il gesso negli spazi pubblici**, indicando ad esempio:

- se la rete è aperta o protetta
- se è disponibile l'accesso a Internet
- quale tipologia di sicurezza o cifratura viene utilizzata

---

### Warkitting

Un concetto più avanzato e potenzialmente molto pericoloso è il **warkitting**, che combina il wardriving con attacchi a livello di firmware.

In un attacco di warkitting, l'attaccante **sostituisce o modifica il firmware di un router wireless target**, acquisendo il pieno controllo del dispositivo. Una volta compromesso il router, l'attaccante può essere in grado di:

- monitorare tutto il traffico che transita attraverso il dispositivo
- manipolare le comunicazioni
- alterare i contenuti scaricati dagli utenti (ad esempio iniettando malware)

Il concetto di warkitting è stato descritto nel 2006 dai ricercatori **Tsow, Jakobsson, Yang e Wetzel** in questo [paper](https://markus-jakobsson.com/papers/jakobsson-jdfp06-warkit.pdf).

---

### Wardriving Passivo

La forma più comune di wardriving è il **wardriving passivo**, che consiste semplicemente nell'ascoltare i segnali trasmessi dagli access point wireless.

Strumenti come:

- **Kismet**
- **KisMAC**

catturano i **beacon frame** trasmessi periodicamente in broadcast dalle reti Wi-Fi e registrano informazioni come l'SSID, il BSSID e l'intensità del segnale.

In questo scenario il dispositivo **non interagisce in alcun modo con la rete**, limitandosi ad ascoltare le trasmissioni radio diffuse pubblicamente.

---

### Wardriving Attivo

Alcuni strumenti eseguono invece una scansione di tipo più attivo. Ad esempio, **NetStumbler** invia **probe request** alle reti wireless circostanti.

Gli access point rispondono automaticamente a queste richieste, fornendo informazioni sulla rete. Durante questo processo, il dispositivo che effettua la scansione può risultare **temporaneamente associato alla rete**, anche se non viene scambiato alcun traffico dati vero e proprio.

Per questo motivo, il **wardriving attivo solleva maggiori questioni legali ed etiche**, poiché comporta un'interazione diretta con l'infrastruttura di rete.

Alcuni wardriver riducono la probabilità che il proprio dispositivo venga registrato nei log della rete configurando un **indirizzo IP statico**, evitando così la richiesta e l'assegnazione automatica di un indirizzo tramite DHCP.

