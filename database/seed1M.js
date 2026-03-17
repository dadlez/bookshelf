const { spawn } = require('child_process');
const path = require('path');

const script = path.join(__dirname, 'seed10k.js');

for (let i = 1; i <= 100; i++) {
  console.log(`\n=== Run ${i}/100 ===`);
  const child = spawn('node', [script], { stdio: 'inherit', env: process.env });
  child.on('close', (code) => {
    if (code !== 0) console.error(`Run ${i} exited with code ${code}`);
  });
}
