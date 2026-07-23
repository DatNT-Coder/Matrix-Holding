import {
  ArrowRight,
  Check,
  X,
  Building2,
  CheckCircle2,
  Heart,
  MapPin,
  BadgeCheck,
  Award,
  TrendingUp,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Figure } from "@/components/ui/Figure";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { REASONS, IMG } from "@/data/content";

interface OrbitStat {
  icon: LucideIcon;
  value: string;
  label: string;
  pos: string;
}

const ORBIT_STATS: OrbitStat[] = [
  { icon: Building2, value: "200+", label: "Doanh nghiệp thành viên", pos: "left-[58%] top-2" },
  { icon: CheckCircle2, value: "100+", label: "Dự án thành công", pos: "right-0 top-[34%]" },
  { icon: MapPin, value: "63", label: "Tỉnh thành kết nối", pos: "right-[10%] bottom-2" },
  { icon: Heart, value: "98%", label: "Khách hàng hài lòng", pos: "left-0 top-[38%]" },
];

interface ServicePlan {
  icon: LucideIcon;
  name: string;
  desc: string;
  action: string;
  highlight?: boolean;
  features: { t: string; ok: boolean }[];
}

const SERVICE_PLANS: ServicePlan[] = [
  {
    icon: BadgeCheck,
    name: "Gói Khởi Tạo",
    desc: "Phù hợp để trải nghiệm các tính năng cơ bản khi bắt đầu tham gia.",
    action: "Miễn phí trọn đời",
    features: [
      { t: "Tra cứu toàn quốc", ok: true },
      { t: "Bộ lọc tìm kiếm cơ bản", ok: true },
      { t: "Xem thông tin cơ bản", ok: true },
      { t: "Xác thực hồ sơ", ok: false },
      { t: "Tương tác đối tác", ok: false },
    ],
  },
  {
    icon: Award,
    name: "Gói Kết Nối",
    desc: "Tăng độ tin cậy và mở rộng khả năng kết nối đối tác thời gian thực.",
    action: "Đăng nhập để xem",
    highlight: true,
    features: [
      { t: "Toàn bộ Gói Khởi Tạo", ok: true },
      { t: "Bộ lọc tìm kiếm nâng cao", ok: true },
      { t: "Hiển thị SĐT, Email, Website", ok: true },
      { t: "Đăng tin hợp tác (≤ 5 tin)", ok: true },
      { t: "Logo & mô tả doanh nghiệp", ok: true },
      { t: "Tối ưu hồ sơ chuẩn SEO", ok: true },
    ],
  },
  {
    icon: TrendingUp,
    name: "Gói Tăng Trưởng",
    desc: "Dành cho doanh nghiệp cần quảng bá và chủ động tiếp cận đối tác.",
    action: "Đăng nhập để xem",
    features: [
      { t: "Toàn bộ Gói Kết Nối", ok: true },
      { t: "Hỗ trợ 24/7 qua Zalo", ok: true },
      { t: "Đăng banner & ưu tiên SEO", ok: true },
      { t: "Đăng tin hợp tác (≤ 20 tin)", ok: true },
      { t: "Tư vấn chiến lược 1-1", ok: true },
    ],
  },
  {
    icon: Briefcase,
    name: "Gói Đồng Hành",
    desc: "Đặc quyền tối đa để bứt phá doanh thu và khẳng định vị thế.",
    action: "Đăng nhập để xem",
    features: [
      { t: "Toàn bộ Gói Tăng Trưởng", ok: true },
      { t: "Ưu đãi toàn bộ tính năng", ok: true },
      { t: "Tư vấn chiến lược chuyên sâu", ok: true },
      { t: "Hỗ trợ kỹ thuật ưu tiên cao", ok: true },
      { t: "Cố vấn hội đồng quản trị", ok: true },
      { t: "Đăng tin hợp tác (≤ 10 tin)", ok: true },
    ],
  },
];

