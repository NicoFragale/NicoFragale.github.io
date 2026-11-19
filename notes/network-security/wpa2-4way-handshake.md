---
layout: page
title: WPA2 4-Way Handshake 🫂
permalink: /notes/network-security/wpa2-4way-handshake/
---


* Placeholder
{:toc}


### **Prerequisiti**

1. **Fondamenti del Livello Link IEEE 802.11.**

Il *4-Way Handshake* opera a Livello 2 (Data Link), non a livello IP o TCP. È quindi necessario comprendere come una stazione wireless (STA) e un access point (AP) interagiscono all'interno del protocollo 802.11 e avere familiarità con i frame di management, controllo e dati.

2. **Derivazione delle Chiavi e Cifratura Simmetrica.**

3. **Nonce e Protezione dal Replay.**

I *nonce* sono fondamentali per garantire la freschezza della sessione (*session freshness*) e impedire il riutilizzo delle chiavi.  
I nonce devono essere univoci sotto la stessa chiave e i contatori di replay (*replay counters*) prevengono gli attacchi di duplicazione dei messaggi; questo concetto è indispensabile per analizzare vulnerabilità come KRACK.

4. **Autenticazione e Integrità dei Messaggi.**

Il 4-Way Handshake si basa sui *Message Integrity Code* (MIC) per confermare che entrambe le parti abbiano derivato la stessa chiave di sessione. È pertanto importante conoscere la differenza tra cifratura e integrità, e il modo in cui un MIC dimostra il possesso della chiave.

---

### **Il 4-Way Handshake**

Lo scopo del *4-Way Handshake* è derivare chiavi di sessione fresche (**PTK**), ma prima che inizi, avvengono i seguenti passaggi a livello IEEE 802.11:

- Il client esegue l'**autenticazione 802.11** (spesso di tipo "Open System", che non è un'autenticazione basata su password).
- La STA si associa all'AP e negozia i parametri di sicurezza tramite gli elementi informativi **RSN (Robust Security Network)**.
- A questo punto, entrambe le parti condividono una **Pairwise Master Key (PMK)**.

In modalità WPA2-Personal (PSK), la PMK viene derivata dalla passphrase Wi-Fi tramite la seguente funzione:

```text
PMK = PBKDF2(passphrase, SSID, SSID_length, 4096 iterazioni, output a 256 bit)
```

La PMK non viene mai trasmessa via etere.

---

### **1. Messaggio 1 (AP → STA)**

