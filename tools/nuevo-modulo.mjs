#!/usr/bin/env node
/**
 * Crea un módulo nuevo a partir de plantillas/modulo.
 * Uso: npm run nuevo-modulo -- 07 "ejemplo-de-modulo" "Título del módulo"
 */
import { cpSync, readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const [nn, slug, ...resto] = process.argv.slice(2), titulo = resto.join(' ');
if (!/^\d{2}$/.test(nn ?? '') || !/^[a-z0-9-]+$/.test(slug ?? '') || !titulo) { console.error('Uso: npm run nuevo-modulo -- NN slug-en-minusculas "Título del módulo"'); process.exit(1); }
const destino = join('src/content/docs', `modulo-${nn}-${slug}`);
if (existsSync(destino)) { console.error(`✗ Ya existe ${destino}`); process.exit(1); }
cpSync('plantillas/modulo', destino, { recursive: true });
for (const f of readdirSync(destino)) {
  const p = join(destino, f); let t = readFileSync(p, 'utf8');
  t = t.replaceAll('{{NN}}', String(Number(nn))).replaceAll('{{SLUG}}', slug).replaceAll('{{TITULO}}', titulo).replaceAll('{{FECHA}}', new Date().toISOString().slice(0, 10));
  writeFileSync(p, t);
}
const banco = `public/labs/quiz/bancos/modulo-${nn}.json`;
if (!existsSync(banco)) { mkdirSync('public/labs/quiz/bancos', { recursive: true }); writeFileSync(banco, JSON.stringify({ preguntas: [] }, null, 2) + '\n'); }
const idxP = 'public/labs/quiz/bancos/indice.json', idx = JSON.parse(readFileSync(idxP, 'utf8'));
if (!idx.some((b) => b.archivo === `modulo-${nn}.json`)) { idx.push({ archivo: `modulo-${nn}.json`, titulo: `Módulo ${Number(nn)} · ${titulo}` }); writeFileSync(idxP, JSON.stringify(idx, null, 2) + '\n'); }
console.log(`✓ Módulo creado en ${destino}\n  Siguiente: complete los marcadores, agregue preguntas en ${banco} y abra un PR.`);
