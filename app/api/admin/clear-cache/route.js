import { NextResponse } from 'next/server';
import { cookies }      from 'next/headers';
import fs               from 'fs';
import path             from 'path';

// ─── Auth guard ────────────────────────────────────────────────────────────
async function isAdmin() {
  const jar  = await cookies();
  const sess = jar.get('admin_session');
  return sess?.value === 'active';
}

// ─── POST /api/admin/clear-cache ───────────────────────────────────────────
// Body (optional): { restart: true }   → exit process so pm2/supervisor restarts it
export async function POST(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body       = await request.json().catch(() => ({}));
    const doRestart  = body?.restart === true;

    // Root of the Next.js project (the CWD of the running server)
    const projectRoot = process.cwd();
    const cacheDir    = path.join(projectRoot, '.next', 'cache');

    let deleted = false;
    if (fs.existsSync(cacheDir)) {
      fs.rmSync(cacheDir, { recursive: true, force: true });
      deleted = true;
    }

    const payload = {
      ok:      true,
      deleted,
      path:    cacheDir,
      restart: doRestart,
      message: deleted
        ? `✅ Caché eliminado: .next/cache${doRestart ? ' — el servidor se reiniciará.' : ''}`
        : `ℹ️ La carpeta .next/cache no existía.${doRestart ? ' El servidor se reiniciará.' : ''}`,
    };

    // If the caller requested a restart AND there is a process manager,
    // exit with code 0 — pm2 / nodemon / supervisor will relaunch automatically.
    // We respond FIRST so the client receives the JSON before the process exits.
    if (doRestart) {
      const res = NextResponse.json(payload);
      // Schedule the exit AFTER the response is flushed (~300 ms is enough)
      setTimeout(() => process.exit(0), 300);
      return res;
    }

    return NextResponse.json(payload);
  } catch (err) {
    return NextResponse.json(
      { error: `Error al limpiar caché: ${err.message}` },
      { status: 500 }
    );
  }
}
