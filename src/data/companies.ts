export type EcosystemCompany = {
  name: string;
  slug: string;
  field: string;
  summary: string;
  logo: string;
};

const company = (name: string, slug: string, field: string, summary: string, logo = "/images/logo-mark.png"): EcosystemCompany => ({ name, slug, field, summary, logo });

export const ECOSYSTEM_COMPANIES: EcosystemCompany[] = [
  company("Matrix Holding", "matrix-holding", "Holding Company", "Công ty trung tâm quản trị, kết nối và phát triển toàn bộ hệ sinh thái Matrix Holding."),
  company("Matrix Network", "matrix-network", "Dịch vụ doanh nghiệp", "Hệ sinh thái dịch vụ toàn diện hỗ trợ doanh nghiệp chuẩn hóa và tăng trưởng.", "/images/matrix-network.png"),
  company("Matrix Connect", "matrix-connect", "Kết nối doanh nghiệp", "Cộng đồng kết nối doanh nghiệp, đối tác và các nguồn lực phát triển.", "/images/matrix-connect.png"),
  company("Matrix Ventures", "matrix-ventures", "Đầu tư và đổi mới", "Kết nối nguồn vốn, nhà đầu tư và những dự án có tiềm năng phát triển.", "/images/matrix-ventures.png"),
  company("Matrix Strategy", "matrix-strategy", "Chiến lược", "Tư vấn chiến lược, mô hình kinh doanh và định hướng tăng trưởng dài hạn."),
  company("Matrix Research", "matrix-research", "Nghiên cứu", "Nghiên cứu thị trường, dữ liệu và xu hướng phục vụ quyết định kinh doanh."),
  company("Matrix Legal", "matrix-legal", "Pháp lý", "Giải pháp pháp lý và kiểm soát tuân thủ dành cho doanh nghiệp."),
  company("Matrix Finance", "matrix-finance", "Tài chính", "Tư vấn tài chính, kế hoạch nguồn vốn và quản trị hiệu quả tài chính."),
  company("Matrix Accounting", "matrix-accounting", "Kế toán", "Dịch vụ kế toán, báo cáo và chuẩn hóa dữ liệu tài chính doanh nghiệp."),
  company("Matrix Admin", "matrix-admin", "Hành chính", "Giải pháp hành chính và tổ chức hệ thống vận hành nội bộ."),
  company("Matrix Operations", "matrix-operations", "Vận hành", "Thiết kế, triển khai và tối ưu quy trình vận hành doanh nghiệp."),
  company("Matrix Talent", "matrix-talent", "Nhân tài", "Tìm kiếm, kết nối và phát triển nguồn nhân lực chất lượng cao."),
  company("Matrix Human", "matrix-human", "Phát triển con người", "Giải pháp nhân sự và phát triển năng lực đội ngũ bền vững."),
  company("Matrix Sales", "matrix-sales", "Kinh doanh", "Xây dựng lực lượng bán hàng và hệ thống tăng trưởng doanh thu."),
  company("Matrix Commerce", "matrix-commerce", "Thương mại", "Phát triển hoạt động thương mại và các kênh phân phối hiệu quả."),
  company("Matrix Marketing", "matrix-marketing", "Marketing", "Chiến lược marketing tích hợp giúp thương hiệu tiếp cận đúng khách hàng."),
  company("Matrix Media", "matrix-media", "Truyền thông", "Giải pháp truyền thông đa nền tảng cho doanh nghiệp và thương hiệu."),
  company("Matrix Production", "matrix-production", "Sản xuất nội dung", "Sản xuất nội dung hình ảnh, video và các sản phẩm truyền thông."),
  company("Matrix Design", "matrix-design", "Thiết kế", "Thiết kế nhận diện và trải nghiệm thương hiệu chuyên nghiệp."),
  company("Matrix Advertising", "matrix-advertising", "Quảng cáo", "Triển khai quảng cáo đa kênh hướng đến hiệu quả kinh doanh."),
  company("Matrix News", "matrix-news", "Tin tức", "Cập nhật thông tin, thị trường và những câu chuyện trong hệ sinh thái."),
  company("Matrix Care", "matrix-care", "Chăm sóc khách hàng", "Giải pháp chăm sóc và nâng cao trải nghiệm khách hàng."),
  company("Matrix Pr", "matrix-pr", "Quan hệ công chúng", "Xây dựng uy tín và quản trị quan hệ công chúng cho thương hiệu."),
  company("Matrix Event", "matrix-event", "Sự kiện", "Tổ chức sự kiện doanh nghiệp, cộng đồng và xúc tiến hợp tác."),
  company("Matrix Live", "matrix-live", "Truyền thông trực tiếp", "Sản xuất chương trình và trải nghiệm tương tác trực tiếp."),
  company("Matrix Software", "matrix-software", "Công nghệ", "Phát triển phần mềm và giải pháp chuyển đổi số cho doanh nghiệp."),
  company("Matrix Academy", "matrix-academy", "Đào tạo", "Đào tạo kỹ năng, quản trị và năng lực thực thi cho đội ngũ."),
];

export const canonicalCompanyName = (name: string) => {
  if (name === "Matrix Community") return "Matrix Connect";
  if (name === "Matrix Capital") return "Matrix Ventures";
  return name;
};

export const findCompanyBySlug = (slug?: string) =>
  ECOSYSTEM_COMPANIES.find((item) => item.slug === slug);
