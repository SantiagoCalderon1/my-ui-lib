import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection, Icon } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { CodeBlock, Text, Link } from "./text.js"
import { Button } from "./button.js"
import { URL_FILES } from "../utils.js"

export function Navbar() {
    return {
        view: ({ attrs, children }) => {
            const { 
                type = "light", 
                fixed = null,
                sticky = false,
                expand = "lg",
                style = {} 
            } = attrs
            if (attrs) ['type', 'fixed', 'sticky', 'expand', 'style'].forEach(p => delete attrs[p])

            const colorKey = COLORS.types[type] || "white"
            const baseColors = type === "light" 
                ? { backgroundColor: "#f8f9fa", color: "#212529" }
                : type === "dark"
                    ? { backgroundColor: "#212529", color: "#fff" }
                    : COLORS.base[colorKey] || { backgroundColor: "#f8f9fa", color: "#212529" }

            const positionStyle = fixed 
                ? { position: "fixed", [fixed]: 0, left: 0, right: 0, zIndex: 1030 }
                : sticky 
                    ? { position: "sticky", top: 0, zIndex: 1020 }
                    : {}

            return m("nav", {
                style: {
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.5rem 1rem",
                    width: "100%",
                    ...baseColors,
                    ...positionStyle,
                    ...style
                }
            }, children)
        }
    }
}

export function NavbarBrand() {
    return {
        view: ({ attrs, children }) => {
            const { href = "/", path, style = {} } = attrs
            if (attrs) ['href', 'path', 'style'].forEach(p => delete attrs[p])

            return m(path ? m.route.Link : "a", {
                href: path || href,
                style: {
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "1.25rem",
                    fontWeight: "500",
                    textDecoration: "none",
                    color: "inherit",
                    whiteSpace: "nowrap",
                    ...style
                }
            }, children)
        }
    }
}

export function NavbarNav() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            if (attrs) ['style'].forEach(p => delete attrs[p])

            return m("ul", {
                style: {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "0.25rem",
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    ...style
                }
            }, children)
        }
    }
}

export function NavItem() {
    let isHovered = false
    return {
        view: ({ attrs, children }) => {
            const { active = false, disabled = false, style = {} } = attrs
            if (attrs) ['active', 'disabled', 'style'].forEach(p => delete attrs[p])

            return m("li", {
                style: {
                    ...style
                }
            }, children.map(child => {
                // Si el hijo es un vnode, le pasamos las propiedades
                if (child && child.tag) {
                    return m(child.tag, {
                        ...child.attrs,
                        active,
                        disabled
                    }, child.children)
                }
                return child
            }))
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
                style = {} 
            } = attrs
            if (attrs) ['href', 'path', 'active', 'disabled', 'style'].forEach(p => delete attrs[p])

            return m(path ? m.route.Link : "a", {
                href: path || href,
                style: {
                    display: "block",
                    padding: "0.5rem 1rem",
                    textDecoration: "none",
                    color: disabled ? "#6c757d" : (active ? "#0A6FFD" : "inherit"),
                    fontWeight: active ? "500" : "400",
                    cursor: disabled ? "not-allowed" : "pointer",
                    opacity: disabled ? 0.65 : 1,
                    backgroundColor: isHovered && !disabled ? "rgba(0,0,0,0.05)" : "transparent",
                    borderRadius: VARIABLES.borderRadius,
                    transition: "all 0.15s ease-in-out",
                    ...style
                },
                onmouseenter: () => {
                    if (!disabled) {
                        isHovered = true
                        m.redraw()
                    }
                },
                onmouseleave: () => {
                    isHovered = false
                    m.redraw()
                },
                onclick: (e) => {
                    if (disabled) {
                        e.preventDefault()
                    }
                }
            }, children)
        }
    }
}

export function NavbarToggler() {
    return {
        view: ({ attrs }) => {
            const { onclick, style = {} } = attrs
            if (attrs) ['onclick', 'style'].forEach(p => delete attrs[p])

            return m("button", {
                style: {
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.25rem 0.75rem",
                    fontSize: "1.25rem",
                    lineHeight: 1,
                    backgroundColor: "transparent",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: VARIABLES.borderRadius,
                    cursor: "pointer",
                    ...style
                },
                onclick
            }, [
                m("span", {
                    style: {
                        display: "block",
                        width: "1.5em",
                        height: "1.5em",
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "100%"
                    }
                })
            ])
        }
    }
}

