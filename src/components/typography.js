import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { CodeBlock, H1, H2, H3, H4, H5, H6, Text, SmallText, Link } from "./text.js"
import { MyOrderedList } from "./lists.js"

/**
 * Lead - Párrafo destacado/introductorio
 * @param {Object} attrs.style - Estilos adicionales
 */
export function Lead() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            return m("p", {
                style: {
                    fontSize: "1.25rem",
                    fontWeight: "300",
                    lineHeight: "1.6",
                    ...style
                }
            }, children)
        }
    }
}

/**
 * Blockquote - Cita en bloque
 * @param {Object} attrs.style - Estilos adicionales
 */
export function Blockquote() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            return m("blockquote", {
                style: {
                    margin: "0 0 1rem",
                    padding: "0.5rem 1rem",
                    borderLeft: "4px solid " + COLORS.gray[300].backgroundColor,
                    fontSize: "1.1rem",
                    fontStyle: "italic",
                    color: COLORS.gray[700].backgroundColor,
                    ...style
                }
            }, children)
        }
    }
}

/**
 * BlockquoteFooter - Pie de cita (autor/fuente)
 * @param {Object} attrs.style - Estilos adicionales
 */
export function BlockquoteFooter() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            return m("footer", {
                style: {
                    fontSize: "0.875rem",
                    color: COLORS.gray[600].backgroundColor,
                    marginTop: "0.5rem",
                    ...style
                }
            }, [
                m("cite", children)
            ])
        }
    }
}

/**
 * Mark - Texto resaltado/marcado
 */
export function Mark() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            return m("mark", {
                style: {
                    backgroundColor: COLORS.yellow[200].backgroundColor,
                    padding: "0.1rem 0.3rem",
                    borderRadius: "0.2rem",
                    ...style
                }
            }, children)
        }
    }
}

/**
 * Del - Texto eliminado/tachado
 */
export function Del() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            return m("del", {
                style: {
                    textDecoration: "line-through",
                    color: COLORS.gray[600].backgroundColor,
                    ...style
                }
            }, children)
        }
    }
}

/**
 * Ins - Texto insertado/subrayado
 */
export function Ins() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            return m("ins", {
                style: {
                    textDecoration: "underline",
                    textDecorationColor: COLORS.simples.green,
                    ...style
                }
            }, children)
        }
    }
}

/**
 * Small - Texto pequeño
 */
export function Small() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            return m("small", {
                style: {
                    fontSize: "0.875em",
                    color: COLORS.gray[600].backgroundColor,
                    ...style
                }
            }, children)
        }
    }
}

/**
 * Strong - Texto en negrita
 */
export function Strong() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            return m("strong", {
                style: {
                    fontWeight: "700",
                    ...style
                }
            }, children)
        }
    }
}

/**
 * Em - Texto en cursiva/énfasis
 */
export function Em() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            return m("em", {
                style: {
                    fontStyle: "italic",
                    ...style
                }
            }, children)
        }
    }
}

/**
 * Abbr - Abreviación con tooltip
 * @param {string} attrs.title - Texto completo de la abreviación
 */
export function Abbr() {
    return {
        view: ({ attrs, children }) => {
            const { title = "", style = {} } = attrs
            return m("abbr", {
                title,
                style: {
                    textDecoration: "underline dotted",
                    cursor: "help",
                    borderBottom: "none",
                    ...style
                }
            }, children)
        }
    }
}

/**
 * Code - Código inline
 */
export function Code() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            return m("code", {
                style: {
                    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "0.875em",
                    color: COLORS.pink[600].backgroundColor,
                    backgroundColor: COLORS.gray[100].backgroundColor,
                    padding: "0.2rem 0.4rem",
                    borderRadius: "0.25rem",
                    ...style
                }
            }, children)
        }
    }
}

/**
 * Kbd - Tecla de teclado
 */
export function Kbd() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            return m("kbd", {
                style: {
                    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "0.875em",
                    color: "#fff",
                    backgroundColor: COLORS.gray[800].backgroundColor,
                    padding: "0.2rem 0.4rem",
                    borderRadius: "0.25rem",
                    boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.25)",
                    ...style
                }
            }, children)
        }
    }
}

/**
 * Pre - Bloque de código preformateado
 */
export function Pre() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            return m("pre", {
                style: {
                    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "0.875rem",
                    color: COLORS.gray[800].backgroundColor,
                    backgroundColor: COLORS.gray[100].backgroundColor,
                    padding: "1rem",
                    borderRadius: VARIABLES.borderRadius,
                    overflow: "auto",
                    ...style
                }
            }, children)
        }
    }
}

