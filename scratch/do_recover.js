const fs = require('fs');
const readline = require('readline');

async function recover() {
  const transcriptPath = 'C:/Users/rayan/.gemini/antigravity/brain/ae874839-626e-49d0-a534-17ff832b103e/.system_generated/logs/transcript_full.jsonl';
  
  // Base version of page.js (the one in git right now because git checkout was run)
  let content = fs.readFileSync('app/admin/editor/page.js', 'utf-8');

  const rl = readline.createInterface({
    input: fs.createReadStream(transcriptPath),
    crlfDelay: Infinity
  });

  let editCount = 0;

  for await (const line of rl) {
    try {
      const obj = JSON.parse(line);
      // Tool calls are in the PLANNER_RESPONSE or ACTION_RESULT?
      // Actually they are in 'tool_calls' array in PLANNER_RESPONSE
      if (obj.tool_calls && Array.isArray(obj.tool_calls)) {
        for (const tc of obj.tool_calls) {
          if (tc.name === 'default_api:replace_file_content' || tc.name === 'replace_file_content') {
            const args = tc.arguments;
            if (args.TargetFile && args.TargetFile.endsWith('app\\admin\\editor\\page.js') || args.TargetFile.endsWith('app/admin/editor/page.js')) {
              // Apply replacement
              const target = args.TargetContent;
              const replacement = args.ReplacementContent;
              if (content.includes(target)) {
                content = content.replace(target, replacement);
                editCount++;
                console.log(`Applied single replacement at step ${obj.step_index}`);
              } else {
                console.log(`Failed to match TargetContent at step ${obj.step_index}`);
              }
            }
          }
          if (tc.name === 'default_api:multi_replace_file_content' || tc.name === 'multi_replace_file_content') {
            const args = tc.arguments;
            if (args.TargetFile && args.TargetFile.endsWith('app\\admin\\editor\\page.js') || args.TargetFile.endsWith('app/admin/editor/page.js')) {
              const chunks = args.ReplacementChunks || [];
              let appliedAll = true;
              for (const chunk of chunks) {
                if (content.includes(chunk.TargetContent)) {
                  content = content.replace(chunk.TargetContent, chunk.ReplacementContent);
                } else {
                  console.log(`Failed to match multi chunk at step ${obj.step_index}: ${chunk.TargetContent.substring(0, 50)}`);
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
