/**
 * Re-export from lib/data for backward compatibility
 * @deprecated Import directly from @/lib/data/strategic-dashboard.data instead
 */
export {
    CONNECTION_RATE_MOCK, CONTENT_EFFICIENCY_MOCK, COST_VS_VALUE_MOCK, FUNNEL_MOCK, INTERACTION_QUALITY_MOCK, MEMBER_SOURCE_QUALITY_MOCK, NEW_MEMBER_PERFORMANCE_MOCK, OPERATIONAL_BALANCE_MOCK, PERFORMANCE_SCORE_MOCK, PROJECT_FORMATION_MOCK, STRATEGIC_INSIGHTS_MOCK,
    getDashboardDataByTimePeriod
} from "@/lib/data/strategic-dashboard.data";

export type {
    ConnectionRate, ContentEfficiency, CostVsValue, DashboardData, Funnel, InteractionQuality, MemberSourceQuality, NewMemberPerformance, OperationalBalance, PerformanceScore, ProjectFormation, StrategicInsights
} from "@/lib/data/strategic-dashboard.data";

