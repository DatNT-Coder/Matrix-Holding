import {
  Search,
  Layers,
  MapPin,
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
  Globe2,
  Users,
  CircleDollarSign,
  Heart,
  type LucideIcon,
} from "lucide-react";

export const NAV_LINKS: { label: string; to: string }[] = [
  { label: "Trang chủ", to: "/" },
  { label: "Giới thiệu", to: "/gioi-thieu" },
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
    icon: ShieldCheck,
    title: "Minh bạch",
    desc: "Mọi thông tin, quy trình, quyền lợi và trách nhiệm đều được công khai rõ ràng trong mọi hoạt động quản lý, hợp tác và đầu tư.",
  },
  {
    icon: Handshake,
    title: "Trách Nhiệm",
    desc: "Mọi quyết định đều được thực hiện nghiêm túc theo cam kết và bảo đảm quyền lợi của khách hàng, đối tác và cộng đồng.",
  },
  {
    icon: Layers,
    title: "Nhất Quán",
    desc: "Mọi tiêu chuẩn, nguyên tắc và chất lượng công việc đều được duy trì và đồng bộ trên toàn hệ thống.",
  },
];

export interface Feature {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  points: string[];
}

export const FEATURES: Feature[] = [
  {
    icon: Search,
    title: "Matrix Network",
    subtitle: "Cung cấp mọi nguồn lực thiết yếu để doanh nghiệp vận hành hiệu quả.",
    points: [
      "Dịch vụ toàn diện",
      "Giải pháp đồng bộ",
      "Phương án linh hoạt",
      "Vận hành tối ưu",
    ],
  },
  {
    icon: Layers,
    title: "Matrix Holding",
    subtitle: "Giúp doanh nhân và doanh nghiệp mở rộng cơ hội hợp tác, chia sẻ nguồn lực và cùng nhau phát triển.",
    points: [
      "Cộng đồng gắn kết",
      "Mạng lưới rộng mở",
      "Nguồn lực cộng hưởng",
      "Cơ hội đa dạng",
    ],
  },
  {
    icon: MapPin,
    title: "Matrix Capital",
    subtitle: "Thực hiện thẩm định, tư vấn và đầu tư vốn nhằm đồng hành cùng các dự án tiềm năng phát triển bền vững.",
    points: [
      "Nguồn vốn phù hợp",
      "Thẩm định chuyên sâu",
      "Tư vấn phát triển",
      "Đầu tư hiệu quả",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Matrix Cares",
    subtitle:
      "Kết nối nguồn lực để triển khai các dự án thiện nguyện, quyên góp và hỗ trợ những hoàn cảnh khó khăn, cần giúp đỡ.",
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
    icon: Globe2,
    name: "Matrix Network",
    desc: "Hệ sinh thái dịch vụ toàn diện dành cho doanh nghiệp.",
    features: [
      "Dịch vụ toàn diện",
      "Giải pháp đồng bộ",
      "Phương án linh hoạt",
      "Vận hành tối ưu",
    ],
    cta: "Khám Phá Ngay",
  },
  {
    icon: Users,
    name: "Matrix Community",
    desc: "Hệ sinh thái cộng đồng kết nối doanh nghiệp.",
    features: [
      "Cộng đồng gắn kết",
      "Mạng lưới rộng mở",
      "Nguồn lực cộng hưởng",
      "Cơ hội đa dạng",
    ],
    cta: "Khám Phá Ngay",
  },
  {
    icon: CircleDollarSign,
    name: "Matrix Capital",
    desc: "Hệ sinh thái kết nối nhà đầu tư và startup.",
    features: [
      "Nguồn vốn phù hợp",
      "Thẩm định chuyên sâu",
      "Tư vấn phát triển",
      "Đầu tư hiệu quả",
    ],
    cta: "Khám Phá Ngay",
  },
  {
    icon: Heart,
    name: "Matrix Cares",
    desc: "Hệ sinh thái các chương trình xã hội và hoạt động vì cộng đồng.",
    features: [
      "Cộng đồng gắn kết",
      "Mạng lưới rộng mở",
      "Nguồn lực cộng hưởng",
      "Cơ hội đa dạng",
    ],
    cta: "Khám Phá Ngay",
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
    title: "Hệ sinh thái đa lĩnh vực",
    desc: "Matrix Holding kết nối dịch vụ doanh nghiệp, nguồn vốn đầu tư, cộng đồng kinh doanh và các hoạt động xã hội trong một hệ sinh thái thống nhất.",
  },
  {
    icon: Eye,
    title: "Nguồn lực đồng bộ",
    desc: "Doanh nghiệp có thể tiếp cận nhiều nguồn lực thiết yếu về pháp lý, kế toán, nhân sự, tuyển dụng, truyền thông và công nghệ thông qua hệ thống các đơn vị chuyên môn.",
  },
  {
    icon: BrainCircuit,
    title: "Giải pháp phù hợp",
    desc: "Chúng tôi xác định nhu cầu thực tế của từng doanh nghiệp để kết nối đúng đơn vị, đúng nguồn lực và xây dựng phương án phù hợp với từng giai đoạn vận hành.",
  },
  {
    icon: TrendingUp,
    title: "Đồng hành lâu dài",
    desc: "Matrix Holding không chỉ giải quyết những nhu cầu trước mắt mà còn hướng tới giúp doanh nghiệp xây dựng nền tảng vững chắc, vận hành ổn định và chủ động trước những thay đổi của thị trường.",
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
      "Việc đăng ký và tạo hồ sơ doanh nghiệp cơ bản trên Matrix Holding là hoàn toàn miễn phí. Bạn chỉ cần trả phí khi nâng cấp lên các gói dịch vụ cao cấp như Quảng Cáo Top hoặc Website Pro.",
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
  email: "matrixholding.support@gmail.com",
  phone: "0964 243 026",
  address: "Số 13 - TT6, M4 Khu đô thị Bắc Linh Đàm, Phường Hoàng Liệt, Thành phố Hà Nội, Việt Nam",
};
