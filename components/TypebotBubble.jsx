'use client'

import Script from 'next/script'

export default function TypebotBubble() {
  return (
    <Script
      id="typebot-init-script"
      type="module"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
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
      }}
    />
  )
}
