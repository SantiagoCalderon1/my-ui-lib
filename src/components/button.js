import { COLORS } from "../styles/colors.js"
import { SIZES, VARIABLES } from "../styles/variables.js"
import { resolveStyle } from "../utils.js"

import { ColorShapeSVG, ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"

import { Table, TableCell, TableRow } from "./tables.js"
import { MyOrderedList } from "./lists.js"
import { CodeBlock, Text } from "./text.js"

export function Button() {
    const styleBase = { borderRadius: VARIABLES.borderRadius, transition: "all 0.2s ease-in-out" }
    return {
        view: ({ attrs, children }) => {
            const { type = "primary", size = "md", hover = false, disabled = false, onclick, style = {} } = attrs
            if (attrs) ['type', 'size', 'hover', 'disabled', 'onclick', 'style'].forEach(p => delete attrs[p])
            const baseStyle = resolveStyle({ type, size, style, styleBase })
            return m("button", {
                disabled,
                style: {
                    ...baseStyle,
                    cursor: disabled ? "not-allowed" : "pointer",
                    opacity: disabled ? 0.6 : 1
                },
                onmouseenter: (e) => {
                    if (!hover || disabled) return
                    Object.assign(e.target.style, resolveStyle({ type, size, style, hover: true }))
                },
                onmouseleave: (e) => {
                    if (!hover || disabled) return
                    Object.assign(e.target.style, baseStyle)
                },
                onclick: (e) => {
                    if (!disabled && typeof onclick === "function")
                        onclick(e)
                }
            }, children)
        }
    }
}

export function ButtonPage() {
    return {
        view: ({ attrs, children }) => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Buttons",
                    subtitle: "Utilice estilos de botones personalizados para acciones en formularios, cuadros de diálogo, etc. Con soporte para múltiples tamaños, estados y colores."
                }),
                // Subtítulo
                m(ContentSection, {
                    title: "Button—Componente base",
                    paragraphs: ["Componente de botón reutilizable, orientado a sistemas de diseño, con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Variantes semánticas",
                    "Disabled",
                    "Modo hover",
                    "Modo outline",
                    "Escalas de color",
                    "Escalas de Transparencias",
                    "Tamaños"
                ])]),
                // Resumen
                m(ContentSection, {
                    title: "Uso Básico",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem" }, [
                        m(Button, { type: "primary", onclick: () => alert("primary") }, "Base"),
                        m(CodeBlock, { code: `m(Button, { type: "primary", onclick: () => alert("primary") }, "Base")`, }),
                    ]),
                    m(Text, { textAlign: "justify" }, ["Con desahabilitar activo:"]),
                    m(FlexCol, { gap: "1rem" }, [
                        m(Button, { type: "primary", disabled: true, onclick: () => alert("primary") }, "Base"),
                        m(CodeBlock, { code: `m(Button, { type: "primary", disabled: true, onclick: () => alert("primary") }, "Base")`, }),
                    ]),
                ]),
                // Hover
                m(ContentSection, {
                    title: "Hover",
                    alignItems: "flex-start"
                }, [
                    m(MyOrderedList, ["Aplicado lógicamente, no con CSS",
                        "Normal: aclara el fondo (50% opacidad) manteniendo el color de texto",
                        "Outline: rellena con el color base, mantiene borde; al salir vuelve a outline",
                        `Soporta variantes de color "primary-100", "primary-200", "primary-300", etc.`
                    ]),
                    m(ContentSection, {
                        alignItems: "flex-start",
                    }, [
                        m(FlexCol, { gap: "1rem", width: "100%" }, [
                            m(FlexCol, { gap: "1rem" }, [
                                m(Button, { type: "success", hover: true, onclick: () => alert("success") }, "Guardar"),
                                m(CodeBlock, { code: `m(Button, { type: "success", hover: true, onclick: () => alert("success")}, "Guardar")`, })
                            ]),
                            m(FlexCol, { gap: "1rem" }, [
                                m(Button, { type: "success-outline", hover: true, onclick: () => alert("success-outline") }, "Guardar"),
                                m(CodeBlock, { code: `m(Button, { type: "success-outline", hover: true, onclick: () => alert("success-outline")}, "Guardar")`, })
                            ])
                        ])
                    ])
                ]),
                // outline
                m(ContentSection, {
                    title: "Outline",
                    paragraphs: ["Replica exactamente el patrón Bootstrap:"],
                    alignItems: "flex-start"
                }, [
                    m(MyOrderedList, ["Fondo: transparente.",
                        "Borde y texto: color del tipo.",
                        "Hover: rellena con color base; al salir vuelve a transparente con borde",
                        `Soporta variantes de color "primary-outline-100", "primary-outline-200", "primary-outline-300", etc.`
                    ]),
                    m(ContentSection, {
                        alignItems: "flex-start"
                    }, [
                        m(FlexCol, { gap: "1rem" }, [
                            m(Button, { type: "primary-outline" }, "Primary Outline"),
                            m(CodeBlock, { code: `m(Button, { type: "primary-outline" }, "primary Outline")`, })
                        ])
                    ])
                ]),
                // Escalas de color
                m(ContentSection, {
                    title: "Variantes (types)",
                    paragraphs: ["Por defecto → primary", "Mapa semántico → color real:"],
                    alignItems: "flex-start"
                }, [
                    m(Table, [
                        m(TableRow, [
                            m(TableCell, { header: true }, "Buttom"),
                            m(TableCell, { header: true }, "Type"),
                            m(TableCell, { header: true }, "Color"),
                            m(TableCell, { header: true }, "Code"),
                        ]),
                        ...Object.entries(COLORS.types).map(([type, colorKey], index) =>
                            m(TableRow, {}, [
                                m(TableCell, {}, [m(Button, { type, onclick: () => alert(type) }, `Base ${index + 1}`),]),
                                m(TableCell, {}, type),
                                m(TableCell, {}, colorKey),
                                m(TableCell, {}, [
                                    m(FlexRow, { justifyContent: "flex-start", gap: "0.5rem" }, [
                                        m(ColorShapeSVG, { color: COLORS.simples[colorKey], shape: "square", size: 16 }),
                                        m(Text, COLORS.simples[colorKey])])
                                ]),
                            ])
                        )
                    ])
                ]),
                // Escalas de color y opacidad
                m(ContentSection, {
                    title: "Variantes de opacidad (type3-shade)",
                    paragraphs: ["sintaxis → type-shade → primary-100:",
                        "Mapa semántico → color y opacidad:"],
                    alignItems: "flex-start"
                }, [
                    m(Table, [
                        m(TableRow, [
                            m(TableCell, { header: true }, "Buttom"),
                            m(TableCell, { header: true }, "Opacity"),
                            m(TableCell, { header: true }, "Code"),
                        ]),
                        ...Object.entries(COLORS.blue).map(([shade, colorName], index) => {
                            const colorKey = COLORS.types.primary; // "blue" para primary
                            const bgColor = COLORS[colorKey]?.[shade]?.backgroundColor || COLORS.base[colorKey]?.backgroundColor || colorName;
                            return m(TableRow, {}, [
                                m(TableCell, {}, [
                                    m(Button, { type: `primary-${shade}`, onclick: () => alert(shade) }, `Base ${shade}`)
                                ]),
                                m(TableCell, {}, shade),
                                m(TableCell, {}, [
                                    m(FlexRow, { justifyContent: "flex-start", gap: "0.5rem" }, [
                                        m(ColorShapeSVG, { color: bgColor, shape: "square", size: 16 }),
                                        m(Text, bgColor)
                                    ])
                                ])
                            ])
                        })
                    ])
                ]),
                // Escala de tamaños
                m(ContentSection, {
                    title: "Tamaños (size)",
                    paragraphs: ["Por defecto → md", "Escala tipográfica y espaciado de botones:"],
                    alignItems: "flex-start"
                }, [
                    m(Table, [
                        m(TableRow, [
                            m(TableCell, { header: true }, "Button"),
                            m(TableCell, { header: true }, "Size"),
                            m(TableCell, { header: true }, "Font size"),
                            m(TableCell, { header: true }, "Padding"),
                        ]),
                        ...Object.entries(SIZES).map(([size, cfg]) =>
                            m(TableRow, [
                                m(TableCell, {},
                                    m(Button, { size, onclick: () => alert(`Size: ${size}`) }, size.toUpperCase())
                                ),
                                m(TableCell, {}, size),
                                m(TableCell, {}, cfg.fontSize),
                                m(TableCell, {}, cfg.padding),
                            ])
                        )
                    ])
                ]),
                // Code Raw
                m(ContentSection, {
                    title: "Código fuente Button",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function Button() {
    const styleBase = { borderRadius: VARIABLES.borderRadius, transition: "all 0.2s ease-in-out" }
    return {
        view: ({ attrs, children }) => {
            const { type = "primary", size = "md", hover = false, disabled = false, onclick, style = {} } = attrs
            if (attrs) ['type', 'size', 'hover', 'disabled', 'onclick', 'style'].forEach(p => delete attrs[p])
            const baseStyle = resolveStyle({ type, size, style, styleBase })
            return m("button", {
                disabled,
                style: {
                    ...baseStyle,
                    cursor: disabled ? "not-allowed" : "pointer",
                    opacity: disabled ? 0.6 : 1
                },
                onmouseenter: (e) => {
                    if (!hover || disabled) return
                    Object.assign(e.target.style, resolveStyle({ type, size, style, hover: true }))
                },
                onmouseleave: (e) => {
                    if (!hover || disabled) return
                    Object.assign(e.target.style, baseStyle)
                },
                onclick: (e) => {
                    if (!disabled && typeof onclick === "function")
                        onclick(e)
                }
            }, children)
        }
    }
}`,
                    })
                ])
            ])
        }
    }
}