import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const now = new Date();
const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;

const FILTER_OPTIONS = ['7 ngày qua', '30 ngày qua', '90 ngày qua'];
const TARGET_OPTIONS = ['Tất cả đối tượng', 'Hội viên', 'Doanh nghiệp', 'Đối tác'];
const GROUP_OPTIONS = ['Tất cả nhóm', 'Hội viên Vàng', 'Hội viên Bạc', 'Hội viên Đồng'];

function FilterChip({ label, iconName }: { label: string; iconName: React.ComponentProps<typeof Ionicons>['name'] }) {
    return (
        <View style={styles.chip}>
            <Ionicons name={iconName} size={13} color="#6B7280" />
            <Text style={styles.chipText}>{label}</Text>
            <Ionicons name="chevron-down" size={12} color="#9CA3AF" />
        </View>
    );
}

export function StrategicHeader() {
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
                <View style={styles.filterLabel}>
                    <Ionicons name="filter-outline" size={14} color="#6B7280" />
                    <Text style={styles.filterLabelText}>Bộ lọc:</Text>
                </View>
                <FilterChip label={FILTER_OPTIONS[0]} iconName="calendar-outline" />
                <FilterChip label={TARGET_OPTIONS[0]} iconName="people-outline" />
                <FilterChip label={GROUP_OPTIONS[0]} iconName="layers-outline" />
            </ScrollView>

            <View style={styles.timestampRow}>
                <Ionicons name="time-outline" size={13} color="#1E3A5F" />
                <Text style={styles.timestampText}>Cập nhật: </Text>
                <Text style={styles.timestampBold}>{formattedTime}</Text>
                <Text style={styles.timestampSub}> ({formattedDate})</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 8,
    },
    filterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 2,
    },
    filterLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    filterLabelText: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '500',
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
    },
    chipText: {
        fontSize: 13,
        color: '#111827',
        fontWeight: '500',
    },
    timestampRow: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#F9FAFB',
        gap: 3,
    },
    timestampText: {
        fontSize: 12,
        color: '#6B7280',
    },
    timestampBold: {
        fontSize: 13,
        fontWeight: '700',
        color: '#111827',
    },
    timestampSub: {
        fontSize: 12,
        color: '#9CA3AF',
    },
});
