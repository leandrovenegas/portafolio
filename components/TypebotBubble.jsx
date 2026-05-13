'use client'

import { useEffect, useRef } from 'react'

export default function TypebotBubble() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

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
          button: { backgroundColor: "#222222" },
        },
      });
    `
    document.body.appendChild(script)
  }, [])

  return null
}
