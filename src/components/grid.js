import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, IntroContentSection } from "./layout.js"
import { CodeBlock, Text } from "./text.js"
import { MyOrderedList } from "./lists.js"

// Breakpoints (valores en px) - siguiendo Bootstrap 5
export const BREAKPOINTS = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400
}

// Anchos máximos de contenedor por breakpoint
const CONTAINER_MAX_WIDTHS = {
    sm: "540px",
    md: "720px",
    lg: "960px",
    xl: "1140px",
    xxl: "1320px"
}

/**
 * Container - Contenedor responsivo con ancho máximo
 * @param {Object} attrs
 * @param {boolean} attrs.fluid - Si es true, ancho 100% siempre
 * @param {string} attrs.size - Breakpoint máximo: sm, md, lg, xl, xxl
 * @param {Object} attrs.style - Estilos adicionales
 */
export function Container() {
    return {
        view: ({ attrs, children }) => {
            const { fluid = false, size = null, style = {} } = attrs
            
            let maxWidth = "100%"
            if (!fluid) {
                if (size && CONTAINER_MAX_WIDTHS[size]) {
                    maxWidth = CONTAINER_MAX_WIDTHS[size]
                } else {
                    // Responsivo por defecto - usar el más grande
                    maxWidth = CONTAINER_MAX_WIDTHS.xxl
                }
            }

            return m("div", {
                style: {
                    width: "100%",
                    maxWidth: fluid ? "100%" : maxWidth,
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    boxSizing: "border-box",
                    ...style
                }
            }, children)
        }
    }
}

/**
 * Row - Fila del grid system (flexbox)
 * @param {Object} attrs
 * @param {string} attrs.gutter - Gap entre columnas (ej: "1rem", "0.5rem")
 * @param {string} attrs.align - align-items: start, center, end, stretch
 * @param {string} attrs.justify - justify-content: start, center, end, between, around, evenly
 * @param {Object} attrs.style - Estilos adicionales
 */
export function Row() {
    return {
        view: ({ attrs, children }) => {
            const { gutter = "1rem", align = "stretch", justify = "start", style = {} } = attrs

            const alignMap = {
                start: "flex-start",
                center: "center",
                end: "flex-end",
                stretch: "stretch"
            }

            const justifyMap = {
                start: "flex-start",
                center: "center",
                end: "flex-end",
                between: "space-between",
                around: "space-around",
                evenly: "space-evenly"
            }

            return m("div", {
                style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: gutter,
                    alignItems: alignMap[align] || align,
                    justifyContent: justifyMap[justify] || justify,
                    marginLeft: `-${parseFloat(gutter) / 2}rem`,
                    marginRight: `-${parseFloat(gutter) / 2}rem`,
                    ...style
                }
            }, children)
        }
    }
}

/**
 * Col - Columna del grid system (1-12 o auto)
 * @param {Object} attrs
 * @param {number|string} attrs.xs - Columnas en xs (1-12, "auto")
 * @param {number|string} attrs.sm - Columnas en sm
 * @param {number|string} attrs.md - Columnas en md
 * @param {number|string} attrs.lg - Columnas en lg
 * @param {number|string} attrs.xl - Columnas en xl
 * @param {number|string} attrs.xxl - Columnas en xxl
 * @param {number|string} attrs.col - Columnas por defecto (shorthand)
 * @param {string} attrs.offset - Offset en columnas (1-11)
 * @param {string} attrs.order - Orden flex (first, last, 0-5)
 * @param {Object} attrs.style - Estilos adicionales
 */
export function Col() {
    return {
        view: ({ attrs, children }) => {
            const { 
                col = null,
                xs = null, 
                sm = null, 
                md = null, 
                lg = null, 
                xl = null, 
                xxl = null,
                offset = 0,
                order = null,
                style = {} 
            } = attrs

            // Calcular el ancho basado en columnas (sistema de 12 columnas)
            const getWidth = (cols) => {
                if (cols === "auto") return "auto"
                if (cols === true || cols === "") return "0" // flex-grow
                if (typeof cols === "number" && cols >= 1 && cols <= 12) {
                    return `${(cols / 12) * 100}%`
                }
                return null
            }

            // Usar el valor más específico disponible (mobile-first)
            const colValue = xxl || xl || lg || md || sm || xs || col || true
            const width = getWidth(colValue)
            const offsetWidth = offset ? `${(offset / 12) * 100}%` : "0"

            const orderMap = {
                first: -1,
                last: 9999
            }

            return m("div", {
                style: {
                    flex: width === "auto" ? "0 0 auto" : (width === "0" ? "1 1 0%" : `0 0 ${width}`),
                    maxWidth: width === "auto" ? "none" : (width === "0" ? "100%" : width),
                    width: width === "0" ? "100%" : undefined,
                    marginLeft: offsetWidth,
                    order: order !== null ? (orderMap[order] !== undefined ? orderMap[order] : order) : undefined,
                    boxSizing: "border-box",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    ...style
                }
            }, children)
        }
    }
}

