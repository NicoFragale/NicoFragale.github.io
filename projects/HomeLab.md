---
layout: page
title: Home Lab (Proxmox) 🦇
permalink: /projects/HomeLab/
---

## Indice
* Placeholder
{:toc}

Questo progetto nasce con l'obiettivo di costruire un **Home Lab** personale partendo dal recupero di hardware già in mio possesso: un vecchio PC portatile riconvertito in un nodo server dedicato.

Al momento il sistema è nella sua fase iniziale: ho completato l'installazione e la configurazione di base di **Proxmox VE**.

---

## Obiettivi del Progetto e Servizi Pianificati

L'idea alla base di questo laboratorio domestico è riprendere il controllo sui propri dati, ridurre la dipendenza da servizi cloud di terze parti e fare pratica concreta con l'amministrazione di sistemi, il networking e la sicurezza delle infrastrutture iniziando ad installare servizi come: Pi-hole, Jellyfin e Immich, il tutto accessibile da remoto tramite VPN

---

## Cos'è Proxmox VE e come funziona un Hypervisor

Per gestire tutti questi servizi su una singola macchina fisica senza creare conflitti tra dipendenze, librerie o configurazioni di rete, il cuore del sistema è **Proxmox Virtual Environment (Proxmox VE)**,
un **Hypervisor di Tipo 1 (Bare-Metal)** basato su **Debian Linux** che si interpone tra l'hardware fisico e i sistemi operativi, permettendo di astrarre e suddividere le risorse della macchina (CPU, RAM, storage e schede di rete) in più ambienti virtuali indipendenti.
