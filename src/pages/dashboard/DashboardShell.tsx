import { Bell, BriefcaseBusiness, CalendarDays, CircleHelp, ClipboardCheck, LayoutDashboard, LogOut, Menu, Search, Settings, UserRound, UsersRound, X } from "lucide-react";
import { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { clearAuthSession, getStoredUser, type UserRole } from "@/lib/api";

const labels: Record<UserRole, string> = { DIRECTOR: "Giám đốc", DEPARTMENT_HEAD: "Trưởng phòng", TEAM_LEAD: "Trưởng nhóm", EMPLOYEE: "Nhân viên", HR: "Nhân sự" };
const dashboardPath: Record<UserRole, string> = { DIRECTOR: "/dashboard/director", DEPARTMENT_HEAD: "/dashboard/department-head", TEAM_LEAD: "/dashboard/team-lead", EMPLOYEE: "/dashboard/employee", HR: "/dashboard/hr" };

export default function DashboardShell() {
  const user = getStoredUser();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  if (!user) return <Navigate to="/dang-nhap" replace />;
  const hasRecruitmentAccess = user.role === "DIRECTOR" || user.role === "HR";
  const go = (path: string) => { setMenuOpen(false); navigate(path); };
  const nav = [
    { label: "Tổng quan", icon: LayoutDashboard, path: dashboardPath[user.role] },
    ...(hasRecruitmentAccess ? [{ label: "Nhân sự & tuyển dụng", icon: UsersRound, path: "/quan-tri/ho-so-ung-tuyen" }, { label: "Tin tuyển dụng", icon: BriefcaseBusiness, path: "/quan-tri/tuyen-dung" }] : [{ label: "Công việc", icon: ClipboardCheck, path: "" }]),
    { label: "Lịch làm việc", icon: CalendarDays, path: "/quan-tri/lich-lam-viec" },
  ];
  return <div className="min-h-screen bg-[#f5f7fc] text-navy">
    <aside className={`fixed inset-y-0 left-0 z-30 flex w-72 flex-col bg-navy-dark px-5 py-7 text-white shadow-2xl transition-transform lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between border-b border-white/10 pb-7"><img src="/images/logo-business-transparent.png" alt="Matrix Holding" className="h-12 w-auto brightness-0 invert" /><button onClick={() => setMenuOpen(false)} className="lg:hidden" aria-label="Đóng menu"><X size={22} /></button></div>
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.06] p-4"><p className="text-xs font-bold uppercase tracking-[.18em] text-yellow-brand">{user.role === "HR" ? "People workspace" : "Executive workspace"}</p><p className="mt-2 text-sm font-semibold">{labels[user.role]}</p></div>
      <nav className="mt-8 space-y-2">{nav.map(({ label, icon: Icon, path }) => { const active = location.pathname === path; return <button key={label} onClick={() => path && go(path)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${active ? "bg-yellow-brand text-navy shadow-lg" : "text-white/70 hover:bg-white/10 hover:text-white"}`}><Icon size={19} />{label}</button>; })}</nav>
      <div className="mt-auto border-t border-white/10 pt-5"><button onClick={() => go("/tai-khoan/cua-toi")} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${location.pathname === "/tai-khoan/cua-toi" ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}`}><UserRound size={19} />Thông tin cá nhân</button><button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white"><CircleHelp size={19} />Trung tâm hỗ trợ</button><button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white"><Settings size={19} />Thiết lập</button></div>
    </aside>
    {menuOpen && <button onClick={() => setMenuOpen(false)} className="fixed inset-0 z-20 bg-navy/50 lg:hidden" aria-label="Đóng menu" />}
    <main className="min-h-screen lg:ml-72"><header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8 lg:px-10"><div className="flex items-center gap-4"><button onClick={() => setMenuOpen(true)} className="rounded-xl p-2 text-navy hover:bg-slate-100 lg:hidden" aria-label="Mở menu"><Menu size={23} /></button><div className="hidden w-72 items-center gap-3 rounded-xl bg-slate-100 px-4 py-2.5 text-slate-400 sm:flex"><Search size={18} /><span className="text-sm">Tìm kiếm trong Matrix</span></div></div><div className="flex items-center gap-3 sm:gap-5"><button className="relative rounded-xl p-2 text-navy hover:bg-slate-100" aria-label="Thông báo"><Bell size={21} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-yellow-brand ring-2 ring-white" /></button><div className="hidden h-8 w-px bg-slate-200 sm:block" /><button onClick={() => { clearAuthSession(); navigate("/dang-nhap"); }} className="flex items-center gap-3 rounded-xl p-1.5 pr-3 text-left hover:bg-slate-100"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-brand font-bold text-white">{user.username.charAt(0).toUpperCase()}</span><span className="hidden sm:block"><span className="block text-sm font-bold">{user.username}</span><span className="block text-xs text-slate-500">{labels[user.role]}</span></span><LogOut size={17} className="text-slate-400" /></button></div></header><Outlet /></main>
  </div>;
}
