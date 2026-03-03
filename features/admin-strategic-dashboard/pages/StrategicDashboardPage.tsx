import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function StrategicDashboardPage() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Nội dung trang - Dashboard Chiến Lược</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    text: {
        fontSize: 16,
        color: '#6B7280',
    }
});
