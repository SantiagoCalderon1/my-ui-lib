import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { URL_FILES } from "../utils.js"
import { Button } from "./button.js"
import { ContentSection, FlexCol, Icon, IntroContentSection } from "./layout.js"
import { MyOrderedList, MyUnorderedList } from "./lists.js"
import { CodeBlock } from "./text.js"

export function Accordion() {
    return {
        view: ({ attrs, children }) => {
            const { id, type = "neutral-outline", onclick, borderRadius = true, hover = false } = attrs
            if (attrs) ['id', "type", 'onclick', 'borderRadius', 'hover'].forEach(prop => delete attrs[prop]);
            return m(FlexCol, {
                id,
                width: "100%",
                height: "auto",
                borderRadius: VARIABLES.borderRadius,
                ...attrs
            },
                children.map((child, index) =>
                    m(child.tag, {
                        ...child.attrs,
                        type,
                        isFirst: index === 0,
                        isLast: index === (children.length - 1),
                        onclick,
                        borderRadius,
                        hover
                    }, child.children)
                )
            )
        }
    }
}

export function AccordionItem() {
    let isOpen = false
    return {
        oninit: ({ attrs }) => { isOpen = !!attrs.open },
        view: ({ attrs, children }) => {
            const { type, title, isFirst, isLast, borderRadius = true, onclick, hover = false } = attrs
            if (attrs) ["type", "title", "isFirst", "isLast", "borderRadius", "onclick"].forEach(p => delete attrs[p])
            const isSingle = isFirst && isLast
            return m(FlexCol, { height: "auto" }, [
                m(Button, {
                    hover,
                    type: type || "neutral-outline",
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        textAlign: "left",
                        border: "1px solid #dee2e6",
                        borderBottom: "1px solid #dee2e6",
                        borderRadius: 0,
                        // SINGLE (cerrado)
                        ...(isSingle && !isOpen && { borderRadius: VARIABLES.borderRadius }),
                        // FIRST
                        ...(isFirst && !isLast && {
                            borderTopLeftRadius: VARIABLES.borderRadius,
                            borderTopRightRadius: VARIABLES.borderRadius
                        }),
                        // LAST (cerrado)
                        ...(isLast && !isFirst && !isOpen && {
                            borderBottomLeftRadius: VARIABLES.borderRadius,
                            borderBottomRightRadius: VARIABLES.borderRadius
                        }),
                        // OPEN → nunca radios abajo en header
                        ...(isOpen || isLast ? { borderBottom: "1px solid #dee2e6" } : { borderBottom: 0 }),
                        // Si borderRadius = false borramos todos los borderRadius
                        ...(!borderRadius ? {
                            borderRadius: 0,
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0
                        } : {}),
                    },
                    onclick: () => {
                        isOpen = !isOpen
                        if (onclick && onclick instanceof Function) onclick()
                        m.redraw()
                    }
                }, [title, m(Icon, {
                    src: URL_FILES + "angle-bk.svg",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.5s ease",
                })]),

                // BODY
                isOpen &&
                m(FlexCol, {
                    color: "inherit",
                    padding: "0.5rem 1rem",
                    minHeight: "100px",
                    borderLeft: "1px solid #dee2e6",
                    borderRight: "1px solid #dee2e6",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    ...(isLast && {
                        borderBottom: "1px solid #dee2e6",
                        borderBottomLeftRadius: VARIABLES.borderRadius,
                        borderBottomRightRadius: VARIABLES.borderRadius
                    }),
                    // Si borderRadius = false borramos todos los borderRadius
                    ...(!borderRadius ? {
                        borderRadius: 0,
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0
                    } : {})
                }, children)
            ])
        }
    }
}

export function AccordionPage() {
    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Accordion",
                    subtitle: "Demostración del componente Accordion y AccordionItem. Con soporte para hover y click"
                }),
                // Subtítulo
                m(ContentSection, {
                    title: "Accordion—Componente base",
                    paragraphs: ["Componente de Accordion reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    'id -> id del componente',
                    "type -> tipo de botón",
                    'onclick -> función a ejecutar al hacer click',
                    'borderRadius -> tener o no bordes redondeados',
                    'hover -> tener o no hover',
                ])]),

                // Ejemplo con bordes
                m(ContentSection, {
                    title: "Accordion (Con borderRadius)",
                    paragraphs: ["Acordión con borderRadius por defecto y primer hijo abierto por defecto"],
                    alignItems: "flex-start"
                }, [
                    m(Accordion, [
                        m(AccordionItem, { title: "Item 1", open: true }, "Contenido 1"),
                        m(AccordionItem, { title: "Item 2" }, "Contenido 2"),
                        m(AccordionItem, { title: "Item 3" }, "Contenido 3")
                    ]),
                    m(CodeBlock, {
                        code: `m(Accordion, [
    m(AccordionItem, { title: "Item 1", open: true }, "Contenido 1"),
    m(AccordionItem, { title: "Item 2" }, "Contenido 2"),
    m(AccordionItem, { title: "Item 3" }, "Contenido 3")
])`
                    })
                ]),
                // Ejemplo sin bordes
                m(ContentSection, {
                    title: "Accordion (Sin borderRadius)",
                    paragraphs: ["Acordión sin borderRadius e hijos cerrados"],
                    alignItems: "flex-start"
                }, [
                    m(Accordion, { borderRadius: false }, [
                        m(AccordionItem, { title: "Item 1" }, "Contenido 1"),
                        m(AccordionItem, { title: "Item 2" }, "Contenido 2"),
                        m(AccordionItem, { title: "Item 3" }, "Contenido 3")
                    ]),
                    m(CodeBlock, {
                        code: `m(Accordion, { borderRadius: false }, [
    m(AccordionItem, { title: "Item 1" }, "Contenido 1"),
    m(AccordionItem, { title: "Item 2" }, "Contenido 2"),
    m(AccordionItem, { title: "Item 3" }, "Contenido 3")
])`
                    })
                ]),
                // Muchas combinaciones
                m(ContentSection, {
                    title: "Accordion (borderRadius y hover)",
                    paragraphs: [`Acordión de tipo "primary-outline" sin borderRadius e hijos cerrados`,
                        `por defecto type es "neutral-outline"`
                    ],
                    alignItems: "flex-start"
                }, [
                    m(Accordion, { type: "primary-outline", borderRadius: false, hover: true }, [
                        m(AccordionItem, { title: "Item 1" }, "Contenido 1"),
                        m(AccordionItem, { title: "Item 2" }, "Contenido 2"),
                        m(AccordionItem, { title: "Item 3" }, "Contenido 3")
                    ]),
                    m(CodeBlock, {
                        code: `m(Accordion, { type: "primary-outline", borderRadius: false, hover: true }, [
    m(AccordionItem, { title: "Item 1" }, "Contenido 1"),
    m(AccordionItem, { title: "Item 2" }, "Contenido 2"),
    m(AccordionItem, { title: "Item 3" }, "Contenido 3")
])`
                    })
                ])
            ]);
        }
    }
}

