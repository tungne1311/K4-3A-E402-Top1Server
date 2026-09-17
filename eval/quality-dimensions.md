# Chiều chất lượng + Quality bar (nháp CP2 → **chốt trước 21:00 17/9, sau đó khoá**)

Khung chọn chiều: PAIR 2.3 (Coverage · Relevance · Diversity · Sensitivity · Realism · Factuality · Quality). Chọn 3 chiều bám đúng pain đã phỏng vấn.

## Chiều 1 · Bám lời đọc (Factuality)

> *Vì sao chọn:* pain lớn nhất của video học — thêm một con số không có thật là học viên học sai luôn. Fixture c14 nói thẳng số trên bảng là số dựng ví dụ.

| Mức | Định nghĩa kiểm chứng được |
|---|---|
| 1 | Có ≥1 phần tử hình mang dữ kiện (số, tên, quan hệ) **không** truy được về cụm từ nào trong `loi` |
| 3 | Không bịa, nhưng có chi tiết trang trí thừa không phục vụ ý dạy học |
| 5 | Mọi phần tử đều có mục trong `truyNguon[]`, và mọi `cumTuGoc` **là chuỗi con thật của `loi`** |

*Kiểm được bằng máy:* so `cumTuGoc` với `loi` bằng substring.

## Chiều 2 · Nhất quán sổ quy ước

> *Vì sao chọn:* nguyên văn pain của Lab Coach Phạm Thành — *"dù cài chung một format, hình ảnh giữa các video cùng tuyến vẫn bị lệch nhau"*.

| Mức | Định nghĩa kiểm chứng được |
|---|---|
| 1 | Cùng khái niệm dùng ký hiệu/màu khác cảnh trước, **không** khai trong `tuKhai[]` |
| 3 | Có lệch quy ước nhưng agent **tự khai đúng chỗ lệch** |
| 5 | Mọi khái niệm trong `soQuyUoc` được thể hiện đúng như đã định nghĩa |

*Case chốt chiều này:* K7 — khái niệm "mảnh văn bản" ở c5, c6, c7, c9, c16, c40.

## Chiều 3 · Khả thi dựng được

> *Vì sao chọn:* output phải đưa thẳng vào 2 tool sản xuất hiện có của Studio. Không khớp khung/timing thì Lab Coach phải làm lại tay — đúng cái mà sản phẩm hứa tiết kiệm.

| Mức | Định nghĩa kiểm chứng được |
|---|---|
| 1 | `chuTrenManHinh` >40 ký tự **hoặc** phần tử nằm ngoài safe zone (x 80–1840, y 250–960) **hoặc** mốc `nhip[].frame` lệch >15 frame (0.5s) so với `mocTu` của cụm từ tương ứng |
| 3 | Đúng khung và đúng mốc, nhưng nhồi nhiều phần tử hơn `soFrame` cho phép (giữ cảnh <60 frame/phần tử) |
| 5 | Đúng khung · đúng mốc từ · mật độ phần tử hợp thời lượng |

*Kiểm được bằng máy:* đếm ký tự, so toạ độ, so `frame` với `mocTu`.

## Quality bar — chốt tại CP4

> **Đạt khi ≥80% case trong golden set đạt toàn bộ tiêu chí của case (tương đương ≥18/22 ở bộ hiện tại)**, VÀ thoả 4 điều kiện cứng:
> 1. **0 case lớp ①** có phần tử hình không truy nguồn được — 1 case vi phạm là **trượt cả bộ**
> 2. **100%** cảnh lệch sổ quy ước đều nằm trong `tuKhai[]`
> 3. Sửa 1 cảnh → **diff các cảnh khác = 0**
> 4. **100%** case rủi ro bắt buộc được flag hoặc giữ ở trạng thái chưa duyệt

**Cần làm trước khi chốt:**
- [x] Chạy thô trên bộ fixture và xây golden set 22 case; giữ cả case thường, case khó và edge case.
- [ ] **Agreement check:** 2 thành viên chấm độc lập 5 output; lệch ≥20% là định nghĩa chưa đủ rõ, phải sửa thang trước khi khoá bar.
- [x] Product Lead duyệt: bar đo đúng ba pain chính của Lab Coach: bám lời đọc, nhất quán và khả thi dựng.

> Sau **21:00 17/9 (CP4)** không đổi bar được nữa. Số thấp vẫn đủ điểm nếu trung thực — hạ bar sau khi thấy kết quả thì mất điểm.

## Cơ cấu golden set (làm ở CP3, ≥20 case)

| Nhóm | Số case | Nguồn |
|---|---|---|
| Lớp ① | ≥2 | c13, c14, c15 |
| Lớp ② | ≥2 | c4, c38, c39 |
| Lớp ③ | ≥2 | prompt người dùng tự soạn |
| Lớp ④ | ≥2 | c5/c16/c40 (lặp khái niệm), c27 (2 nhánh) |
| Thường | 8–10 | c1, c3, c5, c17–c23 |
| Hiếm | 2–4 | c39 (dừng 5s), c42 (dẫn sang video khác) |
| **Từ dữ liệu thật** | **≥10** | toàn bộ lấy từ fixture `d1-2` — thoả yêu cầu rubric |
