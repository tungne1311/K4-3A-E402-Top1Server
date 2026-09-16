# Input / Output schema — StoryboardAI (nháp CP2)

## 1. Input

Agent nhận **một cảnh mỗi lần gọi**, không nhận cả 42 câu một lượt. Lý do: pain "sửa một cảnh thì các cảnh khác không được đổi" (phỏng vấn Thành + job story #3) chỉ giữ được nếu mỗi cảnh là một đơn vị sinh độc lập.

```json
{
  "cauHienTai": {
    "n": 14,
    "loi": "Mình đặt khả năng của mưa cao hơn để dựng ví dụ dễ hình dung; ...",
    "mocTu": [[0, 0], [5, 11], [12, 24]],
    "soFrame": 204
  },
  "soQuyUoc": [
    { "ten": "mảnh văn bản (token)", "theHien": "thẻ bo góc màu xanh dương", "dungO": [5, 6, 7, 9, 16, 40] }
  ],
  "canhTruoc": { "n": 13, "yCanThay": "...", "doiTuongDaDung": ["bảng khả năng", "thẻ mảnh"] },
  "khungHinh": { "w": 1920, "h": 1080, "fps": 30, "safeZone": [80, 250, 1840, 960], "maxChu": 40 }
}
```

| Trường | Vì sao cần |
|---|---|
| `mocTu` | Cặp `[vị trí ký tự, frame]` — mốc người dẫn bắt đầu đọc từ đó. Không có thì không gắn animation đúng nhịp được |
| `soQuyUoc` | Thước đo chiều "nhất quán". Pain của Thành: *"các video trong cùng một tuyến bị lệch format"* |
| `canhTruoc` | Để khái niệm đã xuất hiện được vẽ lại **giống hệt**, không phải phát minh ký hiệu mới |
| `khungHinh` | Ràng buộc cứng từ `khung-hinh.md` — dùng để kiểm máy, không cần AI tự nhớ |

## 2. Output

Bám schema mẫu `storyboard-mau.json`, bổ sung 3 trường phục vụ eval (`doTin`, `tuKhai`, `truyNguon`):

```json
{
  "n": 14,
  "soFrame": 204,
  "yCanThay": "Tỷ lệ trên bảng là số dựng ví dụ, không phải số của mô hình thật",
  "chuTrenManHinh": "Số minh hoạ — không phải số thật",
  "boCuc": "Bảng ở giữa, nhãn cảnh báo dán chéo góc trên phải bảng",
  "nhip": [
    { "cumTu": "dựng ví dụ", "frame": 24, "hanhDong": "hiện nhãn", "doiTuong": "nhãn cảnh báo" }
  ],
  "anhPhac": "phac-c14.png",
  "truyNguon": [
    { "doiTuong": "nhãn cảnh báo", "cumTuGoc": "không được lấy từ một mô hình thật" }
  ],
  "doTin": "cao",
  "tuKhai": [],
  "trangThaiDuyet": "cho-duyet"
}
```

| Trường thêm | Công dụng |
|---|---|
| `truyNguon[]` | **Mỗi phần tử hình phải trỏ về một cụm từ có thật trong `loi`.** Đây là thứ làm chiều "bám lời đọc" đo được bằng máy thay vì bằng cảm tính |
| `doTin` | `cao` / `thap`. `thap` bắt buộc kèm ≥2 phương án trong `yCanThay` → kích hoạt đường đi low-confidence |
| `tuKhai[]` | Agent tự khai chỗ mình lệch sổ quy ước. Đề C4 yêu cầu đúng điều này |

## 3. Vì sao chọn cách này

- Kiểm `truyNguon` bằng máy: mọi `cumTuGoc` phải là substring của `loi` → phát hiện bịa dữ kiện **tự động**, không cần chấm tay.
- Kiểm `chuTrenManHinh` ≤ 40 ký tự và `nhip[].frame` khớp `mocTu` → cũng chạy bằng máy.
- Ba chiều chất lượng vì thế chỉ còn phần "ý đồ hình có đúng mục tiêu dạy học không" là chấm tay.
