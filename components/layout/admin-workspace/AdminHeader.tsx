import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { ADMIN_PAGE_TITLES } from './admin-page-titles';

export function AdminHeader() {
    const pathname = usePathname();
    const router = useRouter();
    const pageInfo = ADMIN_PAGE_TITLES[pathname] || { title: 'Admin' };

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleLogout = () => {
        setDropdownVisible(false);

        if (Platform.OS === 'web') {
            const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất phiên làm việc?");
            if (confirmLogout) {
                router.replace("/" as any);
            }
        } else {
            Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất phiên làm việc?", [
                { text: "Đóng", style: "cancel" },
                {
                    text: "Đăng xuất",
                    style: "destructive",
                    onPress: () => router.replace("/" as any)
                }
            ]);
        }
    };

    const handleNavigateProfile = () => {
        setDropdownVisible(false);
        router.push('/admin/profile' as any);
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
                <TouchableOpacity
                    onPress={() => setDropdownVisible(!isDropdownVisible)}
                    style={styles.userButton}
                >
                    <Ionicons name="person-circle-outline" size={28} color="#4B5563" />
                    <Ionicons name="chevron-down" size={16} color="#4B5563" />
                </TouchableOpacity>

                {/* Dropdown Modal */}
                <Modal visible={isDropdownVisible} transparent={true} animationType="fade">
                    <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
                        <View style={styles.modalOverlay}>
                            <View style={styles.dropdownMenu}>
                                <TouchableOpacity style={styles.dropdownItem} onPress={handleNavigateProfile}>
                                    <Ionicons name="person-outline" size={20} color="#4B5563" />
                                    <Text style={styles.dropdownItemText}>Thông tin cá nhân</Text>
                                </TouchableOpacity>
                                <View style={styles.dropdownDivider} />
                                <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout}>
                                    <Ionicons name="log-out-outline" size={20} color="#EF4444" />
                                    <Text style={[styles.dropdownItemText, { color: '#EF4444' }]}>Đăng xuất</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
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
    userButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        padding: 4,
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        paddingHorizontal: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    dropdownMenu: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 8,
        minWidth: 200,
        maxWidth: 250,
        marginTop: Platform.OS === 'ios' ? 90 : 60,
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        gap: 12,
        borderRadius: 8,
    },
    dropdownItemText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#374151',
    },
    dropdownDivider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginVertical: 4,
    }
});
