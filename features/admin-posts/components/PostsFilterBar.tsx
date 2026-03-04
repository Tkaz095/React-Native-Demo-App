import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ── Types ──────────────────────────────────────────────────────────────────────

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

// ── Dropdown options ───────────────────────────────────────────────────────────

const STATUS_OPTIONS = [
  { id: "all", label: "Tất cả" },
  { id: "pending", label: "Chờ duyệt" },
  { id: "approved", label: "Đã duyệt" },
  { id: "rejected", label: "Từ chối" },
  { id: "edited", label: "Đã sửa" },
] as const;

// ── Date Input Header Formatter ──────────────────────────────────────────────────

function formatDateInput(text: string): string {
  const digits = text.replace(/\D/g, "");
  let result = digits;
  if (digits.length > 2) result = digits.slice(0, 2) + "/" + digits.slice(2);
  if (digits.length > 4) result = result.slice(0, 5) + "/" + result.slice(5, 9);
  return result;
}

function isValidDate(val: string): boolean {
  if (val.length !== 10) return false;
  const parts = val.split("/");
  if (parts.length !== 3) return false;
  const d = parseInt(parts[0], 10),
    m = parseInt(parts[1], 10),
    y = parseInt(parts[2], 10);
  return y >= 2000 && y <= 2100 && m >= 1 && m <= 12 && d >= 1 && d <= 31;
}

interface DateInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

