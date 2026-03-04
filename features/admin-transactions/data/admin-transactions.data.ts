import { RevenueStats, Transaction } from '../types/admin-transactions.types';

export const REVENUE_STATS_MOCK: RevenueStats = {
    totalRevenue: 932500000,
    totalRevenueGrowth: 18.5,
    totalMembersFee: 550000000,
    totalMembersFeePercentage: 59.0,
    totalCommission: 300000000,
    totalCommissionPercentage: 32.2,
    totalEventFee: 82500000,
    totalEventFeePercentage: 8.8,
};

export const REVENUE_PIE_CHART_MOCK = [
    { name: "Phí hội viên", value: 59.0, fill: "#10B981" }, // Emerald 500
    { name: "Phí hoa hồng", value: 32.2, fill: "#3B82F6" }, // Blue 500
    { name: "Phí tham gia", value: 8.8, fill: "#F59E0B" },  // Amber 500
];

export const TRANSACTIONS_LIST_MOCK: Transaction[] = [
    { id: "tx-001", memberName: "Công ty Cổ phần Đầu tư DEF", type: "TG", amount: 3000000, status: "success", date: "04/03/2026" },
    { id: "tx-002", memberName: "Tập đoàn XYZ Corporation", type: "TG", amount: 2000000, status: "success", date: "04/03/2026" },
    { id: "tx-003", memberName: "Công ty TNHH ABC Technology", type: "TG", amount: 1500000, status: "success", date: "03/03/2026" },
    { id: "tx-004", memberName: "Công ty CP Logistics GHI", type: "HH", amount: 2100000, status: "success", date: "01/03/2026" },
    { id: "tx-005", memberName: "Thép Hòa Phát", type: "HV", amount: 15000000, status: "success", date: "28/02/2026" },
    { id: "tx-006", memberName: "Bất động sản Nam Long", type: "HH", amount: 5500000, status: "success", date: "25/02/2026" },
    { id: "tx-007", memberName: "Bất động sản Nam Long", type: "HV", amount: 5000000, status: "success", date: "20/02/2026" },
    { id: "tx-008", memberName: "Tập đoàn MNO Holdings", type: "HH", amount: 2500000, status: "success", date: "15/02/2026" },
    { id: "tx-009", memberName: "Công ty CP Công nghệ Sao Việt", type: "HV", amount: 5000000, status: "success", date: "10/02/2026" },
    { id: "tx-010", memberName: "Công ty TNHH ARC Infrastructure", type: "HH", amount: 1800000, status: "success", date: "05/02/2026" },
];
