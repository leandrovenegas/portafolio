# Guía de Convenciones y Sistema de Layout CSS Grid (Page Builder)

Esta guía explica en lenguaje sencillo cómo funciona el sistema de layout visual de las secciones del Page Builder, para que cualquier persona pueda editar el diseño de las páginas a mano sin depender de asistencia de IA.

---

## 1. Clases Principales de Tailwind Grid Explicadas

| Clase | Qué hace | Ejemplo |
| :--- | :--- | :--- |
| `grid` | Activa la grilla CSS en un contenedor. **Obligatorio para usar columnas.** | `<div className="grid ...">` |
| `grid-cols-N` | Define cuántas columnas iguales tiene la grilla en esa pantalla. | `grid-cols-1` (1 col), `md:grid-cols-2` (2 cols) |
| `col-span-N` | Define cuántas columnas ocupa un elemento dentro de la grilla. | `col-span-1`, `md:col-span-2` |
| `col-start-N` | Ubica el elemento iniciando en una columna específica (1-indexed). | `md:col-start-2` |
| `row-start-N` | Ubica el elemento en una fila específica. Útil para cambiar orden visual en desktop. | `md:row-start-1` |
| `gap-N` | Espacio entre columnas y filas (ej. `gap-6` = 1.5rem, `gap-10` = 2.5rem). | `gap-6 md:gap-10` |

---

## 2. LA REGLA DE ORO: El "Hijo Directo" (`HIJO DIRECTO`)

> [!CAUTION]
> **REGLA CRÍTICA DE CSS GRID**:
> Las propiedades de expansión de columna (`col-span-*`, `col-start-*`, `row-span-*`) **SOLO FUNCIONAN** si el elemento que las lleva es **HIJO DIRECTO** del elemento que tiene `grid`.
> Si colocas un `<div>` envuelto en medio, el navegador ignorará la expansión de columna y el layout se romperá.

### ❌ INCORRECTO (El `col-span-2` no funciona)
```jsx
/* El contenedor principal tiene grid */
<section className="grid grid-cols-1 md:grid-cols-2">
  {/* Div intermedio envuelve la imagen */}
  <div>
    {/* ❌ ESTE ELEMENTO NO ES HIJO DIRECTO DE GRID, EL SPAN SE IGNORA */}
    <img className="col-span-2" src="avatar.jpg" />
  </div>
</section>
```

### ✅ CORRECTO (La imagen es hijo directo del grid)
```jsx
/* El contenedor principal tiene grid */
<section className="grid grid-cols-1 md:grid-cols-2">
  {/* ✅ HIJO DIRECTO CON SPAN CORRECTO */}
  <img className="col-span-1 md:col-span-2" src="avatar.jpg" />
</section>
```

---

## 3. Tabla de Breakpoints (Metodología Mobile-First)

En este proyecto aplicamos **Mobile-First**. Las clases **sin prefijo** definen cómo se ve en teléfonos móviles. Los prefijos `md:` y `lg:` solo agregan o modifican el diseño a partir de ese ancho de pantalla.

| Prefijo | Ancho mínimo | Dispositivo | Comportamiento estándar |
| :--- | :--- | :--- | :--- |
| **Base (Sin prefijo)** | `0px` a `767px` | Teléfonos / Móviles | **1 Columna apilada** (`grid-cols-1`) |
| `md:` | `768px` en adelante | Tablets y Laptops | **2 Columnas** (`md:grid-cols-2`) o División Split |
| `lg:` | `1024px` en adelante | Monitores / Desktops | **3+ Columnas** (`lg:grid-cols-3`) |

---

## 4. Patrones Estándar Listos para Copiar y Pegar

### Patrón A: "Contenido + Media" (Texto e Imagen / Video / Avatar)
Para secciones que muestran un bloque de texto a un lado y una imagen/video al otro lado en computadoras, pero todo apilado en móviles:

```jsx
<section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start md:items-center w-full">
  {/* Título de ancho completo */}
  <h2 className="col-span-1 md:col-span-2 text-3xl font-bold">Título de la Sección</h2>
  
  {/* Bloque de texto (Ocupa 1 columna por defecto) */}
  <div className="col-span-1">
    <p>Párrafo explicativo del servicio o producto...</p>
  </div>
  
  {/* Imagen / Media (Columna 2 en desktop, arriba/debajo en mobile) */}
  <div className="col-span-1 md:col-start-2">
    <img src="/imagen.jpg" alt="Media" className="w-full rounded-2xl" />
  </div>
</section>
```

---

### Patrón B: "Grilla de Tarjetas / Servicios"
Para secciones con múltiples tarjetas (servicios, formatos, preguntas frecuentes, botones):

```jsx
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
  {/* Tarjeta 1 */}
  <div className="col-span-1 p-6 rounded-xl border border-border bg-s1">
    <h3>Servicio 1</h3>
    <p>Descripción 1</p>
  </div>

  {/* Tarjeta 2 */}
  <div className="col-span-1 p-6 rounded-xl border border-border bg-s1">
    <h3>Servicio 2</h3>
    <p>Descripción 2</p>
  </div>

  {/* Tarjeta 3 */}
  <div className="col-span-1 p-6 rounded-xl border border-border bg-s1">
    <h3>Servicio 3</h3>
    <p>Descripción 3</p>
  </div>
</section>
```

---

### Patrón C: "Columna Única Centrada" (CTA o Texto simple)
Para títulos centrados, llamadas a la acción (CTA) o textos continuos:

```jsx
<section className="grid grid-cols-1 gap-6 text-center justify-items-center w-full">
  <div className="col-span-1 max-w-3xl">
    <h2 className="text-4xl font-bold">¿Listo para empezar?</h2>
    <p className="text-lg mt-4">Contáctanos hoy mismo para agendar tu llamada.</p>
    <a href="/contacto" className="inline-block mt-6 px-8 py-4 bg-accent text-bg font-bold rounded-xl">
      Agendar Llamada
    </a>
  </div>
</section>
```
