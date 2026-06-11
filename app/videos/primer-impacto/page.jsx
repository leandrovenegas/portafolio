import Link from "next/link";

export const metadata = {
  title: "Video de Primer Impacto — Antes de que te elijan, tienen que conocerte | Leandro Venegas",
  description:
    "El Video de Primer Impacto no vende nada. Su único trabajo es aparecer, ser memorable y generar familiaridad antes de que empiece cualquier conversación comercial.",
  alternates: { canonical: "https://www.leandrovenegas.cl/videos/primer-impacto" },
  openGraph: {
    title: "Video de Primer Impacto | Leandro Venegas",
    description:
      "No están buscando el mejor. Están buscando el más familiar. El Video de Primer Impacto construye esa confianza.",
    url: "https://www.leandrovenegas.cl/videos/primer-impacto",
  },
};

const WA_LINK =
  "https://wa.me/56988804299?text=Hola%20Leandro%2C%20vi%20primer%20impacto";

export default function PrimerImpactoPage() {
  return (
    <>
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-24 md:gap-32">

          {/* ── HERO ───────────────────────────────────────── */}
          <section className="pt-12 md:pt-24 min-h-[55vh] flex flex-col justify-center">
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-4xl">
              Antes de que te elijan, tienen que conocerte.
            </h1>
            <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed">
              No están buscando el mejor. Están buscando el más familiar.
            </p>
          </section>

          {/* ── PROBLEMA ───────────────────────────────────── */}
          <section className="flex flex-col gap-8">
            <h2 className="text-display-md md:text-display-lg text-ink max-w-3xl">
              El dolor real del cliente
            </h2>
            <div className="flex flex-col gap-6">
              <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed">
                Tu prospecto no te compra la primera vez que te ve. Tampoco la segunda.
              </p>
              <p className="font-body text-mid text-base leading-relaxed max-w-2xl border-l-2 border-accent pl-6">
                La ciencia del comportamiento tiene un nombre para esto: el{" "}
                <strong className="text-ink font-semibold">Efecto de Mera Exposición</strong>. Las
                personas prefieren lo que ya conocen — incluso sin darse cuenta. No
                es irracionalidad. Es cómo funciona el cerebro bajo sobrecarga de
                información.
              </p>
              <p className="font-body text-mid text-base leading-relaxed max-w-2xl">
                El problema: la mayoría de los negocios solo hace videos cuando
                necesita vender algo. Y eso es exactamente lo que sienten sus
                prospectos — que solo apareces cuando quieres algo de ellos.
              </p>
              <p className="font-body text-mid text-base leading-relaxed max-w-2xl">
                <span className="text-accent">Resultado:</span> no hay familiaridad. No hay confianza. No hay venta.
              </p>
            </div>
          </section>

          {/* ── MECANISMO ──────────────────────────────────── */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            <div className="bg-s1 p-8 md:p-12 flex flex-col gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                Qué hace este video
              </p>
              <p className="font-body text-mid text-base leading-relaxed">
                El Video de Primer Impacto no vende nada. Eso no es un defecto. Es la estrategia.
              </p>
            </div>
            <div className="bg-s2 p-8 md:p-12 flex flex-col gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                El Objetivo
              </p>
              <p className="font-body text-mid text-base leading-relaxed">
                Su único trabajo es aparecer, ser memorable y generar familiaridad
                antes de que empiece cualquier conversación comercial. Tú estás en
                su cabeza antes de que abran la billetera. Cuando llegue el
                momento de decidir, van a elegir al que ya conocen. Ese vas a ser tú.
              </p>
            </div>
          </section>

          {/* ── POR QUÉ NO ES INÚTIL ───────────────────────── */}
          <section className="flex flex-col gap-8">
            <h2 className="text-display-md md:text-display-lg text-ink max-w-3xl">
              ¿Un video inútil?
            </h2>
            <div className="border border-border bg-s1 p-6 md:p-10 flex flex-col gap-6">
              <p className="font-body text-mid text-base leading-relaxed max-w-3xl">
                Acá está el error que cometen muchos clientes cuando ven este tipo
                por primera vez: <em className="text-ink">"¿Un video que no vende? ¿Para qué lo necesito?"</em>
              </p>
              <p className="font-body text-mid text-base leading-relaxed max-w-3xl">
                Esa pregunta tiene sentido — si crees que cada video tiene que
                cerrar una venta. Pero piensa en esto: ¿comprarías a alguien que
                acabas de ver por primera vez, sin haber escuchado nada de él
                antes? La respuesta casi siempre es no.
              </p>
              <p className="font-body text-mid text-base leading-relaxed max-w-3xl">
                El Video de Primer Impacto es la inversión que hace que todos los
                otros videos del sistema funcionen mejor. Es el calentamiento. El
                que construye la pista de aterrizaje para que el resto convierta.
              </p>
              <p className="font-body text-ink text-base leading-relaxed max-w-3xl font-medium">
                Sin él, estás empezando cada conversación desde cero.
              </p>
            </div>
          </section>

          {/* ── FORMATO Y DISTRIBUCION ─────────────────────── */}
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-10">
              Formato y Distribución
            </p>
            <ul className="flex flex-col gap-0 border border-border divide-y divide-border">
              {[
                "Canal: Reels, TikTok, YouTube Shorts — orgánico",
                "Duración: 30–60 segundos",
                "Frecuencia: 1–2 piezas por ciclo de contenido",
                "Objetivo de plataforma: alcance máximo, no conversión directa",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 px-6 py-5 bg-bg hover:bg-s1 transition-colors"
                >
                  <span className="font-body text-ink text-base">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── TRANSICION / CTA FINAL ─────────────────────── */}
          <section className="bg-s1 border border-border p-8 md:p-16 flex flex-col gap-8 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent opacity-[0.04] rounded-full blur-[80px]" />
            <h2 className="font-display text-display-sm md:text-display-md text-ink max-w-xl leading-[0.95]">
              Ya te conocen. Ahora detén su scroll.
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/videos/stop-scrolling"
                className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-8 py-4 hover:bg-accent2 transition-colors"
              >
                Ver Video Stop-Scrolling →
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-border flex flex-col gap-4">
              <p className="font-body text-mid text-sm">
                ¿Listo para dar el siguiente paso?
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center font-mono text-xs tracking-wide border border-border2 text-mid px-6 py-4 hover:border-mid hover:text-ink transition-colors"
                >
                  Agendar llamada con Leandro →
                </a>
                <Link
                  href="/sistema"
                  className="inline-flex justify-center items-center font-mono text-xs tracking-wide border border-border2 text-mid px-6 py-4 hover:border-mid hover:text-ink transition-colors"
                >
                  Ver el sistema completo →
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
