import { Link } from "react-router-dom";
import { IMG } from "@/data/content";

export function CTA() {
  return (
    <section className="bg-cream px-4 pb-20 sm:px-6 lg:pb-28">
      <div className="mx-auto max-w-container">
        <div className="relative overflow-hidden rounded-[28px] bg-navy-dark px-6 py-16 text-center lg:px-16 lg:py-20">
          <img
            src={IMG.cta}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-navy-dark/70" />
          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
              Sẵn sàng kết nối và{" "}
              <span className="text-yellow-brand">bứt phá doanh thu?</span>
            </h2>
            <p className="text-[15px] leading-relaxed text-white/70">
              Tìm kiếm nhà cung cấp, kết nối khách hàng tiềm năng và mở rộng thị
              trường hiệu quả trên nền tảng công nghệ AI tiên tiến.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/dang-ky"
                className="rounded-full bg-yellow-brand px-7 py-3 text-[15px] font-semibold text-navy transition-all hover:brightness-105"
              >
                Đăng kí miễn phí
              </Link>
              <Link
                to="/#mang-luoi"
                className="rounded-full px-7 py-3 text-[15px] font-semibold text-white ring-1 ring-white/50 transition-colors hover:bg-white/10"
              >
                Xem cơ hội hợp tác
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
