---
title: "Ejercicios y casos prácticos"
description: "Ejercicios con solución del Módulo 3: conversiones, tolerancias generales, acumulación, Cp y Cpk."
sidebar:
  order: 90
---

### Ejercicio 1 · Conversión sin ampliar tolerancia

La cota .500 ±.005 in debe pasar a milímetros. Calcule los límites y exprese la tolerancia en mm sin ampliarla.

<details><summary>Ver solución</summary>

Nominal = 0.500 × 25.4 = **12.70 mm**. Tolerancia = ±0.005 × 25.4 = ±0.127 mm. Límites exactos: 12.573 y 12.827 mm. Para no ampliar: ±0.12 mm → **12.70 ±0.12** (12.58 – 12.82).

</details>

### Ejercicio 2 · Tolerancias generales

Un plano dice «ISO 2768-m» y las cotas sin tolerancia son 18, 45, 250 y 1200 mm. ¿Qué tolerancia aplica a cada una?

<details><summary>Ver solución</summary>

18 (>6–30) → ±0.2 mm · 45 (>30–120) → ±0.3 mm · 250 (>120–400) → ±0.5 mm · 1200 (>1000–2000) → ±1.2 mm.

</details>

### Ejercicio 3 · Acumulación

Una carcasa de 80 ±0.15 aloja piezas de 30 ±0.05, 20 ±0.05 y 25 ±0.10 mm. Calcule la holgura nominal, la tolerancia por peor caso y por RSS.

<details><summary>Ver solución</summary>

Holgura nominal = 80 − (30 + 20 + 25) = **5 mm**. Peor caso: 0.15 + 0.05 + 0.05 + 0.10 = ±0.35 → 4.65 a 5.35. RSS: √(0.0225 + 0.0025 + 0.0025 + 0.01) = √0.0375 = ±0.194 → 4.81 a 5.19.

</details>

### Ejercicio 4 · Cp y Cpk

Un diámetro Ø20 ±0.02 tiene μ = 20.006 y σ = 0.005. Calcule Cp y Cpk e interprete.

<details><summary>Ver solución</summary>

Cp = 0.04 / (6 × 0.005) = **1.33**. Cpk = mín[(20.02 − 20.006)/0.015; (20.006 − 19.98)/0.015] = mín[0.933; 1.733] = **0.93**. La dispersión cabe, pero el proceso está descentrado hacia el límite superior: centrarlo en 20.000 llevaría Cpk a 1.33.

</details>

### Ejercicio 5 · Cadena frente a referencia

Una pieza tiene cuatro escalones cada uno con ±0.05 mm. ¿Cuál es la tolerancia del cuarto escalón respecto de la cara de referencia si se acota en cadena? ¿Y desde referencia?

<details><summary>Ver solución</summary>

En cadena (peor caso): 4 × 0.05 = **±0.20 mm**. Desde referencia: **±0.05 mm**.

</details>

### Caso práctico · Revisión de un plano

Tome un plano real o de práctica y revise: (1) ¿declara unidades y tolerancia general? (2) ¿hay cadenas cerradas? (3) ¿qué cotas son críticas para la función y cuáles son sólo informativas? Entregue una lista de observaciones priorizadas.
