import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, IntroContentSection } from "./layout.js";
import { MyOrderedList } from "./lists.js";
import { CodeBlock, Text } from "./text.js";

// Colores para variantes de tabla
const TABLE_COLORS = {
    primary: { bg: COLORS.blue[100].backgroundColor, color: COLORS.blue[100].color, border: COLORS.blue[200].backgroundColor },
    secondary: { bg: COLORS.gray[200].backgroundColor, color: COLORS.gray[200].color, border: COLORS.gray[300].backgroundColor },
    success: { bg: COLORS.green[100].backgroundColor, color: COLORS.green[100].color, border: COLORS.green[200].backgroundColor },
    danger: { bg: COLORS.red[100].backgroundColor, color: COLORS.red[100].color, border: COLORS.red[200].backgroundColor },
    warning: { bg: COLORS.yellow[100].backgroundColor, color: COLORS.yellow[100].color, border: COLORS.yellow[200].backgroundColor },
    info: { bg: COLORS.cyan[100].backgroundColor, color: COLORS.cyan[100].color, border: COLORS.cyan[200].backgroundColor },
    light: { bg: COLORS.gray[100].backgroundColor, color: "#000", border: COLORS.gray[200].backgroundColor },
    dark: { bg: COLORS.gray[800].backgroundColor, color: "#fff", border: COLORS.gray[700].backgroundColor }
}

/**
 * Table - Componente de tabla con variantes Bootstrap
 * @param {Object} attrs
 * @param {string} attrs.type - Variante de color: primary, secondary, success, danger, warning, info, light, dark
 * @param {boolean} attrs.striped - Filas con colores alternados
 * @param {boolean} attrs.stripedColumns - Columnas con colores alternados
 * @param {boolean} attrs.bordered - Bordes en todas las celdas
 * @param {boolean} attrs.borderless - Sin bordes
 * @param {boolean} attrs.hover - Efecto hover en filas
 * @param {string} attrs.size - Tamaño: sm (compacto), md (default)
 * @param {Object} attrs.style - Estilos adicionales
 */
export function Table() {
    return {
        view: ({ attrs, children }) => {
            const {
                type = null,
                striped = false,
                stripedColumns = false,
                bordered = false,
                borderless = false,
                hover = false,
                size = "md",
                caption = null,
                captionTop = false,
                style = {}
            } = attrs

            const typeColors = type ? TABLE_COLORS[type] : null

            const tableStyle = {
                borderCollapse: "collapse",
                width: "100%",
                margin: 0,
                backgroundColor: typeColors?.bg || "transparent",
                color: typeColors?.color || "inherit",
                ...style
            }

            // Pasar contexto a los hijos
            const context = { type, striped, stripedColumns, bordered, borderless, hover, size, typeColors }

            // Procesar hijos para pasar contexto
            const processedChildren = processChildren(children, context)

            return m("table", { style: tableStyle }, [
                caption && captionTop ? m("caption", { style: { captionSide: "top", padding: "0.5rem", color: COLORS.gray[600].backgroundColor } }, caption) : null,
                processedChildren,
                caption && !captionTop ? m("caption", { style: { captionSide: "bottom", padding: "0.5rem", color: COLORS.gray[600].backgroundColor } }, caption) : null
            ])
        }
    }
}

/**
 * TableHead - Encabezado de tabla (thead)
 * @param {string} attrs.type - Variante: light, dark
 */
export function TableHead() {
    return {
        view: ({ attrs, children }) => {
            const { type = null, style = {}, _context = {} } = attrs

            const headColors = type === "dark"
                ? { bg: COLORS.gray[800].backgroundColor, color: "#fff" }
                : type === "light"
                    ? { bg: COLORS.gray[200].backgroundColor, color: "#000" }
                    : null

            return m("thead", {
                style: {
                    backgroundColor: headColors?.bg,
                    color: headColors?.color,
                    ...style
                }
            }, processChildren(children, { ..._context, inHead: true, headType: type }))
        }
    }
}

