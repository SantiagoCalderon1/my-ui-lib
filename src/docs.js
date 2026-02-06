import { Button } from "./components/button.js";

export function DocsPage() {
    let a, b, c;
    const buttonTypesList = [
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
    ];
    return {
        oninit: ({ attrs, children }) => {
            const { aa, bb, cc } = attrs;
            a = aa;
            b = bb;
            c = cc;
            // Inicialización de estados internos si es necesario
        },
        view: ({ attrs, children }) => {
            return m("div", {}, [
                buttonTypesList.map(type => [
                    m(Button, { type, hover: true }, `Base ${type}`),
                    m(Button, { type, outline: true, hover: true }, `Outline ${type}`)
                ])
            ]);
        }
    }
}
