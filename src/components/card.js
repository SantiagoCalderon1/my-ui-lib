import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { CodeBlock, Text } from "./text.js"
import { Button } from "./button.js"

const CARD_SHADOWS = {
    none: "none",
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 6px rgba(0,0,0,0.1)",
    lg: "0 10px 15px rgba(0,0,0,0.1)",
    xl: "0 20px 25px rgba(0,0,0,0.15)"
}

export function Card() {
    let isHovered = false
    return {
        view: ({ attrs, children }) => {
            const { 
                type = "light", 
                shadow = "sm", 
                hover = false, 
                border = true,
                style = {} 
            } = attrs
            if (attrs) ['type', 'shadow', 'hover', 'border', 'style'].forEach(p => delete attrs[p])

            const colorKey = COLORS.types[type] || "white"
            const baseColors = type === "light" 
                ? { backgroundColor: "#fff", color: "#212529" }
                : COLORS.base[colorKey] || { backgroundColor: "#fff", color: "#212529" }

            return m("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    maxWidth: "400px",
                    borderRadius: VARIABLES.borderRadius,
                    border: border ? "1px solid #dee2e6" : "none",
                    boxShadow: isHovered && hover ? CARD_SHADOWS.lg : CARD_SHADOWS[shadow] || CARD_SHADOWS.sm,
                    transition: "all 0.3s ease-in-out",
                    overflow: "hidden",
                    ...baseColors,
                    ...style
                },
                onmouseenter: () => {
                    if (hover) {
                        isHovered = true
                        m.redraw()
                    }
                },
                onmouseleave: () => {
                    if (hover) {
                        isHovered = false
                        m.redraw()
                    }
                }
            }, children)
        }
    }
}

export function CardHeader() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            if (attrs) ['style'].forEach(p => delete attrs[p])

            return m("div", {
                style: {
                    padding: "0.75rem 1rem",
                    borderBottom: "1px solid #dee2e6",
                    backgroundColor: "rgba(0,0,0,0.03)",
                    fontWeight: "500",
                    ...style
                }
            }, children)
        }
    }
}

export function CardBody() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            if (attrs) ['style'].forEach(p => delete attrs[p])

            return m("div", {
                style: {
                    padding: "1rem",
                    flex: "1 1 auto",
                    ...style
                }
            }, children)
        }
    }
}

export function CardFooter() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            if (attrs) ['style'].forEach(p => delete attrs[p])

            return m("div", {
                style: {
                    padding: "0.75rem 1rem",
                    borderTop: "1px solid #dee2e6",
                    backgroundColor: "rgba(0,0,0,0.03)",
                    ...style
                }
            }, children)
        }
    }
}

export function CardImage() {
    return {
        view: ({ attrs }) => {
            const { src, alt = "Card image", position = "top", style = {} } = attrs
            if (attrs) ['src', 'alt', 'position', 'style'].forEach(p => delete attrs[p])

            return m("img", {
                src,
                alt,
                style: {
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    borderTopLeftRadius: position === "top" ? VARIABLES.borderRadius : 0,
                    borderTopRightRadius: position === "top" ? VARIABLES.borderRadius : 0,
                    borderBottomLeftRadius: position === "bottom" ? VARIABLES.borderRadius : 0,
                    borderBottomRightRadius: position === "bottom" ? VARIABLES.borderRadius : 0,
                    ...style
                }
            })
        }
    }
}

export function CardTitle() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            if (attrs) ['style'].forEach(p => delete attrs[p])

            return m("h5", {
                style: {
                    margin: "0 0 0.5rem 0",
                    fontSize: "1.25rem",
                    fontWeight: "500",
                    ...style
                }
            }, children)
        }
    }
}

export function CardText() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            if (attrs) ['style'].forEach(p => delete attrs[p])

            return m("p", {
                style: {
                    margin: "0 0 1rem 0",
                    color: "#6c757d",
                    ...style
                }
            }, children)
        }
    }
}

