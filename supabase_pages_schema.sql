-- Tabla para guardar las versiones de las páginas (Editor Visual)
CREATE TABLE public.page_versions (
  id uuid default gen_random_uuid() primary key,
  slug text not null, -- e.g., 'home', 'about', etc.
  version_name text not null, -- e.g., 'v1', 'A/B Test 1'
  is_active boolean default false,
  components jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Opcional: Índice para buscar rápidamente la versión activa de una página
CREATE INDEX active_page_version_idx ON public.page_versions (slug) WHERE is_active = true;

-- Políticas de Seguridad (RLS) - Opcional pero recomendado
ALTER TABLE public.page_versions ENABLE ROW LEVEL SECURITY;

-- Permitir lectura a todos (necesario para renderizar la web pública)
CREATE POLICY "Permitir lectura publica" 
  ON public.page_versions FOR SELECT 
  USING (true);

-- Permitir escritura solo a usuarios autenticados (o en tu caso, si usas ANON_KEY para admin, podrías dejarlo abierto o restringido a tu auth)
-- NOTA: Si usas Supabase sin Auth configurado y solo con ANON_KEY para el admin local, puedes usar esta política (menos segura):
CREATE POLICY "Permitir inserción anon" 
  ON public.page_versions FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Permitir update anon" 
  ON public.page_versions FOR UPDATE 
  USING (true);

CREATE POLICY "Permitir delete anon" 
  ON public.page_versions FOR DELETE 
  USING (true);
