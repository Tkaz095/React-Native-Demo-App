import DrawerMenu from "@/components/DrawerMenu";
import AuthModal from "@/features/auth/components/AuthModal";
import type { User } from "@/features/auth/data/mockUsers";
import { useResponsive } from "@/utils/responsive";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HERO_IMAGES = [
  require("@/assets/images/DN.jpg"),
  require("@/assets/images/DN02.jpg"),
];

const LandingPage: React.FC = () => {
  const { width, height, isDesktop, scale, moderateScale } = useResponsive();
  const router = useRouter();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [showDrawerMenu, setShowDrawerMenu] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-scroll images
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (user: User, _token: string) => {
    setShowAuthModal(false);

    // Navigate to dashboard based on role
    if (user.role === "admin") {
      router.replace("/admin/strategic-dashboard" as any);
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

  // Generate responsive styles dynamically
  const styles = useMemo(
    () => getStyles(isDesktop, scale, moderateScale),
    [isDesktop, scale, moderateScale],
  );

  return (
    <View style={styles.container}>
      {/* Absolute Hero Images */}
      {HERO_IMAGES.map((img, index) => (
        <Image
          key={index}
          source={img}
          style={[
            StyleSheet.absoluteFillObject,
            {
              opacity: currentImageIndex === index ? 1 : 0,
              width: "100%",
              height: "100%",
            },
          ]}
          resizeMode="cover"
        />
      ))}

      {/* Premium Overlay Gradient */}
      <View style={styles.overlay} />

      {/* Main Content Area using SafeAreaView correctly */}
      <SafeAreaView style={[styles.mainContent, { width, minHeight: height }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>H</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Hội Doanh Nghiệp</Text>
              <Text style={styles.headerSubtitle}>KẾT NỐI VƯƠN TẦM</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setShowDrawerMenu(true)}
          >
            <MaterialIcons name="menu" size={scale(28)} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Hero Content */}
        <View
          style={[styles.heroContent, isDesktop && styles.heroContentDesktop]}
        >
          <View style={[styles.badge, isDesktop && styles.badgeDesktop]}>
            <Text style={styles.badgeText}>
              CHÀO MỪNG ĐẾN VỚI HỘI DOANH NGHIỆP
            </Text>
          </View>
          <Text style={[styles.title, isDesktop && styles.titleDesktop]}>
            Kết Nối Doanh{isDesktop ? " " : "\n"}Nghiệp - Kiến Tạo
            {isDesktop ? " " : "\n"}Tương Lai
          </Text>
          <Text
            style={[styles.description, isDesktop && styles.descriptionDesktop]}
          >
            Mạng lưới kinh doanh lớn mạnh nhất khu vực, giúp doanh nghiệp của
            bạn phát triển bền vững và bứt phá thành công.
          </Text>

          {/* CTA Buttons */}
          <View
            style={[styles.buttonGroup, isDesktop && styles.buttonGroupDesktop]}
          >
            <TouchableOpacity
              style={[
                styles.primaryButton,
                isDesktop && styles.desktopButtonAction,
              ]}
              onPress={() => openAuthModal("signup")}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>
                Đăng ký hội viên ngay
              </Text>
              <MaterialIcons
                name="chevron-right"
                size={moderateScale(20)}
                color="#FFF"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.secondaryButton,
                isDesktop && styles.desktopButtonAction,
              ]}
              onPress={handleLearnMore}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Tìm hiểu thêm</Text>
            </TouchableOpacity>
          </View>

          {/* Pagination Dots */}
          <View style={styles.paginationDots}>
            {HERO_IMAGES.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrentImageIndex(index)}
                style={[
                  styles.dot,
                  index === currentImageIndex
                    ? styles.dotActive
                    : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>

      {/* Auth Modal */}
      <AuthModal
        visible={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authMode}
      />

      {/* Drawer Menu */}
      <DrawerMenu
        visible={showDrawerMenu}
        onClose={() => setShowDrawerMenu(false)}
        onLogin={() => openAuthModal("login")}
        onRegister={() => openAuthModal("signup")}
      />
    </View>
  );
};

const getStyles = (
  isDesktop: boolean,
  scale: (s: number) => number,
  moderateScale: (s: number) => number,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0d1b2a",
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(10, 25, 60, 0.65)", // Premium dark blue tint
    },
    mainContent: {
      flex: 1,
      justifyContent: "space-between",
      paddingHorizontal: isDesktop ? "10%" : scale(24),
      paddingBottom: scale(20), // Padding off the bottom of SafeAreaView
      paddingTop: scale(16),
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 1,
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    logo: {
      width: scale(36),
      height: scale(36),
      borderRadius: scale(8),
      backgroundColor: "#1976D2",
      alignItems: "center",
      justifyContent: "center",
      marginRight: scale(10),
    },
    logoText: {
      color: "#FFF",
      fontSize: moderateScale(18),
      fontWeight: "bold",
    },
    headerText: {
      flex: 1,
    },
    headerTitle: {
      color: "#FFF",
      fontSize: moderateScale(15),
      fontWeight: "700",
    },
    headerSubtitle: {
      color: "rgba(255, 255, 255, 0.75)",
      fontSize: moderateScale(9),
      fontWeight: "600",
      letterSpacing: 1,
    },
    menuButton: {
      padding: scale(12),
    },
    heroContent: {
      flex: 1,
      justifyContent: "flex-end",
      zIndex: 1,
    },
    badge: {
      backgroundColor: "rgba(25, 118, 210, 0.95)",
      paddingHorizontal: scale(12),
      paddingVertical: scale(8),
      borderRadius: scale(4),
      alignSelf: "flex-start",
      marginBottom: scale(20),
    },
    badgeText: {
      color: "#FFF",
      fontSize: moderateScale(9),
      fontWeight: "700",
      letterSpacing: 0.8,
    },
    title: {
      color: "#FFF",
      fontSize: moderateScale(32),
      fontWeight: "bold",
      marginBottom: scale(16),
      lineHeight: moderateScale(40),
    },
    description: {
      color: "rgba(255, 255, 255, 0.9)",
      fontSize: moderateScale(14),
      lineHeight: moderateScale(22),
      marginBottom: scale(28),
    },
    buttonGroup: {
      gap: scale(12),
      marginBottom: scale(24),
    },
    primaryButton: {
      width: "100%",
      backgroundColor: "#1976D2",
      paddingVertical: scale(16),
      paddingHorizontal: scale(24),
      borderRadius: scale(8),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    primaryButtonText: {
      color: "#FFF",
      fontSize: moderateScale(15),
      fontWeight: "600",
      marginRight: scale(4),
    },
    secondaryButton: {
      width: "100%",
      backgroundColor: "#FFF",
      paddingVertical: scale(16),
      paddingHorizontal: scale(24),
      borderRadius: scale(8),
      alignItems: "center",
      justifyContent: "center",
    },
    secondaryButtonText: {
      color: "#333",
      fontSize: moderateScale(15),
      fontWeight: "600",
    },
    paginationDots: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: scale(8),
      marginBottom: scale(8),
    },
    dot: {
      borderRadius: scale(4),
    },
    dotInactive: {
      width: scale(8),
      height: scale(8),
      backgroundColor: "rgba(255, 255, 255, 0.4)",
    },
    dotActive: {
      width: scale(24),
      height: scale(8),
      backgroundColor: "#1976D2",
    },
    heroContentDesktop: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: "10%",
    },
    titleDesktop: {
      fontSize: moderateScale(56),
      textAlign: "center",
      lineHeight: moderateScale(70),
      marginBottom: scale(24),
    },
    descriptionDesktop: {
      fontSize: moderateScale(18),
      textAlign: "center",
      maxWidth: 800,
      lineHeight: moderateScale(28),
      marginBottom: scale(40),
    },
    buttonGroupDesktop: {
      flexDirection: "row",
      justifyContent: "center",
      gap: scale(20),
      marginBottom: scale(40),
    },
    desktopButtonAction: {
      width: "auto",
      minWidth: 220,
    },
    badgeDesktop: {
      alignSelf: "center",
    },
  });

export default LandingPage;
