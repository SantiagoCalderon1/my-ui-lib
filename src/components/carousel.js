import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { CodeBlock, Text } from "./text.js"
import { Button } from "./button.js"

export function Carousel() {
    let activeIndex = 0
    let intervalId = null

    return {
        oninit: ({ attrs }) => {
            if (attrs.defaultActive !== undefined) {
                activeIndex = attrs.defaultActive
            }
        },
        oncreate: ({ attrs }) => {
            const { autoplay = false, interval = 5000 } = attrs
            if (autoplay) {
                intervalId = setInterval(() => {
                    const totalItems = attrs.items?.length || 0
                    if (totalItems > 0) {
                        activeIndex = (activeIndex + 1) % totalItems
                        m.redraw()
                    }
                }, interval)
            }
        },
        onremove: () => {
            if (intervalId) {
                clearInterval(intervalId)
            }
        },
        view: ({ attrs }) => {
            const { 
                items = [],
                indicators = true,
                controls = true,
                fade = false,
                style = {} 
            } = attrs
            if (attrs) ['items', 'indicators', 'controls', 'fade', 'autoplay', 'interval', 'defaultActive', 'style'].forEach(p => delete attrs[p])

            const goTo = (index) => {
                activeIndex = index
                m.redraw()
            }

            const prev = () => {
                activeIndex = (activeIndex - 1 + items.length) % items.length
                m.redraw()
            }

            const next = () => {
                activeIndex = (activeIndex + 1) % items.length
                m.redraw()
            }

            return m("div", {
                style: {
                    position: "relative",
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: VARIABLES.borderRadius,
                    ...style
                }
            }, [
                // Indicators
                indicators && items.length > 1 ? m("div", {
                    style: {
                        position: "absolute",
                        bottom: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        gap: "8px",
                        zIndex: 15
                    }
                }, items.map((_, index) => 
                    m("button", {
                        key: index,
                        style: {
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            border: "none",
                            backgroundColor: index === activeIndex ? "#fff" : "rgba(255,255,255,0.5)",
                            cursor: "pointer",
                            transition: "background-color 0.3s"
                        },
                        onclick: () => goTo(index)
                    })
                )) : null,

                // Items container
                m("div", {
                    style: {
                        display: "flex",
                        transition: fade ? "opacity 0.6s ease" : "transform 0.6s ease",
                        transform: fade ? "none" : `translateX(-${activeIndex * 100}%)`
                    }
                }, items.map((item, index) => 
                    m("div", {
                        key: index,
                        style: {
                            minWidth: "100%",
                            opacity: fade ? (index === activeIndex ? 1 : 0) : 1,
                            position: fade ? (index === activeIndex ? "relative" : "absolute") : "relative",
                            transition: fade ? "opacity 0.6s ease" : "none"
                        }
                    }, [
                        // Image
                        m("img", {
                            src: item.src,
                            alt: item.alt || `Slide ${index + 1}`,
                            style: {
                                width: "100%",
                                height: "auto",
                                display: "block"
                            }
                        }),
                        // Caption
                        (item.title || item.description) ? m("div", {
                            style: {
                                position: "absolute",
                                bottom: "40px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                textAlign: "center",
                                color: "#fff",
                                textShadow: "0 1px 2px rgba(0,0,0,0.6)",
                                padding: "20px",
                                maxWidth: "80%"
                            }
                        }, [
                            item.title ? m("h5", { style: { margin: "0 0 0.5rem 0", fontSize: "1.25rem" } }, item.title) : null,
                            item.description ? m("p", { style: { margin: 0 } }, item.description) : null
                        ]) : null
                    ])
                )),

                // Controls
                controls && items.length > 1 ? [
                    // Prev button
                    m("button", {
                        style: {
                            position: "absolute",
                            top: "50%",
                            left: "10px",
                            transform: "translateY(-50%)",
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            border: "none",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            color: "#fff",
                            fontSize: "1.25rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10,
                            transition: "background-color 0.3s"
                        },
                        onclick: prev,
                        onmouseenter: (e) => e.target.style.backgroundColor = "rgba(0,0,0,0.8)",
                        onmouseleave: (e) => e.target.style.backgroundColor = "rgba(0,0,0,0.5)"
                    }, "‹"),
                    // Next button
                    m("button", {
                        style: {
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            border: "none",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            color: "#fff",
                            fontSize: "1.25rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10,
                            transition: "background-color 0.3s"
                        },
                        onclick: next,
                        onmouseenter: (e) => e.target.style.backgroundColor = "rgba(0,0,0,0.8)",
                        onmouseleave: (e) => e.target.style.backgroundColor = "rgba(0,0,0,0.5)"
                    }, "›")
                ] : null
            ])
        }
    }
}

