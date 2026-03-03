import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Post } from "../contexts/PostsContext";

interface RejectPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
  onConfirm: (reason: string) => void;
}

export const RejectPostModal: React.FC<RejectPostModalProps> = ({
  isOpen,
  onClose,
  post,
  onConfirm,
}) => {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    onConfirm(reason);
    setTimeout(() => setReason(""), 300);
  };

  const isDisabled = !reason.trim();

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Ionicons name="alert-circle-outline" size={20} color="#DC2626" />
              <Text style={styles.headerTitle}>Từ chối bài đăng</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Post Info */}
          <View style={styles.postInfo}>
            <Text style={styles.infoLabel}>THÔNG TIN BÀI ĐĂNG</Text>
            <Text style={styles.postTitle} numberOfLines={2}>
              {post.title}
            </Text>
            <View style={styles.companyRow}>
              <Ionicons name="business-outline" size={14} color="#9CA3AF" />
              <Text style={styles.companyText}>{post.company}</Text>
            </View>
          </View>

          {/* Reason Input */}
          <View style={styles.reasonSection}>
            <Text style={styles.reasonLabel}>
              Lý do từ chối <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.reasonInput}
              value={reason}
              onChangeText={setReason}
              placeholder="Nhập lý do chi tiết..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelBtnText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.confirmBtn,
                isDisabled && styles.confirmBtnDisabled,
              ]}
              onPress={handleConfirm}
              disabled={isDisabled}
            >
              <Text style={styles.confirmBtnText}>Xác nhận từ chối</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sheet: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  closeBtn: {
    padding: 4,
  },
  postInfo: {
    margin: 20,
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    gap: 6,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9CA3AF",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  postTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  companyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  companyText: {
    fontSize: 13,
    color: "#6B7280",
  },
  reasonSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 8,
  },
  reasonLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },
  required: {
    color: "#EF4444",
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: "#111827",
    minHeight: 80,
    backgroundColor: "#FFFFFF",
  },
  footer: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    alignItems: "center",
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  confirmBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: "#DC2626",
    alignItems: "center",
  },
  confirmBtnDisabled: {
    backgroundColor: "#FCA5A5",
  },
  confirmBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
