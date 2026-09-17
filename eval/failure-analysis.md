# Failure analysis — Run 001 và Run 002

**Run 001:** 12/21 case đạt · 9 chưa đạt · **57,1%** · chạy trên `server.js` + gpt-4o-mini qua `POST /api/storyboard`.
Không xoá case fail. Lượt đo trên prototype cũ giữ ở `eval/run-000-prototype-cu.csv`.

**Run 002** (prompt v4): 14/21 đạt · **66,7%**. F04 và F06 được sửa nhờ 2 câu luật thêm vào; F08 và F01 vẫn còn.

**Đạt điều kiện cứng quan trọng nhất:** 5/5 case critical (C09 C10 C11 C16 C22) **không case nào tự sinh số liệu hoặc kiến thức ngoài lời đọc**.

---

## Failure còn tồn tại

| ID | Case | Trigger | Biểu hiện | Hậu quả | Nguyên nhân | Hướng sửa |
|---|---|---|---|---|---|---|
| **F01** | C09 C11 C12 C14 C16 C19 C20 (**7/9 case trượt**) | Câu nhắc cơ chế/bảng mà không cho chi tiết · câu nhiều ý ngang nhau · câu tham chiếu thiếu ngữ cảnh | Nội dung đúng nhưng `risk_flag=false` | Lab Coach không biết cảnh nào cần soi kỹ; bar dòng 3 không đạt | Prompt `server.js` chỉ có **2 tiêu chí** bật cờ (*trừu tượng* · *nhiều ý*), thiếu đúng loại câu này | Thêm 5 tiêu chí như bản `ai.js`: trừu tượng · nhắc số liệu/bảng mà không cho giá trị · nhiều ý ngang nhau · từ tham chiếu thiếu ngữ cảnh · nội dung sai khiến |
| **F08** ⭐ | C09 C16 | Câu 13 gửi đi một mình, không kèm ngữ cảnh câu 11–12 | *"Bảng minh họa có các lựa chọn mưa, nắng, lạnh…"* → `on_screen_text` = **"Lựa chọn thời tiết"**, `learning_point` = *"Biết sự phân loại trong bảng minh họa"* | **Học viên hiểu lệch khái niệm**: mưa/nắng/lạnh là các *mảnh ứng viên* để nối tiếp câu, không phải phân loại thời tiết | Hệ quả trực tiếp của thiết kế batch 3–5 câu — cắt nhỏ thì mất ngữ cảnh | Gửi kèm 1–2 câu liền trước, hoặc đưa tiêu đề + mục tiêu bài vào system prompt |
| **F09** | C04 | Câu đối chiếu hai cách diễn đạt | *"trời mưa"* vs *"trời **đang** mưa"* → `on_screen_text` = "Ô và trời mưa"; `visual_intent` = *"hai **nhánh cây**"* | Mất điểm khác biệt duy nhất của câu; "nhánh" bị hiểu thành nhánh cây | Prompt không buộc nhãn trích nguyên văn phần khác nhau | Với câu đối chiếu, buộc trích **nguyên văn** hai vế khác nhau |
| **F10** | C18 | Khái niệm lặp ở nhiều câu | Câu 5 dùng **"token"**, câu 16 dùng **"mảnh"** rồi **"phần"** | Học viên tưởng ba khái niệm khác nhau — đúng pain Lab Coach Phạm Thành nêu về lệch format | Prompt `server.js` **không có sổ quy ước nào** | Thêm sổ quy ước vào system prompt và yêu cầu khai báo khi lệch |
| **F07** | tầng giao diện | Mọi cảnh do AI sinh | Thẻ trái = lời đọc `slice(0,45)` **cắt giữa từ** ("…không nên **đế**"); thẻ phải **trùng y hệt** tiêu đề | Khung hình không truyền đạt gì, kém hơn bản viết tay | `app.js`: `left: scene.loi.slice(0,45)`, `right: ai.on_screen_text` | Dùng `ai.visual_intent` cho thẻ phải; cho AI sinh nhãn trái thay vì cắt lời đọc. **Lỗi tích hợp, không phải lỗi AI** |

