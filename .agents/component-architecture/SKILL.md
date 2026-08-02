---
name: component-architecture
description: >
  Aplicar SIEMPRE al crear, editar o revisar cualquier componente React del proyecto
  leandrovenegas.cl. Cubre: estructura de props, textos editables, sistema de estilos
  responsivos (_styles), breakpoints, y la conexión con el editor visual.
  Si el agente va a escribir un componente .jsx o .tsx, debe leer este skill primero.
---

# Arquitectura de Componentes — leandrovenegas.cl

## El contexto del editor visual

El sitio tiene un **page builder** en `/admin/editor?slug=[page]`.
Funciona así:
- Componentes arrastrables y reordenables en canvas
- Panel derecho con **inputs de propiedades** para editar cada campo
- El canvas hace preview en tiempo real con `forceBp` para simular breakpoints
- **Los textos NO se editan inline** — se editan mediante inputs en el panel lateral

Por eso, **todo texto visible DEBE ser una prop**. Si no es prop, no aparece en el panel
y el usuario no puede editarlo sin tocar código.

---

## Regla #1 — Todo texto es prop con default

### ✅ Correcto
```jsx
export default function HeroSection({
  title = "Tu título aquí",
  subtitle = "Tu subtítulo aquí",
  ctaLabel = "Hablemos",
  ctaHref = "https://wa.me/56988804299"
}) { ... }
```

### ❌ Incorrecto
```jsx
export default function HeroSection() {
  return <h1>Tu título aquí</h1>  // no editable desde el panel
}
```

### Qué convierte en prop
- Títulos, subtítulos, párrafos, labels
- Textos de botones y CTAs
- URLs de botones y links
- Alt text de imágenes
- Cualquier string visible en pantalla

---

## Regla #2 — Sistema `_styles` para tipografía responsiva

Todos los componentes con texto aceptan `_styles` para controlar
tipografía por breakpoint desde el editor visual.

### Estructura de `_styles`
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

### Función helper — copiar literal en cada componente
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

### Detección de breakpoint — copiar literal
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

### Aplicar en JSX
```jsx
// Atributo data-field obligatorio — el editor lo usa para identificar el campo
<h2 data-field="title"       style={fieldStyle('title')}>{title}</h2>
<p  data-field="description" style={fieldStyle('description')}>{description}</p>
```

---

## Regla #3 — textTransform NUNCA en Tailwind

El editor controla mayúsculas/minúsculas desde `_styles.textTransform`.
Si se hardcodea en Tailwind, el usuario no puede cambiarlo.

```jsx
// ❌ Incorrecto
<h1 className="uppercase">{title}</h1>

// ✅ Correcto
<h1 data-field="title" style={fieldStyle('title')}>{title}</h1>
```

---

## Props estándar de todo componente

```jsx
export default function MiComponente({
  // — textos (uno por campo visible) —
  title = "Título por defecto",
  description = "Descripción por defecto",
  // — control del editor —
  _styles,
  forceBp = null,
}) { ... }
```

| Prop | Tipo | Descripción |
|------|------|-------------|
| `_styles` | object | Estilos tipográficos por campo y breakpoint |
| `forceBp` | `'mobile'\|'tablet'\|'desktop'\|null` | Fuerza breakpoint para preview del editor |
| Todos los textos | string | Con valor default siempre |

---

## Componentes con video (referencia: HeroVideo.jsx)

Los componentes con video siguen el mismo patrón pero añaden:

```jsx
export default function HeroVideo({
  mobileVideoGuid,
  tabletVideoGuid,
  desktopVideoGuid,
  posterSrc = '',
  alt = 'Video',
  title = '',
  description = '',
  backgroundType = 'video',     // 'video' | 'solid' | 'gradient'
  backgroundColor = '#121212',
  backgroundGradient = 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)',
  forceBp = null,
  _styles,
  children,
})
```

- `backgroundType` controla qué se muestra (video HLS, color sólido, o gradiente)
- Los GUIDs de Bunny CDN son editables desde el panel
- `children` permite anidar contenido de texto sobre el video

---

## Plantilla base de componente nuevo

```jsx
'use client';
import { useState, useEffect } from 'react';

function toInlineStyle(styleObj) {
  // ... (copiar función completa de arriba)
}

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

- [ ] ¿Todos los strings visibles son props con defaults?
- [ ] ¿Incluye `toInlineStyle` sin modificaciones?
- [ ] ¿Incluye detección de breakpoints con `forceBp`?
- [ ] ¿Cada elemento de texto tiene `data-field` y `style={fieldStyle('...')}`?
- [ ] ¿Ningún texto usa `className` de Tailwind para `uppercase`, `tracking-*`, etc.?
- [ ] ¿El componente funciona sin pasar ninguna prop (solo defaults)?
- [ ] ¿Los botones tienen `color` explícito para que el texto sea legible sobre el fondo?

## Limitaciones Técnicas y Decisiones de Arquitectura
### Stack y patrones
- **Next.js App Router**: todas las páginas usan el nuevo `app/` directory, soporta server components y streaming.
- **Supabase**: cliente está inicializado en `app/lib/supabase.ts` y se reutiliza vía React context.
- **Estado global**: se gestiona con `React.createContext` en `app/context/AppContext.tsx`; incluye usuario, carrito y datos del funnel.
- **Routing dinámico**: rutas como `/videos/[slug]` utilizan `generateStaticParams` y `fetch` con revalidación incremental.
- **Middleware**: `middleware.js` protege rutas del admin y verifica sesiones JWT.

### Interacción con APIs
- **Supabase RPC**: funciones como `rpc('get_products')` se usan para precios; los resultados incluyen IVA calculado en el servidor.
- **Webhook de Mercado Pago**: definido en `/api/webhooks/mercadopago.ts`, valida firmas y actualiza tabla `orders`.
- **Calendly embed**: se inserta vía script externo; se manejan callbacks en `utils/calendly.ts`.

### Gestión de Estado y Caching
- **React Query (tanstack)** no está incluido; se usa el caché de fetch con `revalidate` y `Cache-Control` en headers.
- **Persistencia**: datos críticos (tokens, carrito) se guardan en `localStorage` y se hidratan en `useEffect` del provider.

### Seguridad y Buenas Prácticas
- **Cabeceras CSP** definidas en `next.config.mjs`.
- **Protección CSRF** en API routes mediante `next-auth` session tokens.
- **Validación de entrada** con Zod schemas en `/api/validators/*.ts`.

## Checklist Técnica (añadida)
- [ ] ¿Todas las llamadas a Supabase usan `await supabase.from(...).select()` con manejo de errores?
- [ ] ¿Los parámetros de rutas dinámicas están validados con Zod antes de la consulta?
- [ ] ¿Las respuestas de API incluyen encabezados `Cache-Control` apropiados?
- [ ] ¿Los componentes críticos usan `React.memo` cuando corresponda?

---

## Historial de Cambios

| Fecha | Cambio |
|---|---|
| 2026-08-02 | Rediseño de `HeroEditorialSection` a formato tarjeta credencial/badge de staff (foto + nombre + rol + estado disponible). Inclusión de props `roleText`, `statusText`, `statusColor`, integración con `SmartPropertiesPanel.jsx`, `registry.js`, `defaultConfig.js` y uso de CSS Grid nativo con `grid-template-areas`. |
| 2026-08-02 | Ajustes visuales en `HeroEditorialSection`: actualización de copy principal ("GRABO Y EDITO TUS VIDEOS DURANTE TODO UN MES..."), cinta lanyard en forma de V centrada sobre la credencial con overflow hacia arriba y micro-interacción hover sutil mediante transform de bajo contraste. |
