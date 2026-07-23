import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { FOOTER_LINKS, CONTACT } from "@/data/content";

export function Footer() {
  return (
    <footer id="lien-he" className="relative overflow-hidden bg-navy-dark text-white">
      <div className="container-page relative z-10 grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo light />
          <ul className="mt-2 flex flex-col gap-3 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-yellow-brand" />
              <span>{CONTACT.email}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-yellow-brand" />
              <span>{CONTACT.phone}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-yellow-brand" />
              <span>{CONTACT.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-white">Dịch Vụ</h4>
          <ul className="flex flex-col gap-3 text-sm text-white/70">
            {FOOTER_LINKS.services.map((s) => (
              <li key={s}>
                <a href="/#mang-luoi" className="transition-colors hover:text-yellow-brand">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-white">Về Chúng Tôi</h4>
          <ul className="flex flex-col gap-3 text-sm text-white/70">
            {FOOTER_LINKS.about.map((a) => (
              <li key={a.label}>
                <Link to={a.to} className="transition-colors hover:text-yellow-brand">
                  {a.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-white">Theo Dõi Chúng Tôi</h4>
          <div className="flex gap-3">
            {[Facebook, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-yellow-brand hover:text-navy"
                aria-label="Mạng xã hội"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10">
        <div className="container-page py-6 text-center text-sm text-white/50">
          © {new Date().getFullYear()} Matrix Community. Bảo lưu mọi quyền.
        </div>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-4 left-1/2 w-full -translate-x-1/2 select-none whitespace-nowrap text-center text-[15vw] font-extrabold leading-none text-white/[0.04]"
      >
        Matrix Community
      </span>
    </footer>
  );
}
