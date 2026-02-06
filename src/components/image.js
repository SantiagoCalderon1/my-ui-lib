import { COLORS } from "../styles/colors.js"
import { VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { MyOrderedList } from "./lists.js"
import { CodeBlock, Text } from "./text.js"

const URL_FILES = "./assets/images"

export function Image() {
    return {
        view: ({ attrs }) => {
            const { 
                src,
                alt = "",
                fluid = false,
                rounded = false,
                roundedCircle = false,
                thumbnail = false,
                lazy = false,
                width,
                height,
                style = {} 
            } = attrs
            if (attrs) ['src', 'alt', 'fluid', 'rounded', 'roundedCircle', 'thumbnail', 'lazy', 'width', 'height', 'style'].forEach(p => delete attrs[p])

            return m("img", {
                src,
                alt,
                loading: lazy ? "lazy" : "eager",
                style: {
                    maxWidth: fluid ? "100%" : "none",
                    height: fluid ? "auto" : (height || "auto"),
                    width: width || "auto",
                    borderRadius: roundedCircle 
                        ? "50%" 
                        : rounded 
                            ? VARIABLES.borderRadius 
                            : 0,
                    ...(thumbnail && {
                        padding: "0.25rem",
                        backgroundColor: "#fff",
                        border: "1px solid #dee2e6",
                        borderRadius: VARIABLES.borderRadius
                    }),
                    ...style
                }
            })
        }
    }
}

export function ImagePage() {
    const demoImage = "https://placehold.co/400x300/0A6FFD/ffffff?text=Demo+Image"
    const smallImage = "https://placehold.co/200x200/198755/ffffff?text=200x200"

    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Image",
                    subtitle: "Componente de imagen con soporte para estilos responsive, bordes redondeados, thumbnails y lazy loading."
                }),

                // Descripción
                m(ContentSection, {
                    title: "Image—Componente base",
                    paragraphs: ["Componente Image reutilizable con soporte para:"],
                    alignItems: "flex-start"
                }, [m(MyOrderedList, [
                    "Responsive (fluid)",
                    "Bordes redondeados (rounded)",
                    "Circular (roundedCircle)",
                    "Thumbnail con borde",
                    "Lazy loading nativo"
                ])]),

                // Uso básico
                m(ContentSection, {
                    title: "Uso Básico",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Image, { 
                            src: smallImage,
                            alt: "Imagen de ejemplo"
                        }),
                        m(CodeBlock, { code: `m(Image, { 
    src: "imagen.jpg",
    alt: "Descripción de la imagen"
})` })
                    ])
                ]),

                // Responsive/Fluid
                m(ContentSection, {
                    title: "Imagen Responsive (fluid)",
                    paragraphs: ["Con fluid: true, la imagen se adapta al ancho de su contenedor."],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m("div", { style: { maxWidth: "500px", width: "100%" } }, [
                            m(Image, { 
                                src: demoImage,
                                alt: "Imagen responsive",
                                fluid: true
                            })
                        ]),
                        m(CodeBlock, { code: `m(Image, { 
    src: "imagen.jpg",
    alt: "Imagen responsive",
    fluid: true
})` })
                    ])
                ]),

                // Rounded
                m(ContentSection, {
                    title: "Bordes Redondeados",
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(FlexRow, { gap: "1rem", justifyContent: "flex-start", flexWrap: "wrap" }, [
                            m(FlexCol, { width: "auto", alignItems: "center", gap: "0.5rem" }, [
                                m(Image, { 
                                    src: smallImage,
                                    alt: "Normal",
                                    width: "100px"
                                }),
                                m(Text, { fontSize: "0.875rem" }, "Normal")
                            ]),
                            m(FlexCol, { width: "auto", alignItems: "center", gap: "0.5rem" }, [
                                m(Image, { 
                                    src: smallImage,
                                    alt: "Rounded",
                                    width: "100px",
                                    rounded: true
                                }),
                                m(Text, { fontSize: "0.875rem" }, "rounded: true")
                            ]),
                            m(FlexCol, { width: "auto", alignItems: "center", gap: "0.5rem" }, [
                                m(Image, { 
                                    src: smallImage,
                                    alt: "Circle",
                                    width: "100px",
                                    roundedCircle: true
                                }),
                                m(Text, { fontSize: "0.875rem" }, "roundedCircle: true")
                            ]),
                        ]),
                        m(CodeBlock, { code: `// Normal
m(Image, { src: "img.jpg" })

// Bordes redondeados
m(Image, { src: "img.jpg", rounded: true })

// Circular
m(Image, { src: "img.jpg", roundedCircle: true })` })
                    ])
                ]),

                // Thumbnail
                m(ContentSection, {
                    title: "Thumbnail",
                    paragraphs: ["Agrega un borde y padding similar a una foto Polaroid."],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(Image, { 
                            src: smallImage,
                            alt: "Thumbnail",
                            width: "200px",
                            thumbnail: true
                        }),
                        m(CodeBlock, { code: `m(Image, { 
    src: "imagen.jpg",
    thumbnail: true
})` })
                    ])
                ]),

                // Lazy loading
                m(ContentSection, {
                    title: "Lazy Loading",
                    paragraphs: ["Con lazy: true, la imagen se carga cuando entra en el viewport (comportamiento nativo del navegador)."],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", alignItems: "flex-start" }, [
                        m(CodeBlock, { code: `m(Image, { 
    src: "imagen-grande.jpg",
    alt: "Se carga al hacer scroll",
    lazy: true,
    fluid: true
})` })
                    ])
                ]),

                // Código fuente
                m(ContentSection, {
                    title: "Código fuente Image",
                    alignItems: "flex-start"
                }, [
                    m(CodeBlock, {
                        code: `export function Image() {
    return {
        view: ({ attrs }) => {
            const { 
                src, alt = "", fluid = false, rounded = false, 
                roundedCircle = false, thumbnail = false, lazy = false,
                width, height, style = {} 
            } = attrs

            return m("img", {
                src,
                alt,
                loading: lazy ? "lazy" : "eager",
                style: {
                    maxWidth: fluid ? "100%" : "none",
                    height: fluid ? "auto" : (height || "auto"),
                    width: width || "auto",
                    borderRadius: roundedCircle ? "50%" : rounded ? VARIABLES.borderRadius : 0,
                    ...(thumbnail && {
                        padding: "0.25rem",
                        backgroundColor: "#fff",
                        border: "1px solid #dee2e6",
                        borderRadius: VARIABLES.borderRadius
                    }),
                    ...style
                }
            })
        }
    }
}`
                    })
                ])
            ])
        }
    }
}