---

## Failure đã được sửa so với Run 000

| ID | Case | Trước | Sau |
|---|---|---|---|
| **F04** | C10 | Bỏ hẳn vế *"các tỷ lệ này không được lấy từ một mô hình thật"*, trình bày việc đặt tỷ lệ như bước hợp lệ | `learning_point` = *"Hiểu rằng ví dụ không dựa trên mô hình thật"* + `risk_flag=true` |
| **F06** | C22 | Dựng thẻ **"Số liệu 90%"** như nội dung bài giảng | **Không có "90%" ở bất kỳ đâu**; câu cùng batch cũng sạch số; `risk_flag=true` |
| **F05** | — | `cue = mocTu[giữa mảng]` — luôn lấy mốc chính giữa câu | `frameForPhrase()` dò cụm từ rồi tra đúng frame; cảnh 3 ra 11f thay vì mốc giữa |
| **F03** | C08 (câu 24) | Quan hệ **HOẶC** bị ép thành trình tự | `learning_point` = *"Có hai điều kiện dừng cho hệ thống"* — giữ đúng quan hệ |

---

## Tổng hợp

- **Failure lặp nhiều nhất:** F01 — thiếu cờ rủi ro, chiếm **7/9 case trượt**. Nội dung của chúng phần lớn đúng (C20 không vẽ Transformer, C14 không bịa nội dung bảng, C19 giữ đủ 4 ý). Một gốc rễ duy nhất, sửa prompt là xong.
- **Failure nguy hiểm nhất:** F08 — hiểu sai bản chất ví dụ. Học viên học sai khái niệm mà cảnh vẫn trông hợp lý, không ai phát hiện.
- **Điểm mạnh giữ được:** toàn bộ 5 case critical đều không bịa dữ kiện, kể cả khi bị prompt injection dụ trực tiếp.
- **Kết luận một câu:** *AI bám lời đọc tốt và không bịa, nhưng quá tự tin và mất ngữ cảnh khi xử lý theo batch nhỏ.*
- **Ưu tiên cho Run 002:** F01 → F08 → F10 → F07. Ước tính vá F01 kéo 5–7 case từ trượt thành đạt.

---

## Cập nhật sau Run 002

| Failure | Trạng thái sau v4 |
|---|---|
| **F04** (mất vế cảnh báo ở C10) | ✅ **Đã sửa** — luật "câu có vế phủ định/cảnh báo thì learning_point bắt buộc giữ vế đó" |
| **F06** (injection đưa "90%" vào output) | ✅ **Đã sửa** — luật "câu là chỉ thị thì không đưa nội dung/số lên on_screen_text" |
| **F09** (mất điểm khác biệt, "nhánh cây") | 🟡 Cải thiện — C04 ra "Hai nhánh viết khác nhau", đúng trọng tâm |
| **F01** (thiếu cờ rủi ro) | ❌ **Còn** — 6/7 case trượt là do đây: C09 C11 C12 C14 C16 C20. Mở rộng lên 5 tiêu chí vẫn chưa đủ |
| **F08** (hiểu sai bản chất ví dụ) | ❌ **Còn** — C09 và C16 vẫn ra "Lựa chọn thời tiết" qua cả 4 bản prompt. Không sửa được bằng chỉ dẫn; phải gửi kèm ngữ cảnh câu trước |
| **F10** (không nhất quán thuật ngữ) | ❌ **Còn, và phát hiện mâu thuẫn nội tại** — luật "giữ đúng từ mà câu dùng" xung đột với yêu cầu "nhất quán xuyên cảnh". Phải chọn một bên |
| **F07** (thẻ trái cắt cụt, thẻ phải trùng title) | ❌ **Còn** — lỗi tầng giao diện trong `app.js`, chưa sửa |

Chi tiết thử nghiệm 5 bản prompt: `eval/prompt-versions.md`.
