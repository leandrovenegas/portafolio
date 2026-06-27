import Link from "next/link";
import { DEFAULT_HOME_COMPONENTS } from "@/components/page-builder/defaultConfig";
import LivePreviewListener from "@/components/page-builder/LivePreviewListener";
import supabase from "@/lib/supabase";

export const metadata = {
  title: "Sistema de Video Marketing | Leandro Venegas",
  description: "Los 6 videos clave que forman el sistema de ventas con video: Primer Impacto, Stop-Scrolling, Autoridad, Validación Social, VSL y Retención.",
  alternates: {
    canonical: "https://www.leandrovenegas.cl/sistema",
  },
};

const VIDEOS = [
  {
    step: "01",
    slug: "primer-impacto",
    title: "Primer Impacto",
    description: "El Video de Primer Impacto no vende nada. Su único trabajo es aparecer, ser memorable y generar familiaridad antes de que empiece cualquier conversación comercial.",
  },
  {
    step: "02",
    slug: "stop-scrolling",
    title: "Stop-Scrolling",
    description: "No hay tiempo. Solo tienes 3 segundos para ser diferente del resto. El video Stop-Scrolling detiene el scroll y lleva a tu audiencia directo a la acción.",
  },
  {
    step: "03",
    slug: "autoridad",
    title: "Autoridad",
    description: "Tu experiencia y conocimiento son la clave. El video de autoridad los transforma en credibilidad visible para tu cliente ideal.",
  },
  {
    step: "04",
    slug: "validacion",
    title: "Validación Social",
    description: "El 92% de las personas confía más en lo que dice un desconocido que en lo que dice una marca. El video de validación convierte esa lógica en tu mejor herramienta de ventas.",
  },
  {
    step: "05",
    slug: "vsl",
    title: "VSL",
    description: "La VSL es el cierre. Todo lo demás es preparación. Una carta de ventas en video que lleva al prospecto desde el problema hasta la compra, sin que tú estés presente.",
  },
  {
    step: "06",
    slug: "post-venta",
    title: "Retención",
    description: "La venta no termina cuando el cliente paga. El Video Post-Venta confirma que tomaron la decisión correcta y los convierte en embajadores.",
  },
];

async function getHomeComponents() {
  try {
    const { data, error } = await supabase
      .from("page_versions")
      .select("components")
      .eq("slug", "home")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return DEFAULT_HOME_COMPONENTS;
    }
    return data.components;
  } catch (e) {
    return DEFAULT_HOME_COMPONENTS;
  }
}

export default async function SistemaPage() {
  const homeComponents = await getHomeComponents();
  const WA_LINK = "https://wa.me/56988804299?text=Hola%20Leandro%2C%20quiero%20hablar%20sobre%20el%20sistema";

  return (
    <main className="min-h-screen bg-bg relative overflow-hidden pb-32">
      {/* Contenido dinámico del home */}
      <LivePreviewListener initialComponents={homeComponents} />

      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/3 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative z-10 px-6 pt-12 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-20">
        <section className="flex flex-col gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            El Sistema Completo
          </p>
          <h1 className="font-display text-display-md md:text-display-lg text-ink leading-[0.9] max-w-3xl">
            Sistema de Video Marketing
          </h1>
          <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed">
            Cada video tiene un objetivo específico. En secuencia, construyen confianza, autoridad y cierran ventas automáticamente.
          </p>
        </section>

        {/* Lista de Videos en secuencia */}
        <section className="flex flex-col gap-0 border border-border divide-y divide-border">
          {VIDEOS.map((video) => (
            <div key={video.slug} className="group p-8 md:p-12 bg-bg hover:bg-s1 transition-colors flex flex-col md:flex-row gap-6 md:gap-12 items-start justify-between">
              <div className="flex flex-col gap-3 max-w-2xl">
                <span className="font-mono text-xs text-accent tracking-wider uppercase">
                  Paso {video.step}
                </span>
                <h2 className="font-display text-2xl md:text-3xl text-ink group-hover:text-accent transition-colors">
                  {video.title}
                </h2>
                <p className="font-body text-mid text-base leading-relaxed">
                  {video.description}
                </p>
              </div>
              <div className="pt-2 md:pt-6 shrink-0">
                <Link
                  href={`/videos/${video.slug}`}
                  className="inline-flex items-center justify-center font-mono text-xs tracking-wide border border-border2 text-mid px-6 py-4 hover:border-mid hover:text-ink transition-colors"
                >
                  Ver detalle →
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* CTA FINAL */}
        <section className="bg-s1 border border-border p-8 md:p-16 flex flex-col gap-8 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent opacity-[0.04] rounded-full blur-[80px]" />
          <h2 className="font-display text-display-sm md:text-display-md text-ink max-w-xl leading-[0.95]">
            ¿Listo para construir tu sistema de video?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-10 py-5 hover:bg-accent2 transition-colors w-full sm:w-auto"
            >
              Hablar con Leandro
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
