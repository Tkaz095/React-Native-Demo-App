import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { FeesTab } from '../components/FeesTab';
import { GeneralTab } from '../components/GeneralTab';
import { NotificationsTab } from '../components/NotificationsTab';
import { PointsTab } from '../components/PointsTab';
import { PointsSubTab, TabType } from '../types/admin-settings.types';

type TabConfig = {
    id: TabType;
    label: string;
    renderIcon: (color: string) => React.ReactNode;
};

const TABS: TabConfig[] = [
    {
        id: 'general',
        label: 'Cấu hình chung',
        renderIcon: (color) => <Ionicons name="settings-outline" size={18} color={color} />,
    },
    {
        id: 'points',
        label: 'Điểm thưởng',
        renderIcon: (color) => <MaterialIcons name="emoji-events" size={18} color={color} />,
    },
    {
        id: 'fees',
        label: 'Phí hội viên',
        renderIcon: (color) => <Ionicons name="cash-outline" size={18} color={color} />,
    },
    {
        id: 'notifications',
        label: 'Thông báo',
        renderIcon: (color) => <Ionicons name="notifications-outline" size={18} color={color} />,
    },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<TabType>('general');
    const [activePointsSubTab, setActivePointsSubTab] = useState<PointsSubTab>('accumulation');

    // General settings
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [autoApprove, setAutoApprove] = useState(false);
    const [publicProfile, setPublicProfile] = useState(true);
    const [twoFactorAuth, setTwoFactorAuth] = useState(true);

    // Points settings
    const [projectPostPoints, setProjectPostPoints] = useState(10);
    const [projectCompletePoints, setProjectCompletePoints] = useState(50);
    const [violationPoints, setViolationPoints] = useState(-50);

    // Ranking settings
    const [bronzeThreshold, setBronzeThreshold] = useState(0);
    const [silverThreshold, setSilverThreshold] = useState(100);
    const [goldThreshold, setGoldThreshold] = useState(500);
    const [diamondThreshold, setDiamondThreshold] = useState(1000);

    // Fee settings
    const [bronzeFee, setBronzeFee] = useState(1000000);
    const [silverFee, setSilverFee] = useState(3000000);
    const [goldFee, setGoldFee] = useState(5000000);
    const [diamondFee, setDiamondFee] = useState(10000000);
    const [bronzeFeeEnabled, setBronzeFeeEnabled] = useState(true);
    const [silverFeeEnabled, setSilverFeeEnabled] = useState(true);
    const [goldFeeEnabled, setGoldFeeEnabled] = useState(true);
    const [diamondFeeEnabled, setDiamondFeeEnabled] = useState(true);

    // Notification settings
    const [emailTemplateEnabled, setEmailTemplateEnabled] = useState(true);
    const [smsTemplateEnabled, setSmsTemplateEnabled] = useState(false);
    const [pushTemplateEnabled, setPushTemplateEnabled] = useState(true);

    const handleSaveChanges = () => {
        Alert.alert('Thành công', 'Thay đổi đã được lưu!');
    };


    return (
        <SafeAreaView style={styles.safe}>
            {/* Page Title */}
            <View style={styles.pageHeader}>
                <Text style={styles.pageTitle}>Cài đặt</Text>
                <Text style={styles.pageSubtitle}>Quản lý cấu hình hệ thống</Text>
            </View>

            {/* Tab Bar */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.tabBarScroll}
                contentContainerStyle={styles.tabBarContent}
            >
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <TouchableOpacity
                            key={tab.id}
                            style={[styles.tabBtn, isActive && styles.tabBtnActive]}
                            onPress={() => setActiveTab(tab.id)}
                            activeOpacity={0.8}
                        >
                            <View style={styles.tabBtnInner}>
                                <View>
                                    {tab.renderIcon(isActive ? '#fff' : '#6B7280')}
                                </View>
                                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                                    {tab.label}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Content */}
            <View style={styles.content}>
                {activeTab === 'general' && (
                    <GeneralTab
                        emailNotifications={emailNotifications}
                        setEmailNotifications={setEmailNotifications}
                        autoApprove={autoApprove}
                        setAutoApprove={setAutoApprove}
                        publicProfile={publicProfile}
                        setPublicProfile={setPublicProfile}
                        twoFactorAuth={twoFactorAuth}
                        setTwoFactorAuth={setTwoFactorAuth}
                        onSave={handleSaveChanges}
                    />
                )}
                {activeTab === 'points' && (
                    <PointsTab
                        activePointsSubTab={activePointsSubTab}
                        setActivePointsSubTab={setActivePointsSubTab}
                        projectPostPoints={projectPostPoints}
                        setProjectPostPoints={setProjectPostPoints}
                        projectCompletePoints={projectCompletePoints}
                        setProjectCompletePoints={setProjectCompletePoints}
                        violationPoints={violationPoints}
                        setViolationPoints={setViolationPoints}
                        bronzeThreshold={bronzeThreshold}
                        setBronzeThreshold={setBronzeThreshold}
                        silverThreshold={silverThreshold}
                        setSilverThreshold={setSilverThreshold}
                        goldThreshold={goldThreshold}
                        setGoldThreshold={setGoldThreshold}
                        diamondThreshold={diamondThreshold}
                        setDiamondThreshold={setDiamondThreshold}
                        onSave={handleSaveChanges}
                    />
                )}
                {activeTab === 'fees' && (
                    <FeesTab
                        bronzeFee={bronzeFee}
                        setBronzeFee={setBronzeFee}
                        silverFee={silverFee}
                        setSilverFee={setSilverFee}
                        goldFee={goldFee}
                        setGoldFee={setGoldFee}
                        diamondFee={diamondFee}
                        setDiamondFee={setDiamondFee}
                        bronzeFeeEnabled={bronzeFeeEnabled}
                        setBronzeFeeEnabled={setBronzeFeeEnabled}
                        silverFeeEnabled={silverFeeEnabled}
                        setSilverFeeEnabled={setSilverFeeEnabled}
                        goldFeeEnabled={goldFeeEnabled}
                        setGoldFeeEnabled={setGoldFeeEnabled}
                        diamondFeeEnabled={diamondFeeEnabled}
                        setDiamondFeeEnabled={setDiamondFeeEnabled}
                        onSave={handleSaveChanges}
                    />
                )}
                {activeTab === 'notifications' && (
                    <NotificationsTab
                        emailTemplateEnabled={emailTemplateEnabled}
                        setEmailTemplateEnabled={setEmailTemplateEnabled}
                        smsTemplateEnabled={smsTemplateEnabled}
                        setSmsTemplateEnabled={setSmsTemplateEnabled}
                        pushTemplateEnabled={pushTemplateEnabled}
                        setPushTemplateEnabled={setPushTemplateEnabled}
                        onSave={handleSaveChanges}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    pageHeader: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 12,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#111827',
    },
    pageSubtitle: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: 2,
    },
    tabBarScroll: {
        flexGrow: 0,
        marginBottom: 12,
    },
    tabBarContent: {
        paddingHorizontal: 16,
        gap: 8,
        flexDirection: 'row',
    },
    tabBtn: {
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 10,
        backgroundColor: '#E5E7EB',
    },
    tabBtnActive: {
        backgroundColor: '#4F46E5',
    },
    tabBtnInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    tabLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#6B7280',
    },
    tabLabelActive: {
        color: '#fff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
});
