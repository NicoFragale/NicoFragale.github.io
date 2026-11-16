---
layout: page
title: Bruce 🦈
permalink: /projects/Bruce/
---

[Bruce Firmware (v1.13)](https://bruce.computer) è un firmware multiuso progettato per la sperimentazione wireless e l'analisi delle radiofrequenze tramite dispositivi hardware compatti.

Ho installato Bruce sul mio **C1101 Plus**, un dispositivo portatile progettato per la sperimentazione radio basato su:

- **ESP32-S3** – ricetrasmettitore sub-GHz utilizzato per molti dispositivi nella banda ISM
- **NRF24L01** – ricetrasmettitore a 2.4 GHz ampiamente utilizzato nelle comunicazioni wireless a basso consumo
- interfacce hardware aggiuntive a seconda della configurazione del dispositivo

Segui questo [link](https://lilygo.cc/en-us/products/t-embed-cc1101-plus?srsltid=AfmBOorgC1g1iTq5aulf6SSfiIF4HyQerCXGnMwhzie0mKJBW7ovnXFg) se vuoi saperne di più!

Un altro dispositivo hardware in mio possesso compatibile con questo firmware è l'**M5StickC Plus2**.

---

## Primo Modulo: NRF24L01

<img src="https://nicofragale.github.io/assets/images/menu0.png" alt="NRF24" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);  />

Il primo modulo che voglio introdurre è l'**NRF24L01**, un popolare chip ricetrasmettitore a 2.4 GHz sviluppato da Nordic Semiconductor.

<img src="https://nicofragale.github.io/assets/images/modulo.png" alt="modulo" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); />

Come mostrato nell'immagine qui sopra, il modulo è dotato di un'**antenna integrata molto piccola**.  

<img src="https://nicofragale.github.io/assets/images/modulo1.png" alt="modulo1" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); />

Per testarne le capacità, ho eseguito un semplice esperimento in casa utilizzando un **iPhone collegato a uno speaker Bluetooth**.

Attivando il modulo NRF24L01 e posizionandomi **tra i due dispositivi**, l'interferenza generata dal trasmettitore è stata sufficiente a disturbare il canale di comunicazione; in questa situazione lo speaker interrompeva temporaneamente la riproduzione audio oppure la musica risultava sensibilmente distorta.

Tuttavia, allontanandomi dalla linea di comunicazione e posizionandomi **dietro lo speaker o dietro il telefono**, l'effetto di interferenza scompariva e la trasmissione audio continuava normalmente.

### Potenziamento dell'Antenna

Al fine di migliorare le capacità di ricezione e trasmissione del modulo, ho deciso di modificare il dispositivo sostituendo l'**antenna integrata** con una esterna acquistata su AliExpress.

Per farlo, ho aperto con attenzione i fori sul retro del dispositivo:

<img src="https://nicofragale.github.io/assets/images/c1antenna.png" alt="antenna" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); />

Dopo aver installato la nuova antenna, ho ripetuto lo stesso esperimento descritto in precedenza e i risultati hanno mostrato un **leggero miglioramento nel raggio di interferenza**, sebbene la differenza non sia stata significativa quanto sperato. Il disturbo del segnale si verifica ancora quando ci si posiziona tra i due dispositivi, ma l'impatto complessivo rimane relativamente limitato.

Ci sono diverse possibili spiegazioni per questo comportamento:

- la **potenza di trasmissione in uscita del modulo NRF24L01** è relativamente bassa  
- l'antenna acquistata potrebbe non essere **correttamente tarata (tuned) per i 2.4 GHz**
- il **design RF interno del dispositivo o l'adattamento di impedenza** potrebbero limitare l'efficacia dell'antenna
- il Bluetooth utilizza il **frequency hopping** (salto di frequenza), che rende più difficile mantenere un'interferenza continua
