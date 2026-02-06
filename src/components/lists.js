import { VARIABLES } from "../styles/variables.js";
import { Accordion } from "./accordion.js";
import { ContentSection, FlexCol, IntroContentSection } from "./layout.js";
import { Table, TableCell, TableRow } from "./tables.js";
import { CodeBlock } from "./text.js";

export function UnorderedList() {
    let hover = false;
    const UL_TYPES = {
        "disc": "disc",
        "circle": "circle",
        "square": "square",
        "none": "none"
    };
    return {
        view: ({ attrs, children }) => {
            const { id, onclick, styleHover = {}, type = "none" } = attrs;
            if (attrs) ['id', 'onclick', 'styleHover', 'type'].forEach(p => delete attrs[p]);
            return m("ul", {
                id,
                style: {
                    listStyleType: UL_TYPES[type],
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: 0,
                    margin: 0,
                    paddingLeft: type === "none" ? "" : "1.5rem",
                    borderRadius: VARIABLES.borderRadius,
                    ...attrs,
                    ...(hover ? styleHover : {})
                },
                onclick: () => { if (onclick && onclick instanceof Function) onclick() },
                onmouseenter: () => { hover = true; m.redraw() },
                onmouseleave: () => { hover = false; m.redraw() }
            }, children);
        }
    };
}

export function OrderedList() {
    let hover = false;
    const OL_TYPES = {
        "roman-1": "lower-roman",
        "roman-2": "upper-roman",
        "letter-1": "lower-alpha",
        "letter-2": "upper-alpha",
        "decimal": "decimal",
        "none": "none"
    };
    return {
        view: ({ attrs, children }) => {
            const { id, onclick, styleHover = {}, type = "decimal" } = attrs;
            if (attrs) ['id', 'onclick', 'styleHover', 'type'].forEach(p => delete attrs[p]);

            return m("ol", {
                id,
                style: {
                    listStyleType: OL_TYPES[type] || "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: 0,
                    margin: 0,
                    paddingLeft: OL_TYPES[type] ? "2rem" : "",
                    borderRadius: VARIABLES.borderRadius,
                    ...attrs,
                    ...(hover ? styleHover : {})
                },
                onclick: () => { if (onclick && onclick instanceof Function) onclick() },
                onmouseenter: () => { hover = true; m.redraw() },
                onmouseleave: () => { hover = false; m.redraw() }
            }, children);
        }
    };
}



