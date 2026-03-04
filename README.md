# CORPORATE MOBILE APP (Standard 2026)

Dự án Demo: Cổng thông tin & Kết nối Hội doanh nghiệp

Dự án tập trung vào trải nghiệm người dùng bản địa (Native UX), tính bảo mật và khả năng mở rộng hệ thống theo tiêu chuẩn hiện đại nhất.

---

## Công nghệ chủ đạo (Tech Stack)

Core Framework: Expo SDK 5x (Managed Workflow) giúp tối ưu hóa việc build app và cập nhật từ xa (OTA Updates).

Navigation: Expo Router (File-based Routing). Hệ thống định tuyến hiện đại tương tự Next.js App Router.

Ngôn ngữ: TypeScript (Strict Mode). Đảm bảo an toàn kiểu dữ liệu cho toàn bộ Logic nghiệp vụ.

Giao diện (Styling): NativeWind (Tailwind CSS v4). Phát triển UI cực nhanh với tư duy Utility-first.

Quản lý dữ liệu: TanStack Query (React Query) v5. Xử lý caching, loading và đồng bộ dữ liệu server mượt mà.

Xử lý Form: Zod + React Hook Form. Validate dữ liệu chặt chẽ ngay từ phía Client.

---

## Quy chuẩn đặt tên (Naming Conventions)

Việc tuân thủ quy chuẩn giúp tránh lỗi Case-Sensitive khi build trên các môi trường Android/iOS khác nhau.

Thư mục tính năng (Features): Sử dụng kebab-case (Ví dụ: features/business-listing/).

File định tuyến (Routes): Sử dụng kebab-case (Ví dụ: app/(tabs)/home.tsx).

Thành phần UI (Components): Sử dụng PascalCase (Ví dụ: BusinessCard.tsx).

Hàm bổ trợ (Utils/Services): Sử dụng camelCase (Ví dụ: formatCurrency.ts).

---

## Cấu trúc dự án (Feature-based)

Dự án được tổ chức theo module tính năng thay vì loại file, giúp dễ dàng quản lý khi quy mô phình to.

```text
src/
├── app/                     # Routing only
│
├── features/                # Domain modules
│   ├── business/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types.ts
│   │   └── schemas.ts
│
├── components/              # Shared UI
│   ├── ui/
│   └── shared/
│
├── providers/               # Global Providers
├── lib/                     # Config, API, QueryClient
├── store/                   # Global state (future)
├── hooks/                   # Shared hooks
├── constants/
├── types/                   # Global types
└── assets/
```

---

## Luồng dữ liệu & Hiệu suất

Truy xuất dữ liệu (GET): Không gọi API trực tiếp trong Component. Luôn thông qua useQuery để tận dụng cơ chế Caching và tự động Refetch khi mất mạng.

Gửi dữ liệu (POST/PUT): Sử dụng useMutation để quản lý trạng thái gửi và cập nhật UI ngay lập tức (Optimistic Updates).

Tối ưu danh sách: Sử dụng FlashList (từ Shopify) thay cho FlatList để đảm bảo ứng dụng luôn mượt mà 60FPS ngay cả khi danh sách doanh nghiệp lên tới hàng ngàn mục.

Xử lý hình ảnh: Sử dụng expo-image để nén ảnh và hỗ trợ hiệu ứng Blur-up khi tải.

---

## Hướng dẫn cài đặt cho Team

1. Cài đặt thư viện:

```bash
npm install
```

2. Khởi chạy môi trường phát triển:

```bash
npx expo start
```

Sau khi chạy, dùng điện thoại có cài app Expo Go để quét mã QR.

3. Kiểm tra chất lượng code (Linting):

```bash
npm run lint
```

---

## Cam kết chất lượng (Quality Checks)

No Any: Tuyệt đối không sử dụng kiểu dữ liệu any.

No Console: Xóa bỏ toàn bộ console.log trước khi tạo Pull Request.

Mobile-First: Mọi giao diện phải được kiểm tra trên cả màn hình nhỏ (Android) và màn hình có tai thỏ (iOS).
