import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import {
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

interface AdminSidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

type NavItem = {
    title: string;
    path: string;
    icon: keyof typeof Ionicons.glyphMap;
};

const MAIN_NAV: NavItem[] = [
    { title: "Dashboard", path: "/admin", icon: "speedometer-outline" },
    { title: "Quản lý hội viên", path: "/admin/members", icon: "people-outline" },
    { title: "Quản lý dịch vụ", path: "/admin/service-packages", icon: "cube-outline" },
    { title: "Quản lý giao dịch", path: "/admin/transactions", icon: "card-outline" },
    { title: "Quản lý bài đăng", path: "/admin/posts", icon: "document-text-outline" },
    { title: "Quản lý sự kiện", path: "/admin/events", icon: "calendar-outline" },
];

const BOTTOM_NAV: NavItem[] = [
    { title: "Thông tin cá nhân", path: "/admin/profile", icon: "person-outline" },
    { title: "Cài đặt", path: "/admin/settings", icon: "settings-outline" },
];

export function AdminSidebar({ sidebarOpen, setSidebarOpen }: AdminSidebarProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleNavigation = (path: string) => {
        setSidebarOpen(false);
        // Add small delay to allow modal to close smoothly before navigating
        setTimeout(() => {
            router.push(path as any);
        }, 150);
    };

    const renderNavItem = (item: NavItem) => {
        // Basic exact match for root `/admin`, startsWith for others
        const isActive = item.path === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.path);

        return (
            <TouchableOpacity
                key={item.path}
                style={[styles.navItem, isActive && styles.activeNavItem]}
                onPress={() => handleNavigation(item.path)}
            >
                <Ionicons
                    name={item.icon}
                    size={22}
                    color={isActive ? "#EAB308" : "#9CA3AF"}
                />
                <Text style={[styles.navText, isActive && styles.activeNavText]}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            visible={sidebarOpen}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setSidebarOpen(false)}
        >
            <View style={styles.overlayContainer}>
                <TouchableWithoutFeedback onPress={() => setSidebarOpen(false)}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>

                <View style={styles.bottomSheet}>
                    {/* Header area of bottom sheet */}
                    <View style={styles.sheetHeader}>
                        <View style={styles.brandContainer}>
                            <View style={styles.brandLogo}>
                                <Text style={styles.brandLogoText}>H</Text>
                            </View>
                            <View>
                                <Text style={styles.brandName}>Hội Doanh Nghiệp</Text>
                                <Text style={styles.brandSub}>ADMIN PORTAL</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => setSidebarOpen(false)} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.navSection}>
                            {MAIN_NAV.map(renderNavItem)}
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.navSection}>
                            {BOTTOM_NAV.map(renderNavItem)}

                            <TouchableOpacity
                                style={styles.navItem}
                                onPress={() => {
                                    setSidebarOpen(false);
                                    setTimeout(() => router.replace('/' as any), 150);
                                }}
                            >
                                <Ionicons name="log-out-outline" size={22} color="#9CA3AF" />
                                <Text style={styles.navText}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlayContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bottomSheet: {
        backgroundColor: '#1E293B', // Dark theme for sidebar
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 16,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        maxHeight: '85%', // Don't take up entire screen
        minHeight: '60%',
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#334155',
    },
    brandContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    brandLogo: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#EAB308', // Yellow brand color
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandLogoText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    brandName: {
        color: '#F8FAFC',
        fontSize: 16,
        fontWeight: 'bold',
    },
    brandSub: {
        color: '#94A3B8',
        fontSize: 11,
        fontWeight: '600',
        marginTop: 2,
    },
    closeButton: {
        padding: 4,
    },
    scrollContent: {
        paddingHorizontal: 12,
    },
    navSection: {
        paddingVertical: 12,
        gap: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#334155',
        marginHorizontal: 8,
    },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        gap: 12,
    },
    activeNavItem: {
        backgroundColor: '#EAB308',
    },
    navText: {
        color: '#F8FAFC',
        fontSize: 15,
        fontWeight: '500',
    },
    activeNavText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
});
