# Cómo contribuir

¡Gracias por ayudar! La guía completa está en el sitio: [Cómo contribuir o agregar un módulo](src/content/docs/guia/04-como-contribuir.md).

## Lo esencial

1. Haga un *fork* y una rama (`modulo-07/nombre-corto`, `correccion/modulo-05-tabla-it`).
2. `npm ci` y `npm run dev` para ver los cambios.
3. Antes del PR: `npm test`, `npm run verificar`, `npm run generar:tablas -- --check`, `npm run build`, `npm run enlaces`.
4. Complete la plantilla de *pull request* con la **fuente** de cada dato y su nivel (✅ 🟡 ⚠️).

## Reglas de oro

- **Exactitud antes que cantidad:** si no puede confirmar un dato, márquelo ⚠️ pendiente de verificación.
- **No copie** texto, tablas completas ni figuras de normas o libros: parafrasee, recalcule y dibuje figuras propias.
- Nombres de archivo en minúsculas con guiones, sin acentos.
- Punto decimal y unidades siempre indicadas (mm, in, µm).
- Cálculos reutilizables → módulo sin DOM en `public/labs/_shared/` **con pruebas** en `tests/`.

## Conducta

Sea respetuoso y constructivo. Las críticas se dirigen a los datos y al código, no a las personas.
