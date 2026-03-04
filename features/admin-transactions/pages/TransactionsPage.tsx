import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EventFeesTab } from '../components/EventFeesTab';
import { MembershipFeesTab } from '../components/MembershipFeesTab';
import { TransactionsTab } from '../components/TransactionsTab';

type TabType = 'transaction' | 'membership' | 'event';

const TABS = [
    { id: 'transaction' as TabType, label: 'Giao dịch' },
    { id: 'membership' as TabType, label: 'Phí hội viên' },
    { id: 'event' as TabType, label: 'Phí tham gia sự kiện' },
];

export default function TransactionsPage() {
    const [activeTab, setActiveTab] = useState<TabType>('transaction');

    const renderContent = () => {
        switch (activeTab) {
            case 'transaction':
                return <TransactionsTab />;
            case 'membership':
                return <MembershipFeesTab />;
            case 'event':
                return <EventFeesTab />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>QUẢN LÝ GIAO DỊCH</Text>

                {/* Top Tabs */}
                <View style={styles.tabContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.tabScrollContent}
                    >
                        {TABS.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <TouchableOpacity
                                    key={tab.id}
                                    style={[
                                        styles.tabButton,
                                        isActive && styles.activeTabButton
                                    ]}
                                    onPress={() => setActiveTab(tab.id)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[
                                        styles.tabText,
                                        isActive && styles.activeTabText
                                    ]}>
                                        {tab.label}
                                    </Text>
                                    {isActive && <View style={styles.activeTabIndicator} />}
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            </View>

            <View style={styles.content}>
                {renderContent()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        backgroundColor: '#FFFFFF',
        paddingTop: 16,
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    tabContainer: {
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    tabScrollContent: {
        paddingHorizontal: 16,
        gap: 24,
    },
    tabButton: {
        paddingVertical: 12,
        position: 'relative',
    },
    activeTabButton: {
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
    },
    activeTabText: {
        color: '#1F2937',
        fontWeight: 'bold',
    },
    activeTabIndicator: {
        position: 'absolute',
        bottom: -1,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: '#111827',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    content: {
        flex: 1,
    }
});
