import { COLORS } from "./styles/colors.js";
import { SIZES } from "./styles/variables.js";

export const URL_FILES = "./src/assets/"


export function setTheme(theme = "light") {
    // Guarda o reemplaza el tema en localStorage
    localStorage.setItem("theme", theme);
    console.log("Theme:", theme);
    return theme;
}

export function slugify(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')       // elimina acentos combinados
        .replace(/[^a-z0-9\s-]/g, '')          // elimina caracteres extraños
        .trim()                                 // quita espacios al inicio y fin
        .replace(/\s+/g, '-')                   // reemplaza espacios por guion
        .replace(/-+/g, '-');                   // reemplaza guiones múltiples por uno solo
}

export function parseType(type) {
    const parts = type.split("-")
    let baseType = parts[0]

    // Manejo especial para transparent-white / transparent-black
    if (type.startsWith("transparent-white")) baseType = "transparent-white"
    if (type.startsWith("transparent-black")) baseType = "transparent-black"

    const outline = parts.includes("outline")
    const shadePart = parts.find(p => /^\d+$/.test(p))
    const shade = shadePart ? Number(shadePart) : null
    return { baseType, outline, shade }
}

export function resolveStyle({ type, size, style = {}, hover = false, styleBase = {}}) {
    const { baseType, outline, shade } = parseType(type)
    const colorKey = COLORS.types[baseType]

    // BASE 
    if (!hover) {
        let base
        if (outline) {
            base = COLORS["base-outline"][colorKey] || {}
        } else if (shade && COLORS[colorKey]?.[shade]) {
            base = COLORS[colorKey][shade]
        } else {
            base = COLORS.base[colorKey] || {}
        }

        return {
            ...styleBase,
            ...SIZES[size] || SIZES.md,
            ...base,
            border: base.borderColor
                ? `1px solid ${base.borderColor}`
                : "none",
            ...style
        }
    }
    // HOVER 
    if (!outline)
        return { backgroundColor: COLORS.hover[colorKey], color: COLORS.base[colorKey]?.color }

    if (shade && COLORS[colorKey]?.[shade])
        return COLORS[colorKey][shade]

    return COLORS.base[colorKey] || {}
}
/* 
Función auxiliar para agregar CSS/JS si no existe

Ejemplo de uso: 
    Tema
    injectOnce("link", {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.css",
        id: "prism-theme"
    });
*/
export function injectOnce(tag, attrs) {
    const selector = tag + (attrs.id ? `#${attrs.id}` : '');
    if (!document.querySelector(selector)) {
        const el = document.createElement(tag);
        Object.keys(attrs).forEach(k => el.setAttribute(k, attrs[k]));
        document.head.appendChild(el);
    }
}

