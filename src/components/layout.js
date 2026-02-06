import { COLORS } from "../styles/colors.js"
import { setTheme, slugify, URL_FILES } from "../utils.js"
import { VARIABLES } from "../styles/variables.js"
import { Button } from "./button.js"
import { ListItem, UnorderedList } from "./lists.js"
import { H1, H2, H3, Link, SmallText, Text } from "./text.js"

// Componentes de esctructura
export {
    Layout, FlexCol, FlexRow, Div, Icon, Header, Pipe, dropdown,
}

// Componentes de secciones
export {
    IntroContentSection, ContentSection
}

function Layout() {
    let a, b, c
    return {
        oninit: ({ attrs, children }) => {
            const { aa, bb, cc } = attrs
            a = aa
            b = bb
            c = cc
        },
        view: ({ attrs, children }) => {
            return [
                m(Header),
                m(FlexCol, { width: "100wv", height: "calc(100vh - 50px)", margin: "50px 0 0 0", }, [
                    m(FlexRow, {
                        maxWidth: "1200px",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        ...attrs
                    }, [
                        m(AsideLeft),
                        m(FlexCol, {
                            height: "98%",
                            alignItems: "flex-start",
                            overflowY: "auto",
                            gap: "1.25rem",
                            padding: "1rem",
                            scrollbarWidth: "thin",
                            borderRadius: VARIABLES.borderRadius,
                        }, [children]),
                        m(AsideRight),
                    ])
                ])
            ]
        }
    }
}

/* 
    TO DO Header
    [x]  Buscar un Icono
    []  Hacer el buscador de cosas
    []  Poner el control de versiones de la lib
    []  Que funcione el toggle de cambio de tema de light to dark
*/
function Header() {
    let model = {
        title: "My UI Lib",
        icon: URL_FILES + "code-wh.svg",
        iconGithub: URL_FILES + "github-wh.svg",
        menu: [
            { title: "Home", path: "/" },
            { title: "Docs", path: "/docs" },
        ]
    }
    return {
        view: ({ attrs, children }) => {
            return m(FlexCol, { backgroundColor: "#FFB911", position: "fixed", top: 0, zIndex: 1000, height: "50px" }, [
                m(FlexRow, { maxWidth: "1600px", justifyContent: "space-between", }, [
                    m(FlexRow, { gap: "10px", color: "white" }, [
                        m(Icon, { src: model?.icon, width: "30px" }),
                        model.menu.map((item, index) => {
                            return [m(Pipe, { size: "20px" }), m(Link, { path: item.path }, item?.title)]
                        })
                    ]),
                    m(FlexRow, { gap: "10px", color: "white" }, [
                        m(Icon, { src: model?.iconGithub, width: "25px" }),
                        m(Pipe, { size: "20px" }),
                        m(dropdown, {
                            style: {
                                backgroundColor: COLORS.simples.white,
                                color: COLORS.simples.gray,
                                gap: "10px"
                            },
                            content: [
                                m(FlexRow, [
                                    m(Icon, { src: URL_FILES + "sun-wh.svg", width: "20px" }),
                                    m(Icon, { src: URL_FILES + "angle-wh.svg", width: "15px" }),
                                ])
                            ]
                        }, [
                            m(FlexRow, {
                                justifyContent: "flex-start", gap: "2px",
                                onclick: () => {
                                    setTheme("light")
                                    m.redraw()
                                }
                            }, [
                                m(Icon, { src: URL_FILES + "sun-gy.svg", width: "20px" }),
                                m(SmallText, { whiteSpace: "nowrap" }, "Light Mode"),
                            ]),
                            m(FlexRow, {
                                justifyContent: "flex-start", gap: "2px",
                                onclick: () => {
                                    setTheme("dark")
                                    m.redraw()
                                }
                            }, [
                                m(Icon, { src: URL_FILES + "moon-gy.svg", width: "20px" }),
                                m(SmallText, { whiteSpace: "nowrap" }, "Dark Mode"),
                            ])
                        ])
                    ])
                ])
            ])
        }
    }
}

/* 
    TO DO AsideLeft
    [x]  Buscar un Iconos para los títulos
*/
/**
 * AsideLeft - Renders a left sidebar navigation component for UI Framework documentation
 * 
 * Displays a hierarchical menu structure with collapsible sections containing documentation links.
 * The component is designed to be used as the left navigation panel in a documentation layout.
 * 
 * @component
 * @returns {Object} Mithril component object with view method
 * @returns {Function} view - Renders a FlexCol containing organized navigation sections
 * 
 * @description
 * Structure:
 * - Creates a vertical flex layout with 25% width
 * - Contains multiple expandable menu sections (Getting started, Customize, Layout, etc.)
 * - Each section contains child navigation items with paths
 * - Uses UnorderedList and ListItem components for semantic structure
 * - Applies hover styling with yellow background on list items
 * 
 * Sections included:
 * - Getting started (11 items)
 * - Customize (8 items)
 * - Layout (8 items)
 * - Content (5 items)
 * - Forms (9 items)
 * - Components (dynamically generated from array)
 * - Helpers (dynamically generated from array)
 * - Utilities (dynamically generated from array)
 * - Extend (2 items)
 * - About (6 items)
 * 
 * @example
 * m(AsideLeft)
 */