/**
 * TableBody - Cuerpo de tabla (tbody)
 */
export function TableBody() {
    return {
        view: ({ attrs, children }) => {
            const { style = {}, divider = false, _context = {} } = attrs

            return m("tbody", {
                style: {
                    borderTop: divider ? "2px solid currentColor" : undefined,
                    ...style
                }
            }, processChildren(children, { ..._context, inBody: true }))
        }
    }
}

/**
 * TableFooter - Pie de tabla (tfoot)
 */
export function TableFooter() {
    return {
        view: ({ attrs, children }) => {
            const { style = {}, _context = {} } = attrs

            return m("tfoot", { style }, processChildren(children, { ..._context, inFooter: true }))
        }
    }
}

/**
 * TableRow - Fila de tabla
 * @param {string} attrs.type - Variante de color para esta fila
 * @param {boolean} attrs.active - Resaltar fila como activa
 */
export function TableRow() {
    let isHovered = false
    return {
        view: ({ attrs, children }) => {
            const {
                type = null,
                active = false,
                onclick,
                styleHover = {},
                style = {},
                _context = {},
                _rowIndex = 0
            } = attrs

            const { striped, hover, size, bordered, borderless, typeColors } = _context
            const rowTypeColors = type ? TABLE_COLORS[type] : null

            // Determinar color de fondo
            let backgroundColor = rowTypeColors?.bg || "transparent"
            if (active) {
                backgroundColor = "rgba(0,0,0,0.075)"
            } else if (striped && _rowIndex % 2 === 1) {
                backgroundColor = rowTypeColors?.bg || typeColors?.bg || "rgba(0,0,0,0.05)"
            }

            const padding = size === "sm" ? "0.25rem 0.5rem" : "0.5rem 1rem"
            const borderBottom = borderless ? "none" : (bordered ? "1px solid #dee2e6" : "1px solid #dee2e6")

            const baseStyle = {
                backgroundColor,
                color: rowTypeColors?.color || "inherit",
                borderBottom,
                ...style
            }

            const hoverStyle = hover ? {
                ...baseStyle,
                backgroundColor: "rgba(0,0,0,0.075)",
                ...styleHover
            } : baseStyle

            return m("tr", {
                style: isHovered && hover ? hoverStyle : baseStyle,
                onclick: onclick ? () => onclick() : undefined,
                onmouseenter: () => { if (hover) { isHovered = true; m.redraw() } },
                onmouseleave: () => { if (hover) { isHovered = false; m.redraw() } }
            }, processChildren(children, { ..._context, padding, bordered }))
        }
    }
}

/**
 * TableCell - Celda de tabla (td o th)
 * @param {boolean} attrs.header - Si es true, renderiza como th
 * @param {string} attrs.type - Variante de color para esta celda
 * @param {boolean} attrs.active - Resaltar celda como activa
 * @param {number} attrs.colspan - Número de columnas que abarca
 * @param {number} attrs.rowspan - Número de filas que abarca
 * @param {string} attrs.align - Alineación vertical: top, middle, bottom
 */
export function TableCell() {
    let isHovered = false
    return {
        view: ({ attrs, children }) => {
            const {
                header = false,
                type = null,
                active = false,
                colspan,
                rowspan,
                align = null,
                onclick,
                styleHover = {},
                style = {},
                _context = {},
                _colIndex = 0
            } = attrs

            const { padding = "0.5rem 1rem", bordered, stripedColumns } = _context
            const cellTypeColors = type ? TABLE_COLORS[type] : null

            let backgroundColor = cellTypeColors?.bg || "transparent"
            if (active) {
                backgroundColor = "rgba(0,0,0,0.075)"
            } else if (stripedColumns && _colIndex % 2 === 1) {
                backgroundColor = "rgba(0,0,0,0.05)"
            }

            const alignMap = {
                top: "top",
                middle: "middle",
                bottom: "bottom"
            }

            const baseStyle = {
                padding,
                textAlign: header ? "left" : "inherit",
                verticalAlign: align ? alignMap[align] : undefined,
                backgroundColor,
                color: cellTypeColors?.color || "inherit",
                borderRight: bordered ? "1px solid #dee2e6" : undefined,
                borderLeft: bordered ? "1px solid #dee2e6" : undefined,
                ...style
            }

            return m(header ? "th" : "td", {
                style: isHovered ? { ...baseStyle, ...styleHover } : baseStyle,
                colspan,
                rowspan,
                scope: header ? "col" : undefined,
                onclick: onclick ? (e) => { e.stopPropagation(); onclick() } : undefined,
                onmouseenter: () => { if (styleHover && Object.keys(styleHover).length) { isHovered = true; m.redraw() } },
                onmouseleave: () => { if (styleHover && Object.keys(styleHover).length) { isHovered = false; m.redraw() } }
            }, children)
        }
    }
}

