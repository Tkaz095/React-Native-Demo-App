import { MemberPackage, ServicePackage, ServicePackageFeature } from '../types/admin-service-packages.types';

export const defaultFeatures: Omit<ServicePackageFeature, 'enabled' | 'config'>[] = [
    {
        id: 'promotions',
        name: 'Đăng chương trình ưu đãi',
        description: 'Tạo và quản lý các chương trình khuyến mãi, ưu đãi với thiết lập thời gian và điều kiện',
    },
    {
        id: 'push_notifications',
        name: 'Gửi thông báo đẩy',
        description: 'Gửi thông báo đẩy đến khách hàng khi có ưu đãi hoặc sự kiện mới',
    },
    {
        id: 'marketplace',
        name: 'Đăng sản phẩm/dịch vụ',
        description: 'Đăng và quản lý sản phẩm/dịch vụ trên Marketplace của hệ thống',
    },
    {
        id: 'quote_requests',
        name: 'Nhận yêu cầu báo giá',
        description: 'Nhận và xử lý yêu cầu báo giá từ khách hàng tiềm năng',
    },
];

export const mockPackages: ServicePackage[] = [
    {
        id: 'pkg-001',
        name: 'Gói Cơ bản',
        description: 'Gói dịch vụ cơ bản cho doanh nghiệp mới tham gia',
        price: 2000000,
        duration: 'month',
        color: '#9CA3AF',
        isActive: true,
        createdAt: '2026-01-15T10:00:00',
        updatedAt: '2026-01-15T10:00:00',
        features: [
            {
                id: 'promotions',
                name: 'Đăng chương trình ưu đãi',
                description: 'Tạo và quản lý các chương trình khuyến mãi, ưu đãi với thiết lập thời gian và điều kiện',
                enabled: true,
                config: {
                    allowTimeSchedule: true,
                    allowConditions: false,
                    allowDiscountCodes: false,
                    showOnHomepage: false,
                },
            },
            {
                id: 'push_notifications',
                name: 'Gửi thông báo đẩy',
                description: 'Gửi thông báo đẩy đến khách hàng khi có ưu đãi hoặc sự kiện mới',
                enabled: false,
            },
            {
                id: 'marketplace',
                name: 'Đăng sản phẩm/dịch vụ',
                description: 'Đăng và quản lý sản phẩm/dịch vụ trên Marketplace của hệ thống',
                enabled: true,
                config: {
                    maxProducts: 5,
                    allowMarketplace: true,
                },
            },
            {
                id: 'quote_requests',
                name: 'Nhận yêu cầu báo giá',
                description: 'Nhận và xử lý yêu cầu báo giá từ khách hàng tiềm năng',
                enabled: false,
            },
        ],
    },
    {
        id: 'pkg-002',
        name: 'Gói Tiêu chuẩn',
        description: 'Gói dịch vụ tiêu chuẩn với đầy đủ tính năng marketing',
        price: 5000000,
        duration: 'month',
        color: '#3B82F6',
        isActive: true,
        createdAt: '2026-01-15T10:00:00',
        updatedAt: '2026-01-15T10:00:00',
        features: [
            {
                id: 'promotions',
                name: 'Đăng chương trình ưu đãi',
                description: 'Tạo và quản lý các chương trình khuyến mãi, ưu đãi với thiết lập thời gian và điều kiện',
                enabled: true,
                config: {
                    allowTimeSchedule: true,
                    allowConditions: true,
                    allowDiscountCodes: true,
                    showOnHomepage: true,
                },
            },
            {
                id: 'push_notifications',
                name: 'Gửi thông báo đẩy',
                description: 'Gửi thông báo đẩy đến khách hàng khi có ưu đãi hoặc sự kiện mới',
                enabled: true,
                config: {
                    maxNotificationsPerDay: 10,
                },
            },
            {
                id: 'marketplace',
                name: 'Đăng sản phẩm/dịch vụ',
                description: 'Đăng và quản lý sản phẩm/dịch vụ trên Marketplace của hệ thống',
                enabled: true,
                config: {
                    maxProducts: 20,
                    allowMarketplace: true,
                },
            },
            {
                id: 'quote_requests',
                name: 'Nhận yêu cầu báo giá',
                description: 'Nhận và xử lý yêu cầu báo giá từ khách hàng tiềm năng',
                enabled: true,
                config: {
                    allowQuoteRequests: true,
                    maxQuotesPerMonth: 50,
                },
            },
        ],
    },
    {
        id: 'pkg-003',
        name: 'Gói Cao cấp',
        description: 'Gói dịch vụ cao cấp với tất cả tính năng không giới hạn',
        price: 10000000,
        duration: 'month',
        color: '#D4AF37',
        isActive: true,
        createdAt: '2026-01-15T10:00:00',
        updatedAt: '2026-01-15T10:00:00',
        features: [
            {
                id: 'promotions',
                name: 'Đăng chương trình ưu đãi',
                description: 'Tạo và quản lý các chương trình khuyến mãi, ưu đãi với thiết lập thời gian và điều kiện',
                enabled: true,
                config: {
                    allowTimeSchedule: true,
                    allowConditions: true,
                    allowDiscountCodes: true,
                    showOnHomepage: true,
                },
            },
            {
                id: 'push_notifications',
                name: 'Gửi thông báo đẩy',
                description: 'Gửi thông báo đẩy đến khách hàng khi có ưu đãi hoặc sự kiện mới',
                enabled: true,
                config: {
                    maxNotificationsPerDay: -1,
                },
            },
            {
                id: 'marketplace',
                name: 'Đăng sản phẩm/dịch vụ',
                description: 'Đăng và quản lý sản phẩm/dịch vụ trên Marketplace của hệ thống',
                enabled: true,
                config: {
                    maxProducts: -1,
                    allowMarketplace: true,
                },
            },
            {
                id: 'quote_requests',
                name: 'Nhận yêu cầu báo giá',
                description: 'Nhận và xử lý yêu cầu báo giá từ khách hàng tiềm năng',
                enabled: true,
                config: {
                    allowQuoteRequests: true,
                    maxQuotesPerMonth: -1,
                },
            },
        ],
    },
];

export const mockMemberPackages: MemberPackage[] = [
    {
        memberId: 'M001',
        memberName: 'Nguyễn Văn A',
        companyName: 'Công ty CP Công nghệ Sao Việt',
        packageId: 'pkg-002',
        packageName: 'Gói Tiêu chuẩn',
        startDate: '2026-02-01',
        endDate: '2026-03-01',
        status: 'active',
        autoRenew: true,
    },
    {
        memberId: 'M002',
        memberName: 'Trần Thị B',
        companyName: 'Tập đoàn MNO Holdings',
        packageId: 'pkg-003',
        packageName: 'Gói Cao cấp',
        startDate: '2026-01-15',
        endDate: '2026-02-15',
        status: 'active',
        autoRenew: false,
    },
    {
        memberId: 'M003',
        memberName: 'Lê Văn C',
        companyName: 'Xây dựng Hòa Bình',
        packageId: 'pkg-001',
        packageName: 'Gói Cơ bản',
        startDate: '2026-02-10',
        endDate: '2026-03-10',
        status: 'active',
        autoRenew: true,
    },
];
