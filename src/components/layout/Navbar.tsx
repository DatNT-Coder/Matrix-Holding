import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Newspaper,
  UserRound,
  X,
} from "lucide-react";
import { clearAuthSession, getStoredUser, type UserRole } from "@/lib/api";

const links = [
  ["Trang chủ", "/"],
  ["Giới thiệu", "/gioi-thieu"],
  ["Hệ sinh thái", "/#he-sinh-thai"],
  ["Tin tức", "/tin-tuc"],
  ["Tuyển dụng", "/tuyen-dung"],
  ["Liên hệ", "/lien-he"],
] as const;
const dashboardPath: Record<UserRole, string> = {
  DIRECTOR: "/dashboard/director",
  DEPARTMENT_HEAD: "/dashboard/department-head",
  TEAM_LEAD: "/dashboard/team-lead",
  EMPLOYEE: "/dashboard/employee",
  HR: "/dashboard/hr",
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [activeTarget, setActiveTarget] = useState<string | null>(null);
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const user = getStoredUser();
  const hasManagementAccess = user?.role === "DIRECTOR" || user?.role === "HR";
  useEffect(() => {
    setOpen(false);
    setAccountOpen(false);
  }, [pathname]);
  useEffect(() => {
    const sectionIds = ["he-sinh-thai", "tin-tuc", "tuyen-dung"];
    const update = () => {
      if (pathname !== "/") return setActiveTarget(null);
      const visible = sectionIds.find((id) => {
        const section = document.getElementById(id);
        if (!section) return false;
        const { top, bottom } = section.getBoundingClientRect();
        return top <= 96 && bottom > 96;
      });
      setActiveTarget(
        visible ? `/#${visible}` : window.scrollY < 120 ? "/" : null,
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname, hash]);
  const isActive = (to: string) =>
    ["/tin-tuc", "/tuyen-dung", "/lien-he"].includes(to)
      ? pathname.startsWith(to)
      : activeTarget === to;
  const logout = () => {
    clearAuthSession();
    setAccountOpen(false);
    setOpen(false);
    navigate("/");
  };
  const accountLinks = user
    ? [
        {
          label: "Về Dashboard",
          icon: LayoutDashboard,
          path: dashboardPath[user.role],
        },
        {
          label: "Hồ sơ ứng viên",
          icon: BriefcaseBusiness,
          path: "/ho-so-ung-vien",
        },
        { label: "Trang cá nhân", icon: UserRound, path: "/tai-khoan/cua-toi" },
        ...(hasManagementAccess
          ? [
              {
                label: "Quản lý tuyển dụng",
                icon: BriefcaseBusiness,
                path: "/quan-tri/tuyen-dung",
              },
              {
                label: "Quản lý tin tức",
                icon: Newspaper,
                path: "/quan-tri/tin-tuc",
              },
            ]
          : []),
      ]
    : [];
  const go = (path: string) => {
    setAccountOpen(false);
    setOpen(false);
    navigate(path);
  };

  const AccountMenu = ({ mobile = false }: { mobile?: boolean }) =>
    user ? (
      <div
        className={
          mobile
            ? "mt-5 border-t border-white/10 pt-4"
            : "absolute right-0 top-[calc(100%+12px)] w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 text-navy shadow-2xl"
        }
      >
        {mobile && (
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/10 p-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#bfe5ff] font-extrabold text-navy">
              {user.username.charAt(0).toUpperCase()}
            </span>
            <div>
              <p className="text-sm font-bold text-white">
                Chào, {user.username}
              </p>
              <p className="text-xs text-white/65">Tài khoản Matrix Holding</p>
            </div>
          </div>
        )}
        {!mobile && (
          <div className="flex items-center gap-3 px-3 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf5ff] font-extrabold text-blue-brand">
              {user.username.charAt(0).toUpperCase()}
            </span>
            <div>
              <p className="text-sm font-extrabold">Chào, {user.username}</p>
              <p className="text-xs text-slate-500">Tài khoản Matrix Holding</p>
            </div>
          </div>
        )}
        <div
          className={mobile ? "space-y-1" : "border-t border-slate-100 pt-1"}
        >
          {accountLinks.map(({ label, icon: Icon, path }) => (
            <button
              key={path}
              onClick={() => go(path)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold transition ${mobile ? "text-white hover:bg-white/10" : "text-navy hover:bg-[#f2f8fd]"}`}
            >
              <Icon
                size={17}
                className={mobile ? "text-[#bfe5ff]" : "text-blue-brand"}
              />
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={logout}
          className={`mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold transition ${mobile ? "text-[#ffb9b9] hover:bg-white/10" : "text-red-600 hover:bg-red-50"}`}
        >
          <LogOut size={17} />
          Đăng xuất
        </button>
      </div>
    ) : null;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#001a3b]/95 text-white shadow-[0_10px_30px_rgba(0,18,48,.18)] backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-[1360px] items-center px-5 sm:px-8 lg:px-10">
        <Link
          to="/"
          className="group flex shrink-0 items-center"
          aria-label="Matrix Holding - Trang chủ"
        >
          <img
            src="/images/logo-mark.png"
            alt="Matrix Holding"
            className="h-11 w-11 object-contain brightness-0 invert transition duration-300 group-hover:scale-[1.03]"
          />
          <span className="ml-4 hidden border-l border-white/25 pl-4 text-sm font-bold tracking-[0.08em] text-white xl:block">
            Matrix Holding
          </span>
        </Link>
        <div className="mx-auto hidden h-full items-center gap-1 lg:flex">
          {links.map(([label, to]) => (
            <Link
              key={to}
              to={to}
              className={`relative px-4 py-7 text-sm font-semibold transition ${isActive(to) ? "text-[#bfe5ff]" : "text-white/85 hover:text-white"}`}
            >
              {label}
              <span
                className={`absolute bottom-0 left-4 right-4 h-0.5 origin-left bg-[#bfe5ff] transition-transform duration-300 ${isActive(to) ? "scale-x-100" : "scale-x-0"}`}
              />
            </Link>
          ))}
        </div>
        {user ? (
          <div className="relative ml-auto hidden lg:block">
            <button
              onClick={() => setAccountOpen((value) => !value)}
              className="flex items-center gap-2 rounded-full border border-[#bfe5ff]/45 bg-white/10 py-1.5 pl-2 pr-3 text-sm font-bold transition hover:border-[#bfe5ff] hover:bg-white/15"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#bfe5ff] text-xs font-extrabold text-navy">
                {user.username.charAt(0).toUpperCase()}
              </span>
              <span>Chào, {user.username}</span>
              <ChevronDown
                size={15}
                className={`transition ${accountOpen ? "rotate-180" : ""}`}
              />
            </button>
            {accountOpen && <AccountMenu />}
          </div>
        ) : (
          <Link
            to="/dang-nhap"
            className="ml-auto hidden items-center gap-2 rounded-full border border-[#bfe5ff]/45 bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition hover:border-[#bfe5ff] hover:bg-[#bfe5ff] hover:text-navy lg:inline-flex"
          >
            <LogIn size={16} /> Đăng nhập
          </Link>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="ml-auto rounded-full border border-white/20 p-2.5 transition hover:bg-white/10 lg:hidden"
          aria-label={open ? "Đóng menu" : "Mở menu"}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-[#001a3b] px-5 pb-5 pt-2 lg:hidden">
          {links.map(([label, to]) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between border-b border-white/10 py-4 text-sm font-semibold ${isActive(to) ? "text-[#bfe5ff]" : "text-white"}`}
            >
              {label}
              <ArrowUpRight size={16} />
            </Link>
          ))}
          {user ? (
            <AccountMenu mobile />
          ) : (
            <Link
              to="/dang-nhap"
              onClick={() => setOpen(false)}
              className="mt-5 flex items-center justify-center gap-2 rounded-btn bg-[#bfe5ff] px-4 py-3 text-sm font-bold text-navy"
            >
              <LogIn size={16} /> Đăng nhập tài khoản
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
