import HeroVideoSection from './sections/HeroVideoSection';
import HeroEditorialSection from './sections/HeroEditorialSection';
import TextSection from './sections/TextSection';
import ListSection from './sections/ListSection';
import CTASection from './sections/CTASection';
import FAQSection from './sections/FAQSection';

export const COMPONENT_REGISTRY = {
  HeroVideoSection,
  HeroEditorialSection,
  TextSection,
  ListSection,
  CTASection,
  FAQSection
};

export const COMPONENT_DEFINITIONS = [
  {
    type: 'HeroVideoSection',
    name: 'Hero Clásico',
    defaultProps: {
      title: 'Nuevo Hero Video',
      description1: 'Descripción principal aquí.',
      description2: 'Descripción secundaria aquí.',
      mobileAV1: '',
      mobileVP9: '',
      mobileH264: '',
      posterSrc: '/images/og-portafolio.jpg'
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
      mobileAV1: '',
      mobileVP9: '',
      mobileH264: '',
      posterSrc: '/images/og-portafolio.jpg'
    }
  },
  {
    type: 'TextSection',
    name: 'Texto',
    defaultProps: {
      title: 'Título de la Sección',
      paragraphs: ['Escribe tu párrafo aquí...']
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
  }
];
