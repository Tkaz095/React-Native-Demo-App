import { MOCK_USERS, User } from "../data/mockUsers";

export interface LoginCredentials {
  username?: string;
  email?: string;
  phone?: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message: string;
}

/**
 * Mock API service for authentication
 * In production, this would call real backend endpoints
 */
export const authApi = {
  /**
   * Login with username, email or phone
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { username, email, phone, password } = credentials;

    const user = MOCK_USERS.find((u) => {
      const usernameMatch = username && u.username === username;
      const emailMatch = email && u.email === email;
      const phoneMatch = phone && u.phone === phone;
      return (
        (usernameMatch || emailMatch || phoneMatch) && u.password === password
      );
    });

    if (!user) {
      return {
        success: false,
        message: "Tên đăng nhập, Email hoặc Số điện thoại không chính xác",
      };
    }

    return {
      success: true,
      user,
      token: `token_${user.id}_${Date.now()}`,
      message: "Đăng nhập thành công",
    };
  },

  /**
   * Register new user
   */
  register: async (data: {
    email: string;
    phone: string;
    password: string;
    name: string;
  }): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingUser = MOCK_USERS.find(
      (u) => u.email === data.email || u.phone === data.phone,
    );

    if (existingUser) {
      return {
        success: false,
        message: "Email hoặc Số điện thoại đã tồn tại",
      };
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      username: data.email.split('@')[0], // Extract username from email
      email: data.email,
      phone: data.phone,
      password: data.password,
      name: data.name,
      role: "member",
    };

    MOCK_USERS.push(newUser);

    return {
      success: true,
      user: newUser,
      token: `token_${newUser.id}_${Date.now()}`,
      message: "Đăng ký thành công",
    };
  },

  /**
   * Reset password
   */
  resetPassword: async (email: string): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = MOCK_USERS.find((u) => u.email === email);

    if (!user) {
      return {
        success: false,
        message: "Email không tồn tại",
      };
    }

    return {
      success: true,
      message: "Hướng dẫn đặt lại mật khẩu đã được gửi",
    };
  },
};
