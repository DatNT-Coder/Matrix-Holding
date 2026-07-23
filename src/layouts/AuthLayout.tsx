import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { IMG } from "@/data/content";

interface Props {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function AuthLayout({ title, children, footer }: Props) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-dark px-4 py-8">
      {/* backdrop */}
      <img
        src={IMG.heroGlobe}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-sm"
      />
      <div className="absolute inset-0 bg-navy-dark/80" />

      {/* modal */}
      <div className="relative z-10 grid max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-card-lg md:grid-cols-2">
        <div className="relative hidden md:block">
          <img
            src={IMG.authSide}
            alt="Toà nhà Matrix Community"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-dark/10" />
        </div>

        <div className="relative flex max-h-[92vh] flex-col overflow-y-auto p-8 sm:p-10">
          <Link
            to="/"
            aria-label="Đóng"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-light transition-colors hover:bg-navy/5 hover:text-navy"
          >
            <X size={20} />
          </Link>

          <div className="flex justify-center">
            <Logo />
          </div>

          <h1 className="mt-7 text-center text-2xl font-extrabold text-navy">
            {title}
          </h1>

          <div className="mt-7">{children}</div>

          {footer && (
            <div className="mt-6 text-center text-sm text-muted">{footer}</div>
          )}
        </div>
      </div>
    </div>
  );
}
