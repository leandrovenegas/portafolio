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

        {/* ─── BLOQUE 2 — Llamada después del video ─── */}
        <div
          style={{
            marginTop: '40px',
            padding: '24px 28px',
            backgroundColor: 'var(--color-s1)',
            border: '1px solid var(--color-border)',
            borderRadius: '16px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '15px',
              color: 'var(--color-muted)',
              marginBottom: '18px',
              lineHeight: '1.6',
            }}
          >
            ¿Te gustó? Hay una versión de{' '}
            <span style={{ color: 'var(--color-ink)', fontWeight: 500 }}>30 segundos</span>{' '}
            lista para publicar ahora mismo.
          </p>
          <a
            href="#gate-email"
            id="post-video-cta-link"
            onClick={() => trackEvent('post_video_cta_click', { business_name })}
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-bg)',
              fontFamily: bebasFont,
              fontSize: '18px',
              letterSpacing: '0.04em',
              padding: '12px 28px',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'opacity 0.15s ease',
            }}
            onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
          >
            Quiero el video de 30 seg →
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          BLOQUE 1 — PROBLEMA
          ═══════════════════════════════════════════════════════════════ */}
      <section
        id="problema"
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          padding: '0 24px 64px',
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
          El problema
        </p>
        <h2
          style={{
            fontFamily: bebasFont,
            fontSize: 'clamp(28px, 6vw, 44px)',
            textTransform: 'uppercase',
            color: 'var(--color-ink)',
            lineHeight: '1.05',
            marginBottom: '0',
          }}
        >
          Tus reseñas están enterradas en Google.{' '}
          <span style={{ color: 'var(--color-muted)' }}>Nadie las ve.</span>
        </h2>
      </section>

      {/* Divisor */}
      <div style={{ height: '1px', backgroundColor: 'var(--color-border)', maxWidth: '560px', margin: '0 auto' }} />

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
            src="https://vz-a158839f-ce6.b-cdn.net/fb5650f9-6e9b-419d-b14d-1c01f97222cd/playlist.m3u8"
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
          SECCIÓN 3 — GATE EMAIL
          ═══════════════════════════════════════════════════════════════ */}
      <section
        id="gate-email"
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--color-s1)',
            borderRadius: '20px',
            padding: '44px 32px',
            border: '1px solid var(--color-border)',
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
            Hay una versión más completa.
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--color-muted)',
              marginBottom: '32px',
              lineHeight: '1.6',
            }}
          >
            El doble de reseñas. El doble de duración.{' '}
            <span style={{ color: 'var(--color-ink)', fontWeight: 500 }}>Gratis en tu bandeja.</span>
          </p>

          {!emailSent ? (
            <form onSubmit={handleEmailSubmit}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  maxWidth: '400px',
                  margin: '0 auto',
                }}
              >
                <input
                  id="email-input"
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    backgroundColor: 'var(--color-s2)',
                    border: '1px solid var(--color-border2)',
                    borderRadius: '10px',
                    padding: '15px 18px',
                    color: 'var(--color-ink)',
                    fontSize: '15px',
                    outline: 'none',
                    textAlign: 'center',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border2)'; }}
                />
                <button
                  id="email-submit-btn"
                  type="submit"
                  disabled={emailLoading}
                  style={{
                    backgroundColor: 'var(--color-ink)',
                    color: 'var(--color-bg)',
                    fontFamily: bebasFont,
                    fontSize: '19px',
                    letterSpacing: '0.04em',
                    padding: '15px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'opacity 0.15s ease',
                    opacity: emailLoading ? 0.6 : 1,
                  }}
                >
                  {emailLoading ? 'Enviando...' : 'Quiero el video extendido →'}
                </button>
              </div>
              {emailError && (
                <p style={{ color: '#ff5555', fontSize: '13px', marginTop: '12px' }}>
                  {emailError}
                </p>
              )}
              <p
                style={{
                  fontSize: '11px',
                  color: 'var(--color-muted)',
                  marginTop: '16px',
                  fontFamily: monoFont,
                  letterSpacing: '0.08em',
                }}
              >
                Sin spam. Solo tu video.
              </p>
            </form>
          ) : (
            <div style={{ padding: '12px 0' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 204, 0, 0.08)',
                  color: 'var(--color-accent)',
                  fontSize: '22px',
                  marginBottom: '16px',
                }}
              >
                ✓
              </div>
              <h4
                style={{
                  fontFamily: bebasFont,
                  fontSize: '26px',
                  color: 'var(--color-accent)',
                  marginBottom: '8px',
                  letterSpacing: '0.03em',
                }}
              >
                ¡Listo!
              </h4>
              <p style={{ color: 'var(--color-muted)', fontSize: '14px', lineHeight: '1.6' }}>
                Te mandamos la versión extendida a{' '}
                <strong style={{ color: 'var(--color-ink)' }}>{email}</strong>.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Divisor */}
      <div style={{ height: '1px', backgroundColor: 'var(--color-border)', maxWidth: '560px', margin: '0 auto' }} />

      {/* ═══════════════════════════════════════════════════════════════
          BLOQUE 3 — OFERTA PAGA
          ═══════════════════════════════════════════════════════════════ */}
      <section
        id="oferta-paga"
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--color-s1)',
            borderRadius: '20px',
            padding: '44px 32px',
            border: '1px solid var(--color-border)',
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
            Versión premium
          </p>
          <h2
            style={{
              fontFamily: bebasFont,
              fontSize: 'clamp(28px, 5.5vw, 44px)',
              textTransform: 'uppercase',
              color: 'var(--color-ink)',
              lineHeight: '1.05',
              marginBottom: '14px',
            }}
          >
            Versión con tu logo,{' '}
            <span style={{ color: 'var(--color-accent)' }}>voz off</span>{' '}
            e imágenes
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--color-muted)',
              marginBottom: '10px',
              lineHeight: '1.6',
            }}
          >
            Un video 100% personalizado con tu identidad de marca, listo para publicar en cualquier red social.
          </p>
          <p
            style={{
              fontFamily: monoFont,
              fontSize: '13px',
              color: 'var(--color-accent)',
              marginBottom: '28px',
              letterSpacing: '0.05em',
            }}
          >
            $50.000 CLP / USD 70
          </p>
          <button
            id="oferta-paga-wsp-btn"
            onClick={() =>
              handleWspClick(
                'personalized',
                `Hola Leandro, vi el video de ${business_name} y quiero la versión con logo, voz en off e imágenes.`
              )
            }
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-bg)',
              fontFamily: bebasFont,
              fontSize: '19px',
              letterSpacing: '0.04em',
              padding: '15px 32px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'opacity 0.15s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Quiero esta versión →
          </button>
        </div>
      </section>

      {/* Divisor */}
      <div style={{ height: '1px', backgroundColor: 'var(--color-border)', maxWidth: '560px', margin: '0 auto' }} />

      {/* ═══════════════════════════════════════════════════════════════
          SECCIÓN 4 — CTA WHATSAPP
          ═══════════════════════════════════════════════════════════════ */}
      <section
        id="cta-whatsapp"
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
            fontSize: 'clamp(30px, 5.5vw, 50px)',
            textTransform: 'uppercase',
            color: 'var(--color-ink)',
            lineHeight: '1.0',
            marginBottom: '16px',
          }}
        >
          ¿Quieres una versión con tu logo,{' '}
          <span style={{ color: 'var(--color-accent)' }}>voz en off</span>{' '}
          e imágenes de tu producto?
        </h2>
        <p
          style={{
            fontSize: '16px',
            color: 'var(--color-muted)',
            marginBottom: '36px',
          }}
        >
          Lo producimos a medida.
        </p>
        <div
          style={{
            fontSize: '12px',
            fontFamily: monoFont,
            color: 'var(--color-accent)',
            textAlign: 'center',
            marginBottom: '36px',
            marginTop: '-20px',
          }}
        >
          Desde $50.000 CLP / USD 70
        </div>

        <button
          id="personalized-cta-btn"
          onClick={() =>
            handleWspClick(
              'personalized',
              `Hola Leandro, vi el video de ${business_name} y quiero una versión personalizada.`
            )
          }
          style={{
            backgroundColor: 'transparent',
            color: 'var(--color-accent)',
            border: '2px solid var(--color-accent)',
            fontFamily: bebasFont,
            fontSize: '20px',
            letterSpacing: '0.04em',
            padding: '16px 36px',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
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
          {/* WhatsApp icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Hablar con Leandro →
        </button>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          BLOQUE 4 — CTA FINAL EN GRID
          ═══════════════════════════════════════════════════════════════ */}
      <section
        id="cta-final"
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
            fontSize: '10px',
            color: 'var(--color-muted)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          ¿Por dónde seguimos?
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          {/* Opción 1 */}
          <button
            id="cta-solo-video-btn"
            onClick={() => trackEvent('cta_grid_click', { option: 'solo_video', business_name })}
            style={{
              backgroundColor: 'var(--color-s1)',
              border: '1px solid var(--color-border)',
              borderRadius: '14px',
              padding: '20px 16px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'border-color 0.2s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--color-border2)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          >
            <p style={{ fontFamily: bebasFont, fontSize: '18px', color: 'var(--color-ink)', marginBottom: '6px', letterSpacing: '0.03em' }}>Solo video gratis</p>
            <p style={{ fontFamily: monoFont, fontSize: '10px', color: 'var(--color-muted)', lineHeight: '1.5' }}>Ya lo descargué, gracias</p>
          </button>

          {/* Opción 2 */}
          <button
            id="cta-video-30s-btn"
            onClick={() => handleWspClick('personalized', `Hola Leandro, vi el video de ${business_name} y quiero el video de 30 segundos para publicar.`)}
            style={{
              backgroundColor: 'var(--color-s1)',
              border: '1px solid var(--color-border)',
              borderRadius: '14px',
              padding: '20px 16px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'border-color 0.2s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          >
            <p style={{ fontFamily: bebasFont, fontSize: '18px', color: 'var(--color-accent)', marginBottom: '6px', letterSpacing: '0.03em' }}>Video 30 seg</p>
            <p style={{ fontFamily: monoFont, fontSize: '10px', color: 'var(--color-muted)', lineHeight: '1.5' }}>Listo para publicar</p>
          </button>

          {/* Opción 3 */}
          <button
            id="cta-personalizado-btn"
            onClick={() => handleWspClick('personalized', `Hola Leandro, vi el video de ${business_name} y quiero una versión personalizada con logo y voz en off.`)}
            style={{
              backgroundColor: 'var(--color-s1)',
              border: '1px solid var(--color-border)',
              borderRadius: '14px',
              padding: '20px 16px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'border-color 0.2s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          >
            <p style={{ fontFamily: bebasFont, fontSize: '18px', color: 'var(--color-accent)', marginBottom: '6px', letterSpacing: '0.03em' }}>Video personalizado</p>
            <p style={{ fontFamily: monoFont, fontSize: '10px', color: 'var(--color-muted)', lineHeight: '1.5' }}>Logo + voz off + imágenes</p>
          </button>

          {/* Opción 4 */}
          <button
            id="cta-sistema-btn"
            onClick={() => handleWspClick('system', `Hola Leandro, vi el video de ${business_name} y quiero conocer el sistema completo de videos.`)}
            style={{
              backgroundColor: 'var(--color-s1)',
              border: '1px solid var(--color-border)',
              borderRadius: '14px',
              padding: '20px 16px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'border-color 0.2s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          >
            <p style={{ fontFamily: bebasFont, fontSize: '18px', color: 'var(--color-accent)', marginBottom: '6px', letterSpacing: '0.03em' }}>Sistema completo</p>
            <p style={{ fontFamily: monoFont, fontSize: '10px', color: 'var(--color-muted)', lineHeight: '1.5' }}>Stop-scrolling + Autoridad + Validación + VSL</p>
          </button>
        </div>
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