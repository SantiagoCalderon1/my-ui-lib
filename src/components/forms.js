import { COLORS } from "../styles/colors.js"
import { SIZES, VARIABLES } from "../styles/variables.js"
import { ContentSection, FlexCol, FlexRow, IntroContentSection } from "./layout.js"
import { CodeBlock, Text } from "./text.js"
import { MyOrderedList } from "./lists.js"
import { Button } from "./button.js"

// Estilos base para inputs
const INPUT_BASE = {
    display: "block",
    width: "100%",
    fontFamily: "inherit",
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "1.5",
    color: "#212529",
    backgroundColor: "#fff",
    backgroundClip: "padding-box",
    border: "1px solid #ced4da",
    borderRadius: VARIABLES.borderRadius,
    transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    appearance: "none"
}

// Tamaños de input
const INPUT_SIZES = {
    sm: { padding: "0.25rem 0.5rem", fontSize: "0.875rem", borderRadius: "0.25rem" },
    md: { padding: "0.375rem 0.75rem", fontSize: "1rem", borderRadius: VARIABLES.borderRadius },
    lg: { padding: "0.5rem 1rem", fontSize: "1.25rem", borderRadius: "0.5rem" }
}

// Colores de validación
const VALIDATION_COLORS = {
    valid: { border: "#198754", color: "#198754" },
    invalid: { border: "#dc3545", color: "#dc3545" }
}

/**
 * Input - Campo de entrada de texto
 */
export function Input() {
    let isFocused = false
    return {
        view: ({ attrs }) => {
            const { 
                type = "text", 
                size = "md", 
                disabled = false, 
                readonly = false,
                plaintext = false,
                valid = false,
                invalid = false,
                placeholder = "",
                value,
                id,
                name,
                oninput,
                onchange,
                style = {} 
            } = attrs

            const sizeStyle = INPUT_SIZES[size] || INPUT_SIZES.md

            let borderColor = "#ced4da"
            let boxShadow = "none"
            
            if (valid) {
                borderColor = VALIDATION_COLORS.valid.border
                if (isFocused) boxShadow = `0 0 0 0.25rem rgba(25, 135, 84, 0.25)`
            } else if (invalid) {
                borderColor = VALIDATION_COLORS.invalid.border
                if (isFocused) boxShadow = `0 0 0 0.25rem rgba(220, 53, 69, 0.25)`
            } else if (isFocused) {
                borderColor = "#86b7fe"
                boxShadow = "0 0 0 0.25rem rgba(13, 110, 253, 0.25)"
            }

            const inputStyle = plaintext ? {
                ...INPUT_BASE,
                ...sizeStyle,
                border: "none",
                borderRadius: 0,
                backgroundColor: "transparent",
                padding: sizeStyle.padding,
                ...style
            } : {
                ...INPUT_BASE,
                ...sizeStyle,
                borderColor,
                boxShadow,
                opacity: disabled ? 0.65 : 1,
                cursor: disabled ? "not-allowed" : "text",
                ...style
            }

            return m("input", {
                type,
                id,
                name,
                value,
                placeholder,
                disabled,
                readonly: readonly || plaintext,
                style: inputStyle,
                oninput,
                onchange,
                onfocus: () => { isFocused = true; m.redraw() },
                onblur: () => { isFocused = false; m.redraw() }
            })
        }
    }
}

/**
 * Textarea - Área de texto multilínea
 */
export function Textarea() {
    let isFocused = false
    return {
        view: ({ attrs }) => {
            const { 
                rows = 3,
                size = "md", 
                disabled = false, 
                readonly = false,
                valid = false,
                invalid = false,
                placeholder = "",
                value,
                id,
                name,
                oninput,
                onchange,
                style = {} 
            } = attrs

            const sizeStyle = INPUT_SIZES[size] || INPUT_SIZES.md

            let borderColor = "#ced4da"
            let boxShadow = "none"
            
            if (valid) {
                borderColor = VALIDATION_COLORS.valid.border
                if (isFocused) boxShadow = `0 0 0 0.25rem rgba(25, 135, 84, 0.25)`
            } else if (invalid) {
                borderColor = VALIDATION_COLORS.invalid.border
                if (isFocused) boxShadow = `0 0 0 0.25rem rgba(220, 53, 69, 0.25)`
            } else if (isFocused) {
                borderColor = "#86b7fe"
                boxShadow = "0 0 0 0.25rem rgba(13, 110, 253, 0.25)"
            }

            return m("textarea", {
                rows,
                id,
                name,
                value,
                placeholder,
                disabled,
                readonly,
                style: {
                    ...INPUT_BASE,
                    ...sizeStyle,
                    borderColor,
                    boxShadow,
                    resize: "vertical",
                    opacity: disabled ? 0.65 : 1,
                    cursor: disabled ? "not-allowed" : "text",
                    ...style
                },
                oninput,
                onchange,
                onfocus: () => { isFocused = true; m.redraw() },
                onblur: () => { isFocused = false; m.redraw() }
            })
        }
    }
}

