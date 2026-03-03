import { AdminShell } from '@/components/layout/admin-workspace/AdminShell';
import { Stack } from 'expo-router';

export default function AdminLayout() {
    return (
        <AdminShell>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="strategic-dashboard" />
                <Stack.Screen name="members" />
                <Stack.Screen name="service-packages" />
                <Stack.Screen name="transactions" />
                <Stack.Screen name="posts" />
                <Stack.Screen name="events" />
                <Stack.Screen name="settings" />
                <Stack.Screen name="profile" />
                <Stack.Screen name="users" />
            </Stack>
        </AdminShell>
    );
}