function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-navy-dark">
      <img
        src={IMG.spaceBg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy-dark/50" />
      <div className="container-page relative z-10 grid items-center gap-10 pb-20 pt-32 lg:grid-cols-2 lg:pb-24 lg:pt-36">
        <div className="max-w-xl">
          <h1 className="text-4xl font-extrabold leading-[1.15] text-white sm:text-5xl">
            Hỗ trợ kinh doanh.
            <br /> Xây dựng mạng lưới.
            <br /> Thúc đẩy <span className="text-sky-400">đổi mới.</span>
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/70">
            Matrix Community cung cấp môi trường kết nối đa chiều, mở ra cơ
            hội để doanh nghiệp chia sẻ nguồn lực, tìm kiếm đối tác chiến
            lược và cùng nhau giải quyết các thách thức để đạt được sự thịnh
            vượng lâu dài.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/dang-ky"
              className="rounded-full bg-yellow-brand px-7 py-3 text-[15px] font-semibold text-navy transition-all hover:brightness-105"
            >
              Đăng kí miễn phí
            </Link>
            <Link
              to="/#mang-luoi"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold text-white ring-1 ring-white/40 transition-colors hover:bg-white/10"
            >
              Xem bảng giá <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <OrbitDiagram />
      </div>
    </section>
  );
}

