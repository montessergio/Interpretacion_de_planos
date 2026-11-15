---
title: "5.2 Tolerancias ISO para agujeros"
description: "Desviaciones fundamentales de agujeros A–ZC, regla especial de Δ y tabla de clases usuales."
---

## Cómo se obtienen las desviaciones de un agujero

1. **Letras A a H:** la desviación fundamental es la **inferior (EI)**, y es el opuesto de la del eje con la misma letra: EI(G) = −es(g). **H** vale cero.
2. **JS:** zona simétrica ±IT/2. Para IT7–IT11, si IT es impar se usa el par inmediato inferior (IT7 = 21 µm → JS7 = ±10 µm).
3. **Letras J a ZC:** la desviación fundamental es la **superior (ES)**. Regla general: ES = −ei del eje con la misma letra.
4. **Regla especial (Δ):** para K, M y N hasta IT8 y para P a ZC hasta IT7, ES = −ei + Δ, con **Δ = ITn − IT(n−1)**. Esto asegura que H7/p6 y P7/h6 den el mismo apriete.
5. La otra desviación sale de la tolerancia: EI = ES − IT (o ES = EI + IT).

**Ejemplo resuelto: Ø25 K7.** k tiene ei = +2 µm en 18–30 mm. Δ = IT7 − IT6 = 21 − 13 = 8 µm. ES = −2 + 8 = **+6 µm**; EI = 6 − 21 = **−15 µm**.

## Desviaciones de clases usuales (µm, ES / EI)

| Clase | Ø10 | Ø25 | Ø50 | Ø100 |
|:---|---:|---:|---:|---:|
| **H6** | +9 / 0 | +13 / 0 | +16 / 0 | +22 / 0 |
| **H7** | +15 / 0 | +21 / 0 | +25 / 0 | +35 / 0 |
| **H8** | +22 / 0 | +33 / 0 | +39 / 0 | +54 / 0 |
| **H9** | +36 / 0 | +52 / 0 | +62 / 0 | +87 / 0 |
| **H11** | +90 / 0 | +130 / 0 | +160 / 0 | +220 / 0 |
| **G7** | +20 / +5 | +28 / +7 | +34 / +9 | +47 / +12 |
| **F8** | +35 / +13 | +53 / +20 | +64 / +25 | +90 / +36 |
| **E9** | +61 / +25 | +92 / +40 | +112 / +50 | +159 / +72 |
| **D9** | +76 / +40 | +117 / +65 | +142 / +80 | +207 / +120 |
| **JS7** | +7 / −7 | +10 / −10 | +12 / −12 | +17 / −17 |
| **K7** | +5 / −10 | +6 / −15 | +7 / −18 | +10 / −25 |
| **N7** | −4 / −19 | −7 / −28 | −8 / −33 | −10 / −45 |
| **P7** | −9 / −24 | −14 / −35 | −17 / −42 | −24 / −59 |

🟡 Valores calculados con [el núcleo de datos del repositorio](../05-tablas-de-referencia/) y verificados con valores de referencia; confirme en ISO 286-2:2010 antes de fabricar.

## Lectura práctica

- **H7** es la base del taller: 0 / +IT7 (Ø25: 0 / +21).
- **JS** y **K** se usan donde el agujero debe ubicar sin ser prensado.
- **N** y **P** dan interferencia con ejes h (sistema eje base).
- Los agujeros con grado **IT7–IT8** son habituales con brocas y escariadores; IT6 requiere mandrinado o bruñido.
