import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Figure } from "@/components/ui/Figure";
import { IMG } from "@/data/content";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  // Kích hoạt hiệu ứng khi section cuộn vào khung nhìn (chỉ chạy 1 lần)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ve-chung-toi"
      className="relative overflow-hidden bg-cream py-20 lg:py-28"
    >
      {/* decorative squares — trôi nhẹ liên tục, tạo cảm giác "sống" cho nền */}
      <span
        aria-hidden
        className="absolute left-0 top-1/2 h-24 w-24 -translate-y-1/2 animate-float-slow rounded-2xl bg-indigo-300/40"
      />
      <span
        aria-hidden
        className="absolute right-8 top-24 h-16 w-16 animate-float-slow rounded-xl bg-indigo-300/40 [animation-delay:1.5s]"
      />

      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div
          className={`flex flex-col gap-6 transition-all duration-700 ease-out ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-extrabold text-blue-brand sm:text-3xl lg:text-[34px]">
              Về Chúng Tôi
            </h2>
            <span className="h-[3px] w-10 rounded-full bg-yellow-brand" />
          </div>
          <p
            className={`text-justify text-[15px] leading-relaxed text-muted transition-all delay-150 duration-700 ease-out ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Matrix Holding là một doanh nghiệp đầu tư và phát triển hệ sinh thái
            dịch vụ đa ngành tại Việt Nam. Chúng tôi cung cấp các dịch vụ doanh
            nghiệp, nguồn vốn, cơ hội kinh doanh và kiến tạo nên các giá trị cho
            cộng đồng trong một hệ sinh thái thống nhất.
          </p>
          <p
            className={`text-justify text-[15px] leading-relaxed text-muted transition-all delay-[300ms] duration-700 ease-out ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Matrix Holding hướng đến việc cung cấp đầy đủ nguồn lực để doanh
            nghiệp vận hành hiệu quả, nhà đầu tư được tiếp cận những cơ hội kinh
            doanh tiềm năng và tạo ra những mối quan hệ hợp tác bền vững. Đồng
            thời, chúng tôi đề cao trách nhiệm với xã hội và cam kết lan tỏa
            những giá trị tích cực tới cộng đồng.
          </p>
          <Link
            to="/gioi-thieu"
            className={`group mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-yellow-brand px-6 py-3 text-[15px] font-semibold text-navy transition-all delay-[450ms] duration-700 ease-out hover:brightness-105 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Khám phá thêm
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div
          className={`relative h-[420px] transition-all delay-200 duration-700 ease-out ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <Figure
            src={IMG.aboutBuilding}
            alt="Toà nhà văn phòng"
            className="absolute right-0 top-0 h-56 w-3/5 border-4 border-cream transition-transform duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02]"
          />
          <Figure
            src={IMG.aboutMeeting}
            alt="Cuộc họp doanh nghiệp"
            className="absolute bottom-0 left-0 h-64 w-4/5 border-4 border-cream shadow-card-lg transition-transform duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02]"
          />
        </div>
      </div>
    </section>
  );
}