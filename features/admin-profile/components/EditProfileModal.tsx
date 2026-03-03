import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface EditProfileModalProps {
    visible: boolean;
    profile: any;
    onClose: () => void;
    onSave: (updatedProfile: any) => void;
}

export function EditProfileModal({ visible, profile, onClose, onSave }: EditProfileModalProps) {
    const [formData, setFormData] = useState(profile);

    useEffect(() => {
        if (visible) {
            setFormData(profile);
        }
    }, [visible, profile]);

    const handleSave = () => {
        onSave(formData);
    };

    const updateField = (field: string, value: string) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    if (!profile) return null;

    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.overlay}
            >
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Chỉnh sửa hồ sơ</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                            <Ionicons name="close" size={24} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Họ và tên</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.name}
                                onChangeText={(val) => updateField('name', val)}
                                placeholder="Nhập họ và tên"
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Số điện thoại</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.phone}
                                onChangeText={(val) => updateField('phone', val)}
                                placeholder="Nhập số điện thoại"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="phone-pad"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.email}
                                onChangeText={(val) => updateField('email', val)}
                                placeholder="Nhập email"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Đơn vị trực thuộc</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.department}
                                onChangeText={(val) => updateField('department', val)}
                                placeholder="Nhập đơn vị"
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                    </ScrollView>

                    <View style={styles.footer}>
                        <TouchableOpacity style={[styles.btn, styles.cancelBtn]} onPress={onClose}>
                            <Text style={styles.cancelBtnText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, styles.saveBtn]} onPress={handleSave}>
                            <Text style={styles.saveBtnText}>Lưu thay đổi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    closeBtn: {
        padding: 4,
    },
    body: {
        padding: 16,
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
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 16,
        height: 48,
        fontSize: 15,
        color: '#111827',
        backgroundColor: '#F9FAFB',
    },
    footer: {
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        gap: 12,
        backgroundColor: '#FFFFFF',
    },
    btn: {
        flex: 1,
        height: 48,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelBtn: {
        backgroundColor: '#F3F4F6',
    },
    cancelBtnText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#4B5563',
    },
    saveBtn: {
        backgroundColor: '#1976D2',
    },
    saveBtnText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF',
    }
});
