'use client';

import { useState, useEffect } from 'react';
import { submitEmailLead, logCtaClick } from './actions';

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

// ─── Helper: dispara eventos GA4 ─────────────────────────────────────────────

function trackEvent(name: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, params ?? {});
  }
}

export default function LandingClient({ lead, video }: LandingClientProps) {
  const { business_name, id: leadId, slug } = lead;
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
    trackEvent('page_view_custom', { business_name });
  }, [business_name]);

  // ─── Controladores de eventos e interacciones ────────────────────────────────

  const handleDownload = () => {
    trackEvent('video_download', { business_name });
    // Crea un link temporal para forzar la descarga del video
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = `${slug}-resenas.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setEmailError('Por favor ingresa un correo válido.');
      return;
    }

    setEmailLoading(true);
    setEmailError('');

    try {
      const res = await submitEmailLead(leadId, email.trim());
      if (res.success) {
        setEmailSent(true);
        trackEvent('email_submitted', { business_name, email });
      } else {
        setEmailError('Ocurrió un error. Inténtalo de nuevo.');
      }
    } catch (err) {
      setEmailError('Ocurrió un error. Inténtalo de nuevo.');
    } finally {
      setEmailLoading(false);
    }
  };

  const handleWspClick = async (section: 'personalized' | 'system' | 'cierre', message: string) => {
    trackEvent('whatsapp_click', {
      business_name,
      section: section === 'personalized' ? 'oferta_individual' : section === 'system' ? 'sistema' : 'cierre'
    });

    try {
      await logCtaClick(leadId, section);
    } catch (err) {
      console.error('Error logging CTA click:', err);
    }

    // Redirige al chat de WhatsApp
    const encodedMsg = encodeURIComponent(message);
    const wspUrl = `https://wa.me/${waNumber}?text=${encodedMsg}`;
    window.open(wspUrl, '_blank');
  };
