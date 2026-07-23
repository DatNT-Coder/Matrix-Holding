# Matrix Community

Website giới thiệu doanh nghiệp cho **Matrix Community** — nền tảng kết nối doanh nghiệp B2B (tra cứu định danh, kết nối đối tác, xác minh pháp lý, quảng bá doanh nghiệp). Giao diện tiếng Việt.

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (design tokens khớp Figma)
- **React Router** — điều hướng client-side
- **React Hook Form** + **Zod** — validate form
- **lucide-react** — icon
- Font **Nunito** (Google Fonts)

## Cài đặt & chạy

Yêu cầu Node.js >= 18.

```bash
npm install
npm run dev
```

Mở trình duyệt tại địa chỉ Vite in ra (mặc định http://localhost:5173).

### Build production

```bash
npm run build
npm run preview
```

## Cấu trúc thư mục

```
src/
├── components/
│   ├── auth/         # OtpStep
│   ├── layout/       # Navbar, Footer
│   └── ui/           # Button, SectionHeading, các Card, AuthFormInput, OtpInput...
├── data/
│   └── content.ts    # Toàn bộ nội dung landing (mock content)
├── layouts/          # MainLayout (Navbar+Footer), AuthLayout
├── lib/              # cn(), validation (Zod schema)
├── pages/
│   ├── auth/         # Login, Register, ForgotPassword
│   ├── Home.tsx      # Landing 13 section
│   ├── About.tsx     # Trang Giới thiệu
│   └── NotFound.tsx
├── sections/         # Các section của trang chủ (Hero, Features, Pricing...)
├── App.tsx           # Routing
├── main.tsx
└── index.css
```

## Routing

| Đường dẫn        | Trang                                     |
| ---------------- | ----------------------------------------- |
| `/`              | Trang chủ (landing)                       |
| `/gioi-thieu`    | Giới thiệu (About)                        |
| `/dang-nhap`     | Đăng nhập                                 |
| `/dang-ky`       | Đăng ký (form → OTP → hoàn tất)           |
| `/quen-mat-khau` | Quên mật khẩu (SĐT → OTP → mật khẩu mới)  |

## Design tokens

Định nghĩa trong `tailwind.config.js`:

| Token             | Giá trị     | Dùng cho                    |
| ----------------- | ----------- | --------------------------- |
| `navy`            | `#222C5D`   | Tiêu đề, nút viền           |
| `navy-dark`       | `#161F3E`   | Nền section tối             |
| `yellow-brand`    | `#FCBF49`   | Accent, CTA chính           |
| `blue-brand`      | `#002296`   | CTA phụ, viền nổi bật       |
| `cream`           | `#F7F6F2`   | Nền tổng thể                |

## Lưu ý

- **Xác thực (auth) đang là mock**: form validate đầy đủ, có trạng thái loading, nhưng chưa gọi API thật. Mã OTP bất kỳ (6 chữ số) đều được chấp nhận. Khi có backend, thay phần `setTimeout` trong `src/pages/auth/*` bằng lời gọi API thật.
- **Ảnh minh hoạ** dùng component `Placeholder` (gradient). Thay bằng ảnh thật của khách hàng khi có: đặt ảnh vào `public/` hoặc `src/assets/` rồi thay `<Placeholder />` bằng `<img />`.
- Giao diện đã **responsive** (mobile / tablet / desktop).
- Toàn bộ nội dung text là tiếng Việt, tập trung trong `src/data/content.ts` để dễ chỉnh sửa.
