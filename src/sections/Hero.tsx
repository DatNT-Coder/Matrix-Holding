import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { IMG, HIGHLIGHTS } from "@/data/content";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Kích hoạt fade-in ngay sau khi component mount
  useEffect(() => {
    const t = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Cập nhật vị trí con trỏ vào CSS variable --x / --y (qua ref, không setState
  // để tránh re-render mỗi lần di chuột -> mượt 60fps)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--x", `${x}%`);
    el.style.setProperty("--y", `${y}%`);
  };

  const handleMouseLeave = () => {
    const el = heroRef.current;
    if (!el) return;
    el.style.setProperty("--x", `50%`);
    el.style.setProperty("--y", `50%`);
  };

  return (
    <section className="relative">
      {/* Full-bleed hero image */}
      <div
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative overflow-hidden bg-navy-dark"
        style={
          {
            "--x": "50%",
            "--y": "50%",
          } as React.CSSProperties
        }
      >
        {/* Ken Burns: ảnh tự zoom rất chậm, tạo cảm giác chuyển động nhẹ nhàng */}
        <img
          src={IMG.heroGlobe}
          alt="Mạng lưới kết nối doanh nghiệp toàn cầu"
          className="absolute inset-0 h-full w-full animate-hero-kenburns object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark from-20% via-navy-dark/60 to-transparent" />

        {/* Quầng sáng đi theo chuột — độ mờ nhẹ, chỉ là điểm nhấn tinh tế */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(560px circle at var(--x) var(--y), rgba(255, 200, 87, 0.10), rgba(59, 130, 246, 0.06) 45%, transparent 70%)",
          }}
        />

        <div className="container-page relative z-10 flex min-h-[560px] flex-col justify-center pb-24 pt-32 lg:min-h-[660px] lg:pb-28 lg:pt-36">
          <div className="max-w-xl">
            <h1
              className={`flex gap-4 text-[1.8rem] font-extrabold leading-[1.15] text-white transition-all duration-700 ease-out sm:text-[2.2rem] lg:text-[2.6rem] ${
                loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <span className="mt-1 hidden w-1.5 shrink-0 rounded-full bg-yellow-brand sm:block" />
              <span>
                <span className="block whitespace-nowrap">HỆ SINH THÁI TOÀN DIỆN</span>
                <span className="block whitespace-nowrap">DÀNH CHO DOANH NGHIỆP</span>
              </span>
            </h1>
            <p
              className={`mt-6 max-w-lg text-justify text-[15px] leading-relaxed text-white/80 transition-all delay-150 duration-700 ease-out ${
                loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              Trong bối cảnh thị trường cạnh tranh khốc liệt, hàng trăm nghìn doanh nghiệp phải rời khỏi thị trường mỗi năm. Sứ mệnh của chúng tôi là hỗ trợ các chủ doanh nghiệp xây dựng nền tảng vận hành và đồng hành cùng họ trên hành trình phát triển bền vững.
            </p>
            <div
              className={`mt-8 flex justify-center transition-all delay-300 duration-700 ease-out ${
                loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
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
          {HIGHLIGHTS.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className={`rounded-2xl bg-white p-6 shadow-card-lg transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-card-xl ${
                loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: loaded ? `${450 + i * 100}ms` : "0ms" }}
            >
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