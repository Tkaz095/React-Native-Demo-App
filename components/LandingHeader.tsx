import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface LandingHeaderProps {
   onMenuPress: () => void;
}

export function LandingHeader({ onMenuPress }: LandingHeaderProps) {
   const insets = useSafeAreaInsets();

   return (
      <View
         style={[
            styles.header,
            {
               paddingTop:
                  Platform.OS === "android" ? 24 : insets.top > 0 ? insets.top : 16,
            },
         ]}
      >
         <View style={styles.headerLeft}>
            <View style={styles.logo}>
               <Text style={styles.logoText}>H</Text>
            </View>
            <View>
               <Text style={styles.headerTitle}>Hội Doanh Nghiệp</Text>
               <Text style={styles.headerSubtitle}>KẾT NỐI VƯƠN TẦM</Text>
            </View>
         </View>
         <TouchableOpacity style={styles.menuButton} onPress={onMenuPress} activeOpacity={0.7}>
            <MaterialIcons name="menu" size={28} color="#1E293B" />
         </TouchableOpacity>
      </View>
   );
}

const styles = StyleSheet.create({
   header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 24,
      paddingBottom: 16,
      backgroundColor: "#FAFAFA",
      borderBottomWidth: 1,
      borderBottomColor: "#F1F5F9",
   },
   headerLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
   },
   logo: {
      width: 36,
      height: 36,
      borderRadius: 8,
      backgroundColor: "#1976D2",
      alignItems: "center",
      justifyContent: "center",
   },
   logoText: {
      color: "#FFF",
      fontSize: 18,
      fontWeight: "bold",
   },
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
});
