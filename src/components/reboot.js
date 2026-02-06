import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, IntroContentSection } from "./layout.js"
import { CodeBlock, H3, Text } from "./text.js"
import { MyOrderedList } from "./lists.js"

/**
 * injectRebootStyles - Inyecta estilos base globales (Reboot/Normalize)
 * Llamar una vez al inicio de la aplicación
 */
export function injectRebootStyles() {
    const styleId = "my-ui-lib-reboot"
    if (document.getElementById(styleId)) return

    const css = `
/* Box sizing */
*,
*::before,
*::after {
    box-sizing: border-box;
}

/* Root */
:root {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
}

/* Body */
body {
    margin: 0;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
}

/* Paragraphs */
p {
    margin-top: 0;
    margin-bottom: 1rem;
}

/* Links */
a {
    color: #0A6FFD;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

/* Lists */
ol, ul {
    padding-left: 2rem;
    margin-top: 0;
    margin-bottom: 1rem;
}

ol ol, ul ul, ol ul, ul ol {
    margin-bottom: 0;
}

/* Images */
img, svg {
    vertical-align: middle;
}

img {
    max-width: 100%;
    height: auto;
}

/* Tables */
table {
    caption-side: bottom;
    border-collapse: collapse;
}

th {
    text-align: inherit;
    text-align: -webkit-match-parent;
}

/* Forms */
label {
    display: inline-block;
}

button {
    border-radius: 0;
}

button:focus:not(:focus-visible) {
    outline: 0;
}

input, button, select, optgroup, textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}

button, select {
    text-transform: none;
}

[role="button"] {
    cursor: pointer;
}

select {
    word-wrap: normal;
}

select:disabled {
    opacity: 1;
}

button,
[type="button"],
[type="reset"],
[type="submit"] {
    -webkit-appearance: button;
}

button:not(:disabled),
[type="button"]:not(:disabled),
[type="reset"]:not(:disabled),
[type="submit"]:not(:disabled) {
    cursor: pointer;
}

::-moz-focus-inner {
    padding: 0;
    border-style: none;
}

textarea {
    resize: vertical;
}

fieldset {
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
}

legend {
    float: left;
    width: 100%;
    padding: 0;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    line-height: inherit;
}

/* Code */
pre, code, kbd, samp {
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 1em;
}

pre {
    display: block;
    margin-top: 0;
    margin-bottom: 1rem;
    overflow: auto;
    font-size: 0.875em;
}

/* Misc */
hr {
    margin: 1rem 0;
    color: inherit;
    border: 0;
    border-top: 1px solid;
    opacity: 0.25;
}

abbr[title] {
    text-decoration: underline dotted;
    cursor: help;
    text-decoration-skip-ink: none;
}

address {
    margin-bottom: 1rem;
    font-style: normal;
    line-height: inherit;
}

blockquote {
    margin: 0 0 1rem;
}

b, strong {
    font-weight: bolder;
}

small {
    font-size: 0.875em;
}

mark {
    padding: 0.1875em;
    background-color: #fcf8e3;
}

sub, sup {
    position: relative;
    font-size: 0.75em;
    line-height: 0;
    vertical-align: baseline;
}

sub {
    bottom: -0.25em;
}

sup {
    top: -0.5em;
}

/* Hidden */
[hidden] {
    display: none !important;
}
`

    const style = document.createElement("style")
    style.id = styleId
    style.textContent = css
    document.head.appendChild(style)
}

/**
 * RebootPage - Página de documentación de Reboot
 */
