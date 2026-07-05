'use server';

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

let supabaseClient: any = null;

function getSupabase() {
  if (!supabaseClient) {
    const url = process.env.NEXT_PUBLIC_SPR_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SPR_SUPABASE_ANON_KEY;
    if (!url || !key) {
      console.error('Supabase env vars NEXT_PUBLIC_SPR_SUPABASE_URL or NEXT_PUBLIC_SPR_SUPABASE_ANON_KEY are missing');
      return null;
    }
    supabaseClient = createClient(url, key);
  }
  return supabaseClient;
}

const resend = new Resend(process.env.RESEND_API_KEY);


/**
 * Registra la primera visita web del lead.
 * Inserta en outreach solo si no existe un registro previo canal='web' para ese lead.
 */
export async function registerPageVisit(leadId: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

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
  email: string,
  businessName: string
): Promise<{ success: boolean; error?: string }> {

  const supabase = getSupabase();
  let dbErrorMsg: string | null = null;

  if (supabase) {
    const { error } = await supabase.from('email_leads').insert({
      lead_id: leadId,
      email: email,
      business_name: businessName,
    });
    if (error) {
      console.error('Error submitting email lead to database:', error.message);
      dbErrorMsg = error.message;
    }
  } else {
    dbErrorMsg = 'Supabase environment variables are missing or client failed to initialize';
    console.error(dbErrorMsg);
  }

  // Envío del email sin bloquear el flujo principal si falla, garantizando el envío a leandrovenegasoficial@gmail.com
  let emailSent = false;
  try {
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'leandrovenegasoficial@gmail.com',
      subject: `Nuevo lead: video extendido - ${businessName}`,
      html: `
        <p><strong>Nuevo lead registrado para el video extendido:</strong></p>
        <ul>
          <li><strong>Email del cliente:</strong> ${email}</li>
          <li><strong>Nombre del negocio:</strong> ${businessName}</li>
          <li><strong>Lead ID:</strong> ${leadId}</li>
        </ul>
        ${dbErrorMsg ? `<p style="color: red; font-size: 12px;"><strong>Nota del sistema:</strong> No se pudo guardar en la base de datos (${dbErrorMsg}). El email se envió correctamente de todas formas.</p>` : ''}
      `,
    });
    if (emailError) {
      console.error('Error sending email notification via Resend:', emailError);
    } else {
      console.log('Email notification sent successfully:', emailData);
      emailSent = true;
    }
  } catch (resendError) {
    console.error('Unexpected error sending email notification via Resend:', resendError);
  }

  // Consideramos que la operación fue exitosa si se envió el email, o si al menos se guardó en la base de datos
  if (emailSent || !dbErrorMsg) {
    return { success: true };
  }

  return { success: false, error: dbErrorMsg || 'Error al procesar la solicitud' };
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
  if (!supabase) return;

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