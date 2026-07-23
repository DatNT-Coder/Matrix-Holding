import { Figure } from "@/components/ui/Figure";
import { REASONS, IMG } from "@/data/content";

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-cream py-20 lg:py-28">
      <span
        aria-hidden
        className="absolute right-6 top-32 h-16 w-16 rounded-xl bg-indigo-300/40"
      />
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          <Figure
            src={IMG.whyPresentation}
            alt="Thuyết trình doanh nghiệp"
            className="col-span-2 h-56 w-full"
          />
          <Figure src={IMG.whyTeam} alt="Đội ngũ" className="h-40 w-full" />
          <Figure src={IMG.aboutMeeting} alt="Hợp tác" className="h-40 w-full" />
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl lg:text-[34px]">
              TẠI SAO LỰA CHỌN MATRIX HOLDING?
            </h2>
            <span className="h-[3px] w-8 rounded-full bg-yellow-brand" />
          </div>
          <p className="-mt-4 text-justify text-[15px] leading-relaxed text-muted">
            Matrix Holding mang đến một hệ sinh thái liên kết, giúp doanh nghiệp
            tiếp cận đúng nguồn lực, giảm áp lực quản lý và tập trung vào hoạt
            động kinh doanh cốt lõi.
          </p>
          <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
            {REASONS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-brand text-navy">
                  <Icon size={22} />
                </span>
                <h3 className="text-base font-bold text-navy">{title}</h3>
                <p className="text-sm leading-relaxed text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
