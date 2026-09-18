'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
fs.mkdirSync(output, { recursive: true });
for (const name of ['index.html', 'index.css', 'app.js', 'sample-data.js', 'visual-story.js', 'visual-story.css']) fs.copyFileSync(path.join(root, name), path.join(output, name));
console.log('Built four public frontend files.');
