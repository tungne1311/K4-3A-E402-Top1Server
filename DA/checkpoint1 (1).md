# 1. Kết luận từ 2 lab coach

## Lab Coach Phạm Thành

Quy trình hiện tại:
1. Lấy bài giảng đã record.
2. Chuyển giọng nói thành transcript.
3. Lọc từ thừa, đoạn ngoài lề và lấy khoảng 20% kiến thức cốt lõi.
4. Tự viết script thủ công.
5. Tự chia nội dung thành từng đoạn.
6. Tự quyết định mỗi đoạn dài bao nhiêu giây.
7. Tự quyết định đoạn đó được minh họa như thế nào.
8. Dùng một tool tạo hình và một tool tạo video.
9. Ghép các thành phần thành video hoàn chỉnh.
Pain nổi bật:
- Lên kịch bản, chia thời lượng và sắp xếp vị trí nội dung tốn nhiều công.
- Kiến thức trừu tượng như Transformer khó minh họa.
- Hình ảnh AI sinh ra còn chung chung.
- Các video trong cùng một tuyến bị lệch format và phong cách.
- Lab Coach sẵn sàng test prototype 5–10 phút.

## Lab Coach Sang

Quy trình hiện tại:
1. Cô đọng nội dung trong ngày.
2. Đưa nội dung cô đọng cho AI.
3. Chia thành các video module 5–10 phút.
4. Chèn quiz hoặc kéo thả để học viên tương tác.
5. Phải rà soát rất kỹ kiến thức trước khi đưa cho AI.
Pain nổi bật:
- Khâu cô đọng kiến thức và viết script tốn nhiều thời gian.
- AI chỉ làm tốt khi input được mô tả rất chính xác.
- Đội mới chỉ kịp làm video cho 5–6 ngày đầu.
- Các ngày sau thiếu ý tưởng và chưa kịp sản xuất.
- Storyboard có thể mở rộng thành video, truyện tương tác, game hoặc quiz.
- Lab Coach sẵn sàng test prototype.

## Insight chung

Hai người cùng xác nhận một vấn đề:
Đội sản xuất phải chuyển nội dung kiến thức thành một kế hoạch lesson cụ thể bằng tay: chia đoạn, đặt thời lượng, chọn hình thức thể hiện và kiểm tra tính nhất quán.
Đây là pain đủ mạnh hơn câu “cần AI tạo storyboard”.

# 2. User nên chọn thế nào?

## User chính

Lab Coach/người sản xuất nội dung bài giảng trực tiếp.
Đây là người:
- Cô đọng nội dung.
- Viết script.
- Chia module.
- Chọn format video/slide/game.
- Xác định hoạt động tương tác.
- Kiểm tra kiến thức trước khi đưa cho AI.
- Duyệt output trước khi sản xuất.
Trong Canvas nên ghi:
User chính: Lab Coach/người sản xuất lesson trực tiếp.

## User phụ

- Người dựng video.
- Giảng viên duyệt nội dung.
- Người thiết kế quiz/game.
- Học viên, nếu sau này nhóm đo được khả năng học hoặc mức độ tương tác.
Ở CP1 chỉ cần một user chính rõ ràng.

## Nếu không kịp phỏng vấn người thứ ba

Bổ sung mining từ:
- Fixture C4: 42 câu lời đọc.
- Các case khó được chỉ rõ:
  - Câu trừu tượng.
  - Câu chứa nhiều ý.
  - Concept lặp lại nhưng phải giữ nhất quán.
  - Câu ám chỉ số liệu nhưng không đưa số liệu.
- Mẫu storyboard trong c4-storyboardai.
- Kịch bản và transcript bài giảng trong vlearn-pack.
Khi đó phải ghi rõ:
Evidence gồm:
- 2 cuộc phỏng vấn người dùng chuyên môn.
- Mining fixture C4 và tài liệu sản xuất được cung cấp.

# 4. Định hình bài toán

## Problem statement

