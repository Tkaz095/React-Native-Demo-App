import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Event, EventType } from '../types/admin-events.types';

interface Props {
    events: Event[];
    eventTypes: EventType[];
}

export default function EventsListTab({ events, eventTypes }: Props) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showFilterModal, setShowFilterModal] = useState(false);

    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesSearch =
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.speaker.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesType = filterType === 'all' || event.typeId === filterType;
            const matchesStatus = filterStatus === 'all' || event.status === filterStatus;

            return matchesSearch && matchesType && matchesStatus;
        });
    }, [events, searchQuery, filterType, filterStatus]);

    const activeFilterCount = (filterType !== 'all' ? 1 : 0) + (filterStatus !== 'all' ? 1 : 0);

    const getStatusText = (status: Event['status']) => {
        switch (status) {
            case 'draft': return 'NHÁP';
            case 'ongoing': return 'ĐANG DIỄN RA';
            case 'upcoming': return 'SẮP DIỄN RA';
            case 'completed': return 'ĐÃ KẾT THÚC';
            default: return status;
        }
    };

    const getStatusColor = (status: Event['status']) => {
        switch (status) {
            case 'draft': return { bg: '#F3F4F6', text: '#374151', border: '#E5E7EB' };
            case 'ongoing': return { bg: '#ECFDF5', text: '#059669', border: '#D1FAE5' };
            case 'upcoming': return { bg: '#FFFBEB', text: '#D97706', border: '#FEF3C7' };
            case 'completed': return { bg: '#F3F4F6', text: '#6B7280', border: '#E5E7EB' };
            default: return { bg: '#F3F4F6', text: '#374151', border: '#E5E7EB' };
        }
    };

    const getTypeColor = (typeId: string) => {
        const styles: Record<string, { bg: string, text: string }> = {
            '1': { bg: '#EFF6FF', text: '#1D4ED8' },
            '2': { bg: '#FAF5FF', text: '#7E22CE' },
            '3': { bg: '#FFF7ED', text: '#C2410C' },
        };
        return styles[typeId] || { bg: '#F9FAFB', text: '#374151' };
    };

    const getTypeName = (typeId: string) => {
        const t = eventTypes.find(x => x.id === typeId);
        return t ? t.name : 'N/A';
    };

    const renderItem = ({ item }: { item: Event }) => {
        const statusColor = getStatusColor(item.status);
        const typeColor = getTypeColor(item.typeId);

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => router.push(`/admin/events/${item.id}` as any)}
            >
                <View style={styles.cardHeader}>
                    <View style={[styles.badge, { backgroundColor: typeColor.bg }]}>
                        <Text style={[styles.badgeText, { color: typeColor.text }]}>{getTypeName(item.typeId)}</Text>
                    </View>
                    <View style={[styles.badge, { backgroundColor: statusColor.bg, borderWidth: 1, borderColor: statusColor.border }]}>
                        <Text style={[styles.badgeText, { color: statusColor.text }]}>{getStatusText(item.status)}</Text>
                    </View>
                </View>

                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>

                <View style={styles.infoRow}>
                    <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                    <Text style={styles.infoText}>{item.datetime}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={16} color="#6B7280" />
                    <Text style={styles.infoText} numberOfLines={1}>{item.location}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="person-outline" size={16} color="#6B7280" />
                    <Text style={styles.infoText} numberOfLines={1}>{item.speaker} - {item.speakerTitle}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm sự kiện, địa điểm, diễn giả..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearIcon}>
                            <Ionicons name="close-circle" size={16} color="#9CA3AF" />
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity
                    style={[styles.filterButton, activeFilterCount > 0 && styles.filterButtonActive]}
                    onPress={() => setShowFilterModal(true)}
                >
                    <Ionicons name="filter" size={20} color={activeFilterCount > 0 ? "#1976D2" : "#6B7280"} />
                    {activeFilterCount > 0 && (
                        <View style={styles.filterBadge}>
                            <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredEvents}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={
                    <Text style={styles.resultCount}>Hiển thị {filteredEvents.length} sự kiện</Text>
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="calendar-clear-outline" size={48} color="#D1D5DB" />
                        <Text style={styles.emptyText}>Không tìm thấy sự kiện nào</Text>
                    </View>
                }
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push('/admin/events/new' as any)}
            >
                <Ionicons name="add" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Filter Modal */}
            <Modal visible={showFilterModal} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Bộ lọc hội viên</Text>
                            <TouchableOpacity onPress={() => setShowFilterModal(false)} style={styles.closeButton}>
                                <Ionicons name="close" size={24} color="#374151" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalBody}>
                            <Text style={styles.filterLabel}>Loại sự kiện</Text>
                            <View style={styles.chipGroup}>
                                <TouchableOpacity
                                    style={[styles.chip, filterType === 'all' && styles.chipActive]}
                                    onPress={() => setFilterType('all')}
                                >
                                    <Text style={[styles.chipText, filterType === 'all' && styles.chipTextActive]}>Tất cả</Text>
                                </TouchableOpacity>
                                {eventTypes.map(t => (
                                    <TouchableOpacity
                                        key={t.id}
                                        style={[styles.chip, filterType === t.id && styles.chipActive]}
                                        onPress={() => setFilterType(t.id)}
                                    >
                                        <Text style={[styles.chipText, filterType === t.id && styles.chipTextActive]}>{t.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.filterLabel}>Trạng thái</Text>
                            <View style={styles.chipGroup}>
                                {['all', 'draft', 'upcoming', 'ongoing', 'completed'].map(status => (
                                    <TouchableOpacity
                                        key={status}
                                        style={[styles.chip, filterStatus === status && styles.chipActive]}
                                        onPress={() => setFilterStatus(status)}
                                    >
                                        <Text style={[styles.chipText, filterStatus === status && styles.chipTextActive]}>
                                            {status === 'all' ? 'Tất cả' : getStatusText(status as any)}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity style={styles.clearFilterButton} onPress={() => { setFilterType('all'); setFilterStatus('all'); }}>
                                <Text style={styles.clearFilterText}>Xóa bộ lọc</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.applyFilterButton} onPress={() => setShowFilterModal(false)}>
                                <Text style={styles.applyFilterText}>Áp dụng</Text>
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
    searchContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingHorizontal: 12,
        height: 44,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#111827',
    },
    clearIcon: {
        padding: 4,
    },
    filterButton: {
        width: 44,
        height: 44,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterButtonActive: {
        backgroundColor: '#EFF6FF',
        borderColor: '#BFDBFE',
    },
    filterBadge: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: '#EF4444',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
    },
    filterBadgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    listContent: {
        padding: 16,
        gap: 12,
        paddingBottom: 80, // for FAB
    },
    resultCount: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 8,
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
    },
    cardHeader: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 10,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '600',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 12,
        lineHeight: 22,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 6,
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        color: '#4B5563',
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        backgroundColor: '#1976D2',
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        marginTop: 12,
        fontSize: 15,
        color: '#6B7280',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    closeButton: {
        padding: 4,
    },
    modalBody: {
        padding: 16,
    },
    filterLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 12,
        marginTop: 8,
    },
    chipGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
    },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    chipActive: {
        backgroundColor: '#EFF6FF',
        borderColor: '#BFDBFE',
    },
    chipText: {
        fontSize: 13,
        color: '#4B5563',
        fontWeight: '500',
    },
    chipTextActive: {
        color: '#1D4ED8',
    },
    modalFooter: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
    },
    clearFilterButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
    },
    clearFilterText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#374151',
    },
    applyFilterButton: {
        flex: 2,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#1976D2',
        alignItems: 'center',
    },
    applyFilterText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});