function AsideLeft() {
    let model = {
        title: "UI Framework Docs",
        icon: URL_FILES + "ui-lib.svg",
        iconGithub: URL_FILES + "github.svg",
        menu: [
            {
                title: "Layout",
                children: [
                    { title: "Grid", path: "/layout/grid" },
                    { title: "Containers", path: "/layout/containers" },
                    { title: "Columns", path: "/layout/columns" }
                ]
            },
            {
                title: "Content",
                children: [
                    { title: "Reboot", path: "/content/reboot" },
                    { title: "Typography", path: "/content/typography" },
                    { title: "Images", path: "/content/images" },
                    { title: "Tables", path: "/content/tables" },
                    { title: "Figures", path: "/content/figures" }
                ]
            },
            {
                title: "Forms",
                children: [
                    { title: "Overview", path: "/forms/overview" },
                    { title: "Form control", path: "/forms/overview#form-controls" },
                    { title: "Select", path: "/forms/overview#select" },
                    { title: "Checks & radios", path: "/forms/overview#checks--radios" },
                    { title: "Range", path: "/forms/overview#range" },
                    { title: "Input group", path: "/forms/overview#input-group" },
                    { title: "Floating labels", path: "/forms/overview#floating-labels" },
                    { title: "Validation", path: "/forms/overview#validation" }
                ]
            },
            {
                title: "Components",
                children: [
                    { title: "Accordion", path: "/components/accordion" },
                    { title: "Alert Toast", path: "/components/alert-toast" },
                    { title: "Badge", path: "/components/badge" },
                    { title: "Breadcrumb", path: "/components/breadcrumb" },
                    { title: "Buttons", path: "/components/buttons" },
                    { title: "Button group", path: "/components/button-group" },
                    { title: "Card", path: "/components/card" },
                    { title: "Carousel", path: "/components/carousel" },
                    { title: "Close button", path: "/components/close-button" },
                    { title: "Collapse", path: "/components/collapse" },
                    { title: "List group", path: "/components/list-group" },
                    { title: "Modal", path: "/components/modal" },
                    { title: "Navbar", path: "/components/navbar" },
                    { title: "Navs & tabs", path: "/components/navs-tabs" },
                    { title: "Offcanvas", path: "/components/offcanvas" },
                    { title: "Pagination", path: "/components/pagination" },
                    { title: "Placeholders", path: "/components/placeholders" },
                    { title: "Popovers", path: "/components/popovers" },
                    { title: "Progress", path: "/components/progress" },
                    { title: "Spinners", path: "/components/spinners" },
                    { title: "Toasts", path: "/components/toasts" },
                    { title: "Tooltips", path: "/components/tooltips" }
                ]
            }
        ]
    }
    return {
        view: () => {
            return m(FlexCol, {
                width: "25%",
                height: "100%",
                color: COLORS.simples.gray,
                alignItems: "flex-start",
                overflowY: "auto",
                gap: "1.25rem",
                padding: "1rem 0"
            }, [
                ...model.menu.map(section =>
                    m(UnorderedList, { gap: "0.25rem", alignItems: "flex-start" }, [
                        m(ListItem, { flexDirection: "column", gap: "0.25rem", alignItems: "flex-start" }, [
                            m(Text, { fontWeight: "bold", color: COLORS.simples.black }, section?.title || ""),
                            m(UnorderedList, { gap: "0.25rem", alignItems: "flex-start" }, [
                                ...section.children.map(item =>
                                    m(ListItem, { styleHover: { backgroundColor: COLORS.hover.yellow } }, [m(Link, { path: item.path }, item.title)])
                                )
                            ])
                        ])
                    ])
                )
            ])
        }
    }
}

