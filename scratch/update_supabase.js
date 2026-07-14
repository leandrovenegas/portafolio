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
  // Update organizations
  const orgUpdates = [
    { slug: 'dragon-lab', markdown_url: 'content/dragon-lab.mdx' },
    { slug: 'incoludido', markdown_url: 'content/incoludido.mdx' },
    { slug: 'personal', markdown_url: 'content/personal.mdx' },
    { slug: 'rayandola', markdown_url: 'content/rayandola.mdx' }
  ];

  for (const item of orgUpdates) {
    const { data, error } = await supabase
      .from('organizations')
      .update({ markdown_url: item.markdown_url, is_indexed: true })
      .eq('slug', item.slug)
      .select('slug, name');
    console.log("Org Update:", item.slug, error ? error.message : data);
  }

  // Update projects
  const projUpdates = [
    { slug: 'crazy-papa-studios', markdown_url: 'content/crazypapastudios.mdx' }
  ];

  for (const item of projUpdates) {
    const { data, error } = await supabase
      .from('projects')
      .update({ markdown_url: item.markdown_url, status: 'published' })
      .eq('slug', item.slug)
      .select('slug, title');
    console.log("Proj Update:", item.slug, error ? error.message : data);
  }
}

main();
