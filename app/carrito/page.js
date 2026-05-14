"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/components/carrito/CartContext';

// ── Número WhatsApp del propietario (sin + ni espacios) ─────────────────────
const WA_OWNER = '56988804299'; // ← Cambia por tu número real

function formatCLP(n) {
  if (!n && n !== 0) return '—';
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n);
}

// ── Input reutilizable ───────────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-xs tracking-widest uppercase text-mid">{label}</label>
      {children}
      {error && <p className="text-red-400 font-mono text-xs">{error}</p>}
    </div>
  );
}

// ── Pantalla de confirmación ─────────────────────────────────────────────────
function ConfirmScreen() {
  return (
    <main className="min-h-screen bg-bg pt-24 pb-24 flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-display-md text-ink mb-4">¡Pedido recibido!</h1>
        <p className="text-mid font-body text-lg leading-relaxed mb-8">
          Te escribo por WhatsApp en menos de 24 horas<br />para coordinar los detalles.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-s2 text-ink font-mono text-sm hover:bg-s3 transition-colors">
          ← Volver al inicio
        </Link>
      </div>
    </main>
  );
}

// ── Pantalla carrito vacío ───────────────────────────────────────────────────
function EmptyScreen() {
  return (
    <main className="min-h-screen bg-bg pt-24 pb-24 flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <div className="w-16 h-16 rounded-full bg-s2 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h1 className="font-display text-display-md text-ink mb-4">Carrito vacío</h1>
        <p className="text-mid font-body mb-8">Aún no has agregado ningún video a tu pedido.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-bg font-mono text-sm font-bold hover:bg-accent2 transition-colors">
          Ver el sistema →
        </Link>
      </div>
    </main>
  );
}

