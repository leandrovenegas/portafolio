#Leandro Venegas portafolio product Manager
audiovisual y productos


bienvenidos al portafolio oficial de
leandro venegas desde la ciudad de Valparaíso Chile
[Leandrovenegas.cl](https://www.leandrovenegas.cl/)

## Configuración

### Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://uzsagsdrjgnifzdzffyg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_uouCyl1ZINmndCwwlP-vZw_c4_2eDkN
NEXT_PUBLIC_BUNNY_LIBRARY_ID=633307
NEXT_PUBLIC_BUNNY_CDN_HOSTNAME=vz-a158839f-ce6.b-cdn.net
BUNNY_API_KEY=tu_api_key_de_bunny_stream
```

### Configuración de Bunny Stream

Para activar la integración completa con Bunny Stream:

1. Ve a tu [dashboard de Bunny Stream](https://panel.bunny.net/stream)
2. Ve a la sección "Account" > "API"
3. Copia tu API Key
4. Agrega la API Key al archivo `.env.local` como `BUNNY_API_KEY`

Si no configuras la API Key, el sitio funcionará con datos locales de respaldo.

### Dashboard de configuración

Una vez configurado, puedes acceder al dashboard de configuración en `/configuracion` para:
- Activar/desactivar videos individuales
- Controlar la indexación por buscadores
- Ver el estado de la API de Bunny