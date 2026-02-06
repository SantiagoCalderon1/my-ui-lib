import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { CodeBlock, Text } from "./text.js"
import { Button } from "./button.js"

export function ButtonGroup() {
    return {
        view: ({ attrs, children }) => {
            const { 
                vertical = false,
                size = "md",
                style = {} 
            } = attrs
            if (attrs) ['vertical', 'size', 'style'].forEach(p => delete attrs[p])

            // Procesar children para ajustar border-radius
            const processedChildren = children.map((child, index) => {
                if (!child || !child.attrs) return child
                
                const isFirst = index === 0
                const isLast = index === children.length - 1
                const isMiddle = !isFirst && !isLast

                let borderStyle = {}
                if (vertical) {
                    borderStyle = {
                        borderRadius: 0,
                        ...(isFirst && { 
                            borderTopLeftRadius: VARIABLES.borderRadius, 
                            borderTopRightRadius: VARIABLES.borderRadius 
                        }),
                        ...(isLast && { 
                            borderBottomLeftRadius: VARIABLES.borderRadius, 
                            borderBottomRightRadius: VARIABLES.borderRadius 
                        }),
                        marginTop: isFirst ? 0 : "-1px"
                    }
                } else {
                    borderStyle = {
                        borderRadius: 0,
                        ...(isFirst && { 
                            borderTopLeftRadius: VARIABLES.borderRadius, 
                            borderBottomLeftRadius: VARIABLES.borderRadius 
                        }),
                        ...(isLast && { 
                            borderTopRightRadius: VARIABLES.borderRadius, 
                            borderBottomRightRadius: VARIABLES.borderRadius 
                        }),
                        marginLeft: isFirst ? 0 : "-1px"
                    }
                }

                return m(child.tag, {
                    ...child.attrs,
                    size,
                    style: {
                        ...child.attrs?.style,
                        ...borderStyle
                    }
                }, child.children)
            })

            return m("div", {
                role: "group",
                style: {
                    display: "inline-flex",
                    flexDirection: vertical ? "column" : "row",
                    position: "relative",
                    verticalAlign: "middle",
                    ...style
                }
            }, processedChildren)
        }
    }
}

export function ButtonToolbar() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            if (attrs) ['style'].forEach(p => delete attrs[p])

            return m("div", {
                role: "toolbar",
                style: {
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    gap: "0.5rem",
                    ...style
                }
            }, children)
        }
    }
}

