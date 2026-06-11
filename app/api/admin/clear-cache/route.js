import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

async function isAdmin() {
  const jar = await cookies();
  const sess = jar.get('admin_session');
  return sess?.value === 'active';
}

export async function POST(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    revalidatePath('/', 'layout');

    return NextResponse.json({
      ok: true,
      deleted: true,
      message: '✅ Caché limpiada correctamente con revalidatePath.'
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Error al limpiar caché: ${err.message}` },
      { status: 500 }
    );
  }
}
