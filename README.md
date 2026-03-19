# FB Page Bot Final

Web app nội bộ cho **1 admin + 1 Facebook Page**.

## Tính năng
- Đăng nhập admin bằng tài khoản lưu trong biến môi trường
- Upload ảnh theo category
- AI tạo caption từ category + ghi chú
- Lưu dữ liệu trên Supabase
- Đăng bài Facebook Page qua Graph API
- Hẹn giờ bằng Vercel Cron gọi API publish

## Stack
- Next.js 14 App Router
- Supabase
- OpenAI
- Facebook Graph API
- Vercel Cron

## 1) Cài đặt
```bash
npm install
cp .env.example .env.local
npm run dev
```

## 2) Biến môi trường
Xem `.env.example`

## 3) Tạo bảng Supabase
Chạy SQL trong file `supabase.sql`

## 4) Deploy Vercel
- Import project lên Vercel
- Thêm env vars
- Bật Cron với route `/api/cron/publish`

## 5) Cơ chế hoạt động
1. Admin login
2. Tạo bài đăng mới
3. Upload ảnh lên URL công khai của bạn
4. AI tạo caption
5. Lưu `scheduled_at`
6. Vercel Cron sẽ quét các bài đến giờ và đăng lên Facebook

## Lưu ý
- Facebook yêu cầu Page Access Token hợp lệ
- Ảnh phải có URL public nếu đăng bằng Graph API `/photos`
- Đây là bản tối giản, 1 admin, 1 page cố định
