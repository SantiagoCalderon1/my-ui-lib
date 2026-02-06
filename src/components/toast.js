import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { resolveStyle, URL_FILES } from "../utils.js"
import { ContentSection, FlexCol, FlexRow, Icon, IntroContentSection } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { CodeBlock, Text } from "./text.js"
import { Button } from "./button.js"

const TOAST_POSITIONS = {
    "top-start": { top: "1rem", left: "1rem" },
    "top-center": { top: "1rem", left: "50%", transform: "translateX(-50%)" },
    "top-end": { top: "1rem", right: "1rem" },
    "middle-start": { top: "50%", left: "1rem", transform: "translateY(-50%)" },
    "middle-center": { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
    "middle-end": { top: "50%", right: "1rem", transform: "translateY(-50%)" },
    "bottom-start": { bottom: "1rem", left: "1rem" },
    "bottom-center": { bottom: "1rem", left: "50%", transform: "translateX(-50%)" },
    "bottom-end": { bottom: "1rem", right: "1rem" }
}

export function ToastContainer() {
    return {
        view: ({ attrs, children }) => {
            const { position = "top-end", style = {} } = attrs
            if (attrs) ['position', 'style'].forEach(p => delete attrs[p])

            const positionStyle = TOAST_POSITIONS[position] || TOAST_POSITIONS["top-end"]

            return m("div", {
                style: {
                    position: "fixed",
                    zIndex: 1100,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    maxWidth: "350px",
                    ...positionStyle,
                    ...style
                }
            }, children)
        }
    }
}

export function Toast() {
    return {
        view: ({ attrs, children }) => {
            const { 
                show = true,
                type = "light",
                autohide = false,
                delay = 5000,
                onclose,
                style = {} 
            } = attrs
            if (attrs) ['show', 'type', 'autohide', 'delay', 'onclose', 'style'].forEach(p => delete attrs[p])

            if (!show) return null

            // Autohide logic
            if (autohide && onclose) {
                setTimeout(() => {
                    onclose()
                    m.redraw()
                }, delay)
            }

            const colorKey = COLORS.types[type] || "white"
            const baseColors = type === "light" 
                ? { backgroundColor: "#fff", color: "#212529" }
                : COLORS.base[colorKey] || { backgroundColor: "#fff", color: "#212529" }

            return m("div", {
                role: "alert",
                style: {
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    maxWidth: "350px",
                    pointerEvents: "auto",
                    borderRadius: VARIABLES.borderRadius,
                    border: "1px solid rgba(0,0,0,0.1)",
                    boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.15)",
                    ...baseColors,
                    ...style
                }
            }, children)
        }
    }
}

