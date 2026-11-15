import test from 'node:test';
import assert from 'node:assert/strict';
import * as G from '../public/labs/_shared/gdt-core.js';
import * as R from '../public/labs/_shared/rugosidad-core.js';
import * as C from '../public/labs/_shared/conversion-core.js';
const cerca = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) <= tol, `${a} ≠ ${b}`);

test('GD&T: bonus y posición con MMC (agujero Ø10.0–10.2, tol Ø0.2 MMC)', () => {
  const p = { caracteristica: 'agujero', modificador: 'MMC', min: 10, max: 10.2, real: 10.15, tol: 0.2 };
  cerca(G.bonus(p), 0.15); const r = G.evaluarPosicion({ ...p, dx: 0.12, dy: 0.1 });
  cerca(r.admisible, 0.35); cerca(r.desviacion, 2 * Math.hypot(0.12, 0.1)); assert.equal(r.conforme, true);
  assert.equal(G.evaluarPosicion({ ...p, dx: 0.2, dy: 0.1 }).conforme, false);
  assert.equal(G.bonus({ ...p, modificador: 'RFS' }), 0);
});
test('GD&T: eje en MMC/LMC y condición virtual', () => {
  const e = { caracteristica: 'eje', min: 9.9, max: 10 };
  cerca(G.bonus({ ...e, modificador: 'MMC', real: 9.93 }), 0.07); cerca(G.bonus({ ...e, modificador: 'LMC', real: 9.93 }), 0.03);
  cerca(G.condicionVirtual({ ...e, modificador: 'MMC', tol: 0.05 }), 10.05);
  cerca(G.condicionVirtual({ caracteristica: 'agujero', min: 10, max: 10.2, modificador: 'MMC', tol: 0.2 }), 9.8);
  assert.throws(() => G.bonus({ ...e, modificador: 'MMC', real: 11 }), RangeError);
});
test('GD&T: sujetadores flotante y fijo (M6, agujero medio ISO 273 = 6.6)', () => {
  cerca(G.sujetadores({ H: G.ISO273.M6[1], F: 6, tipo: 'flotante' }), 0.6); cerca(G.sujetadores({ H: 6.6, F: 6, tipo: 'fijo' }), 0.3);
});
test('Rugosidad: perfil senoidal → Ra=2A/π, Rq=A/√2, Rz=2A', () => {
  const A = 1.5, N = 5000, z = Array.from({ length: N }, (_, i) => A * Math.sin((2 * Math.PI * 25 * i) / N));
  const p = R.parametros(z); cerca(p.Ra, (2 * A) / Math.PI, 2e-3); cerca(p.Rq, A / Math.SQRT2, 2e-3);
  cerca(p.RzMax, 2 * A, 2e-3); cerca(p.Rsk, 0, 1e-3);
});
test('Rugosidad: generador reproducible y escalado a Ra', () => {
  const a = R.generarPerfil({ Ra: 1.6, lambdaMin: 0.02, lambdaMax: 0.5, longitud: 4, semilla: 7 }), b = R.generarPerfil({ Ra: 1.6, lambdaMin: 0.02, lambdaMax: 0.5, longitud: 4, semilla: 7 });
  assert.deepEqual(a.z, b.z); cerca(R.parametros(a.z).Ra, 1.6, 0.02);
});
test('Rugosidad: clases N y λc', () => {
  assert.equal(R.claseN(0.8)[0], 'N6'); assert.equal(R.claseN(3.2)[0], 'N8');
  assert.equal(R.lambdaC(0.8), 0.8); assert.equal(R.lambdaC(0.05), 0.25); assert.equal(R.lambdaC(6.3), 2.5); assert.equal(R.lambdaC(0.01), 0.08);
  cerca(R.umAMicropulgadas(0.8), 31.496, 1e-2);
});
test('Conversión: 1 in = 25.4 mm; 1 thou = 25.4 µm; 20 °C = 68 °F', () => {
  cerca(C.convertir(1, 'in', 'mm'), 25.4); cerca(C.convertir(1, 'thou', 'µm'), 25.4); cerca(C.convertir(32, 'µin', 'µm'), 0.8128, 1e-6);
  cerca(C.convertir(0.005, 'in', 'mm'), 0.127); cerca(C.cAF(20), 68); cerca(C.fAC(68), 20);
});