Lab Coach và người sản xuất lesson phải chuyển nội dung bài giảng
đã cô đọng thành một kế hoạch lesson có cấu trúc: chia module,
chia thời lượng, xác định ý chính, chọn hình thức thể hiện và
thiết kế hoạt động tương tác. Họ hiện phải làm phần lớn công việc
thủ công, khiến quá trình sản xuất chậm, khó mở rộng và dễ lệch
format giữa các video.
Problem statement này không chứa chữ AI.

## Core JTBD

Biến nội dung bài giảng đã cô đọng thành một kế hoạch lesson
ngắn, rõ, nhất quán và có thể đưa vào sản xuất.

Phiên bản cụ thể hơn cho C4:

Biến lời đọc đã chốt thành kế hoạch cho từng cảnh,
gồm ý cần truyền đạt, hình thức thể hiện, thời lượng
và hoạt động tiếp theo để người dựng có thể triển khai lesson.

## Job stories

When tôi có transcript hoặc nội dung cô đọng của một bài giảng,
I want to chia nó thành các module và cảnh có mục tiêu rõ ràng,
so I can sản xuất video/lesson nhanh hơn mà không bỏ sót ý chính.

When một khái niệm khó hoặc trừu tượng xuất hiện,
I want có vài phương án thể hiện phù hợp,
so I can chọn cách giúp học viên dễ hiểu hơn.

When tôi sửa một cảnh hoặc một module,
I want chỉ phần liên quan được cập nhật,
so I can tránh phải làm lại toàn bộ lesson.

# 5. Canvas CP1 hoàn chỉnh

Anh có thể dùng nội dung dưới đây để điền form.

## Ô 1: Hướng, user và job

Track C · Lesson Studio · C4 StoryboardAI

User chính:
Lab Coach/người sản xuất nội dung bài giảng trực tiếp.

Job:
Biến nội dung bài giảng đã cô đọng thành một kế hoạch lesson
có cấu trúc, gồm các module/cảnh, ý chính, thời lượng,
hình thức thể hiện và hoạt động tương tác để đưa vào sản xuất.

## Ô 2: Pain và evidence

Pain:
Lab Coach phải thủ công chuyển nội dung bài giảng thành script,
chia thời lượng, chọn cách minh họa và thiết kế hoạt động cho
từng module. Việc này tốn thời gian, khó thể hiện kiến thức
trừu tượng và dễ làm các video trong cùng tuyến bị lệch format.

Evidence ban đầu:
- Phỏng vấn Lab Coach Phạm Thành: khâu tốn nhiều thời gian là
  lên kịch bản, phân bổ số giây và sắp xếp vị trí xuất hiện
  của từng phần nội dung.
- Phỏng vấn Lab Coach Sang: đội phải tự cô đọng kiến thức,
  viết script và rà soát nội dung trước khi đưa cho AI; đội
  mới chỉ kịp làm video cho 5–6 ngày đầu.
- Fixture C4 có 42 câu lời đọc và các case khó gồm câu trừu tượng,
  câu chứa nhiều ý, concept lặp lại và câu ám chỉ số liệu
  nhưng không cung cấp con số.
Nên dùng câu trong transcript như quote, nhưng cần ghi nguồn:

Nguồn: Transcript phỏng vấn Lab Coach Phạm Thành, 16/09/2026.
Nguồn: Transcript phỏng vấn Lab Coach Sang, 16/09/2026.

## Ô 3: Lát cắt prototype

Có hai hướng khả thi.

### Hướng an toàn, sát C4

Một Lab Coach · có lời đọc của một lesson 10 câu · AI tạo
kế hoạch cho từng cảnh gồm ý cần thấy, chữ trên màn hình,
ý đồ hình và thời điểm xuất hiện · Lab Coach duyệt hoặc sửa
riêng từng cảnh.

### Hướng mở rộng, sát nhu cầu Sang hơn

Một Lab Coach · có nội dung bài giảng đã cô đọng · AI đề xuất
cấu trúc lesson 5–10 phút gồm các module, hình thức thể hiện
và một hoạt động tương tác · Lab Coach duyệt một module trước
khi đưa vào sản xuất.

## Khuyến nghị chọn hướng nào?

