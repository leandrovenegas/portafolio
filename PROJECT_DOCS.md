# Documentación del Proyecto: Portafolio Next.js

Este documento proporciona un análisis exhaustivo de la estructura, componentes y flujo de datos del proyecto de portafolio basado en Next.js.

## 1. Estructura del Proyecto

La estructura de carpetas y archivos principales es la siguiente:

```text
/
├── app/                  # App Router de Next.js. Contiene todas las páginas, rutas API y layouts.
│   ├── admin/            # Panel de administración, incluyendo el editor visual.
│   ├── api/              # Endpoints del backend (rutas de API de Next.js).
│   ├── blog/             # Sección de blog.
│   ├── carrito/          # Funcionalidad de carrito de compras.
│   ├── contacto/         # Página de contacto.
│   ├── playground/       # Entorno de pruebas.
│   ├── portafolio/       # Rutas asociadas a la exhibición del portafolio.
│   ├── proyectos/        # Rutas de proyectos individuales.
│   ├── video/            # Landing pages dinámicas de videos.
│   ├── videos/           # Galería general de videos.
│   ├── layout.js         # Layout principal de la aplicación.
│   └── page.js           # Página de inicio pública.
├── components/           # Componentes reutilizables de React.
│   ├── page-builder/     # Componentes, registro y paneles para el Editor Visual interno.
│   └── [Varios archivos .jsx] # HeroVideo, BunnyVideoPlayer, CookieBanner, Nav, etc.
├── data/                 # Datos estáticos (ej. videos.js).
├── lib/                  # Utilidades y configuración de clientes (supabase.js, bunny.js).
├── public/               # Archivos estáticos, imágenes locales.
├── scripts/              # Scripts auxiliares y de automatización.
├── .env.local            # Variables de entorno.
├── package.json          # Dependencias y scripts de Node.js.
└── supabase_*.sql        # Scripts de esquema y seguridad para Supabase.
```

## 2. Stack Técnico

- **Framework Core**: Next.js (v16.1.6)
- **Renderizado**: React & React DOM (v19.2.3)
- **Estilos**: Tailwind CSS (v4.2.1) con `@tailwindcss/postcss` y `@tailwindcss/typography`
- **Backend / BaaS**: Supabase Client (`@supabase/supabase-js` v2.97.0)
- **Video Delivery**: Bunny CDN (integración a través de la API y el cliente). Reproducción vía `hls.js` (v1.6.16)
- **Contenido Markdown**: `@mdx-js/react`, `marked`, `next-mdx-remote`
- **Iconos**: `lucide-react`
- **IA**: `@google/generative-ai` y `@anthropic-ai/sdk`

## 3. Esquema de Base de Datos (Supabase)

Las siguientes tablas y políticas se infieren a partir de los scripts `.sql` y llamadas a la API en el código:

- **`page_versions`**: Utilizada por el CMS interno para controlar las versiones de las páginas.
  - **Columnas**: `id` (uuid, PK), `slug` (text), `version_name` (text), `is_active` (boolean), `components` (jsonb), `created_at` (timestamp).
- **`raw_leads`**: Tabla referenciada en `supabase_video_rls.sql` (aparentemente para capturar clientes potenciales).
- **`video_queue`**: Referenciada en `supabase_video_rls.sql`.
- **`outreach`**: Referenciada en `supabase_video_rls.sql` para rastrear las salidas/envíos.
- También se aprecian endpoints en `app/api/` como `/orders`, `/products`, `/pages` que sugieren tablas relacionadas si están configuradas en Supabase, aunque el foco principal del código analizado es `page_versions`.

## 4. Componentes Principales

Ubicados en `app/` y `components/`:

- **`BunnyVideoPlayer.jsx`**: Reproductor de video integrado con Bunny CDN, utiliza `hls.js` o video estándar.
- **`HeroVideo.jsx`**: Sección principal (Hero) que muestra un video de fondo con superposiciones.
- **`VideoPlayer.jsx` / `VideoPageViewer.jsx`**: Componentes para visualizar los proyectos de video en detalle.
- **`Nav.js` / `Footer.js`**: Navegación principal y pie de página de la aplicación.
- **`CookieBanner.jsx`**: Banner para el consentimiento de cookies.
- **`page-builder/registry.js`**: Define el diccionario de componentes editables para el CMS interno (ej. `HeroVideoSection`, `TextSection`, `CTASection`, `VideoARQSection`).
- **`page-builder/PageRenderer.js`**: Itera e hidrata la página final leyendo el esquema JSON guardado en Supabase.
- **`page-builder/[Panels].js`**: Varios paneles (`StylesPanel`, `SwatchesPanel`, etc.) para el editor estilo "Photoshop" creado para el administrador.

