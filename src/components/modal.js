import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { CodeBlock, Text } from "./text.js"
import { Button } from "./button.js"
import { CloseButton } from "./close-button.js"

const MODAL_SIZES = {
    sm: { maxWidth: "300px" },
    md: { maxWidth: "500px" },
    lg: { maxWidth: "800px" },
    xl: { maxWidth: "1140px" },
    fullscreen: { maxWidth: "100%", width: "100%", height: "100%", margin: 0, borderRadius: 0 }
}

export function Modal() {
    return {
        view: ({ attrs, children }) => {
            const { 
                open = false, 
                onclose, 
                size = "md", 
                centered = false, 
                backdrop = true,
                animation = true,
                style = {} 
            } = attrs
            if (attrs) ['open', 'onclose', 'size', 'centered', 'backdrop', 'animation', 'style'].forEach(p => delete attrs[p])

            if (!open) return null

            const sizeStyle = MODAL_SIZES[size] || MODAL_SIZES.md

            return m("div", {
                style: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: centered ? "center" : "flex-start",
                    paddingTop: centered ? 0 : "50px",
                    backgroundColor: backdrop ? "rgba(0,0,0,0.5)" : "transparent",
                    zIndex: 1050,
                    overflow: "auto",
                    opacity: animation ? 1 : 1,
                    transition: animation ? "opacity 0.15s linear" : "none"
                },
                onclick: (e) => {
                    if (e.target === e.currentTarget && backdrop && onclose) {
                        onclose()
                    }
                }
            }, [
                m("div", {
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#fff",
                        borderRadius: size === "fullscreen" ? 0 : VARIABLES.borderRadius,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                        width: "100%",
                        margin: size === "fullscreen" ? 0 : "1rem",
                        transform: animation ? "translateY(0)" : "none",
                        transition: animation ? "transform 0.3s ease-out" : "none",
                        ...sizeStyle,
                        ...style
                    },
                    onclick: (e) => e.stopPropagation()
                }, children)
            ])
        }
    }
}

export function ModalHeader() {
    return {
        view: ({ attrs, children }) => {
            const { onclose, style = {} } = attrs
            if (attrs) ['onclose', 'style'].forEach(p => delete attrs[p])

            return m("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem",
                    borderBottom: "1px solid #dee2e6",
                    ...style
                }
            }, [
                m("h5", { 
                    style: { 
                        margin: 0, 
                        fontSize: "1.25rem", 
                        fontWeight: "500" 
                    } 
                }, children),
                onclose ? m("button", {
                    style: {
                        background: "none",
                        border: "none",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                        padding: "0",
                        lineHeight: 1,
                        color: "#6c757d",
                        opacity: 0.5
                    },
                    onclick: onclose,
                    onmouseenter: (e) => e.target.style.opacity = 1,
                    onmouseleave: (e) => e.target.style.opacity = 0.5
                }, "×") : null
            ])
        }
    }
}

export function ModalBody() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            if (attrs) ['style'].forEach(p => delete attrs[p])

            return m("div", {
                style: {
                    padding: "1rem",
                    flex: "1 1 auto",
                    overflowY: "auto",
                    ...style
                }
            }, children)
        }
    }
}

export function ModalFooter() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            if (attrs) ['style'].forEach(p => delete attrs[p])

            return m("div", {
                style: {
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "1rem",
                    borderTop: "1px solid #dee2e6",
                    ...style
                }
            }, children)
        }
    }
}

