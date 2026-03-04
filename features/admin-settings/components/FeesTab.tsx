import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface FeesTabProps {
    bronzeFee: number;
    setBronzeFee: (val: number) => void;
    silverFee: number;
    setSilverFee: (val: number) => void;
    goldFee: number;
    setGoldFee: (val: number) => void;
    diamondFee: number;
    setDiamondFee: (val: number) => void;
    bronzeFeeEnabled: boolean;
    setBronzeFeeEnabled: (val: boolean) => void;
    silverFeeEnabled: boolean;
    setSilverFeeEnabled: (val: boolean) => void;
    goldFeeEnabled: boolean;
    setGoldFeeEnabled: (val: boolean) => void;
    diamondFeeEnabled: boolean;
    setDiamondFeeEnabled: (val: boolean) => void;
    onSave: () => void;
}

interface FeeCardProps {
    icon: React.ReactNode;
    iconBg: string;
    cardBg: string;
    borderColor: string;
    title: string;
    description: string;
    fee: number;
    onChangeFee: (val: number) => void;
    enabled: boolean;
    onToggle: (val: boolean) => void;
}

function FeeCard({
    icon,
    iconBg,
    cardBg,
    borderColor,
    title,
    description,
    fee,
    onChangeFee,
    enabled,
    onToggle,
}: FeeCardProps) {
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
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    value={String(fee)}
                    onChangeText={(t) => onChangeFee(Number(t) || 0)}
                    keyboardType="numeric"
                    editable={enabled}
                />
                <Text style={styles.inputSuffix}>VNĐ/năm</Text>
            </View>
        </View>
    );
}

export const FeesTab: React.FC<FeesTabProps> = ({
    bronzeFee, setBronzeFee,
    silverFee, setSilverFee,
    goldFee, setGoldFee,
    diamondFee, setDiamondFee,
    bronzeFeeEnabled, setBronzeFeeEnabled,
    silverFeeEnabled, setSilverFeeEnabled,
    goldFeeEnabled, setGoldFeeEnabled,
    diamondFeeEnabled, setDiamondFeeEnabled,
    onSave,
}) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerText}>
                    <Text style={styles.headerTitle}>Cấu hình Phí hội viên</Text>
                    <Text style={styles.headerSubtitle}>
                        Quản lý mức phí theo từng hạng thành viên.
                    </Text>
                </View>
                <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
                    <Ionicons name="save-outline" size={16} color="#fff" />
                    <Text style={styles.saveBtnText}>Lưu</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.list}>
                <FeeCard
                    icon={<Ionicons name="cash" size={20} color="#D97706" />}
                    iconBg="#FEF3C7"
                    cardBg="#FFFBEB"
                    borderColor="#FDE68A"
                    title="Hạng Đồng"
                    description="Phí hội viên hàng năm cho hạng Đồng."
                    fee={bronzeFee}
                    onChangeFee={setBronzeFee}
                    enabled={bronzeFeeEnabled}
                    onToggle={setBronzeFeeEnabled}
                />
                <FeeCard
                    icon={<Ionicons name="cash" size={20} color="#6B7280" />}
                    iconBg="#F3F4F6"
                    cardBg="#F9FAFB"
                    borderColor="#E5E7EB"
                    title="Hạng Bạc"
                    description="Phí hội viên hàng năm cho hạng Bạc."
                    fee={silverFee}
                    onChangeFee={setSilverFee}
                    enabled={silverFeeEnabled}
                    onToggle={setSilverFeeEnabled}
                />
                <FeeCard
                    icon={<Ionicons name="cash" size={20} color="#CA8A04" />}
                    iconBg="#FEF9C3"
                    cardBg="#FEFCE8"
                    borderColor="#FDE047"
                    title="Hạng Vàng"
                    description="Phí hội viên hàng năm cho hạng Vàng."
                    fee={goldFee}
                    onChangeFee={setGoldFee}
                    enabled={goldFeeEnabled}
                    onToggle={setGoldFeeEnabled}
                />
                <FeeCard
                    icon={<Ionicons name="cash" size={20} color="#2563EB" />}
                    iconBg="#DBEAFE"
                    cardBg="#EFF6FF"
                    borderColor="#BFDBFE"
                    title="Hạng Kim cương"
                    description="Phí hội viên hàng năm cho hạng Kim cương."
                    fee={diamondFee}
                    onChangeFee={setDiamondFee}
                    enabled={diamondFeeEnabled}
                    onToggle={setDiamondFeeEnabled}
                />
            </View>

            {/* Info Note */}
            <View style={styles.infoBox}>
                <Ionicons name="information-circle" size={20} color="#2563EB" />
                <View style={styles.infoText}>
                    <Text style={styles.infoTitle}>Lưu ý</Text>
                    <Text style={styles.infoDesc}>
                        Toggle bật/tắt để cho phép hoặc tạm ngưng thu phí cho từng hạng thành viên. Thay đổi sẽ có hiệu lực ngay lập tức.
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
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 7,
        fontSize: 14,
        color: '#111827',
        backgroundColor: '#fff',
    },
    inputSuffix: {
        fontSize: 12,
        color: '#6B7280',
    },
    infoBox: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-start',
        marginTop: 20,
        padding: 14,
        backgroundColor: '#EFF6FF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#BFDBFE',
    },
    infoText: {
        flex: 1,
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E40AF',
    },
    infoDesc: {
        fontSize: 12,
        color: '#1D4ED8',
        marginTop: 2,
    },
});
