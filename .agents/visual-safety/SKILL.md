---
name: visual-safety
description: >
  Aplicar cuando se modifiquen estilos, backgrounds, colores de botones, o cualquier
  elemento visual en leandrovenegas.cl. Previene los 3 bugs recurrentes:
  (1) texto de botones invisible sobre su fondo,
  (2) fondos que desaparecen al hacer cambios parciales,
  (3) componentes públicos que tapan el grid de fondo global.
  Si el agente toca CSS, Tailwind, o estilos inline de cualquier componente, leer este skill.
---

# Visual Safety — leandrovenegas.cl

## Los 3 bugs que SIEMPRE hay que prevenir

---

### Bug #1 — Texto de botón invisible

Cuando se crea o modifica un botón, el color del texto DEBE ser explícito.
Nunca asumir que el color heredará correctamente.

```jsx
// ❌ Peligroso — el texto puede heredar color del fondo y volverse invisible
<button className="bg-accent">Contáctame</button>

// ✅ Seguro — color siempre explícito
<button className="bg-accent text-white">Contáctame</button>
<button className="bg-white text-gray-900">Contáctame</button>
```

#### Regla de contraste mínimo por fondo de botón

| Fondo del botón | Color de texto obligatorio |
|----------------|---------------------------|
| Oscuro (`#121212`, `#1e1e1e`, `#2c2c2c`, negro) | `text-white` o `color: #ffffff` |
| Accent/acento (`#ffcc00`, amarillo, colores vivos) | `text-black` o `color: #000000` |
| Blanco o claro | `text-gray-900` o `color: #111111` |
| Gradiente oscuro | `text-white` |
| Gradiente claro | `text-gray-900` |

---

### Bug #2 — Fondos que desaparecen

Cuando se hace un cambio parcial en un componente, los fondos de secciones
adyacentes o padres pueden quedar `transparent` o `undefined`.

**Regla:** Si se modifica el `background` de cualquier elemento, verificar
que el padre y los hermanos también tengan background definido.

```jsx
// ❌ Peligroso — si se cambia el fondo del hijo, el padre queda sin fondo
<section>  {/* sin background */}
  <div style={{ background: backgroundColor }}>...</div>
</section>

// ✅ Seguro — cada nivel tiene su fallback
<section style={{ background: 'var(--ps-bg-app, #121212)' }}>
  <div style={{ background: backgroundColor || '#121212' }}>...</div>
</section>
```

**Siempre usar fallback en variables CSS:**
```jsx
// ❌ Sin fallback
style={{ background: 'var(--ps-bg-panel)' }}

// ✅ Con fallback
style={{ background: 'var(--ps-bg-panel, #2c2c2c)' }}
```

---

### Bug #3 — Componentes públicos tapan el grid global

El sitio público tiene un fondo global fijo (cuadrícula):
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

**Regla:** Los componentes públicos NO deben tener `background` sólido en su
contenedor raíz a menos que sea intencional (ej. una sección con fondo de color
como parte del diseño).

```jsx
// ❌ Tapa el grid — el componente se ve como bloque sólido sin grid
<section className="bg-black w-full">...</section>

// ✅ Transparente — el grid del body se ve a través
<section className="w-full">...</section>

// ✅ Intencional con clase específica — cuando SÍ se quiere fondo sólido
<section className="page-builder-block w-full" style={{ background: backgroundColor }}>
```

**Excepción:** El admin (`/admin/*`, `/dashboard/*`) PUEDE y DEBE tener fondos
sólidos para mantener la legibilidad del editor Photoshop UI.

---

## Checklist visual antes de entregar cualquier cambio

- [ ] ¿Todos los botones tienen color de texto explícito (`text-white`, `text-black`)?
- [ ] ¿Todos los `background` tienen valor fallback (`var(--x, #fallback)`)?
- [ ] ¿Si se modificó el fondo de un elemento, se verificaron padre y hermanos?
- [ ] ¿Los componentes públicos nuevos no tapan el grid global del body?
- [ ] ¿El admin mantiene sus fondos sólidos intactos?

---

## Paleta del sitio público (leandrovenegas.cl)

| Uso | Valor |
|-----|-------|
| Fondo base | `#0D0D0D` |
| Fondo de sección | `transparent` (deja ver el grid) |
| Fondo con color intencional | pasar via prop `backgroundColor` |
| Acento principal | `#ffcc00` (amarillo) |
| Texto principal | `#ffffff` |
| Texto secundario | `rgba(255,255,255,0.8)` |
| Borde sutil | `rgba(255,255,255,0.1)` |
| Texto sobre acento amarillo | `#000000` — **siempre negro** |
| Texto sobre fondo oscuro | `#ffffff` — **siempre blanco** |