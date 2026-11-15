#!/usr/bin/env node
/** Comprueba que todos los enlaces y recursos internos de dist/ existen. Uso: npm run build && npm run enlaces */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIST = 'dist', BASE = (process.env.BASE_PATH ?? `/${(process.env.GITHUB_REPOSITORY ?? 'Montessergio/Interpretacion_de_planos').split('/')[1]}`).replace(/\/$/, '');
const html = []; (function rec(d) { for (const e of readdirSync(d, { withFileTypes: true })) { const p = join(d, e.name); e.isDirectory() ? rec(p) : extname(p) === '.html' && html.push(p); } })(DIST);
const faltan = new Map(); let total = 0;
for (const f of html) {
  const url = BASE + '/' + f.slice(DIST.length + 1).replace(/index\.html$/, '');
  const txt = readFileSync(f, 'utf8');
  for (const m of txt.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const raw = m[1]; if (/^(https?:|mailto:|tel:|data:|#|javascript:)/.test(raw)) continue;
    const u = new URL(raw, 'http://x' + url); if (!u.pathname.startsWith(BASE + '/') && u.pathname !== BASE) { faltan.set(`${url} -> ${raw}`, 'fuera del base'); continue; }
    let rel = decodeURIComponent(u.pathname.slice(BASE.length)).replace(/^\//, ''); total++;
    const ok = [rel, rel + '/index.html', rel.endsWith('/') ? rel + 'index.html' : null].some((c) => c !== null && existsSync(join(DIST, c)) && (statSync(join(DIST, c)).isFile()));
    if (!ok) faltan.set(`${url} -> ${raw}`, 'no existe');
  }
}
if (faltan.size) { console.error(`✗ ${faltan.size} enlaces rotos de ${total} comprobados:`); for (const [k, v] of faltan) console.error('  ', k, `(${v})`); process.exit(1); }
console.log(`✓ ${total} enlaces internos correctos en ${html.length} páginas`);
