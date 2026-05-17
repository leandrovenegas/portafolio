import cron from 'node-cron';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import axios from 'axios';
import WebSocket from 'ws';

dotenv.config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL; // ej: https://graph.facebook.com/v19.0/PHONE_NUMBER_ID/messages
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const MY_PHONE_NUMBER = process.env.MY_PHONE_NUMBER;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase configuration in .env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  global: { WebSocket }
});

console.log("[WorkTree] Cron Agent Iniciado. Esperando tareas...");

// Se ejecuta todos los días a las 09:00 AM
cron.schedule('0 9 * * *', async () => {
    console.log(`[Cron] Verificando tareas pendientes... (${new Date().toISOString()})`);
    
    try {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).toISOString();

        // Buscar tareas pendientes que vencen hoy (o vencieron antes) y que no se ha enviado whatsapp
        const { data: tasks, error } = await supabase
            .from('tasks')
            .select(`
                id, 
                title, 
                due_date,
                plan_versions (
                    topic_id,
                    plan_topics (name)
                )
            `)
            .eq('status', 'pending')
            .eq('whatsapp_sent', false)
            .lte('due_date', endOfDay); // Que sean para hoy o atrasadas

        if (error) throw error;

        if (!tasks || tasks.length === 0) {
            console.log("[Cron] No hay tareas pendientes para alertar hoy.");
            return;
        }

        console.log(`[Cron] Encontradas ${tasks.length} tareas pendientes.`);

        for (const task of tasks) {
            const topicName = task.plan_versions?.plan_topics?.name || "Sin Tópico";
            
            // Si la Meta API no está configurada, mostramos log y saltamos (Graceful handler)
            if (!WHATSAPP_API_URL || !WHATSAPP_TOKEN || !MY_PHONE_NUMBER) {
                console.log(`[Simulación WA] Para enviar: [${topicName}] ${task.title}`);
                continue;
            }

            try {
                // Enviar mensaje vía WhatsApp Cloud API
                await axios.post(
                    WHATSAPP_API_URL,
                    {
                        messaging_product: "whatsapp",
                        to: MY_PHONE_NUMBER,
                        type: "text",
                        text: {
                            body: `🔔 Tarea Pendiente: [${topicName}]\n\n*${task.title}*\n\nResponde "OK" para marcarla como completada.`
                        }
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                // Marcar whatsapp_sent = true
                await supabase
                    .from('tasks')
                    .update({ whatsapp_sent: true })
                    .eq('id', task.id);
                
                console.log(`[v] Alerta enviada para tarea: ${task.id}`);
            } catch (waError) {
                console.error(`[X] Error enviando WhatsApp para tarea ${task.id}:`, waError.response?.data || waError.message);
                // No actualizamos whatsapp_sent para que reintente mañana
            }
        }

    } catch (err) {
        console.error("[Cron] Error general:", err);
    }
});