export function CardPage() {
    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Card",
                    subtitle: "Contenedor flexible con soporte para encabezados, cuerpo, pie de página e imágenes. Ideal para mostrar contenido agrupado."
                }),

                // Descripción
                m(ContentSection, {
                    title: "Card—Componente base",
                    paragraphs: ["Componente Card reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Subcomponentes: CardHeader, CardBody, CardFooter, CardImage",
                    "Variantes de color (type)",
                    "Niveles de sombra (shadow: none, sm, md, lg, xl)",
                    "Efecto hover",
                    "Bordes opcionales"
                ])]),

                // Uso básico
                m(ContentSection, {
                    title: "Uso Básico",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Card, [
                            m(CardBody, [
                                m(CardTitle, "Título de la Card"),
                                m(CardText, "Este es el contenido de la card. Puedes poner cualquier información aquí."),
                                m(Button, { type: "primary" }, "Acción")
                            ])
                        ]),
                        m(CodeBlock, { code: `m(Card, [
    m(CardBody, [
        m(CardTitle, "Título de la Card"),
        m(CardText, "Este es el contenido de la card."),
        m(Button, { type: "primary" }, "Acción")
    ])
])` })
                    ])
                ]),

                // Card con Header y Footer
                m(ContentSection, {
                    title: "Card con Header y Footer",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Card, [
                            m(CardHeader, "Encabezado"),
                            m(CardBody, [
                                m(CardTitle, "Card con estructura completa"),
                                m(CardText, "Esta card tiene header, body y footer.")
                            ]),
                            m(CardFooter, "Pie de página")
                        ]),
                        m(CodeBlock, { code: `m(Card, [
    m(CardHeader, "Encabezado"),
    m(CardBody, [
        m(CardTitle, "Card con estructura completa"),
        m(CardText, "Esta card tiene header, body y footer.")
    ]),
    m(CardFooter, "Pie de página")
])` })
                    ])
                ]),

                // Card con Imagen
                m(ContentSection, {
                    title: "Card con Imagen",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Card, [
                            m(CardImage, { 
                                src: "https://placehold.co/400x200/0A6FFD/ffffff?text=Card+Image",
                                alt: "Imagen de ejemplo"
                            }),
                            m(CardBody, [
                                m(CardTitle, "Card con Imagen"),
                                m(CardText, "Las imágenes se ajustan automáticamente al ancho de la card."),
                                m(Button, { type: "primary" }, "Ver más")
                            ])
                        ]),
                        m(CodeBlock, { code: `m(Card, [
    m(CardImage, { src: "imagen.jpg", alt: "Descripción" }),
    m(CardBody, [
        m(CardTitle, "Card con Imagen"),
        m(CardText, "Las imágenes se ajustan automáticamente."),
        m(Button, { type: "primary" }, "Ver más")
    ])
])` })
                    ])
                ]),

                // Hover effect
                m(ContentSection, {
                    title: "Card con Hover",
                    paragraphs: ["Pasa el mouse sobre la card para ver el efecto de sombra."],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Card, { hover: true }, [
                            m(CardBody, [
                                m(CardTitle, "Card Interactiva"),
                                m(CardText, "Esta card tiene efecto hover. Pasa el mouse para verlo.")
                            ])
                        ]),
                        m(CodeBlock, { code: `m(Card, { hover: true }, [
    m(CardBody, [
        m(CardTitle, "Card Interactiva"),
        m(CardText, "Esta card tiene efecto hover.")
    ])
])` })
                    ])
                ]),

                // Variantes de sombra
                m(ContentSection, {
                    title: "Niveles de Sombra",
                    alignItems: "flex-start"
                }, [
                    m(FlexRow, { gap: "1rem", flexWrap: "wrap", justifyContent: "flex-start" }, [
                        ...["none", "sm", "md", "lg", "xl"].map(shadow =>
                            m(Card, { shadow, style: { maxWidth: "180px" } }, [
                                m(CardBody, { style: { textAlign: "center" } }, [
                                    m(Text, { fontWeight: "500" }, `shadow: "${shadow}"`)
                                ])
                            ])
                        )
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente Card",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function Card() {
    let isHovered = false
    return {
        view: ({ attrs, children }) => {
            const { type = "light", shadow = "sm", hover = false, border = true, style = {} } = attrs
            
            return m("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: VARIABLES.borderRadius,
                    border: border ? "1px solid #dee2e6" : "none",
                    boxShadow: isHovered && hover ? CARD_SHADOWS.lg : CARD_SHADOWS[shadow],
                    transition: "all 0.3s ease-in-out",
                    ...style
                },
                onmouseenter: () => { if (hover) { isHovered = true; m.redraw() } },
                onmouseleave: () => { if (hover) { isHovered = false; m.redraw() } }
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
