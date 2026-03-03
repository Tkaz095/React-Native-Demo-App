import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Post } from "../contexts/PostsContext";

// ── Config ─────────────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 10;

const CATEGORY_META: Record<
  string,
  { label: string; bg: string; color: string; thumbBg: string; thumbColor: string }
> = {
  project: { label: "Dự án", bg: "#EFF6FF", color: "#2563EB", thumbBg: "#DBEAFE", thumbColor: "#2563EB" },
  recruitment: { label: "Tuyển dụng", bg: "#F5F3FF", color: "#7C3AED", thumbBg: "#EDE9FE", thumbColor: "#7C3AED" },
  news: { label: "Tin tức", bg: "#F0FDF4", color: "#16A34A", thumbBg: "#DCFCE7", thumbColor: "#16A34A" },
  product: { label: "Sản phẩm", bg: "#FFF7ED", color: "#EA580C", thumbBg: "#FFEDD5", thumbColor: "#EA580C" },
  achievement: { label: "Thành tựu", bg: "#FEFCE8", color: "#CA8A04", thumbBg: "#FEF9C3", thumbColor: "#CA8A04" },
  workshop: { label: "Sự kiện", bg: "#FFF1F2", color: "#E11D48", thumbBg: "#FFE4E6", thumbColor: "#E11D48" },
  document: { label: "Văn bản", bg: "#F8FAFC", color: "#475569", thumbBg: "#E2E8F0", thumbColor: "#475569" },
};

const STATUS_META: Record<string, { label: string; bg: string; color: string }> = {
  pending: { label: "Chờ duyệt", bg: "#FFFBEB", color: "#D97706" },
  approved: { label: "Đã duyệt", bg: "#ECFDF5", color: "#059669" },
  rejected: { label: "Từ chối", bg: "#FFF1F2", color: "#E11D48" },
  edited: { label: "Đã chỉnh sửa", bg: "#F5F3FF", color: "#7C3AED" },
};

const CATEGORY_ICON: Record<string, keyof typeof Ionicons.glyphMap> = {
  project: "hammer-outline",
  recruitment: "people-outline",
  news: "newspaper-outline",
  product: "cube-outline",
  achievement: "trophy-outline",
  workshop: "calendar-outline",
  document: "document-text-outline",
};

// ── Thumbnail placeholder ───────────────────────────────────────────────────────

function ThumbPlaceholder({ category }: { category: string }) {
  const meta = CATEGORY_META[category] ?? CATEGORY_META.news;
  const icon = CATEGORY_ICON[category] ?? "document-text-outline";
  return (
    <View style={[thumbStyles.container, { backgroundColor: meta.thumbBg }]}>
      <Ionicons name={icon} size={28} color={meta.thumbColor} />
    </View>
  );
}

const thumbStyles = StyleSheet.create({
  container: {
    width: 90,
    height: 80,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
});

// ── PostCard ───────────────────────────────────────────────────────────────────

function PostCard({ item, onPress }: { item: Post; onPress: () => void }) {
  const catMeta = CATEGORY_META[item.category] ?? CATEGORY_META.news;
  const statusMeta = STATUS_META[item.status];

  return (
    <TouchableOpacity style={cardStyles.card} onPress={onPress} activeOpacity={0.85}>
      {/* Top row: Category badge + date */}
      <View style={cardStyles.topRow}>
        <View style={[cardStyles.categoryBadge, { backgroundColor: catMeta.bg }]}>
          <Text style={[cardStyles.categoryBadgeText, { color: catMeta.color }]}>
            {catMeta.label}
          </Text>
        </View>
        <View style={cardStyles.dateRow}>
          <Ionicons name="calendar-outline" size={11} color="#9CA3AF" />
          <Text style={cardStyles.dateText}>{item.createdDate}</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={cardStyles.title} numberOfLines={2}>
        {item.title.toUpperCase()}
      </Text>

      {/* Thumbnail + Preview */}
      <View style={cardStyles.bodyRow}>
        <ThumbPlaceholder category={item.category} />
        <View style={cardStyles.bodyRight}>
          <Text style={cardStyles.companyText} numberOfLines={1}>
            {item.company}
          </Text>
          <Text style={cardStyles.previewText} numberOfLines={3}>
            {item.content}
          </Text>
        </View>
      </View>

      {/* Status indicator */}
      <View style={[cardStyles.statusTag, { backgroundColor: statusMeta.bg }]}>
        <View style={[cardStyles.statusDot, { backgroundColor: statusMeta.color }]} />
        <Text style={[cardStyles.statusText, { color: statusMeta.color }]}>
          {statusMeta.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dateText: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  title: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
    lineHeight: 20,
    letterSpacing: 0.2,
    marginBottom: 12,
  },
  bodyRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 10,
  },
  bodyRight: {
    flex: 1,
    justifyContent: "center",
  },
  companyText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 4,
  },
  previewText: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 18,
  },
  statusTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
});

// ── PostApprovalList ───────────────────────────────────────────────────────────

export function PostApprovalList({ initialPosts }: { initialPosts?: Post[] }) {
  const router = useRouter();
  const posts = React.useMemo(() => initialPosts ?? [], [initialPosts]);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // Khi có bộ lọc mới (posts prop thay đổi), reset lại page = 1
  React.useEffect(() => {
    setPage(1);
  }, [posts]);

  // Tải thêm data khi cuộn xuống cuối
  const currentPosts = posts.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = currentPosts.length < posts.length;

  const handleLoadMore = () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    // Fake typing delay để thấy UI loading mượt mà
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setLoadingMore(false);
    }, 500);
  };

  const EmptyComponent = () => (
    <View style={styles.empty}>
      <Ionicons name="document-text-outline" size={48} color="#E2E8F0" />
      <Text style={styles.emptyTitle}>Không tìm thấy bài đăng</Text>
      <Text style={styles.emptyDesc}>Thử thay đổi bộ lọc hoặc từ khoá tìm kiếm</Text>
    </View>
  );

  const FooterComponent = () => {
    if (!loadingMore) return <View style={{ height: 20 }} />;
    return (
      <View style={styles.loadingFooter}>
        <Ionicons name="sync" size={20} color="#94A3B8" />
        <Text style={styles.loadingText}>Đang tải thêm...</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Result count */}
      {posts.length > 0 && (
        <Text style={styles.resultCount}>
          Hiển thị {currentPosts.length} / {posts.length} bài đăng
        </Text>
      )}

      <FlatList
        data={currentPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            item={item}
            onPress={() => router.push(`/admin/posts/${item.id}` as any)}
          />
        )}
        ListEmptyComponent={EmptyComponent}
        ListFooterComponent={FooterComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  resultCount: {
    fontSize: 12,
    color: "#94A3B8",
    marginBottom: 10,
    paddingLeft: 2,
  },
  listContent: {
    paddingBottom: 8,
  },
  empty: {
    alignItems: "center",
    paddingVertical: 60,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginTop: 4,
  },
  emptyDesc: {
    fontSize: 13,
    color: "#9CA3AF",
    textAlign: "center",
  },
  loadingFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  loadingText: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "500",
  },
});
