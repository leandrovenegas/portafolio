const fs = require('fs');

function reconstruct() {
  const transcriptPath = 'C:/Users/rayan/.gemini/antigravity/brain/ae874839-626e-49d0-a534-17ff832b103e/.system_generated/logs/transcript_full.jsonl';
  const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n');

  let content = fs.readFileSync('app/admin/editor/page.js', 'utf8').replace(/\r\n/g, '\n');

  for (let line of lines) {
    if (!line) continue;
    try {
      const obj = JSON.parse(line);
      if (obj.step_index >= 527) break;

      if (obj.tool_calls) {
        for (let tc of obj.tool_calls) {
          const args = tc.args || tc.arguments;
          if (!args) continue;
          
          let targetFile = args.TargetFile;
          if (typeof targetFile === 'string' && targetFile.includes('page.js')) {
            if (tc.name === 'replace_file_content') {
              let target = args.TargetContent.replace(/\r\n/g, '\n');
              let repl = args.ReplacementContent.replace(/\r\n/g, '\n');
              if (content.includes(target)) {
                 content = content.replace(target, repl);
                 console.log('Applied replace at step', obj.step_index);
              } else {
                 console.log('Failed to apply replace at step', obj.step_index);
              }
            }
            if (tc.name === 'multi_replace_file_content') {
              for (let chunk of args.ReplacementChunks) {
                 let target = chunk.TargetContent.replace(/\r\n/g, '\n');
                 let repl = chunk.ReplacementContent.replace(/\r\n/g, '\n');
                 if (content.includes(target)) {
                    content = content.replace(target, repl);
                    console.log('Applied multi chunk at step', obj.step_index);
                 } else {
                    console.log('Failed multi chunk at step', obj.step_index);
                 }
              }
            }
          }
        }
      }
    } catch (e) {}
  }

  fs.writeFileSync('scratch/reconstructed_page.js', content);
  console.log('Done reconstructing.');
}

reconstruct();
