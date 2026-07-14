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