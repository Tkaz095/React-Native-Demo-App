import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
   Modal,
   Platform,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ServicesModalProps {
   visible: boolean;
   onClose: () => void;
   onOpenMenu?: () => void;
}

const ServicesModal: React.FC<ServicesModalProps> = ({ visible, onClose, onOpenMenu }) => {
   const insets = useSafeAreaInsets();

   const handleMenuPress = () => {
      // Don't close this modal — just open the DrawerMenu on top.
      // ServicesModal stays rendered in the background.
      if (onOpenMenu) {
         onOpenMenu();
      }
   };

   return (
      <Modal
         visible={visible}
         animationType="fade"
         transparent={false}
         onRequestClose={handleMenuPress}
      >
         <View
            style={[
               styles.container,
               {
                  paddingTop: Platform.OS === "android" ? 24 : insets.top,
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
               {/* Hamburger menu button — no X */}
               <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
                  <MaterialIcons name="menu" size={28} color="#1E293B" />
               </TouchableOpacity>
            </View>

            <ScrollView
               contentContainerStyle={styles.scrollContent}
               showsVerticalScrollIndicator={false}
            >
               <Text style={styles.mainTitle}>Dịch Vụ Của Hội Doanh Nghiệp</Text>
               <Text style={styles.description}>
                  Chúng tôi cam kết đồng hành cùng doanh nghiệp thông qua hệ sinh thái
                  dịch vụ đa dạng, chuyên nghiệp và hiệu quả.
               </Text>

               {/* Cards */}
               <View style={styles.card}>
                  <View
                     style={[styles.iconContainer, { backgroundColor: "#F0F7FF" }]}
                  >
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
                  <View
                     style={[styles.iconContainer, { backgroundColor: "#F5F3FF" }]}
                  >
                     <Feather name="users" size={24} color="#5C6BC0" />
                  </View>
                  <Text style={styles.cardTitle}>Đào tạo & Huấn luyện</Text>
                  <Text style={styles.cardDescription}>
                     Cung cấp các khóa đào tạo kỹ năng quản lý, nghiệp vụ chuyên môn và
                     cập nhật xu hướng thị trường mới nhất.
                  </Text>
                  <TouchableOpacity activeOpacity={0.7}>
                     <Text style={styles.cardLink}>Xem chi tiết</Text>
                  </TouchableOpacity>
               </View>

               <View style={styles.footerSpace} />
            </ScrollView>
         </View>
      </Modal>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#FAFAFA",
   },
   header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#F1F5F9",
   },
   headerLeft: {
      flexDirection: "row",
      alignItems: "center",
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
   headerTextContainer: {},
   headerTitle: {
      color: "#1E293B",
      fontSize: 15,
      fontWeight: "700",
   },
   headerSubtitle: {
      color: "#64748B",
      fontSize: 9,
      fontWeight: "600",
      letterSpacing: 1,
   },
   menuButton: {
      padding: 8,
   },
   scrollContent: {
      paddingHorizontal: 24,
      paddingTop: 32,
      paddingBottom: 40,
   },
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
   footerSpace: {
      height: 40,
   },
});

export default ServicesModal;
