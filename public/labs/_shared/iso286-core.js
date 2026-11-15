/**
 * Núcleo de cálculo ISO 286 (sistema ISO de tolerancias para tamaños lineales).
 * Fuente única de datos: lo usan la calculadora web, el generador de tablas y las pruebas.
 *
 * ALCANCE: tamaños nominales 0 < D <= 500 mm.
 *   - IT1..IT16 (13 escalones principales).
 *   - Agujeros: C(*), D, E, F, G, H, JS, K(IT<=8), M(IT<=8), N(IT<=8), P(IT<=7), R(*)(IT<=7), S(*)(IT<=7)
 *   - Ejes:     c(*), d, e, f, g, h, js, k, m, n, p, r(*), s(*)
 *   (*) c, r, s usan subescalones y sólo están cargados hasta 120 mm.
 * Valores en micrómetros (µm). Datos transcritos de ISO 286-1:2010 y verificados con
 * recálculo por fórmulas y valores de referencia (ver docs/referencia/indice-de-normas).
 * ESTADO DE VERIFICACIÓN: nivel B (fuentes secundarias + recálculo). La norma es de pago.
 */
export const ALCANCE_MAX_MM = 500;
export const RANGOS = [[0,3],[3,6],[6,10],[10,18],[18,30],[30,50],[50,80],[80,120],[120,180],[180,250],[250,315],[315,400],[400,500]];
const SUBRANGOS = [[0,3],[3,6],[6,10],[10,14],[14,18],[18,24],[24,30],[30,40],[40,50],[50,65],[65,80],[80,100],[100,120]];

export const IT = {
  1:[0.8,1,1,1.2,1.5,1.5,2,2.5,3.5,4.5,6,7,8],
  2:[1.2,1.5,1.5,2,2.5,2.5,3,4,5,7,8,9,10],
  3:[2,2.5,2.5,3,4,4,5,6,8,10,12,13,15],
  4:[3,4,4,5,6,7,8,10,12,14,16,18,20],
  5:[4,5,6,8,9,11,13,15,18,20,23,25,27],
  6:[6,8,9,11,13,16,19,22,25,29,32,36,40],
  7:[10,12,15,18,21,25,30,35,40,46,52,57,63],
  8:[14,18,22,27,33,39,46,54,63,72,81,89,97],
  9:[25,30,36,43,52,62,74,87,100,115,130,140,155],
  10:[40,48,58,70,84,100,120,140,160,185,210,230,250],
  11:[60,75,90,110,130,160,190,220,250,290,320,360,400],
  12:[100,120,150,180,210,250,300,350,400,460,520,570,630],
  13:[140,180,220,270,330,390,460,540,630,720,810,890,970],
  14:[250,300,360,430,520,620,740,870,1000,1150,1300,1400,1550],
  15:[400,480,580,700,840,1000,1200,1400,1600,1850,2100,2300,2500],
  16:[600,750,900,1100,1300,1600,1900,2200,2500,2900,3200,3600,4000],
};

// Desviaciones fundamentales de ejes (µm). d,e,f,g -> es ; k,m,n,p -> ei
const FD = {
  d:[-20,-30,-40,-50,-65,-80,-100,-120,-145,-170,-190,-210,-230],
  e:[-14,-20,-25,-32,-40,-50,-60,-72,-85,-100,-110,-125,-135],
  f:[-6,-10,-13,-16,-20,-25,-30,-36,-43,-50,-56,-62,-68],
  g:[-2,-4,-5,-6,-7,-9,-10,-12,-14,-15,-17,-18,-20],
  k:[0,1,1,1,2,2,2,3,3,4,4,4,5],
  m:[2,4,6,7,8,9,11,13,15,17,20,21,23],
  n:[4,8,10,12,15,17,20,23,27,31,34,37,40],
  p:[6,12,15,18,22,26,32,37,43,50,56,62,68],
};
// Con subescalones (sólo <= 120 mm)
const FD_SUB = {
  c:[-60,-70,-80,-95,-95,-110,-110,-120,-130,-140,-150,-170,-180],
  r:[10,15,19,23,23,28,28,34,34,41,43,51,54],
  s:[14,19,23,28,28,35,35,43,43,53,59,71,79],
};

export function indicePrincipal(d) {
  if (!(d > 0) || d > ALCANCE_MAX_MM) throw new RangeError(`Tamaño fuera de alcance (0 < D ≤ ${ALCANCE_MAX_MM} mm)`);
  return RANGOS.findIndex(([lo, hi]) => d > lo && d <= hi);
}
function indiceSub(d) {
  if (d > 120) throw new RangeError('Las clases c, r, s (C, R, S) sólo están cargadas hasta 120 mm; consulte ISO 286-2.');
  return SUBRANGOS.findIndex(([lo, hi]) => d > lo && d <= hi);
}
export function tolerancia(grado, d) {
  const v = IT[grado]?.[indicePrincipal(d)];
  if (v === undefined) throw new RangeError(`Grado IT${grado} no disponible (IT1–IT16)`);
  return v;
}
function mitadJS(grado, t) {
  // ISO 286-1: en IT7–IT11, si IT es impar se toma el par inmediato inferior.
  if (grado >= 7 && grado <= 11 && Number.isInteger(t) && t % 2 === 1) return (t - 1) / 2;
  return t / 2;
}
function delta(grado, i) { return IT[grado][i] - IT[grado - 1][i]; }