export function CarouselPage() {
    const demoItems = [
        { 
            src: "https://placehold.co/800x400/0A6FFD/ffffff?text=Slide+1",
            alt: "Primer slide",
            title: "Primer Slide",
            description: "Este es el contenido del primer slide."
        },
        { 
            src: "https://placehold.co/800x400/198755/ffffff?text=Slide+2",
            alt: "Segundo slide",
            title: "Segundo Slide",
            description: "Este es el contenido del segundo slide."
        },
        { 
            src: "https://placehold.co/800x400/DC3545/ffffff?text=Slide+3",
            alt: "Tercer slide",
            title: "Tercer Slide",
            description: "Este es el contenido del tercer slide."
        }
    ]

    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Carousel",
                    subtitle: "Componente de carrusel para mostrar imágenes o contenido en slides. Soporta controles, indicadores y autoplay."
                }),

                // Descripción
                m(ContentSection, {
                    title: "Carousel—Componente base",
                    paragraphs: ["Componente Carousel reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Array de items con src, alt, title, description",
                    "Controles de navegación (prev/next)",
                    "Indicadores de posición",
                    "Autoplay con intervalo configurable",
                    "Transición fade opcional"
                ])]),

                // Carousel básico
                m(ContentSection, {
                    title: "Carousel Básico",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Carousel, {
                            items: demoItems,
                            style: { maxWidth: "600px" }
                        }),
                        m(CodeBlock, { code: `const items = [
    { 
        src: "imagen1.jpg",
        alt: "Slide 1",
        title: "Primer Slide",
        description: "Descripción del slide."
    },
    { src: "imagen2.jpg", alt: "Slide 2" },
    { src: "imagen3.jpg", alt: "Slide 3" }
]

m(Carousel, { items })` })
                    ])
                ]),

                // Sin controles
                m(ContentSection, {
                    title: "Sin Controles",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Carousel, {
                            items: demoItems,
                            controls: false,
                            style: { maxWidth: "600px" }
                        }),
                        m(CodeBlock, { code: `m(Carousel, { items, controls: false })` })
                    ])
                ]),

                // Sin indicadores
                m(ContentSection, {
                    title: "Sin Indicadores",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Carousel, {
                            items: demoItems,
                            indicators: false,
                            style: { maxWidth: "600px" }
                        }),
                        m(CodeBlock, { code: `m(Carousel, { items, indicators: false })` })
                    ])
                ]),

                // Solo imágenes
                m(ContentSection, {
                    title: "Solo Imágenes (sin captions)",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Carousel, {
                            items: [
                                { src: "https://placehold.co/800x400/6F42C1/ffffff?text=Image+1" },
                                { src: "https://placehold.co/800x400/FD7E14/ffffff?text=Image+2" },
                                { src: "https://placehold.co/800x400/22C997/ffffff?text=Image+3" }
                            ],
                            style: { maxWidth: "600px" }
                        }),
                        m(CodeBlock, { code: `m(Carousel, {
    items: [
        { src: "imagen1.jpg" },
        { src: "imagen2.jpg" },
        { src: "imagen3.jpg" }
    ]
})` })
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente Carousel",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function Carousel() {
    let activeIndex = 0

    return {
        view: ({ attrs }) => {
            const { items = [], indicators = true, controls = true, autoplay = false, interval = 5000 } = attrs

            const prev = () => { activeIndex = (activeIndex - 1 + items.length) % items.length; m.redraw() }
            const next = () => { activeIndex = (activeIndex + 1) % items.length; m.redraw() }

            return m("div", { style: { position: "relative", overflow: "hidden" } }, [
                // Indicators
                indicators ? m("div", { style: { position: "absolute", bottom: "10px", ... } }, 
                    items.map((_, i) => m("button", { onclick: () => activeIndex = i }))
                ) : null,

                // Items
                m("div", { style: { transform: \`translateX(-\${activeIndex * 100}%)\` } },
                    items.map(item => m("div", [
                        m("img", { src: item.src }),
                        item.title && m("div", [item.title, item.description])
                    ]))
                ),

                // Controls
                controls ? [
                    m("button", { onclick: prev }, "‹"),
                    m("button", { onclick: next }, "›")
                ] : null
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
