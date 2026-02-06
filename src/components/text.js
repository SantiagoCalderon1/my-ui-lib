import { injectOnce } from "../utils.js";
import { VARIABLES } from "../styles/variables.js";

export {
    // Títulos
    H1, H2, H3, H4, H5, H6,
    // Parrafos
    Text, SmallText, TinyText,
    // Links
    Link
}

// Títulos
function H1() {
    return {
        view: ({ attrs, children }) => {
            const { id } = attrs
            return m("h1", {
                id, style: { width: "100%", fontSize: "1.5rem", fontWeight: "400", ...attrs },
            }, [children]);
        }
    }
}

function H2() {
    return {
        view: ({ attrs, children }) => {
            const { id } = attrs
            return m("h2", {
                id, style: { width: "100%", fontSize: "1.25rem", fontWeight: "400", ...attrs },
            }, [children]);
        }
    }
}

function H3() {
    return {
        view: ({ attrs, children }) => {
            const { id } = attrs

            return m("h3", {
                id, style: { width: "100%", fontSize: "1.15rem", fontWeight: "400", ...attrs },
            }, [children]);
        }
    }
}

function H4() {
    return {
        view: ({ attrs, children }) => {
            const { id } = attrs

            return m("h4", {
                id, style: { width: "100%", fontSize: "1.10rem", fontWeight: "400", ...attrs },
            }, [children]);
        }
    }
}

function H5() {
    return {
        view: ({ attrs, children }) => {
            const { id } = attrs

            return m("h5", {
                id, style: { width: "100%", fontSize: "1.05rem", fontWeight: "400", ...attrs },
            }, [children]);
        }
    }
}

function H6() {
    return {
        view: ({ attrs, children }) => {
            const { id } = attrs

            return m("h6", {
                id, style: { fontSize: "1rem", fontWeight: "400", ...attrs },
            }, [children]);
        }
    }
}

// Parrafos
function Text() {
    return {
        view: ({ attrs, children }) => {
            const { id } = attrs

            return m("p", {
                id, style: { width: "auto", fontSize: "1rem", fontWeight: "400", ...attrs },
            }, [children]);
        }
    }
}

function SmallText() {
    return {
        view: ({ attrs, children }) => {
            const { id } = attrs

            return m("p", {
                id, style: { width: "auto", fontSize: "0.75rem", fontWeight: "400", ...attrs },
            }, [children]);
        }
    }
}

function TinyText() {
    return {
        view: ({ attrs, children }) => {
            const { id } = attrs

            return m("span", {
                id, style: { width: "auto", fontSize: "0.5rem", fontWeight: "400", ...attrs },
            }, [children]);
        }
    }
}


function Link() {
    return {
        view: ({ attrs, children }) => {
            const { id, href, path, style } = attrs

            const linkStyle = {
                width: "auto", 
                fontSize: "1rem", 
                fontWeight: "400", 
                color: "inherit", 
                textDecoration: "none", 
                cursor: "pointer",
                ...style
            }

            // Detectar si el path tiene hash (ancla)
            const hasHash = path && path.includes("#")

            if (hasHash) {
                // Usar <a> nativo con onclick manual para evitar que m.route.Link intercepte
                const [basePath, hash] = path.split("#")
                return m("a", {
                    id,
                    href: path,
                    style: linkStyle,
                    onclick: (e) => {
                        e.preventDefault()
                        // Navegar al route base
                        m.route.set(basePath)
                        // Esperar render y hacer scroll al elemento
                        setTimeout(() => {
                            const el = document.getElementById(hash)
                            if (el) {
                                el.scrollIntoView({ behavior: "smooth", block: "start" })
                            }
                        }, 150)
                    }
                }, [children])
            }

            // Sin hash: usar m.route.Link normal o <a> para href
            return m(path ? m.route.Link : "a", {
                id,
                href: path ? path : href,
                style: linkStyle,
            }, [children]);
        }
    }
}


export function CodeBlock() {
    return {
        oninit: () => {
            // Tema
            injectOnce("link", {
                rel: "stylesheet",
                href: "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.css",
                id: "prism-theme"
            });

            // Core Prism.js
            injectOnce("script", {
                src: "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js",
                id: "prism-core"
            });

            // Lenguaje JS
            injectOnce("script", {
                src: "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-javascript.min.js",
                id: "prism-js"
            });

            // Plugin Line Numbers
            injectOnce("link", {
                rel: "stylesheet",
                href: "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-numbers/prism-line-numbers.css",
                id: "prism-line-numbers-css"
            });
            injectOnce("script", {
                src: "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-numbers/prism-line-numbers.min.js",
                id: "prism-line-numbers-js"
            });

            // Plugin Toolbar (necesario antes de copy-to-clipboard)
            injectOnce("link", {
                rel: "stylesheet",
                href: "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/toolbar/prism-toolbar.css",
                id: "prism-toolbar-css"
            });
            injectOnce("script", {
                src: "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/toolbar/prism-toolbar.min.js",
                id: "prism-toolbar-js"
            });

            // Plugin Copy to Clipboard (después de Toolbar)
            injectOnce("link", {
                rel: "stylesheet",
                href: "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.css",
                id: "prism-copy-css"
            });
            injectOnce("script", {
                src: "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js",
                id: "prism-copy-js"
            });


            // Espera un tick para asegurar que Prism esté cargado
            setTimeout(() => {
                if (window.Prism) {
                    document.querySelectorAll("pre code").forEach(el => Prism.highlightElement(el));
                }
            }, 100);

            return m("style", [
                `.code-toolbar{width: "100%";}`
            ])
        },
        view: ({ attrs }) => {
            const { code = "", language = "js", } = attrs;
            if (attrs) ['code', 'language', "overflow"].forEach(prop => delete attrs[prop]);
            if (code === "") return null
            return m("div", { style: { width: "100%", maxWidth: "1200px", } },
                m("pre.line-numbers", {
                    style: {
                        width: "100%",
                        height: "auto",
                        margin: 0,
                        borderRadius: VARIABLES.borderRadius,
                        overflowX: "auto",
                        overflowY: "auto",
                        ...attrs
                    }
                }, m("code", { class: `language-${language}` }, code)));
        },

    }
}

