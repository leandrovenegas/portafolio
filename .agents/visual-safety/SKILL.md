---
name: visual-safety
description: >
  Aplicar cuando se modifiquen estilos, backgrounds, colores de botones, o cualquier
  elemento visual en leandrovenegas.cl. Previene los 3 bugs recurrentes de texto
  invisible, fondos que desaparecen, y componentes que tapan el grid global.
last_updated: 2026-07-14
mode: append-only
---

> REGLA DE EDICIÓN - APPEND-ONLY
> Este archivo nunca se borra ni se reescribe completo. Solo se agrega contenido nuevo.
> Cada regla aquí es GLOBAL Y PERMANENTE: aplica a todos los componentes públicos
> y del admin de forma indefinida, no solo al que originó la regla.
> Si una regla queda obsoleta, márcala como [OBSOLETO - fecha] sin eliminar el texto.
> Antes de guardar, verifica que la versión nueva no tenga menos líneas que la
> anterior; si las tiene, DETENTE y pregunta a Leandro.
> Commit obligatorio: git add .agents/skills/ && git commit -m "chore: update skills"

---

## Bug #1 — Texto de botón invisible

El color del texto DEBE ser explícito, nunca heredado.

```jsx
// Peligroso
<button className="bg-accent">Contáctame</button>

// Seguro
<button className="bg-accent text-white">Contáctame</button>
<button className="bg-white text-gray-900">Contáctame</button>
```

| Fondo del botón | Color de texto obligatorio |
|----------------|---------------------------|
| Oscuro (#121212, #1e1e1e, #2c2c2c, negro) | text-white o #ffffff |
| Accent/acento (#ffcc00, amarillo, vivos) | text-black o #000000 |
| Blanco o claro | text-gray-900 o #111111 |
| Gradiente oscuro | text-white |
| Gradiente claro | text-gray-900 |

---

## Bug #2 — Fondos que desaparecen

Si se modifica el background de un elemento, verificar padre y hermanos.

```jsx
// Peligroso
<section>
  <div style={{ background: backgroundColor }}>...</div>
</section>

// Seguro
<section style={{ background: 'var(--ps-bg-app, #121212)' }}>
  <div style={{ background: backgroundColor || '#121212' }}>...</div>
</section>
```

Siempre usar fallback en variables CSS: `var(--ps-bg-panel, #2c2c2c)`

---

## Bug #3 — Componentes públicos tapan el grid global

```css
body {
  background-color: #0D0D0D;
  background-image:
    linear-gradient(#1a1a1a 1px, transparent 1px),
    linear-gradient(90deg, #1a1a1a 1px, transparent 1px);
  background-size: 40px 40px;
  background-attachment: fixed;
}
```

Los componentes públicos NO deben tener background sólido en su contenedor raíz
a menos que sea intencional.

```jsx
// Tapa el grid
<section className="bg-black w-full">...</section>

// Transparente
<section className="w-full">...</section>

// Intencional
<section className="page-builder-block w-full" style={{ background: backgroundColor }}>
```

Excepción: el admin (`/admin/*`, `/dashboard/*`) PUEDE y DEBE tener fondos sólidos.

---

## Checklist visual antes de entregar cualquier cambio

- Todos los botones tienen color de texto explícito
- Todos los background tienen valor fallback
- Si se modificó el fondo de un elemento, se verificaron padre y hermanos
- Los componentes públicos nuevos no tapan el grid global del body
- El admin mantiene sus fondos sólidos intactos

---

## Paleta del sitio público

| Uso | Valor |
|-----|-------|
| Fondo base | #0D0D0D |
| Fondo de sección | transparent |
| Fondo con color intencional | prop backgroundColor |
| Acento principal | #ffcc00 |
| Texto principal | #ffffff |
| Texto secundario | rgba(255,255,255,0.8) |
| Borde sutil | rgba(255,255,255,0.1) |
| Texto sobre acento amarillo | #000000 |
| Texto sobre fondo oscuro | #ffffff |

---

## Registro de cambios (agregar al final, nunca borrar entradas anteriores)

| Fecha | Cambio |
|-------|--------|
| 2026-07-14 | Se agrega regla append-only y aclaración de alcance global/permanente. Sin cambios de contenido técnico. |
