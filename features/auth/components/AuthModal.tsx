import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import LoginForm from "./LoginForm";

export interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any, token: string) => void;
}

type AuthMode = "login" | "signup";

const AuthModal: React.FC<AuthModalProps> = ({
  visible,
  onClose,
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<AuthMode>("login");

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
        <View style={styles.overlay}>
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
  },
  overlay: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: 40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
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
    flex: 1,
  },
});

export default AuthModal;