export function RebootPage() {
    return {
        view: () => {
            return m(FlexCol, { gap: "3rem", alignItems: "flex-start" }, [
                // Intro
                m(IntroContentSection, {
                    title: "Reboot",
                    subtitle: "Colección de estilos CSS base para normalizar y establecer valores por defecto consistentes entre navegadores."
                }),

                // Descripción
                m(ContentSection, {
                    title: "Qué es Reboot",
                    paragraphs: [
                        "Reboot se basa en Normalize.css y proporciona estilos opinados para elementos HTML comunes usando solo selectores de elementos. Los estilos adicionales se aplican solo con clases (o en nuestro caso, componentes)."
                    ],
                    alignItems: "flex-start"
                }, [
                    m(MyOrderedList, [
                        "Normaliza estilos entre navegadores",
                        "Usa rem para escalado consistente",
                        "Evita margin-top para flujo vertical predecible",
                        "Hereda font-family en formularios",
                        "box-sizing: border-box global"
                    ])
                ]),

                // Box sizing
                m(ContentSection, {
                    title: "Box-sizing",
                    paragraphs: ["Todos los elementos usan border-box para un modelo de caja más intuitivo:"],
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, { code: `*,
*::before,
*::after {
    box-sizing: border-box;
}` })
                ]),

                // Body
                m(ContentSection, {
                    title: "Body",
                    paragraphs: ["Estilos base para el body:"],
                    alignItems: "flex-start"
                }, [
                    m("div", { style: { backgroundColor: COLORS.gray[100].backgroundColor, padding: "1rem", borderRadius: VARIABLES.borderRadius, width: "100%" } }, [
                        m(Text, { margin: "0" }, [m("strong", "margin: "), "0"]),
                        m(Text, { margin: "0" }, [m("strong", "font-family: "), "system-ui, -apple-system, Segoe UI, Roboto, ..."]),
                        m(Text, { margin: "0" }, [m("strong", "font-size: "), "1rem (16px)"]),
                        m(Text, { margin: "0" }, [m("strong", "font-weight: "), "400"]),
                        m(Text, { margin: "0" }, [m("strong", "line-height: "), "1.5"]),
                        m(Text, { margin: "0" }, [m("strong", "color: "), "#212529"]),
                        m(Text, { margin: "0" }, [m("strong", "background-color: "), "#fff"])
                    ]),
                    m(CodeBlock, { code: `body {
    margin: 0;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
}` })
                ]),

                // Headings
                m(ContentSection, {
                    title: "Headings",
                    paragraphs: ["Los headings h1-h6 tienen margin-top eliminado y margin-bottom reducido:"],
                    alignItems: "flex-start"
                }, [
                    m("div", { style: { backgroundColor: COLORS.gray[100].backgroundColor, padding: "1rem", borderRadius: VARIABLES.borderRadius, width: "100%" } }, [
                        m("h1", { style: { marginTop: 0, marginBottom: "0.5rem" } }, "h1. Heading"),
                        m("h2", { style: { marginTop: 0, marginBottom: "0.5rem" } }, "h2. Heading"),
                        m("h3", { style: { marginTop: 0, marginBottom: "0.5rem" } }, "h3. Heading")
                    ]),
                    m(CodeBlock, { code: `h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
}` })
                ]),

                // Paragraphs
                m(ContentSection, {
                    title: "Paragraphs",
                    paragraphs: ["Los párrafos tienen margin-top: 0 y margin-bottom: 1rem:"],
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, { code: `p {
    margin-top: 0;
    margin-bottom: 1rem;
}` })
                ]),

                // Links
                m(ContentSection, {
                    title: "Links",
                    paragraphs: ["Los enlaces tienen color primario y subrayado solo en hover:"],
                    alignItems: "flex-start"
                }, [
                    m("div", { style: { backgroundColor: COLORS.gray[100].backgroundColor, padding: "1rem", borderRadius: VARIABLES.borderRadius, width: "100%" } }, [
                        m("a", { href: "#", style: { color: COLORS.simples.blue, textDecoration: "none" } }, "Enlace de ejemplo"),
                        m(Text, { marginTop: "0.5rem" }, "(Hover para ver subrayado)")
                    ]),
                    m(CodeBlock, { code: `a {
    color: #0A6FFD;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}` })
                ]),

                // Images
                m(ContentSection, {
                    title: "Images",
                    paragraphs: ["Las imágenes son responsivas por defecto:"],
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, { code: `img, svg {
    vertical-align: middle;
}

img {
    max-width: 100%;
    height: auto;
}` })
                ]),

                // Forms
                m(ContentSection, {
                    title: "Forms",
                    paragraphs: ["Los elementos de formulario heredan la familia de fuente y tamaño:"],
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, { code: `input, button, select, optgroup, textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}

textarea {
    resize: vertical;
}` })
                ]),

                // Code
                m(ContentSection, {
                    title: "Code",
                    paragraphs: ["Elementos de código usan fuente monospace:"],
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, { code: `pre, code, kbd, samp {
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 1em;
}` })
                ]),

                // Uso
                m(ContentSection, {
                    title: "Uso",
                    paragraphs: ["Para aplicar los estilos de Reboot globalmente, llama a injectRebootStyles() al inicio de tu aplicación:"],
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, { code: `import { injectRebootStyles } from "./src/components/reboot.js"

// Al inicio de tu app
injectRebootStyles()

// O en el oninit de tu componente raíz
function App() {
    return {
        oninit: () => injectRebootStyles(),
        view: () => m(Layout, ...)
    }
}` })
                ])
            ])
        }
    }
}
