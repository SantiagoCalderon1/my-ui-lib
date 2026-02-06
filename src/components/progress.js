import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { Table, TableCell, TableRow } from "./tables.js"
import { CodeBlock, Text } from "./text.js"

const PROGRESS_SIZES = {
    sm: { height: "0.5rem" },
    md: { height: "1rem" },
    lg: { height: "1.5rem" },
    xl: { height: "2rem" }
}

export function Progress() {
    return {
        view: ({ attrs }) => {
            const { 
                value = 0, 
                max = 100, 
                type = "primary",
                size = "md",
                striped = false,
                animated = false,
                showLabel = false,
                style = {} 
            } = attrs
            if (attrs) ['value', 'max', 'type', 'size', 'striped', 'animated', 'showLabel', 'style'].forEach(p => delete attrs[p])

            const percentage = Math.min(100, Math.max(0, (value / max) * 100))
            const colorKey = COLORS.types[type] || "blue"
            const barColor = COLORS.simples[colorKey] || COLORS.simples.blue
            const sizeStyle = PROGRESS_SIZES[size] || PROGRESS_SIZES.md

            const stripedGradient = striped 
                ? `linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)`
                : "none"

            return m("div", {
                style: {
                    display: "flex",
                    width: "100%",
                    backgroundColor: "#e9ecef",
                    borderRadius: VARIABLES.borderRadius,
                    overflow: "hidden",
                    ...sizeStyle,
                    ...style
                }
            }, [
                m("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: `${percentage}%`,
                        height: "100%",
                        backgroundColor: barColor,
                        backgroundImage: stripedGradient,
                        backgroundSize: striped ? "1rem 1rem" : "auto",
                        color: "#fff",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        transition: "width 0.6s ease",
                        animation: animated && striped ? "progress-bar-stripes 1s linear infinite" : "none"
                    }
                }, showLabel ? `${Math.round(percentage)}%` : null)
            ])
        }
    }
}

export function ProgressStacked() {
    return {
        view: ({ attrs, children }) => {
            const { size = "md", style = {} } = attrs
            if (attrs) ['size', 'style'].forEach(p => delete attrs[p])

            const sizeStyle = PROGRESS_SIZES[size] || PROGRESS_SIZES.md

            return m("div", {
                style: {
                    display: "flex",
                    width: "100%",
                    backgroundColor: "#e9ecef",
                    borderRadius: VARIABLES.borderRadius,
                    overflow: "hidden",
                    ...sizeStyle,
                    ...style
                }
            }, children)
        }
    }
}

export function ProgressBar() {
    return {
        view: ({ attrs }) => {
            const { 
                value = 0, 
                type = "primary",
                striped = false,
                animated = false,
                showLabel = false
            } = attrs
            if (attrs) ['value', 'type', 'striped', 'animated', 'showLabel'].forEach(p => delete attrs[p])

            const colorKey = COLORS.types[type] || "blue"
            const barColor = COLORS.simples[colorKey] || COLORS.simples.blue

            const stripedGradient = striped 
                ? `linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)`
                : "none"

            return m("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: `${value}%`,
                    height: "100%",
                    backgroundColor: barColor,
                    backgroundImage: stripedGradient,
                    backgroundSize: striped ? "1rem 1rem" : "auto",
                    color: "#fff",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    transition: "width 0.6s ease",
                    animation: animated && striped ? "progress-bar-stripes 1s linear infinite" : "none"
                }
            }, showLabel ? `${value}%` : null)
        }
    }
}

// Inyectar CSS para animación
function injectProgressStyles() {
    if (!document.getElementById("progress-styles")) {
        const style = document.createElement("style")
        style.id = "progress-styles"
        style.textContent = `
            @keyframes progress-bar-stripes {
                0% { background-position-x: 1rem; }
            }
        `
        document.head.appendChild(style)
    }
}

