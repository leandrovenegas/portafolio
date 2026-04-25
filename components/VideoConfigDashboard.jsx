'use client';

import { useEffect, useState } from 'react';

export default function VideoConfigDashboard() {
  const [videos, setVideos] = useState([]);
  const [config, setConfig] = useState({ videos: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [videosRes, configRes] = await Promise.all([
          fetch('/api/bunny-videos'),
          fetch('/api/video-config'),
        ]);

        if (!videosRes.ok || !configRes.ok) {
          throw new Error('No se pudo cargar la configuración de videos');
        }

        const videosData = await videosRes.json();
        const configData = await configRes.json();

        setVideos(videosData.videos || []);
        setConfig(configData);
      } catch (err) {
        setError(err.message || 'Error al cargar la configuración');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function findConfig(videoId) {
    return config.videos?.find((item) => item.videoId === videoId) || {
      videoId,
      enabled: false,
      indexable: true,
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
          Aquí puedes seleccionar qué videos del catálogo de Bunny se muestran en tu página de video y si deben estar visibles para buscadores.
        </p>
      </div>

      <div className="grid gap-6">
        {videos.map((video) => {
          const videoConfig = findConfig(video.id);

          return (
            <div key={video.id} className="rounded-3xl border border-border bg-bg p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-display text-xl text-ink">{video.title}</h3>
                  <p className="font-body text-sm text-muted leading-relaxed max-w-2xl">
                    {video.description || 'Sin descripción disponible'}
                  </p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={() => updateVideo(video.id, { enabled: !videoConfig.enabled })}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${videoConfig.enabled ? 'bg-accent text-bg' : 'bg-s2 text-ink'}`}
                  >
                    {videoConfig.enabled ? 'Visible en la web' : 'Oculto en la web'}
                  </button>
                  <button
                    type="button"
                    onClick={() => updateVideo(video.id, { indexable: !videoConfig.indexable })}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${videoConfig.indexable ? 'bg-s1 text-ink' : 'bg-red-500 text-bg'}`}
                  >
                    {videoConfig.indexable ? 'Indexable' : 'No indexable'}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 text-xs font-mono text-muted">
                <span>Video ID: {video.id}</span>
                <span>Library: {video.bunnyLibraryId}</span>
                <span>Slug: {video.slug}</span>
              </div>
            </div>
          );
        })}
      </div>

      {saving && <p className="text-muted">Guardando cambios...</p>}
    </div>
  );
}
