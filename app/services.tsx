import DrawerMenu from "@/components/DrawerMenu";
import { LandingHeader } from "@/components/LandingHeader";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ServicesPage() {
   const [showDrawer, setShowDrawer] = useState(false);

   return (
      <View style={styles.container}>
         <LandingHeader onMenuPress={() => setShowDrawer(true)} />

         <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
         >
            <Text style={styles.mainTitle}>Dịch Vụ Của Hội Doanh Nghiệp</Text>
            <Text style={styles.description}>
               Chúng tôi cam kết đồng hành cùng doanh nghiệp thông qua hệ sinh thái
               dịch vụ đa dạng, chuyên nghiệp và hiệu quả.
            </Text>

            <View style={styles.card}>
               <View style={[styles.iconContainer, { backgroundColor: "#F0F7FF" }]}>
                  <Feather name="briefcase" size={24} color="#1976D2" />
               </View>
               <Text style={styles.cardTitle}>Kết nối giao thương</Text>
               <Text style={styles.cardDescription}>
                  Tổ chức các buổi networking, B2B mapping giúp doanh nghiệp tìm
                  kiếm đối tác và khách hàng tiềm năng.
               </Text>
               <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.cardLink}>Xem chi tiết</Text>
               </TouchableOpacity>
            </View>

            <View style={styles.card}>
               <View style={[styles.iconContainer, { backgroundColor: "#F5F3FF" }]}>
                  <Feather name="users" size={24} color="#5C6BC0" />
               </View>
               <Text style={styles.cardTitle}>Đào tạo & Huấn luyện</Text>
               <Text style={styles.cardDescription}>
                  Cung cấp các khóa đào tạo kỹ năng quản lý, nghiệp vụ chuyên môn
                  và cập nhật xu hướng thị trường mới nhất.
               </Text>
               <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.cardLink}>Xem chi tiết</Text>
               </TouchableOpacity>
            </View>

            <View style={styles.card}>
               <View style={[styles.iconContainer, { backgroundColor: "#FFF7ED" }]}>
                  <Feather name="trending-up" size={24} color="#EA580C" />
               </View>
               <Text style={styles.cardTitle}>Tư vấn chiến lược</Text>
               <Text style={styles.cardDescription}>
                  Đội ngũ chuyên gia hỗ trợ xây dựng định hướng kinh doanh, mở rộng
                  thị trường và tối ưu hoạt động doanh nghiệp.
               </Text>
               <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.cardLink}>Xem chi tiết</Text>
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
   container: { flex: 1, backgroundColor: "#FAFAFA" },
   scrollContent: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 48 },
   mainTitle: {
      fontSize: 28,
      fontWeight: "800",
      color: "#0d1b2a",
      textAlign: "center",
      marginBottom: 16,
      lineHeight: 36,
   },
   description: {
      fontSize: 14,
      color: "#4b5563",
      textAlign: "center",
      marginBottom: 40,
      lineHeight: 22,
      paddingHorizontal: 10,
   },
   card: {
      backgroundColor: "#FFF",
      borderRadius: 16,
      padding: 24,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: "#F3F4F6",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
   },
   iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
   },
   cardTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#0d1b2a",
      marginBottom: 12,
   },
   cardDescription: {
      fontSize: 14,
      color: "#4b5563",
      lineHeight: 22,
      marginBottom: 20,
   },
   cardLink: {
      fontSize: 14,
      fontWeight: "700",
      color: "#1976D2",
   },
});
