---
layout: page
title: Anonymity 👻
permalink: /notes/Anonymity/
---


* Placeholder
{:toc}

Ogni dispositivo connesso a una rete deve identificarsi per poter comunicare con altri sistemi tramite il proprio **indirizzo IP**; ciò significa che ogni volta che accediamo a un sito web o a un servizio, una qualche forma di **identità di rete** viene inevitabilmente esposta.

### **1. Indirizzi IP Locali (Reti Private)**
All'interno di una rete domestica o aziendale, i dispositivi sono collegati a una **rete locale (LAN)** gestita da un router che assegna a ciascun dispositivo un **indirizzo IP privato** utilizzando il protocollo **DHCP (Dynamic Host Configuration Protocol)**.

I tipici intervalli di indirizzi privati rientrano nel range `192.168.0.0 – 192.168.255.255`: questi sono validi **esclusivamente all'interno della rete locale** e non sono direttamente raggiungibili da Internet.

### **2. Dalla Rete Locale a Internet (NAT)**
Il **NAT (Network Address Translation)** consente a più dispositivi all'interno di una rete locale di condividere un singolo indirizzo pubblico. Pertanto, quando un dispositivo invia un pacchetto verso Internet:

1. Il pacchetto lascia il dispositivo con il proprio IP privato.
2. Il router lo sostituisce con l'IP pubblico.
3. Il pacchetto viene instradato verso Internet.

Il router tiene traccia di queste traduzioni utilizzando una tabella NAT.

### **3. Indirizzo IP Pubblico e Routing su Internet**
L'indirizzo IP pubblico viene assegnato dal tuo Internet Service Provider (ISP, come TIM, Vodafone, ecc.) nel momento in cui il router si connette alla rete ed è l'indirizzo che i siti web e i server vedono quando ti colleghi.

Puoi scoprire il tuo IP pubblico eseguendo da terminale:

```bash
curl ipinfo.io
```

```json
{
  "ip": "93.45.210.17",
  "city": "Rome",
  "region": "Lazio",
  "country": "IT",
  "org": "AS3269 Telecom Italia"
}
```

### **4. L'IP può rivelare informazioni**
Sebbene un indirizzo IP non riveli direttamente l'identità anagrafica di una persona, può comunque esporre diverse informazioni utili alla profilazione:

- posizione geografica approssimativa
- provider Internet (ISP)
- Autonomous System (ASN)
- Paese e regione
- tipologia di rete (residenziale, hosting provider, rete mobile)

Inoltre, anche se l'indirizzo IP cambia, gli utenti possono comunque essere tracciati attraverso altri meccanismi come il **Browser Fingerprinting** ([testalo qui](https://amiunique.org)).

### **5. Meccanismi Difensivi**
Esistono diversi strumenti e meccanismi per migliorare la privacy e ridurre la tracciabilità:

- Web Browser orientati alla privacy (es. Brave)
- Sistemi Operativi dedicati (es. Tails o Linux Kodachi)
- VPN (Virtual Private Network)
- Rete Tor
- DNS over HTTPS (DoH)
- DNS over TLS (DoT)


### **Browser**

Il browser con cui mi sento più sicuro è **Brave**, poiché si concentra fortemente su **privacy e sicurezza**.

Brave include nativamente:

- **Blocco integrato di annunci e tracker** – Blocca automaticamente le reti pubblicitarie e gli script di tracciamento che raccolgono dati sulle tue abitudini di navigazione.
- **Protezione dal Fingerprinting** – Impedisce ai siti web di identificare univocamente il tuo dispositivo sfruttando le caratteristiche del browser e dell'hardware.
- **Upgrade automatico a HTTPS** – Quando possibile, forza automaticamente i siti web a utilizzare la versione sicura HTTPS invece di HTTP.
- **Blocco dei cookie di terze parti** – Riduce il tracciamento *cross-site* da parte dei network pubblicitari.

Tutte queste funzionalità possono essere gestite facilmente dalle impostazioni e controllate in tempo reale tramite i **Brave Shields**.

