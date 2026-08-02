# Registro de Estandarización de CSS Grid (GRID_STANDARDIZATION_LOG.md)

Este documento registra la auditoría y migración completa de los **20 componentes de sección** del Page Builder hacia el sistema unificado de **CSS Grid Mobile-First**.

---

## Resumen de Auditoría y Migración

| Componente | Patrón Aplicado | Breakpoints con comportamiento distinto | Requiere Revisión Manual (Sí/No) |
| :--- | :--- | :--- | :--- |
| `AvatarTextSection.jsx` | **Contenido + Media** | **Mobile**: 1 columna apilada<br>**md+**: 2 columnas split (texto col-1, avatar col-2) | **No** |
| `HeroEditorialSection.jsx` | **Contenido + Media** | **Mobile**: 1 columna apilada<br>**md+**: 2 columnas split (headline/buttons col-span-2, avatar col-start-2) | **No** |
| `CellPhoneCTASection.jsx` | **Contenido + Media** | **Mobile**: 1 columna apilada<br>**md+**: 2 columnas (texto col-1, botón col-2) | **No** |
| `VideoReelSection.jsx` | **Contenido + Media** | **Mobile**: 1 columna apilada<br>**md+**: 2 columnas (texto col-1, reel player col-2) | **No** |
| `ServicesSection.jsx` | **Grilla de Tarjetas** | **Mobile**: 1 columna apilada<br>**md+**: 2 columnas de tarjetas | **No** |
| `FormatsSection.jsx` | **Grilla de Tarjetas** | **Mobile**: 1 columna apilada<br>**md+**: 3 columnas de tarjetas | **No** |
| `LogosSection.jsx` | **Grilla de Logos** | **Mobile**: 2 columnas<br>**md**: 4 columnas<br>**lg**: 6 columnas | **No** |
| `FAQSection.jsx` | **Grilla de Tarjetas** | **Mobile**: 1 columna apilada<br>**md+**: 2 columnas de preguntas frecuentes | **No** |
| `ListSection.jsx` | **Grilla de Tarjetas** | **Mobile**: 1 columna apilada<br>**md**: 2 columnas<br>**lg**: 3 columnas | **No** |
| `ServiceButtonsSection.jsx` | **Grilla de Tarjetas** | **Mobile**: 1 columna apilada<br>**md+**: 3 columnas de botones | **No** |
| `CTASection.jsx` | **Columna Única Centrada** | **Mobile/Tablet/Desktop**: 1 columna centrada explícita | **No** |
| `CTAWhatsapp.jsx` | **Columna Única Centrada** | **Mobile/Tablet/Desktop**: 1 columna centrada explícita | **No** |
| `SimpleCenteredCTA.jsx` | **Columna Única Centrada** | **Mobile/Tablet/Desktop**: 1 columna centrada explícita | **No** |
| `FinalCTASection.jsx` | **Columna Única Centrada** | **Mobile/Tablet/Desktop**: 1 columna centrada explícita | **No** |
| `EstrelasSection.jsx` | **Columna Única Centrada** | **Mobile/Tablet/Desktop**: 1 columna centrada explícita | **No** |
| `TextSection.jsx` | **Columna Única** | **Mobile/Tablet/Desktop**: 1 columna explícita | **No** |
| `AvatarSection.jsx` | **Columna Única Centrada** | **Mobile/Tablet/Desktop**: 1 columna centrada explícita | **No** |
| `HeroVideoSection.jsx` | **Columna Única** | **Mobile/Tablet/Desktop**: 1 columna explícita | **No** |
| `TituloAnimado.tsx` | **Columna Única Centrada** | **Mobile/Tablet/Desktop**: 1 columna centrada explícita | **No** |
| `TextosAnimados.tsx` | **Columna Única Centrada** | **Mobile/Tablet/Desktop**: 1 columna centrada explícita | **No** |

---

## Verificaciones Realizadas

1. **Jerarquía de Hijo Directo (`HIJO DIRECTO`)**: Se comprobó en los 20 componentes que los atributos `col-span-*`, `row-span-*` y `col-start-*` estén declarados directamente sobre elementos hijos inmediatos de un contenedor con `grid`.
2. **Preservación de Código y Lógica**: Cero modificaciones en Supabase, handlers de edición, o atributos `data-field` / `fieldStyle`.
3. **Breakpoints Mobile-First**: Las clases sin prefijo establecen la vista móvil (1 columna por defecto), y únicamente los prefijos `md:` y `lg:` modifican el diseño para dispositivos de pantalla más ancha.
