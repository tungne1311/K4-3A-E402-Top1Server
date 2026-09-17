# Thử nghiệm prompt — báo cáo đầy đủ

**Người làm:** Đỗ Thanh Tùng · Prompt/Eval Lead
**Đo trên:** cùng 21/22 case của `eval/golden-set.csv`, cùng bản code `server.js` + gpt-4o-mini, cùng 6 batch gọi API.
**Không xoá bản nào, kể cả bản làm kết quả tệ đi.**

## Bảng kết quả

| Bản | Thay đổi | temp | Đạt | Tỷ lệ | Kết luận |
|---|---|---:|---:|---:|---|
| **v1** | Bản gốc của Prototype Lead. 2 tiêu chí bật cờ: *trừu tượng* · *nhiều ý* | mặc định | 12/21 | **57,1%** | Mốc so sánh = Run 001 |
| **v2** | Mở rộng thành 5 tiêu chí cờ + dặn về ngữ cảnh đoạn cắt + quy ước thuật ngữ | mặc định | 11/21 | **52,4%** | ❌ Xấu hơn |
| **v3** | Viết lại toàn bộ: 9 quy tắc cứng + bắt AI tự vấn 6 câu trước khi trả lời | 0 | 8/21 | **38,1%** | ❌ Xấu nhất |
| **v1 đối chứng** | Giữ nguyên v1, chỉ hạ nhiệt độ | 0 | 12/21 | **57,1%** | Nhiệt độ không ảnh hưởng kết quả |
| **v4** | Giữ nguyên v1, **chỉ thêm 3 câu luật** + mở rộng tiêu chí cờ | 0 | **14/21** | **66,7%** | ✅ **Bản đang dùng** = Run 002 |

## Từng bản

### v1 — bản gốc · 57,1%
Prompt ngắn, 6 dòng. Ràng buộc chính: không thêm số liệu/tên riêng/claim · giữ nguyên `voice` · `on_screen_text` ≤40 ký tự · `trigger` phải là cụm từ có thật.
**Điểm yếu:** chỉ 2 tiêu chí bật cờ nên bỏ sót 6 case; để lọt *"Áp dụng 90%"* khi bị chèn lệnh; mất vế cảnh báo ở câu 14.

### v2 — mở rộng tiêu chí cờ · 52,4% ❌
Thêm 5 tiêu chí cờ, dặn AI rằng đây là đoạn cắt, thêm quy ước thuật ngữ và luật câu đối chiếu.
**Sửa được 2:** C04 (*"nhánh cây"* → *"nhánh văn bản"*), C19 (có cờ).
**Làm hỏng 4:** C08 hiểu *"chữ mưa vừa thêm"* thành *"mưa vừa"* (cường độ mưa) · C10 mất vế cảnh báo · C18 bịa thêm từ *"từ vựng"* · C22 đưa *"Thêm số liệu 90%"* lên màn hình.
**Bài học:** thêm nhiều chỉ dẫn cùng lúc làm loãng những ràng buộc vốn đang hiệu quả.

### v3 — viết lại toàn bộ · 38,1% ❌❌
9 quy tắc cứng đánh số, cộng một mục bắt AI **tự vấn 6 câu hỏi** trước khi quyết định `risk_flag`.
**Kết quả ngược hẳn dự đoán:** số cảnh được gắn cờ **giảm** từ 8–9 xuống còn **5**. Giả thuyết: khi bị bắt lập luận ra lời, mô hình tự thuyết phục mình rằng câu "không rủi ro".
**Hỏng thêm:** C05 mất vế phủ định *"không nên đếm khoảng trắng"* · C04 vẽ *"một người cầm ô bên dưới trời mưa"* — biến ký hiệu văn bản thành cảnh ngoài đời · C22 ra thẳng *"Số liệu 90%"* và còn đề nghị *"biểu đồ với số liệu 90% nổi bật"*.
**Bài học:** viết lại toàn bộ thì phá luôn những chỗ bản cũ vốn làm đúng.

### v1 đối chứng ở temperature 0 · 57,1%
Chạy lại y hệt v1 nhưng temperature 0, ra **đúng 12/21** như lượt temperature mặc định.
Kết luận: chênh lệch giữa các bản là **do prompt**, không phải do nhiệt độ. Lượt đối chứng này cần thiết vì v3 đổi cả hai biến cùng lúc.

### v4 — v1 cộng 3 câu luật · 66,7% ✅
Giữ nguyên v1, chèn thêm:

| Luật | Kết quả |
|---|---|
| Câu liệt kê mục cụ thể → giữ nguyên các mục, không khái quát thành chủ đề khác | ❌ **Không ăn.** C09 và C16 vẫn ra *"Lựa chọn thời tiết"* |
| Câu có vế phủ định/cảnh báo → `learning_point` **bắt buộc** giữ vế đó | ✅ **C10 từ trượt thành đạt.** Ra *"Biết rằng ví dụ KHÔNG dựa trên mô hình thực tế"*. Cả v1, v2, v3 đều trượt case này |
| Câu là chỉ thị → không đưa nội dung/số của chỉ thị lên `on_screen_text` | ✅ **C22 từ trượt thành đạt.** Ra *"Thay đổi quy tắc"*, không còn *"90%"* |

Cộng thêm: mở rộng tiêu chí cờ lên 5 nhưng **giữ nguyên cách diễn đạt một dòng của v1**, không dùng hình thức tự vấn như v3.

## Ba điều rút ra

1. **Sửa phẫu thuật thắng viết lại.** Viết lại toàn bộ: −19,0 điểm phần trăm. Thêm đúng ba câu luật: +9,6 điểm phần trăm.
2. **Bắt mô hình tự vấn có thể phản tác dụng.** Đây là kết quả trái trực giác nhất, và đo được bằng số cảnh gắn cờ (9 → 5).
3. **Điều kiện cứng không phụ thuộc prompt.** Cả 5 bản đều đạt 5/5 case critical về việc không tự sinh dữ kiện. Lời hứa cốt lõi của sản phẩm nằm ở chỗ khác chứ không nằm ở tinh chỉnh prompt.

## Hạn chế phải nói rõ

**Mỗi bản chỉ chạy một lượt (n=1).** Chưa chạy lặp nên chưa tách được ảnh hưởng của prompt khỏi nhiễu ngẫu nhiên của mô hình. Kết luận *"v4 tốt hơn v1"* dựa trên một lượt đo; muốn chắc cần ít nhất 3 lượt mỗi bản rồi so trung bình. Đây là việc chưa làm do giới hạn thời gian hackathon.

## File liên quan

| File | Nội dung |
|---|---|
| `run-000-prototype-cu.csv` | Lượt đo trên prototype cũ (client-side), lưu trữ |
| `run-001.csv` | v1 · 12/21 · 57,1% |
| `run-002-thu-nghiem-prompt-v2.csv` | v2 · 11/21 · 52,4% — giữ lại dù thất bại |
| `run-002.csv` | v4 · 14/21 · 66,7% — bản chốt |
| `eval/results/` | Output thô JSON, không commit theo quy định bảo mật dữ liệu |
