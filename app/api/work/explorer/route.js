import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
import fs from 'fs/promises';
import path from 'path';

// Asegurar que la ruta exista en el filesystem para evitar caídas
const getWorkplansPath = () => path.join(process.cwd(), 'workplans');

export async function POST(req) {
  try {
    const { action, topicName, fileName } = await req.json();

    if (action === 'create-folder') {
      if (!topicName) {
        return NextResponse.json({ error: 'Nombre de la carpeta requerido' }, { status: 400 });
      }

      // 1. Crear en Supabase
      const { data: topic, error: dbError } = await supabase
        .from('plan_topics')
        .insert([{ name: topicName }])
        .select()
        .single();

      if (dbError) throw dbError;

      // 2. Intentar crear en disco local (graceful)
      try {
        const folderPath = path.join(getWorkplansPath(), topicName);
        await fs.mkdir(folderPath, { recursive: true });
      } catch (fsErr) {
        console.warn('[Explorer API] No se pudo crear la carpeta en disco local:', fsErr.message);
      }

      return NextResponse.json({ success: true, topic });
    }

    if (action === 'create-file') {
      if (!topicName || !fileName) {
        return NextResponse.json({ error: 'Faltan parámetros para crear el archivo' }, { status: 400 });
      }

      // Buscar el Tópico en la base de datos
      const { data: topic, error: topicErr } = await supabase
        .from('plan_topics')
        .select('id')
        .eq('name', topicName)
        .single();

      if (topicErr) throw topicErr;

      // Desactivar versiones previas de este tópico
      await supabase
        .from('plan_versions')
        .update({ is_active: false })
        .eq('topic_id', topic.id);

      // Crear contenido por defecto
      const defaultContent = `# ${fileName.replace('.md', '')}\n\n- [ ] Primera tarea de ejemplo (${new Date().toISOString().split('T')[0]})`;

      // 1. Crear versión en Supabase
      const { data: version, error: verErr } = await supabase
        .from('plan_versions')
        .insert([{
          topic_id: topic.id,
          version_name: `${fileName} - ${new Date().toISOString()}`,
          content: defaultContent,
          is_active: true
        }])
        .select()
        .single();

      if (verErr) throw verErr;

      // 2. Intentar crear el archivo en disco local
      try {
        const folderPath = path.join(getWorkplansPath(), topicName);
        await fs.mkdir(folderPath, { recursive: true }); // Asegurar que la carpeta exista
        const filePath = path.join(folderPath, fileName);
        await fs.writeFile(filePath, defaultContent, 'utf-8');
      } catch (fsErr) {
        console.warn('[Explorer API] No se pudo escribir el archivo en disco local:', fsErr.message);
      }

      return NextResponse.json({ success: true, version });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (error) {
    console.error('[Explorer API POST Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { action, topicId, versionId, topicName, fileName } = await req.json();

    if (action === 'delete-folder') {
      if (!topicId || !topicName) {
        return NextResponse.json({ error: 'ID y Nombre de carpeta requeridos' }, { status: 400 });
      }

      // 1. Eliminar de Supabase (las cascadas eliminan versiones y tareas)
      const { error: dbError } = await supabase
        .from('plan_topics')
        .delete()
        .eq('id', topicId);

      if (dbError) throw dbError;

      // 2. Intentar eliminar del disco local (graceful)
      try {
        const folderPath = path.join(getWorkplansPath(), topicName);
        await fs.rm(folderPath, { recursive: true, force: true });
      } catch (fsErr) {
        console.warn('[Explorer API] No se pudo eliminar la carpeta del disco local:', fsErr.message);
      }

      return NextResponse.json({ success: true });
    }

    if (action === 'delete-file') {
      if (!versionId || !topicName || !fileName) {
        return NextResponse.json({ error: 'Faltan parámetros para eliminar el archivo' }, { status: 400 });
      }

      // 1. Eliminar la versión de Supabase
      const { error: dbError } = await supabase
        .from('plan_versions')
        .delete()
        .eq('id', versionId);

      if (dbError) throw dbError;

      // 2. Intentar eliminar del disco local (graceful)
      try {
        const filePath = path.join(getWorkplansPath(), topicName, fileName);
        await fs.rm(filePath, { force: true });
      } catch (fsErr) {
        console.warn('[Explorer API] No se pudo eliminar el archivo del disco local:', fsErr.message);
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (error) {
    console.error('[Explorer API DELETE Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
