import Link from "next/link";

export const metadata = {
  title: "Video VSL — El vendedor que trabaja 24/7 | Leandro Venegas",
  description:
    "La VSL es el cierre. Todo lo demás es preparación. Una carta de ventas en video que lleva al prospecto desde el problema hasta la compra, sin que tú estés presente.",
  alternates: { canonical: "https://www.leandrovenegas.cl/videos/vsl" },
  openGraph: {
    title: "Video VSL — El vendedor que trabaja 24/7 | Leandro Venegas",
    description:
      "La VSL es el cierre. Todo lo demás es preparación.",
    url: "https://www.leandrovenegas.cl/videos/vsl",
  },
};

const OTHER_VIDEOS = [
  {
    step: "Paso 1",
    title: "Video Stop-Scrolling",
    desc: "Tienes 3 segundos para ser diferente del resto.",
    href: "/videos/stop-scrolling",
  },
  {
    step: "Paso 2",
    title: "Video de Autoridad",
    desc: "La confianza no se pide. Se demuestra.",
    href: "/videos/autoridad",
  },
  {
    step: "Paso 3",
    title: "Video de Validación",
    desc: "¿Le funcionó a alguien como yo?",
    href: "/videos/validacion",
  },
];

const WA_LINK =
  "https://wa.me/56988804299?text=Hola%2C%20me%20interesa%20la%20VSL%20para%20mi%20empresa.";

