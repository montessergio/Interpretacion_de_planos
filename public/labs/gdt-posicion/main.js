import { evaluarPosicion, condicionVirtual, sujetadores, ISO273, DIAM_NOMINAL } from '../_shared/gdt-core.js';
const $ = (i) => document.getElementById(i), n = (i) => Number($(i).value), f = (x) => +x.toFixed(4);
$('m').innerHTML = Object.keys(ISO273).map((k) => `<option${k === 'M6' ? ' selected' : ''}>${k}</option>`).join('');
function posicion() {
  $('err').textContent = '';
  try {
    const p = { caracteristica: $('car').value, modificador: $('mod').value, min: n('min'), max: n('max'), real: n('real'), tol: n('tol'), dx: n('dx'), dy: n('dy') };
    const r = evaluarPosicion(p), vc = p.modificador === 'RFS' ? null : condicionVirtual(p);
    $('res').innerHTML = `<table><tr><td>Bonus</td><td>${f(r.bonus)}</td></tr><tr><td>Tolerancia admisible (Ø)</td><td>${f(r.admisible)}</td></tr><tr><td>Desviación medida (Ø = 2·√(x²+y²))</td><td>${f(r.desviacion)}</td></tr>
      ${vc === null ? '' : `<tr><td>${p.modificador === 'MMC' ? 'Condición virtual' : 'Condición resultante'}</td><td>${f(vc)}</td></tr>`}
      <tr><td>Dictamen</td><td class="${r.conforme ? 'ok' : 'mal'}">${r.conforme ? 'CONFORME' : 'NO CONFORME'}</td></tr></table>`;
    const esc = 90 / Math.max(r.admisible / 2, Math.hypot(p.dx, p.dy), 1e-9);
    $('zona').innerHTML = `<rect x="2" y="2" width="216" height="216" fill="#fff" stroke="#9aa8bd"/><line x1="10" x2="210" y1="110" y2="110" stroke="#9aa8bd" stroke-dasharray="8 3 2 3"/><line y1="10" y2="210" x1="110" x2="110" stroke="#9aa8bd" stroke-dasharray="8 3 2 3"/>
      <circle cx="110" cy="110" r="${(r.admisible / 2) * esc}" fill="#0b6fa4" fill-opacity=".15" stroke="#0b6fa4" stroke-width="2"/>
      <circle cx="${110 + p.dx * esc}" cy="${110 - p.dy * esc}" r="4" fill="${r.conforme ? '#1b7f4b' : '#b3261e'}"/>
      <text x="8" y="16" font-size="11" fill="#46546e">zona Ø${f(r.admisible)} · centro medido</text>`;
  } catch (e) { $('err').textContent = e.message; $('res').innerHTML = ''; }
}
function fas() {
  const k = $('m').value, H = ISO273[k][Number($('serie').value)], F = DIAM_NOMINAL[k];
  $('fas').innerHTML = `<table><tr><td>H (agujero de paso)</td><td>${H} mm</td></tr><tr><td>F (sujetador)</td><td>${F} mm</td></tr><tr><td>Tolerancia de posición T (Ø, a MMC)</td><td><strong>${f(sujetadores({ H, F, tipo: $('tipo').value }))} mm</strong></td></tr></table>`;
}
['car', 'mod', 'min', 'max', 'tol', 'real', 'dx', 'dy'].forEach((i) => $(i).addEventListener('input', posicion));
['m', 'serie', 'tipo'].forEach((i) => $(i).addEventListener('input', fas)); posicion(); fas();
