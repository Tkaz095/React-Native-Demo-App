import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { mockMemberEditData } from "../data/admin-members.data";
import { MemberEditData } from "../types/admin-members.types";

export default function MemberEditPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MemberEditData | null>(null);
  const [isLocked, setIsLocked] = useState(true);

  const [newService, setNewService] = useState("");
  const [newCert, setNewCert] = useState("");

  useEffect(() => {
    if (id && mockMemberEditData[id]) {
      setData({ ...mockMemberEditData[id] });
    }
    setLoading(false);
  }, [id]);

  const handleSave = () => {
    if (isLocked) {
      Alert.alert("Thông báo", "Vui lòng mở khóa trước khi lưu thay đổi!");
      return;
    }
    // Giả lập lưu dữ liệu API
    Alert.alert("Thành công", "Đã lưu thông tin hội viên.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  const addService = () => {
    if (newService.trim() && data && !isLocked) {
      setData({ ...data, services: [...data.services, newService.trim()] });
      setNewService("");
    }
  };

  const removeService = (index: number) => {
    if (data && !isLocked) {
      const newServices = [...data.services];
      newServices.splice(index, 1);
      setData({ ...data, services: newServices });
    }
  };

  const addCert = () => {
    if (newCert.trim() && data && !isLocked) {
      setData({
        ...data,
        certificates: [...data.certificates, newCert.trim()],
      });
      setNewCert("");
    }
  };

  const removeCert = (index: number) => {
    if (data && !isLocked) {
      const newCerts = [...data.certificates];
      newCerts.splice(index, 1);
      setData({ ...data, certificates: newCerts });
    }
  };

  if (loading || !data) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  interface InputFieldProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    multiline?: boolean;
    keyboardType?:
      | "default"
      | "email-address"
      | "numeric"
      | "phone-pad"
      | "url";
  }

  const InputField = ({
    label,
    value,
    onChangeText,
    multiline = false,
    keyboardType = "default",
  }: InputFieldProps) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[styles.inputWrapper, isLocked && styles.inputWrapperDisabled]}
      >
        <TextInput
          style={[
            styles.input,
            multiline && styles.inputMultiline,
            isLocked && styles.inputDisabled,
          ]}
          value={value}
          onChangeText={onChangeText}
          editable={!isLocked}
          multiline={multiline}
          keyboardType={keyboardType}
          textAlignVertical={multiline ? "top" : "center"}
        />
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
    >
      {/* Header / Actions */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chỉnh sửa hội viên</Text>

        <TouchableOpacity
          style={[
            styles.lockButton,
            isLocked ? styles.lockButtonActive : styles.lockButtonInactive,
          ]}
          onPress={toggleLock}
        >
          <Ionicons
            name={isLocked ? "lock-closed" : "lock-open"}
            size={20}
            color={isLocked ? "#B91C1C" : "#059669"}
          />
          <Text
            style={[
              styles.lockText,
              isLocked ? { color: "#B91C1C" } : { color: "#059669" },
            ]}
          >
            {isLocked ? "Khóa" : "Mở"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Thông tin chung</Text>

          <InputField
            label="Tên doanh nghiệp"
            value={data.companyName}
            onChangeText={(text: string) =>
              setData({ ...data, companyName: text })
            }
          />
          <InputField
            label="Mã số thuế"
            value={data.taxCode}
            onChangeText={(text: string) => setData({ ...data, taxCode: text })}
          />
          <InputField
            label="Lĩnh vực hoạt động"
            value={data.industry}
            onChangeText={(text: string) =>
              setData({ ...data, industry: text })
            }
          />

          <View style={styles.row}>
            <View style={styles.flex1}>
              <InputField
                label="Năm thành lập"
                value={data.foundedYear}
                onChangeText={(text: string) =>
                  setData({ ...data, foundedYear: text })
                }
                keyboardType="numeric"
              />
            </View>
            <View style={styles.spacer} />
            <View style={styles.flex1}>
              <InputField
                label="Quy mô NS"
                value={data.employeeSize}
                onChangeText={(text: string) =>
                  setData({ ...data, employeeSize: text })
                }
              />
            </View>
          </View>

          <InputField
            label="Giới thiệu"
            value={data.description}
            onChangeText={(text: string) =>
              setData({ ...data, description: text })
            }
            multiline={true}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>

          <InputField
            label="Địa chỉ"
            value={data.address}
            onChangeText={(text: string) => setData({ ...data, address: text })}
            multiline={true}
          />
          <InputField
            label="Số điện thoại"
            value={data.phone}
            onChangeText={(text: string) => setData({ ...data, phone: text })}
            keyboardType="phone-pad"
          />
          <InputField
            label="Email"
            value={data.email}
            onChangeText={(text: string) => setData({ ...data, email: text })}
            keyboardType="email-address"
          />
          <InputField
            label="Website"
            value={data.website}
            onChangeText={(text: string) => setData({ ...data, website: text })}
            keyboardType="url"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Sản phẩm & Dịch vụ</Text>

          {!isLocked && (
            <View style={styles.addInputRow}>
              <TextInput
                style={styles.addInput}
                placeholder="Nhập tên sản phẩm / dịch vụ mới..."
                value={newService}
                onChangeText={setNewService}
              />
              <TouchableOpacity style={styles.addButton} onPress={addService}>
                <Ionicons name="add" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.chipsContainer}>
            {data.services.map((service, index) => (
              <View key={index} style={styles.chip}>
                <Text style={styles.chipText}>{service}</Text>
                {!isLocked && (
                  <TouchableOpacity
                    onPress={() => removeService(index)}
                    style={styles.chipRemove}
                  >
                    <Ionicons name="close-circle" size={16} color="#6B7280" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            {data.services.length === 0 && (
              <Text style={styles.emptyItemsText}>Chưa có SP/DV nào.</Text>
            )}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Chứng chỉ & Giải thưởng</Text>

          {!isLocked && (
            <View style={styles.addInputRow}>
              <TextInput
                style={styles.addInput}
                placeholder="Nhập tên chứng chỉ / giải thưởng mới..."
                value={newCert}
                onChangeText={setNewCert}
              />
              <TouchableOpacity style={styles.addButton} onPress={addCert}>
                <Ionicons name="add" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.listContainer}>
            {data.certificates.map((cert, index) => (
              <View key={index} style={styles.listItem}>
                <Ionicons name="checkmark-circle" size={18} color="#10B981" />
                <Text style={styles.listItemText}>{cert}</Text>
                {!isLocked && (
                  <TouchableOpacity
                    onPress={() => removeCert(index)}
                    style={styles.itemRemove}
                  >
                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            {data.certificates.length === 0 && (
              <Text style={styles.emptyItemsText}>Chưa có chứng chỉ nào.</Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Footer Action */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveButton, isLocked && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isLocked}
        >
          <Ionicons name="save-outline" size={20} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: "#6B7280",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  lockButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  lockButtonActive: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FEE2E2",
  },
  lockButtonInactive: {
    backgroundColor: "#ECFDF5",
    borderColor: "#D1FAE5",
  },
  lockText: {
    fontSize: 14,
    fontWeight: "600",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
    gap: 16,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#4B5563",
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    minHeight: 44,
  },
  inputWrapperDisabled: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#111827",
  },
  inputMultiline: {
    minHeight: 100,
  },
  inputDisabled: {
    color: "#6B7280",
  },
  row: {
    flexDirection: "row",
  },
  flex1: {
    flex: 1,
  },
  spacer: {
    width: 12,
  },
  addInputRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  addInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 13,
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: "#1976D2",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  chipText: {
    fontSize: 13,
    color: "#4F46E5",
    fontWeight: "500",
  },
  chipRemove: {
    marginLeft: 2,
  },
  listContainer: {
    gap: 12,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  listItemText: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
  },
  itemRemove: {
    padding: 4,
  },
  emptyItemsText: {
    fontSize: 13,
    color: "#9CA3AF",
    fontStyle: "italic",
  },
  footer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    ...Platform.select({
      ios: {
        paddingBottom: 24,
      },
    }),
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1976D2",
    height: 48,
    borderRadius: 8,
    gap: 8,
  },
  saveButtonDisabled: {
    backgroundColor: "#93C5FD",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});
