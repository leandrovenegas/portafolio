# Skill: Photoshop UI Style System

## Descripción (trigger de activación)
Aplica este skill automáticamente cada vez que el agente vaya a:
- Crear, editar o revisar cualquier archivo CSS
- Crear o modificar un componente visual o de layout
- Trabajar con paneles, toolbars, inputs, botones o cualquier elemento UI
- Responder a palabras clave: "estilos", "diseño", "UI", "panel", "toolbar", "aspecto", "color", "layout", "componente"

---

## Regla principal (obligatoria)
NUNCA uses valores CSS hardcodeados para colores, espaciados o tipografía.
Todos los valores visuales DEBEN venir de las variables en `references/design-tokens.css`.
Si necesitas un valor que no existe en las variables, PREGUNTA antes de inventarlo.

---

## Estética objetivo: Adobe Photoshop CC — Dark Mode

La interfaz replica el entorno de trabajo de Photoshop CC con tema oscuro:
- Fondos oscuros en capas (#1e1e1e → #2c2c2c → #3c3c3c)
- Contraste manejado, nunca extremo (no negro puro, no blanco)
- Acento azul corporativo Adobe (#1473e6)
- Tipografía pequeña y densa (11–13px), sin serif
- Bordes sutiles y consistentes (1px, sin sombras decorativas)
- Radio mínimo (2px máximo en UI chrome)
- Sensación de herramienta profesional, no de app web genérica

---

## Restricciones absolutas (no negociables)

### Colores
- ❌ NO uses: white, #fff, #f5f5f5, #fafafa, ni ningún fondo > #666
- ❌ NO uses: black, #000, #111 como color de texto
- ✅ USA: variables --ps-* de design-tokens.css

### Bordes y radios
- ❌ NO uses: border-radius mayor a 3px en elementos de UI chrome
- ❌ NO quites: bordes de inputs (siempre necesitan borde visible)
- ✅ USA: var(--ps-radius) = 2px como máximo

### Sombras
- ❌ NO uses: box-shadow con colores claros o blurs mayores a 12px
- ✅ PERMITIDO: rgba(0,0,0,0.5) para sombras funcionales (menús flotantes)

### Layout de paneles
- ❌ NO cambies: ancho de paneles laterales (--panel-left-width / --panel-right-width)
- ❌ NO muevas: el toolbar de su posición fija
- ✅ PUEDES: modificar contenido dentro de los paneles

### Variables
- ❌ NO inventes variables nuevas sin aprobación
- ✅ PROPÓN: si crees que falta una variable, sugiérela antes de crearla

---

## Anatomía de componentes clave

### Botón secundario (UI chrome)
```css
height: 24px;
padding: 0 8px;
background: var(--ps-bg-toolbar);
border: 1px solid var(--ps-border);
border-radius: var(--ps-radius);
color: var(--ps-text);
font-size: var(--font-size-sm);
cursor: pointer;
```

### Botón primario (acción)
```css
background: var(--ps-accent);
border: none;
color: #fff;
/* resto igual al secundario */
```

### Input de texto
```css
height: 22px;
padding: 0 6px;
background: var(--ps-bg-input);
border: 1px solid var(--ps-border-light);
border-radius: var(--ps-radius);
color: var(--ps-text);
font-size: var(--font-size-sm);
```

### Panel lateral
```css
background: var(--ps-bg-panel);
border-right: 1px solid var(--ps-border);
width: var(--panel-left-width);
height: 100%;
overflow-y: auto;
```

### Separador de sección
```css
border-top: 1px solid var(--ps-border-dark);
margin: var(--sp-sm) 0;
```

---

## Fondo Global del Proyecto (Cuadrícula Fija)
El sitio público utiliza un fondo global (cuadrícula/grid) que debe ser siempre visible. Cualquier bloque de contenido público debe tener fondos transparentes para que el grid sea visible:

```css
body {
  background-color: #0D0D0D !important;
  background-image: 
    linear-gradient(#1a1a1a 1px, transparent 1px), 
    linear-gradient(90deg, #1a1a1a 1px, transparent 1px) !important;
  background-size: 40px 40px !important;
  background-attachment: fixed !important;
}
```

### Reglas para Componentes Públicos:
- Todo nuevo componente o sección agregada para la parte pública (ej. `TituloAnimado`, `TextosAnimados`, `HeroEditorialSection`, etc.) DEBE llevar la clase `.page-builder-block` en su contenedor raíz más externo o ser configurado con fondo transparente en `app/globals.css`.
- El panel de administración (`.admin-main` o páginas dentro de `/admin`) debe mantener sus fondos sólidos intactos para garantizar la legibilidad y operatividad de la interfaz Photoshop UI.

---

## Referencias
- `references/design-tokens.css` — todas las variables CSS (fuente de verdad)
- `references/PROHIBICIONES.md` — casos edge y ejemplos de lo que NO hacer