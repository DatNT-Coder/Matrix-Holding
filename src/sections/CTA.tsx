import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function CTA() {
  return (
    <section className="bg-[#001a3b] px-6 py-14 lg:py-16">
      <div
        className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[2rem] border border-white/20 px-7 py-14 text-center text-white shadow-[0_20px_45px_rgba(5,56,105,.25)] sm:px-12 lg:py-16"
        style={{ background: "#001a3b" }}
      >
        <div className="absolute -left-20 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full border-[24px] border-white/10" />
        <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full border-[22px] border-white/10" />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[.12em] text-white/95">
            <Sparkles size={14} /> Cùng phát triển bền vững
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.65rem]">
            Bạn đã sẵn sàng trở thành đối tác của chúng tôi?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-white/85">
            Kết nối cùng Matrix Holding để mở rộng nguồn lực, phát triển cơ hội hợp tác và tạo nên những giá trị dài hạn.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/dang-ky" className="inline-flex items-center gap-2 rounded-xl bg-yellow-brand px-6 py-3.5 text-sm font-bold text-navy shadow-sm transition hover:bg-yellow-300">
              Trở thành đối tác <ArrowRight size={17} />
            </Link>
            <a href="#he-sinh-thai" className="rounded-xl border border-white/70 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">
              Xem cơ hội hợp tác
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
