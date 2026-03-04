import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ADMIN_ACTIVITY_MOCK, AdminProfile } from "../data/admin-profile.data";

interface ProfileSidebarProps {
  profile: AdminProfile;
  onEditPress: () => void;
}

export function ProfileSidebar({ profile, onEditPress }: ProfileSidebarProps) {
  const d = profile;
  const activities = ADMIN_ACTIVITY_MOCK;

  return (
    <View style={styles.container}>
      {/* Avatar & Summary Card */}
      <View style={styles.card}>
        <View style={styles.banner} />

        <View style={styles.cardContent}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarOuter}>
              <View style={styles.avatarInner}>
                <Ionicons name="person" size={48} color="#1976D2" />
              </View>
            </View>
            <Text style={styles.name}>{d.name}</Text>
            <Text style={styles.role}>{d.role}</Text>

            <View style={styles.statusBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#059669" />
              <Text style={styles.statusText}>{d.status}</Text>
            </View>
          </View>

          <View style={styles.contactInfo}>
            <View style={styles.contactRow}>
              <Ionicons
                name="mail-outline"
                size={18}
                color="#9CA3AF"
                style={styles.contactIcon}
              />
              <Text style={styles.contactText} numberOfLines={1}>
                {d.email}
              </Text>
            </View>
            <View style={styles.contactRow}>
              <Ionicons
                name="call-outline"
                size={18}
                color="#9CA3AF"
                style={styles.contactIcon}
              />
              <Text style={styles.contactText}>{d.phone}</Text>
            </View>
            <View style={styles.contactRow}>
              <Ionicons
                name="briefcase-outline"
                size={18}
                color="#9CA3AF"
                style={styles.contactIcon}
              />
              <Text style={styles.contactText}>{d.department}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            activeOpacity={0.8}
            onPress={onEditPress}
          >
            <Text style={styles.editButtonText}>Chỉnh sửa hồ sơ</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="time-outline" size={20} color="#1976D2" />
          <Text style={styles.cardTitle}>Hoạt động gần nhất</Text>
        </View>
        <View style={styles.activityList}>
          {activities.map((a, idx) => (
            <View key={idx} style={styles.activityItem}>
              <View
                style={[
                  styles.activityDot,
                  { backgroundColor: a.isRecent ? "#1976D2" : "#D1D5DB" },
                ]}
              />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{a.title}</Text>
                <Text style={styles.activityTime}>{a.time}</Text>
              </View>
            </View>
          ))}
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
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  banner: {
    height: 100,
    backgroundColor: "#1976D2",
  },
  cardContent: {
    padding: 16,
    position: "relative",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: -50,
  },
  avatarOuter: {
    width: 100,
    height: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 12,
  },
  avatarInner: {
    flex: 1,
    backgroundColor: "#EFF6FF",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  role: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#D1FAE5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
    marginTop: 16,
    width: "100%",
    justifyContent: "center",
  },
  statusText: {
    color: "#047857",
    fontSize: 14,
    fontWeight: "600",
  },
  contactInfo: {
    marginTop: 24,
    gap: 12,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  contactIcon: {
    width: 20,
  },
  contactText: {
    fontSize: 14,
    color: "#4B5563",
    flex: 1,
  },
  editButton: {
    backgroundColor: "#1976D2",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingBottom: 0,
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  activityList: {
    padding: 16,
    gap: 16,
  },
  activityItem: {
    flexDirection: "row",
    gap: 12,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  activityTime: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
});