## 5. Rutas y Páginas

Principales páginas servidas desde el App Router:
- `/` (`app/page.js`): Inicio, puede cargar del Editor o local por defecto.
- `/admin` (`app/admin/page.js`): Dashboard de administración principal.
- `/admin/editor` (`app/admin/editor/page.js`): Interfaz del CMS / Creador Visual de páginas.
- `/portafolio` y `/portafolio/[slug]`: Exhibición de proyectos.
- `/videos` y `/videos/[slug]`: Galería de piezas audiovisuales.
- `/video/[slug]`: Landing page enfocada en conversión que contiene un cliente específico.
- `/contacto`: Formulario y enlaces de contacto.
- `/carrito`: Funcionalidad de e-commerce o pasarela.
- `/blog`: Listado y artículos del blog.
- `/playground` y `/lab`: Rutas para experimentación o pruebas técnicas internas.

## 6. Editor Visual / CMS Interno

El proyecto incluye un robusto CMS estilo "Photoshop" construido a medida que se ubica en `/admin/editor`:
- **Cómo funciona**: Interfaz Drag-and-Drop que permite a los administradores agregar, reordenar y configurar visualmente las secciones de las páginas. Permite copiar estilos y deshacer/rehacer acciones mediante atajos de teclado o historial en pantalla.
- **Tablas que usa**: La tabla principal de la base de datos es `page_versions`.
- **Qué campos edita**: Edita el campo `components` (un JSONB que almacena una matriz de módulos y sus "props" más configuraciones de estilos), también edita `version_name`, `slug` y define cuál versión es la `is_active` (boolean). Permite crear distintas "ramas" (versiones de prueba) de una página y revertir a estados anteriores.

## 7. Flujo de Datos (Supabase, Cloudinary y Bunny CDN)

- **Supabase**: Actúa como la fuente de la verdad para los datos relacionales y configuración (ej. el esquema de las páginas creadas en el editor visual, colas de video, información de clientes potenciales). 
- **Bunny CDN**: Es el proveedor de video y almacenamiento Edge. El sitio aloja y transmite contenido audiovisual a través del CDN global de Bunny para garantizar altas velocidades, utilizando Hostnames personalizados (ej. `socialproofreels.b-cdn.net`) integrándose con `hls.js` en el frontend para el streaming por pedazos.
- **Cloudinary**: *(Nota: Tras inspeccionar exhaustivamente la base de código local, no se encontraron dependencias explícitas directas o importaciones hacia el SDK de Cloudinary. El código posee un endpoint interno `/api/upload-image` que guarda archivos localmente dentro de `/public/images`. Si Cloudinary es parte de la arquitectura del sistema, su uso sucede en una capa ajena a este código fuente localmente, por ejemplo, entregando URLs crudas administradas externamente o en otra parte de la infraestructura).*

## 8. Variables de Entorno

Lista de variables obtenidas desde `.env.local` e invocaciones directas a `process.env` en la base de código (los valores han sido omitidos):

- **Supabase Principal:**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Supabase Worker (SocialProofREEL):**
  - `NEXT_PUBLIC_SPR_SUPABASE_URL`
  - `NEXT_PUBLIC_SPR_SUPABASE_ANON_KEY`
- **Bunny CDN:**
  - `NEXT_PUBLIC_BUNNY_LIBRARY_ID`
  - `NEXT_PUBLIC_BUNNY_CDN_HOSTNAME`
  - `NEXT_PUBLIC_BUNNY_CDN_URL`
  - `BUNNY_API_KEY`
- **Administración:**
  - `ADMIN_USER`
  - `ADMIN_PASSWORD`
- **APIs Externas y Servicios:**
  - `GEMINI_API_KEY`
  - `NEXT_PUBLIC_WHATSAPP_NUMBER`
  - `NEXT_PUBLIC_GA4_ID`
  - `VIDEO_LEANDRO_URL`
