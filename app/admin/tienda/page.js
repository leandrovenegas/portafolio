"use client";
import { useState, useEffect, useCallback } from 'react';

// ─── Helpers ────────────────────────────────────────────────────────────────
function formatCLP(n) {
  if (!n && n !== 0) return '—';
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n);
}
function fmtDate(d) {
  return new Date(d).toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' });
}

const STATUS_LABELS = { nuevo: 'Nuevo', contactado: 'Contactado', cerrado: 'Cerrado' };
const STATUS_COLORS = {
  nuevo: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  contactado: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  cerrado: 'bg-green-500/10 text-green-400 border-green-500/20',
};

// ─── ProductEditor ───────────────────────────────────────────────────────────
function ProductEditor({ product, onSave }) {
  const [form, setForm] = useState({ ...product, value_stack: product.value_stack || ['', '', '', '', '', ''] });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const setStack = (i, val) => setForm(f => {
    const s = [...(f.value_stack || [])];
    s[i] = val;
    return { ...f, value_stack: s };
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Error');
      const updated = await res.json();
      onSave(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch { alert('Error al guardar'); }
    finally { setSaving(false); }
  };

  const inp = "w-full bg-s3 border border-border rounded-lg px-3 py-2 text-ink font-body text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-muted";
  const lbl = "font-mono text-xs tracking-widest uppercase text-mid block mb-1";

  const isVideo = product.type === 'video';

  return (
    <div className="border border-border bg-s2 rounded-2xl p-6 flex flex-col gap-6">

      {/* Toggle activo */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h3 className="font-display text-xl text-ink">{form.name || 'Producto'}</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <span className="font-mono text-xs text-mid">Activo</span>
          <input type="checkbox" checked={form.is_active ?? true} onChange={e => set('is_active', e.target.checked)}
            className="w-4 h-4 accent-accent" />
        </label>
      </div>

      {/* Campos comunes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Nombre del producto</label>
          <input className={inp} value={form.name || ''} onChange={e => set('name', e.target.value)} />
        </div>
        <div>
          <label className={lbl}>Slug (Para vincular en el Editor)</label>
          <input className={inp} value={form.slug || ''} onChange={e => set('slug', e.target.value)} />
        </div>
        {isVideo && (
          <div>
            <label className={lbl}>Etiqueta del paso</label>
            <input className={inp} placeholder="Paso 1 del sistema" value={form.step_label || ''} onChange={e => set('step_label', e.target.value)} />
          </div>
        )}
        <div className={isVideo ? '' : 'md:col-span-2'}>
          <label className={lbl}>Precio CLP</label>
          <input className={inp} type="number" value={form.price_clp || ''} onChange={e => set('price_clp', parseInt(e.target.value) || null)} />
        </div>
        <div>
          <label className={lbl}>Precio USD</label>
          <input className={inp} type="number" step="0.01" value={form.price_usd || ''} onChange={e => set('price_usd', parseFloat(e.target.value) || null)} />
        </div>
      </div>

      {/* Campos de video */}
      {isVideo && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Headline de la página</label>
              <input className={inp} value={form.headline || ''} onChange={e => set('headline', e.target.value)} />
            </div>
            <div>
              <label className={lbl}>Subtítulo</label>
              <input className={inp} value={form.subtitle || ''} onChange={e => set('subtitle', e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className={lbl}>URL del video</label>
              <input className={inp} placeholder="https://..." value={form.video_url || ''} onChange={e => set('video_url', e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Qué es</label>
              <textarea rows={3} className={inp + ' resize-none'} value={form.what_is || ''} onChange={e => set('what_is', e.target.value)} />
            </div>
            <div>
              <label className={lbl}>Por qué funciona</label>
              <textarea rows={3} className={inp + ' resize-none'} value={form.why_it_works || ''} onChange={e => set('why_it_works', e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={lbl}>Etiqueta prueba social</label>
              <input className={inp} value={form.social_label || ''} onChange={e => set('social_label', e.target.value)} />
            </div>
            <div>
              <label className={lbl}>Número prueba social</label>
              <input className={inp} value={form.social_number || ''} onChange={e => set('social_number', e.target.value)} />
            </div>
            <div>
              <label className={lbl}>Contexto prueba social</label>
              <input className={inp} value={form.social_context || ''} onChange={e => set('social_context', e.target.value)} />
            </div>
          </div>

          <div>
            <label className={lbl}>Value stack (6 ítems)</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
              {[0, 1, 2, 3, 4, 5].map(i => (
                <input key={i} className={inp} placeholder={`Ítem ${i + 1}`}
                  value={(form.value_stack || [])[i] || ''} onChange={e => setStack(i, e.target.value)} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Pregunta frecuente 1</label>
              <input className={inp} placeholder="Pregunta..." value={form.faq_1_q || ''} onChange={e => set('faq_1_q', e.target.value)} />
              <textarea rows={2} className={inp + ' resize-none mt-2'} placeholder="Respuesta..." value={form.faq_1_a || ''} onChange={e => set('faq_1_a', e.target.value)} />
            </div>
            <div>
              <label className={lbl}>Pregunta frecuente 2</label>
              <input className={inp} placeholder="Pregunta..." value={form.faq_2_q || ''} onChange={e => set('faq_2_q', e.target.value)} />
              <textarea rows={2} className={inp + ' resize-none mt-2'} placeholder="Respuesta..." value={form.faq_2_a || ''} onChange={e => set('faq_2_a', e.target.value)} />
            </div>
          </div>
        </>
      )}

      {/* Campos de pack */}
      {!isVideo && (
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className={lbl}>Descripción corta del pack</label>
            <textarea rows={2} className={inp + ' resize-none'} value={form.pack_description || ''} onChange={e => set('pack_description', e.target.value)} />
          </div>
          <div>
            <label className={lbl}>Texto del ahorro</label>
            <input className={inp} placeholder="Ahorras $XXX.XXX CLP al llevar el sistema completo" value={form.pack_savings_text || ''} onChange={e => set('pack_savings_text', e.target.value)} />
          </div>
          <div>
            <label className={lbl}>Texto de urgencia (opcional)</label>
            <input className={inp} placeholder="Disponible para 2 clientes este mes" value={form.pack_urgency_text || ''} onChange={e => set('pack_urgency_text', e.target.value)} />
          </div>
        </div>
      )}

      <button onClick={handleSave} disabled={saving}
        className="self-end bg-accent text-bg px-6 py-2.5 rounded-full font-mono text-sm font-bold hover:bg-accent2 transition-colors disabled:opacity-50">
        {saving ? 'Guardando...' : saved ? '✓ Guardado' : 'Guardar cambios'}
      </button>
    </div>
  );
}

// ─── Tab Productos ───────────────────────────────────────────────────────────
function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts).finally(() => setLoading(false));
  }, []);

  const handleSave = useCallback((updated) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  }, []);

  if (loading) return <div className="text-mid font-mono text-sm py-8">Cargando productos...</div>;

  return (
    <div className="flex flex-col gap-4">
      {products.map(p => (
        <div key={p.id}>
          <button
            onClick={() => setOpenId(openId === p.id ? null : p.id)}
            className="w-full flex items-center justify-between px-6 py-4 bg-s1 border border-border rounded-2xl hover:border-border2 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className={`w-2 h-2 rounded-full ${p.is_active ? 'bg-accent' : 'bg-muted'}`} />
              <div className="text-left">
                <p className="text-ink font-body text-sm font-medium">{p.name}</p>
                <p className="text-muted font-mono text-xs">{p.type === 'pack' ? 'Pack' : p.step_label || 'Video'} · {formatCLP(p.price_clp)}</p>
              </div>
            </div>
            <svg className={`w-4 h-4 text-mid transition-transform ${openId === p.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openId === p.id && <div className="mt-2"><ProductEditor product={p} onSave={handleSave} /></div>}
        </div>
      ))}
    </div>
  );
}

// ─── Tab Pedidos ─────────────────────────────────────────────────────────────
function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const load = useCallback((status) => {
    setLoading(true);
    const url = status === 'all' ? '/api/orders' : `/api/orders?status=${status}`;
    fetch(url).then(r => r.json()).then(setOrders).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(filter); }, [filter, load]);

  const updateStatus = async (id, status) => {
    await fetch('/api/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Filtro */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'nuevo', 'contactado', 'cerrado'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full font-mono text-xs transition-colors ${filter === s ? 'bg-accent text-bg' : 'bg-s2 text-mid hover:text-ink border border-border'}`}>
            {s === 'all' ? 'Todos' : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-mid font-mono text-sm py-8">Cargando pedidos...</div>
      ) : orders.length === 0 ? (
        <div className="text-muted font-mono text-sm py-8 text-center">No hay pedidos{filter !== 'all' ? ` con estado "${STATUS_LABELS[filter]}"` : ''}.</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="bg-s1 border-b border-border">
                {['Fecha', 'Nombre', 'WhatsApp', 'Productos', 'Total CLP', 'Estado'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-mono text-xs tracking-widest uppercase text-mid">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map(o => (
                <tr key={o.id} className="bg-s1 hover:bg-s2 transition-colors">
                  <td className="px-4 py-3 text-muted font-mono text-xs whitespace-nowrap">{fmtDate(o.created_at)}</td>
                  <td className="px-4 py-3 text-ink font-medium">{o.customer_name}</td>
                  <td className="px-4 py-3">
                    <a href={`https://wa.me/${o.customer_wa.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                      className="text-[#25D366] hover:underline font-mono text-xs">{o.customer_wa}</a>
                  </td>
                  <td className="px-4 py-3 text-mid text-xs max-w-[200px]">
                    {Array.isArray(o.items) ? o.items.map(i => i.name).join(', ') : '—'}
                  </td>
                  <td className="px-4 py-3 text-accent font-mono text-xs whitespace-nowrap">{formatCLP(o.total_clp)}</td>
                  <td className="px-4 py-3">
                    <select value={o.status}
                      onChange={e => updateStatus(o.id, e.target.value)}
                      className={`text-xs font-mono px-2 py-1 rounded-lg border bg-s2 focus:outline-none ${STATUS_COLORS[o.status] || ''}`}>
                      {Object.entries(STATUS_LABELS).map(([v, l]) => (
                        <option key={v} value={v}>{l}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Página principal ────────────────────────────────────────────────────────
export default function TiendaAdminPage() {
  const [tab, setTab] = useState('productos');

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8">
      <header>
        <h1 className="font-display text-display-md text-ink">Tienda</h1>
        <p className="text-mid font-body text-sm mt-1">Gestión de productos y pedidos.</p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-0">
        {[['productos', 'Productos'], ['pedidos', 'Pedidos']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-5 py-2.5 font-mono text-sm transition-colors border-b-2 -mb-px ${tab === key ? 'border-accent text-accent' : 'border-transparent text-mid hover:text-ink'}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'productos' ? <ProductsTab /> : <OrdersTab />}
    </div>
  );
}