/**
 * Select - Campo de selección
 */
export function Select() {
    let isFocused = false
    return {
        view: ({ attrs, children }) => {
            const { 
                size = "md", 
                disabled = false, 
                multiple = false,
                valid = false,
                invalid = false,
                value,
                id,
                name,
                onchange,
                style = {} 
            } = attrs

            const sizeStyle = INPUT_SIZES[size] || INPUT_SIZES.md

            let borderColor = "#ced4da"
            let boxShadow = "none"
            
            if (valid) {
                borderColor = VALIDATION_COLORS.valid.border
                if (isFocused) boxShadow = `0 0 0 0.25rem rgba(25, 135, 84, 0.25)`
            } else if (invalid) {
                borderColor = VALIDATION_COLORS.invalid.border
                if (isFocused) boxShadow = `0 0 0 0.25rem rgba(220, 53, 69, 0.25)`
            } else if (isFocused) {
                borderColor = "#86b7fe"
                boxShadow = "0 0 0 0.25rem rgba(13, 110, 253, 0.25)"
            }

            return m("select", {
                id,
                name,
                value,
                disabled,
                multiple,
                style: {
                    ...INPUT_BASE,
                    ...sizeStyle,
                    borderColor,
                    boxShadow,
                    paddingRight: multiple ? sizeStyle.padding.split(" ")[1] : "2.25rem",
                    backgroundImage: multiple ? "none" : "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "16px 12px",
                    opacity: disabled ? 0.65 : 1,
                    cursor: disabled ? "not-allowed" : "pointer",
                    ...style
                },
                onchange,
                onfocus: () => { isFocused = true; m.redraw() },
                onblur: () => { isFocused = false; m.redraw() }
            }, children)
        }
    }
}

/**
 * Option - Opción de select
 */
export function Option() {
    return {
        view: ({ attrs, children }) => {
            const { value, disabled = false, selected = false } = attrs
            return m("option", { value, disabled, selected }, children)
        }
    }
}

/**
 * FormGroup - Agrupación de campo de formulario
 */
export function FormGroup() {
    return {
        view: ({ attrs, children }) => {
            const { controlId, floating = false, style = {} } = attrs

            return m("div", {
                style: {
                    marginBottom: "1rem",
                    position: floating ? "relative" : undefined,
                    ...style
                }
            }, children)
        }
    }
}

/**
 * FormLabel - Etiqueta de campo
 */
export function FormLabel() {
    return {
        view: ({ attrs, children }) => {
            const { htmlFor, visuallyHidden = false, style = {} } = attrs

            const visuallyHiddenStyle = visuallyHidden ? {
                position: "absolute",
                width: "1px",
                height: "1px",
                padding: 0,
                margin: "-1px",
                overflow: "hidden",
                clip: "rect(0, 0, 0, 0)",
                whiteSpace: "nowrap",
                border: 0
            } : {}

            return m("label", {
                for: htmlFor,
                style: {
                    display: "inline-block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    ...visuallyHiddenStyle,
                    ...style
                }
            }, children)
        }
    }
}

/**
 * FormText - Texto de ayuda
 */
export function FormText() {
    return {
        view: ({ attrs, children }) => {
            const { muted = true, style = {} } = attrs

            return m("div", {
                style: {
                    marginTop: "0.25rem",
                    fontSize: "0.875em",
                    color: muted ? COLORS.gray[600].backgroundColor : "inherit",
                    ...style
                }
            }, children)
        }
    }
}

