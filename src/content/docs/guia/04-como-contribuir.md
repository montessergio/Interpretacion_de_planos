---
title: "Cómo contribuir o agregar un módulo"
description: "Flujo de trabajo, convenciones de nombres, creación de un módulo con la plantilla, calidad de datos, versionado y revisión."
---

## Flujo de trabajo

1. Haga un *fork* y cree una rama: `modulo-07/nombre-corto` o `correccion/modulo-05-tabla-it`.
2. Haga cambios pequeños y revise localmente (`npm run dev`).
3. Ejecute las verificaciones: `npm test`, `npm run verificar`, `npm run generar:tablas -- --check` y `npm run build`.
4. Abra un *pull request* con la plantilla y adjunte la **fuente** de cada dato nuevo.

## Convenciones

- Nombres de archivos y carpetas en **minúsculas con guiones**, sin acentos ni espacios (`04-calculo-de-ajustes.md`).
- Cada módulo: `modulo-NN-slug/` con `index.md`, temas `NN-slug.md`, `ejercicios.md` y `referencias.md`.
- Front matter obligatorio: `title` y `description`.
- **Punto decimal** y unidades siempre indicadas (mm, in, µm). Tablas normativas en Markdown, con columna de verificación.
- Datos numéricos de tablas calculables: generarlos con código y **pruebas**, no a mano.
- Diagramas en **Mermaid** o SVG originales (no copie figuras de normas).

## Crear un módulo nuevo con la plantilla

```bash
npm run nuevo-modulo -- 07 "ejemplo-de-modulo" "Título del módulo"
```

Crea `src/content/docs/modulo-07-ejemplo-de-modulo/` con los archivos base, un banco de preguntas vacío en `public/labs/quiz/bancos/modulo-07.json` y lo registra en el índice. **El menú lateral se actualiza solo**: no hay que editar `astro.config.mjs`.

## Calidad de datos: niveles de verificación

| Nivel | Significado | Qué debe aportar la contribución |
|---|---|---|
| ✅ | Fuente primaria (catálogo oficial o texto de la norma) | Enlace o referencia exacta (norma, edición, cláusula) |
| 🟡 | Fuente secundaria reconocida o recálculo propio | Fuente, o el código que lo reproduce |
| ⚠️ | Pendiente de verificación | Una nota «cómo verificar» |

Nunca presente como cierto un dato que no pudo confirmar.

## Versionado

- **Versión del repositorio:** SemVer. *Mayor* = reestructura; *menor* = módulo o laboratorio nuevo; *parche* = correcciones.
- **Etiquetas por módulo:** `m05-v1.1.0` cuando un módulo cambia de forma relevante, además de `v1.0.0` del repositorio.
- Registre cada cambio en `CHANGELOG.md`.

## Licencia de las contribuciones

Contenido bajo **CC BY-SA 4.0** y código bajo **MIT**. No incluya texto copiado de normas ni libros.
