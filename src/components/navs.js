import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { CodeBlock, Text } from "./text.js"

export function Nav() {
    return {
        view: ({ attrs, children }) => {
            const { 
                variant = "tabs",
                vertical = false,
                fill = false,
                justified = false,
                style = {} 
            } = attrs
            if (attrs) ['variant', 'vertical', 'fill', 'justified', 'style'].forEach(p => delete attrs[p])

            return m("ul", {
                style: {
                    display: "flex",
                    flexDirection: vertical ? "column" : "row",
                    flexWrap: "wrap",
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    borderBottom: variant === "tabs" && !vertical ? "1px solid #dee2e6" : "none",
                    gap: variant === "pills" ? "0.25rem" : 0,
                    ...style
                }
            }, children.map(child => {
                if (child && child.tag) {
                    return m(child.tag, { 
                        ...child.attrs, 
                        variant,
                        fill,
                        justified
                    }, child.children)
                }
                return child
            }))
        }
    }
}

export function NavItem() {
    return {
        view: ({ attrs, children }) => {
            const { fill = false, justified = false, style = {} } = attrs
            if (attrs) ['fill', 'justified', 'style'].forEach(p => delete attrs[p])

            return m("li", {
                style: {
                    flex: fill || justified ? "1 1 auto" : "none",
                    textAlign: justified ? "center" : "left",
                    ...style
                }
            }, children)
        }
    }
}

