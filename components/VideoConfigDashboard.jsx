'use client';

import { useEffect, useState } from 'react';

export default function VideoConfigDashboard() {
  const [videos, setVideos] = useState([]);
  const [config, setConfig] = useState({ videos: [] });
  const [draftMetadata, setDraftMetadata] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [bunnyStatus, setBunnyStatus] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [videosRes, configRes, bunnyRes] = await Promise.all([
          fetch('/api/bunny-videos'),
          fetch('/api/video-config'),
          fetch('/api/bunny-status'),
        ]);

        if (!videosRes.ok || !configRes.ok) {
          throw new Error('No se pudo cargar la configuración de videos');
        }

        const videosData = await videosRes.json();
        const configData = await configRes.json();
        const bunnyData = bunnyRes.ok ? await bunnyRes.json() : { configured: false };

        setVideos(videosData.videos || []);
        setConfig(configData);
        setBunnyStatus(bunnyData);
      } catch (err) {
        setError(err.message || 'Error al cargar la configuración');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  useEffect(() => {
    if (!videos.length) return;

    const metadata = {};
    videos.forEach((video) => {
      const existing = config.videos?.find((item) => item.videoId === video.id);
      metadata[video.id] = {
        title: existing?.title ?? video.title,
        description: existing?.description ?? video.description ?? '',
      };
    });

    setDraftMetadata(metadata);
  }, [videos, config]);

  function findConfig(videoId) {
    return {
      videoId,
      enabled: false,
      indexable: true,
      ...config.videos?.find((item) => item.videoId === videoId),
    };
  }

  async function updateVideo(videoId, updates) {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/video-config', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoId, ...updates }),
      });

      if (!response.ok) {
        throw new Error('No se pudo actualizar la configuración');
      }

      const updatedConfig = await response.json();
      setConfig(updatedConfig);
    } catch (err) {
      setError(err.message || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Cargando configuración de videos...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-bg p-6 shadow-sm">
        <h2 className="font-display text-2xl text-ink mb-2">Configuración de videos</h2>
        <p className="font-body text-mid text-sm text-muted leading-relaxed">
          Aquí puedes habilitar los videos que se muestran en el sitio, editar su metadata y controlar la indexación.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-bg p-6 shadow-sm">
        <h3 className="font-display text-xl text-ink mb-4">Estado de Bunny Stream</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-body text-mid text-sm text-muted">API Configurada:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                bunnyStatus?.configured
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {bunnyStatus?.configured ? 'Sí' : 'No (usando datos locales)'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-mid text-sm text-muted">Library ID:</span>
            <span className="font-mono text-sm text-ink">{bunnyStatus?.libraryId || 'No configurado'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-mid text-sm text-muted">CDN Hostname:</span>
            <span className="font-mono text-sm text-ink">{bunnyStatus?.cdnHostname || 'No configurado'}</span>
          </div>
          {!bunnyStatus?.configured && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="font-body text-mid text-sm text-yellow-800">
                Para activar la API de Bunny Stream, agrega tu <code className="font-mono bg-yellow-100 px-1 py-0.5 rounded">BUNNY_API_KEY</code> al archivo <code className="font-mono bg-yellow-100 px-1 py-0.5 rounded">.env.local</code>.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {videos.map((video) => {
          const videoConfig = findConfig(video.id);
          const draft = draftMetadata[video.id] || {
            title: video.title,
            description: video.description || '',
          };

          const hasMetadataChanges =
            draft.title !== (videoConfig.title ?? video.title) ||
            draft.description !== (videoConfig.description ?? video.description ?? '');

          return (
            <article key={video.id} className="group rounded-3xl border border-border bg-bg p-4 shadow-sm transition hover:shadow-lg">
              <div className="overflow-hidden rounded-3xl border border-border bg-s2">
                <img
                  src={video.thumbnailUrl || '/images/placeholder-video.jpg'}
                  alt={video.thumbnailAlt || video.title}
                  className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-display text-lg text-ink line-clamp-2">{video.title}</h3>
                  <p className="mt-1 text-xs text-muted">
                    {video.uploadDate} · {video.duration}
                  </p>
                </div>
                <div className="rounded-full bg-s1 px-3 py-1 text-xs font-medium text-ink">
                  {videoConfig.enabled ? 'ON' : 'OFF'}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {video.organization && (
                  <span className="rounded-full bg-s2 px-2 py-1 text-[11px] uppercase tracking-[0.18rem] text-muted">
                    {video.organization}
                  </span>
                )}
                {video.category && (
                  <span className="rounded-full bg-s2 px-2 py-1 text-[11px] uppercase tracking-[0.18rem] text-muted">
                    {video.category}
                  </span>
                )}
              </div>

              <div className="mt-5 space-y-3 rounded-3xl border border-border bg-bg p-4">
                <div>
                  <label className="font-medium text-sm text-ink">Título</label>
                  <input
                    type="text"
                    value={draft.title}
                    onChange={(event) =>
                      setDraftMetadata((prev) => ({
                        ...prev,
                        [video.id]: { ...prev[video.id], title: event.target.value },
                      }))
                    }
                    className="mt-2 w-full rounded-2xl border border-border bg-s2 px-4 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>
                <div>
                  <label className="font-medium text-sm text-ink">Descripción</label>
                  <textarea
                    value={draft.description}
                    onChange={(event) =>
                      setDraftMetadata((prev) => ({
                        ...prev,
                        [video.id]: { ...prev[video.id], description: event.target.value },
                      }))
                    }
                    rows={3}
                    className="mt-2 w-full rounded-3xl border border-border bg-s2 px-4 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateVideo(video.id, {
                      title: draft.title,
                      description: draft.description,
                    })
                  }
                  disabled={!hasMetadataChanges || saving}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-bg transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Guardar metadatos
                </button>
              </div>

              <div className="mt-4 grid gap-2 text-xs text-muted">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-s2 px-2 py-1">ID: {video.id}</span>
                  <span className="rounded-full bg-s2 px-2 py-1">Library: {video.bunnyLibraryId}</span>
                </div>
                <span className="rounded-full bg-s2 px-2 py-1">Slug: {video.slug || '—'}</span>
              </div>
            </article>
          );
        })}
      </div>

      {saving && <p className="text-muted">Guardando cambios...</p>}
    </div>
  );
}
