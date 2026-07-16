import fs from 'fs';
import path from 'path';

function parseEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  const content = fs.readFileSync(envPath, 'utf-8');
  const lines = content.split('\n');
  const env = {};
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      env[match[1].trim()] = match[2].trim();
    }
  }
  return env;
}

async function getOrgData() {
  const env = parseEnv();
  const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
  const supabaseKey = env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

  const headers = {
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json'
  };

  const getUrl = `${supabaseUrl}/rest/v1/organizations?slug=eq.rayandola&limit=1`;
  const getRes = await fetch(getUrl, { headers });
  
  if (!getRes.ok) {
    console.error('Error GET:', await getRes.text());
    return;
  }

  const data = await getRes.json();
  console.log('Organización data:', JSON.stringify(data, null, 2));
}

getOrgData();
