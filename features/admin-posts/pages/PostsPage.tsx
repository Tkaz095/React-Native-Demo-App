import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PostsPage() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Nội dung trang - Quản lý bài đăng</Text>
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
