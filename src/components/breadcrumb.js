import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { CodeBlock, Text, Link } from "./text.js"

export function Breadcrumb() {
    return {
        view: ({ attrs, children }) => {
            const { separator = "/", style = {} } = attrs
            if (attrs) ['separator', 'style'].forEach(p => delete attrs[p])

            // Procesar children para agregar separadores
            const items = []
            const childArray = Array.isArray(children) ? children.flat() : [children]
            
            childArray.forEach((child, index) => {
                if (child) {
                    items.push(child)
                    if (index < childArray.length - 1) {
                        items.push(m("span", { 
                            style: { 
                                padding: "0 0.5rem", 
                                color: "#6c757d" 
                            } 
                        }, separator))
                    }
                }
            })

            return m("nav", {
                "aria-label": "breadcrumb",
                style: { ...style }
            }, [
                m("ol", {
                    style: {
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        padding: "0.5rem 0",
                        margin: 0,
                        listStyle: "none",
                        backgroundColor: "transparent"
                    }
                }, items)
            ])
        }
    }
}

export function BreadcrumbItem() {
    let isHovered = false
    return {
        view: ({ attrs, children }) => {
            const { href, path, active = false, style = {} } = attrs
            if (attrs) ['href', 'path', 'active', 'style'].forEach(p => delete attrs[p])

            if (active) {
                return m("li", {
                    style: {
                        color: "#6c757d",
                        fontWeight: "500",
                        ...style
                    },
                    "aria-current": "page"
                }, children)
            }

            return m("li", {
                style: {
                    ...style
                }
            }, [
                m(path ? m.route.Link : "a", {
                    href: path || href || "#",
                    style: {
                        color: isHovered ? "#0A6FFD" : "#0d6efd",
                        textDecoration: isHovered ? "underline" : "none",
                        transition: "color 0.15s ease-in-out"
                    },
                    onmouseenter: () => {
                        isHovered = true
                        m.redraw()
                    },
                    onmouseleave: () => {
                        isHovered = false
                        m.redraw()
                    }
                }, children)
            ])
        }
    }
}

// Versión simplificada con array de items
export function BreadcrumbSimple() {
    return {
        view: ({ attrs }) => {
            const { items = [], separator = "/", style = {} } = attrs
            if (attrs) ['items', 'separator', 'style'].forEach(p => delete attrs[p])

            return m(Breadcrumb, { separator, style }, [
                ...items.map((item, index) => 
                    m(BreadcrumbItem, {
                        key: item.path || item.href || index,
                        path: item.path,
                        href: item.href,
                        active: index === items.length - 1
                    }, item.label)
                )
            ])
        }
    }
}

export function BreadcrumbPage() {
    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Breadcrumb",
                    subtitle: "Navegación jerárquica que indica la ubicación actual dentro de la aplicación. Útil para sitios con múltiples niveles de contenido."
                }),

                // Descripción
                m(ContentSection, {
                    title: "Breadcrumb—Componente base",
                    paragraphs: ["Componente Breadcrumb reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Subcomponentes: Breadcrumb, BreadcrumbItem",
                    "Separador personalizable",
                    "Soporte para rutas de Mithril (path) y enlaces normales (href)",
                    "Item activo (último elemento)",
                    "Versión simplificada con array de items"
                ])]),

                // Uso básico
                m(ContentSection, {
                    title: "Uso Básico",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Breadcrumb, [
                            m(BreadcrumbItem, { path: "/" }, "Inicio"),
                            m(BreadcrumbItem, { path: "/docs" }, "Documentación"),
                            m(BreadcrumbItem, { active: true }, "Breadcrumb")
                        ]),
                        m(CodeBlock, { code: `m(Breadcrumb, [
    m(BreadcrumbItem, { path: "/" }, "Inicio"),
    m(BreadcrumbItem, { path: "/docs" }, "Documentación"),
    m(BreadcrumbItem, { active: true }, "Breadcrumb")
])` })
                    ])
                ]),

                // Separadores personalizados
                m(ContentSection, {
                    title: "Separadores Personalizados",
                    paragraphs: ["Puedes cambiar el separador por defecto (/) por cualquier carácter."],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Text, { fontWeight: "500" }, "Separador: >"),
                        m(Breadcrumb, { separator: ">" }, [
                            m(BreadcrumbItem, { path: "/" }, "Inicio"),
                            m(BreadcrumbItem, { path: "/productos" }, "Productos"),
                            m(BreadcrumbItem, { active: true }, "Detalle")
                        ]),
                        
                        m(Text, { fontWeight: "500", marginTop: "1rem" }, "Separador: →"),
                        m(Breadcrumb, { separator: "→" }, [
                            m(BreadcrumbItem, { path: "/" }, "Inicio"),
                            m(BreadcrumbItem, { path: "/usuarios" }, "Usuarios"),
                            m(BreadcrumbItem, { active: true }, "Perfil")
                        ]),

                        m(Text, { fontWeight: "500", marginTop: "1rem" }, "Separador: |"),
                        m(Breadcrumb, { separator: "|" }, [
                            m(BreadcrumbItem, { path: "/" }, "Home"),
                            m(BreadcrumbItem, { path: "/blog" }, "Blog"),
                            m(BreadcrumbItem, { active: true }, "Artículo")
                        ]),

                        m(CodeBlock, { code: `m(Breadcrumb, { separator: ">" }, [
    m(BreadcrumbItem, { path: "/" }, "Inicio"),
    m(BreadcrumbItem, { path: "/productos" }, "Productos"),
    m(BreadcrumbItem, { active: true }, "Detalle")
])` })
                    ])
                ]),

                // Versión simplificada
                m(ContentSection, {
                    title: "Versión Simplificada (BreadcrumbSimple)",
                    paragraphs: ["Usa un array de items para generar el breadcrumb automáticamente. El último item se marca como activo."],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(BreadcrumbSimple, {
                            items: [
                                { label: "Inicio", path: "/" },
                                { label: "Componentes", path: "/docs" },
                                { label: "Breadcrumb" }
                            ]
                        }),
                        m(CodeBlock, { code: `m(BreadcrumbSimple, {
    items: [
        { label: "Inicio", path: "/" },
        { label: "Componentes", path: "/docs" },
        { label: "Breadcrumb" }
    ]
})` })
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente Breadcrumb",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function Breadcrumb() {
    return {
        view: ({ attrs, children }) => {
            const { separator = "/", style = {} } = attrs
            
            const items = []
            children.forEach((child, index) => {
                if (child) {
                    items.push(child)
                    if (index < children.length - 1) {
                        items.push(m("span", { style: { padding: "0 0.5rem" } }, separator))
                    }
                }
            })

            return m("nav", [
                m("ol", { style: { display: "flex", listStyle: "none" } }, items)
            ])
        }
    }
}

export function BreadcrumbItem() {
    return {
        view: ({ attrs, children }) => {
            const { href, path, active = false } = attrs
            
            if (active) {
                return m("li", { style: { color: "#6c757d" } }, children)
            }

            return m("li", [
                m(path ? m.route.Link : "a", {
                    href: path || href,
                    style: { color: "#0d6efd", textDecoration: "none" }
                }, children)
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
