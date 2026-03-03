import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Post } from "../contexts/PostsContext";

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50];

export function PostApprovalList({ initialPosts }: { initialPosts?: Post[] }) {
  const router = useRouter();
  const posts = initialPosts ?? [];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null,
  );

  // ── Sorting ───────────────────────────────────────────────────────────────
  const parseDate = (dString: string) => {
    const parts = (dString ?? "").split("/");
    if (parts.length === 3) {
      return new Date(
        Number(parts[2]),
        Number(parts[1]) - 1,
        Number(parts[0]),
      ).getTime();
    }
    return 0;
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0;
    let valA: string | number = "";
    let valB: string | number = "";
    if (sortColumn === "createdDate") {
      valA = parseDate(a.createdDate);
      valB = parseDate(b.createdDate);
    } else {
      valA = ((a[sortColumn as keyof Post] as string) ?? "").toLowerCase();
      valB = ((b[sortColumn as keyof Post] as string) ?? "").toLowerCase();
    }
    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedPosts.length / itemsPerPage));
  const currentPosts = sortedPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSort = (col: string) => {
    if (sortColumn === col) {
      if (sortDirection === "asc") setSortDirection("desc");
      else {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(col);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  const SortIcon = ({ col }: { col: string }) => {
    if (sortColumn !== col)
      return (
        <Ionicons name="swap-vertical-outline" size={12} color="#94A3B8" />
      );
    return (
      <Ionicons
        name={sortDirection === "asc" ? "arrow-up" : "arrow-down"}
        size={12}
        color="#1E293B"
      />
    );
  };

  // ── Render ────────────────────────────────────────────────────────────────
  const renderItem = ({ item, index }: { item: Post; index: number }) => {
    const stt = (currentPage - 1) * itemsPerPage + index + 1;
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => router.push(`/admin/posts/${item.id}` as any)}
        activeOpacity={0.7}
      >
        <Text style={[styles.cell, styles.cellStt]}>{stt}</Text>
        <Text style={[styles.cell, styles.cellTitle]} numberOfLines={2}>
          {item.title}
        </Text>
        <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
      </TouchableOpacity>
    );
  };

  const ListHeader = () => (
    <View style={styles.headerRow}>
      <Text style={[styles.headerCell, styles.cellStt]}>STT</Text>
      <TouchableOpacity
        style={[styles.headerCell, styles.cellTitle, styles.sortable]}
        onPress={() => handleSort("title")}
      >
        <Text style={styles.headerText}>Tiêu đề bài đăng</Text>
        <SortIcon col="title" />
      </TouchableOpacity>
    </View>
  );

  const EmptyComponent = () => (
    <View style={styles.empty}>
      <Ionicons name="document-text-outline" size={40} color="#CBD5E1" />
      <Text style={styles.emptyText}>Không tìm thấy bài đăng nào.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ListHeader />
      <FlatList
        data={currentPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={EmptyComponent}
        showsVerticalScrollIndicator={false}
      />

      {/* Pagination */}
      {sortedPosts.length > 0 && (
        <View style={styles.pagination}>
          <Text style={styles.paginationInfo}>
            {(currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, sortedPosts.length)} /{" "}
            {sortedPosts.length}
          </Text>
          <View style={styles.paginationBtns}>
            <TouchableOpacity
              disabled={currentPage === 1}
              style={[
                styles.pageBtn,
                currentPage === 1 && styles.pageBtnDisabled,
              ]}
              onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <Ionicons
                name="chevron-back"
                size={16}
                color={currentPage === 1 ? "#CBD5E1" : "#1E293B"}
              />
            </TouchableOpacity>
            <Text style={styles.pageIndicator}>
              {currentPage} / {totalPages}
            </Text>
            <TouchableOpacity
              disabled={currentPage === totalPages}
              style={[
                styles.pageBtn,
                currentPage === totalPages && styles.pageBtnDisabled,
              ]}
              onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              <Ionicons
                name="chevron-forward"
                size={16}
                color={currentPage === totalPages ? "#CBD5E1" : "#1E293B"}
              />
            </TouchableOpacity>
          </View>
          {/* Items per page */}
          <View style={styles.perPageRow}>
            {ITEMS_PER_PAGE_OPTIONS.map((n) => (
              <TouchableOpacity
                key={n}
                style={[
                  styles.perPageBtn,
                  itemsPerPage === n && styles.perPageBtnActive,
                ]}
                onPress={() => {
                  setItemsPerPage(n);
                  setCurrentPage(1);
                }}
              >
                <Text
                  style={[
                    styles.perPageText,
                    itemsPerPage === n && styles.perPageTextActive,
                  ]}
                >
                  {n}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  headerCell: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  headerText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  sortable: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  cell: {
    fontSize: 13,
    color: "#1E293B",
  },
  cellStt: {
    width: 36,
    textAlign: "center",
    color: "#64748B",
    fontSize: 12,
  },
  cellTitle: {
    flex: 1,
    paddingRight: 8,
    fontSize: 13,
  },
  empty: {
    alignItems: "center",
    paddingVertical: 48,
    gap: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
  },
  emptyText: {
    fontSize: 13,
    color: "#94A3B8",
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderTopWidth: 1,
    borderColor: "#E2E8F0",
    marginTop: 2,
    flexWrap: "wrap",
    gap: 6,
  },
  paginationInfo: {
    fontSize: 12,
    color: "#64748B",
  },
  paginationBtns: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  pageBtn: {
    padding: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  pageBtnDisabled: {
    opacity: 0.4,
  },
  pageIndicator: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "500",
  },
  perPageRow: {
    flexDirection: "row",
    gap: 4,
  },
  perPageBtn: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
  },
  perPageBtnActive: {
    backgroundColor: "#1E293B",
    borderColor: "#1E293B",
  },
  perPageText: {
    fontSize: 11,
    color: "#64748B",
  },
  perPageTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
