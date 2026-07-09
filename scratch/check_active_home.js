const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://uzsagsdrjgnifzdzffyg.supabase.co',
  'sb_publishable_uouCyl1ZINmndCwwlP-vZw_c4_2eDkN'
);

async function test() {
  try {
    console.log('Testing Supabase query on page_versions for slug = home...');
    const { data, error } = await supabase.from('page_versions').select('*').eq('slug', 'home');
    if (error) {
      console.error('Supabase select error:', error);
    } else {
      console.log('Select successful, found', data.length, 'versions.');
      data.forEach(v => {
        console.log(`ID: ${v.id}, Name: ${v.version_name}, Active: ${v.is_active}, Created: ${v.created_at}`);
      });
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

test();
