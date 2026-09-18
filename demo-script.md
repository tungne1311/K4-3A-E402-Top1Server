# Demo script - StoryboardAI

## Mục tiêu video

Video CP5 nên dài khoảng 60-90 giây nếu dùng làm backup pitch. Nếu cần bản ngắn hơn, cắt đoạn 2 và 4 nhưng giữ nguyên bước AI thật.

## Kịch bản quay màn hình

### Cảnh 1 - Nỗi đau và input (0:00-0:12)

**Thao tác:** Mở production URL, chọn `Dán lời đọc`, paste 3-4 câu lesson.

**Voice-over:**

> Lab Coach thường phải tự biến nội dung bài giảng thành storyboard: chia cảnh, chọn ý chính, timing và cách minh họa. StoryboardAI bắt đầu từ lời đọc đã chốt và giữ người làm lesson trong vòng kiểm soát.

**Text trên màn hình:**

> Từ lời đọc đến kế hoạch hình

### Cảnh 2 - AI điền metadata lesson (0:12-0:25)

**Thao tác:** Bấm `Tiếp tục thiết lập`; chờ AI điền tên lesson, mục tiêu, đối tượng và thời lượng.

**Voice-over:**

> Từ nội dung đầu vào, AI đề xuất tên lesson, mục tiêu học tập, đối tượng và thời lượng. Người dùng vẫn có thể sửa trước khi tiếp tục.

**Text trên màn hình:**

> AI đề xuất · Lab Coach duyệt

### Cảnh 3 - AI tạo storyboard thật (0:25-0:48)

**Thao tác:** Sang bảng storyboard, bấm `AI tạo storyboard cho 3 cảnh`. Chờ badge `AI thật` và hiển thị output.

**Voice-over:**

> Ở bước storyboard, AI tạo kế hoạch cho ba cảnh: người học cần hiểu gì, hình thể hiện ra sao, chữ nào hiện trên màn hình, trigger nào và cảnh có rủi ro gì.

**Text trên màn hình:**

> Một câu · Một cảnh · Một quyết định

### Cảnh 4 - Xử lý case khó (0:48-1:02)

**Thao tác:** Chọn cảnh có risk flag, chỉ vào lý do; mở `Sửa riêng cảnh` và nhập góp ý.

**Voice-over:**

> Khi câu trừu tượng, nhiều ý hoặc thiếu dữ kiện, hệ thống gắn cờ để Lab Coach kiểm tra thay vì tự đoán. Người dùng có thể sửa riêng một cảnh mà không làm thay đổi các cảnh còn lại.

**Text trên màn hình:**

> Không chắc thì gắn cờ

### Cảnh 5 - Preview và bàn giao (1:02-1:15)

**Thao tác:** Duyệt cảnh, đi đến bước 7, cuộn qua `Preview storyboard`, sau đó chỉ vào nút tải JSON/Markdown.

**Voice-over:**

> Cuối cùng, Lab Coach xem trước toàn bộ storyboard, duyệt từng cảnh và xuất bản JSON hoặc Markdown để chuyển sang khâu dựng.

**Text trên màn hình:**

> Duyệt trước · Xuất sau

## Kịch bản nói ngắn cho pitch

> Lab Coach không thiếu công cụ sinh hình; họ thiếu một bước chuyển có cấu trúc từ kiến thức sang lesson có thể sản xuất. StoryboardAI nhận lời đọc, đề xuất metadata bằng AI, tạo storyboard theo từng cảnh và đánh dấu những nơi không chắc. AI không tự xuất bản. Lab Coach kiểm tra, sửa cục bộ và duyệt trước khi bàn giao. Đây là cách chúng tôi dùng AI để giảm công việc lặp lại mà vẫn giữ quyền quyết định nội dung trong tay người làm lesson.

## Checklist quay

- [ ] Dùng production URL, không quay localhost.
- [ ] Đã cấu hình `OPENAI_API_KEY` trên Vercel.
- [ ] Mở Network/console ngoài khung hình nếu cần chứng minh endpoint, nhưng không để lộ key.
- [ ] Chọn input ngắn 3-5 câu để video không chờ lâu.
- [ ] Quay rõ badge `AI thật`.
- [ ] Quay một case có risk flag.
- [ ] Quay một lần sửa cục bộ.
- [ ] Không dùng dữ liệu cá nhân hoặc transcript nguyên bản nhạy cảm.
- [ ] Giữ video backup và slide đồng bộ với cùng một input.

## ElevenLabs voice-over

Dán riêng các đoạn `Voice-over` vào ElevenLabs; không cần đọc phần `Thao tác` hoặc `Text trên màn hình`. Giữ tốc độ khoảng 0.95-1.0 để tổng lời đọc nằm trong 60-75 giây. Nếu video chỉ cần 30 giây, dùng các câu rút gọn sau:

> Lab Coach phải tự biến lời đọc thành storyboard, chia cảnh, timing và cách minh họa. StoryboardAI dùng AI để đề xuất metadata lesson và kế hoạch hình cho từng cảnh. Case trừu tượng hoặc thiếu dữ kiện sẽ được gắn cờ thay vì đoán. Lab Coach sửa riêng từng cảnh, duyệt và xuất bản kế hoạch cho người dựng.
