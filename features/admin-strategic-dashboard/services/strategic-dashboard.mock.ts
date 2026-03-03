// ==========================================
// MOCK DATA: BẢNG ĐIỀU KHIỂN CHIẾN LƯỢC
// ==========================================

// --- TẦNG 1: CHỈ SỐ DẪN DẮT ---

export const PERFORMANCE_SCORE_MOCK = {
    score: 78,
    maxScore: 100,
    trend: "+6%",
    trendUp: true,
    description: "Mức độ vận hành đúng định hướng",
    categories: [
        { label: "Đăng bài giá trị", value: 82, max: 100 },
        { label: "Tương tác chất lượng", value: 75, max: 100 },
        { label: "Kết nối doanh nghiệp", value: 80, max: 100 },
        { label: "Tham gia dự án", value: 72, max: 100 },
    ],
};

export const CONNECTION_RATE_MOCK = {
    rate: 68,
    unit: "%",
    trend: "+4%",
    trendUp: true,
    description: "Mức độ tương tác giữa các bên",
    connections: [
        { label: "Hội viên → Doanh nghiệp", value: 70, color: "#1E3A5F" },
        { label: "Hội viên → Đối tác", value: 65, color: "#B8860B" },
        { label: "Doanh nghiệp → Đối tác", value: 67, color: "#4A7AB5" },
    ],
};

export const FUNNEL_MOCK = {
    title: "Phễu Chuyển Đổi Hoạt Động",
    subtitle: "Hiệu suất từng giai đoạn",
    steps: [
        { label: "Tương tác", value: 1000, color: "#1E3A5F" },
        { label: "Tới suất", value: 490, percent: "49%", color: "#4A7AB5" },
        { label: "Dự án", value: 180, percent: "40%", color: "#B8860B" },
        { label: "Giữ lại KT", value: 85, percent: "47%", color: "#2E7D32" },
    ],
    conversionNote: "Tỷ lệ chuyển đổi tổng: 8.5% (tương tác đến giữ lại kinh tế)",
};

// --- TẦNG 2: TƯƠNG TÁC & CHUYỂN ĐỔI ---

export const PROJECT_FORMATION_MOCK = {
    rate: 18,
    unit: "%",
    trend: "+3%",
    trendUp: true,
    chartData: [
        { month: "T1", value: 12 },
        { month: "T2", value: 14 },
        { month: "T3", value: 10 },
        { month: "T4", value: 16 },
        { month: "T5", value: 15 },
        { month: "T6", value: 18 },
        { month: "T7", value: 20 },
    ],
};

export const CONTENT_EFFICIENCY_MOCK = {
    items: [
        { label: "Dự án (Đã ĐK/Tổng)", actual: 45, color: "#1E3A5F" },
        { label: "Tin Giải ĐN", actual: 28, color: "#B8860B" },
        { label: "Tuyển dụng", actual: 15, color: "#4CAF50" },
        { label: "Sự kiện", actual: 12, color: "#4A7AB5" },
    ],
};

export const INTERACTION_QUALITY_MOCK = {
    score: 7.2,
    maxScore: 10,
    trend: "+6%",
    trendUp: true,
    metrics: [
        { label: "Tốt sáu tiêu tuần", value: 7.5, color: "#1E3A5F" },
        { label: "Chiều sâu nội dung", value: 6.8, color: "#B8860B" },
        { label: "Tương tác lặp lại", value: 7.4, color: "#4A7AB5" },
        { label: "Thay đổi sau", value: 7.1, color: "#2E7D32" },
    ],
};

export const NEW_MEMBER_PERFORMANCE_MOCK = {
    metrics: [
        { label: "Duy trì", value: 72, unit: "%", color: "#1E3A5F" },
        { label: "Tạo dự án", value: 25, unit: "%", color: "#B8860B" },
        { label: "Tham gia", value: 68, unit: "%", color: "#2E7D32" },
    ],
    timeline: [
        { label: "30 ngày", value: 73 },
        { label: "60 ngày", value: 72 },
        { label: "90 ngày", value: 68 },
    ],
};

// --- TẦNG 3: PHÁT TRIỂN & CÂN BẰNG ---

export const MEMBER_SOURCE_QUALITY_MOCK = {
    sources: [
        { label: "Giới thiệu", total: 45, unit: "HV", activation: 85, projectRate: 32 },
        { label: "Sự kiện", total: 33, unit: "HV", activation: 78, projectRate: 28 },
        { label: "Website", total: 52, unit: "HV", activation: 65, projectRate: 18 },
        { label: "Quảng cáo", total: 31, unit: "HV", activation: 55, projectRate: 12 },
    ],
};

export const COST_VS_VALUE_MOCK = {
    costPerMonth: "2.5M",
    valueCreated: "15.0M",
    roiRatio: 6.0,
    chartData: [
        { month: "T1", cost: 5, value: 11 },
        { month: "T2", cost: 6, value: 14 },
        { month: "T3", cost: 4, value: 12 },
        { month: "T4", cost: 7, value: 16 },
        { month: "T5", cost: 5, value: 13 },
        { month: "T6", cost: 8, value: 18 },
    ],
};

export const OPERATIONAL_BALANCE_MOCK = {
    score: 8.2,
    maxScore: 10,
    segments: [
        { label: "Hội viên hoạt động", value: 245, target: 300, color: "#1E3A5F" },
        { label: "Doanh nghiệp tham gia", value: 180, target: 200, color: "#B8860B" },
        { label: "Đối tác", value: 45, target: 60, color: "#4A7AB5" },
        { label: "Dự án phát sinh", value: 85, target: 100, color: "#2E7D32" },
    ],
    healthNote: "Hệ sinh thái đang hoạt động cân bằng",
};

export const STRATEGIC_INSIGHTS_MOCK = {
    generatedAt: "Quý 03 - 50 ngày qua",
    strengths: "Điểm hoạt động hiệu quả đạt 78/100 và tăng trưởng tốt. Tỷ lệ kết nối liên thông cải thiện 4%.",
    improvements: "Phêu chuyển đổi bị nghẽn ở giai đoạn 'Đề xuất → Dự án' (40%). Cần tăng cường hỗ trợ.",
    recommendations: "Tập trung nguồn lực vào kênh 'Giới thiệu' (activation 85%, projects 32%).",
};
