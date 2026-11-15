---
title: "Cómo usar los modelos interactivos"
description: "Requisitos del navegador, controles, tecnología recomendada por tipo de modelo, archivos fuente, integración en el sitio y limitaciones de GitHub Pages."
---

## Requisitos del navegador

- Navegador moderno (Chrome, Edge, Firefox o Safari de los últimos años) con **JavaScript** y, para los modelos 3D, **WebGL 2** activado.
- Los modelos 3D funcionan en celular, pero son más cómodos con ratón: **arrastrar** gira, **rueda o pellizco** acerca, **clic derecho o dos dedos** desplaza.
- Si WebGL no está disponible, el laboratorio muestra un aviso; el resto del sitio sigue funcionando.
- Los datos personales **no se envían a ningún servidor**: el quiz guarda su mejor puntaje en `localStorage` de su navegador.

:::note[Uso fuera de línea]
Abrir un laboratorio con doble clic (`file://`) puede fallar por restricciones del navegador al cargar módulos y JSON. Sírvalos con `npm run preview` o `python3 -m http.server` dentro de `dist/`.
:::

## Qué tecnología usar para cada tipo de modelo

| Tipo de modelo | Tecnología recomendada | Archivo fuente | Cómo se integra | Limitaciones en GitHub Pages |
|---|---|---|---|---|
| **Vista 3D de una pieza** | **three.js** (control total) o `<model-viewer>` (visor simple con AR) | `.glb`/`.gltf` exportado desde el CAD | Cargar con `GLTFLoader` en un laboratorio de `public/labs/` | Sitio estático: no puede convertir STEP en el servidor |
| **Vista explosionada con BOM** | three.js (piezas con vectores de explosión) o **SVG interactivo** (2D) | GLB con un nodo por pieza **o** SVG con un grupo por pieza; BOM en JSON | Un laboratorio con deslizador y tabla vinculada | Archivos grandes aumentan la carga; sin guardado en servidor |
| **Planos 3D anotados (PMI/MBD)** | three.js con anotaciones HTML; **STEP AP242** sólo como fuente | STEP → convertido a glTF | Anotaciones en JSON asociadas a nodos | glTF no conserva GD&T semántico: es una representación visual |
| **Diagramas y flujos** | **Mermaid** (en Markdown) o SVG | Texto Mermaid o `.svg` | Bloque `mermaid` o imagen | Los diagramas muy grandes se vuelven ilegibles |
| **Calculadoras y laboratorios** | JavaScript puro (módulos ES) | Ninguno | Carpeta `public/labs/<id>/` + página `.mdx` | Sin backend: sin cuentas, sin base de datos compartida |
| **Planos de materiales (BOM)** | Tabla HTML/JSON vinculada al modelo | CSV/JSON | Cargada por el laboratorio | Edición en el repositorio, no en línea |

### Qué significa «estático» en GitHub Pages

GitHub Pages sirve archivos: **no ejecuta PHP, Ruby ni Python** y no hay base de datos. Todo cálculo ocurre en el navegador. Límites oficiales (verificados en la documentación de GitHub; ✅):

| Límite | Valor |
|---|---|
| Tamaño recomendado del repositorio fuente | 1 GB |
| Tamaño máximo del sitio publicado | 1 GB |
| Tiempo máximo de despliegue | 10 minutos |
| Ancho de banda (límite suave) | 100 GB/mes |
| Compilaciones (límite suave) | 10/hora; **no aplica si se despliega con un flujo de GitHub Actions personalizado**, como en este repositorio |
| Límite de peticiones | Posible respuesta HTTP 429 |

Además, GitHub Pages no admite usos comerciales como tienda en línea ni el envío de datos sensibles (contraseñas, tarjetas).

### Convertir CAD a glTF

1. Exporte desde el CAD a **STEP** (intercambio neutro) o directamente a **glTF/GLB** si su CAD lo permite.
2. Convierta STEP a GLB con herramientas de escritorio (FreeCAD, Blender con complemento, CAD Assistant) o con herramientas de línea de comandos; **la conversión no ocurre en GitHub Pages**.
3. Reduzca el peso (decimación, compresión Draco/Meshopt) para mantener cada modelo bajo unos pocos MB.
4. Pruebe el archivo en el [visor GLB](../../laboratorios/visor-glb/) y colóquelo en `public/labs/<laboratorio>/modelos/`.

### Agregar un modelo interactivo nuevo

1. Copie un laboratorio parecido en `public/labs/<id>/` (nombre en minúsculas con guiones).
2. Reutilice `../_shared/lab.css` y, si usa 3D, el *import map* de `three` (versión fijada en `public/labs/_vendor/three/`).
3. Escriba la lógica de cálculo como módulo sin DOM en `public/labs/_shared/` y **pruébela** en `tests/`.
4. Cree la página `.mdx` en `src/content/docs/laboratorios/` con el componente `<Lab id="..." />`.
5. Documente: tecnología, archivo fuente, integración y limitaciones.

:::caution[Seguridad y dependencias]
Las bibliotecas se **vendorizan con versión fija** (sin CDN): el sitio no depende de terceros en tiempo de ejecución y no se carga código sin revisar. Actualice con `npm update three` y copie los módulos al directorio `_vendor`.
:::