/**
 * FormCheck - Wrapper para checkbox/radio/switch
 */
export function FormCheck() {
    return {
        view: ({ attrs, children }) => {
            const { inline = false, reverse = false, isSwitch = false, style = {} } = attrs

            return m("div", {
                style: {
                    display: inline ? "inline-flex" : "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    minHeight: "1.5rem",
                    paddingLeft: reverse ? 0 : (isSwitch ? "2.5rem" : "1.5rem"),
                    paddingRight: reverse ? (isSwitch ? "2.5rem" : "1.5rem") : 0,
                    marginBottom: inline ? 0 : "0.125rem",
                    marginRight: inline ? "1rem" : 0,
                    flexDirection: reverse ? "row-reverse" : "row",
                    ...style
                }
            }, children)
        }
    }
}

/**
 * FormCheckInput - Input de checkbox/radio/switch
 */
export function FormCheckInput() {
    return {
        view: ({ attrs }) => {
            const { 
                type = "checkbox",
                checked = false, 
                disabled = false, 
                isSwitch = false,
                valid = false,
                invalid = false,
                id,
                name,
                value,
                onchange,
                style = {} 
            } = attrs

            let borderColor = "#dee2e6"
            if (valid) borderColor = VALIDATION_COLORS.valid.border
            if (invalid) borderColor = VALIDATION_COLORS.invalid.border

            const baseCheckStyle = {
                width: isSwitch ? "2rem" : "1rem",
                height: "1rem",
                marginTop: "0.25rem",
                marginLeft: isSwitch ? "-2.5rem" : "-1.5rem",
                verticalAlign: "top",
                backgroundColor: checked ? COLORS.simples.blue : "#fff",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                border: `1px solid ${borderColor}`,
                borderRadius: isSwitch ? "2rem" : (type === "radio" ? "50%" : "0.25rem"),
                appearance: "none",
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.65 : 1,
                transition: "background-color 0.15s ease-in-out, background-position 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"
            }

            if (checked) {
                if (type === "radio") {
                    baseCheckStyle.backgroundImage = "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e\")"
                } else if (isSwitch) {
                    baseCheckStyle.backgroundImage = "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e\")"
                    baseCheckStyle.backgroundPosition = "right center"
                } else {
                    baseCheckStyle.backgroundImage = "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e\")"
                }
                baseCheckStyle.borderColor = COLORS.simples.blue
            } else if (isSwitch) {
                baseCheckStyle.backgroundImage = "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba(0,0,0,.25)'/%3e%3c/svg%3e\")"
                baseCheckStyle.backgroundPosition = "left center"
            }

            return m("input", {
                type,
                id,
                name,
                value,
                checked,
                disabled,
                style: { ...baseCheckStyle, ...style },
                onchange: (e) => onchange && onchange(e)
            })
        }
    }
}

/**
 * FormCheckLabel - Label de checkbox/radio
 */
export function FormCheckLabel() {
    return {
        view: ({ attrs, children }) => {
            const { htmlFor, style = {} } = attrs

            return m("label", {
                for: htmlFor,
                style: {
                    cursor: "pointer",
                    ...style
                }
            }, children)
        }
    }
}

/**
 * FormRange - Input de rango/slider
 */
export function FormRange() {
    return {
        view: ({ attrs }) => {
            const { 
                min = 0, 
                max = 100, 
                step = 1, 
                value,
                disabled = false,
                id,
                name,
                oninput,
                onchange,
                style = {} 
            } = attrs

            return m("input", {
                type: "range",
                id,
                name,
                min,
                max,
                step,
                value,
                disabled,
                style: {
                    width: "100%",
                    height: "1.5rem",
                    padding: 0,
                    backgroundColor: "transparent",
                    appearance: "none",
                    cursor: disabled ? "not-allowed" : "pointer",
                    opacity: disabled ? 0.65 : 1,
                    ...style
                },
                oninput,
                onchange
            })
        }
    }
}

/**
 * InputGroup - Grupo de input con addons
 */
export function InputGroup() {
    return {
        view: ({ attrs, children }) => {
            const { size = "md", style = {} } = attrs

            return m("div", {
                style: {
                    position: "relative",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "stretch",
                    width: "100%",
                    ...style
                }
            }, children)
        }
    }
}

