import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatCards } from '../components/StatCards';

export default function AdminDashboardPage() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Trang tổng quan</Text>
                <Text style={styles.subtitle}>Báo cáo và thống kê chung về hệ thống.</Text>
            </View>

            {/* Stat Cards */}
            <StatCards />

            {/* Chart & Activity Section */}
            <View style={styles.bottomSection}>
                <View style={styles.chartCard}>
                    <Text style={styles.placeholderText}>Biểu đồ tăng trưởng (Chưa có dữ liệu)</Text>
                </View>
                <View style={styles.activityCard}>
                    <Text style={styles.activityTitle}>Hoạt động gần đây</Text>
                    <View style={styles.activityEmpty}>
                        <Text style={styles.placeholderText}>Không có hoạt động nào (Chưa có dữ liệu)</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    content: {
        padding: 16,
        gap: 16,
    },
    header: {
        gap: 4,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#111827',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
    },
    bottomSection: {
        gap: 12,
    },
    chartCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        padding: 24,
        minHeight: 200,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    activityCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        padding: 20,
        minHeight: 160,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    activityTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 12,
    },
    activityEmpty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    placeholderText: {
        fontSize: 14,
        color: '#9CA3AF',
    },
});
