'use client';

import { useState, useEffect } from 'react';
import VideoConfigDashboard from '@/components/VideoConfigDashboard';

export default function AdminVideosPage() {
  const [pageText, setPageText] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch('/api/page-config');
        if (res.ok) {
          const data = await res.json();
          if (data.pages?.videos) {
            setPageText({
              title: data.pages.videos.title || '',
              description: data.pages.videos.description || ''
            });
          }
        }
      } catch (err) {
        console.error('Failed to load page config', err);
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  async function handleSavePageText(e) {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      const res = await fetch('/api/page-config', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageKey: 'videos',
          title: pageText.title,
          description: pageText.description,
        })
      });

      if (res.ok) {
        setMessage('Textos guardados exitosamente.');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error al guardar los textos.');
      }
    } catch (err) {
      setMessage('Error de red al guardar.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-12">
      <header className="border-b border-border pb-8">
        <h1 className="font-display text-display-sm text-ink mb-2">Página de Videos</h1>
        <p className="font-body text-mid text-lg text-muted">Administra los textos y los videos de la galería principal.</p>
      </header>

      {/* Editor de Textos de la Página */}
      <section className="rounded-3xl border border-border bg-bg p-6 shadow-sm">
        <h2 className="font-display text-2xl text-ink mb-4">Textos Principales</h2>
        <p className="font-body text-sm text-muted mb-6">Modifica el título y la descripción que aparecen en la parte superior de la página de videos pública.</p>
        
        {loading ? (
          <p className="text-muted text-sm">Cargando textos...</p>
        ) : (
          <form onSubmit={handleSavePageText} className="space-y-4 max-w-2xl">
            <div>
              <label className="block font-medium text-sm text-ink mb-2">Título de la Página</label>
              <input 
                type="text" 
                value={pageText.title}
                onChange={(e) => setPageText({ ...pageText, title: e.target.value })}
                className="w-full rounded-2xl border border-border bg-s2 px-4 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                placeholder="Ej. Videos"
              />
            </div>
            <div>
              <label className="block font-medium text-sm text-ink mb-2">Descripción</label>
              <textarea 
                value={pageText.description}
                onChange={(e) => setPageText({ ...pageText, description: e.target.value })}
                rows={4}
                className="w-full rounded-3xl border border-border bg-s2 px-4 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                placeholder="Descripción de la página..."
              />
            </div>
            <div className="flex items-center gap-4 pt-2">
              <button 
                type="submit" 
                disabled={saving}
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-bg hover:bg-accent/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Guardando...' : 'Guardar Textos'}
              </button>
              {message && <span className="text-sm font-medium text-accent">{message}</span>}
            </div>
          </form>
        )}
      </section>

      <div className="border-t border-border pt-12">
        <VideoConfigDashboard />
      </div>
    </div>
  );
}
