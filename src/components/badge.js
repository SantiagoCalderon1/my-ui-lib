import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { resolveStyle } from "../utils.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { Table, TableCell, TableRow } from "./tables.js"
import { CodeBlock, Text } from "./text.js"

const BADGE_SIZES = {
    sm: { fontSize: "0.65rem", padding: "0.2rem 0.4rem" },
    md: { fontSize: "0.75rem", padding: "0.35rem 0.65rem" },
    lg: { fontSize: "0.85rem", padding: "0.5rem 0.85rem" }
}

export function Badge() {
    return {
        view: ({ attrs, children }) => {
            const { type = "primary", size = "md", rounded = false, style = {} } = attrs
            if (attrs) ['type', 'size', 'rounded', 'style'].forEach(p => delete attrs[p])

            const colorKey = COLORS.types[type] || "blue"
            const baseColors = COLORS.base[colorKey] || COLORS.base.blue
            const sizeStyle = BADGE_SIZES[size] || BADGE_SIZES.md

            return m("span", {
                style: {
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "600",
                    lineHeight: 1,
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    verticalAlign: "baseline",
                    borderRadius: rounded ? "50rem" : VARIABLES.borderRadius,
                    transition: "all 0.2s ease-in-out",
                    ...sizeStyle,
                    ...baseColors,
                    ...style
                }
            }, children)
        }
    }
}

export function BadgePage() {
    const types = Object.keys(COLORS.types)

    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Badge",
                    subtitle: "Componente de etiqueta para mostrar contadores, estados o información destacada. Soporta múltiples colores y tamaños."
                }),

                // Descripción
                m(ContentSection, {
                    title: "Badge—Componente base",
                    paragraphs: ["Componente Badge reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Variantes semánticas (type)",
                    "Tamaños (sm, md, lg)",
                    "Modo redondeado (pill)",
                    "Estilos personalizados"
                ])]),

                // Uso básico
                m(ContentSection, {
                    title: "Uso Básico",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem" }, [
                        m(FlexRow, { gap: "0.5rem", justifyContent: "flex-start", flexWrap: "wrap" }, [
                            m(Badge, { type: "primary" }, "Primary"),
                            m(Badge, { type: "secondary" }, "Secondary"),
                            m(Badge, { type: "success" }, "Success"),
                            m(Badge, { type: "danger" }, "Danger"),
                            m(Badge, { type: "warning" }, "Warning"),
                            m(Badge, { type: "info" }, "Info"),
                        ]),
                        m(CodeBlock, { code: `m(Badge, { type: "primary" }, "Primary")
m(Badge, { type: "secondary" }, "Secondary")
m(Badge, { type: "success" }, "Success")
m(Badge, { type: "danger" }, "Danger")
m(Badge, { type: "warning" }, "Warning")
m(Badge, { type: "info" }, "Info")` })
                    ])
                ]),

                // Pill badges
                m(ContentSection, {
                    title: "Pill Badges (rounded)",
                    paragraphs: ["Con el atributo rounded: true se obtienen badges con bordes completamente redondeados."],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem" }, [
                        m(FlexRow, { gap: "0.5rem", justifyContent: "flex-start", flexWrap: "wrap" }, [
                            m(Badge, { type: "primary", rounded: true }, "Primary"),
                            m(Badge, { type: "secondary", rounded: true }, "Secondary"),
                            m(Badge, { type: "success", rounded: true }, "Success"),
                            m(Badge, { type: "danger", rounded: true }, "Danger"),
                        ]),
                        m(CodeBlock, { code: `m(Badge, { type: "primary", rounded: true }, "Primary")
m(Badge, { type: "success", rounded: true }, "Success")` })
                    ])
                ]),

                // Tamaños
                m(ContentSection, {
                    title: "Tamaños (size)",
                    paragraphs: ["Por defecto → md"],
                    alignItems: "flex-start"
                }, [
                    m(Table, [
                        m(TableRow, [
                            m(TableCell, { header: true }, "Badge"),
                            m(TableCell, { header: true }, "Size"),
                            m(TableCell, { header: true }, "Font size"),
                            m(TableCell, { header: true }, "Padding"),
                        ]),
                        ...Object.entries(BADGE_SIZES).map(([size, cfg]) =>
                            m(TableRow, [
                                m(TableCell, {}, m(Badge, { size }, size.toUpperCase())),
                                m(TableCell, {}, size),
                                m(TableCell, {}, cfg.fontSize),
                                m(TableCell, {}, cfg.padding),
                            ])
                        )
                    ])
                ]),

                // Todas las variantes
                m(ContentSection, {
                    title: "Todas las variantes (types)",
                    alignItems: "flex-start"
                }, [
                    m(Table, [
                        m(TableRow, [
                            m(TableCell, { header: true }, "Badge"),
                            m(TableCell, { header: true }, "Type"),
                            m(TableCell, { header: true }, "Pill"),
                        ]),
                        ...types.map(type =>
                            m(TableRow, [
                                m(TableCell, {}, m(Badge, { type }, type)),
                                m(TableCell, {}, type),
                                m(TableCell, {}, m(Badge, { type, rounded: true }, type)),
                            ])
                        )
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente Badge",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function Badge() {
    return {
        view: ({ attrs, children }) => {
            const { type = "primary", size = "md", rounded = false, style = {} } = attrs
            const colorKey = COLORS.types[type] || "blue"
            const baseColors = COLORS.base[colorKey] || COLORS.base.blue
            const sizeStyle = BADGE_SIZES[size] || BADGE_SIZES.md

            return m("span", {
                style: {
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "600",
                    borderRadius: rounded ? "50rem" : VARIABLES.borderRadius,
                    ...sizeStyle,
                    ...baseColors,
                    ...style
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