export function ProgressPage() {
    return {
        oninit: injectProgressStyles,
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Progress",
                    subtitle: "Barras de progreso para mostrar el avance de una tarea o proceso. Soporta múltiples colores, tamaños y efectos."
                }),

                // Descripción
                m(ContentSection, {
                    title: "Progress—Componente base",
                    paragraphs: ["Componente Progress reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Valor y máximo configurables",
                    "Variantes de color (type)",
                    "Tamaños (sm, md, lg, xl)",
                    "Efecto rayado (striped)",
                    "Animación",
                    "Mostrar etiqueta de porcentaje"
                ])]),

                // Uso básico
                m(ContentSection, {
                    title: "Uso Básico",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem" }, [
                        m(Progress, { value: 0 }),
                        m(Progress, { value: 25 }),
                        m(Progress, { value: 50 }),
                        m(Progress, { value: 75 }),
                        m(Progress, { value: 100 }),
                        m(CodeBlock, { code: `m(Progress, { value: 25 })
m(Progress, { value: 50 })
m(Progress, { value: 75 })
m(Progress, { value: 100 })` })
                    ])
                ]),

                // Con etiqueta
                m(ContentSection, {
                    title: "Con Etiqueta",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem" }, [
                        m(Progress, { value: 25, showLabel: true }),
                        m(Progress, { value: 50, showLabel: true }),
                        m(Progress, { value: 75, showLabel: true }),
                        m(CodeBlock, { code: `m(Progress, { value: 25, showLabel: true })
m(Progress, { value: 50, showLabel: true })` })
                    ])
                ]),

                // Colores
                m(ContentSection, {
                    title: "Variantes de Color",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "0.75rem" }, [
                        m(Progress, { value: 20, type: "primary" }),
                        m(Progress, { value: 40, type: "success" }),
                        m(Progress, { value: 60, type: "warning" }),
                        m(Progress, { value: 80, type: "danger" }),
                        m(Progress, { value: 100, type: "info" }),
                        m(CodeBlock, { code: `m(Progress, { value: 40, type: "success" })
m(Progress, { value: 60, type: "warning" })
m(Progress, { value: 80, type: "danger" })` })
                    ])
                ]),

                // Striped
                m(ContentSection, {
                    title: "Barras Rayadas (striped)",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "0.75rem" }, [
                        m(Progress, { value: 25, type: "primary", striped: true }),
                        m(Progress, { value: 50, type: "success", striped: true }),
                        m(Progress, { value: 75, type: "warning", striped: true }),
                        m(CodeBlock, { code: `m(Progress, { value: 50, type: "success", striped: true })` })
                    ])
                ]),

                // Animated
                m(ContentSection, {
                    title: "Barras Animadas",
                    paragraphs: ["Combina striped con animated para crear barras con movimiento."],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "0.75rem" }, [
                        m(Progress, { value: 75, type: "primary", striped: true, animated: true }),
                        m(Progress, { value: 50, type: "danger", striped: true, animated: true }),
                        m(CodeBlock, { code: `m(Progress, { value: 75, type: "primary", striped: true, animated: true })` })
                    ])
                ]),

                // Tamaños
                m(ContentSection, {
                    title: "Tamaños (size)",
                    alignItems: "flex-start"
                }, [
                    m(Table, [
                        m(TableRow, [
                            m(TableCell, { header: true }, "Progress"),
                            m(TableCell, { header: true }, "Size"),
                            m(TableCell, { header: true }, "Altura"),
                        ]),
                        ...Object.entries(PROGRESS_SIZES).map(([size, cfg]) =>
                            m(TableRow, [
                                m(TableCell, { style: { width: "200px" } }, m(Progress, { value: 60, size })),
                                m(TableCell, {}, size),
                                m(TableCell, {}, cfg.height),
                            ])
                        )
                    ])
                ]),

                // Múltiples barras
                m(ContentSection, {
                    title: "Barras Apiladas (Stacked)",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem" }, [
                        m(ProgressStacked, [
                            m(ProgressBar, { value: 15, type: "primary" }),
                            m(ProgressBar, { value: 30, type: "success" }),
                            m(ProgressBar, { value: 20, type: "warning" }),
                        ]),
                        m(CodeBlock, { code: `m(ProgressStacked, [
    m(ProgressBar, { value: 15, type: "primary" }),
    m(ProgressBar, { value: 30, type: "success" }),
    m(ProgressBar, { value: 20, type: "warning" }),
])` })
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente Progress",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function Progress() {
    return {
        view: ({ attrs }) => {
            const { value = 0, max = 100, type = "primary", size = "md", 
                    striped = false, animated = false, showLabel = false } = attrs
            
            const percentage = Math.min(100, Math.max(0, (value / max) * 100))
            const barColor = COLORS.simples[COLORS.types[type]]

            return m("div", {
                style: {
                    width: "100%",
                    backgroundColor: "#e9ecef",
                    borderRadius: VARIABLES.borderRadius,
                    ...PROGRESS_SIZES[size]
                }
            }, [
                m("div", {
                    style: {
                        width: \`\${percentage}%\`,
                        backgroundColor: barColor,
                        backgroundImage: striped ? stripedGradient : "none",
                        transition: "width 0.6s ease"
                    }
                }, showLabel ? \`\${Math.round(percentage)}%\` : null)
            ])
        }
    }
}`
                    })
                ])
            ])
        }
    }
}