Cho CP1, có thể trình bày vision rộng hơn:
AI Lesson Planner hỗ trợ Lab Coach chuyển nội dung bài giảng thành lesson có thể sản xuất.
Nhưng prototype CP2 nên chọn lát cắt hẹp:
Tạo storyboard cho 10 câu lời đọc của một module 5–10 phút.
Lý do:
- Bám đúng đề C4.
- Có fixture sẵn.
- Demo được trong 5 phút.
- Dễ xây golden set.
- Dễ đo output.
- Vẫn mở đường sau này sang slide, quiz, game hoặc video.

## Ô 4: Automation và willing users

Automation:
Augment/Conditional.

AI đề xuất cấu trúc lesson và storyboard, nhưng Lab Coach
phải duyệt trước khi output được chuyển sang sản xuất.

Lý do:
Nếu AI tự thêm kiến thức, chọn hình sai hoặc thiết kế hoạt động
không phù hợp, lỗi có thể lan sang video và khiến học viên hiểu
sai. Chi phí kiểm tra sớm thấp hơn chi phí sửa sau khi đã dựng.

Willing users:
- Phạm Thành · Lab Coach · sẵn sàng test prototype 5–10 phút.
- Sang · Lab Coach · sẵn sàng test prototype.
Nên xin phép hai anh xác nhận rõ:
“Bọn em có thể ghi anh là willing user, sẵn sàng dùng thử prototype ở CP5 không ạ?”

# 6. Cách mô tả solution trong CP2

## Tên tạm thời

LessonFlow AI
StoryboardAI for Lesson Production	

## Solution statement

Một công cụ hỗ trợ Lab Coach biến transcript hoặc nội dung
bài giảng cô đọng thành lesson plan có cấu trúc. Công cụ phân
chia nội dung thành module/cảnh, đề xuất mục tiêu từng đoạn,
thời lượng, hình thức thể hiện và hoạt động tương tác. Lab Coach
có thể xem nguồn, sửa từng phần và duyệt output trước khi sản xuất.

## Flow CP2

1. Lab Coach nạp transcript/nội dung cô đọng.
2. Chọn mục tiêu lesson và thời lượng mong muốn.
3. AI phân tích nội dung thành các module.
4. AI tạo storyboard cho từng câu/cảnh.
5. Mỗi cảnh hiển thị:
   - Nội dung chính.
   - Ý cần truyền đạt.
   - Hình thức thể hiện.
   - Thời lượng.
   - Chữ trên màn hình.
   - Hoạt động tương tác nếu phù hợp.
6. Lab Coach sửa một cảnh hoặc một module.
7. Chỉ phần được chọn được tạo lại.
8. Lab Coach duyệt và xuất lesson plan.

## CP2 chưa cần làm

- Video hoàn chỉnh.
- Sinh toàn bộ hình ảnh chất lượng cao.
- Text-to-speech.
- Game hoàn chỉnh.
- Deploy production.
- Hỗ trợ mọi loại lesson.
- Tự động xuất bản nội dung.

# 7. Có nên mở rộng sang video, slide, game không?

Có thể mở rộng ở vision, nhưng không nên mở rộng phạm vi prototype ngay.
Cách nói đúng:
Vision dài hạn:
Storyboard không chỉ là kế hoạch hình cho video; cùng một
nội dung lesson có thể được chuyển thành video, slide tương tác,
truyện tranh, quiz hoặc game.

Phạm vi Hackathon:
Nhóm tập trung vào một lát cắt C4: từ lời đọc 10 câu tạo
storyboard có thể duyệt và chỉnh sửa từng cảnh.
Điều này vừa tiếp thu góp ý của Sang, vừa không biến đề thành sản phẩm quá rộng.
Nếu nhóm chọn làm game/video ngay từ CP2, rủi ro là:
- Không còn rõ output chính.
- Khó định nghĩa quality bar.
- Khó xây golden set.
- Khó demo end-to-end.
- Dễ bị đánh giá là “ý tưởng lớn nhưng chưa giải quyết một job cụ thể”.

