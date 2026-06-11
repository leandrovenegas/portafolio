import Link from "next/link";

export const metadata = {
  title: "Video de Validación — El boca a boca en video | Leandro Venegas",
  description:
    "El 92% de las personas confía más en lo que dice un desconocido que en lo que dice una marca. El video de validación convierte esa lógica en tu mejor herramienta de ventas.",
  alternates: { canonical: "https://www.leandrovenegas.cl/videos/validacion" },
  openGraph: {
    title: "Video de Validación | Leandro Venegas",
    description:
      "El boca a boca en video. Ni tú ni tus clientes quieren equivocarse — y para eso existe este tipo de video.",
    url: "https://www.leandrovenegas.cl/videos/validacion",
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
    step: "Paso 4",
    title: "Video VSL",
    desc: "Tu vendedor que trabaja 24/7.",
    href: "/videos/vsl",
  },
];

const WA_LINK =
  "https://wa.me/56988804299?text=Hola%2C%20me%20interesa%20el%20video%20de%20validaci%C3%B3n%20para%20mi%20empresa.";
const CAL_LINK = "https://cal.com/leandrovenegas";

export default function ValidacionPage() {
  return (
    <>
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-24 md:gap-32">

          {/* ── HERO ───────────────────────────────────────── */}
          <section className="pt-12 md:pt-24 min-h-[55vh] flex flex-col justify-center">
            <p className="font-mono text-accent text-xs tracking-[0.2em] uppercase mb-6">
              Paso 3 del sistema
            </p>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-4xl">
              El boca a boca en video.
            </h1>
            <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed">
              Ni tú ni ellos quieren equivocarse — y para eso existe este tipo
              de video.
            </p>
          </section>

          {/* ── POR QUÉ FUNCIONA (biología) ────────────────── */}
          <section className="flex flex-col gap-8">
            <h2 className="text-display-md md:text-display-lg text-ink max-w-3xl">
              Está grabado en nuestro ADN.
            </h2>
            <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed">
              El instinto de confiar en la tribu es lo que nos ha mantenido
              vivos y lejos de los peligros de la naturaleza. Saber que los
              otros no murieron por comer los frutos rojos te permite comerlos
              sin dudar. Este fenómeno está grabado en nuestro ADN desde hace
              miles de años. Es por ello que el{" "}
              <span className="text-accent font-bold">92%</span> de las personas
              confía más en lo que dice un desconocido que en lo que dice una
              marca — y esa es la clave de este video.
            </p>
            <p className="font-body text-mid text-base leading-relaxed max-w-2xl">
              Recolectar opiniones en video es tan poderoso como la
              recomendación boca a boca, y este material es abundante porque
              hoy existen cientos de comentarios e iniciativas para invitar a
              los usuarios a crear contenido.
            </p>
          </section>

          {/* ── POR QUÉ FUNCIONA (ciencia) ─────────────────── */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            <div className="bg-s1 p-8 md:p-12 flex flex-col gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                ¿Qué es?
              </p>
              <p className="font-body text-mid text-base leading-relaxed">
                Un video de validación social es una pieza producida con
                personas reales reaccionando, opinando o usando tu producto o
                servicio. También puede construirse desde reseñas que los
                clientes ya dejaron. No es un comercial. Es la captura honesta
                de una reacción genuina — con la producción necesaria para que
                funcione en redes.
              </p>
            </div>
            <div className="bg-s2 p-8 md:p-12 flex flex-col gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                ¿Por qué funciona?
              </p>
              <p className="font-body text-mid text-base leading-relaxed">
                Robert Cialdini lo documentó como prueba social. Solomon Asch
                lo demostró en laboratorio. Y cualquier dueño de negocio lo ha
                vivido: el local lleno atrae más gente que el local vacío. Un
                video donde personas reales hablan de tu producto le dice al
                cerebro de tu cliente:{" "}
                <span className="text-ink italic">
                  "cómpralo, no te vas a equivocar."
                </span>
              </p>
            </div>
          </section>

          {/* ── CASO REAL — INCOLUDIDO ─────────────────────── */}
          <section className="flex flex-col gap-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border">
              Caso real
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Caso 01
                </p>
                <h3 className="font-display text-display-sm text-ink">
                  Incoludido
                </h3>
              </div>
              <p className="font-body text-mid text-base leading-relaxed max-w-2xl">
                Incoludido es una marca de papel higiénico chilena. En lugar de
                hablar ellos del producto, salimos a la calle con personas
                reales — hombres, mujeres, distintas edades — y les pusimos el
                papel en la mano. Sus reacciones, sin guion, en cámara. El
                resultado: una pieza que la gente comparte porque se siente
                real. Porque lo es.
              </p>
              {/* Placeholder para video embed */}
              <div className="relative w-full pb-[56.25%] bg-s1 border border-border overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full border border-border2 flex items-center justify-center">
                    <svg className="w-7 h-7 text-mid ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="font-mono text-xs text-muted tracking-widest uppercase text-center px-4">
                    Video — Incoludido · Validación en calle
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
                "01 — Investigación de reseñas o contenidos de clientes",
                "02 — Guion: estructura de secuencia o pauta de entrevista",
                "03 — Producción básica, media o alta según presupuesto",
                "04 — Dirección de cámara y sonido",
                "05 — Edición con subtítulos y formato para redes",
                "06 — Versión corta para feed + versión extendida si aplica",
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
                  q: "¿Qué pasa si las personas dicen algo negativo?",
                  a: "Es información útil para el feedback, pero este video se trata de destacar lo positivo. Para lo demás, pueden navegar en internet.",
                },
                {
                  q: "¿Necesito tener un producto físico?",
                  a: "No. Se puede adaptar a servicios, experiencias o resultados. Lo conversamos en la llamada.",
                },
                {
                  q: "¿Cuánto demora?",
                  a: "De 3 a 7 días después de la grabación o edición.",
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
              Dale a tu prospecto la prueba que necesita para decir que sí
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-wa-validacion"
                className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-8 py-4 hover:bg-accent2 transition-colors"
              >
                Quiero un video de validación
              </a>
              <Link
                href="/proceso"
                id="cta-proceso-validacion"
                className="inline-flex justify-center items-center font-mono text-xs tracking-wide border border-border2 text-mid px-6 py-4 hover:border-mid hover:text-ink transition-colors"
              >
                Ver cómo funciona el sistema completo →
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
              Este es el paso 3. El sistema completo tiene 4.
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