function DateInput({ label, value, onChange }: DateInputProps) {
  const [raw, setRaw] = useState(value);
  const isValid = raw.length === 0 || isValidDate(raw);

  const handleChange = (text: string) => {
    const formatted = formatDateInput(text);
    setRaw(formatted);
    // Push format up immediately if valid length or empty
    if (formatted.length === 10 && isValidDate(formatted)) {
      onChange(formatted);
    } else if (formatted.length === 0) {
      onChange("");
    }
  };

  // Sync external value
  useEffect(() => {
    if (value !== raw && (value.length === 0 || value.length === 10)) {
      setRaw(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <View style={diStyles.wrapper}>
      <View
        style={[
          diStyles.box,
          !isValid && diStyles.boxError,
          value && diStyles.boxActive,
        ]}
      >
        <TextInput
          style={diStyles.input}
          value={raw}
          onChangeText={handleChange}
          placeholder={label}
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          maxLength={10}
        />
        {raw.length > 0 ? (
          <TouchableOpacity
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            onPress={() => {
              setRaw("");
              onChange("");
            }}
          >
            <Ionicons name="close-circle" size={14} color="#CBD5E1" />
          </TouchableOpacity>
        ) : (
          <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
        )}
      </View>
      {!isValid && <Text style={diStyles.err}>DD/MM/YYYY</Text>}
    </View>
  );
}

const diStyles = StyleSheet.create({
  wrapper: { flex: 1 },
  box: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  boxActive: { borderColor: "#3B82F6", backgroundColor: "#FFFFFF" },
  boxError: { borderColor: "#EF4444", backgroundColor: "#FEF2F2" },
  input: { flex: 1, fontSize: 14, color: "#1E293B", padding: 0 },
  err: { fontSize: 10, color: "#EF4444", marginTop: 4 },
});

// ── Main component ─────────────────────────────────────────────────────────────

export function PostsFilterBar({
  filters,
  onFilterChange,
}: PostsFilterBarProps) {
  const [searchText, setSearchText] = useState(filters.query);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Draft state for modal. We only commit to `onFilterChange` when "Áp dụng" is pressed.
  const [draftFilters, setDraftFilters] = useState<PostFilterState>(filters);

  // Sync draft filters when modal opens
  useEffect(() => {
    if (showFilterModal) {
      setDraftFilters(filters);
    }
  }, [showFilterModal, filters]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    onFilterChange({ ...filters, query: text });
  };

  const hasAdvancedFilter =
    filters.status !== "all" || !!filters.dateFrom || !!filters.dateTo;

  const handleApply = () => {
    onFilterChange({ ...draftFilters, query: searchText });
    setShowFilterModal(false);
  };

  const handleClearModal = () => {
    setDraftFilters({ ...draftFilters, status: "all", dateFrom: "", dateTo: "" });
  };

  return (
    <View style={styles.container}>
      {/* Search Bar + Filter Button */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm theo tiêu đề, doanh nghiệp..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={handleSearch}
            returnKeyType="search"
          />
          {searchText !== "" && (
            <TouchableOpacity
              onPress={() => handleSearch("")}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setShowFilterModal(true)}
        >
          <MaterialIcons
            name="filter-list"
            size={22}
            color="#1E293B"
          />
          {hasAdvancedFilter && <View style={styles.filterBadge} />}
        </TouchableOpacity>
      </View>

      {/* Filter Modal Boundary */}
      <Modal
        visible={showFilterModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {/* Dismiss area */}
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setShowFilterModal(false)}
          />

          {/* Modal Sheet Content */}
          <View style={styles.modalSheet}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Bộ lọc tìm kiếm</Text>
              <TouchableOpacity
                onPress={() => setShowFilterModal(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* Scrollable Filters */}
            <ScrollView
              style={styles.modalBody}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {/* STATUS */}
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>TRẠNG THÁI</Text>
                <View style={styles.chipsRow}>
                  {STATUS_OPTIONS.map((opt) => {
                    const isActive = draftFilters.status === opt.id;
                    return (
                      <TouchableOpacity
                        key={opt.id}
                        style={[
                          styles.chip,
                          isActive ? styles.chipActive : styles.chipInactive,
                        ]}
                        onPress={() =>
                          setDraftFilters({ ...draftFilters, status: opt.id })
                        }
                      >
                        <Text
                          style={
                            isActive
                              ? styles.chipTextActive
                              : styles.chipTextInactive
                          }
                        >
                          {opt.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* DATE RANGE */}
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>KHOẢNG THỜI GIAN</Text>
                <View style={styles.dateRow}>
                  <DateInput
                    label="Từ ngày"
                    value={draftFilters.dateFrom}
                    onChange={(v) =>
                      setDraftFilters({ ...draftFilters, dateFrom: v })
                    }
                  />
                  <View style={styles.dateSep}>
                    <Text style={styles.dateSepText}>—</Text>
                  </View>
                  <DateInput
                    label="Đến ngày"
                    value={draftFilters.dateTo}
                    onChange={(v) =>
                      setDraftFilters({ ...draftFilters, dateTo: v })
                    }
                  />
                </View>
              </View>
            </ScrollView>

            {/* Footer Buttons */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={handleClearModal}
              >
                <Text style={styles.clearBtnText}>Xóa bộ lọc</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
                <Text style={styles.applyBtnText}>Áp dụng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 10 },

  // --- Search Row UI (Ảnh 1) ---
  searchRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: { flex: 1, fontSize: 14, color: "#1E293B", padding: 0 },
  filterBtn: {
    width: 44,
    height: 44,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  filterBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },

  // --- Modal Bottom Sheet UI (Ảnh 2) ---
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "85%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
  },
  modalTitle: { fontSize: 18, fontWeight: "700", color: "#1E293B" },
  modalBody: { paddingHorizontal: 16, paddingTop: 16 },

  // Filter sections
  filterSection: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 12,
  },
  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipInactive: { backgroundColor: "#F1F5F9", borderColor: "#F1F5F9" },
  chipActive: { backgroundColor: "#EFF6FF", borderColor: "#3B82F6" },
  chipTextInactive: { fontSize: 14, color: "#475569", fontWeight: "500" },
  chipTextActive: { fontSize: 14, color: "#3B82F6", fontWeight: "600" },

  // Date
  dateRow: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  dateSep: { paddingTop: 10, alignItems: "center" },
  dateSepText: { fontSize: 16, color: "#9CA3AF" },

  // Modal Footer
  modalFooter: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: "#F1F5F9",
    backgroundColor: "#FFFFFF",
    paddingBottom: Platform.OS === "ios" ? 32 : 16,
  },
  clearBtn: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  clearBtnText: { fontSize: 15, fontWeight: "600", color: "#475569" },
  applyBtn: {
    flex: 1,
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  applyBtnText: { fontSize: 15, fontWeight: "600", color: "#FFFFFF" },
});