/* 
    TO DO AsideRight
    [x]  Rellenar de información real (tipo las anclas de los títulos)
*/
function AsideRight() {
    let model = {
        title: "On this page",
        icon: URL_FILES + "ui-lib.svg",
        iconGithub: URL_FILES + "github.svg",
        menu: [
            {
                title: "Getting started",
                children: [
                    { title: "Introduction", path: "/getting-started/introduction" },
                    { title: "Download", path: "/getting-started/download" },
                    { title: "Contents", path: "/getting-started/contents" },
                    { title: "Browsers & devices", path: "/getting-started/browsers-devices" },
                    { title: "JavaScript", path: "/getting-started/javascript" },
                    { title: "Webpack", path: "/getting-started/webpack" },
                    { title: "Parcel", path: "/getting-started/parcel" },
                    { title: "Vite", path: "/getting-started/vite" },
                    { title: "Accessibility", path: "/getting-started/accessibility" },
                    { title: "RFS", path: "/getting-started/rfs" },
                    { title: "RTL", path: "/getting-started/rtl" },
                    { title: "Contribute", path: "/getting-started/contribute" }
                ]
            }
        ]
    }
    return {
        view: () => {
            return m(FlexCol, {
                width: "25%",
                height: "100%",
                color: COLORS.simples.gray,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                overflowY: "auto",
                gap: "1.25rem",
                padding: "1rem 0"
            }, [
                ...model.menu.map(section =>
                    m(UnorderedList, { gap: "0.25rem", alignItems: "flex-start" }, [
                        m(ListItem, { flexDirection: "column", gap: "0.25rem", alignItems: "flex-start" }, [
                            m(Text, { fontWeight: "bold", color: COLORS.simples.black }, section?.title || ""),
                            m(UnorderedList, { gap: "0.25rem", alignItems: "flex-start" }, [
                                ...section.children.map(item =>
                                    m(ListItem, { styleHover: { backgroundColor: COLORS.hover.yellow } }, [m(Link, { path: item.path }, item.title)])
                                )
                            ])
                        ])
                    ])
                )
            ])
        }
    }
}

function FlexCol() {
    let hover = false
    return {
        view: ({ attrs, children }) => {
            const { id, onclick, styleHover = {} } = attrs
            if (attrs) ['id', 'onclick', 'styleHover'].forEach(prop => delete attrs[prop]);
            return m("div", {
                id,
                style: {
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: attrs.justifyContent || "flex-start",
                    alignItems: attrs.alignItems || "center",
                    cursor: onclick ? "pointer" : "default",
                    ...attrs,
                    ...(hover ? styleHover : {})
                },
                onclick: () => { if (onclick && onclick instanceof Function) onclick() },
                onmouseenter: () => {
                    hover = true
                    m.redraw()
                },
                onmouseleave: () => {
                    hover = false
                    m.redraw()
                }
            }, [children])
        }
    }
}

function FlexRow() {
    let hover = false
    return {
        view: ({ attrs, children }) => {
            const { id, onclick, styleHover = {} } = attrs
            if (attrs) ['id', 'onclick', 'styleHover'].forEach(prop => delete attrs[prop]);
            return m("div", {
                id,
                style: {
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: attrs.justifyContent || "center",
                    alignItems: attrs.alignItems || "center",
                    cursor: onclick ? "pointer" : "default",
                    ...attrs,
                    ...(hover ? styleHover : {})
                },
                onclick: () => { if (onclick && onclick instanceof Function) onclick() },
                onmouseenter: () => {
                    hover = true
                    m.redraw()
                },
                onmouseleave: () => {
                    hover = false
                    m.redraw()
                }
            }, [children])
        }
    }
}

function Div() {
    let hover = false
    return {
        view: ({ attrs, children }) => {
            const { id, onclick, styleHover = {} } = attrs
            if (attrs) ['id', 'onclick', 'styleHover'].forEach(prop => delete attrs[prop]);
            return m("div", {
                id,
                style: {
                    width: "auto",
                    height: "auto",
                    cursor: onclick ? "pointer" : "default",
                    ...attrs,
                    ...(hover ? styleHover : {})
                },
                onclick: () => { if (onclick && onclick instanceof Function) onclick() },
                onmouseenter: () => {
                    hover = true
                    m.redraw()
                },
                onmouseleave: () => {
                    hover = false
                    m.redraw()
                }
            }, [children])
        }
    }
}

// Sección para Iconos
function Icon() {
    let hover = false
    return {
        view: ({ attrs, children }) => {
            const { src, width = "16px", alt = "Icono", onclick, cursor = "pointer", styleHover = {} } = attrs
            if (attrs) ["src", "width", "alt", "onclick", "cursor", "styleHover"].forEach(prop => delete attrs[prop]);

            return m("img", {
                src: src,
                alt: alt,
                style: { width: width, height: "auto", cursor, ...attrs, ...(hover ? styleHover : {}) },
                onclick: () => { if (onclick && onclick instanceof Function) onclick() },
                onmouseenter: () => {
                    hover = true
                    m.redraw()
                },
                onmouseleave: () => {
                    hover = false
                    m.redraw()
                }
            }, [children])
        }
    }
}

