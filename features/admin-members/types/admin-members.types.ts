export interface Member {
    id: string;
    companyName: string;
    industry: string;
    region: string;
    size: string;
    tier: string;
    status: 'active' | 'pending' | 'locked';
    isEditLocked: boolean;
    joinDate: string;
    email: string;
    phone: string;
    taxCode?: string;
}

export interface MemberEditData {
    id: string;
    companyName: string;
    taxCode: string;
    industry: string;
    foundedYear: string;
    employeeSize: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    services: string[];
    certificates: string[];
}

export interface MemberDetailData {
    id: string;
    companyName: string;
    logo: string;
    industry: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    services: string[];
    certificates: string[];
    tier: string;
    status: 'active' | 'pending' | 'locked';
    joinDate: string;
    socialLinks?: {
        facebook?: string;
        tiktok?: string;
        youtube?: string;
    };
}
