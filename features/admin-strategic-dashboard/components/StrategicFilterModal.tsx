import {
   DEFAULT_FILTER,
   GROUP_OPTIONS,
   GroupOption,
   StrategicFilter,
   TARGET_OPTIONS,
   TargetOption,
   TIME_OPTIONS,
   TimeOption,
} from "@/lib/data/strategic-filter.data";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
   Modal,
   Pressable,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";

export type { StrategicFilter };

export interface StrategicFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: StrategicFilter) => void;
}

export function StrategicFilterModal({
  visible,
  onClose,
  onApply,
}: StrategicFilterModalProps) {
  const [selectedTime, setSelectedTime] = useState<TimeOption>(
    DEFAULT_FILTER.time,
  );
  const [selectedTargets, setSelectedTargets] = useState<TargetOption[]>(
    DEFAULT_FILTER.targets,
  );
  const [selectedGroups, setSelectedGroups] = useState<GroupOption[]>(
    DEFAULT_FILTER.groups,
  );

  const toggleSelection = <T extends string>(
    item: T,
    current: T[],
    setFn: (val: T[]) => void,
    isAllItem: boolean = false,
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
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Bộ lọc dữ liệu</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeModalButton}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView
            style={styles.modalBody}
            showsVerticalScrollIndicator={false}
          >
            {/* Section: Thời gian */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Thời gian</Text>
              <View style={styles.chipWrap}>
                {TIME_OPTIONS.map((opt) => {
                  const isActive = selectedTime === opt;
                  return (
                    <TouchableOpacity
                      key={opt}
                      style={[styles.chip, isActive && styles.chipActive]}
                      onPress={() => setSelectedTime(opt)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isActive && styles.chipTextActive,
                        ]}
                      >
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Section: Đối tượng */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Đối tượng</Text>
              <View style={styles.chipWrap}>
                {TARGET_OPTIONS.map((opt, i) => {
                  const isActive = selectedTargets.includes(opt);
                  return (
                    <TouchableOpacity
                      key={opt}
                      style={[styles.chip, isActive && styles.chipActive]}
                      onPress={() =>
                        toggleSelection(
                          opt,
                          selectedTargets,
                          setSelectedTargets,
                          i === 0,
                        )
                      }
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isActive && styles.chipTextActive,
                        ]}
                      >
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Section: Nhóm hội viên */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Nhóm hội viên</Text>
              <View style={styles.chipWrap}>
                {GROUP_OPTIONS.map((opt, i) => {
                  const isActive = selectedGroups.includes(opt);
                  return (
                    <TouchableOpacity
                      key={opt}
                      style={[styles.chip, isActive && styles.chipActive]}
                      onPress={() =>
                        toggleSelection(
                          opt,
                          selectedGroups,
                          setSelectedGroups,
                          i === 0,
                        )
                      }
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isActive && styles.chipTextActive,
                        ]}
                      >
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.modalBtn, styles.modalBtnSecondary]}
              onPress={handleClear}
            >
              <Text style={styles.modalBtnSecondaryText}>Xóa bộ lọc</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalBtn, styles.modalBtnPrimary]}
              onPress={() => {
                onApply({
                  time: selectedTime,
                  targets: selectedTargets,
                  groups: selectedGroups,
                });
                onClose();
              }}
            >
              <Text style={styles.modalBtnPrimaryText}>Áp dụng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  closeModalButton: {
    padding: 4,
  },
  modalBody: {
    padding: 16,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "transparent",
  },
  chipActive: {
    backgroundColor: "#EFF6FF",
    borderColor: "#3B82F6",
  },
  chipText: {
    fontSize: 14,
    color: "#4B5563",
  },
  chipTextActive: {
    color: "#1D4ED8",
    fontWeight: "500",
  },
  modalFooter: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    gap: 12,
    backgroundColor: "#FFFFFF",
  },
  modalBtn: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBtnSecondary: {
    backgroundColor: "#F3F4F6",
  },
  modalBtnSecondaryText: {
    color: "#4B5563",
    fontWeight: "600",
    fontSize: 15,
  },
  modalBtnPrimary: {
    backgroundColor: "#1976D2",
  },
  modalBtnPrimaryText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
});