/**
 * DisplayHeading - Títulos extra grandes para páginas de inicio
 * @param {number} attrs.level - Nivel 1-6 (por defecto 1)
 */
export function DisplayHeading() {
    return {
        view: ({ attrs, children }) => {
            const { level = 1, style = {} } = attrs
            const sizes = {
                1: { fontSize: "5rem", fontWeight: "300" },
                2: { fontSize: "4.5rem", fontWeight: "300" },
                3: { fontSize: "4rem", fontWeight: "300" },
                4: { fontSize: "3.5rem", fontWeight: "300" },
                5: { fontSize: "3rem", fontWeight: "300" },
                6: { fontSize: "2.5rem", fontWeight: "300" }
            }
            return m(`h${level}`, {
                style: {
                    lineHeight: "1.2",
                    ...sizes[level],
                    ...style
                }
            }, children)
        }
    }
}

/**
 * TypographyPage - Página de documentación de tipografía
 */
export function TypographyPage() {
    return {
        view: () => {
            return m(FlexCol, { gap: "3rem", alignItems: "flex-start" }, [
                // Intro
                m(IntroContentSection, {
                    title: "Typography",
                    subtitle: "Documentación y ejemplos de tipografía incluyendo headings, body text, blockquotes, listas y elementos inline."
                }),

                // Headings
                m(ContentSection, {
                    title: "Headings",
                    paragraphs: ["Todos los headings HTML h1-h6 están disponibles:"],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "0.5rem", alignItems: "flex-start", width: "100%" }, [
                        m(H1, {}, "h1. Heading"),
                        m(H2, {}, "h2. Heading"),
                        m(H3, {}, "h3. Heading"),
                        m(H4, {}, "h4. Heading"),
                        m(H5, {}, "h5. Heading"),
                        m(H6, {}, "h6. Heading")
                    ]),
                    m(CodeBlock, { code: `m(H1, {}, "h1. Heading")
m(H2, {}, "h2. Heading")
m(H3, {}, "h3. Heading")
m(H4, {}, "h4. Heading")
m(H5, {}, "h5. Heading")
m(H6, {}, "h6. Heading")` })
                ]),

                // Display headings
                m(ContentSection, {
                    title: "Display Headings",
                    paragraphs: ["Headings más grandes y destacados para páginas de inicio:"],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "0.5rem", alignItems: "flex-start", width: "100%" }, [
                        m(DisplayHeading, { level: 1 }, "Display 1"),
                        m(DisplayHeading, { level: 2 }, "Display 2"),
                        m(DisplayHeading, { level: 3 }, "Display 3"),
                        m(DisplayHeading, { level: 4 }, "Display 4"),
                        m(DisplayHeading, { level: 5 }, "Display 5"),
                        m(DisplayHeading, { level: 6 }, "Display 6")
                    ]),
                    m(CodeBlock, { code: `m(DisplayHeading, { level: 1 }, "Display 1")
m(DisplayHeading, { level: 2 }, "Display 2")
// ...` })
                ]),

                // Lead
                m(ContentSection, {
                    title: "Lead",
                    paragraphs: ["Haz que un párrafo destaque como introducción:"],
                    alignItems: "flex-start"
                }, [
                    m(Lead, {}, "Este es un párrafo lead. Destaca del texto normal y es ideal para introducciones o resúmenes de contenido."),
                    m(CodeBlock, { code: `m(Lead, {}, "Este es un párrafo lead...")` })
                ]),

                // Inline elements
                m(ContentSection, {
                    title: "Inline Text Elements",
                    paragraphs: ["Elementos inline para dar estilo al texto:"],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "0.75rem", alignItems: "flex-start", width: "100%" }, [
                        m(Text, {}, ["Puedes usar ", m(Mark, {}, "Mark"), " para resaltar texto."]),
                        m(Text, {}, [m(Del, {}, "Esta línea de texto está eliminada.")]),
                        m(Text, {}, [m(Ins, {}, "Esta línea de texto es una adición al documento.")]),
                        m(Text, {}, [m(Strong, {}, "Esta línea es en negrita.")]),
                        m(Text, {}, [m(Em, {}, "Esta línea es en cursiva.")]),
                        m(Text, {}, [m(Small, {}, "Esta línea es texto pequeño.")]),
                        m(Text, {}, ["La abreviación ", m(Abbr, { title: "HyperText Markup Language" }, "HTML"), " es algo que debes conocer."])
                    ]),
                    m(CodeBlock, { code: `m(Mark, {}, "texto resaltado")
m(Del, {}, "texto eliminado")
m(Ins, {}, "texto insertado")
m(Strong, {}, "texto en negrita")
m(Em, {}, "texto en cursiva")
m(Small, {}, "texto pequeño")
m(Abbr, { title: "HyperText Markup Language" }, "HTML")` })
                ]),

                // Blockquotes
                m(ContentSection, {
                    title: "Blockquotes",
                    paragraphs: ["Para citar bloques de contenido de otra fuente:"],
                    alignItems: "flex-start"
                }, [
                    m(Blockquote, {}, [
                        m(Text, {}, "Una cita muy conocida, contenida en un elemento blockquote."),
                        m(BlockquoteFooter, {}, "Alguien famoso en Título de la fuente")
                    ]),
                    m(CodeBlock, { code: `m(Blockquote, {}, [
    m(Text, {}, "Una cita muy conocida..."),
    m(BlockquoteFooter, {}, "Alguien famoso")
])` })
                ]),

                // Code
                m(ContentSection, {
                    title: "Code",
                    paragraphs: ["Estilos para código inline y bloques:"],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "0.75rem", alignItems: "flex-start", width: "100%" }, [
                        m(Text, {}, ["Código inline: ", m(Code, {}, "const x = 42;")]),
                        m(Text, {}, ["Atajos de teclado: ", m(Kbd, {}, "Ctrl"), " + ", m(Kbd, {}, "C")]),
                        m(Pre, {}, `function hello() {
    console.log("Hello, World!");
}`)
                    ]),
                    m(CodeBlock, { code: `// Código inline
m(Code, {}, "const x = 42;")

// Teclas de teclado
m(Kbd, {}, "Ctrl")

// Bloque preformateado
m(Pre, {}, \`function hello() {
    console.log("Hello, World!");
}\`)` })
                ]),

                // Text utilities
                m(ContentSection, {
                    title: "Text Utilities",
                    paragraphs: ["Utilidades de texto a través de props de estilo:"],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "0.75rem", alignItems: "flex-start", width: "100%" }, [
                        m(Text, { textAlign: "left", width: "100%", backgroundColor: "#f8f9fa", padding: "0.5rem" }, "Texto alineado a la izquierda"),
                        m(Text, { textAlign: "center", width: "100%", backgroundColor: "#f8f9fa", padding: "0.5rem" }, "Texto centrado"),
                        m(Text, { textAlign: "right", width: "100%", backgroundColor: "#f8f9fa", padding: "0.5rem" }, "Texto alineado a la derecha"),
                        m(Text, { textTransform: "uppercase" }, "Texto en mayúsculas"),
                        m(Text, { textTransform: "lowercase" }, "TEXTO EN MINÚSCULAS"),
                        m(Text, { textTransform: "capitalize" }, "texto capitalizado"),
                        m(Text, { fontWeight: "bold" }, "Texto en negrita"),
                        m(Text, { fontStyle: "italic" }, "Texto en cursiva"),
                        m(Text, { textDecoration: "underline" }, "Texto subrayado"),
                        m(Text, { textDecoration: "line-through" }, "Texto tachado")
                    ]),
                    m(CodeBlock, { code: `// Alineación
m(Text, { textAlign: "left" }, "...")
m(Text, { textAlign: "center" }, "...")
m(Text, { textAlign: "right" }, "...")

// Transformación
m(Text, { textTransform: "uppercase" }, "...")
m(Text, { textTransform: "lowercase" }, "...")
m(Text, { textTransform: "capitalize" }, "...")

// Estilos
m(Text, { fontWeight: "bold" }, "...")
m(Text, { fontStyle: "italic" }, "...")
m(Text, { textDecoration: "underline" }, "...")` })
                ]),

                // Links
                m(ContentSection, {
                    title: "Links",
                    paragraphs: ["Enlaces con estilos personalizables:"],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "0.5rem", alignItems: "flex-start" }, [
                        m(Link, { href: "#" }, "Link normal"),
                        m(Link, { href: "#", style: { color: COLORS.simples.blue } }, "Link primary"),
                        m(Link, { href: "#", style: { color: COLORS.simples.green } }, "Link success"),
                        m(Link, { href: "#", style: { color: COLORS.simples.red } }, "Link danger"),
                        m(Link, { path: "/components/buttons" }, "Link interno (Mithril route)")
                    ]),
                    m(CodeBlock, { code: `// Link externo
m(Link, { href: "https://example.com" }, "Link externo")

// Link interno (Mithril routing)
m(Link, { path: "/components/buttons" }, "Link interno")

// Link con color personalizado
m(Link, { href: "#", style: { color: "#0A6FFD" } }, "Link colored")` })
                ])
            ])
        }
    }
}
