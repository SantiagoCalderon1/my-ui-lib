import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { CodeBlock, Text } from "./text.js"
import { Card, CardBody, CardImage } from "./card.js"

const PLACEHOLDER_SIZES = {
    xs: { height: "0.5rem" },
    sm: { height: "0.75rem" },
    md: { height: "1rem" },
    lg: { height: "1.25rem" },
    xl: { height: "1.5rem" }
}

// Inject animation CSS
function injectPlaceholderStyles() {
    if (!document.getElementById("placeholder-styles")) {
        const style = document.createElement("style")
        style.id = "placeholder-styles"
        style.textContent = `
            @keyframes placeholder-glow {
                50% { opacity: 0.2; }
            }
            @keyframes placeholder-wave {
                100% { mask-position: -200% 0%; }
            }
        `
        document.head.appendChild(style)
    }
}

export function Placeholder() {
    return {
        oninit: injectPlaceholderStyles,
        view: ({ attrs }) => {
            const { 
                width = "100%",
                size = "md",
                type = "neutral",
                animation = "glow",
                style = {} 
            } = attrs
            if (attrs) ['width', 'size', 'type', 'animation', 'style'].forEach(p => delete attrs[p])

            const colorKey = COLORS.types[type] || "gray"
            const bgColor = type === "neutral" ? "#dee2e6" : COLORS.simples[colorKey]
            const sizeStyle = PLACEHOLDER_SIZES[size] || PLACEHOLDER_SIZES.md

            const animationStyle = animation === "glow" 
                ? { animation: "placeholder-glow 2s ease-in-out infinite" }
                : animation === "wave"
                    ? { 
                        background: `linear-gradient(90deg, ${bgColor} 25%, rgba(255,255,255,0.5) 50%, ${bgColor} 75%)`,
                        backgroundSize: "200% 100%",
                        animation: "placeholder-wave 2s linear infinite"
                    }
                    : {}

            return m("span", {
                style: {
                    display: "inline-block",
                    minHeight: "1em",
                    verticalAlign: "middle",
                    cursor: "wait",
                    backgroundColor: bgColor,
                    opacity: 0.5,
                    borderRadius: VARIABLES.borderRadius,
                    width,
                    ...sizeStyle,
                    ...animationStyle,
                    ...style
                }
            })
        }
    }
}

export function PlaceholderButton() {
    return {
        oninit: injectPlaceholderStyles,
        view: ({ attrs }) => {
            const { 
                type = "primary",
                size = "md",
                width = "auto",
                animation = "glow",
                style = {} 
            } = attrs
            if (attrs) ['type', 'size', 'width', 'animation', 'style'].forEach(p => delete attrs[p])

            const colorKey = COLORS.types[type] || "blue"
            const bgColor = COLORS.simples[colorKey]
            
            const sizeStyles = {
                sm: { padding: "0.25rem 0.5rem", fontSize: "0.875rem" },
                md: { padding: "0.375rem 0.75rem", fontSize: "1rem" },
                lg: { padding: "0.5rem 1rem", fontSize: "1.25rem" }
            }

            return m("span", {
                style: {
                    display: "inline-block",
                    cursor: "wait",
                    backgroundColor: bgColor,
                    opacity: 0.65,
                    borderRadius: VARIABLES.borderRadius,
                    color: "transparent",
                    pointerEvents: "none",
                    width: width === "auto" ? "auto" : width,
                    minWidth: "6rem",
                    textAlign: "center",
                    animation: animation === "glow" ? "placeholder-glow 2s ease-in-out infinite" : "none",
                    ...sizeStyles[size],
                    ...style
                }
            }, "Loading")
        }
    }
}

export function PlaceholderCard() {
    return {
        oninit: injectPlaceholderStyles,
        view: ({ attrs }) => {
            const { animation = "glow", style = {} } = attrs
            if (attrs) ['animation', 'style'].forEach(p => delete attrs[p])

            return m(Card, { style }, [
                // Image placeholder
                m("div", {
                    style: {
                        width: "100%",
                        height: "180px",
                        backgroundColor: "#dee2e6",
                        animation: animation === "glow" ? "placeholder-glow 2s ease-in-out infinite" : "none"
                    }
                }),
                m(CardBody, [
                    m(Placeholder, { width: "70%", size: "lg", animation, style: { marginBottom: "0.5rem" } }),
                    m(Placeholder, { width: "100%", animation, style: { marginBottom: "0.25rem" } }),
                    m(Placeholder, { width: "100%", animation, style: { marginBottom: "0.25rem" } }),
                    m(Placeholder, { width: "60%", animation, style: { marginBottom: "1rem" } }),
                    m(PlaceholderButton, { animation })
                ])
            ])
        }
    }
}

