import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const STATUS_FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "pending", label: "Chờ duyệt" },
  { id: "approved", label: "Đã duyệt" },
  { id: "rejected", label: "Từ chối" },
];

const STATUS_DOT_COLORS: Record<string, string> = {
  pending: "#F59E0B",
  approved: "#10B981",
  rejected: "#F43F5E",
};

export interface PostFilterState {
  query: string;
  status: string;
  dateFrom: string;
  dateTo: string;
}

interface PostsFilterBarProps {
  filters: PostFilterState;
  onFilterChange: (newFilters: PostFilterState) => void;
}

export function PostsFilterBar({
  filters,
  onFilterChange,
}: PostsFilterBarProps) {
  const [searchText, setSearchText] = useState(filters.query);

  const handleSearch = (text: string) => {
    setSearchText(text);
    onFilterChange({ ...filters, query: text });
  };

  const handleStatusChange = (status: string) => {
    onFilterChange({ ...filters, status });
  };

  const handleClearFilters = () => {
    setSearchText("");
    onFilterChange({ query: "", status: "all", dateFrom: "", dateTo: "" });
  };

  const hasActiveFilters =
    filters.query !== "" ||
    filters.status !== "all" ||
    filters.dateFrom !== "" ||
    filters.dateTo !== "";

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={16}
            color="#9CA3AF"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm theo tiêu đề, tên doanh nghiệp..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={handleSearch}
          />
          {searchText !== "" && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <Ionicons name="close-circle" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
        {hasActiveFilters && (
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={handleClearFilters}
          >
            <Ionicons name="refresh-outline" size={14} color="#6B7280" />
            <Text style={styles.clearBtnText}>Xóa lọc</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Status Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.statusRow}
        contentContainerStyle={styles.statusContent}
      >
        {STATUS_FILTERS.map((s) => {
          const isActive = filters.status === s.id;
          return (
            <TouchableOpacity
              key={s.id}
              style={[styles.pill, isActive && styles.pillActive]}
              onPress={() => handleStatusChange(s.id)}
            >
              {s.id !== "all" && (
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: STATUS_DOT_COLORS[s.id] ?? "#9CA3AF" },
                  ]}
                />
              )}
              <Text
                style={[styles.pillText, isActive && styles.pillTextActive]}
              >
                {s.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    gap: 8,
  },
  searchIcon: {
    marginRight: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#1E293B",
    padding: 0,
  },
  clearBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 9,
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    gap: 4,
  },
  clearBtnText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  statusRow: {
    flexShrink: 0,
  },
  statusContent: {
    gap: 6,
    paddingRight: 4,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 5,
  },
  pillActive: {
    backgroundColor: "#1E293B",
    borderColor: "#1E293B",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  pillText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748B",
  },
  pillTextActive: {
    color: "#FFFFFF",
  },
});
