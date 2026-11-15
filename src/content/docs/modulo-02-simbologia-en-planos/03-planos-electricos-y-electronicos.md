---
title: "2.3 Planos eléctricos y electrónicos"
description: "Unifilares, esquemáticos, de conexión y de escalera; símbolos IEC y ANSI; lectura de un circuito de arranque y paro."
---

## Tipos de documento

| Documento | Muestra | Uso |
|---|---|---|
| Diagrama unifilar | Distribución de potencia con una línea por circuito | Ingeniería eléctrica, protecciones |
| Esquemático (funcional) | Cómo funciona el circuito | Diseño y diagnóstico |
| De conexiones (alambrado) | Terminales, borneras y conductores reales | Armado y mantenimiento de tableros |
| De escalera (ladder) | Lógica de control entre dos rieles | Control industrial, PLC |
| De distribución (layout) | Ubicación de equipos y canalizaciones | Instalación |

## Símbolos: IEC frente a ANSI

| Elemento | IEC 60617 | ANSI (práctica en EE. UU.) |
|---|---|---|
| Resistor | Rectángulo | Zigzag |
| Contacto normalmente abierto (NA) | Interruptor abierto | Dos líneas verticales `┤├` |
| Contacto normalmente cerrado (NC) | Interruptor cerrado | `┤/├` (con diagonal) |
| Bobina de relevador/contactor | Rectángulo (A1/A2) | Círculo |
| Fusible | Rectángulo con línea | Curva en S |
| Motor | Círculo con M | Círculo con M |

Los símbolos oficiales de IEC se consultan en la base de datos IEC 60617 (⚠️ edición vigente por verificar). Para tableros de máquinas, la práctica internacional se basa en IEC 60204-1 y, en EE. UU., en NFPA 79 (⚠️).

**Designaciones de referencia (IEC 81346-2):** K relevador/contactor, Q aparato de potencia (interruptor), F protección (fusible, térmico), M motor, S pulsador. ⚠️

## Lectura de un circuito de arranque y paro (escalera)

```text
L1 ──┬─[F1 térmico NC]──┬─[PARO NC]──┬─[ARRANQUE NA]──┬────( KM1 )──── L2
     │                  │            │                │
     │                  │            └─[KM1 NA]───────┘   ← contacto de sellado
```

1. Con el motor parado, **KM1** está desenergizada y su contacto NA abierto.
2. Al pulsar **ARRANQUE**, circula corriente por la bobina KM1: se energiza.
3. El contacto **KM1 NA** se cierra y **sella** el circuito: se puede soltar ARRANQUE.
4. **PARO** o el disparo del térmico **F1** abren el circuito y KM1 se desenergiza.

## Contexto mexicano

Las instalaciones eléctricas de utilización en México se rigen por la NOM-001-SEDE (edición 2018 en la práctica reciente). ⚠️ **No se verificó hoy si hay una edición posterior**: consulte el DOF.

:::note[Buenas prácticas de lectura]
Siga el flujo de energía de izquierda a derecha y de arriba abajo; ubique la **referencia cruzada** de cada contacto con su bobina y verifique la numeración de cables en ambos extremos.
:::
