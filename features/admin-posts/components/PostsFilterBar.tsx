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
  { id: "edited", label: "Đã sửa" },
];

const STATUS_DOT_COLORS: Record<string, string> = {
  pending: "#F59E0B",
  approved: "#10B981",
  rejected: "#F43F5E",
  edited: "#8B5CF6",
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

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Auto-insert "/" after DD and MM while typing */
function formatDateInput(raw: string, prev: string): string {
  // Strip non-digits
  const digits = raw.replace(/\D/g, "");
  let result = digits;
  if (digits.length > 2) result = digits.slice(0, 2) + "/" + digits.slice(2);
  if (digits.length > 4) result = result.slice(0, 5) + "/" + result.slice(5, 9);
  return result;
}

/** Check if a DD/MM/YYYY string is a valid date */
function isValidDate(val: string): boolean {
  if (val.length !== 10) return false;
  const parts = val.split("/");
  if (parts.length !== 3) return false;
  const d = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  const y = parseInt(parts[2], 10);
  if (y < 2000 || y > 2100 || m < 1 || m > 12 || d < 1 || d > 31) return false;
  return true;
}

// ── DateInput sub-component ────────────────────────────────────────────────────

interface DateInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

function DateInput({ label, value, onChange, placeholder }: DateInputProps) {
  const [raw, setRaw] = useState(value);
  const isValid = raw.length === 0 || isValidDate(raw);

  const handleChange = (text: string) => {
    const formatted = formatDateInput(text, raw);
    setRaw(formatted);
    // Only push to parent when complete or empty
    if (formatted.length === 10 && isValidDate(formatted)) {
      onChange(formatted);
    } else if (formatted.length === 0) {
      onChange("");
    }
  };

  const handleClear = () => {
    setRaw("");
    onChange("");
  };

  return (
    <View style={dateStyles.wrapper}>
      <Text style={dateStyles.label}>{label}</Text>
      <View
        style={[
          dateStyles.inputBox,
          !isValid && dateStyles.inputError,
          value.length === 10 && isValid && dateStyles.inputActive,
        ]}
      >
        <Ionicons
          name="calendar-outline"
          size={14}
          color={!isValid ? "#EF4444" : value ? "#1E293B" : "#9CA3AF"}
        />
        <TextInput
          style={dateStyles.input}
          value={raw}
          onChangeText={handleChange}
          placeholder={placeholder ?? "DD/MM/YYYY"}
          placeholderTextColor="#CBD5E1"
          keyboardType="numeric"
          maxLength={10}
        />
        {raw.length > 0 && (
          <TouchableOpacity onPress={handleClear} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="close-circle" size={14} color="#CBD5E1" />
          </TouchableOpacity>
        )}
      </View>
      {!isValid && (
        <Text style={dateStyles.errorText}>Định dạng: DD/MM/YYYY</Text>
      )}
    </View>
  );
}

const dateStyles = StyleSheet.create({
  wrapper: { flex: 1 },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  inputActive: {
    borderColor: "#1E293B",
    backgroundColor: "#F0F4FF",
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: "#1E293B",
    padding: 0,
    fontFamily: "monospace",
  },
  errorText: {
    fontSize: 10,
    color: "#EF4444",
    marginTop: 4,
  },
});

// ── Main component ─────────────────────────────────────────────────────────────

export function PostsFilterBar({
  filters,
  onFilterChange,
}: PostsFilterBarProps) {
  const [searchText, setSearchText] = useState(filters.query);
  const [showFilterDrawer, setShowFilterDrawer] = useState(
    filters.status !== "all" || filters.dateFrom !== "" || filters.dateTo !== ""
  );

  const handleSearch = (text: string) => {
    setSearchText(text);
    onFilterChange({ ...filters, query: text });
  };

  const handleStatusChange = (status: string) => {
    onFilterChange({ ...filters, status });
  };

  const handleDateFrom = (val: string) => {
    onFilterChange({ ...filters, dateFrom: val });
  };

  const handleDateTo = (val: string) => {
    onFilterChange({ ...filters, dateTo: val });
  };

  const handleClearFilters = () => {
    // Only clear advanced filters, keep search query
    onFilterChange({ ...filters, status: "all", dateFrom: "", dateTo: "" });
  };

  const hasActiveAdvancedFilters =
    filters.status !== "all" || filters.dateFrom !== "" || filters.dateTo !== "";

  return (
    <View style={styles.container}>
      {/* Row 1: Search + Filter Toggle */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={18}
            color="#9CA3AF"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm bài đăng..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={handleSearch}
          />
          {searchText !== "" && (
            <TouchableOpacity onPress={() => handleSearch("")} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Toggle Button */}
        <TouchableOpacity
          style={[
            styles.filterToggleBtn,
            (showFilterDrawer || hasActiveAdvancedFilters) && styles.filterToggleBtnActive,
          ]}
          onPress={() => setShowFilterDrawer((v) => !v)}
        >
          <Ionicons
            name="options-outline"
            size={20}
            color={showFilterDrawer || hasActiveAdvancedFilters ? "#FFFFFF" : "#64748B"}
          />
          {hasActiveAdvancedFilters && (
            <View style={styles.badgeDot} />
          )}
        </TouchableOpacity>
      </View>

      {/* Row 2: Advanced Filters Drawer */}
      {showFilterDrawer && (
        <View style={styles.filterDrawer}>
          <View style={styles.filterDrawerHeader}>
            <Text style={styles.filterDrawerTitle}>Bộ lọc năng cao</Text>
            {hasActiveAdvancedFilters && (
              <TouchableOpacity style={styles.clearBtn} onPress={handleClearFilters}>
                <Ionicons name="refresh-outline" size={14} color="#EF4444" />
                <Text style={styles.clearBtnText}>Xóa bộ lọc</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Status Filters */}
          <Text style={styles.filterSectionTitle}>Trạng thái</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.statusScroll}
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
                        {
                          backgroundColor:
                            STATUS_DOT_COLORS[s.id] ?? "#9CA3AF",
                        },
                      ]}
                    />
                  )}
                  <Text
                    style={[
                      styles.pillText,
                      isActive && styles.pillTextActive,
                    ]}
                  >
                    {s.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Date Range Filters */}
          <Text style={styles.filterSectionTitle}>Khoảng thời gian</Text>
          <View style={styles.dateRow}>
            <DateInput
              label="Từ ngày"
              value={filters.dateFrom}
              onChange={handleDateFrom}
            />
            <View style={styles.dateSeparator}>
              <Text style={styles.dateSeparatorText}>—</Text>
            </View>
            <DateInput
              label="Đến ngày"
              value={filters.dateTo}
              onChange={handleDateTo}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchIcon: {
    marginRight: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#1E293B",
    padding: 0,
  },
  filterToggleBtn: {
    position: "relative",
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  filterToggleBtnActive: {
    backgroundColor: "#1E293B",
    borderColor: "#1E293B",
  },
  badgeDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F59E0B",
    borderWidth: 1.5,
    borderColor: "#1E293B",
  },
  filterDrawer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  filterDrawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
  },
  filterDrawerTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
  },
  clearBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#FEF2F2",
    borderRadius: 6,
  },
  clearBtnText: {
    fontSize: 12,
    color: "#EF4444",
    fontWeight: "600",
  },
  filterSectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 10,
  },
  statusScroll: {
    flexGrow: 0,
    marginBottom: 20,
  },
  statusContent: {
    gap: 8,
    alignItems: "center",
    paddingRight: 10,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 6,
  },
  pillActive: {
    backgroundColor: "#1E293B",
    borderColor: "#1E293B",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pillText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#64748B",
  },
  pillTextActive: {
    color: "#FFFFFF",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  dateSeparator: {
    paddingTop: 36,
    alignItems: "center",
  },
  dateSeparatorText: {
    fontSize: 16,
    color: "#CBD5E1",
  },
});
