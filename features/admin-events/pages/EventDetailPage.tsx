import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { mockEvents } from '../data/admin-events.data';
import { Event } from '../types/admin-events.types';

export default function EventDetailPage() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const event = useMemo(() => {
        if (!id) return null;
        return mockEvents.find(e => e.id === id) || null;
    }, [id]);

    if (!event) {
        return (
            <View style={styles.centerContainer}>
                <Ionicons name="calendar-clear-outline" size={48} color="#D1D5DB" />
                <Text style={styles.errorText}>Không tìm thấy sự kiện</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>Quay lại danh sách</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleDelete = () => {
        Alert.alert('Xác nhận xóa', `Bạn có chắc chắn muốn xóa sự kiện "${event.title}"?`, [
            { text: 'Hủy', style: 'cancel' },
            {
                text: 'Xóa',
                style: 'destructive',
                onPress: () => {
                    Alert.alert('Thành công', 'Đã xóa sự kiện');
                    router.back();
                }
            }
        ]);
    };

    const getTypeText = (type?: Event["type"]) => {
        switch (type) {
            case "seminar": return "Hội thảo";
            case "networking": return "Networking";
            case "exhibition": return "Triển lãm";
            default: return type || 'N/A';
        }
    };

    const getTypeColor = (type?: Event["type"]) => {
        switch (type) {
            case "seminar": return { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' };
            case "networking": return { bg: '#FAF5FF', text: '#7E22CE', border: '#E9D5FF' };
            case "exhibition": return { bg: '#FFF7ED', text: '#C2410C', border: '#FFEDD5' };
            default: return { bg: '#F9FAFB', text: '#374151', border: '#E5E7EB' };
        }
    };

    const getStatusText = (status: Event["status"]) => {
        switch (status) {
            case "draft": return "NHÁP";
            case "ongoing": return "ĐANG DIỄN RA";
            case "upcoming": return "SẮP DIỄN RA";
            case "completed": return "ĐÃ KẾT THÚC";
            default: return String(status).toUpperCase();
        }
    };

    const getStatusColor = (status: Event["status"]) => {
        switch (status) {
            case "draft": return { bg: '#F3F4F6', text: '#374151', border: '#E5E7EB' };
            case "ongoing": return { bg: '#ECFDF5', text: '#059669', border: '#D1FAE5' };
            case "upcoming": return { bg: '#FFFBEB', text: '#D97706', border: '#FEF3C7' };
            case "completed": return { bg: '#F3F4F6', text: '#6B7280', border: '#E5E7EB' };
            default: return { bg: '#F3F4F6', text: '#374151', border: '#E5E7EB' };
        }
    };

    const renderMarkdownParagraph = (text: string, index: number) => {
        // Handle bold title **text**
        if (text.startsWith('**') && text.endsWith('**')) {
            const innerText = text.slice(2, -2);
            return (
                <Text key={index} style={styles.mdTitle}>
                    {innerText}
                </Text>
            );
        }

        // Handle uppercase headings
        if (text.trim() !== '' && text === text.toUpperCase() && !text.includes('-') && text.length < 50) {
            return (
                <Text key={index} style={styles.mdTitle}>
                    {text}
                </Text>
            );
        }

        // Handle bullet points
        if (text.trim().startsWith('•') || text.trim().startsWith('-')) {
            const innerText = text.trim().slice(1).trim();
            return (
                <View key={index} style={styles.mdBulletRow}>
                    <Text style={styles.mdBulletDot}>•</Text>
                    <Text style={styles.mdText}>{innerText}</Text>
                </View>
            );
        }

        // Handle empty lines
        if (text.trim() === '') {
            return <View key={index} style={styles.mdSpacer} />;
        }

        return <Text key={index} style={styles.mdText}>{text}</Text>;
    };

    const typeColor = getTypeColor(event.type);
    const statusColor = getStatusColor(event.status);

    return (
        <View style={styles.container}>
            {/* Header Actions */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerLeft} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#374151" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chi tiết sự kiện</Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: '#EFF6FF' }]}
                        onPress={() => router.push(`/admin/events/${id}/edit` as any)}
                    >
                        <Ionicons name="create-outline" size={20} color="#1D4ED8" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: '#FEF2F2' }]}
                        onPress={handleDelete}
                    >
                        <Ionicons name="trash-outline" size={20} color="#DC2626" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Main Info Card */}
                <View style={styles.card}>
                    <View style={styles.badgesRow}>
                        <View style={[styles.badge, { backgroundColor: typeColor.bg, borderColor: typeColor.border, borderWidth: 1 }]}>
                            <Text style={[styles.badgeText, { color: typeColor.text }]}>{getTypeText(event.type)}</Text>
                        </View>
                        <View style={[styles.badge, { backgroundColor: statusColor.bg, borderColor: statusColor.border, borderWidth: 1 }]}>
                            <Text style={[styles.badgeText, { color: statusColor.text }]}>{getStatusText(event.status)}</Text>
                        </View>
                    </View>

                    <Text style={styles.eventTitle}>{event.title}</Text>

                    <View style={styles.grid}>
                        <View style={styles.gridItem}>
                            <Ionicons name="calendar" size={20} color="#9CA3AF" style={styles.gridIcon} />
                            <View style={styles.gridBox}>
                                <Text style={styles.gridLabel}>THỜI GIAN</Text>
                                <Text style={styles.gridValue}>{event.datetime}</Text>
                            </View>
                        </View>
                        <View style={styles.gridItem}>
                            <Ionicons name="location" size={20} color="#9CA3AF" style={styles.gridIcon} />
                            <View style={styles.gridBox}>
                                <Text style={styles.gridLabel}>ĐỊA ĐIỂM</Text>
                                <Text style={styles.gridValue}>{event.location}</Text>
                            </View>
                        </View>
                        <View style={styles.gridItem}>
                            <Ionicons name="person" size={20} color="#9CA3AF" style={styles.gridIcon} />
                            <View style={styles.gridBox}>
                                <Text style={styles.gridLabel}>DIỄN GIẢ</Text>
                                <Text style={styles.gridValue}>{event.speaker}</Text>
                                <Text style={styles.gridSubValue}>{event.speakerTitle}</Text>
                            </View>
                        </View>
                        <View style={styles.gridItem}>
                            <Ionicons name="people" size={20} color="#9CA3AF" style={styles.gridIcon} />
                            <View style={styles.gridBox}>
                                <Text style={styles.gridLabel}>ĐĂNG KÝ</Text>
                                <Text style={styles.gridValue}>{event.registrations || 0} người</Text>
                            </View>
                        </View>
                    </View>

                    {event.description && (
                        <View style={styles.descriptionBox}>
                            <View style={styles.descHeader}>
                                <Ionicons name="information-circle" size={18} color="#9CA3AF" />
                                <Text style={styles.descTitle}>Mô tả sự kiện</Text>
                            </View>
                            <Text style={styles.descText}>{event.description}</Text>
                        </View>
                    )}
                </View>

                {/* Detailed Content Card */}
                {event.detailedContent && (
                    <View style={styles.card}>
                        <View style={styles.cardSection}>
                            <View style={styles.sectionMarker} />
                            <Text style={styles.sectionTitle}>Nội dung chi tiết</Text>
                        </View>

                        <View style={styles.markdownContainer}>
                            {event.detailedContent.split('\n').map((line, idx) => renderMarkdownParagraph(line, idx))}
                        </View>
                    </View>
                )}

                {/* Agenda Card */}
                {event.agenda && event.agenda.length > 0 && (
                    <View style={styles.card}>
                        <View style={styles.cardSection}>
                            <Ionicons name="list-outline" size={20} color="#111827" style={{ marginRight: 8 }} />
                            <Text style={styles.sectionTitle}>Lịch trình dự kiến (Agenda)</Text>
                        </View>
                        <View style={styles.agendaContainer}>
                            {event.agenda.map((item, idx) => (
                                <View key={idx} style={styles.agendaItem}>
                                    <View style={styles.agendaDot} />
                                    <Text style={styles.agendaText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Target Audience */}
                {event.targetAudience && (
                    <View style={styles.card}>
                        <View style={styles.cardSection}>
                            <Ionicons name="body-outline" size={20} color="#111827" style={{ marginRight: 8 }} />
                            <Text style={styles.sectionTitle}>Đối tượng tham gia</Text>
                        </View>
                        <Text style={styles.targetAudienceText}>{event.targetAudience}</Text>
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
    errorText: {
        fontSize: 16,
        color: '#374151',
        fontWeight: '500',
        marginTop: 12,
        marginBottom: 16,
    },
    backButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    backButtonText: {
        fontSize: 14,
        color: '#1976D2',
        fontWeight: '500',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    headerLeft: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    headerRight: {
        flexDirection: 'row',
        gap: 8,
    },
    actionBtn: {
        width: 36,
        height: 36,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContent: {
        padding: 16,
        gap: 16,
        paddingBottom: 40,
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
    badgesRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
    },
    eventTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 20,
        lineHeight: 30,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    gridItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#F9FAFB',
        padding: 12,
        borderRadius: 12,
        width: '48%', // Approx half with gap
        gap: 10,
    },
    gridIcon: {
        marginTop: 2,
    },
    gridBox: {
        flex: 1,
    },
    gridLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    gridValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 2,
    },
    gridSubValue: {
        fontSize: 12,
        color: '#6B7280',
    },
    descriptionBox: {
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    descHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 8,
    },
    descTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    descText: {
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 22,
    },
    cardSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionMarker: {
        width: 4,
        height: 16,
        backgroundColor: '#1976D2',
        borderRadius: 2,
        marginRight: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
    },
    markdownContainer: {
        marginTop: 4,
    },
    mdTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1976D2',
        marginTop: 16,
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    mdText: {
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 24,
    },
    mdBulletRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 8,
        marginBottom: 4,
    },
    mdBulletDot: {
        color: '#D4AF37', // Gold color like web
        fontWeight: 'bold',
        marginRight: 8,
        fontSize: 16,
        lineHeight: 24,
    },
    mdSpacer: {
        height: 8,
    },
    agendaContainer: {
        gap: 12,
    },
    agendaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#F9FAFB',
        padding: 12,
        borderRadius: 8,
    },
    agendaDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#1976D2',
    },
    agendaText: {
        flex: 1,
        fontSize: 14,
        color: '#374151',
    },
    targetAudienceText: {
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 22,
    },
});
