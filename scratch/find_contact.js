import fs from 'fs';
import path from 'path';

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

  const BUNNY_LIBRARY_ID = envVars.NEXT_PUBLIC_BUNNY_LIBRARY_ID;
  const BUNNY_API_KEY = envVars.BUNNY_API_KEY;
  const BASE_URL = 'https://video.bunnycdn.com';

  const response = await fetch(`${BASE_URL}/library/${BUNNY_LIBRARY_ID}/videos?page=1&perPage=100`, {
    headers: {
      Accept: 'application/json',
      AccessKey: BUNNY_API_KEY,
    }
  });
  
  const json = await response.json();
  const items = Array.isArray(json) ? json : json.items || [];
  
  const found = items.filter(v => v.title.toLowerCase().includes('ce5') || v.title.toLowerCase().includes('extra') || v.title.toLowerCase().includes('vela'));
  found.forEach(v => console.log(`FOUND: ${v.guid} | ${v.title}`));
}

main().catch(console.error);
