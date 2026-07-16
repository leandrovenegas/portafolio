---
name: component-architecture
description: >
  Aplicar SIEMPRE al crear, editar o revisar cualquier componente React del proyecto
  leandrovenegas.cl. Cubre: estructura de props, textos editables, sistema de estilos
  responsivos (_styles), breakpoints, y la conexión con el editor visual.
last_updated: 2026-07-14
mode: append-only
---

> REGLA DE EDICIÓN - APPEND-ONLY
> Este archivo nunca se borra ni se reescribe completo. Solo se agrega contenido nuevo.
> Si una regla queda obsoleta, márcala como [OBSOLETO - fecha] sin eliminar el texto.
> Antes de guardar, verifica el número de líneas actual del archivo; si la versión
> nueva tiene menos líneas que la anterior, DETENTE y pregunta a Leandro.
> Todo cambio se commitea junto al código que lo motivó:
> git add .agents/skills/ && git commit -m "chore: update skills"

---

# Arquitectura de Componentes - leandrovenegas.cl

## El contexto del editor visual

El sitio tiene un page builder en /admin/editor?slug=[page]. Funciona así:
- Componentes arrastrables y reordenables en canvas
- Panel derecho con inputs de propiedades para editar cada campo
- El canvas hace preview en tiempo real con forceBp para simular breakpoints
- Los textos NO se editan inline, se editan mediante inputs en el panel lateral

Por eso todo texto visible DEBE ser una prop.

---

## Regla 1 - Todo texto es prop con default

```jsx
// Correcto
export default function HeroSection({
  title = "Tu título aquí",
  subtitle = "Tu subtítulo aquí",
  ctaLabel = "Hablemos",
  ctaHref = "https://wa.me/56988804299"
}) { ... }

// Incorrecto
export default function HeroSection() {
  return <h1>Tu título aquí</h1>  // no editable desde el panel
}
```

Qué convierte en prop: títulos, subtítulos, párrafos, labels, textos de botones/CTAs, URLs, alt text, cualquier string visible.

---

## Regla 2 - Sistema _styles para tipografía responsiva

```js
_styles = {
  title: {
    mobile:  { fontSize, color, fontWeight, fontStyle, fontFamily, textAlign,
               textTransform, letterSpacing, lineHeight, textDecoration,
               textIndent, paddingTop, paddingBottom },
    tablet:  { /* mismas keys */ },
    desktop: { /* mismas keys */ }
  },
  description: { mobile: {}, tablet: {}, desktop: {} }
}
```

Función helper (copiar literal en cada componente):

```js
function toInlineStyle(styleObj) {
  if (!styleObj) return {};
  const s = {};
  if (styleObj.fontSize)       s.fontSize       = `${styleObj.fontSize}px`;
  if (styleObj.color)          s.color          = styleObj.color;
  if (styleObj.fontWeight)     s.fontWeight     = styleObj.fontWeight;
  if (styleObj.fontStyle)      s.fontStyle      = styleObj.fontStyle;
  if (styleObj.fontFamily)     s.fontFamily     = styleObj.fontFamily;
  if (styleObj.textAlign)      s.textAlign      = styleObj.textAlign;
  if (styleObj.textDecoration) s.textDecoration = styleObj.textDecoration;
  if (styleObj.textTransform && styleObj.textTransform !== 'none')
    s.textTransform = styleObj.textTransform;
  if (styleObj.letterSpacing !== undefined && styleObj.letterSpacing !== '')
    s.letterSpacing = `${styleObj.letterSpacing}em`;
  if (styleObj.lineHeight !== undefined && styleObj.lineHeight !== '') {
    s.lineHeight = styleObj.lineHeight;
    if (Number(styleObj.lineHeight) < 0) {
      s.marginTop = `${styleObj.lineHeight}em`;
      s.lineHeight = 'normal';
    }
  }
  if (styleObj.textIndent !== undefined && styleObj.textIndent !== '')
    s.textIndent = `${styleObj.textIndent}px`;
  if (styleObj.paddingTop !== undefined && styleObj.paddingTop !== '')
    s.paddingTop = `${styleObj.paddingTop}px`;
  if (styleObj.paddingBottom !== undefined && styleObj.paddingBottom !== '')
    s.paddingBottom = `${styleObj.paddingBottom}px`;
  return s;
}
```

Detección de breakpoint (copiar literal):

```js
const [bp, setBp] = useState(forceBp || 'mobile');

useEffect(() => {
  if (forceBp) { setBp(forceBp); return; }
  const check = () => {
    const w = window.innerWidth;
    setBp(w >= 1024 ? 'desktop' : w >= 768 ? 'tablet' : 'mobile');
  };
  check();
  window.addEventListener('resize', check);
  return () => window.removeEventListener('resize', check);
}, [forceBp]);

const fieldStyle = (fieldName) => {
  if (!_styles || !_styles[fieldName]) return {};
  return toInlineStyle(_styles[fieldName][bp]);
};
```

