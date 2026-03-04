import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MEMBERSHIP_FEES_LIST_MOCK, MEMBERSHIP_STATS_MOCK } from '../data/membership-fees.data';
import { MembershipFee } from '../types/admin-transactions.types';

export function MembershipFeesTab() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [filterStatus, setFilterStatus] = useState<"all" | MembershipFee["status"]>("all");
    const [draftStatus, setDraftStatus] = useState<"all" | MembershipFee["status"]>("all");
    const [filterRole, setFilterRole] = useState<"all" | "Hội viên" | "Ban chấp hành">("all");
    const [draftRole, setDraftRole] = useState<"all" | "Hội viên" | "Ban chấp hành">("all");
    const [filterAmount, setFilterAmount] = useState<"all" | "lt5" | "5_10" | "gt10">("all");
    const [draftAmount, setDraftAmount] = useState<"all" | "lt5" | "5_10" | "gt10">("all");

    // Sync draft filters when modal opens
    React.useEffect(() => {
        if (isFilterVisible) {
            setDraftStatus(filterStatus);
            setDraftRole(filterRole);
            setDraftAmount(filterAmount);
        }
    }, [isFilterVisible, filterStatus, filterRole, filterAmount]);

    const handleApplyFilters = () => {
        setFilterStatus(draftStatus);
        setFilterRole(draftRole);
        setFilterAmount(draftAmount);
        setPage(1); // Reset page on new filter
        setIsFilterVisible(false);
    };

    const handleClearFilters = () => {
        setDraftStatus("all");
        setDraftRole("all");
        setDraftAmount("all");
    };

    const renderFilterModal = () => (
        <Modal
            visible={isFilterVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsFilterVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Bộ Lọc</Text>
                        <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
                            <Ionicons name="close" size={24} color="#111827" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabelTitle}>TRẠNG THÁI</Text>
                            <View style={styles.chipsRow}>
                                {([
                                    { id: "all", label: "Tất cả" },
                                    { id: "paid", label: "Đã thu" },
                                    { id: "unpaid", label: "Chưa thu" },
                                    { id: "overdue", label: "Quá hạn" },
                                ] as const).map((opt) => {
                                    const isActive = draftStatus === opt.id;
                                    return (
                                        <TouchableOpacity
                                            key={opt.id}
                                            style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
                                            onPress={() => setDraftStatus(opt.id as any)}
                                        >
                                            <Text style={isActive ? styles.chipTextActive : styles.chipTextInactive}>{opt.label}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>

                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabelTitle}>VAI TRÒ</Text>
                            <View style={styles.chipsRow}>
                                {([
                                    { id: "all", label: "Tất cả" },
                                    { id: "Hội viên", label: "Hội viên" },
                                    { id: "Ban chấp hành", label: "Ban chấp hành" },
                                ] as const).map((opt) => {
                                    const isActive = draftRole === opt.id;
                                    return (
                                        <TouchableOpacity
                                            key={opt.id}
                                            style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
                                            onPress={() => setDraftRole(opt.id as any)}
                                        >
                                            <Text style={isActive ? styles.chipTextActive : styles.chipTextInactive}>{opt.label}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>

                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabelTitle}>SỐ TIỀN</Text>
                            <View style={styles.chipsRow}>
                                {([
                                    { id: "all", label: "Tất cả" },
                                    { id: "lt5", label: "< 5 triệu" },
                                    { id: "5_10", label: "5-10 triệu" },
                                    { id: "gt10", label: "> 10 triệu" },
                                ] as const).map((opt) => {
                                    const isActive = draftAmount === opt.id;
                                    return (
                                        <TouchableOpacity
                                            key={opt.id}
                                            style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
                                            onPress={() => setDraftAmount(opt.id as any)}
                                        >
                                            <Text style={isActive ? styles.chipTextActive : styles.chipTextInactive}>{opt.label}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.modalFooter}>
                        <TouchableOpacity
                            style={styles.modalButtonSecondary}
                            onPress={handleClearFilters}
                        >
                            <Text style={styles.modalButtonSecondaryText}>Xóa bộ lọc</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButtonPrimary}
                            onPress={handleApplyFilters}
                        >
                            <Text style={styles.modalButtonPrimaryText}>Áp dụng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
    const ITEMS_PER_PAGE = 10;

    const filteredMemberships = useMemo(() => {
        let result = MEMBERSHIP_FEES_LIST_MOCK;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                m => m.companyName.toLowerCase().includes(query) || m.representative.toLowerCase().includes(query)
            );
        }

        if (filterStatus !== "all") {
            result = result.filter(m => m.status === filterStatus);
        }

        if (filterRole !== "all") {
            result = result.filter(m => m.role === filterRole);
        }

        if (filterAmount !== "all") {
            result = result.filter(m => {
                if (filterAmount === "lt5") return m.amount < 5000000;
                if (filterAmount === "5_10") return m.amount >= 5000000 && m.amount <= 10000000;
                if (filterAmount === "gt10") return m.amount > 10000000;
                return true;
            });
        }

        return result;
    }, [searchQuery, filterStatus, filterRole, filterAmount]);

    const currentMemberships = useMemo(() => {
        return filteredMemberships.slice(0, page * ITEMS_PER_PAGE);
    }, [filteredMemberships, page]);

    const hasMore = currentMemberships.length < filteredMemberships.length;

    const handleLoadMore = () => {
        if (!hasMore || loadingMore) return;
        setLoadingMore(true);
        setTimeout(() => {
            setPage((prev) => prev + 1);
            setLoadingMore(false);
        }, 500);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'paid': return { bg: '#ECFDF5', text: '#059669', border: '#D1FAE5', label: 'Đã đóng' };
            case 'unpaid': return { bg: '#FFF7ED', text: '#D97706', border: '#FEF3C7', label: 'Chưa đóng' };
            case 'overdue': return { bg: '#FEF2F2', text: '#DC2626', border: '#FEE2E2', label: 'Quá hạn' };
            default: return { bg: '#F3F4F6', text: '#374151', border: '#E5E7EB', label: status };
        }
    };

    const renderMembershipCard = ({ item, index }: { item: MembershipFee, index: number }) => {
        const statusStyle = getStatusStyle(item.status);
        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.companyIndex}>
                        <Text style={styles.companyIndexText}>{(page - 1) * ITEMS_PER_PAGE + index + 1}</Text>
                    </View>
                    <View style={styles.companyInfo}>
                        <Text style={styles.companyName} numberOfLines={1}>{item.companyName}</Text>
                        <Text style={styles.representative}>{item.representative} - {item.role}</Text>
                    </View>
                </View>
                <View style={styles.cardBody}>
                    <View style={styles.infoRowSpaceBetween}>
                        <Text style={styles.infoLabel}>Phí đóng:</Text>
                        <Text style={styles.amountValue}>{formatCurrency(item.amount)}</Text>
                    </View>
                    <View style={styles.infoRowSpaceBetween}>
                        <Text style={styles.infoLabel}>Hạn đóng:</Text>
                        <Text style={styles.dueDateValue}>{item.dueDate}</Text>
                    </View>
                </View>
                <View style={styles.cardFooter}>
                    <View style={[styles.badge, { backgroundColor: statusStyle.bg, borderColor: statusStyle.border }]}>
                        <Text style={[styles.badgeText, { color: statusStyle.text }]}>{statusStyle.label}</Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderHeader = () => (
        <View style={styles.listHeader}>
            {/* Stats ScrollView */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsScroll}>
                <View style={styles.statBox}>
                    <View style={styles.statHeader}>
                        <Ionicons name="cash-outline" size={16} color="#3B82F6" />
                        <Text style={styles.statTitle}>TỔNG PHẢI THU</Text>
                    </View>
                    <Text style={[styles.statValue, { color: '#3B82F6' }]}>{formatCurrency(MEMBERSHIP_STATS_MOCK.totalExpected)}</Text>
                    <Text style={styles.statDesc}>{MEMBERSHIP_STATS_MOCK.totalExpectedUsers} hội viên</Text>
                </View>

                <View style={styles.statBox}>
                    <View style={styles.statHeader}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#10B981" />
                        <Text style={styles.statTitle}>TỔNG ĐÃ THU</Text>
                    </View>
                    <Text style={[styles.statValue, { color: '#10B981' }]}>{formatCurrency(MEMBERSHIP_STATS_MOCK.totalCollected)}</Text>
                    <Text style={[styles.statDesc, { color: '#10B981', fontWeight: 'bold' }]}>{MEMBERSHIP_STATS_MOCK.totalCollectedPercentage}% hoàn thành</Text>
                </View>

                <View style={styles.statBox}>
                    <View style={styles.statHeader}>
                        <Ionicons name="time-outline" size={16} color="#F59E0B" />
                        <Text style={styles.statTitle}>TỔNG CHƯA THU</Text>
                    </View>
                    <Text style={[styles.statValue, { color: '#F59E0B' }]}>{formatCurrency(MEMBERSHIP_STATS_MOCK.totalUncollected)}</Text>
                    <Text style={[styles.statDesc, { color: '#F59E0B', fontWeight: 'bold' }]}>{MEMBERSHIP_STATS_MOCK.totalUncollectedPercentage}% còn lại</Text>
                </View>

                <View style={styles.statBox}>
                    <View style={styles.statHeader}>
                        <Ionicons name="alert-circle-outline" size={16} color="#EF4444" />
                        <Text style={styles.statTitle}>HV QUÁ HẠN</Text>
                    </View>
                    <Text style={[styles.statValue, { color: '#EF4444' }]}>{MEMBERSHIP_STATS_MOCK.totalOverdueUsers}</Text>
                    <Text style={[styles.statDesc, { color: '#EF4444' }]}>Cần nhắc nhở</Text>
                </View>
            </ScrollView>

            {/* Automation Banner */}
            <View style={styles.automationBanner}>
                <View style={styles.autoHeader}>
                    <Text style={styles.autoTitle}>Hệ thống tự động hóa</Text>
                    <Ionicons name="people" size={20} color="#94A3B8" />
                </View>
                <Text style={styles.autoDesc}>
                    Phí được tính theo vai trò thành viên. Trạng thái cập nhật tự động khi thanh toán. Nhắc nhở tự động gửi theo lịch.
                </Text>
                <View style={styles.autoStatsRow}>
                    <View>
                        <Text style={styles.autoStatLabel}>Tỷ lệ thu</Text>
                        <Text style={styles.autoStatValuePercent}>{MEMBERSHIP_STATS_MOCK.automationCollectionRate}%</Text>
                    </View>
                    <View>
                        <Text style={styles.autoStatLabel}>Còn lại</Text>
                        <Text style={styles.autoStatValueAmount}>{formatCurrency(MEMBERSHIP_STATS_MOCK.automationCollectedAmount)}</Text>
                    </View>
                </View>
            </View>

            {/* List Header */}
            <View style={styles.listHeaderTitle}>
                <View style={styles.searchRow}>
                    <View style={styles.searchContainer}>
                        <Ionicons name="search-outline" size={18} color="#9CA3AF" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Tìm tên DN, người đại diện..."
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={() => setIsFilterVisible(true)}
                    >
                        <MaterialIcons name="filter-list" size={22} color="#1E293B" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={currentMemberships}
                keyExtractor={item => item.id}
                renderItem={renderMembershipCard}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    loadingMore ? (
                        <View style={styles.loadingMore}>
                            <Ionicons name="sync" size={20} color="#94A3B8" />
                            <Text style={styles.loadingMoreText}>Đang tải thêm...</Text>
                        </View>
                    ) : <View style={{ height: 20 }} />
                }
            />
            {renderFilterModal()}
        </View>
    );
}

const styles = StyleSheet.create({
    listContent: {
        padding: 16,
        gap: 12,
    },
    listHeader: {
        gap: 16,
        marginBottom: 8,
    },
    statsScroll: {
        gap: 12,
        paddingBottom: 4,
    },
    statBox: {
        width: 200,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    statHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 12,
    },
    statTitle: {
        fontSize: 11,
        color: '#6B7280',
        fontWeight: 'bold',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    statDesc: {
        fontSize: 11,
        color: '#9CA3AF',
    },
    automationBanner: {
        backgroundColor: '#1E293B',
        borderRadius: 12,
        padding: 16,
    },
    autoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    autoTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    autoDesc: {
        color: '#94A3B8',
        fontSize: 12,
        marginBottom: 16,
        lineHeight: 18,
    },
    autoStatsRow: {
        flexDirection: 'row',
        gap: 32,
    },
    autoStatLabel: {
        color: '#64748B',
        fontSize: 11,
        marginBottom: 4,
    },
    autoStatValuePercent: {
        color: '#F59E0B',
        fontSize: 20,
        fontWeight: 'bold',
    },
    autoStatValueAmount: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    listHeaderTitle: {
        marginTop: 8,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 44,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#1E293B',
        padding: 0,
    },
    filterButton: {
        width: 44,
        height: 44,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    modalBody: {
        flex: 1,
        padding: 16,
    },
    modalFooter: {
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        gap: 12,
    },
    modalButtonSecondary: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        alignItems: 'center',
    },
    modalButtonSecondaryText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
    modalButtonPrimary: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#F59E0B',
        alignItems: 'center',
    },
    modalButtonPrimaryText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    // Filter sections
    filterSection: { marginBottom: 24 },
    filterLabelTitle: {
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
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        gap: 12,
    },
    companyIndex: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    companyIndexText: {
        fontSize: 12,
        color: '#4B5563',
        fontWeight: '600',
    },
    companyInfo: {
        flex: 1,
    },
    companyName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 2,
    },
    representative: {
        fontSize: 12,
        color: '#6B7280',
    },
    cardBody: {
        gap: 8,
        marginBottom: 12,
    },
    infoRowSpaceBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoLabel: {
        fontSize: 12,
        color: '#6B7280',
    },
    amountValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111827',
    },
    dueDateValue: {
        fontSize: 13,
        color: '#374151'
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '600',
    },
    loadingMore: {
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    loadingMoreText: {
        fontSize: 13,
        color: '#94A3B8',
        fontWeight: '500',
    }
});
