const fs = require('fs');
const readline = require('readline');

async function recover() {
  const transcriptPath = 'C:/Users/rayan/.gemini/antigravity/brain/ae874839-626e-49d0-a534-17ff832b103e/.system_generated/logs/transcript_full.jsonl';
  
  let content = fs.readFileSync('app/admin/editor/page.js', 'utf-8');
  // Normalize content to \n
  content = content.replace(/\r\n/g, '\n');

  const rl = readline.createInterface({
    input: fs.createReadStream(transcriptPath),
    crlfDelay: Infinity
  });

  let editCount = 0;

  for await (const line of rl) {
    try {
      const obj = JSON.parse(line);
      if (obj.tool_calls && Array.isArray(obj.tool_calls)) {
        for (const tc of obj.tool_calls) {
          if (tc.name === 'default_api:replace_file_content' || tc.name === 'replace_file_content') {
            const args = tc.arguments;
            if (args.TargetFile && (args.TargetFile.endsWith('app\\admin\\editor\\page.js') || args.TargetFile.endsWith('app/admin/editor/page.js'))) {
              let target = args.TargetContent.replace(/\r\n/g, '\n');
              let replacement = args.ReplacementContent.replace(/\r\n/g, '\n');
              
              if (content.includes(target)) {
                content = content.replace(target, replacement);
                editCount++;
                console.log(`Applied single replacement at step ${obj.step_index}`);
              } else {
                console.log(`Failed single TargetContent at step ${obj.step_index}`);
              }
            }
          }
          if (tc.name === 'default_api:multi_replace_file_content' || tc.name === 'multi_replace_file_content') {
            const args = tc.arguments;
            if (args.TargetFile && (args.TargetFile.endsWith('app\\admin\\editor\\page.js') || args.TargetFile.endsWith('app/admin/editor/page.js'))) {
              const chunks = args.ReplacementChunks || [];
              let appliedAll = true;
              for (const chunk of chunks) {
                let target = chunk.TargetContent.replace(/\r\n/g, '\n');
                let replacement = chunk.ReplacementContent.replace(/\r\n/g, '\n');
                if (content.includes(target)) {
                  content = content.replace(target, replacement);
                } else {
                  console.log(`Failed multi chunk at step ${obj.step_index}: ${target.substring(0, 40)}...`);
                  appliedAll = false;
                }
              }
              if (appliedAll) {
                editCount++;
                console.log(`Applied multi replacement at step ${obj.step_index}`);
              }
            }
          }
        }
      }
    } catch (e) { }
  }

  fs.writeFileSync('scratch/recovered_page_new.js', content);
  console.log(`Done. Applied ${editCount} edits. Saved to scratch/recovered_page_new.js`);
}

recover();
