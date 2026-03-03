import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Animated,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
  onMenuItemPress?: (label: string) => void;
}

interface MenuItem {
  label: string;
  route?: string;
}

const menuItems: MenuItem[] = [
  { label: "Trang chủ", route: "/" },
  { label: "Dịch vụ", route: "/services" },
  { label: "Thành viên", route: "/members" },
  { label: "Tin tức", route: "/news" },
  { label: "Liên hệ", route: "/contact" },
];

const DrawerMenu: React.FC<DrawerMenuProps> = ({
  visible,
  onClose,
  onLogin,
  onRegister,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            {
              paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 16 : Platform.OS === "web" ? 24 : Math.max(insets.top, 24) + 16,
              paddingBottom: insets.bottom + 20
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>H</Text>
              </View>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitle}>Hội Doanh Nghiệp</Text>
                <Text style={styles.headerSubtitle}>KẾT NỐI VƯƠN TẦM</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <MaterialIcons name="close" size={28} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => {
                  onClose();
                  if (item.route) {
                    setTimeout(() => router.push(item.route as any), 150);
                  }
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                onClose();
                setTimeout(onLogin, 200);
              }}
              activeOpacity={0.8}
            >
              <MaterialIcons name="login" size={20} color="#333" />
              <Text style={styles.loginButtonText}>Đăng nhập</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => {
                onClose();
                setTimeout(onRegister, 200);
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.registerButtonText}>Đăng ký hội viên</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 20, 50, 0.95)",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#1976D2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  logoText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 1,
  },
  closeButton: {
    padding: 12,
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    paddingVertical: 14,
  },
  menuItemText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "500",
  },
  actionContainer: {
    gap: 12,
    marginTop: "auto",
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  loginButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
  registerButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1976D2",
    paddingVertical: 14,
    borderRadius: 8,
  },
  registerButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFF",
  },
});

export default DrawerMenu;
