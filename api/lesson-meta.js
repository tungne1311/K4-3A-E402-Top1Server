const metaSchema = {
  type: 'object', additionalProperties: false,
  properties: { title: { type: 'string' }, goal: { type: 'string' }, audience: { type: 'string' }, duration: { type: 'integer', minimum: 1, maximum: 60 } },
  required: ['title', 'goal', 'audience', 'duration']
};
const prompt = `Bạn là product designer cho Studio bài giảng. Từ nội dung transcript, đề xuất metadata lesson bằng tiếng Việt.
- title: ngắn, cụ thể, không quá 90 ký tự.
- goal: bắt đầu bằng động từ, mô tả học viên làm được gì sau lesson, không thêm kiến thức ngoài transcript.
- audience: suy ra mức người học nhưng nếu không đủ thông tin dùng "Học viên đang học chủ đề này".
- duration: số nguyên 1–60, ước tính từ độ dài nội dung; không dùng để kéo dài nội dung.
Chỉ trả JSON theo schema.`;
function send(res, status, payload) { res.status(status).json(payload); }
module.exports = async (req, res) => {
  if (req.method !== 'POST') return send(res, 405, { error: 'Chỉ hỗ trợ POST.' });
  if (!process.env.OPENAI_API_KEY) return send(res, 503, { error: 'Vercel chưa có OPENAI_API_KEY.' });
  try {
    const text = typeof req.body?.text === 'string' ? req.body.text : '';
    if (text.length < 20 || text.length > 12000) return send(res, 400, { error: 'Nội dung phải dài 20–12.000 ký tự.' });
    const response = await fetch('https://api.openai.com/v1/responses', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, body: JSON.stringify({ model: 'gpt-4o-mini', store: false, temperature: 0, input: [{ role: 'system', content: [{ type: 'input_text', text: prompt }] }, { role: 'user', content: [{ type: 'input_text', text }] }], text: { format: { type: 'json_schema', name: 'lesson_metadata', strict: true, schema: metaSchema } } }) });
    const payload = await response.json();
    if (!response.ok) return send(res, response.status, { error: payload.error?.message || 'OpenAI không trả về metadata.' });
    const outputText = payload.output_text || payload.output?.flatMap(item => item.content || []).find(item => item.type === 'output_text')?.text;
    return send(res, 200, JSON.parse(outputText));
  } catch (error) { return send(res, 500, { error: error.message || 'Lỗi server.' }); }
};