# 8. Nghiên cứu giải pháp tương tự

Mỗi thành viên nghiên cứu một sản phẩm, khoảng 15 phút.

## Sản phẩm nên xem

### 1. Canva hoặc Adobe Express

Học:
- Template và cấu trúc scene.
- Cách người dùng chỉnh từng phần.
- Cách preview output.
Né:
- Quá thiên về hình đẹp nhưng không đảm bảo đúng ý dạy học.
- Không giải quyết sâu việc bám nội dung.

### 2. Gamma hoặc Tome

Học:
- Chuyển nội dung thô thành cấu trúc presentation.
- Chỉnh từng block.
- Tạo nhanh bản nháp.
Né:
- Có xu hướng tự quyết định layout quá nhiều.
- Không đảm bảo timing theo lời đọc.
- Có thể thêm thông tin không nằm trong input.

### 3. Lumen5 hoặc Pictory

Học:
- Chuyển script thành scene.
- Gắn text và media vào từng đoạn.
- Tách nội dung thành các đoạn nhỏ.
Né:
- Stock footage có thể không phù hợp kiến thức trừu tượng.
- Không đảm bảo tính nhất quán của khái niệm.
- Không có workflow duyệt nội dung đủ chặt.

### 4. Storyboarder hoặc Boords

Học:
- Mỗi cảnh là một đơn vị độc lập.
- Dễ chỉnh sửa từng frame/cảnh.
- Có thể xem toàn bộ sequence.
Né:
- Thiên về storyboard thủ công.
- Không tự hiểu mục tiêu kiến thức.
- Không tự kiểm tra claim trong nội dung.

### 5. Canva Magic Design / AI presentation tools

Học:
- Tạo nhiều phương án nhanh.
- Người dùng chọn rồi chỉnh.
Né:
- Output đẹp nhưng có thể không đúng sư phạm.
- Không thể hiện rõ tại sao một cảnh được đề xuất.

## Format nghiên cứu bắt buộc

Mỗi sản phẩm ghi 4 dòng:
Sản phẩm:
Flow giải job:
Điều đáng học:
Điều đáng né:
LessonFlow AI khác gì:
Sản phẩm: Lumen5
Flow: Dán script → hệ thống chia scene → gợi ý hình/video → preview.
Đáng học: chia script thành các scene rõ ràng.
Đáng né: chọn media theo từ khóa có thể tạo hình sai ý.
Khác biệt: output phải bám mục tiêu dạy học, giữ quy ước hình ảnh
và cho phép Lab Coach duyệt từng scene.

# 9. Các việc CP2 cần hoàn thành

## Product/Evidence Lead

Anh phụ trách:
- Chốt user và job.
- Tổng hợp transcript phỏng vấn.
- Viết problem statement.
- Chốt lát cắt.
- Chốt non-goals.
- Chốt tiêu chí user cần output.
- Tổng hợp nghiên cứu đối thủ.
- Giải thích vì sao chọn C4 slice này.
- Chuẩn bị 1–2 input thật từ fixture.
- Xác nhận willing users.

## Prototype Lead

Phụ trách:
- Flow bấm được.
- Input transcript.
- Màn hình danh sách module/cảnh.
- Màn hình chi tiết một cảnh.
- Nút sửa/regenerate riêng cảnh.
- Mock output cho CP2.
- Commit đầu tiên vào repo.

## Prompt/Eval Lead

Ở CP2 nên làm bản nháp:
- Input schema.
- Output schema.
- Prompt sơ bộ.
- Các rule không được thêm số liệu.
- Danh sách 8 failure case ban đầu.
- Dự kiến quality dimensions.
Chưa cần hoàn thành golden set ở CP2, nhưng nên bắt đầu.

## Demo/Spec Lead

Phụ trách:
- Ghi lại quyết định của nhóm.
- Chuẩn bị ảnh/video flow.
- Viết phần CP2 submission.
- Chuẩn bị demo script.
- Đảm bảo flow đi từ input đến output.
- Theo dõi commit và link repo.

# 10. Phần 2.3 đến 2.7 ai làm?

