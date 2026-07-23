import { SectionHeading } from "@/components/ui/SectionHeading";
import { SECURITY } from "@/data/content";

export function Security() {
  return (
    <section id="bao-mat" className="bg-navy-dark py-20 lg:py-28">
      <div className="container-page flex flex-col gap-12">
        <SectionHeading
          tone="gold"
          title="Bảo Mật & Pháp Lý"
          subtitle="Chúng tôi tuân thủ nghiêm ngặt các quy định mới nhất về bảo vệ dữ liệu cá nhân, đảm bảo thông tin doanh nghiệp được vận hành minh bạch và an toàn."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {SECURITY.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-yellow-brand/40 text-yellow-brand">
                <Icon size={20} />
              </span>
              <div>
                <h3 className="text-base font-bold text-white">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
