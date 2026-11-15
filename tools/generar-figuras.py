#!/usr/bin/env python3
"""Genera las figuras SVG originales del material (sin depender de imágenes con derechos de autor).
Uso:  python3 tools/generar-figuras.py          -> escribe en src/assets/img/
Las figuras son dibujos propios con fines didácticos; no reproducen figuras de las normas."""
import html, pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / "src" / "assets" / "img"
OUT.mkdir(parents=True, exist_ok=True)
INK, ACC, MUT = "#14213d", "#0b6fa4", "#46546e"
FONT = 'font-family="system-ui,Segoe UI,Arial,sans-serif"'

def svg(w, h, body, titulo):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="{html.escape(titulo)}">'
            f'<title>{html.escape(titulo)}</title><rect width="{w}" height="{h}" fill="#ffffff"/>{body}</svg>')

def t(x, y, s, size=12, anchor="start", color=INK, weight="normal"):
    return f'<text x="{x}" y="{y}" font-size="{size}" text-anchor="{anchor}" fill="{color}" font-weight="{weight}" {FONT}>{html.escape(s)}</text>'

def guardar(nombre, contenido):
    (OUT / nombre).write_text(contenido, encoding="utf-8")

# 1 ─ Hojas ISO serie A (partición sucesiva del formato A0)
def hojas():
    k = 0.2; X0, Y0 = 20, 28
    out = [t(X0, 18, "A0 · 841 × 1189 mm (1 m²)", 12, "start", INK, "bold")]
    def rect(x, y, w, h, et, dim, fill, sw=1.5):
        out.append(f'<rect x="{X0+x*k:.1f}" y="{Y0+y*k:.1f}" width="{w*k:.1f}" height="{h*k:.1f}" fill="{fill}" stroke="{INK}" stroke-width="{sw}"/>')
        if et:
            out.append(t(X0 + (x + w / 2) * k, Y0 + (y + h / 2) * k - 2, et, 14, "middle", INK, "bold"))
            out.append(t(X0 + (x + w / 2) * k, Y0 + (y + h / 2) * k + 13, dim, 10, "middle", MUT))
    rect(0, 595, 841, 594, "A1", "841 × 594", "#e8f1f7")
    rect(0, 0, 420, 595, "A2", "420 × 594", "#e3efe3")
    rect(421, 0, 420, 297, "A3", "420 × 297", "#f3efe6")
    rect(421, 297, 210, 298, "A4", "210 × 297", "#f7e7e3")
    rect(631, 297, 210, 298, "A5", "148 × 210 (A5)", "#ece6f4")
    out.append(f'<rect x="{X0}" y="{Y0}" width="{841*k:.1f}" height="{1189*k:.1f}" fill="none" stroke="{INK}" stroke-width="2.4"/>')
    return svg(int(841 * k + 40), int(1189 * k + 48), "".join(out), "Serie ISO A: cada formato es la mitad del anterior")

# 2 ─ Símbolos del método de proyección
def proyeccion():
    def tr(a): return f'<path d="M{a},18 L{a+40},10 L{a+40},46 L{a},38 Z" fill="none" stroke="{INK}" stroke-width="1.8"/>'
    def ci(c): return f'<circle cx="{c}" cy="28" r="18" fill="none" stroke="{INK}" stroke-width="1.8"/><circle cx="{c}" cy="28" r="10" fill="none" stroke="{INK}" stroke-width="1.8"/>'
    eje = lambda x: f'<line x1="{x}" x2="{x+104}" y1="28" y2="28" stroke="{INK}" stroke-width="1" stroke-dasharray="8 2 2 2"/>'
    b = f'<g transform="translate(20,24)">{tr(6)}{ci(76)}{eje(2)}</g>{t(72,100,"Primer ángulo (ISO)",13,"middle")}'
    b += f'<g transform="translate(180,24)">{ci(24)}{tr(60)}{eje(2)}</g>{t(232,100,"Tercer ángulo (ASME)",13,"middle")}'
    return svg(310, 116, b, "Símbolos del método de proyección de primer y tercer ángulo")

