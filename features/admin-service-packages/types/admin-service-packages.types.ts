export interface FeatureConfig {
    allowTimeSchedule?: boolean;
    allowConditions?: boolean;
    allowDiscountCodes?: boolean;
    showOnHomepage?: boolean;
    maxNotificationsPerDay?: number;
    maxProducts?: number;
    allowMarketplace?: boolean;
    allowQuoteRequests?: boolean;
    maxQuotesPerMonth?: number;
}

export interface ServicePackageFeature {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
    config?: FeatureConfig;
}

export interface ServicePackage {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: 'month' | 'quarter' | 'year';
    features: ServicePackageFeature[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    color: string;
}

export interface MemberPackage {
    memberId: string;
    memberName: string;
    companyName: string;
    packageId: string;
    packageName?: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'expired' | 'suspended';
    autoRenew?: boolean;
}
