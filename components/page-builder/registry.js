import HeroVideoSection from './sections/HeroVideoSection';
import HeroEditorialSection from './sections/HeroEditorialSection';
import TextSection from './sections/TextSection';
import ListSection from './sections/ListSection';
import CTASection from './sections/CTASection';
import FAQSection from './sections/FAQSection';
import SimpleCenteredCTA from './sections/SimpleCenteredCTA';
import CTAWhatsapp from './sections/CTAWhatsapp';
import EstrelasSection from './sections/EstrelasSection';

export const COMPONENT_REGISTRY = {
  HeroVideoSection,
  HeroEditorialSection,
  TextSection,
  ListSection,
  CTASection,
  FAQSection,
  SimpleCenteredCTA,
  CTAWhatsapp,
  EstrelasSection
};

export const COMPONENT_DEFINITIONS = [
  {
    type: 'HeroVideoSection',
    name: 'Hero Clásico',
    defaultProps: {
      title: 'Nuevo Hero Video',
      description1: 'Descripción principal aquí.',
      description2: 'Descripción secundaria aquí.',
      mobileVideoGuid: 'fe276f61-28ae-4f6f-99e5-1ec480771801',
      tabletVideoGuid: 'fe276f61-28ae-4f6f-99e5-1ec480771801',
      desktopVideoGuid: 'fe276f61-28ae-4f6f-99e5-1ec480771801',
      posterSrc: '',
      posterAlt: 'Showreel Audiovisual — Leandro Venegas'
    }
  },
  {
    type: 'HeroEditorialSection',
    name: 'Hero Editorial',
    defaultProps: {
      pillText: 'Estrategia & Video',
      headline: 'Creamos',
      headlineKeyword: 'Resultados',
      bodyText: 'Llevamos tu marca al siguiente nivel con contenido de alto impacto. "El video es el rey del SEO".',
      tagline: 'Garantizamos retención de audiencia.',
      primaryButtonText: 'Agendar Llamada',
      primaryButtonLink: '/contacto',
      secondaryButtonText: 'Ver Portafolio',
      secondaryButtonLink: '/portafolio',
      mobileVideoGuid: '6859587c-3f26-444e-a131-026852c00325',
      tabletVideoGuid: '6859587c-3f26-444e-a131-026852c00325',
      desktopVideoGuid: '6859587c-3f26-444e-a131-026852c00325',
      posterSrc: '',
      posterAlt: 'Dirección Creativa y Estrategia Audiovisual',
      _styles: {
        pillText:        { mobile: { fontSize: 10, color: '', fontWeight: '400', fontStyle: 'normal', textTransform: 'uppercase', letterSpacing: '0.2', lineHeight: '1.5' }, tablet: { fontSize: 10, color: '', fontWeight: '400', fontStyle: 'normal', textTransform: 'uppercase', letterSpacing: '0.2', lineHeight: '1.5' }, desktop: { fontSize: 10, color: '', fontWeight: '400', fontStyle: 'normal', textTransform: 'uppercase', letterSpacing: '0.2', lineHeight: '1.5' } },
        headline:        { mobile: { fontSize: 48, color: '', fontWeight: '700', fontStyle: 'normal', textTransform: 'none', letterSpacing: '-0.02', lineHeight: '0.95' }, tablet: { fontSize: 60, color: '', fontWeight: '700', fontStyle: 'normal', textTransform: 'none', letterSpacing: '-0.02', lineHeight: '0.95' }, desktop: { fontSize: 96, color: '', fontWeight: '700', fontStyle: 'normal', textTransform: 'none', letterSpacing: '-0.02', lineHeight: '0.95' } },
        headlineKeyword: { mobile: { fontSize: 48, color: '', fontWeight: '700', fontStyle: 'normal', textTransform: 'none', letterSpacing: '-0.02', lineHeight: '0.95' }, tablet: { fontSize: 60, color: '', fontWeight: '700', fontStyle: 'normal', textTransform: 'none', letterSpacing: '-0.02', lineHeight: '0.95' }, desktop: { fontSize: 96, color: '', fontWeight: '700', fontStyle: 'normal', textTransform: 'none', letterSpacing: '-0.02', lineHeight: '0.95' } },
        bodyText:        { mobile: { fontSize: 16, color: '', fontWeight: '400', fontStyle: 'normal', textTransform: 'none', letterSpacing: '0', lineHeight: '1.6' }, tablet: { fontSize: 18, color: '', fontWeight: '400', fontStyle: 'normal', textTransform: 'none', letterSpacing: '0', lineHeight: '1.6' }, desktop: { fontSize: 20, color: '', fontWeight: '400', fontStyle: 'normal', textTransform: 'none', letterSpacing: '0', lineHeight: '1.6' } },
        tagline:         { mobile: { fontSize: 16, color: '', fontWeight: '500', fontStyle: 'normal', textTransform: 'none', letterSpacing: '0', lineHeight: '1.5' }, tablet: { fontSize: 18, color: '', fontWeight: '500', fontStyle: 'normal', textTransform: 'none', letterSpacing: '0', lineHeight: '1.5' }, desktop: { fontSize: 20, color: '', fontWeight: '500', fontStyle: 'normal', textTransform: 'none', letterSpacing: '0', lineHeight: '1.5' } }
      }
    }
  },
  {
    type: 'TextSection',
    name: 'Texto',
    defaultProps: {
      title: 'Título de la Sección',
      description: 'Escribe tu párrafo aquí...\n\nPuedes crear múltiples líneas.',
      _styles: {
        title: { mobile: { fontSize: 36, color: '', fontWeight: '700', fontStyle: 'normal', textTransform: 'none', letterSpacing: '-0.02', lineHeight: '1.2' }, tablet: { fontSize: 48, color: '', fontWeight: '700', fontStyle: 'normal', textTransform: 'none', letterSpacing: '-0.02', lineHeight: '1.2' }, desktop: { fontSize: 48, color: '', fontWeight: '700', fontStyle: 'normal', textTransform: 'none', letterSpacing: '-0.02', lineHeight: '1.2' } },
        description: { mobile: { fontSize: 18, color: '', fontWeight: '400', fontStyle: 'normal', textTransform: 'none', letterSpacing: '0', lineHeight: '1.6' }, tablet: { fontSize: 18, color: '', fontWeight: '400', fontStyle: 'normal', textTransform: 'none', letterSpacing: '0', lineHeight: '1.6' }, desktop: { fontSize: 18, color: '', fontWeight: '400', fontStyle: 'normal', textTransform: 'none', letterSpacing: '0', lineHeight: '1.6' } }
      }
    }
  },
  {
    type: 'ListSection',
    name: 'Lista',
    defaultProps: {
      title: 'Título de Lista',
      description: 'Descripción breve.',
      items: [
        { title: 'Item 1', description: 'Descripción 1' },
        { title: 'Item 2', description: 'Descripción 2' }
      ]
    }
  },
  {
    type: 'CTASection',
    name: 'Call to Action (Contacto)',
    defaultProps: {
      title: 'Llamado a la acción',
      description: 'Conversamos sobre tu proyecto.',
      buttonText: 'Agendar conversación →',
      buttonLink: 'https://wa.me/56988804299'
    }
  },
  {
    type: 'FAQSection',
    name: 'Preguntas Frecuentes',
    defaultProps: {
      title: 'Preguntas Frecuentes',
      questions: [
        { q: '¿Pregunta 1?', a: 'Respuesta 1' },
        { q: '¿Pregunta 2?', a: 'Respuesta 2' }
      ]
    }
  },
  {
    type: 'SimpleCenteredCTA',
    name: 'Call to Action (Centrado)',
    defaultProps: {
      headline: 'Aumenta tu productividad.\nEmpieza a usar nuestra app hoy.',
      description: 'Llevamos tu marca al siguiente nivel con contenido de alto impacto.',
      primaryButtonText: 'Empezar ahora',
      primaryButtonLink: '#',
      secondaryButtonText: 'Saber más',
      secondaryButtonLink: '#',
      backgroundColor: '#3b82f6',
      _styles: {
        headline:    { mobile: { fontSize: 30, color: '#ffffff', fontWeight: '700', fontStyle: 'normal', textTransform: 'none', letterSpacing: '-0.02', lineHeight: '1.2' }, tablet: { fontSize: 36, color: '#ffffff', fontWeight: '700', fontStyle: 'normal', textTransform: 'none', letterSpacing: '-0.02', lineHeight: '1.2' }, desktop: { fontSize: 40, color: '#ffffff', fontWeight: '700', fontStyle: 'normal', textTransform: 'none', letterSpacing: '-0.02', lineHeight: '1.2' } },
        description: { mobile: { fontSize: 18, color: '#e0e7ff', fontWeight: '400', fontStyle: 'normal', textTransform: 'none', letterSpacing: '0', lineHeight: '1.5' }, tablet: { fontSize: 18, color: '#e0e7ff', fontWeight: '400', fontStyle: 'normal', textTransform: 'none', letterSpacing: '0', lineHeight: '1.5' }, desktop: { fontSize: 18, color: '#e0e7ff', fontWeight: '400', fontStyle: 'normal', textTransform: 'none', letterSpacing: '0', lineHeight: '1.5' } }
      }
    }
  },
  {
    type: 'CTAWhatsapp',
    name: 'CTA WhatsApp',
    defaultProps: {
      title: '¿Tienes preguntas?',
      description: 'Conversa directamente con nosotros por WhatsApp. Responderemos en breve.',
      buttonText: 'Conversar por WhatsApp',
      message: 'Hola, me gustaría conocer más sobre tus servicios.',
      phoneNumber: '56988804299'
    }
  },
  {
    type: 'EstrelasSection',
    name: 'Estrellas (Reseñas)',
    defaultProps: {
      rating: 5,
      reviewCount: 0,
      showLabel: true,
      title: 'Calificación de Clientes',
      description: 'Nuestros clientes confían en la calidad de nuestro trabajo.',
      alignment: 'center',
      backgroundColor: '#ffffff',
      starSizes: { mobile: 28, tablet: 36, desktop: 48 },
      _styles: {
        title: { mobile: { fontSize: 20, color: '#111827', fontWeight: '700', fontStyle: 'normal', textTransform: 'none', letterSpacing: '-0.02', lineHeight: '1.2' }, tablet: { fontSize: 24, color: '#111827', fontWeight: '700', fontStyle: 'normal', textTransform: 'none', letterSpacing: '-0.02', lineHeight: '1.2' }, desktop: { fontSize: 28, color: '#111827', fontWeight: '700', fontStyle: 'normal', textTransform: 'none', letterSpacing: '-0.02', lineHeight: '1.2' } },
        description: { mobile: { fontSize: 14, color: '#4B5563', fontWeight: '400', fontStyle: 'normal', textTransform: 'none', letterSpacing: '0', lineHeight: '1.5' }, tablet: { fontSize: 16, color: '#4B5563', fontWeight: '400', fontStyle: 'normal', textTransform: 'none', letterSpacing: '0', lineHeight: '1.5' }, desktop: { fontSize: 18, color: '#4B5563', fontWeight: '400', fontStyle: 'normal', textTransform: 'none', letterSpacing: '0', lineHeight: '1.5' } }
      }
    }
  }
];
