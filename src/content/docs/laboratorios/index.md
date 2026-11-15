---
title: "Laboratorios interactivos"
description: "Calculadoras, visores 3D y herramientas interactivas del material, con su tecnología, archivos fuente y limitaciones."
---

Los laboratorios funcionan **en el navegador** (sitio estático): sin instalación y sin enviar datos a ningún servidor. Vea [requisitos y limitaciones](../guia/03-modelos-interactivos/).

| Laboratorio | Módulo | Tecnología |
|---|---|---|
| [Calculadora de ajustes ISO 286](./calculadora-iso286/) | Módulo 5 | JavaScript puro (módulo ES) + SVG |
| [Vistas ortogonales: modelo 3D y vistas](./vistas-ortogonales/) | Módulo 1 | three |
| [Vista explosionada y lista de materiales](./explosionada-bom/) | Módulo 1 | three |
| [Laboratorio de rugosidad](./rugosidad/) | Módulo 4 | JavaScript puro + `<canvas>` |
| [GD&T: posición con MMC y sujetadores](./gdt-posicion/) | Módulo 6 | JavaScript puro + SVG; lógica en `public/labs/_shared/gdt-core |
| [Convertidor métrico–inglés](./convertidor-unidades/) | Módulo 3 | JavaScript puro; lógica en `public/labs/_shared/conversion-core |
| [Quiz de repaso](./quiz/) | Todos | JavaScript puro con bancos de preguntas en JSON (`bancos/indice |
| [Visor de modelos glTF / GLB](./visor-glb/) | Modelos 3D | three |

:::tip[Cada laboratorio es independiente]
Están en `public/labs/<nombre>/`; puede abrirlos solos y reutilizarlos. Su lógica de cálculo está separada en `public/labs/_shared/` y tiene pruebas automáticas.
:::
