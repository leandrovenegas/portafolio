# WorkTree — Sistema de Gestión de Planes y Tareas (Plan Actualizado)

Basado en tu feedback, este es el plan definitivo para implementar WorkTree.

## Decisiones Arquitectónicas (MVP)
- [x] Parseo de Tareas (Regex): Utilizaremos la sintaxis estándar de GitHub Tarea (2026-05-20). El script usará una expresión regular en Node.js para identificar estas líneas, extraer el texto, la fecha (opcional) y guardarlas en la tabla tasks.
- [x] Webhook de WhatsApp: Para mantener el costo en $0 y aprovechar la infraestructura existente, el Webhook público de Meta apuntará directamente a Vercel (/api/webhooks/whatsapp). Vercel actualizará la base de datos (Supabase) directamente cuando confirmes una tarea.
- [x] Ubicación del File Watcher: En lugar de aislar el script, crearemos una carpeta scripts/worktree-agent/ dentro de este mismo repositorio. Así solo tendrás que hacer git pull en tu servidor Ubuntu. Incluiremos un Dockerfile para evitar problemas de dependencias en el servidor.
- [x] Base de Datos: Las tablas ya han sido creadas exitosamente en Supabase.
- [x] Ruta Frontend: La URL será /admin/work para mayor simplicidad, pero el título visual de la página será WorkTree.
- [x] Tipografía: Usaremos Inter o Roboto (Google Fonts) que imitan muy bien la densidad y limpieza de la interfaz de Adobe CC.

## 1. File Watcher Agent & Cron (Ubuntu Server / Docker)
Todo el código de backend para el servidor Ubuntu vivirá en el repositorio bajo scripts/worktree-agent/.

Archivos a crear:

scripts/worktree-agent/package.json (Dependencias: chokidar, @supabase/supabase-js, dotenv, node-cron).
scripts/worktree-agent/watcher.js (Script principal que usa Chokidar para leer ~/workplans/ y parsear el Markdown con Regex).
scripts/worktree-agent/cron.js (Proceso que se ejecuta cada mañana, lee las tareas pendientes de hoy y envía el mensaje de WhatsApp).
scripts/worktree-agent/Dockerfile (Para ejecutar todo el módulo de manera aislada y limpia en tu Ubuntu).
Nota: No tienes que configurar el servidor aún. Primero escribiremos el código aquí, lo pushearemos a GitHub, y en la etapa final te indicaré los 2 comandos exactos para ejecutarlo en tu servidor.

## 2. Estructura de Módulos Frontend (Next.js)
Se integrará dentro del layout de /admin usando la ruta solicitada.

```text
app/
  admin/
    work/
      page.js                  # Layout principal. Título: WorkTree. Carga Explorer y visor.
      [topicId]/
        page.js                # Renderiza la vista de un tópico específico
        [versionId]/
          page.js              # Renderiza una versión histórica específica
components/
  work/
    TreeExplorer.jsx           # Panel izquierdo: Navegación de carpetas/archivos
    MarkdownViewer.jsx         # Panel central: Renderizado del contenido .md
    HistoryPanel.jsx           # Panel derecho: Historial de plan_versions
```

## Estética Photoshop UI
Aplicaremos tu Skill estrictamente. Usaremos una fuente sans-serif limpia (como Inter, tamaño 11px-13px) y la convención --ps-* para todo.

```jsx
// Ejemplo conceptual para components/work/TreeExplorer.jsx
import { Folder, FileText } from 'lucide-react'; // Iconos precisos y minimalistas
export default function TreeExplorer({ topics }) {
  return (
    <div className="w-[var(--panel-left-width)] h-full bg-[var(--ps-bg-panel)] border-r border-[var(--ps-border)] text-[var(--ps-text)] text-[var(--font-size-sm)] font-sans overflow-y-auto">
      {/* Toolbar */}
      <div className="flex items-center px-3 py-1.5 border-b border-[var(--ps-border-dark)] bg-[var(--ps-bg-toolbar)]">
        <span className="font-semibold text-[var(--ps-text)] tracking-wide">WorkTree Explorer</span>
      </div>
      
      {/* Directorio */}
      <div className="p-2 space-y-0.5">
        {topics.map(topic => (
          <div key={topic.id} className="flex flex-col">
            <div className="flex items-center gap-2 px-2 py-1 rounded-[var(--ps-radius)] hover:bg-[var(--ps-bg-input)] cursor-pointer text-[#cccccc]">
              <Folder size={14} className="text-[var(--ps-accent)]" strokeWidth={1.5} />
              <span className="truncate">{topic.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 3. Rutas API (Vercel)
Estas rutas vivirán en Next.js y no te costarán servidor adicional:

```text
app/
  api/
    work/
      tasks/route.js           # GET: Obtener tareas para el UI / POST: Marcar done manual
    webhooks/
      whatsapp/route.js        # POST: El endpoint público que le daremos a Meta. Cuando respondas "OK" en WA, este endpoint actualizará Supabase.
```

## Fases de Ejecución
Una vez que apruebes este plan, procederé en el siguiente orden:

- [x] Fase 1: Agente Backend: Crearé la carpeta scripts/worktree-agent/ con el watcher, el parseo de Regex, el cron de WhatsApp y el Dockerfile.
- [x] Fase 2: UI Base: Crearé los componentes UI TreeExplorer, MarkdownViewer e HistoryPanel en components/work/.
- [x] Fase 3: Rutas e Integración: Crearé app/admin/work/page.js y las APIs de Vercel (incluyendo el webhook de WhatsApp).
