import Link from "next/link";

export const metadata = {
  title: "Video de Autoridad — La confianza se construye con autoridad | Leandro Venegas",
  description:
    "Tu experiencia y conocimiento son la clave. El video de autoridad los transforma en credibilidad visible para tu cliente ideal.",
  alternates: { canonical: "https://www.leandrovenegas.cl/videos/autoridad" },
  openGraph: {
    title: "Video de Autoridad | Leandro Venegas",
    description:
      "Tu experiencia y conocimiento son la clave. El video de autoridad los transforma en credibilidad visible.",
    url: "https://www.leandrovenegas.cl/videos/autoridad",
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
    step: "Paso 3",
    title: "Video de Validación",
    desc: "¿Le funcionó a alguien como yo?",
    href: "/videos/validacion",
  },
  {
    step: "Paso 4",
    title: "Video VSL",
    desc: "Tu vendedor que trabaja 24/7.",
    href: "/videos/vsl",
  },
];

const WA_LINK =
  "https://wa.me/56988804299?text=Hola%2C%20me%20interesa%20el%20video%20de%20autoridad%20para%20mi%20empresa.";
const CAL_LINK = "https://cal.com/leandrovenegas";

export default function AutoridadPage() {
  return (
    <>
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-24 md:gap-32">

          {/* ── HERO ───────────────────────────────────────── */}
          <section className="pt-12 md:pt-24 min-h-[55vh] flex flex-col justify-center">
            <p className="font-mono text-accent text-xs tracking-[0.2em] uppercase mb-6">
              Paso 2 del sistema
            </p>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-4xl">
              La confianza se construye con autoridad.
            </h1>
            <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed">
              Quizás ya lo sabes, pero aún no le sacas provecho. Un dueño de
              negocio sabe —y sabe bastante— sobre lo que vende: pueden ser los
              años de experiencia o la fascinación por el tema. Es ese potencial
              el que aprovecha el video de Autoridad.
            </p>
          </section>

          {/* ── QUÉ BUSCA ──────────────────────────────────── */}
          <section className="flex flex-col gap-8">
            <h2 className="text-display-md md:text-display-lg text-ink max-w-3xl">
              Tu conocimiento es la clave.
            </h2>
            <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed">
              El video de Autoridad busca la forma de expresar tu conocimiento
              sobre el tema: contar las novedades, hacer comparaciones basadas
              en tu experiencia y educar a tu audiencia. Quizás no lo sabes,
              pero una simple investigación sobre tu nicho nos dará todos los
              tópicos que tocar para este tipo de video.
            </p>

            {/* Bloques sesgo / halo / proximidad */}
            <div className="flex flex-col gap-0 border border-border divide-y divide-border mt-4">
              {[
                {
                  label: "Sesgo de Autoridad",
                  text: "Desde pequeños estamos condicionados a confiar en las figuras de autoridad. En un video, elementos como un micrófono de solapa, un encuadre centrado, gráficos bien diseñados o subtítulos dinámicos activan este sesgo, otorgándole al orador un estatus de experto casi instantáneo.",
                },
                {
                  label: "El Efecto Halo",
                  text: "Es un sesgo cognitivo donde la percepción de un rasgo positivo —como una apariencia impecable o una edición profesional— influye en nuestra evaluación de toda la persona, haciéndonos creer que su conocimiento es superior.",
                },
                {
                  label: "La ilusión de proximidad",
                  text: "El formato vertical y la cercanía a la cámara generan una falsa sensación de conversación uno a uno. Esto libera dopamina y oxitocina, aumentando la confianza y haciendo que el espectador sea más receptivo al mensaje.",
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

          {/* ── POR QUÉ FUNCIONAN ──────────────────────────── */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            <div className="bg-s1 p-8 md:p-12 flex flex-col gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                ¿Qué es?
              </p>
              <p className="font-body text-mid text-base leading-relaxed">
                Un video donde demuestras dominio de tu área. No vendes. Muestras
                que sabes exactamente lo que haces, educas a tu cliente ideal y
                posicionas tu marca como la referencia del sector.
              </p>
            </div>
            <div className="bg-s2 p-8 md:p-12 flex flex-col gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                ¿Por qué funciona?
              </p>
              <p className="font-body text-mid text-base leading-relaxed">
                Desde que vamos al colegio estamos frente a una autoridad —el
                maestro o profesor— que nos traspasa información y a quien
                respetamos. Nuestro cerebro está moldeado para obedecer ese
                patrón. El video de Autoridad lo activa a favor de tu marca.
              </p>
            </div>
          </section>

          {/* ── CASOS REALES ───────────────────────────────── */}
          <section className="flex flex-col gap-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border">
              Casos reales
            </p>

            {/* Caso 1 — Valook */}
            <div className="bg-s1 border border-border p-8 md:p-16 relative overflow-hidden flex flex-col gap-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-[0.04] rounded-full blur-[80px]" />
              <div className="flex flex-col gap-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Caso 01
                </p>
                <h3 className="font-display text-display-sm text-ink">
                  Valook
                </h3>
              </div>
              <p className="font-display text-display-lg md:text-display-xl text-accent leading-none">
                815,000+
              </p>
              <p className="font-display text-2xl text-ink">reproducciones orgánicas</p>
              <p className="font-body text-mid text-base max-w-2xl leading-relaxed">
                Para el canal de YouTube de Valook realizamos una investigación
                de palabras clave sobre las búsquedas que hacían los clientes de
                la iluminación profesional en Chile. Descubrimos flujos de
                búsqueda que nos llevaron a desarrollar una serie de videos de
                Autoridad. En conjunto con su equipo de ventas, desarrollé para
                cada uno de ellos diferentes videos donde hablaban con autoridad
                sobre los temas. Los videos alcanzaron miles de reproducciones,
                generándole al canal más de 815,000 vistas de manera orgánica,
                lo que impactó positivamente en la credibilidad de la empresa.
              </p>
            </div>

            {/* Caso 2 — AC2 */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Caso 02
                </p>
                <h3 className="font-display text-display-sm text-ink">
                  AC2 — Dr. Andreades
                </h3>
              </div>
              <p className="font-body text-mid text-base leading-relaxed max-w-2xl">
                Para el Dr. Andreades de la clínica AC2 generamos una serie de
                videos de Autoridad donde quien ha escrito diferentes libros
                sobre cirugía plástica pudo demostrar sus conocimientos
                explicando las últimas técnicas a sus pacientes. Ejemplos como
                este son los que produce el video de Autoridad: posicionar al
                profesional como la referencia indiscutible de su especialidad.
              </p>
            </div>
          </section>

          {/* ── QUÉ INCLUYE ────────────────────────────────── */}
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-10">
              Qué incluye
            </p>
            <ul className="flex flex-col gap-0 border border-border divide-y divide-border">
              {[
                "01 — Estrategia de Autoridad: investigación sobre qué están buscando los usuarios de tu sector",
                "02 — Guion de Autoridad con 3 variantes de temas a resolver",
                "03 — Producción: normal, mediana o full según presupuesto",
                "04 — Edición con subtítulos animados y motion graphics o IA según corresponda",
                "05 — 3 formatos de entrega: Reels, TikTok, Stories",
                "06 — Entrega en 3 a 7 días hábiles después de la grabación",
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
                  q: "No soy bueno frente a cámara.",
                  a: "Nadie lo es sin dirección. El guion y la preparación previa hacen el 80% del trabajo. Tú pones la experiencia, yo pongo la estructura.",
                },
                {
                  q: "¿Qué digo en el video?",
                  a: "Eso lo definimos juntos. El guion nace de lo que ya sabes: tu método, tus resultados, el problema que resuelves mejor que nadie.",
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
              Muestra que eres el experto que tu cliente necesita
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-wa-autoridad"
                className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-8 py-4 hover:bg-accent2 transition-colors"
              >
                Quiero este video
              </a>
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-cal-autoridad"
                className="inline-flex justify-center items-center font-mono text-xs tracking-wide border border-border2 text-mid px-6 py-4 hover:border-mid hover:text-ink transition-colors"
              >
                Agendar llamada gratis
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

          {/* ── SISTEMA COMPLETO ───────────────────────────── */}
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-4">
              El sistema completo
            </p>
            <p className="font-body text-mid text-base mb-10">
              Este es el paso 2. El sistema completo tiene 4.
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