export function ListItem() {
    let hover = false
    return {
        view: ({ attrs, children }) => {
            const { id, onclick, styleHover = {} } = attrs;
            if (attrs) ['id', 'onclick', 'styleHover'].forEach(prop => delete attrs[prop]);
            return m("li", {
                id,
                style: {
                    padding: "0.10rem 0.25rem",
                    margin: 0,
                    cursor: onclick ? "pointer" : "default",
                    borderRadius: VARIABLES.borderRadius,
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
            }, children)
        }
    }
}

export function MyOrderedList() {
    return {
        view: ({ attrs, children }) => {
            const { id, onclick, styleHover = {}, type = "decimal" } = attrs
            if (attrs) ['id', 'onclick', 'styleHover', 'bullets'].forEach(prop => delete attrs[prop]);
            return m(OrderedList, { id, ...attrs }, ...children.map((item, index) => m(ListItem, { key: index, onclick, styleHover }, item)));
        }
    }
}

export function MyUnorderedList() {
    return {
        view: ({ attrs, children }) => {
            const { id, onclick, styleHover = {}, type = "none" } = attrs
            if (attrs) ['id', 'onclick', 'styleHover', 'bullets'].forEach(prop => delete attrs[prop]);
            return m(UnorderedList, { id, ...attrs }, ...children.map((item, index) => m(ListItem, { key: index, onclick, styleHover }, item)));
        }
    }
}

export function ListsPage() {
    const sampleItems = [
        "Elemento 1",
        "Elemento 2",
        "Elemento 3"
    ];
    const hoverStyleRow = { backgroundColor: "#f0f8ff" };
    const hoverStyle = { backgroundColor: "#f0f8ff" };

    const LISTS_TYPES = {
        "none": "none",
        "decimal": "decimal",
        "roman-1": "lower-roman",
        "roman-2": "upper-roman",
        "letter-1": "lower-alpha",
        "letter-2": "upper-alpha",
        "disc": "disc",
        "circle": "circle",
        "square": "square",
    }

    return {
        view: () => {
            return m(FlexCol, { gap: "3rem" }, [
                // Título
                m(IntroContentSection, {
                    title: "Lists",
                    subtitle: "Demostración de listas ordenadas y desordenadas usando MyOrderedList, MyUnorderedList, UnorderedList, OrderedList y ListItem. Con soporte para hover y click."
                }),
                // Listas desordenadas
                m(ContentSection, {
                    title: "Unordered List (Lista Desordenada)",
                    paragraphs: ["Lista desordenada sin bullets por defecto, con soporte para hover. Cada string se envuelve en un ListItem automáticamente"],
                    alignItems: "flex-start"
                }, [
                    m(MyUnorderedList, { id: "MyUnorderedList-1" }, sampleItems),
                    m(CodeBlock, {
                        code: `m(MyUnorderedList, { id: "MyUnorderedList-1" }, [
    "Elemento 1",
    "Elemento 2",
    "Elemento 3"
])`
                    })
                ]),
                // Listas ordenadas
                m(ContentSection, {
                    title: "Ordered List (Lista Ordenada)",
                    paragraphs: ["Lista ordenada con numeración decimal por defecto, con soporte para hover. Cada string se envuelve en un ListItem automáticamente"],
                    alignItems: "flex-start"
                }, [
                    m(MyOrderedList, {}, sampleItems),
                    m(CodeBlock, {
                        code: `m(MyOrderedList, {id: "MyOrderedList-1" }, [
    "Elemento 1",
    "Elemento 2",
    "Elemento 3"
])`
                    })
                ]),
                // Hover y click en items
                m(ContentSection, {
                    title: "Hover y Click en List Items",
                    paragraphs: ["Puedes aplicar hover individual y eventos de click directamente renderizando cada ListItem dentro de UnorderedList o OrderedList."],
                    alignItems: "flex-start"
                }, [
                    m(UnorderedList, {}, sampleItems.map((item, index) => m(ListItem, { key: index, styleHover: { backgroundColor: "#f0f8ff" }, onclick: () => alert(item) }, [item]))),
                    m(OrderedList, {}, sampleItems.map((item, index) => m(ListItem, { key: index, styleHover: { backgroundColor: "#f0f8ff" }, onclick: () => alert(item) }, [item]))),
                    m(CodeBlock, {
                        code: `m(UnorderedList, {id: "UnorderedList-1"}, 
    sampleItems.map(item =>
        m(ListItem, {
            styleHover: { backgroundColor: "#f0f8ff" },
            onclick: () => alert(item)
        }, item)
    )
)

m(OrderedList, {id: "OrderedList-1"},
    sampleItems.map(item =>
        m(ListItem, {
            styleHover: { backgroundColor: "#f0f8ff" },
            onclick: () => alert(item)
        }, item)
    )
),
`
                    })
                ]),

                // Listas con bullets
                m(ContentSection, {
                    title: "Variantes (types)",
                    paragraphs: ["Por defecto en OrdereList → decimal", "Por defecto en UnorderedList → none", "Mapa semántico → List-style Real:"],
                    alignItems: "flex-start"

                }, [
                    m(Table, [
                        m(TableRow, [
                            m(TableCell, { header: true }, "Type"),
                            m(TableCell, { header: true }, "Example"),
                            // m(TableCell, { header: true }, "Type Original"),
                        ]),
                        ...Object.entries(LISTS_TYPES).map(([key, value], index) =>
                            m(TableRow, { styleHover: hoverStyleRow }, [
                                m(TableCell, { onclick: () => alert(key) }, key),
                                m(TableCell, { onclick: () => alert(value) }, [
                                    // Elegimos UL o OL según si es "decimal", "roman" o "letter" → OL, sino UL
                                    ["decimal", "roman-1", "roman-2", "letter-1", "letter-2"].some(k => key.startsWith(k))
                                        ? m(OrderedList, { type: key }, [m(ListItem, {}, `Item ${index + 1}`)])
                                        : m(UnorderedList, { type: key }, [m(ListItem, {}, `Item ${index + 1}`)])
                                ]),
                                // m(TableCell, { onclick: () => alert(key) }, value),
                            ])
                        )
                    ])
                ]),
                // Explicación final
                m(ContentSection, {
                    title: "Resumen del funcionamiento",
                    paragraphs: [
                        "1. UnorderedList y OrderedList son contenedores para ListItem.",
                        "2. MyUnorderedList y MyOrderedList mapean automáticamente cada string a un ListItem.",
                        "3. Todos los componentes soportan styleHover para cambiar estilos al pasar el mouse.",
                        "4. Cada ListItem puede tener onclick individual para manejo de eventos.",
                        "5. Propiedades adicionales como id, onclick, styleHover, type estilos se pasan al componente padre y se combinan con los internos."
                    ],
                    alignItems: "flex-start"
                }),

                m(Accordion, [
                    { title: "Accordion Item #1", content: "Contenido 1", open: true },
                    { title: "Accordion Item #2", content: "Contenido 2" },
                    { title: "Accordion Item #3", content: "Contenido 3" }
                ])
            ]);
        }
    }
}