export function NavLink() {
    let isHovered = false
    return {
        view: ({ attrs, children }) => {
            const { 
                href = "#",
                path,
                active = false, 
                disabled = false,
                variant = "tabs",
                onclick,
                style = {} 
            } = attrs
            if (attrs) ['href', 'path', 'active', 'disabled', 'variant', 'onclick', 'style'].forEach(p => delete attrs[p])

            const getTabStyle = () => ({
                display: "block",
                padding: "0.5rem 1rem",
                textDecoration: "none",
                color: disabled ? "#6c757d" : active ? "#495057" : "#0d6efd",
                backgroundColor: active ? "#fff" : "transparent",
                border: active ? "1px solid #dee2e6" : "1px solid transparent",
                borderBottom: active ? "1px solid #fff" : "1px solid transparent",
                marginBottom: active ? "-1px" : 0,
                borderTopLeftRadius: VARIABLES.borderRadius,
                borderTopRightRadius: VARIABLES.borderRadius,
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.65 : 1,
                transition: "all 0.15s ease-in-out"
            })

            const getPillStyle = () => ({
                display: "block",
                padding: "0.5rem 1rem",
                textDecoration: "none",
                color: active ? "#fff" : disabled ? "#6c757d" : "#0d6efd",
                backgroundColor: active ? "#0d6efd" : isHovered && !disabled ? "#e9ecef" : "transparent",
                borderRadius: VARIABLES.borderRadius,
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.65 : 1,
                transition: "all 0.15s ease-in-out"
            })

            const baseStyle = variant === "pills" ? getPillStyle() : getTabStyle()

            return m(path ? m.route.Link : "a", {
                href: path || href,
                style: { ...baseStyle, ...style },
                onclick: (e) => {
                    if (disabled) {
                        e.preventDefault()
                        return
                    }
                    if (onclick) {
                        e.preventDefault()
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
        }
    }
}

export function TabContent() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            if (attrs) ['style'].forEach(p => delete attrs[p])

            return m("div", {
                style: {
                    padding: "1rem 0",
                    ...style
                }
            }, children)
        }
    }
}

export function TabPane() {
    return {
        view: ({ attrs, children }) => {
            const { active = false, style = {} } = attrs
            if (attrs) ['active', 'style'].forEach(p => delete attrs[p])

            if (!active) return null

            return m("div", {
                style: {
                    ...style
                }
            }, children)
        }
    }
}

// Componente de tabs completo con estado
export function Tabs() {
    let activeTab = 0
    return {
        oninit: ({ attrs }) => {
            if (attrs.defaultActive !== undefined) {
                activeTab = attrs.defaultActive
            }
        },
        view: ({ attrs, children }) => {
            const { 
                variant = "tabs",
                vertical = false,
                tabs = [],
                onchange,
                style = {} 
            } = attrs
            if (attrs) ['variant', 'vertical', 'tabs', 'onchange', 'defaultActive', 'style'].forEach(p => delete attrs[p])

            return m(FlexCol, { 
                alignItems: "flex-start",
                flexDirection: vertical ? "row" : "column",
                gap: vertical ? "1rem" : 0,
                ...style 
            }, [
                m(Nav, { variant, vertical }, [
                    ...tabs.map((tab, index) => 
                        m(NavItem, { key: index }, [
                            m(NavLink, {
                                active: activeTab === index,
                                disabled: tab.disabled,
                                variant,
                                onclick: () => {
                                    activeTab = index
                                    if (onchange) onchange(index)
                                    m.redraw()
                                }
                            }, tab.label)
                        ])
                    )
                ]),
                m(TabContent, { style: { width: "100%" } }, [
                    ...tabs.map((tab, index) => 
                        m(TabPane, { key: index, active: activeTab === index }, tab.content)
                    )
                ])
            ])
        }
    }
}

export function NavsPage() {
    let activeTab = 0
    let activePill = 0

    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Navs & Tabs",
                    subtitle: "Componentes de navegación flexibles con soporte para tabs, pills y contenido dinámico."
                }),

                // Descripción
                m(ContentSection, {
                    title: "Nav—Componente base",
                    paragraphs: ["Componente Nav reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Subcomponentes: Nav, NavItem, NavLink, TabContent, TabPane",
                    "Variantes: tabs, pills",
                    "Layout vertical u horizontal",
                    "Fill y justified para distribución uniforme",
                    "Tabs: componente completo con estado incluido"
                ])]),

                // Tabs básicos
                m(ContentSection, {
                    title: "Tabs",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Nav, { variant: "tabs" }, [
                            m(NavItem, [m(NavLink, { active: activeTab === 0, onclick: () => { activeTab = 0 } }, "Tab 1")]),
                            m(NavItem, [m(NavLink, { active: activeTab === 1, onclick: () => { activeTab = 1 } }, "Tab 2")]),
                            m(NavItem, [m(NavLink, { active: activeTab === 2, onclick: () => { activeTab = 2 } }, "Tab 3")]),
                            m(NavItem, [m(NavLink, { disabled: true }, "Disabled")]),
                        ]),
                        m(TabContent, [
                            m(TabPane, { active: activeTab === 0 }, "Contenido del Tab 1"),
                            m(TabPane, { active: activeTab === 1 }, "Contenido del Tab 2"),
                            m(TabPane, { active: activeTab === 2 }, "Contenido del Tab 3"),
                        ]),
                        m(CodeBlock, { code: `let activeTab = 0

m(Nav, { variant: "tabs" }, [
    m(NavItem, [m(NavLink, { active: activeTab === 0, onclick: () => activeTab = 0 }, "Tab 1")]),
    m(NavItem, [m(NavLink, { active: activeTab === 1, onclick: () => activeTab = 1 }, "Tab 2")]),
    m(NavItem, [m(NavLink, { disabled: true }, "Disabled")]),
])

m(TabContent, [
    m(TabPane, { active: activeTab === 0 }, "Contenido del Tab 1"),
    m(TabPane, { active: activeTab === 1 }, "Contenido del Tab 2"),
])` })
                    ])
                ]),

                // Pills
                m(ContentSection, {
                    title: "Pills",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Nav, { variant: "pills" }, [
                            m(NavItem, [m(NavLink, { active: activePill === 0, variant: "pills", onclick: () => { activePill = 0 } }, "Pill 1")]),
                            m(NavItem, [m(NavLink, { active: activePill === 1, variant: "pills", onclick: () => { activePill = 1 } }, "Pill 2")]),
                            m(NavItem, [m(NavLink, { active: activePill === 2, variant: "pills", onclick: () => { activePill = 2 } }, "Pill 3")]),
                        ]),
                        m(TabContent, [
                            m(TabPane, { active: activePill === 0 }, "Contenido del Pill 1"),
                            m(TabPane, { active: activePill === 1 }, "Contenido del Pill 2"),
                            m(TabPane, { active: activePill === 2 }, "Contenido del Pill 3"),
                        ]),
                        m(CodeBlock, { code: `m(Nav, { variant: "pills" }, [
    m(NavItem, [m(NavLink, { active: true, variant: "pills" }, "Pill 1")]),
    m(NavItem, [m(NavLink, { variant: "pills" }, "Pill 2")]),
    m(NavItem, [m(NavLink, { variant: "pills" }, "Pill 3")]),
])` })
                    ])
                ]),

                // Tabs componente completo
                m(ContentSection, {
                    title: "Tabs (Componente completo)",
                    paragraphs: ["Usa el componente Tabs para una implementación más simple con estado incluido."],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Tabs, {
                            variant: "tabs",
                            tabs: [
                                { label: "Inicio", content: m(Text, "Contenido de la pestaña Inicio") },
                                { label: "Perfil", content: m(Text, "Contenido de la pestaña Perfil") },
                                { label: "Contacto", content: m(Text, "Contenido de la pestaña Contacto") },
                                { label: "Deshabilitado", disabled: true, content: null }
                            ]
                        }),
                        m(CodeBlock, { code: `m(Tabs, {
    variant: "tabs",
    tabs: [
        { label: "Inicio", content: m(Text, "Contenido de Inicio") },
        { label: "Perfil", content: m(Text, "Contenido de Perfil") },
        { label: "Contacto", content: m(Text, "Contenido de Contacto") },
        { label: "Deshabilitado", disabled: true, content: null }
    ]
})` })
                    ])
                ]),

                // Tabs con pills
                m(ContentSection, {
                    title: "Tabs con Pills",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Tabs, {
                            variant: "pills",
                            tabs: [
                                { label: "Home", content: m(Text, "Welcome to the home page!") },
                                { label: "Settings", content: m(Text, "Configure your preferences here.") },
                                { label: "Messages", content: m(Text, "You have no new messages.") }
                            ]
                        }),
                        m(CodeBlock, { code: `m(Tabs, {
    variant: "pills",
    tabs: [
        { label: "Home", content: m(Text, "Welcome!") },
        { label: "Settings", content: m(Text, "Configure...") },
        { label: "Messages", content: m(Text, "No messages.") }
    ]
})` })
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente Nav",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function Nav() {
    return {
        view: ({ attrs, children }) => {
            const { variant = "tabs", vertical = false, fill = false } = attrs
            
            return m("ul", {
                style: {
                    display: "flex",
                    flexDirection: vertical ? "column" : "row",
                    listStyle: "none",
                    borderBottom: variant === "tabs" ? "1px solid #dee2e6" : "none"
                }
            }, children)
        }
    }
}

export function NavLink() {
    let isHovered = false
    return {
        view: ({ attrs, children }) => {
            const { active = false, disabled = false, variant = "tabs", onclick } = attrs
            
            const tabStyle = {
                color: active ? "#495057" : "#0d6efd",
                backgroundColor: active ? "#fff" : "transparent",
                border: active ? "1px solid #dee2e6" : "1px solid transparent",
                borderBottom: active ? "1px solid #fff" : "none"
            }
            
            const pillStyle = {
                color: active ? "#fff" : "#0d6efd",
                backgroundColor: active ? "#0d6efd" : isHovered ? "#e9ecef" : "transparent",
                borderRadius: VARIABLES.borderRadius
            }
            
            return m("a", {
                style: variant === "pills" ? pillStyle : tabStyle,
                onclick
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
