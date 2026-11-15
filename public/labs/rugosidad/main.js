import { parametros, generarPerfil, claseN, lambdaC, umAMicropulgadas } from '../_shared/rugosidad-core.js';
const $ = (i) => document.getElementById(i), f = (x, d = 3) => x.toFixed(d);
function pintar() {
  const Ra = Number($('ra').value), [, lmin, lmax] = $('proc').value.split('|').map(Number), lc = lambdaC(Ra), L = lc * 5;
  const { x, z } = generarPerfil({ Ra, lambdaMin: lmin, lambdaMax: Math.min(lmax, lc), longitud: L, puntos: 2500, semilla: Number($('sem').value) || 1 });
  const p = parametros(z), c = $('c'), g = c.getContext('2d'), W = c.width, H = c.height, ext = Math.max(...p.perfil.map(Math.abs)) * 1.25, Y = (v) => H / 2 - (v / ext) * (H / 2 - 10), X = (v) => (v / L) * W;
  g.clearRect(0, 0, W, H); g.strokeStyle = '#9aa8bd'; g.setLineDash([6, 4]);
  for (let i = 1; i < 5; i++) { g.beginPath(); g.moveTo(X(i * lc), 0); g.lineTo(X(i * lc), H); g.stroke(); }
  g.setLineDash([14, 4, 3, 4]); g.strokeStyle = '#14213d'; g.beginPath(); g.moveTo(0, Y(0)); g.lineTo(W, Y(0)); g.stroke(); g.setLineDash([]);
  g.strokeStyle = '#0b6fa4'; g.lineWidth = 1.6; g.beginPath(); p.perfil.forEach((v, i) => (i ? g.lineTo(X(x[i]), Y(v)) : g.moveTo(X(x[i]), Y(v)))); g.stroke();
  g.fillStyle = '#46546e'; g.font = '13px system-ui'; g.fillText(`línea media · lr = λc = ${lc} mm · 5 longitudes de muestreo (ln = ${f(L, 2)} mm)`, 8, 16);
  const n = claseN(Ra);
  $('par').innerHTML = `<tr><th>Parámetro</th><th>Valor (µm)</th></tr><tr><td>Ra</td><td>${f(p.Ra)} (${f(umAMicropulgadas(p.Ra), 1)} µin)</td></tr><tr><td>Rq</td><td>${f(p.Rq)}</td></tr><tr><td>Rp (máx. pico)</td><td>${f(p.Rp)}</td></tr><tr><td>Rv (máx. valle)</td><td>${f(p.Rv)}</td></tr><tr><td>Rz promedio de 5 secciones</td><td>${f(p.RzMedio)}</td></tr><tr><td>Rz máximo de las 5 secciones</td><td>${f(p.RzMax)}</td></tr><tr><td>Rsk (asimetría)</td><td>${f(p.Rsk, 2)}</td></tr><tr><td>Clase N más próxima</td><td>${n[0]} (Ra ${n[1]} µm)</td></tr>`;
  $('sec').innerHTML = '<tr><th>Sección</th><th>Rp</th><th>Rv</th><th>Rz</th></tr>' + p.secciones.map((s, i) => `<tr><td>${i + 1}</td><td>${f(s.Rp)}</td><td>${f(s.Rv)}</td><td>${f(s.Rz)}</td></tr>`).join('');
  $('nota').textContent = 'Rz por sección = Rp + Rv. Según la edición y la regla de aceptación (máximo o 16 %), el “Rz” del plano puede ser uno u otro: verifique la norma indicada en el plano.';
}
$('proc').addEventListener('input', () => { $('ra').value = $('proc').value.split('|')[0]; pintar(); });
['ra', 'sem'].forEach((i) => $(i).addEventListener('input', pintar)); $('nuevo').addEventListener('click', () => { $('sem').value = Math.floor(Math.random() * 9999) + 1; pintar(); }); pintar();
