import Link from "next/link";

export const metadata = {
  title: "Video de Autoridad — La confianza no se pide, se demuestra | Leandro Venegas",
  description:
    "Tu cliente ya te encontró. Ahora decide si eres la persona correcta. El video de autoridad responde esa pregunta antes de que te la haga.",
  alternates: { canonical: "https://www.leandrovenegas.cl/videos/autoridad" },
  openGraph: {
    title: "Video de Autoridad | Leandro Venegas",
    description: "Tu cliente ya te encontró. El video de autoridad demuestra que eres la persona correcta.",
    url: "https://www.leandrovenegas.cl/videos/autoridad",
  },
};

const OTHER_VIDEOS = [
  { step: "Paso 1", title: "Video Stop-Scrolling", desc: "Tienes 1.5 segundos. ¿Qué hace tu marca con ellos?", href: "/videos/stop-scrolling" },
  { step: "Paso 3", title: "Video de Validación", desc: "¿Le funcionó a alguien como yo?", href: "/videos/validacion" },
  { step: "Paso 4", title: "Video VSL", desc: "Tu vendedor que trabaja 24/7.", href: "/videos/vsl" },
];

const WA_LINK = "https://wa.me/56988804299?text=Hola%2C%20me%20interesa%20el%20video%20de%20autoridad%20para%20mi%20empresa.";
const CAL_LINK = "https://cal.com/leandrovenegas";

export default function AutoridadPage() {
  return (
    <>
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-24 md:gap-32">

          {/* BLOQUE 1 — Encabezado */}
          <section className="pt-12 md:pt-24 min-h-[55vh] flex flex-col justify-center">
            <p className="font-mono text-accent text-xs tracking-[0.2em] uppercase mb-6">Paso 2 del sistema</p>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-4xl">
              La confianza no se pide. Se demuestra.
            </h1>
            <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed">
              Tu cliente ya te encontró. Ahora decide si eres la persona correcta para confiarle su dinero.
              <br />
              El video de autoridad responde esa pregunta antes de que te la haga.
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
                  Leandro explica por qué la autoridad se ve, no se declara
                </p>
              </div>
            </div>
          </section>

          {/* BLOQUE 3 — Qué es / Por qué funciona */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            <div className="bg-s1 p-8 md:p-12 flex flex-col gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">Qué es</p>
              <p className="font-body text-mid text-base leading-relaxed">
                Un video de 1 a 3 minutos donde demuestras dominio de tu área. No vendes. Solo muestras que sabes exactamente lo que haces y{" "}
                <span className="text-ink">por qué funciona.</span>
              </p>
            </div>
            <div className="bg-s2 p-8 md:p-12 flex flex-col gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">Por qué funciona</p>
              <p className="font-body text-mid text-base leading-relaxed">
                El cerebro evalúa credibilidad en segundos. Un video bien producido activa señales de autoridad — postura, calidad visual, lenguaje — que ningún texto puede replicar.
              </p>
            </div>
          </section>

          {/* BLOQUE 4 — Prueba social */}
          <section className="bg-s1 border border-border p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-[0.04] rounded-full blur-[80px]" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-6">Caso real · Incoludido</p>
            <p className="font-display text-display-lg md:text-display-xl text-accent leading-none mb-4">23,000,000</p>
            <p className="font-display text-2xl text-ink mb-4">CLP recaudados</p>
            <p className="font-body text-mid text-base max-w-xl leading-relaxed">
              La campaña superó la meta de 15M CLP en un 53%. El video de autoridad fue la pieza que construyó la confianza para que 200+ personas apostaran por el proyecto.
            </p>
          </section>

          {/* BLOQUE 5 — Qué incluye */}
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-10">Qué incluye</p>
            <ul className="flex flex-col border border-border divide-y divide-border">
              {[
                "Guión de autoridad (qué decir, en qué orden, sin sonar vendedor)",
                "Dirección de cámara y coaching de lenguaje corporal",
                "Producción profesional en estudio o locación",
                "Color grading editorial",
                "Subtítulos animados y motion",
                "Versión corta de 30 seg para redes",
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
                { q: "No soy bueno frente a cámara", a: "Nadie lo es sin dirección. El guión y la preparación previa hacen el 80% del trabajo. Tú pones la experiencia, yo pongo la estructura." },
                { q: "¿Qué digo en el video?", a: "Eso lo definimos juntos. El guión nace de lo que ya sabes: tu método, tus resultados, el problema que resuelves mejor que nadie." },
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
              Muestra que eres el experto que tu cliente necesita
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" id="cta-wa-autoridad"
                className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-8 py-4 hover:bg-accent2 transition-colors">
                Quiero este video
              </a>
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" id="cta-cal-autoridad"
                className="inline-flex justify-center items-center font-mono text-xs tracking-wide border border-border2 text-mid px-6 py-4 hover:border-mid hover:text-ink transition-colors">
                Agendar llamada gratis
              </a>
            </div>
          </section>

          {/* BLOQUE 8 — Los otros 3 videos */}
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-4">El sistema completo</p>
            <p className="font-body text-mid text-base mb-10">Este video es el paso 2. El sistema completo tiene 4.</p>
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
