import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreHorizontal,
  Search,
  Settings,
  Target,
  TrendingUp,
  UsersRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { clearAuthSession, getStoredUser, type UserRole } from "@/lib/api";

type DashboardContent = {
  label: string;
  title: string;
  description: string;
  stats: Array<{ label: string; value: string; change: string; icon: typeof Target }>;
  tasks: Array<{ title: string; meta: string; status: string; tone: string }>;
};

const contentByRole: Record<UserRole, DashboardContent> = {
  DIRECTOR: {
    label: "Executive workspace",
    title: "Toàn cảnh vận hành",
    description: "Theo dõi hiệu suất doanh nghiệp và đưa ra quyết định đúng thời điểm.",
    stats: [
      { label: "Mục tiêu chiến lược", value: "12", change: "+2 quý này", icon: Target },
      { label: "Phòng ban đang vận hành", value: "08", change: "Ổn định", icon: BriefcaseBusiness },
      { label: "Nhân sự toàn hệ thống", value: "128", change: "+8.4%", icon: UsersRound },
      { label: "KPI hoàn thành", value: "86%", change: "+6.2%", icon: TrendingUp },
    ],
    tasks: [
      { title: "Duyệt kế hoạch kinh doanh Quý IV", meta: "Khối Kinh doanh · Hạn 18/08", status: "Cần phê duyệt", tone: "bg-yellow-brand/20 text-navy" },
      { title: "Báo cáo hiệu quả vận hành tháng", meta: "Ban Điều hành · Cập nhật hôm nay", status: "Đã sẵn sàng", tone: "bg-emerald-50 text-emerald-700" },
      { title: "Đánh giá rủi ro dự án trọng điểm", meta: "PMO · Hạn 22/08", status: "Đang theo dõi", tone: "bg-blue-brand/10 text-blue-brand" },
    ],
  },
  DEPARTMENT_HEAD: {
    label: "Department workspace",
    title: "Hiệu quả phòng ban",
    description: "Điều phối nguồn lực, mục tiêu và tiến độ công việc của phòng.",
    stats: [
      { label: "Thành viên phòng", value: "24", change: "02 mới", icon: UsersRound },
      { label: "Mục tiêu tháng", value: "09", change: "78% hoàn tất", icon: Target },
      { label: "Công việc cần duyệt", value: "07", change: "Hôm nay", icon: ClipboardCheck },
      { label: "Hiệu suất phòng", value: "91%", change: "+4.8%", icon: TrendingUp },
    ],
    tasks: [
      { title: "Phê duyệt kế hoạch truyền thông", meta: "Nhóm Marketing · Hạn hôm nay", status: "Cần phê duyệt", tone: "bg-yellow-brand/20 text-navy" },
      { title: "Phân bổ nhân sự cho chiến dịch mới", meta: "Khối Nhân sự · Hạn 17/08", status: "Đang xử lý", tone: "bg-blue-brand/10 text-blue-brand" },
      { title: "Tổng hợp báo cáo tuần", meta: "Toàn phòng · Thứ Sáu", status: "Đúng tiến độ", tone: "bg-emerald-50 text-emerald-700" },
    ],
  },
  TEAM_LEAD: {
    label: "Team workspace",
    title: "Nhịp độ của đội nhóm",
    description: "Phân công rõ ràng, giữ đội nhóm tập trung vào các ưu tiên quan trọng.",
    stats: [
      { label: "Thành viên hoạt động", value: "08", change: "100% online", icon: UsersRound },
      { label: "Việc tuần này", value: "36", change: "24 hoàn thành", icon: ClipboardCheck },
      { label: "Mốc công việc", value: "05", change: "02 tuần tới", icon: CalendarDays },
      { label: "Tiến độ đội nhóm", value: "84%", change: "+9.1%", icon: TrendingUp },
    ],
    tasks: [
      { title: "Rà soát backlog sản phẩm", meta: "Nhóm Sản phẩm · 09:30 hôm nay", status: "Ưu tiên cao", tone: "bg-yellow-brand/20 text-navy" },
      { title: "Phân công sprint tuần 34", meta: "Toàn nhóm · Hạn 16/08", status: "Đang xử lý", tone: "bg-blue-brand/10 text-blue-brand" },
      { title: "Đánh giá kết quả tuần", meta: "Team Lead · Thứ Sáu", status: "Đúng tiến độ", tone: "bg-emerald-50 text-emerald-700" },
    ],
  },
  EMPLOYEE: {
    label: "Personal workspace",
    title: "Không gian làm việc của bạn",
    description: "Nắm rõ các ưu tiên trong ngày và duy trì nhịp độ hiệu quả.",
    stats: [
      { label: "Việc cần hoàn thành", value: "06", change: "02 ưu tiên", icon: ClipboardCheck },
      { label: "Việc đã hoàn thành", value: "18", change: "Tuần này", icon: Target },
      { label: "Lịch làm việc", value: "03", change: "Hôm nay", icon: CalendarDays },
      { label: "Hiệu suất cá nhân", value: "92%", change: "+3.5%", icon: TrendingUp },
    ],
    tasks: [
      { title: "Hoàn thiện báo cáo công việc tuần", meta: "Cá nhân · Hạn 16/08", status: "Ưu tiên cao", tone: "bg-yellow-brand/20 text-navy" },
      { title: "Cập nhật tiến độ dự án Aurora", meta: "Dự án Aurora · Hôm nay", status: "Đang thực hiện", tone: "bg-blue-brand/10 text-blue-brand" },
      { title: "Xác nhận lịch họp phòng ban", meta: "Phòng ban · 14:00", status: "Đã lên lịch", tone: "bg-emerald-50 text-emerald-700" },
    ],
  },
  HR: {
    label: "People workspace",
    title: "Quản trị nguồn nhân lực",
    description: "Theo dõi nhân sự, tuyển dụng và trải nghiệm nhân viên trong một không gian.",
    stats: [
      { label: "Tổng nhân sự", value: "128", change: "+8 tháng này", icon: UsersRound },
      { label: "Hồ sơ chờ xử lý", value: "14", change: "06 cần duyệt", icon: ClipboardCheck },
      { label: "Vị trí đang tuyển", value: "09", change: "23 ứng viên", icon: BriefcaseBusiness },
      { label: "Gắn kết nhân viên", value: "88%", change: "+5.1%", icon: TrendingUp },
    ],
    tasks: [
      { title: "Phê duyệt hồ sơ nhân sự mới", meta: "Onboarding · Hạn hôm nay", status: "Cần phê duyệt", tone: "bg-yellow-brand/20 text-navy" },
      { title: "Lịch phỏng vấn ứng viên", meta: "Tuyển dụng · 15:30 hôm nay", status: "Đã lên lịch", tone: "bg-blue-brand/10 text-blue-brand" },
      { title: "Khảo sát trải nghiệm nhân viên", meta: "Văn hóa nội bộ · 76% phản hồi", status: "Đang theo dõi", tone: "bg-emerald-50 text-emerald-700" },
    ],
  },
};

