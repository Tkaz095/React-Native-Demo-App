import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { EVENT_FEES_LIST_MOCK, EVENT_FEE_STATS_MOCK, EVENT_OVERVIEW_MOCK } from '../data/event-fees.data';
import { EventFeeTransaction } from '../types/admin-transactions.types';

export function EventFeesTab() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [filterStatus, setFilterStatus] = useState<"all" | EventFeeTransaction["status"]>("all");
    const [draftStatus, setDraftStatus] = useState<"all" | EventFeeTransaction["status"]>("all");
    const [filterAmount, setFilterAmount] = useState<"all" | "lt1" | "1_5" | "gt5">("all");
    const [draftAmount, setDraftAmount] = useState<"all" | "lt1" | "1_5" | "gt5">("all");
    const [filterTime, setFilterTime] = useState<"all" | "today" | "week" | "month">("all");
    const [draftTime, setDraftTime] = useState<"all" | "today" | "week" | "month">("all");

    // Sync draft filters when modal opens
    React.useEffect(() => {
        if (isFilterVisible) {
            setDraftStatus(filterStatus);
            setDraftAmount(filterAmount);
            setDraftTime(filterTime);
        }
    }, [isFilterVisible, filterStatus, filterAmount, filterTime]);

    const handleApplyFilters = () => {
        setFilterStatus(draftStatus);
        setFilterAmount(draftAmount);
        setFilterTime(draftTime);
        setPage(1); // Reset page on new filter
        setIsFilterVisible(false);
    };

    const handleClearFilters = () => {
        setDraftStatus("all");
        setDraftAmount("all");
        setDraftTime("all");
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
                                    { id: "success", label: "Thành công" },
                                    { id: "failed", label: "Thất bại" },
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
                            <Text style={styles.filterLabelTitle}>SỐ TIỀN</Text>
                            <View style={styles.chipsRow}>
                                {([
                                    { id: "all", label: "Tất cả" },
                                    { id: "lt1", label: "< 1 triệu" },
                                    { id: "1_5", label: "1-5 triệu" },
                                    { id: "gt5", label: "> 5 triệu" },
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

                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabelTitle}>THỜI GIAN</Text>
                            <View style={styles.chipsRow}>
                                {([
                                    { id: "all", label: "Tất cả" },
                                    { id: "today", label: "Hôm nay" },
                                    { id: "week", label: "Tuần này" },
                                    { id: "month", label: "Tháng này" },
                                ] as const).map((opt) => {
                                    const isActive = draftTime === opt.id;
                                    return (
                                        <TouchableOpacity
                                            key={opt.id}
                                            style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
                                            onPress={() => setDraftTime(opt.id as any)}
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

    const filteredEvents = useMemo(() => {
        let result = EVENT_FEES_LIST_MOCK;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                e => e.eventName.toLowerCase().includes(query) || e.participantInfo.toLowerCase().includes(query)
            );
        }

        if (filterStatus !== "all") {
            result = result.filter(e => e.status === filterStatus);
        }

        if (filterAmount !== "all") {
            result = result.filter(e => {
                if (filterAmount === "lt1") return e.amount < 1000000;
                if (filterAmount === "1_5") return e.amount >= 1000000 && e.amount <= 5000000;
                if (filterAmount === "gt5") return e.amount > 5000000;
                return true;
            });
        }

        if (filterTime !== "all") {
            // Simplified date filtering based on mock exact strings
            result = result.filter(e => {
                const isToday = e.date === "12/03/2026"; // Mocking today as most recent date in data
                const isThisWeek = ["12/03/2026", "06/03/2026", "05/03/2026", "04/03/2026", "03/03/2026"].includes(e.date);
                const isThisMonth = e.date.endsWith("/03/2026");

                if (filterTime === "today") return isToday;
                if (filterTime === "week") return isThisWeek;
                if (filterTime === "month") return isThisMonth;
                return true;
            });
        }

        return result;
    }, [searchQuery, filterStatus, filterAmount, filterTime]);

    const currentEvents = useMemo(() => {
        return filteredEvents.slice(0, page * ITEMS_PER_PAGE);
    }, [filteredEvents, page]);

    const hasMore = currentEvents.length < filteredEvents.length;

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
            case 'success': return { bg: '#ECFDF5', text: '#059669', border: '#D1FAE5', label: 'Thành công' };
            case 'failed': return { bg: '#FEF2F2', text: '#DC2626', border: '#FEE2E2', label: 'Thất bại' };
            default: return { bg: '#F3F4F6', text: '#374151', border: '#E5E7EB', label: status };
        }
    };

    const renderEventCard = ({ item, index }: { item: EventFeeTransaction, index: number }) => {
        const statusStyle = getStatusStyle(item.status);
        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.eventIndex}>
                        <Text style={styles.eventIndexText}>{(page - 1) * ITEMS_PER_PAGE + index + 1}</Text>
                    </View>
                    <View style={styles.eventInfo}>
                        <Text style={styles.eventName} numberOfLines={2}>{item.eventName}</Text>
                    </View>
                </View>
                <View style={styles.cardBody}>
                    <View style={styles.infoRowSpaceBetween}>
                        <Text style={styles.infoLabel}>Người tham gia:</Text>
                        <Text style={styles.participantValue} numberOfLines={1}>{item.participantInfo}</Text>
                    </View>
                    <View style={styles.infoRowSpaceBetween}>
                        <Text style={styles.infoLabel}>Ngày đóng:</Text>
                        <Text style={styles.infoValue}>{item.date}</Text>
                    </View>
                    <View style={styles.infoRowSpaceBetween}>
                        <Text style={styles.infoLabel}>Phí đóng:</Text>
                        <Text style={styles.amountValue}>{formatCurrency(item.amount)}</Text>
                    </View>
                </View>
                <View style={styles.cardFooter}>
                    <View style={[styles.badge, { backgroundColor: statusStyle.bg, borderColor: statusStyle.border }]}>
                        <Ionicons name={item.status === 'success' ? 'checkmark-circle' : 'close-circle'} size={14} color={statusStyle.text} />
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
                        <Ionicons name="cash-outline" size={16} color="#10B981" />
                        <Text style={[styles.statTitle, { color: '#10B981' }]}>TỔNG PHÍ ĐÃ THU</Text>
                    </View>
                    <Text style={[styles.statValue, { color: '#10B981' }]}>{formatCurrency(EVENT_FEE_STATS_MOCK.totalCollected)}</Text>
                    <Text style={[styles.statDesc, { color: '#10B981' }]}>{EVENT_FEE_STATS_MOCK.successfulTransactionsCount} giao dịch</Text>
                </View>

                <View style={styles.statBox}>
                    <View style={styles.statHeaderSpaceBetween}>
                        <View style={styles.statHeaderRow}>
                            <Ionicons name="people-outline" size={16} color="#3B82F6" />
                            <Text style={styles.statTitle}>LƯỢT ĐĂNG KÍ</Text>
                        </View>
                        <View style={styles.statHeaderRow}>
                            <Ionicons name="alert-circle-outline" size={14} color="#EF4444" />
                            <Text style={[styles.statDesc, { color: '#EF4444' }]}>{EVENT_FEE_STATS_MOCK.failedTransactionsCount} thất bại</Text>
                        </View>
                    </View>
                    <Text style={[styles.statValue, { color: '#3B82F6' }]}>{EVENT_FEE_STATS_MOCK.totalRegistrations}</Text>
                </View>

                <View style={styles.statBox}>
                    <View style={styles.statHeaderSpaceBetween}>
                        <View style={styles.statHeaderRow}>
                            <Ionicons name="calendar-outline" size={16} color="#A855F7" />
                            <Text style={styles.statTitle}>SỰ KIỆN THU PHÍ</Text>
                        </View>
                        <Text style={[styles.statDesc, { color: '#A855F7' }]}>Đang diễn ra</Text>
                    </View>
                    <Text style={[styles.statValue, { color: '#A855F7' }]}>{EVENT_FEE_STATS_MOCK.totalChargingEvents}</Text>
                </View>
            </ScrollView>

            {/* Overview Banner */}
            <View style={styles.overviewBanner}>
                <View style={styles.overviewHeader}>
                    <View>
                        <Text style={styles.overviewTitle}>Tổng quan phí tham gia sự kiện</Text>
                        <Text style={styles.overviewDesc}>Theo dõi giao dịch phí tham gia sự kiện tự động</Text>
                    </View>
                    <View style={styles.calendarIconWrapper}>
                        <Ionicons name="calendar" size={20} color="#F59E0B" />
                    </View>
                </View>

                <View style={styles.overviewStatsRow}>
                    <View style={styles.overviewStatCol}>
                        <Text style={styles.overviewStatLabel}>Tỷ lệ thành công</Text>
                        <Text style={styles.overviewStatValuePercent}>{EVENT_OVERVIEW_MOCK.successRate.toFixed(1)}%</Text>
                    </View>
                    <View style={styles.overviewStatCol}>
                        <Text style={styles.overviewStatLabel}>Trung bình/giao dịch</Text>
                        <Text style={styles.overviewStatValueAmount}>{formatCurrency(EVENT_OVERVIEW_MOCK.averagePerTransaction)} / gd</Text>
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
                            placeholder="Tìm sự kiện, người tham gia..."
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={() => setIsFilterVisible(true)}
                    >
                        <Ionicons name="filter" size={18} color="#1E293B" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={currentEvents}
                keyExtractor={item => item.id}
                renderItem={renderEventCard}
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
        width: 240,
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
    statHeaderSpaceBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    statHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statTitle: {
        fontSize: 11,
        color: '#6B7280',
        fontWeight: 'bold',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    statDesc: {
        fontSize: 11,
        color: '#9CA3AF',
        fontWeight: '500'
    },
    overviewBanner: {
        backgroundColor: '#1E293B',
        borderRadius: 12,
        padding: 20,
    },
    overviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    overviewTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    overviewDesc: {
        color: '#94A3B8',
        fontSize: 12,
    },
    calendarIconWrapper: {
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        padding: 8,
        borderRadius: 8,
    },
    overviewStatsRow: {
        flexDirection: 'row',
        gap: 32,
    },
    overviewStatCol: {
        gap: 4,
    },
    overviewStatLabel: {
        color: '#64748B',
        fontSize: 11,
    },
    overviewStatValuePercent: {
        color: '#F59E0B',
        fontSize: 20,
        fontWeight: 'bold',
    },
    overviewStatValueAmount: {
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
    eventIndex: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    eventIndexText: {
        fontSize: 12,
        color: '#4B5563',
        fontWeight: '600',
    },
    eventInfo: {
        flex: 1,
    },
    eventName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        lineHeight: 20,
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
    participantValue: {
        fontSize: 13,
        color: '#374151',
        fontWeight: '500',
        flex: 1,
        textAlign: 'right',
        marginLeft: 16,
    },
    infoValue: {
        fontSize: 13,
        color: '#374151',
        fontWeight: '500',
    },
    amountValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111827',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        gap: 4,
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