export function ButtonGroupPage() {
    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Button Group",
                    subtitle: "Agrupa una serie de botones en una sola línea o columna. Ideal para barras de herramientas, controles de radio y más."
                }),

                // Descripción
                m(ContentSection, {
                    title: "ButtonGroup—Componente base",
                    paragraphs: ["Componente ButtonGroup reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Agrupación horizontal (default) y vertical",
                    "Hereda tamaño para todos los botones del grupo",
                    "ButtonToolbar para agrupar múltiples ButtonGroups"
                ])]),

                // Uso básico
                m(ContentSection, {
                    title: "Uso Básico",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(ButtonGroup, [
                            m(Button, { type: "primary" }, "Izquierda"),
                            m(Button, { type: "primary" }, "Centro"),
                            m(Button, { type: "primary" }, "Derecha")
                        ]),
                        m(CodeBlock, { code: `m(ButtonGroup, [
    m(Button, { type: "primary" }, "Izquierda"),
    m(Button, { type: "primary" }, "Centro"),
    m(Button, { type: "primary" }, "Derecha")
])` })
                    ])
                ]),

                // Mixed styles
                m(ContentSection, {
                    title: "Estilos Mixtos",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(ButtonGroup, [
                            m(Button, { type: "danger" }, "Eliminar"),
                            m(Button, { type: "warning" }, "Editar"),
                            m(Button, { type: "success" }, "Guardar")
                        ]),
                        m(CodeBlock, { code: `m(ButtonGroup, [
    m(Button, { type: "danger" }, "Eliminar"),
    m(Button, { type: "warning" }, "Editar"),
    m(Button, { type: "success" }, "Guardar")
])` })
                    ])
                ]),

                // Outline
                m(ContentSection, {
                    title: "Con Outline",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(ButtonGroup, [
                            m(Button, { type: "primary-outline" }, "Opción 1"),
                            m(Button, { type: "primary-outline" }, "Opción 2"),
                            m(Button, { type: "primary-outline" }, "Opción 3")
                        ]),
                        m(CodeBlock, { code: `m(ButtonGroup, [
    m(Button, { type: "primary-outline" }, "Opción 1"),
    m(Button, { type: "primary-outline" }, "Opción 2"),
    m(Button, { type: "primary-outline" }, "Opción 3")
])` })
                    ])
                ]),

                // Vertical
                m(ContentSection, {
                    title: "Vertical",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(ButtonGroup, { vertical: true }, [
                            m(Button, { type: "primary" }, "Arriba"),
                            m(Button, { type: "primary" }, "Centro"),
                            m(Button, { type: "primary" }, "Abajo")
                        ]),
                        m(CodeBlock, { code: `m(ButtonGroup, { vertical: true }, [
    m(Button, { type: "primary" }, "Arriba"),
    m(Button, { type: "primary" }, "Centro"),
    m(Button, { type: "primary" }, "Abajo")
])` })
                    ])
                ]),

                // Tamaños
                m(ContentSection, {
                    title: "Tamaños",
                    paragraphs: ["El tamaño se aplica a todos los botones del grupo."],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Text, { fontWeight: "500" }, "Small (sm)"),
                        m(ButtonGroup, { size: "sm" }, [
                            m(Button, { type: "secondary" }, "Btn 1"),
                            m(Button, { type: "secondary" }, "Btn 2"),
                            m(Button, { type: "secondary" }, "Btn 3")
                        ]),

                        m(Text, { fontWeight: "500", marginTop: "1rem" }, "Medium (md) - Default"),
                        m(ButtonGroup, { size: "md" }, [
                            m(Button, { type: "secondary" }, "Btn 1"),
                            m(Button, { type: "secondary" }, "Btn 2"),
                            m(Button, { type: "secondary" }, "Btn 3")
                        ]),

                        m(Text, { fontWeight: "500", marginTop: "1rem" }, "Large (lg)"),
                        m(ButtonGroup, { size: "lg" }, [
                            m(Button, { type: "secondary" }, "Btn 1"),
                            m(Button, { type: "secondary" }, "Btn 2"),
                            m(Button, { type: "secondary" }, "Btn 3")
                        ])
                    ])
                ]),

                // Button Toolbar
                m(ContentSection, {
                    title: "Button Toolbar",
                    paragraphs: ["Agrupa múltiples ButtonGroups en una barra de herramientas."],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(ButtonToolbar, [
                            m(ButtonGroup, [
                                m(Button, { type: "primary" }, "1"),
                                m(Button, { type: "primary" }, "2"),
                                m(Button, { type: "primary" }, "3")
                            ]),
                            m(ButtonGroup, [
                                m(Button, { type: "secondary" }, "4"),
                                m(Button, { type: "secondary" }, "5"),
                                m(Button, { type: "secondary" }, "6")
                            ]),
                            m(ButtonGroup, [
                                m(Button, { type: "success" }, "7"),
                                m(Button, { type: "success" }, "8")
                            ])
                        ]),
                        m(CodeBlock, { code: `m(ButtonToolbar, [
    m(ButtonGroup, [
        m(Button, { type: "primary" }, "1"),
        m(Button, { type: "primary" }, "2"),
        m(Button, { type: "primary" }, "3")
    ]),
    m(ButtonGroup, [
        m(Button, { type: "secondary" }, "4"),
        m(Button, { type: "secondary" }, "5")
    ])
])` })
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente ButtonGroup",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function ButtonGroup() {
    return {
        view: ({ attrs, children }) => {
            const { vertical = false, size = "md" } = attrs
            
            const processedChildren = children.map((child, index) => {
                const isFirst = index === 0
                const isLast = index === children.length - 1
                
                let borderStyle = vertical ? {
                    borderRadius: 0,
                    ...(isFirst && { borderTopLeftRadius: VARIABLES.borderRadius, borderTopRightRadius: VARIABLES.borderRadius }),
                    ...(isLast && { borderBottomLeftRadius: VARIABLES.borderRadius, borderBottomRightRadius: VARIABLES.borderRadius })
                } : {
                    borderRadius: 0,
                    ...(isFirst && { borderTopLeftRadius: VARIABLES.borderRadius, borderBottomLeftRadius: VARIABLES.borderRadius }),
                    ...(isLast && { borderTopRightRadius: VARIABLES.borderRadius, borderBottomRightRadius: VARIABLES.borderRadius })
                }
                
                return m(child.tag, { ...child.attrs, size, style: { ...child.attrs?.style, ...borderStyle } }, child.children)
            })

            return m("div", {
                role: "group",
                style: { display: "inline-flex", flexDirection: vertical ? "column" : "row" }
            }, processedChildren)
        }
    }
}`
                    })
                ])
            ])
        }
    }
}
