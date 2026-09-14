import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, LogIn, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const links = [["Trang chủ", "/"], ["Giới thiệu", "/gioi-thieu"], ["Hệ sinh thái", "/#he-sinh-thai"], ["Tin tức", "/tin-tuc"], ["Tuyển dụng", "/tuyen-dung"], ["Liên hệ", "/#lien-he"]] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeTarget, setActiveTarget] = useState<string | null>(null);
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const sectionIds = ["he-sinh-thai", "tin-tuc", "tuyen-dung", "lien-he"];
    const updateActiveTarget = () => {
      if (pathname !== "/") return setActiveTarget(null);
      const headerOffset = 96;
      const visible = sectionIds.find((id) => {
        const section = document.getElementById(id);
        if (!section) return false;
        const { top, bottom } = section.getBoundingClientRect();
        return top <= headerOffset && bottom > headerOffset;
      });
      setActiveTarget(visible ? `/#${visible}` : window.scrollY < 120 ? "/" : null);
    };
    updateActiveTarget();
    window.addEventListener("scroll", updateActiveTarget, { passive: true });
    window.addEventListener("resize", updateActiveTarget);
    return () => {
      window.removeEventListener("scroll", updateActiveTarget);
      window.removeEventListener("resize", updateActiveTarget);
    };
  }, [pathname, hash]);
  const isActive = (to: string) => ["/tin-tuc", "/tuyen-dung"].includes(to) ? pathname.startsWith(to) : activeTarget === to;

  return <header className="sticky top-0 z-50 border-b border-white/10 bg-[#001a3b]/95 text-white shadow-[0_10px_30px_rgba(0,18,48,.18)] backdrop-blur-xl"><nav className="mx-auto flex h-20 max-w-[1360px] items-center px-5 sm:px-8 lg:px-10"><Link to="/" className="group flex shrink-0 items-center" aria-label="Matrix Holding - Trang chủ"><Logo light className="h-12 transition duration-300 group-hover:scale-[1.03]" /><span className="ml-4 hidden border-l border-white/25 pl-4 text-[10px] font-semibold uppercase leading-4 tracking-[0.19em] text-[#bfe5ff] xl:block">Investment<br />& ecosystem</span></Link><div className="mx-auto hidden h-full items-center gap-1 lg:flex">{links.map(([label, to]) => <Link key={to} to={to} className={`relative px-4 py-7 text-sm font-semibold transition ${isActive(to) ? "text-[#bfe5ff]" : "text-white/85 hover:text-white"}`}>{label}<span className={`absolute bottom-0 left-4 right-4 h-0.5 origin-left bg-[#bfe5ff] transition-transform duration-300 ${isActive(to) ? "scale-x-100" : "scale-x-0"}`} /></Link>)}</div><Link to="/dang-nhap" className="ml-auto hidden items-center gap-2 rounded-full border border-[#bfe5ff]/45 bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition hover:border-[#bfe5ff] hover:bg-[#bfe5ff] hover:text-navy lg:inline-flex"><LogIn size={16} /> Đăng nhập</Link><button onClick={() => setOpen(!open)} className="ml-auto rounded-full border border-white/20 p-2.5 transition hover:bg-white/10 lg:hidden" aria-label={open ? "Đóng menu" : "Mở menu"}>{open ? <X size={21} /> : <Menu size={21} />}</button></nav>{open && <div className="border-t border-white/10 bg-[#001a3b] px-5 pb-5 pt-2 lg:hidden">{links.map(([label, to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className={`flex items-center justify-between border-b border-white/10 py-4 text-sm font-semibold ${isActive(to) ? "text-[#bfe5ff]" : "text-white"}`}>{label}<ArrowUpRight size={16} /></Link>)}<Link to="/dang-nhap" onClick={() => setOpen(false)} className="mt-5 flex items-center justify-center gap-2 rounded-btn bg-[#bfe5ff] px-4 py-3 text-sm font-bold text-navy"><LogIn size={16} /> Đăng nhập tài khoản</Link></div>}</header>;
}
