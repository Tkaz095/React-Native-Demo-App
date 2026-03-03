import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { MemberFormValues, memberSchema } from '../schemas/member.schema';

interface AddMemberModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: MemberFormValues) => void;
}

export default function AddMemberModal({ visible, onClose, onSubmit }: AddMemberModalProps) {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<MemberFormValues>({
        resolver: zodResolver(memberSchema),
        defaultValues: {
            businessName: '',
            representativeName: '',
        },
    });

    const handleFormSubmit = (data: MemberFormValues) => {
        onSubmit(data);
        reset();
        onClose();
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={handleClose}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.overlay}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.keyboardView}
                    >
                        <View style={styles.container}>
                            <View style={styles.header}>
                                <Text style={styles.title}>Thêm thành viên mới</Text>
                                <TouchableOpacity onPress={handleClose} testID="close-modal-button" style={styles.closeButton}>
                                    <MaterialIcons name="close" size={24} color="#666" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.content}>
                                <Controller
                                    control={control}
                                    name="businessName"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            label="Tên doanh nghiệp"
                                            placeholder="Nhập tên doanh nghiệp"
                                            value={value}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            error={errors.businessName?.message}
                                            containerStyle={styles.inputSpacing}
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="representativeName"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            label="Người đại diện"
                                            placeholder="Nhập tên người đại diện"
                                            value={value}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            error={errors.representativeName?.message}
                                            containerStyle={styles.inputSpacing}
                                        />
                                    )}
                                />

                                <Button
                                    title="Thêm mới"
                                    onPress={handleSubmit(handleFormSubmit)}
                                    style={styles.submitButton}
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        padding: 16,
    },
    keyboardView: {
        width: '100%',
    },
    container: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        padding: 4,
    },
    content: {
        padding: 20,
    },
    inputSpacing: {
        marginBottom: 16,
    },
    submitButton: {
        marginTop: 8,
    }
});
