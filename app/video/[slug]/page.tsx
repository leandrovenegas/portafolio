import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import type { Metadata } from 'next';
import LandingClient from './LandingClient';
import { registerPageVisit } from './actions';

export const dynamic = 'force-dynamic';

// ─── Supabase client initialized with specific SocialProofREEL environment variables ───
const supabase = createClient(
  process.env.NEXT_PUBLIC_SPR_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SPR_SUPABASE_ANON_KEY!
);


// ─── Tipos ────────────────────────────────────────────────────────────────────

interface RawLead {
  id: string;
  slug: string;
  raw_data: { name: string };
}

interface VideoQueue {
  id: string;
  raw_lead_id: string;
  status: string;
  defectuoso: boolean;
  bunny_url: string;
  created_at: string;
}

// ─── generateMetadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug === 'demo' || slug === 'prueba') {
    return {
      title: 'Café del Puerto — Tu video de reseñas',
      description: 'Café del Puerto, tus clientes ya están hablando de ti. Mira el video creado con tus reseñas reales de Google.',
      openGraph: {
        title: "Tu video ya está listo 🎬",
        description: "Descárgalo y úsalo en tus redes cuando quieras.",
        images: ['/avatar-leandro.jpg'],
        type: 'website',
      },
      twitter: {
        card: 'summary',
        title: "Tu video ya está listo 🎬",
        description: "Descárgalo y úsalo en tus redes cuando quieras.",
        images: ['/avatar-leandro.jpg'],
      },
      robots: {
        index: false,
        follow: false,
      }
    };
  }

  const { data: lead } = await supabase

    .from('raw_leads')
    .select('raw_data')
    .eq('slug', slug)
    .maybeSingle();

  if (!lead) {
    return {
      title: 'Video no disponible',
      description: 'Este video no está disponible aún.',
    };
  }

  const title = `${lead.raw_data?.name} — Tu video de reseñas`;
  const description = `${lead.raw_data?.name}, tus clientes ya están hablando de ti. Mira el video creado con tus reseñas reales de Google.`;

  return {
    title,
    description,
    openGraph: {
      title: "Tu video ya está listo 🎬",
      description: "Descárgalo y úsalo en tus redes cuando quieras.",
      images: ['/avatar-leandro.jpg'],
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: "Tu video ya está listo 🎬",
      description: "Descárgalo y úsalo en tus redes cuando quieras.",
      images: ['/avatar-leandro.jpg'],
    },
    robots: {
      index: false, // Página privada por slug, no indexar
      follow: false,
    },
  };
}

// ─── Page Component (Server) ──────────────────────────────────────────────────

export default async function VideoLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // ──── MODO DEMO / PRUEBA ────────────────────────────────────────────────────
  if (slug === 'demo' || slug === 'prueba') {
    const demoLead = {
      id: '00000000-0000-0000-0000-000000000000',
      slug: slug,
      business_name: 'KMO Servicio Automotriz'
    };
    // Un video vertical real alojado en el CDN de SocialProofREEL
    const demoVideoUrl = 'https://socialproofreels.b-cdn.net/videos/393d4c9f26426c894d7f92588cd3d1a5/video_v1.mp4';
    
    return (
      <LandingClient
        lead={demoLead}
        video={{
          videoUrl: demoVideoUrl,
          localVideoPath: 'demo/kmo-servicio-automotriz.mp4'
        }}
      />
    );
  }

  // ──── MODO PRODUCCIÓN (Supabase) ────────────────────────────────────────────
  const bunnyUrl = process.env.NEXT_PUBLIC_BUNNY_CDN_URL ?? '';

  // 1. Buscar el lead por slug
  const { data: lead, error: leadError } = await supabase
    .from('raw_leads')
    .select('id, slug, raw_data')
    .eq('slug', slug)
    .maybeSingle<RawLead>();

  if (leadError || !lead) {
    return <VideoUnavailable />;
  }

  // 2. Buscar el video completado más reciente para este lead
  const { data: videoRow, error: videoError } = await supabase
    .from('video_queue')
    .select('id, raw_lead_id, status, defectuoso, bunny_url, created_at')
    .eq('raw_lead_id', lead.id)
    .eq('status', 'completed')
    .eq('defectuoso', false)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle<VideoQueue>();

  if (videoError || !videoRow) {
    return <VideoUnavailable businessName={lead.raw_data?.name} />;
  }

  // 3. Construir URL del video en Bunny CDN
  const videoUrl = videoRow.bunny_url;

  // 4. Registrar visita en outreach (solo si es la primera vez)
  try {
    await registerPageVisit(lead.id);
  } catch (e) {
    // Silently handle if table/RLS is missing or error
    console.error('Error registering page visit:', e);
  }

  return (
    <LandingClient
      lead={{
        id: lead.id,
        slug: lead.slug,
        business_name: lead.raw_data?.name,
      }}
      video={{
        videoUrl,
        localVideoPath: videoRow.bunny_url,
      }}
    />
  );
}

// ─── Componente de fallback ───────────────────────────────────────────────────

function VideoUnavailable({ businessName }: { businessName?: string }) {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
        color: 'var(--color-ink)',
        fontFamily: 'var(--font-body, system-ui)',
      }}
    >
      {businessName && (
        <p
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
            marginBottom: 24,
          }}
        >
          {businessName}
        </p>
      )}
      <h1
        style={{
          fontFamily: 'var(--font-display, sans-serif)',
          fontSize: 'clamp(36px, 8vw, 72px)',
          lineHeight: 0.95,
          color: 'var(--color-ink)',
          marginBottom: 16,
        }}
      >
        Video no disponible aún.
      </h1>
      <p style={{ color: 'var(--color-muted)', fontSize: 15, maxWidth: 360, lineHeight: 1.7 }}>
        Tu video personalizado está siendo producido. En breve lo recibirás directamente.
      </p>
    </main>
  );
}