export default function VslPage() {
  return (
    <>
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-24 md:gap-32">

          {/* ── HERO ───────────────────────────────────────── */}
          <section className="pt-12 md:pt-24 min-h-[55vh] flex flex-col justify-center">
            <p className="font-mono text-accent text-xs tracking-[0.2em] uppercase mb-6">
              Paso 4 del sistema
            </p>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-4xl">
              El vendedor que trabaja 24/7 es un video.
            </h1>
            <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed">
              La VSL es el cierre. Todo lo demás es preparación.
            </p>
          </section>

          {/* ── HISTORIA — INCOLUDIDO ──────────────────────── */}
          <section className="flex flex-col gap-8">
            <h2 className="text-display-md md:text-display-lg text-ink max-w-3xl">
              Dos campañas. Dos cartas de venta en video.
            </h2>
            <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed">
              La primera vez que entendí el poder de una VSL fue con Incoludido.
              Dos campañas. Dos cartas de venta en video. Resultados distintos,
              lógica idéntica.
            </p>
            <div className="flex flex-col gap-6 border-l-2 border-accent pl-6">
              <p className="font-body text-mid text-base leading-relaxed max-w-2xl">
                La primera apuntó a la rabia. Chile había vivido la colusión del
                papel higiénico — las grandes marcas se habían puesto de acuerdo
                para subir los precios. Construimos una VSL que conectó ese dolor
                con una propuesta concreta: financiar una marca independiente. La
                meta era 15 millones de pesos.{" "}
                <span className="text-ink font-medium">Terminamos con 23.</span>
              </p>
              <p className="font-body text-mid text-base leading-relaxed max-w-2xl">
                La segunda fue una carta de evolución — dirigida a almaceneros e
                inversores. Sin rabia. Con demostración. Mismo formato, distinto
                argumento.
              </p>
              <p className="font-body text-mid text-base leading-relaxed max-w-2xl">
                En ambos casos el video hacía el trabajo pesado: calificaba al
                prospecto, respondía las objeciones y lo entregaba listo para
                decidir. El equipo de ventas cerraba con alguien que ya había
                dicho sí por dentro.
              </p>
            </div>
          </section>

          {/* ── QUÉ ES / POR QUÉ FUNCIONA ─────────────────── */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            <div className="bg-s1 p-8 md:p-12 flex flex-col gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                ¿Qué es?
              </p>
              <p className="font-body text-mid text-base leading-relaxed">
                Una VSL es una carta de ventas en video de 5 a 12 minutos,
                estructurada para llevar al prospecto desde el problema hasta la
                compra siguiendo una secuencia psicológica probada. No es un
                video corporativo. No es un tutorial. Es el argumento completo
                de venta — en un solo formato que funciona las 24 horas.
              </p>
            </div>
            <div className="bg-s2 p-8 md:p-12 flex flex-col gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                ¿Por qué funciona?
              </p>
              <p className="font-body text-mid text-base leading-relaxed">
                El 80% de las ventas ocurren después del quinto punto de
                contacto. La VSL concentra esos cinco puntos en una sola pieza.
                Mientras los otros videos del sistema construyen atención,
                autoridad y confianza, la VSL cierra. El que llega aquí ya te
                conoce. La VSL convierte ese conocimiento en decisión.
              </p>
            </div>
          </section>

          {/* ── CASO REAL — INCOLUDIDO ─────────────────────── */}
          <section className="flex flex-col gap-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border">
              Caso real
            </p>

            <div className="bg-s1 border border-border p-8 md:p-16 relative overflow-hidden flex flex-col gap-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-[0.04] rounded-full blur-[80px]" />
              <div className="flex flex-col gap-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Caso 01
                </p>
                <h3 className="font-display text-display-sm text-ink">
                  Incoludido
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
                <div>
                  <p className="font-display text-display-lg md:text-display-xl text-accent leading-none">
                    $23M
                  </p>
                  <p className="font-display text-xl text-ink mt-1">CLP recaudados</p>
                </div>
                <div>
                  <p className="font-display text-display-lg md:text-display-xl text-accent leading-none">
                    53%
                  </p>
                  <p className="font-display text-xl text-ink mt-1">sobre la meta</p>
                </div>
              </div>
              <p className="font-body text-mid text-base max-w-2xl leading-relaxed">
                El video calificó, educó y entregó prospectos listos para
                comprar. Cobertura en Canal 13 y La Cuarta.
              </p>
              {/* Placeholder para video embed */}
              <div className="relative w-full pb-[56.25%] bg-bg border border-border overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full border border-border2 flex items-center justify-center">
                    <svg className="w-7 h-7 text-mid ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="font-mono text-xs text-muted tracking-widest uppercase text-center px-4">
                    VSL — Incoludido · Campaña de crowdfunding
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── QUÉ INCLUYE ────────────────────────────────── */}
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-10">
              Qué incluye
            </p>
            <ul className="flex flex-col gap-0 border border-border divide-y divide-border">
              {[
                "01 — Guion VSL completo: estructura de 12 pasos (hook → problema → solución → oferta → cierre)",
                "02 — Producción multicámara con dirección creativa",
                "03 — Animaciones y motion graphics para los puntos clave",
                "04 — CTA integrado visualmente al video",
                "05 — Versión corta de 90 seg para ads de tráfico",
                "06 — Subtítulos en español e inglés según lo requiera",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 px-6 py-5 bg-bg hover:bg-s1 transition-colors"
                >
                  <span className="font-mono text-[10px] text-muted w-5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body text-ink text-base">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── FAQ ────────────────────────────────────────── */}
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-10">
              Preguntas frecuentes
            </p>
            <div className="flex flex-col gap-0 border border-border divide-y divide-border">
              {[
                {
                  q: "¿No es muy largo para verlo completo?",
                  a: "El que está listo para comprar lo ve completo. La VSL califica sola: solo terminan los que tienen intención real.",
                },
                {
                  q: "¿Necesito tráfico para que funcione?",
                  a: "Sí. La VSL cierra. Los otros videos del sistema traen y calientan al prospecto. Por eso el sistema funciona como un todo — no como piezas sueltas.",
                },
                {
                  q: "¿Se puede usar fuera del sistema?",
                  a: "Sí. Funciona como pieza independiente en landing pages, campañas de email o ads directos. Pero rinde más dentro del sistema completo.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="px-6 py-8 bg-bg hover:bg-s1 transition-colors flex flex-col gap-3"
                >
                  <p className="font-display text-xl md:text-2xl text-ink">
                    {faq.q}
                  </p>
                  <p className="font-body text-mid text-base leading-relaxed max-w-3xl">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── TRANSICION / CTA FINAL ─────────────────────── */}
          <section className="bg-s1 border border-border p-8 md:p-16 flex flex-col gap-8 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent opacity-[0.04] rounded-full blur-[80px]" />
            <h2 className="font-display text-display-sm md:text-display-md text-ink max-w-xl leading-[0.95]">
              Activa tu vendedor más rentable
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-wa-vsl"
                className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-8 py-4 hover:bg-accent2 transition-colors"
              >
                Activa tu vendedor más rentable
              </a>
              <Link
                href="/precios"
                id="cta-precios-vsl"
                className="inline-flex justify-center items-center font-mono text-xs tracking-wide border border-border2 text-mid px-6 py-4 hover:border-mid hover:text-ink transition-colors"
              >
                Ver precios →
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

          {/* ── SISTEMA COMPLETO ───────────────────────────── */}
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-4">
              El sistema completo
            </p>
            <p className="font-body text-mid text-base mb-10">
              Este es el paso 4 y el cierre del sistema.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border">
              {OTHER_VIDEOS.map((v) => (
                <Link
                  key={v.href}
                  href={v.href}
                  className="group bg-bg hover:bg-s1 transition-colors p-8 flex flex-col gap-3"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {v.step}
                  </p>
                  <p className="font-display text-2xl text-ink group-hover:text-accent transition-colors">
                    {v.title}
                  </p>
                  <p className="font-body text-mid text-sm leading-relaxed">
                    {v.desc}
                  </p>
                  <span className="font-mono text-[10px] text-accent tracking-wide mt-2">
                    Ver más →
                  </span>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
