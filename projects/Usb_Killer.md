---
layout: page
title: USB Killer 🗡️
permalink: /projects/Usb_Killer/
---

Un progetto non particolarmente difficile che ho realizzato in questi giorni è un "USB Killer" (più precisamente un dispositivo **BadUSB / HID**) che non ha "ucciso" nulla, ma ha attivato Windows Defender rilevando una minaccia sul mio computer: lo considero comunque una vittoria.

Per questo progetto è possibile utilizzare un **RP2040** (acquistabile facilmente su AliExpress), un **Raspberry Pi Pico** ufficiale oppure una **USB Rubber Ducky** originale di Hak5.

### **RP2040**

L'**RP2040** è un microcontrollore molto versatile per sistemi embedded e progetti hardware, progettato per controllare e interagire con componenti elettronici come sensori, LED, motori e display, programmabile in **C/C++ o MicroPython**.

<img src="https://nicofragale.github.io/assets/images/rp2040.png" alt="rp2040" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" />

Una delle caratteristiche più interessanti dell'RP2040 è il suo sottosistema **Programmable I/O (PIO)**, che consente agli sviluppatori di implementare interfacce hardware personalizzate direttamente via software — anche se questo aspetto esula dai miei interessi principali per questo test.

### **Come funziona il progetto**

In realtà non ho dovuto fare molto, perché mi è bastato configurare l'RP2040 seguendo [questa guida](https://github.com/dbisu/pico-ducky) per emulare una Rubber Ducky di Hak5 e caricare il payload disponibile [qui](https://github.com/hak5/usbrubberducky-payloads/tree/master/payloads/library/prank/-RD-ADV-RickRoll).

Una volta pronto, ho collegato il dispositivo USB al mio PC Windows per testare il payload.  
Lo script è stato eseguito quasi correttamente, ma il passaggio finale non è andato a buon fine come previsto.

Per verificare se si trattasse solo di un problema temporaneo, ho scollegato il dispositivo e l'ho ricollegato. Tuttavia, al secondo tentativo, Windows Defender ha rilevato immediatamente l'attività sospetta e ha bloccato l'esecuzione del payload USB.

### **Considerazioni Finali**

Sono consapevole che non si tratti di nulla di particolarmente impressionante, dato che si è trattato principalmente di una semplice configurazione, del caricamento del payload e di un test.

Volevo comunque provarlo perché questo genere di tecniche viene spesso citato nei corsi di cybersecurity e ampiamente rappresentato nei film: ero quindi curioso di vedere **come funzionassero realmente nella pratica** e capire in prima persona se realizzare qualcosa del genere fosse difficile o sorprendentemente semplice.