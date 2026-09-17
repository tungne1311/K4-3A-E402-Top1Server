# AI SPEC — StoryboardAI cho Lab Coach · Nhóm Top1Server · Zone C2

Hướng: [ ] A — VLearn  [ ] B — Trợ lý Học viên  [x] C — Lesson Studio
Đề: C4 — StoryboardAI
Loại: [ ] Tối ưu tính năng có sẵn  [x] Tính năng mới

> Trạng thái CP4: bản spec được chốt theo prototype và artifact hiện có. Các ô `[CP3-PENDING]` phải được thay bằng số liệu thật từ `eval/run-001.csv` trước khi nộp CP4; không đổi quality bar sau thời điểm chốt.

## §1. User & Job

### Job executor và workflow

Job executor là **Lab Coach/người trực tiếp sản xuất lesson**. Workflow hiện tại: lấy bài giảng đã ghi âm hoặc nội dung trong ngày; chuyển/lọc transcript; cô đọng kiến thức; viết script; chia module/cảnh; phân bổ thời lượng; chọn cách minh họa hoặc hoạt động; dùng tool sinh hình/video; ghép và rà soát trước khi bàn giao.

Chi tiết evidence nằm trong `evidence/interview-summary.md` và `evidence/interview-log.md`.

### Core JTBD

> Biến nội dung bài giảng đã cô đọng thành một kế hoạch lesson có cấu trúc, nhất quán và có thể đưa vào sản xuất.

### Problem statement

Lab Coach phải thủ công chuyển nội dung bài giảng thành module, script, storyboard và hoạt động tương tác; việc này làm quy trình sản xuất chậm, khó mở rộng và dễ lệch format giữa các video. Kiến thức trừu tượng cũng dễ bị minh họa chung chung hoặc sai ý.

### Evidence

Evidence hiện có là evidence định tính từ 2 cuộc phỏng vấn chuyên môn và mining fixture C4; Track C cho phép phỏng vấn tối thiểu 3 người và/hoặc mining tài liệu. Nhóm không claim đã có survey 20 người.

- U01 — Phạm Thành, Lab Coach, phỏng vấn 16/09/2026: khâu lên kịch bản, phân bổ thời lượng và sắp xếp nội dung tốn nhiều thời gian; kiến thức trừu tượng khó minh họa; format giữa video có thể lệch; sẵn sàng test 5–10 phút.
- U02 — Sang, Lab Coach, phỏng vấn 16/09/2026: khâu cô đọng kiến thức và lên script tốn thời gian; phải rà soát kỹ trước khi đưa cho AI; team mới kịp video 5–6 ngày đầu; sẵn sàng trải nghiệm prototype.
- Fixture C4 có 42 câu lời đọc, gồm câu trừu tượng, câu nhiều ý, concept lặp lại và câu ám chỉ số liệu nhưng không có số liệu. Đây là fixture kiểm thử, không phải survey người học.

Quotes ngắn và phương pháp ghi log: `evidence/interview-summary.md`, `evidence/interview-log.md`.

## §2. Impact & quyết định chọn

Bảng đầy đủ: `evidence/impact-table.md`.

| Ứng viên | Evidence hiện có | Tần suất/phạm vi | Chi phí hoặc hậu quả | Quyết định |
|---|---|---|---|---|
| Viết storyboard, chia cảnh và phân bổ thời lượng thủ công | U01 và U02 cùng xác nhận | Mỗi lesson/module | Tốn thời gian, khó mở rộng | **Chọn** |
| Minh họa kiến thức trừu tượng bị chung chung | U01; fixture C4 | Các câu trừu tượng/khó | Học viên có thể hiểu sai; phải sửa output | Failure/domain risk |
| Lệch format giữa các video | U01 | Xuyên suốt tuyến video | Giảm tính nhất quán, tăng review/rework | Quality dimension |
| Tạo video/game/quiz production hoàn chỉnh | Gợi ý mở rộng của U02 | Nhiều workflow | Quá rộng, khó demo và đo trong hackathon | **Loại khỏi MVP** |

Nhóm chọn pain trung tâm vì nó xuất hiện trực tiếp trong workflow của cả hai Lab Coach và khớp với fixture C4. Số phút/số lần sửa chưa được đo trong 2 cuộc phỏng vấn; nhóm không tự điền số giả và sẽ bổ sung bằng validation nếu có.

## §3. Giải pháp tương tự đã nghiên cứu

- **Canva/Adobe Express:** học cách dùng template và chỉnh từng cảnh; tránh để hình đẹp thay thế kiểm tra ý dạy học.
- **Gamma/Tome:** học cách chuyển nội dung thô thành các block có cấu trúc; tránh việc tự thêm hoặc tự quyết định nội dung ngoài input.
- **Lumen5/Pictory:** học cách chia script thành scene; tránh chọn media theo từ khóa khiến hình sai ý trừu tượng.
- **Boords/Storyboarder:** học cách xem sequence và sửa cục bộ; khác biệt của nhóm là thêm mục tiêu dạy học, quy ước hình ảnh, timing và risk flag.

