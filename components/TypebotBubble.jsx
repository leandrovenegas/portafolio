'use client'

import { Bubble } from '@typebot.io/react'

export default function TypebotBubble() {
  return (
    <Bubble
      typebot="my-typebot-p77m21l"
      previewMessage={{
        message: "¿Qué vendes? Te armo el sistema 👇",
        autoShowDelay: 0,
      }}
      theme={{
        button: {
          backgroundColor: "#222222", // Usando un gris oscuro en vez de negro puro para que no se pierda en el fondo negro
          customIconSrc: "https://www.typebot.io/favicon.png", // Un icono para que resalte
        },
      }}
    />
  )
}
