import "./globals.css";
import CookieBanner from "../components/CookieBanner";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { CartProvider } from "@/components/carrito/CartContext";
import CartButton from "@/components/carrito/CartButton";

import { Outfit, Inter, DM_Mono } from 'next/font/google';

// Display — Outfit (geometric sans-serif for engineering/results feel)
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  preload: true, // Critical for LCP text
});

// Body — Inter (highly legible UI font)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

// Mono — DM Mono (labels, code, technical text)
const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dmmono',
  display: 'swap',
  preload: false,
});

export const metadata = {
  metadataBase: new URL("https://www.leandrovenegas.cl"),
  title: {
    default: "Leandro Venegas",
    template: "%s | Leandro Venegas",
  },
  description: "Creador de productos. Portafolio de proyectos audiovisuales y productos creativos desde Chile.",
  authors: [{ name: "Leandro Venegas" }],
  creator: "Leandro Venegas",
  openGraph: {
    title: "Leandro Venegas",
    description: "Creador de productos. Portafolio de proyectos audiovisuales y productos creativos desde Chile.",
    url: "https://www.leandrovenegas.cl",
    siteName: "Leandro Venegas",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leandro Venegas",
    description: "Creador de productos. Portafolio de proyectos audiovisuales y productos creativos desde Chile.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "Rv938G-24x1zGaOSv1L6cpuIUOBiQTZRZHjTUc6L6t4",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${outfit.variable} ${inter.variable} ${dmMono.variable} font-body bg-bg`}>
        <CartProvider>
          <Nav />
          {children}
          <Footer />
          {process.env.NODE_ENV === "production" && <CookieBanner />}
          <CartButton />
        </CartProvider>
      </body>
    </html>
  );
}