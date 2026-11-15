/** Conversiones métrico ↔ inglés. 1 in = 25.4 mm exactamente (definición internacional de 1959). */
export const MM_POR_IN = 25.4;
export const UNIDADES = { mm: 1, in: 25.4, 'µm': 0.001, thou: 0.0254, 'µin': 0.0000254 }; // valor en mm de 1 unidad
export const convertir = (valor, de, a) => (valor * UNIDADES[de]) / UNIDADES[a];
export const cAF = (c) => (c * 9) / 5 + 32;
export const fAC = (f) => ((f - 32) * 5) / 9;
