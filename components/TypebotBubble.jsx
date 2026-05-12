'use client'

import Script from 'next/script'

export default function TypebotBubble() {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@typebot.io/js@0.3/dist/web.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.Typebot) {
            window.Typebot.initBubble({
              typebot: "my-typebot-p77m21l",
              previewMessage: {
                text: "¿Qué vendes? Te armo el sistema 👇",
                autoShowDelay: 5000,
              },
              theme: {
                button: { backgroundColor: "#000000" },
              },
            });
          }
        }}
      />
    </>
  )
}
