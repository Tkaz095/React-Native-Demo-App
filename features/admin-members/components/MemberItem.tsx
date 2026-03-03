import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../../components/ui/Button';
import { AdminMember } from '../types/member.types';

interface MemberItemProps {
    member: AdminMember;
    onApprove?: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function MemberItem({ member, onApprove, onDelete }: MemberItemProps) {
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.businessName} numberOfLines={1}>{member.businessName}</Text>
                <Text style={styles.representativeName} numberOfLines={1}>Đại diện: {member.representativeName}</Text>
                <View style={styles.statusRow}>
                    <Text style={styles.statusLabel}>Trạng thái: </Text>
                    <Text style={[styles.statusValue, member.status === 'Active' ? styles.statusActive : styles.statusPending]}>
                        {member.status}
                    </Text>
                </View>
            </View>

            <View style={styles.actionsContainer}>
                {member.status === 'Pending' && onApprove && (
                    <Button
                        title="Duyệt"
                        onPress={() => onApprove(member.id)}
                        size="sm"
                        style={[styles.actionButton, styles.approveButton]}
                        textStyle={styles.approveButtonText}
                    />
                )}
                <Button
                    title="Xóa"
                    onPress={() => onDelete(member.id)}
                    size="sm"
                    style={[styles.actionButton, styles.deleteButton]}
                    textStyle={styles.deleteButtonText}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    infoContainer: {
        flex: 1,
        marginRight: 12,
    },
    businessName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    representativeName: {
        fontSize: 14,
        color: '#666',
        marginBottom: 6,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusLabel: {
        fontSize: 13,
        color: '#666',
    },
    statusValue: {
        fontSize: 13,
        fontWeight: '600',
    },
    statusActive: {
        color: '#4CAF50',
    },
    statusPending: {
        color: '#FF9800',
    },
    actionsContainer: {
        flexDirection: 'column',
        gap: 8,
    },
    actionButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        minWidth: 70,
    },
    approveButton: {
        backgroundColor: '#E8F5E9',
        borderColor: '#4CAF50',
        borderWidth: 1,
    },
    approveButtonText: {
        color: '#4CAF50',
    },
    deleteButton: {
        backgroundColor: '#FFEBEE',
        borderColor: '#F44336',
        borderWidth: 1,
    },
    deleteButtonText: {
        color: '#F44336',
    },
});
