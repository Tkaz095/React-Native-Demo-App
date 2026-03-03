import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { RejectPostModal } from "../components/RejectPostModal";
import { Post, usePosts } from "../contexts/PostsContext";

// ── Helpers ────────────────────────────────────────────────────────────────────

function getStatusBadge(status: Post["status"]) {
  switch (status) {
    case "pending":
      return {
        text: "Chờ duyệt",
        icon: "time-outline" as const,
        bg: "#EFF6FF",
        color: "#2563EB",
        border: "#BFDBFE",
      };
    case "edited":
      return {
        text: "Đã chỉnh sửa",
        icon: "create-outline" as const,
        bg: "#FFFBEB",
        color: "#D97706",
        border: "#FDE68A",
      };
    case "approved":
      return {
        text: "Đã duyệt",
        icon: "checkmark-circle-outline" as const,
        bg: "#ECFDF5",
        color: "#059669",
        border: "#A7F3D0",
      };
    case "rejected":
      return {
        text: "Từ chối",
        icon: "close-circle-outline" as const,
        bg: "#FFF1F2",
        color: "#E11D48",
        border: "#FECDD3",
      };
  }
}

// ── Detailed content renderer ─────────────────────────────────────────────────

function renderDetailedContent(content: string) {
  return content.split("\n").map((line, idx) => {
    const trimmed = line.trim();
    if (trimmed === "") return <View key={idx} style={{ height: 6 }} />;

    // Uppercase header e.g. "THÔNG TIN DỰ ÁN"
    if (
      trimmed === trimmed.toUpperCase() &&
      !trimmed.startsWith("-") &&
      trimmed.length < 60
    ) {
      return (
        <Text key={idx} style={styles.detailHeader}>
          {trimmed}
        </Text>
      );
    }
    // Bullet point
    if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
      return (
        <View key={idx} style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{trimmed.slice(1).trim()}</Text>
        </View>
      );
    }
    return (
      <Text key={idx} style={styles.detailParagraph}>
        {line}
      </Text>
    );
  });
}

// ── Component ──────────────────────────────────────────────────────────────────

