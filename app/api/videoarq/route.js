import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { messages, apiKey, model: reqModel, systemPrompt: reqSystemPrompt } = await req.json();

    const finalApiKey = apiKey || process.env.GEMINI_API_KEY;

    if (!finalApiKey) {

      console.error('Error: GEMINI_API_KEY no está configurada.');
      return NextResponse.json({ error: 'Falta configurar GEMINI_API_KEY.' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(finalApiKey);

    const defaultSystemPrompt = `Eres VideoARQ, el asistente de calificación de Leandro Venegas. 

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

    const finalSystemPrompt = reqSystemPrompt || defaultSystemPrompt;
    const finalModel = reqModel || 'gemini-2.5-flash';

    const model = genAI.getGenerativeModel({
      model: finalModel,
      systemInstruction: finalSystemPrompt,

    });

    // Transformamos los mensajes que ya existen excepto el último que es el mensaje a enviar
    // Gemini requiere estrictamente que el historial comience con un rol 'user', así que omitimos el primer saludo del bot
    let historyMessages = messages.slice(0, -1);
    if (historyMessages.length > 0 && historyMessages[0].role === 'assistant') {
      historyMessages = historyMessages.slice(1);
    }

    const history = historyMessages.map(msg => ({
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
    // Para depuración, enviamos el mensaje de error real al frontend
    const errorMessage = error.message || 'Hubo un error con el asistente.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });

  }
}
