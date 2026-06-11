import Link from "next/link";

export const metadata = {
  title: "Video Stop-Scrolling — Tienes 3 segundos | Leandro Venegas",
  description:
    "No hay tiempo. Solo tienes 3 segundos para ser diferente del resto. El video Stop-Scrolling detiene el scroll y lleva a tu audiencia directo a la acción.",
  alternates: {
    canonical: "https://www.leandrovenegas.cl/videos/stop-scrolling",
  },
  openGraph: {
    title: "Video Stop-Scrolling — Tienes 3 segundos | Leandro Venegas",
    description:
      "No hay tiempo. Solo tienes 3 segundos para ser diferente del resto.",
    url: "https://www.leandrovenegas.cl/videos/stop-scrolling",
  },
};

const OTHER_VIDEOS = [
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
  {
    step: "Paso 4",
    title: "Video VSL",
    desc: "Tu vendedor que trabaja 24/7.",
    href: "/videos/vsl",
  },
];

const WA_LINK =
  "https://wa.me/56988804299?text=Hola%2C%20me%20interesa%20el%20video%20stop-scrolling%20para%20mi%20empresa.";
const CAL_LINK = "https://cal.com/leandrovenegas";

export default function StopScrollingPage() {
  return (
    <>
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-24 md:gap-32">

          {/* ── HERO ───────────────────────────────────────── */}
          <section className="pt-12 md:pt-24 min-h-[55vh] flex flex-col justify-center">
            <p className="font-mono text-accent text-xs tracking-[0.2em] uppercase mb-6">
              Paso 1 del sistema
            </p>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-4xl">
            Solo 3 segundos para diferenciarte.
            </h1>
            <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed">
              Esto parece un reto creativo, pero no. Afuera se está librando la
              batalla de la atención. Múltiples investigaciones sitúan la media
              de atención en segundos — y justamente esa es la clave que tu
              video tiene que explotar para luego entregar tu mensaje.
            </p>
          </section>

          {/* ── METODOLOGÍA ────────────────────────────────── */}
          <section className="flex flex-col gap-8">
            <h2 className="text-display-md md:text-display-lg text-ink max-w-3xl">
              No es una fórmula secreta. Es una metodología.
            </h2>
            <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed">
              Mi video Stop-Scrolling usa{" "}
              <span className="font-mono text-accent">
                Gancho → Dolor → Promesa → Solución → Llamada a la acción.
              </span>{" "}
              No vamos a inventar la rueda — usaremos lo que funciona. Porque
              detrás de esta metodología no se repite en los videos que tienen
              miles de reproducciones.
            </p>

            {/* Diagrama flujo neurológico */}
            <div className="w-full">
              <img
                src="https://res.cloudinary.com/dx2rvpvwr/image/upload/v1781132868/diagrama-brakescrolling_wglgim.png"
                alt="Diagrama del flujo neurológico del Stop-Scrolling: Estímulo Visual/Audio (Gancho 0-1.5s) → Red Saliencia → Curiosidad/Dopamina → Evaluación de Valor (Córtex Prefrontal)"
                className="w-full h-auto object-contain"
              />
            </div>

            <p className="font-body text-mid text-base leading-relaxed max-w-2xl">
              El guion de un video comercial debe ser diseñado por tu estratega
              de ventas, no por tu realizador audiovisual. Yo te guío en el
              camino —{" "}
              <Link href="/proceso" className="text-accent underline underline-offset-4">
                conoce el proceso que viviremos juntos
              </Link>
              .
            </p>
          </section>

          {/* ── QUÉ ES / POR QUÉ FUNCIONA ─────────────────── */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            <div className="bg-s1 p-8 md:p-12 flex flex-col gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                ¿Qué es el Stop-Scrolling?
              </p>
              <p className="font-body text-mid text-base leading-relaxed">
                Es un video corto de 6 a 30 segundos diseñado para detener el
                scroll. No busca alcance. Busca impactar en la conciencia y
                generar acciones concretas: llevar al usuario a tu web, a tu
                feed, a tu tienda.
              </p>
            </div>
            <div className="bg-s2 p-8 md:p-12 flex flex-col gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                ¿Por qué funciona?
              </p>
              <p className="font-body text-mid text-base leading-relaxed">
                Detener el scroll automático requiere un corte visual inesperado
                o una declaración contraintuitiva. Funciona porque nuestro
                sistema de atención está diseñado para detectar cambios de
                patrones. En el contexto del scroll infinito, nuestros cerebros
                están en búsqueda constante de la recompensa de dopamina que
                genera ver algo diferente.
              </p>
            </div>
          </section>

          {/* ── CASOS REALES ───────────────────────────────── */}
          <section className="flex flex-col gap-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border">
              Casos reales
            </p>

            {/* Caso 1 — Crazy Papa Studio */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Caso 01
                </p>
                <h3 className="font-display text-display-sm text-ink">
                  Crazy Papa Studio
                </h3>
              </div>
              <p className="font-body text-mid text-base leading-relaxed max-w-2xl">
                Una marca de poleras con ilustraciones de artistas chilenos
                necesitaba interrumpir el feed sin pauta. La estrategia:
                introducir un extraterrestre en escena con cortes rápidos que
                rompen el ritmo del scroll. El cerebro no puede procesar
                "¿qué es esto?" y seguir deslizando al mismo tiempo. Cierra
                con la marca y el llamado a visitar la web.
              </p>
              <div className="w-full aspect-video bg-s1 border border-border overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source
                    src="https://vz-a158839f-ce6.b-cdn.net/95fa41a7-a372-494e-8be9-48da0e910a98/playlist.m3u8"
                    type="application/vnd.apple.mpegurl"
                  />
                  Tu navegador no soporta la reproducción de video.
                </video>
              </div>
            </div>

            {/* Caso 2 — Incoludido */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Caso 02
                </p>
                <h3 className="font-display text-display-sm text-ink">
                  Incoludido
                </h3>
              </div>
              <p className="font-body text-mid text-base leading-relaxed max-w-2xl">
                Una marca de papel higiénico con un personaje héroe que lucha
                contra una tierna ovejita que esconde su verdadera identidad: un
                reptiliano con cola y dientes. La escena transcurre en el baño —
                el territorio natural del producto — termina con el villano
                huyendo por el excusado y la marca entrando como salvadora.
                Cierra con llamado al sitio web.
              </p>
              <div className="w-full aspect-video bg-s1 border border-border overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source
                    src="https://vz-a158839f-ce6.b-cdn.net/94a25f36-533c-4092-9053-ee1885c2514c/playlist.m3u8"
                    type="application/vnd.apple.mpegurl"
                  />
                  Tu navegador no soporta la reproducción de video.
                </video>
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
                "01 — Estrategia de interrupción: investigación del dolor que soluciona tu producto",
                "02 — Guion con 3 variantes de hook probadas",
                "03 — Producción: normal, media o full según presupuesto",
                "04 — Edición con subtítulos animados y motion graphics con IA",
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
                  q: "¿Funciona para mi rubro?",
                  a: "Si tu cliente usa Instagram o TikTok, funciona. La mecánica de atención es la misma en todos los feeds — no importa si vendes ropa, servicios o tecnología.",
                },
                {
                  q: "¿Tengo que aparecer en cámara?",
                  a: "No. Podemos construir el hook con producto, servicio en acción o elementos visuales sin rostro. Lo que importa es el estímulo, no quién lo protagoniza.",
                },
                {
                  q: "¿Cuánto tiempo me va a tomar a mí?",
                  a: "Una sesión inicial para alinear la estrategia. El resto lo manejo yo. Entrega en 3 a 7 días hábiles según el nivel de producción.",
                },
                {
                  q: "¿Qué necesito tener claro antes de empezar?",
                  a: "Solo tu producto y a quién le vendes. El guion, la estrategia y el concepto creativo son parte del proceso — no llego a grabar sin que ambos tengamos claro el objetivo.",
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

          {/* ── CTA FINAL ──────────────────────────────────── */}
          <section className="bg-s1 border border-border p-8 md:p-16 flex flex-col gap-8 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent opacity-[0.04] rounded-full blur-[80px]" />
            <h2 className="font-display text-display-sm md:text-display-md text-ink max-w-xl leading-[0.95]">
              Empieza con el video que detiene el scroll
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-wa-stop-scrolling"
                className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-8 py-4 hover:bg-accent2 transition-colors"
              >
                Quiero este video
              </a>
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-cal-stop-scrolling"
                className="inline-flex justify-center items-center font-mono text-xs tracking-wide border border-border2 text-mid px-6 py-4 hover:border-mid hover:text-ink transition-colors"
              >
                Agendar llamada gratis
              </a>
            </div>
            <p className="font-body text-muted text-sm max-w-xl leading-relaxed">
              Este es el primer video de la secuencia. Si lo que necesitas es
              otro tipo de video, aquí están los siguientes pasos del sistema.
            </p>
          </section>

          {/* ── SISTEMA COMPLETO ───────────────────────────── */}
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-4">
              El sistema completo
            </p>
            <p className="font-body text-mid text-base mb-10">
              Este es el paso 1. El sistema completo tiene 4.
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
