const fs = require('fs');
const readline = require('readline');

async function recover() {
  const fileStream = fs.createReadStream('c:/Users/rayan/.gemini/antigravity/brain/d7b376d0-9dd6-4adc-8f5f-29de1fba2192/.system_generated/logs/transcript_full.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (line.includes('@@ -40,937 +40,6 @@')) {
       fs.writeFileSync('scratch/last_diff.txt', line);
       console.log("Found it!");
       return;
    }
  }
  console.log("Not found.");
}

recover();
