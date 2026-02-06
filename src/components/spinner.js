import { COLORS } from "../styles/colors.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { Table, TableCell, TableRow } from "./tables.js"
import { CodeBlock, Text } from "./text.js"
import { Button } from "./button.js"

const SPINNER_SIZES = {
    sm: { width: "1rem", height: "1rem", borderWidth: "0.15rem" },
    md: { width: "2rem", height: "2rem", borderWidth: "0.25rem" },
    lg: { width: "3rem", height: "3rem", borderWidth: "0.3rem" },
    xl: { width: "4rem", height: "4rem", borderWidth: "0.35rem" }
}

// Inyectar CSS para animaciones
function injectSpinnerStyles() {
    if (!document.getElementById("spinner-styles")) {
        const style = document.createElement("style")
        style.id = "spinner-styles"
        style.textContent = `
            @keyframes spinner-border {
                to { transform: rotate(360deg); }
            }
            @keyframes spinner-grow {
                0% { transform: scale(0); }
                50% { opacity: 1; transform: scale(1); }
            }
        `
        document.head.appendChild(style)
    }
}

export function Spinner() {
    return {
        oninit: injectSpinnerStyles,
        view: ({ attrs }) => {
            const { 
                type = "primary",
                size = "md",
                variant = "border",
                style = {} 
            } = attrs
            if (attrs) ['type', 'size', 'variant', 'style'].forEach(p => delete attrs[p])

            const colorKey = COLORS.types[type] || "blue"
            const spinnerColor = COLORS.simples[colorKey] || COLORS.simples.blue
            const sizeStyle = SPINNER_SIZES[size] || SPINNER_SIZES.md

            if (variant === "grow") {
                return m("div", {
                    style: {
                        display: "inline-block",
                        verticalAlign: "text-bottom",
                        backgroundColor: spinnerColor,
                        borderRadius: "50%",
                        opacity: 0,
                        animation: "spinner-grow 0.75s linear infinite",
                        width: sizeStyle.width,
                        height: sizeStyle.height,
                        ...style
                    },
                    role: "status"
                }, [
                    m("span", { style: { 
                        position: "absolute",
                        width: "1px",
                        height: "1px",
                        padding: 0,
                        margin: "-1px",
                        overflow: "hidden",
                        clip: "rect(0,0,0,0)",
                        whiteSpace: "nowrap",
                        border: 0
                    }}, "Loading...")
                ])
            }

            // Default: border variant
            return m("div", {
                style: {
                    display: "inline-block",
                    verticalAlign: "text-bottom",
                    border: `${sizeStyle.borderWidth} solid ${spinnerColor}`,
                    borderRightColor: "transparent",
                    borderRadius: "50%",
                    animation: "spinner-border 0.75s linear infinite",
                    width: sizeStyle.width,
                    height: sizeStyle.height,
                    ...style
                },
                role: "status"
            }, [
                m("span", { style: { 
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    margin: "-1px",
                    overflow: "hidden",
                    clip: "rect(0,0,0,0)",
                    whiteSpace: "nowrap",
                    border: 0
                }}, "Loading...")
            ])
        }
    }
}