Questo browser integra inoltre le **finestre private con Tor**, che instradano il traffico attraverso la rete Tor per aumentare l'anonimato durante la navigazione di contenuti sensibili. È tuttavia importante ricordare che questa funzione **non sostituisce completamente il Tor Browser**, ma rappresenta piuttosto un modo pratico per aggiungere un ulteriore livello di privacy.

A differenza di molti altri browser che dichiarano di proteggere gli utenti dal tracciamento, Brave blocca effettivamente la maggior parte dei meccanismi di tracking nella pratica.

Ad esempio, monitoro il mio sito web utilizzando **Google Analytics** e, anche quando gli utenti navigano con browser che pubblicizzano funzionalità di privacy, vengono spesso comunque rilevati e conteggiati da Analytics. Brave, al contrario, lo blocca completamente e non compare affatto nelle dashboard analitiche.

[Approfondimento su Brave](https://www.youtube.com/watch?v=4mgMZFHv1uM)


### **Tails OS**

**Tails (The Amnesic Incognito Live System)** è un sistema operativo incentrato sulla privacy, progettato per preservare l'anonimato e non lasciare tracce sul computer utilizzato.

A differenza dei sistemi operativi tradizionali che vengono installati permanentemente su disco, Tails è un **sistema operativo live** che viene eseguito direttamente da una **chiavetta USB o da un DVD**. Ciò significa che è possibile avviare quasi qualsiasi computer con Tails senza modificare il sistema esistente.

### **Sistema amnesico**

Il termine **amnesico** indica che il sistema non conserva memoria delle attività svolte dopo lo spegnimento.

Per impostazione predefinita:

- non viene salvata alcuna cronologia di navigazione  
- nessun file rimane memorizzato sul sistema  
- nessun log persiste dopo lo spegnimento  

Tutto viene eseguito nella **RAM** e, quando il computer viene spento, la memoria viene cancellata.

Questo rende Tails particolarmente utile quando si lavora su **computer condivisi o macchine non fidate**, anche se sappiamo che a livello forense la RAM può talvolta trattenere tracce residue per un breve intervallo dopo lo spegnimento (*cold boot attacks*).

### **Strumenti per la privacy integrati**

Tails include diversi strumenti già preconfigurati per la privacy e la sicurezza:

- **Tor Browser** per la navigazione web anonima  
- **KeePassXC** per la gestione delle password  
- **Electrum** per i wallet Bitcoin  
- **OnionShare** per la condivisione anonima di file  
- Strumenti **GnuPG** per la cifratura e le comunicazioni sicure  

Questi tool sono già configurati affinché l'utente non debba impostare manualmente le protezioni di base.

### **Archiviazione persistente (opzionale)**

Sebbene Tails sia progettato per dimenticare tutto, è possibile creare uno **spazio di archiviazione persistente cifrato** (*Encrypted Persistent Storage*) sulla chiavetta USB.

Questo consente di salvare in sicurezza:

- file
- chiavi crittografiche
- impostazioni di configurazione
- password

[Tails spiegato da uno dei miei creator preferiti](https://www.youtube.com/watch?v=IOTCGUQ51xo)


### ** VPN**

Una **VPN (Virtual Private Network)** è una tecnologia che cifra il traffico Internet e lo instrada attraverso un server remoto prima di raggiungere la destinazione finale. Invece di vedere il tuo indirizzo IP pubblico, i siti web vedono l'indirizzo IP del server VPN. Questo fornisce un ulteriore livello di privacy e impedisce al tuo Internet Service Provider (ISP), agli amministratori di rete o ad eventuali attaccanti su reti pubbliche di monitorare facilmente la tua attività online.

Le VPN vengono spesso utilizzate per aumentare **privacy e sicurezza**, specialmente quando ci si connette a reti Wi-Fi pubbliche come quelle di bar, aeroporti o hotel. La cifratura fornita dalla VPN crea un tunnel sicuro tra il tuo dispositivo e il server VPN, riducendo il rischio di *eavesdropping*, *packet sniffing* o attacchi *Man-in-the-Middle* (MITM).

Un altro utilizzo comune delle VPN è il **mascheramento dell'indirizzo IP**, che rende più difficile per siti web e servizi online associare direttamente la tua attività alla tua posizione fisica o alla tua identità.

Tuttavia, le VPN presentano anche limiti e svantaggi importanti:

1. **Non garantiscono il vero anonimato:** sebbene il tuo ISP non possa più vedere i siti che visiti, il **provider VPN stesso può potenzialmente osservare il tuo traffico**; di fatto, stai semplicemente spostando la fiducia dal tuo ISP all'azienda che gestisce la VPN.
2. **Politiche "No-Logs" non sempre verificabili:** molti provider dichiarano di non conservare log di navigazione, ma non è sempre possibile verificarlo. In diversi casi alcune aziende sono state costrette dalle forze dell'ordine a fornire dati degli utenti, dimostrando che determinati log di attività esistevano ancora.
3. **Riduzione delle prestazioni:** poiché il traffico deve attraversare un server aggiuntivo, le connessioni VPN possono introdurre maggiore latenza e velocità di download inferiori.
4. **Nessuna protezione contro il tracciamento applicativo:** le VPN non proteggono da tecniche come **browser fingerprinting, cookie o login agli account**, che possono comunque rivelare l'identità dell'utente anche con una VPN attiva — ed è proprio qui che entrano in gioco browser orientati alla privacy come **Brave**.

Per queste ragioni, una VPN va considerata come **uno strumento che migliora privacy e sicurezza**, ma non come una soluzione definitiva per l'anonimato.

Per capire cosa fa realmente una VPN, è utile confrontare il funzionamento di una connessione normale con quello di una connessione protetta da VPN.

### **Senza VPN (`Tu → ISP → Sito Web`)**

Il tuo **ISP ti assegna un indirizzo IP pubblico**, ed è questo l'indirizzo che i siti web vedono quando ti connetti.

Utilizzando HTTPS, l'ISP può comunque vedere:

- l'**indirizzo IP del sito web**
- il **nome di dominio** a cui ti connetti (esempio: `google.com`, tramite SNI/DNS)
- la **quantità di traffico** scambiato
- l'**orario della connessione**

Ma l'ISP **non può vedere**:

- le pagine specifiche che apri  
- i dati che invii  
- le password  
- i messaggi  
- il contenuto delle pagine web  

*(Se la connessione non è cifrata, ovvero in HTTP, l'ISP potrebbe invece leggere in chiaro anche l'intero contenuto del traffico).*

### **Con VPN (`Tu → ISP → Server VPN → Sito Web`)**

Quando utilizzi una VPN, il tuo traffico passa comunque attraverso il tuo Internet Service Provider (ISP), poiché è l'entità che ti fornisce l'accesso fisico a Internet. Tuttavia, l'ISP non può vedere la destinazione finale né il contenuto del traffico una volta stabilito il tunnel VPN.

Il processo funziona in questo modo:

1. Il tuo dispositivo si connette al server VPN tramite la normale connessione Internet.
2. La richiesta di connessione attraversa il tuo router e il tuo ISP.
3. Il tuo dispositivo e il server VPN stabiliscono un **tunnel cifrato**.
4. Da quel momento in poi, tutto il traffico Internet viene inviato attraverso questo tunnel.

Di conseguenza, il tuo ISP può vedere soltanto:

- che sei connesso a un server VPN
- l'indirizzo IP del server VPN
- la quantità di traffico generato

Tuttavia, l'ISP non può vedere:

- quali siti web visiti
- quali pagine apri
- il contenuto del tuo traffico

Infine, il **sito web visitato vedrà esclusivamente l'indirizzo IP del server VPN** e non il tuo.


### **GrapheneOS**

**GrapheneOS** è un sistema operativo mobile fortemente incentrato su privacy e sicurezza, sviluppato specificamente per i dispositivi **Google Pixel**.

Una delle sue caratteristiche principali è l'esecuzione dei **Google Play Services in sandbox**, che consente di utilizzare i servizi Google in un ambiente completamente isolato in cui non possono accedere a informazioni sensibili né godere di privilegi di sistema, prevenendo gran parte del tracciamento e l'esecuzione incontrollata di app in background.

[Sito ufficiale](https://grapheneos.org/)