export function NavbarCollapse() {
    return {
        view: ({ attrs, children }) => {
            const { open = true, style = {} } = attrs
            if (attrs) ['open', 'style'].forEach(p => delete attrs[p])

            return m("div", {
                style: {
                    display: open ? "flex" : "none",
                    flexBasis: "100%",
                    flexGrow: 1,
                    alignItems: "center",
                    ...style
                }
            }, children)
        }
    }
}

export function NavbarPage() {
    let isCollapsed = false

    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Navbar",
                    subtitle: "Barra de navegación responsive con soporte para marca, enlaces, formularios y más."
                }),

                // Descripción
                m(ContentSection, {
                    title: "Navbar—Componente base",
                    paragraphs: ["Componente Navbar reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Subcomponentes: NavbarBrand, NavbarNav, NavItem, NavLink",
                    "Variantes de color (light, dark, primary, etc.)",
                    "Posición fija o sticky",
                    "Responsive con toggler"
                ])]),

                // Navbar básico
                m(ContentSection, {
                    title: "Navbar Básico",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Navbar, { type: "light", style: { border: "1px solid #dee2e6", borderRadius: VARIABLES.borderRadius } }, [
                            m(NavbarBrand, { path: "/" }, "Mi App"),
                            m(NavbarNav, [
                                m(NavItem, [m(NavLink, { path: "/", active: true }, "Inicio")]),
                                m(NavItem, [m(NavLink, { path: "/docs" }, "Docs")]),
                                m(NavItem, [m(NavLink, { href: "#" }, "Enlace")]),
                                m(NavItem, [m(NavLink, { disabled: true }, "Deshabilitado")]),
                            ])
                        ]),
                        m(CodeBlock, { code: `m(Navbar, { type: "light" }, [
    m(NavbarBrand, { path: "/" }, "Mi App"),
    m(NavbarNav, [
        m(NavItem, [m(NavLink, { path: "/", active: true }, "Inicio")]),
        m(NavItem, [m(NavLink, { path: "/docs" }, "Docs")]),
        m(NavItem, [m(NavLink, { href: "#" }, "Enlace")]),
        m(NavItem, [m(NavLink, { disabled: true }, "Deshabilitado")]),
    ])
])` })
                    ])
                ]),

                // Navbar oscuro
                m(ContentSection, {
                    title: "Navbar Oscuro",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Navbar, { type: "dark", style: { borderRadius: VARIABLES.borderRadius } }, [
                            m(NavbarBrand, { path: "/" }, "Dark Navbar"),
                            m(NavbarNav, [
                                m(NavItem, [m(NavLink, { active: true, style: { color: "#fff" } }, "Inicio")]),
                                m(NavItem, [m(NavLink, { style: { color: "rgba(255,255,255,0.55)" } }, "Enlace")]),
                            ])
                        ]),
                        m(CodeBlock, { code: `m(Navbar, { type: "dark" }, [
    m(NavbarBrand, { path: "/" }, "Dark Navbar"),
    m(NavbarNav, [
        m(NavItem, [m(NavLink, { active: true }, "Inicio")]),
        m(NavItem, [m(NavLink, "Enlace")]),
    ])
])` })
                    ])
                ]),

                // Navbar con color
                m(ContentSection, {
                    title: "Navbar con Color",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Navbar, { type: "primary", style: { borderRadius: VARIABLES.borderRadius } }, [
                            m(NavbarBrand, { path: "/" }, "Primary Navbar"),
                            m(NavbarNav, [
                                m(NavItem, [m(NavLink, { active: true }, "Inicio")]),
                                m(NavItem, [m(NavLink, "Enlace")]),
                            ])
                        ]),
                        m(CodeBlock, { code: `m(Navbar, { type: "primary" }, [
    m(NavbarBrand, { path: "/" }, "Primary Navbar"),
    m(NavbarNav, [
        m(NavItem, [m(NavLink, { active: true }, "Inicio")]),
        m(NavItem, [m(NavLink, "Enlace")]),
    ])
])` })
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente Navbar",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function Navbar() {
    return {
        view: ({ attrs, children }) => {
            const { type = "light", fixed = null, sticky = false, style = {} } = attrs
            
            const baseColors = type === "light" 
                ? { backgroundColor: "#f8f9fa", color: "#212529" }
                : type === "dark"
                    ? { backgroundColor: "#212529", color: "#fff" }
                    : COLORS.base[COLORS.types[type]]

            return m("nav", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.5rem 1rem",
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
