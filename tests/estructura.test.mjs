import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const correr = (args) => spawnSync(process.execPath, args, { encoding: 'utf8' });

test('convenciones del repositorio (nombres, fichas, front matter)', () => {
  const r = correr(['tools/verificar-convenciones.mjs']); assert.equal(r.status, 0, r.stderr);
});
test('las tablas ISO 286 generadas están al día', () => {
  const r = correr(['tools/generar-tablas.mjs', '--check']); assert.equal(r.status, 0, r.stderr);
});
test('bancos de preguntas del quiz: formato válido', () => {
  const dir = 'public/labs/quiz/bancos/', idx = JSON.parse(readFileSync(dir + 'indice.json', 'utf8'));
  assert.ok(idx.length >= 6);
  for (const { archivo } of idx) {
    const { preguntas } = JSON.parse(readFileSync(dir + archivo, 'utf8'));
    for (const p of preguntas) {
      assert.ok(p.q && p.e && p.n, `Pregunta incompleta en ${archivo}`);
      assert.ok(Array.isArray(p.o) && p.o.length >= 2 && new Set(p.o).size === p.o.length, `Opciones inválidas en ${archivo}: ${p.q}`);
      assert.ok(Number.isInteger(p.c) && p.c >= 0 && p.c < p.o.length, `Índice correcto inválido en ${archivo}: ${p.q}`);
    }
  }
});
