import { Ionicons } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ADMIN_PAGE_TITLES } from './admin-page-titles';

interface AdminHeaderProps {
    setSidebarOpen: (open: boolean) => void;
}

export function AdminHeader({ setSidebarOpen }: AdminHeaderProps) {
    const pathname = usePathname();
    const pageInfo = ADMIN_PAGE_TITLES[pathname] || { title: 'Admin' };

    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => setSidebarOpen(true)}
            >
                <Ionicons name="menu" size={28} color="#333" />
            </TouchableOpacity>

            <Text style={styles.title}>{pageInfo.title}</Text>

            {/* Empty view for flex balancing */}
            <View style={{ width: 40 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 50 : 20, // SafeArea approximation
        paddingBottom: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        elevation: 2, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        zIndex: 10,
    },
    menuButton: {
        padding: 8,
        marginLeft: -8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    }
});
