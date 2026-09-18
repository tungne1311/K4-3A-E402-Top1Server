'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { generateStoryboard } = require('./lib/storyboard');
const root = __dirname;
loadLocalEnv();

const metadataSchema = { type: 'object', additionalProperties: false, properties: {
  title: { type: 'string' }, goal: { type: 'string' }, audience: { type: 'string' }, duration: { type: 'integer', minimum: 1, maximum: 60 }
}, required: ['title', 'goal', 'audience', 'duration'] };

function loadLocalEnv() {
  const envPath = path.join(root, '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}
function send(res, status, body) { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(body)); }
async function generateLessonMetadata(text) {
  if (!process.env.OPENAI_API_KEY) { const error = new Error('Chưa thấy OPENAI_API_KEY.'); error.status = 503; throw error; }
  const prompt = 'Bạn là product designer cho Studio bài giảng. Từ transcript, đề xuất metadata lesson bằng tiếng Việt. title ngắn và cụ thể; goal bắt đầu bằng động từ và chỉ dùng kiến thức trong transcript; audience suy ra nhưng nếu thiếu dùng "Học viên đang học chủ đề này"; duration là số nguyên 1-60 ước tính theo độ dài. Chỉ trả JSON theo schema.';
  const response = await fetch('https://api.openai.com/v1/responses', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, body: JSON.stringify({ model: 'gpt-4o-mini', store: false, temperature: 0, input: [{ role: 'system', content: [{ type: 'input_text', text: prompt }] }, { role: 'user', content: [{ type: 'input_text', text }] }], text: { format: { type: 'json_schema', name: 'lesson_metadata', strict: true, schema: metadataSchema } } }) });
  const payload = await response.json();
  if (!response.ok) { const error = new Error(payload.error?.message || 'OpenAI không trả về metadata.'); error.status = response.status; throw error; }
  const outputText = payload.output_text || payload.output?.flatMap(item => item.content || []).find(item => item.type === 'output_text')?.text;
  return JSON.parse(outputText);
}
function readJson(req, limit) { return new Promise((resolve, reject) => { let raw = ''; req.on('data', chunk => { raw += chunk; if (raw.length > limit) reject(Object.assign(new Error('Payload quá lớn.'), { status: 413 })); }); req.on('end', () => { try { resolve(JSON.parse(raw)); } catch { reject(Object.assign(new Error('JSON không hợp lệ.'), { status: 400 })); } }); }); }
function serveStatic(req, res) {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const requested = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
  const allowed = ['index.html', 'index.css', 'app.js', 'sample-data.js', 'visual-story.js', 'visual-story.css', 'enhancements.js'];
  if (!allowed.includes(requested)) return send(res, 404, { error: 'Not found.' });
  const file = path.resolve(root, requested);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return send(res, 404, { error: 'Không tìm thấy tệp.' });
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }); fs.createReadStream(file).pipe(res);
}
const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'POST' && req.url === '/api/lesson-meta') {
      const text = (await readJson(req, 15000)).text;
      if (typeof text !== 'string' || text.length < 20 || text.length > 12000) return send(res, 400, { error: 'Nội dung phải dài 20–12.000 ký tự.' });
      return send(res, 200, await generateLessonMetadata(text));
    }
    if (req.method === 'POST' && req.url === '/api/storyboard') {
      const scenes = (await readJson(req, 250000)).scenes;
      if (!Array.isArray(scenes) || scenes.length < 3 || scenes.length > 5) return send(res, 400, { error: 'Gửi 3–5 câu.' });
      return send(res, 200, { ...(await generateStoryboard(scenes)), model: 'gpt-4o-mini' });
    }
    if (req.method === 'GET' || req.method === 'HEAD') return serveStatic(req, res);
    return send(res, 405, { error: 'Phương thức không được hỗ trợ.' });
  } catch (error) { return send(res, error.status || 500, { error: error.message || 'Lỗi máy chủ.' }); }
});
server.listen(process.env.PORT || 3000, () => console.log(`StoryboardAI đang chạy tại http://localhost:${process.env.PORT || 3000}`));
