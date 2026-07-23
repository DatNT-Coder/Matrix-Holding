import { UserPlus, ShieldCheck, FileEdit, Rocket, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Figure } from "@/components/ui/Figure";
import { PROCESS, IMG } from "@/data/content";

const icons: LucideIcon[] = [UserPlus, ShieldCheck, FileEdit, Rocket];

export function Process() {
  return (
    <section id="quy-trinh" className="bg-navy-dark py-20 lg:py-28">
      <div className="container-page flex flex-col gap-14">
        <SectionHeading
          tone="gold"
          title="Quy Trình"
          subtitle="Lộ trình đơn giản, chuẩn hóa giúp doanh nghiệp tối ưu thời gian kết nối, đối tác và thực thi. Hiện thực hóa các cơ hội giao thương trên hành trình phát triển với nền tảng B2B."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ol className="relative flex flex-col gap-8 pl-2">
            <span
              aria-hidden
              className="absolute bottom-6 left-[27px] top-6 w-px border-l border-dashed border-white/25"
            />
            {PROCESS.map((step, i) => {
              const Icon = icons[i];
              return (
                <li key={step.title} className="relative flex gap-5">
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/20 bg-navy text-yellow-brand">
                    <Icon size={24} />
                  </span>
                  <div className="pt-1">
                    <h3 className="text-lg font-bold text-white">
                      {i + 1}. {step.title}
                    </h3>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-white/60">
                      {step.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <Figure
            src={IMG.process}
            alt="Đội ngũ doanh nghiệp làm việc"
            className="h-[380px] w-full"
          />
        </div>
      </div>
    </section>
  );
}
