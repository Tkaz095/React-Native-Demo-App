import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ADMIN_PAGE_TITLES } from './admin-page-titles';

export function AdminHeader() {
    const pathname = usePathname();
    const router = useRouter();
    const pageInfo = ADMIN_PAGE_TITLES[pathname] || { title: 'Admin' };

    const handleLogout = () => {
        Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất phiên làm việc?", [
            { text: "Đóng", style: "cancel" },
            {
                text: "Đăng xuất",
                style: "destructive",
                onPress: () => router.replace("/" as any)
            }
        ]);
    };

    return (
        <View style={styles.header}>
            <View style={styles.leftSection}>
                <View style={styles.brandLogo}>
                    <Text style={styles.brandLogoText}>H</Text>
                </View>
            </View>

            <View style={styles.centerSection}>
                <Text style={styles.title}>{pageInfo.title}</Text>
            </View>

            <View style={styles.rightSection}>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={24} color="#EF4444" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
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
    leftSection: {
        flex: 1,
        alignItems: 'flex-start',
    },
    centerSection: {
        flex: 2,
        alignItems: 'center',
    },
    rightSection: {
        flex: 1,
        alignItems: 'flex-end',
    },
    brandLogo: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: "#EAB308",
        alignItems: "center",
        justifyContent: "center",
    },
    brandLogoText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    logoutButton: {
        padding: 4,
    }
});
