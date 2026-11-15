const $ = (i) => document.getElementById(i);
const guardar = (k, v) => { try { localStorage.setItem('planos:' + k, v); } catch { /* almacenamiento no disponible */ } };
const leer = (k) => { try { return localStorage.getItem('planos:' + k); } catch { return null; } };
const mezclar = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
let bancos = [], preguntas = [], i = 0, aciertos = 0, clave = '';
async function cargar() {
  try {
    const idx = await (await fetch('bancos/indice.json')).json();
    bancos = await Promise.all(idx.map(async (b) => ({ ...b, preguntas: (await (await fetch('bancos/' + b.archivo)).json()).preguntas })));
    $('banco').innerHTML = '<option value="*">Todos los módulos</option>' + bancos.map((b) => `<option value="${b.archivo}">${b.titulo}</option>`).join('');
    mejor();
  } catch (e) { $('err').textContent = 'No se pudieron cargar los bancos. Si abrió el archivo con doble clic, sirva la carpeta con un servidor local (python -m http.server).'; }
}
function mejor() { const m = leer('mejor:' + $('banco').value); $('mejor').textContent = m ? `Mejor puntaje: ${m}` : ''; }
function iniciar() {
  clave = $('banco').value; const src = clave === '*' ? bancos.flatMap((b) => b.preguntas) : bancos.find((b) => b.archivo === clave).preguntas;
  preguntas = mezclar(src).slice(0, 10); i = 0; aciertos = 0; $('juego').hidden = false; mostrar();
}
function mostrar() {
  if (i >= preguntas.length) { const txt = `${aciertos}/${preguntas.length}`; const prev = leer('mejor:' + clave);
    if (!prev || aciertos > Number(prev.split('/')[0])) guardar('mejor:' + clave, txt);
    $('juego').innerHTML = `<h2>Resultado: ${txt}</h2><p>${aciertos === preguntas.length ? 'Excelente.' : 'Repase las explicaciones de las preguntas falladas y vuelva a intentarlo.'}</p><button id="otra">Otra ronda</button>`; $('otra').onclick = iniciar; mejor(); return; }
  const p = preguntas[i], ops = mezclar(p.o.map((t, k) => ({ t, ok: k === p.c })));
  $('juego').innerHTML = `<p class="sub">Pregunta ${i + 1} de ${preguntas.length}</p><fieldset style="border:0;padding:0;margin:0"><legend><strong>${p.q}</strong></legend>
    ${ops.map((o, k) => `<label style="flex-direction:row;align-items:center;gap:8px;margin:6px 0;color:inherit"><input type="radio" name="r" value="${k}"> ${o.t}</label>`).join('')}</fieldset><button id="resp" type="button">Responder</button><div id="fb"></div>`;
  $('resp').onclick = () => { const s = document.querySelector('input[name=r]:checked'); if (!s) return; const ok = ops[Number(s.value)].ok; if (ok) aciertos++;
    document.querySelectorAll('input[name=r]').forEach((r) => (r.disabled = true));
    $('fb').innerHTML = `<p class="${ok ? 'ok' : 'mal'}">${ok ? 'Correcto.' : 'No es correcto.'}</p><p>${p.e}</p><p class="sub">Referencia: ${p.n}</p><button id="sig" type="button">${i + 1 < preguntas.length ? 'Siguiente' : 'Ver resultado'}</button>`;
    $('resp').hidden = true; $('sig').onclick = () => { i++; mostrar(); }; $('sig').focus(); };
}
$('ini').onclick = iniciar; $('banco').onchange = mejor; cargar();
