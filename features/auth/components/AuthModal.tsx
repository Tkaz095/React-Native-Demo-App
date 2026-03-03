import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any, token: string) => void;
  initialMode?: "login" | "signup";
}

type AuthMode = "login" | "signup";

const AuthModal: React.FC<AuthModalProps> = ({
  visible,
  onClose,
  onAuthSuccess,
  initialMode = "login",
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Sync mode with initialMode when modal opens
  useEffect(() => {
    if (visible) {
      setMode(initialMode);
    }
  }, [visible, initialMode]);

  const handleAuthSuccess = (user: any, token: string) => {
    onAuthSuccess(user, token);
    // Reset mode when modal closes
    setTimeout(() => setMode("login"), 300);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.overlayCentered}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {mode === "login" && (
              <LoginForm
                onLoginSuccess={handleAuthSuccess}
                onSwitchToSignup={() => setMode("signup")}
              />
            )}
            {mode === "signup" && (
              <SignupForm
                onSignupSuccess={handleAuthSuccess}
                onSwitchToLogin={() => setMode("login")}
              />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  overlayCentered: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    width: "100%",
    maxWidth: 500, // Max width for tablet/web
    maxHeight: "90%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeButton: {
    padding: 8,
  },
  content: {
    paddingBottom: 16, // added padding bottom to let scrollview breathe
  },
});

export default AuthModal;
