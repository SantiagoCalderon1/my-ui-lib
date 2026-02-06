/* 
    URL para importar mithril.js desde https://digitalvalue.es/
    <!-- Mithril.js -->
    <script src="https://components.digitalvalue.es/lib/mithril.min.js"></script>
*/

/* 
    Importa la función Base del módulo correspondiente.
    `Base` es un componente Mithril que maneja su ciclo de vida completo.
*/
import { Base } from "module";
import { FlexCol } from "./layout";

/* 
    Exporta el componente Base para poder usarlo en otros módulos.
*/
export { Base };


/*
Ciclo de vida de un componente Mithril:

1. oninit({ attrs, children }): Se ejecuta una sola vez al inicializar el componente.
    Se usa para inicializar variables internas y preparar estados.
    - attrs: atributos pasados al componente.
    - children: nodos hijos del componente.

2. oncreate({ dom, attrs, children }): Se ejecuta después de que el componente se monta en el DOM.
    Útil para manipulación directa del DOM o inicialización de librerías externas.

3. onbeforeupdate({ dom, attrs, children }): Se ejecuta antes de cada actualización.
    Retornar true permite renderizar de nuevo; false cancela la actualización.

4. onupdate({ dom, attrs, children }): Se ejecuta después de cada actualización.
    Se usa para sincronizar el DOM o ejecutar efectos secundarios.

5. onbeforeremove({ dom, attrs, children }): Se ejecuta antes de que el componente sea eliminado.
    Puede devolver una promesa para animaciones de salida.

6. onremove({ dom, attrs, children }): Se ejecuta después de que el componente se ha eliminado del DOM.
    Ideal para limpiar timers, listeners u otros recursos externos.

7. view({ attrs, children }): Renderiza el Virtual DOM del componente.
    Se llama en la inicialización y cada vez que se actualiza.
    - attrs: atributos pasados al componente.
    - children: nodos hijos del componente.
*/
    
function BaseCompleted() {
    let a, b, c;
    return {
        oninit: ({ attrs, children }) => {
            const { aa, bb, cc } = attrs;
            a = aa;
            b = bb;
            c = cc;
            // Inicialización de estados internos si es necesario
        },
        oncreate: ({ dom, attrs, children }) => {
            // Código a ejecutar después de que el componente se monte en el DOM
        },
        onbeforeupdate: ({ dom, attrs, children }) => {
            // Decidir si se debe volver a renderizar
            return true; // true = actualizar, false = no actualizar
        },
        onupdate: ({ dom, attrs, children }) => {
            // Código que se ejecuta después de cada actualización
        },
        onbeforeremove: ({ dom, attrs, children }) => {
            // Código que se ejecuta antes de que el componente sea removido
            // Puede devolver una promesa si quieres animaciones de salida
        },
        onremove: ({ dom, attrs, children }) => {
            // Limpieza final, listeners, timers, etc.
        },
        view: ({ attrs, children }) => {
            return m("div", {}, [
                // contenido aquí
            ]);
        }
    }
}

function Base() {
    let a, b, c;
    return {
        oninit: ({ attrs, children }) => {
            const { aa, bb, cc } = attrs;
            a = aa;
            b = bb;
            c = cc;
            // Inicialización de estados internos si es necesario
        },
        view: ({ attrs, children }) => {
            return m(FlexCol, {}, [
                // contenido aquí
            ]);
        }
    }
}
