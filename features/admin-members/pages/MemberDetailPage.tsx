import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import {
    ActivityIndicator,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { mockMemberDetails } from '../data/admin-members.data';

export default function MemberDetailPage() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const member = useMemo(() => {
        if (!id) return null;
        return mockMemberDetails[id] || null;
    }, [id]);

    if (!member) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
            </View>
        );
    }

    const isActive = member.status === 'active';
    const isPending = member.status === 'pending';

    const renderInfoRow = (icon: keyof typeof Ionicons.glyphMap, label: string, value: string) => (
        <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
                <Ionicons name={icon} size={20} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header / Actions */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#374151" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chi tiết hội viên</Text>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => router.push(`/admin/members/${id}/edit` as any)}
                >
                    <Ionicons name="create-outline" size={22} color="#1976D2" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Profile Card */}
                <View style={[styles.card, styles.profileCard]}>
                    <View style={styles.avatarLarge}>
                        <Text style={styles.avatarText}>{member.logo}</Text>
                    </View>
                    <Text style={styles.companyNameLarge}>{member.companyName}</Text>

                    <View style={styles.badgeRow}>
                        <View style={[styles.badge, { backgroundColor: '#EFF6FF', borderColor: '#DBEAFE' }]}>
                            <Text style={[styles.badgeText, { color: '#1D4ED8' }]}>{member.tier}</Text>
                        </View>
                        <View style={[styles.badge, isActive ? styles.badgeActive : (isPending ? styles.badgePending : styles.badgeInactive)]}>
                            <Text style={[styles.badgeText, isActive ? styles.badgeActiveText : (isPending ? styles.badgePendingText : styles.badgeInactiveText)]}>
                                {isActive ? 'Hoạt động' : (isPending ? 'Chờ duyệt' : 'Đã khóa')}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Giới thiệu */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="information-circle-outline" size={20} color="#111827" />
                        <Text style={styles.cardTitle}>Giới thiệu chung</Text>
                    </View>
                    <Text style={styles.paragraph}>{member.description}</Text>

                    <View style={styles.divider} />

                    {renderInfoRow('business-outline', 'Lĩnh vực', member.industry)}
                    {renderInfoRow('calendar-outline', 'Ngày tham gia', member.joinDate)}
                </View>

                {/* Thông tin liên hệ */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="call-outline" size={20} color="#111827" />
                        <Text style={styles.cardTitle}>Thông tin liên hệ</Text>
                    </View>

                    {renderInfoRow('location-outline', 'Địa chỉ', member.address)}
                    <View style={styles.divider} />
                    {renderInfoRow('mail-outline', 'Email', member.email)}
                    <View style={styles.divider} />
                    {renderInfoRow('call-outline', 'Số điện thoại', member.phone)}
                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="globe-outline" size={20} color="#6B7280" />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Website</Text>
                            <TouchableOpacity onPress={() => Linking.openURL(member.website)}>
                                <Text style={[styles.infoValue, { color: '#2563EB' }]}>{member.website}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Dịch vụ cung cấp */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="briefcase-outline" size={20} color="#111827" />
                        <Text style={styles.cardTitle}>Sản phẩm & Dịch vụ</Text>
                    </View>
                    <View style={styles.chipsContainer}>
                        {member.services.map((service, index) => (
                            <View key={index} style={styles.chip}>
                                <Text style={styles.chipText}>{service}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Chứng chỉ & Giải thưởng */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="ribbon-outline" size={20} color="#111827" />
                        <Text style={styles.cardTitle}>Chứng chỉ & Giải thưởng</Text>
                    </View>
                    <View style={styles.listContainer}>
                        {member.certificates.map((cert, index) => (
                            <View key={index} style={styles.listItem}>
                                <Ionicons name="checkmark-circle" size={18} color="#10B981" />
                                <Text style={styles.listItemText}>{cert}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Mạng xã hội */}
                {member.socialLinks && (
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="share-social-outline" size={20} color="#111827" />
                            <Text style={styles.cardTitle}>Mạng xã hội</Text>
                        </View>
                        <View style={styles.socialRow}>
                            {member.socialLinks.facebook && (
                                <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#EEF2FF' }]} onPress={() => Linking.openURL(member.socialLinks!.facebook!)}>
                                    <Ionicons name="logo-facebook" size={20} color="#4F46E5" />
                                </TouchableOpacity>
                            )}
                            {member.socialLinks.youtube && (
                                <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#FEF2F2' }]} onPress={() => Linking.openURL(member.socialLinks!.youtube!)}>
                                    <Ionicons name="logo-youtube" size={20} color="#DC2626" />
                                </TouchableOpacity>
                            )}
                            {member.socialLinks.tiktok && (
                                <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#F3F4F6' }]} onPress={() => Linking.openURL(member.socialLinks!.tiktok!)}>
                                    <Ionicons name="logo-tiktok" size={20} color="#111827" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                )}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F4F6',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 15,
        color: '#6B7280',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    editButton: {
        padding: 6,
        backgroundColor: '#EFF6FF',
        borderRadius: 8,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
        gap: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    profileCard: {
        alignItems: 'center',
    },
    avatarLarge: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#BFDBFE',
    },
    avatarText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1D4ED8',
    },
    companyNameLarge: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 12,
    },
    badgeRow: {
        flexDirection: 'row',
        gap: 8,
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
    },
    badgeActive: {
        backgroundColor: '#ECFDF5',
        borderColor: '#D1FAE5',
    },
    badgeActiveText: {
        color: '#059669',
    },
    badgePending: {
        backgroundColor: '#FFFBEB',
        borderColor: '#FEF3C7',
    },
    badgePendingText: {
        color: '#D97706',
    },
    badgeInactive: {
        backgroundColor: '#FEF2F2',
        borderColor: '#FEE2E2',
    },
    badgeInactiveText: {
        color: '#DC2626',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
    },
    paragraph: {
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 22,
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginVertical: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#F9FAFB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 15,
        color: '#111827',
        fontWeight: '500',
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    chipText: {
        fontSize: 13,
        color: '#4B5563',
        fontWeight: '500',
    },
    listContainer: {
        gap: 10,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
    },
    listItemText: {
        flex: 1,
        fontSize: 14,
        color: '#374151',
        lineHeight: 20,
    },
    socialRow: {
        flexDirection: 'row',
        gap: 12,
    },
    socialBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
