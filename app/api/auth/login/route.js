import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const adminUser = process.env.ADMIN_USER;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUser || !adminPassword) {
      return NextResponse.json({ 
        success: false, 
        message: 'Variables de entorno ADMIN_USER o ADMIN_PASSWORD no configuradas en el servidor.' 
      }, { status: 500 });
    }

    if (username === adminUser && password === adminPassword) {
      const response = NextResponse.json({ success: true });
      
      const proto = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol || '';
      const isSecure = process.env.NODE_ENV === 'production' && proto.startsWith('https');

      // Set a simple auth cookie. In a production app, this should be a JWT or similar session token.
      // For this local CMS, a simple flag is enough for basic protection.
      (await cookies()).set('admin_session', 'active', {
        httpOnly: true,
        secure: isSecure,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ success: false, message: 'Credenciales inválidas' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error en el servidor' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  (await cookies()).delete('admin_session');
  return response;
}
