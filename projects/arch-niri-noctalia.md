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

<style>
.lightbox {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: zoom-out;
}
.lightbox:target { display: flex; }
.lightbox img {
  max-width: 95vw;
  max-height: 95vh;
  border-radius: 15px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
}
.zoomable { cursor: zoom-in; }
</style>

<a href="#niri-zoom">
  <img class="zoomable" src="https://nicofragale.github.io/assets/images/image.png" alt="Niri" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" />
</a>

<div id="niri-zoom" class="lightbox">
  <a href="#_">
    <img src="https://nicofragale.github.io/assets/images/image.png" alt="niri" />
  </a>
</div>

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