/**
 * InputGroupText - Texto/elemento dentro de InputGroup
 */
export function InputGroupText() {
    return {
        view: ({ attrs, children }) => {
            const { style = {} } = attrs

            return m("span", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    padding: "0.375rem 0.75rem",
                    fontSize: "1rem",
                    fontWeight: "400",
                    lineHeight: "1.5",
                    color: "#212529",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    backgroundColor: COLORS.gray[200].backgroundColor,
                    border: "1px solid #ced4da",
                    borderRadius: VARIABLES.borderRadius,
                    ...style
                }
            }, children)
        }
    }
}

/**
 * FloatingLabel - Input con label flotante
 */
export function FloatingLabel() {
    let hasValue = false
    let isFocused = false

    return {
        view: ({ attrs, children }) => {
            const { label, controlId, style = {} } = attrs

            const childArray = Array.isArray(children) ? children : [children]
            childArray.forEach(child => {
                if (child && child.attrs && child.attrs.value) {
                    hasValue = true
                }
            })

            const labelStyle = {
                position: "absolute",
                top: hasValue || isFocused ? 0 : "50%",
                left: "0.75rem",
                height: "100%",
                padding: "1rem 0.75rem",
                pointerEvents: "none",
                border: "1px solid transparent",
                transformOrigin: "0 0",
                transition: "opacity 0.1s ease-in-out, transform 0.1s ease-in-out",
                transform: hasValue || isFocused ? "scale(0.85) translateY(-0.5rem) translateX(0.15rem)" : "translateY(-50%)",
                color: COLORS.gray[600].backgroundColor,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
            }

            return m("div", {
                style: {
                    position: "relative",
                    ...style
                }
            }, [
                ...childArray.map(child => {
                    if (!child) return child
                    return m(child.tag, {
                        ...child.attrs,
                        style: {
                            ...child.attrs?.style,
                            paddingTop: "1.625rem",
                            paddingBottom: "0.625rem",
                            height: "calc(3.5rem + 2px)",
                            lineHeight: "1.25"
                        },
                        onfocus: (e) => {
                            isFocused = true
                            m.redraw()
                            if (child.attrs?.onfocus) child.attrs.onfocus(e)
                        },
                        onblur: (e) => {
                            isFocused = false
                            hasValue = e.target.value.length > 0
                            m.redraw()
                            if (child.attrs?.onblur) child.attrs.onblur(e)
                        },
                        oninput: (e) => {
                            hasValue = e.target.value.length > 0
                            if (child.attrs?.oninput) child.attrs.oninput(e)
                        }
                    }, child.children)
                }),
                m("label", {
                    for: controlId,
                    style: labelStyle
                }, label)
            ])
        }
    }
}

/**
 * FormFeedback - Mensaje de feedback de validación
 */
export function FormFeedback() {
    return {
        view: ({ attrs, children }) => {
            const { type = "invalid", style = {} } = attrs
            const color = type === "valid" ? VALIDATION_COLORS.valid.color : VALIDATION_COLORS.invalid.color

            return m("div", {
                style: {
                    display: "block",
                    width: "100%",
                    marginTop: "0.25rem",
                    fontSize: "0.875em",
                    color,
                    ...style
                }
            }, children)
        }
    }
}

/**
 * FormsPage - Página de documentación de Forms
 */