function OrbitDiagram() {
  return (
    <>
      {/* Desktop orbital */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
        <span
          aria-hidden
          className="absolute inset-[6%] rounded-full"
          style={{ boxShadow: "0 0 40px 2px rgba(0,34,150,0.5), inset 0 0 30px rgba(78,168,255,0.15)" }}
        />
        <span className="absolute inset-[6%] rounded-full border-2 border-sky-400/40" />
        <span className="absolute inset-[20%] rounded-full border border-dashed border-white/15" />
        <span
          aria-hidden
          className="absolute inset-[26%] rounded-full bg-blue-brand/25 blur-2xl"
        />

        {/* Center */}
        <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/20 bg-navy text-center shadow-card-lg">
          <img
            src="/logo.png"
            alt="Matrix Community"
            className="h-8 w-8 object-contain brightness-0 invert"
          />
          <span className="mt-1 text-[11px] font-bold uppercase tracking-wide text-white">
            Matrix
          </span>
          <span className="text-[8px] font-semibold uppercase tracking-widest text-white/60">
            Community
          </span>
        </div>

        {ORBIT_STATS.map(({ icon: Icon, value, label, pos }) => (
          <div
            key={label}
            className={`absolute ${pos} flex w-36 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-yellow-brand/15 text-yellow-brand">
              <Icon size={18} />
            </span>
            <div>
              <p className="text-base font-extrabold text-white">{value}</p>
              <p className="text-[11px] leading-tight text-white/60">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile grid */}
      <div className="grid grid-cols-2 gap-3 lg:hidden">
        {ORBIT_STATS.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] p-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-yellow-brand/15 text-yellow-brand">
              <Icon size={18} />
            </span>
            <div>
              <p className="text-base font-extrabold text-white">{value}</p>
              <p className="text-[11px] leading-tight text-white/60">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function AboutIntro() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-blue-brand">Về Chúng Tôi</h2>
            <span className="h-[3px] w-8 rounded-full bg-yellow-brand" />
          </div>
          <h3 className="text-2xl font-extrabold text-navy sm:text-3xl">
            Tầm nhìn &amp; Sứ mệnh
          </h3>
          <p className="text-[15px] font-semibold leading-relaxed text-blue-brand">
            “Kết nối chiến lược – Tối đa hóa giá trị doanh nghiệp” là thông điệp
            chúng tôi cam kết mang lại để đồng hành cùng sự phát triển của bạn.
          </p>
          <p className="text-[15px] leading-relaxed text-muted">
            Trong thị trường biến động, tốc độ và sự linh hoạt là chìa khóa
            thành công. Matrix Community ra đời nhằm cung cấp quy trình chuẩn
            hóa, giúp doanh nghiệp dễ dàng kết nối và tìm thấy tiếng nói chung.
            Chúng tôi không chỉ dừng lại ở việc cung cấp danh bạ đối tác, mà còn
            kiến tạo một hệ sinh thái nơi mọi giá trị được minh bạch. Với tầm
            nhìn dựng công đồng vững mạnh, chúng tôi tin rằng mỗi kết nối hôm nay
            là nền tảng cho sự tăng trưởng của toàn bộ nền kinh tế trong tương
            lai.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Figure
            src={IMG.whyPresentation}
            alt="Thuyết trình"
            className="col-span-2 h-52 w-full"
          />
          <Figure src={IMG.aboutMeeting} alt="Họp nhóm" className="h-40 w-full" />
          <Figure src={IMG.whyTeam} alt="Đội ngũ" className="h-40 w-full" />
        </div>
      </div>

      <div className="container-page mt-12">
        <Figure
          src={IMG.process}
          alt="Không gian làm việc Matrix Community"
          className="h-[280px] w-full sm:h-[360px]"
        />
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-cream py-20 lg:py-28">
      <span
        aria-hidden
        className="absolute right-6 top-16 h-16 w-16 rounded-xl bg-indigo-300/40"
      />
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div className="rounded-2xl bg-navy p-8 lg:p-10">
          <p className="text-[15px] leading-relaxed text-white/80">
            Chúng tôi xây dựng một hệ sinh thái liên kết toàn diện, nội ứng dụng
            công nghệ AI hiện đại để xóa bỏ rào cản thông tin giữa các doanh
            nghiệp. Bằng việc cung cấp giải pháp xác thực minh bạch và công cụ
            quảng bá tối ưu, chúng tôi không chỉ giúp bạn tìm thấy đối tác phù
            hợp mà còn tạo tiền đề vững chắc cho những cú bứt phá doanh thu đầy
            ấn tượng.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              Tại Sao Chọn Chúng Tôi
            </h2>
            <span className="h-[3px] w-8 rounded-full bg-yellow-brand" />
          </div>
          <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
            {REASONS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-brand/10 text-blue-brand">
                  <Icon size={22} />
                </span>
                <h3 className="text-base font-bold text-navy">{title}</h3>
                <p className="text-sm leading-relaxed text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="relative overflow-hidden bg-cream py-20 lg:py-28">
      <span
        aria-hidden
        className="absolute right-0 top-24 h-20 w-24 rounded-2xl bg-blue-brand/20"
      />
      <span
        aria-hidden
        className="absolute left-2 top-1/2 h-20 w-12 rotate-12 rounded-xl bg-indigo-300/50"
      />
      <div className="container-page flex flex-col gap-14">
        <SectionHeading
          title="Gói Dịch Vụ"
          subtitle="Gói cơ bản miễn phí vĩnh viễn – không giới hạn thời gian sử dụng, nâng cấp khi cần thêm tính năng."
        />
        <div className="grid gap-6 pt-2 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_PLANS.map((plan) => (
            <ServiceCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon: Icon, name, desc, action, highlight, features }: ServicePlan) {
  const isFree = action.toLowerCase().includes("miễn phí");
  return (
    <div
      className={`group flex flex-col rounded-2xl bg-white p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-card-lg ${
        highlight
          ? "border-2 border-blue-brand shadow-card-lg lg:-translate-y-3 lg:hover:-translate-y-4"
          : "border border-navy/10 shadow-card hover:border-blue-brand/40"
      }`}
    >
      <div
        className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300 ${
          highlight
            ? "bg-blue-brand/10 text-blue-brand"
            : "bg-yellow-brand/15 text-yellow-brand group-hover:bg-yellow-brand group-hover:text-navy"
        }`}
      >
        <Icon size={26} />
      </div>
      <h3 className="text-lg font-bold text-navy">{name}</h3>
      <p className="mt-2 text-xs leading-relaxed text-muted">{desc}</p>

      <Link
        to={isFree ? "/dang-ky" : "/dang-nhap"}
        className={`mt-4 block rounded-full py-2 text-sm font-semibold transition-all duration-200 ${
          highlight
            ? "bg-blue-brand text-white hover:brightness-110"
            : "border border-blue-brand/40 text-blue-brand hover:bg-blue-brand hover:text-white"
        }`}
      >
        {action}
      </Link>

      <ul className="mt-5 flex flex-1 flex-col gap-2.5 text-left">
        {features.map((f) => (
          <li key={f.t} className="flex items-start gap-2 text-sm">
            {f.ok ? (
              <Check size={16} className="mt-0.5 shrink-0 text-blue-brand" />
            ) : (
              <X size={16} className="mt-0.5 shrink-0 text-muted-light/60" />
            )}
            <span className={f.ok ? "text-muted" : "text-muted-light line-through"}>
              {f.t}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function About() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <WhyChooseUs />
      <Services />
    </>
  );
}
