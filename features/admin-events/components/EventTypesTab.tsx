import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { EventType } from "../types/admin-events.types";

interface Props {
  initialTypes: EventType[];
}

export default function EventTypesTab({ initialTypes }: Props) {
  const [eventTypes, setEventTypes] = useState<EventType[]>(initialTypes);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState<EventType | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  });

  const filteredEventTypes = useMemo(() => {
    if (!searchQuery.trim()) return eventTypes;
    const lowerQuery = searchQuery.toLowerCase();
    return eventTypes.filter(
      (type) =>
        type.name.toLowerCase().includes(lowerQuery) ||
        type.description?.toLowerCase().includes(lowerQuery),
    );
  }, [eventTypes, searchQuery]);

  const handleAdd = () => {
    setEditingType(null);
    setFormData({ name: "", description: "", isActive: true });
    setShowModal(true);
  };

  const handleEdit = (type: EventType) => {
    setEditingType(type);
    setFormData({
      name: type.name,
      description: type.description || "",
      isActive: type.isActive !== false,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      "Xác nhận xóa",
      `Bạn có chắc muốn xóa loại sự kiện "${name}"?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            setEventTypes(eventTypes.filter((t) => t.id !== id));
            Alert.alert("Thành công", "Đã xóa loại sự kiện");
          },
        },
      ],
    );
  };

  const toggleStatus = (id: string) => {
    setEventTypes(
      eventTypes.map((type) =>
        type.id === id
          ? { ...type, isActive: !(type.isActive !== false) }
          : type,
      ),
    );
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên loại sự kiện");
      return;
    }

    if (editingType) {
      setEventTypes(
        eventTypes.map((type) =>
          type.id === editingType.id
            ? {
                ...type,
                name: formData.name,
                description: formData.description,
                isActive: formData.isActive,
              }
            : type,
        ),
      );
      Alert.alert("Thành công", "Đã cập nhật loại sự kiện");
    } else {
      const newId = String(
        Math.max(...eventTypes.map((t) => parseInt(t.id) || 0), 0) + 1,
      );
      const newType: EventType = {
        id: newId,
        name: formData.name,
        description: formData.description,
        isActive: formData.isActive,
      };
      setEventTypes([...eventTypes, newType]);
      Alert.alert("Thành công", "Đã thêm loại sự kiện mới");
    }
    setShowModal(false);
  };

  const renderItem = ({ item }: { item: EventType }) => {
    const isActive = item.isActive !== false;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.titleRow}>
            <Ionicons name="pricetag-outline" size={18} color="#6B7280" />
            <Text style={styles.title}>{item.name}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.statusBadge,
              isActive ? styles.statusActive : styles.statusInactive,
            ]}
            onPress={() => toggleStatus(item.id)}
          >
            <Text
              style={[
                styles.statusText,
                isActive ? styles.statusActiveText : styles.statusInactiveText,
              ]}
            >
              {isActive ? "Bật" : "Tắt"}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          {item.description || "Không có mô tả"}
        </Text>

        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => handleEdit(item)}
          >
            <Ionicons name="create-outline" size={20} color="#2563EB" />
            <Text style={[styles.actionBtnText, { color: "#2563EB" }]}>
              Sửa
            </Text>
          </TouchableOpacity>
          <View style={styles.dividerVertical} />
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => handleDelete(item.id, item.name)}
          >
            <Ionicons name="trash-outline" size={20} color="#DC2626" />
            <Text style={[styles.actionBtnText, { color: "#DC2626" }]}>
              Xóa
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#9CA3AF"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm loại sự kiện..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={styles.clearIcon}
            >
              <Ionicons name="close-circle" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredEventTypes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={styles.resultCount}>
            Hiển thị {filteredEventTypes.length} loại sự kiện
          </Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="pricetags-outline" size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>Chưa có loại sự kiện nào</Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={handleAdd}>
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={showModal} animationType="fade" transparent={true}>
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingType ? "Chỉnh sửa loại" : "Thêm mới loại"}
              </Text>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Tên loại sự kiện <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(t) => setFormData({ ...formData, name: t })}
                  placeholder="Ví dụ: Hội thảo..."
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mô tả</Text>
                <TextInput
                  style={[styles.input, styles.inputMultiline]}
                  value={formData.description}
                  onChangeText={(t) =>
                    setFormData({ ...formData, description: t })
                  }
                  placeholder="Mô tả về loại sự kiện..."
                  multiline
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity
                style={styles.checkboxRow}
                activeOpacity={0.7}
                onPress={() =>
                  setFormData({ ...formData, isActive: !formData.isActive })
                }
              >
                <View
                  style={[
                    styles.checkbox,
                    formData.isActive && styles.checkboxChecked,
                  ]}
                >
                  {formData.isActive && (
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>Kích hoạt ngay</Text>
              </TouchableOpacity>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.cancelBtnText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Ionicons
                  name="save-outline"
                  size={20}
                  color="#FFFFFF"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.submitBtnText}>
                  {editingType ? "Cập nhật" : "Lưu mới"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  searchContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  clearIcon: {
    padding: 4,
  },
  listContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 80,
  },
  resultCount: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusActive: {
    backgroundColor: "#DCFCE7",
    borderColor: "#BBF7D0",
  },
  statusInactive: {
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  statusActiveText: {
    color: "#166534",
  },
  statusInactiveText: {
    color: "#374151",
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 16,
  },
  cardActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 12,
    marginTop: 4,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: "500",
  },
  dividerVertical: {
    width: 1,
    backgroundColor: "#F3F4F6",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    backgroundColor: "#1976D2",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 15,
    color: "#6B7280",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  required: {
    color: "#EF4444",
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#111827",
  },
  inputMultiline: {
    minHeight: 80,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  checkboxChecked: {
    backgroundColor: "#1976D2",
    borderColor: "#1976D2",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#374151",
  },
  modalFooter: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },
  cancelBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#4B5563",
  },
  submitBtn: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#1976D2",
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
