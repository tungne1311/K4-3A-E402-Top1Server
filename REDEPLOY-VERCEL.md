# Redeploy StoryboardAI lên Vercel

## 1. Lấy đúng bản mới nhất

```powershell
git checkout main
git pull origin main
```

## 2. Kiểm tra biến môi trường

Trong Vercel Project Settings → Environment Variables, tạo hoặc cập nhật:

```text
OPENAI_API_KEY=<team OpenAI key>
```

Áp dụng cho `Production`. Không commit key vào GitHub và không đưa key vào frontend.

## 3. Deploy production

Nếu đã liên kết project với Vercel:

```powershell
npx vercel --prod
```

Hoặc push branch `main` lên GitHub để Vercel tự build theo Git integration.

## 4. Kiểm tra sau deploy

Mở production URL ở cửa sổ ẩn danh, chọn mẫu C4 hoặc dán 3-5 câu, sau đó:

1. Bấm `Tiếp tục thiết lập` và chờ metadata AI điền title, goal, audience, duration.
2. Kiểm tra và sửa metadata nếu cần, rồi bấm `Phân tích cấu trúc`.
3. Vào bảng storyboard, bấm `AI tạo storyboard cho 3 cảnh`.
4. Xác nhận badge `AI thật` và output có learning point, visual intent, on-screen text, trigger, risk flag.
5. Trong DevTools → Network, xác nhận request tới `/api/lesson-meta` và `/api/storyboard` trả `200`.

## 5. Kiểm tra nhanh bằng PowerShell

Thay URL bên dưới bằng production URL thực tế:

```powershell
$url = 'https://storyboardai-top1server.vercel.app'
$meta = @{ text = 'Bài học giúp học viên phân biệt dữ liệu đầu vào và kết quả đầu ra.' } | ConvertTo-Json
Invoke-RestMethod "$url/api/lesson-meta" -Method Post -ContentType 'application/json' -Body $meta
```

Nếu route trả `404`, deploy đang thiếu file `api/lesson-meta.js` hoặc đang dùng bản deploy cũ. Nếu trả `503`, kiểm tra lại `OPENAI_API_KEY` trong đúng Vercel project và môi trường `Production`, sau đó redeploy mới.