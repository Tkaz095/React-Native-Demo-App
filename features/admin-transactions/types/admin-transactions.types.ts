export type TransactionType = "TG" | "HH" | "HV"; // TG: Tham gia, HH: Hoa hồng, HV: Hội viên
export type TransactionStatus = "success" | "pending" | "failed";

export interface Transaction {
    id: string;
    memberName: string;
    type: TransactionType;
    amount: number;
    status: TransactionStatus;
    date: string;
}

export interface RevenueStats {
    totalRevenue: number;
    totalRevenueGrowth: number;
    totalMembersFee: number;
    totalMembersFeePercentage: number;
    totalCommission: number;
    totalCommissionPercentage: number;
    totalEventFee: number;
    totalEventFeePercentage: number;
}

// Membership Fee Types
export type MembershipStatus = "paid" | "unpaid" | "overdue";

export interface MembershipFee {
    id: string;
    companyName: string;
    representative: string;
    role: string;
    amount: number;
    dueDate: string;
    status: MembershipStatus;
}

export interface MembershipStats {
    totalExpected: number;
    totalExpectedUsers: number;
    totalCollected: number;
    totalCollectedPercentage: number;
    totalUncollected: number;
    totalUncollectedPercentage: number;
    totalOverdueUsers: number;
    totalOverduePercentage: number;
    automationCollectionRate: number;
    automationCollectedAmount: number;
}

// Event Fee Types
export type EventTransactionStatus = "success" | "failed";

export interface EventFeeTransaction {
    id: string;
    eventName: string;
    participantInfo: string;
    date: string;
    amount: number;
    status: EventTransactionStatus;
}

export interface EventFeeStats {
    totalCollected: number;
    successfulTransactionsCount: number;
    totalRegistrations: number;
    failedTransactionsCount: number;
    totalChargingEvents: number;
    ongoingEventsCount: number;
}

export interface EventOverview {
    successRate: number;
    averagePerTransaction: number;
}
