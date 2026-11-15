/** Rugosidad: parámetros de perfil (definiciones de ISO 4287 / ISO 21920-2, línea media simplificada = media aritmética). z en µm. */
export function parametros(z, nSecciones = 5) {
  const N = z.length; if (N < nSecciones * 4) throw new RangeError('Perfil demasiado corto');
  const media = z.reduce((a, b) => a + b, 0) / N, p = z.map((v) => v - media);
  const Ra = p.reduce((a, v) => a + Math.abs(v), 0) / N;
  const Rq = Math.sqrt(p.reduce((a, v) => a + v * v, 0) / N);
  const Rsk = p.reduce((a, v) => a + v ** 3, 0) / N / Rq ** 3;
  const secciones = [], n = Math.floor(N / nSecciones);
  for (let i = 0; i < nSecciones; i++) { const s = p.slice(i * n, (i + 1) * n); const Rp = Math.max(...s), Rv = -Math.min(...s); secciones.push({ Rp, Rv, Rz: Rp + Rv }); }
  const RzMedio = secciones.reduce((a, s) => a + s.Rz, 0) / nSecciones, RzMax = Math.max(...secciones.map((s) => s.Rz));
  return { Ra, Rq, Rsk, Rp: Math.max(...secciones.map((s) => s.Rp)), Rv: Math.max(...secciones.map((s) => s.Rv)), RzMedio, RzMax, secciones, perfil: p };
}
function prng(seed) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
/** Perfil sintético de banda limitada y semilla reproducible, escalado a un Ra objetivo. Longitudes en mm. */
export function generarPerfil({ Ra, lambdaMin, lambdaMax, longitud, puntos = 2000, semilla = 1 }) {
  const rnd = prng(semilla), comp = [];
  for (let k = 0; k < 28; k++) { const lam = lambdaMin * (lambdaMax / lambdaMin) ** rnd(); comp.push({ lam, fase: rnd() * 2 * Math.PI, amp: Math.sqrt(lam) * (0.4 + rnd()) }); }
  const x = [], z = [];
  for (let i = 0; i < puntos; i++) { const xi = (i / (puntos - 1)) * longitud; x.push(xi); z.push(comp.reduce((a, c) => a + c.amp * Math.sin((2 * Math.PI * xi) / c.lam + c.fase), 0)); }
  const m = z.reduce((a, b) => a + b, 0) / z.length, Ra0 = z.reduce((a, v) => a + Math.abs(v - m), 0) / z.length;
  return { x, z: z.map((v) => ((v - m) * Ra) / Ra0) };
}
export const CLASES_N = [['N1',0.025],['N2',0.05],['N3',0.1],['N4',0.2],['N5',0.4],['N6',0.8],['N7',1.6],['N8',3.2],['N9',6.3],['N10',12.5],['N11',25],['N12',50]];
export const claseN = (Ra) => CLASES_N.reduce((b, c) => (Math.abs(Math.log(c[1] / Ra)) < Math.abs(Math.log(b[1] / Ra)) ? c : b));
/** Longitud de onda de corte λc (mm) recomendada según Ra (µm): clases de ajuste de ISO 21920-3 (mismos valores que ISO 4288). */
export const lambdaC = (Ra) => (Ra <= 0.02 ? 0.08 : Ra <= 0.1 ? 0.25 : Ra <= 2 ? 0.8 : Ra <= 10 ? 2.5 : 8);
export const umAMicropulgadas = (um) => um / 0.0254;
