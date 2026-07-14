import { createClient } from "@supabase/supabase-js";

const supabaseSpr = createClient(
  process.env.NEXT_PUBLIC_SPR_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SPR_SUPABASE_ANON_KEY!
);

export default supabaseSpr;
