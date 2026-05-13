# Prohibiciones y casos edge — Photoshop UI Style System

Este archivo documenta decisiones de diseño específicas y
los casos donde el agente tiende a "irse por las suyas".
Consultar SIEMPRE antes de aplicar cualquier estilo.

---

## ❌ COLORES PROHIBIDOS

### Fondos que NO usar jamás
```
white, #fff, #ffffff
#f0f0f0, #f5f5f5, #fafafa
#e0e0e0, #eeeeee
cualquier valor RGB donde los tres canales sean > 100
```

### Colores de texto que NO usar
```
black, #000, #111, #222
(el texto más oscuro permitido es --ps-text = #d4d4d4)
```

### Por qué: la UI debe verse como herramienta profesional oscura,
no como una página web de documentación o una app SaaS genérica.

---

## ❌ BORDER-RADIUS PROHIBIDOS

| Elemento        | Prohibido     | Correcto              |
|-----------------|---------------|-----------------------|
| Botones UI      | 6px, 8px, 50% | var(--ps-radius) = 2px|
| Inputs          | 4px, 6px      | var(--ps-radius) = 2px|
| Panels          | cualquiera    | 0px                   |
| Badges/tags     | 50%, 12px     | 3px máximo            |
| Modales         | 12px, 16px    | var(--ps-radius-modal) = 4px |

---

## ❌ SOMBRAS PROHIBIDAS

```css
/* NO: sombras decorativas suaves de estilo Material/iOS */
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
box-shadow: 0 4px 16px rgba(0,0,0,0.15);

/* SÍ: sombras funcionales, oscuras y directas */
box-shadow: var(--shadow-panel);   /* 0 2px 8px rgba(0,0,0,0.5) */
box-shadow: var(--shadow-modal);   /* 0 8px 32px rgba(0,0,0,0.7) */
```

---

## ❌ ESTRUCTURA DE LAYOUT PROHIBIDA DE MODIFICAR

Los siguientes elementos son INMUTABLES sin aprobación:
- Ancho del panel izquierdo (--panel-left-width: 240px)
- Ancho del panel derecho (--panel-right-width: 260px)
- Altura del toolbar (--toolbar-height: 40px)
- Posición fixed del toolbar principal
- El orden de: toolbar → workspace → statusbar

Si el agente necesita más espacio, propone la solución
antes de mover cualquiera de estas piezas.

---

## ❌ PATRONES CSS GENÉRICOS DE APP WEB QUE NO QUEREMOS

```css
/* NO: gradientes decorativos */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* NO: animaciones de entrada llamativas */
animation: fadeInUp 0.6s ease;

/* NO: hover con cambio de color muy contrastante */
&:hover { background: #1473e6; color: white; } /* en elementos no-acento */

/* NO: borders de colores en estado normal */
border: 2px solid var(--ps-accent); /* solo en focus, no en normal */

/* SÍ: hover sutil */
&:hover { background: var(--ps-bg-hover); }

/* SÍ: focus claro pero controlado */
&:focus { 
  outline: none;
  border-color: var(--ps-border-focus);
  box-shadow: 0 0 0 1px var(--ps-accent-dim);
}
```

---

## ❌ TIPOGRAFÍA PROHIBIDA

```css
/* NO: fuentes serif o display */
font-family: Georgia, 'Times New Roman', serif;
font-family: 'Playfair Display', serif;

/* NO: tamaños grandes en UI chrome */
font-size: 18px; /* en labels, botones o inputs */
font-size: 20px;

/* NO: letter-spacing exagerado */
letter-spacing: 0.1em; /* en elementos funcionales */

/* SÍ: tipografía densa y funcional */
font-family: var(--font-ui);
font-size: var(--font-size-sm); /* 11px — el más usado */
```

---

## ✅ PATRONES APROBADOS (referencia rápida)

### Separador de sección dentro de un panel
```css
.section-divider {
  border-top: 1px solid var(--ps-border-dark);
  margin: var(--sp-sm) 0;
}
```

### Header de sección dentro de panel
```css
.section-header {
  height: 28px;
  padding: 0 var(--sp-sm);
  background: var(--ps-bg-toolbar);
  border-bottom: 1px solid var(--ps-border);
  display: flex;
  align-items: center;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--ps-text-label);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### Slider / range input
```css
input[type="range"] {
  accent-color: var(--ps-accent);
  height: 2px;
}
```

### Tooltip
```css
.tooltip {
  background: var(--ps-bg-tooltip);
  border: 1px solid var(--ps-border-light);
  color: var(--ps-text);
  font-size: var(--font-size-xs);
  padding: var(--sp-xs) var(--sp-sm);
  border-radius: var(--ps-radius);
  box-shadow: var(--shadow-tooltip);
  pointer-events: none;
  z-index: var(--z-tooltip);
}
```

---

## Registro de decisiones (actualizar cuando se resuelva algo nuevo)

| Fecha      | Decisión                                              |
|------------|-------------------------------------------------------|
| 2026-05-08 | Skill creada. Estética base: Photoshop CC Dark Mode   |
|            | Añade nuevas decisiones aquí con fecha               |