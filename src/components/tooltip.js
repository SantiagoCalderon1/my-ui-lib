import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { CodeBlock, Text } from "./text.js"
import { Button } from "./button.js"

const TOOLTIP_POSITIONS = {
    top: {
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginBottom: "8px",
        arrow: {
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            borderColor: "#000 transparent transparent transparent"
        }
    },
    bottom: {
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginTop: "8px",
        arrow: {
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            borderColor: "transparent transparent #000 transparent"
        }
    },
    left: {
        right: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        marginRight: "8px",
        arrow: {
            left: "100%",
            top: "50%",
            transform: "translateY(-50%)",
            borderColor: "transparent transparent transparent #000"
        }
    },
    right: {
        left: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        marginLeft: "8px",
        arrow: {
            right: "100%",
            top: "50%",
            transform: "translateY(-50%)",
            borderColor: "transparent #000 transparent transparent"
        }
    }
}

export function Tooltip() {
    let isVisible = false

    return {
        view: ({ attrs, children }) => {
            const { 
                content = "",
                position = "top",
                trigger = "hover",
                style = {} 
            } = attrs
            if (attrs) ['content', 'position', 'trigger', 'style'].forEach(p => delete attrs[p])

            const posStyle = TOOLTIP_POSITIONS[position] || TOOLTIP_POSITIONS.top
            const arrowStyle = posStyle.arrow

            const eventHandlers = trigger === "hover" ? {
                onmouseenter: () => {
                    isVisible = true
                    m.redraw()
                },
                onmouseleave: () => {
                    isVisible = false
                    m.redraw()
                }
            } : trigger === "focus" ? {
                onfocus: () => {
                    isVisible = true
                    m.redraw()
                },
                onblur: () => {
                    isVisible = false
                    m.redraw()
                }
            } : {
                onclick: () => {
                    isVisible = !isVisible
                    m.redraw()
                }
            }

            return m("div", {
                style: {
                    position: "relative",
                    display: "inline-block",
                    ...style
                },
                ...eventHandlers
            }, [
                // Child element
                children,
                // Tooltip
                isVisible ? m("div", {
                    style: {
                        position: "absolute",
                        zIndex: 1080,
                        padding: "0.4rem 0.8rem",
                        fontSize: "0.875rem",
                        color: "#fff",
                        backgroundColor: "#000",
                        borderRadius: VARIABLES.borderRadius,
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                        ...posStyle
                    }
                }, [
                    content,
                    // Arrow
                    m("div", {
                        style: {
                            position: "absolute",
                            width: 0,
                            height: 0,
                            borderStyle: "solid",
                            borderWidth: "6px",
                            ...arrowStyle
                        }
                    })
                ]) : null
            ])
        }
    }
}

export function TooltipPage() {
    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Tooltip",
                    subtitle: "Información contextual que aparece al interactuar con un elemento. Ideal para explicaciones breves o etiquetas."
                }),

                // Descripción
                m(ContentSection, {
                    title: "Tooltip—Componente base",
                    paragraphs: ["Componente Tooltip reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Contenido personalizable",
                    "Posiciones: top, bottom, left, right",
                    "Triggers: hover (default), focus, click"
                ])]),

                // Posiciones
                m(ContentSection, {
                    title: "Posiciones",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "2rem", alignItems: "center" }, [
                        m(FlexRow, { gap: "2rem", justifyContent: "center", flexWrap: "wrap" }, [
                            m(Tooltip, { content: "Tooltip arriba", position: "top" }, [
                                m(Button, { type: "secondary" }, "Top")
                            ]),
                            m(Tooltip, { content: "Tooltip abajo", position: "bottom" }, [
                                m(Button, { type: "secondary" }, "Bottom")
                            ]),
                            m(Tooltip, { content: "Tooltip izquierda", position: "left" }, [
                                m(Button, { type: "secondary" }, "Left")
                            ]),
                            m(Tooltip, { content: "Tooltip derecha", position: "right" }, [
                                m(Button, { type: "secondary" }, "Right")
                            ]),
                        ]),
                        m(CodeBlock, { code: `m(Tooltip, { content: "Tooltip arriba", position: "top" }, [
    m(Button, { type: "secondary" }, "Top")
])

m(Tooltip, { content: "Tooltip abajo", position: "bottom" }, [
    m(Button, { type: "secondary" }, "Bottom")
])

m(Tooltip, { content: "Tooltip izquierda", position: "left" }, [
    m(Button, { type: "secondary" }, "Left")
])

m(Tooltip, { content: "Tooltip derecha", position: "right" }, [
    m(Button, { type: "secondary" }, "Right")
])` })
                    ])
                ]),

                // Triggers
                m(ContentSection, {
                    title: "Triggers",
                    paragraphs: ["El tooltip puede activarse con diferentes eventos."],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(FlexRow, { gap: "1rem", justifyContent: "flex-start", flexWrap: "wrap" }, [
                            m(Tooltip, { content: "Hover para ver", trigger: "hover" }, [
                                m(Button, { type: "primary" }, "Hover (default)")
                            ]),
                            m(Tooltip, { content: "Click para ver", trigger: "click" }, [
                                m(Button, { type: "success" }, "Click")
                            ]),
                        ]),
                        m(CodeBlock, { code: `// Hover (default)
m(Tooltip, { content: "Hover para ver", trigger: "hover" }, [
    m(Button, "Hover")
])

// Click
m(Tooltip, { content: "Click para ver", trigger: "click" }, [
    m(Button, "Click")
])` })
                    ])
                ]),

                // Con diferentes elementos
                m(ContentSection, {
                    title: "En diferentes elementos",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(FlexRow, { gap: "2rem", justifyContent: "flex-start", alignItems: "center" }, [
                            m(Tooltip, { content: "Este es un enlace con tooltip" }, [
                                m("a", { href: "#", style: { color: "#0d6efd" } }, "Enlace con tooltip")
                            ]),
                            m(Tooltip, { content: "Icono de información" }, [
                                m("span", { style: { 
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "24px",
                                    height: "24px",
                                    borderRadius: "50%",
                                    backgroundColor: "#0d6efd",
                                    color: "#fff",
                                    fontSize: "14px",
                                    cursor: "pointer"
                                } }, "i")
                            ]),
                            m(Tooltip, { content: "Texto con tooltip" }, [
                                m("span", { style: { 
                                    borderBottom: "1px dashed #6c757d",
                                    cursor: "help"
                                } }, "Texto con ayuda")
                            ]),
                        ])
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente Tooltip",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function Tooltip() {
    let isVisible = false

    return {
        view: ({ attrs, children }) => {
            const { content = "", position = "top", trigger = "hover" } = attrs
            const posStyle = TOOLTIP_POSITIONS[position]

            const eventHandlers = trigger === "hover" ? {
                onmouseenter: () => { isVisible = true; m.redraw() },
                onmouseleave: () => { isVisible = false; m.redraw() }
            } : {
                onclick: () => { isVisible = !isVisible; m.redraw() }
            }

            return m("div", {
                style: { position: "relative", display: "inline-block" },
                ...eventHandlers
            }, [
                children,
                isVisible ? m("div", {
                    style: {
                        position: "absolute",
                        zIndex: 1080,
                        padding: "0.4rem 0.8rem",
                        color: "#fff",
                        backgroundColor: "#000",
                        borderRadius: VARIABLES.borderRadius,
                        ...posStyle
                    }
                }, content) : null
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
