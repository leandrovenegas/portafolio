const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://uqcqofptduwclqqoehnw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxY3FvZnB0ZHV3Y2xxcW9laG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3ODA5NDgsImV4cCI6MjA5NDM1Njk0OH0.4-_hpANdIkdUnuuaJaERsKwkxNuV5g6FWt7WMYJdWSQ'
);

async function test() {
  try {
    console.log('Testing Supabase query on email_leads...');
    const { data, error } = await supabase.from('email_leads').select('*').limit(5);
    if (error) {
      console.error('Supabase select error:', error);
    } else {
      console.log('Select successful, data:', data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

test();
