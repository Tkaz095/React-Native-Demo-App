// Auth Feature Exports
export { default as AuthModal } from "./components/AuthModal";
export { default as LoginForm } from "./components/LoginForm";
export { DEMO_ACCOUNT, MOCK_USERS } from "./data/mockUsers";
export type { User } from "./data/mockUsers";
export { useAuth } from "./hooks/useAuth";
export { authApi } from "./services/auth.api";
export type { AuthResponse, LoginCredentials } from "./services/auth.api";

