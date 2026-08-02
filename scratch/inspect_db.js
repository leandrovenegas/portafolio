const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Parse .env.local
const envPath = './.env.local';
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
  if (match) {
    env[match[1]] = match[2].trim();
  }
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

console.log('Connecting to Supabase at:', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: versions, error } = await supabase
    .from('page_versions')
    .select('id, slug, version_name, is_active, components');

  if (error) {
    console.error('Error fetching page versions:', error);
    return;
  }

  console.log(`Fetched ${versions.length} versions from database.\n`);

  // Count component types
  const typeCounts = {};
  const activeLayouts = [];

  versions.forEach(v => {
    const comps = Array.isArray(v.components) ? v.components : [];
    
    // Recursive helper to traverse components tree
    function traverse(arr, isParentActive) {
      arr.forEach(comp => {
        const type = comp.type;
        typeCounts[type] = (typeCounts[type] || 0) + 1;

        if (isParentActive) {
          activeLayouts.push({
            slug: v.slug,
            version: v.version_name,
            id: comp.id,
            name: comp.name,
            type: comp.type,
            layout: comp.layout || comp._layout
          });
        }

        if (Array.isArray(comp.children) && comp.children.length > 0) {
          traverse(comp.children, isParentActive);
        }
      });
    }

    traverse(comps, v.is_active);
  });

  console.log('--- COMPONENT TYPE INSTANCES IN DATABASE ---');
  console.log(JSON.stringify(typeCounts, null, 2));
  console.log('\n--- ACTIVE LAYOUTS COORDINATES ANALYSIS ---');
  
  let nonStandardCount = 0;
  let standardCount = 0;

  activeLayouts.forEach(item => {
    const l = item.layout;
    if (!l) {
      console.log(`[${item.slug}] ${item.type} (${item.name}): NO LAYOUT DATA`);
      return;
    }

    // A standard grid item for a full-width section is width 24 (or 12 on mobile) starting at x = 0
    let isStandard = true;
    const bps = ['desktop', 'tablet', 'mobile'];
    
    const bpAnalysis = {};
    
    bps.forEach(bp => {
      const data = l[bp];
      if (!data) return;
      const expectedWidth = bp === 'mobile' ? 12 : 24;
      const isBpStandard = data.x === 0 && (data.w === expectedWidth || data.w === 24);
      bpAnalysis[bp] = `x:${data.x}, w:${data.w}, h:${data.h}`;
      if (!isBpStandard) {
        isStandard = false;
      }
    });

    if (isStandard) {
      standardCount++;
    } else {
      nonStandardCount++;
      console.log(`[NON-STANDARD] [${item.slug}] ${item.type} (${item.name}):`);
      console.log('   Layout:', JSON.stringify(bpAnalysis));
    }
  });

  console.log(`\nActive layouts summary: ${standardCount} standard full-width, ${nonStandardCount} non-standard / custom aligned.`);
}

run();
