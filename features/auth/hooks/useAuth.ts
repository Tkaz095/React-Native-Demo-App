import { useCallback, useState } from "react";
import type { User } from "../data/mockUsers";
import { authApi, LoginCredentials } from "../services/auth.api";

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

export const useAuth = () => {
  const [state, setState] = useState<AuthState>(initialState);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await authApi.login(credentials);
      if (response.success && response.user && response.token) {
        setState({
          user: response.user,
          token: response.token,
          isLoading: false,
          error: null,
        });
        return { success: true, message: response.message };
      } else {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: response.message,
        }));
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Có lỗi xảy ra";
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, message: errorMessage };
    }
  }, []);

  const logout = useCallback(() => {
    setState(initialState);
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    login,
    logout,
    clearError,
    isAuthenticated: !!state.user,
  };
};
