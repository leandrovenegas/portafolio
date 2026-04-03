import Nav from "@/components/Nav";
import Link from "next/link";

export const metadata = {
  title: 'Producción Audiovisual para Empresas en Valparaíso y Chile — Spots y Video Corporativo | Leandro Venegas',
  description: '¿Necesitas un área audiovisual para tu empresa? Spots, reels y video corporativo como servicio externo en Valparaíso, Viña del Mar y todo Chile. Sin costo fijo mensual.',
  keywords: [
    'producción audiovisual Valparaíso',
    'producción audiovisual Viña del Mar',

  ],
  openGraph: {
    title: 'Producción Audiovisual para Empresas — Valparaíso y Chile | Leandro Venegas',
    description: 'Tu área audiovisual externa. Spots, reels y video corporativo sin costo fijo.',
    url: 'https://www.leandrovenegas.cl/servicios/produccion-audiovisual-empresas',
  },
};

export default function ProduccionAudiovisualPage() {
  const WA_LINK = "https://wa.me/56988804299?text=Hola%20Leandro%2C%20necesito%20producci%C3%B3n%20audiovisual%20para%20mi%20empresa";

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-7xl flex flex-col gap-24 md:gap-32">

          {/* HERO */}
          <section className="pt-12 md:pt-24 min-h-[60vh] flex flex-col justify-center">
            <p className="font-mono text-accent text-sm md:text-base mb-6 tracking-wide">
              Producción Audiovisual · Valparaíso · Viña del Mar · Todo Chile
            </p>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-5xl">
              Tu área audiovisual externa — spots, reels y video corporativo
            </h1>
            <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
              ¿Estás a punto de contratar un editor o productor de video? Antes de publicar ese aviso, evalúa esta opción: toda la producción audiovisual que necesitas tu empresa, sin costo fijo mensual, sin equipo que gestionar, sin oficina que pagar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-8 py-4 hover:bg-accent2 transition-colors"
              >
                Escribir por WhatsApp
              </a>
              <Link
                href="/portafolio"
                className="inline-flex justify-center items-center font-mono text-xs tracking-wide border border-border2 text-mid px-6 py-4 hover:border-mid hover:text-ink transition-colors"
              >
                Ver portafolio
              </Link>
            </div>
          </section>

          {/* El modelo */}
          <section>
            <div className="mb-12">
              <h2 className="font-display text-4xl md:text-5xl text-ink mb-4">
                No contratas a alguien. Contratas capacidad.
              </h2>
              <p className="font-body text-mid text-lg md:text-xl max-w-3xl leading-relaxed">
                La diferencia es importante. Un empleado audiovisual tiene un costo fijo, un rol fijo y un horario fijo — independiente de cuánto trabajo hay ese mes. Una colaboración externa se activa cuando la necesitas y se paga por lo que produces. Para la mayoría de las empresas chilenas, esto es económicamente superior.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
              <div className="bg-s1 p-8 md:p-12 flex flex-col gap-6">
                <h3 className="font-mono text-[10px] md:text-xs text-muted tracking-widest uppercase mb-4">
                  Editor o productor en planilla
                </h3>
                <ul className="flex flex-col gap-4 font-body text-mid">
                  <li className="flex gap-3"><span className="text-muted">×</span> Sueldo mensual fijo ($1.200.000 – $2.000.000)</li>
                  <li className="flex gap-3"><span className="text-muted">×</span> AFP, seguro y beneficios</li>
                  <li className="flex gap-3"><span className="text-muted">×</span> Capacidad ociosa los meses tranquilos</li>
                  <li className="flex gap-3"><span className="text-muted">×</span> Proceso de contratación de 1–3 meses</li>
                  <li className="flex gap-3"><span className="text-muted">×</span> Finiquito si no funciona</li>
                </ul>
              </div>

              <div className="bg-s2 p-8 md:p-12 flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-5 rounded-full blur-[50px]"></div>
                <h3 className="font-mono text-[10px] md:text-xs text-accent tracking-widest uppercase mb-4 relative z-10">
                  Servicio con Leandro
                </h3>
                <ul className="flex flex-col gap-4 font-body text-ink relative z-10">
                  <li className="flex gap-3"><span className="text-accent">✓</span> Pagas por proyecto o paquete mensual</li>
                  <li className="flex gap-3"><span className="text-accent">✓</span> Sin costos laborales adicionales</li>
                  <li className="flex gap-3"><span className="text-accent">✓</span> Disponible esta semana</li>
                  <li className="flex gap-3"><span className="text-accent">✓</span> 15+ años de práctica desde el primer día</li>
                  <li className="flex gap-3"><span className="text-accent">✓</span> Sin finiquito ni trámites</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Qué produzco */}
          <section>
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-12">
              Lo que puedo producir para tu empresa
            </h2>
            <div className="flex flex-col gap-8 md:gap-12 pl-4 border-l border-border">
              {[
                {
                  title: "1. Spots publicitarios",
                  desc: "Comerciales para TV, digital y redes. Desde el concepto y guión hasta la entrega final. Casos: LAN, Dr. Patricio Andrade."
                },
                {
                  title: "2. Video corporativo",
                  desc: "Presentaciones institucionales, videos de producto, onboarding y comunicación interna."
                },
                {
                  title: "3. Reels y contenido para redes",
                  desc: "Piezas verticales y cuadradas optimizadas para Instagram, TikTok y YouTube. Con o sin motion graphics."
                },
                {
                  title: "4. Videos explicativos",
                  desc: "Animación y narración para comunicar servicios complejos de forma clara y memorable."
                },
                {
                  title: "5. Identidad audiovisual de marca",
                  desc: <>Sistema de video que funciona como lenguaje visual consistente. Puedes ver un ejemplo de desarrollo visual en <Link href="/crazy-papa-studio" className="text-accent hover:underline">Crazy Papa Studio</Link>.</>
                }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <h3 className="font-display text-3xl text-ink">{item.title}</h3>
                  <p className="font-body text-mid text-lg max-w-3xl">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Para quién es esto */}
          <section className="bg-s1 border border-border p-8 md:p-16">
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-8">
              Ideal para tu empresa si...
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Necesitas producción audiovisual frecuente pero no justificas un cargo permanente",
                "Tienes un lanzamiento, campaña o evento que requiere video de calidad",
                "Tu presencia en redes necesita contenido audiovisual consistente",
                "Publicaste un aviso de editor de video y no encontraste el perfil adecuado",
                "Tuviste malas experiencias con productoras que no entienden tu negocio"
              ].map((text, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></div>
                  <p className="font-body text-lg text-mid">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Casos reales */}
          <section>
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[3px] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-12">
              Casos reales
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">

              {[
                { d1: "LAN → LATAM", d2: "Spot publicitario", d3: "Producción audiovisual para aerolínea nacional" },
                { d1: "Dr. Patricio Andrade", d2: "Video corporativo", d3: "Producción para cliente del área salud" },
                { d1: "Incoludido", d2: "Campaña completa", d3: "Spot + campaña digital que superó meta de recaudación" },
                { d1: "15M CLP", d2: "Recaudados", d3: "Campaña audiovisual con plataforma tecnológica propia" }
              ].map((item, i) => (
                <div key={i} className="bg-bg p-8 hover:bg-s1 transition-colors flex flex-col justify-between gap-6">
                  <h4 className="font-display text-4xl text-ink">{item.d1}</h4>
                  <div>
                    <p className="font-body text-accent font-semibold text-sm mb-1">{item.d2}</p>
                    <p className="font-body text-mid text-sm">{item.d3}</p>
                  </div>
                </div>
              ))}

            </div>
          </section>

          {/* CTA FINAL */}
          <section id="contacto">
            <div className="bg-s1 border border-border p-8 md:p-16 flex flex-col items-start gap-8 relative overflow-hidden">
              <h2 className="font-display text-4xl md:text-5xl text-ink max-w-2xl">
                Hablemos de lo que necesitas producir
              </h2>
              <p className="font-body text-mid text-lg md:text-xl max-w-2xl">
                Cuéntame el proyecto — tamaño, plazos y qué necesitas. En 30 minutos tenemos claridad sobre si puedo ayudarte y en qué términos.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-8 py-4 hover:bg-accent2 transition-colors w-full sm:w-auto"
                >
                  Escribir por WhatsApp
                </a>
                <a
                  href="mailto:leandrovenegas@live.com"
                  className="inline-flex justify-center items-center font-mono text-xs tracking-wide border border-border2 text-mid px-6 py-4 hover:border-mid hover:text-ink transition-colors w-full sm:w-auto"
                >
                  leandrovenegas@live.com
                </a>
              </div>

              <div className="mt-8">
                <p className="font-mono text-[10px] text-muted tracking-widest uppercase">
                  Valparaíso · Viña del Mar · Santiago · Todo Chile · Proyectos remotos y presenciales
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
