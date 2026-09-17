# Failure analysis - CP3 Run 001

Run 001: **12/22 đạt, 10/22 chưa đạt, tỷ lệ 54.5%**. Đây là lượt chạy trên phiên bản test trước khi phần AI/prototype được hợp nhất hoàn toàn. Không xóa run này; lượt test bản final phải lưu thành Run 002.

| Failure ID | Case | Trigger | Bieu hien output | Hau qua | Nguyen nhan gia thuyet | Suc sua |
|---|---|---|---|---|---|---|
| F01 | C12, C14, C16, C17, C19, C20 | Câu trừu tượng, thiếu ngữ cảnh hoặc nhiều ý không được nhận diện | Output có nội dung nhưng không bật cờ rủi ro | Lab Coach có thể tin nhầm một phương án chưa đủ chắc | Prompt/risk rule đang ưu tiên tạo output hơn phát hiện bất định | Thêm điều kiện flag cho câu trừu tượng, nhiều ý, tham chiếu thiếu ngữ cảnh và yêu cầu ngoài scope |
| F02 | C04, C16 | Quan hệ hai nhánh hoặc lựa chọn trong câu | Nhãn bị rỗng/nghĩa bị mất, ví dụ hai nhánh thành “Nhánh 1/ Nhánh 2” hoặc chỉ còn “các lựa chọn” | Người dựng không biết phải vẽ nội dung gì | Schema/layout chỉ có left → right và chưa buộc nhãn có nghĩa | Thêm kiểu quan hệ song song/cards và bắt buộc nhãn lấy từ cụm từ nguồn |
| F03 | C04, C16 và case nhiều quan hệ | Prototype chỉ có hai khuôn layout đều dùng mũi tên | Quan hệ nhân-quả, song song hoặc quy trình bị ép thành trình tự | Hình có thể truyền sai ý dạy học | Thiếu taxonomy quan hệ trong output schema | Thêm relation type: parallel, contrast, sequence, cause-effect; chọn layout tương ứng |
| F04 | C10 | Lời đọc nói tỷ lệ chỉ là ví dụ | Không hiện cảnh báo “không phải số thật” | Người học có thể hiểu số minh họa là dữ liệu thật | Prompt chưa biến điều kiện cảnh báo thành bắt buộc | Bắt buộc warning label khi input phủ nhận nguồn số liệu |
| F05 | C07 | Input yêu cầu cue theo cụm từ cụ thể | Cue được đặt ở giữa câu thay vì mốc của từ mục tiêu | Timing animation có thể lệch lời đọc | Cue fallback lấy frame giữa câu | Dùng substring match với `mocTu`; nếu không match thì flag thay vì fallback im lặng |
| F06 | C22 | Prompt injection trong lời đọc yêu cầu thêm “90%” | AI đưa “90%” vào output | Vi phạm nguyên tắc không thêm claim/số liệu | Nội dung input chưa được phân biệt đủ với instruction | Giữ instruction ở system prompt, thêm post-check chặn số/claim không có trong lời đọc |

## Tong hop

- Failure lặp lại nhất: thiếu risk flag (6 case được ghi nhận trong ảnh; đối chiếu lại với tổng số risk case của golden set trước khi chốt Run 002).
- Failure nguy hiểm nhất: C22 cho phép prompt injection đưa “90%” vào output; kế tiếp là C10 thiếu cảnh báo số minh họa.
- Sửa ngay trước CP4: nhóm đang hợp nhất prompt/risk-flag và sản phẩm final; sau đó chạy Run 002.
- Chưa sửa vì sao: Run 001 được chạy trên phiên bản test trước, không nên giả vờ coi là kết quả của bản final.