Aplicar en JSX (data-field obligatorio):
```jsx
<h2 data-field="title"       style={fieldStyle('title')}>{title}</h2>
<p  data-field="description" style={fieldStyle('description')}>{description}</p>
```

---

## Regla 3 - textTransform NUNCA en Tailwind

```jsx
// ❌ <h1 className="uppercase">{title}</h1>
// ✅ <h1 data-field="title" style={fieldStyle('title')}>{title}</h1>
```

---

## Props estándar de todo componente

```jsx
export default function MiComponente({
  title = "Título por defecto",
  description = "Descripción por defecto",
  _styles,
  forceBp = null,
}) { ... }
```

| Prop | Tipo | Descripción |
|------|------|-------------|
| _styles | object | Estilos tipográficos por campo y breakpoint |
| forceBp | 'mobile'\|'tablet'\|'desktop'\|null | Fuerza breakpoint para preview |
| Todos los textos | string | Con valor default siempre |

---

## Componentes con video (referencia: HeroVideo.jsx)

```jsx
export default function HeroVideo({
  mobileVideoGuid, tabletVideoGuid, desktopVideoGuid,
  posterSrc = '', alt = 'Video', title = '', description = '',
  backgroundType = 'video',
  backgroundColor = '#121212',
  backgroundGradient = 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)',
  forceBp = null, _styles, children,
})
```

---

## Plantilla base de componente nuevo

```jsx
'use client';
import { useState, useEffect } from 'react';

function toInlineStyle(styleObj) { /* copiar función completa de arriba */ }

export default function NombreComponente({
  title = "Título por defecto",
  description = "Descripción por defecto",
  _styles,
  forceBp = null,
}) {
  const [bp, setBp] = useState(forceBp || 'mobile');

  useEffect(() => {
    if (forceBp) { setBp(forceBp); return; }
    const check = () => {
      const w = window.innerWidth;
      setBp(w >= 1024 ? 'desktop' : w >= 768 ? 'tablet' : 'mobile');
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [forceBp]);

  const fieldStyle = (fieldName) => {
    if (!_styles || !_styles[fieldName]) return {};
    return toInlineStyle(_styles[fieldName][bp]);
  };

  return (
    <section className="w-full">
      <h2 data-field="title" style={fieldStyle('title')}>{title}</h2>
      <p  data-field="description" style={fieldStyle('description')}>{description}</p>
    </section>
  );
}
```

---

## Checklist antes de entregar un componente

- Todos los strings visibles son props con defaults
- Incluye toInlineStyle sin modificaciones
- Incluye detección de breakpoints con forceBp
- Cada elemento de texto tiene data-field y style={fieldStyle('...')}
- Ningún texto usa className de Tailwind para uppercase, tracking-*, etc.
- El componente funciona sin pasar ninguna prop (solo defaults)
- Los botones tienen color explícito para legibilidad sobre el fondo

---

## [PENDIENTE DE VALIDAR - 2026-07-14]