/** Desviaciones de un eje (letra minúscula). Devuelve {es, ei} en µm. */
function eje(letra, grado, d) {
  const i = indicePrincipal(d), t = tolerancia(grado, d);
  if (letra === 'h') return { es: 0, ei: -t };
  if (letra === 'js') { const m = mitadJS(grado, t); return { es: m, ei: -m }; }
  if ('defg'.includes(letra)) { const es = FD[letra][i]; return { es, ei: es - t }; }
  if (letra === 'k') { const ei = grado >= 4 && grado <= 7 ? FD.k[i] : 0; return { es: ei + t, ei }; }
  if ('mnp'.includes(letra)) { const ei = FD[letra][i]; return { es: ei + t, ei }; }
  if (letra === 'c') { const es = FD_SUB.c[indiceSub(d)]; return { es, ei: es - t }; }
  if ('rs'.includes(letra)) { const ei = FD_SUB[letra][indiceSub(d)]; return { es: ei + t, ei }; }
  throw new RangeError(`Letra de eje '${letra}' no soportada`);
}

/** Desviaciones de un agujero (letra mayúscula). Devuelve {ES, EI} en µm. */
function agujero(letra, grado, d) {
  const i = indicePrincipal(d), t = tolerancia(grado, d), l = letra.toLowerCase();
  if (letra === 'H') return { ES: t, EI: 0 };
  if (letra === 'JS') { const m = mitadJS(grado, t); return { ES: m, EI: -m }; }
  if ('CDEFG'.includes(letra)) { const e = eje(l, grado, d).es; return { EI: -e, ES: -e + t }; }
  if ('KMN'.includes(letra)) {
    if (grado > 8) throw new RangeError(`${letra}${grado}: la calculadora sólo soporta ${letra} hasta IT8`);
    const ei = l === 'k' ? FD.k[i] : FD[l][i];
    const ES = -ei + delta(grado, i);
    return { ES, EI: ES - t };
  }
  if ('PRS'.includes(letra)) {
    if (grado > 7) throw new RangeError(`${letra}${grado}: la calculadora sólo soporta ${letra} hasta IT7`);
    const ei = l === 'p' ? FD.p[i] : FD_SUB[l][indiceSub(d)];
    const ES = -ei + delta(grado, i);
    return { ES, EI: ES - t };
  }
  throw new RangeError(`Letra de agujero '${letra}' no soportada`);
}

export function parsear(designacion) {
  const m = /^(js|JS|[A-Za-z])(\d{1,2})$/.exec(String(designacion).trim());
  if (!m) throw new SyntaxError(`Designación inválida: '${designacion}' (ejemplos: H7, g6, JS7)`);
  return { letra: m[1], grado: Number(m[2]) };
}

/** Límites de una clase de tolerancia ISO (agujero si la letra es mayúscula, eje si es minúscula). */
export function limites(designacion, tamanoMm) {
  const { letra, grado } = parsear(designacion);
  const esAgujero = letra === letra.toUpperCase();
  const r = esAgujero ? agujero(letra, grado, tamanoMm) : eje(letra, grado, tamanoMm);
  const sup = esAgujero ? r.ES : r.es, inf = esAgujero ? r.EI : r.ei;
  return {
    tipo: esAgujero ? 'agujero' : 'eje', designacion, letra, grado, tamanoMm,
    sup, inf, IT: sup - inf,
    maxMm: +(tamanoMm + sup / 1000).toFixed(4), minMm: +(tamanoMm + inf / 1000).toFixed(4),
  };
}

/** Ajuste agujero/eje. Holgura = agujero − eje. */
export function ajuste(agujeroDes, ejeDes, tamanoMm) {
  const a = limites(agujeroDes, tamanoMm), e = limites(ejeDes, tamanoMm);
  if (a.tipo !== 'agujero' || e.tipo !== 'eje') throw new TypeError('Use mayúscula para el agujero y minúscula para el eje');
  const holguraMin = a.inf - e.sup, holguraMax = a.sup - e.inf;
  const clase = holguraMin >= 0 ? 'con holgura' : holguraMax <= 0 ? 'con interferencia' : 'de transición';
  return { agujero: a, eje: e, holguraMin, holguraMax, aprieteMax: Math.max(0, -holguraMin), clase, toleranciaAjuste: a.IT + e.IT };
}

export const AJUSTES_PREFERENTES = {
  'Sistema agujero base': ['H11/c11','H9/d9','H8/f7','H7/g6','H7/h6','H7/k6','H7/n6','H7/p6','H7/s6'],
  'Sistema eje base': ['C11/h11','D9/h9','F8/h7','G7/h6','H7/h6','K7/h6','N7/h6','P7/h6','S7/h6'],
};
export const fmtUm = (v) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toString().replace(/^0$/, '0');
