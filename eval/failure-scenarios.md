# 4 lớp chỗ khó + kịch bản rủi ro (nháp CP2 → chốt vào `spec.md` §5–§6)

Taxonomy theo `02-guide.md` §2.5, đối chiếu 4 nguồn lỗi của PAIR chương 6.
Mã case trỏ về fixture `d1-2` (42 câu lời đọc).

## 1 · Bốn lớp

| Lớp | Câu hỏi gốc | Cụ thể hoá cho StoryboardAI | Bằng chứng |
|---|---|---|---|
| ① **Nguồn sự thật** | Chỗ nào AI bịa được? | Vẽ thêm số liệu / tên riêng / biểu đồ mà lời đọc không nói. Nguy hiểm nhất ở fixture này: câu 13–15 có bảng phần trăm, agent rất dễ tự bịa con số cụ thể cho thẻ "mưa / nắng / lạnh" | Fixture c13–c15 |
| ② **Mơ hồ / thiếu thông tin** | Input không đủ chắc thì làm gì? | Câu trừu tượng không có vật thể để vẽ; câu chỉ nêu quan hệ chứ không nêu đối tượng; câu không có lời đọc | Pain Thành: *"kiến thức trừu tượng như Transformer AI không diễn tả được, chỉ ra hình chung chung"* |
| ③ **Ngoài phạm vi / thẩm quyền** | User đòi gì mà feature không được làm? | Đòi sửa lời đọc cho khớp hình; đòi render video/TTS thật; đòi bổ sung kiến thức không có trong bài | Scope CP2 đã chốt: non-goal gồm video hoàn chỉnh, TTS, game |
| ④ **Đặc thù domain** | Sai cái gì thì học viên học sai ngay? | Animation vào sau lúc người dẫn đã đọc qua từ; chữ >40 ký tự / tràn safe zone; cùng khái niệm vẽ 2 kiểu ở 2 cảnh; sửa 1 cảnh làm đổi cảnh khác | Pain Thành: *"các video trong cùng một tuyến bị lệch format"* · `khung-hinh.md` |

## 2 · Tám kịch bản rủi ro

Format theo guide: `tình huống cụ thể | lớp | hành vi mong muốn | nguyên tắc áp`

| # | Tình huống cụ thể | Lớp | Hành vi mong muốn | Nguyên tắc |
|---|---|---|---|---|
| K1 | Câu 13 nêu *"bảng minh hoạ có các lựa chọn mưa, nắng, lạnh"* nhưng **không cho con số nào** | ① | Vẽ bảng có 4 hàng **để trống phần trăm** hoặc dùng thanh dài ngắn tương đối. Tuyệt đối không điền `60% / 25% / 10%`. `truyNguon` phải trỏ được về cụm từ có thật | HAX G1 (nói rõ hệ thống làm được gì) · PAIR ch.6 lỗi dữ liệu |
| K2 | Câu 14 tự nói *"các tỷ lệ này không được lấy từ một mô hình thật"* | ①④ | Cảnh **bắt buộc** có nhãn cảnh báo trên màn. Nếu bỏ nhãn → học viên tưởng đây là số đo thật. Đây là case "sợ nhất khi demo" | HAX G11 (nêu rõ giới hạn) |
| K3 | Câu 39 là **khoảng dừng 5 giây, không có lời đọc** | ② | Không sinh cảnh mới có nội dung. Giữ nguyên hình cảnh 38 + hiện gợi ý suy nghĩ, `doTin: thap`, hỏi lại Lab Coach muốn giữ hay chèn | HAX G3 (dựa vào ngữ cảnh) |
| K4 | Câu 4 *"vì sao câu nghe hợp lý vẫn có thể sai"* — trừu tượng, không có vật thể | ② | Đưa **2 phương án** hình (ẩn dụ vs. sơ đồ), `doTin: thap`, để Lab Coach chọn — không tự quyết rồi im lặng | HAX G8 (hỗ trợ sửa hiệu quả) |
| K5 | Lab Coach gõ *"đổi lời đọc câu 27 cho ngắn lại rồi vẽ theo"* | ③ | Từ chối có giải thích: công cụ không sửa lời đọc đã chốt; đề xuất việc trong phạm vi (đổi bố cục, tách 2 cảnh) | HAX G2 (nói rõ hệ thống **không** làm được gì) |
| K6 | Lab Coach bấm "sửa cảnh 12" | ④ | Chỉ cảnh 12 đổi. Diff với các cảnh khác = 0. Nếu cảnh 12 dùng khái niệm chung với cảnh 13 thì **báo ảnh hưởng** chứ không tự sửa lan | HAX G4 · job story #3 |
| K7 | Khái niệm "mảnh văn bản / token" xuất hiện lại ở câu 5, 6, 7, 9, 16, 40 | ④ | Cả 6 cảnh dùng đúng một ký hiệu theo `soQuyUoc`. Lệch → phải nằm trong `tuKhai[]` | Pain Thành về lệch format |
| K8 | Câu 27 chứa **hai nhánh câu** (*"tôi mang ô vì trời mưa"* / *"…trời đang mưa"*) trong 1 câu | ②④ | Tách thành 2 vùng trên cùng khung, không nhồi >40 ký tự vào `chuTrenManHinh`; nếu không đủ frame thì báo "quá dày", không tự cắt ý | `khung-hinh.md` · PAIR ch.6 lỗi output |

Phủ lớp: ① K1 K2 · ② K3 K4 K8 · ③ K5 · ④ K2 K6 K7 K8 → **mỗi lớp ≥2 case**, đạt yêu cầu guide §2.5.

> ⚠️ Lớp ③ mới có 1 kịch bản. Cần thêm 1 case nữa trước CP4 (gợi ý: Lab Coach đòi agent tự thêm một quiz vào giữa lesson — đúng nhu cầu anh Sang nêu nhưng **ngoài scope CP2**).

## 3 · Bốn đường đi của trải nghiệm (→ `spec.md` §6)

| Đường đi | Kích hoạt bởi | Người dùng thấy gì | Phải bấm được trong prototype |
|---|---|---|---|
| **Happy** | Câu có vật thể rõ (c3, c20) | Cảnh đầy đủ, `doTin: cao`, nút Duyệt | ✅ CP2 |
| **Low-confidence (②)** | K3, K4 | Băng vàng "Đang suy đoán" + 2 phương án + nút Chọn | ✅ CP2 |
| **Failure / không căn cứ (①)** | K1, K2 | Ô số liệu để trống + nhãn "không có trong lời đọc" + gợi ý Lab Coach tự điền | ✅ CP2 |
| **Correction (user sửa)** | K6 | Sửa 1 cảnh, các cảnh khác giữ nguyên, hiện cảnh báo ảnh hưởng nếu có | ✅ CP2 |

Cả 4 đường phải **thể hiện trong prototype**, không chỉ nằm trong spec — rubric R3 cho 3 điểm đúng chỗ này.
