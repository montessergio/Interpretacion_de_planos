import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const $ = (i) => document.getElementById(i);
const PERFIL = [[0, 0], [60, 0], [60, 10], [55, 15], [20, 15], [20, 50], [0, 50]];
const AGUJERO = { cx: 10, cy: 35, r: 5 }, PROF = 30, OFF = [-30, -25, -15], Z0 = OFF[2], Z1 = OFF[2] + PROF, S = 45;

function geometria() {
  const sh = new THREE.Shape(PERFIL.map(([x, y]) => new THREE.Vector2(x, y)));
  const h = new THREE.Path(); h.absarc(AGUJERO.cx, AGUJERO.cy, AGUJERO.r, 0, Math.PI * 2, true); sh.holes.push(h);
  const g = new THREE.ExtrudeGeometry(sh, { depth: PROF, bevelEnabled: false, curveSegments: 48 }); g.translate(...OFF); return g;
}
function aristas() {
  const P = [], v = (x, y, z) => [x + OFF[0], y + OFF[1], z], seg = (a, b) => P.push(...a, ...b);
  PERFIL.forEach((p, i) => { const q = PERFIL[(i + 1) % PERFIL.length]; seg(v(p[0], p[1], Z1), v(q[0], q[1], Z1)); seg(v(p[0], p[1], Z0), v(q[0], q[1], Z0)); seg(v(p[0], p[1], Z0), v(p[0], p[1], Z1)); });
  const N = 64, pt = (a) => [AGUJERO.cx + AGUJERO.r * Math.cos(a), AGUJERO.cy + AGUJERO.r * Math.sin(a)];
  for (let i = 0; i < N; i++) { const a = pt((i / N) * 2 * Math.PI), b = pt(((i + 1) / N) * 2 * Math.PI); seg(v(a[0], a[1], Z1), v(b[0], b[1], Z1)); seg(v(a[0], a[1], Z0), v(b[0], b[1], Z0)); }
  [0, 90, 180, 270].forEach((d) => { const a = pt((d * Math.PI) / 180); seg(v(a[0], a[1], Z0), v(a[0], a[1], Z1)); });
  return new Float32Array(P);
}
const geo = geometria(), gAr = new THREE.BufferGeometry(); gAr.setAttribute('position', new THREE.BufferAttribute(aristas(), 3));
const TINTA = 0x14213d;

// --- Rejilla de vistas (un solo lienzo, una ventana por vista) ---
const VISTAS = {
  frontal: { dir: [0, 0, 1], up: [0, 1, 0], nombre: 'Vista frontal' }, superior: { dir: [0, 1, 0], up: [0, 0, -1], nombre: 'Vista superior' },
  derecha: { dir: [1, 0, 0], up: [0, 1, 0], nombre: 'Vista lateral derecha' }, izquierda: { dir: [-1, 0, 0], up: [0, 1, 0], nombre: 'Vista lateral izquierda' },
  inferior: { dir: [0, -1, 0], up: [0, 0, 1], nombre: 'Vista inferior' }, posterior: { dir: [0, 0, -1], up: [0, 1, 0], nombre: 'Vista posterior' },
};
const DISPOSICION = {
  tercer: { superior: [1, 0], izquierda: [0, 1], frontal: [1, 1], derecha: [2, 1], posterior: [3, 1], inferior: [1, 2] },
  primer: { inferior: [1, 0], derecha: [0, 1], frontal: [1, 1], izquierda: [2, 1], posterior: [3, 1], superior: [1, 2] },
};
const BASICAS = ['frontal', 'superior', 'derecha'];
let R, R3, aviso = (m) => ($('aviso').textContent = m);
try {
  R = new THREE.WebGLRenderer({ canvas: $('cv'), antialias: true }); R.setClearColor(0xffffff, 1); R.autoClear = false;
  R3 = new THREE.WebGLRenderer({ antialias: true, alpha: true }); $('v3d').appendChild(R3.domElement);
} catch (e) { aviso('Su navegador no pudo iniciar WebGL; este laboratorio lo necesita.'); throw e; }

const esc = new THREE.Scene();
const relleno = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xffffff, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 })); relleno.renderOrder = 0;
const ocultas = new THREE.LineSegments(gAr, new THREE.LineDashedMaterial({ color: TINTA, dashSize: 2.4, gapSize: 1.6, depthFunc: THREE.GreaterDepth })); ocultas.computeLineDistances(); ocultas.renderOrder = 1;
const visibles = new THREE.LineSegments(gAr, new THREE.LineBasicMaterial({ color: TINTA })); visibles.renderOrder = 2;
esc.add(relleno, ocultas, visibles);
const cam = new THREE.OrthographicCamera(-S, S, S, -S, 1, 500);

