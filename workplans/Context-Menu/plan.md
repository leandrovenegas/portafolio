# Plan de Implementación: Menú Contextual (Clic Derecho) en WorkTree

Este plan detalla la arquitectura para agregar un menú contextual (clic derecho) interactivo en el **TreeExplorer** del portafolio. Este menú permitirá crear y eliminar carpetas (Tópicos) y archivos (Planes) de manera idéntica al explorador de archivos de Windows/Photoshop, sincronizándose de forma transparente tanto en la base de datos (Supabase) como en el disco duro local de tu PC.

---

## 🛠️ Decisiones Arquitectónicas

1. **Sincronización Híbrida (Base de Datos + Disco Duro Local)**:
   * Cuando Next.js se esté ejecutando localmente en tu PC (`pnpm run dev`), las operaciones de creación y eliminación del menú contextual se aplicarán **tanto en Supabase como en tu disco local** dentro de la carpeta `portafolio/workplans/` usando las librerías `fs` de Node.
   * Esto garantiza que tus carpetas en VS Code y tu Web se mantengan perfectamente coordinadas en tiempo real.
   * En producción (Vercel), donde no hay un disco duro físico persistente, el sistema capturará con gracia los fallos de `fs` y actualizará Supabase directamente.

2. **Refrescamiento Dinámico de la UI**:
   * Tras cualquier mutación exitosa (crear/eliminar), el componente del explorador usará `router.refresh()` de Next.js App Router para volver a solicitar y pintar los datos actualizados del servidor, sin necesidad de recargar toda la pestaña.

3. **Diseño Premium Estilo Photoshop**:
   * Diseñaremos el menú contextual con los tokens oscuros exactos de Adobe CC: fondo de panel `#252526`, bordes `#3c3c3c`, tipografía sans-serif compacta de 11px, e interacciones de selección color azul Adobe `#1473e6` o rojo de peligro `#d93838`.

---

## Tareas del Plan

- [ ] Crear el API Route en `/api/work/explorer/route.js` para manejar POST y DELETE.
- [ ] Agregar el menú contextual interactivo en `TreeExplorer.jsx`.
- [ ] Integrar el refresco dinámico `router.refresh()` al crear o eliminar elementos.
- [ ] Validar estética oscura de Photoshop para el modal emergente.
