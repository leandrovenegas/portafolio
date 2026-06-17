# Leandro Venegas — Portafolio & CMS de Video 🎥🚀

Bienvenidos al repositorio oficial de **Leandro Venegas** (desde Valparaíso, Chile), Product Manager Audiovisual y de Productos. Este es un proyecto moderno desarrollado en **Next.js** que combina un portafolio profesional, una plataforma de generación de leads mediante Video Sales Letters (VSL) y un CMS/Constructor Visual a medida.

🌐 **Sitio Oficial:** [leandrovenegas.cl](https://www.leandrovenegas.cl/)

---

## 🛠️ Stack Tecnológico

El proyecto está construido sobre las siguientes tecnologías y servicios principales:

*   **Framework**: [Next.js v16.1.6](https://nextjs.org/) (App Router)
*   **Lógica y Componentes**: React v19.2.3 / TypeScript
*   **Estilos**: Tailwind CSS v4.2.1
*   **Bases de Datos / Backend**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`)
*   **Transmisión de Video**: [Bunny CDN](https://bunny.net/) y streaming adaptativo HLS con `hls.js`
*   **Envío de Correo Transaccional**: [Resend](https://resend.com/)
*   **Integración con IA**: Google Gemini y Anthropic SDK

---

## 🚀 Funcionalidades Clave

### 1. Landing Pages Dinámicas de Video (`/video/[slug]`)
Páginas altamente optimizadas para conversión de prospectos (leads) individuales.
*   Reproductor de video adaptativo de reseñas construido a partir de opiniones de Google.
*   Envío de correo transaccional silencioso usando **Resend** para notificaciones en tiempo real al administrador.
*   Registro automático de visitas iniciales y clics en CTAs (WhatsApp, Ofertas) guardados directamente en la base de datos de Supabase.

### 2. CMS & Constructor Visual (`/admin/editor`)
Un editor visual interactivo estilo "Photoshop" construido completamente a medida que permite:
*   Crear, ordenar, eliminar y personalizar módulos visuales en tiempo real.
*   Copiar estilos, rehacer/deshacer acciones con atajos de teclado e historial visual.
*   Crear distintas ramas de versiones (`page_versions`) en la base de datos de Supabase y activar la versión ganadora instantáneamente.

---

## 📁 Estructura del Proyecto

```text
/
├── app/                  # App Router de Next.js (Páginas, Layouts y Endpoints de API)
│   ├── admin/            # Dashboard de Administración y Constructor Visual
│   ├── api/              # Endpoints del Backend (Uploads, Envío de Leads, etc.)
│   ├── portafolio/       # Galería y visualización de portafolio
│   ├── video/            # Landing Pages de conversión de prospectos individuales
│   └── videos/           # Galería general de contenido audiovisual
├── components/           # Componentes reutilizables de React
│   ├── page-builder/     # Componentes interactivos y de edición del CMS
│   └── [Controles]       # Reproductores de video, banners de cookies, navegación, etc.
├── lib/                  # Clientes de APIs externas y utilidades (Supabase, Bunny)
├── public/               # Archivos estáticos locales (Imágenes, Assets)
├── scripts/              # Scripts auxiliares de automatización de base de datos y Bunny
└── supabase_*.sql        # Esquemas SQL, políticas RLS y triggers de bases de datos
```

*Para un desglose técnico detallado de la arquitectura de la base de datos y los módulos, consulta el archivo [PROJECT_DOCS.md](file:///x:/proyects/portafolio/PROJECT_DOCS.md).*

---

## 🔑 Configuración del Entorno (`.env.local`)

El proyecto requiere las siguientes variables de entorno configuradas localmente para su correcto funcionamiento. Crea un archivo `.env.local` en la raíz con la siguiente estructura:

```env
# ─── Supabase Principal ─────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://<tu-id-de-proyecto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<tu-key-anon>

# ─── Supabase Worker (SocialProofREEL) ──────────────────────────
NEXT_PUBLIC_SPR_SUPABASE_URL=https://<tu-id-de-worker>.supabase.co
NEXT_PUBLIC_SPR_SUPABASE_ANON_KEY=<tu-key-anon-worker>

# ─── Bunny CDN ──────────────────────────────────────────────────
NEXT_PUBLIC_BUNNY_LIBRARY_ID=<id-de-libreria-de-video>
NEXT_PUBLIC_BUNNY_CDN_HOSTNAME=<host-de-entrega>
NEXT_PUBLIC_BUNNY_CDN_URL=https://<tu-cdn>.b-cdn.net
BUNNY_API_KEY=<tu-api-key-de-bunny>

# ─── Resend (Envío de Email) ────────────────────────────────────
RESEND_API_KEY=re_<tu-api-key-de-resend>

# ─── Configuración de Administrador ─────────────────────────────
ADMIN_USER=<usuario>
ADMIN_PASSWORD=<contraseña>

# ─── Otros ──────────────────────────────────────────────────────
GEMINI_API_KEY=<tu-key-de-gemini>
NEXT_PUBLIC_WHATSAPP_NUMBER=<tu-numero-con-codigo-de-pais>
NEXT_PUBLIC_GA4_ID=<id-de-analisis-google>
```

---

## 💻 Ejecución en Entorno Local

1.  **Instalar dependencias**:
    El proyecto utiliza `pnpm` y está configurado para un entorno de red Windows (`node-linker=hoisted` en `.npmrc`):
    ```bash
    pnpm install
    ```
2.  **Iniciar el servidor de desarrollo**:
    ```bash
    pnpm dev
    ```
3.  Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🚀 Despliegue en Producción

El proyecto está optimizado para su despliegue continuo en **Vercel**:
1.  Conecta tu repositorio de GitHub a Vercel.
2.  Configura las variables de entorno especificadas en `.env.local` en el panel de control de Vercel.
3.  Vercel ejecutará automáticamente la construcción a través de `pnpm build` en cada push a la rama `main`.
