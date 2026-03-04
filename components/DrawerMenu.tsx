import { MaterialIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
  onMenuItemPress?: (label: string) => void;
}

interface MenuItem {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route?: string;
}

const menuItems: MenuItem[] = [
  { label: "Trang chủ", icon: "home", route: "/" },
  { label: "Dịch vụ", icon: "design-services", route: "/services" },
  { label: "Thành viên", icon: "people", route: "/members" },
  { label: "Tin tức", icon: "article", route: "/news" },
  { label: "Liên hệ", icon: "mail", route: "/contact" },
];

const DrawerMenu: React.FC<DrawerMenuProps> = ({
  visible,
  onClose,
  onLogin,
  onRegister,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          {/* Stop propagation so tapping inside dropdown doesn't close it */}
          <TouchableWithoutFeedback onPress={() => { }}>
            <View style={styles.dropdown}>
              {/* Nav items */}
              {menuItems.map((item, index) => {
                const isActive = item.route === pathname || (item.route === "/" && pathname === "/");
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.menuItem, isActive && styles.menuItemActive]}
                    onPress={() => {
                      onClose();
                      if (item.route) {
                        setTimeout(() => router.push(item.route as any), 150);
                      }
                    }}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons name={item.icon} size={18} color={isActive ? "#1976D2" : "#4B5563"} />
                    <Text style={[styles.menuItemText, isActive && styles.menuItemTextActive]}>{item.label}</Text>
                  </TouchableOpacity>
                );
              })}

              <View style={styles.divider} />

              {/* Auth buttons */}
              <TouchableOpacity
                style={styles.loginItem}
                onPress={() => {
                  onClose();
                  setTimeout(onLogin, 200);
                }}
                activeOpacity={0.8}
              >
                <MaterialIcons name="login" size={18} color="#1976D2" />
                <Text style={styles.loginText}>Đăng nhập</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.registerItem}
                onPress={() => {
                  onClose();
                  setTimeout(onRegister, 200);
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.registerText}>Đăng ký hội viên</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  dropdown: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    paddingVertical: 8,
    minWidth: 220,
    marginTop: Platform.OS === "ios" ? 100 : 72,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 11,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    borderRadius: 8,
  },
  menuItemActive: {
    backgroundColor: "#EFF6FF",
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
  },
  menuItemTextActive: {
    color: "#1976D2",
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 6,
    marginHorizontal: 12,
  },
  loginItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  loginText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1976D2",
  },
  registerItem: {
    marginHorizontal: 12,
    marginBottom: 8,
    marginTop: 4,
    backgroundColor: "#1976D2",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFF",
  },
});

export default DrawerMenu;
