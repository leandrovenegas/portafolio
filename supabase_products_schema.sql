-- ─── Tabla products ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.products (
  id          uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text    NOT NULL,
  description text,
  price_clp   integer NOT NULL,   -- Precio neto en CLP (sin IVA)
  price_usd   integer NOT NULL,   -- Precio referencial en USD
  active      boolean DEFAULT true,
  sort_order  integer DEFAULT 0,
  created_at  timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL
);

-- ─── RLS ──────────────────────────────────────────────────────────────────────
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Lectura pública (necesaria para renderizar /precios)
DROP POLICY IF EXISTS "Lectura pública products" ON public.products;
CREATE POLICY "Lectura pública products"
  ON public.products FOR SELECT
  USING (true);

-- Escritura solo anon key (admin local, sin auth configurado)
DROP POLICY IF EXISTS "Inserción anon products" ON public.products;
CREATE POLICY "Inserción anon products"
  ON public.products FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Update anon products" ON public.products;
CREATE POLICY "Update anon products"
  ON public.products FOR UPDATE
  USING (true);

DROP POLICY IF EXISTS "Delete anon products" ON public.products;
CREATE POLICY "Delete anon products"
  ON public.products FOR DELETE
  USING (true);

-- ─── Seed: 4 productos del sistema ───────────────────────────────────────────
INSERT INTO public.products (name, description, price_clp, price_usd, active, sort_order) VALUES
(
  'Video Stop-Scrolling',
  'Un video corto optimizado para detener el scroll y capturar atención en redes sociales. Ideal para aumentar el alcance orgánico y atraer nuevos clientes desde el primer segundo.',
  150000, 170, true, 1
),
(
  'Video de Autoridad',
  'Video que posiciona tu marca o personal brand como referente en tu industria. Storytelling + producción premium para construir confianza antes de la primera conversación.',
  200000, 225, true, 2
),
(
  'Video de Validación Social',
  'Video basado en reseñas, testimonios y resultados reales de tus clientes. Convierte el boca a boca en contenido audiovisual que cierra objeciones solo.',
  180000, 200, true, 3
),
(
  'Video de Venta (VSL)',
  'Video de ventas completo que explica tu oferta, maneja objeciones y lleva al cliente a la acción. Tu vendedor disponible las 24 horas, los 7 días de la semana.',
  250000, 280, true, 4
)
ON CONFLICT DO NOTHING;
