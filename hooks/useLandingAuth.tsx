import AuthModal from "@/features/auth/components/AuthModal";
import { User } from "@/features/auth/data/mockUsers";
import { useRouter } from "expo-router";
import React, { useState } from "react";

type AuthMode = "login" | "signup";

/**
 * Shared hook + component for auth (login/register) used across all landing sub-pages.
 * Returns handlers to pass to DrawerMenu and a JSX element to render.
 */
export function useLandingAuth() {
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const openLogin = () => {
    setAuthMode("login");
    setShowAuthModal(true);
  };

  const openRegister = () => {
    setAuthMode("signup");
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (user: User) => {
    setShowAuthModal(false);
    if (user.role === "admin") {
      router.replace(
        "/admin/strategic-dashboard" as "/admin/strategic-dashboard",
      );
    } else {
      router.replace("/(tabs)" as "/(tabs)");
    }
  };

  const AuthModalComponent = (
    <AuthModal
      visible={showAuthModal}
      onClose={() => setShowAuthModal(false)}
      onAuthSuccess={handleAuthSuccess}
      initialMode={authMode}
    />
  );

  return { openLogin, openRegister, AuthModalComponent };
}
