'use client';

import { useState, useEffect } from 'react';
import { submitEmailLead, logCtaClick } from './actions';
import VideoPlayer from '@/components/VideoPlayer';

interface Lead {
  id: string;
  business_name: string;
  slug: string;
}

interface VideoData {
  videoUrl: string;
  localVideoPath: string;
}

interface LandingClientProps {
  lead: Lead;
  video: VideoData;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// ─── Helper: dispara eventos GA4 ─────────────────────────────────────────────

function gtag(...args: any[]) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
}

function trackEvent(name: string, params?: Record<string, any>) {
  gtag('event', name, params ?? {});
}

export default function LandingClient({ lead, video }: LandingClientProps) {
  const { business_name, id: leadId, slug } = lead;
  const businessName = business_name;
  const { videoUrl } = video;

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '56988804299';
  const leandroVideoUrl = process.env.NEXT_PUBLIC_LEANDRO_VIDEO_URL ?? '';

  // Estado del formulario de email
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Estado del video de reel
  const [showReel, setShowReel] = useState(false);

  // ─── GA4 Page View al montar ──────────────────────────────────────────────
  useEffect(() => {
    gtag('event', 'video_landing_view', { slug, business_name: businessName });
  }, [slug, businessName]);

  // ─── Descarga del video ───────────────────────────────────────────────────

  const handleDownload = () => {
    gtag('event', 'video_download_click', { slug, business_name: businessName });
    const downloadUrl = `/api/download?url=${encodeURIComponent(videoUrl)}&filename=${encodeURIComponent(`${slug}-resenas.mp4`)}`;
    window.location.href = downloadUrl;
  };

  // ─── Envío de email ───────────────────────────────────────────────────────

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setEmailError('Por favor ingresa un correo válido.');
      return;
    }
    setEmailLoading(true);
    setEmailError('');
    try {
      const res = await submitEmailLead(leadId, email.trim(), business_name);
      if (res.success) {
        setEmailSent(true);
        trackEvent('email_submitted', { business_name, email });
      } else {
        setEmailError('Ocurrió un error. Inténtalo de nuevo.');
      }
    } catch {
      setEmailError('Ocurrió un error. Inténtalo de nuevo.');
    } finally {
      setEmailLoading(false);
    }
  };

  // ─── CTA WhatsApp ─────────────────────────────────────────────────────────

  const handleWspClick = async (section: 'personalized' | 'system' | 'cierre', message: string) => {
    gtag('event', 'whatsapp_click', { slug, business_name: businessName });
    try {
      await logCtaClick(leadId, section);
    } catch (err) {
      console.error('Error logging CTA click:', err);
    }
    const wspUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(wspUrl, '_blank');
  };

  // ─── Estilos compartidos ──────────────────────────────────────────────────

  const bebasFont = 'var(--font-display, var(--font-bebas, "Arial Narrow", sans-serif))';
  const monoFont = '"DM Mono", "Courier New", monospace';

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-ink)',
        fontFamily: 'var(--font-body)',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      {/* ─── Cabecera mínima ─── */}
      <header
        style={{
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          maxWidth: '960px',
          margin: '0 auto',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontFamily: monoFont,
            color: 'var(--color-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}
        >
          {business_name}
        </span>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          SECCIÓN 1 — HERO
          ═══════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          padding: '64px 24px 80px',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: monoFont,
            fontSize: '11px',
            color: 'var(--color-accent)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          Tu video de reseñas
        </p>

        {/* Título principal */}
        <h1
          style={{
            fontFamily: bebasFont,
            fontSize: 'clamp(42px, 9vw, 80px)',
            lineHeight: '0.92',
            textTransform: 'uppercase',
            color: 'var(--color-ink)',
            marginBottom: '20px',
          }}
        >
          {business_name},{' '}
          <span style={{ color: 'var(--color-accent)' }}>
            tus clientes ya están hablando de ti.
          </span>
        </h1>

        {/* Subtítulo */}
        <p
          style={{
            fontSize: '17px',
            color: 'var(--color-muted)',
            marginBottom: '40px',
            fontWeight: 300,
            letterSpacing: '0.01em',
          }}
        >
          Esto es lo que dicen.
        </p>

        {/* Reproductor 9:16 */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '400px',
            aspectRatio: '9/16',
            margin: '0 auto 36px auto',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 32px 64px -12px rgba(255, 204, 0, 0.12), 0 0 0 1px var(--color-border)',
            backgroundColor: '#000',
          }}
        >
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            controls
            crossOrigin="anonymous"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Botón de descarga */}
        <button
          id="download-btn"
          onClick={handleDownload}
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-bg)',
            fontFamily: bebasFont,
            fontSize: '20px',
            letterSpacing: '0.05em',
            padding: '16px 36px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 4px 24px rgba(255, 204, 0, 0.28)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 204, 0, 0.38)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(255, 204, 0, 0.28)';
          }}
        >
          ⬇ Descargar mi video gratis
        </button>

        {/* Nota */}
        <p
          style={{
            fontSize: '12px',
            color: 'var(--color-muted)',
            marginTop: '16px',
            fontFamily: monoFont,
            letterSpacing: '0.05em',
          }}
        >
          Creado con tus reseñas reales de Google.
        </p>

      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECCIÓN 2 — VIDEO DE LEANDRO
          ═══════════════════════════════════════════════════════════════ */}
      <section
        id="leandro"
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: bebasFont,
            fontSize: 'clamp(32px, 6vw, 52px)',
            textTransform: 'uppercase',
            color: 'var(--color-ink)',
            marginBottom: '32px',
            lineHeight: '1',
          }}
        >
          Por qué hice este video<br />para tu negocio
        </h2>

        {/* Reproductor de Leandro o placeholder elegante */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '400px',
            aspectRatio: '9/16',
            margin: '0 auto',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-s1)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
          }}
        >
          <VideoPlayer
            src="https://vz-a158839f-ce6.b-cdn.net/7a20d187-b7d9-41b5-8929-fe2c4270a12b/playlist.m3u8"
            title="Por qué hice este video para tu negocio"
            muted={true}
            autoplay={false}
            hideLink={true}
            unstyled={true}
            className=""
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      </section>

      {/* Divisor */}
      <div style={{ height: '1px', backgroundColor: 'var(--color-border)', maxWidth: '560px', margin: '0 auto' }} />

      {/* ═══════════════════════════════════════════════════════════════
          BLOQUE 1 — Oportunidad
          ═══════════════════════════════════════════════════════════════ */}
      <section
        id="oportunidad"
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          padding: '64px 24px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: monoFont,
            fontSize: '11px',
            color: 'var(--color-accent)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}
        >
          El siguiente paso
        </p>
        <h2
          style={{
            fontFamily: bebasFont,
            fontSize: 'clamp(28px, 6vw, 44px)',
            textTransform: 'uppercase',
            color: 'var(--color-ink)',
            lineHeight: '1.05',
            marginBottom: '24px',
          }}
        >
          El siguiente paso: crear una versión comercial para multiplicar la confianza en tu marca.
        </h2>
        <p
          style={{
            fontSize: '16px',
            color: 'var(--color-muted)',
            lineHeight: '1.6',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          92% de los consumidores confía más en el contenido generado por otros usuarios que en la publicidad tradicional. No es solo un video, es tu activo de ventas más predecible.
        </p>
        <small
          style={{
            fontSize: '12px',
            color: 'var(--color-muted)',
            display: 'block',
            textAlign: 'center',
            opacity: 0.8,
          }}
        >
          Fuente: Informe Global Trust in Advertising, Nielsen.
        </small>
      </section>

      {/* Divisor */}
      <div style={{ height: '1px', backgroundColor: 'var(--color-border)', maxWidth: '560px', margin: '0 auto' }} />
      {/* ═══════════════════════════════════════════════════════════════
          SECCIÓN 4 — CTA WHATSAPP
          ═══════════════════════════════════════════════════════════════ */}
      <section
        id='cta-whatsapp'
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: monoFont,
            fontSize: '10px',
            color: 'var(--color-muted)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          Versiones listas para publicar
        </p>
        <h2
          style={{
            fontFamily: bebasFont,
            fontSize: 'clamp(30px, 5.5vw, 50px)',
            textTransform: 'uppercase',
            color: 'var(--color-ink)',
            lineHeight: '1.0',
            marginBottom: '16px',
          }}
        >
          Elige el formato para{' '}
          <span style={{ color: 'var(--color-accent)' }}>tu negocio</span>
        </h2>
        <p
          style={{
            fontSize: '16px',
            color: 'var(--color-muted)',
            margin: '0 auto 36px',
            maxWidth: '520px',
            lineHeight: '1.6',
          }}
        >
          Videos hechos con tus reseñas reales, pensados para vender confianza rápido en redes sociales.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '14px',
            alignItems: 'stretch',
            marginBottom: '34px',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--color-s1)',
              border: '1px solid var(--color-border)',
              borderRadius: '14px',
              padding: '24px 18px',
              textAlign: 'left',
            }}
          >
            <p style={{ fontFamily: monoFont, fontSize: '10px', color: 'var(--color-muted)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Combo x2
            </p>
            <h3 style={{ fontFamily: bebasFont, fontSize: '34px', color: 'var(--color-ink)', lineHeight: '1', marginBottom: '14px', letterSpacing: '0.03em' }}>
              $60.000 CLP
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {[
                '2 videos de 30s, 5 reseñas cada uno (10 total)',
                'Voz en off generada con IA (profesional, tipo comercial)',
                'Incluye video o imágenes del negocio (proporcionadas por el cliente)',
                'Brand logo + paleta de color integrada e información de contacto',
                'Formato listo para Instagram, TikTok y Estados de WhatsApp'
              ].map((item, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  color: 'var(--color-muted)',
                  fontSize: '14px',
                  lineHeight: '1.55'
                }}>
                  <span style={{ color: '#facc15', flexShrink: 0 }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() =>
                handleWspClick(
                  'personalized',
                  `Hola Leandro, vi el video de ${business_name} y quiero el Combo x2 ($60.000, 10 reseñas en 2 videos + voz off).`
                )
              }
              style={{
                backgroundColor: 'transparent',
                color: 'var(--color-accent)',
                border: '2px solid var(--color-accent)',
                fontFamily: bebasFont,
                fontSize: '16px',
                letterSpacing: '0.04em',
                padding: '10px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                marginTop: '20px',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                e.currentTarget.style.color = 'var(--color-bg)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-accent)';
              }}
            >
              <svg width={16} height={16} viewBox='0 0 24 24' fill='currentColor'>
                <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'/>
              </svg>
              Hablar con Leandro
            </button>
          </div>

          <div
            style={{
              position: 'relative',
              backgroundColor: 'var(--color-s1)',
              border: '2px solid var(--color-accent)',
              borderRadius: '14px',
              padding: '28px 18px 24px',
              textAlign: 'left',
              boxShadow: '0 16px 38px rgba(255, 204, 0, 0.16)',
              transform: 'translateY(-6px)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-13px',
                left: '18px',
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-bg)',
                borderRadius: '999px',
                padding: '5px 10px',
                fontFamily: monoFont,
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Más popular
            </div>
            <p style={{ fontFamily: monoFont, fontSize: '10px', color: 'var(--color-accent)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Comercial
            </p>
            <h3 style={{ fontFamily: bebasFont, fontSize: '38px', color: 'var(--color-accent)', lineHeight: '1', marginBottom: '14px', letterSpacing: '0.03em' }}>
              $30.000 CLP
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {[
                '5 reseñas, 30 segundos',
                'Brand logo integrado e información de contacto',
                'Incluye imágenes propias del negocio',
                'Formato listo para Instagram, TikTok y Estados de WhatsApp'
              ].map((item, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  color: 'var(--color-ink)',
                  fontSize: '14px',
                  lineHeight: '1.55'
                }}>
                  <span style={{ color: '#facc15', flexShrink: 0 }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() =>
                handleWspClick(
                  'personalized',
                  `Hola Leandro, vi el video de ${business_name} y quiero el plan Comercial ($30.000, 5 reseñas 30s).`
                )
              }
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-bg)',
                border: '2px solid var(--color-accent)',
                fontFamily: bebasFont,
                fontSize: '16px',
                letterSpacing: '0.04em',
                padding: '10px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                marginTop: '20px',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-accent)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                e.currentTarget.style.color = 'var(--color-bg)';
              }}
            >
              <svg width={16} height={16} viewBox='0 0 24 24' fill='currentColor'>
                <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'/>
              </svg>
              Hablar con Leandro
            </button>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-s1)',
              border: '1px solid var(--color-border)',
              borderRadius: '14px',
              padding: '24px 18px',
              textAlign: 'left',
            }}
          >
            <p style={{ fontFamily: monoFont, fontSize: '10px', color: 'var(--color-muted)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Inicial
            </p>
            <h3 style={{ fontFamily: bebasFont, fontSize: '34px', color: 'var(--color-ink)', lineHeight: '1', marginBottom: '14px', letterSpacing: '0.03em' }}>
              $20.000 CLP
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {[
                '4 reseñas, 20 segundos',
                'Tu logo integrado e información de contacto',
                'Formato listo para Instagram, TikTok y Estados de WhatsApp'
              ].map((item, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  color: 'var(--color-muted)',
                  fontSize: '14px',
                  lineHeight: '1.55'
                }}>
                  <span style={{ color: '#facc15', flexShrink: 0 }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() =>
                handleWspClick(
                  'personalized',
                  `Hola Leandro, vi el video de ${business_name} y quiero el plan Inicial ($20.000, 4 reseñas 20s).`
                )
              }
              style={{
                backgroundColor: 'transparent',
                color: 'var(--color-accent)',
                border: '2px solid var(--color-accent)',
                fontFamily: bebasFont,
                fontSize: '16px',
                letterSpacing: '0.04em',
                padding: '10px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                marginTop: '20px',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                e.currentTarget.style.color = 'var(--color-bg)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-accent)';
              }}
            >
              <svg width={16} height={16} viewBox='0 0 24 24' fill='currentColor'>
                <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'/>
              </svg>
              Hablar con Leandro
            </button>
          </div>
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECCIÓN 4.5 — Oportunidad
          ═══════════════════════════════════════════════════════════════ */}
      <section
        id="oportunidad-extra"
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          padding: '64px 24px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: bebasFont,
            fontSize: 'clamp(32px, 6vw, 52px)',
            textTransform: 'uppercase',
            color: 'var(--color-ink)',
            marginBottom: '12px',
            lineHeight: '1',
          }}
        >
          Espera, un momento.
        </h2>
        
        <h3
          style={{
            fontFamily: bebasFont,
            fontSize: 'clamp(24px, 5vw, 36px)',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '32px',
            lineHeight: '1',
          }}
        >
          Tengo una idea para ti.
        </h3>

        <p
          style={{
            fontSize: '16px',
            color: 'var(--color-muted)',
            lineHeight: '1.6',
            marginBottom: '16px',
            textAlign: 'left',
          }}
        >
          Si tus mejores videos siguen guardados en tu celular porque no tienes tiempo para editar, soy la persona que necesitas. Además, ya nos conocemos un poco, ya te hice un video.
        </p>

        <p
          style={{
            fontSize: '16px',
            color: 'var(--color-muted)',
            lineHeight: '1.6',
            marginBottom: '16px',
            textAlign: 'left',
          }}
        >
          No pierdas tiempo grabando desde cero, pongamos esos videos a trabajar en tu estrategia de contenidos. En 48 horas estarán listos.
        </p>

        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-muted)',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          Este es el nivel de impacto que le daremos a tu material:
        </p>

        <button
          onClick={() => setShowReel(!showReel)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--color-muted)',
            fontFamily: monoFont,
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            padding: '8px 16px',
            marginBottom: '24px',
            textDecoration: 'underline',
            transition: 'color 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = 'var(--color-accent)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = 'var(--color-muted)';
          }}
        >
          {showReel ? 'Ocultar Reel' : '🎬 Ver Reel de Ejemplo'}
        </button>

        {showReel && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '320px',
              aspectRatio: '9/16',
              margin: '0 auto 32px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-s1)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
            }}
          >
            <VideoPlayer
              src="https://vz-a158839f-ce6.b-cdn.net/ed51b3e8-90a5-484d-bed1-8c8070d6eca8/playlist.m3u8"
              title="Video de impacto"
              muted={true}
              autoplay={false}
              hideLink={true}
              unstyled={true}
              className=""
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        )}

        <p
          style={{
            fontSize: '16px',
            color: 'var(--color-ink)',
            fontWeight: 500,
            lineHeight: '1.6',
            marginBottom: '36px',
            textAlign: 'left',
          }}
        >
          Envíame por WhatsApp tu mejor video sin editar y te digo exactamente cómo lo convertimos en ventas.
        </p>

        <button
          onClick={() => handleWspClick('cierre', 'Hola Leandro, tengo videos grabados que no estoy usando. Quiero que los revises y me digas cómo transformarlos en contenido que atraiga ventas.')}
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-bg)',
            fontFamily: bebasFont,
            fontSize: '20px',
            letterSpacing: '0.05em',
            padding: '16px 36px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            gap: '10px',
            boxShadow: '0 4px 24px rgba(255, 204, 0, 0.28)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 204, 0, 0.38)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(255, 204, 0, 0.28)';
          }}
        >
          📲 Enviar video para revisión
        </button>
      </section>

      {/* Divisor */}
      <div style={{ height: '1px', backgroundColor: 'var(--color-border)', maxWidth: '560px', margin: '0 auto' }} />

      {/* ═══════════════════════════════════════════════════════════════
          SECCIÓN 5 — REFERENCIA AL SISTEMA (mínima)
          ═══════════════════════════════════════════════════════════════ */}
      <section
        id="sistema"
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          padding: '40px 24px 80px',
          textAlign: 'center',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-muted)',
            lineHeight: '1.6',
          }}
        >
          ¿Necesitas más de un video para tu proyecto?{' '}
          <a
            href="https://leandrovenegas.cl"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--color-accent)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(255, 204, 0, 0.3)',
              transition: 'border-color 0.2s ease',
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'var(--color-accent)';
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(255, 204, 0, 0.3)';
            }}
          >
            Conoce el sistema →
          </a>
        </p>
      </section>
    </div>
  );
}
