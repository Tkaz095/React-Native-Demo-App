import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AdminHeader } from './AdminHeader';

interface AdminShellProps {
    children: React.ReactNode;
}

const TABS = [
    { name: 'Dashboard', path: '/admin/strategic-dashboard', icon: 'analytics-outline' },
    { name: 'Hội viên', path: '/admin/members', icon: 'people-outline' },
    { name: 'Bài đăng', path: '/admin/posts', icon: 'document-text-outline' },
    { name: 'Sự kiện', path: '/admin/events', icon: 'calendar-outline' },
];

export function AdminShell({ children }: AdminShellProps) {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <AdminHeader />
            <View style={styles.content}>
                {children}
            </View>
            <View style={styles.tabbar}>
                {TABS.map((tab) => {
                    const isActive = pathname.startsWith(tab.path);
                    return (
                        <TouchableOpacity
                            key={tab.path}
                            style={styles.tabItem}
                            onPress={() => router.push(tab.path as any)}
                        >
                            <Ionicons
                                name={tab.icon as any}
                                size={22}
                                color={isActive ? "#EAB308" : "#9CA3AF"}
                            />
                            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                                {tab.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFB' },
    content: { flex: 1 },
    tabbar: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 28 : 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 10,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    tabLabel: {
        fontSize: 10,
        color: '#9CA3AF',
        fontWeight: '500',
    },
    tabLabelActive: {
        color: '#EAB308',
        fontWeight: '700',
    }
});
