import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { mockMemberPackages, mockPackages } from '../data/admin-service-packages.data';

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

const STATUS_CONFIG = {
    active: { label: 'Đang hoạt động', bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
    expired: { label: 'Hết hạn', bg: '#F9FAFB', text: '#374151', border: '#E5E7EB' },
    suspended: { label: 'Tạm ngưng', bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' },
};

export default function ServicePackageDetailPage() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const pkg = mockPackages.find(p => p.id === id);
    const members = mockMemberPackages.filter(mp => mp.packageId === id);

    if (!pkg) {
        return (
            <View style={styles.notFound}>
                <Ionicons name="cube-outline" size={48} color="#D1D5DB" />
                <Text style={styles.notFoundText}>Không tìm thấy gói dịch vụ</Text>
                <TouchableOpacity onPress={() => router.push('/admin/service-packages' as any)}>
                    <Text style={styles.notFoundLink}>Quay lại danh sách</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const activeMembers = members.filter(mp => mp.status === 'active').length;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {/* Back + Edit Header */}
            <View style={styles.pageHeader}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={18} color="#374151" />
                    <Text style={styles.backText}>Quay lại</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => router.push(`/admin/service-packages/${id}/edit` as any)}
                >
                    <Ionicons name="create-outline" size={16} color="#fff" />
                    <Text style={styles.editBtnText}>Chỉnh sửa</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.pageTitle}>{pkg.name}</Text>
            <Text style={styles.pageSubtitle}>{pkg.description}</Text>

            {/* Info Card */}
            <View style={styles.card}>
                <View style={[styles.cardColorBar, { backgroundColor: pkg.color }]} />
                <View style={styles.cardContent}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Trạng thái</Text>
                        <View style={styles.infoValue}>
                            <Ionicons
                                name={pkg.isActive ? 'checkmark-circle' : 'close-circle'}
                                size={18}
                                color={pkg.isActive ? '#16A34A' : '#9CA3AF'}
                            />
                            <Text style={[styles.infoText, { color: pkg.isActive ? '#16A34A' : '#9CA3AF' }]}>
                                {pkg.isActive ? 'Đang hoạt động' : 'Tạm ngưng'}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Giá gói</Text>
                        <View style={styles.infoValue}>
                            <Text style={styles.priceText}>{formatPrice(pkg.price)}</Text>
                            <Text style={styles.priceDuration}>/ {getDurationLabel(pkg.duration)}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Hội viên sử dụng</Text>
                        <View style={styles.infoValue}>
                            <Ionicons name="people-outline" size={16} color={PRIMARY} />
                            <Text style={[styles.infoText, { color: '#111827', fontWeight: '700' }]}>{activeMembers}</Text>
                            <Text style={styles.priceDuration}>/ {members.length} tổng</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Ngày tạo</Text>
                        <Text style={styles.infoText}>{new Date(pkg.createdAt).toLocaleDateString('vi-VN')}</Text>
                    </View>
                    <View style={[styles.infoRow, { marginTop: 10 }]}>
                        <Text style={styles.infoLabel}>Cập nhật gần nhất</Text>
                        <Text style={styles.infoText}>{new Date(pkg.updatedAt).toLocaleDateString('vi-VN')}</Text>
                    </View>
                </View>
            </View>

            {/* Features Card */}
            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="settings-outline" size={18} color={PRIMARY} />
                    <Text style={styles.sectionTitle}>Tính năng gói dịch vụ</Text>
                </View>
                {pkg.features.map(feature => (
                    <View
                        key={feature.id}
                        style={[styles.featureItem, {
                            backgroundColor: feature.enabled ? '#F0FDF4' : '#F9FAFB',
                            borderColor: feature.enabled ? '#BBF7D0' : '#E5E7EB',
                        }]}
                    >
                        <View style={styles.featureItemHeader}>
                            <Ionicons
                                name={feature.enabled ? 'checkmark-circle' : 'close-circle'}
                                size={20}
                                color={feature.enabled ? '#16A34A' : '#9CA3AF'}
                            />
                            <View style={styles.featureItemText}>
                                <Text style={[styles.featureName, !feature.enabled && { color: '#6B7280' }]}>
                                    {feature.name}
                                </Text>
                                <Text style={[styles.featureDesc, !feature.enabled && { color: '#9CA3AF' }]}>
                                    {feature.description}
                                </Text>

                                {feature.enabled && feature.config && (
                                    <View style={styles.configDetails}>
                                        {feature.id === 'promotions' && (
                                            <>
                                                {feature.config.allowTimeSchedule && <Text style={styles.configText}>✓ Thiết lập thời gian</Text>}
                                                {feature.config.allowConditions && <Text style={styles.configText}>✓ Điều kiện áp dụng</Text>}
                                                {feature.config.allowDiscountCodes && <Text style={styles.configText}>✓ Mã giảm giá</Text>}
                                                {feature.config.showOnHomepage && <Text style={styles.configText}>✓ Hiển thị Homepage</Text>}
                                            </>
                                        )}
                                        {feature.id === 'push_notifications' && (
                                            <Text style={styles.configText}>
                                                Giới hạn: {feature.config.maxNotificationsPerDay === -1 ? 'Không giới hạn' : `${feature.config.maxNotificationsPerDay} thông báo/ngày`}
                                            </Text>
                                        )}
                                        {feature.id === 'marketplace' && (
                                            <Text style={styles.configText}>
                                                Giới hạn: {feature.config.maxProducts === -1 ? 'Không giới hạn' : `${feature.config.maxProducts} sản phẩm`}
                                            </Text>
                                        )}
                                        {feature.id === 'quote_requests' && (
                                            <Text style={styles.configText}>
                                                Giới hạn: {feature.config.maxQuotesPerMonth === -1 ? 'Không giới hạn' : `${feature.config.maxQuotesPerMonth} yêu cầu/tháng`}
                                            </Text>
                                        )}
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                ))}
                <View style={{ height: 4 }} />
            </View>

            {/* Members Card */}
            <View style={styles.card}>
                <View style={styles.sectionHeaderRow}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="people-outline" size={18} color={PRIMARY} />
                        <Text style={styles.sectionTitle}>Hội viên sử dụng gói ({members.length})</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.membersBtn}
                        onPress={() => router.push('/admin/members' as any)}
                    >
                        <Ionicons name="person-add-outline" size={14} color={PRIMARY} />
                        <Text style={styles.membersBtnText}>Gán hội viên</Text>
                    </TouchableOpacity>
                </View>

                {members.length === 0 ? (
                    <View style={styles.emptyMembers}>
                        <Ionicons name="people-outline" size={40} color="#D1D5DB" />
                        <Text style={styles.emptyMembersText}>Chưa có hội viên nào sử dụng gói này</Text>
                        <Text style={styles.emptyMembersSubtext}>Gán gói dịch vụ cho hội viên từ trang quản lý hội viên</Text>
                    </View>
                ) : (
                    members.map(mp => {
                        const statusCfg = STATUS_CONFIG[mp.status] ?? STATUS_CONFIG.expired;
                        return (
                            <View key={mp.memberId} style={styles.memberRow}>
                                <View style={styles.memberInfo}>
                                    <Text style={styles.memberName}>{mp.memberName}</Text>
                                    <Text style={styles.memberCompany}>{mp.companyName}</Text>
                                    <Text style={styles.memberDates}>
                                        {new Date(mp.startDate).toLocaleDateString('vi-VN')} → {new Date(mp.endDate).toLocaleDateString('vi-VN')}
                                    </Text>
                                </View>
                                <View style={[styles.statusBadge, { backgroundColor: statusCfg.bg, borderColor: statusCfg.border }]}>
                                    <Text style={[styles.statusText, { color: statusCfg.text }]}>{statusCfg.label}</Text>
                                </View>
                            </View>
                        );
                    })
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFB' },
    content: { padding: 16, gap: 12 },

    notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
    notFoundText: { fontSize: 15, color: '#6B7280' },
    notFoundLink: { fontSize: 14, color: PRIMARY, textDecorationLine: 'underline' },

    pageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    backText: { fontSize: 13, color: '#374151' },
    editBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: PRIMARY, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
    editBtnText: { fontSize: 13, fontWeight: '600', color: '#fff' },
    pageTitle: { fontSize: 22, fontWeight: '700', color: '#111827' },
    pageSubtitle: { fontSize: 13, color: '#6B7280', lineHeight: 20 },

    card: {
        backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#E5E7EB',
        overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 1,
    },
    cardColorBar: { height: 5 },
    cardContent: { padding: 16 },

    infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    infoValue: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    infoLabel: { fontSize: 11, color: '#9CA3AF' },
    infoText: { fontSize: 13, color: '#374151' },
    priceText: { fontSize: 20, fontWeight: '700', color: '#111827' },
    priceDuration: { fontSize: 12, color: '#9CA3AF' },
    divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 12 },

    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 16, paddingBottom: 12 },
    sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 16 },
    sectionTitle: { fontSize: 14, fontWeight: '600', color: '#111827' },
    membersBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB' },
    membersBtnText: { fontSize: 12, color: PRIMARY, fontWeight: '600' },

    featureItem: { marginHorizontal: 16, marginBottom: 8, borderRadius: 10, borderWidth: 1, padding: 12 },
    featureItemHeader: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
    featureItemText: { flex: 1 },
    featureName: { fontSize: 13, fontWeight: '600', color: '#111827', marginBottom: 2 },
    featureDesc: { fontSize: 11, color: '#6B7280', lineHeight: 16 },
    configDetails: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#BBF7D0', gap: 2 },
    configText: { fontSize: 11, color: '#15803D' },

    memberRow: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 16, paddingVertical: 12,
        borderTopWidth: 1, borderTopColor: '#F3F4F6',
    },
    memberInfo: { flex: 1 },
    memberName: { fontSize: 13, fontWeight: '600', color: '#111827' },
    memberCompany: { fontSize: 11, color: '#6B7280', marginTop: 2 },
    memberDates: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1 },
    statusText: { fontSize: 11, fontWeight: '600' },

    emptyMembers: { padding: 32, alignItems: 'center' },
    emptyMembersText: { fontSize: 14, color: '#374151', fontWeight: '600', marginTop: 12, marginBottom: 4 },
    emptyMembersSubtext: { fontSize: 12, color: '#9CA3AF', textAlign: 'center' },
});