# 3 ─ Tipos de línea
def lineas():
    filas = [("Continua gruesa", "Contornos y aristas visibles", 3.0, ""), ("Continua fina", "Cotas, líneas de proyección, rayado", 1.2, ""),
             ("Discontinua fina", "Aristas y contornos ocultos", 1.2, "8 4"), ("Trazo y punto fina", "Ejes, centros y simetría", 1.2, "16 3 3 3"),
             ("Trazo y punto, gruesa en extremos", "Planos de corte", 1.2, "16 3 3 3"), ("Trazo y dos puntos fina", "Piezas adyacentes, posiciones extremas", 1.2, "16 3 3 3 3 3")]
    b = ""
    for i, (n, u, w, d) in enumerate(filas):
        y = 28 + i * 34
        dash = f' stroke-dasharray="{d}"' if d else ""
        b += f'<line x1="14" x2="190" y1="{y}" y2="{y}" stroke="{INK}" stroke-width="{w}"{dash}/>'
        if i == 4: b += f'<line x1="14" x2="34" y1="{y}" y2="{y}" stroke="{INK}" stroke-width="3"/><line x1="170" x2="190" y1="{y}" y2="{y}" stroke="{INK}" stroke-width="3"/>'
        b += t(204, y - 3, n, 12, "start", INK, "bold") + t(204, y + 11, u, 11, "start", MUT)
    return svg(520, 28 + len(filas) * 34, b, "Tipos de línea usados en dibujo técnico")

# 4 ─ Símbolos GD&T (dibujos propios; trazo 2)
def simbolos():
    S = f'fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
    P = {
     "Rectitud": '<path d="M6,20 L34,20"/>',
     "Planicidad": '<path d="M6,27 L28,27 L34,13 L12,13 Z"/>',
     "Circularidad": '<circle cx="20" cy="20" r="12"/>',
     "Cilindricidad": '<circle cx="20" cy="20" r="8"/><path d="M33.9,11.9 L19.9,36.1 M20.1,3.9 L6.1,28.1"/>',
     "Perfil de línea": '<path d="M6,28 A14,14 0 0 1 34,28"/>',
     "Perfil de superficie": '<path d="M6,28 A14,14 0 0 1 34,28 Z"/>',
     "Angularidad": '<path d="M6,32 L34,32 M6,32 L26,8"/>',
     "Perpendicularidad": '<path d="M20,8 L20,32 M6,32 L34,32"/>',
     "Paralelismo": '<path d="M12,32 L22,8 M22,32 L32,8"/>',
     "Posición": '<circle cx="20" cy="20" r="9"/><path d="M20,4 L20,36 M4,20 L36,20"/>',
     "Alabeo circular": f'<path d="M8,32 L30,10"/><path d="M33,7 L23,9 L31,17 Z" fill="{INK}"/>',
     "Alabeo total": f'<path d="M6,34 L22,18 M16,34 L32,18 M6,34 L16,34"/><path d="M26,14 L18,16 L24,22 Z M36,14 L28,16 L34,22 Z" fill="{INK}"/>',
     "Concentricidad / coaxialidad": '<circle cx="20" cy="20" r="13"/><circle cx="20" cy="20" r="6"/>',
     "Simetría": '<path d="M8,12 L32,12 M4,20 L36,20 M8,28 L32,28"/>',
    }
    solo_iso = {"Concentricidad / coaxialidad", "Simetría"}
    b = ""
    for i, (n, d) in enumerate(P.items()):
        c, r = i % 5, i // 5; x, y = 10 + c * 118, 10 + r * 92
        b += f'<g transform="translate({x+29},{y})"><rect x="-1" y="-1" width="42" height="42" fill="#f6f8fb" stroke="#9aa8bd"/><g {S}>{d}</g></g>'
        b += t(x + 50, y + 58, n, 11, "middle", INK, "bold")
        b += t(x + 50, y + 72, "sólo ISO 1101" if n in solo_iso else "ISO y ASME", 10, "middle", MUT)
    return svg(600, 290, b, "Símbolos de características geométricas (GD&T)")

