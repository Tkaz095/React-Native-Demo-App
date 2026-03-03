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

export interface SignupFormProps {
  onSignupSuccess: (user: any, token: string) => void;
  onSwitchToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  onSignupSuccess,
  onSwitchToLogin,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = "Họ và tên là bắt buộc";

    if (!email.trim()) newErrors.email = "Email là bắt buộc";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!phone.trim()) newErrors.phone = "Số điện thoại là bắt buộc";
    else if (!/^[0-9]{10,}$/.test(phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!password.trim()) newErrors.password = "Mật khẩu là bắt buộc";
    else if (password.length < 6)
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";

    if (!confirmPassword.trim())
      newErrors.confirmPassword = "Xác nhận mật khẩu là bắt buộc";
    else if (confirmPassword !== password)
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockUser = {
        id: Date.now().toString(),
        name: fullName,
        email,
        phone,
        role: "member",
      };
      const mockToken = `token_${Date.now()}`;

      Alert.alert("Thành công", "Đăng ký tài khoản thành công!");
      onSignupSuccess(mockUser, mockToken);
    } catch {
      setErrors({ form: "Có lỗi xảy ra. Vui lòng thử lại." });
    } finally {
      setLoading(false);
    }
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
      <Text style={styles.title}>Đăng ký hội viên</Text>
      <Text style={styles.subtitle}>
        Tạo tài khoản để tham gia cộng đồng doanh nghiệp
      </Text>

      {/* Form Error */}
      {errors.form && (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={16} color="#FF3B30" />
          <Text style={styles.errorText}>{errors.form}</Text>
        </View>
      )}

      {/* Full Name Input */}
      <Input
        placeholder="Họ và tên"
        value={fullName}
        onChangeText={(text) => {
          setFullName(text);
          if (errors.fullName) {
            setErrors((prev) => ({ ...prev, fullName: "" }));
          }
        }}
        error={errors.fullName}
        icon="person"
        editable={!loading}
        containerStyle={styles.compactInput}
      />

      {/* Email Input */}
      <Input
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) {
            setErrors((prev) => ({ ...prev, email: "" }));
          }
        }}
        error={errors.email}
        icon="mail"
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
        containerStyle={styles.compactInput}
      />

      {/* Phone Input */}
      <Input
        placeholder="Số điện thoại"
        value={phone}
        onChangeText={(text) => {
          setPhone(text);
          if (errors.phone) {
            setErrors((prev) => ({ ...prev, phone: "" }));
          }
        }}
        error={errors.phone}
        icon="phone"
        keyboardType="phone-pad"
        editable={!loading}
        containerStyle={styles.compactInput}
      />

      {/* Password Input */}
      <Input
        placeholder="Mật khẩu"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errors.password) {
            setErrors((prev) => ({ ...prev, password: "" }));
          }
        }}
        error={errors.password}
        icon="lock"
        isPassword
        editable={!loading}
        containerStyle={styles.compactInput}
      />

      {/* Confirm Password Input */}
      <Input
        placeholder="Xác nhận mật khẩu"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          if (errors.confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPassword: "" }));
          }
        }}
        error={errors.confirmPassword}
        icon="lock"
        isPassword
        editable={!loading}
        containerStyle={styles.compactInput}
      />

      {/* Signup Button */}
      <Button
        title="Đăng ký"
        onPress={handleSignup}
        loading={loading}
        disabled={loading}
        style={styles.signupButton}
      />

      {/* Social Signup */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Hoặc đăng ký bằng</Text>
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

      {/* Login Link */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Đã có tài khoản? </Text>
        <TouchableOpacity onPress={onSwitchToLogin}>
          <Text style={styles.loginLink}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  compactInput: {
    marginBottom: 10,
  },
  errorContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF3F0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    alignItems: "center",
  },
  errorText: {
    fontSize: 12,
    color: "#FF3B30",
    marginLeft: 8,
    flex: 1,
  },
  signupButton: {
    marginTop: 4,
    marginBottom: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
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
    marginBottom: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 6,
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 16,
  },
  loginText: {
    fontSize: 13,
    color: "#666",
  },
  loginLink: {
    fontSize: 13,
    color: "#1976D2",
    fontWeight: "600",
  },
});

export default SignupForm;
