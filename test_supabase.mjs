import fs from 'fs';

const url = "https://uzsagsdrjgnifzdzffyg.supabase.co/rest/v1/page_versions?slug=eq.home&is_active=eq.true";
const apiKey = "sb_publishable_uouCyl1ZINmndCwwlP-vZw_c4_2eDkN";

async function main() {
  try {
    const res = await fetch(url, {
      headers: {
        "apikey": apiKey,
        "Authorization": `Bearer ${apiKey}`
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status} - ${await res.text()}`);
    }
    const data = await res.json();
    console.log('Success. Row count:', data?.length);
    if (data.length > 0) {
      console.log('Active Version ID:', data[0].id);
      console.log('Active Version Name:', data[0].version_name);
      fs.writeFileSync('data/active_home_components.json', JSON.stringify(data[0], null, 2), 'utf-8');
      console.log('Saved active row to data/active_home_components.json');
    } else {
      console.log('No active home version found!');
    }
  } catch (e) {
    console.error('Fetch Error:', e);
  }
}

main();
