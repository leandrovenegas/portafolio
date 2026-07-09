const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables manually if not using Next.js runtime
// Look in .env.local
const envPath = path.join(__dirname, '../.env.local');
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('#') || !trimmed.includes('=')) return;
    const parts = trimmed.split('=');
    const key = parts[0].trim();
    const value = parts.slice(1).join('=').trim();
    if (key === 'NEXT_PUBLIC_SUPABASE_URL') supabaseUrl = value;
    if (key === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') supabaseAnonKey = value;
  });
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Supabase environment variables not found in environment or .env.local.');
  process.exit(1);
}

// Initialize Supabase Client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Parse CLI arguments
const args = process.argv.slice(2);
const slug = args[0] || 'home';
const versionName = args[1] || `Restructured Home - ${new Date().toISOString()}`;
const configPath = args[2] || path.join(__dirname, '../components/page-builder/defaultConfig.js');

async function publish() {
  try {
    if (!fs.existsSync(configPath)) {
      console.error(`Error: Configuration file not found at "${configPath}"`);
      process.exit(1);
    }

    console.log(`Reading configuration from ${configPath}...`);
    const fileContent = fs.readFileSync(configPath, 'utf8');
    
    // Convert ES export to CommonJS to load it dynamically
    const tempJS = fileContent.replace(/export const DEFAULT_HOME_COMPONENTS\s*=/, 'module.exports =');
    const tempFilePath = path.join(__dirname, 'temp_config.js');
    fs.writeFileSync(tempFilePath, tempJS, 'utf8');

    let components;
    try {
      components = require(tempFilePath);
    } catch (e) {
      console.error('Error importing configuration:', e);
      if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
      process.exit(1);
    }
    if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);

    console.log(`Loaded ${components.length} components.`);

    // 1. Deactivate existing active page versions with the given slug
    console.log(`Deactivating existing active page versions for slug "${slug}"...`);
    const { data: updateData, error: updateError } = await supabase
      .from('page_versions')
      .update({ is_active: false })
      .eq('slug', slug)
      .eq('is_active', true);

    if (updateError) {
      console.error('Error deactivating old versions:', updateError);
      process.exit(1);
    }
    console.log('Successfully deactivated previous active versions.');

    // 2. Insert the new page version and make it active
    console.log(`Inserting new active page version "${versionName}" for slug "${slug}"...`);
    const { data: insertData, error: insertError } = await supabase
      .from('page_versions')
      .insert({
        slug: slug,
        version_name: versionName,
        is_active: true,
        components: components
      })
      .select();

    if (insertError) {
      console.error('Error inserting new version:', insertError);
      process.exit(1);
    }

    console.log('\n==================================================');
    console.log('🎉 SUCCESS: Page version published successfully!');
    console.log(`- Slug: ${slug}`);
    console.log(`- Version Name: ${versionName}`);
    console.log(`- Inserted Version ID: ${insertData[0].id}`);
    console.log(`- Active: true`);
    console.log('==================================================\n');

  } catch (err) {
    console.error('Unexpected error during publication:', err);
    process.exit(1);
  }
}

publish();
