> ⚠️ **TÀI LIỆU CŨ — giai đoạn CP2.** Bản mock chạy hoàn toàn trong trình duyệt đã bị thay thế.
> Từ 17/9, ứng dụng cần **Node 18+** và chạy qua server để giữ khoá API ngoài trình duyệt:
>
> ```bash
> cp .env.example .env   # rồi điền OPENAI_API_KEY
> npm start              # http://localhost:3000
> ```
>
> Mở thẳng `index.html` **sẽ không gọi được AI** vì nút "Tạo bằng AI" gửi yêu cầu tới `POST /api/storyboard`.
> Giữ file này làm hồ sơ giai đoạn CP2.

# StoryboardAI · CP2 interactive mock

## Mở ứng dụng

- Mở `index.html` trực tiếp bằng trình duyệt; không cần cài dependency.
- Hoặc từ thư mục gốc repository chạy `python -m http.server 8080 --bind 127.0.0.1`, truy cập http://127.0.0.1:8080/DA/.
- Font Google là tùy chọn; offline dùng font hệ thống.
- Dữ liệu chỉ giữ trong bộ nhớ trình duyệt. Refresh sẽ mất thay đổi; hãy tải kết quả trước.

## Demo khoảng 5 phút

1. **Nạp nội dung:** chọn mẫu C4, xem 10 câu nguyên bản và thời lượng.
2. **Thiết lập:** nhập tên, mục tiêu học tập, đối tượng và thời lượng mong muốn của toàn lesson. Xem sổ quy ước.
3. **Cấu trúc:** bấm phân tích mô phỏng, xem 2 module, xác nhận mở storyboard.
4. **Storyboard:** chọn các cảnh; đối chiếu lời đọc với ý, hình và timing. Cảnh 8 có gợi ý tương tác.
5. **Sửa:** chọn cảnh bất kỳ (ví dụ cảnh 5), nhập lý do, chọn thẻ dọc hoặc sửa nhãn/bố cục. Xem trước và áp dụng; các cảnh khác không đổi.
6. **Duyệt:** xem/sửa từng cảnh, xác nhận nội dung và hình. Chưa duyệt đủ thì không thể xuất.
7. **Bàn giao:** tải JSON và Markdown. Sửa lại cảnh đã duyệt sẽ yêu cầu duyệt lại riêng cảnh đó.

## Thật và mô phỏng

**Hoạt động thật:** nhập văn bản (1–10 dòng), kiểm tra trường cơ bản, chỉnh sửa từng cảnh, lưu lịch sử trước/sau trong phiên, duyệt, tạo tệp JSON/Markdown từ trạng thái hiện tại.

**Mô phỏng:** AI phân tích, gợi ý hình và module. Mẫu C4 dùng phương án biên soạn sẵn; nội dung tự nhập được nhóm theo thứ tự và tạo khung trống để Lab Coach biên tập. Góp ý tự do được lưu, không tự được AI diễn giải. Phương án ngang/dọc là hai template có sẵn.

**Không có:** API/backend, lưu bền vững, sinh ảnh AI, video, TTS, xuất bản production hay kiểm tra ngữ nghĩa tự động. Ảnh phác được render bằng HTML/CSS; JSON chứa nhãn/bố cục, không đóng gói bitmap.

## Nguồn và thời lượng

`sample-data.js` sao chép nguyên 10 câu đầu của `../data/studio-pack/c4-storyboardai/vi-du/loi-doc-d1-2.json` (đường dẫn từ DA), gồm mốc từng từ và số frame. Thông tin tổng 42 câu trong metadata nguồn không dùng làm tổng lát cắt. Tổng hiển thị được tính từ các cảnh đang dùng.

- Nguồn mẫu: giữ nguyên timing 30 fps.
- Nội dung riêng: ước tính 3 từ/giây, chưa có mốc từng từ; cần xác minh khi dựng.
- Mục tiêu 5–10 phút là định hướng toàn lesson, không phải thời lượng giả của 10 câu.
- Gợi ý tương tác chưa được cộng vào thời lượng.

## Kiểm tra

Từ repository root:

```powershell
node --check DA/app.js
node --check DA/sample-data.js
node DA/test-workflow.cjs
```

Test dùng DOM stub để kiểm tra logic; không thay thế kiểm thử hiển thị và tải tệp trong trình duyệt. Cần kiểm tra thủ công desktop/mobile, font, bàn phím và cả hai lượt tải.

## Tệp

- `index.html`: khung ứng dụng.
- `index.css`: design system và responsive.
- `app.js`: workflow, chỉnh sửa, kiểm tra, duyệt và xuất.
- `sample-data.js`: dữ liệu nguồn C4.
- `test-workflow.cjs`: kiểm tra logic bằng Node, không dependency.
- `checkpoint1 (1).md`: tài liệu đầu vào, giữ nguyên.
