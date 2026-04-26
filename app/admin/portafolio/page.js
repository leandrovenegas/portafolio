'use client';

import { useState, useEffect, useCallback } from 'react';

// ─── Field editor inside each org card ───────────────────────────────────────
function Field({ label, value, onChange, type = 'text', rows }) {
  if (type === 'textarea') {
    return (
      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-1.5">{label}</label>
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={rows || 3}
          className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-ink outline-none transition focus:border-accent focus:ring-1 focus:ring-accent resize-y font-body"
        />
      </div>
    );
  }
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-1.5">{label}</label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-ink outline-none transition focus:border-accent focus:ring-1 focus:ring-accent font-body"
      />
    </div>
  );
}

// ─── MDX Editor panel ─────────────────────────────────────────────────────────
function MdxEditor({ slug, markdownUrl }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    if (!markdownUrl) { setContent('Sin contenido MDX vinculado.'); return; }
    setLoading(true);
    const res = await fetch(`/api/admin-portafolio-mdx?slug=${slug}`);
    const data = await res.json();
    setContent(data.content || '');
    setLoading(false);
  }, [slug, markdownUrl]);

  useEffect(() => {
    if (open) load();
  }, [open, load]);

  async function save() {
    setSaving(true);
    setMsg('');
    const res = await fetch('/api/admin-portafolio-mdx', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, content }),
    });
    setSaving(false);
    setMsg(res.ok ? '✓ Guardado' : '✗ Error al guardar');
    setTimeout(() => setMsg(''), 3000);
  }

  return (
    <div className="mt-4 border-t border-border pt-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 font-mono text-xs text-accent hover:text-ink transition-colors"
      >
        <span>{open ? '▲' : '▼'}</span>
        {open ? 'Ocultar editor MDX' : 'Editar contenido MDX'}
      </button>

      {open && (
        <div className="mt-4 space-y-3">
          {loading ? (
            <p className="text-muted text-xs">Cargando contenido...</p>
          ) : (
            <>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                className="w-full rounded-xl border border-border bg-s1 px-4 py-3 text-xs text-ink outline-none transition focus:border-accent focus:ring-1 focus:ring-accent resize-y font-mono"
                spellCheck={false}
              />
              <div className="flex items-center gap-4">
                <button
                  onClick={save}
                  disabled={saving}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2 text-sm font-semibold text-bg transition hover:bg-accent/90 disabled:opacity-50"
                >
                  {saving ? 'Guardando...' : 'Guardar MDX'}
                </button>
                {msg && <span className="text-sm font-mono text-accent">{msg}</span>}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Single org card ──────────────────────────────────────────────────────────
function OrgCard({ org: initial }) {
  const [org, setOrg] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [dirty, setDirty] = useState(false);

  function set(field, value) {
    setOrg((o) => ({ ...o, [field]: value }));
    setDirty(true);
  }

  async function save() {
    setSaving(true);
    setMsg('');
    const res = await fetch('/api/admin-portafolio', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: org.id,
        seo_title: org.seo_title,
        seo_description: org.seo_description,
        og_image: org.og_image,
        keywords: org.keywords,
        is_indexed: org.is_indexed,
      }),
    });
    setSaving(false);
    if (res.ok) {
      setDirty(false);
      setMsg('✓ Guardado');
    } else {
      setMsg('✗ Error');
    }
    setTimeout(() => setMsg(''), 3000);
  }

  return (
    <article className="rounded-2xl border border-border bg-bg shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-s1/40">
        <div className="min-w-0">
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent">{org.type}</span>
          <h3 className="font-display text-lg text-ink mt-0.5 truncate">{org.name}</h3>
          <a
            href={`/portafolio/${org.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-accent transition-colors"
          >
            /portafolio/{org.slug} ↗
          </a>
        </div>

        {/* Indexed toggle */}
        <button
          onClick={() => { set('is_indexed', !org.is_indexed); }}
          className={`shrink-0 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border ${
            org.is_indexed
              ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200'
              : 'bg-s2 text-muted border-transparent hover:bg-s3'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${org.is_indexed ? 'bg-green-500' : 'bg-muted'}`} />
          {org.is_indexed ? 'Indexado' : 'No indexado'}
        </button>
      </div>

      {/* SEO Fields */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="SEO Title" value={org.seo_title} onChange={(v) => set('seo_title', v)} />
        <Field label="OG Image URL" value={org.og_image} onChange={(v) => set('og_image', v)} />
        <div className="md:col-span-2">
          <Field
            label="SEO Description"
            value={org.seo_description}
            onChange={(v) => set('seo_description', v)}
            type="textarea"
            rows={2}
          />
        </div>
        <div className="md:col-span-2">
          <Field
            label="Keywords (separadas por coma)"
            value={Array.isArray(org.keywords) ? org.keywords.join(', ') : org.keywords || ''}
            onChange={(v) => set('keywords', v)}
          />
        </div>

        {/* og_image preview */}
        {org.og_image && (
          <div className="md:col-span-2">
            <label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-1.5">Vista previa OG Image</label>
            <img
              src={org.og_image}
              alt="OG Image preview"
              className="h-32 w-auto rounded-lg object-cover border border-border"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}

        {/* Save button */}
        <div className="md:col-span-2 flex items-center gap-4 pt-2 border-t border-border">
          <button
            onClick={save}
            disabled={!dirty || saving}
            className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-2 text-sm font-semibold text-bg transition hover:bg-ink/80 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {saving ? 'Guardando...' : dirty ? 'Guardar cambios SEO' : 'Sin cambios'}
          </button>
          {msg && <span className="font-mono text-sm text-accent">{msg}</span>}
        </div>
      </div>

      {/* MDX Editor */}
      {org.markdown_url && (
        <div className="px-6 pb-6">
          <MdxEditor slug={org.slug} markdownUrl={org.markdown_url} />
        </div>
      )}
    </article>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AdminPortafolioPage() {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/admin-portafolio')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); }
        else { setOrgs(data.organizations || []); }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = orgs.filter((o) =>
    o.name?.toLowerCase().includes(search.toLowerCase()) ||
    o.slug?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <header className="border-b border-border pb-8">
        <h1 className="font-display text-display-sm text-ink mb-2">Portafolio</h1>
        <p className="font-body text-mid text-lg text-muted">
          Edita los campos SEO y el contenido MDX de cada organización en tu portafolio.
        </p>
      </header>

      {/* Stats */}
      {!loading && (
        <div className="flex gap-6 flex-wrap">
          <div className="rounded-2xl border border-border bg-bg p-4 flex flex-col gap-1 min-w-32">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Total</span>
            <span className="font-display text-3xl text-ink">{orgs.length}</span>
          </div>
          <div className="rounded-2xl border border-border bg-bg p-4 flex flex-col gap-1 min-w-32">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Indexados</span>
            <span className="font-display text-3xl text-green-600">{orgs.filter((o) => o.is_indexed).length}</span>
          </div>
          <div className="rounded-2xl border border-border bg-bg p-4 flex flex-col gap-1 min-w-32">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Con MDX</span>
            <span className="font-display text-3xl text-accent">{orgs.filter((o) => o.markdown_url).length}</span>
          </div>
        </div>
      )}

      {/* Search */}
      <input
        type="search"
        placeholder="Buscar organización..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-ink outline-none transition focus:border-accent focus:ring-1 focus:ring-accent font-body"
      />

      {/* Loading / Error / List */}
      {loading && (
        <p className="text-muted text-sm font-mono">Cargando organizaciones...</p>
      )}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-red-700 text-sm font-mono">Error: {error}</p>
        </div>
      )}
      {!loading && !error && (
        <div className="flex flex-col gap-6">
          {filtered.length === 0 ? (
            <p className="text-muted text-sm">No se encontraron organizaciones.</p>
          ) : (
            filtered.map((org) => <OrgCard key={org.id} org={org} />)
          )}
        </div>
      )}
    </div>
  );
}
