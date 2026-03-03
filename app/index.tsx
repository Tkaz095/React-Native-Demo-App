import Button from "@/components/ui/Button";
import AuthModal from "@/features/auth/components/AuthModal";
import type { User } from "@/features/auth/data/mockUsers";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LandingPage: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);

  const handleAuthSuccess = (user: User, token: string) => {
    setAuthenticatedUser(user);
    setShowAuthModal(false);

    // Navigate to dashboard based on role
    if (user.role === "admin") {
      router.replace("/admin" as any);
      Alert.alert("Thành công", `Chào mừng ${user.name}!`);
    } else {
      router.replace("/(tabs)" as any);
      Alert.alert("Thành công", `Chào mừng ${user.name}!`);
    }
  };

  const handleLearnMore = () => {
    Alert.alert(
      "Thông tin thêm",
      "Hỏi Doanh Nghiệp là nền tảng kết nối cộng đồng doanh nhân, giúp bạn:\n\n" +
      "• Kết nối với các doanh nghiệp khác\n" +
      "• Chia sẻ kinh nghiệm kinh doanh\n" +
      "• Tìm kiếm cơ hội hợp tác\n" +
      "• Cập nhật tin tức ngành",
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Banner */}
        <View style={styles.banner}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>H</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Hỏi Doanh Nghiệp</Text>
              <Text style={styles.headerSubtitle}>KẾT NỐI NGƯỜI TÀM</Text>
            </View>
          </View>

          {/* Hero Content */}
          <View style={styles.heroContent}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                CHÀO MỪNG ĐẾN VỚI HỎI DOANH NGHIỆP
              </Text>
            </View>
            <Text style={styles.title}>Tiến Phong Trong Chuyên Đổi Số</Text>
            <Text style={styles.description}>
              Hỗ trợ doanh nghiệp ứng dụng công nghệ 4.0 vào quản trị và vận
              hành, tối ưu hóa nguồn lực.
            </Text>

            {/* CTA Buttons */}
            <View style={styles.buttonGroup}>
              <Button
                title="Đăng ký hội viên ngay"
                onPress={() => setShowAuthModal(true)}
                style={styles.primaryButton}
              />
              <Button
                title="Tìm hiểu thêm"
                variant="secondary"
                onPress={handleLearnMore}
                style={styles.secondaryButton}
              />
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Tính năng chính</Text>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Text style={styles.iconText}>👥</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Kết nối cộng đồng</Text>
              <Text style={styles.featureDescription}>
                Tìm kiếm và kết nối với các doanh nhân khác
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Text style={styles.iconText}>📱</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Công nghệ hiện đại</Text>
              <Text style={styles.featureDescription}>
                Nền tảng được xây dựng với công nghệ mới nhất
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Text style={styles.iconText}>🔒</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Bảo mật cao</Text>
              <Text style={styles.featureDescription}>
                Thông tin cá nhân của bạn được bảo vệ tối đa
              </Text>
            </View>
          </View>
        </View>

        {/* User Info Section */}
        {authenticatedUser && (
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoTitle}>Đã đăng nhập</Text>
            <View style={styles.userCard}>
              <View style={styles.userAvatar}>
                <Text style={styles.avatarText}>
                  {authenticatedUser.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{authenticatedUser.name}</Text>
                <Text style={styles.userRole}>
                  {authenticatedUser.role === "admin"
                    ? "Quản trị viên"
                    : "Thành viên"}
                </Text>
                <Text style={styles.userEmail}>{authenticatedUser.email}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Auth Modal */}
      <AuthModal
        visible={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollView: {
    flex: 1,
  },
  banner: {
    height: 500,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#1B5E9F",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#1976D2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  logoText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 11,
    fontWeight: "500",
  },
  heroContent: {
    flex: 1,
    justifyContent: "flex-end",
  },
  badge: {
    backgroundColor: "rgba(25, 118, 210, 0.9)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  title: {
    color: "#FFF",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 12,
    lineHeight: 44,
  },
  description: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  buttonGroup: {
    gap: 12,
  },
  primaryButton: {
    width: "100%",
  },
  secondaryButton: {
    width: "100%",
  },
  featuresContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconText: {
    fontSize: 24,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  userInfoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  userInfoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 16,
  },
  userAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1976D2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  avatarText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  userRole: {
    fontSize: 12,
    color: "#1976D2",
    fontWeight: "500",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 12,
    color: "#999",
  },
});

export default LandingPage;
