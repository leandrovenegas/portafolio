-- Tabla para guardar los presets del banco de animaciones
CREATE TABLE IF NOT EXISTS public.animation_presets (
  id uuid default gen_random_uuid() primary key,
  name text not null, -- Nombre descriptivo (e.g. 'Hero Home')
  type text not null, -- Tipo de animación (e.g. 'cascade-fade-up')
  duration numeric not null, -- Duración en segundos (e.g. 0.6)
  stagger_by integer not null, -- Stagger en milisegundos (e.g. 80)
  easing text not null, -- Easing (e.g. 'cubic-bezier(...)')
  iterations text not null, -- Iteraciones: "1", "2", "3", "Infinity"
  subtitle_delay integer, -- Delay del subtítulo en milisegundos (opcional)
  mode text not null, -- Modo: 'titulo' o 'hero'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Políticas de Seguridad (RLS) para permitir uso público/anónimo
ALTER TABLE public.animation_presets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura publica presets" 
  ON public.animation_presets FOR SELECT 
  USING (true);

CREATE POLICY "Permitir inserción anon presets" 
  ON public.animation_presets FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Permitir update anon presets" 
  ON public.animation_presets FOR UPDATE 
  USING (true);

CREATE POLICY "Permitir delete anon presets" 
  ON public.animation_presets FOR DELETE 
  USING (true);
