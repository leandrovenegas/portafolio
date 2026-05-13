'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Ocurrió un error al intentar iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-s1 border border-border rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl text-ink mb-2">Acceso Admin</h1>
              <p className="font-body text-muted text-sm">Ingresa tus credenciales para gestionar el portafolio</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-2">Usuario</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-1 focus:ring-accent font-body"
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-2">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-1 focus:ring-accent font-body"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-center">
                  <p className="text-red-600 text-xs font-mono">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-bg transition hover:bg-accent disabled:opacity-50"
              >
                {loading ? 'Verificando...' : 'Entrar al Panel'}
              </button>
            </form>
          </div>
          
          <p className="text-center mt-8 font-mono text-[10px] text-muted uppercase tracking-widest">
            Protegido por Antigravity
          </p>
        </div>
      </main>
    </>
  );
}
