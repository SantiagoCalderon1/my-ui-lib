import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { CodeBlock, Text } from "./text.js"
import { Button } from "./button.js"
import { Card, CardBody } from "./card.js"

export function Collapse() {
    let contentHeight = "auto"
    let isAnimating = false

    return {
        view: ({ attrs, children }) => {
            const { 
                open = false,
                horizontal = false,
                style = {} 
            } = attrs
            if (attrs) ['open', 'horizontal', 'style'].forEach(p => delete attrs[p])

            return m("div", {
                style: {
                    overflow: "hidden",
                    transition: horizontal 
                        ? "width 0.35s ease, opacity 0.35s ease" 
                        : "height 0.35s ease, opacity 0.35s ease",
                    height: horizontal ? "auto" : (open ? "auto" : "0"),
                    width: horizontal ? (open ? "auto" : "0") : "auto",
                    opacity: open ? 1 : 0,
                    ...style
                }
            }, [
                m("div", {
                    style: {
                        visibility: open ? "visible" : "hidden"
                    }
                }, children)
            ])
        }
    }
}

export function CollapsePage() {
    let isOpen1 = false
    let isOpen2 = false
    let isOpenHorizontal = false
    let multiOpen = { a: false, b: false, c: false }

    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Collapse",
                    subtitle: "Componente para mostrar y ocultar contenido con animación. Similar a un acordeón pero como componente independiente."
                }),

                // Descripción
                m(ContentSection, {
                    title: "Collapse—Componente base",
                    paragraphs: ["Componente Collapse reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Control de visibilidad con open",
                    "Animación suave de altura/anchura",
                    "Modo horizontal opcional",
                    "Se puede combinar con cualquier trigger"
                ])]),

                // Uso básico
                m(ContentSection, {
                    title: "Uso Básico",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Button, { 
                            type: "primary",
                            onclick: () => isOpen1 = !isOpen1
                        }, isOpen1 ? "Ocultar" : "Mostrar"),
                        m(Collapse, { open: isOpen1 }, [
                            m(Card, { style: { marginTop: "1rem" } }, [
                                m(CardBody, [
                                    m(Text, "Este es el contenido colapsable. Puedes poner cualquier cosa aquí: texto, imágenes, formularios, etc."),
                                    m(Text, "El contenido se muestra y oculta con una animación suave.")
                                ])
                            ])
                        ]),
                        m(CodeBlock, { code: `let isOpen = false

m(Button, { onclick: () => isOpen = !isOpen }, isOpen ? "Ocultar" : "Mostrar")

m(Collapse, { open: isOpen }, [
    m(Card, [
        m(CardBody, [
            m(Text, "Contenido colapsable...")
        ])
    ])
])` })
                    ])
                ]),

                // Múltiples collapses
                m(ContentSection, {
                    title: "Múltiples Collapses",
                    paragraphs: ["Cada collapse es independiente."],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(FlexRow, { gap: "0.5rem", justifyContent: "flex-start" }, [
                            m(Button, { 
                                type: "primary",
                                onclick: () => multiOpen.a = !multiOpen.a
                            }, "Toggle A"),
                            m(Button, { 
                                type: "secondary",
                                onclick: () => multiOpen.b = !multiOpen.b
                            }, "Toggle B"),
                            m(Button, { 
                                type: "success",
                                onclick: () => {
                                    multiOpen.a = !multiOpen.a
                                    multiOpen.b = !multiOpen.b
                                }
                            }, "Toggle Ambos"),
                        ]),
                        m(FlexRow, { gap: "1rem", alignItems: "flex-start", flexWrap: "wrap" }, [
                            m(Collapse, { open: multiOpen.a }, [
                                m(Card, { style: { marginTop: "1rem", maxWidth: "250px" } }, [
                                    m(CardBody, "Contenido del collapse A")
                                ])
                            ]),
                            m(Collapse, { open: multiOpen.b }, [
                                m(Card, { style: { marginTop: "1rem", maxWidth: "250px" } }, [
                                    m(CardBody, "Contenido del collapse B")
                                ])
                            ])
                        ])
                    ])
                ]),

                // Horizontal
                m(ContentSection, {
                    title: "Collapse Horizontal",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(FlexRow, { gap: "1rem", alignItems: "flex-start" }, [
                            m(Button, { 
                                type: "info",
                                onclick: () => isOpenHorizontal = !isOpenHorizontal
                            }, isOpenHorizontal ? "← Cerrar" : "Abrir →"),
                            m(Collapse, { open: isOpenHorizontal, horizontal: true }, [
                                m(Card, { style: { width: "300px" } }, [
                                    m(CardBody, [
                                        m(Text, "Este collapse se expande horizontalmente en lugar de verticalmente.")
                                    ])
                                ])
                            ])
                        ]),
                        m(CodeBlock, { code: `m(Collapse, { open: isOpen, horizontal: true }, [
    m(Card, { style: { width: "300px" } }, [
        m(CardBody, "Contenido horizontal...")
    ])
])` })
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente Collapse",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function Collapse() {
    return {
        view: ({ attrs, children }) => {
            const { open = false, horizontal = false } = attrs

            return m("div", {
                style: {
                    overflow: "hidden",
                    transition: horizontal 
                        ? "width 0.35s ease, opacity 0.35s ease" 
                        : "height 0.35s ease, opacity 0.35s ease",
                    height: horizontal ? "auto" : (open ? "auto" : "0"),
                    width: horizontal ? (open ? "auto" : "0") : "auto",
                    opacity: open ? 1 : 0
                }
            }, children)
        }
    }
}`
                    })
                ])
            ])
        }
    }
}
