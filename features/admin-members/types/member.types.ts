export interface AdminMember {
    id: string;
    businessName: string;
    representativeName: string;
    status: 'Active' | 'Pending';
    createdAt: string;
}

export type CreateAdminMemberInput = Omit<AdminMember, 'id' | 'createdAt' | 'status'>;
