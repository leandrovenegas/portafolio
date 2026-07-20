const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
  const [key, value] = line.split('=');
  if (key && value) acc[key.trim()] = value.trim();
  return acc;
}, {});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: projs } = await supabase.from('projects').select('slug, title').in('slug', ['dragon-lab', 'incoludido', 'crazypapastudios', 'crazy-papa-studios', 'personal', 'rayandola']);
  console.log("Found in projects:", projs);
  const { data: orgs } = await supabase.from('organizations').select('slug, name').in('slug', ['dragon-lab', 'incoludido', 'crazypapastudios', 'crazy-papa-studios', 'personal', 'rayandola']);
  console.log("Found in organizations:", orgs);
}
main();
