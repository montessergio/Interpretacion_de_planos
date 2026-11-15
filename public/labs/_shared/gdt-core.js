/** GD&T: tolerancia de posición con modificadores de condición de material (ASME Y14.5 / ISO 2692). Unidades libres (mm o in). */
export function condiciones(caracteristica, min, max) {
  if (!(max >= min)) throw new RangeError('El tamaño máximo debe ser ≥ al mínimo');
  return caracteristica === 'agujero' ? { MMC: min, LMC: max } : { MMC: max, LMC: min };
}
/** Bonus: tolerancia adicional por desviación del tamaño real respecto de la condición modificada. */
export function bonus({ caracteristica, modificador, min, max, real }) {
  if (real < min - 1e-12 || real > max + 1e-12) throw new RangeError('El tamaño real está fuera de los límites de tamaño');
  if (modificador === 'RFS') return 0;
  const c = condiciones(caracteristica, min, max);
  const b = caracteristica === 'agujero'
    ? (modificador === 'MMC' ? real - c.MMC : c.LMC - real)
    : (modificador === 'MMC' ? c.MMC - real : real - c.LMC);
  return Math.max(0, +b.toFixed(10));
}
export const desviacionDiametral = (dx, dy) => 2 * Math.hypot(dx, dy);
export function evaluarPosicion(p) {
  const b = bonus(p), admisible = +(p.tol + b).toFixed(10), desv = +desviacionDiametral(p.dx, p.dy).toFixed(10);
  return { bonus: b, admisible, desviacion: desv, conforme: desv <= admisible + 1e-12 };
}
/** Condición virtual (MMC) o condición resultante (LMC). */
export function condicionVirtual({ caracteristica, modificador, min, max, tol }) {
  const c = condiciones(caracteristica, min, max);
  if (modificador === 'MMC') return caracteristica === 'agujero' ? c.MMC - tol : c.MMC + tol;
  if (modificador === 'LMC') return caracteristica === 'agujero' ? c.LMC + tol : c.LMC - tol;
  throw new TypeError('La condición virtual/resultante sólo aplica con MMC o LMC');
}
/** Tolerancia de posición (diametral, a MMC) para sujetadores. H = agujero de paso en MMC (mínimo); F = sujetador en MMC (máximo). */
export function sujetadores({ H, F, tipo }) {
  if (H < F) throw new RangeError('H (agujero en MMC) no puede ser menor que F (sujetador en MMC)');
  return +(tipo === 'fijo' ? (H - F) / 2 : H - F).toFixed(10);
}
/** ISO 273: agujeros de paso [fino, medio, grueso] en mm. */
export const ISO273 = { M3:[3.2,3.4,3.6], M4:[4.3,4.5,4.8], M5:[5.3,5.5,5.8], M6:[6.4,6.6,7], M8:[8.4,9,10], M10:[10.5,11,12], M12:[13,13.5,14.5], M16:[17,17.5,18.5], M20:[21,22,24] };
export const DIAM_NOMINAL = { M3:3, M4:4, M5:5, M6:6, M8:8, M10:10, M12:12, M16:16, M20:20 };