Đúng là anh không cần tự làm hết. Nhưng anh vẫn phải giữ quyền quyết định sản phẩm.

| Phần | Người chính | Anh cần làm gì |
| --- | --- | --- |
| §2.3 Nghiên cứu solution tương tự | Cả team, Demo/Spec tổng hợp | Chốt tiêu chí sản phẩm nào đáng học |
| §2.4 Automation level | Product + Prototype | Anh chốt Augment/Conditional |
| §2.5 HAX/PAIR principles | Product + Prototype | Anh duyệt nguyên tắc có phù hợp user không |
| §2.6 Failure scenarios | Prompt/Eval lead | Anh kiểm tra có đúng pain và domain không |
| §2.7 Golden set/quality bar | Prompt/Eval lead | Anh duyệt quality bar trước khi khóa |
| §2.8 Prototype design | Prototype lead | Anh kiểm tra có đúng lát cắt không |

Lưu ý template chính thức của nhóm đánh số các mục hơi khác guide. Vì vậy team nên bám template spec.md, nhưng dùng nội dung §2.3–§2.7 của guide để triển khai.

## Vai trò của anh là Product Lead

Anh không cần tự viết toàn bộ prompt hay code. Anh cần đảm bảo:
1. Prototype giải đúng pain đã phỏng vấn.
2. Scope không phình thành “làm mọi loại lesson”.
3. Output phù hợp workflow Lab Coach.
4. Quality bar đo đúng giá trị user.
5. Các failure quan trọng không bị bỏ qua.
6. Mọi quyết định thiết kế đều quay lại evidence.

# 11. Handoff message anh có thể gửi vào team

Team, sau khi phỏng vấn anh Thành và anh Sang, nhóm thống nhất:

User chính:
Lab Coach/người trực tiếp sản xuất lesson.

Pain:
Việc chuyển nội dung bài giảng cô đọng thành module/cảnh,
chia thời lượng, chọn hình thức thể hiện và hoạt động tương tác
hiện vẫn làm thủ công, khiến sản xuất chậm và output dễ lệch
format hoặc khó thể hiện kiến thức trừu tượng.

Vision:
LessonFlow AI hỗ trợ biến nội dung bài giảng thành lesson plan
có cấu trúc, có thể dùng cho video, slide, quiz hoặc game.

Scope Hackathon:
Chỉ làm lát cắt C4: từ lời đọc 10 câu tạo storyboard cho từng
cảnh, có ý cần truyền đạt, hình thức thể hiện, chữ trên màn hình,
timing và khả năng sửa từng cảnh.

Product/Evidence:
- Hoàn thiện Canvas, JTBD, evidence và competitor research.
- Xác nhận 2 willing users.
- Chốt problem statement, scope và non-goals.

Prototype:
- Dựng flow CP2 từ input transcript đến storyboard output.
- Có màn hình sửa/regenerate một cảnh.

Prompt/Eval:
- Thiết kế output schema.
- Chuẩn bị prompt sơ bộ.
- Liệt kê failure scenarios và tiêu chí đánh giá.

Spec/Demo:
- Tổng hợp quyết định vào spec.
- Chuẩn bị flow/demo CP2.

# 12. Kết luận để nộp CP1

Bản CP1 mạnh nhất hiện tại là:

Track C · C4 StoryboardAI

User:
Lab Coach/người sản xuất lesson.

Pain:
Chuyển nội dung bài giảng thành lesson có thể sản xuất vẫn
phụ thuộc nhiều vào thao tác thủ công: lọc ý, chia module,
chia thời lượng, chọn hình thức thể hiện và giữ nhất quán.

Evidence:
2 cuộc phỏng vấn Lab Coach + fixture C4 + tài liệu sản xuất.

Lát cắt:
Một Lab Coach · có lời đọc 10 câu · AI tạo storyboard cho từng
cảnh · Lab Coach duyệt hoặc sửa riêng một cảnh.

Automation:
Augment/Conditional, vì output phải được người có chuyên môn duyệt.

Willing users:
Phạm Thành · Lab Coach.
Sang · Lab Coach.