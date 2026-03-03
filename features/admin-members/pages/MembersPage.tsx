import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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
import { mockMembers } from '../data/admin-members.data';
import { Member } from '../types/admin-members.types';

export default function MembersPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterVisible, setFilterVisible] = useState(false);

    const [filterIndustry, setFilterIndustry] = useState('all');
    const [filterRegion, setFilterRegion] = useState('all');
    const [filterTier, setFilterTier] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    const [members] = useState<Member[]>(mockMembers);

    const industries = useMemo(() => ['all', ...Array.from(new Set(members.map(m => m.industry)))], [members]);
    const regions = useMemo(() => ['all', ...Array.from(new Set(members.map(m => m.region)))], [members]);
    const tiers = useMemo(() => ['all', 'Đồng', 'Bạc', 'Vàng', 'Kim cương'], []);

    const filteredMembers = useMemo(() => {
        return members.filter(member => {
            const matchesSearch =
                member.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.phone.includes(searchQuery) ||
                (member.taxCode && member.taxCode.includes(searchQuery));

            const matchesIndustry = filterIndustry === 'all' || member.industry === filterIndustry;
            const matchesRegion = filterRegion === 'all' || member.region === filterRegion;
            const matchesTier = filterTier === 'all' || member.tier === filterTier;
            const matchesStatus = filterStatus === 'all' || member.status === filterStatus;

            return matchesSearch && matchesIndustry && matchesRegion && matchesTier && matchesStatus;
        });
    }, [searchQuery, filterIndustry, filterRegion, filterTier, filterStatus, members]);

    const activeFilterCount = (filterIndustry !== 'all' ? 1 : 0) +
        (filterRegion !== 'all' ? 1 : 0) +
        (filterTier !== 'all' ? 1 : 0) +
        (filterStatus !== 'all' ? 1 : 0);

    const clearFilters = () => {
        setFilterIndustry('all');
        setFilterRegion('all');
        setFilterTier('all');
        setFilterStatus('all');
    };

    const getTierStyle = (tier: string) => {
        switch (tier) {
            case 'Kim cương': return { bg: '#EFF6FF', text: '#1D4ED8', border: '#DBEAFE' };
            case 'Vàng': return { bg: '#FEF9E7', text: '#B89730', border: '#FCE6A8' };
            case 'Bạc': return { bg: '#F3F4F6', text: '#374151', border: '#E5E7EB' };
            case 'Đồng': return { bg: '#FFF7ED', text: '#C2410C', border: '#FFEDD5' };
            default: return { bg: '#F3F4F6', text: '#374151', border: '#E5E7EB' };
        }
    };

    const renderMemberCard = ({ item }: { item: Member }) => {
        const tierStyle = getTierStyle(item.tier);
        const isActive = item.status === 'active';

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => router.push(`/admin/members/${item.id}` as any)}
                activeOpacity={0.7}
            >
                <View style={styles.cardHeader}>
                    <View style={styles.companyInfo}>
                        <View style={styles.avatar}>
                            <Ionicons name="business" size={20} color="#1976D2" />
                        </View>
                        <View style={styles.companyText}>
                            <Text style={styles.companyName} numberOfLines={1}>{item.companyName}</Text>
                            <Text style={styles.taxCode}>MST: {item.taxCode}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.cardBody}>
                    <View style={styles.infoRow}>
                        <Ionicons name="mail-outline" size={14} color="#6B7280" />
                        <Text style={styles.infoText} numberOfLines={1}>{item.email}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="call-outline" size={14} color="#6B7280" />
                        <Text style={styles.infoText}>{item.phone}</Text>
                    </View>
                </View>

                <View style={styles.cardFooter}>
                    <View style={styles.badges}>
                        <View style={[styles.badge, { backgroundColor: tierStyle.bg, borderColor: tierStyle.border }]}>
                            <Text style={[styles.badgeText, { color: tierStyle.text }]}>{item.tier}</Text>
                        </View>
                        <View style={[styles.badge, isActive ? styles.badgeActive : styles.badgeInactive]}>
                            <Text style={[styles.badgeText, isActive ? styles.badgeActiveText : styles.badgeInactiveText]}>
                                {isActive ? 'Hoạt động' : (item.status === 'pending' ? 'Chờ duyệt' : 'Đã khóa')}
                            </Text>
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </View>
            </TouchableOpacity>
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
                        placeholder="Tìm tên DN, MST, email..."
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
                data={filteredMembers}
                keyExtractor={(item) => item.id}
                renderItem={renderMemberCard}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <Text style={styles.resultCount}>
                        Hiển thị {filteredMembers.length} hội viên
                    </Text>
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="search-outline" size={48} color="#D1D5DB" />
                        <Text style={styles.emptyText}>Không tìm thấy hội viên nào</Text>
                    </View>
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
                                <Text style={styles.filterLabel}>Lĩnh vực</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                                    {industries.map(ind => (
                                        <TouchableOpacity
                                            key={ind}
                                            style={[styles.chip, filterIndustry === ind && styles.chipActive]}
                                            onPress={() => setFilterIndustry(ind)}
                                        >
                                            <Text style={[styles.chipText, filterIndustry === ind && styles.chipTextActive]}>
                                                {ind === 'all' ? 'Tất cả' : ind}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>

                            <View style={styles.filterSection}>
                                <Text style={styles.filterLabel}>Khu vực</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                                    {regions.map(reg => (
                                        <TouchableOpacity
                                            key={reg}
                                            style={[styles.chip, filterRegion === reg && styles.chipActive]}
                                            onPress={() => setFilterRegion(reg)}
                                        >
                                            <Text style={[styles.chipText, filterRegion === reg && styles.chipTextActive]}>
                                                {reg === 'all' ? 'Tất cả' : reg}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>

                            <View style={styles.filterSection}>
                                <Text style={styles.filterLabel}>Phân hạng</Text>
                                <View style={styles.chipWrap}>
                                    {tiers.map(tr => (
                                        <TouchableOpacity
                                            key={tr}
                                            style={[styles.chip, filterTier === tr && styles.chipActive]}
                                            onPress={() => setFilterTier(tr)}
                                        >
                                            <Text style={[styles.chipText, filterTier === tr && styles.chipTextActive]}>
                                                {tr === 'all' ? 'Tất cả' : tr}
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
                                        { val: 'active', label: 'Hoạt động' },
                                        { val: 'pending', label: 'Chờ duyệt' },
                                        { val: 'locked', label: 'Đã khóa' }
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
    },
    companyInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12,
    },
    avatar: {
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
    taxCode: {
        fontSize: 12,
        color: '#6B7280',
    },
    cardBody: {
        gap: 6,
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoText: {
        fontSize: 13,
        color: '#4B5563',
        flex: 1,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
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
        fontSize: 11,
        fontWeight: '600',
    },
    badgeActive: {
        backgroundColor: '#ECFDF5',
        borderColor: '#D1FAE5',
    },
    badgeActiveText: {
        color: '#059669',
    },
    badgeInactive: {
        backgroundColor: '#FEF2F2',
        borderColor: '#FEE2E2',
    },
    badgeInactiveText: {
        color: '#DC2626',
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
    chipScroll: {
        flexDirection: 'row',
        paddingRight: 16,
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
        marginRight: 8,
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
