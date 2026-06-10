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
  sort_order: number;
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
  const tiers = products.filter((p) => p.category !== 'individual');
  const individual = products.find((p) => p.category === 'individual');

  return (
    <main className="min-h-screen bg-bg text-ink">
      {/* ─── Header ───────────────────────────────────────────────── */}
      <header className="max-w-5xl mx-auto px-6 pt-28 md:pt-32 pb-16 text-center">
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
        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-12">
            {/* Tiers Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {tiers.map((product) => {
                const isPopular = product.category === 'sistema';
                const isEscala = product.category === 'sistema_crm';

                return (
                  <article
                    key={product.id}
                    className={`relative flex flex-col bg-s1 border rounded-2xl p-8 gap-6 transition-all duration-300 hover:-translate-y-1 ${
                      isPopular
                        ? 'border-accent shadow-[0_0_30px_rgba(255,204,0,0.08)] md:-translate-y-2'
                        : 'border-border hover:border-border2'
                    }`}
                  >
                    {/* Badges */}
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-bg font-mono text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-[0.15em] whitespace-nowrap shadow-md">
                        Más popular
                      </div>
                    )}
                    {isEscala && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-s2 border border-border2 text-accent font-mono text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-[0.15em] whitespace-nowrap">
                        Escala
                      </div>
                    )}

                    {/* Nombre */}
                    <div className="pt-2">
                      <h2 className="font-display text-xl uppercase text-ink leading-tight tracking-wide">
                        {product.name}
                      </h2>
                    </div>

                    {/* Descripción */}
                    <p className="font-body text-sm text-mid leading-relaxed flex-1">
                      {product.description}
                    </p>

                    {/* Separador */}
                    <div className="h-px bg-border/40" />

                    {/* Precio */}
                    <div className="flex flex-col gap-1">
                      <span className="font-display text-3xl md:text-4xl text-ink leading-none">
                        {formatCLP(product.price_clp)}
                      </span>
                      <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
                        + IVA / Pago Neto
                      </span>
                    </div>

                    {/* CTA WhatsApp */}
                    <a
                      href={waUrl(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2.5 font-display text-xs uppercase tracking-wider px-5 py-4 rounded-xl transition-all duration-200 ${
                        isPopular
                          ? 'bg-accent text-bg font-bold hover:bg-accent2'
                          : 'bg-[#121212] border border-border text-ink hover:bg-[#1a1a1a] hover:border-border2'
                      }`}
                    >
                      <WhatsAppIcon />
                      Me interesa
                    </a>
                  </article>
                );
              })}
            </div>

            {/* Individual Line */}
            {individual && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center py-6 border-t border-border/20 max-w-2xl mx-auto w-full">
                <span className="font-body text-mid text-sm">
                  ¿Solo necesitas un video?{' '}
                  <span className="text-ink font-bold">
                    desde {formatCLP(individual.price_clp)}
                  </span>
                </span>
                <a
                  href={waUrl(individual)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent2 transition-colors duration-200 font-mono text-[11px] uppercase tracking-wider border-b border-accent/30 hover:border-accent pb-0.5"
                >
                  <WhatsAppIcon />
                  Cotizar individual
                </a>
              </div>
            )}
          </div>
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
