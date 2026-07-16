const { createClient } = require('@supabase/supabase-js');
const https = require('https');

const supabase = createClient(
  'https://uqcqofptduwclqqoehnw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxY3FvZnB0ZHV3Y2xxcW9laG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3ODA5NDgsImV4cCI6MjA5NDM1Njk0OH0.4-_hpANdIkdUnuuaJaERsKwkxNuV5g6FWt7WMYJdWSQ'
);

async function testSupabase() {
  console.log('Querying raw_leads for slug "dental-gran-avenida"...');
  const { data: lead, error } = await supabase
    .from('raw_leads')
    .select('raw_data')
    .eq('slug', 'dental-gran-avenida')
    .maybeSingle();

  if (error) {
    console.error('Supabase error:', error);
    return;
  }
  if (!lead) {
    console.log('No lead found for slug "dental-gran-avenida"');
    return;
  }
  console.log('Lead found!', JSON.stringify(lead.raw_data, null, 2));
}

function checkImage(url) {
  return new Promise((resolve) => {
    console.log(`Checking image url: ${url}`);
    https.get(url, (res) => {
      console.log(`HTTP Status Code: ${res.statusCode}`);
      console.log('Headers:', res.headers);
      
      let bytes = 0;
      res.on('data', (chunk) => {
        bytes += chunk.length;
      });
      res.on('end', () => {
        console.log(`Downloaded ${bytes} bytes`);
        resolve();
      });
    }).on('error', (err) => {
      console.error('HTTPS get error:', err);
      resolve();
    });
  });
}

async function run() {
  await testSupabase();
  await checkImage('https://res.cloudinary.com/dx2rvpvwr/image/upload/v1783553595/thumbnails/djsts5aifjobkidrklw9.jpg');
}

run();
