import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

// Meta verification
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse('Forbidden', { status: 403 });
}

// Handle incoming messages
export async function POST(request) {
  try {
    const body = await request.json();

    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.value && change.value.messages) {
            const message = change.value.messages[0];
            // const phone = message.from; // Número del remitente si hiciera falta verificar
            const text = message.text?.body?.trim()?.toUpperCase();

            // Solo procesamos si responde "OK" u "OKAY"
            if (text === 'OK' || text === 'OKAY' || text === 'LISTO') {
              // Buscar la tarea pendiente a la que se le envió WhatsApp recientemente
              const { data: pendingTask } = await supabase
                .from('tasks')
                .select('id')
                .eq('status', 'pending')
                .eq('whatsapp_sent', true)
                .order('due_date', { ascending: false })
                .limit(1)
                .single();

              if (pendingTask) {
                // Marcar como completada
                await supabase
                  .from('tasks')
                  .update({ status: 'done' })
                  .eq('id', pendingTask.id);
                  
                console.log(`[Webhook] Tarea ${pendingTask.id} marcada como completada vía WhatsApp`);
              }
            }
          }
        }
      }
    }
    
    // Always return 200 OK to Meta
    return new NextResponse('EVENT_RECEIVED', { status: 200 });
  } catch (error) {
    console.error('[Webhook] Error processing WhatsApp message:', error);
    return new NextResponse('ERROR', { status: 500 });
  }
}
