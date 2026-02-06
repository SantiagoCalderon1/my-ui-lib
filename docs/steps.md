### 1. **Definir el alcance y objetivos**

-   Decide **qué problema vas a resolver** y por qué la librería es necesaria.
    -   No encuentro librería de componentes diseñadas para mithril.js
-   Determina si será solo componentes visuales, también comportamiento, o ambos.
    -   La idea es que sean ambos, visualmente simples pero que se pueda interacturar

---

### 2. **Inspiración y benchmarking**

-   Revisa librerías existentes como **Bootstrap, Tailwind UI, Bulma** o **Material UI**.
    -   En primera instancia me inspiraré en los hechos por Bootstrap que que son los que conozco y alguna vez he usado, además, me inspiraré en al interfaz de React Email, Bulma, MUI
-   Analiza qué funciona bien, qué le falta y qué podrías mejorar o simplificar.
    -   La idea principal es simplicar las clases y no hacer muchas posibilidades de configuración para los componentes

---

### 3. **Seleccionar componentes iniciales**

-   Lista los componentes que vas a incluir primero (Botones, Modales, Dropdowns, Tooltips, Sliders).
    -   En el fichero list-components.txt estará listados y ordenados en función de la prioridad
-   Prioriza los más útiles o más demandados.
    -   Cards, botónes, dropdown, contenedores, grid, etc. Más en list-compontents.txt

---

### 4. **Diseño de componentes y UX**

-   Define **cómo se verán y cómo se usarán** los componentes.
    -   Serán 100% responsive, la configuración y contenido se enviará por attrs
-   Decide nombres de clases, estructura HTML/JSX y estados interactivos (hover, activo, deshabilitado).
    -   Copiaré las clases de bootstrap (dejando las más importantes) y los estados igual.
-   Es recomendable hacer **wireframes o mockups** aunque sean simples.
    -   Tendrán su versión de sketeletons

---

### 5. **Planeación de la arquitectura**

-   Define estructura de carpetas:

```
/src
```

-   Decide cómo se manejarán **estilos**: CSS modular, SCSS, o CSS-in-JS.
    -   Inyectaré cada css directamente en el componente creando la etiqueta style y colocando las clases
-   Determina cómo los componentes **exportarán su funcionalidad**.
    -   **UMD**: para uso en navegador con `<script>`.
        
    -   **ES Module**: para `import { Button } from "mi-lib"`.
        

---

### 6. **Configuración del proyecto**

-   Inicializa npm (`npm init`).
-   Instala **Mithril** y dependencias de desarrollo (Rollup o Vite, PostCSS/SCSS si usás).
-   Configura **control de versiones** con Git.

---

### 7. **Programación de los componentes**

-   Crea cada componente como **módulo independiente** exportable.
-   Implementa **interactividad con Mithril**, estados internos y eventos.
-   Aplica estilos coherentes con tu diseño.
-   Testea cada componente de forma aislada.

---

### 8. **Integración y pruebas**

-   Monta ejemplos completos con varios componentes juntos.
-   Verifica compatibilidad entre componentes y **comportamiento en diferentes navegadores**.
-   Ajusta estilo, comportamiento y consistencia de la librería.

---

### 9. **Documentación**

-   Prepara **ejemplos de uso** y explicación de props/atributos de cada componente.
-   Incluye un **README** con instalación, importación y ejemplos prácticos.
-   Opcional: generar un sitio demo o Storybook.

---

### 10. **Empaquetado (bundle)**

-   Configura Rollup o Vite para generar:
    
    -   **UMD**: para uso en navegador con `<script>`.
    -   **ES Module**: para `import { Button } from "mi-lib"`.
-   Minifica y optimiza los archivos para producción.
    

---

### 11. **Preparación de `package.json`**

-   Define `"main"`, `"module"`, `"files"` y `"peerDependencies"` (Mithril).
-   Agrega scripts de build y test.

---

### 12. **Publicación**

-   Inicia sesión en **npm** (`npm login`).
-   Ejecuta `npm publish`.
-   Ahora otros pueden instalar tu librería con `npm install tu-lib`.

---

### 13. **Mantenimiento**

-   Actualiza componentes según feedback.
-   Corrige bugs, añade features y mantiene compatibilidad con nuevas versiones de Mithril.
-   Considera **versionado semántico (SemVer)**.