import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { TRANSACTIONS_LIST_MOCK } from '../data/admin-transactions.data';
import { Transaction } from '../types/admin-transactions.types';

export default function TransactionsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterVisible, setFilterVisible] = useState(false);

    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    const [transactions] = useState<Transaction[]>(TRANSACTIONS_LIST_MOCK);

    const ITEMS_PER_PAGE = 10;
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const filteredTransactions = useMemo(() => {
        return transactions.filter(tx => {
            const matchesSearch = tx.memberName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = filterType === 'all' || tx.type === filterType;
            const matchesStatus = filterStatus === 'all' || tx.status === filterStatus;

            return matchesSearch && matchesType && matchesStatus;
        });
    }, [searchQuery, filterType, filterStatus, transactions]);

    // Khi lọc thay đổi, reset lại page
    React.useEffect(() => {
        setPage(1);
    }, [filteredTransactions.length]);

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

    const activeFilterCount = (filterType !== 'all' ? 1 : 0) + (filterStatus !== 'all' ? 1 : 0);

    const clearFilters = () => {
        setFilterType('all');
        setFilterStatus('all');
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

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'success': return { bg: '#ECFDF5', text: '#059669', border: '#D1FAE5', label: 'Thành công' };
            case 'pending': return { bg: '#FFF7ED', text: '#C2410C', border: '#FFEDD5', label: 'Chờ xử lý' };
            case 'failed': return { bg: '#FEF2F2', text: '#DC2626', border: '#FEE2E2', label: 'Thất bại' };
            default: return { bg: '#F3F4F6', text: '#374151', border: '#E5E7EB', label: status };
        }
    };

    const renderTransactionCard = ({ item }: { item: Transaction }) => {
        const statusStyle = getStatusStyle(item.status);

        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.companyInfo}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="receipt-outline" size={20} color="#1976D2" />
                        </View>
                        <View style={styles.companyText}>
                            <Text style={styles.companyName} numberOfLines={1}>{item.memberName}</Text>
                            <Text style={styles.transactionId}>ID: {item.id}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.cardBody}>
                    <View style={styles.infoRowSpaceBetween}>
                        <Text style={styles.infoLabel}>Loại giao dịch:</Text>
                        <Text style={styles.infoValue}>{getTypeLabel(item.type)}</Text>
                    </View>
                    <View style={styles.infoRowSpaceBetween}>
                        <Text style={styles.infoLabel}>Số tiền:</Text>
                        <Text style={styles.amountValue}>{formatCurrency(item.amount)}</Text>
                    </View>
                </View>

                <View style={styles.cardFooter}>
                    <View style={styles.badges}>
                        <View style={[styles.badge, { backgroundColor: statusStyle.bg, borderColor: statusStyle.border }]}>
                            <Text style={[styles.badgeText, { color: statusStyle.text }]}>{statusStyle.label}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header / Search */}
            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm theo tên đối tác..."
                        placeholderTextColor="#9CA3AF"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearIcon}>
                            <Ionicons name="close-circle" size={18} color="#9CA3AF" />
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity
                    style={[styles.filterButton, activeFilterCount > 0 && styles.filterButtonActive]}
                    onPress={() => setFilterVisible(true)}
                >
                    <Ionicons name="filter" size={20} color={activeFilterCount > 0 ? "#1976D2" : "#4B5563"} />
                    {activeFilterCount > 0 && (
                        <View style={styles.filterBadge}>
                            <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* List */}
            <FlatList
                data={currentTransactions}
                keyExtractor={(item) => item.id}
                renderItem={renderTransactionCard}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <Text style={styles.resultCount}>
                        Hiển thị {currentTransactions.length} / {filteredTransactions.length} giao dịch
                    </Text>
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="search-outline" size={48} color="#D1D5DB" />
                        <Text style={styles.emptyText}>Không tìm thấy giao dịch nào</Text>
                    </View>
                }
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    loadingMore ? (
                        <View style={{ paddingVertical: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 }}>
                            <Ionicons name="sync" size={20} color="#94A3B8" />
                            <Text style={{ fontSize: 13, color: '#94A3B8', fontWeight: '500' }}>Đang tải thêm...</Text>
                        </View>
                    ) : <View style={{ height: 20 }} />
                }
            />

            {/* Filter Modal */}
            <Modal
                visible={filterVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setFilterVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Bộ lọc tìm kiếm</Text>
                            <TouchableOpacity onPress={() => setFilterVisible(false)} style={styles.closeModalButton}>
                                <Ionicons name="close" size={24} color="#6B7280" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                            <View style={styles.filterSection}>
                                <Text style={styles.filterLabel}>Loại giao dịch</Text>
                                <View style={styles.chipWrap}>
                                    {[
                                        { val: 'all', label: 'Tất cả' },
                                        { val: 'TG', label: 'Phí tham gia' },
                                        { val: 'HH', label: 'Phí hoa hồng' },
                                        { val: 'HV', label: 'Phí hội viên' }
                                    ].map(type => (
                                        <TouchableOpacity
                                            key={type.val}
                                            style={[styles.chip, filterType === type.val && styles.chipActive]}
                                            onPress={() => setFilterType(type.val)}
                                        >
                                            <Text style={[styles.chipText, filterType === type.val && styles.chipTextActive]}>
                                                {type.label}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.filterSection}>
                                <Text style={styles.filterLabel}>Trạng thái</Text>
                                <View style={styles.chipWrap}>
                                    {[
                                        { val: 'all', label: 'Tất cả' },
                                        { val: 'success', label: 'Thành công' },
                                        { val: 'pending', label: 'Chờ xử lý' },
                                        { val: 'failed', label: 'Thất bại' }
                                    ].map(st => (
                                        <TouchableOpacity
                                            key={st.val}
                                            style={[styles.chip, filterStatus === st.val && styles.chipActive]}
                                            onPress={() => setFilterStatus(st.val)}
                                        >
                                            <Text style={[styles.chipText, filterStatus === st.val && styles.chipTextActive]}>
                                                {st.label}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </ScrollView>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity
                                style={[styles.modalBtn, styles.modalBtnSecondary]}
                                onPress={clearFilters}
                            >
                                <Text style={styles.modalBtnSecondaryText}>Xóa bộ lọc</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalBtn, styles.modalBtnPrimary]}
                                onPress={() => setFilterVisible(false)}
                            >
                                <Text style={styles.modalBtnPrimaryText}>Áp dụng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        gap: 12,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 40,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 14,
        color: '#111827',
    },
    clearIcon: {
        padding: 4,
    },
    filterButton: {
        width: 40,
        height: 40,
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    filterButtonActive: {
        backgroundColor: '#EFF6FF',
        borderColor: '#BFDBFE',
    },
    filterBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#EF4444',
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    filterBadgeText: {
        color: '#FFFFFF',
        fontSize: 9,
        fontWeight: 'bold',
    },
    listContent: {
        padding: 16,
        paddingBottom: 32,
        gap: 12,
    },
    resultCount: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 4,
        fontWeight: '500',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    companyInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#EFF6FF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    companyText: {
        flex: 1,
    },
    companyName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 2,
    },
    transactionId: {
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
        fontSize: 13,
        color: '#6B7280',
    },
    infoValue: {
        fontSize: 13,
        color: '#374151',
        fontWeight: '500',
    },
    amountValue: {
        fontSize: 14,
        color: '#1D4ED8',
        fontWeight: 'bold',
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    badges: {
        flexDirection: 'row',
        gap: 8,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        marginTop: 12,
        fontSize: 15,
        color: '#6B7280',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '90%',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    closeModalButton: {
        padding: 4,
    },
    modalBody: {
        padding: 16,
    },
    filterSection: {
        marginBottom: 24,
    },
    filterLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    chipWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    chipActive: {
        backgroundColor: '#EFF6FF',
        borderColor: '#3B82F6',
    },
    chipText: {
        fontSize: 14,
        color: '#4B5563',
    },
    chipTextActive: {
        color: '#1D4ED8',
        fontWeight: '500',
    },
    modalFooter: {
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        gap: 12,
        backgroundColor: '#FFFFFF',
    },
    modalBtn: {
        flex: 1,
        height: 44,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBtnSecondary: {
        backgroundColor: '#F3F4F6',
    },
    modalBtnSecondaryText: {
        color: '#4B5563',
        fontWeight: '600',
        fontSize: 15,
    },
    modalBtnPrimary: {
        backgroundColor: '#1976D2',
    },
    modalBtnPrimaryText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 15,
    },
});
