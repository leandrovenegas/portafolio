---
name: project-context
description: >
  Leer SIEMPRE al inicio de cualquier sesión de trabajo en el proyecto leandrovenegas.cl.
last_updated: 2026-07-14
mode: append-only
---

> REGLA DE EDICIÓN - APPEND-ONLY
> Este archivo nunca se borra ni se reescribe completo. Solo se agrega contenido nuevo.
> Cada regla aquí es GLOBAL Y PERMANENTE: define contexto de negocio y arquitectura
> válido para todo el proyecto, en toda sesión futura.
> Si algo queda obsoleto, márcalo como [OBSOLETO - fecha] sin eliminar el texto.
> Antes de guardar, verifica que la versión nueva no tenga menos líneas que la
> anterior; si las tiene, DETENTE y pregunta a Leandro.
> Commit obligatorio: git add .agents/skills/ && git commit -m "chore: update skills"

---

## Quién es Leandro
Director creativo y audiovisual, Valparaíso Chile. 10 años de experiencia.
Se posiciona como Video Marketing Partner.

---

## Stack Técnico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js (App Router) |
| Estilos | Tailwind CSS v4 |
| Base de datos | Supabase |
| CDN Video | Bunny CDN (Storage Zone São Paulo, Pull Zone socialproofreels) |
| Pagos | Mercado Pago |
| Scheduling | Calendly |
| Contacto | WhatsApp (56988804299) |
| Agente de código | Antigravity |

### Variables de entorno clave
- NEXT_PUBLIC_BUNNY_CDN_HOSTNAME
- NEXT_PUBLIC_BUNNY_LIBRARY_ID

---

## Arquitectura del Sitio

- `/` — Home
- `/sobre-mi` — Historia personal
- `/proceso` — Proceso de trabajo
- `/portafolio` — Casos de estudio
- `/videos/[slug]` — Páginas individuales
- `/precios` — Precios dinámicos desde Supabase
- `/contacto` — Formulario + WhatsApp
- `/admin/editor?slug=[page]` — Editor visual (server 22, puerto 3001)
- `/dashboard/queue` — Cola SocialProofREEL
- `/dashboard/crm` — Pipeline CRM
- `/video/[slug]` — Landing dinámica de leads

### Editor Visual (estado 2026-07-14, en migración)
- Sistema actual: stack ordenado (posición = orden en array), en
  `app/admin/editor/treeHelpers.js` y `components/page-builder/GridEditor.jsx`
- EN MIGRACIÓN hacia: canvas libre estilo Photoshop, x/y/w/h/zIndex por
  breakpoint vía campo `_layout`, overlap permitido, capas manuales
- Componentes tienen panel de propiedades en sidebar derecho
- Breakpoints: mobile/tablet/desktop, prop `forceBp` para preview

---

## Productos (6 tipos de video)

| Tipo | Etapa del funnel |
|------|----------------|
| Primer Impacto | Awareness |
| Stop-Scrolling | Interrupción |
| Autoridad | Consideración |
| Validación Social | Decisión |
| VSL | Conversión |
| Retención | Post-compra |

---

## Visión Estratégica — Metodología Russell Brunson

Gratis/Atención → Producto de entrada → Core offer → Premium → Continuidad

1. Una página = un objetivo = un CTA
2. Hook → Story → Offer
3. Tráfico frío necesita más educación
4. Prueba social antes del precio
5. CTA principal es WhatsApp, /precios es secundario

Casos de éxito: Valook (815.000 views YouTube), Incoludido ($23M CLP vs meta $15M).

---

## Supabase — Tablas confirmadas (proyecto uzsagsdrjgnifzdzffyg)

| Tabla | Uso |
|-------|-----|
| organizations | 5 orgs publicadas |
| projects | 39 proyectos, la mayoría en draft |
| media_items | assets por proyecto |
| page_versions | components jsonb del page-builder |
| products | precios con IVA |
| orders | pedidos Mercado Pago |
| subs_pipeline_* | compartidas con SubsPipeline |
| plan_topics/plan_versions/tasks | sistema WorkTree, obsoleto, no tocar aún |

Leandro tributa como persona natural (boletas, sin IVA).

---

## Narrativa de Marca

"Descubrí el sistema mirando hacia atrás. Ahora lo construyo para ti."
3 actos: desarmador (infancia) → el otro lado del mostrador (restaurante) →
constructor de sistema.

Tono: directo, sin relleno, técnico pero humano.

---

## Reglas generales para Antigravity

1. Nunca hardcodear textos en JSX — siempre props con defaults
2. Nunca hardcodear colores en componentes públicos
3. Siempre incluir forceBp en componentes con lógica responsive
4. El editor visual lee props — si un texto no es prop, no es editable
5. Después de crear o modificar cualquier skill: git commit
6. Dudas de estética → consultar photoshop-ui-style-system
7. Dudas de componente → consultar component-architecture
8. NUNCA asumir que una pieza técnica existe (librería, archivo, integración) sin
   verificarla con grep/find en el repo real — ver incidente 2026-07-14 en
   component-architecture (sección next-auth/Zod/AppContext, descartada por
   no existir, confirmado vía graphify)

---

## Registro de cambios (agregar al final, nunca borrar entradas anteriores)

| Fecha | Cambio |
|-------|--------|
| 2026-07-14 | Se agrega regla append-only. Se actualiza sección "Editor Visual" para reflejar migración de stack a canvas libre. Se agrega regla #8 sobre verificación obligatoria de piezas técnicas. |
