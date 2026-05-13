import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Por favor ingresa un email válido.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email: normalizedEmail }])
      .select();

    if (error) {
      const isDuplicate = error.code === '23505' || error.message?.toLowerCase().includes('duplicate');
      return NextResponse.json(
        {
          error: isDuplicate
            ? 'Este correo ya está suscrito.'
            : error.message || 'No se pudo guardar el email.',
        },
        { status: isDuplicate ? 409 : 400 }
      );
    }

    return NextResponse.json(
      { message: '¡Gracias por suscribirte! Te mantendremos informado.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('API newsletter error:', error);
    return NextResponse.json(
      { error: 'Error del servidor. Intenta más tarde.' },
      { status: 500 }
    );
  }
}
