import { convertir, UNIDADES, cAF } from '../_shared/conversion-core.js';
const $ = (i) => document.getElementById(i), g = (x) => Number(x.toPrecision(7)).toString();
function pintar() {
  const v = Number($('v').value), u = $('u').value;
  $('t').innerHTML = '<tr><th>Unidad</th><th>Valor</th></tr>' + Object.keys(UNIDADES).map((k) => `<tr><td>${k}</td><td>${g(convertir(v, u, k))}</td></tr>`).join('');
  $('f').textContent = g(cAF(Number($('c').value)));
}
$('tol').innerHTML = '<tr><th>±in</th><th>±mm</th><th>±µm</th></tr>' + [0.01, 0.005, 0.002, 0.001, 0.0005, 0.0001].map((x) => `<tr><td>${x}</td><td>${g(convertir(x, 'in', 'mm'))}</td><td>${g(convertir(x, 'in', 'µm'))}</td></tr>`).join('');
['v', 'u', 'c'].forEach((i) => $(i).addEventListener('input', pintar)); pintar();