# 5 ─ Marco de control de característica
def marco():
    b = f'<g stroke="{INK}" stroke-width="2" fill="#fff"><rect x="40" y="40" width="44" height="40"/><rect x="84" y="40" width="110" height="40"/><rect x="194" y="40" width="40" height="40"/><rect x="234" y="40" width="40" height="40"/><rect x="274" y="40" width="40" height="40"/></g>'
    b += f'<g transform="translate(44,40)" fill="none" stroke="{INK}" stroke-width="2"><circle cx="18" cy="20" r="8"/><path d="M18,6 L18,34 M4,20 L32,20"/></g>'
    b += t(104, 66, "Ø0.2", 20) + f'<circle cx="170" cy="60" r="10" fill="none" stroke="{INK}" stroke-width="2"/>' + t(170, 65, "M", 14, "middle", INK, "bold")
    b += t(214, 66, "A", 20, "middle") + t(254, 66, "B", 20, "middle") + t(294, 66, "C", 20, "middle")
    for x, n in [(62, "1"), (139, "2"), (254, "3")]:
        b += f'<circle cx="{x}" cy="22" r="10" fill="none" stroke="{ACC}" stroke-width="1.5"/>' + t(x, 27, n, 13, "middle", ACC, "bold") + f'<line x1="{x}" y1="32" x2="{x}" y2="40" stroke="{ACC}" stroke-width="1.2"/>'
    b += t(20, 112, "1 · símbolo de la característica (aquí, posición)", 12, "start", ACC)
    b += t(20, 132, "2 · valor de tolerancia (Ø = zona cilíndrica) y modificador Ⓜ (MMC)", 12, "start", ACC)
    b += t(20, 152, "3 · referencias en orden de precedencia: primaria, secundaria, terciaria", 12, "start", ACC)
    return svg(520, 170, b, "Marco de control de característica geométrica")

# 6 ─ Símbolos básicos de rugosidad (esquema didáctico; las proporciones exactas están en ISO 21920-1 / ASME Y14.36)
def rugosidad():
    def base(x, extra=""):
        return (f'<g transform="translate({x},70)" fill="none" stroke="{INK}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round">'
                f'<path d="M-14,-12 L0,12 L30,-40 L70,-40"/>{extra}</g>')
    b = base(40) + base(200, '<path d="M-14,-12 L19,-12"/>') + base(360, '<circle cx="10" cy="-14" r="9"/>')
    for x, n, d in [(40, "Símbolo básico", "no dice si se maquina"), (200, "Con remoción de material", "se exige mecanizado"), (360, "Sin remoción de material", "superficie tal cual (colada, forja…)")]:
        b += t(x + 25, 112, n, 12, "middle", INK, "bold") + t(x + 25, 128, d, 10, "middle", MUT)
    return svg(470, 146, b, "Símbolos básicos de textura superficial (esquema)")

# 7 ─ Zonas de tolerancia de ajustes Ø25 (valores en µm)
def zonas():
    y = lambda u: 30 + (45 - u) * 4.2
    z = y(0); b = f'<line x1="30" x2="540" y1="{z}" y2="{z}" stroke="{INK}" stroke-width="1.5" stroke-dasharray="12 3 3 3"/>' + t(34, z - 6, "línea cero (Ø25)", 11)
    def zona(x, inf, sup, col, n, sub):
        return (f'<rect x="{x}" y="{y(sup)}" width="70" height="{(sup-inf)*4.2:.1f}" fill="{col}" fill-opacity=".25" stroke="{col}" stroke-width="2"/>'
                + t(x + 35, y(sup) - 6, n, 12, "middle", INK, "bold") + t(x + 78, y(sup) + 4, f"{sup:+d}".replace("+0", "0"), 10, "start", MUT) + t(x + 78, y(inf) + 4, f"{inf:+d}".replace("+0", "0"), 10, "start", MUT) + t(x + 35, y(inf) + 16, sub, 10, "middle", MUT))
    b += zona(50, 0, 21, ACC, "H7", "agujero")
    b += zona(190, -20, -7, "#c2410c", "g6", "holgura")
    b += zona(300, 2, 15, "#c2410c", "k6", "transición")
    b += zona(410, 22, 35, "#c2410c", "p6", "interferencia")
    return svg(570, 280, b, "Zonas de tolerancia H7 con g6, k6 y p6 para Ø25 mm (µm)")

