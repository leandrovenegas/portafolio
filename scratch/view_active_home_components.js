const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://uzsagsdrjgnifzdzffyg.supabase.co',
  'sb_publishable_uouCyl1ZINmndCwwlP-vZw_c4_2eDkN'
);

async function test() {
  try {
    const { data, error } = await supabase
      .from('page_versions')
      .select('id, version_name, components')
      .eq('slug', 'home')
      .eq('is_active', true)
      .single();
    if (error) {
      console.error('Supabase error:', error);
    } else {
      console.log('Active ID:', data.id);
      console.log('Version Name:', data.version_name);
      console.log('Components JSON:', JSON.stringify(data.components, null, 2));
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

test();
