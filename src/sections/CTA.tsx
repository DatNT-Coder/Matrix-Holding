import { Link } from "react-router-dom";

export function CTA() {
  return (
    <section className="relative isolate overflow-hidden bg-[#101010] px-6 py-16 lg:py-20">
      <img src="/images/matrix-interior-lounge.png" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-black/75" />
      <div
        className="mx-auto grid max-w-[1172px] items-center gap-9 text-white"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold uppercase leading-[1.3] tracking-tight text-white sm:text-4xl">
            Bạn đã sẵn sàng<br />trở thành đối tác của chúng tôi?
          </h2>
        </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/dang-ky" className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-7 py-3 text-sm font-semibold text-[#111111] transition hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto">
              Đăng ký miễn phí
            </Link>
            <a href="#he-sinh-thai" className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white px-7 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto">
              Xem cơ hội hợp tác
            </a>
          </div>
      </div>
    </section>
  );
}