export function FormsPage() {
    let formData = {
        email: "",
        password: "",
        message: "",
        country: "",
        remember: false,
        gender: "male",
        notifications: true,
        range: 50
    }

    return {
        oncreate: () => {
            // Solo scroll al top si no hay hash (ancla)
            if (!window.location.hash) {
                window.scrollTo({ top: 0, behavior: "smooth" })
            }
        },
        view: () => {
            return m(FlexCol, { gap: "3rem", alignItems: "flex-start" }, [
                // Intro
                m(IntroContentSection, {
                    title: "Forms",
                    subtitle: "Documentación y ejemplos de controles de formulario con estilos Bootstrap usando inline styles."
                }),

                // Form Controls
                m(ContentSection, {
                    title: "Form Controls",
                    paragraphs: ["Inputs de texto con diferentes estados y tamaños:"],
                    alignItems: "flex-start"
                }, [
                    m(FormGroup, {}, [
                        m(FormLabel, { htmlFor: "email1" }, "Email address"),
                        m(Input, { 
                            type: "email", 
                            id: "email1", 
                            placeholder: "name@example.com",
                            value: formData.email,
                            oninput: (e) => { formData.email = e.target.value }
                        }),
                        m(FormText, {}, "We'll never share your email.")
                    ]),
                    m(FormGroup, {}, [
                        m(FormLabel, { htmlFor: "password1" }, "Password"),
                        m(Input, { 
                            type: "password", 
                            id: "password1", 
                            placeholder: "Password",
                            value: formData.password,
                            oninput: (e) => { formData.password = e.target.value }
                        })
                    ]),
                    m(CodeBlock, { code: `m(FormGroup, {}, [
    m(FormLabel, { htmlFor: "email1" }, "Email address"),
    m(Input, { 
        type: "email", 
        id: "email1", 
        placeholder: "name@example.com",
        value: formData.email,
        oninput: (e) => { formData.email = e.target.value }
    }),
    m(FormText, {}, "We'll never share your email.")
])` })
                ]),

                // Select
                m(ContentSection, {
                    title: "Select",
                    paragraphs: ["Campos de selección:"],
                    alignItems: "flex-start"
                }, [
                    m(FormGroup, {}, [
                        m(FormLabel, { htmlFor: "country1" }, "Country"),
                        m(Select, { 
                            id: "country1",
                            value: formData.country,
                            onchange: (e) => { formData.country = e.target.value; m.redraw() }
                        }, [
                            m(Option, { value: "" }, "Select a country"),
                            m(Option, { value: "es" }, "Spain"),
                            m(Option, { value: "us" }, "United States"),
                            m(Option, { value: "uk" }, "United Kingdom")
                        ])
                    ]),
                    m(CodeBlock, { code: `m(Select, { id: "country1" }, [
    m(Option, { value: "" }, "Select a country"),
    m(Option, { value: "es" }, "Spain"),
    m(Option, { value: "us" }, "United States"),
])` })
                ]),

                // Checks & Radios
                m(ContentSection, {
                    title: "Checks & Radios",
                    paragraphs: ["Checkboxes y radio buttons:"],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "0.5rem", width: "100%", alignItems: "flex-start" }, [
                        m(Text, { fontWeight: "bold" }, "Checkboxes"),
                        m(FormCheck, {}, [
                            m(FormCheckInput, { 
                                type: "checkbox", 
                                id: "check1",
                                checked: formData.remember,
                                onchange: (e) => { formData.remember = e.target.checked; m.redraw() }
                            }),
                            m(FormCheckLabel, { htmlFor: "check1" }, "Remember me")
                        ]),
                        m(Text, { fontWeight: "bold", marginTop: "1rem" }, "Radios"),
                        m(FormCheck, {}, [
                            m(FormCheckInput, { 
                                type: "radio", 
                                id: "radio1", 
                                name: "gender",
                                checked: formData.gender === "male",
                                onchange: () => { formData.gender = "male"; m.redraw() }
                            }),
                            m(FormCheckLabel, { htmlFor: "radio1" }, "Male")
                        ]),
                        m(FormCheck, {}, [
                            m(FormCheckInput, { 
                                type: "radio", 
                                id: "radio2", 
                                name: "gender",
                                checked: formData.gender === "female",
                                onchange: () => { formData.gender = "female"; m.redraw() }
                            }),
                            m(FormCheckLabel, { htmlFor: "radio2" }, "Female")
                        ]),
                        m(Text, { fontWeight: "bold", marginTop: "1rem" }, "Switches"),
                        m(FormCheck, { isSwitch: true }, [
                            m(FormCheckInput, { 
                                type: "checkbox", 
                                id: "switch1",
                                isSwitch: true,
                                checked: formData.notifications,
                                onchange: (e) => { formData.notifications = e.target.checked; m.redraw() }
                            }),
                            m(FormCheckLabel, { htmlFor: "switch1" }, "Enable notifications")
                        ])
                    ]),
                    m(CodeBlock, { code: `// Checkbox
m(FormCheck, {}, [
    m(FormCheckInput, { type: "checkbox", id: "check1", checked, onchange }),
    m(FormCheckLabel, { htmlFor: "check1" }, "Remember me")
])

// Radio
m(FormCheck, {}, [
    m(FormCheckInput, { type: "radio", id: "radio1", name: "gender", checked }),
    m(FormCheckLabel, { htmlFor: "radio1" }, "Male")
])

// Switch
m(FormCheck, { isSwitch: true }, [
    m(FormCheckInput, { type: "checkbox", id: "switch1", isSwitch: true, checked }),
    m(FormCheckLabel, { htmlFor: "switch1" }, "Enable notifications")
])` })
                ]),

                // Range
                m(ContentSection, {
                    title: "Range",
                    paragraphs: ["Input de rango/slider:"],
                    alignItems: "flex-start"
                }, [
                    m(FormGroup, {}, [
                        m(FormLabel, { htmlFor: "range1" }, `Volume: ${formData.range}%`),
                        m(FormRange, { 
                            id: "range1",
                            min: 0,
                            max: 100,
                            value: formData.range,
                            oninput: (e) => { formData.range = e.target.value; m.redraw() }
                        })
                    ]),
                    m(CodeBlock, { code: `m(FormRange, { 
    id: "range1",
    min: 0,
    max: 100,
    value: formData.range,
    oninput: (e) => { formData.range = e.target.value }
})` })
                ]),

                // Input Group
                m(ContentSection, {
                    title: "Input Group",
                    paragraphs: ["Agrupa inputs con addons:"],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", width: "100%" }, [
                        m(InputGroup, {}, [
                            m(InputGroupText, {}, "@"),
                            m(Input, { placeholder: "Username", style: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } })
                        ]),
                        m(InputGroup, {}, [
                            m(Input, { placeholder: "Recipient's username", style: { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }),
                            m(InputGroupText, {}, "@example.com")
                        ]),
                        m(InputGroup, {}, [
                            m(InputGroupText, {}, "$"),
                            m(Input, { type: "number", placeholder: "0.00", style: { borderRadius: 0 } }),
                            m(InputGroupText, {}, ".00")
                        ])
                    ]),
                    m(CodeBlock, { code: `m(InputGroup, {}, [
    m(InputGroupText, {}, "@"),
    m(Input, { placeholder: "Username" })
])` })
                ]),

                // Floating Labels
                m(ContentSection, {
                    title: "Floating Labels",
                    paragraphs: ["Labels que flotan al enfocar o tener valor:"],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", width: "100%" }, [
                        m(FloatingLabel, { label: "Email address", controlId: "floatingEmail" }, [
                            m(Input, { type: "email", id: "floatingEmail", placeholder: "name@example.com" })
                        ]),
                        m(FloatingLabel, { label: "Password", controlId: "floatingPassword" }, [
                            m(Input, { type: "password", id: "floatingPassword", placeholder: "Password" })
                        ])
                    ]),
                    m(CodeBlock, { code: `m(FloatingLabel, { label: "Email address", controlId: "floatingEmail" }, [
    m(Input, { type: "email", id: "floatingEmail", placeholder: "name@example.com" })
])` })
                ]),

                // Validation
                m(ContentSection, {
                    title: "Validation",
                    paragraphs: ["Estados de validación:"],
                    alignItems: "flex-start"
                }, [
                    m(FlexCol, { gap: "1rem", width: "100%" }, [
                        m(FormGroup, {}, [
                            m(FormLabel, { htmlFor: "validInput" }, "Valid input"),
                            m(Input, { id: "validInput", valid: true, value: "Correct value" }),
                            m(FormFeedback, { type: "valid" }, "Looks good!")
                        ]),
                        m(FormGroup, {}, [
                            m(FormLabel, { htmlFor: "invalidInput" }, "Invalid input"),
                            m(Input, { id: "invalidInput", invalid: true, value: "" }),
                            m(FormFeedback, { type: "invalid" }, "Please provide a valid value.")
                        ])
                    ]),
                    m(CodeBlock, { code: `// Valid
m(Input, { valid: true, value: "Correct" })
m(FormFeedback, { type: "valid" }, "Looks good!")

// Invalid
m(Input, { invalid: true })
m(FormFeedback, { type: "invalid" }, "Please provide a value.")` })
                ])
            ])
        }
    }
}
