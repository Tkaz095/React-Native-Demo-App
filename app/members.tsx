import DrawerMenu from "@/components/DrawerMenu";
import { LandingHeader } from "@/components/LandingHeader";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
   Alert,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";

const TIERS = [
   {
      name: "Hội viên Vàng",
      count: "120+",
      icon: "award" as const,
      color: "#B45309",
      bg: "#FEF3C7",
      border: "#F59E0B",
      badge: "PREMIUM",
      perks: ["Ưu tiên kết nối B2B", "Tham gia tất cả sự kiện", "Tư vấn chiến lược 1-1"],
   },
   {
      name: "Hội viên Bạc",
      count: "380+",
      icon: "users" as const,
      color: "#475569",
      bg: "#F8FAFC",
      border: "#CBD5E1",
      badge: "STANDARD",
      perks: ["Kết nối networking", "Truy cập tài liệu", "Hỗ trợ đào tạo"],
   },
   {
      name: "Hội viên Đồng",
      count: "800+",
      icon: "user" as const,
      color: "#92400E",
      bg: "#FEF3C7",
      border: "#D97706",
      badge: "BASIC",
      perks: ["Tham gia diễn đàn", "Nhận bản tin", "Hỗ trợ cơ bản"],
   },
];

const STATS = [
   { label: "Hội viên", value: "1,300+", icon: "users" as const },
   { label: "Tỉnh thành", value: "63", icon: "map-pin" as const },
   { label: "Sự kiện/năm", value: "120+", icon: "calendar" as const },
   { label: "Dự án kết nối", value: "500+", icon: "briefcase" as const },
];

export default function MembersPage() {
   const [showDrawer, setShowDrawer] = useState(false);

   return (
      <View style={styles.container}>
         <LandingHeader onMenuPress={() => setShowDrawer(true)} />

         <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
         >
            {/* Page Header */}
            <View style={styles.pageHeader}>
               <Text style={styles.mainTitle}>Cộng Đồng Thành Viên</Text>
               <Text style={styles.description}>
                  Hệ thống hội viên đa tầng, kết nối hàng nghìn doanh nhân và doanh
                  nghiệp trên toàn quốc.
               </Text>
            </View>

            <View style={styles.body}>
               {/* Stats */}
               <View style={styles.statsGrid}>
                  {STATS.map((s) => (
                     <View key={s.label} style={styles.statCard}>
                        <Feather name={s.icon} size={20} color="#1976D2" />
                        <Text style={styles.statValue}>{s.value}</Text>
                        <Text style={styles.statLabel}>{s.label}</Text>
                     </View>
                  ))}
               </View>

               {/* Tier cards */}
               <Text style={styles.sectionTitle}>Các cấp hội viên</Text>
               {TIERS.map((tier) => (
                  <View
                     key={tier.name}
                     style={[styles.tierCard, { borderColor: tier.border }]}
                  >
                     <View style={styles.tierHeader}>
                        <View style={[styles.tierIcon, { backgroundColor: tier.bg }]}>
                           <Feather name={tier.icon} size={22} color={tier.color} />
                        </View>
                        <View style={styles.tierInfo}>
                           <Text style={styles.tierName}>{tier.name}</Text>
                           <Text style={styles.tierCount}>{tier.count} hội viên</Text>
                        </View>
                        <View style={[styles.tierBadge, { backgroundColor: tier.bg }]}>
                           <Text style={[styles.tierBadgeText, { color: tier.color }]}>
                              {tier.badge}
                           </Text>
                        </View>
                     </View>
                     <View style={styles.perkList}>
                        {tier.perks.map((p) => (
                           <View key={p} style={styles.perkRow}>
                              <Feather name="check" size={14} color="#059669" />
                              <Text style={styles.perkText}>{p}</Text>
                           </View>
                        ))}
                     </View>
                  </View>
               ))}

               {/* CTA */}
               <TouchableOpacity
                  style={styles.ctaButton}
                  activeOpacity={0.85}
                  onPress={() => Alert.alert("Đăng ký", "Chức năng đang được phát triển.")}
               >
                  <Text style={styles.ctaText}>Đăng ký trở thành hội viên</Text>
                  <Feather name="arrow-right" size={18} color="#FFF" />
               </TouchableOpacity>
            </View>
         </ScrollView>

         <DrawerMenu
            visible={showDrawer}
            onClose={() => setShowDrawer(false)}
            onLogin={() => setShowDrawer(false)}
            onRegister={() => setShowDrawer(false)}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: { flex: 1, backgroundColor: "#F8FAFC" },
   scrollContent: { paddingBottom: 48 },

   pageHeader: {
      paddingHorizontal: 24,
      paddingTop: 28,
      paddingBottom: 24,
      backgroundColor: "#FFF",
      borderBottomWidth: 1,
      borderBottomColor: "#F1F5F9",
   },
   mainTitle: {
      fontSize: 28,
      fontWeight: "800",
      color: "#0d1b2a",
      marginBottom: 10,
      lineHeight: 36,
   },
   description: {
      fontSize: 14,
      color: "#4b5563",
      lineHeight: 22,
   },

   body: {
      paddingHorizontal: 16,
      paddingTop: 20,
      gap: 16,
   },

   statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
   },
   statCard: {
      backgroundColor: "#FFF",
      borderRadius: 14,
      padding: 16,
      alignItems: "center",
      gap: 6,
      width: "47%",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 1,
   },
   statValue: {
      fontSize: 22,
      fontWeight: "800",
      color: "#0d1b2a",
   },
   statLabel: {
      fontSize: 12,
      color: "#6B7280",
      fontWeight: "500",
   },

   sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: "#374151",
      marginTop: 4,
   },

   tierCard: {
      backgroundColor: "#FFF",
      borderRadius: 16,
      padding: 20,
      borderWidth: 1.5,
      gap: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 1,
   },
   tierHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
   },
   tierIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
   },
   tierInfo: { flex: 1 },
   tierName: {
      fontSize: 15,
      fontWeight: "700",
      color: "#0d1b2a",
   },
   tierCount: {
      fontSize: 12,
      color: "#9CA3AF",
      marginTop: 2,
   },
   tierBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
   },
   tierBadgeText: {
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 0.5,
   },
   perkList: {
      gap: 8,
      paddingTop: 4,
      borderTopWidth: 1,
      borderTopColor: "#F1F5F9",
   },
   perkRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
   },
   perkText: {
      fontSize: 13,
      color: "#4B5563",
   },

   ctaButton: {
      backgroundColor: "#1976D2",
      borderRadius: 14,
      paddingVertical: 18,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      marginTop: 4,
      shadowColor: "#1976D2",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
   },
   ctaText: {
      fontSize: 15,
      fontWeight: "700",
      color: "#FFF",
   },
});
