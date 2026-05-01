import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getBlogPosts } from "@/lib/blog";
import HeroVideo from "@/components/HeroVideo";

export const metadata = {
  title: 'Blog — Estrategia de Video e Inteligencia Artificial | Leandro Venegas',
  description: 'Artículos sobre producción audiovisual, IA aplicada al video y estrategias de contenido para pymes y marcas en Chile.',
  alternates: {
    canonical: 'https://www.leandrovenegas.cl/blog',
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        {/* HERO DINÁMICO DEL BLOG */}
        <HeroVideo
          mobileAV1={`https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME || 'vz-a158839f-ce6.b-cdn.net'}/a6075da8-cbd7-4220-b2f9-e3aa3ebc6997/original`}
          mobileVP9={`https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME || 'vz-a158839f-ce6.b-cdn.net'}/96e06cc2-82ec-431f-8898-eeb0f8a47f9d/original`}
          mobileH264={`https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME || 'vz-a158839f-ce6.b-cdn.net'}/0445fa0f-4e22-4cae-b55c-add19fdcb85b/play_720p.mp4`}
          desktopAV1=""
          desktopVP9=""
          desktopH264=""
          posterSrc="/images/og-portafolio.jpg"
        >
          <p className="font-mono text-accent text-sm md:text-base tracking-wide uppercase mb-4">
            Estrategia y Contenido
          </p>
          <h1 className="font-display text-display-md md:text-display-lg text-ink leading-[0.9] max-w-5xl mb-8">
            Blog
          </h1>
          <p className="font-body text-mid text-xl md:text-2xl max-w-2xl leading-relaxed">
            Ideas sobre cómo la tecnología y la creatividad se unen para hacer crecer negocios.
          </p>
        </HeroVideo>

        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-16 md:gap-24">

          <section className="grid grid-cols-1 gap-12">
            {posts.map((post) => (
              <article key={post.slug} className="group flex flex-col gap-6 border-b border-border pb-12 last:border-0">
                <div className="flex flex-col gap-3">
                  <time className="font-mono text-xs text-muted">
                    {new Date(post.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="font-display text-3xl md:text-4xl text-ink group-hover:text-accent transition-colors duration-200 leading-tight">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="font-body text-mid text-lg leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="font-mono text-xs text-accent uppercase tracking-widest hover:text-accent2 transition-colors"
                >
                  Leer artículo completo →
                </Link>
              </article>
            ))}
            
            {posts.length === 0 && (
              <p className="font-body text-muted text-center py-12 italic">
                Próximamente nuevos artículos...
              </p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
