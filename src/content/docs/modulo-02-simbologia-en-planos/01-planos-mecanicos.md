---
title: "2.1 Planos mecánicos"
description: "Símbolos de cota, designación de roscas, agujeros, chaflanes, notas de material y tratamientos, y representación simplificada de elementos normalizados."
---

## Símbolos de acotación y de elemento

| Símbolo / abreviatura | Significado | Ejemplo | Nota |
|---|---|---|---|
| Ø | Diámetro | Ø25 | ISO y ASME |
| R · SR | Radio · radio esférico | R3 · SR10 | ISO y ASME |
| SØ | Diámetro esférico | SØ12 | ISO y ASME |
| □ | Perfil cuadrado | □20 | ISO y ASME |
| 4× (ISO) · 4X (ASME) | Número de elementos iguales | 4× Ø6 | Cuente y no repita cotas |
| ↧ | Profundidad | Ø8 ↧15 | Símbolo de ASME Y14.5; ISO 129-1 admite equivalentes ⚠️ |
| ⌴ · ⌵ | Abocardado (o planeado) · avellanado | ⌴ Ø14 ↧9 | Símbolos de ASME Y14.5 ⚠️ |
| THRU / pasante | Atraviesa toda la pieza | Ø6 THRU | Nota de ASME |
| REF o ( ) | Cota de referencia (informativa) | (25) | No se inspecciona por sí sola |
| 2×45° | Chaflán a 45° de 2 mm de lado | 2×45° | ISO y ASME |

## Designación de roscas

**Métrica ISO (serie gruesa por omisión):** `M10` equivale a paso 1.5 mm; la serie fina se indica `M10×1.25`. Se completa con la clase de tolerancia: `M10×1.25-6g/6H` (6g tornillo, 6H tuerca).

| Rosca | M3 | M4 | M5 | M6 | M8 | M10 | M12 | M16 | M20 |
|---|---|---|---|---|---|---|---|---|---|
| Paso grueso (mm) | 0.5 | 0.7 | 0.8 | 1 | 1.25 | 1.5 | 1.75 | 2 | 2.5 |
| Broca de machuelo ≈ d − p (mm) | 2.5 | 3.3 | 4.2 | 5.0 | 6.8 | 8.5 | 10.2 | 14 | 17.5 |

**Unificada (ASME B1.1):** `1/4-20 UNC-2A` = diámetro nominal ¼ in, 20 hilos por pulgada, serie gruesa, clase 2A (externa; 2B interna). Paso = 1/20 in = 1.27 mm.

:::caution[Verificación]
Pasos de la serie gruesa: recalculados y coherentes con ISO 724; no se verificó hoy la edición vigente de ISO 261/724/965-1 ni de ASME B1.1 (⚠️).
:::

## Agujeros de paso para tornillos (ISO 273)

| Rosca | M4 | M5 | M6 | M8 | M10 | M12 |
|---|---|---|---|---|---|---|
| Serie fina (mm) | 4.3 | 5.3 | 6.4 | 8.4 | 10.5 | 13 |
| Serie media (mm) | 4.5 | 5.5 | 6.6 | 9 | 11 | 13.5 |
| Serie gruesa (mm) | 4.8 | 5.8 | 7 | 10 | 12 | 14.5 |

Se usan en la [calculadora de GD&T](../../laboratorios/gdt-posicion/) para calcular tolerancias de posición de sujetadores. ⚠️ (edición de ISO 273 por verificar).

## Material, tratamiento y recubrimiento

El plano debe decir **qué, cómo y dónde**: material (p. ej. “acero 1045”), tratamiento (“temple y revenido a 28–32 HRC”), recubrimiento y especificación aplicable, y en qué zonas. Las notas deben ser comprobables: indique método, valor y zona de verificación.

## Elementos normalizados

Rodamientos, resortes, engranes, tornillos y pasadores se dibujan en **representación simplificada** y se identifican por designación normalizada en la lista de materiales (p. ej. “Rodamiento 6205, ISO 15”; “Tornillo hexagonal M8×30, ISO 4017, clase 8.8”). Las normas de representación simplificada (ISO 2203, 2162, 8826 y similares) ⚠️ no se verificaron hoy.

## Referencias cruzadas

- Textura superficial → [Módulo 4](../../modulo-04-rugosidad-y-acabados/).
- Tolerancias y ajustes → [Módulos 3](../../modulo-03-dimensionamiento-y-tolerancias/) y [5](../../modulo-05-ajustes-iso/).
- GD&T → [Módulo 6](../../modulo-06-asme-y14-5-gdt/).
