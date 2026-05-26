-- Aplicar Row Level Security (RLS) sobre las tablas existentes de la landing de video

-- 1. Políticas para raw_leads
ALTER TABLE public.raw_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Select público raw_leads" ON public.raw_leads;
CREATE POLICY "Select público raw_leads" ON public.raw_leads FOR SELECT USING (true);

-- 2. Políticas para video_queue
ALTER TABLE public.video_queue ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Select público video_queue" ON public.video_queue;
CREATE POLICY "Select público video_queue" ON public.video_queue FOR SELECT USING (true);

-- 3. Políticas para outreach
ALTER TABLE public.outreach ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Select público outreach" ON public.outreach;
CREATE POLICY "Select público outreach" ON public.outreach FOR SELECT USING (true);

DROP POLICY IF EXISTS "Insert público outreach" ON public.outreach;
CREATE POLICY "Insert público outreach" ON public.outreach FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Update público outreach" ON public.outreach;
CREATE POLICY "Update público outreach" ON public.outreach FOR UPDATE USING (true);
