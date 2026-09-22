import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function CTA() {
  return (
    <section className="bg-[#001a3b] px-6 py-14 lg:py-16">
      <div
        className="mx-auto grid max-w-[1172px] items-center gap-9 rounded-[2rem] border border-[#e7e2d8] bg-[#faf8f2] px-7 py-10 text-navy shadow-[0_24px_60px_rgba(0,0,0,.2)] sm:px-12 lg:py-14"
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-[#89611e]">
            <Sparkles size={14} /> Cùng phát triển bền vững
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight text-navy sm:text-4xl">
            Bạn đã sẵn sàng trở thành đối tác của chúng tôi?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-[#526174]">
            Kết nối cùng Matrix Holding để mở rộng nguồn lực, phát triển cơ hội hợp tác và tạo nên những giá trị dài hạn.
          </p>
        </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/dang-ky" className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-brand px-6 py-4 text-sm font-bold text-navy shadow-sm transition hover:bg-yellow-300">
              Trở thành đối tác <ArrowRight size={17} />
            </Link>
            <a href="#he-sinh-thai" className="rounded-xl border border-navy/20 px-6 py-3.5 text-center text-sm font-bold text-navy transition hover:bg-navy/5">
              Xem cơ hội hợp tác
            </a>
          </div>
      </div>
    </section>
  );
}
