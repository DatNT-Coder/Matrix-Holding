import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { IMG, HIGHLIGHTS } from "@/data/content";

export function Hero() {
  return (
    <section className="relative">
      {/* Full-bleed hero image */}
      <div className="relative overflow-hidden bg-navy-dark">
        <img
          src={IMG.heroGlobe}
          alt="Mạng lưới kết nối doanh nghiệp toàn cầu"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark from-20% via-navy-dark/60 to-transparent" />

        <div className="container-page relative z-10 flex min-h-[560px] flex-col justify-center pb-24 pt-32 lg:min-h-[660px] lg:pb-28 lg:pt-36">
          <div className="max-w-xl">
            <h1 className="flex gap-4 text-[1.8rem] font-extrabold leading-[1.15] text-white sm:text-[2.2rem] lg:text-[2.6rem]">
              <span className="mt-1 hidden w-1.5 shrink-0 rounded-full bg-yellow-brand sm:block" />
              <span>
                <span className="block whitespace-nowrap">HỆ SINH THÁI TOÀN DIỆN</span>
                <span className="block whitespace-nowrap">DÀNH CHO DOANH NGHIỆP</span>
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-justify text-[15px] leading-relaxed text-white/80">
              Trong bối cảnh thị trường cạnh tranh khốc liệt, hàng trăm nghìn doanh nghiệp phải rời khỏi thị trường mỗi năm. Sứ mệnh của chúng tôi là hỗ trợ các chủ doanh nghiệp xây dựng nền tảng vận hành và đồng hành cùng họ trên hành trình phát triển bền vững.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/dang-ky"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-[15px] font-semibold text-white ring-1 ring-white/40 backdrop-blur transition-colors hover:bg-white/20"
              >
                Liên hệ chúng tôi <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3 highlight cards overlapping */}
      <div className="container-page relative z-20 -mt-16 sm:-mt-20">
        <div className="grid gap-5 sm:grid-cols-3">
          {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl bg-white p-6 shadow-card-lg">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-brand/20 text-yellow-brand">
                  <Icon size={18} />
                </span>
                <h3 className="text-lg font-bold text-blue-brand">{title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
