# eval/ — Kiểm thử & đánh giá chất lượng

**Phụ trách:** Đỗ Thanh Tùng · Prompt/Eval Lead
**Chấm vào:** R3 (11đ · `spec.md` §5–§6) và R4 (15đ · `spec.md` §7 + thư mục này)

| File | Nội dung | Trạng thái |
|---|---|---|
| `schema.md` | Input/output schema của agent | Nháp CP2 |
| `failure-scenarios.md` | 4 lớp chỗ khó + 8 kịch bản rủi ro | Nháp CP2 |
| `quality-dimensions.md` | 3 chiều chất lượng + thang 1/3/5 + quality bar | Nháp CP2 — **chốt trước 21:00 17/9** |
| `golden-set.md` | ≥20 case | Chưa làm — hạn CP3 |
| `agreement-check.md` | 2 người chấm độc lập 5 output | Chưa làm — hạn CP4 |
| `run-01.md` … | Bảng kết quả từng lượt chạy | Chưa làm — từ CP3 |
| `failure-analysis.md` | trigger → biểu hiện → hậu quả → sửa gì | Chưa làm — từ CP3 |

## Nguồn dữ liệu

- **Fixture C4:** `data/studio-pack/c4-storyboardai/vi-du/loi-doc-d1-2.json` — 42 câu lời đọc kèm mốc thời gian từng từ (30fps).
- **Bộ thứ hai (tự chuẩn bị):** trích từ `data/vlearn-pack/transcript/` — dùng cho demo.

> Theo quy định bảo mật (điều 3), **không commit data pack vào repo này**. Golden set chỉ ghi **mã câu** (ví dụ `d1-2 · c14`) kèm trích dẫn ngắn vài từ để minh hoạ.

## Lát cắt đang đo

Một Lab Coach · có lời đọc 10 câu · AI tạo storyboard cho từng cảnh · Lab Coach duyệt hoặc **sửa riêng một cảnh**.
