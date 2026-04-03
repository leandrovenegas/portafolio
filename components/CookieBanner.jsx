'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if consent has already been given or denied
    const localConsent = localStorage.getItem('cookie_consent');
    if (!localConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    setShowBanner(false);
    localStorage.setItem('cookie_consent', 'granted');
    
    // Update gtag with granted permissions
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
    }
  };

  const declineCookies = () => {
    setShowBanner(false);
    localStorage.setItem('cookie_consent', 'denied');
    
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied'
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-[400px]">
      <div className="bg-[var(--color-s1)] border border-[var(--color-border)] rounded-xl p-6 shadow-2xl flex flex-col gap-4">
        <h3 className="font-display text-[22px] tracking-wide m-0 text-[var(--color-ink)]">Aviso de Privacidad</h3>
        <p className="font-body text-[14px] leading-[1.7] text-[var(--color-mid)] m-0">
          Uso cookies para analizar métricas (Analytics) y poder ofrecer una mejor experiencia con anuncios relevantes (Ads). Puedes personalizarlas según tu preferencia.
        </p>
        <div className="flex gap-3 mt-2">
          <button 
            onClick={acceptCookies}
            className="flex-1 bg-[var(--color-ink)] text-[var(--color-bg)] font-mono text-[12px] font-medium uppercase tracking-[1px] py-3 px-4 rounded hover:bg-[var(--color-accent)] transition-colors cursor-pointer"
          >
            Aceptar
          </button>
          <button 
            onClick={declineCookies}
            className="flex-1 bg-[var(--color-s2)] text-[var(--color-ink)] border border-[var(--color-border2)] font-mono text-[12px] font-medium uppercase tracking-[1px] py-3 px-4 rounded hover:bg-[var(--color-s3)] transition-colors cursor-pointer"
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
}
