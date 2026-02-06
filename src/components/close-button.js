import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { CodeBlock, Text } from "./text.js"

const CLOSE_BUTTON_SIZES = {
    sm: { width: "0.75rem", height: "0.75rem", padding: "0.2rem" },
    md: { width: "1rem", height: "1rem", padding: "0.25rem" },
    lg: { width: "1.25rem", height: "1.25rem", padding: "0.35rem" },
    xl: { width: "1.5rem", height: "1.5rem", padding: "0.5rem" }
}

export function CloseButton() {
    let isHovered = false
    return {
        view: ({ attrs }) => {
            const { 
                type = "dark",
                size = "md",
                disabled = false,
                onclick,
                style = {} 
            } = attrs
            if (attrs) ['type', 'size', 'disabled', 'onclick', 'style'].forEach(p => delete attrs[p])

            const sizeStyle = CLOSE_BUTTON_SIZES[size] || CLOSE_BUTTON_SIZES.md
            const color = type === "white" ? "#fff" : "#000"

            return m("button", {
                type: "button",
                disabled,
                "aria-label": "Close",
                style: {
                    boxSizing: "content-box",
                    background: "transparent",
                    border: 0,
                    borderRadius: VARIABLES.borderRadius,
                    opacity: disabled ? 0.25 : (isHovered ? 1 : 0.5),
                    cursor: disabled ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "opacity 0.15s ease-in-out",
                    ...sizeStyle,
                    ...style
                },
                onclick: (e) => {
                    if (!disabled && onclick) {
                        onclick(e)
                    }
                },
                onmouseenter: () => {
                    if (!disabled) {
                        isHovered = true
                        m.redraw()
                    }
                },
                onmouseleave: () => {
                    isHovered = false
                    m.redraw()
                }
            }, [
                m("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 16 16",
                    fill: color,
                    style: {
                        width: sizeStyle.width,
                        height: sizeStyle.height
                    }
                }, [
                    m("path", {
                        d: "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                    })
                ])
            ])
        }
    }
}

export function CloseButtonPage() {
    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Close Button",
                    subtitle: "Botón de cierre genérico para modales, alertas, toasts y cualquier componente que necesite ser descartable."
                }),

                // Descripción
                m(ContentSection, {
                    title: "CloseButton—Componente base",
                    paragraphs: ["Componente CloseButton reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Variantes de color: dark, white",
                    "Tamaños: sm, md, lg, xl",
                    "Estado disabled",
                    "Efecto hover"
                ])]),

                // Uso básico
                m(ContentSection, {
                    title: "Uso Básico",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(FlexRow, { gap: "1rem", justifyContent: "flex-start", alignItems: "center" }, [
                            m(CloseButton, { onclick: () => alert("Cerrado!") }),
                            m(Text, "Click para cerrar")
                        ]),
                        m(CodeBlock, { code: `m(CloseButton, { onclick: () => alert("Cerrado!") })` })
                    ])
                ]),

                // Tamaños
                m(ContentSection, {
                    title: "Tamaños",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(FlexRow, { gap: "1rem", justifyContent: "flex-start", alignItems: "center" }, [
                            m(CloseButton, { size: "sm" }),
                            m(Text, "sm")
                        ]),
                        m(FlexRow, { gap: "1rem", justifyContent: "flex-start", alignItems: "center" }, [
                            m(CloseButton, { size: "md" }),
                            m(Text, "md (default)")
                        ]),
                        m(FlexRow, { gap: "1rem", justifyContent: "flex-start", alignItems: "center" }, [
                            m(CloseButton, { size: "lg" }),
                            m(Text, "lg")
                        ]),
                        m(FlexRow, { gap: "1rem", justifyContent: "flex-start", alignItems: "center" }, [
                            m(CloseButton, { size: "xl" }),
                            m(Text, "xl")
                        ]),
                        m(CodeBlock, { code: `m(CloseButton, { size: "sm" })
m(CloseButton, { size: "md" })
m(CloseButton, { size: "lg" })
m(CloseButton, { size: "xl" })` })
                    ])
                ]),

                // Variante blanca
                m(ContentSection, {
                    title: "Variante White",
                    paragraphs: ["Para usar sobre fondos oscuros."],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(FlexRow, { 
                            gap: "1rem", 
                            justifyContent: "flex-start", 
                            alignItems: "center",
                            padding: "1rem",
                            backgroundColor: "#212529",
                            borderRadius: VARIABLES.borderRadius
                        }, [
                            m(CloseButton, { type: "white" }),
                            m(Text, { color: "#fff" }, "Sobre fondo oscuro")
                        ]),
                        m(CodeBlock, { code: `m(CloseButton, { type: "white" })` })
                    ])
                ]),

                // Disabled
                m(ContentSection, {
                    title: "Estado Disabled",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(FlexRow, { gap: "1rem", justifyContent: "flex-start", alignItems: "center" }, [
                            m(CloseButton, { disabled: true }),
                            m(Text, "Deshabilitado")
                        ]),
                        m(CodeBlock, { code: `m(CloseButton, { disabled: true })` })
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente CloseButton",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function CloseButton() {
    let isHovered = false
    return {
        view: ({ attrs }) => {
            const { type = "dark", size = "md", disabled = false, onclick } = attrs
            const color = type === "white" ? "#fff" : "#000"
            const sizeStyle = CLOSE_BUTTON_SIZES[size]

            return m("button", {
                disabled,
                style: {
                    background: "transparent",
                    border: 0,
                    opacity: disabled ? 0.25 : (isHovered ? 1 : 0.5),
                    cursor: disabled ? "not-allowed" : "pointer",
                    ...sizeStyle
                },
                onclick,
                onmouseenter: () => { isHovered = true; m.redraw() },
                onmouseleave: () => { isHovered = false; m.redraw() }
            }, [
                m("svg", { viewBox: "0 0 16 16", fill: color }, [
                    m("path", { d: "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293..." })
                ])
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
