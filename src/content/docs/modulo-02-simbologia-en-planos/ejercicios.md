---
title: "Ejercicios y casos prácticos"
description: "Ejercicios con solución del Módulo 2: soldadura, tubería, instrumentación, lógica de escalera y señalización."
sidebar:
  order: 90
---

### Ejercicio 1 · Decodificar una nota de soldadura (AWS)

Un símbolo muestra: filete a ambos lados, “6” a la izquierda de cada triángulo, círculo en la unión flecha-referencia, bandera y “GMAW” en la cola. ¿Qué se pide?

<details><summary>Ver solución</summary>

Soldadura de **filete de 6 mm de lado en ambos lados** de la junta, **todo alrededor**, **hecha en campo**, con proceso **GMAW** (en ISO 4063, 135 si es MAG).

</details>

### Ejercicio 2 · z y a

Un filete de lados iguales tiene z = 7 mm. ¿Cuál es la altura de garganta a?

<details><summary>Ver solución</summary>

a = 0.707 × 7 = **4.95 mm ≈ 5 mm**; por eso **a5 ≈ z7**.

</details>

### Ejercicio 3 · Tubería

Para NPS 2 SCH 80 calcule el diámetro interior y la velocidad media para un caudal de 10 L/s (considere flujo incompresible).

<details><summary>Ver solución</summary>

OD 60.3 mm, espesor 5.54 mm → ID = 60.3 − 11.08 = **49.2 mm**. Área = π/4 · (0.0492)² = 1.901 × 10⁻³ m². Q = 0.010 m³/s → v = 0.010 / 1.901 × 10⁻³ ≈ **5.26 m/s**.

</details>

### Ejercicio 4 · Etiquetas ISA

Decodifique **TIC-205**, **PT-101**, **LAH-301** y **FV-102**.

<details><summary>Ver solución</summary>

TIC-205: controlador indicador de temperatura, lazo 205. PT-101: transmisor de presión, lazo 101. LAH-301: alarma de nivel alto, lazo 301. FV-102: válvula de control de flujo, lazo 102.

</details>

### Ejercicio 5 · Lógica de escalera

En el circuito de arranque y paro, ¿qué ocurre si el contacto de sellado KM1 queda soldado (siempre cerrado)? ¿Y si se abre siempre?

<details><summary>Ver solución</summary>

Si queda **siempre cerrado**, el paro seguiría funcionando (abre el circuito) pero, al soltar PARO o restablecer el térmico, la bobina se re-energizaría de inmediato: el motor puede arrancar sin orden (condición peligrosa). Si queda **siempre abierto**, el motor sólo funciona mientras se mantenga pulsado ARRANQUE.

</details>

### Ejercicio 6 · Clasificar señales

Clasifique por forma y color: (a) círculo azul con casco; (b) triángulo amarillo con rayo; (c) cuadrado verde con flecha de salida; (d) círculo rojo con diagonal sobre un cigarrillo; (e) cuadrado rojo con extintor.

<details><summary>Ver solución</summary>

(a) Obligación. (b) Advertencia de riesgo eléctrico. (c) Condición segura / ruta de evacuación. (d) Prohibición. (e) Equipo contra incendios.

</details>

### Caso práctico · Inspección de seguridad del layout

Revise el plano de planta de un taller (o el del laboratorio de su escuela): ¿están todas las rutas libres, hay señales de cada categoría, y los extintores se ubican donde indica el plano? Redacte tres hallazgos con evidencia y propuesta de corrección.
