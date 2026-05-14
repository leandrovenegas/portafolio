import Link from "next/link";

export const metadata = {
  title: "Video VSL — Tu vendedor que trabaja 24/7 | Leandro Venegas",
  description:
    "Una carta de ventas en video que hace el trabajo completo de cierre. Solo. Sin que tú estés presente. Sin llamadas. Sin seguimiento manual.",
  alternates: { canonical: "https://www.leandrovenegas.cl/videos/vsl" },
  openGraph: {
    title: "Video VSL — Tu vendedor que trabaja 24/7 | Leandro Venegas",
    description: "Una VSL que lleva a tu prospecto desde el problema hasta la compra en una sola pieza.",
    url: "https://www.leandrovenegas.cl/videos/vsl",
  },
};

const OTHER_VIDEOS = [
  { step: "Paso 1", title: "Video Stop-Scrolling", desc: "Tienes 1.5 segundos. ¿Qué hace tu marca con ellos?", href: "/videos/stop-scrolling" },
  { step: "Paso 2", title: "Video de Autoridad", desc: "La confianza no se pide. Se demuestra.", href: "/videos/autoridad" },
  { step: "Paso 3", title: "Video de Validación", desc: "¿Le funcionó a alguien como yo?", href: "/videos/validacion" },
];

const WA_LINK = "https://wa.me/56988804299?text=Hola%2C%20me%20interesa%20la%20VSL%20para%20mi%20empresa.";
const CAL_LINK = "https://cal.com/leandrovenegas";

export default function VslPage() {
  return (
    <>
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-24 md:gap-32">

          {/* BLOQUE 1 — Encabezado */}
          <section className="pt-12 md:pt-24 min-h-[55vh] flex flex-col justify-center">
            <p className="font-mono text-accent text-xs tracking-[0.2em] uppercase mb-6">Paso 4 del sistema</p>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-4xl">
              Tu vendedor que trabaja 24/7, nunca pide comisión, nunca se enferma.
            </h1>
            <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed">
              Una carta de ventas en video que hace el trabajo completo de cierre. Solo.
              <br />
              Sin que tú estés presente. Sin llamadas. Sin seguimiento manual.
            </p>
          </section>

          {/* BLOQUE 2 — Video */}
          <section className="w-full">
            <div className="relative w-full pb-[56.25%] bg-s1 border border-border overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full border border-border2 flex items-center justify-center">
                  <svg className="w-7 h-7 text-mid ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="font-mono text-xs text-muted tracking-widest uppercase text-center px-4">
                  Leandro explica qué es una VSL y por qué es la pieza más rentable que existe
                </p>
              </div>
            </div>
          </section>

          {/* BLOQUE 3 — Qué es / Por qué funciona */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            <div className="bg-s1 p-8 md:p-12 flex flex-col gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">Qué es</p>
              <p className="font-body text-mid text-base leading-relaxed">
                Una VSL (Video Sales Letter) de 5 a 12 minutos estructurada para llevar al prospecto desde el problema hasta la compra, siguiendo una{" "}
                <span className="text-ink">secuencia psicológica probada.</span>
              </p>
            </div>
            <div className="bg-s2 p-8 md:p-12 flex flex-col gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">Por qué funciona</p>
              <p className="font-body text-mid text-base leading-relaxed">
                El 80% de las ventas ocurren después del quinto punto de contacto. La VSL concentra esos cinco puntos en una sola pieza. Es el cierre más escalable que existe.
              </p>
            </div>
          </section>

          {/* BLOQUE 4 — Prueba social */}
          <section className="bg-s1 border border-border p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-[0.04] rounded-full blur-[80px]" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-6">Caso real · Incoludido</p>
            <p className="font-display text-display-lg md:text-display-xl text-accent leading-none mb-4">23M CLP</p>
            <p className="font-display text-2xl text-ink mb-4">· 53% sobre la meta</p>
            <p className="font-body text-mid text-base max-w-xl leading-relaxed">
              La VSL fue la pieza central de la campaña. Llevó al prospecto por todo el argumento de confianza en un solo video. Sin equipo de ventas. Sin llamadas de cierre.
            </p>
          </section>

          {/* BLOQUE 5 — Qué incluye */}
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-10">Qué incluye</p>
            <ul className="flex flex-col border border-border divide-y divide-border">
              {[
                "Guión VSL completo (estructura de 12 pasos: hook → problema → solución → oferta → cierre)",
                "Producción multicámara con dirección creativa",
                "Animaciones y motion graphics para los puntos clave",
                "CTA integrado visualmente al video",
                "Versión corta de 90 seg para ads de tráfico",
                "Subtítulos en español e inglés",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 px-6 py-5 bg-bg hover:bg-s1 transition-colors">
                  <span className="font-mono text-[10px] text-muted w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-body text-ink text-base">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* BLOQUE 6 — Preguntas frecuentes */}
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-10">Preguntas frecuentes</p>
            <div className="flex flex-col border border-border divide-y divide-border">
              {[
                { q: "¿No es muy largo para verlo completo?", a: "El que está listo para comprar lo ve completo. La VSL califica sola: solo terminan los que tienen intención real de comprar." },
                { q: "¿Necesito tráfico para que funcione?", a: "Sí. La VSL cierra. El stop-scrolling trae. Por eso el sistema de 4 videos funciona como un todo, no como piezas sueltas." },
              ].map((faq, i) => (
                <div key={i} className="px-6 py-8 bg-bg hover:bg-s1 transition-colors flex flex-col gap-3">
                  <p className="font-display text-xl md:text-2xl text-ink">{faq.q}</p>
                  <p className="font-body text-mid text-base leading-relaxed max-w-3xl">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* BLOQUE 7 — CTA */}
          <section className="bg-s1 border border-border p-8 md:p-16 flex flex-col gap-8 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent opacity-[0.04] rounded-full blur-[80px]" />
            <h2 className="font-display text-display-sm md:text-display-md text-ink max-w-xl leading-[0.95]">
              Activa tu vendedor más rentable
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" id="cta-wa-vsl"
                className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-8 py-4 hover:bg-accent2 transition-colors">
                Quiero este video
              </a>
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" id="cta-cal-vsl"
                className="inline-flex justify-center items-center font-mono text-xs tracking-wide border border-border2 text-mid px-6 py-4 hover:border-mid hover:text-ink transition-colors">
                Agendar llamada gratis
              </a>
            </div>
          </section>

          {/* BLOQUE 8 — Los otros 3 videos */}
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-4">El sistema completo</p>
            <p className="font-body text-mid text-base mb-10">Este video es el paso 4. El sistema completo tiene 4.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border">
              {OTHER_VIDEOS.map((v) => (
                <Link key={v.href} href={v.href} className="group bg-bg hover:bg-s1 transition-colors p-8 flex flex-col gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{v.step}</p>
                  <p className="font-display text-2xl text-ink group-hover:text-accent transition-colors">{v.title}</p>
                  <p className="font-body text-mid text-sm leading-relaxed">{v.desc}</p>
                  <span className="font-mono text-[10px] text-accent tracking-wide mt-2">Ver más →</span>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