/**
 * TableResponsive - Wrapper para tablas responsivas con scroll horizontal
 * @param {string} attrs.breakpoint - Breakpoint para max-width: sm, md, lg, xl, xxl o null (100%)
 */
export function TableResponsive() {
    return {
        view: ({ attrs, children }) => {
            const { breakpoint = null, style = {} } = attrs

            // Anchos máximos por breakpoint (siguiendo Bootstrap)
            const maxWidths = {
                sm: "540px",
                md: "720px",
                lg: "960px",
                xl: "1140px",
                xxl: "1320px"
            }

            return m("div", {
                style: {
                    width: "100%",
                    maxWidth: breakpoint ? maxWidths[breakpoint] : "100%",
                    overflowX: "auto",
                    WebkitOverflowScrolling: "touch",
                    ...style
                }
            }, children)
        }
    }
}

// Helper para procesar hijos y pasar contexto
function processChildren(children, context) {
    if (!children) return children

    const childArray = Array.isArray(children) ? children.flat() : [children]
    let rowIndex = 0

    return childArray.map((child, index) => {
        if (!child || !child.tag) return child

        // Si es un componente conocido, clonar con contexto
        const tagName = typeof child.tag === 'function' ? child.tag.name : child.tag

        if (['TableHead', 'TableBody', 'TableFooter', 'TableRow', 'TableCell'].includes(tagName) ||
            child.tag === TableHead || child.tag === TableBody || child.tag === TableFooter ||
            child.tag === TableRow || child.tag === TableCell) {

            const newAttrs = {
                ...child.attrs,
                _context: context,
                _rowIndex: tagName === 'TableRow' || child.tag === TableRow ? rowIndex++ : undefined,
                _colIndex: tagName === 'TableCell' || child.tag === TableCell ? index : undefined
            }

            return m(child.tag, newAttrs, child.children)
        }

        return child
    })
}

/**
 * TablesPage - Página de documentación de Tables
 */
