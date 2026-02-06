import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { CodeBlock, Text } from "./text.js"
import { Image } from "./image.js"

export function Figure() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            if (attrs) ['style'].forEach(p => delete attrs[p])

            return m("figure", {
                style: {
                    display: "inline-block",
                    margin: 0,
                    ...style
                }
            }, children)
        }
    }
}

export function FigureImage() {
    return {
        view: ({ attrs }) => {
            const { 
                src,
                alt = "",
                fluid = false,
                rounded = false,
                style = {} 
            } = attrs
            if (attrs) ['src', 'alt', 'fluid', 'rounded', 'style'].forEach(p => delete attrs[p])

            return m("img", {
                src,
                alt,
                style: {
                    maxWidth: fluid ? "100%" : "none",
                    height: "auto",
                    borderRadius: rounded ? VARIABLES.borderRadius : 0,
                    display: "block",
                    ...style
                }
            })
        }
    }
}

export function FigureCaption() {
    return {
        view: ({ attrs, children }) => {
            const { align = "left", style = {} } = attrs
            if (attrs) ['align', 'style'].forEach(p => delete attrs[p])

            return m("figcaption", {
                style: {
                    marginTop: "0.5rem",
                    fontSize: "0.875em",
                    color: "#6c757d",
                    textAlign: align,
                    ...style
                }
            }, children)
        }
    }
}

export function FigurePage() {
    const demoImage = "https://placehold.co/400x300/0A6FFD/ffffff?text=Figure+Image"
    const landscapeImage = "https://placehold.co/600x400/198755/ffffff?text=Landscape"

    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Figure",
                    subtitle: "Componente semántico para mostrar imágenes con leyendas. Utiliza las etiquetas HTML figure y figcaption."
                }),

                // Descripción
                m(ContentSection, {
                    title: "Figure—Componente base",
                    paragraphs: ["Componente Figure reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Subcomponentes: Figure, FigureImage, FigureCaption",
                    "Imágenes responsive (fluid)",
                    "Bordes redondeados",
                    "Alineación del caption"
                ])]),

                // Uso básico
                m(ContentSection, {
                    title: "Uso Básico",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Figure, [
                            m(FigureImage, { 
                                src: demoImage,
                                alt: "Imagen de ejemplo",
                                rounded: true
                            }),
                            m(FigureCaption, "Esta es la leyenda de la imagen.")
                        ]),
                        m(CodeBlock, { code: `m(Figure, [
    m(FigureImage, { 
        src: "imagen.jpg",
        alt: "Descripción",
        rounded: true
    }),
    m(FigureCaption, "Leyenda de la imagen.")
])` })
                    ])
                ]),

                // Imagen responsive
                m(ContentSection, {
                    title: "Imagen Responsive (fluid)",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m("div", { style: { maxWidth: "500px", width: "100%" } }, [
                            m(Figure, { style: { width: "100%" } }, [
                                m(FigureImage, { 
                                    src: landscapeImage,
                                    alt: "Imagen landscape",
                                    fluid: true,
                                    rounded: true
                                }),
                                m(FigureCaption, "Imagen responsive que se adapta al contenedor.")
                            ])
                        ]),
                        m(CodeBlock, { code: `m(Figure, [
    m(FigureImage, { 
        src: "imagen.jpg",
        fluid: true,
        rounded: true
    }),
    m(FigureCaption, "Imagen responsive.")
])` })
                    ])
                ]),

                // Alineación del caption
                m(ContentSection, {
                    title: "Alineación del Caption",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "2rem", alignItems: "flex-start" }, [
                        m(FlexRow, { gap: "2rem", flexWrap: "wrap", justifyContent: "flex-start" }, [
                            m(Figure, [
                                m(FigureImage, { 
                                    src: "https://placehold.co/200x150/DC3545/ffffff?text=Left",
                                    rounded: true
                                }),
                                m(FigureCaption, { align: "left" }, "Alineado a la izquierda")
                            ]),
                            m(Figure, [
                                m(FigureImage, { 
                                    src: "https://placehold.co/200x150/FFC107/000000?text=Center",
                                    rounded: true
                                }),
                                m(FigureCaption, { align: "center" }, "Centrado")
                            ]),
                            m(Figure, [
                                m(FigureImage, { 
                                    src: "https://placehold.co/200x150/22C997/ffffff?text=Right",
                                    rounded: true
                                }),
                                m(FigureCaption, { align: "right" }, "Alineado a la derecha")
                            ]),
                        ]),
                        m(CodeBlock, { code: `// Izquierda (default)
m(FigureCaption, { align: "left" }, "Texto")

// Centro
m(FigureCaption, { align: "center" }, "Texto")

// Derecha
m(FigureCaption, { align: "right" }, "Texto")` })
                    ])
                ]),

                // Con componente Image
                m(ContentSection, {
                    title: "Usando el componente Image",
                    paragraphs: ["También puedes usar el componente Image en lugar de FigureImage."],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Figure, [
                            m(Image, { 
                                src: "https://placehold.co/300x200/6F42C1/ffffff?text=Image+Component",
                                alt: "Usando Image",
                                rounded: true,
                                thumbnail: true
                            }),
                            m(FigureCaption, { align: "center" }, "Usando el componente Image con thumbnail")
                        ]),
                        m(CodeBlock, { code: `m(Figure, [
    m(Image, { 
        src: "imagen.jpg",
        rounded: true,
        thumbnail: true
    }),
    m(FigureCaption, { align: "center" }, "Con thumbnail")
])` })
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente Figure",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function Figure() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs
            return m("figure", {
                style: { display: "inline-block", margin: 0, ...style }
            }, children)
        }
    }
}

export function FigureImage() {
    return {
        view: ({ attrs }) => {
            const { src, alt = "", fluid = false, rounded = false } = attrs
            return m("img", {
                src, alt,
                style: {
                    maxWidth: fluid ? "100%" : "none",
                    height: "auto",
                    borderRadius: rounded ? VARIABLES.borderRadius : 0
                }
            })
        }
    }
}

export function FigureCaption() {
    return {
        view: ({ attrs, children }) => {
            const { align = "left" } = attrs
            return m("figcaption", {
                style: {
                    marginTop: "0.5rem",
                    fontSize: "0.875em",
                    color: "#6c757d",
                    textAlign: align
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