export function ToastHeader() {
    return {
        view: ({ attrs, children }) => {
            const { onclose, style = {} } = attrs
            if (attrs) ['onclose', 'style'].forEach(p => delete attrs[p])

            return m("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5rem 0.75rem",
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                    borderTopLeftRadius: VARIABLES.borderRadius,
                    borderTopRightRadius: VARIABLES.borderRadius,
                    backgroundColor: "rgba(255,255,255,0.85)",
                    backgroundClip: "padding-box",
                    ...style
                }
            }, [
                m("div", { style: { flex: 1 } }, children),
                onclose ? m("button", {
                    style: {
                        background: "none",
                        border: "none",
                        fontSize: "1.25rem",
                        cursor: "pointer",
                        padding: "0",
                        marginLeft: "auto",
                        lineHeight: 1,
                        color: "#000",
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

export function ToastBody() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            if (attrs) ['style'].forEach(p => delete attrs[p])

            return m("div", {
                style: {
                    padding: "0.75rem",
                    wordWrap: "break-word",
                    ...style
                }
            }, children)
        }
    }
}

// Toast simple (función helper)
let toastStack = []
let toastCounter = 0

export function showToast(message, options = {}) {
    const { 
        type = "light", 
        title = "Notification",
        autohide = true, 
        delay = 3000 
    } = options

    const id = ++toastCounter
    toastStack.push({ id, message, type, title, delay })
    m.redraw()

    if (autohide) {
        setTimeout(() => {
            toastStack = toastStack.filter(t => t.id !== id)
            m.redraw()
        }, delay)
    }
}

export function ToastStack() {
    return {
        view: ({ attrs }) => {
            const { position = "top-end" } = attrs

            return m(ToastContainer, { position }, [
                ...toastStack.map(toast =>
                    m(Toast, { key: toast.id, type: toast.type, show: true }, [
                        m(ToastHeader, { 
                            onclose: () => {
                                toastStack = toastStack.filter(t => t.id !== toast.id)
                                m.redraw()
                            }
                        }, [
                            m(Text, { fontWeight: "600", margin: 0 }, toast.title)
                        ]),
                        m(ToastBody, toast.message)
                    ])
                )
            ])
        }
    }
}

export function ToastPage() {
    let showDemo = false
    let toastType = "light"

    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Toast Stack global
                m(ToastStack, { position: "top-end" }),

                // Título
                m(IntroContentSection, {
                    title: "Toast",
                    subtitle: "Notificaciones ligeras y no intrusivas. Ideales para mensajes de retroalimentación que desaparecen automáticamente."
                }),

                // Descripción
                m(ContentSection, {
                    title: "Toast—Componente base",
                    paragraphs: ["Componente Toast reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Subcomponentes: ToastContainer, Toast, ToastHeader, ToastBody",
                    "Posicionamiento flexible (9 posiciones)",
                    "Auto-hide con delay configurable",
                    "Variantes de color",
                    "showToast() - función helper para toasts rápidos"
                ])]),

                // Ejemplo estático
                m(ContentSection, {
                    title: "Toast Estático",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Toast, { show: true, style: { position: "relative" } }, [
                            m(ToastHeader, { onclose: () => {} }, [
                                m(Text, { fontWeight: "600", margin: 0 }, "Notificación")
                            ]),
                            m(ToastBody, "Este es un mensaje de toast de ejemplo.")
                        ]),
                        m(CodeBlock, { code: `m(Toast, { show: true }, [
    m(ToastHeader, { onclose: () => {} }, [
        m(Text, { fontWeight: "600" }, "Notificación")
    ]),
    m(ToastBody, "Este es un mensaje de toast de ejemplo.")
])` })
                    ])
                ]),

                // Demo interactiva
                m(ContentSection, {
                    title: "Demo Interactiva",
                    paragraphs: ["Haz clic en los botones para mostrar toasts."],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(FlexRow, { gap: "0.5rem", justifyContent: "flex-start", flexWrap: "wrap" }, [
                            m(Button, { 
                                type: "primary", 
                                onclick: () => showToast("Acción completada exitosamente!", { title: "Éxito", type: "success" })
                            }, "Toast Success"),
                            m(Button, { 
                                type: "danger", 
                                onclick: () => showToast("Ha ocurrido un error.", { title: "Error", type: "danger" })
                            }, "Toast Danger"),
                            m(Button, { 
                                type: "warning", 
                                onclick: () => showToast("Atención requerida.", { title: "Advertencia", type: "warning" })
                            }, "Toast Warning"),
                            m(Button, { 
                                type: "info", 
                                onclick: () => showToast("Información importante.", { title: "Info", type: "info" })
                            }, "Toast Info"),
                        ]),
                        m(CodeBlock, { code: `// Función helper para mostrar toasts rápidamente
showToast("Acción completada!", { 
    title: "Éxito", 
    type: "success",
    autohide: true,
    delay: 3000
})` })
                    ])
                ]),

                // Posiciones
                m(ContentSection, {
                    title: "Posiciones Disponibles",
                    alignItems: "flex-start"
                }, [
                    m(MyOrderedList, [
                        "top-start → Arriba izquierda",
                        "top-center → Arriba centro",
                        "top-end → Arriba derecha (default)",
                        "middle-start → Centro izquierda",
                        "middle-center → Centro",
                        "middle-end → Centro derecha",
                        "bottom-start → Abajo izquierda",
                        "bottom-center → Abajo centro",
                        "bottom-end → Abajo derecha"
                    ])
                ]),

                // Toast con colores
                m(ContentSection, {
                    title: "Variantes de Color",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        ...["primary", "success", "danger", "warning", "info"].map(type =>
                            m(Toast, { show: true, type, style: { position: "relative", marginBottom: "0.5rem" } }, [
                                m(ToastHeader, { onclose: () => {} }, [
                                    m(Text, { fontWeight: "600", margin: 0, color: "inherit" }, `Toast ${type}`)
                                ]),
                                m(ToastBody, `Este es un toast de tipo ${type}.`)
                            ])
                        )
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente Toast",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function Toast() {
    return {
        view: ({ attrs, children }) => {
            const { show = true, type = "light", autohide = false, delay = 5000, onclose } = attrs
            
            if (!show) return null

            if (autohide && onclose) {
                setTimeout(() => { onclose(); m.redraw() }, delay)
            }

            return m("div", {
                role: "alert",
                style: {
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: VARIABLES.borderRadius,
                    boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.15)",
                    ...COLORS.base[COLORS.types[type]]
                }
            }, children)
        }
    }
}

// Helper function
export function showToast(message, options = {}) {
    const { type = "light", title = "Notification", delay = 3000 } = options
    // Add to toast stack and auto-remove after delay
}`
                    })
                ])
            ])
        }
    }
}