export const AdminPostDetailPage: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { posts, updatePostStatus } = usePosts();

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <View style={styles.notFound}>
        <Ionicons name="document-text-outline" size={48} color="#CBD5E1" />
        <Text style={styles.notFoundTitle}>Không tìm thấy bài đăng</Text>
        <TouchableOpacity onPress={() => router.push("/admin/posts" as any)}>
          <Text style={styles.backLink}>Quay lại danh sách</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const badge = getStatusBadge(post.status);

  const handleApprove = () => {
    updatePostStatus(post.id, "approved");
    Alert.alert("Thành công", `Đã phê duyệt bài đăng.`);
  };

  const handleConfirmReject = (reason: string) => {
    updatePostStatus(post.id, "rejected");
    setIsRejectModalOpen(false);
    Alert.alert("Đã từ chối", `Lý do: ${reason}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.push("/admin/posts" as any)}
        >
          <Ionicons name="arrow-back" size={18} color="#6B7280" />
          <Text style={styles.backBtnText}>Quay lại</Text>
        </TouchableOpacity>

        <Text style={styles.pageTitle}>Chi tiết nội dung</Text>
      </View>

      {/* Action Buttons (pending only) */}
      {post.status === "pending" && (
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.rejectBtn}
            onPress={() => setIsRejectModalOpen(true)}
          >
            <Ionicons name="close-circle-outline" size={16} color="#DC2626" />
            <Text style={styles.rejectBtnText}>Từ chối</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.approveBtn} onPress={handleApprove}>
            <Ionicons
              name="checkmark-circle-outline"
              size={16}
              color="#FFFFFF"
            />
            <Text style={styles.approveBtnText}>Phê duyệt</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Scrollable Content */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Main Card */}
        <View style={styles.card}>
          {/* Status + Category Icon */}
          <View style={styles.badgeRow}>
            <View
              style={[
                styles.categoryIcon,
                post.category === "project"
                  ? styles.categoryProject
                  : styles.categoryOther,
              ]}
            >
              <Ionicons
                name={
                  post.category === "project"
                    ? "briefcase-outline"
                    : "document-text-outline"
                }
                size={18}
                color={post.category === "project" ? "#2563EB" : "#7C3AED"}
              />
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: badge.bg, borderColor: badge.border },
              ]}
            >
              <Ionicons name={badge.icon} size={13} color={badge.color} />
              <Text style={[styles.statusBadgeText, { color: badge.color }]}>
                {badge.text}
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.postTitle}>{post.title}</Text>

          {/* Meta */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="business-outline" size={14} color="#9CA3AF" />
              <Text style={styles.metaText}>{post.company}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
              <Text style={styles.metaText}>Đăng: {post.createdDate}</Text>
            </View>
            {post.lastEdited && (
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                <Text style={styles.metaText}>
                  Sửa: {post.lastEdited} ({post.editCount} lần)
                </Text>
              </View>
            )}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Project Details */}
          {post.category === "project" && (
            <>
              <View style={styles.detailGrid}>
                <View style={styles.detailGridItem}>
                  <Text style={styles.detailGridLabel}>Lĩnh vực</Text>
                  <Text style={styles.detailGridValue}>
                    {post.field ?? "—"}
                  </Text>
                </View>
                <View style={styles.detailGridItem}>
                  <Text style={styles.detailGridLabel}>Loại hợp tác</Text>
                  <Text style={styles.detailGridValue}>
                    {post.cooperationType ?? "—"}
                  </Text>
                </View>
                <View style={styles.detailGridItem}>
                  <Text style={styles.detailGridLabel}>Ngân sách</Text>
                  <Text style={styles.detailGridValue}>
                    {post.budget ?? "—"}
                  </Text>
                </View>
              </View>
              <Text style={styles.sectionTitle}>Mô tả dự án</Text>
              <Text style={styles.contentText}>{post.content}</Text>
            </>
          )}

          {/* Recruitment Details */}
          {post.category === "recruitment" && (
            <>
              <View style={styles.recruitGrid}>
                <View style={styles.recruitItem}>
                  <Ionicons name="people-outline" size={18} color="#9CA3AF" />
                  <View>
                    <Text style={styles.detailGridLabel}>Vị trí</Text>
                    <Text style={styles.detailGridValue}>
                      {post.position ?? "—"}
                    </Text>
                  </View>
                </View>
                <View style={styles.recruitItem}>
                  <Ionicons name="cash-outline" size={18} color="#9CA3AF" />
                  <View>
                    <Text style={styles.detailGridLabel}>Mức lương</Text>
                    <Text style={styles.detailGridValue}>
                      {post.salary ?? "—"}
                    </Text>
                  </View>
                </View>
                <View style={styles.recruitItem}>
                  <Ionicons name="location-outline" size={18} color="#9CA3AF" />
                  <View>
                    <Text style={styles.detailGridLabel}>Địa điểm</Text>
                    <Text style={styles.detailGridValue}>
                      {post.location ?? "—"}
                    </Text>
                  </View>
                </View>
                <View style={styles.recruitItem}>
                  <Ionicons name="calendar-outline" size={18} color="#9CA3AF" />
                  <View>
                    <Text style={styles.detailGridLabel}>Hạn nộp</Text>
                    <Text style={styles.detailGridValue}>
                      {post.deadline ?? "—"}
                    </Text>
                  </View>
                </View>
              </View>
              {post.description && (
                <>
                  <Text style={styles.sectionTitle}>Mô tả công việc</Text>
                  <Text style={styles.contentText}>{post.description}</Text>
                </>
              )}
              {post.requirements && (
                <>
                  <Text style={styles.sectionTitle}>Yêu cầu ứng viên</Text>
                  <Text style={styles.contentText}>{post.requirements}</Text>
                </>
              )}
              {post.benefits && (
                <>
                  <Text style={styles.sectionTitle}>Quyền lợi</Text>
                  <Text style={styles.contentText}>{post.benefits}</Text>
                </>
              )}
            </>
          )}

          {/* Default content for other categories */}
          {post.category !== "project" && post.category !== "recruitment" && (
            <>
              <Text style={styles.sectionTitle}>Nội dung</Text>
              <Text style={styles.contentText}>{post.content}</Text>
            </>
          )}
        </View>

        {/* Detailed Content Card */}
        {post.detailedContent && (
          <View style={[styles.card, { marginTop: 12 }]}>
            <View style={styles.detailAccent} />
            <View style={styles.detailContentBody}>
              {renderDetailedContent(post.detailedContent)}
            </View>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>

      <RejectPostModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        post={post}
        onConfirm={handleConfirmReject}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 4,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  backBtnText: {
    fontSize: 13,
    color: "#6B7280",
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A2B47",
  },
  actionRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  rejectBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FECACA",
    backgroundColor: "#FFF1F2",
  },
  rejectBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#DC2626",
  },
  approveBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#1A2B47",
  },
  approveBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryProject: { backgroundColor: "#EFF6FF" },
  categoryOther: { backgroundColor: "#F5F3FF" },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 24,
    marginBottom: 10,
  },
  metaRow: {
    gap: 6,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: "#6B7280",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 14,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
    marginTop: 12,
  },
  contentText: {
    fontSize: 13,
    color: "#374151",
    lineHeight: 20,
  },
  detailGrid: {
    gap: 8,
    marginBottom: 4,
  },
  detailGridItem: {
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 12,
  },
  detailGridLabel: {
    fontSize: 10,
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    fontWeight: "600",
    marginBottom: 4,
  },
  detailGridValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  recruitGrid: {
    gap: 8,
    marginBottom: 4,
  },
  recruitItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 12,
  },
  detailAccent: {
    height: 4,
    width: 48,
    backgroundColor: "#1A2B47",
    borderRadius: 2,
    marginBottom: 14,
  },
  detailContentBody: {
    gap: 2,
  },
  detailHeader: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1A2B47",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginTop: 12,
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: "row",
    gap: 8,
    paddingLeft: 4,
  },
  bulletDot: {
    color: "#D4AF37",
    fontWeight: "700",
    fontSize: 13,
    lineHeight: 20,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: "#374151",
    lineHeight: 20,
  },
  detailParagraph: {
    fontSize: 13,
    color: "#374151",
    lineHeight: 20,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  notFoundTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  backLink: {
    fontSize: 13,
    color: "#2563EB",
  },
});