La versión anterior de este skill incluía una sección "Limitaciones Técnicas y
Decisiones de Arquitectura" que describía: app/lib/supabase.ts, AppContext.tsx
con React Context, next-auth, Zod validators en /api/validators/*.ts, webhook
de Mercado Pago en /api/webhooks/mercadopago.ts, Calendly en utils/calendly.ts.

Esta sección fue removida porque no se pudo confirmar que exista en el código
real del proyecto (no coincide con lo verificado en Supabase ni con el resto
de los skills). Si alguna de estas piezas SÍ existe, avisar a Leandro para
restaurarla aquí con la ruta de archivo exacta verificada en el repo —
no reescribir de memoria.

---

## Registro de cambios (agregar al final, nunca borrar entradas anteriores)

| Fecha | Cambio |
|-------|--------|
| 2026-07-14 | Se agrega regla append-only. Se remueve sección de stack técnico no verificada (ver bloque arriba). |
| 2026-07-14 | Migración a canvas libre (Photoshop style) iniciada. Se establece el uso de `_layout` en todos los componentes y se reemplaza el apilamiento vertical (`calculateNextAvailablePosition` en `treeHelpers.js` queda marcado como obsoleto). En `GridEditor.jsx` se habilita `allowOverlap={true}` y se lee/escribe el layout desde `_layout.{bp}` aplicando `zIndex` vía inline styles. |
| 2026-07-14 | Se implementa Toolbox y Drop Externo. Se crea `ToolboxPanel.jsx` leyendo de `COMPONENT_DEFINITIONS` y se reemplaza el dropdown en `page.js`. En `GridEditor.jsx` se configura la API v2 de `react-grid-layout` (`dropConfig` y `onDrop`) usando las coordenadas del evento para ubicar el elemento insertado con `insertComponentIntoParent()`. |
| 2026-07-14 | FASE 5 completada. Se sobreescribe `.react-grid-placeholder` en `globals.css` para respetar tema oscuro (`--ps-accent-dim`, `--ps-border-focus`). En `GridEditor.jsx` se añade etiqueta de `Capa N` en el badge amarillo al seleccionar, y una nueva etiqueta semitransparente que revela el nombre del componente en hover (si no está seleccionado). |
| 2026-07-14 | Corrección FASE 5: Se reemplazan clases utilitarias de Tailwind (`bg-s3/90`, `text-mid`) en el tag de hover por el uso estricto de variables del sistema Photoshop UI (`--ps-bg-tooltip`, `--ps-text-dim`, `--ps-border-light`) mediante estilos inline para cumplir con las reglas del sistema de diseño. |
| 2026-07-14 | FASE 6 (Panel de Capas): Se extiende `StructureTree.jsx` para actuar como panel de capas estilo Photoshop. Se ordena visualmente de arriba hacia abajo usando `_layout.{bp}.zIndex` descendente. Se integra un botón de visibilidad (ojito) conectado a `_layout.{bp}.hidden` por breakpoint. Se añade función `recalculateZIndices` en `treeHelpers.js` para asegurar que el reordenamiento visual asigne valores consecutivos sin huecos (basado en la longitud del array tras el `onMove`). En `GridEditor.jsx` se respeta la visibilidad inyectando `opacity: 0, pointerEvents: 'none', visibility: 'hidden'` cuando `hidden` es verdadero. |
| 2026-07-14 | CIERRE DE MIGRACIÓN (Resumen): La migración desde el sistema de apilamiento vertical al nuevo "Photoshop Style Free Canvas" se ha completado en 6 fases. 1) Auditoría de arquitectura comprobando dependencias y react-grid-layout v2. 2) Inyección y uso del esquema de datos libre `_layout` en lugar de apilamiento vertical. 3) Interfaz de Drag and Drop habilitada permitiendo superposición nativa. 4) Se integró Toolbox Panel lateral para inyección de nuevos componentes mediante drag-and-drop externo nativo (HTML5 + RGL v2 API). 5) Implementación de feedback visual incluyendo Hover tags, indicadores de capas (zIndex) en badges, y personalización del placeholder de RGL usando estrictamente tokens de `design-tokens.css`. 6) Conversión del árbol de estructura a un Panel de Capas ordenado por z-index con soporte para ocultar capas por breakpoint. Todo el sistema actual opera 100% como un canvas de diseño visual. |
| 2026-07-15 | FIX 1: PageRenderer.jsx, fallback _layout/layout (commit 618a9bc). FIX 2: GridEditor.jsx, corregido mismatch de argumentos en onLayoutChange/handleGridLayoutChange que causaba pérdida de _layout en la grilla raíz (commit 5dcffd1). |
| 2026-07-15 | Separación de "Guardar" (persistencia, borrador) y "Publicar" (activa en público) en el Page Builder. Se elimina `is_active: true` forzado en `saveVersion()` y se añade botón explícito "Publicar versión" con confirmación UI (`window.confirm`) que llama a `publishVersion()` (`PATCH` a `route.js`). |
| 2026-07-15 | FIX UI Header: Se extrae el bloque "Crear Rama" del header sticky principal (que forzaba un flex-col y causaba desbordamiento/superposición sobre el canvas) moviéndolo a una barra de herramientas secundaria, no-sticky, justo debajo del header. |
| 2026-07-15 | Se añade Debugger Visual de Grid en `GridEditor.jsx` con overlay CSS Grid y un toggle en `page.js`. Se implementa `draggableHandle` para `react-grid-layout`, limitando el drag de componentes de texto a un ícono en `AvatarTextSection.jsx` y asignando la clase `.drag-handle` al contenedor raíz del resto de los componentes. |
| 2026-07-15 | Se crea primitivo `Button` basado en `Container.jsx` y estilos visuales heredados de CTA (texto contentEditable interactivo + drag-handle + a.href). Se añade soporte para `instanceId` único en duplicación (`treeHelpers.js`) y se registra componente en `registry.js`. |
| 2026-07-15 | FIX: Arrastrar desde el ToolboxPanel. Se añade `onDropComponent` en `GridEditor` (`page.js`) y se modifica `performMove` en `treeHelpers.js` para detectar drops de *tipos de componente* desde el Toolbox (vs IDs de componentes existentes), instanciando e insertando el componente con `defaultProps`. Se corrige la altura fija desproporcionada del panel de Capas (`StructureTree`), haciéndolo responsivo al contenido (`max-h-[400px]`, `overflow-y-auto`). |
| 2026-07-15 | FIX: Renderizado de Canvas. Se corrige prop errónea `registry={COMPONENT_DEFINITIONS}` a `registry={COMPONENT_REGISTRY}` en `GridEditor` (`page.js`), resolviendo el error "Componente no encontrado". Se mueven estilos CSS en `Button.jsx` desde el wrapper hacia el propio `<a className="button">` y se actualiza `registry.js` para usar `var(--ps-accent)` en su color nativo por defecto, junto con su respectiva inclusión en `propsConfig`. Se retira `max-h-[400px]` en panel de Capas, confiando en el overflow padre. |