'use client'

import { useEffect, useState } from 'react'

export default function TypebotBubble() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Definimos la función de carga
    const script = document.createElement('script')
    script.type = 'module'
    script.innerHTML = `
      import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0.3/dist/web.js'

      Typebot.initBubble({
        typebot: "my-typebot-p77m21l",
        previewMessage: {
          text: "¿Qué vendes? Te armo el sistema 👇",
          autoShowDelay: 0,
        },
        theme: {
          button: { backgroundColor: "#000000" },
        },
      });
    `
    document.body.appendChild(script)

    return () => {
      // Limpieza opcional si fuera necesario
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  if (!isMounted) return null

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 999999, background: 'red', color: 'white', padding: '10px', borderRadius: '8px' }}>
      TypebotBubble Renderizado
    </div>
  )
}
