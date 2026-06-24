'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function CookieBanner() {
  const [consent, setConsent] = useState(null); // null = unknown, 'granted' | 'denied'
  const [showBanner, setShowBanner] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent');
    if (!stored) {
      const timer = setTimeout(() => {
        setIsMounted(true);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setConsent(stored);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isMounted]);

  function accept() {
    localStorage.setItem('cookie_consent', 'granted');
    setConsent('granted');
    setShowBanner(false);
    setTimeout(() => setIsMounted(false), 500);
    // Update gtag consent if already loaded
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      });
    }
  }

  function decline() {
    localStorage.setItem('cookie_consent', 'denied');
    setConsent('denied');
    setShowBanner(false);
    setTimeout(() => setIsMounted(false), 500);
  }

  return (
    <>
      {/* ── Load GA + Ads ONLY after explicit consent ───────────── */}
      {consent === 'granted' && (
        <>
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-W51B8J0QD2"
          />
          <Script id="gtag-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('consent', 'update', {
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted',
                analytics_storage: 'granted'
              });
              gtag('config', 'G-W51B8J0QD2');
              gtag('config', 'AW-18060110034');
            `}
          </Script>
        </>
      )}

      {/* ── Banner UI ────────────────────────────────────────────── */}
      {isMounted && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-[400px] transition-all duration-500 ease-out transform ${
            showBanner ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-[var(--color-s1)] border border-[var(--color-border)] rounded-xl p-6 shadow-2xl flex flex-col gap-4">
            <h3 className="font-display text-[22px] tracking-wide m-0 text-[var(--color-ink)]">
              🍪 Este sitio usa cookies
            </h3>
            <p className="font-body text-[14px] leading-[1.7] text-[var(--color-mid)] m-0">
              Las uso para entender cómo mejorar el sitio con cada actualización — nada más. Sin publicidad ni rastreo de terceros.
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={accept}
                className="flex-1 bg-[var(--color-ink)] text-[var(--color-bg)] font-mono text-[12px] font-medium uppercase tracking-[1px] py-3 px-4 rounded hover:bg-[var(--color-accent)] transition-colors cursor-pointer"
              >
                Entendido
              </button>
              <button
                onClick={decline}
                className="flex-1 bg-[var(--color-s2)] text-[var(--color-ink)] border border-[var(--color-border2)] font-mono text-[12px] font-medium uppercase tracking-[1px] py-3 px-4 rounded hover:bg-[var(--color-s3)] transition-colors cursor-pointer"
              >
                Solo esenciales
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
