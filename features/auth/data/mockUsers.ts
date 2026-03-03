export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  name: string;
  role: "admin" | "member";
}

export const MOCK_USERS: User[] = [
  {
    id: "admin1",
    username: "admin",
    email: "admin@hoidoanhnghiep.vn",
    phone: "0123456789",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "member1",
    username: "member",
    email: "member@hoidoanhnghiep.vn",
    phone: "0987654321",
    password: "member123",
    name: "Member User",
    role: "member",
  },
];

export const DEMO_ACCOUNT = {
  username: "admin",
  email: "admin@hoidoanhnghiep.vn",
  phone: "0123456789",
  password: "admin123",
};
