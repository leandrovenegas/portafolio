import chokidar from 'chokidar';
import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import os from 'os';

dotenv.config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase configuration in .env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Use ~/workplans as the watch directory
const HOME_DIR = os.homedir();
const WATCH_DIR = path.join(HOME_DIR, 'workplans');

console.log(`[WorkTree] Iniciando File Watcher en: ${WATCH_DIR}`);

// Intentar crear el directorio si no existe (solo por conveniencia)
try {
  await fs.mkdir(WATCH_DIR, { recursive: true });
} catch(e) {}

// Inicializar Chokidar
const watcher = chokidar.watch(WATCH_DIR, {
  ignored: /(^|[\/\\])\../, // ignora archivos ocultos
  persistent: true,
  depth: 1 // Solo espera carpetas (topics) de 1 nivel de profundidad
});

watcher.on('add', async (filePath) => {
  if (!filePath.endsWith('.md')) return;
  await processFile(filePath);
});

watcher.on('change', async (filePath) => {
  if (!filePath.endsWith('.md')) return;
  await processFile(filePath);
});

async function processFile(filePath) {
  try {
    const topicName = path.basename(path.dirname(filePath));
    const fileName = path.basename(filePath);
    
    // Evitar procesar archivos en la raiz de workplans, deben estar en una carpeta
    if (topicName === 'workplans') return;

    const content = await fs.readFile(filePath, 'utf-8');

    console.log(`[+] Detectado cambio en: ${topicName}/${fileName}`);

    // 1. Asegurar que el Topic existe
    let { data: topic, error: topicErr } = await supabase
      .from('plan_topics')
      .select('id')
      .eq('name', topicName)
      .single();

    if (topicErr && topicErr.code === 'PGRST116') {
        // No existe, crearlo
        const { data: newTopic, error: createErr } = await supabase
            .from('plan_topics')
            .insert([{ name: topicName }])
            .select()
            .single();
            
        if (createErr) throw createErr;
        topic = newTopic;
    } else if (topicErr) {
        throw topicErr;
    }

    // 2. Desactivar versiones previas
    await supabase
      .from('plan_versions')
      .update({ is_active: false })
      .eq('topic_id', topic.id);

    // 3. Crear nueva versión y marcarla como activa
    const { data: newVersion, error: versionErr } = await supabase
      .from('plan_versions')
      .insert([{
        topic_id: topic.id,
        version_name: `${fileName} - ${new Date().toISOString()}`,
        content: content,
        is_active: true
      }])
      .select()
      .single();

    if (versionErr) throw versionErr;

    // 4. Parsear Tareas con Regex
    // Regex busca: - [ ] Titulo de la tarea (fecha opcional)
    // Ej: - [ ] Mi tarea (2026-05-20)
    const taskRegex = /^\s*-\s*\[([ xX])\]\s+(.*?)(?:\s+\(([^)]+)\))?\s*$/gm;
    let match;
    const tasksToInsert = [];

    while ((match = taskRegex.exec(content)) !== null) {
        const isChecked = match[1].toLowerCase() === 'x';
        const title = match[2].trim();
        const dateStr = match[3];

        let dueDate = null;
        if (dateStr) {
            const parsedDate = new Date(dateStr);
            if (!isNaN(parsedDate)) {
                dueDate = parsedDate.toISOString();
            }
        }

        tasksToInsert.push({
            plan_version_id: newVersion.id,
            title: title,
            due_date: dueDate,
            status: isChecked ? 'done' : 'pending'
        });
    }

    if (tasksToInsert.length > 0) {
        const { error: taskErr } = await supabase
            .from('tasks')
            .insert(tasksToInsert);
            
        if (taskErr) throw taskErr;
        console.log(`[v] Procesadas ${tasksToInsert.length} tareas.`);
    }
    
    console.log(`[v] Versión guardada exitosamente en Supabase.`);

  } catch (error) {
    console.error(`[X] Error procesando archivo:`, error);
  }
}
