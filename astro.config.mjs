// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// En GitHub Actions, GITHUB_REPOSITORY = "usuario/repositorio": el sitio se adapta solo a cualquier fork.
const REPO = process.env.GITHUB_REPOSITORY ?? 'Montessergio/Interpretacion_de_planos';
const [OWNER, NOMBRE] = REPO.split('/');
const DOCS = fileURLToPath(new URL('./src/content/docs/', import.meta.url));

/** Los módulos se detectan por carpeta (modulo-NN-slug): agregar un módulo no requiere tocar esta configuración. */
const modulos = readdirSync(DOCS, { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^modulo-\d+/.test(d.name))
  .map((d) => d.name)
  .sort();

function tituloDe(carpeta) {
  const txt = readFileSync(`${DOCS}${carpeta}/index.md`, 'utf8');
  return /^title:\s*["']?(.+?)["']?\s*$/m.exec(txt)?.[1] ?? carpeta;
}

export default defineConfig({
  site: process.env.SITE_URL ?? `https://${OWNER.toLowerCase()}.github.io`,
  base: process.env.BASE_PATH ?? `/${NOMBRE}`,
  integrations: [
    mermaid({ theme: 'neutral', autoTheme: true }),
    starlight({
      title: 'Interpretación de planos',
      description: 'Material de estudio interactivo para ingeniería industrial: planos, simbología, tolerancias, ajustes ISO, rugosidad y GD&T.',
      defaultLocale: 'root',
      locales: { root: { label: 'Español', lang: 'es' } },
      social: [{ icon: 'github', label: 'GitHub', href: `https://github.com/${REPO}` }],
      editLink: { baseUrl: `https://github.com/${REPO}/edit/main/` },
      lastUpdated: true,
      credits: false,
      customCss: ['./src/styles/custom.css'],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      sidebar: [
        { label: 'Guía de uso', items: [{ autogenerate: { directory: 'guia' } }] },
        ...modulos.map((m) => ({ label: tituloDe(m), collapsed: true, items: [{ autogenerate: { directory: m } }] })),
        { label: 'Laboratorios', items: [{ autogenerate: { directory: 'laboratorios' } }] },
        { label: 'Referencia', items: [{ autogenerate: { directory: 'referencia' } }] },
      ],
    }),
  ],
});
