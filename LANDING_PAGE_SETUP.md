# Landing Page & Auth Features Documentation

## 📁 Cấu Trúc Thư Mục

```
features/auth/
├── components/
│   ├── AuthModal.tsx       # Modal chứa form đăng nhập/đăng ký
│   └── LoginForm.tsx       # Form đăng nhập
├── hooks/
│   └── useAuth.ts          # Custom hook quản lý state đăng nhập
├── services/
│   └── auth.api.ts         # Mock API service cho authentication
├── data/
│   └── mockUsers.ts        # Mock data cho user testing
└── index.ts                # Export tất cả modules

components/ui/
├── Button.tsx              # Component nút bấm
├── Input.tsx               # Component input field
└── index.ts                # Export UI components

app/
└── index.tsx               # Landing page
```

## 🎯 Tính Năng Chính

### Landing Page (`app/index.tsx`)

- Hero banner với hình ảnh nền
- Hiển thị thông tin doanh nghiệp
- 2 nút CTA: "Đăng ký hội viên ngay" và "Tìm hiểu thêm"
- Section hiển thị các tính năng chính
- Hiển thị thông tin user nếu đã đăng nhập

### Authentication (`features/auth/`)

#### AuthModal Component

- Modal slide up từ dưới
- Chứa form đăng nhập/đăng ký
- Có nút đóng và keyboard handling

#### LoginForm Component

- 2 tab: Email và Số điện thoại
- Validation form client-side
- Hiển thị thông tin tài khoản demo
- Nút "Điền thông tin demo" để test
- Hiển thị danh sách tài khoản demo
- Social login (GitHub, Facebook)
- Link "Quên mật khẩu?"
- Link "Chưa có tài khoản? Đăng ký ngay"

#### useAuth Hook

- Quản lý state đăng nhập/đăng xuất
- Xử lý error
- Loading state

#### Mock Data

```typescript
Admin:
  Email: admin@hoioan.vn
  Password: admin123
  Phone: 0123456789

Member:
  Email: member@hoioan.vn
  Password: member123
  Phone: 0987654321
```

## 🔐 Quy Trình Đăng Nhập

1. User nhấn "Đăng ký hội viên ngay"
2. Modal AuthModal mở lên
3. User nhập email/phone + password
4. Form validation được thực hiện
5. Gọi `authApi.login()` (simulated API call)
6. Nếu thành công:
   - Hiển thị alert success
   - Lưu user info vào state
   - Navigate tới dashboard (tabs)
7. Nếu thất bại:
   - Hiển thị error message

## 🎨 UI Components

### Button

Props:

- `title`: string - Text trên nút
- `onPress`: () => void - Function khi nhấn
- `variant`: 'primary' | 'secondary' | 'outline' - Style
- `size`: 'sm' | 'md' | 'lg' - Kích thước
- `loading`: boolean - Hiển thị spinner
- `disabled`: boolean - Disable nút

Ví dụ:

```tsx
<Button title="Đăng nhập" onPress={handleLogin} loading={isLoading} />
```

### Input

Props:

- `label`: string - Label trên input
- `placeholder`: string - Placeholder text
- `icon`: string - Material icon name bên trái
- `isPassword`: boolean - Input cho mật khẩu
- `error`: string - Error message
- `value`: string - Input value

Ví dụ:

```tsx
<Input
  label="Email"
  placeholder="Địa chỉ Email"
  icon="mail"
  value={email}
  onChangeText={setEmail}
  error={errors.email}
/>
```

## 🔄 Data Flow

```
LandingPage
  ├── renders AuthModal (khi user nhấn btn)
  │   └── contains LoginForm
  │       ├── calls useAuth hook
  │       ├── calls authApi.login()
  │       └── triggers onAuthSuccess callback
  │           └── Update parent state
  │           └── Navigate to dashboard
  ├── Displays features
  └── Shows user info (if authenticated)
```

## 📱 Responsive Design

Tất cả components sử dụng relative sizing:

- Padding/margin sử dụng fixed values
- Text responsive theo screen size
- Flex layout cho responsive positioning

## 🔗 Routing

```
index.tsx         → Landing page (initial route)
  ↓ (on Login)
(tabs)/           → Main dashboard (protected)
```

## 💡 Cách Chỉnh Sửa & Mở Rộng

### Thêm tính năng social login mới:

1. Thêm conditional render lại ở LoginForm
2. Thêm handler function, ví dụ: `handleFillDemoAccount`

### Thêm form đăng ký:

1. Tạo `SignupForm.tsx` trong `features/auth/components/`
2. Import trong AuthModal
3. Swap giữa LoginForm và SignupForm dựa vào state
4. Thêm `authApi.register()` method

### Chỉnh sửa mock users:

- Chỉnh sửa file: `features/auth/data/mockUsers.ts`

### Thêm real API calls:

1. Replace mock calls trong `authApi` với real API endpoints
2. Sử dụng fetch hoặc axios
3. Handle actual JWT tokens

## 🧪 Testing Mock Login

Tài khoản test sẵn có:

- **Admin**: admin@hoioan.vn / admin123
- **Member**: member@hoioan.vn / member123

Hoặc nhấn "Điền thông tin demo" để auto-fill form.

## 📝 Quy Ước Code

- Components: PascalCase (AuthModal.tsx)
- Folders: kebab-case (auth/, services/)
- Functions/variables: camelCase (handleLogin, authApi)
- Types: PascalCase (LoginCredentials)

---

**Last Updated**: March 2026
**Next Steps**: Integrate real backend API & add signup form
