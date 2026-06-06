const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = css
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/[ \t]*([:;,{}])[ \t]*/g, '$1')
  .replace(/\s+/g, ' ')
  .replace(/\n\s*\n/g, '\n')
  .trim();

fs.writeFileSync(cssPath, css);
console.log('CSS minified');