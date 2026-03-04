export interface AdminProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  phone: string;
  department: string;
  permissions: string[];
  language: string;
  notifications: string;
}

export const ADMIN_PROFILE_MOCK: AdminProfile = {
  id: "ADM-9988-X2",
  name: "Quản trị viên",
  username: "admin_hethong",
  email: "admin@hoidoanhnghiep.vn",
  role: "Quản trị viên cấp cao",
  status: "Đang hoạt động",
  lastLogin: "10/02/2026 08:45 AM",
  phone: "090 123 4567",
  department: "Ban Công nghệ & Truyền thông",
  permissions: [
    "Quản lý hội viên",
    "Phê duyệt bài đăng",
    "Quản lý giao dịch",
    "Cài đặt hệ thống",
  ],
  language: "Tiếng Việt (VN)",
  notifications: "Bật (Email & Web)",
};

export const ADMIN_ACTIVITY_MOCK = [
  {
    title: "Đăng nhập thành công",
    time: "Hôm nay, 08:45 AM",
    isRecent: true,
  },
  {
    title: "Phê duyệt 5 bài đăng",
    time: "Hôm qua, 14:20 PM",
    isRecent: false,
  },
  {
    title: "Cập nhật trạng thái hội viên",
    time: "08/02/2026, 09:15 AM",
    isRecent: false,
  },
];
