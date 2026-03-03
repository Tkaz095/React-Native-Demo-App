import { Post } from "./contexts/PostsContext";

export const ADMIN_POSTS_MOCK_DATA: Post[] = [
  {
    id: "APPPOST101",
    title:
      'Chúng tôi đang tìm kiếm đối tác để triển khai dự án "Khu đô thị sinh thái" tại Hà Nội. Ngân sách dự kiến 50 tỷ VNĐ. Các công ty có năng lực vui lòng đăng ký tham gia!',
    company: "Công ty TNHH Xây dựng Hoàng Anh",
    category: "project",
    status: "approved",
    createdDate: "02/03/2026",
    lastEdited: "02/03/2026",
    content:
      'Chúng tôi đang tìm kiếm đối tác để triển khai dự án "Khu đô thị sinh thái" tại Hà Nội. Ngân sách dự kiến 50 tỷ VNĐ. Các công ty có năng lực vui lòng đăng ký tham gia!',
    editCount: 0,
    detailedContent:
      'Chúng tôi đang tìm kiếm đối tác để triển khai dự án "Khu đô thị sinh thái" tại Hà Nội. Ngân sách dự kiến 50 tỷ VNĐ. Các công ty có năng lực vui lòng đăng ký tham gia!\n\nTHÔNG TIN DỰ ÁN\n- Hạng mục: Khu đô thị sinh thái Hà Nội\n- Lĩnh vực: Xây dựng\n- Địa điểm: Số 123 Đường Nguyễn Trãi, Phường Thượng Đình, Quận Thanh Xuân, Hà Nội\n- Ngân sách: 50 tỷ\n- Hạn đăng ký: 30/03/2026\n- Trạng thái: Đang mở\n- Số hồ sơ quan tâm: 3',
  },
  {
    id: "APPPOST102",
    title:
      "Chúc mừng đội ngũ kỹ sư của chúng tôi đã hoàn thành xuất sắc dự án Tòa nhà văn phòng 15 tầng tại Q.1! 🎉",
    company: "Công ty TNHH Xây dựng Hoàng Anh",
    category: "product",
    status: "rejected",
    createdDate: "01/03/2026",
    lastEdited: "01/03/2026",
    content:
      "Chúc mừng đội ngũ kỹ sư của chúng tôi đã hoàn thành xuất sắc dự án Tòa nhà văn phòng 15 tầng tại Q.1! 🎉",
    editCount: 0,
    detailedContent:
      "Chúc mừng đội ngũ kỹ sư của chúng tôi đã hoàn thành xuất sắc dự án Tòa nhà văn phòng 15 tầng tại Q.1! 🎉\n\nƯU ĐÃI: 🎉 Ưu đãi đặc biệt cho hội viên\nGiảm ngay 15% chi phí thi công cho tất cả dự án xây dựng\nMức ưu đãi: 15%\nHiệu lực đến: 31/03/2026",
  },
  {
    id: "APPPOST103",
    title:
      'Hội thảo "Chuyển đổi số trong ngành xây dựng" vào tuần tới. Chúng tôi rất mong được gặp các đối tác và doanh nghiệp!',
    company: "Công ty TNHH Xây dựng Hoàng Anh",
    category: "news",
    status: "pending",
    createdDate: "27/02/2026",
    lastEdited: "27/02/2026",
    content:
      'Hội thảo "Chuyển đổi số trong ngành xây dựng" vào tuần tới. Chúng tôi rất mong được gặp các đối tác và doanh nghiệp!',
    editCount: 0,
    detailedContent:
      'Hội thảo "Chuyển đổi số trong ngành xây dựng" vào tuần tới. Chúng tôi rất mong được gặp các đối tác và doanh nghiệp!',
  },
  {
    id: "APPPOST104",
    title:
      'Khóa học "Quản trị Doanh nghiệp 4.0" khai giảng vào ngày 10/03/2026. Chương trình đào tạo chuyên sâu với 100% giảng viên có kinh nghiệm thực tế. Ưu đãi đặc biệt: Mua 1 tặng 1 cho hội viên! 📚🎓',
    company: "Trung tâm Đào tạo Quản lý Pro",
    category: "product",
    status: "approved",
    createdDate: "02/03/2026",
    lastEdited: "02/03/2026",
    content:
      'Khóa học "Quản trị Doanh nghiệp 4.0" khai giảng vào ngày 10/03/2026. Chương trình đào tạo chuyên sâu với 100% giảng viên có kinh nghiệm thực tế. Ưu đãi đặc biệt: Mua 1 tặng 1 cho hội viên! 📚🎓',
    editCount: 0,
    detailedContent:
      'Khóa học "Quản trị Doanh nghiệp 4.0" khai giảng vào ngày 10/03/2026. Chương trình đào tạo chuyên sâu với 100% giảng viên có kinh nghiệm thực tế. Ưu đãi đặc biệt: Mua 1 tặng 1 cho hội viên! 📚🎓\n\nƯU ĐÃI: 🎓 Ưu đãi đặc biệt cho hội viên\nMua 1 khóa học tặng 1 khóa học cùng giá trị - Áp dụng cho tất cả khóa học quản trị\nMức ưu đãi: Mua 1 tặng 1\nHiệu lực đến: 05/03/2026',
  },
  {
    id: "APPPOST1001",
    title:
      'Chúng tôi đang tìm kiếm đối tác để phát triển dự án "Khu đô thị sinh thái" tại Hà Nội. Ngân sách dự kiến 50 tỷ VNĐ. Các công ty có năng lực vui lòng liên hệ!',
    company: "Tập đoàn Xây dựng ABC",
    category: "project",
    status: "rejected",
    createdDate: "02/03/2026",
    lastEdited: "02/03/2026",
    content:
      'Chúng tôi đang tìm kiếm đối tác để phát triển dự án "Khu đô thị sinh thái" tại Hà Nội. Ngân sách dự kiến 50 tỷ VNĐ. Các công ty có năng lực vui lòng liên hệ!',
    editCount: 0,
    detailedContent:
      'Chúng tôi đang tìm kiếm đối tác để phát triển dự án "Khu đô thị sinh thái" tại Hà Nội. Ngân sách dự kiến 50 tỷ VNĐ. Các công ty có năng lực vui lòng liên hệ!\n\nTHÔNG TIN DỰ ÁN\n- Hạng mục: Xây dựng khu đô thị mới\n- Lĩnh vực: Xây dựng\n- Địa điểm: Số 123 Đường Nguyễn Trãi, Phường Thượng Đình, Quận Thanh Xuân, Hà Nội\n- Ngân sách: 50 tỷ\n- Hạn đăng ký: 30/03/2026\n- Trạng thái: Đang mở\n- Số hồ sơ quan tâm: 12',
  },
  {
    id: "APPPOST1002",
    title:
      "Tìm đối tác phát triển hệ thống ERP toàn diện cho doanh nghiệp. Dự án có thời gian 6 tháng, ngân sách 15 tỷ. Yêu cầu đối tác có kinh nghiệm triển khai ERP cho ít nhất 5 khách hàng lớn.",
    company: "Công ty Công nghệ XYZ",
    category: "project",
    status: "pending",
    createdDate: "02/03/2026",
    lastEdited: "02/03/2026",
    content:
      "Tìm đối tác phát triển hệ thống ERP toàn diện cho doanh nghiệp. Dự án có thời gian 6 tháng, ngân sách 15 tỷ. Yêu cầu đối tác có kinh nghiệm triển khai ERP cho ít nhất 5 khách hàng lớn.",
    editCount: 0,
    detailedContent:
      "Tìm đối tác phát triển hệ thống ERP toàn diện cho doanh nghiệp. Dự án có thời gian 6 tháng, ngân sách 15 tỷ. Yêu cầu đối tác có kinh nghiệm triển khai ERP cho ít nhất 5 khách hàng lớn.\n\nTHÔNG TIN DỰ ÁN\n- Hạng mục: Phát triển hệ thống ERP\n- Lĩnh vực: Công nghệ\n- Địa điểm: Tầng 15, Tòa nhà Bitexco Financial Tower, Số 2 Hải Triều, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh\n- Ngân sách: 15 tỷ\n- Hạn đăng ký: 15/02/2026\n- Trạng thái: Đang mở\n- Số hồ sơ quan tâm: 8",
  },
  {
    id: "APPPOST1003",
    title:
      "⚖️ DỊCH VỤ TƯ VẤN LUẬT DOANH NGHIỆP CHUYÊN NGHIỆP - Hỗ trợ thành lập, giải thể, tái cơ cấu doanh nghiệp. Tư vấn hợp đồng, tranh chấp thương mại. Đội ngũ luật sư 15+ năm kinh nghiệm. Tư vấn miễn phí cho hội viên! 📋",
    company: "Công ty CP Tư vấn Luật Doanh Nghiệp",
    category: "news",
    status: "approved",
    createdDate: "02/03/2026",
    lastEdited: "02/03/2026",
    content:
      "⚖️ DỊCH VỤ TƯ VẤN LUẬT DOANH NGHIỆP CHUYÊN NGHIỆP - Hỗ trợ thành lập, giải thể, tái cơ cấu doanh nghiệp. Tư vấn hợp đồng, tranh chấp thương mại. Đội ngũ luật sư 15+ năm kinh nghiệm. Tư vấn miễn phí cho hội viên! 📋",
    editCount: 0,
    detailedContent:
      "⚖️ DỊCH VỤ TƯ VẤN LUẬT DOANH NGHIỆP CHUYÊN NGHIỆP - Hỗ trợ thành lập, giải thể, tái cơ cấu doanh nghiệp. Tư vấn hợp đồng, tranh chấp thương mại. Đội ngũ luật sư 15+ năm kinh nghiệm. Tư vấn miễn phí cho hội viên! 📋",
  },
  {
    id: "APPPOST3",
    title:
      "Chúng tôi đang tìm kiếm Senior Full-stack Developer để tham gia đội ngũ phát triển sản phẩm công nghệ hàng đầu. Đây là cơ hội tuyệt vời để làm việc trong môi trường năng động và phát triển sự nghiệp.",
    company: "Công ty TNHH Công nghệ ABC",
    category: "news",
    status: "approved",
    createdDate: "02/03/2026",
    lastEdited: "02/03/2026",
    content:
      "Chúng tôi đang tìm kiếm Senior Full-stack Developer để tham gia đội ngũ phát triển sản phẩm công nghệ hàng đầu. Đây là cơ hội tuyệt vời để làm việc trong môi trường năng động và phát triển sự nghiệp.",
    editCount: 0,
    detailedContent:
      "Chúng tôi đang tìm kiếm Senior Full-stack Developer để tham gia đội ngũ phát triển sản phẩm công nghệ hàng đầu. Đây là cơ hội tuyệt vời để làm việc trong môi trường năng động và phát triển sự nghiệp.",
  },
  {
    id: "APPPOST4",
    title:
      'Thông báo: Hội thảo "Chuyển đổi số trong doanh nghiệp" sẽ được tổ chức vào ngày 15/02/2026. Tất cả hội viên được miễn phí tham dự. Đăng ký ngay để nhận ưu đãi đặc biệt!',
    company: "Hội Doanh Nghiệp Việt Nam",
    category: "project",
    status: "pending",
    createdDate: "01/03/2026",
    lastEdited: "01/03/2026",
    content:
      'Thông báo: Hội thảo "Chuyển đổi số trong doanh nghiệp" sẽ được tổ chức vào ngày 15/02/2026. Tất cả hội viên được miễn phí tham dự. Đăng ký ngay để nhận ưu đãi đặc biệt!',
    editCount: 0,
    detailedContent:
      'Thông báo: Hội thảo "Chuyển đổi số trong doanh nghiệp" sẽ được tổ chức vào ngày 15/02/2026. Tất cả hội viên được miễn phí tham dự. Đăng ký ngay để nhận ưu đãi đặc biệt!\n\nTHÔNG TIN DỰ ÁN\n- Hạng mục: Hội thảo chuyển đổi số\n- Lĩnh vực: Sự kiện\n- Địa điểm: Trung tâm Hội nghị Quốc gia, Số 12 Đường Lê Hồng Phong, Phường Điện Biên, Quận Ba Đình, Hà Nội\n- Ngân sách: 500 triệu\n- Hạn đăng ký: 15/02/2026\n- Trạng thái: Đang mở\n- Số hồ sơ quan tâm: 250',
  },
  {
    id: "APPPOST5",
    title:
      "Công ty Xây Dựng Hoàng Long đang tìm kiếm Kỹ sư Xây dựng có kinh nghiệm để tham gia các dự án lớn tại TP. Hồ Chí Minh. Môi trường làm việc chuyên nghiệp với nhiều cơ hội phát triển.",
    company: "Công ty Xây Dựng Hoàng Long",
    category: "news",
    status: "approved",
    createdDate: "02/03/2026",
    lastEdited: "02/03/2026",
    content:
      "Công ty Xây Dựng Hoàng Long đang tìm kiếm Kỹ sư Xây dựng có kinh nghiệm để tham gia các dự án lớn tại TP. Hồ Chí Minh. Môi trường làm việc chuyên nghiệp với nhiều cơ hội phát triển.",
    editCount: 0,
    detailedContent:
      "Công ty Xây Dựng Hoàng Long đang tìm kiếm Kỹ sư Xây dựng có kinh nghiệm để tham gia các dự án lớn tại TP. Hồ Chí Minh. Môi trường làm việc chuyên nghiệp với nhiều cơ hội phát triển.",
  },
  {
    id: "APPPOST6",
    title:
      "Chúng tôi cung cấp giải pháp logistics toàn diện cho doanh nghiệp. Mạng lưới vận chuyển rộng khắp cả nước với chi phí cạnh tranh nhất. Ưu đãi 20% cho hội viên mới! 🚚📦",
    company: "Công ty Logistics GHI",
    category: "project",
    status: "approved",
    createdDate: "02/03/2026",
    lastEdited: "02/03/2026",
    content:
      "Chúng tôi cung cấp giải pháp logistics toàn diện cho doanh nghiệp. Mạng lưới vận chuyển rộng khắp cả nước với chi phí cạnh tranh nhất. Ưu đãi 20% cho hội viên mới! 🚚📦",
    editCount: 0,
    detailedContent:
      "Chúng tôi cung cấp giải pháp logistics toàn diện cho doanh nghiệp. Mạng lưới vận chuyển rộng khắp cả nước với chi phí cạnh tranh nhất. Ưu đãi 20% cho hội viên mới! 🚚📦\n\nƯU ĐÃI: 🚚 Ưu đãi vận chuyển cho hội viên\nGiảm 20% phí vận chuyển cho hội viên mới + Miễn phí giao hàng đơn đầu tiên\nMức ưu đãi: 20% + Miễn phí lần đầu\nHiệu lực đến: 15/03/2026\n\nTHÔNG TIN DỰ ÁN\n- Hạng mục: Giải pháp vận chuyển logistics\n- Lĩnh vực: Logistics\n- Địa điểm: Tầng 7, Tòa nhà Viettel, Số 285 Đường Cách Mạng Tháng 8, Phường 12, Quận 10, TP. Hồ Chí Minh\n- Ngân sách: 10 tỷ\n- Hạn đăng ký: 01/03/2026\n- Trạng thái: Đang mở\n- Số hồ sơ quan tâm: 15",
  },
  {
    id: "APPPOST7",
    title:
      "Dịch vụ tư vấn pháp lý chuyên nghiệp cho doanh nghiệp: Thành lập công ty, hợp đồng, tranh chấp, bảo hộ thương hiệu... Đội ngũ luật sư giàu kinh nghiệm. Tư vấn miễn phí lần đầu!",
    company: "Công ty Tư vấn Pháp lý DEF",
    category: "project",
    status: "approved",
    createdDate: "02/03/2026",
    lastEdited: "02/03/2026",
    content:
      "Dịch vụ tư vấn pháp lý chuyên nghiệp cho doanh nghiệp: Thành lập công ty, hợp đồng, tranh chấp, bảo hộ thương hiệu... Đội ngũ luật sư giàu kinh nghiệm. Tư vấn miễn phí lần đầu!",
    editCount: 0,
    detailedContent:
      "Dịch vụ tư vấn pháp lý chuyên nghiệp cho doanh nghiệp: Thành lập công ty, hợp đồng, tranh chấp, bảo hộ thương hiệu... Đội ngũ luật sư giàu kinh nghiệm. Tư vấn miễn phí lần đầu!\n\nƯU ĐÃI: ⚖️ Ưu đãi tư vấn pháp lý\nMiễn phí buổi tư vấn đầu tiên + Giảm 30% gói dịch vụ doanh nghiệp\nMức ưu đãi: Miễn phí tư vấn + 30%\nHiệu lực đến: 28/02/2026\n\nTHÔNG TIN DỰ ÁN\n- Hạng mục: Dịch vụ tư vấn pháp lý\n- Lĩnh vực: Pháp lý\n- Địa điểm: Tầng 5, Tòa nhà Keangnam Landmark, Phạm Hùng, Phường Mễ Trì, Quận Nam Từ Liêm, Hà Nội\n- Ngân sách: 5 tỷ\n- Hạn đăng ký: 25/02/2026\n- Trạng thái: Đang mở\n- Số hồ sơ quan tâm: 22",
  },
  {
    id: "APPPOST8",
    title:
      'Mở bán đợt 1 dự án "Eco Park Central" - khu đô thị xanh hiện đại tại TP.HCM. Giá từ 35 triệu/m². Chiết khấu 10% cho khách hàng mua sớm. Đặt chỗ ngay hôm nay!',
    company: "Tập đoàn Bất động sản GHI",
    category: "project",
    status: "pending",
    createdDate: "01/03/2026",
    lastEdited: "01/03/2026",
    content:
      'Mở bán đợt 1 dự án "Eco Park Central" - khu đô thị xanh hiện đại tại TP.HCM. Giá từ 35 triệu/m². Chiết khấu 10% cho khách hàng mua sớm. Đặt chỗ ngay hôm nay!',
    editCount: 0,
    detailedContent:
      'Mở bán đợt 1 dự án "Eco Park Central" - khu đô thị xanh hiện đại tại TP.HCM. Giá từ 35 triệu/m². Chiết khấu 10% cho khách hàng mua sớm. Đặt chỗ ngay hôm nay!\n\nƯU ĐÃI: 🏠 Ưu đãi đặc biệt cho hội viên\nGiảm giá 10% cho hội viên + Tặng gói nội thất cao cấp trị giá 200 triệu\nMức ưu đãi: 10% + Quà tặng 200tr\nHiệu lực đến: 30/06/2026\n\nTHÔNG TIN DỰ ÁN\n- Hạng mục: Eco Park Central\n- Lĩnh vực: Bất động sản\n- Địa điểm: Khu đô thị Sala, Đường Mai Chí Thọ, Phường An Lợi Đông, Thành phố Thủ Đức, TP. Hồ Chí Minh\n- Ngân sách: 2000 tỷ\n- Hạn đăng ký: 30/06/2026\n- Trạng thái: Đang mở\n- Số hồ sơ quan tâm: 180',
  },
  {
    id: "APPPOST9",
    title:
      "Dịch vụ Marketing tổng thể: SEO, Facebook Ads, Google Ads, Content Marketing. Cam kết tăng doanh số 200% sau 6 tháng. Liên hệ để nhận báo giá và chiến lược miễn phí! 📈💼",
    company: "Công ty Marketing JKL",
    category: "project",
    status: "approved",
    createdDate: "28/02/2026",
    lastEdited: "28/02/2026",
    content:
      "Dịch vụ Marketing tổng thể: SEO, Facebook Ads, Google Ads, Content Marketing. Cam kết tăng doanh số 200% sau 6 tháng. Liên hệ để nhận báo giá và chiến lược miễn phí! 📈💼",
    editCount: 0,
    detailedContent:
      "Dịch vụ Marketing tổng thể: SEO, Facebook Ads, Google Ads, Content Marketing. Cam kết tăng doanh số 200% sau 6 tháng. Liên hệ để nhận báo giá và chiến lược miễn phí! 📈💼\n\nƯU ĐÃI: 📈 Khuyến mãi đặc biệt\nMua 1 gói Facebook Ads tặng 1 gói Google Ads cùng giá trị\nMức ưu đãi: Mua 1 tặng 1\nHiệu lực đến: 28/02/2026\n\nTHÔNG TIN DỰ ÁN\n- Hạng mục: Dịch vụ Marketing tổng thể\n- Lĩnh vực: Marketing\n- Địa điểm: Tầng 12, Tòa nhà Vincom Center, Số 72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh\n- Ngân sách: 8 tỷ\n- Hạn đăng ký: 28/02/2026\n- Trạng thái: Đang mở\n- Số hồ sơ quan tâm: 45",
  },
  {
    id: "APPPOST10",
    title:
      "Chúc mừng 20 doanh nghiệp đã đạt doanh thu 100 tỷ trong năm 2025! Đây là minh chứng cho sức mạnh của cộng đồng hội viên. Hãy cùng nhau phát triển và thành công hơn nữa trong năm 2026! 🎉🏆",
    company: "Hội Doanh Nghiệp Việt Nam",
    category: "project",
    status: "approved",
    createdDate: "27/02/2026",
    lastEdited: "27/02/2026",
    content:
      "Chúc mừng 20 doanh nghiệp đã đạt doanh thu 100 tỷ trong năm 2025! Đây là minh chứng cho sức mạnh của cộng đồng hội viên. Hãy cùng nhau phát triển và thành công hơn nữa trong năm 2026! 🎉🏆",
    editCount: 0,
    detailedContent:
      "Chúc mừng 20 doanh nghiệp đã đạt doanh thu 100 tỷ trong năm 2025! Đây là minh chứng cho sức mạnh của cộng đồng hội viên. Hãy cùng nhau phát triển và thành công hơn nữa trong năm 2026! 🎉🏆\n\nTHÔNG TIN DỰ ÁN\n- Hạng mục: Chương trình vinh danh doanh nghiệp\n- Lĩnh vực: Sự kiện\n- Địa điểm: Khách sạn JW Marriott, Số 8 Đỗ Đức Dục, Phường Mễ Trì, Quận Nam Từ Liêm, Hà Nội\n- Ngân sách: 3 tỷ\n- Hạn đăng ký: 10/02/2026\n- Trạng thái: Đang mở\n- Số hồ sơ quan tâm: 20",
  },
  {
    id: "APPPOST2001",
    title:
      "Xin chào! Tôi đang tìm kiếm cơ hội làm việc tại vị trí Kỹ sư Xây dựng. Có 5 năm kinh nghiệm trong lĩnh vực xây dựng dân dụng và công nghiệp. Mong được hợp tác!",
    company: "Trần Minh Quân",
    category: "recruitment",
    status: "approved",
    createdDate: "02/03/2026",
    lastEdited: "02/03/2026",
    content:
      "Xin chào! Tôi đang tìm kiếm cơ hội làm việc tại vị trí Kỹ sư Xây dựng. Có 5 năm kinh nghiệm trong lĩnh vực xây dựng dân dụng và công nghiệp. Mong được hợp tác!",
    editCount: 0,
    detailedContent:
      "Xin chào! Tôi đang tìm kiếm cơ hội làm việc tại vị trí Kỹ sư Xây dựng. Có 5 năm kinh nghiệm trong lĩnh vực xây dựng dân dụng và công nghiệp. Mong được hợp tác!\n\nTHÔNG TIN ỨNG VIÊN\n- Họ tên: Trần Minh Quân\n- Vị trí: Kỹ sư Xây dựng\n- Kinh nghiệm: 5 năm\n- Kỹ năng: AutoCAD, Revit, Quản lý dự án, Giám sát thi công\n- Học vấn: Đại học Xây dựng Hà Nội - Kỹ sư Xây dựng Dân dụng\n- Mức lương mong muốn: 18-25 triệu VNĐ/tháng",
  },
  {
    id: "APPPOST2002",
    title:
      "Tôi là Full-stack Developer với 3 năm kinh nghiệm làm việc với React, Node.js, và MongoDB. Đang tìm kiếm môi trường làm việc năng động và cơ hội phát triển. Có thể làm việc remote hoặc tại Hà Nội.",
    company: "Nguyễn Thu Hà",
    category: "recruitment",
    status: "approved",
    createdDate: "02/03/2026",
    lastEdited: "02/03/2026",
    content:
      "Tôi là Full-stack Developer với 3 năm kinh nghiệm làm việc với React, Node.js, và MongoDB. Đang tìm kiếm môi trường làm việc năng động và cơ hội phát triển. Có thể làm việc remote hoặc tại Hà Nội.",
    editCount: 0,
    detailedContent:
      "Tôi là Full-stack Developer với 3 năm kinh nghiệm làm việc với React, Node.js, và MongoDB. Đang tìm kiếm môi trường làm việc năng động và cơ hội phát triển. Có thể làm việc remote hoặc tại Hà Nội.\n\nTHÔNG TIN ỨNG VIÊN\n- Họ tên: Nguyễn Thu Hà\n- Vị trí: Full-stack Developer\n- Kinh nghiệm: 3 năm\n- Kỹ năng: React, Node.js, TypeScript, MongoDB, PostgreSQL, Docker\n- Học vấn: Đại học Bách Khoa Hà Nội - Công nghệ Thông tin\n- Mức lương mong muốn: 20-30 triệu VNĐ/tháng",
  },
  {
    id: "APPPOST2003",
    title:
      "Marketing Manager với 7 năm kinh nghiệm trong Digital Marketing, SEO/SEM, và Content Strategy. Đã quản lý ngân sách marketing hơn 10 tỷ VNĐ/năm. Tìm kiếm vị trí Marketing Director hoặc tương đương.",
    company: "Lê Hoàng Nam",
    category: "recruitment",
    status: "approved",
    createdDate: "02/03/2026",
    lastEdited: "02/03/2026",
    content:
      "Marketing Manager với 7 năm kinh nghiệm trong Digital Marketing, SEO/SEM, và Content Strategy. Đã quản lý ngân sách marketing hơn 10 tỷ VNĐ/năm. Tìm kiếm vị trí Marketing Director hoặc tương đương.",
    editCount: 0,
    detailedContent:
      "Marketing Manager với 7 năm kinh nghiệm trong Digital Marketing, SEO/SEM, và Content Strategy. Đã quản lý ngân sách marketing hơn 10 tỷ VNĐ/năm. Tìm kiếm vị trí Marketing Director hoặc tương đương.\n\nTHÔNG TIN ỨNG VIÊN\n- Họ tên: Lê Hoàng Nam\n- Vị trí: Marketing Director / Manager\n- Kinh nghiệm: 7 năm\n- Kỹ năng: Digital Marketing, SEO/SEM, Google Ads, Facebook Ads, Content Strategy, Team Management\n- Học vấn: Đại học Ngoại Thương - Marketing\n- Mức lương mong muốn: 35-50 triệu VNĐ/tháng",
  },
  {
    id: "APPPOST2004",
    title:
      "Kế toán trưởng với 10 năm kinh nghiệm trong lĩnh vực tài chính - kế toán. Có chứng chỉ CPA và am hiểu luật thuế. Mong muốn làm việc tại doanh nghiệp lớn hoặc tập đoàn.",
    company: "Phạm Thị Lan",
    category: "recruitment",
    status: "approved",
    createdDate: "02/03/2026",
    lastEdited: "02/03/2026",
    content:
      "Kế toán trưởng với 10 năm kinh nghiệm trong lĩnh vực tài chính - kế toán. Có chứng chỉ CPA và am hiểu luật thuế. Mong muốn làm việc tại doanh nghiệp lớn hoặc tập đoàn.",
    editCount: 0,
    detailedContent:
      "Kế toán trưởng với 10 năm kinh nghiệm trong lĩnh vực tài chính - kế toán. Có chứng chỉ CPA và am hiểu luật thuế. Mong muốn làm việc tại doanh nghiệp lớn hoặc tập đoàn.\n\nTHÔNG TIN ỨNG VIÊN\n- Họ tên: Phạm Thị Lan\n- Vị trí: Kế toán trưởng / Chief Accountant\n- Kinh nghiệm: 10 năm\n- Kỹ năng: Kế toán tổng hợp, Báo cáo tài chính, Thuế, Kiểm toán, ERP, Quản lý đội nhóm\n- Học vấn: Đại học Kinh tế Quốc dân - Kế toán - Kiểm toán (CPA)\n- Mức lương mong muốn: 25-35 triệu VNĐ/tháng",
  },
];
