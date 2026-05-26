'use server';

import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Registra la primera visita web del lead.
 * Inserta en outreach solo si no existe un registro previo canal='web' para ese lead.
 */
export async function registerPageVisit(leadId: string): Promise<void> {
  const supabase = getSupabase();

  const { data: existing, error } = await supabase
    .from('outreach')
    .select('id')
    .eq('lead_id', leadId)
    .eq('canal', 'web')
    .limit(1)
    .maybeSingle();

  if (!existing && !error) {
    await supabase.from('outreach').insert({
      lead_id: leadId,
      canal: 'web',
      estado: 'contactado',
      notas: 'Visita inicial a la landing de video'
    });
  }
}

/**
 * Registra que el lead solicitó el video extendido vía email.
 * Inserta un nuevo registro en outreach con canal='email'.
 */
export async function submitEmailLead(
  leadId: string,
  email: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();

  const { error } = await supabase.from('outreach').insert({
    lead_id: leadId,
    canal: 'email',
    estado: 'respondió',
    notas: `Solicitó video extendido (Email: ${email})`,
  });

  if (error) {
    console.error('Error submitting email lead:', error.message);
    return { success: false, error: error.message };
  }
  return { success: true };
}

/**
 * Registra un clic en un CTA de oferta o WhatsApp.
 * Actualiza el último registro outreach del lead con las notas correspondientes.
 * Si no existe ninguno, crea uno nuevo.
 */
export async function logCtaClick(
  leadId: string,
  section: 'personalized' | 'system' | 'cierre'
): Promise<void> {
  const supabase = getSupabase();

  const notasMap = {
    personalized: 'Clic oferta video personalizado',
    system: 'Clic sistema',
    cierre: 'Clic cierre',
  };
  const notas = notasMap[section];

  // Busca el registro web más reciente del lead para actualizarlo
  const { data: existingWeb } = await supabase
    .from('outreach')
    .select('id')
    .eq('lead_id', leadId)
    .eq('canal', 'web')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingWeb) {
    await supabase
      .from('outreach')
      .update({ notas })
      .eq('id', existingWeb.id);
  } else {
    // Si por alguna razón no hay registro previo, crea uno nuevo
    await supabase.from('outreach').insert({
      lead_id: leadId,
      canal: 'web',
      estado: 'contactado',
      notas: `${notas} (sin visita previa registrada)`
    });
  }
}