function renderRejilla() {
  const W = Math.max($('rejilla').clientWidth, 280), H = (W * 3) / 4, celda = W / 4, modo = $('sis').value, n = $('nv').value;
  R.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); R.setSize(W, H, false); R.setScissorTest(true);
  ocultas.visible = $('ocultas').checked; $('etq').innerHTML = '';
  const mostrar = Object.keys(DISPOSICION[modo]).filter((k) => n === '6' || BASICAS.includes(k));
  mostrar.forEach((k) => {
    const [c, f] = DISPOSICION[modo][k], x = c * celda, y = H - (f + 1) * celda, v = VISTAS[k];
    R.setViewport(x, y, celda, celda); R.setScissor(x, y, celda, celda); R.clear();
    cam.position.set(v.dir[0] * 200, v.dir[1] * 200, v.dir[2] * 200); cam.up.set(...v.up); cam.lookAt(0, 0, 0); cam.updateMatrixWorld(); R.render(esc, cam);
    const d = document.createElement('div'); d.textContent = v.nombre;
    d.style.cssText = `position:absolute;left:${c * 25}%;top:${f * 33.3333}%;width:25%;height:33.3333%;border:1px dashed #c3ccd8;font-size:11px;color:#46546e;padding:2px 4px;box-sizing:border-box`; $('etq').appendChild(d);
  });
  R.setScissorTest(false);
  // Guías de proyección entre la vista frontal y sus vecinas
  const g = $('ov'), k = 100 / (2 * S), [cf, rf] = DISPOSICION[modo].frontal, cx = cf * 100 + 50, cy = rf * 100 + 50; let s = '';
  if ($('guias').checked) {
    const vert = mostrar.find((m) => m === 'superior' || m === 'inferior'), hor = mostrar.find((m) => m === 'derecha' || m === 'izquierda');
    const L = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#0b6fa4" stroke-width="1" stroke-dasharray="3 3" vector-effect="non-scaling-stroke" opacity=".7"/>`;
    if (vert) { const y2 = DISPOSICION[modo][vert][1] * 100 + 50; [-30, -25, -15, -10, 30].forEach((x) => (s += L(cx + x * k, cy, cx + x * k, y2))); }
    if (hor) { const x2 = DISPOSICION[modo][hor][0] * 100 + 50; [-25, -15, -10, 5, 15, 25].forEach((y) => (s += L(cx, cy - y * k, x2, cy - y * k))); }
  }
  g.innerHTML = s; simbolo(modo);
}
function simbolo(modo) {
  const tr = (a) => `<path d="M${a},18 L${a + 40},10 L${a + 40},46 L${a},38 Z" fill="none" stroke="#14213d" stroke-width="1.6"/>`;
  const ci = (cx) => `<circle cx="${cx}" cy="28" r="18" fill="none" stroke="#14213d" stroke-width="1.6"/><circle cx="${cx}" cy="28" r="10" fill="none" stroke="#14213d" stroke-width="1.6"/>`;
  const cuerpo = modo === 'tercer' ? ci(24) + tr(60) : tr(6) + ci(76);
  $('simbolo').innerHTML = `<svg viewBox="0 0 104 56" width="104" height="56" role="img"><title>${modo === 'tercer' ? 'Tercer ángulo' : 'Primer ángulo'}</title>${cuerpo}<line x1="2" x2="102" y1="28" y2="28" stroke="#14213d" stroke-width=".8" stroke-dasharray="8 2 2 2"/></svg><div class="sub" style="margin:0;font-size:.75rem">${modo === 'tercer' ? 'Tercer ángulo' : 'Primer ángulo'}</div>`;
}

// --- Vista 3D interactiva ---
const e3 = new THREE.Scene(), c3 = new THREE.PerspectiveCamera(35, 1, 1, 1000); c3.position.set(110, 90, 140);
e3.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0xb8c4d4, roughness: 0.7, metalness: 0.1, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 })),
  new THREE.LineSegments(gAr, new THREE.LineBasicMaterial({ color: TINTA })), new THREE.AmbientLight(0xffffff, 1.4));
const luz = new THREE.DirectionalLight(0xffffff, 2.2); luz.position.set(1, 2, 3); e3.add(luz);
const ctl = new OrbitControls(c3, R3.domElement); ctl.target.set(0, 0, 0);
function render3() { const W = Math.max($('v3d').clientWidth, 200); R3.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); R3.setSize(W, W, true); c3.aspect = 1; c3.updateProjectionMatrix(); R3.render(e3, c3); }
ctl.addEventListener('change', render3);
['sis', 'nv', 'ocultas', 'guias'].forEach((i) => $(i).addEventListener('input', renderRejilla));
const ro = new ResizeObserver(() => { renderRejilla(); render3(); }); ro.observe($('rejilla')); ro.observe($('v3d'));
renderRejilla(); render3();