export function PlaceholderPage() {
    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Placeholder",
                    subtitle: "Esqueletos de carga para indicar que el contenido se está cargando. Mejora la experiencia de usuario durante cargas."
                }),

                // Descripción
                m(ContentSection, {
                    title: "Placeholder—Componente base",
                    paragraphs: ["Componente Placeholder reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Anchos personalizables",
                    "Tamaños (xs, sm, md, lg, xl)",
                    "Animaciones: glow (parpadeo) y wave (ola)",
                    "Componentes especializados: PlaceholderButton, PlaceholderCard"
                ])]),

                // Uso básico
                m(ContentSection, {
                    title: "Uso Básico",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(FlexCol, { gap: "0.5rem", alignItems: "flex-start", width: "300px" }, [
                            m(Placeholder, { width: "100%" }),
                            m(Placeholder, { width: "75%" }),
                            m(Placeholder, { width: "50%" }),
                        ]),
                        m(CodeBlock, { code: `m(Placeholder, { width: "100%" })
m(Placeholder, { width: "75%" })
m(Placeholder, { width: "50%" })` })
                    ])
                ]),

                // Tamaños
                m(ContentSection, {
                    title: "Tamaños",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "0.5rem", alignItems: "flex-start", width: "300px" }, [
                        m(FlexRow, { gap: "1rem", justifyContent: "flex-start", alignItems: "center" }, [
                            m(Placeholder, { width: "100px", size: "xs" }),
                            m(Text, { fontSize: "0.875rem" }, "xs")
                        ]),
                        m(FlexRow, { gap: "1rem", justifyContent: "flex-start", alignItems: "center" }, [
                            m(Placeholder, { width: "100px", size: "sm" }),
                            m(Text, { fontSize: "0.875rem" }, "sm")
                        ]),
                        m(FlexRow, { gap: "1rem", justifyContent: "flex-start", alignItems: "center" }, [
                            m(Placeholder, { width: "100px", size: "md" }),
                            m(Text, { fontSize: "0.875rem" }, "md")
                        ]),
                        m(FlexRow, { gap: "1rem", justifyContent: "flex-start", alignItems: "center" }, [
                            m(Placeholder, { width: "100px", size: "lg" }),
                            m(Text, { fontSize: "0.875rem" }, "lg")
                        ]),
                        m(FlexRow, { gap: "1rem", justifyContent: "flex-start", alignItems: "center" }, [
                            m(Placeholder, { width: "100px", size: "xl" }),
                            m(Text, { fontSize: "0.875rem" }, "xl")
                        ]),
                    ])
                ]),

                // Con colores
                m(ContentSection, {
                    title: "Con Colores",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "0.5rem", alignItems: "flex-start", width: "300px" }, [
                        m(Placeholder, { width: "100%", type: "primary" }),
                        m(Placeholder, { width: "100%", type: "success" }),
                        m(Placeholder, { width: "100%", type: "danger" }),
                        m(Placeholder, { width: "100%", type: "warning" }),
                        m(Placeholder, { width: "100%", type: "info" }),
                    ])
                ]),

                // Botón placeholder
                m(ContentSection, {
                    title: "Placeholder Button",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(FlexRow, { gap: "0.5rem", justifyContent: "flex-start" }, [
                            m(PlaceholderButton, { type: "primary" }),
                            m(PlaceholderButton, { type: "secondary" }),
                            m(PlaceholderButton, { type: "success" }),
                        ]),
                        m(CodeBlock, { code: `m(PlaceholderButton, { type: "primary" })
m(PlaceholderButton, { type: "secondary" })` })
                    ])
                ]),

                // Card placeholder
                m(ContentSection, {
                    title: "Placeholder Card",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(PlaceholderCard, { style: { maxWidth: "300px" } }),
                        m(CodeBlock, { code: `m(PlaceholderCard)` })
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente Placeholder",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function Placeholder() {
    return {
        view: ({ attrs }) => {
            const { width = "100%", size = "md", type = "neutral", animation = "glow" } = attrs
            
            const bgColor = type === "neutral" ? "#dee2e6" : COLORS.simples[COLORS.types[type]]

            return m("span", {
                style: {
                    display: "inline-block",
                    cursor: "wait",
                    backgroundColor: bgColor,
                    opacity: 0.5,
                    borderRadius: VARIABLES.borderRadius,
                    width,
                    ...PLACEHOLDER_SIZES[size],
                    animation: animation === "glow" ? "placeholder-glow 2s ease-in-out infinite" : "none"
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
