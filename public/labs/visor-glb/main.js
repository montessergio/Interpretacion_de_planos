import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const $ = (i) => document.getElementById(i);
let R; try { R = new THREE.WebGLRenderer({ antialias: true }); } catch (e) { $('msg').textContent = 'Su navegador no pudo iniciar WebGL.'; throw e; }
$('gl').appendChild(R.domElement); R.domElement.style.cssText = 'width:100%;height:100%;display:block';
const esc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(35, 16 / 10, 0.01, 10000), ejes = new THREE.AxesHelper(1);
esc.add(new THREE.AmbientLight(0xffffff, 1.5), ejes); const luz = new THREE.DirectionalLight(0xffffff, 2.4); luz.position.set(2, 3, 4); esc.add(luz);
const ctl = new OrbitControls(cam, R.domElement); let modelo = null;
function render() { const W = Math.max($('gl').clientWidth, 280), H = Math.max($('gl').clientHeight, 180); R.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); R.setSize(W, H, false); cam.aspect = W / H; cam.updateProjectionMatrix();
  R.setClearColor($('oscuro').checked ? 0x1b2433 : 0xffffff, 1); ejes.visible = $('ejes').checked; modelo?.traverse((o) => { if (o.isMesh) [].concat(o.material).forEach((m) => (m.wireframe = $('alambre').checked)); }); R.render(esc, cam); }
function mostrar(gltf, nombre) {
  if (modelo) esc.remove(modelo); modelo = gltf.scene; esc.add(modelo);
  const box = new THREE.Box3().setFromObject(modelo), size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3()), r = Math.max(size.length(), 1e-6);
  ctl.target.copy(c); cam.position.copy(c).add(new THREE.Vector3(1, 0.7, 1.2).normalize().multiplyScalar(r * 1.4)); cam.near = r / 1000; cam.far = r * 100; ejes.scale.setScalar(r / 4); ejes.position.copy(box.min); ctl.update();
  let mallas = 0, tris = 0; modelo.traverse((o) => { if (o.isMesh) { mallas++; tris += (o.geometry.index ? o.geometry.index.count : o.geometry.attributes.position.count) / 3; } });
  $('info').textContent = `${nombre}: ${mallas} mallas · ${Math.round(tris).toLocaleString('es-MX')} triángulos · dimensiones ${size.x.toFixed(2)} × ${size.y.toFixed(2)} × ${size.z.toFixed(2)} (unidades del modelo; glTF usa metros)`; $('msg').textContent = ''; render();
}
const L = new GLTFLoader(), err = (e) => ($('msg').textContent = 'No se pudo leer el modelo: ' + (e.message || e));
function archivo(f) { f.arrayBuffer().then((b) => L.parse(b, '', (g) => mostrar(g, f.name), err)).catch(err); }
$('f').addEventListener('change', (e) => e.target.files[0] && archivo(e.target.files[0]));
document.body.addEventListener('dragover', (e) => e.preventDefault()); document.body.addEventListener('drop', (e) => { e.preventDefault(); e.dataTransfer.files[0] && archivo(e.dataTransfer.files[0]); });
const q = new URLSearchParams(location.search).get('modelo'); if (q) L.load(q, (g) => mostrar(g, q), undefined, err);
['alambre', 'ejes', 'oscuro'].forEach((i) => $(i).addEventListener('input', render)); ctl.addEventListener('change', render); new ResizeObserver(render).observe($('gl')); render();