console.log('videoUrl:', videoUrl)
  return (
    <div
      style={{
        backgroundColor: '#090909',
        color: '#eeebe3',
        fontFamily: 'Inter, system-ui, sans-serif',
        minHeight: '100vh',
        overflowX: 'hidden',
        paddingBottom: '80px',
      }}
    >
      {/* ─── Cabecera minimalista ─── */}
      <header
        style={{
          borderBottom: '1px solid #1a1a1a',
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-bebas, "Arial Narrow", sans-serif)',
            fontSize: '24px',
            letterSpacing: '0.05em',
            color: '#c8f135',
          }}
        >
          SOCIALPROOF<span style={{ color: '#eeebe3' }}>REEL</span>
        </span>
        <span
          style={{
            fontSize: '11px',
            fontFamily: 'monospace',
            color: '#666',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Personalizado para: {business_name}
        </span>
      </header>

      {/* Contenedor Principal */}
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        
        {/* ─── SECCIÓN 1: HERO ─── */}
        <section
          id="hero"
          style={{
            textAlign: 'center',
            marginBottom: '80px',
          }}
        >
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '12px',
              color: '#c8f135',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Video de Reseñas Realizado
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-bebas, "Arial Narrow", sans-serif)',
              fontSize: 'clamp(40px, 8vw, 80px)',
              lineHeight: '0.9',
              textTransform: 'uppercase',
              marginBottom: '16px',
              color: '#eeebe3',
            }}
          >
            {business_name}, <br />
            <span style={{ color: '#c8f135' }}>tus clientes ya están</span> <br />
            hablando de ti.
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: '#a3a3a3',
              marginBottom: '40px',
              fontWeight: 300,
            }}
          >
            Esto es lo que dicen.
          </p>

          {/* Reproductor Bunny CDN */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '340px',
              aspectRatio: '9/16',
              margin: '0 auto 40px auto',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(200, 241, 53, 0.15)',
              border: '1px solid #2a2a2a',
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
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Botón Descarga */}
          <button
            id="download-btn"
            onClick={handleDownload}
            style={{
              backgroundColor: '#c8f135',
              color: '#090909',
              fontFamily: 'var(--font-bebas, "Arial Narrow", sans-serif)',
              fontSize: '20px',
              padding: '16px 32px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 4px 20px rgba(200, 241, 53, 0.3)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(200, 241, 53, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(200, 241, 53, 0.3)';
            }}
          >
            Descargar video (MP4)
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
          
          <p style={{ fontSize: '12px', color: '#666', marginTop: '16px' }}>
            Este video fue creado con tus reseñas reales de Google.
          </p>
        </section>

        {/* Separador */}
        <hr style={{ borderColor: '#1f1f1f', margin: '80px 0' }} />

        {/* ─── SECCIÓN 2: VIDEO DE LEANDRO ─── */}
        <section id="leandro-pitch" style={{ marginBottom: '80px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-bebas, "Arial Narrow", sans-serif)',
              fontSize: '36px',
              marginBottom: '24px',
              textAlign: 'center',
              textTransform: 'uppercase',
              color: '#eeebe3',
            }}
          >
            ¿Por qué creé este video para ti?
          </h2>

          <div
            style={{
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid #1a1a1a',
              backgroundColor: '#000',
              marginBottom: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}
          >
            {leandroVideoUrl ? (
              <iframe
                src={leandroVideoUrl}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666', fontSize: '14px', fontFamily: 'monospace' }}>
                [Video Explicativo de Leandro]
              </div>
            )}
          </div>

          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.7',
              color: '#a3a3a3',
              textAlign: 'center',
              maxWidth: '650px',
              margin: '0 auto',
              fontStyle: 'italic',
            }}
          >
            "Después de 10 años haciendo videos para marcas y agencias, descubrí un patrón. Los negocios que más venden tienen un sistema de 4 videos que llevan al cliente desde el scroll hasta la compra. El video que tienes es la tercera pieza de ese sistema."
          </p>
        </section>

        {/* ─── SECCIÓN 3: GATE EMAIL ─── */}
        <section
          id="gate-email"
          style={{
            backgroundColor: '#101010',
            borderRadius: '24px',
            padding: '40px 32px',
            border: '1px solid #1f1f1f',
            marginBottom: '80px',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-bebas, "Arial Narrow", sans-serif)',
              fontSize: '32px',
              color: '#eeebe3',
              marginBottom: '8px',
              textTransform: 'uppercase',
            }}
          >
            Hay una versión más completa.
          </h3>
          <p style={{ color: '#a3a3a3', fontSize: 15, marginBottom: '24px' }}>
            El doble de reseñas. El doble de duración. En menos de 24 horas en tu bandeja de entrada de forma gratuita.
          </p>

          {!emailSent ? (
            <form onSubmit={handleEmailSubmit} style={{ maxWidth: '480px', margin: '0 auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  id="email-input"
                  type="email"
                  placeholder="Tu correo electrónico profesional"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    backgroundColor: '#1c1c1c',
                    border: '1px solid #2a2a2a',
                    borderRadius: '10px',
                    padding: '16px',
                    color: '#eeebe3',
                    fontSize: '15px',
                    outline: 'none',
                    textAlign: 'center',
                  }}
                  required
                />
                <button
                  id="email-submit-btn"
                  type="submit"
                  disabled={emailLoading}
                  style={{
                    backgroundColor: '#eeebe3',
                    color: '#090909',
                    fontFamily: 'var(--font-bebas, "Arial Narrow", sans-serif)',
                    fontSize: '18px',
                    padding: '16px',
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    letterSpacing: '0.05em',
                  }}
                >
                  {emailLoading ? 'Enviando...' : 'Quiero el video completo gratis'}
                </button>
              </div>
              {emailError && (
                <p style={{ color: '#ff5555', fontSize: '13px', marginTop: '12px' }}>{emailError}</p>
              )}
            </form>
          ) : (
            <div style={{ padding: '20px 0' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(200, 241, 53, 0.1)',
                  color: '#c8f135',
                  marginBottom: '16px',
                }}
              >
                ✓
              </div>
              <h4 style={{ color: '#c8f135', fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                ¡Solicitud Recibida!
              </h4>
              <p style={{ color: '#a3a3a3', fontSize: '14px' }}>
                Estoy preparando la versión extendida de tu video. Te llegará a la brevedad a <strong>{email}</strong>.
              </p>
            </div>
          )}
        </section>

        {/* ─── SECCIÓN 4: OFERTA INTERMEDIA ─── */}
        <section
          id="oferta-personalizada"
          style={{
            marginBottom: '80px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-bebas, "Arial Narrow", sans-serif)',
              fontSize: '36px',
              marginBottom: '16px',
              textTransform: 'uppercase',
            }}
          >
            ¿Quieres un video 100% único?
          </h2>
          <p
            style={{
              color: '#a3a3a3',
              fontSize: '16px',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto 32px auto',
            }}
          >
            Creamos un video premium totalmente personalizado para tu marca. Incluye tu logotipo oficial, voz en off grabada por locutores profesionales, imágenes de tus productos/locales y música a tu medida.
          </p>

          <button
            id="personalized-cta-btn"
            onClick={() =>
              handleWspClick(
                'personalized',
                `Hola Leandro, quiero el video personalizado para ${business_name}`
              )
            }
            style={{
              backgroundColor: 'transparent',
              color: '#c8f135',
              border: '2px solid #c8f135',
              fontFamily: 'var(--font-bebas, "Arial Narrow", sans-serif)',
              fontSize: '18px',
              padding: '14px 28px',
              borderRadius: '10px',
              cursor: 'pointer',
              letterSpacing: '0.05em',
              fontWeight: 'bold',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#c8f135';
              e.currentTarget.style.color = '#090909';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#c8f135';
            }}
          >
            Quiero mi video 100% personalizado
          </button>
        </section>

        {/* Separador */}
        <hr style={{ borderColor: '#1f1f1f', margin: '80px 0' }} />

        {/* ─── SECCIÓN 5: EL SISTEMA ─── */}
        <section id="sistema-completo" style={{ marginBottom: '80px' }}>
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '12px',
              color: '#c8f135',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: '12px',
            }}
          >
            El Método
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas, "Arial Narrow", sans-serif)',
              fontSize: '44px',
              textAlign: 'center',
              textTransform: 'uppercase',
              marginBottom: '40px',
            }}
          >
            El Sistema Completo de 4 Videos
          </h2>

          {/* Tabla */}
          <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '400px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #1a1a1a' }}>
                  <th style={{ padding: '16px 12px', color: '#c8f135', fontFamily: 'monospace', fontSize: '13px' }}>PASO</th>
                  <th style={{ padding: '16px 12px', color: '#eeebe3', fontFamily: 'var(--font-bebas, sans-serif)', fontSize: '18px', letterSpacing: '0.05em' }}>TIPO DE VIDEO</th>
                  <th style={{ padding: '16px 12px', color: '#a3a3a3', fontSize: '14px', fontWeight: 'normal' }}>OBJETIVO</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #141414', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                  <td style={{ padding: '16px 12px', fontFamily: 'monospace', color: '#666' }}>1</td>
                  <td style={{ padding: '16px 12px', fontWeight: 'bold', color: '#eeebe3' }}>Stop Scrolling</td>
                  <td style={{ padding: '16px 12px', color: '#888' }}>Captura la atención inmediata del usuario en redes.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #141414' }}>
                  <td style={{ padding: '16px 12px', fontFamily: 'monospace', color: '#666' }}>2</td>
                  <td style={{ padding: '16px 12px', fontWeight: 'bold', color: '#eeebe3' }}>Autoridad</td>
                  <td style={{ padding: '16px 12px', color: '#888' }}>Te posiciona a ti o a tu equipo como el experto ideal.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #1a1a1a', backgroundColor: 'rgba(200, 241, 53, 0.03)' }}>
                  <td style={{ padding: '16px 12px', fontFamily: 'monospace', color: '#c8f135', fontWeight: 'bold' }}>3</td>
                  <td style={{ padding: '16px 12px', fontWeight: 'bold', color: '#c8f135' }}>Reseñas (Tu Video)</td>
                  <td style={{ padding: '16px 12px', color: '#eeebe3', fontWeight: 500 }}>Validación social de clientes reales.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                  <td style={{ padding: '16px 12px', fontFamily: 'monospace', color: '#666' }}>4</td>
                  <td style={{ padding: '16px 12px', fontWeight: 'bold', color: '#eeebe3' }}>VSL (Video Carta de Ventas)</td>
                  <td style={{ padding: '16px 12px', color: '#888' }}>Explica tu oferta detalladamente y cierra la venta.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Precio y CTA */}
          <div
            style={{
              backgroundColor: '#101010',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid #1f1f1f',
              textAlign: 'center',
            }}
          >
            <p style={{ color: '#a3a3a3', fontSize: '15px', marginBottom: '8px' }}>Suscripción Mensual Completa</p>
            <h3
              style={{
                fontFamily: 'var(--font-bebas, "Arial Narrow", sans-serif)',
                fontSize: '36px',
                color: '#c8f135',
                marginBottom: '8px',
                letterSpacing: '0.05em',
              }}
            >
              $190.000 / mes
            </h3>
            <p style={{ color: '#666', fontSize: '13px', marginBottom: '24px' }}>
              vs $280.000 si contratas los videos de manera individual.
            </p>

            <button
              id="system-cta-btn"
              onClick={() =>
                handleWspClick(
                  'system',
                  `Hola Leandro, quiero el sistema completo para ${business_name}`
                )
              }
              style={{
                backgroundColor: '#c8f135',
                color: '#090909',
                fontFamily: 'var(--font-bebas, "Arial Narrow", sans-serif)',
                fontSize: '18px',
                padding: '14px 28px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                letterSpacing: '0.05em',
                width: '100%',
                maxWidth: '400px',
              }}
            >
              Quiero implementar el sistema completo
            </button>
          </div>
        </section>

        {/* ─── SECCIÓN 6: CIERRE ─── */}
        <section
          id="cierre"
          style={{
            textAlign: 'center',
            padding: '40px 0',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-bebas, "Arial Narrow", sans-serif)',
              fontSize: '36px',
              marginBottom: '16px',
              textTransform: 'uppercase',
            }}
          >
            El video es tuyo. Úsalo.
          </h2>
          <p style={{ color: '#a3a3a3', fontSize: '16px', marginBottom: '32px' }}>
            Cuando quieras llevar tus ventas al siguiente nivel, sabes dónde encontrarme.
          </p>

          <button
            id="cierre-cta-btn"
            onClick={() =>
              handleWspClick(
                'cierre',
                'Hola Leandro, quiero saber más sobre el sistema de videos.'
              )
            }
            style={{
              backgroundColor: '#eeebe3',
              color: '#090909',
              fontFamily: 'var(--font-bebas, "Arial Narrow", sans-serif)',
              fontSize: '18px',
              padding: '14px 28px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              transition: 'all 0.2s ease',
            }}
          >
            Hablemos por WhatsApp
          </button>
        </section>
      </main>
    </div>
  );
}