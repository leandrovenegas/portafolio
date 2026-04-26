import "./globals.css";
import CookieBanner from "../components/CookieBanner";
import { Bebas_Neue, DM_Sans, DM_Mono, Plus_Jakarta_Sans } from 'next/font/google';

// Display — Bebas Neue (condensed, impactful headlines)
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
  preload: true, // Critical for LCP text
});

// Body — DM Sans Variable (single file covers weight 100–900 + optical sizing)
const dmSans = DM_Sans({
  subsets: ['latin'],
  axes: ['opsz'], // Optical Sizing: text sharpens at small/large sizes automatically
  variable: '--font-dmsans',
  display: 'swap',
  preload: true,
});

// Accent Body — Plus Jakarta Sans Variable (more humanist, better for long-form content)
const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  preload: false, // Load after critical path
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
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://iframe.mediadelivery.net" />
        <link rel="preconnect" href="https://vz-a158839f-ce6.b-cdn.net" />
      </head>
      <body className={`${bebasNeue.variable} ${dmSans.variable} ${jakartaSans.variable} ${dmMono.variable} font-body bg-black`}>
        {children}
        {process.env.NODE_ENV === "production" && <CookieBanner />}
      </body>
    </html>
  );
}