---
title: "3.1 Introducción a las tolerancias"
description: "Terminología ISO y ASME, tipos de tolerancia, tolerancias generales ISO 2768-1, principio de independencia y envolvente, costo y capacidad de proceso."
---

## ¿Por qué tolerar?

Ninguna pieza se fabrica exactamente a su tamaño nominal. La tolerancia fija **cuánta variación es aceptable** para que la pieza funcione y se ensamble (intercambiabilidad). Tolerancias más estrechas cuestan más (procesos más finos, más inspección, más desecho): el costo crece rápido al reducir la tolerancia.

## Terminología

| Concepto | ISO (286-1) | ASME (Y14.5) |
|---|---|---|
| Tamaño de diseño | Tamaño nominal | Tamaño básico |
| Límites | Tamaño máximo / mínimo | Límite superior / inferior |
| Diferencia respecto del nominal | Desviación superior ES (agujero), es (eje); inferior EI, ei | Desviación |
| Zona permitida | **Tolerancia** = máx − mín | **Tolerancia** (total) |
| Condiciones de material | — (en GPS: máximo/mínimo material) | **MMC** (agujero: mínimo; eje: máximo) · **LMC** |
| Diferencia entre piezas que ajustan | Holgura / apriete | **Allowance** = holgura mínima o apriete máximo |

## Formas de expresar una tolerancia

| Forma | Ejemplo | Lectura |
|---|---|---|
| Bilateral simétrica | 25 ± 0.1 | 24.9 a 25.1 |
| Bilateral asimétrica | 25 +0.2 / −0.1 | 24.9 a 25.2 |
| Unilateral | 25 +0.021 / 0 | 25.000 a 25.021 |
| Por límites | 25.021 / 25.000 | Los dos límites directamente |
| Clase ISO | Ø25 H7 | Ver [Módulo 5](../../modulo-05-ajustes-iso/) |
| General (por nota) | ISO 2768-m | Aplica a cotas sin tolerancia propia |

## Tolerancias generales ISO 2768-1

Evitan tolerar cada cota. Clases: **f** (fina), **m** (media), **c** (gruesa), **v** (muy gruesa). Se indica en el cajetín: «ISO 2768-m».

| Tamaño nominal (mm) | f | m | c | v |
|---|---|---|---|---|
| 0.5 – 3 | ±0.05 | ±0.1 | ±0.2 | — |
| >3 – 6 | ±0.05 | ±0.1 | ±0.3 | ±0.5 |
| >6 – 30 | ±0.1 | ±0.2 | ±0.5 | ±1 |
| >30 – 120 | ±0.15 | ±0.3 | ±0.8 | ±1.5 |
| >120 – 400 | ±0.2 | ±0.5 | ±1.2 | ±2.5 |
| >400 – 1000 | ±0.3 | ±0.8 | ±2 | ±4 |
| >1000 – 2000 | ±0.5 | ±1.2 | ±3 | ±6 |
| >2000 – 4000 | — | ±2 | ±4 | ±8 |

Radios y chaflanes exteriores: 0.5–3 mm: ±0.2 (f, m) / ±0.4 (c, v); >3–6: ±0.5 / ±1; >6: ±1 / ±2.

Ángulos (según la longitud del lado menor): hasta 10 mm: ±1° (f, m), ±1°30′ (c), ±3° (v); >10–50: ±0°30′ (f, m), ±1° (c), ±2° (v); >50–120: ±0°20′, ±0°30′, ±1°; >120–400: ±0°10′, ±0°15′, ±0°30′; >400: ±0°5′, ±0°10′, ±0°20′.

:::caution[Estado de verificación]
Valores 🟡 (tabla ampliamente publicada; norma de pago). **Vigencia:** ISO 2768-1:1989 sigue vigente (confirmada en 2022), pero una nueva **ISO 2768** de una sola parte (tamaños lineales y angulares) aparecía «bajo publicación» en junio de 2026 y reemplazaría a ISO 2768-1:1989. ⚠️ Compruebe en el catálogo de ISO si ya se publicó y qué cambia antes de citarla en un plano nuevo. Las tolerancias geométricas generales de ISO 2768-2 fueron sustituidas por ISO 22081:2021.
:::

## Principio de independencia y principio de envolvente

- **ISO (por defecto, ISO 8015):** cada requisito se cumple de forma **independiente**: el tamaño no controla la forma salvo que se indique la envolvente.
- **ASME Y14.5 (Regla n.º 1):** para elementos de tamaño regulares, **la forma queda controlada por los límites de tamaño**: no puede salir de la envolvente de forma perfecta a MMC (a menos que se use el símbolo de independencia).

Esta diferencia explica por qué un mismo plano puede inspeccionarse distinto según la norma citada.

## Temperatura de referencia

Las dimensiones se especifican a **20 °C (68 °F)**. Medir a otra temperatura requiere corrección: ΔL = α · L · ΔT. Para acero (α ≈ 11.5 × 10⁻⁶ /K), una pieza de 500 mm medida a 25 °C crece 500 × 11.5 × 10⁻⁶ × 5 ≈ **0.029 mm**.

## Tolerancia, costo y capacidad de proceso

La **capacidad de proceso** compara la tolerancia con la variación del proceso (σ):

- **Cp = (LSE − LIE) / 6σ**: ¿cabe la dispersión en la tolerancia?
- **Cpk = mín[(LSE − μ)/3σ, (μ − LIE)/3σ]**: además considera el centrado.

Criterios usuales en la industria: **Cpk ≥ 1.33** para procesos estables y ≥ 1.67 para características críticas o validación inicial (🟡; el cliente define el criterio).

**Ejemplo.** Eje Ø25 h6 (0 / −0.013): LSE = 25.000, LIE = 24.987. Proceso: μ = 24.994, σ = 0.0018. Cp = 0.013 / 0.0108 = **1.20**; Cpk = mín[0.006/0.0054; 0.007/0.0054] = mín[1.11; 1.30] = **1.11**: el proceso no cumple Cpk 1.33; hay que centrarlo o reducir la variación.
