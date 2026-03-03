import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import EventsListTab from '../components/EventsListTab';
import EventTypesTab from '../components/EventTypesTab';
import { mockEvents, mockEventTypes } from '../data/admin-events.data';

export default function EventsPage() {
    const [activeTab, setActiveTab] = useState<'events' | 'types'>('events');

    return (
        <View style={styles.container}>
            {/* Header Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'events' && styles.tabButtonActive]}
                    onPress={() => setActiveTab('events')}
                >
                    <Text style={[styles.tabText, activeTab === 'events' && styles.tabTextActive]}>
                        Danh sách sự kiện
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'types' && styles.tabButtonActive]}
                    onPress={() => setActiveTab('types')}
                >
                    <Text style={[styles.tabText, activeTab === 'types' && styles.tabTextActive]}>
                        Loại sự kiện
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.content}>
                {activeTab === 'events' ? (
                    <EventsListTab events={mockEvents} eventTypes={mockEventTypes} />
                ) : (
                    <EventTypesTab initialTypes={mockEventTypes} />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingTop: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabButtonActive: {
        borderBottomColor: '#1976D2',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
    },
    tabTextActive: {
        color: '#1976D2',
        fontWeight: '600',
    },
    content: {
        flex: 1,
    }
});
