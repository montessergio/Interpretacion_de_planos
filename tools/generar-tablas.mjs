#!/usr/bin/env node
/**
 * Genera src/content/docs/modulo-05-ajustes-iso/05-tablas-de-referencia.md a partir del núcleo ISO 286
 * (public/labs/_shared/iso286-core.js). Una sola fuente de datos para tablas, calculadora y pruebas.
 * Uso: npm run generar:tablas        (--check falla si el archivo commiteado no coincide)
 */
import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { RANGOS, IT, limites, fmtUm } from '../public/labs/_shared/iso286-core.js';

const SALIDA = 'src/content/docs/modulo-05-ajustes-iso/05-tablas-de-referencia.md';
const cab = RANGOS.map(([lo, hi]) => (lo === 0 ? '≤ 3' : `>${lo}–${hi}`));
const tabla = (cabecera, filas) => ['| ' + cabecera.join(' | ') + ' |', '|' + cabecera.map((_, i) => (i ? '---:' : ':---')).join('|') + '|', ...filas.map((f) => '| ' + f.join(' | ') + ' |')].join('\n');

const filasIT = Object.keys(IT).map((g) => [`IT${g}`, ...IT[g].map((v) => String(v))]);
const celda = (des, hi) => { try { const r = limites(des, hi); return `${fmtUm(r.sup)} / ${fmtUm(r.inf)}`; } catch { return '—'; } };
const filasClase = (lista) => lista.map((des) => [`**${des}**`, ...RANGOS.map(([, hi]) => celda(des, hi))]);

const AGUJEROS = ['H6', 'H7', 'H8', 'H9', 'H11', 'G7', 'F8', 'E9', 'D9', 'JS7', 'K7', 'N7', 'P7', 'S7'];
const EJES = ['h6', 'h7', 'h9', 'h11', 'g6', 'f7', 'e8', 'd9', 'c11', 'js6', 'k6', 'm6', 'n6', 'p6', 'r6', 's6'];

const md = `---
title: "Tablas de referencia ISO 286 (generadas)"
description: "Grados de tolerancia IT y desviaciones límite de las clases más usadas, calculadas con el mismo núcleo que la calculadora interactiva."
---

:::caution[Archivo generado automáticamente]
No edite este archivo a mano: modifique \`public/labs/_shared/iso286-core.js\` y ejecute \`npm run generar:tablas\`.
:::

:::note[Estado de verificación: nivel B]
Valores transcritos de ISO 286-1:2010 y verificados con (1) recálculo por las fórmulas de la norma dentro del redondeo que ella aplica, (2) valores de referencia ampliamente publicados y (3) pruebas automáticas (\`npm test\`). La norma es de pago y **no se reprodujo su texto**: antes de fabricar o inspeccionar, confirme en ISO 286-2:2010 (con Cor 1:2013).
:::

Intervalos de tamaño nominal en mm (el límite superior pertenece al intervalo). Valores en micrómetros (µm); 1 µm = 0.001 mm = 0.03937 thou.
Las clases c, r, s sólo están cargadas hasta 120 mm (— = fuera de alcance de esta tabla).

## Grados de tolerancia normalizados IT (µm)

${tabla(['Grado', ...cab], filasIT)}

## Agujeros: ES / EI (µm)

${tabla(['Clase', ...cab], filasClase(AGUJEROS))}

## Ejes: es / ei (µm)

${tabla(['Clase', ...cab], filasClase(EJES))}

## Cómo se usan

1. Ubique el intervalo del tamaño nominal (p. ej. Ø25 → >18–30).
2. Lea la desviación superior e inferior de la clase en µm y súmelas al tamaño nominal.
3. Para un ajuste: holgura mínima = EI(agujero) − es(eje); holgura máxima = ES(agujero) − ei(eje).

Compruebe sus resultados con la [calculadora de ajustes](../../laboratorios/calculadora-iso286/).
`;

if (process.argv.includes('--check')) {
  const actual = existsSync(SALIDA) ? readFileSync(SALIDA, 'utf8') : '';
  if (actual !== md) { console.error('✗ Tablas desactualizadas. Ejecute: npm run generar:tablas'); process.exit(1); }
  console.log('✓ Tablas al día');
} else {
  mkdirSync(dirname(SALIDA), { recursive: true }); writeFileSync(SALIDA, md); console.log('✓ Generado', SALIDA);
}
