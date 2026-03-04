import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { defaultFeatures, mockPackages } from '../data/admin-service-packages.data';
import { FeatureConfig, ServicePackageFeature } from '../types/admin-service-packages.types';

const PRIMARY = '#1976D2';

const COLOR_OPTIONS = [
    { value: '#9CA3AF', label: 'Xám' },
    { value: '#3B82F6', label: 'Xanh dương' },
    { value: '#10B981', label: 'Xanh lá' },
    { value: '#D4AF37', label: 'Vàng' },
    { value: '#8B5CF6', label: 'Tím' },
    { value: '#EF4444', label: 'Đỏ' },
];

const DURATION_OPTIONS: { value: 'month' | 'quarter' | 'year'; label: string }[] = [
    { value: 'month', label: 'Tháng' },
    { value: 'quarter', label: 'Quý' },
    { value: 'year', label: 'Năm' },
];

export default function ServicePackageFormPage() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id?: string }>();
    const isEdit = !!id;
    const existing = isEdit ? mockPackages.find(p => p.id === id) : null;

    const [formData, setFormData] = useState({
        name: existing?.name || '',
        description: existing?.description || '',
        price: existing?.price?.toString() || '',
        duration: existing?.duration || ('month' as 'month' | 'quarter' | 'year'),
        color: existing?.color || '#3B82F6',
        isActive: existing ? existing.isActive : true,
    });

    const [features, setFeatures] = useState<ServicePackageFeature[]>(
        existing
            ? existing.features
            : defaultFeatures.map(f => ({ ...f, enabled: false }))
    );

    const toggleFeature = (featureId: string) => {
        setFeatures(prev => prev.map(f => f.id === featureId ? { ...f, enabled: !f.enabled } : f));
    };

    const updateFeatureConfig = (featureId: string, partial: Partial<FeatureConfig>) => {
        setFeatures(prev => prev.map(f =>
            f.id === featureId ? { ...f, config: { ...f.config, ...partial } } : f
        ));
    };

    const handleSubmit = () => {
        if (!formData.name.trim() || !formData.description.trim() || !formData.price || Number(formData.price) <= 0) {
            Alert.alert('Thiếu thông tin', 'Vui lòng điền đầy đủ Tên gói, Mô tả và Giá hợp lệ.');
            return;
        }
        Alert.alert(
            'Thành công',
            isEdit ? 'Đã cập nhật gói dịch vụ thành công' : 'Đã tạo gói dịch vụ mới thành công',
            [{ text: 'OK', onPress: () => router.push('/admin/service-packages' as any) }]
        );
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.pageHeader}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={18} color="#374151" />
                    <Text style={styles.backText}>Quay lại</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.pageTitle}>{isEdit ? 'Chỉnh sửa gói dịch vụ' : 'Tạo gói dịch vụ mới'}</Text>
            <Text style={styles.pageSubtitle}>
                {isEdit ? 'Cập nhật thông tin và cấu hình tính năng cho gói dịch vụ' : 'Tạo gói dịch vụ mới với các tính năng tùy chỉnh'}
            </Text>

            {/* Basic Info Card */}
            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="cube-outline" size={18} color={PRIMARY} />
                    <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Tên gói <Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        value={formData.name}
                        onChangeText={v => setFormData(p => ({ ...p, name: v }))}
                        placeholder="VD: Gói Cơ bản"
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Mô tả <Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={[styles.input, styles.textarea]}
                        value={formData.description}
                        onChangeText={v => setFormData(p => ({ ...p, description: v }))}
                        placeholder="Mô tả ngắn gọn về gói dịch vụ"
                        placeholderTextColor="#9CA3AF"
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Giá (VNĐ) <Text style={styles.required}>*</Text></Text>
                    <View style={styles.inputIconWrap}>
                        <Ionicons name="pricetag-outline" size={16} color="#9CA3AF" style={styles.inputIcon} />
                        <TextInput
                            style={[styles.input, styles.inputWithIcon]}
                            value={formData.price}
                            onChangeText={v => setFormData(p => ({ ...p, price: v.replace(/[^0-9]/g, '') }))}
                            placeholder="0"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Chu kỳ <Text style={styles.required}>*</Text></Text>
                    <View style={styles.optionRow}>
                        {DURATION_OPTIONS.map(opt => (
                            <TouchableOpacity
                                key={opt.value}
                                style={[styles.optionBtn, formData.duration === opt.value && styles.optionBtnActive]}
                                onPress={() => setFormData(p => ({ ...p, duration: opt.value }))}
                            >
                                <Text style={[styles.optionBtnText, formData.duration === opt.value && styles.optionBtnTextActive]}>
                                    {opt.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Màu sắc</Text>
                    <View style={styles.colorRow}>
                        {COLOR_OPTIONS.map(opt => (
                            <TouchableOpacity
                                key={opt.value}
                                onPress={() => setFormData(p => ({ ...p, color: opt.value }))}
                                style={[styles.colorDot, { backgroundColor: opt.value }, formData.color === opt.value && styles.colorDotActive]}
                            >
                                {formData.color === opt.value && <Ionicons name="checkmark" size={14} color="#fff" />}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.switchRow}>
                    <Text style={styles.label}>Kích hoạt gói ngay sau khi lưu</Text>
                    <Switch
                        value={formData.isActive}
                        onValueChange={v => setFormData(p => ({ ...p, isActive: v }))}
                        trackColor={{ true: PRIMARY, false: '#E5E7EB' }}
                        thumbColor="#fff"
                    />
                </View>
            </View>

            {/* Features Card */}
            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="settings-outline" size={18} color={PRIMARY} />
                    <Text style={styles.sectionTitle}>Cấu hình tính năng</Text>
                </View>

                {features.map(feature => (
                    <View key={feature.id} style={styles.featureItem}>
                        <TouchableOpacity style={styles.featureToggleRow} onPress={() => toggleFeature(feature.id)}>
                            <Ionicons
                                name={feature.enabled ? 'checkbox' : 'square-outline'}
                                size={22}
                                color={feature.enabled ? '#16A34A' : '#9CA3AF'}
                            />
                            <View style={styles.featureText}>
                                <Text style={styles.featureName}>{feature.name}</Text>
                                <Text style={styles.featureDesc}>{feature.description}</Text>
                            </View>
                        </TouchableOpacity>

                        {feature.enabled && (
                            <View style={styles.configSection}>
                                {feature.id === 'promotions' && (
                                    <View style={styles.configGrid}>
                                        {[
                                            { key: 'allowTimeSchedule' as const, label: 'Thiết lập thời gian' },
                                            { key: 'allowConditions' as const, label: 'Điều kiện áp dụng' },
                                            { key: 'allowDiscountCodes' as const, label: 'Mã giảm giá' },
                                            { key: 'showOnHomepage' as const, label: 'Hiển thị Homepage' },
                                        ].map(item => (
                                            <TouchableOpacity
                                                key={item.key}
                                                style={styles.configCheckRow}
                                                onPress={() => updateFeatureConfig(feature.id, { [item.key]: !feature.config?.[item.key] })}
                                            >
                                                <Ionicons
                                                    name={feature.config?.[item.key] ? 'checkbox' : 'square-outline'}
                                                    size={16}
                                                    color={feature.config?.[item.key] ? PRIMARY : '#9CA3AF'}
                                                />
                                                <Text style={styles.configLabel}>{item.label}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}

                                {feature.id === 'push_notifications' && (
                                    <View>
                                        <Text style={styles.configFieldLabel}>Số thông báo/ngày (-1 = không giới hạn)</Text>
                                        <TextInput
                                            style={styles.configInput}
                                            value={String(feature.config?.maxNotificationsPerDay ?? 10)}
                                            onChangeText={v => updateFeatureConfig(feature.id, { maxNotificationsPerDay: Number(v) || 0 })}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                )}

                                {feature.id === 'marketplace' && (
                                    <View>
                                        <Text style={styles.configFieldLabel}>Số sản phẩm tối đa (-1 = không giới hạn)</Text>
                                        <TextInput
                                            style={styles.configInput}
                                            value={String(feature.config?.maxProducts ?? 10)}
                                            onChangeText={v => updateFeatureConfig(feature.id, { maxProducts: Number(v) || 0 })}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                )}

                                {feature.id === 'quote_requests' && (
                                    <View>
                                        <Text style={styles.configFieldLabel}>Số yêu cầu báo giá/tháng (-1 = không giới hạn)</Text>
                                        <TextInput
                                            style={styles.configInput}
                                            value={String(feature.config?.maxQuotesPerMonth ?? 50)}
                                            onChangeText={v => updateFeatureConfig(feature.id, { maxQuotesPerMonth: Number(v) || 0 })}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                ))}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
                    <Text style={styles.cancelBtnText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                    <Ionicons name="save-outline" size={18} color="#fff" />
                    <Text style={styles.submitBtnText}>{isEdit ? 'Lưu cập nhật' : 'Tạo gói'}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFB' },
    content: { padding: 16, gap: 12, paddingBottom: 40 },

    pageHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    backText: { fontSize: 13, color: '#374151' },
    pageTitle: { fontSize: 22, fontWeight: '700', color: '#111827', marginBottom: 4 },
    pageSubtitle: { fontSize: 13, color: '#6B7280', lineHeight: 20, marginBottom: 4 },

    card: {
        backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#E5E7EB',
        paddingBottom: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 1,
    },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
    sectionTitle: { fontSize: 14, fontWeight: '600', color: '#111827' },

    field: { paddingHorizontal: 16, paddingTop: 14 },
    label: { fontSize: 13, fontWeight: '500', color: '#374151', marginBottom: 6 },
    required: { color: '#EF4444' },
    input: {
        borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8,
        paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: '#111827',
        backgroundColor: '#fff',
    },
    textarea: { minHeight: 80, textAlignVertical: 'top' },
    inputIconWrap: { position: 'relative' },
    inputIcon: { position: 'absolute', left: 10, top: 12, zIndex: 1 },
    inputWithIcon: { paddingLeft: 32 },

    optionRow: { flexDirection: 'row', gap: 8 },
    optionBtn: {
        flex: 1, paddingVertical: 9, borderRadius: 8, borderWidth: 1, borderColor: '#D1D5DB',
        alignItems: 'center',
    },
    optionBtnActive: { borderColor: PRIMARY, backgroundColor: '#EFF6FF' },
    optionBtnText: { fontSize: 13, color: '#374151' },
    optionBtnTextActive: { color: PRIMARY, fontWeight: '600' },

    colorRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
    colorDot: {
        width: 34, height: 34, borderRadius: 17,
        alignItems: 'center', justifyContent: 'center',
    },
    colorDotActive: { borderWidth: 2, borderColor: '#111827' },

    switchRow: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 16, paddingTop: 14, paddingBottom: 16,
    },

    featureItem: { paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
    featureToggleRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
    featureText: { flex: 1 },
    featureName: { fontSize: 13, fontWeight: '600', color: '#111827', marginBottom: 2 },
    featureDesc: { fontSize: 11, color: '#6B7280', lineHeight: 16 },
    configSection: { marginLeft: 32, marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
    configGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    configCheckRow: { flexDirection: 'row', alignItems: 'center', gap: 6, width: '47%' },
    configLabel: { fontSize: 11, color: '#374151' },
    configFieldLabel: { fontSize: 11, color: '#6B7280', marginBottom: 6 },
    configInput: {
        borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8,
        paddingHorizontal: 10, paddingVertical: 8, fontSize: 13, color: '#111827',
    },

    actionsRow: { flexDirection: 'row', gap: 10 },
    cancelBtn: {
        flex: 1, paddingVertical: 13, borderRadius: 10,
        borderWidth: 1, borderColor: '#E5E7EB', alignItems: 'center',
    },
    cancelBtnText: { fontSize: 14, fontWeight: '600', color: '#374151' },
    submitBtn: {
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 6, paddingVertical: 13, borderRadius: 10, backgroundColor: PRIMARY,
    },
    submitBtnText: { fontSize: 14, fontWeight: '600', color: '#fff' },
});
