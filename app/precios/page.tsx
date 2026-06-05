import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';

export const metadata: Metadata = {
  title: 'Precios - Leandro Venegas',
  description: 'Productos y servicios de video',
};

interface Product {
  id: string;
  name: string;
  description: string;
  price_clp: number;
  price_usd: number;
  active: boolean;
  category: string;
}

const WA_NUMBER = '56988804299';

function formatCLP(n: number) {
  return `$${n.toLocaleString('es-CL').replace(/\s/g, '')}`;
}

function waUrl(product: Product) {
  const msg = `Hola Leandro, me interesa: ${product.name} — ${formatCLP(product.price_clp)}`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

async function getProducts(): Promise<Product[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('price_clp', { ascending: true });

  if (error) {
    console.error('[precios] Supabase error:', error.message);
    return [];
  }

  return (data as Product[]) ?? [];
}

// Ícono de WhatsApp inline SVG
function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PricingTierCard({ product, tier }: { product: Product; tier: number }) {
  return (
    <article
      className={`flex flex-col h-full rounded-2xl p-7 gap-5 transition-all duration-300 ${
        tier === 2
          ? 'bg-[#131313] border-2 border-accent shadow-[0_0_24px_rgba(200,241,53,0.1)] scale-[1.02] md:scale-[1.03]'
          : 'bg-[#0f0f0f] border border-border hover:border-border2'
      }`}
    >
      {/* Header: Badge y Nombre */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between min-h-[24px]">
          {tier === 2 ? (
            <span className="bg-accent text-bg text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
              Más popular
            </span>
          ) : tier === 3 ? (
            <span className="bg-s3 text-ink text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-border2">
              Escala
            </span>
          ) : (
            <span className="text-muted font-mono text-body-xs uppercase tracking-widest">
              Básico
            </span>
          )}
        </div>
        <h2 className="font-display text-display-sm uppercase text-ink leading-tight tracking-wide">
          {product.name}
        </h2>
      </div>

      {/* Precio */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className="font-display text-display-md text-ink">
            {formatCLP(product.price_clp)}
          </span>
          <span className="font-mono text-body-xs text-muted uppercase tracking-widest ml-1">
            CLP
          </span>
        </div>
        <span className="font-mono text-body-xs text-muted">
          Referencia: USD {product.price_usd}
        </span>
      </div>

      {/* Separador */}
      <div className="h-px bg-[#1a1a1a]" />

      {/* Descripción */}
      <p className="font-prose text-body text-mid leading-relaxed flex-1">
        {product.description}
      </p>

      {/* Botón WhatsApp */}
      <a
        href={waUrl(product)}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full flex items-center justify-center gap-2.5 font-display text-display-sm uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all duration-200 ${
          tier === 2
            ? 'bg-accent text-bg hover:bg-accent2 shadow-[0_4px_12px_rgba(200,241,53,0.2)] cursor-pointer'
            : 'bg-[#101010] border border-[#2c2c2c] text-ink hover:bg-[#161616] hover:border-accent/40 cursor-pointer'
        }`}
      >
        <WhatsAppIcon />
        Me interesa
      </a>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-32 gap-4 text-center">
      <div className="w-12 h-12 rounded-full bg-[#131313] border border-[#1c1c1c] flex items-center justify-center text-muted text-xl">
        ·
      </div>
      <p className="font-mono text-body-xs text-muted uppercase tracking-widest">
        No hay productos disponibles en este momento.
      </p>
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Leandro, quiero conocer tus servicios de video.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-mono text-body-xs text-accent border border-accent/30 px-4 py-2 rounded-lg hover:bg-accent/5 transition-colors duration-200 mt-2"
      >
        <WhatsAppIcon />
        Consultar directamente
      </a>
    </div>
  );
}

export default async function PreciosPage() {
  const products = await getProducts();

  const tier1 = products.find((p) => p.category === 'resenas');
  const tier2 = products.find((p) => p.category === 'sistema');
  const tier3 = products.find((p) => p.category === 'sistema_crm');
  const individual = products.find((p) => p.category === 'individual');

  const hasTiers = tier1 || tier2 || tier3;

  return (
    <main className="min-h-screen bg-bg text-ink">
      {/* ─── Header ───────────────────────────────────────────────── */}
      <header className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        {/* Eyebrow */}
        <p className="font-mono text-body-xs text-accent uppercase tracking-[0.2em] mb-5">
          Servicios de video
        </p>

        {/* Título */}
        <h1 className="font-display text-display-lg uppercase text-ink leading-none mb-6">
          Precios y{' '}
          <span className="text-accent">paquetes</span>
        </h1>

        {/* Bajada */}
        <p className="font-prose text-body-lg text-mid max-w-xl mx-auto leading-relaxed">
          Todos los precios en CLP incluyen IVA (19%). Precios en USD de referencia.
          Cada video es producido a medida para tu negocio.
        </p>
      </header>

      {/* ─── Grid de productos ────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        {!hasTiers && !individual ? (
          <div className="grid">
            <EmptyState />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {tier1 && <PricingTierCard product={tier1} tier={1} />}
              {tier2 && <PricingTierCard product={tier2} tier={2} />}
              {tier3 && <PricingTierCard product={tier3} tier={3} />}
            </div>

            {individual && (
              <div className="mt-12 flex justify-center">
                <a
                  href={waUrl(individual)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#101010] border border-[#1f1f1f] hover:border-accent/50 hover:bg-[#161616] transition-all duration-300 group"
                >
                  <span className="font-prose text-body text-[#7a7a72]">
                    ¿Solo necesitas un video? <strong className="text-[#eeebe3]">desde {formatCLP(individual.price_clp)}</strong>
                  </span>
                  <span className="text-accent group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </a>
              </div>
            )}
          </>
        )}
      </section>

      {/* ─── Footer CTA ───────────────────────────────────────────── */}
      <section className="border-t border-[#131313]">
        <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col items-center gap-4 text-center">
          <p className="font-mono text-body-xs text-muted uppercase tracking-widest">
            ¿Necesitas algo distinto?
          </p>
          <p className="font-prose text-body text-mid max-w-md">
            Si tu proyecto no encaja en ninguno de estos formatos, cuéntame y
            lo armamos a medida.
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Leandro, quiero hablar sobre un proyecto de video a medida.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 border border-accent/40 text-accent font-display text-display-sm uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-accent hover:text-bg transition-colors duration-200 mt-2"
          >
            <WhatsAppIcon />
            Hablar con Leandro
          </a>
        </div>
      </section>
    </main>
  );
}