/**
 * GridPage - Página de documentación del sistema de grid
 */
export function GridPage() {
    const demoBoxStyle = {
        backgroundColor: COLORS.blue[200].backgroundColor,
        color: COLORS.blue[200].color,
        padding: "1rem",
        borderRadius: VARIABLES.borderRadius,
        textAlign: "center",
        border: "1px solid " + COLORS.simples.blue
    }

    const demoBoxStyle2 = {
        backgroundColor: COLORS.green[200].backgroundColor,
        color: COLORS.green[200].color,
        padding: "1rem",
        borderRadius: VARIABLES.borderRadius,
        textAlign: "center",
        border: "1px solid " + COLORS.simples.green
    }

    return {
        view: () => {
            return m(FlexCol, { gap: "3rem", alignItems: "flex-start" }, [
                // Intro
                m(IntroContentSection, {
                    title: "Grid System",
                    subtitle: "Sistema de grid responsivo basado en flexbox con 12 columnas, inspirado en Bootstrap pero usando inline styles."
                }),

                // Breakpoints
                m(ContentSection, {
                    title: "Breakpoints",
                    paragraphs: ["Puntos de quiebre para diseño responsivo:"],
                    alignItems: "flex-start"
                }, [
                    m("div", { style: { overflowX: "auto", width: "100%" } }, [
                        m("table", { style: { width: "100%", borderCollapse: "collapse" } }, [
                            m("thead", [
                                m("tr", { style: { borderBottom: "2px solid #dee2e6" } }, [
                                    m("th", { style: { padding: "0.75rem", textAlign: "left" } }, "Breakpoint"),
                                    m("th", { style: { padding: "0.75rem", textAlign: "left" } }, "Clase"),
                                    m("th", { style: { padding: "0.75rem", textAlign: "left" } }, "Dimensiones")
                                ])
                            ]),
                            m("tbody", [
                                ...Object.entries(BREAKPOINTS).map(([key, value]) =>
                                    m("tr", { style: { borderBottom: "1px solid #dee2e6" } }, [
                                        m("td", { style: { padding: "0.75rem" } }, key.toUpperCase()),
                                        m("td", { style: { padding: "0.75rem" } }, key),
                                        m("td", { style: { padding: "0.75rem" } }, value === 0 ? "<576px" : `≥${value}px`)
                                    ])
                                )
                            ])
                        ])
                    ]),
                    m(CodeBlock, { code: `const BREAKPOINTS = {
    xs: 0,      // <576px
    sm: 576,    // ≥576px
    md: 768,    // ≥768px
    lg: 992,    // ≥992px
    xl: 1200,   // ≥1200px
    xxl: 1400   // ≥1400px
}` })
                ]),

                // Containers
                m(ContentSection, {
                    title: "Containers",
                    paragraphs: ["Contenedores con ancho máximo responsivo:"],
                    alignItems: "flex-start"
                }, [
                    m(Container, { style: { backgroundColor: COLORS.gray[200].backgroundColor, padding: "1rem", marginBottom: "1rem" } }, [
                        m(Text, "Container (max-width: 1320px)")
                    ]),
                    m(Container, { size: "md", style: { backgroundColor: COLORS.cyan[200].backgroundColor, padding: "1rem", marginBottom: "1rem" } }, [
                        m(Text, "Container md (max-width: 720px)")
                    ]),
                    m(Container, { fluid: true, style: { backgroundColor: COLORS.green[200].backgroundColor, padding: "1rem", marginBottom: "1rem" } }, [
                        m(Text, "Container fluid (100%)")
                    ]),
                    m(CodeBlock, { code: `// Container por defecto (xxl)
m(Container, {}, children)

// Container con tamaño específico
m(Container, { size: "md" }, children)

// Container fluido (100%)
m(Container, { fluid: true }, children)` })
                ]),

                // Grid básico
                m(ContentSection, {
                    title: "Grid Básico",
                    paragraphs: ["Sistema de 12 columnas con Row y Col:"],
                    alignItems: "flex-start"
                }, [
                    m(Container, { style: { marginBottom: "1rem" } }, [
                        m(Row, { gutter: "0.5rem" }, [
                            m(Col, { col: 12 }, [m("div", { style: demoBoxStyle }, "col-12")]),
                        ]),
                        m(Row, { gutter: "0.5rem", style: { marginTop: "0.5rem" } }, [
                            m(Col, { col: 6 }, [m("div", { style: demoBoxStyle }, "col-6")]),
                            m(Col, { col: 6 }, [m("div", { style: demoBoxStyle }, "col-6")]),
                        ]),
                        m(Row, { gutter: "0.5rem", style: { marginTop: "0.5rem" } }, [
                            m(Col, { col: 4 }, [m("div", { style: demoBoxStyle }, "col-4")]),
                            m(Col, { col: 4 }, [m("div", { style: demoBoxStyle }, "col-4")]),
                            m(Col, { col: 4 }, [m("div", { style: demoBoxStyle }, "col-4")]),
                        ]),
                        m(Row, { gutter: "0.5rem", style: { marginTop: "0.5rem" } }, [
                            m(Col, { col: 3 }, [m("div", { style: demoBoxStyle }, "col-3")]),
                            m(Col, { col: 3 }, [m("div", { style: demoBoxStyle }, "col-3")]),
                            m(Col, { col: 3 }, [m("div", { style: demoBoxStyle }, "col-3")]),
                            m(Col, { col: 3 }, [m("div", { style: demoBoxStyle }, "col-3")]),
                        ])
                    ]),
                    m(CodeBlock, { code: `m(Container, {}, [
    m(Row, { gutter: "0.5rem" }, [
        m(Col, { col: 12 }, "col-12"),
    ]),
    m(Row, { gutter: "0.5rem" }, [
        m(Col, { col: 6 }, "col-6"),
        m(Col, { col: 6 }, "col-6"),
    ]),
    m(Row, { gutter: "0.5rem" }, [
        m(Col, { col: 4 }, "col-4"),
        m(Col, { col: 4 }, "col-4"),
        m(Col, { col: 4 }, "col-4"),
    ])
])` })
                ]),

                // Columnas desiguales
                m(ContentSection, {
                    title: "Columnas Desiguales",
                    paragraphs: ["Combinaciones de diferentes anchos:"],
                    alignItems: "flex-start"
                }, [
                    m(Container, { style: { marginBottom: "1rem" } }, [
                        m(Row, { gutter: "0.5rem" }, [
                            m(Col, { col: 8 }, [m("div", { style: demoBoxStyle }, "col-8")]),
                            m(Col, { col: 4 }, [m("div", { style: demoBoxStyle2 }, "col-4")]),
                        ]),
                        m(Row, { gutter: "0.5rem", style: { marginTop: "0.5rem" } }, [
                            m(Col, { col: 3 }, [m("div", { style: demoBoxStyle }, "col-3")]),
                            m(Col, { col: 6 }, [m("div", { style: demoBoxStyle2 }, "col-6")]),
                            m(Col, { col: 3 }, [m("div", { style: demoBoxStyle }, "col-3")]),
                        ]),
                        m(Row, { gutter: "0.5rem", style: { marginTop: "0.5rem" } }, [
                            m(Col, { col: 2 }, [m("div", { style: demoBoxStyle }, "2")]),
                            m(Col, { col: 7 }, [m("div", { style: demoBoxStyle2 }, "col-7")]),
                            m(Col, { col: 3 }, [m("div", { style: demoBoxStyle }, "3")]),
                        ])
                    ]),
                    m(CodeBlock, { code: `m(Row, { gutter: "0.5rem" }, [
    m(Col, { col: 8 }, "col-8"),
    m(Col, { col: 4 }, "col-4"),
])

m(Row, { gutter: "0.5rem" }, [
    m(Col, { col: 3 }, "col-3"),
    m(Col, { col: 6 }, "col-6"),
    m(Col, { col: 3 }, "col-3"),
])` })
                ]),

                // Alineación
                m(ContentSection, {
                    title: "Alineación",
                    paragraphs: ["Control de alineación vertical y horizontal:"],
                    alignItems: "flex-start"
                }, [
                    m(Container, { style: { marginBottom: "1rem" } }, [
                        m(Text, { fontWeight: "bold", marginBottom: "0.5rem" }, "Justify: start, center, end"),
                        m(Row, { gutter: "0.5rem", justify: "start", style: { backgroundColor: "#f8f9fa", padding: "0.5rem", marginBottom: "0.5rem" } }, [
                            m(Col, { col: 3 }, [m("div", { style: demoBoxStyle }, "start")]),
                            m(Col, { col: 3 }, [m("div", { style: demoBoxStyle }, "start")]),
                        ]),
                        m(Row, { gutter: "0.5rem", justify: "center", style: { backgroundColor: "#f8f9fa", padding: "0.5rem", marginBottom: "0.5rem" } }, [
                            m(Col, { col: 3 }, [m("div", { style: demoBoxStyle }, "center")]),
                            m(Col, { col: 3 }, [m("div", { style: demoBoxStyle }, "center")]),
                        ]),
                        m(Row, { gutter: "0.5rem", justify: "end", style: { backgroundColor: "#f8f9fa", padding: "0.5rem", marginBottom: "0.5rem" } }, [
                            m(Col, { col: 3 }, [m("div", { style: demoBoxStyle }, "end")]),
                            m(Col, { col: 3 }, [m("div", { style: demoBoxStyle }, "end")]),
                        ]),
                        m(Row, { gutter: "0.5rem", justify: "between", style: { backgroundColor: "#f8f9fa", padding: "0.5rem", marginBottom: "0.5rem" } }, [
                            m(Col, { col: 3 }, [m("div", { style: demoBoxStyle }, "between")]),
                            m(Col, { col: 3 }, [m("div", { style: demoBoxStyle }, "between")]),
                        ]),
                        m(Row, { gutter: "0.5rem", justify: "around", style: { backgroundColor: "#f8f9fa", padding: "0.5rem" } }, [
                            m(Col, { col: 3 }, [m("div", { style: demoBoxStyle }, "around")]),
                            m(Col, { col: 3 }, [m("div", { style: demoBoxStyle }, "around")]),
                        ])
                    ]),
                    m(CodeBlock, { code: `// Justify content
m(Row, { justify: "start" }, [...])
m(Row, { justify: "center" }, [...])
m(Row, { justify: "end" }, [...])
m(Row, { justify: "between" }, [...])
m(Row, { justify: "around" }, [...])
m(Row, { justify: "evenly" }, [...])

// Align items
m(Row, { align: "start" }, [...])
m(Row, { align: "center" }, [...])
m(Row, { align: "end" }, [...])
m(Row, { align: "stretch" }, [...])` })
                ]),

                // Gutters
                m(ContentSection, {
                    title: "Gutters (Espaciado)",
                    paragraphs: ["Control del espacio entre columnas:"],
                    alignItems: "flex-start"
                }, [
                    m(Container, { style: { marginBottom: "1rem" } }, [
                        m(Text, { fontWeight: "bold", marginBottom: "0.5rem" }, "gutter: 0"),
                        m(Row, { gutter: "0", style: { marginBottom: "1rem" } }, [
                            m(Col, { col: 4 }, [m("div", { style: demoBoxStyle }, "col-4")]),
                            m(Col, { col: 4 }, [m("div", { style: demoBoxStyle }, "col-4")]),
                            m(Col, { col: 4 }, [m("div", { style: demoBoxStyle }, "col-4")]),
                        ]),
                        m(Text, { fontWeight: "bold", marginBottom: "0.5rem" }, "gutter: 1rem (default)"),
                        m(Row, { gutter: "1rem", style: { marginBottom: "1rem" } }, [
                            m(Col, { col: 4 }, [m("div", { style: demoBoxStyle }, "col-4")]),
                            m(Col, { col: 4 }, [m("div", { style: demoBoxStyle }, "col-4")]),
                            m(Col, { col: 4 }, [m("div", { style: demoBoxStyle }, "col-4")]),
                        ]),
                        m(Text, { fontWeight: "bold", marginBottom: "0.5rem" }, "gutter: 2rem"),
                        m(Row, { gutter: "2rem" }, [
                            m(Col, { col: 4 }, [m("div", { style: demoBoxStyle }, "col-4")]),
                            m(Col, { col: 4 }, [m("div", { style: demoBoxStyle }, "col-4")]),
                            m(Col, { col: 4 }, [m("div", { style: demoBoxStyle }, "col-4")]),
                        ])
                    ]),
                    m(CodeBlock, { code: `// Sin espacio
m(Row, { gutter: "0" }, [...])

// Espacio por defecto
m(Row, { gutter: "1rem" }, [...])

// Espacio grande
m(Row, { gutter: "2rem" }, [...])` })
                ]),

                // Offset
                m(ContentSection, {
                    title: "Offset (Desplazamiento)",
                    paragraphs: ["Desplazar columnas usando offset:"],
                    alignItems: "flex-start"
                }, [
                    m(Container, { style: { marginBottom: "1rem" } }, [
                        m(Row, { gutter: "0.5rem", style: { marginBottom: "0.5rem" } }, [
                            m(Col, { col: 4, offset: 4 }, [m("div", { style: demoBoxStyle }, "col-4 offset-4")]),
                        ]),
                        m(Row, { gutter: "0.5rem", style: { marginBottom: "0.5rem" } }, [
                            m(Col, { col: 3, offset: 3 }, [m("div", { style: demoBoxStyle }, "col-3 offset-3")]),
                            m(Col, { col: 3, offset: 3 }, [m("div", { style: demoBoxStyle }, "col-3 offset-3")]),
                        ]),
                        m(Row, { gutter: "0.5rem" }, [
                            m(Col, { col: 6, offset: 3 }, [m("div", { style: demoBoxStyle }, "col-6 offset-3")]),
                        ])
                    ]),
                    m(CodeBlock, { code: `// Centrar una columna
m(Col, { col: 4, offset: 4 }, "Centrado")

// Múltiples offsets
m(Row, {}, [
    m(Col, { col: 3, offset: 3 }, "..."),
    m(Col, { col: 3, offset: 3 }, "..."),
])` })
                ]),

                // Auto width
                m(ContentSection, {
                    title: "Auto Width",
                    paragraphs: ["Columnas con ancho automático:"],
                    alignItems: "flex-start"
                }, [
                    m(Container, { style: { marginBottom: "1rem" } }, [
                        m(Row, { gutter: "0.5rem" }, [
                            m(Col, { col: "auto" }, [m("div", { style: demoBoxStyle }, "Auto (contenido)")]),
                            m(Col, { col: "auto" }, [m("div", { style: demoBoxStyle }, "Auto")]),
                            m(Col, {}, [m("div", { style: demoBoxStyle2 }, "Resto del espacio")]),
                        ])
                    ]),
                    m(CodeBlock, { code: `m(Row, {}, [
    m(Col, { col: "auto" }, "Ancho según contenido"),
    m(Col, { col: "auto" }, "Auto"),
    m(Col, {}, "Ocupa el resto"),
])` })
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, { code: `// Container
export function Container() {
    return {
        view: ({ attrs, children }) => {
            const { fluid = false, size = null, style = {} } = attrs
            let maxWidth = fluid ? "100%" : CONTAINER_MAX_WIDTHS[size] || "1320px"
            return m("div", {
                style: {
                    width: "100%",
                    maxWidth,
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    ...style
                }
            }, children)
        }
    }
}

// Row
export function Row() {
    return {
        view: ({ attrs, children }) => {
            const { gutter = "1rem", align = "stretch", justify = "start", style = {} } = attrs
            return m("div", {
                style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: gutter,
                    alignItems: align,
                    justifyContent: justify,
                    ...style
                }
            }, children)
        }
    }
}

// Col
export function Col() {
    return {
        view: ({ attrs, children }) => {
            const { col = true, offset = 0, style = {} } = attrs
            const width = col === "auto" ? "auto" : \`\${(col / 12) * 100}%\`
            return m("div", {
                style: {
                    flex: \`0 0 \${width}\`,
                    maxWidth: width,
                    marginLeft: offset ? \`\${(offset / 12) * 100}%\` : 0,
                    ...style
                }
            }, children)
        }
    }
}` })
                ])
            ])
        }
    }
}
