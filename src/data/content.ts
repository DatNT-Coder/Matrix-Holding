import {
  Search,
  Layers,
  MapPin,
  Boxes,
  ShieldCheck,
  Handshake,
  Network,
  Eye,
  BrainCircuit,
  TrendingUp,
  FileSearch,
  UserCog,
  UserCheck,
  Server,
  ScrollText,
  Award,
  Zap,
  Sliders,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export const NAV_LINKS: { label: string; to: string }[] = [
  { label: "Trang chủ", to: "/" },
  { label: "Giới thiệu", to: "/gioi-thieu" },
  { label: "Đăng yêu cầu", to: "/#mang-luoi" },
  { label: "Sàn kết nối", to: "/#tinh-nang" },
  { label: "Tuyển dụng", to: "/#quy-trinh" },
  { label: "Tin tức", to: "/#faq" },
  { label: "Liên hệ", to: "/#lien-he" },
];

export const IMG = {
  heroGlobe: "/hero-globe.png",
  spaceBg: "/space-bg.png",
  aboutBuilding:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  aboutMeeting:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  process:
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80",
  whyPresentation:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
  whyTeam:
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
  faq: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
  cta: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=80",
  authSide:
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80",
};

export interface Highlight {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const HIGHLIGHTS: Highlight[] = [
  {
    icon: Award,
    title: "Chuyên Nghiệp",
    desc: "Xây dựng mạng lưới đối tác dựa trên nền tảng dữ liệu xác thực và quy trình thẩm định nghiêm ngặt.",
  },
  {
    icon: Zap,
    title: "Hiệu Quả",
    desc: "Tối ưu hóa thời gian tìm kiếm, giúp doanh nghiệp khớp nối nhu cầu và chốt giao thương nhanh chóng.",
  },
  {
    icon: Sliders,
    title: "Linh Hoạt",
    desc: "Cung cấp bộ công cụ tra cứu đa dạng, thích ứng hoàn hảo với mọi quy mô và lĩnh vực kinh doanh.",
  },
];

export interface Feature {
  icon: LucideIcon;
  title: string;
  points: string[];
}

export const FEATURES: Feature[] = [
  {
    icon: Search,
    title: "Tra cứu định danh",
    points: [
      "Tra cứu trên toàn quốc",
      "Thông tin pháp lý chuẩn xác 100%",
      "Tìm kiếm nhanh qua tên hoặc MST",
      "Xác thực tổ chức, người đại diện",
    ],
  },
  {
    icon: Layers,
    title: "Phân loại ngành nghề",
    points: [
      "Tiếp cận chính xác ngành thị trường",
      "Hệ thống phân loại chuẩn hiện đại",
      "Giảm chi phí tìm kiếm khách hàng",
      "Bao phủ toàn bộ lĩnh vực kinh doanh",
    ],
  },
  {
    icon: MapPin,
    title: "Bản đồ khu vực",
    points: [
      "Định vị đối tác theo vị trí địa lý",
      "Hiển thị đối tác trên bản đồ số",
      "Quản lý khu vực kinh doanh hiệu quả",
      "Phân tích mật độ thị trường tối ưu",
    ],
  },
  {
    icon: Boxes,
    title: "Danh mục sản phẩm",
    points: [
      "Trưng bày sản phẩm không giới hạn",
      "Hệ thống danh mục cập nhật liên tục",
      "Đáp ứng đăng bán và lưu hành",
      "Gian hàng chuyên nghiệp, hiệu quả",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Kiểm duyệt uy tín",
    points: [
      "Loại bỏ rủi ro doanh nghiệp ảo",
      "Chỉ số uy tín rõ ràng, minh bạch",
      "Bảo chứng năng lực hợp tác thực tế",
      "Nâng cao quản trị doanh nghiệp",
    ],
  },
  {
    icon: Handshake,
    title: "Khớp nối nhu cầu",
    points: [
      "Tăng tốc độ chốt hợp đồng",
      "Tiếp cận nguồn đối tác có nhu cầu",
      "Đưa nhu cầu đến đúng dịch vụ",
      "Thúc đẩy doanh số doanh nghiệp",
    ],
  },
];

export interface Stat {
  value: string;
  label: string;
}

export const MILESTONE_STATS: Stat[] = [
  { value: "200+", label: "Doanh nghiệp thành viên" },
  { value: "100+", label: "Dự án thành công" },
  { value: "98%", label: "Khách hàng hài lòng" },
  { value: "63", label: "Tỉnh thành kết nối" },
];

export interface Pricing {
  icon: LucideIcon;
  name: string;
  desc: string;
  features: string[];
  highlight?: boolean;
  cta: string;
}

export const PRICING: Pricing[] = [
  {
    icon: Network,
    name: "Kết Nối B2B",
    desc: "Xây dựng mạng lưới đối tác chất lượng toàn quốc.",
    features: [
      "100+ cơ sở dữ liệu xác minh",
      "Xác minh pháp lý 100%",
      "Khớp nối nhu cầu tự động",
      "Miễn phí tham gia",
    ],
    cta: "Kết Nối Ngay",
  },
  {
    icon: Award,
    name: "Quảng Cáo Top",
    desc: "Đưa thương hiệu lên vị trí \u201cnóng\u201d thu hút mọi ánh nhìn.",
    features: [
      "Chiếm lĩnh vị trí Top #1",
      "Tăng 300% lượt tiếp cận",
      "Miễn phí xác thực 6 tháng",
      "Nhắm đúng khách mục tiêu",
    ],
    highlight: true,
    cta: "Đăng Ký Ngay",
  },
  {
    icon: Briefcase,
    name: "Website Pro",
    desc: "Hàng tấn tính năng chuyên nghiệp trên không gian của bạn.",
    features: [
      "Giao diện chuẩn SEO Google",
      "Đội ngũ hỗ trợ trong suốt",
      "Tùy biến theo ngành nghề",
      "Ưu đãi 50% trong năm đầu",
    ],
    cta: "Nhận Ưu Đãi",
  },
];

export interface Reason {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const REASONS: Reason[] = [
  {
    icon: Network,
    title: "Hệ Sinh Thái Đa Ngành",
    desc: "Kết nối hơn 100.000 doanh nghiệp thuộc mọi lĩnh vực, mở rộng cơ hội hợp tác và giao thương không giới hạn.",
  },
  {
    icon: Eye,
    title: "Minh Bạch & Tin Cậy",
    desc: "100% hồ sơ đối tác được kiểm duyệt pháp lý, tạo môi trường giao thương an toàn và loại bỏ mọi rủi ro tiềm ẩn.",
  },
  {
    icon: BrainCircuit,
    title: "Công Nghệ Khớp Nối AI",
    desc: "Hệ thống gợi ý thông minh phân tích và kết nối đối tác phù hợp, giúp tiết kiệm hơn 70% thời gian tìm kiếm.",
  },
  {
    icon: TrendingUp,
    title: "Giải Pháp Tăng Trưởng",
    desc: "Không chỉ kết nối, chúng tôi cung cấp công cụ quảng bá, tiếp thị và bứt phá doanh thu bền vững.",
  },
];

export interface Security {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const SECURITY: Security[] = [
  {
    icon: FileSearch,
    title: "Chỉ thu thập dữ liệu cần thiết",
    desc: "Chúng tôi chỉ thu thập thông tin thiết thực nhất nhằm mục đích kết nối doanh nghiệp Việt, không thu thập dữ liệu nhạy cảm khi chưa có sự đồng ý.",
  },
  {
    icon: UserCog,
    title: "Quyền kiểm soát dữ liệu cá nhân",
    desc: "Doanh nghiệp toàn quyền chỉnh sửa, xóa hoặc yêu cầu ẩn dữ liệu của mình theo đúng quy định pháp luật hiện hành.",
  },
  {
    icon: UserCheck,
    title: "Bảo mật danh tính đại diện",
    desc: "Thông tin người đại diện pháp lý được bảo mật, chỉ hiển thị công khai khi có sự đồng thuận của doanh nghiệp.",
  },
  {
    icon: Server,
    title: "Bảo mật kỹ thuật theo chuẩn quốc tế",
    desc: "Hệ thống vận hành trên nền tảng bảo mật đạt chuẩn quốc tế, mã hóa dữ liệu đầu cuối và giám sát an ninh 24/7.",
  },
  {
    icon: ScrollText,
    title: "Tuân thủ Nghị định 356/2025/NĐ-CP",
    desc: "Quy trình xử lý dữ liệu tuân thủ nghiêm ngặt các quy định về bảo vệ dữ liệu cá nhân theo Nghị định 356/2025/NĐ-CP.",
  },
];

export interface ProcessStep {
  title: string;
  desc: string;
}

export const PROCESS: ProcessStep[] = [
  {
    title: "Đăng Ký Tài Khoản",
    desc: "Khởi tạo tài khoản doanh nghiệp chỉ với vài thao tác đơn giản và hoàn toàn miễn phí.",
  },
  {
    title: "Xác Thực Doanh Nghiệp",
    desc: "Kiểm duyệt hồ sơ pháp lý để nâng cao độ uy tín và mở khóa toàn bộ tính năng.",
  },
  {
    title: "Cập Nhật Hồ Sơ Doanh Nghiệp",
    desc: "Hoàn thiện hồ sơ, danh mục sản phẩm và dịch vụ để thu hút đối tác tiềm năng.",
  },
  {
    title: "Bắt Đầu Kết Nối & Phát Triển",
    desc: "Khai thác mạng lưới đối tác rộng lớn, mở rộng thị phần và bứt phá doanh thu bền vững.",
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "Đăng ký hồ sơ doanh nghiệp có mất phí không?",
    answer:
      "Việc đăng ký và tạo hồ sơ doanh nghiệp cơ bản trên Matrix Community là hoàn toàn miễn phí. Bạn chỉ cần trả phí khi nâng cấp lên các gói dịch vụ cao cấp như Quảng Cáo Top hoặc Website Pro.",
  },
  {
    question: "Thời gian xét duyệt hồ sơ xác thực mất bao lâu?",
    answer:
      "Thông thường hồ sơ xác thực doanh nghiệp được xét duyệt trong vòng 24 - 48 giờ làm việc kể từ khi bạn cung cấp đầy đủ giấy tờ hợp lệ.",
  },
  {
    question: "Tôi cần chuẩn bị giấy tờ gì để xác thực?",
    answer:
      "Bạn cần chuẩn bị Giấy chứng nhận đăng ký doanh nghiệp (hoặc mã số thuế) và giấy tờ tùy thân của người đại diện pháp luật để hoàn tất quá trình xác thực.",
  },
  {
    question: "Có xuất hóa đơn VAT khi thanh toán gói dịch vụ không?",
    answer:
      "Có. Chúng tôi xuất hóa đơn VAT đầy đủ cho tất cả các giao dịch thanh toán gói dịch vụ, đảm bảo minh bạch cho công tác kế toán của doanh nghiệp.",
  },
  {
    question: "Thông tin cá nhân người đại diện có bị công khai không?",
    answer:
      "Không. Thông tin cá nhân của người đại diện được bảo mật tuyệt đối và chỉ hiển thị công khai khi có sự đồng thuận rõ ràng từ phía doanh nghiệp.",
  },
];

export const FOOTER_LINKS = {
  services: [
    "Kết Nối Doanh Nghiệp",
    "Xác Minh Doanh Nghiệp",
    "Đăng Ký Gói Tài Trợ",
    "Đăng Ký Miễn Phí",
  ],
  about: [
    { label: "Giới Thiệu", to: "/gioi-thieu" },
    { label: "Hướng Dẫn Sử Dụng", to: "/#quy-trinh" },
    { label: "Chính Sách Bảo Mật", to: "/#bao-mat" },
    { label: "Điều Khoản Sử Dụng", to: "/#faq" },
  ],
};

export const CONTACT = {
  email: "matrixCommunity@gmail.com",
  phone: "+84 378668540",
  address: "364 Cộng Hòa, P. Tân Bình, TP. HCM",
};
