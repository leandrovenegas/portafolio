import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Asegúrate de definir GEMINI_API_KEY en tu archivo .env.local
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error('Error: GEMINI_API_KEY no está configurada.');
      return NextResponse.json({ error: 'Falta configurar GEMINI_API_KEY.' }, { status: 500 });
    }

    const { messages } = await req.json();

    const systemPrompt = `Eres VideoARQ, el asistente de calificación de Leandro Venegas. 
Tu único objetivo es hacer 4 preguntas en orden para entender el negocio del prospecto. No respondas preguntas fuera de este flujo. No des consejos. No te salgas del guión. 
Cuando termines las 4 preguntas y captures el email, muestra el resumen y el botón de WhatsApp.
Habla en español, tono cercano y profesional.

Las preguntas en orden son:
1. ¿Qué vendes y a quién va dirigido?
2. ¿Tienes redes sociales o sitio web? (si responde sí, pedir el link)
3. ¿Cuál es tu mayor problema hoy? (dar opciones: nadie me conoce / me conocen pero no confían / confían pero no compran / todo lo anterior)
4. ¿Cuánto inviertes hoy en marketing al mes? (dar opciones: nada / menos de $200.000 CLP / entre $200.000 y $500.000 CLP / más de $500.000 CLP)

Después de la 4ta pregunta, pide el email. Una vez que tengas el email, genera el siguiente enlace de WhatsApp EXACTAMENTE ASÍ, reemplazando las variables con la información que recolectaste y sin agregar markdown adicional al enlace (sólo pon la URL directa para que el usuario pueda hacer clic):
https://wa.me/56988804299?text=Hola+Leandro%2C+vengo+del+sitio.+Vendo:+[que_vendes]+Redes/Web:+[link_redes]+Mi+problema:+[problema_principal]+Inversión:+[inversion_marketing]+Email:+[email_prospecto]`;

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemPrompt,
    });

    // Gemini requiere el historial en un formato específico (role: 'user' o 'model')
    // Transformamos los mensajes que ya existen excepto el último que es el mensaje a enviar
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({
      history: history,
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const replyText = result.response.text();

    return NextResponse.json({ text: replyText });
  } catch (error) {
    console.error('Error en VideoARQ API (Gemini):', error);
    return NextResponse.json({ error: 'Hubo un error con el asistente.' }, { status: 500 });
  }
}
