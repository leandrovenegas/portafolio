const fs = require('fs');
const readline = require('readline');

async function recover() {
  const fileStream = fs.createReadStream('c:/Users/rayan/.gemini/antigravity/brain/d7b376d0-9dd6-4adc-8f5f-29de1fba2192/.system_generated/logs/transcript_full.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lastDiff = "";

  for await (const line of rl) {
    if (line.includes('[diff_block_start]')) {
      lastDiff = line;
    }
  }

  // Parse the last diff JSON line
  if (lastDiff) {
    const data = JSON.parse(lastDiff);
    const content = data.content || data.output || JSON.stringify(data);
    fs.writeFileSync('scratch/last_diff.txt', content);
    console.log("Extracted diff to scratch/last_diff.txt");
  } else {
    console.log("No diff found");
  }
}

recover();
