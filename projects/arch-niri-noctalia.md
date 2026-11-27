---
layout: page
title: Arch Linux, niri e Noctalia 🐧
permalink: /projects/arch-niri-noctalia/
---

* Placeholder
{:toc}


Questa pagina descrive il mio setup desktop: **Arch Linux** come base, il compositor
Wayland **niri** come window manager a tiling e **Noctalia** come shell grafica
(barra, launcher e notifiche).

L'obiettivo è avere un ambiente leggero, controllabile da tastiera e configurato
esplicitamente, senza componenti che non ho scelto io.

niri organizza le finestre in colonne disposte su un nastro orizzontale. Aprire una
nuova finestra non ridimensiona quelle esistenti, quindi lo spazio resta sempre
prevedibile. Il file di configurazione è in KDL e tutti i binding sono scritti a mano.

<img src="https://nicofragale.github.io/assets/images/image.png" alt="Niri" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" />

### Installazione base

Su Arch, niri è disponibile nei repository ufficiali:

```bash
sudo pacman -S --needed niri
```

Noctalia non è nei repository ufficiali: si installa dall'AUR con un helper come
`yay` o `paru`. 


### Aggiornamento

Il sistema si aggiorna con il comando standard, che include anche i pacchetti
Wayland e i driver grafici:

```bash
sudo pacman -Syu
```

Prima di aggiornare, controlla le [notizie ufficiali di Arch](https://archlinux.org/news/),
perché alcune modifiche richiedono interventi manuali.

[Perchè ho scelto niri](https://youtu.be/emD20htFfdc)