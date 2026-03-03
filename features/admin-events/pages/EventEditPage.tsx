import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { mockEvents } from '../data/admin-events.data';

export default function EventEditPage() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const isNew = !id;

    const [formData, setFormData] = useState({
        title: '',
        type: 'seminar',
        date: '',
        time: '',
        location: '',
        speaker: '',
        speakerTitle: '',
        status: 'draft',
    });

    useEffect(() => {
        if (!isNew && id) {
            const event = mockEvents.find(e => e.id === id);
            if (event) {
                // In a real app, date/time would be split correctly from ISO string
                // mock data: 'datetime': '15/03/2026 09:00'
                const [d, t] = event.datetime.split(' ');
                setFormData({
                    title: event.title,
                    type: event.type || 'seminar',
                    date: d || '',
                    time: t || '',
                    location: event.location,
                    speaker: event.speaker,
                    speakerTitle: event.speakerTitle,
                    status: event.status,
                });
            }
        }
    }, [id, isNew]);

    const handleSubmit = () => {
        if (!formData.title.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập chủ đề sự kiện');
            return;
        }
        if (!formData.date || !formData.time) {
            Alert.alert('Lỗi', 'Vui lòng chọn thời gian diễn ra');
            return;
        }
        if (!formData.location.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập địa điểm');
            return;
        }
        if (!formData.speaker.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập tên diễn giả');
            return;
        }

        Alert.alert(
            'Thành công',
            isNew ? 'Sự kiện đã được tạo thành công!' : 'Sự kiện đã được cập nhật thành công!',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        if (!isNew) {
                            // Mocking toast info
                            console.log('Đã gửi thông báo cập nhật đến toàn bộ hội viên');
                        }
                        router.back();
                    }
                }
            ]
        );
    };

    const TypeOption = ({ value, label, subtext, icon, activeColor }: any) => {
        const isActive = formData.type === value;
        return (
            <TouchableOpacity
                style={[
                    styles.typeOption,
                    isActive && { borderColor: activeColor, backgroundColor: activeColor + '10' }
                ]}
                onPress={() => setFormData({ ...formData, type: value })}
            >
                <View style={[styles.typeRadio, isActive && { borderColor: activeColor }]}>
                    {isActive && <View style={[styles.typeRadioInner, { backgroundColor: activeColor }]} />}
                </View>
                <View style={styles.typeContent}>
                    <Text style={styles.typeLabel}>{label}</Text>
                    <Text style={styles.typeSubtext}>{subtext}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
        >
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#374151" />
                </TouchableOpacity>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>{isNew ? 'Tạo sự kiện mới' : 'Chỉnh sửa sự kiện'}</Text>
                    <Text style={styles.headerSubtitle}>
                        {isNew ? 'Lưu nháp hoặc xuất bản' : 'Cập nhật & thông báo hội viên'}
                    </Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="information-circle-outline" size={20} color="#111827" />
                        <Text style={styles.cardTitle}>Thông tin sự kiện</Text>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Loại sự kiện <Text style={styles.required}>*</Text></Text>
                        <View style={styles.typesGrid}>
                            <TypeOption value="seminar" label="Hội thảo" subtext="Hội thảo chuyên môn" activeColor="#3B82F6" />
                            <TypeOption value="networking" label="Networking" subtext="Gặp gỡ kết nối" activeColor="#A855F7" />
                            <TypeOption value="exhibition" label="Triển lãm" subtext="Triển lãm sản phẩm" activeColor="#F97316" />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Chủ đề sự kiện <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            value={formData.title}
                            onChangeText={(t) => setFormData({ ...formData, title: t })}
                            placeholder="Nhập tên/chủ đề sự kiện..."
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                            <Text style={styles.label}>Ngày diễn ra <Text style={styles.required}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                value={formData.date}
                                onChangeText={(t) => setFormData({ ...formData, date: t })}
                                placeholder="DD/MM/YYYY"
                            />
                        </View>
                        <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                            <Text style={styles.label}>Giờ bắt đầu <Text style={styles.required}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                value={formData.time}
                                onChangeText={(t) => setFormData({ ...formData, time: t })}
                                placeholder="HH:MM"
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Địa điểm <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            value={formData.location}
                            onChangeText={(t) => setFormData({ ...formData, location: t })}
                            placeholder="Nhập địa điểm tổ chức..."
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                            <Text style={styles.label}>Tên diễn giả <Text style={styles.required}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                value={formData.speaker}
                                onChangeText={(t) => setFormData({ ...formData, speaker: t })}
                                placeholder="Nhập tên diễn giả..."
                            />
                        </View>
                        <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                            <Text style={styles.label}>Chức danh <Text style={styles.required}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                value={formData.speakerTitle}
                                onChangeText={(t) => setFormData({ ...formData, speakerTitle: t })}
                                placeholder="Ví dụ: CEO..."
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Trạng thái sự kiện <Text style={styles.required}>*</Text></Text>
                        <View style={styles.statusGroup}>
                            {['draft', 'upcoming', 'ongoing', 'completed'].map(status => {
                                const labels: any = { draft: 'Nháp', upcoming: 'Sắp diễn ra', ongoing: 'Đang diễn ra', completed: 'Đã kết thúc' };
                                const isSelected = formData.status === status;
                                return (
                                    <TouchableOpacity
                                        key={status}
                                        style={[styles.statusOption, isSelected && styles.statusOptionActive]}
                                        onPress={() => setFormData({ ...formData, status })}
                                    >
                                        <Text style={[styles.statusOptionText, isSelected && styles.statusOptionTextActive]}>
                                            {labels[status]}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </View>

                {!isNew && (
                    <View style={styles.infoAlert}>
                        <Ionicons name="information-circle" size={20} color="#1E3A8A" />
                        <Text style={styles.infoAlertText}>
                            <Text style={{ fontWeight: 'bold' }}>Lưu ý: </Text>
                            Khi cập nhật thông tin sự kiện, hệ thống sẽ tự động gửi thông báo cập nhật đến toàn bộ hội viên đã đăng ký tham gia.
                        </Text>
                    </View>
                )}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
                    <Text style={styles.cancelBtnText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                    <Ionicons name="save-outline" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
                    <Text style={styles.submitBtnText}>Lưu thay đổi</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        padding: 4,
        marginRight: 12,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 24,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    required: {
        color: '#EF4444',
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
        color: '#111827',
    },
    row: {
        flexDirection: 'row',
    },
    typesGrid: {
        gap: 12,
    },
    typeOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
    },
    typeRadio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    typeRadioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    typeContent: {
        flex: 1,
    },
    typeLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#111827',
    },
    typeSubtext: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    statusGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    statusOption: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    statusOptionActive: {
        backgroundColor: '#EFF6FF',
        borderColor: '#BFDBFE',
    },
    statusOptionText: {
        fontSize: 14,
        color: '#4B5563',
        fontWeight: '500',
    },
    statusOptionTextActive: {
        color: '#1D4ED8',
        fontWeight: '600',
    },
    infoAlert: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#EFF6FF',
        borderWidth: 1,
        borderColor: '#BFDBFE',
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
        gap: 10,
    },
    infoAlertText: {
        flex: 1,
        fontSize: 13,
        color: '#1E3A8A',
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        ...Platform.select({
            ios: { paddingBottom: 24 }
        })
    },
    cancelBtn: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelBtnText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#4B5563',
    },
    submitBtn: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitBtnText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});
