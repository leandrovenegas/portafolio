import Link from "next/link";

export const metadata = {
  title: "Video Post-Venta — Ya compraron. Ahora conviértelos en embajadores | Leandro Venegas",
  description:
    "La venta no termina cuando el cliente paga. El Video Post-Venta confirma que tomaron la decisión correcta y los convierte en embajadores.",
  alternates: { canonical: "https://www.leandrovenegas.cl/videos/post-venta" },
  openGraph: {
    title: "Video Post-Venta | Leandro Venegas",
    description:
      "La venta no termina cuando el cliente paga. Ahí es exactamente donde empieza la relación con tu cliente.",
    url: "https://www.leandrovenegas.cl/videos/post-venta",
  },
};

const WA_LINK =
  "https://wa.me/56988804299?text=Hola%20Leandro%2C%20vi%20post-venta";

export default function PostVentaPage() {
  return (
    <>
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-24 md:gap-32">

          {/* ── HERO ───────────────────────────────────────── */}
          <section className="pt-12 md:pt-24 min-h-[55vh] flex flex-col justify-center">
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-4xl">
              La venta no termina cuando el cliente paga.
            </h1>
            <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed">
              Ahí es exactamente donde empieza la relación con tu cliente.
            </p>
          </section>

          {/* ── BLOQUE PROBLEMA ───────────────────────────── */}
          <section className="flex flex-col gap-8">
            <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed">
              La mayoría de los negocios invierte todo su presupuesto en conseguir clientes nuevos.
              Pero ser acogedor cambia completamente la experiencia.
              Este video puede ser una bienvenida, un manual de uso, o simplemente un plus que hace sentir al cliente que entró a algo especial — que forma parte de tu experiencia, no solo de una transacción.
            </p>
          </section>

          {/* ── BLOQUE DATO ────────────────────────────────── */}
          <section className="grid grid-cols-1 gap-px bg-border border border-border">
            <div className="bg-s2 p-8 md:p-12 flex flex-col gap-4">
              <p className="font-body text-mid text-base leading-relaxed">
                Conseguir un cliente nuevo cuesta entre 5 y 25 veces más que mantener uno que ya confió en ti.
                El Video Post-Venta no es un extra. Es la inversión más rentable del sistema.
              </p>
            </div>
          </section>

          {/* ── BLOQUE MECANISMO ───────────────────────────── */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            <div className="bg-s1 p-8 md:p-12 flex flex-col gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                Disonancia Post-Compra
              </p>
              <p className="font-body text-mid text-base leading-relaxed">
                Hay un fenómeno psicológico que se llama disonancia post-compra.
                Apenas tu cliente paga, su cerebro empieza a buscar evidencia de que se equivocó. Es automático. Es inevitable.
              </p>
            </div>
            <div className="bg-s2 p-8 md:p-12 flex flex-col gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                La Solución
              </p>
              <p className="font-body text-mid text-base leading-relaxed">
                El Video Post-Venta entra exactamente en ese momento.
                No vende nada nuevo. No pide nada.
                Solo confirma que tomaron la decisión correcta, explica qué viene a continuación y les muestra que hay una persona real detrás del servicio.
                Eso baja la ansiedad. Construye confianza.
              </p>
            </div>
          </section>

          {/* ── BLOQUE TRES MOMENTOS ───────────────────────── */}
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-10">
              Tres Momentos
            </p>
            <div className="flex flex-col gap-0 border border-border divide-y divide-border">
              {[
                {
                  label: "Post-compra inmediata",
                  text: "Se envía automático. Reduce la ansiedad del \"¿y ahora qué?\". Setea expectativas antes de que aparezcan las dudas.",
                },
                {
                  label: "Durante el servicio",
                  text: "Explica una etapa específica del proceso. El cliente no necesita preguntarte lo que ya está en el video.",
                },
                {
                  label: "Post-entrega",
                  text: "Cierra el ciclo. Le recuerdas al cliente lo que logró y le das el siguiente paso natural — una recomendación, una reseña, una segunda compra.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="px-6 py-8 bg-bg hover:bg-s1 transition-colors flex flex-col gap-2"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    {item.label}
                  </p>
                  <p className="font-body text-mid text-base leading-relaxed max-w-3xl">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CASO REAL ──────────────────────────────────── */}
          <section className="flex flex-col gap-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border">
              Caso real
            </p>

            <div className="bg-s1 border border-border p-8 md:p-16 relative overflow-hidden flex flex-col gap-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-[0.04] rounded-full blur-[80px]" />
              <div className="flex flex-col gap-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Caso Odontólogo
                </p>
              </div>
              <p className="font-body text-mid text-base max-w-2xl leading-relaxed">
                El paciente sale del box después de una extracción. Tiene dudas, un poco de dolor y cero instrucciones claras.
                En vez de un papel impreso que nadie lee, recibe un video de 90 segundos por WhatsApp: "Qué hacer las próximas 24 horas después de tu extracción."
                El doctor aparece en cámara. Tono calmado. Información concreta.
                El paciente lo guarda. Se lo manda a su pareja. Vuelve al consultorio porque siente que lo conocen.
              </p>
            </div>
          </section>

          {/* ── DISTRIBUCION ───────────────────────────────── */}
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-10">
              Distribución
            </p>
            <ul className="flex flex-col gap-0 border border-border divide-y divide-border">
              {[
                "Canal: WhatsApp, email, portal de clientes, área privada del sitio",
                "Duración: 60–120 segundos",
                "Activación: post-pago, post-entrega, post-servicio",
                "Objetivo: confianza sostenida + boca a boca activado",
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
              Ya tienes los 6 tipos. Ahora mira cómo se conectan.
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/proceso"
                className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-8 py-4 hover:bg-accent2 transition-colors"
              >
                Ver el proceso
              </Link>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center font-mono text-xs tracking-wide border border-border2 text-mid px-6 py-4 hover:border-mid hover:text-ink transition-colors"
              >
                Hablar con Leandro
              </a>
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
