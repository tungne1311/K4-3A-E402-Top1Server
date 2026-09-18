'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
loadLocalEnv();

const { send } = require('./lib/storyboard');
const storyboardHandler = require('./api/storyboard');

function loadLocalEnv() {
  const envPath = path.join(root, '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}
function serveStatic(req, res) {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const requested = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
  if (!['index.html', 'index.css', 'app.js', 'sample-data.js'].includes(requested)) return send(res, 404, { error: 'Not found.' });
  const file = path.resolve(root, requested);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return send(res, 404, { error: 'Không tìm thấy tệp.' });
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8' };
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }); fs.createReadStream(file).pipe(res);
}
const server = http.createServer((req, res) => {
  if (req.url === '/api/storyboard') return storyboardHandler(req, res);
  if (req.method === 'GET' || req.method === 'HEAD') return serveStatic(req, res);
  send(res, 405, { error: 'Phương thức không được hỗ trợ.' });
});
server.listen(process.env.PORT || 3000, () => console.log(`StoryboardAI đang chạy tại http://localhost:${process.env.PORT || 3000}`));
