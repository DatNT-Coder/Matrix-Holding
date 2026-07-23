import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Figure } from "@/components/ui/Figure";
import { IMG } from "@/data/content";

export function About() {
  return (
    <section id="ve-chung-toi" className="relative overflow-hidden bg-cream py-20 lg:py-28">
      {/* decorative squares */}
      <span
        aria-hidden
        className="absolute left-0 top-1/2 h-24 w-24 -translate-y-1/2 rounded-2xl bg-indigo-300/40"
      />
      <span
        aria-hidden
        className="absolute right-8 top-24 h-16 w-16 rounded-xl bg-indigo-300/40"
      />

      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-extrabold text-blue-brand sm:text-3xl lg:text-[34px]">
              Về Chúng Tôi
            </h2>
            <span className="h-[3px] w-10 rounded-full bg-yellow-brand" />
          </div>
          <p className="text-justify text-[15px] leading-relaxed text-muted">
            Matrix Holding là một doanh nghiệp đầu tư và phát triển hệ sinh thái
            dịch vụ đa ngành tại Việt Nam. Chúng tôi cung cấp các dịch vụ doanh
            nghiệp, nguồn vốn, cơ hội kinh doanh và kiến tạo nên các giá trị cho
            cộng đồng trong một hệ sinh thái thống nhất.
          </p>
          <p className="text-justify text-[15px] leading-relaxed text-muted">
            Matrix Holding hướng đến việc cung cấp đầy đủ nguồn lực để doanh
            nghiệp vận hành hiệu quả, nhà đầu tư được tiếp cận những cơ hội kinh
            doanh tiềm năng và tạo ra những mối quan hệ hợp tác bền vững. Đồng
            thời, chúng tôi đề cao trách nhiệm với xã hội và cam kết lan tỏa
            những giá trị tích cực tới cộng đồng.
          </p>
          <Link
            to="/gioi-thieu"
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-yellow-brand px-6 py-3 text-[15px] font-semibold text-navy transition-all hover:brightness-105"
          >
            Khám phá thêm <ArrowRight size={18} />
          </Link>
        </div>

        <div className="relative h-[420px]">
          <Figure
            src={IMG.aboutBuilding}
            alt="Toà nhà văn phòng"
            className="absolute right-0 top-0 h-56 w-3/5 border-4 border-cream"
          />
          <Figure
            src={IMG.aboutMeeting}
            alt="Cuộc họp doanh nghiệp"
            className="absolute bottom-0 left-0 h-64 w-4/5 border-4 border-cream shadow-card-lg"
          />
        </div>
      </div>
    </section>
  );
}
