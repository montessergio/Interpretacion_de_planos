# Interpretación de planos

Material de estudio y consulta, técnicamente verificado y **interactivo**, para estudiantes de **ingeniería industrial**: lectura de planos, simbología, dimensionamiento y tolerancias, rugosidad, ajustes ISO y GD&T (ASME Y14.5).

[![Publicar en GitHub Pages](https://github.com/Montessergio/Interpretacion_de_planos/actions/workflows/deploy.yml/badge.svg)](https://github.com/Montessergio/Interpretacion_de_planos/actions/workflows/deploy.yml)
[![Contenido: CC BY-SA 4.0](https://img.shields.io/badge/contenido-CC%20BY--SA%204.0-0b6fa4)](LICENSE-CONTENIDO)
[![Código: MIT](https://img.shields.io/badge/c%C3%B3digo-MIT-1b7f4b)](LICENSE)

**Sitio publicado:** https://montessergio.github.io/Interpretacion_de_planos/

> ⚠️ **Vigencia de las normas.** Las normas se revisan, reafirman, retiran y reemplazan. Este material refleja el estado verificado el **2026-11-14** y marca cada dato con ✅ (fuente primaria), 🟡 (fuente secundaria o recálculo) o ⚠️ (pendiente de verificación). **Verifique la edición vigente antes de aplicar cualquier valor** y recuerde que este material no sustituye a las normas.

## Módulos

| # | Módulo | Temas |
|---|---|---|
| 1 | [Interpretación de planos y dibujos](src/content/docs/modulo-01-interpretacion-de-planos/index.md) | Introducción, sistemas de proyección, normas de representación, tamaños de planos, vistas y secciones |
| 2 | [Simbología en planos](src/content/docs/modulo-02-simbologia-en-planos/index.md) | Mecánicos, soldadura y tubería, eléctricos y electrónicos, seguridad |
| 3 | [Dimensionamiento y tolerancias](src/content/docs/modulo-03-dimensionamiento-y-tolerancias/index.md) | Sistema métrico e inglés, tolerancias dimensionales, acotación |
| 4 | [Rugosidad y acabados](src/content/docs/modulo-04-rugosidad-y-acabados/index.md) | Nomenclatura, valores, acabados y su representación |
| 5 | [Ajustes y tolerancias ISO](src/content/docs/modulo-05-ajustes-iso/index.md) | Simbología y ajustes, agujeros, ejes, cálculo, tablas |
| 6 | [ASME Y14.5 y GD&T](src/content/docs/modulo-06-asme-y14-5-gdt/index.md) | Antecedentes, GD&T, modificadores y bonus, ASME frente a ISO |

Cada módulo incluye **ejercicios con solución**, **casos prácticos** y **referencias normativas con su estado**.

## Laboratorios interactivos

Funcionan en el navegador (sitio estático, sin servidor): calculadora ISO 286, vistas ortogonales 3D (primer/tercer ángulo y líneas ocultas), vista explosionada con lista de materiales, laboratorio de rugosidad, GD&T de posición con MMC, convertidor métrico–inglés, quiz y visor GLB. Detalles, tecnología, archivos fuente y límites: [guía de modelos interactivos](src/content/docs/guia/03-modelos-interactivos.md).

## Cómo navegar el repositorio y en qué orden estudiarlo

```
Interpretacion_de_planos/
├── src/content/docs/            # CONTENIDO (Markdown/MDX) → se publica como sitio
│   ├── index.mdx                # portada
│   ├── guia/                    # cómo estudiar, ejercicios, modelos, contribuir, citar, vigencia
│   ├── modulo-NN-slug/          # un directorio por módulo (se detecta solo en el menú)
│   │   ├── index.md             # presentación + ficha (versión, última verificación) + normas
│   │   ├── 01-tema.md …         # temas
│   │   ├── ejercicios.md        # ejercicios con solución y caso práctico
│   │   └── referencias.md       # normas (edición, estado, verificación) y bibliografía
│   ├── laboratorios/            # una página .mdx por laboratorio
│   └── referencia/              # índice de normas, equivalencias, glosario, bibliografía
├── src/assets/img/              # figuras SVG originales (generadas por tools/generar-figuras.py)
├── src/components/Lab.astro     # incrusta un laboratorio en una página
├── public/labs/                 # LABORATORIOS (HTML/JS autocontenidos)
│   ├── _shared/                 # núcleos de cálculo sin DOM (probados) y estilos
│   ├── _vendor/three/           # three.js fijado y vendorizado (sin CDN)
│   └── calculadora-iso286/ vistas-ortogonales/ explosionada-bom/ rugosidad/ gdt-posicion/ …
├── plantillas/modulo/           # plantilla para módulos nuevos
├── tools/                       # figuras, tablas ISO, verificador, creador de módulos, enlaces
├── tests/                       # pruebas automáticas (node:test)
├── .github/                     # workflows, plantillas de issues y PR, dependabot
├── astro.config.mjs · package.json · CHANGELOG.md · CITATION.cff · LICENSE · LICENSE-CONTENIDO
```

**Orden recomendado:** M1 → M2 y M3 → M4 → M5 → M6 (módulo 6 al final porque usa tolerancias y ajustes). La [guía de estudio](src/content/docs/guia/01-como-navegar-y-estudiar.md) incluye un plan por semanas y rutas rápidas.

## Cómo usar los ejercicios

Intente primero (lápiz y papel), compruebe con el laboratorio relacionado, abra la solución y compare el procedimiento. Método completo: [guía de ejercicios](src/content/docs/guia/02-como-usar-los-ejercicios.md).

## Cómo usar los modelos interactivos

Requieren un navegador moderno con JavaScript y, para 3D, **WebGL 2**. Arrastre para girar, rueda o pellizco para acercar. Para abrirlos localmente use un servidor (`npm run preview`); con doble clic (`file://`) el navegador puede bloquear la carga de módulos. Más: [guía de modelos](src/content/docs/guia/03-modelos-interactivos.md).

## Requisitos

- **Node.js ≥ 22** y npm (sólo para desarrollar o compilar localmente). Leer el material no requiere instalar nada: use el sitio publicado.
- Python 3.10+ (opcional) sólo para regenerar las figuras (`npm run figuras`).

```bash
npm ci                     # instala dependencias exactas
npm run dev                # servidor local con recarga
npm test                   # pruebas de cálculo (ISO 286, GD&T, rugosidad, conversión, estructura)
npm run verificar          # convenciones del repositorio
npm run generar:tablas     # regenera las tablas ISO 286 (usa --check para sólo comprobar)
npm run build && npm run enlaces   # compila y comprueba enlaces internos
```

## Publicación en GitHub Pages

El sitio se compila y publica con **GitHub Actions** (`.github/workflows/deploy.yml`) cada vez que se hace *push* a `main`. La URL y la ruta base se calculan solas a partir de `GITHUB_REPOSITORY`, de modo que también funcionan en un *fork*.

Primera publicación:

1. Suba el repositorio (`git push -u origin main --tags`).
2. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. En **Actions**, abra «Publicar en GitHub Pages» y pulse **Re-run** si el primer intento falló por no estar activado Pages.

Límites de GitHub Pages verificados en su documentación: sitio publicado ≤ 1 GB, despliegue ≤ 10 min, 100 GB/mes de ancho de banda (límite suave) y sin lenguajes de servidor (PHP, Ruby, Python).

### Por qué Astro Starlight

| Criterio | Decisión |
|---|---|
| Mantenimiento | **Material for MkDocs llegó a fin de vida el 2026-11-05** y Zensical (su sucesor) seguía en versión 0.1 el 2026-11-10; Starlight tiene mantenimiento activo |
| Contenido | Markdown/MDX con tablas, avisos, búsqueda en español (Pagefind) y diagramas Mermaid empaquetados (sin CDN) |
| Escalabilidad | El menú se genera por carpeta: agregar un módulo no requiere tocar la configuración |
| Interactivos | `public/labs/` se publica tal cual; `<Lab id="…" />` los incrusta |

## Cómo contribuir o agregar un módulo

Lea la [guía de contribución](src/content/docs/guia/04-como-contribuir.md) y [CONTRIBUTING.md](CONTRIBUTING.md). Resumen:

```bash
npm run nuevo-modulo -- 07 "slug-del-modulo" "Título del módulo"   # crea el módulo desde la plantilla
```

- Archivos en **minúsculas con guiones**; front matter con `title` y `description`.
- Todo dato normativo lleva **fuente, edición y nivel de verificación** (✅ 🟡 ⚠️).
- Tablas calculables: generadas por código y **con pruebas**.
- Versionado: SemVer global (`v1.0.0`) y etiquetas por módulo (`m05-v1.1.0`); registre cambios en el [CHANGELOG](CHANGELOG.md).

## Cómo citar las normas y fuentes

Cite siempre **organismo, número, año/edición, título y fecha de consulta** (p. ej., *ISO 286-1:2010 … vigente a 2026-11-14*). No copie texto de normas: parafrasee. Formato y ejemplos: [guía de citas](src/content/docs/guia/05-como-citar.md). Para citar este repositorio, use «Cite this repository» de GitHub (`CITATION.cff`).

## Estado de verificación (resumen)

✅ Confirmadas en catálogo: ISO 286-1/-2, ISO 1101, ISO 5459:2024, ISO 21920-1 (reemplaza ISO 1302), ISO 128-1/-2/-3, ASME Y14.5-2018 (R2024), ASME B46.1-2019 (R2026), NOM-026-STPS-2008, NOM-017-STPS-2024.
⚠️ Con cambios en curso: ISO 2768 (nueva edición «bajo publicación»), ISO 14405-1.
⚠️ Pendientes de verificación: ver el [índice de normas](src/content/docs/referencia/indice-de-normas.md).

## Licencias

Contenido didáctico: **CC BY-SA 4.0** ([LICENSE-CONTENIDO](LICENSE-CONTENIDO)). Código: **MIT** ([LICENSE](LICENSE)). three.js (vendorizado) conserva su licencia MIT. Las normas citadas pertenecen a sus organismos y no se incluyen.
