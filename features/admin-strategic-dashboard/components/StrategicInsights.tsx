import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { STRATEGIC_INSIGHTS_MOCK } from '../services/strategic-dashboard.mock';

export function StrategicInsights() {
    const d = STRATEGIC_INSIGHTS_MOCK;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.iconBox}>
                    <Ionicons name="bulb-outline" size={22} color="#FFFFFF" />
                </View>
                <View>
                    <Text style={styles.title}>Nhận Định Chiến Lược</Text>
                    <Text style={styles.subtitle}>Dựa trên dữ liệu 30 ngày qua</Text>
                </View>
            </View>

            {/* Cards */}
            <View style={styles.grid}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="checkmark-circle-outline" size={18} color="#10B981" />
                        <Text style={styles.cardTitle}>Điểm Mạnh</Text>
                    </View>
                    <Text style={styles.cardBody}>{d.strengths}</Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="alert-circle-outline" size={18} color="#F59E0B" />
                        <Text style={styles.cardTitle}>Cần Cải Thiện</Text>
                    </View>
                    <Text style={styles.cardBody}>{d.improvements}</Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="navigate-outline" size={18} color="#1E3A5F" />
                        <Text style={styles.cardTitle}>Khuyến Nghị</Text>
                    </View>
                    <Text style={styles.cardBody}>{d.recommendations}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        padding: 16,
        gap: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: '#1E3A5F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
    },
    subtitle: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    grid: {
        gap: 10,
    },
    card: {
        backgroundColor: '#F9FAFB',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        padding: 14,
        gap: 6,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#111827',
    },
    cardBody: {
        fontSize: 13,
        color: '#6B7280',
        lineHeight: 20,
    },
});