## §4. Thiết kế

### Lát cắt một câu

> Một Lab Coach nạp lời đọc của một lesson ngắn; AI tạo storyboard cho từng cảnh gồm ý cần thấy, chữ trên màn hình, bố cục và timing; Lab Coach duyệt hoặc sửa riêng từng cảnh.

### Phạm vi prototype

Prototype là **Mock có AI thật ở quyết định trung tâm**. Flow hiện có: nạp lời đọc → thiết lập lesson → phân tích bằng OpenAI → xem module/cảnh → sửa riêng cảnh → kiểm tra và duyệt → xuất JSON/Markdown. Phần ảnh phác là sơ đồ HTML/CSS; chưa sinh ảnh/video production.

### Non-goals

1. Không dựng video hoàn chỉnh.
2. Không sinh giọng đọc hoặc TTS.
3. Không tự xuất bản lesson chưa được Lab Coach duyệt.
4. Không làm game/quiz hoàn chỉnh trong lát cắt này.
5. Không tự thêm kiến thức, số liệu, tên riêng hoặc claim ngoài lời đọc.

### Automation decision

Chọn **Augment/Conditional**: AI đề xuất storyboard, Lab Coach đối chiếu và duyệt. Sai một claim hoặc hình minh họa có thể lan sang thu âm, dựng hình và trải nghiệm học; chi phí kiểm tra sớm thấp hơn chi phí sửa sau khi sản xuất. Case rủi ro phải được flag hoặc giữ ở trạng thái chưa duyệt.

### Nguyên tắc HAX/PAIR

| Nguyên tắc | Áp dụng trong prototype |
|---|---|
| G1 — Làm rõ hệ thống làm được gì | Màn hình đầu nói rõ đây là kế hoạch hình nháp, không phải video production. |
| G2 — Làm rõ làm tốt đến đâu | Cảnh có risk flag; cảnh chưa đủ trường hoặc chưa kiểm được không được xuất. |
| G9 — Sửa dễ dàng | Lab Coach sửa title, intent, nhãn, layout và cue của một cảnh. |
| G10 — Thu hẹp phạm vi khi nghi ngờ | Câu trừu tượng/nhiều ý được flag để người duyệt quyết định, không tự coi là chắc chắn. |
| G11 — Giải thích vì sao | Mỗi cảnh giữ lời đọc nguồn, timing và thông tin kiểm tra để người duyệt đối chiếu. |

## §5. Kiểu lỗi — 4 lớp chỗ khó và kịch bản

Chi tiết và mapping case: `eval/failure-scenarios.md`.

| Lớp | Cụ thể hóa cho C4 | Hành vi mong muốn |
|---|---|---|
| ① Nguồn sự thật | AI thêm số liệu, tên riêng, claim hoặc chi tiết không có trong lời đọc | Không thêm; để trống/flag và yêu cầu Lab Coach bổ sung nguồn |
| ② Mơ hồ/thiếu thông tin | Câu trừu tượng, nhiều ý, có từ tham chiếu, khoảng dừng | Flag low-confidence, đưa phương án an toàn hoặc giữ nguyên, không bịa |
| ③ Ngoài phạm vi/thẩm quyền | Yêu cầu sửa lời đọc, thêm kiến thức, render video/TTS hoặc tự thêm quiz | Từ chối phần ngoài scope, nêu bước hợp lệ tiếp theo |
| ④ Đặc thù domain | Concept lặp nhưng đổi ký hiệu, chữ vượt 40 ký tự, cue lệch, hình làm sai ý học | Giữ sổ quy ước, kiểm constraint, flag và yêu cầu duyệt |

### Tám kịch bản chính

1. Câu nói về bảng minh họa nhưng không có phần trăm: không sinh số.
2. Câu nói tỷ lệ chỉ là ví dụ: hiện nhãn “minh họa/không phải số thật”.
3. Khoảng dừng không có lời: không bịa intent mới.
4. Câu trừu tượng: flag và đưa phương án an toàn.
5. User yêu cầu đổi lời đọc: giữ lời đọc nguồn, từ chối sửa ngoài scope.
6. User sửa một cảnh: chỉ cảnh đó đổi; cảnh khác diff bằng 0.
7. Concept token/mảnh văn bản lặp lại: dùng cùng quy ước.
8. Câu có nhiều ý trong thời lượng ngắn: tách bố cục hoặc flag quá tải, không tự cắt ý.

## §6. Bốn đường đi của trải nghiệm

