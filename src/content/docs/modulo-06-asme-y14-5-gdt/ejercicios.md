---
title: "Ejercicios y casos prácticos"
description: "Ejercicios con solución del Módulo 6: lectura de marcos, bonus, sujetadores, Regla n.º 1 y condición virtual."
sidebar:
  order: 90
---

Use el [laboratorio de GD&T](../../laboratorios/gdt-posicion/) para comprobar sus cálculos.

### Ejercicio 1 · Leer un marco

Interprete: `⌖ | Ø0.3 Ⓜ | A | B | C`.

<details><summary>Ver solución</summary>

**Posición** de un elemento de tamaño; zona de tolerancia cilíndrica de **Ø0.3** en condición de máximo material; respecto del sistema de referencias A (primaria), B (secundaria) y C (terciaria). Con Ⓜ hay bonus al alejarse el tamaño del MMC.

</details>

### Ejercicio 2 · Grados de libertad

Una pieza se apoya en una cara (A), contra dos puntos de una arista (B) y contra un punto de otra arista (C). ¿Cuántos grados de libertad se restringen y cuáles?

<details><summary>Ver solución</summary>

A (3 puntos): 3 grados (1 traslación + 2 rotaciones). B (2 puntos): 2 (1 traslación + 1 rotación). C (1 punto): 1 traslación. Total **6**: la pieza queda totalmente referenciada.

</details>

### Ejercicio 3 · Bonus y dictamen

Agujero Ø8.0 – 8.1 con posición Ø0.2 Ⓜ. Un agujero real mide 8.06 y su centro está desviado (0.08, 0.09). ¿Conforme?

<details><summary>Ver solución</summary>

Bonus = 8.06 − 8.0 = 0.06 → admisible Ø0.26. Desviación = 2 √(0.08² + 0.09²) = 2 × 0.1204 = Ø0.241 ≤ 0.26 → **conforme**.

</details>

### Ejercicio 4 · Sujetadores

Tornillo M10 con agujero de paso medio de 11 mm (ISO 273). Calcule la tolerancia de posición para montaje flotante y fijo.

<details><summary>Ver solución</summary>

Flotante: T = 11 − 10 = **1.0 mm**. Fijo: T = (11 − 10)/2 = **0.5 mm** por pieza.

</details>

### Ejercicio 5 · Regla n.º 1

Un eje Ø20 ±0.05 no lleva tolerancia de forma. Su tamaño local real es 19.97 mm. ¿Cuánto puede curvarse (rectitud) sin salir de la envolvente?

<details><summary>Ver solución</summary>

La envolvente a MMC es Ø20.05. Margen de forma = 20.05 − 19.97 = **0.08 mm**. (A MMC, 20.05, la forma debe ser perfecta.)

</details>

### Ejercicio 6 · Condición virtual

Pasador Ø10.0 – 10.1 con perpendicularidad Ø0.05 Ⓜ. ¿Cuál es la condición virtual y para qué sirve?

<details><summary>Ver solución</summary>

Elemento externo: VC = MMC + tolerancia = 10.1 + 0.05 = **10.15 mm**. Es el tamaño del agujero perfecto mínimo en el que el pasador siempre entra: sirve para calcular el agujero compañero.

</details>

### Caso práctico · Plano de brida

Se necesita acoplar dos bridas con cuatro tornillos M8 en círculo de 60 mm. Defina: referencias (qué superficies y por qué), marco de posición para los agujeros (con Ⓜ o RFS y valor) y compruebe con la calculadora. Redacte la justificación funcional en tres líneas.
