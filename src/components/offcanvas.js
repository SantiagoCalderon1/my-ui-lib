import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { CodeBlock, Text } from "./text.js"
import { Button } from "./button.js"

const OFFCANVAS_POSITIONS = {
    start: {
        top: 0,
        left: 0,
        height: "100%",
        width: "400px",
        maxWidth: "100%",
        transform: "translateX(-100%)",
        transformOpen: "translateX(0)"
    },
    end: {
        top: 0,
        right: 0,
        height: "100%",
        width: "400px",
        maxWidth: "100%",
        transform: "translateX(100%)",
        transformOpen: "translateX(0)"
    },
    top: {
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "30vh",
        maxHeight: "100%",
        transform: "translateY(-100%)",
        transformOpen: "translateY(0)"
    },
    bottom: {
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "30vh",
        maxHeight: "100%",
        transform: "translateY(100%)",
        transformOpen: "translateY(0)"
    }
}

export function Offcanvas() {
    return {
        view: ({ attrs, children }) => {
            const { 
                open = false,
                position = "start",
                backdrop = true,
                scroll = false,
                onclose,
                style = {} 
            } = attrs
            if (attrs) ['open', 'position', 'backdrop', 'scroll', 'onclose', 'style'].forEach(p => delete attrs[p])

            if (!open) return null

            const posStyle = OFFCANVAS_POSITIONS[position] || OFFCANVAS_POSITIONS.start

            // Disable body scroll when open and scroll is false
            if (!scroll) {
                document.body.style.overflow = "hidden"
            }

            return [
                // Backdrop
                backdrop ? m("div", {
                    style: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        zIndex: 1040,
                        transition: "opacity 0.3s ease"
                    },
                    onclick: () => {
                        if (onclose) {
                            document.body.style.overflow = ""
                            onclose()
                        }
                    }
                }) : null,

                // Offcanvas panel
                m("div", {
                    style: {
                        position: "fixed",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#fff",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                        zIndex: 1045,
                        transition: "transform 0.3s ease-in-out",
                        ...posStyle,
                        transform: posStyle.transformOpen,
                        ...style
                    }
                }, children)
            ]
        }
    }
}

export function OffcanvasHeader() {
    return {
        view: ({ attrs, children }) => {
            const { onclose, style = {} } = attrs
            if (attrs) ['onclose', 'style'].forEach(p => delete attrs[p])

            return m("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem",
                    borderBottom: "1px solid #dee2e6",
                    ...style
                }
            }, [
                m("h5", { style: { margin: 0, fontSize: "1.25rem", fontWeight: "500" } }, children),
                onclose ? m("button", {
                    style: {
                        background: "none",
                        border: "none",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                        padding: "0",
                        lineHeight: 1,
                        color: "#000",
                        opacity: 0.5
                    },
                    onclick: () => {
                        document.body.style.overflow = ""
                        onclose()
                    },
                    onmouseenter: (e) => e.target.style.opacity = 1,
                    onmouseleave: (e) => e.target.style.opacity = 0.5
                }, "×") : null
            ])
        }
    }
}

export function OffcanvasBody() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            if (attrs) ['style'].forEach(p => delete attrs[p])

            return m("div", {
                style: {
                    flex: "1 1 auto",
                    padding: "1rem",
                    overflowY: "auto",
                    ...style
                }
            }, children)
        }
    }
}

export function OffcanvasPage() {
    let showStart = false
    let showEnd = false
    let showTop = false
    let showBottom = false

    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Offcanvas components
                m(Offcanvas, { 
                    open: showStart, 
                    position: "start",
                    onclose: () => showStart = false 
                }, [
                    m(OffcanvasHeader, { onclose: () => showStart = false }, "Offcanvas Start"),
                    m(OffcanvasBody, [
                        m(Text, "Este es el contenido del offcanvas. Puedes poner cualquier cosa aquí: menús, formularios, información adicional, etc.")
                    ])
                ]),

                m(Offcanvas, { 
                    open: showEnd, 
                    position: "end",
                    onclose: () => showEnd = false 
                }, [
                    m(OffcanvasHeader, { onclose: () => showEnd = false }, "Offcanvas End"),
                    m(OffcanvasBody, [
                        m(Text, "Panel lateral desde la derecha.")
                    ])
                ]),

                m(Offcanvas, { 
                    open: showTop, 
                    position: "top",
                    onclose: () => showTop = false 
                }, [
                    m(OffcanvasHeader, { onclose: () => showTop = false }, "Offcanvas Top"),
                    m(OffcanvasBody, [
                        m(Text, "Panel superior deslizante.")
                    ])
                ]),

                m(Offcanvas, { 
                    open: showBottom, 
                    position: "bottom",
                    onclose: () => showBottom = false 
                }, [
                    m(OffcanvasHeader, { onclose: () => showBottom = false }, "Offcanvas Bottom"),
                    m(OffcanvasBody, [
                        m(Text, "Panel inferior deslizante.")
                    ])
                ]),

                // Título
                m(IntroContentSection, {
                    title: "Offcanvas",
                    subtitle: "Panel lateral o superior/inferior deslizante. Ideal para menús de navegación, filtros o contenido adicional."
                }),

                // Descripción
                m(ContentSection, {
                    title: "Offcanvas—Componente base",
                    paragraphs: ["Componente Offcanvas reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Subcomponentes: OffcanvasHeader, OffcanvasBody",
                    "Posiciones: start (izquierda), end (derecha), top, bottom",
                    "Backdrop clickeable para cerrar",
                    "Control de scroll del body"
                ])]),

                // Demo
                m(ContentSection, {
                    title: "Demo Interactiva",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(FlexRow, { gap: "0.5rem", justifyContent: "flex-start", flexWrap: "wrap" }, [
                            m(Button, { type: "primary", onclick: () => showStart = true }, "Abrir Start"),
                            m(Button, { type: "secondary", onclick: () => showEnd = true }, "Abrir End"),
                            m(Button, { type: "success", onclick: () => showTop = true }, "Abrir Top"),
                            m(Button, { type: "info", onclick: () => showBottom = true }, "Abrir Bottom"),
                        ]),
                        m(CodeBlock, { code: `let showOffcanvas = false

m(Button, { onclick: () => showOffcanvas = true }, "Abrir")

m(Offcanvas, { 
    open: showOffcanvas, 
    position: "start",
    onclose: () => showOffcanvas = false 
}, [
    m(OffcanvasHeader, { onclose: () => showOffcanvas = false }, "Título"),
    m(OffcanvasBody, [
        m(Text, "Contenido del offcanvas...")
    ])
])` })
                    ])
                ]),

                // Posiciones
                m(ContentSection, {
                    title: "Posiciones Disponibles",
                    alignItems: "flex-start"
                }, [
                    m(MyOrderedList, [
                        "start → Desde la izquierda (default)",
                        "end → Desde la derecha",
                        "top → Desde arriba",
                        "bottom → Desde abajo"
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente Offcanvas",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function Offcanvas() {
    return {
        view: ({ attrs, children }) => {
            const { open = false, position = "start", backdrop = true, onclose } = attrs
            
            if (!open) return null

            const posStyle = OFFCANVAS_POSITIONS[position]

            return [
                // Backdrop
                backdrop ? m("div", {
                    style: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)" },
                    onclick: onclose
                }) : null,

                // Panel
                m("div", {
                    style: {
                        position: "fixed",
                        backgroundColor: "#fff",
                        transition: "transform 0.3s ease",
                        ...posStyle
                    }
                }, children)
            ]
        }
    }
}`
                    })
                ])
            ])
        }
    }
}
