---
title: "3.2 Tolerancias dimensionales"
description: "Límites de tamaño, MMC y LMC, conversión de tolerancias entre pulgadas y milímetros y acumulación de tolerancias en peor caso y RSS."
---

## Tamaño, límites y condiciones de material

Para un **elemento de tamaño** (agujero, eje, ranura, lengüeta):

| | Agujero | Eje |
|---|---|---|
| Condición de **máximo material (MMC)** | Tamaño **mínimo** (menos hueco) | Tamaño **máximo** |
| Condición de **mínimo material (LMC)** | Tamaño **máximo** | Tamaño **mínimo** |

**Ejemplo resuelto.** Agujero Ø10 +0.2 / 0: límites 10.0 y 10.2; tolerancia 0.2; MMC = 10.0; LMC = 10.2. Una medición de 10.15 está dentro de límites (conforme en tamaño).

## Conversión pulgadas ↔ milímetros

1 in = **25.4 mm exactos**; 1 milésima de pulgada (thou, 0.001 in) = **25.4 µm**.

| Tolerancia (in) | mm | µm |
|---|---|---|
| ±.010 | ±0.254 | ±254 |
| ±.005 | ±0.127 | ±127 |
| ±.002 | ±0.0508 | ±50.8 |
| ±.001 | ±0.0254 | ±25.4 |
| ±.0005 | ±0.0127 | ±12.7 |
| ±.0001 | ±0.00254 | ±2.54 |

:::tip[Redondeo]
Al convertir una tolerancia, **no la amplíe** al redondear: ±.005 in = ±0.127 mm se redondea a ±0.12 mm (más estricta) y no a ±0.13 mm. Documente siempre qué sistema es el original.
:::

## Acumulación de tolerancias (stack-up)

**Cadena de dimensiones:** una holgura final depende de varias cotas, cada una con su tolerancia. Hay dos métodos:

- **Peor caso:** suma aritmética de tolerancias. Garantiza el 100 % de intercambiabilidad, pero obliga a tolerancias muy estrechas.
- **RSS (raíz de la suma de cuadrados):** T = √(Σ tᵢ²). Estadístico: supone variaciones independientes y centradas; admite tolerancias mayores con muy poco riesgo.

**Ejemplo.** Una carcasa de 50 ± 0.10 mm aloja tres piezas apiladas de 12 ± 0.05, 25 ± 0.08 y 10 ± 0.05 mm. Holgura nominal = 50 − (12 + 25 + 10) = **3 mm**.

| Método | Tolerancia total | Holgura resultante |
|---|---|---|
| Peor caso | 0.10 + 0.05 + 0.08 + 0.05 = ±0.28 | 2.72 – 3.28 mm |
| RSS | √(0.10² + 0.05² + 0.08² + 0.05²) = √0.0214 = ±0.146 | 2.85 – 3.15 mm |

## Tolerancias típicas de proceso (orientativas)

| Proceso | Grado IT típico | Nota |
|---|---|---|
| Rectificado | IT5 – IT7 | Depende de máquina y tamaño |
| Torneado y fresado de acabado | IT7 – IT9 | Valores usuales de taller |
| Taladrado y mandrinado desbaste | IT10 – IT12 | |
| Fundición en arena | IT13 – IT16 | |

⚠️ Valores **orientativos** de práctica general; use la capacidad real del proceso de su planta (Cpk) y consulte [ajustes ISO](../../modulo-05-ajustes-iso/) para los grados IT.
