import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { PointsSubTab } from '../types/admin-settings.types';

interface PointsTabProps {
    activePointsSubTab: PointsSubTab;
    setActivePointsSubTab: (tab: PointsSubTab) => void;
    projectPostPoints: number;
    setProjectPostPoints: (val: number) => void;
    projectCompletePoints: number;
    setProjectCompletePoints: (val: number) => void;
    violationPoints: number;
    setViolationPoints: (val: number) => void;
    bronzeThreshold: number;
    setBronzeThreshold: (val: number) => void;
    silverThreshold: number;
    setSilverThreshold: (val: number) => void;
    goldThreshold: number;
    setGoldThreshold: (val: number) => void;
    diamondThreshold: number;
    setDiamondThreshold: (val: number) => void;
    onSave: () => void;
}

interface PointCardProps {
    icon: React.ReactNode;
    iconBg: string;
    cardBg: string;
    borderColor: string;
    title: string;
    description: string;
    value: number;
    onChangeValue: (val: number) => void;
    disabled?: boolean;
    suffix?: string;
}

function PointCard({
    icon,
    iconBg,
    cardBg,
    borderColor,
    title,
    description,
    value,
    onChangeValue,
    disabled = false,
    suffix = 'điểm',
}: PointCardProps) {
    return (
        <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <View style={styles.cardHeader}>
                <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
                    {icon}
                </View>
                <View style={styles.cardTextWrap}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <Text style={styles.cardDesc}>{description}</Text>
                </View>
            </View>
            <View style={styles.inputRow}>
                <TextInput
                    style={[styles.input, disabled && styles.inputDisabled]}
                    value={String(value)}
                    onChangeText={(t) => onChangeValue(Number(t) || 0)}
                    keyboardType="numeric"
                    editable={!disabled}
                />
                <Text style={styles.inputSuffix}>{suffix}</Text>
            </View>
        </View>
    );
}

export const PointsTab: React.FC<PointsTabProps> = ({
    activePointsSubTab,
    setActivePointsSubTab,
    projectPostPoints,
    setProjectPostPoints,
    projectCompletePoints,
    setProjectCompletePoints,
    violationPoints,
    setViolationPoints,
    bronzeThreshold,
    setBronzeThreshold,
    silverThreshold,
    setSilverThreshold,
    goldThreshold,
    setGoldThreshold,
    diamondThreshold,
    setDiamondThreshold,
    onSave,
}) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerText}>
                    <Text style={styles.headerTitle}>Cấu hình Điểm thưởng</Text>
                    <Text style={styles.headerSubtitle}>
                        Quản lý quy tắc tích điểm và thăng hạng cho hội viên.
                    </Text>
                </View>
                <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
                    <Ionicons name="save-outline" size={16} color="#fff" />
                    <Text style={styles.saveBtnText}>Lưu</Text>
                </TouchableOpacity>
            </View>

            {/* Sub Tabs */}
            <View style={styles.subTabsContainer}>
                <TouchableOpacity
                    style={[styles.subTab, activePointsSubTab === 'accumulation' && styles.subTabActive]}
                    onPress={() => setActivePointsSubTab('accumulation')}
                >
                    <Text style={[styles.subTabText, activePointsSubTab === 'accumulation' && styles.subTabTextActive]}>
                        Điểm tích lũy
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.subTab, activePointsSubTab === 'ranking' && styles.subTabActive]}
                    onPress={() => setActivePointsSubTab('ranking')}
                >
                    <Text style={[styles.subTabText, activePointsSubTab === 'ranking' && styles.subTabTextActive]}>
                        Quy tắc thăng hạng
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Accumulation Content */}
            {activePointsSubTab === 'accumulation' && (
                <View style={styles.list}>
                    <PointCard
                        icon={<Ionicons name="folder" size={20} color="#2563EB" />}
                        iconBg="#DBEAFE"
                        cardBg="#EFF6FF"
                        borderColor="#BFDBFE"
                        title="Đăng dự án"
                        description="Điểm thưởng khi đăng dự án mới."
                        value={projectPostPoints}
                        onChangeValue={setProjectPostPoints}
                    />
                    <PointCard
                        icon={<Ionicons name="checkmark-circle" size={20} color="#059669" />}
                        iconBg="#D1FAE5"
                        cardBg="#ECFDF5"
                        borderColor="#A7F3D0"
                        title="Hoàn thành dự án"
                        description="Điểm thưởng khi hoàn thành dự án."
                        value={projectCompletePoints}
                        onChangeValue={setProjectCompletePoints}
                    />
                    <PointCard
                        icon={<Ionicons name="close-circle" size={20} color="#DC2626" />}
                        iconBg="#FEE2E2"
                        cardBg="#FEF2F2"
                        borderColor="#FECACA"
                        title="Bài đăng vi phạm"
                        description="Điểm trừ khi bài đăng vi phạm."
                        value={violationPoints}
                        onChangeValue={setViolationPoints}
                    />
                </View>
            )}

            {/* Ranking Content */}
            {activePointsSubTab === 'ranking' && (
                <View style={styles.list}>
                    <PointCard
                        icon={<MaterialIcons name="emoji-events" size={20} color="#D97706" />}
                        iconBg="#FEF3C7"
                        cardBg="#FFFBEB"
                        borderColor="#FDE68A"
                        title="Hạng Đồng"
                        description="Ngưỡng điểm tối thiểu để đạt hạng Đồng."
                        value={bronzeThreshold}
                        onChangeValue={setBronzeThreshold}
                        disabled
                        suffix="điểm (mặc định)"
                    />
                    <PointCard
                        icon={<MaterialIcons name="emoji-events" size={20} color="#6B7280" />}
                        iconBg="#F3F4F6"
                        cardBg="#F9FAFB"
                        borderColor="#E5E7EB"
                        title="Hạng Bạc"
                        description="Ngưỡng điểm tối thiểu để đạt hạng Bạc."
                        value={silverThreshold}
                        onChangeValue={setSilverThreshold}
                    />
                    <PointCard
                        icon={<MaterialIcons name="emoji-events" size={20} color="#CA8A04" />}
                        iconBg="#FEF9C3"
                        cardBg="#FEFCE8"
                        borderColor="#FDE047"
                        title="Hạng Vàng"
                        description="Ngưỡng điểm tối thiểu để đạt hạng Vàng."
                        value={goldThreshold}
                        onChangeValue={setGoldThreshold}
                    />
                    <PointCard
                        icon={<MaterialIcons name="emoji-events" size={20} color="#2563EB" />}
                        iconBg="#DBEAFE"
                        cardBg="#EFF6FF"
                        borderColor="#BFDBFE"
                        title="Hạng Kim cương"
                        description="Ngưỡng điểm tối thiểu để đạt hạng Kim cương."
                        value={diamondThreshold}
                        onChangeValue={setDiamondThreshold}
                    />
                </View>
            )}
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
    subTabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        padding: 4,
        marginBottom: 16,
    },
    subTab: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
    },
    subTabActive: {
        backgroundColor: '#4F46E5',
    },
    subTabText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#6B7280',
    },
    subTabTextActive: {
        color: '#fff',
        fontWeight: '700',
    },
    list: {
        gap: 12,
    },
    card: {
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        marginBottom: 10,
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
        width: 100,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 7,
        fontSize: 14,
        color: '#111827',
        backgroundColor: '#fff',
    },
    inputDisabled: {
        backgroundColor: '#F9FAFB',
        color: '#9CA3AF',
    },
    inputSuffix: {
        fontSize: 12,
        color: '#6B7280',
    },
});
