import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
   Modal,
   Platform,
   SafeAreaView,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";

export interface StrategicFilterModalProps {
   visible: boolean;
   onClose: () => void;
   onApply: (filters: any) => void;
}

const TIME_OPTIONS = ["7 ngày qua", "30 ngày qua", "90 ngày qua"];
const TARGET_OPTIONS = [
   "Tất cả đối tượng",
   "Hội viên",
   "Doanh nghiệp",
   "Đối tác",
];
const GROUP_OPTIONS = [
   "Tất cả nhóm",
   "Hội viên Vàng",
   "Hội viên Bạc",
   "Hội viên Đồng",
];

export function StrategicFilterModal({
   visible,
   onClose,
   onApply,
}: StrategicFilterModalProps) {
   const [selectedTime, setSelectedTime] = useState(TIME_OPTIONS[0]);
   const [selectedTargets, setSelectedTargets] = useState<string[]>([
      TARGET_OPTIONS[0],
   ]);
   const [selectedGroups, setSelectedGroups] = useState<string[]>([
      GROUP_OPTIONS[0],
   ]);

   const toggleSelection = (
      item: string,
      current: string[],
      setFn: (val: string[]) => void,
      isAllItem: boolean = false
   ) => {
      if (isAllItem) {
         setFn([item]);
         return;
      }

      const withoutAll = current.filter((x) => x !== current[0]); // assume index 0 is "Tất cả..."
      if (current.includes(item)) {
         const next = withoutAll.filter((idea) => idea !== item);
         setFn(next.length === 0 ? [current[0]] : next);
      } else {
         setFn([...withoutAll, item]);
      }
   };

   const handleClear = () => {
      setSelectedTime(TIME_OPTIONS[0]);
      setSelectedTargets([TARGET_OPTIONS[0]]);
      setSelectedGroups([GROUP_OPTIONS[0]]);
   };

   return (
      <Modal
         visible={visible}
         animationType="slide"
         presentationStyle="pageSheet"
         onRequestClose={onClose}
      >
         <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
               <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <Ionicons name="close" size={24} color="#111827" />
               </TouchableOpacity>
               <Text style={styles.title}>Bộ lọc dữ liệu</Text>
               <View style={styles.placeholder} />
            </View>

            {/* Content */}
            <ScrollView style={styles.content} contentContainerStyle={styles.contentBody}>
               {/* Section: Thời gian */}
               <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Thời gian</Text>
                  <View style={styles.pillContainer}>
                     {TIME_OPTIONS.map((opt) => {
                        const isActive = selectedTime === opt;
                        return (
                           <TouchableOpacity
                              key={opt}
                              style={[styles.pill, isActive && styles.pillActive]}
                              onPress={() => setSelectedTime(opt)}
                           >
                              <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                                 {opt}
                              </Text>
                           </TouchableOpacity>
                        );
                     })}
                  </View>
               </View>

               {/* Section: Đối tượng */}
               <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Đối tượng</Text>
                  <View style={styles.pillContainer}>
                     {TARGET_OPTIONS.map((opt, i) => {
                        const isActive = selectedTargets.includes(opt);
                        return (
                           <TouchableOpacity
                              key={opt}
                              style={[styles.pill, isActive && styles.pillActive]}
                              onPress={() =>
                                 toggleSelection(opt, selectedTargets, setSelectedTargets, i === 0)
                              }
                           >
                              <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                                 {opt}
                              </Text>
                           </TouchableOpacity>
                        );
                     })}
                  </View>
                  <TouchableOpacity style={styles.viewMoreBtn}>
                     <Text style={styles.viewMoreText}>Xem thêm</Text>
                  </TouchableOpacity>
               </View>

               {/* Section: Nhóm hội viên */}
               <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Nhóm hội viên</Text>
                  <View style={styles.pillContainer}>
                     {GROUP_OPTIONS.map((opt, i) => {
                        const isActive = selectedGroups.includes(opt);
                        return (
                           <TouchableOpacity
                              key={opt}
                              style={[styles.pill, isActive && styles.pillActive]}
                              onPress={() =>
                                 toggleSelection(opt, selectedGroups, setSelectedGroups, i === 0)
                              }
                           >
                              <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                                 {opt}
                              </Text>
                           </TouchableOpacity>
                        );
                     })}
                  </View>
               </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
               <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
                  <Text style={styles.clearBtnText}>Xoá bộ lọc</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.applyBtn}
                  onPress={() => {
                     onApply({ selectedTime, selectedTargets, selectedGroups });
                     onClose();
                  }}
               >
                  <Text style={styles.applyBtnText}>Hiển thị 320 kết quả</Text>
               </TouchableOpacity>
            </View>
         </SafeAreaView>
      </Modal>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
   },
   header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: "#F3F4F6",
      ...Platform.select({
         android: { paddingTop: 40 },
      }),
   },
   closeBtn: {
      padding: 4,
   },
   placeholder: {
      width: 32,
   },
   title: {
      fontSize: 16,
      fontWeight: "700",
      color: "#111827",
   },
   content: {
      flex: 1,
   },
   contentBody: {
      padding: 20,
      paddingBottom: 40,
   },
   section: {
      marginBottom: 28,
   },
   sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: "#111827",
      marginBottom: 12,
   },
   pillContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
   },
   pill: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      backgroundColor: "#FFFFFF",
   },
   pillActive: {
      borderColor: "#111827",
      backgroundColor: "#111827",
   },
   pillText: {
      fontSize: 14,
      color: "#374151",
      fontWeight: "500",
   },
   pillTextActive: {
      color: "#FFFFFF",
   },
   viewMoreBtn: {
      marginTop: 12,
      alignSelf: "flex-start",
   },
   viewMoreText: {
      fontSize: 14,
      color: "#4F46E5",
      fontWeight: "600",
   },
   footer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: "#E5E7EB",
      backgroundColor: "#FFFFFF",
      ...Platform.select({
         ios: { paddingBottom: 32 },
      }),
   },
   clearBtn: {
      paddingVertical: 12,
   },
   clearBtnText: {
      fontSize: 15,
      fontWeight: "600",
      color: "#111827",
      textDecorationLine: "underline",
   },
   applyBtn: {
      backgroundColor: "#111827",
      paddingHorizontal: 24,
      paddingVertical: 14,
      borderRadius: 30,
   },
   applyBtnText: {
      fontSize: 15,
      fontWeight: "700",
      color: "#FFFFFF",
   },
});