- **Happy:** input rõ → AI tạo cảnh đủ trường → Lab Coach đối chiếu → duyệt.
- **Low-confidence:** câu trừu tượng/nhiều ý → risk flag → Lab Coach chọn/sửa phương án.
- **Failure/không căn cứ:** AI hoặc input không có dữ kiện → không thêm claim → giữ cảnh chưa duyệt và nêu lý do.
- **Correction:** Lab Coach sửa một cảnh → lưu history/revision → các cảnh khác giữ nguyên.
- **Ngoài phạm vi:** yêu cầu thêm nội dung/video/TTS → từ chối phần đó, gợi ý thao tác trong scope.
- **Domain-critical:** concept lặp, timing và chữ màn hình → kiểm sổ quy ước, frame, safe zone và giới hạn 40 ký tự.

## §7. Kiểm thử

### Chiều chất lượng

1. **Bám lời đọc/factuality:** mọi phần tử có dữ kiện phải truy được về cụm từ trong lời đọc; không thêm số liệu/claim.
2. **Nhất quán quy ước:** concept lặp dùng cùng ký hiệu/màu hoặc phải khai báo lệch trong `tuKhai`/risk flag.
3. **Khả thi dựng:** title ≤40 ký tự; nhãn ≤45 ký tự; cue nằm trong thời lượng; layout không vi phạm safe zone/timing rule.
4. **Sửa cục bộ:** sửa một cảnh không làm thay đổi các cảnh khác.

### Golden set

`eval/golden-set.csv` có 22 case:

- 8 case thường.
- 3 case lớp ①.
- 3 case lớp ②.
- 3 case lớp ③.
- 3 case lớp ④.
- 2 edge case.
- Có case từ fixture C4 và case synthetic để kiểm tra ngoài phạm vi/prompt injection.

### Quality bar chốt tại CP4

> Đạt khi **ít nhất 18/22 case (≥80%)** đạt toàn bộ tiêu chí chấm của case; đồng thời **100% critical grounding case** không thêm số liệu/claim không có căn cứ; **100% risk case bắt buộc** được flag hoặc giữ chưa duyệt; và **ít nhất 9/10 lần sửa cục bộ** không làm thay đổi cảnh khác.

Quality bar này được chốt trước khi biết kết quả cuối. Nếu lượt chạy không đạt, nhóm giữ nguyên số liệu, phân tích nguyên nhân và không đổi ngưỡng.

### Kết quả chạy

| Lượt | Tổng case | Đạt | Chưa đạt | Tỷ lệ | Đối chiếu bar | Ghi chú |
|---|---:|---:|---:|---:|---|---|
| Run 001 | 22 | [CP3-PENDING] | [CP3-PENDING] | [CP3-PENDING] | [CP3-PENDING] | Điền từ `eval/run-001.csv` sau khi team chấm xong |

Failure analysis cập nhật trong `eval/failure-analysis.md` nếu có. Không xóa case fail.

## §8. Phân công & kế hoạch

| Người | Vai trò | Trách nhiệm |
|---|---|---|
| Đỗ Thanh Tùng | Prompt/Eval Lead | Prompt/schema, golden set, scoring, run và failure analysis |
| Ninh Quang Minh | Product/Evidence Lead | User/job/pain, interview evidence, impact, scope, quality bar và review spec |
| Phạm Đức Anh | Prototype Lead | AI call, flow end-to-end, review/sửa cục bộ, trace và demo stability |
| Trần Võ Hoàng Nguyên | Demo/Spec Lead | Spec integration, README, video/slide và checkpoint forms |

Willing users: Phạm Thành — Lab Coach; Sang — Lab Coach. Hai người đã đồng ý test prototype; validation log sẽ bổ sung trước CP5 nếu thực hiện.

## §9. Changelog

| Thời điểm | Đổi gì | Vì sao |
|---|---|---|
| 16/09/2026 | Chốt lát cắt storyboard từng cảnh và sửa cục bộ | Khớp pain về viết script/chia thời lượng và khả năng demo trong hackathon |
| 17/09/2026 | Thêm risk/risk_reason và hiển thị risk trên bảng review | Cảnh trừu tượng/nhiều ý cần Lab Coach kiểm; không nên tự động coi là đúng |
| 17/09/2026 | Chốt quality bar ≥80% + điều kiện cứng | Cần chuẩn số trước CP4 và tránh đổi chuẩn sau khi thấy kết quả |
| [CP5 nếu có] | [Điền thay đổi từ user validation] | [Trỏ về feedback cụ thể] |

## Phần còn chưa hoàn thành tại CP4

- Điền số đạt/chưa đạt/tỷ lệ của `eval/run-001.csv` sau khi hoàn tất chấm.
- Bổ sung `eval/failure-analysis.md` với trigger, biểu hiện, hậu quả và sửa gì.
- Hoàn tất agreement check: 2 người chấm độc lập 5 output và ghi bất đồng.
- Validation với willing users là phần bonus, chưa xem là điều kiện của core prototype.
