---
layout: page
title: WPA2 Deauthentication 👾
permalink: /projects/WPA2_Deauthentication/
---

* Placeholder
{:toc}

### ** Panoramica del Progetto**

Questo progetto descrive le fasi necessarie per valutare la sicurezza della mia rete Wi-Fi in un ambiente controllato.

L'obiettivo era comprendere come si comporta nella pratica la sicurezza WPA2-PSK e come il *4-Way Handshake* possa essere sfruttato per l'auditing offline delle password.

L'analisi è stata eseguita utilizzando gli strumenti della suite [Aircrack-ng](/notes/network-security/Aircrack-ng/) e l'attacco è stato riprodotto con successo contro la mia Smart TV, mentre dispositivi più moderni come il mio iPhone non hanno risposto allo stesso modo.

Se non hai familiarità con il 4-Way Handshake di WPA2, puoi consultare la spiegazione dettagliata [qui](/notes/network-security/wpa2-4way-handshake/).


### ** 1. Ricognizione e Mappatura dell'Ambiente (Osservazione Passiva)**

La prima fase consiste nell'osservare l'ambiente wireless circostante.

L'obiettivo è identificare:

- SSID  
- BSSID (indirizzo MAC dell'Access Point)  
- Canale e banda di frequenza  
- Intensità del segnale  
- Configurazione di sicurezza (WPA2-PSK, WPA2-Enterprise, supporto PMF)  
- Tipo di cifratura  
- Dispositivi client attivi  

Questo richiede un'interfaccia wireless in grado di operare in **monitor mode**, che consente di catturare frame IEEE 802.11 grezzi a Livello 2 (Data Link), inclusi:

- Management frame  
- Control frame  
- Data frame  
- Frame non indirizzati direttamente al dispositivo locale  

A differenza della *managed mode*, la *monitor mode* osserva passivamente tutto il traffico wireless presente nell'etere.

<img src="https://nicofragale.github.io/assets/images/monitor.png" alt="monitor" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" />

Nel mio setup di laboratorio ho utilizzato i seguenti adattatori esterni compatibili: **TL-WN722N v1** e **AWUS036AXML**.

Infine, consiglio l'utilizzo di **Airgraph-ng** per visualizzare graficamente e comprendere meglio le relazioni tra gli access point e le relative stazioni associate.

<img src="https://nicofragale.github.io/assets/images/airodump.png" alt="airodump" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" />


### ** 2. Innesco della Riassociazione e Cattura dell'Handshake**

Il *4-Way Handshake* avviene ogni volta che un client si connette o si riconnette a un access point.

Nelle configurazioni WPA2 legacy prive di *Protected Management Frames* (standard **802.11w**), è possibile indurre un evento di riconnessione tramite **Aireplay-ng** inviando frame di deautenticazione al dispositivo target; quando ciò accade, l'interfaccia in monitor mode può catturare l'handshake salvandolo in un file `.pcap` contenente i frame **EAPOL-Key** scambiati tra l'AP e il client.

I dispositivi moderni, come gli smartphone recenti, implementano spesso protezioni aggiuntive che impediscono riconnessioni forzate o ignorano i *management frame* non autenticati.

<img src="https://nicofragale.github.io/assets/images/aireplay.png" alt="aireplay" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" />


### ** 3. Ispezione del Protocollo con Wireshark**

Il traffico catturato può essere analizzato tramite **Wireshark**: filtrando per i frame `eapol` è possibile osservare i 4 messaggi dell'handshake.

Particolare attenzione va posta sui **Messaggi 1 e 2**, poiché contengono i parametri necessari (ANonce e SNonce) per la generazione della *Pairwise Transient Key* (PTK).

<img src="https://nicofragale.github.io/assets/images/wireshark.png" alt="wireshark" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" />


### ** 4. Verifica Offline della Password**

Per ciascuna passphrase candidata presente nel dizionario (ad esempio `rockyou.txt`):

1. Viene derivata la **PMK** (*Pairwise Master Key*) utilizzando la funzione **PBKDF2**.
2. Viene derivata la **PTK** (*Pairwise Transient Key*) combinando la PMK con i nonce e gli indirizzi MAC catturati.
3. Viene ricalcolato il **MIC** (*Message Integrity Code*).
4. Il MIC calcolato viene confrontato con quello presente nei frame catturati.

Se i due valori coincidono, la passphrase individuata è corretta.

Questo processo non viola la cifratura AES in sé, ma sfrutta la bassa entropia di passphrase deboli.

<img src="https://nicofragale.github.io/assets/images/aircrack1.png" alt="aircrack1" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" />

<img src="https://nicofragale.github.io/assets/images/aircrack2.png" alt="aircrack2" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" />

L'esperimento ha confermato che l'utilizzo di password robuste e ad alta entropia è essenziale per garantire la sicurezza delle reti WPA2-PSK.