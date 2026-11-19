---
layout: page
title: WPA3 💦
permalink: /notes/network-security/wpa3/
---

* Placeholder
{:toc}


### **Prerequisiti**

- **Scambio di Chiavi Diffie-Hellman (Diffie-Hellman Key Exchange)**  
  Essenziale per comprendere come il protocollo SAE stabilisca una chiave di sessione sicura senza mai trasmettere la password.

- **Problema del Logaritmo Discreto (Discrete Logarithm Problem)**  
  La sicurezza dei protocolli basati su Diffie-Hellman poggia sulla difficoltà computazionale di risolvere il problema del logaritmo discreto, che impedisce a un attaccante di derivare il segreto condiviso anche qualora osservasse i parametri pubblici scambiati durante il protocollo.

- **Forward Secrecy**  
  Garantisce che, anche se la password del Wi-Fi dovesse essere compromessa in futuro, il traffico intercettato in precedenza non possa essere decifrato, migliorando drasticamente la sicurezza rispetto a WPA2-PSK.

- **WPA2 4-Way Handshake**  
  WPA3 si affida comunque al *4-Way Handshake* per l'installazione e la conferma delle chiavi di sessione.  
  Segui [questo link](/notes/network-security/wpa2-4way-handshake/) se ti sei perso l'approfondimento!

---

### **Meccanismo Tecnico**

WPA3-Personal sostituisce il modello di autenticazione basato su chiave pre-condivisa (PSK) di WPA2 con **SAE (Simultaneous Authentication of Equals)**, un protocollo di scambio di chiavi autenticato tramite password (*Password-Authenticated Key Exchange*, PAKE) derivato dal **Dragonfly handshake**.

In WPA2-PSK, la password viene utilizzata direttamente per derivare la **Pairwise Master Key (PMK)** attraverso una funzione deterministica (`PBKDF2`). Ciò significa che la stessa password produce sempre la medesima PMK, rendendo possibile verificare tentativi di password (*password guessing*) completamente offline.

WPA3 ribalta completamente questo paradigma: invece di derivare una chiave statica dalla password, quest'ultima viene utilizzata per generare un **Password Element (PWE)** che funge da base per uno scambio di chiavi interattivo in stile Diffie-Hellman. Il risultato è che la chiave di sessione finale viene derivata dinamicamente attraverso una negoziazione attiva tra il client e l'access point.

Le due entità coinvolte nel protocollo sono:

- **STA (Station)** – il dispositivo client
- **AP (Access Point)** – il punto di accesso wireless

Entrambi i dispositivi conoscono la stessa password, ma non la trasmettono mai direttamente né inviano alcun valore utilizzabile per verificare tentativi di password offline.

---

### **1. Derivazione del Password Element (PWE)**

Il primo passaggio del protocollo SAE consiste nella derivazione del **Password Element (PWE)**.

Il PWE è un punto su una curva ellittica che viene derivato in modo deterministico a partire da:

- la password condivisa
- l'indirizzo MAC della station (STA)
- l'indirizzo MAC dell'access point (AP)

L'inclusione di entrambi gli indirizzi MAC garantisce che il valore risultante sia vincolato alla specifica coppia di dispositivi coinvolti nell'autenticazione, impedendo agli attaccanti di riutilizzare i dati del protocollo su dispositivi o sessioni differenti.

Una volta derivato, il PWE diventa l'elemento generatore di base utilizzato nel successivo scambio Diffie-Hellman.

---

### **2. Loop SAE (Hunting-and-Pecking)**

Il metodo originale di SAE deriva il *Password Element* attraverso un processo iterativo noto come **hunting-and-pecking**.

In questo approccio, la password e gli identificativi dei dispositivi vengono elaborati ripetutamente tramite una funzione di hash al fine di generare valori candidati, che vengono poi testati per verificare se corrispondano a un punto valido sulla curva ellittica.

Concettualmente, il processo può essere descritto come segue:

```text
password + MAC_AP + MAC_STA -> funzione di hash -> valore candidato -> verifica se è un punto valido sulla curva ellittica -> se non valido -> ripeti incrementando un contatore
```

Questo ciclo continua finché non viene individuato un punto valido sulla curva; una volta trovato, esso diventa il **Password Element (PWE)** utilizzato per il resto del protocollo di autenticazione.

Poiché il procedimento dipende dalla ricerca di un punto valido, il numero di iterazioni necessarie può variare in base agli input. Ciononostante, il risultato finale è sempre lo stesso elemento deterministico per una determinata password e coppia di dispositivi.

