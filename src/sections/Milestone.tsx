import { MILESTONE_STATS } from "@/data/content";

const offsets = ["lg:mt-0", "lg:mt-10", "lg:mt-3", "lg:mt-12"];

export function Milestone() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="container-page grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          {MILESTONE_STATS.map((s, i) => (
            <div
              key={s.label}
              className={`min-h-[150px] rounded-3xl border border-slate-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg sm:p-6 ${offsets[i]}`}
            >
              <p className="text-4xl font-extrabold leading-none text-navy sm:text-5xl lg:text-[2.8rem]">
                {s.value}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-4 w-1 rounded-full bg-yellow-brand" />
                <p className="text-[13px] font-semibold leading-relaxed text-muted sm:text-sm">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center lg:pl-2">
          <span className="inline-flex w-fit items-center rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-blue-brand shadow-sm ring-1 ring-slate-200">
            Milestone
          </span>
          <h2 className="mt-4 max-w-[28rem] text-[1.9rem] font-extrabold leading-[1.15] text-navy sm:text-[2.2rem]">
            <span className="block">Những con số khẳng định</span>
            <span className="block">tốc độ phát triển của Matrix Holding</span>
          </h2>
          <p className="mt-4 max-w-[32rem] text-[15px] leading-relaxed text-muted sm:text-base">
            Từ mạng lưới doanh nghiệp đến hệ sinh thái dịch vụ, chúng tôi không
            ngừng tạo ra giá trị bền vững cho cộng đồng và đối tác.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-navy px-4 py-4 text-white shadow-card">
              <p className="text-lg font-extrabold">Hiệu quả</p>
              <p className="mt-1 text-sm text-white/70">
                Tăng tốc kết nối và hợp tác thực tế.
              </p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-4 shadow-card ring-1 ring-slate-200">
              <p className="text-lg font-extrabold text-navy">Đồng hành</p>
              <p className="mt-1 text-sm text-muted">
                Hỗ trợ doanh nghiệp phát triển dài hạn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