**Parametri inviati:**
- **ANonce** (valore casuale generato dall'AP)
- **Replay Counter**
- **Flag Key Information**

**Cosa succede:**
- La STA genera il proprio valore casuale (**SNonce**).
- La STA deriva la **Pairwise Transient Key (PTK)** utilizzando `PMK`, `ANonce`, `SNonce`, l'indirizzo MAC dell'AP e l'indirizzo MAC della STA.

L'inclusione di entrambi gli indirizzi MAC garantisce che la chiave derivata sia vincolata a quella specifica coppia STA–AP, impedendo l'impersonificazione o il dirottamento della sessione (*session hijacking*) da parte di un altro dispositivo.

In questa fase, la PTK non è ancora confermata.

La PTK viene suddivisa internamente in tre sotto-chiavi:
- **KCK (Key Confirmation Key)** – utilizzata per il calcolo del MIC
- **KEK (Key Encryption Key)** – utilizzata per cifrare la GTK
- **TK (Temporal Key)** – utilizzata per cifrare il traffico dati unicast

---

### **2. Messaggio 2 (STA → AP)**

**Parametri inviati:**
- **SNonce**
- **Replay Counter**
- **MIC (Message Integrity Code)** calcolato tramite la KCK e inviato in chiaro

**Cosa succede:**
- L'AP dispone ora di tutti gli input necessari per derivare la stessa PTK:
  - `PMK`
  - `ANonce`
  - `SNonce`
  - Entrambi gli indirizzi MAC
- L'AP calcola la PTK e verifica il MIC ricevuto.

Se il MIC è valido, l'AP ha la conferma che la STA possiede la PMK corretta.

---

### **3. Messaggio 3 (AP → STA)**

**Parametri inviati:**
- **Replay Counter**
- **MIC**
- **GTK cifrata** (protetta utilizzando la KEK)
- **Flag Key Information** (inclusi gli indicatori *install* e *secure*)

**Cosa succede:**
- La STA verifica il MIC per confermare che anche l'AP abbia derivato la medesima PTK.
- La STA installa la PTK (nello specifico la TK) per la cifratura del traffico unicast.
- La STA decifra e installa la **GTK (Group Temporal Key)** per il traffico broadcast/multicast.

I *replay counter* assicurano che eventuali frame del Messaggio 3 duplicati o ritardati vengano rilevati e scartati. Una gestione errata di questo passaggio ha portato a vulnerabilità critiche come **KRACK**, in cui la reinstallazione della chiave causava il riutilizzo dei nonce.

---

### **4. Messaggio 4 (STA → AP)**

**Parametri inviati:**
- **Replay Counter**
- **MIC**

**Cosa succede:**
- L'AP verifica il MIC.
- Entrambe le parti confermano l'avvenuta installazione delle chiavi.
- Ha inizio la comunicazione dati cifrata e sicura.

---

### **Analisi delle Vulnerabilità**

Il 4-Way Handshake di WPA2 è progettato per fornire conferma reciproca delle chiavi, freschezza e protezione dai replay; tuttavia, la sua sicurezza dipende dalla correttezza delle assunzioni di base e dell'implementazione.  
Ti consiglio di consultare anche la sezione dei progetti, poiché approfondiscono questi meccanismi valutando attività pratiche e strumenti come Wireshark e la suite Aircrack-ng.

#### **1. Abuso della Deautenticazione**

I *management frame* non sono protetti nel WPA2 tradizionale.

Un attaccante può:
- Inviare frame di deautenticazione falsificati (*forged*).
- Causare un Denial of Service (DoS).
- Costringere i client a riconnettersi.
- Innescare così la cattura dell'handshake.

I **Protected Management Frames (802.11w)** mitigano questo problema, motivo per cui sono stati resi obbligatori nello standard WPA3.

Approfondisci nei progetti: [Pwnagotchi](/projects/Pwngotchi/) e [WPA2 Deauthentication](/projects/WPA2_Deauthentication/).

#### **2. Attacchi a Dizionario Offline**

In modalità WPA2-PSK, la cattura del 4-Way Handshake — nello specifico dei **Messaggi 1 e 2** — consente a un attaccante di tentare di indovinare la password offline.

L'attaccante utilizza:
- Una password candidata estratta da un dizionario (es. `rockyou.txt`)
- `ANonce`
- `SNonce`
- Gli indirizzi MAC di AP e STA
- Il `MIC` catturato nel Messaggio 2

Per ciascuna passphrase candidata:
1. Deriva la PMK tramite `PBKDF2`.
2. Deriva la PTK.
3. Calcola il MIC.
4. Confronta il MIC calcolato con quello catturato nel Messaggio 2.

Se i due MIC coincidono, la password individuata è corretta.

Questo attacco non viola la cifratura AES né il protocollo di handshake in sé, ma sfrutta segreti (passphrase) a bassa entropia.

Approfondisci nel progetto: [WPA2 Deauthentication](/projects/WPA2_Deauthentication/).

#### **3. Attacchi basati su PMKID**

Un'evoluzione dell'attacco a dizionario consente di catturare il **PMKID** direttamente dal primo scambio EAPOL, senza dover attendere o forzare un intero 4-Way Handshake con un client connesso.

Ciò riduce la complessità operativa per l'attaccante ed espone maggiormente le reti configurate con password deboli.  
Purtroppo viene inviato raramente dagli AP moderni e non mi è mai capitato di rilevarlo nei miei test.

#### **4. Evil Twin AP**

**Modello di minaccia:**  
Un attaccante tenta di prendere il controllo di una sessione attiva tra una STA legittima e un AP.

L'inclusione di entrambi gli indirizzi MAC nella derivazione della PTK lega la chiave di sessione a una specifica coppia di dispositivi, impedendo a una terza parte di riutilizzare un handshake catturato per derivare chiavi valide per un altro dispositivo.

Tuttavia, il dirottamento può comunque avvenire a livelli superiori se:
- L'attaccante forza la disconnessione (tramite deautenticazione).
- L'attaccante attiva un **Evil Twin AP** con lo stesso SSID.
- Il client si riconnette automaticamente all'AP malevolo.

In questo caso il protocollo non viene violato dal punto di vista crittografico, ma viene sfruttato il modello di fiducia del livello wireless.

Approfondisci con il progetto [Shadow Apple](/projects/Shadow_Apple/) e [Bruce Firmware](https://bruce.computer).

#### **5. Replay Attacks (KRACK)**

La protezione contro gli attacchi di replay si basa su:
- Univocità dei nonce
- Contatori di replay nei frame EAPOL-Key
- Corretta logica di installazione delle chiavi

Se i replay counter vengono applicati rigorosamente e i nonce non vengono mai riutilizzati, i messaggi di handshake ritrasmessi vengono scartati.

Tuttavia, vulnerabilità come **KRACK (Key Reinstallation Attack)** hanno dimostrato che alcune implementazioni:
- Accettavano un Messaggio 3 ritrasmesso.
- Reinstallavano la stessa chiave di sessione.
- Azzeravano i contatori dei nonce / numeri di pacchetto (*packet number*).

Ciò violava un requisito crittografico fondamentale:
> I nonce non devono mai ripetersi sotto la stessa chiave di cifratura.

Il riutilizzo del nonce può portare a:
- Riutilizzo del *keystream* in modalità CCMP
- Decifratura dei pacchetti
- Falsificazione (*forgery*) dei pacchetti in determinate condizioni

Questa vulnerabilità dipendeva dalle singole implementazioni client, ma ha messo in luce la fragilità strutturale del protocollo.

---

### **Considerazioni Difensive**

- Abilitare i **Protected Management Frames (PMF / 802.11w)** quando supportati.
- Utilizzare passphrase robuste e ad alta entropia.
- Preferire lo standard **WPA3** quando disponibile.
- Monitorare la rete per individuare attività anomale di deautenticazione.

Per ulteriori approfondimenti sulla sicurezza WPA, consiglio vivamente di consultare il [profilo GitHub di Mathy Vanhoef](https://github.com/vanhoefm), professore di Informatica presso la @KU_Leuven (Belgio), scopritore di **KRACK** e **FragAttacks** nonché ricercatore di riferimento nel campo della sicurezza wireless.