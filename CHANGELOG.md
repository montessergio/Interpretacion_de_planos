# Registro de cambios

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y [Versionado Semántico](https://semver.org/lang/es/).
Etiquetas por módulo: `mNN-vX.Y.Z`; etiqueta global: `vX.Y.Z`.

## [1.0.0] - 2026-11-14

### Agregado
- **Seis módulos** con presentación, temas, ejercicios con solución y referencias: (1) Interpretación de planos y dibujos, (2) Simbología en planos, (3) Dimensionamiento y tolerancias, (4) Rugosidad y acabados, (5) Ajustes y tolerancias ISO, (6) ASME Y14.5 y GD&T.
- **Guía de uso**: navegación y orden de estudio, ejercicios, modelos interactivos (tecnología, archivos fuente, integración y límites de GitHub Pages), contribución, citas y vigencia de normas.
- **Referencia**: índice de normas con estado verificado el 2026-11-14, equivalencias métrico–inglés, glosario y bibliografía.
- **Ocho laboratorios** interactivos: calculadora ISO 286, vistas ortogonales 3D (primer/tercer ángulo, líneas ocultas), vista explosionada con BOM, rugosidad, GD&T de posición, convertidor de unidades, quiz (36 preguntas) y visor GLB.
- Sitio con **Astro Starlight**, búsqueda en español, diagramas Mermaid y menú automático por módulo.
- Publicación automática en **GitHub Pages** con GitHub Actions; revisión semestral de vigencia de normas.
- Herramientas: generador de figuras SVG, generador de tablas ISO 286, verificador de convenciones, creador de módulos y comprobador de enlaces; 14 pruebas automáticas.

### Verificación de normas (2026-11-14)
- Confirmadas en catálogo: ISO 286-1:2010 (confirmada 2026), ISO 286-2:2010, ISO 1101:2017, ISO 5459:2024, ISO 21920-1:2021 (reemplaza ISO 1302:2002), ISO 128-1/-2/-3, ASME Y14.5-2018 (R2024), ASME B46.1-2019 (R2026), NOM-026-STPS-2008, NOM-017-STPS-2024, límites de GitHub Pages.
- Marcadas como pendientes (⚠️): ISO 2768 (nueva edición «bajo publicación»), ISO 14405-1 (edición 2016 retirada) y las normas listadas en `referencia/indice-de-normas`.

### Decisiones
- Se eligió Astro Starlight en lugar de Material for MkDocs porque este último llegó a fin de vida el 2026-11-05.

### Pendiente (backlog)
- Verificar las normas marcadas con ⚠️ y subir a ✅.
- Animación de la «caja de vidrio» en el laboratorio de vistas ortogonales.
- Ejemplo de modelo GLB real con PMI y conjunto explosionado cargado desde archivo.
- Módulo 7 (propuesta): dibujo de instalaciones y distribución en planta.
