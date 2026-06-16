'use server';

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SPR_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SPR_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);


/**
 * Registra la primera visita web del lead.
 * Inserta en outreach solo si no existe un registro previo canal='web' para ese lead.
 */
export async function registerPageVisit(leadId: string): Promise<void> {


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

  const { error } = await supabase.from('email_leads').insert({
    lead_id: leadId,
    email: email,
    business_name: businessName,
  });

  if (error) {
    console.error('Error submitting email lead:', error.message);
    return { success: false, error: error.message };
  }

  // Envío del email sin bloquear el flujo principal si falla
  try {
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'leandrovenegasoficial@gmail.com',
      subject: 'Nuevo lead: video extendido',
      html: `
        <p><strong>Nuevo lead registrado:</strong></p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Nombre del negocio:</strong> ${businessName}</li>
          <li><strong>Lead ID:</strong> ${leadId}</li>
        </ul>
      `,
    });
    if (emailError) {
      console.error('Error sending email notification via Resend:', emailError);
    } else {
      console.log('Email notification sent successfully:', emailData);
    }
  } catch (resendError) {
    console.error('Unexpected error sending email notification via Resend:', resendError);
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