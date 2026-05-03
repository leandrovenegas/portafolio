import { COMPONENT_REGISTRY } from './registry';

export default function PageRenderer({ components }) {
  if (!components || !components.length) {
    return null;
  }

  // Separate HeroVideo from the rest so we can render it full width properly, 
  // or we can wrap each non-hero block in the container class.
  return (
    <>
      {components.map((comp) => {
        const ComponentToRender = COMPONENT_REGISTRY[comp.type];
        
        if (!ComponentToRender) {
          console.warn(`Component type ${comp.type} not found in registry.`);
          return null;
        }

        if (comp.type === 'HeroVideoSection') {
          return <ComponentToRender key={comp.id} {...comp.props} />;
        }

        return (
          <div key={comp.id} className="relative z-10 px-6 md:px-12 lg:px-24 mx-auto max-w-7xl w-full py-12 md:py-16">
            <ComponentToRender {...comp.props} />
          </div>
        );
      })}
    </>
  );
}
