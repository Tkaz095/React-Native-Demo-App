import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface NotificationsTabProps {
    emailTemplateEnabled: boolean;
    setEmailTemplateEnabled: (val: boolean) => void;
    smsTemplateEnabled: boolean;
    setSmsTemplateEnabled: (val: boolean) => void;
    pushTemplateEnabled: boolean;
    setPushTemplateEnabled: (val: boolean) => void;
    onSave: () => void;
}

interface CheckItem {
    label: string;
    defaultChecked: boolean;
}

interface NotifCardProps {
    icon: React.ReactNode;
    iconBg: string;
    cardBg: string;
    borderColor: string;
    title: string;
    description: string;
    enabled: boolean;
    onToggle: (val: boolean) => void;
    checkItems: CheckItem[];
}

function NotifCard({
    icon, iconBg, cardBg, borderColor, title, description, enabled, onToggle, checkItems,
}: NotifCardProps) {
    const [checks, setChecks] = useState<boolean[]>(checkItems.map((c) => c.defaultChecked));

    return (
        <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <View style={styles.cardTop}>
                <View style={styles.cardLeft}>
                    <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
                        {icon}
                    </View>
                    <View style={styles.cardTextWrap}>
                        <Text style={styles.cardTitle}>{title}</Text>
                        <Text style={styles.cardDesc}>{description}</Text>
                    </View>
                </View>
                <Switch
                    value={enabled}
                    onValueChange={onToggle}
                    trackColor={{ false: '#D1D5DB', true: '#4F46E5' }}
                    thumbColor="#FFFFFF"
                />
            </View>
            <View style={styles.checkList}>
                {checkItems.map((item, idx) => (
                    <TouchableOpacity
                        key={idx}
                        style={styles.checkRow}
                        onPress={() => {
                            const copy = [...checks];
                            copy[idx] = !copy[idx];
                            setChecks(copy);
                        }}
                    >
                        <View style={[styles.checkbox, checks[idx] && styles.checkboxChecked]}>
                            {checks[idx] && <Ionicons name="checkmark" size={12} color="#fff" />}
                        </View>
                        <Text style={styles.checkLabel}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

export const NotificationsTab: React.FC<NotificationsTabProps> = ({
    emailTemplateEnabled,
    setEmailTemplateEnabled,
    smsTemplateEnabled,
    setSmsTemplateEnabled,
    pushTemplateEnabled,
    setPushTemplateEnabled,
    onSave,
}) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerText}>
                    <Text style={styles.headerTitle}>Cấu hình Thông báo</Text>
                    <Text style={styles.headerSubtitle}>
                        Quản lý template và kênh gửi thông báo cho các sự kiện hệ thống.
                    </Text>
                </View>
                <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
                    <Ionicons name="save-outline" size={16} color="#fff" />
                    <Text style={styles.saveBtnText}>Lưu</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.list}>
                <NotifCard
                    icon={<Ionicons name="mail" size={20} color="#2563EB" />}
                    iconBg="#DBEAFE"
                    cardBg="#EFF6FF"
                    borderColor="#BFDBFE"
                    title="Email Template"
                    description="Gửi thông báo qua email cho các sự kiện quan trọng."
                    enabled={emailTemplateEnabled}
                    onToggle={setEmailTemplateEnabled}
                    checkItems={[
                        { label: 'Đăng ký hội viên mới', defaultChecked: true },
                        { label: 'Phê duyệt bài viết', defaultChecked: true },
                        { label: 'Nhắc nhở sự kiện', defaultChecked: false },
                    ]}
                />
                <NotifCard
                    icon={<Ionicons name="phone-portrait" size={20} color="#059669" />}
                    iconBg="#D1FAE5"
                    cardBg="#ECFDF5"
                    borderColor="#A7F3D0"
                    title="SMS Template"
                    description="Gửi thông báo qua SMS cho các sự kiện khẩn cấp."
                    enabled={smsTemplateEnabled}
                    onToggle={setSmsTemplateEnabled}
                    checkItems={[
                        { label: 'Nhắc nhở thanh toán', defaultChecked: false },
                        { label: 'Thông báo khẩn', defaultChecked: false },
                    ]}
                />
                <NotifCard
                    icon={<Ionicons name="notifications" size={20} color="#7C3AED" />}
                    iconBg="#EDE9FE"
                    cardBg="#F5F3FF"
                    borderColor="#DDD6FE"
                    title="Push Notifications"
                    description="Gửi thông báo đẩy trực tiếp trên trình duyệt."
                    enabled={pushTemplateEnabled}
                    onToggle={setPushTemplateEnabled}
                    checkItems={[
                        { label: 'Tin nhắn mới', defaultChecked: true },
                        { label: 'Khi được nhắc đến', defaultChecked: true },
                    ]}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 16,
        gap: 12,
    },
    headerText: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    headerSubtitle: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: 4,
    },
    saveBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#4F46E5',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
    },
    saveBtnText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },
    list: {
        gap: 12,
    },
    card: {
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
    },
    cardTop: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        flex: 1,
        marginRight: 12,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTextWrap: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    cardDesc: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    checkList: {
        gap: 8,
    },
    checkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#D1D5DB',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#4F46E5',
        borderColor: '#4F46E5',
    },
    checkLabel: {
        fontSize: 13,
        color: '#374151',
    },
});