export function TablesPage() {
    const demoData = [
        { id: 1, name: "Mark", last: "Otto", handle: "@mdo" },
        { id: 2, name: "Jacob", last: "Thornton", handle: "@fat" },
        { id: 3, name: "Larry", last: "Bird", handle: "@twitter" }
    ]

    return {
        view: () => {
            return m(FlexCol, { gap: "3rem", alignItems: "flex-start",  }, [
                // Título
                m(IntroContentSection, {
                    title: "Tables",
                    subtitle: "Documentación y ejemplos para tablas con estilos de Bootstrap usando inline styles."
                }),

                // Tabla básica
                m(ContentSection, {
                    title: "Tabla Básica",
                    paragraphs: ["Tabla simple con Table, TableHead, TableBody, TableRow y TableCell:"],
                    alignItems: "flex-start"
                }, [
                    m(Table, {}, [
                        m(TableHead, {}, [
                            m(TableRow, {}, [
                                m(TableCell, { header: true }, "#"),
                                m(TableCell, { header: true }, "First"),
                                m(TableCell, { header: true }, "Last"),
                                m(TableCell, { header: true }, "Handle")
                            ])
                        ]),
                        m(TableBody, {},
                            demoData.map((d, i) => m(TableRow, { key: i }, [
                                m(TableCell, { header: true }, d.id),
                                m(TableCell, {}, d.name),
                                m(TableCell, {}, d.last),
                                m(TableCell, {}, d.handle)
                            ]))
                        )
                    ]),
                    m(CodeBlock, {
                        code: `m(Table, {}, [
    m(TableHead, {}, [
        m(TableRow, {}, [
            m(TableCell, { header: true }, "#"),
            m(TableCell, { header: true }, "First"),
            ...
        ])
    ]),
    m(TableBody, {}, data.map(d => 
        m(TableRow, {}, [
            m(TableCell, { header: true }, d.id),
            m(TableCell, {}, d.name),
            ...
        ])
    ))
])` })
                ]),

                // Variantes de color
                m(ContentSection, {
                    title: "Variantes",
                    paragraphs: ["Usa type para colorear tablas, filas o celdas:"],
                    alignItems: "flex-start"
                }, [
                    m(Table, { bordered: true }, [
                        m(TableHead, {}, [
                            m(TableRow, {}, [
                                m(TableCell, { header: true }, "Type"),
                                m(TableCell, { header: true }, "Heading"),
                                m(TableCell, { header: true }, "Heading")
                            ])
                        ]),
                        m(TableBody, {}, [
                            m(TableRow, { type: "primary" }, [m(TableCell, {}, "Primary"), m(TableCell, {}, "Cell"), m(TableCell, {}, "Cell")]),
                            m(TableRow, { type: "secondary" }, [m(TableCell, {}, "Secondary"), m(TableCell, {}, "Cell"), m(TableCell, {}, "Cell")]),
                            m(TableRow, { type: "success" }, [m(TableCell, {}, "Success"), m(TableCell, {}, "Cell"), m(TableCell, {}, "Cell")]),
                            m(TableRow, { type: "danger" }, [m(TableCell, {}, "Danger"), m(TableCell, {}, "Cell"), m(TableCell, {}, "Cell")]),
                            m(TableRow, { type: "warning" }, [m(TableCell, {}, "Warning"), m(TableCell, {}, "Cell"), m(TableCell, {}, "Cell")]),
                            m(TableRow, { type: "info" }, [m(TableCell, {}, "Info"), m(TableCell, {}, "Cell"), m(TableCell, {}, "Cell")]),
                            m(TableRow, { type: "light" }, [m(TableCell, {}, "Light"), m(TableCell, {}, "Cell"), m(TableCell, {}, "Cell")]),
                            m(TableRow, { type: "dark" }, [m(TableCell, {}, "Dark"), m(TableCell, {}, "Cell"), m(TableCell, {}, "Cell")])
                        ])
                    ]),
                    m(CodeBlock, {
                        code: `// Tabla con tipo
m(Table, { type: "dark" }, [...])

// Fila con tipo
m(TableRow, { type: "primary" }, [...])

// Celda con tipo
m(TableCell, { type: "success" }, "Cell")` })
                ]),

                // Striped
                m(ContentSection, {
                    title: "Striped Rows",
                    paragraphs: ["Usa striped para alternar colores en filas:"],
                    alignItems: "flex-start"
                }, [
                    m(Table, { striped: true }, [
                        m(TableHead, {}, [
                            m(TableRow, {}, [
                                m(TableCell, { header: true }, "#"),
                                m(TableCell, { header: true }, "First"),
                                m(TableCell, { header: true }, "Last"),
                                m(TableCell, { header: true }, "Handle")
                            ])
                        ]),
                        m(TableBody, {},
                            demoData.map((d, i) => m(TableRow, { key: i }, [
                                m(TableCell, { header: true }, d.id),
                                m(TableCell, {}, d.name),
                                m(TableCell, {}, d.last),
                                m(TableCell, {}, d.handle)
                            ]))
                        )
                    ]),
                    m(CodeBlock, { code: `m(Table, { striped: true }, [...])` })
                ]),

                // Hover
                m(ContentSection, {
                    title: "Hoverable Rows",
                    paragraphs: ["Usa hover para efecto al pasar el mouse:"],
                    alignItems: "flex-start"
                }, [
                    m(Table, { hover: true }, [
                        m(TableHead, {}, [
                            m(TableRow, {}, [
                                m(TableCell, { header: true }, "#"),
                                m(TableCell, { header: true }, "First"),
                                m(TableCell, { header: true }, "Last"),
                                m(TableCell, { header: true }, "Handle")
                            ])
                        ]),
                        m(TableBody, {},
                            demoData.map((d, i) => m(TableRow, { key: i }, [
                                m(TableCell, { header: true }, d.id),
                                m(TableCell, {}, d.name),
                                m(TableCell, {}, d.last),
                                m(TableCell, {}, d.handle)
                            ]))
                        )
                    ]),
                    m(CodeBlock, { code: `m(Table, { hover: true }, [...])` })
                ]),

                // Bordered
                m(ContentSection, {
                    title: "Bordered",
                    paragraphs: ["Usa bordered para bordes en todas las celdas:"],
                    alignItems: "flex-start"
                }, [
                    m(Table, { bordered: true }, [
                        m(TableHead, {}, [
                            m(TableRow, {}, [
                                m(TableCell, { header: true }, "#"),
                                m(TableCell, { header: true }, "First"),
                                m(TableCell, { header: true }, "Last"),
                                m(TableCell, { header: true }, "Handle")
                            ])
                        ]),
                        m(TableBody, {},
                            demoData.map((d, i) => m(TableRow, { key: i }, [
                                m(TableCell, { header: true }, d.id),
                                m(TableCell, {}, d.name),
                                m(TableCell, {}, d.last),
                                m(TableCell, {}, d.handle)
                            ]))
                        )
                    ]),
                    m(CodeBlock, { code: `m(Table, { bordered: true }, [...])` })
                ]),

                // Small
                m(ContentSection, {
                    title: "Small Tables",
                    paragraphs: ["Usa size=\"sm\" para tablas compactas:"],
                    alignItems: "flex-start"
                }, [
                    m(Table, { size: "sm", bordered: true }, [
                        m(TableHead, {}, [
                            m(TableRow, {}, [
                                m(TableCell, { header: true }, "#"),
                                m(TableCell, { header: true }, "First"),
                                m(TableCell, { header: true }, "Last"),
                                m(TableCell, { header: true }, "Handle")
                            ])
                        ]),
                        m(TableBody, {},
                            demoData.map((d, i) => m(TableRow, { key: i }, [
                                m(TableCell, { header: true }, d.id),
                                m(TableCell, {}, d.name),
                                m(TableCell, {}, d.last),
                                m(TableCell, {}, d.handle)
                            ]))
                        )
                    ]),
                    m(CodeBlock, { code: `m(Table, { size: "sm" }, [...])` })
                ]),

                // Table Head variants
                m(ContentSection, {
                    title: "Table Head",
                    paragraphs: ["TableHead puede tener tipo light o dark:"],
                    alignItems: "flex-start"
                }, [
                    m(Table, {}, [
                        m(TableHead, { type: "light" }, [
                            m(TableRow, {}, [
                                m(TableCell, { header: true }, "#"),
                                m(TableCell, { header: true }, "First"),
                                m(TableCell, { header: true }, "Last"),
                                m(TableCell, { header: true }, "Handle")
                            ])
                        ]),
                        m(TableBody, {},
                            demoData.map((d, i) => m(TableRow, { key: i }, [
                                m(TableCell, { header: true }, d.id),
                                m(TableCell, {}, d.name),
                                m(TableCell, {}, d.last),
                                m(TableCell, {}, d.handle)
                            ]))
                        )
                    ]),
                    m("div", { style: { height: "1rem" } }),
                    m(Table, {}, [
                        m(TableHead, { type: "dark" }, [
                            m(TableRow, {}, [
                                m(TableCell, { header: true }, "#"),
                                m(TableCell, { header: true }, "First"),
                                m(TableCell, { header: true }, "Last"),
                                m(TableCell, { header: true }, "Handle")
                            ])
                        ]),
                        m(TableBody, {},
                            demoData.map((d, i) => m(TableRow, { key: i }, [
                                m(TableCell, { header: true }, d.id),
                                m(TableCell, {}, d.name),
                                m(TableCell, {}, d.last),
                                m(TableCell, {}, d.handle)
                            ]))
                        )
                    ]),
                    m(CodeBlock, {
                        code: `m(TableHead, { type: "light" }, [...])
m(TableHead, { type: "dark" }, [...])` })
                ]),

                // Responsive
                m(ContentSection, {
                    title: "Responsive Tables",
                    paragraphs: ["Usa TableResponsive con breakpoint para limitar el ancho y mostrar scroll horizontal:"],
                    alignItems: "flex-start"
                }, [
                    m(TableResponsive, { breakpoint: "lg" }, [
                        m(Table, { bordered: true }, [
                            m(TableHead, {}, [
                                m(TableRow, {}, [
                                    m(TableCell, { header: true }, "#"),
                                    m(TableCell, { header: true }, "Heading"),
                                    m(TableCell, { header: true }, "Heading"),
                                    m(TableCell, { header: true }, "Heading"),
                                    m(TableCell, { header: true }, "Heading"),
                                    m(TableCell, { header: true }, "Heading"),
                                    m(TableCell, { header: true }, "Heading"),
                                    m(TableCell, { header: true }, "Heading"),
                                    m(TableCell, { header: true }, "Heading"),
                                    m(TableCell, { header: true }, "Heading")
                                ])
                            ]),
                            m(TableBody, {}, [
                                m(TableRow, {}, [
                                    m(TableCell, { header: true }, "1"),
                                    ...Array(9).fill(null).map(() => m(TableCell, {}, "Cell"))
                                ]),
                                m(TableRow, {}, [
                                    m(TableCell, { header: true }, "2"),
                                    ...Array(9).fill(null).map(() => m(TableCell, {}, "Cell"))
                                ]),
                                m(TableRow, {}, [
                                    m(TableCell, { header: true }, "3"),
                                    ...Array(9).fill(null).map(() => m(TableCell, {}, "Cell"))
                                ])
                            ])
                        ])
                    ]),

                    m(CodeBlock, {
                        code: `// Con breakpoint (max-width: 960px para "lg")
m(TableResponsive, { breakpoint: "lg" }, [
    m(Table, { bordered: true }, [...])
])

// Sin breakpoint (100% del contenedor)
m(TableResponsive, {}, [...])

// Breakpoints: sm (540px), md (720px), lg (960px), xl (1140px), xxl (1320px)` })
                ]),

                // Combinado
                m(ContentSection, {
                    title: "Combinando Opciones",
                    paragraphs: ["Combina múltiples opciones:"],
                    alignItems: "flex-start"
                }, [
                    m(Table, { striped: true, hover: true, bordered: true, size: "sm" }, [
                        m(TableHead, { type: "dark" }, [
                            m(TableRow, {}, [
                                m(TableCell, { header: true }, "#"),
                                m(TableCell, { header: true }, "First"),
                                m(TableCell, { header: true }, "Last"),
                                m(TableCell, { header: true }, "Handle")
                            ])
                        ]),
                        m(TableBody, {},
                            demoData.map((d, i) => m(TableRow, { key: i }, [
                                m(TableCell, { header: true }, d.id),
                                m(TableCell, {}, d.name),
                                m(TableCell, {}, d.last),
                                m(TableCell, {}, d.handle)
                            ]))
                        )
                    ]),
                    m(CodeBlock, {
                        code: `m(Table, { striped: true, hover: true, bordered: true, size: "sm" }, [
    m(TableHead, { type: "dark" }, [...]),
    m(TableBody, {}, [...])
])` })
                ])
            ])
        }
    }
}
