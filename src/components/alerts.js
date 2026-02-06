import { VARIABLES } from "../styles/variables.js";
import { resolveStyle, URL_FILES } from "../utils.js";
import { Button } from "./button.js";
import { ContentSection, FlexCol, FlexRow, Icon, IntroContentSection } from "./layout.js";
import { MyOrderedList } from "./lists.js";
import { CodeBlock } from "./text.js";

/* 
// Uso
// AlertToast("Guardado correctamente" , 3000, "success");
 */
export function AlertToast(message = "Alerta", duration = 3000, type = "primary", align = "bottom-right", closeButton = true, style = {}) {
    const TOAST_ALIGN = {
        "top-right": { top: "20px", right: "20px" },
        "top-left": { top: "20px", left: "20px" },
        "bottom-right": { bottom: "20px", right: "20px" },
        "bottom-left": { bottom: "20px", left: "20px" }
    }
    let types = {
        primary: "wh",
        secondary: "wh",
        accent: "wh",
        highlight: "wh",
        danger: "wh",
        warning: "bk",
        caution: "bk",
        success: "wh",
        info: "bk",
        teal: "bk",
        neutral: "bk",
        light: "bk",
        dark: "wh"
    }
    let visible = true
    const baseStyle = resolveStyle({ type, style })
    const position = TOAST_ALIGN[align]

    const toast = {
        oninit: ({ attrs }) => {
            setTimeout(() => {
                visible = false
                m.redraw()
            }, duration)
        },
        view: () => {
            if (!visible) return null;
            return m(FlexRow, {
                height: "auto",
                position: "fixed",
                zIndex: 9999,
                justifyContent: "space-between",
                gap: "10px",
                padding: "10px 20px",
                borderRadius: VARIABLES.borderRadius,
                boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                minWidth: "150px",
                maxWidth: "300px",
                textAlign: "left",
                transition: "opacity 0.3s ease",
                opacity: visible ? 1 : 0,
                ...position,
                ...baseStyle
            }, [message,
                closeButton
                    ? m(Icon, { src: `${URL_FILES}x-${types[type]}.svg`, onclick: () => visible = false })
                    : null
            ])
        }
    };

    const container = document.getElementById("toast-container")
        || document.body.appendChild(Object.assign(document.createElement("div"), { id: "toast-container" }));

    m.mount(container, toast);
}

export function DemoAlertToast() {
    let types = {
        primary: "wh",
        secondary: "wh",
        accent: "wh",
        highlight: "wh",
        danger: "wh",
        warning: "bk",
        caution: "bk",
        success: "wh",
        info: "bk",
        teal: "bk",
        neutral: "bk",
        light: "bk",
        dark: "wh"
    }
    let visible = true
    return {
        oninit: ({ attrs }) => {
            const { duration = 3000 } = attrs
            setTimeout(() => {
                visible = true
                m.redraw()
            }, duration)
        },
        view: ({ attrs }) => {
            const { message, type = "primary", closeButton = true, style = {} } = attrs
            if (!visible) return null
            const baseStyle = resolveStyle({ type, style })
            return m(FlexRow, {
                justifyContent: "space-between",
                gap: "10px",
                padding: "10px 20px",
                borderRadius: VARIABLES.borderRadius,
                boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                minWidth: "150px",
                maxWidth: "300px",
                textAlign: "left",
                transition: "opacity 0.3s ease",
                opacity: visible ? 1 : 0,
                ...baseStyle
            }, [message,
                closeButton
                    ? m(Icon, { src: `${URL_FILES}x-${types[type]}.svg`, onclick: () => visible = false })
                    : null
            ])
        }
    }
}



export function AlertToastPage() {
    let types = [
        "primary",
        "secondary",
        "accent",
        "highlight",
        "danger",
        "warning",
        "caution",
        "success",
        "info",
        "teal",
        "neutral",
        "light",
        "dark"
    ]
    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "AlertToast",
                    subtitle: "Demostración del componente AlertToast."
                }),
                // Subtítulo
                m(ContentSection, {
                    title: "AlertToast—Componente base",
                    paragraphs: ["Componente de AlertToast reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "type -> tipo de botón",
                    'message -> mensaje a mostar',
                    'time -> tiempo que será visible',
                    'time -> tiempo que será visible',
                    'closeButton -> mostrar o no botón de cierre',
                    'align -> ubicar en las esquinas la alerta',
                ])
                ]),

                // 
                m(ContentSection, {
                    title: "Ejemplos",
                    paragraphs: ["Listado de los types de alerts disponibles, todos cuentan con un botón de cierre, que se puede desactivar pasando el atributo closeButton: false."],
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, { code: `AlertToast("Guardado correctamente" , 3000, "success")`, overflow: ""}),

                    types.map(type =>
                        m(DemoAlertToast, {
                            message: `Alerta de tipo: ${type}`,
                            type,
                            duration: 3000,
                            style: { maxWidth: "", width: "100%" }
                        })),
                ]),

                // Botón de test
                m(ContentSection, {
                    title: "Botón de test",
                    paragraphs: ["Precione el botón para probar el componente AlertToast.",
                        "Existe 4 tipos de alineados (Esquina inferior derecha por defecto) en la pantalla:",
                    ],
                    alignItems: "flex-start"
                }, [
                    m(MyOrderedList, [
                        "top-left -> Esquina superior izquierda.",
                        "top-right -> Esquina superior derecha.",
                        "bottom-right -> Esquina inferior derecha.",
                        "bottom-left -> Esquina inferior izquierda."
                    ]),
                    m(FlexRow, { gap: "10px" }, [
                        m(Button, { onclick: () => AlertToast("Guardado correctamente", 3000, "success", "top-left") }, ["Click aquí"]),
                        m(CodeBlock, { code: `AlertToast("Guardado correctamente", 3000, "success", "top-left")` })
                    ]),
                    m(FlexRow, { gap: "10px" }, [
                        m(Button, { onclick: () => AlertToast("Guardado correctamente", 3000, "success", "top-right") }, ["Click aquí"]),
                        m(CodeBlock, { code: `AlertToast("Guardado correctamente", 3000, "success", "top-right")` })
                    ]),
                    m(FlexRow, { gap: "10px" }, [
                        m(Button, { onclick: () => AlertToast("Guardado correctamente", 3000, "success", "bottom-right") }, ["Click aquí"]),
                        m(CodeBlock, { code: `AlertToast("Guardado correctamente", 3000, "success", "bottom-right")` })
                    ]),
                    m(FlexRow, { gap: "10px" }, [
                        m(Button, { onclick: () => AlertToast("Guardado correctamente", 3000, "success", "bottom-left") }, ["Click aquí"]),
                        m(CodeBlock, { code: `AlertToast("Guardado correctamente", 3000, "success", "bottom-left")` })
                    ]),
                ]),

            ]);
        }
    }
}
