import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function CTA() {
  return (
    <section className="bg-[#001a3b] px-6 py-14 lg:py-16">
      <div
        className="relative isolate mx-auto grid max-w-[1172px] items-center gap-8 overflow-hidden rounded-[2rem] border border-[#ead5ad] px-6 py-12 text-navy shadow-[0_24px_65px_rgba(0,0,0,.25)] sm:px-12 lg:py-16"
        style={{ background: "radial-gradient(ellipse at 0% 100%, #edcf94 0%, transparent 48%), radial-gradient(ellipse at 100% 0%, #f0d9af 0%, transparent 48%), linear-gradient(120deg, #fcf4e4, #fffaf0 55%, #f6e9ce)" }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-3 -z-10 rounded-[1.4rem] border border-white/60 sm:inset-4" />
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d9bb80] bg-white/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[.12em] text-[#79551d] sm:text-xs">
            <Sparkles size={14} /> Cùng phát triển bền vững
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-[1.2] tracking-tight text-[#082747] sm:text-4xl lg:text-[2.75rem]">
            Bạn đã sẵn sàng trở thành<br className="hidden sm:block" /> đối tác của chúng tôi?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-[#4f5a65] sm:text-base">
            Kết nối cùng Matrix Holding để mở rộng nguồn lực, phát triển cơ hội hợp tác và tạo nên những giá trị dài hạn.
          </p>
        </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/dang-ky" className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border border-[#e8af32] bg-[#ffc54a] px-7 py-4 text-sm font-bold text-[#082747] shadow-[0_6px_18px_rgba(174,117,19,.18)] transition hover:bg-[#ffd372] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy sm:w-auto">
              Trở thành đối tác <ArrowRight size={17} className="transition-transform motion-safe:group-hover:translate-x-1" />
            </Link>
            <a href="#he-sinh-thai" className="inline-flex min-h-14 w-full items-center justify-center rounded-xl border border-[#aeb5b8] bg-white/65 px-7 py-4 text-center text-sm font-bold text-[#082747] transition hover:border-navy hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy sm:w-auto">
              Xem cơ hội hợp tác
            </a>
          </div>
      </div>
    </section>
  );
}
