import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <div className="container-page">
        <nav
          className={cn(
            "flex h-14 items-center justify-between rounded-full px-4 pl-5 transition-all duration-300 lg:h-16 lg:px-6",
            scrolled
              ? "bg-white shadow-card-lg"
              : "bg-white/95 shadow-card backdrop-blur"
          )}
        >
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={cn(
                    "rounded-full px-3 py-2 text-[15px] font-semibold transition-colors hover:text-blue-brand",
                    link.to === location.pathname
                      ? "text-blue-brand"
                      : "text-navy/80"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center xl:flex">
            <Button to="/dang-nhap" size="sm" className="rounded-full px-6">
              Đăng nhập
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 text-navy xl:hidden"
            aria-label="Mở menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {open && (
          <div className="mt-2 overflow-hidden rounded-card bg-white shadow-card-lg xl:hidden">
            <ul className="flex flex-col p-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="block rounded-lg px-4 py-3 font-semibold text-navy hover:bg-navy/5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="p-2">
                <Button to="/dang-nhap" size="md" className="w-full rounded-full">
                  Đăng nhập
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
