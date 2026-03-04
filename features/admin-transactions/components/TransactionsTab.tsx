import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { REVENUE_STATS_MOCK, TRANSACTIONS_LIST_MOCK } from '../data/admin-transactions.data';
import { Transaction } from '../types/admin-transactions.types';

export function TransactionsTab() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [filterType, setFilterType] = useState<"all" | Transaction["type"]>("all");
    const [draftType, setDraftType] = useState<"all" | Transaction["type"]>("all");
    const [filterAmount, setFilterAmount] = useState<"all" | "lt2" | "2_10" | "gt10">("all");
    const [draftAmount, setDraftAmount] = useState<"all" | "lt2" | "2_10" | "gt10">("all");
    const [filterTime, setFilterTime] = useState<"all" | "today" | "week" | "month">("all");
    const [draftTime, setDraftTime] = useState<"all" | "today" | "week" | "month">("all");

    // Sync draft filters when modal opens
    React.useEffect(() => {
        if (isFilterVisible) {
            setDraftType(filterType);
            setDraftAmount(filterAmount);
            setDraftTime(filterTime);
        }
    }, [isFilterVisible, filterType, filterAmount, filterTime]);

    const handleApplyFilters = () => {
        setFilterType(draftType);
        setFilterAmount(draftAmount);
        setFilterTime(draftTime);
        setPage(1); // Reset page on new filter
        setIsFilterVisible(false);
    };

    const handleClearFilters = () => {
        setDraftType("all");
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
                            <Text style={styles.filterLabelTitle}>LOẠI GIAO DỊCH</Text>
                            <View style={styles.chipsRow}>
                                {([
                                    { id: "all", label: "Tất cả" },
                                    { id: "TG", label: "Tham gia" },
                                    { id: "HH", label: "Hoa hồng" },
                                    { id: "HV", label: "Hội viên" },
                                ] as const).map((opt) => {
                                    const isActive = draftType === opt.id;
                                    return (
                                        <TouchableOpacity
                                            key={opt.id}
                                            style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
                                            onPress={() => setDraftType(opt.id as any)}
                                        >
                                            <Text style={isActive ? styles.chipTextActive : styles.chipTextInactive}>
                                                {opt.label}
                                            </Text>
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
                                    { id: "lt2", label: "< 2 triệu" },
                                    { id: "2_10", label: "2-10 tr" },
                                    { id: "gt10", label: "> 10 triệu" },
                                ] as const).map((opt) => {
                                    const isActive = draftAmount === opt.id;
                                    return (
                                        <TouchableOpacity
                                            key={opt.id}
                                            style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
                                            onPress={() => setDraftAmount(opt.id as any)}
                                        >
                                            <Text style={isActive ? styles.chipTextActive : styles.chipTextInactive}>
                                                {opt.label}
                                            </Text>
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
                                            <Text style={isActive ? styles.chipTextActive : styles.chipTextInactive}>
                                                {opt.label}
                                            </Text>
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

    const filteredTransactions = useMemo(() => {
        let result = TRANSACTIONS_LIST_MOCK;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                t => t.id.toLowerCase().includes(query) || t.memberName.toLowerCase().includes(query)
            );
        }

        if (filterType !== "all") {
            result = result.filter(t => t.type === filterType);
        }

        if (filterAmount !== "all") {
            result = result.filter(t => {
                if (filterAmount === "lt2") return t.amount < 2000000;
                if (filterAmount === "2_10") return t.amount >= 2000000 && t.amount <= 10000000;
                if (filterAmount === "gt10") return t.amount > 10000000;
                return true;
            });
        }

        if (filterTime !== "all") {
            // Simplified date filtering based on mock exact matches for demo
            result = result.filter(t => {
                const isToday = t.date === "04/03/2026";
                const isThisWeek = ["04/03/2026", "03/03/2026", "01/03/2026"].includes(t.date);
                const isThisMonth = t.date.endsWith("/03/2026");

                if (filterTime === "today") return isToday;
                if (filterTime === "week") return isThisWeek;
                if (filterTime === "month") return isThisMonth;
                return true;
            });
        }

        return result;
    }, [searchQuery, filterType, filterAmount, filterTime]);

    const currentTransactions = useMemo(() => {
        return filteredTransactions.slice(0, page * ITEMS_PER_PAGE);
    }, [filteredTransactions, page]);

    const hasMore = currentTransactions.length < filteredTransactions.length;

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

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'TG': return 'Phí tham gia';
            case 'HH': return 'Phí hoa hồng';
            case 'HV': return 'Phí hội viên';
            default: return type;
        }
    };

    const renderTransactionCard = ({ item }: { item: Transaction }) => {
        return (
            <View style={styles.card}>
                <View style={styles.cardRow}>
                    <View style={styles.companyInfo}>
                        <Text style={styles.companyName} numberOfLines={1}>{item.memberName}</Text>
                        <Text style={styles.transactionId}>ID: {item.id}</Text>
                    </View>
                    <View style={styles.amountInfo}>
                        <Text style={styles.amountValue}>{formatCurrency(item.amount)}</Text>
                        <View style={styles.typeBadge}>
                            <Text style={styles.typeBadgeText}>{getTypeLabel(item.type)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    const renderHeader = () => (
        <View style={styles.listHeader}>
            {/* Stats Summary */}
            <View style={styles.statsContainer}>
                <View style={[styles.statBox, styles.statBoxPrimary]}>
                    <Text style={styles.statLabelWhite}>TỔNG DOANH THU NĂM 2026</Text>
                    <Text style={styles.statValueWhite}>{formatCurrency(REVENUE_STATS_MOCK.totalRevenue)}</Text>
                    <View style={styles.growthBadge}>
                        <Ionicons name="trending-up" size={12} color="#059669" />
                        <Text style={styles.growthText}>+{REVENUE_STATS_MOCK.totalRevenueGrowth}%</Text>
                    </View>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statBoxSmall}>
                        <View style={styles.statIconWrap}>
                            <Ionicons name="people" size={16} color="#10B981" />
                            <Text style={[styles.statLabel, { color: '#10B981' }]}>PHÍ HỘI VIÊN</Text>
                        </View>
                        <Text style={[styles.statValueSmall, { color: '#10B981' }]}>{formatCurrency(REVENUE_STATS_MOCK.totalMembersFee)}</Text>
                        <Text style={styles.statDesc}>{REVENUE_STATS_MOCK.totalMembersFeePercentage}% tổng DT</Text>
                    </View>

                    <View style={styles.statBoxSmall}>
                        <View style={styles.statIconWrap}>
                            <Ionicons name="pie-chart" size={16} color="#3B82F6" />
                            <Text style={[styles.statLabel, { color: '#3B82F6' }]}>PHÍ HOA HỒNG</Text>
                        </View>
                        <Text style={[styles.statValueSmall, { color: '#3B82F6' }]}>{formatCurrency(REVENUE_STATS_MOCK.totalCommission)}</Text>
                        <Text style={styles.statDesc}>{REVENUE_STATS_MOCK.totalCommissionPercentage}% tổng DT</Text>
                    </View>
                </View>
                <View style={styles.statBoxSmallCenter}>
                    <View style={styles.statIconWrap}>
                        <Ionicons name="calendar" size={16} color="#F59E0B" />
                        <Text style={[styles.statLabel, { color: '#F59E0B' }]}>PHÍ THAM GIA SK</Text>
                    </View>
                    <Text style={[styles.statValueSmall, { color: '#F59E0B' }]}>{formatCurrency(REVENUE_STATS_MOCK.totalEventFee)}</Text>
                    <Text style={styles.statDesc}>{REVENUE_STATS_MOCK.totalEventFeePercentage}% tổng DT</Text>
                </View>
            </View>

            {/* Simulated Chart Container */}
            <View style={styles.chartSimContainer}>
                <Text style={styles.sectionTitle}>CƠ CẤU DOANH THU</Text>
                <View style={styles.progressBarWrapper}>
                    <View style={[styles.progressSegment, { width: `${REVENUE_STATS_MOCK.totalMembersFeePercentage}%`, backgroundColor: '#10B981' }]} />
                    <View style={[styles.progressSegment, { width: `${REVENUE_STATS_MOCK.totalCommissionPercentage}%`, backgroundColor: '#3B82F6' }]} />
                    <View style={[styles.progressSegment, { width: `${REVENUE_STATS_MOCK.totalEventFeePercentage}%`, backgroundColor: '#F59E0B' }]} />
                </View>
                <View style={styles.legendWrapper}>
                    <View style={styles.legendItem}><View style={[styles.legendColor, { backgroundColor: '#10B981' }]} /><Text style={styles.legendText}>Hội viên ({REVENUE_STATS_MOCK.totalMembersFeePercentage}%)</Text></View>
                    <View style={styles.legendItem}><View style={[styles.legendColor, { backgroundColor: '#3B82F6' }]} /><Text style={styles.legendText}>Hoa hồng ({REVENUE_STATS_MOCK.totalCommissionPercentage}%)</Text></View>
                    <View style={styles.legendItem}><View style={[styles.legendColor, { backgroundColor: '#F59E0B' }]} /><Text style={styles.legendText}>Sự kiện ({REVENUE_STATS_MOCK.totalEventFeePercentage}%)</Text></View>
                </View>
            </View>

            {/* List Header */}
            <View style={styles.listHeaderTitle}>
                <Text style={styles.sectionTitle}>DANH SÁCH GIAO DỊCH</Text>
                <View style={styles.searchRow}>
                    <View style={styles.searchContainer}>
                        <Ionicons name="search-outline" size={18} color="#9CA3AF" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Tìm mã GD, tên hội viên..."
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
                data={currentTransactions}
                keyExtractor={item => item.id}
                renderItem={renderTransactionCard}
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
    statsContainer: {
        gap: 12,
    },
    statBox: {
        padding: 20,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        position: 'relative',
    },
    statBoxPrimary: {
        backgroundColor: '#1E293B', // Dark slate background like web
        borderColor: '#0F172A',
    },
    statLabelWhite: {
        color: '#94A3B8',
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 8,
    },
    statValueWhite: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
    },
    growthBadge: {
        position: 'absolute',
        top: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECFDF5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 16,
        gap: 4,
    },
    growthText: {
        color: '#059669',
        fontSize: 12,
        fontWeight: 'bold',
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    statBoxSmall: {
        flex: 1,
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
    statBoxSmallCenter: {
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
        alignItems: 'center'
    },
    statIconWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 8,
    },
    statLabel: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    statValueSmall: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statDesc: {
        fontSize: 11,
        color: '#6B7280',
    },
    chartSimContainer: {
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
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1F2937',
        alignSelf: 'flex-start',
        marginBottom: 16,
        textTransform: 'uppercase'
    },
    progressBarWrapper: {
        height: 24,
        flexDirection: 'row',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
    },
    progressSegment: {
        height: '100%',
    },
    legendWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 16,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    legendColor: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    legendText: {
        fontSize: 12,
        color: '#4B5563',
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
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    companyInfo: {
        flex: 1,
        gap: 4,
    },
    companyName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    transactionId: {
        fontSize: 12,
        color: '#6B7280',
    },
    amountInfo: {
        alignItems: 'flex-end',
        gap: 6,
    },
    amountValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111827',
    },
    typeBadge: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    typeBadgeText: {
        fontSize: 11,
        color: '#4B5563',
        fontWeight: '500'
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
