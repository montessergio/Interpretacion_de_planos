import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const $ = (i) => document.getElementById(i);
function placa(w, h, rh, prof) { const s = new THREE.Shape(); s.moveTo(-w / 2, -h / 2); s.lineTo(w / 2, -h / 2); s.lineTo(w / 2, h / 2); s.lineTo(-w / 2, h / 2); s.closePath();
  const p = new THREE.Path(); p.absarc(0, 0, rh, 0, Math.PI * 2, true); s.holes.push(p); const g = new THREE.ExtrudeGeometry(s, { depth: prof, bevelEnabled: false, curveSegments: 48 }); g.translate(0, 0, -prof / 2); return g; }
function anillo(re, ri, prof) { const s = new THREE.Shape(); s.absarc(0, 0, re, 0, Math.PI * 2, false); const p = new THREE.Path(); p.absarc(0, 0, ri, 0, Math.PI * 2, true); s.holes.push(p);
  const g = new THREE.ExtrudeGeometry(s, { depth: prof, bevelEnabled: false, curveSegments: 64 }); g.translate(0, 0, -prof / 2); return g; }
const cil = (r, l, seg = 48, zc = 0) => { const g = new THREE.CylinderGeometry(r, r, l, seg); g.rotateX(Math.PI / 2); g.translate(0, 0, zc); return g; };
const TORN = [[38, 38], [-38, 38], [38, -38], [-38, -38]];
const PIEZAS = [
  { id: 1, nombre: 'Carcasa', cant: 1, material: 'Fundición gris EN-GJL-200', ref: 'Alojamiento Ø52 H7', color: 0x9fb3c8, geos: [placa(100, 100, 26, 24)], pos: [[0, 0, 0]], exp: [0, 0, 0] },
  { id: 2, nombre: 'Rodamiento rígido de bolas 6205', cant: 1, material: 'Acero para rodamientos', ref: 'ISO 15 · d25 × D52 × B15', color: 0xd7dde6, geos: [anillo(25.8, 12.6, 15)], pos: [[0, 0, 0]], exp: [0, 0, 70] },
  { id: 3, nombre: 'Eje Ø25', cant: 1, material: 'Acero 1045', ref: 'Asiento Ø25 k6', color: 0xc2410c, geos: [cil(12.5, 110, 48, 10)], pos: [[0, 0, 0]], exp: [0, 0, -90] },
  { id: 4, nombre: 'Tapa', cant: 1, material: 'Aluminio 6061-T6', ref: 'Paso del eje Ø30', color: 0x6d8fb0, geos: [placa(100, 100, 15, 8)], pos: [[0, 0, 16]], exp: [0, 0, 120] },
  { id: 5, nombre: 'Tornillo hexagonal M8 × 30', cant: 4, material: 'Acero clase 8.8', ref: 'ISO 4017', color: 0x4b5563, geos: [cil(7.5, 6, 6, 23), cil(4, 30, 24, 5)], pos: TORN.map(([x, y]) => [x, y, 0]), exp: [0, 0, 170] },
];
let R; try { R = new THREE.WebGLRenderer({ antialias: true }); } catch (e) { $('aviso').textContent = 'Su navegador no pudo iniciar WebGL; este laboratorio lo necesita.'; throw e; }
$('gl').appendChild(R.domElement); R.domElement.style.cssText = 'width:100%;height:100%;display:block'; R.setClearColor(0xffffff, 1);
const esc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(32, 4 / 3, 1, 2000), VISTA0 = [210, 150, 330];
cam.position.set(...VISTA0); esc.add(new THREE.AmbientLight(0xffffff, 1.5)); const luz = new THREE.DirectionalLight(0xffffff, 2.4); luz.position.set(2, 3, 4); esc.add(luz);
const ctl = new OrbitControls(cam, R.domElement); ctl.target.set(0, 0, 40);
const grupos = [], mallas = [];
PIEZAS.forEach((p) => { p.mat = new THREE.MeshStandardMaterial({ color: p.color, roughness: 0.65, metalness: 0.25 });
  p.inst = p.pos.map((b) => { const g = new THREE.Group(); p.geos.forEach((geo) => { const m = new THREE.Mesh(geo, p.mat); m.userData.id = p.id; g.add(m); mallas.push(m); });
    const aristas = new THREE.LineSegments(new THREE.EdgesGeometry(p.geos[0], 30), new THREE.LineBasicMaterial({ color: 0x14213d })); g.add(aristas); g.userData.base = b; esc.add(g); return g; }); });