export function SpinnerPage() {
    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Spinner",
                    subtitle: "Indicadores de carga animados para mostrar que una operación está en progreso. Disponible en dos variantes: border y grow."
                }),

                // Descripción
                m(ContentSection, {
                    title: "Spinner—Componente base",
                    paragraphs: ["Componente Spinner reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Variantes de color (type)",
                    "Tamaños (sm, md, lg, xl)",
                    "Dos estilos: border (círculo giratorio) y grow (pulso)"
                ])]),

                // Border spinner
                m(ContentSection, {
                    title: "Border Spinner (default)",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(FlexRow, { gap: "1rem", justifyContent: "flex-start" }, [
                            m(Spinner, { type: "primary" }),
                            m(Spinner, { type: "secondary" }),
                            m(Spinner, { type: "success" }),
                            m(Spinner, { type: "danger" }),
                            m(Spinner, { type: "warning" }),
                            m(Spinner, { type: "info" }),
                        ]),
                        m(CodeBlock, { code: `m(Spinner, { type: "primary" })
m(Spinner, { type: "success" })
m(Spinner, { type: "danger" })` })
                    ])
                ]),

                // Grow spinner
                m(ContentSection, {
                    title: "Growing Spinner",
                    paragraphs: ["Variante con efecto de pulso/crecimiento."],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(FlexRow, { gap: "1rem", justifyContent: "flex-start" }, [
                            m(Spinner, { type: "primary", variant: "grow" }),
                            m(Spinner, { type: "secondary", variant: "grow" }),
                            m(Spinner, { type: "success", variant: "grow" }),
                            m(Spinner, { type: "danger", variant: "grow" }),
                            m(Spinner, { type: "warning", variant: "grow" }),
                            m(Spinner, { type: "info", variant: "grow" }),
                        ]),
                        m(CodeBlock, { code: `m(Spinner, { type: "primary", variant: "grow" })
m(Spinner, { type: "success", variant: "grow" })` })
                    ])
                ]),

                // Tamaños
                m(ContentSection, {
                    title: "Tamaños (size)",
                    alignItems: "flex-start"
                }, [
                    m(Table, [
                        m(TableRow, [
                            m(TableCell, { header: true }, "Border"),
                            m(TableCell, { header: true }, "Grow"),
                            m(TableCell, { header: true }, "Size"),
                            m(TableCell, { header: true }, "Dimensiones"),
                        ]),
                        ...Object.entries(SPINNER_SIZES).map(([size, cfg]) =>
                            m(TableRow, [
                                m(TableCell, {}, m(Spinner, { size })),
                                m(TableCell, {}, m(Spinner, { size, variant: "grow" })),
                                m(TableCell, {}, size),
                                m(TableCell, {}, `${cfg.width} x ${cfg.height}`),
                            ])
                        )
                    ])
                ]),

                // Con botones
                m(ContentSection, {
                    title: "Spinners en Botones",
                    paragraphs: ["Útil para indicar estados de carga en botones."],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(FlexRow, { gap: "1rem", justifyContent: "flex-start" }, [
                            m(Button, { type: "primary", disabled: true }, [
                                m(Spinner, { size: "sm", style: { marginRight: "0.5rem", borderColor: "#fff", borderRightColor: "transparent" } }),
                                "Cargando..."
                            ]),
                            m(Button, { type: "success", disabled: true }, [
                                m(Spinner, { size: "sm", variant: "grow", style: { marginRight: "0.5rem", backgroundColor: "#fff" } }),
                                "Procesando..."
                            ]),
                        ]),
                        m(CodeBlock, { code: `m(Button, { type: "primary", disabled: true }, [
    m(Spinner, { size: "sm", style: { marginRight: "0.5rem" } }),
    "Cargando..."
])` })
                    ])
                ]),

                // Todos los colores
                m(ContentSection, {
                    title: "Todas las variantes de color",
                    alignItems: "flex-start"
                }, [
                    m(FlexRow, { gap: "1rem", flexWrap: "wrap", justifyContent: "flex-start" }, [
                        ...Object.keys(COLORS.types).map(type =>
                            m(FlexCol, { 
                                width: "auto", 
                                alignItems: "center", 
                                gap: "0.5rem",
                                padding: "0.5rem"
                            }, [
                                m(Spinner, { type }),
                                m(Text, { fontSize: "0.75rem" }, type)
                            ])
                        )
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente Spinner",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function Spinner() {
    return {
        view: ({ attrs }) => {
            const { type = "primary", size = "md", variant = "border" } = attrs
            
            const spinnerColor = COLORS.simples[COLORS.types[type]]
            const sizeStyle = SPINNER_SIZES[size]

            if (variant === "grow") {
                return m("div", {
                    style: {
                        backgroundColor: spinnerColor,
                        borderRadius: "50%",
                        animation: "spinner-grow 0.75s linear infinite",
                        ...sizeStyle
                    }
                })
            }

            return m("div", {
                style: {
                    border: \`\${sizeStyle.borderWidth} solid \${spinnerColor}\`,
                    borderRightColor: "transparent",
                    borderRadius: "50%",
                    animation: "spinner-border 0.75s linear infinite",
                    ...sizeStyle
                }
            })
        }
    }
}`
                    })
                ])
            ])
        }
    }
}
