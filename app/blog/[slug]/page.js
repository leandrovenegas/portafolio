import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getPostBySlug, getBlogPosts } from "@/lib/blog";
import { parseMarkdown } from "@/lib/markdown";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return {
    title: `${post.title} | Leandro Venegas`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: [
        {
          url: post.image || '/images/og-portafolio.jpg',
        }
      ],
    },
    alternates: {
      canonical: `https://www.leandrovenegas.cl/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const htmlContent = parseMarkdown(post.body);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image || 'https://www.leandrovenegas.cl/images/og-portafolio.jpg',
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": "Leandro Venegas",
      "url": "https://www.leandrovenegas.cl"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-4xl">
          <article className="mt-12 md:mt-24">
            <header className="mb-12 border-b border-border pb-12">
              <time className="font-mono text-sm text-accent mb-4 block">
                {new Date(post.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <h1 className="font-display text-display-md md:text-display-lg text-ink leading-[1.1] mb-6">
                {post.title}
              </h1>
              <p className="font-body text-xl text-mid leading-relaxed italic">
                {post.description}
              </p>
            </header>

            <div 
              className="prose prose-invert prose-lg max-w-none 
                prose-headings:font-display prose-headings:text-ink
                prose-p:font-body prose-p:text-mid prose-p:leading-relaxed
                prose-strong:text-ink prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                prose-li:text-mid"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            
            <footer className="mt-24 pt-12 border-t border-border">
              <div className="flex flex-col items-center text-center gap-6">
                <h3 className="font-display text-2xl text-ink">¿Te interesa implementar esto en tu negocio?</h3>
                <a 
                  href="https://wa.me/56988804299?text=Hola%20Leandro%2C%20le%C3%AD%20tu%20art%C3%ADculo%20sobre%20IA%20y%20video%2C%20me%20gustar%C3%ADa%20conversar"
                  className="bg-accent hover:bg-accent2 text-bg font-bold py-4 px-8 rounded-full transition-colors duration-200"
                >
                  Agendar conversación →
                </a>
              </div>
            </footer>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