const roleLabels: Record<UserRole, string> = {
  DIRECTOR: "Giám đốc", DEPARTMENT_HEAD: "Trưởng phòng", TEAM_LEAD: "Trưởng nhóm", EMPLOYEE: "Nhân viên", HR: "HR",
};

const rolePaths: Record<UserRole, string> = {
  DIRECTOR: "/dashboard/director", DEPARTMENT_HEAD: "/dashboard/department-head", TEAM_LEAD: "/dashboard/team-lead", EMPLOYEE: "/dashboard/employee", HR: "/dashboard/hr",
};

export default function RoleDashboard({ role }: { role: UserRole }) {
  const navigate = useNavigate();
  const user = getStoredUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const data = contentByRole[role];

  if (!user) return <Navigate to="/dang-nhap" replace />;
  if (user.role !== role) return <Navigate to={rolePaths[user.role]} replace />;

  const navItems = [
    { label: "Tổng quan", icon: LayoutDashboard, active: true },
    ...(role === "HR" || role === "DIRECTOR" ? [{ label: "Nhân sự & tuyển dụng", icon: UsersRound, path: "/quan-tri/ho-so-ung-tuyen" }] : [{ label: "Công việc", icon: ClipboardCheck }]),
    { label: role === "DIRECTOR" ? "Phòng ban" : "Mục tiêu", icon: Target },
    { label: "Lịch làm việc", icon: CalendarDays },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-navy">
      <aside className="hidden">
        <div className="flex items-center justify-between border-b border-white/10 pb-7">
          <img src="/images/logo-business-transparent.png" alt="Matrix Holding" className="h-12 w-auto brightness-0 invert" />
          <button onClick={() => setMenuOpen(false)} className="lg:hidden" aria-label="Đóng menu"><X size={22} /></button>
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-brand">{data.label}</p>
          <p className="mt-2 text-sm font-semibold">{roleLabels[role]}</p>
        </div>
        <nav className="mt-8 space-y-2">
          {navItems.map(({ label, icon: Icon, active, path }) => (
            <button key={label} onClick={() => path && navigate(path)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${active ? "bg-yellow-brand text-navy shadow-lg" : "text-white/70 hover:bg-white/10 hover:text-white"}`}>
              <Icon size={19} />{label}
            </button>
          ))}
        </nav>
        <div className="mt-auto border-t border-white/10 pt-5">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white"><CircleHelp size={19} />Trung tâm hỗ trợ</button>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white"><Settings size={19} />Thiết lập</button>
        </div>
      </aside>

      {menuOpen && <button onClick={() => setMenuOpen(false)} className="fixed inset-0 z-20 bg-navy/50 lg:hidden" aria-label="Đóng menu" />}
      <main>
        <header className="hidden">
          <div className="flex items-center gap-4"><button onClick={() => setMenuOpen(true)} className="rounded-xl p-2 text-navy hover:bg-slate-100 lg:hidden" aria-label="Mở menu"><Menu size={23} /></button><div className="hidden w-72 items-center gap-3 rounded-xl bg-slate-100 px-4 py-2.5 text-slate-400 sm:flex"><Search size={18} /><span className="text-sm">Tìm kiếm trong Matrix</span></div></div>
          <div className="flex items-center gap-3 sm:gap-5"><button className="relative rounded-xl p-2 text-navy hover:bg-slate-100" aria-label="Thông báo"><Bell size={21} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-yellow-brand ring-2 ring-white" /></button><div className="hidden h-8 w-px bg-slate-200 sm:block" /><button onClick={() => { clearAuthSession(); navigate("/dang-nhap"); }} className="flex items-center gap-3 rounded-xl p-1.5 pr-3 text-left hover:bg-slate-100"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-brand font-bold text-white">{user.username.charAt(0).toUpperCase()}</span><span className="hidden sm:block"><span className="block text-sm font-bold">{user.username}</span><span className="block text-xs text-slate-500">{roleLabels[role]}</span></span><LogOut size={17} className="text-slate-400" /></button></div>
        </header>

        <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <section className="flex flex-col justify-between gap-6 rounded-3xl bg-gradient-to-br from-navy-dark via-navy to-blue-brand px-6 py-7 text-white shadow-card-lg sm:flex-row sm:items-end sm:px-8">
            <div><p className="text-sm font-bold tracking-wide text-yellow-brand">{new Intl.DateTimeFormat("vi-VN", { weekday: "long", day: "2-digit", month: "long" }).format(new Date())}</p><h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{data.title}</h1><p className="mt-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base">{data.description}</p></div>
            <div className="flex flex-wrap gap-3"><button onClick={() => navigate("/tuyen-dung")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-brand px-5 py-3 text-sm font-extrabold text-navy transition hover:bg-yellow-300"><ClipboardCheck size={18} />Xem công việc</button>{(role === "DIRECTOR" || role === "HR") && <><button onClick={() => navigate("/quan-tri/ho-so-ung-tuyen")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-yellow-brand/60 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-white/10"><UsersRound size={18} />Hồ sơ ứng viên</button><button onClick={() => navigate("/quan-tri/tin-tuc")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-white/10">Quản lý tin tức</button><button onClick={() => navigate("/quan-tri/tuyen-dung")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-white/10">Đăng tin tuyển dụng</button></>}</div>
          </section>

          <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {data.stats.map(({ label, value, change, icon: Icon }) => <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><span className="text-sm font-semibold text-slate-500">{label}</span><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-brand/10 text-blue-brand"><Icon size={20} /></span></div><div className="mt-5 flex items-end justify-between"><p className="text-3xl font-extrabold tracking-tight text-navy">{value}</p><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">{change}</span></div></article>)}
          </section>

          <section className="mt-7 grid gap-7 xl:grid-cols-[1.45fr_0.85fr]">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="text-lg font-extrabold text-navy">Tiến độ hiệu suất</h2><p className="mt-1 text-sm text-slate-500">Tổng quan 6 tháng gần nhất</p></div><button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Thêm tùy chọn"><MoreHorizontal size={21} /></button></div><div className="mt-8 flex h-52 items-end justify-between gap-3 border-b border-slate-100 pb-1 sm:gap-5">{[48, 62, 55, 74, 69, 88].map((height, index) => <div key={height} className="flex h-full flex-1 flex-col items-center justify-end gap-3"><div className={`w-full max-w-10 rounded-t-lg ${index === 5 ? "bg-yellow-brand" : "bg-blue-brand/15"}`} style={{ height: `${height}%` }} /><span className="text-xs font-semibold text-slate-400">T{index + 2}</span></div>)}</div><div className="mt-5 flex items-center gap-6 text-sm text-slate-500"><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-blue-brand/20" />Mục tiêu</span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-yellow-brand" />Hiện tại</span></div></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="text-lg font-extrabold text-navy">Lịch hôm nay</h2><p className="mt-1 text-sm text-slate-500">13 Tháng 08</p></div><button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-navy hover:bg-slate-50">Xem lịch</button></div><div className="mt-6 space-y-5">{[["09:00", "Họp cập nhật tiến độ", "Phòng họp Atlas"], ["14:00", "Rà soát công việc", "Trực tuyến · Google Meet"], ["16:30", "Tổng kết ngày", "Không gian điều hành"]].map(([time, title, place], index) => <div key={time} className="flex gap-4"><span className="w-11 pt-0.5 text-xs font-extrabold text-blue-brand">{time}</span><span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${index === 1 ? "bg-yellow-brand" : "bg-blue-brand"}`} /><div><p className="text-sm font-bold text-navy">{title}</p><p className="mt-1 text-xs text-slate-500">{place}</p></div></div>)}</div></article>
          </section>

          <section className="mt-7 rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-lg font-extrabold text-navy">Ưu tiên cần xử lý</h2><p className="mt-1 text-sm text-slate-500">Các đầu việc quan trọng đang chờ bạn</p></div><button className="flex items-center gap-1 text-sm font-extrabold text-blue-brand hover:text-navy">Xem tất cả <ChevronDown size={16} className="-rotate-90" /></button></div><div className="divide-y divide-slate-100">{data.tasks.map((task) => <div key={task.title} className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-navy"><ClipboardCheck size={19} /></span><div className="min-w-0 flex-1"><p className="font-bold text-navy">{task.title}</p><p className="mt-1 text-sm text-slate-500">{task.meta}</p></div><span className={`w-fit rounded-full px-3 py-1.5 text-xs font-extrabold ${task.tone}`}>{task.status}</span><button className="text-slate-400 hover:text-navy" aria-label={`Tùy chọn cho ${task.title}`}><MoreHorizontal size={20} /></button></div>)}</div></section>
        </div>
      </main>
    </div>
  );
}