// ── Contenido principal del carrito ─────────────────────────────────────────
function CartContent() {
  const { items, removeItem, replaceWithPack, clearCart, hasPack, videoCount, totalCLP, totalUSD, mounted } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const confirmed = searchParams.get('confirmado') === 'true';

  const [pack, setPack] = useState(null);
  const [form, setForm] = useState({ name: '', wa: '', business: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setPack(data.find(p => p.type === 'pack' && p.is_active) || null);
      })
      .catch(() => { });
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-bg pt-24 pb-24 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (confirmed) return <ConfirmScreen />;
  if (items.length === 0) return <EmptyScreen />;

  const videosInCart = items.filter(i => i.type === 'video');
  const videosTotal = videosInCart.reduce((s, i) => s + (i.price_clp || 0), 0);
  const showBump = !hasPack && videoCount >= 1 && videoCount <= 3 && pack?.price_clp;
  const packSavings = showBump ? videosTotal - (pack.price_clp || 0) : 0;
  const videosNeeded = 4 - videoCount;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Requerido';
    if (!form.wa.trim()) e.wa = 'Requerido';
    if (!form.business.trim()) e.business = 'Requerido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.name,
          customer_wa: form.wa,
          business_desc: form.business,
          items,
          total_clp: totalCLP,
          total_usd: totalUSD,
          has_pack: hasPack,
          status: 'nuevo',
        }),
      });
      if (!res.ok) throw new Error('Error al guardar');
      clearCart();
      router.push('/carrito?confirmado=true');
    } catch (err) {
      console.error(err);
      alert('Hubo un error al enviar tu pedido. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const waMessage = encodeURIComponent(
    `Hola Leandro, quiero cotizar:\n${items.map(i => `• ${i.name}`).join('\n')}\nTotal estimado: ${formatCLP(totalCLP)}`
  );
  const waLink = `https://wa.me/${WA_OWNER}?text=${waMessage}`;

  const inputClass = "w-full bg-s2 border border-border rounded-xl px-4 py-3 text-ink font-body text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-muted";

  return (
    <main className="min-h-screen bg-bg pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="font-display text-display-md text-ink mb-10">Tu pedido</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

          {/* ── Columna izquierda ── */}
          <div className="flex flex-col gap-6">

            {/* Bloque 1 — Items */}
            <section className="bg-s1 border border-border rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="font-mono text-xs tracking-widest uppercase text-mid">Lo que elegiste</h2>
              </div>
              <ul className="divide-y divide-border">
                {items.map(item => (
                  <li key={item.id} className="flex items-center justify-between px-6 py-4 gap-4">
                    <div>
                      <p className="text-ink font-body text-sm font-medium">{item.name}</p>
                      <p className="text-accent font-mono text-sm mt-0.5">{formatCLP(item.price_clp)}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted hover:text-red-400 transition-colors p-1"
                      aria-label={`Eliminar ${item.name}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {/* Bloque 2 — Pack bump */}
            {showBump && (
              <section className="bg-accent/5 border border-accent/30 rounded-2xl px-6 py-5">
                <p className="font-mono text-xs tracking-widest uppercase text-accent mb-2">Oferta del sistema</p>
                <p className="text-ink font-body text-sm leading-relaxed mb-4">
                  Estás a <strong>{videosNeeded} video{videosNeeded !== 1 ? 's' : ''}</strong> del sistema completo.
                  Si agregas el pack de 4, ahorras <strong className="text-accent">{formatCLP(packSavings)}</strong>.
                </p>
                <button
                  onClick={() => replaceWithPack(pack)}
                  className="inline-flex items-center gap-2 bg-accent text-bg px-5 py-2.5 rounded-full font-mono text-sm font-bold hover:bg-accent2 transition-colors"
                >
                  Completar mi sistema →
                </button>
              </section>
            )}

            {/* Bloque 4 — Formulario */}
            <section className="bg-s1 border border-border rounded-2xl px-6 py-6">
              <h2 className="font-mono text-xs tracking-widest uppercase text-mid mb-6">Tus datos</h2>
              <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
                <Field label="Nombre" error={errors.name}>
                  <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Tu nombre" className={inputClass} />
                </Field>
                <Field label="WhatsApp" error={errors.wa}>
                  <input type="tel" value={form.wa} onChange={e => setForm(f => ({ ...f, wa: e.target.value }))}
                    placeholder="+56 9 1234 5678" className={inputClass} />
                </Field>
                <Field label="¿Qué vende tu empresa?" error={errors.business}>
                  <textarea value={form.business} onChange={e => setForm(f => ({ ...f, business: e.target.value }))}
                    placeholder="Cuéntame brevemente..." rows={3} className={inputClass + ' resize-none'} />
                </Field>
              </form>
            </section>
          </div>

          {/* ── Columna derecha (sticky) ── */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-4">

            {/* Bloque 3 — Resumen de precios */}
            <section className="bg-s1 border border-border rounded-2xl px-6 py-6">
              <h2 className="font-mono text-xs tracking-widest uppercase text-mid mb-5">Resumen</h2>

              {hasPack && videosTotal > totalCLP ? (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-mid font-body text-sm">Precio sin pack</span>
                    <span className="text-muted font-mono text-sm line-through">{formatCLP(videosTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-ink font-body text-sm">Sistema completo</span>
                    <span className="text-accent font-mono text-sm font-bold">{formatCLP(totalCLP)}</span>
                  </div>
                  {pack?.pack_savings_text && (
                    <p className="text-green-400 font-mono text-xs border border-green-400/20 bg-green-400/5 rounded-lg px-3 py-2 mb-4">
                      {pack.pack_savings_text}
                    </p>
                  )}
                </>
              ) : (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-mid font-body text-sm">Subtotal</span>
                  <span className="text-ink font-mono text-sm">{formatCLP(totalCLP)}</span>
                </div>
              )}

              <div className="border-t border-border pt-4 flex justify-between items-center">
                <span className="text-ink font-body font-semibold">Total</span>
                <div className="text-right">
                  <p className="text-accent font-display text-2xl">{formatCLP(totalCLP)}</p>
                  {totalUSD > 0 && <p className="text-muted font-mono text-xs">≈ USD {totalUSD.toFixed(2)}</p>}
                </div>
              </div>
            </section>

            {/* Bloque 5 — CTA */}
            <button
              type="submit"
              form="checkout-form"
              disabled={submitting}
              className="w-full bg-accent text-bg py-4 rounded-2xl font-mono text-sm font-bold hover:bg-accent2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Enviando...' : 'Confirmar mi pedido →'}
            </button>
            <p className="text-center text-muted font-body text-xs leading-relaxed">
              Te escribo por WhatsApp en menos de 24 horas para coordinar los detalles.
            </p>

            {/* Bloque 6 — WhatsApp directo */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-transparent border border-border text-mid py-3 rounded-2xl font-mono text-sm hover:border-border2 hover:text-ink transition-colors"
            >
              <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Prefiero escribirte directamente →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

// ── Exportación principal con Suspense (necesario por useSearchParams) ────────
export default function CarritoPage() {
  return (
    <>
      <Suspense fallback={
        <main className="min-h-screen bg-bg pt-24 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </main>
      }>
        <CartContent />
      </Suspense>
    </>
  );
}
