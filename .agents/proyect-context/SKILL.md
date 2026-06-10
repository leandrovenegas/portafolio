---
name: project-context
description: >
  Leer SIEMPRE al inicio de cualquier sesión de trabajo en el proyecto leandrovenegas.cl.
  Aplica cuando el agente vaya a crear, modificar o revisar cualquier archivo del proyecto.
  Contiene el stack, arquitectura, visión estratégica y reglas de negocio que gobiernan
  todas las decisiones técnicas y de diseño.
---

# Contexto del Proyecto — leandrovenegas.cl

## Quién es Leandro
Director creativo y audiovisual, Valparaíso Chile. 10 años de experiencia.
Se posiciona como **Video Marketing Partner** — no un productor de videos, sino un
diseñador de sistemas de venta con video.

---

## Stack Técnico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js (App Router) |
| Estilos | Tailwind CSS v4 |
| Base de datos | Supabase |
| CDN Video | Bunny CDN (Storage Zone São Paulo, Pull Zone `socialproofreels`) |
| Pagos | Mercado Pago |
| Scheduling | Calendly |
| Contacto | WhatsApp (número: 56988804299) |
| Agente de código | Antigravity |

### Variables de entorno clave
- `NEXT_PUBLIC_BUNNY_CDN_HOSTNAME` — hostname del CDN de video
- `NEXT_PUBLIC_BUNNY_LIBRARY_ID` — ID de librería Bunny

---

## Arquitectura del Sitio

### Rutas principales
- `/` — Home (sistema de 6 videos)
- `/sobre-mi` — Historia personal (3 actos)
- `/proceso` — Proceso de trabajo
- `/portafolio` — Casos de estudio
- `/videos/[slug]` — Páginas individuales por tipo de video
- `/precios` — Precios dinámicos desde Supabase
- `/contacto` — Formulario + WhatsApp
- `/admin/editor?slug=[page]` — **Editor visual** (URL: 192.168.1.22:3001/admin/editor)
- `/dashboard/queue` — Cola SocialProofREEL
- `/dashboard/crm` — Pipeline CRM 6 etapas
- `/video/[slug]` — Landing dinámica de leads

### Editor Visual
Funciona al estilo Jumpseller/page builder:
- Componentes arrastrables y reordenables
- Cada componente tiene panel de propiedades en sidebar derecho
- Los textos se editan mediante **inputs en el panel**, no inline
- Breakpoints: mobile / tablet / desktop con preview en tiempo real
- Prop `forceBp` controla qué breakpoint renderiza el componente en preview

---

## Productos (6 tipos de video)

| Tipo | Etapa del funnel |
|------|----------------|
| Primer Impacto | Awareness — genera familiaridad |
| Stop-Scrolling | Interrupción — captura atención |
| Autoridad | Consideración — demuestra expertise |
| Validación Social | Decisión — prueba social |
| VSL | Conversión — carta de ventas completa |
| Retención | Post-compra — convierte en embajador |

---

## Visión Estratégica — Metodología Russell Brunson

### Value Ladder (Escalera de Valor)
Cada producto/página debe estar diseñado para llevar al prospecto
al siguiente nivel de compromiso y valor:

```
Gratis/Atención → Producto de entrada → Core offer → Premium → Continuidad
```

Los 6 tipos de video mapean directamente a esta escalera.

### Principios de Funnel que gobiernan cada página
1. **Una página = un objetivo = un CTA** — nunca dos acciones en competencia
2. **Hook → Story → Offer** — estructura narrativa de toda página de venta
3. **El tráfico frío necesita más educación** — los videos de awareness no venden directo
4. **Prueba social antes del precio** — Validación Social va antes de /precios
5. **El CTA principal es WhatsApp** — `/precios` es CTA secundario

### CTAs por contexto
- WhatsApp pre-llenado por página (mensaje contextual al tipo de video)
- `/precios` como alternativa para quien quiere ver números primero

### Casos de éxito que usar en copy
- **Valook** — 815.000 visualizaciones orgánicas YouTube, 5.300 suscriptores, estrategia SEO video
- **Incoludido** — Crowdfunding $23M CLP vs meta $15M, Canal 13, La Cuarta, cero pauta pagada

---

## Supabase — Tablas relevantes

| Tabla | Uso |
|-------|-----|
| `products` | Precios dinámicos con IVA auto-calculado |
| `raw_leads` | Leads del sistema SocialProofREEL con slug |
| CRM pipeline | 6 etapas de funnel |

### Tributación
Leandro tributa como **persona natural** (boletas de honorarios, sin IVA).
Los precios en `/precios` muestran valor + IVA calculado automáticamente.

---

## Narrativa de Marca

**Tagline técnico:** "Sistema de ventas con video para negocios en Chile"

**Historia (3 actos):**
> "De niño desarmaba juguetes. Hoy desensamblo negocios."
- Acto 1: Curiosidad y despiece (infancia)
- Acto 2: Años en agencias y marcas (Dragon Lab, LAN, Valook, Incoludido)
- Acto 3: Sistema propio — el patrón reconocido

**Tono:** Directo, sin relleno, técnico pero humano. Sin jerga de agencia.

---

## Reglas generales para Antigravity

1. Nunca hardcodear textos en JSX — siempre props con defaults
2. Nunca hardcodear colores en componentes públicos — usar variables CSS o props
3. Siempre incluir `forceBp` en componentes con lógica responsive
4. El editor visual lee props — si un texto no es prop, no es editable
5. Después de crear o modificar cualquier skill: `git add .agents/skills/ && git commit -m "chore: update skills"`
6. Si hay duda sobre estética del editor admin → consultar `photoshop-ui` skill
7. Si hay duda sobre construcción de componente → consultar `component-architecture` skill
