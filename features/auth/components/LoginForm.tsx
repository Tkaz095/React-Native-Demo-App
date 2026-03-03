import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Alert,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { DEMO_ACCOUNT } from "../data/mockUsers";
import { authApi, LoginCredentials } from "../services/auth.api";

export interface LoginFormProps {
  onLoginSuccess: (user: any, token: string) => void;
  onSwitchToSignup: () => void;
}

type LoginTab = "email" | "phone";

const LoginForm: React.FC<LoginFormProps> = ({
  onLoginSuccess,
  onSwitchToSignup,
}) => {
  const [activeTab, setActiveTab] = useState<LoginTab>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (activeTab === "email") {
      if (!email.trim()) newErrors.email = "Email là bắt buộc";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Email không hợp lệ";
      }
    } else {
      if (!phone.trim()) newErrors.phone = "Số điện thoại là bắt buộc";
      else if (!/^[0-9]{10,}$/.test(phone.replace(/\s/g, ""))) {
        newErrors.phone = "Số điện thoại không hợp lệ";
      }
    }

    if (!password.trim()) newErrors.password = "Mật khẩu là bắt buộc";
    else if (password.length < 6)
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const credentials: LoginCredentials = {
        password,
      };

      if (activeTab === "email") {
        credentials.email = email;
      } else {
        credentials.phone = phone;
      }

      const response = await authApi.login(credentials);

      if (response.success && response.user && response.token) {
        Alert.alert("Thành công", response.message);
        onLoginSuccess(response.user, response.token);
      } else {
        setErrors({ form: response.message });
      }
    } catch (error) {
      setErrors({ form: "Có lỗi xảy ra. Vui lòng thử lại." });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const emailOrPhone = activeTab === "email" ? email : phone;
    if (!emailOrPhone.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập email hoặc số điện thoại");
      return;
    }

    try {
      await authApi.resetPassword(email);
      Alert.alert("Thành công", "Hướng dẫn đặt lại mật khẩu đã được gửi");
    } catch {
      Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const handleFillDemoAccount = () => {
    if (activeTab === "email") {
      setEmail(DEMO_ACCOUNT.email || "");
    } else {
      setPhone(DEMO_ACCOUNT.phone || "");
    }
    setPassword(DEMO_ACCOUNT.password);
    setErrors({});
  };

  const openGitHub = () => {
    Linking.openURL("https://github.com");
  };

  const openFacebook = () => {
    Linking.openURL("https://facebook.com");
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Chào mừng trở lại</Text>
      <Text style={styles.subtitle}>
        Đăng nhập để tiếp tục kết nối cùng cộng đồng
      </Text>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "email" && styles.tabActive]}
          onPress={() => {
            setActiveTab("email");
            setErrors({});
          }}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "email" && styles.tabTextActive,
            ]}
          >
            Email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "phone" && styles.tabActive]}
          onPress={() => {
            setActiveTab("phone");
            setErrors({});
          }}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "phone" && styles.tabTextActive,
            ]}
          >
            Số điện thoại
          </Text>
        </TouchableOpacity>
      </View>

      {/* Form Error */}
      {errors.form && (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={16} color="#FF3B30" />
          <Text style={styles.errorText}>{errors.form}</Text>
        </View>
      )}

      {/* Email Input */}
      {activeTab === "email" && (
        <Input
          placeholder="Địa chỉ Email"
          value={email}
          onChangeText={(email) => {
            setEmail(email);
            if (errors.email) {
              setErrors((prev) => ({ ...prev, email: "" }));
            }
          }}
          error={errors.email}
          icon="mail"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />
      )}

      {/* Phone Input */}
      {activeTab === "phone" && (
        <Input
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={(phone) => {
            setPhone(phone);
            if (errors.phone) {
              setErrors((prev) => ({ ...prev, phone: "" }));
            }
          }}
          error={errors.phone}
          icon="phone"
          keyboardType="phone-pad"
          editable={!loading}
        />
      )}

      {/* Password Input */}
      <Input
        placeholder="Mật khẩu"
        value={password}
        onChangeText={(password) => {
          setPassword(password);
          if (errors.password) {
            setErrors((prev) => ({ ...prev, password: "" }));
          }
        }}
        error={errors.password}
        icon="lock"
        isPassword
        editable={!loading}
      />

      {/* Forgot Password */}
      <TouchableOpacity
        onPress={handleForgotPassword}
        style={styles.forgotButton}
      >
        <Text style={styles.forgotText}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <Button
        title="Đăng nhập"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.loginButton}
      />

      {/* Demo Account */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>Demo Tài Khoản</Text>
        <Text style={styles.demoInfo}>
          Admin: {DEMO_ACCOUNT.email} / {DEMO_ACCOUNT.password}
        </Text>
        <Text style={styles.demoInfo}>
          Hội viên: member@example.com / member123
        </Text>
        <TouchableOpacity onPress={handleFillDemoAccount}>
          <Text style={styles.fillDemoButton}>Điền thông tin demo</Text>
        </TouchableOpacity>
      </View>

      {/* Social Login */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Hoặc đăng nhập bằng</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={openGitHub}>
          <MaterialIcons name="code" size={24} color="#333" />
          <Text style={styles.socialButtonText}>Github</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={openFacebook}>
          <MaterialIcons name="people" size={24} color="#1877F2" />
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up Link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Chưa có tài khoản? </Text>
        <TouchableOpacity onPress={onSwitchToSignup}>
          <Text style={styles.signupLink}>Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  tabActive: {
    backgroundColor: "#FFF",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#999",
  },
  tabTextActive: {
    color: "#1976D2",
  },
  errorContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF3F0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  errorText: {
    fontSize: 13,
    color: "#FF3B30",
    marginLeft: 8,
    flex: 1,
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  forgotText: {
    fontSize: 13,
    color: "#1976D2",
    fontWeight: "500",
  },
  loginButton: {
    marginBottom: 20,
  },
  demoContainer: {
    backgroundColor: "#F0F7FF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  demoLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1976D2",
    marginBottom: 6,
  },
  demoInfo: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  demoPassword: {
    fontWeight: "600",
    color: "#333",
  },
  fillDemoButton: {
    fontSize: 12,
    color: "#1976D2",
    fontWeight: "600",
    marginTop: 8,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    marginHorizontal: 12,
    color: "#999",
    fontSize: 12,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 6,
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
  },
  signupText: {
    fontSize: 13,
    color: "#666",
  },
  signupLink: {
    fontSize: 13,
    color: "#1976D2",
    fontWeight: "600",
  },
});

export default LoginForm;