---

### **3. SAE Constant-Time (Hash-to-Element)**

Per offrire un metodo di derivazione più deterministico e resistente ad attacchi temporali (*timing attacks*), le implementazioni più recenti supportano una costruzione chiamata **hash-to-element**.

Invece di cercare iterativamente un punto valido sulla curva, la password e gli identificativi dei dispositivi vengono elaborati tramite un'apposita funzione crittografica che mappa direttamente l'input su un punto valido della curva ellittica in tempo costante.

Concettualmente:

```text
password + MAC_AP + MAC_STA -> funzione hash-to-element -> Password Element (PWE)
```

Questo metodo produce esattamente lo stesso tipo di elemento crittografico dell'approccio *hunting-and-pecking*, ma senza richiedere tentativi ripetuti per trovare un punto valido.

Il *Password Element* risultante viene poi impiegato allo stesso identico modo durante lo scambio di autenticazione SAE.

---

### **4. Scambio di Autenticazione SAE (Dragonfly Handshake)**

Una volta derivato il *Password Element*, la station e l'access point avviano lo **scambio di autenticazione SAE**, composto da due fasi principali:

1. **Commit phase** (Fase di impegno)
2. **Confirm phase** (Fase di conferma)

#### **4.1 Commit Phase**

Durante la *commit phase*, ciascun dispositivo genera:

- uno **scalare privato casuale**
- un corrispondente **elemento pubblico** derivato dal PWE e dallo scalare scelto

Questi elementi pubblici vengono scambiati tra la STA e l'AP per calcolare un **segreto condiviso** tramite operazioni su curva ellittica, che verrà poi utilizzato per derivare la **Pairwise Master Key (PMK)** al termine della fase di conferma.

#### **4.2 Confirm Phase**

In questa fase, entrambi i dispositivi si scambiano messaggi di conferma contenenti token di autenticazione derivati dal segreto condiviso e dai parametri scambiati in precedenza.

Lo scopo di questi messaggi è garantire che entrambe le parti:

- abbiano derivato lo stesso segreto condiviso
- stiano comunicando con l'interlocutore legittimo (assenza di attacchi Man-in-the-Middle)
- siano effettivamente in possesso della password condivisa

Se i valori di conferma coincidono, l'autenticazione ha successo.

---

### **5. Fase di Installazione delle Chiavi**

Una volta stabilita la PMK attraverso lo scambio SAE, il protocollo prosegue con il **4-Way Handshake**, ovvero lo stesso meccanismo di installazione delle chiavi utilizzato in WPA2 (con l'aggiunta dei *Protected Management Frames* obbligatori).

Pertanto, la differenza sostanziale tra WPA2 e WPA3 risiede nella **fase di autenticazione che genera la PMK**, mentre i successivi meccanismi di installazione delle chiavi e cifratura dei dati rimangono sostanzialmente invariati.

---

### **Attacchi Dragonblood**

Nel 2019 un gruppo di ricercatori ha divulgato una serie di vulnerabilità note collettivamente con il nome di **Dragonblood**, mirate a specifiche debolezze nelle prime implementazioni di WPA3 e del relativo protocollo di autenticazione SAE (*Simultaneous Authentication of Equals*).

Segui [questo link](https://wpa3.mathyvanhoef.com) per approfondire nel dettaglio!

Piuttosto che violare le primitive crittografiche sottostanti, questi attacchi sfruttano *side-channel leakage* (perdite di informazioni tramite canali laterali, come i tempi di esecuzione), scenari di *downgrade* ed errori implementativi presenti nelle configurazioni reali delle reti WPA3.

Gli attacchi hanno dimostrato che alcune implementazioni di SAE potevano lasciar trapelare informazioni durante il processo di derivazione del *Password Element*, in particolare quando veniva utilizzato il metodo iterativo originale *hunting-and-pecking*. Inoltre, le reti configurate in **modalità di transizione WPA2/WPA3 (Transition Mode)** si sono rivelate vulnerabili ad attacchi di downgrade, consentendo a un attaccante di costringere un client a connettersi utilizzando WPA2 anziché WPA3.

Una spiegazione dettagliata della ricerca su Dragonblood è disponibile in questa presentazione:  
[Dragonblood – WPA3 vulnerabilities explained](https://www.youtube.com/watch?v=msTugNs8bnM)