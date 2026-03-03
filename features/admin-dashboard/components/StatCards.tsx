import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface StatItem {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: IoniconName;
}

const STATS_MOCK_DATA: StatItem[] = [
    {
        title: 'Tổng số hội viên',
        value: '1,248',
        change: '+12.5%',
        trend: 'up',
        icon: 'people-outline',
    },
    {
        title: 'Doanh nghiệp mới',
        value: '42',
        change: '+4.2%',
        trend: 'up',
        icon: 'business-outline',
    },
    {
        title: 'Lượt truy cập (tháng)',
        value: '45.2K',
        change: '+18.1%',
        trend: 'up',
        icon: 'pulse-outline',
    },
    {
        title: 'Doanh thu phí',
        value: '320M',
        change: '-2.4%',
        trend: 'down',
        icon: 'card-outline',
    },
];

export function StatCards() {
    return (
        <View style={styles.grid}>
            {STATS_MOCK_DATA.map((stat, i) => {
                const isTrendUp = stat.trend === 'up';
                return (
                    <View key={i} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle} numberOfLines={2}>{stat.title}</Text>
                            <View style={styles.iconWrapper}>
                                <Ionicons name={stat.icon} size={18} color="#6B7280" />
                            </View>
                        </View>
                        <Text style={styles.value}>{stat.value}</Text>
                        <Text style={[styles.change, isTrendUp ? styles.trendUp : styles.trendDown]}>
                            {stat.change} so với tháng trước
                        </Text>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    card: {
        // 2-column grid with gap
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        padding: 16,
        gap: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    iconWrapper: {
        marginLeft: 8,
        marginTop: 1,
    },
    cardTitle: {
        flex: 1,
        fontSize: 12,
        fontWeight: '500',
        color: '#374151',
        letterSpacing: 0.1,
    },
    value: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
    },
    change: {
        fontSize: 11,
        fontWeight: '500',
    },
    trendUp: {
        color: '#10B981',
    },
    trendDown: {
        color: '#EF4444',
    },
});
