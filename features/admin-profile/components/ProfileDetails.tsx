import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AdminProfile } from "../data/admin-profile.data";

interface ProfileDetailsProps {
  profile: AdminProfile;
  onChangePasswordPress: () => void;
}

export function ProfileDetails({
  profile,
  onChangePasswordPress,
}: ProfileDetailsProps) {
  const d = profile;

  return (
    <View style={styles.container}>
      {/* Identity Info */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Thông tin định danh & Vai trò</Text>
          <Text style={styles.cardSubtitle}>
            Chi tiết về tài khoản quản trị viên của bạn trong hệ thống
          </Text>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Họ và tên</Text>
              <Text style={styles.value}>{d.name}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Mã Admin / ID</Text>
              <Text style={[styles.value, { color: "#1976D2" }]}>{d.id}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Vai trò</Text>
              <Text style={styles.value}>{d.role}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Đơn vị trực thuộc</Text>
              <Text style={styles.value}>{d.department}</Text>
            </View>
          </View>

          <View style={styles.fullRow}>
            <Text style={[styles.label, { marginBottom: 8 }]}>
              Quyền hạn quản lý
            </Text>
            <View style={styles.chipGroup}>
              {d.permissions.map((perm: string) => (
                <View key={perm} style={styles.chip}>
                  <Text style={styles.chipText}>{perm}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Security */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Bảo mật & Hệ thống</Text>
          <Text style={styles.cardSubtitle}>
            Thông tin đăng nhập và cài đặt bảo mật
          </Text>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Tên đăng nhập</Text>
              <Text style={styles.value}>{d.username}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Lần đăng nhập gần nhất</Text>
              <Text style={styles.value}>{d.lastLogin}</Text>
            </View>
          </View>

          <View style={styles.actionBox}>
            <View style={styles.actionIconBox}>
              <Ionicons name="key" size={20} color="#6B7280" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Mật khẩu</Text>
              <Text style={styles.actionSubtitle}>
                Cập nhật lần cuối 3 tháng trước
              </Text>
            </View>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onChangePasswordPress}
            >
              <Text style={styles.actionButtonText}>Đổi mật khẩu</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionBox}>
            <View style={styles.actionIconBox}>
              <Ionicons name="shield-checkmark" size={20} color="#1976D2" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Xác thực 2 yếu tố (2FA)</Text>
              <Text style={styles.actionSubtitle}>
                Bảo vệ tài khoản của bạn
              </Text>
            </View>
            <View style={styles.statusChip}>
              <Text style={styles.statusChipText}>Đang bật</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Settings */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Cài đặt cá nhân</Text>
        </View>
        <View style={[styles.cardBody, styles.settingsBody]}>
          <View style={styles.settingRow}>
            <View style={styles.settingIconBox}>
              <Ionicons name="globe-outline" size={20} color="#6B7280" />
            </View>
            <View>
              <Text style={styles.label}>Ngôn ngữ</Text>
              <Text style={styles.settingValue}>{d.language}</Text>
            </View>
          </View>
          <View style={styles.settingRow}>
            <View style={styles.settingIconBox}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#6B7280"
              />
            </View>
            <View>
              <Text style={styles.label}>Thông báo</Text>
              <Text style={styles.settingValue}>{d.notifications}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
  cardBody: {
    padding: 16,
    gap: 16,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  col: {
    flex: 1,
  },
  fullRow: {
    marginTop: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
  },
  chipGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#4B5563",
  },
  actionBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    marginTop: 8,
  },
  actionIconBox: {
    width: 40,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
  },
  actionSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#111827",
  },
  statusChip: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusChipText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1D4ED8",
  },
  settingsBody: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    marginBottom: 8,
  },
  settingIconBox: {
    width: 40,
    height: 40,
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  settingValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
});
