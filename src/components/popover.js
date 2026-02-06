import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { CodeBlock, Text } from "./text.js"
import { Button } from "./button.js"

const POPOVER_POSITIONS = {
    top: {
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginBottom: "10px",
        arrow: {
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            borderColor: "#f7f7f7 transparent transparent transparent"
        }
    },
    bottom: {
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginTop: "10px",
        arrow: {
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            borderColor: "transparent transparent #f7f7f7 transparent"
        }
    },
    left: {
        right: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        marginRight: "10px",
        arrow: {
            left: "100%",
            top: "50%",
            transform: "translateY(-50%)",
            borderColor: "transparent transparent transparent #fff"
        }
    },
    right: {
        left: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        marginLeft: "10px",
        arrow: {
            right: "100%",
            top: "50%",
            transform: "translateY(-50%)",
            borderColor: "transparent #fff transparent transparent"
        }
    }
}

export function Popover() {
    let isVisible = false

    return {
        view: ({ attrs, children }) => {
            const { 
                title = "",
                content = "",
                position = "top",
                trigger = "click",
                style = {} 
            } = attrs
            if (attrs) ['title', 'content', 'position', 'trigger', 'style'].forEach(p => delete attrs[p])

            const posStyle = POPOVER_POSITIONS[position] || POPOVER_POSITIONS.top
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
            } : {
                onclick: (e) => {
                    e.stopPropagation()
                    isVisible = !isVisible
                    m.redraw()
                }
            }

            // Click outside to close
            if (trigger === "click" && isVisible) {
                const handleClickOutside = (e) => {
                    isVisible = false
                    m.redraw()
                    document.removeEventListener("click", handleClickOutside)
                }
                setTimeout(() => {
                    document.addEventListener("click", handleClickOutside)
                }, 0)
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
                // Popover
                isVisible ? m("div", {
                    style: {
                        position: "absolute",
                        zIndex: 1070,
                        minWidth: "200px",
                        maxWidth: "276px",
                        backgroundColor: "#fff",
                        border: "1px solid rgba(0,0,0,0.2)",
                        borderRadius: VARIABLES.borderRadius,
                        boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.15)",
                        ...posStyle
                    },
                    onclick: (e) => e.stopPropagation()
                }, [
                    // Header
                    title ? m("div", {
                        style: {
                            padding: "0.5rem 1rem",
                            borderBottom: "1px solid #dee2e6",
                            backgroundColor: "#f7f7f7",
                            borderTopLeftRadius: VARIABLES.borderRadius,
                            borderTopRightRadius: VARIABLES.borderRadius,
                            fontWeight: "500"
                        }
                    }, title) : null,
                    // Body
                    m("div", {
                        style: {
                            padding: "0.5rem 1rem"
                        }
                    }, content),
                    // Arrow
                    m("div", {
                        style: {
                            position: "absolute",
                            width: 0,
                            height: 0,
                            borderStyle: "solid",
                            borderWidth: "8px",
                            ...arrowStyle
                        }
                    })
                ]) : null
            ])
        }
    }
}

export function PopoverPage() {
    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Popover",
                    subtitle: "Contenido emergente más completo que un tooltip. Incluye título y cuerpo, ideal para información adicional o formularios pequeños."
                }),

                // Descripción
                m(ContentSection, {
                    title: "Popover—Componente base",
                    paragraphs: ["Componente Popover reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Título y contenido personalizable",
                    "Posiciones: top, bottom, left, right",
                    "Triggers: click (default), hover",
                    "Se cierra al hacer click fuera"
                ])]),

                // Posiciones
                m(ContentSection, {
                    title: "Posiciones",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "2rem", alignItems: "center" }, [
                        m(FlexRow, { gap: "2rem", justifyContent: "center", flexWrap: "wrap" }, [
                            m(Popover, { 
                                title: "Popover Arriba", 
                                content: "Este es el contenido del popover en la posición superior.",
                                position: "top" 
                            }, [
                                m(Button, { type: "secondary" }, "Top")
                            ]),
                            m(Popover, { 
                                title: "Popover Abajo", 
                                content: "Este es el contenido del popover en la posición inferior.",
                                position: "bottom" 
                            }, [
                                m(Button, { type: "secondary" }, "Bottom")
                            ]),
                            m(Popover, { 
                                title: "Popover Izquierda", 
                                content: "Contenido del popover a la izquierda.",
                                position: "left" 
                            }, [
                                m(Button, { type: "secondary" }, "Left")
                            ]),
                            m(Popover, { 
                                title: "Popover Derecha", 
                                content: "Contenido del popover a la derecha.",
                                position: "right" 
                            }, [
                                m(Button, { type: "secondary" }, "Right")
                            ]),
                        ]),
                        m(CodeBlock, { code: `m(Popover, { 
    title: "Popover Arriba", 
    content: "Contenido del popover.",
    position: "top" 
}, [
    m(Button, { type: "secondary" }, "Top")
])` })
                    ])
                ]),

                // Sin título
                m(ContentSection, {
                    title: "Sin Título",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Popover, { 
                            content: "Este popover solo tiene contenido, sin título.",
                            position: "right" 
                        }, [
                            m(Button, { type: "primary" }, "Popover sin título")
                        ]),
                        m(CodeBlock, { code: `m(Popover, { 
    content: "Este popover solo tiene contenido, sin título.",
    position: "right" 
}, [
    m(Button, { type: "primary" }, "Popover sin título")
])` })
                    ])
                ]),

                // Con hover trigger
                m(ContentSection, {
                    title: "Trigger Hover",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Popover, { 
                            title: "Hover Popover",
                            content: "Este popover se activa con hover.",
                            trigger: "hover",
                            position: "top" 
                        }, [
                            m(Button, { type: "info" }, "Hover para ver")
                        ]),
                        m(CodeBlock, { code: `m(Popover, { 
    title: "Hover Popover",
    content: "Se activa con hover.",
    trigger: "hover",
    position: "top" 
}, [
    m(Button, { type: "info" }, "Hover para ver")
])` })
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente Popover",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function Popover() {
    let isVisible = false

    return {
        view: ({ attrs, children }) => {
            const { title = "", content = "", position = "top", trigger = "click" } = attrs
            const posStyle = POPOVER_POSITIONS[position]

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
                        minWidth: "200px",
                        backgroundColor: "#fff",
                        border: "1px solid rgba(0,0,0,0.2)",
                        borderRadius: VARIABLES.borderRadius,
                        boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.15)",
                        ...posStyle
                    }
                }, [
                    title ? m("div", { style: { padding: "0.5rem 1rem", backgroundColor: "#f7f7f7" } }, title) : null,
                    m("div", { style: { padding: "0.5rem 1rem" } }, content)
                ]) : null
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
