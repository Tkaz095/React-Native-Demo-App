import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { mockMemberPackages, mockPackages } from '../data/admin-service-packages.data';
import { ServicePackage } from '../types/admin-service-packages.types';

const PRIMARY = '#1976D2';

const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const getDurationLabel = (duration: string) => {
    switch (duration) {
        case 'month': return 'Tháng';
        case 'quarter': return 'Quý';
        case 'year': return 'Năm';
        default: return duration;
    }
};

export default function ServicePackagesPage() {
    const router = useRouter();
    const [packages, setPackages] = useState<ServicePackage[]>(mockPackages);
    const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

    const totalActiveMembers = mockMemberPackages.filter(mp => mp.status === 'active').length;
    const activePackages = packages.filter(p => p.isActive).length;

    const getMemberCount = (packageId: string) =>
        mockMemberPackages.filter(mp => mp.packageId === packageId && mp.status === 'active').length;

    const handleToggleActive = (id: string, current: boolean) => {
        setPackages(prev => prev.map(p => p.id === id ? { ...p, isActive: !current } : p));
        Alert.alert('Thành công', `Đã ${!current ? 'kích hoạt' : 'tạm ngưng'} gói dịch vụ`);
    };

    const handleDelete = (id: string) => {
        const using = mockMemberPackages.filter(mp => mp.packageId === id && mp.status === 'active');
        if (using.length > 0) {
            Alert.alert('Không thể xóa', `Có ${using.length} hội viên đang sử dụng gói này.`);
            setDeleteModalId(null);
            return;
        }
        setPackages(prev => prev.filter(p => p.id !== id));
        setDeleteModalId(null);
        Alert.alert('Thành công', 'Đã xóa gói dịch vụ');
    };

    return (
        <View style={styles.wrapper}>
            <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Stats Row */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <View style={[styles.statIcon, { backgroundColor: '#F5F3FF' }]}>
                            <Ionicons name="people-outline" size={20} color="#7C3AED" />
                        </View>
                        <Text style={styles.statLabel}>Hội viên dùng gói</Text>
                        <Text style={styles.statValue}>{totalActiveMembers}</Text>
                    </View>

                    <View style={styles.statCard}>
                        <View style={[styles.statIcon, { backgroundColor: '#F0FDF4' }]}>
                            <Ionicons name="checkmark-circle-outline" size={20} color="#16A34A" />
                        </View>
                        <Text style={styles.statLabel}>Gói đang hoạt động</Text>
                        <Text style={styles.statValue}>{activePackages}</Text>
                    </View>

                    <View style={styles.statCard}>
                        <View style={[styles.statIcon, { backgroundColor: '#EFF6FF' }]}>
                            <Ionicons name="cube-outline" size={20} color="#2563EB" />
                        </View>
                        <Text style={styles.statLabel}>Tổng số gói</Text>
                        <Text style={styles.statValue}>{packages.length}</Text>
                    </View>
                </View>

                {/* Package Cards */}
                {packages.length === 0 ? (
                    <View style={styles.emptyCard}>
                        <Ionicons name="cube-outline" size={48} color="#D1D5DB" />
                        <Text style={styles.emptyTitle}>Chưa có gói dịch vụ nào</Text>
                        <Text style={styles.emptySubtitle}>Tạo gói dịch vụ đầu tiên để bắt đầu quản lý</Text>
                    </View>
                ) : (
                    packages.map((pkg) => {
                        const memberCount = getMemberCount(pkg.id);
                        const enabledFeatures = pkg.features.filter(f => f.enabled).length;
                        return (
                            <View key={pkg.id} style={styles.packageCard}>
                                {/* Color accent bar */}
                                <View style={[styles.colorBar, { backgroundColor: pkg.color }]} />

                                <View style={styles.cardBody}>
                                    {/* Header */}
                                    <View style={styles.cardHeader}>
                                        <View style={styles.cardHeaderLeft}>
                                            <Text style={styles.packageName}>{pkg.name}</Text>
                                            <Text style={styles.packageDesc} numberOfLines={2}>{pkg.description}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => handleToggleActive(pkg.id, pkg.isActive)}>
                                            <Ionicons
                                                name={pkg.isActive ? 'checkmark-circle' : 'close-circle'}
                                                size={24}
                                                color={pkg.isActive ? '#16A34A' : '#9CA3AF'}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Price */}
                                    <View style={styles.priceRow}>
                                        <Ionicons name="pricetag-outline" size={16} color="#F59E0B" />
                                        <Text style={styles.price}>{formatPrice(pkg.price)}</Text>
                                        <Text style={styles.priceDuration}>/ {getDurationLabel(pkg.duration)}</Text>
                                    </View>

                                    {/* Mini stats */}
                                    <View style={styles.miniStats}>
                                        <View style={styles.miniStat}>
                                            <Text style={styles.miniStatLabel}>Tính năng</Text>
                                            <Text style={styles.miniStatValue}>{enabledFeatures}/{pkg.features.length}</Text>
                                        </View>
                                        <View style={styles.miniStat}>
                                            <Text style={styles.miniStatLabel}>Hội viên</Text>
                                            <Text style={styles.miniStatValue}>{memberCount}</Text>
                                        </View>
                                    </View>

                                    {/* Features list */}
                                    <View style={styles.featuresList}>
                                        <Text style={styles.featuresTitle}>Tính năng:</Text>
                                        {pkg.features.map(feature => (
                                            <View key={feature.id} style={styles.featureRow}>
                                                <Ionicons
                                                    name={feature.enabled ? 'checkmark-circle' : 'close-circle'}
                                                    size={14}
                                                    color={feature.enabled ? '#16A34A' : '#D1D5DB'}
                                                />
                                                <Text style={[styles.featureName, !feature.enabled && styles.featureDisabled]}>
                                                    {feature.name}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>

                                    {/* Actions */}
                                    <View style={styles.actions}>
                                        <TouchableOpacity
                                            style={styles.actionBtnOutline}
                                            onPress={() => router.push(`/admin/service-packages/${pkg.id}` as any)}
                                        >
                                            <Ionicons name="eye-outline" size={15} color="#374151" />
                                            <Text style={styles.actionBtnOutlineText}>Chi tiết</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.actionBtnPrimary}
                                            onPress={() => router.push(`/admin/service-packages/${pkg.id}/edit` as any)}
                                        >
                                            <Ionicons name="create-outline" size={15} color="#fff" />
                                            <Text style={styles.actionBtnPrimaryText}>Chỉnh sửa</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.actionBtnDanger}
                                            onPress={() => setDeleteModalId(pkg.id)}
                                        >
                                            <Ionicons name="trash-outline" size={15} color="#DC2626" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        );
                    })
                )}
            </ScrollView>

            {/* FAB */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push('/admin/service-packages/new' as any)}
                activeOpacity={0.85}
            >
                <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>

            {/* Delete Modal */}
            <Modal visible={!!deleteModalId} transparent animationType="fade" onRequestClose={() => setDeleteModalId(null)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Xác nhận xóa gói</Text>
                        <Text style={styles.modalBody}>
                            Bạn có chắc chắn muốn xóa gói dịch vụ này? Hành động này không thể hoàn tác.
                        </Text>
                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setDeleteModalId(null)}>
                                <Text style={styles.modalBtnCancelText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalBtnDelete} onPress={() => deleteModalId && handleDelete(deleteModalId)}>
                                <Text style={styles.modalBtnDeleteText}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { flex: 1 },
    container: { flex: 1, backgroundColor: '#F9FAFB' },
    content: { padding: 16, gap: 12, paddingBottom: 90 },

    // Stats
    statsRow: { flexDirection: 'row', gap: 8 },
    statCard: {
        flex: 1, backgroundColor: '#fff', borderRadius: 12,
        borderWidth: 1, borderColor: '#E5E7EB',
        padding: 12, shadowColor: '#000', shadowOpacity: 0.04,
        shadowRadius: 4, elevation: 1,
    },
    statIcon: { width: 36, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
    statLabel: { fontSize: 10, color: '#6B7280', marginBottom: 2 },
    statValue: { fontSize: 18, fontWeight: '700', color: '#111827' },

    // FAB
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        backgroundColor: PRIMARY,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },

    // Package card
    packageCard: {
        backgroundColor: '#fff', borderRadius: 14,
        borderWidth: 1, borderColor: '#E5E7EB',
        overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05,
        shadowRadius: 6, elevation: 2,
    },
    colorBar: { height: 5 },
    cardBody: { padding: 14 },
    cardHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
    cardHeaderLeft: { flex: 1, marginRight: 8 },
    packageName: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 3 },
    packageDesc: { fontSize: 12, color: '#6B7280', lineHeight: 18 },

    priceRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', marginBottom: 12 },
    price: { fontSize: 18, fontWeight: '700', color: '#111827' },
    priceDuration: { fontSize: 12, color: '#6B7280' },

    miniStats: { flexDirection: 'row', gap: 8, marginBottom: 12 },
    miniStat: {
        flex: 1, backgroundColor: '#F9FAFB', borderRadius: 8,
        padding: 10, borderWidth: 1, borderColor: '#F3F4F6',
    },
    miniStatLabel: { fontSize: 10, color: '#6B7280', marginBottom: 2 },
    miniStatValue: { fontSize: 13, fontWeight: '600', color: '#111827' },

    featuresList: { marginBottom: 14 },
    featuresTitle: { fontSize: 11, fontWeight: '600', color: '#374151', marginBottom: 6 },
    featureRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
    featureName: { fontSize: 11, color: '#374151' },
    featureDisabled: { color: '#9CA3AF' },

    actions: { flexDirection: 'row', gap: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
    actionBtnOutline: {
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 4, paddingVertical: 9, borderRadius: 8,
        borderWidth: 1, borderColor: '#E5E7EB',
    },
    actionBtnOutlineText: { fontSize: 12, fontWeight: '600', color: '#374151' },
    actionBtnPrimary: {
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 4, paddingVertical: 9, borderRadius: 8, backgroundColor: PRIMARY,
    },
    actionBtnPrimaryText: { fontSize: 12, fontWeight: '600', color: '#fff' },
    actionBtnDanger: {
        paddingHorizontal: 12, paddingVertical: 9, borderRadius: 8,
        borderWidth: 1, borderColor: '#FCA5A5', alignItems: 'center', justifyContent: 'center',
    },

    // Empty state
    emptyCard: {
        backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#E5E7EB',
        padding: 48, alignItems: 'center',
    },
    emptyTitle: { fontSize: 15, fontWeight: '600', color: '#374151', marginTop: 12, marginBottom: 4 },
    emptySubtitle: { fontSize: 13, color: '#9CA3AF', marginBottom: 16, textAlign: 'center' },

    // Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', padding: 24 },
    modalBox: { backgroundColor: '#fff', borderRadius: 16, padding: 24, width: '100%', maxWidth: 380 },
    modalTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 8 },
    modalBody: { fontSize: 13, color: '#6B7280', lineHeight: 20, marginBottom: 20 },
    modalActions: { flexDirection: 'row', gap: 10 },
    modalBtnCancel: {
        flex: 1, paddingVertical: 11, borderRadius: 8,
        borderWidth: 1, borderColor: '#E5E7EB', alignItems: 'center',
    },
    modalBtnCancelText: { fontSize: 13, fontWeight: '600', color: '#374151' },
    modalBtnDelete: { flex: 1, paddingVertical: 11, borderRadius: 8, backgroundColor: '#DC2626', alignItems: 'center' },
    modalBtnDeleteText: { fontSize: 13, fontWeight: '600', color: '#fff' },
});
