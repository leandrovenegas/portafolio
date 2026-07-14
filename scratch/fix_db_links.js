import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

async function main() {
  const envPath = path.join(process.cwd(), '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  envContent.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value.length > 0) {
      envVars[key.trim()] = value.join('=').trim().replace(/^"|"$/g, '');
    }
  });

  const supabase = createClient(envVars.NEXT_PUBLIC_SUPABASE_URL, envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const { data, error } = await supabase.from('page_versions').select('*').eq('slug', 'portafolio');
  if (error) {
    console.error("Error fetching", error);
    return;
  }
  
  for (const row of data) {
    let components = row.components;
    let modified = false;
    
    const jsonStr = JSON.stringify(components);
    if (jsonStr.includes('"/portafolio/')) {
       // Replace link paths from /portafolio/[slug] to /organizaciones/[slug]
       const newStr = jsonStr.replace(/"\/portafolio\//g, '"/organizaciones/');
       components = JSON.parse(newStr);
       modified = true;
    }

    if (modified) {
      await supabase.from('page_versions').update({ components }).eq('id', row.id);
      console.log(`Updated page_version id ${row.id}`);
    } else {
      console.log(`No updates needed for page_version id ${row.id}`);
    }
  }
}

main().catch(console.error);
