import { ajuste, AJUSTES_PREFERENTES, fmtUm } from '../_shared/iso286-core.js';
const $ = (id) => document.getElementById(id);
const pref = $('pref');
pref.innerHTML = '<option value="">— elegir —</option>' + Object.entries(AJUSTES_PREFERENTES).map(([g, l]) => `<optgroup label="${g}">${l.map((x) => `<option>${x}</option>`).join('')}</optgroup>`).join('');
pref.addEventListener('change', () => { if (pref.value) { const [h, s] = pref.value.split('/'); $('h').value = h; $('s').value = s; calcular(); } });
['d', 'h', 's'].forEach((i) => $(i).addEventListener('input', calcular));
const mm = (v) => v.toFixed(3);
function dibujar(a, e) {
  const v = [0, a.sup, a.inf, e.sup, e.inf], mx = Math.max(...v), mn = Math.min(...v), pad = (mx - mn) * 0.2 || 5, top = mx + pad, bot = mn - pad;
  const Y = (u) => 12 + ((top - u) / (top - bot)) * 240, z = Y(0), r = (x, l, h, c, n) => `<rect x="${x}" y="${Y(h)}" width="110" height="${Math.max(2, Y(l) - Y(h))}" fill="${c}" fill-opacity=".25" stroke="${c}" stroke-width="2"/>
    <text x="${x + 55}" y="${Y(h) - 5}" text-anchor="middle" font-size="12" fill="#14213d">${n}</text>
    <text x="${x + 118}" y="${Y(h) + 4}" font-size="11" fill="#46546e">${fmtUm(h)}</text><text x="${x + 118}" y="${Y(l) + 4}" font-size="11" fill="#46546e">${fmtUm(l)}</text>`;
  $('zonas').innerHTML = `<line x1="20" x2="390" y1="${z}" y2="${z}" stroke="#14213d" stroke-width="1.5" stroke-dasharray="10 3 2 3"/>
    <text x="22" y="${z - 5}" font-size="11" fill="#14213d">línea cero (tamaño nominal)</text>` + r(60, a.inf, a.sup, '#0b6fa4', `Agujero ${a.designacion}`) + r(230, e.inf, e.sup, '#c2410c', `Eje ${e.designacion}`);
}
function calcular() {
  $('err').textContent = '';
  try {
    const D = Number($('d').value), r = ajuste($('h').value.trim(), $('s').value.trim(), D), a = r.agujero, e = r.eje;
    const fila = (n, x) => `<tr><td>${n}</td><td>${fmtUm(x.sup)}</td><td>${fmtUm(x.inf)}</td><td>${mm(x.maxMm)}</td><td>${mm(x.minMm)}</td></tr>`;
    const apr = r.aprieteMax ? `<tr><td>Apriete máximo</td><td colspan="4">${r.aprieteMax} µm (${(r.aprieteMax / 25.4).toFixed(2)} thou)</td></tr>` : '';
    const apmin = r.holguraMax < 0 ? `<tr><td>Apriete mínimo</td><td colspan="4">${-r.holguraMax} µm</td></tr>` : '';
    $('tabla').innerHTML = `<table><thead><tr><th></th><th>ES / es (µm)</th><th>EI / ei (µm)</th><th>Máx (mm)</th><th>Mín (mm)</th></tr></thead><tbody>${fila('Agujero ' + a.designacion, a)}${fila('Eje ' + e.designacion, e)}</tbody></table>
      <table style="margin-top:10px"><tbody><tr><td>Holgura mínima</td><td colspan="4">${fmtUm(r.holguraMin)} µm</td></tr><tr><td>Holgura máxima</td><td colspan="4">${fmtUm(r.holguraMax)} µm</td></tr>${apr}${apmin}
      <tr><td>Tolerancia del ajuste</td><td colspan="4">${r.toleranciaAjuste} µm</td></tr><tr><td>Tipo de ajuste</td><td colspan="4"><strong>${r.clase}</strong></td></tr></tbody></table>`;
    dibujar(a, e);
  } catch (x) { $('err').textContent = x.message; }
}
calcular();
