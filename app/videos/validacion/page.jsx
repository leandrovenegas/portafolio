import Nav from "@/components/Nav";
import Link from "next/link";

export const metadata = {
  title: "Video de Validación — ¿Le funcionó a alguien como yo? | Leandro Venegas",
  description:
    "Esa es la pregunta que hace tu prospecto justo antes de comprar. El video de validación la responde antes de que se vaya a buscar la respuesta en otro lado.",
  alternates: { canonical: "https://www.leandrovenegas.cl/videos/validacion" },
  openGraph: {
    title: "Video de Validación | Leandro Venegas",
    description: "El video de validación responde la última pregunta antes de la compra.",
    url: "https://www.leandrovenegas.cl/videos/validacion",
  },
};

const OTHER_VIDEOS = [
  { step: "Paso 1", title: "Video Stop-Scrolling", desc: "Tienes 1.5 segundos. ¿Qué hace tu marca con ellos?", href: "/videos/stop-scrolling" },
  { step: "Paso 2", title: "Video de Autoridad", desc: "La confianza no se pide. Se demuestra.", href: "/videos/autoridad" },
  { step: "Paso 4", title: "Video VSL", desc: "Tu vendedor que trabaja 24/7.", href: "/videos/vsl" },
];

const WA_LINK = "https://wa.me/56988804299?text=Hola%2C%20me%20interesa%20el%20video%20de%20validaci%C3%B3n%20y%20testimonios.";
const CAL_LINK = "https://cal.com/leandrovenegas";

export default function ValidacionPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-24 md:gap-32">

          {/* BLOQUE 1 — Encabezado */}
          <section className="pt-12 md:pt-24 min-h-[55vh] flex flex-col justify-center">
            <p className="font-mono text-accent text-xs tracking-[0.2em] uppercase mb-6">Paso 3 del sistema</p>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-4xl">
              ¿Le funcionó a alguien como yo?
            </h1>
            <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed">
              Esa es la pregunta que hace tu prospecto justo antes de comprar.
              <br />
              El video de validación la responde antes de que se vaya a buscar la respuesta en otro lado.
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
                  Leandro explica la diferencia entre un testimonio y una historia de transformación
                </p>
              </div>
            </div>
          </section>

          {/* BLOQUE 3 — Qué es / Por qué funciona */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            <div className="bg-s1 p-8 md:p-12 flex flex-col gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">Qué es</p>
              <p className="font-body text-mid text-base leading-relaxed">
                Un testimonio o caso de éxito filmado con criterio narrativo. No es una entrevista en cámara fija. Es una historia de transformación:{" "}
                <span className="text-ink">problema → solución → resultado.</span>
              </p>
            </div>
            <div className="bg-s2 p-8 md:p-12 flex flex-col gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">Por qué funciona</p>
              <p className="font-body text-mid text-base leading-relaxed">
                La prueba social elimina el último obstáculo de compra: el miedo a equivocarse. Ver a alguien con tu mismo problema decir "esto funcionó" vale más que cualquier argumento de venta.
              </p>
            </div>
          </section>

          {/* BLOQUE 4 — Prueba social */}
          <section className="bg-s1 border border-border p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-[0.04] rounded-full blur-[80px]" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-6">Caso real · Incoludido</p>
            <p className="font-display text-display-lg md:text-display-xl text-accent leading-none mb-4">200+</p>
            <p className="font-display text-2xl text-ink mb-4">personas apostaron sin conocerte en persona</p>
            <p className="font-body text-mid text-base max-w-xl leading-relaxed">
              La prueba social en video tiene un efecto multiplicador que el texto no puede igualar. El video de validación convirtió el escepticismo en confianza colectiva.
            </p>
          </section>

          {/* BLOQUE 5 — Qué incluye */}
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-10">Qué incluye</p>
            <ul className="flex flex-col border border-border divide-y divide-border">
              {[
                "Guión del arco narrativo (problema → solución → resultado medible)",
                "Entrevista dirigida con preguntas estratégicas de conversión",
                "B-roll del cliente, producto o servicio en acción",
                "Edición narrativa con música y motion",
                "Resultados visualizados: números, antes/después, capturas",
                "Subtítulos animados en 2 formatos (web y redes)",
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
                { q: "Mis clientes no quieren aparecer en cámara", a: "Podemos hacer el caso de éxito sin rostro: solo resultados, datos y voz en off. Igual de poderoso, más fácil de producir." },
                { q: "¿Y si no tengo casos de éxito aún?", a: "Empezamos por lo que tienes: tu propio proceso, resultados parciales, o clientes que estén dispuestos a dar su opinión aunque sea breve." },
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
              Dale a tu prospecto la prueba que necesita para decir que sí
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" id="cta-wa-validacion"
                className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-8 py-4 hover:bg-accent2 transition-colors">
                Quiero este video
              </a>
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" id="cta-cal-validacion"
                className="inline-flex justify-center items-center font-mono text-xs tracking-wide border border-border2 text-mid px-6 py-4 hover:border-mid hover:text-ink transition-colors">
                Agendar llamada gratis
              </a>
            </div>
          </section>

          {/* BLOQUE 8 — Los otros 3 videos */}
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-4">El sistema completo</p>
            <p className="font-body text-mid text-base mb-10">Este video es el paso 3. El sistema completo tiene 4.</p>
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
