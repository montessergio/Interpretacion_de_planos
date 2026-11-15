#!/usr/bin/env node
/** Verifica convenciones del repositorio (ver CONTRIBUTING.md). Sale con código 1 si hay incumplimientos. */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const RAIZ = process.cwd(), errores = [];
const NOMBRE = /^\.?_?[a-z0-9][a-z0-9._-]*$/;   // minúsculas, números, guiones; prefijos "_" y "." sólo para carpetas/archivos técnicos
const IGNORAR = new Set(['node_modules', '.git', 'dist', '.astro', '_vendor']);
function recorrer(dir, fn) { for (const e of readdirSync(dir, { withFileTypes: true })) { if (IGNORAR.has(e.name)) continue; const p = join(dir, e.name); fn(p, e); if (e.isDirectory()) recorrer(p, fn); } }

for (const base of ['src/content/docs', 'public', 'plantillas', 'tools', 'tests']) {
  recorrer(join(RAIZ, base), (p, e) => { const n = e.name; if (!NOMBRE.test(n)) errores.push(`Nombre no válido (use minúsculas-con-guiones, sin acentos ni espacios): ${relative(RAIZ, p)}`); });
}
const docs = join(RAIZ, 'src/content/docs');
for (const m of readdirSync(docs, { withFileTypes: true }).filter((d) => d.isDirectory() && /^modulo-\d{2}-/.test(d.name))) {
  for (const req of ['index.md', 'ejercicios.md', 'referencias.md']) { try { statSync(join(docs, m.name, req)); } catch { errores.push(`Falta ${m.name}/${req}`); } }
}
recorrer(docs, (p, e) => {
  if (!e.isFile() || !['.md', '.mdx'].includes(extname(p))) return;
  const txt = readFileSync(p, 'utf8'), fm = /^---\n([\s\S]*?)\n---/.exec(txt);
  if (!fm) return errores.push(`Sin frontmatter: ${relative(RAIZ, p)}`);
  const rel = relative(docs, p);
  if (/^modulo-\d{2}-[^/]+\/index\.md$/.test(rel) && !/Última verificación de normas:\*{0,2}\s*\d{4}-\d{2}-\d{2}/.test(txt)) errores.push(`Falta la ficha con «Última verificación de normas: AAAA-MM-DD» en ${relative(RAIZ, p)}`);
  for (const k of ['title', 'description']) if (!new RegExp(`^${k}:`, 'm').test(fm[1])) errores.push(`Falta '${k}' en ${relative(RAIZ, p)}`);
});
if (errores.length) { console.error(errores.map((x) => '✗ ' + x).join('\n')); process.exit(1); }
console.log('✓ Convenciones correctas');
