import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { CodeBlock, Text } from "./text.js"

const PAGINATION_SIZES = {
    sm: { padding: "0.25rem 0.5rem", fontSize: "0.875rem" },
    md: { padding: "0.375rem 0.75rem", fontSize: "1rem" },
    lg: { padding: "0.5rem 1rem", fontSize: "1.25rem" }
}

export function Pagination() {
    return {
        view: ({ attrs, children }) => {
            const { size = "md", style = {} } = attrs
            if (attrs) ['size', 'style'].forEach(p => delete attrs[p])

            return m("nav", {
                "aria-label": "pagination",
                style: { ...style }
            }, [
                m("ul", {
                    style: {
                        display: "flex",
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        borderRadius: VARIABLES.borderRadius
                    }
                }, children.map(child => {
                    if (child && child.tag) {
                        return m(child.tag, { ...child.attrs, size }, child.children)
                    }
                    return child
                }))
            ])
        }
    }
}

export function PageItem() {
    let isHovered = false
    return {
        view: ({ attrs, children }) => {
            const { 
                active = false, 
                disabled = false, 
                onclick,
                size = "md",
                style = {} 
            } = attrs
            if (attrs) ['active', 'disabled', 'onclick', 'size', 'style'].forEach(p => delete attrs[p])

            const sizeStyle = PAGINATION_SIZES[size] || PAGINATION_SIZES.md

            return m("li", {
                style: { ...style }
            }, [
                m("button", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                        border: "1px solid #dee2e6",
                        marginLeft: "-1px",
                        backgroundColor: active 
                            ? "#0d6efd" 
                            : isHovered && !disabled 
                                ? "#e9ecef" 
                                : "#fff",
                        color: active 
                            ? "#fff" 
                            : disabled 
                                ? "#6c757d" 
                                : "#0d6efd",
                        cursor: disabled ? "not-allowed" : "pointer",
                        opacity: disabled ? 0.65 : 1,
                        transition: "all 0.15s ease-in-out",
                        ...sizeStyle
                    },
                    disabled,
                    onclick: (e) => {
                        if (!disabled && onclick) {
                            onclick(e)
                        }
                    },
                    onmouseenter: () => {
                        if (!disabled && !active) {
                            isHovered = true
                            m.redraw()
                        }
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

// Componente de paginación completa con lógica
export function PaginationFull() {
    return {
        view: ({ attrs }) => {
            const { 
                current = 1, 
                total = 1, 
                onchange, 
                size = "md",
                showFirstLast = true,
                showPrevNext = true,
                maxVisible = 5,
                style = {} 
            } = attrs
            if (attrs) ['current', 'total', 'onchange', 'size', 'showFirstLast', 'showPrevNext', 'maxVisible', 'style'].forEach(p => delete attrs[p])

            // Calcular páginas visibles
            const pages = []
            let startPage = Math.max(1, current - Math.floor(maxVisible / 2))
            let endPage = Math.min(total, startPage + maxVisible - 1)
            
            if (endPage - startPage + 1 < maxVisible) {
                startPage = Math.max(1, endPage - maxVisible + 1)
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i)
            }

            return m(Pagination, { size, style }, [
                // First
                showFirstLast ? m(PageItem, { 
                    disabled: current === 1,
                    onclick: () => onchange && onchange(1)
                }, "«") : null,
                
                // Previous
                showPrevNext ? m(PageItem, { 
                    disabled: current === 1,
                    onclick: () => onchange && onchange(current - 1)
                }, "‹") : null,

                // Ellipsis start - page 1
                startPage > 1 ? m(PageItem, { onclick: () => onchange && onchange(1) }, "1") : null,
                // Ellipsis start - dots
                startPage > 2 ? m(PageItem, { disabled: true }, "...") : null,

                // Page numbers
                ...pages.map(page => 
                    m(PageItem, {
                        active: page === current,
                        onclick: () => onchange && onchange(page)
                    }, page.toString())
                ),

                // Ellipsis end - dots
                endPage < total - 1 ? m(PageItem, { disabled: true }, "...") : null,
                // Ellipsis end - last page
                endPage < total ? m(PageItem, { onclick: () => onchange && onchange(total) }, total.toString()) : null,

                // Next
                showPrevNext ? m(PageItem, { 
                    disabled: current === total,
                    onclick: () => onchange && onchange(current + 1)
                }, "›") : null,

                // Last
                showFirstLast ? m(PageItem, { 
                    disabled: current === total,
                    onclick: () => onchange && onchange(total)
                }, "»") : null
            ])
        }
    }
}

export function PaginationPage() {
    let currentPage = 1
    let totalPages = 10

    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Pagination",
                    subtitle: "Componente de paginación para dividir contenido en múltiples páginas. Soporta navegación por números, anterior/siguiente y primero/último."
                }),

                // Descripción
                m(ContentSection, {
                    title: "Pagination—Componente base",
                    paragraphs: ["Componente Pagination reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Subcomponentes: Pagination, PageItem",
                    "Tamaños (sm, md, lg)",
                    "Estados: activo, deshabilitado",
                    "PaginationFull: versión completa con lógica incluida"
                ])]),

                // Uso básico
                m(ContentSection, {
                    title: "Uso Básico",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Pagination, [
                            m(PageItem, { disabled: true }, "Anterior"),
                            m(PageItem, { active: true }, "1"),
                            m(PageItem, {}, "2"),
                            m(PageItem, {}, "3"),
                            m(PageItem, {}, "Siguiente")
                        ]),
                        m(CodeBlock, { code: `m(Pagination, [
    m(PageItem, { disabled: true }, "Anterior"),
    m(PageItem, { active: true }, "1"),
    m(PageItem, {}, "2"),
    m(PageItem, {}, "3"),
    m(PageItem, {}, "Siguiente")
])` })
                    ])
                ]),

                // Demo interactiva
                m(ContentSection, {
                    title: "Demo Interactiva (PaginationFull)",
                    paragraphs: [`Página actual: ${currentPage} de ${totalPages}`],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(PaginationFull, {
                            current: currentPage,
                            total: totalPages,
                            onchange: (page) => {
                                currentPage = page
                                m.redraw()
                            }
                        }),
                        m(CodeBlock, { code: `let currentPage = 1

m(PaginationFull, {
    current: currentPage,
    total: 10,
    onchange: (page) => {
        currentPage = page
        m.redraw()
    }
})` })
                    ])
                ]),

                // Tamaños
                m(ContentSection, {
                    title: "Tamaños (size)",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Text, { fontWeight: "500" }, "Small (sm)"),
                        m(Pagination, { size: "sm" }, [
                            m(PageItem, {}, "‹"),
                            m(PageItem, { active: true }, "1"),
                            m(PageItem, {}, "2"),
                            m(PageItem, {}, "3"),
                            m(PageItem, {}, "›")
                        ]),

                        m(Text, { fontWeight: "500", marginTop: "1rem" }, "Medium (md) - Default"),
                        m(Pagination, { size: "md" }, [
                            m(PageItem, {}, "‹"),
                            m(PageItem, { active: true }, "1"),
                            m(PageItem, {}, "2"),
                            m(PageItem, {}, "3"),
                            m(PageItem, {}, "›")
                        ]),

                        m(Text, { fontWeight: "500", marginTop: "1rem" }, "Large (lg)"),
                        m(Pagination, { size: "lg" }, [
                            m(PageItem, {}, "‹"),
                            m(PageItem, { active: true }, "1"),
                            m(PageItem, {}, "2"),
                            m(PageItem, {}, "3"),
                            m(PageItem, {}, "›")
                        ])
                    ])
                ]),

                // Sin first/last
                m(ContentSection, {
                    title: "Sin botones First/Last",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(PaginationFull, {
                            current: 5,
                            total: 10,
                            showFirstLast: false,
                            onchange: () => {}
                        }),
                        m(CodeBlock, { code: `m(PaginationFull, {
    current: 5,
    total: 10,
    showFirstLast: false,
    onchange: (page) => { ... }
})` })
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente Pagination",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function Pagination() {
    return {
        view: ({ attrs, children }) => {
            const { size = "md", style = {} } = attrs
            
            return m("nav", [
                m("ul", {
                    style: { display: "flex", listStyle: "none", padding: 0 }
                }, children)
            ])
        }
    }
}

export function PageItem() {
    let isHovered = false
    return {
        view: ({ attrs, children }) => {
            const { active = false, disabled = false, onclick, size = "md" } = attrs
            
            return m("li", [
                m("button", {
                    style: {
                        border: "1px solid #dee2e6",
                        backgroundColor: active ? "#0d6efd" : isHovered ? "#e9ecef" : "#fff",
                        color: active ? "#fff" : disabled ? "#6c757d" : "#0d6efd",
                        cursor: disabled ? "not-allowed" : "pointer",
                        ...PAGINATION_SIZES[size]
                    },
                    disabled,
                    onclick,
                    onmouseenter: () => { isHovered = true; m.redraw() },
                    onmouseleave: () => { isHovered = false; m.redraw() }
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
