const fs = require('fs');
const readline = require('readline');

async function recover() {
  const fileStream = fs.createReadStream('c:/Users/rayan/.gemini/antigravity/brain/d7b376d0-9dd6-4adc-8f5f-29de1fba2192/.system_generated/logs/transcript_full.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let toolResponses = [];

  for await (const line of rl) {
    const data = JSON.parse(line);
    if (data.type === 'TOOL_RESPONSE' && data.content && data.content.includes('[diff_block_start]')) {
      if (data.content.includes('@@ -40,937 +40,6 @@')) {
         fs.writeFileSync('scratch/last_diff.txt', data.content);
         console.log("Found the destructive diff!");
         return;
      }
    }
  }
  console.log("Not found.");
}

recover();
