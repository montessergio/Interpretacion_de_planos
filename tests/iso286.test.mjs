import test from 'node:test';
import assert from 'node:assert/strict';
import { limites, ajuste, tolerancia, indicePrincipal } from '../public/labs/_shared/iso286-core.js';

const L = (d, s) => { const r = limites(d, s); return [r.sup, r.inf]; };

test('IT: valores de referencia (ISO 286-1 tabla 1)', () => {
  assert.equal(tolerancia(7, 25), 21); assert.equal(tolerancia(7, 50), 25);
  assert.equal(tolerancia(6, 25), 13); assert.equal(tolerancia(11, 25), 130);
  assert.equal(tolerancia(7, 100), 35); assert.equal(tolerancia(7, 400), 57); assert.equal(tolerancia(7, 450), 63);
});
test('IT: coherencia con la fórmula i = 0.45·∛D + 0.001·D (±15 % hasta 18 mm por redondeo; ±3.5 % desde 18 mm)', () => {
  const k = {5:7,6:10,7:16,8:25,9:40,10:64,11:100,12:160,13:250,14:400,15:640,16:1000};
  const R = [[0,3],[3,6],[6,10],[10,18],[18,30],[30,50],[50,80],[80,120],[120,180],[180,250],[250,315],[315,400],[400,500]];
  R.forEach(([lo, hi], i) => { const D = Math.sqrt(Math.max(lo, 1) * hi); const u = 0.45 * Math.cbrt(D) + 0.001 * D;
    for (const g of Object.keys(k)) { const calc = k[g] * u, tab = tolerancia(Number(g), hi);
      assert.ok(Math.abs(calc - tab) / tab < (hi <= 18 ? 0.15 : 0.035), `IT${g} rango ${lo}-${hi}: tabla ${tab} vs fórmula ${calc.toFixed(1)}`); } });
});
test('Ø25 (18–30): agujeros', () => {
  assert.deepEqual(L('H7', 25), [21, 0]); assert.deepEqual(L('H8', 25), [33, 0]); assert.deepEqual(L('H11', 25), [130, 0]);
  assert.deepEqual(L('G7', 25), [28, 7]); assert.deepEqual(L('F8', 25), [53, 20]); assert.deepEqual(L('E9', 25), [92, 40]);
  assert.deepEqual(L('D9', 25), [117, 65]); assert.deepEqual(L('K7', 25), [6, -15]); assert.deepEqual(L('M7', 25), [0, -21]);
  assert.deepEqual(L('N7', 25), [-7, -28]); assert.deepEqual(L('P7', 25), [-14, -35]); assert.deepEqual(L('K8', 25), [10, -23]);
  assert.deepEqual(L('JS7', 25), [10, -10]);
});
test('Ø25 (18–30): ejes', () => {
  assert.deepEqual(L('h6', 25), [0, -13]); assert.deepEqual(L('g6', 25), [-7, -20]); assert.deepEqual(L('f7', 25), [-20, -41]);
  assert.deepEqual(L('e8', 25), [-40, -73]); assert.deepEqual(L('d9', 25), [-65, -117]); assert.deepEqual(L('c11', 25), [-110, -240]);
  assert.deepEqual(L('k6', 25), [15, 2]); assert.deepEqual(L('m6', 25), [21, 8]); assert.deepEqual(L('n6', 25), [28, 15]);
  assert.deepEqual(L('p6', 25), [35, 22]); assert.deepEqual(L('r6', 25), [41, 28]); assert.deepEqual(L('s6', 25), [48, 35]);
});
test('Ø50 y Ø100', () => {
  assert.deepEqual(L('H7', 50), [25, 0]); assert.deepEqual(L('g6', 50), [-9, -25]); assert.deepEqual(L('p6', 50), [42, 26]);
  assert.deepEqual(L('s6', 50), [59, 43]); assert.deepEqual(L('f7', 100), [-36, -71]); assert.deepEqual(L('s6', 100), [93, 71]);
  assert.deepEqual(L('p6', 100), [59, 37]);
});
test('Ajustes preferentes Ø25', () => {
  let a = ajuste('H7', 'g6', 25); assert.equal(a.holguraMin, 7); assert.equal(a.holguraMax, 41); assert.equal(a.clase, 'con holgura');
  a = ajuste('H7', 'h6', 25); assert.equal(a.holguraMin, 0); assert.equal(a.holguraMax, 34);
  a = ajuste('H7', 'k6', 25); assert.equal(a.holguraMax, 19); assert.equal(a.aprieteMax, 15); assert.match(a.clase, /transición/);
  a = ajuste('H7', 'p6', 25); assert.equal(a.holguraMin, -35); assert.equal(a.holguraMax, -1); assert.equal(a.clase, 'con interferencia');
  a = ajuste('H7', 's6', 25); assert.equal(a.holguraMin, -48); assert.equal(a.holguraMax, -14);
});
test('Fronteras de rango y errores', () => {
  assert.equal(indicePrincipal(30), 4); assert.equal(indicePrincipal(30.01), 5); assert.equal(indicePrincipal(500), 12);
  assert.throws(() => limites('H7', 501), RangeError); assert.throws(() => limites('s6', 150), RangeError);
  assert.throws(() => limites('K9', 25), RangeError); assert.throws(() => limites('XX', 25), SyntaxError);
});
