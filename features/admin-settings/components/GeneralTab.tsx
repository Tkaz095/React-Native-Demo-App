import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface GeneralTabProps {
    emailNotifications: boolean;
    setEmailNotifications: (val: boolean) => void;
    autoApprove: boolean;
    setAutoApprove: (val: boolean) => void;
    publicProfile: boolean;
    setPublicProfile: (val: boolean) => void;
    twoFactorAuth: boolean;
    setTwoFactorAuth: (val: boolean) => void;
    onSave: () => void;
}

interface SettingItemProps {
    icon: React.ReactNode;
    iconBg: string;
    cardBg: string;
    borderColor: string;
    title: string;
    description: string;
    value: boolean;
    onToggle: (val: boolean) => void;
}

function SettingItem({
    icon,
    iconBg,
    cardBg,
    borderColor,
    title,
    description,
    value,
    onToggle,
}: SettingItemProps) {
    return (
        <View style={[styles.settingCard, { backgroundColor: cardBg, borderColor }]}>
            <View style={styles.settingLeft}>
                <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
                    {icon}
                </View>
                <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>{title}</Text>
                    <Text style={styles.settingDesc}>{description}</Text>
                </View>
            </View>
            <Switch
                value={value}
                onValueChange={onToggle}
                trackColor={{ false: '#D1D5DB', true: '#4F46E5' }}
                thumbColor="#FFFFFF"
            />
        </View>
    );
}

export const GeneralTab: React.FC<GeneralTabProps> = ({
    emailNotifications,
    setEmailNotifications,
    autoApprove,
    setAutoApprove,
    publicProfile,
    setPublicProfile,
    twoFactorAuth,
    setTwoFactorAuth,
    onSave,
}) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerText}>
                    <Text style={styles.headerTitle}>Thông báo hệ thống</Text>
                    <Text style={styles.headerSubtitle}>
                        Cấu hình cách bạn nhận thông báo từ các hoạt động mới.
                    </Text>
                </View>
                <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
                    <Ionicons name="save-outline" size={16} color="#fff" />
                    <Text style={styles.saveBtnText}>Lưu</Text>
                </TouchableOpacity>
            </View>

            {/* Settings List */}
            <View style={styles.list}>
                <SettingItem
                    icon={<Ionicons name="mail" size={20} color="#2563EB" />}
                    iconBg="#DBEAFE"
                    cardBg="#EFF6FF"
                    borderColor="#BFDBFE"
                    title="Thông báo qua Email"
                    description="Nhận email tức thì hàng ngày về các hoạt động."
                    value={emailNotifications}
                    onToggle={setEmailNotifications}
                />
                <SettingItem
                    icon={<Ionicons name="bulb" size={20} color="#D97706" />}
                    iconBg="#FEF3C7"
                    cardBg="#FFFBEB"
                    borderColor="#FDE68A"
                    title="Tự động duyệt bài"
                    description="Tự động duyệt các bài viết từ hội viên Gold."
                    value={autoApprove}
                    onToggle={setAutoApprove}
                />
                <SettingItem
                    icon={<Ionicons name="globe" size={20} color="#059669" />}
                    iconBg="#D1FAE5"
                    cardBg="#ECFDF5"
                    borderColor="#A7F3D0"
                    title="Công khai hồ sơ"
                    description="Cho phép người dùng chưa đăng nhập xem danh sách hội viên."
                    value={publicProfile}
                    onToggle={setPublicProfile}
                />
                <SettingItem
                    icon={<Ionicons name="phone-portrait" size={20} color="#7C3AED" />}
                    iconBg="#EDE9FE"
                    cardBg="#F5F3FF"
                    borderColor="#DDD6FE"
                    title="Xác thực 2 yếu tố (2FA)"
                    description="Tăng cường bảo mật tài khoản cho tài khoản admin."
                    value={twoFactorAuth}
                    onToggle={setTwoFactorAuth}
                />
            </View>

            {/* Danger Zone */}
            <View style={styles.dangerBox}>
                <MaterialIcons name="warning" size={20} color="#DC2626" />
                <View style={styles.dangerText}>
                    <Text style={styles.dangerTitle}>Khu vực nguy hiểm</Text>
                    <Text style={styles.dangerDesc}>
                        Các hành động sau đây không thể hoàn tác. Vui lòng cẩn trọng.
                    </Text>
                </View>
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
    settingCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
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
    settingText: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    settingDesc: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    dangerBox: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-start',
        marginTop: 20,
        padding: 14,
        backgroundColor: '#FEF2F2',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    dangerText: {
        flex: 1,
    },
    dangerTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#7F1D1D',
    },
    dangerDesc: {
        fontSize: 12,
        color: '#B91C1C',
        marginTop: 2,
    },
});