export function ModalPage() {
    let isOpen = false
    let modalSize = "md"
    let modalCentered = false

    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Modal",
                    subtitle: "Ventana de diálogo modal para mostrar contenido importante, formularios o confirmaciones. Bloquea la interacción con el resto de la página."
                }),

                // Descripción
                m(ContentSection, {
                    title: "Modal—Componente base",
                    paragraphs: ["Componente Modal reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Subcomponentes: ModalHeader, ModalBody, ModalFooter",
                    "Control de apertura/cierre (open, onclose)",
                    "Tamaños (sm, md, lg, xl, fullscreen)",
                    "Centrado vertical (centered)",
                    "Backdrop clickeable para cerrar"
                ])]),

                // Demo interactiva
                m(ContentSection, {
                    title: "Demo Interactiva",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(FlexRow, { gap: "0.5rem", justifyContent: "flex-start", flexWrap: "wrap" }, [
                            m(Button, { 
                                type: "primary", 
                                onclick: () => { 
                                    modalSize = "md"
                                    modalCentered = false
                                    isOpen = true 
                                } 
                            }, "Abrir Modal"),
                            m(Button, { 
                                type: "secondary", 
                                onclick: () => { 
                                    modalSize = "lg"
                                    modalCentered = false
                                    isOpen = true 
                                } 
                            }, "Modal Grande"),
                            m(Button, { 
                                type: "success", 
                                onclick: () => { 
                                    modalSize = "md"
                                    modalCentered = true
                                    isOpen = true 
                                } 
                            }, "Modal Centrado"),
                        ]),

                        // Modal
                        m(Modal, { 
                            open: isOpen, 
                            onclose: () => isOpen = false,
                            size: modalSize,
                            centered: modalCentered
                        }, [
                            m(ModalHeader, { onclose: () => isOpen = false }, "Título del Modal"),
                            m(ModalBody, [
                                m(Text, "Este es el contenido del modal. Puedes poner cualquier cosa aquí: texto, formularios, imágenes, etc."),
                                m(Text, { style: { marginTop: "1rem" } }, "Haz clic fuera del modal o en la X para cerrarlo.")
                            ]),
                            m(ModalFooter, [
                                m(Button, { type: "neutral", onclick: () => isOpen = false }, "Cancelar"),
                                m(Button, { type: "primary", onclick: () => isOpen = false }, "Guardar")
                            ])
                        ]),

                        m(CodeBlock, { code: `let isOpen = false

m(Button, { onclick: () => isOpen = true }, "Abrir Modal")

m(Modal, { 
    open: isOpen, 
    onclose: () => isOpen = false,
    size: "md",
    centered: false
}, [
    m(ModalHeader, { onclose: () => isOpen = false }, "Título"),
    m(ModalBody, [
        m(Text, "Contenido del modal...")
    ]),
    m(ModalFooter, [
        m(Button, { type: "neutral", onclick: () => isOpen = false }, "Cancelar"),
        m(Button, { type: "primary", onclick: () => isOpen = false }, "Guardar")
    ])
])` })
                    ])
                ]),

                // Tamaños
                m(ContentSection, {
                    title: "Tamaños disponibles",
                    paragraphs: ["El modal soporta diferentes tamaños:"],
                    alignItems: "flex-start"
                }, [
                    m(MyOrderedList, [
                        'sm → maxWidth: 300px',
                        'md → maxWidth: 500px (default)',
                        'lg → maxWidth: 800px',
                        'xl → maxWidth: 1140px',
                        'fullscreen → 100% de la pantalla'
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente Modal",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function Modal() {
    return {
        view: ({ attrs, children }) => {
            const { open = false, onclose, size = "md", centered = false, backdrop = true } = attrs
            
            if (!open) return null

            return m("div", {
                style: {
                    position: "fixed",
                    top: 0, left: 0,
                    width: "100%", height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: centered ? "center" : "flex-start",
                    backgroundColor: backdrop ? "rgba(0,0,0,0.5)" : "transparent",
                    zIndex: 1050
                },
                onclick: (e) => {
                    if (e.target === e.currentTarget && backdrop && onclose) onclose()
                }
            }, [
                m("div", {
                    style: {
                        backgroundColor: "#fff",
                        borderRadius: VARIABLES.borderRadius,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                        ...MODAL_SIZES[size]
                    }
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