const ejes = new THREE.Group(); [[0, 0], ...TORN].forEach(([x, y]) => { const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, y, -120), new THREE.Vector3(x, y, 210)]);
  const l = new THREE.Line(g, new THREE.LineDashedMaterial({ color: 0x0b6fa4, dashSize: 8, gapSize: 4 })); l.computeLineDistances(); ejes.add(l); }); esc.add(ejes);
const globos = {}; PIEZAS.forEach((p) => { const d = document.createElement('div'); d.textContent = p.id;
  d.style.cssText = 'position:absolute;width:22px;height:22px;border:1.5px solid #14213d;border-radius:50%;background:#fff;color:#14213d;font:600 12px system-ui;display:grid;place-items:center;transform:translate(-50%,-50%)'; $('gb').appendChild(d); globos[p.id] = d; });
$('bom').innerHTML = '<tr><th>Pos.</th><th>Descripción</th><th>Cant.</th><th>Material</th><th>Referencia</th><th></th></tr>' +
  PIEZAS.map((p) => `<tr data-id="${p.id}" style="cursor:pointer"><td>${p.id}</td><td style="text-align:left">${p.nombre}</td><td>${p.cant}</td><td style="text-align:left">${p.material}</td><td style="text-align:left">${p.ref}</td><td><input type="checkbox" checked aria-label="Mostrar ${p.nombre}" data-v="${p.id}"></td></tr>`).join('');
let sel = null;
function render() {
  const rect = $('cont').getBoundingClientRect(), W = Math.max(rect.width, 280), H = Math.max(rect.height, 210);
  R.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); R.setSize(W, H, false); cam.aspect = W / H; cam.updateProjectionMatrix();
  const t = Number($('t').value) / 100; ejes.visible = t > 0.02;
  PIEZAS.forEach((p) => { p.inst.forEach((g) => g.position.set(g.userData.base[0] + p.exp[0] * t, g.userData.base[1] + p.exp[1] * t, g.userData.base[2] + p.exp[2] * t));
    p.mat.wireframe = $('alambre').checked; p.mat.emissive.setHex(sel === p.id ? 0x1b4f7a : 0x000000); });
  R.render(esc, cam); esc.updateMatrixWorld(true);
  PIEZAS.forEach((p) => { const g = p.inst[0], v = new THREE.Vector3(); g.getWorldPosition(v); if (p.id === 5) v.z += 30; if (p.id !== 5) v.y += 52; v.project(cam);
    const o = globos[p.id]; o.style.display = $('globos').checked && g.visible ? 'grid' : 'none'; o.style.left = ((v.x + 1) / 2) * W + 'px'; o.style.top = ((1 - v.y) / 2) * H + 'px'; o.style.background = sel === p.id ? '#0b6fa4' : '#fff'; o.style.color = sel === p.id ? '#fff' : '#14213d'; });
  document.querySelectorAll('#bom tr[data-id]').forEach((tr) => (tr.style.background = Number(tr.dataset.id) === sel ? '#dcebf5' : ''));
}
const ray = new THREE.Raycaster(), m2 = new THREE.Vector2();
R.domElement.addEventListener('pointermove', (e) => { const r = R.domElement.getBoundingClientRect(); m2.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(m2, cam);
  const h = ray.intersectObjects(mallas.filter((m) => m.parent.visible), false)[0], id = h ? h.object.userData.id : null; if (id !== sel) { sel = id; render(); } });
$('bom').addEventListener('mouseover', (e) => { const tr = e.target.closest('tr[data-id]'); if (tr && Number(tr.dataset.id) !== sel) { sel = Number(tr.dataset.id); render(); } });
$('bom').addEventListener('change', (e) => { const id = Number(e.target.dataset.v); PIEZAS.find((p) => p.id === id).inst.forEach((g) => (g.visible = e.target.checked)); render(); });
['t', 'globos', 'alambre'].forEach((i) => $(i).addEventListener('input', render));
$('rest').addEventListener('click', () => { cam.position.set(...VISTA0); ctl.target.set(0, 0, 40); ctl.update(); render(); });
ctl.addEventListener('change', render); new ResizeObserver(render).observe($('cont')); render();
