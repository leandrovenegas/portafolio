"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Nav component with responsive mobile menu and glassmorphism effect.
export default function Nav({ className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set year on mount to avoid hydration mismatch
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: "Sistema" },
    { href: "/proceso", label: "Proceso" },
    { href: "/portafolio", label: "Portafolio" },
    { href: "/videos", label: "Videos" },
    { href: "/lab", label: "Lab" },
    { href: "/contacto", label: "Contacto" },
  ];

  // Do not render Nav on admin pages to avoid layout clutter
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-500 border-b ${isOpen
          ? "bg-transparent border-transparent py-6"
          : scrolled
            ? "bg-s1/90 backdrop-blur-xl border-border py-3 shadow-2xl shadow-black/10"
            : "bg-transparent border-transparent py-6"
          } ${className}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex flex-col relative z-[110]">
            <Link href="/" className="group flex flex-col">
              <span className="text-ink text-sm tracking-[0.3em] uppercase group-hover:text-accent transition-colors duration-300 font-bold">
                Leandro Venegas
              </span>
              <span className="text-[9px] text-mid uppercase tracking-[0.25em] leading-none mt-1.5 group-hover:text-ink transition-colors duration-300">
                Comunicador Audiovisual
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[11px] tracking-[0.2em] uppercase transition-all duration-300 relative group py-2 ${isActive ? "text-ink font-bold" : "text-mid hover:text-ink"
                    }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-[1px] bg-accent transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex md:hidden menu-toggle-wrapper ${isOpen ? 'active' : ''}`}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span className="menu-toggle-icon" />
          </button>

          <style dangerouslySetInnerHTML={{
            __html: `
            .menu-toggle-wrapper {
                position: relative;
                z-index: 110;
                width: 48px;
                height: 48px;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background: rgba(24, 24, 27, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.05);
                cursor: pointer;
                transition: transform 0.2s ease;
            }
            
            .menu-toggle-wrapper:active {
                transform: scale(0.95);
            }

            .menu-toggle-icon {
                position: relative;
                display: block;
                width: 30px;
                height: 3px;
                background: var(--color-ink);
                transition: all .3s cubic-bezier(0.585,-0.6,0.43,1.65);
            }

            .menu-toggle-icon:after, .menu-toggle-icon:before {
                content: '';
                position: absolute;
                width: 100%;
                height: 3px;
                background: var(--color-ink);
                left: 0;
                transform-origin: center center;
                transition: all .3s cubic-bezier(0.585,-0.6,0.43,1.65);
            }

            .menu-toggle-icon:before {
                top: -8px;
            }

            .menu-toggle-icon:after {
                bottom: -8px;
            }

            .menu-toggle-wrapper.active .menu-toggle-icon {
                background: transparent;
            }

            .menu-toggle-wrapper.active .menu-toggle-icon:after {
                transform: rotate(-45deg) translate(3px, -8px);
            }

            .menu-toggle-wrapper.active .menu-toggle-icon:before {
                transform: rotate(45deg) translate(3px, 8px);
            }

            .menu-toggle-wrapper:hover .menu-toggle-icon:before {
                top: -6px;
            }

            .menu-toggle-wrapper:hover .menu-toggle-icon:after {
                bottom: -6px;
            }

            .menu-toggle-wrapper.active:hover .menu-toggle-icon:before {
                top: -8px;
            }

            .menu-toggle-wrapper.active:hover .menu-toggle-icon:after {
                bottom: -8px;
            }
          `}} />
        </div>
      </header>

      {/* Mobile Overlay Menu */}
      <div
        className={`fixed inset-0 bg-s1/95 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)] md:hidden z-[105] ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
          }`}
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full animate-pulse" />
        </div>

        <nav className="flex flex-col items-center gap-10 relative z-10 pt-10">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  transitionDelay: isOpen ? `${i * 80}ms` : '0ms',
                  transform: isOpen ? 'translateY(0)' : 'translateY(40px)',
                  opacity: isOpen ? 1 : 0
                }}
                className={`text-3xl tracking-[0.15em] uppercase transition-all duration-700 font-display ${isActive ? "text-accent" : "text-ink hover:text-accent"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div
          className="absolute bottom-16 text-center px-6 transition-all duration-1000 delay-500"
          style={{ opacity: isOpen ? 0.4 : 0 }}
        >
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-mono">
            Leandro Venegas © {currentYear}
          </p>
        </div>
      </div>
    </>
  );
}