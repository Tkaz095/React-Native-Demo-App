import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ProfileDetails } from '../components/ProfileDetails';
import { ProfileSidebar } from '../components/ProfileSidebar';

export default function ProfilePage() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.layout}>
                {/* Trên mobile sẽ hiển thị Sidebar trước, rồi Details dưới */}
                <ProfileSidebar />
                <ProfileDetails />
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
        paddingBottom: 40,
    },
    layout: {
        flexDirection: 'column',
        gap: 16,
    }
});
