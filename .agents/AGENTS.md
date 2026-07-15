Reglas globales: ver proyectos/_global/AGENTS.md — aplican siempre junto a las reglas específicas de este proyecto.

# Project Rules


> REGLA DE EDICIÓN - APPEND-ONLY
> Este archivo nunca se borra ni se reescribe completo. Solo se agrega contenido nuevo.
> Cada regla aquí es GLOBAL Y PERMANENTE: aplica a todas las páginas, todos los
> componentes, y todas las sesiones futuras — no solo a la tarea que la originó.
> Si una regla queda obsoleta, márcala como [OBSOLETO - fecha] sin eliminar el texto.
> Antes de guardar, verifica que la versión nueva no tenga menos líneas que la
> anterior; si las tiene, DETENTE y pregunta a Leandro.
> Commit obligatorio junto al código que motivó el cambio:
> git add .agents/ && git commit -m "chore: update AGENTS.md"

- When building or editing a page that is of type "landing" (landing page), always remove the navigation bar (`nav`). Landing pages should not have a navigation bar.
- El badge o botón amarillo de "EDITANDO" en la interfaz del page-builder no debe renderizarse dentro del componente ni empujar su contenido; siempre debe flotar estrictamente por fuera (usando utilidades como `absolute bottom-full mb-1 z-[100]`) para no utilizar space real de la grilla ni deformar la caja.
- Regla global de delegación a Hermes: ver D:\Lab\Boveda\Leandro Venegas Proyects\AgentBridge\REGLA-GLOBAL.md

---

## Registro de cambios (agregar al final, nunca borrar entradas anteriores)

| Fecha | Cambio |
|-------|--------|
| 2026-07-14 | Se agrega regla append-only y aclaración de alcance global/permanente. |
| 2026-07-15 | Se agrega referencia a la regla global de delegación a Hermes. |
