'use strict';
const { generateStoryboard, send } = require('../lib/storyboard');
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { error: 'POST required.' }); }
  if (!process.env.OPENAI_API_KEY) return send(res, 503, { error: 'Vercel chưa có OPENAI_API_KEY.' });
  try {
    let body = req.body;
    if (body === undefined) {
      let raw = '';
      for await (const chunk of req) { raw += chunk; if (Buffer.byteLength(raw) > 250000) return send(res, 413, { error: 'Payload too large.' }); }
      body = raw;
    }
    if (typeof body === 'string' || Buffer.isBuffer(body)) {
      if (Buffer.byteLength(body) > 250000) return send(res, 413, { error: 'Payload too large.' });
      try { body = JSON.parse(body.toString()); } catch { return send(res, 400, { error: 'Invalid JSON.' }); }
    }
    if (Buffer.byteLength(JSON.stringify(body) || '') > 250000) return send(res, 413, { error: 'Payload too large.' });
    const scenes = body?.scenes;
    if (!Array.isArray(scenes) || scenes.length < 3 || scenes.length > 5 || new Set(scenes.map(s => s?.n)).size !== scenes.length || scenes.some(s => !s || !Number.isInteger(s.n) || typeof s.loi !== 'string' || !s.loi.trim() || s.loi.length > 1500 || !Number.isInteger(s.soFrame) || s.soFrame <= 0 || (s.chuoiMocTu !== undefined && typeof s.chuoiMocTu !== 'string') || (s.mocTu !== undefined && (!Array.isArray(s.mocTu) || s.mocTu.some(m => !Array.isArray(m) || m.length !== 2 || !m.every(Number.isInteger)))))) return send(res, 400, { error: 'Expected 3-5 valid scenes with unique IDs.' });
    return send(res, 200, { ...(await generateStoryboard(scenes)), model: 'gpt-4o-mini' });
  } catch (error) {
    const timeout = ['TimeoutError', 'AbortError'].includes(error.name);
    return send(res, timeout ? 504 : (error.status || 500), { error: timeout ? 'AI timed out. Please retry.' : (error.status ? error.message : 'AI request failed. Please retry.') });
  }
};