# 8 ─ Anatomía del símbolo de soldadura (ISO 2553 y AWS A2.4, esquemático)
def soldadura():
    def fil(x, y, arriba=True):
        return (f'<path d="M{x},{y} L{x},{y-22} L{x+22},{y} Z" fill="none" stroke="{INK}" stroke-width="2"/>' if arriba
                else f'<path d="M{x},{y} L{x},{y+22} L{x+22},{y} Z" fill="none" stroke="{INK}" stroke-width="2"/>')
    flecha = lambda y: (f'<line x1="60" y1="{y}" x2="24" y2="{y+46}" stroke="{INK}" stroke-width="2"/><path d="M24,{y+46} L36,{y+39} L29,{y+33} Z" fill="{INK}"/>')
    cola = lambda y, txt: (f'<path d="M300,{y} L318,{y-14} M300,{y} L318,{y+14}" stroke="{INK}" stroke-width="2" fill="none"/>' + t(326, y + 4, txt, 13, "start", INK, "bold"))
    iso = t(210, 20, "ISO 2553", 15, "middle", INK, "bold")
    iso += f'<line x1="60" x2="300" y1="84" y2="84" stroke="{INK}" stroke-width="2"/><line x1="60" x2="300" y1="91" y2="91" stroke="{INK}" stroke-width="1.6" stroke-dasharray="7 4"/>'
    iso += flecha(84) + fil(130, 84) + t(160, 74, "a5", 14, "start", INK, "bold") + cola(84, "111")
    iso += t(100, 52, "símbolo + dimensión (a = garganta, z = cateto)", 11, "start", ACC)
    iso += t(318, 112, "cola: proceso (ISO 4063)", 11, "middle", ACC)
    iso += t(20, 150, "Línea continua = lado de la flecha; discontinua = lado opuesto.", 11, "start", ACC) + t(66, 122, "línea de flecha", 11, "start", MUT)
    g0 = 176
    aws = f'<g transform="translate(0,{g0})">' + t(210, 20, "AWS A2.4", 15, "middle", INK, "bold")
    aws += f'<line x1="60" x2="300" y1="84" y2="84" stroke="{INK}" stroke-width="2"/>' + flecha(84)
    aws += fil(130, 84, True) + t(122, 74, "6", 14, "end", INK, "bold") + fil(130, 84, False) + t(122, 106, "6", 14, "end", INK, "bold")
    aws += cola(84, "GMAW")
    aws += f'<circle cx="60" cy="84" r="6" fill="#fff" stroke="{INK}" stroke-width="2"/><line x1="60" y1="78" x2="60" y2="52" stroke="{INK}" stroke-width="2"/><path d="M60,52 L60,64 L78,58 Z" fill="{INK}"/>'
    aws += t(20, 150, "Lado de la flecha: bajo la línea; lado opuesto: sobre la línea.", 11, "start", ACC)
    aws += t(20, 166, "Círculo: soldar todo alrededor · bandera: soldadura en campo.", 11, "start", ACC) + "</g>"
    return svg(440, 372, iso + aws, "Anatomía del símbolo de soldadura según ISO 2553 y AWS A2.4 (esquema)")

for nombre, f in [("hojas-iso-a.svg", hojas), ("simbolos-proyeccion.svg", proyeccion), ("tipos-de-linea.svg", lineas), ("simbolos-gdt.svg", simbolos),
                  ("marco-control-gdt.svg", marco), ("simbolo-rugosidad.svg", rugosidad), ("zonas-ajustes.svg", zonas), ("anatomia-soldadura.svg", soldadura)]:
    guardar(nombre, f()); print("ok", nombre)
