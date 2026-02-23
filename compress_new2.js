const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dirs = [
  'images/Τροχός της Τύχης',
  'images/Φιγούρες αριστερά και δεξιά του τροχού της τύχης'
];

const base = 'C:/Users/NUC/Desktop/AlienInvasion';

async function run() {
  let total = 0, saved = 0, count = 0;
  for (const dir of dirs) {
    const fullDir = path.join(base, dir);
    if (!fs.existsSync(fullDir)) { console.log('Not found:', dir); continue; }
    const files = fs.readdirSync(fullDir).filter(f => /\.(png|jpg|jpeg)$/i.test(f));
    for (const file of files) {
      const inp = path.join(fullDir, file);
      const out = path.join(fullDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
      const origSize = fs.statSync(inp).size;
      try {
        await sharp(inp).webp({ quality: 88 }).toFile(out);
        const newSize = fs.statSync(out).size;
        total += origSize;
        saved += (origSize - newSize);
        count++;
        console.log(file.substring(0, 55) + ' ' + Math.round(origSize/1024) + 'KB → ' + Math.round(newSize/1024) + 'KB');
      } catch (e) {
        console.error('ERR', file, e.message);
      }
    }
  }
  console.log('\nDone: ' + count + ' files. Saved ' + Math.round(saved/1024/1024*10)/10 + 'MB of ' + Math.round(total/1024/1024*10)/10 + 'MB');
}
run();
