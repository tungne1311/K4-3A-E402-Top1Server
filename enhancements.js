/* Product usability layer: custom input, metadata AI, guided editing and final preview. */
(function () {
  const bridge = window.storyboardBridge;
  const getState = () => bridge.getState();
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const maxInputCharacters = 12000;
  const originalEditPage = window.editPage;
  const originalExportPage = window.exportPage;

  function splitSentences(text) {
    const compact = text.replace(/\r/g, '').trim();
    const paragraphs = compact.split(/\n+/).map(item => item.trim()).filter(Boolean);
    const sentences = paragraphs.length > 1 ? paragraphs : (compact.match(/[^.!?。！？]+[.!?。！？]?/g) || []).map(item => item.trim()).filter(Boolean);
    return sentences.slice(0, 10);
  }

  function buildCustomSource(text) {
    return splitSentences(text).map((line, index) => {
      const words = line.split(/\s+/).filter(Boolean).length;
      const soFrame = Math.max(90, Math.min(900, Math.round(words / 3 * 30)));
      return { n: index + 1, phan: Math.floor(index / 4) + 1, loi: line, chuoiMocTu: line, mocTu: [[0, 0]], soFrame, batDauFrame: 0, ketThucFrame: soFrame };
    });
  }

  function customScene(source) {
    const title = source.loi.length > 36 ? `${source.loi.slice(0, 36).trim()}…` : source.loi;
    return {
      ...JSON.parse(JSON.stringify(source)),
      title,
      intent: `Người học cần hiểu: ${source.loi}`,
      left: 'Ý chính từ lời đọc',
      right: 'Cần minh họa',
      layout: 'Bố cục đề xuất: làm nổi bật một ý chính, giữ vùng phụ đề trống và không thêm dữ kiện.',
      style: 'flow', cue: Math.floor(source.soFrame / 2), interaction: '', approved: false,
      revision: 0, history: [], aiGenerated: false
    };
  }

  function renderInput() {
    const state = getState();
    const sample = state.mode === 'sample';
    document.querySelector('#app').innerHTML = intro(0, 'Từ lời đọc đến kế hoạch hình.', 'Nạp một đoạn nội dung đã chốt. AI sẽ dùng nội dung này để gợi ý metadata lesson và storyboard; Lab Coach vẫn là người duyệt cuối.') + `<div class="grid"><section class="card"><div class="row between"><h2>01 / Nội dung bài giảng</h2><span class="badge green">Nguồn trước, hình sau</span></div><div class="row">${btn('sample', 'Dùng mẫu C4', sample ? 'primary' : '')}${btn('custom', 'Dán lời đọc', sample ? '' : 'primary')}</div>${sample ? `<div class="notice"><div class="row"><span class="file-mark">JSON</span><div><b>${escape(C4_SAMPLE.tieuDe)}</b><br>10 / 42 câu · Timing nguồn giữ nguyên</div></div></div><div class="source-list">${C4_SAMPLE.cau.map(item => `<div class="source-line"><b>${String(item.n).padStart(2, '0')}</b><span>${escape(item.loi)}</span><small>${seconds(item.soFrame)}</small></div>`).join('')}</div>` : `<label for="transcript">Lời đọc đã chốt</label><textarea id="transcript" rows="12" maxlength="${maxInputCharacters}" placeholder="Dán lời đọc của một module/lesson. Mỗi câu nên cách nhau bằng xuống dòng hoặc dấu chấm. Ví dụ: Mô hình ngôn ngữ lớn học từ dữ liệu. Sau đó mô hình dự đoán phần tiếp theo.">${escape(state.text)}</textarea><div class="row between"><small id="input-counter">0 / ${maxInputCharacters.toLocaleString('vi-VN')} ký tự</small><small>Tối đa 10 câu/cảnh · khoảng 12.000 ký tự/lần</small></div><div class="notice warn">Khuyến nghị: mỗi lần nhập một module 5–10 phút hoặc tối đa 10 câu để AI giữ đủ ngữ cảnh và Lab Coach dễ duyệt. Không cần dán cả khóa học một lần.</div>`}<div id="input-error" class="error" role="alert"></div></section><aside class="stack"><div class="card"><div class="eyebrow">LÁT CẮT C4</div><h2>Một lesson.<br>Mười cảnh rõ ràng.</h2><p>AI tạo metadata và storyboard nháp; người làm lesson kiểm tra trước khi sản xuất.</p><div class="rule">01 · Nạp nội dung</div><div class="rule">02 · AI điền mục tiêu lesson</div><div class="rule">03 · AI tạo cảnh, người duyệt</div></div><div class="notice warn">Dữ liệu chỉ gửi tới AI khi anh bấm nút phân tích ở bước 2 hoặc tạo storyboard ở bước 4.</div></aside></div>` + footer(null, 'Tiếp tục thiết lập');
    on('sample', () => { state.mode = 'sample'; state.text = ''; state.source = C4_SAMPLE.cau.map(item => clone(item)); state.scenes = []; renderInput(); });
    on('custom', () => { state.mode = 'custom'; renderInput(); });
    const textarea = document.querySelector('#transcript');
    if (textarea) {
      const updateCounter = () => { state.text = textarea.value; const counter = document.querySelector('#input-counter'); if (counter) counter.textContent = `${textarea.value.length.toLocaleString('vi-VN')} / ${maxInputCharacters.toLocaleString('vi-VN')} ký tự`; };
      textarea.addEventListener('input', updateCounter); updateCounter();
    }
    on('next', () => {
      const text = state.mode === 'sample' ? C4_SAMPLE.cau.map(item => item.loi).join('\n') : (document.querySelector('#transcript')?.value || '').trim();
      const source = state.mode === 'sample' ? C4_SAMPLE.cau.map(item => clone(item)) : buildCustomSource(text);
      const error = document.querySelector('#input-error');
      if (state.mode === 'custom' && text.length < 20) { error.textContent = 'Hãy nhập ít nhất 20 ký tự để tạo lesson.'; return; }
      if (state.mode === 'custom' && source.length < 3) { error.textContent = 'Hãy nhập ít nhất 3 câu để chạy AI storyboard theo batch.'; return; }
      state.text = text; state.source = source; state.scenes = []; state.analyzed = false; state.metadataLoaded = false; state.metaLoading = state.mode === 'custom'; advance(1);
    });
  }

  async function loadMetadata() {
    const state = getState();
    if (!state.metaLoading || state.metadataLoaded || state.mode !== 'custom') return;
    const status = document.querySelector('#metadata-status');
    if (status) status.textContent = 'AI đang đọc nội dung để đề xuất metadata…';
    try {
      const response = await fetch('/api/lesson-meta', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: state.text }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Không tạo được metadata.');
      state.meta = { ...state.meta, title: data.title, goal: data.goal, audience: data.audience, duration: data.duration };
      state.metadataLoaded = true; state.metaLoading = false; setupPage();
    } catch (error) {
      state.metaLoading = false;
      if (status) status.textContent = `AI metadata chưa chạy: ${error.message}. Anh vẫn có thể điền tay.`;
    }
  }

  function renderSetup() {
    const state = getState();
    document.querySelector('#app').innerHTML = intro(1, 'Đặt đích đến cho lesson.', 'AI đề xuất các trường từ nội dung bước 1; anh có thể chỉnh trước khi tạo storyboard.') + `<div class="grid"><section class="card"><div class="row between"><h2>02 / Thông tin sản xuất</h2><span class="badge green">${state.metaLoading ? 'AI đang phân tích' : 'AI + người duyệt'}</span></div><p id="metadata-status" class="notice">${state.metaLoading ? 'AI đang đọc nội dung để đề xuất metadata…' : 'Các trường dưới đây là bản nháp có thể chỉnh sửa.'}</p><label for="lesson-title">Tên lesson</label><input id="lesson-title" maxlength="150" placeholder="Ví dụ: Token là gì và vì sao không phải từ nào cũng là token?" value="${escape(state.meta.title)}"><label for="lesson-goal">Sau lesson, học viên có thể…</label><textarea id="lesson-goal" maxlength="1000" placeholder="Ví dụ: giải thích được…">${escape(state.meta.goal)}</textarea><label for="audience">Đối tượng học viên</label><input id="audience" maxlength="200" placeholder="Ví dụ: học viên mới làm quen với AI" value="${escape(state.meta.audience)}"><label for="duration">Thời lượng toàn lesson mong muốn (phút)</label><input id="duration" type="number" min="1" max="60" value="${state.meta.duration}"><p class="field-help">Giới hạn metadata: 1–60 phút. Đây là mục tiêu toàn lesson; timing cảnh vẫn lấy từ lời đọc.</p><div id="setup-error" class="error" role="alert"></div></section><aside class="card">${rules()}<div class="notice warn">AI chỉ đề xuất, không khóa nội dung. Hãy kiểm tra mục tiêu có đúng với lời đọc trước khi tiếp tục.</div></aside></div>` + footer('Nội dung', 'Tạo cấu trúc lesson');
    on('back', () => navigate(0));
    on('next', () => { const meta = { title: document.querySelector('#lesson-title').value.trim(), goal: document.querySelector('#lesson-goal').value.trim(), audience: document.querySelector('#audience').value.trim(), duration: Number(document.querySelector('#duration').value) }; const error = document.querySelector('#setup-error'); if (!meta.title || !meta.goal || !meta.audience || !Number.isFinite(meta.duration) || meta.duration < 1 || meta.duration > 60) { error.textContent = 'Điền đủ các trường và chọn thời lượng từ 1 đến 60 phút.'; return; } state.meta = meta; state.metaLoading = false; advance(2); });
    loadMetadata();
  }

  function renderStructure() {
    const state = getState();
    document.querySelector('#app').innerHTML = intro(2, 'Tạo cấu trúc trước, chi tiết sau.', 'Kiểm tra mạch lesson trước khi AI tạo storyboard từng cảnh.') + `<div class="card"><div class="row between"><div><h2>Sẵn sàng tạo storyboard</h2><small>${state.source.length} câu · ${seconds(state.source.reduce((sum, item) => sum + item.soFrame, 0))} timing ${state.mode === 'sample' ? 'nguồn' : 'ước tính'}</small></div><span class="badge green">AI thật ở bước 4</span></div><div class="notice">Bước này xác nhận cấu trúc và metadata. Sang bước 4, nút “AI tạo storyboard cho 3 cảnh” sẽ gọi API thật.</div><div class="module-preview">${state.source.map(item => `<span>Cảnh ${item.n}</span>`).join('')}</div></div>` + footer('Thiết lập', 'Mở bảng storyboard');
    on('back', () => navigate(1));
    on('next', () => { state.scenes = state.source.map(customScene); state.analyzed = true; advance(3); });
  }

  function addEditGuidance() {
    const hints = { feedback: 'Ví dụ: Giữ nguyên ý, đổi sang thẻ dọc để tách hai ý song song.', 'edit-title': 'Ví dụ: Hai cách diễn đạt khác nhau', 'edit-intent': 'Mô tả một câu: người học cần hiểu điều gì?', 'edit-left': 'Ví dụ: Cách diễn đạt thứ nhất', 'edit-right': 'Ví dụ: Cách diễn đạt thứ hai', 'edit-layout': 'Ví dụ: Đặt hai thẻ song song; không thêm số liệu.', 'edit-cue': 'Frame trong thời lượng cảnh, ví dụ 120', 'edit-interaction': 'Ví dụ: Câu hỏi kiểm tra sau cảnh (không bắt buộc)' };
    Object.entries(hints).forEach(([id, placeholder]) => { const element = document.querySelector(`#${id}`); if (element) element.setAttribute('placeholder', placeholder); });
    const notice = document.querySelector('#feedback'); if (notice && !notice.previousElementSibling?.classList.contains('edit-guide')) { const help = document.createElement('p'); help.className = 'edit-guide field-help'; help.textContent = 'Chỉ sửa những gì cần cho cảnh này. Lời đọc nguồn không được thay đổi; nếu không chắc, ghi rõ để Lab Coach duyệt.'; notice.parentNode.insertBefore(help, notice); }
  }

  function renderPreview() {
    const state = getState();
    const target = document.querySelector('#app .grid');
    if (!target || document.querySelector('#storyboard-preview')) return;
    const preview = document.createElement('section'); preview.id = 'storyboard-preview'; preview.className = 'card preview-card';
    preview.innerHTML = `<div class="row between"><div><h2>Preview storyboard</h2><p>Đây là bản xem trước để duyệt nhanh; file JSON/Markdown vẫn dùng cho bàn giao.</p></div><span class="badge green">${state.scenes.length} cảnh</span></div><div class="preview-scenes">${state.scenes.map(scene => `<article><span class="num">${scene.n}</span><div><strong>${escape(scene.title)}</strong><p>${escape(scene.intent || scene.loi)}</p><small>${escape(scene.layout || 'Chưa có mô tả hình')}</small></div></article>`).join('')}</div>`;
    document.querySelector('#app').insertBefore(preview, document.querySelector('#app .footer'));
  }

  window.inputPage = renderInput;
  window.setupPage = renderSetup;
  window.structurePage = renderStructure;
  window.editPage = function () { originalEditPage(); addEditGuidance(); };
  window.exportPage = function () { originalExportPage(); renderPreview(); };
  window.__lessonflowEnhancements = { maxInputCharacters };
  if (typeof render === 'function') render();
})();