function Pipe() {
    return {
        view: ({ attrs, children }) => {
            const { size = "16px", color } = attrs
            if (attrs) ['size', 'color'].forEach(prop => delete attrs[prop]);

            return m("span", {
                style: {
                    display: "inline-block",
                    fontSize: size,
                    color: color || "inherit",
                    cursor: onclick ? "pointer" : "default",
                    userSelect: "none",
                    ...attrs
                },
            }, "|")
        }
    }
}




// Sección para componentes utiles
function dropdown() {
    let open = false
    let dropdownEl

    const styleBase = {
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        transition: "all 0.2s ease-in-out",
        position: "absolute",
        top: "100%",
        left: "0",
        minWidth: "100%",
        zIndex: 1000,
        justifyContent: "flex-start",
        width: "auto",
        minWidth: "100%",
        height: "auto",
        borderRadius: "0.375rem",
        cursor: "pointer",
        border: "1px solid var(--border-gray)",
    }

    function handleClickOutside(event) {
        if (dropdownEl && !dropdownEl.contains(event.target)) {
            open = false
            m.redraw()
        }
    }

    return {
        oncreate: () => {
            document.addEventListener("click", handleClickOutside)
        },
        onremove: () => {
            document.removeEventListener("click", handleClickOutside)
        },
        view: ({ attrs, children }) => {
            const { type = "transparent-white", content = ["dropdown"], style = {} } = attrs
            if (attrs) ['type', 'content', 'style'].forEach(prop => delete attrs[prop]);

            return m(Div, {
                position: "relative",
                cursor: "pointer",
                oncreate: ({ dom }) => dropdownEl = dom, // Aquí guardamos el contenedor completo,
                onclick: (e) => {
                    e.stopPropagation()
                    open = !open
                    m.redraw()
                }
            }, [
                m(Button, {
                    type,
                    onclick: (e) => {
                        e.stopPropagation()
                        open = !open
                        m.redraw()
                    }
                }, [...content]),
                open
                    ? m(FlexCol, {
                        ...styleBase,
                        ...style
                    }, [children])
                    : null
            ])
        }
    }
}

function IntroContentSection() {
    return {
        view: ({ attrs, children }) => {
            const { title, subtitle } = attrs
            if (attrs) ['title', 'subtitle'].forEach(prop => delete attrs[prop]);

            return m(FlexCol, { gap: "1rem", height: "auto", ...attrs }, [
                title ? m(H1, { id: slugify(title) }, [title]) : null,
                subtitle ? m(H2, { textAlign: "justify" }, [subtitle]) : null,
                children
            ])
        }
    }
}

function ContentSection() {
    return {
        view: ({ attrs, children }) => {
            const { title = "", paragraphs = [] } = attrs
            if (attrs) ['title', 'paragraphs'].forEach(prop => delete attrs[prop]);
            return m(FlexCol, { gap: "1rem", height: "auto", ...attrs }, [
                title ? m(H2, { id: slugify(title) }, [title]) : null,
                paragraphs && paragraphs.length
                    ? [...paragraphs.map(p => m(Text, { textAlign: "justify" }, [p]))]
                    : null,
                ...children
            ])
        }
    }
}

export function ColorShapeSVG() {
    return {
        view: ({ attrs }) => {
            const { color = "transparent", borderColor = "#000", size = 16, shape = "square" } = attrs;
            if (attrs) ['color', 'borderColor', 'size', 'shape'].forEach(prop => delete attrs[prop]);
            let svgContent;
            switch (shape) {
                case "circle":
                    svgContent = m("circle", { cx: size / 2, cy: size / 2, r: size / 2 - 1, fill: color, stroke: borderColor, "stroke-width": 1 });
                    break;
                case "square":
                    svgContent = m("rect", { x: 0, y: 0, width: size, height: size, fill: color, stroke: borderColor, "stroke-width": 1 });
                    break;
                case "diamond":
                    svgContent = m("polygon", { points: `${size / 2},0 ${size},${size / 2} ${size / 2},${size} 0,${size / 2}`, fill: color, stroke: borderColor, "stroke-width": 1 });
                    break;
                case "triangle":
                    svgContent = m("polygon", { points: `0,${size} ${size / 2},0 ${size},${size}`, fill: color, stroke: borderColor, "stroke-width": 1 });
                    break;
                default: // square por defecto
                    svgContent = m("rect", { x: 0, y: 0, width: size, height: size, fill: color, stroke: borderColor, "stroke-width": 1 });
            }
            return m("svg", { width: size, height: size, style: { display: "inline-block", attrs } }, svgContent);
        }
    }
}



