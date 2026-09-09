import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGetNews, type NewsArticle } from "@/lib/api";

const images = {
  house: "/images/matrix-hero-villa.png",
  interior: "/images/matrix-interior-lounge.png",
  documents: "/images/matrix-interior-lounge.png",
  stones: "/images/matrix-hero-villa.png",
};

const ecosystems = [
  [
    "MATRIX NETWORK",
    "Hệ sinh thái dịch vụ toàn diện dành cho doanh nghiệp",
    Building2,
  ],
  [
    "MATRIX COMMUNITY",
    "Hệ sinh thái cộng đồng kết nối kinh doanh dành cho doanh nghiệp",
    UsersRound,
  ],
  [
    "MATRIX CAPITAL",
    "Hệ sinh thái cộng đồng kết nối đầu tư dành cho doanh nghiệp",
    BriefcaseBusiness,
  ],
] as const;

const jobs = [
  "Nhân viên Kinh doanh",
  "Chuyên viên Hành chính",
  "Chuyên viên Nhân sự",
  "Chuyên viên Truyền thông",
  "Nhân viên Tuyển dụng",
  "Chuyên viên Pháp chế",
];

export function MatrixLanding() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  useEffect(() => {
    apiGetNews(4).then(setArticles).catch(() => setArticles([]));
  }, []);

  return (
    <>
      <section className="relative h-[calc(100svh-5rem)] min-h-[650px] overflow-hidden bg-[#001a3b] text-white">
        <img
          src={images.house}
          alt="Không gian sống hiện đại"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,20,48,.95)_0%,rgba(0,20,48,.67)_36%,rgba(0,20,48,.10)_72%,rgba(0,20,48,.30)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#00142f]/80 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-[1360px] flex-col justify-end px-6 pb-10 pt-16 sm:px-8 sm:pb-14 lg:px-10 lg:pb-16">
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-12 bg-[#bfe5ff]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c6eaff]">
                Matrix Holding · Vietnam
              </p>
            </div>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              Kiến tạo <span className="text-[#bfe5ff]">hệ sinh thái</span>
              <br />
              kinh doanh bền vững.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/82 sm:text-lg">
              Đầu tư đúng hướng, phát triển có chiều sâu và kết nối những cơ hội
              tạo nên giá trị dài hạn cho doanh nghiệp Việt Nam.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#gioi-thieu"
                className="inline-flex items-center gap-3 rounded-btn bg-white px-6 py-4 text-sm font-bold text-navy transition hover:bg-[#bfe5ff]"
              >
                Khám phá Matrix <ArrowRight size={18} />
              </a>
              <a
                href="#lien-he"
                className="inline-flex items-center gap-3 rounded-btn border border-white/70 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Liên hệ hợp tác
              </a>
            </div>
          </div>
          <div className="mt-12 grid max-w-3xl grid-cols-3 border-t border-white/30 pt-6 text-white/95">
            <div>
              <p className="text-2xl font-extrabold sm:text-3xl">03</p>
              <p className="mt-1 text-xs leading-5 text-white/70">
                Mảng hệ sinh thái
                <br />
                trọng tâm
              </p>
            </div>
            <div className="border-x border-white/30 px-5">
              <p className="text-2xl font-extrabold sm:text-3xl">360°</p>
              <p className="mt-1 text-xs leading-5 text-white/70">
                Giải pháp phát triển
                <br />
                doanh nghiệp
              </p>
            </div>
            <div className="pl-5">
              <p className="text-2xl font-extrabold sm:text-3xl">01</p>
              <p className="mt-1 text-xs leading-5 text-white/70">
                Tầm nhìn chung
                <br />
                cho tăng trưởng
              </p>
            </div>
          </div>
        </div>
        <a
          href="#gioi-thieu"
          aria-label="Cuộn xuống phần giới thiệu"
          className="absolute bottom-8 right-6 hidden items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 lg:flex lg:right-12"
        >
          <span className="h-10 w-px bg-white/60" />
          Khám phá
        </a>
      </section>

      <section id="gioi-thieu" className="bg-white py-20">
        <div className="mx-auto grid max-w-[1220px] gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold text-blue-brand">VỀ CHÚNG TÔI</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy">
              GIỚI THIỆU MATRIX HOLDING
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
              Matrix Holding là doanh nghiệp hoạt động trong lĩnh vực đầu tư và
              phát triển hệ sinh thái kinh doanh tại Việt Nam. Chúng tôi cung
              cấp các giải pháp dành riêng cho doanh nghiệp, hỗ trợ nguồn vốn và
              kết nối cơ hội kinh doanh nhằm kiến tạo những giá trị thiết thực.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/gioi-thieu"
                className="rounded-btn bg-navy px-5 py-3 text-sm font-semibold text-white"
              >
                Tìm hiểu thêm
              </Link>
              <a
                href="#lien-he"
                className="rounded-btn border border-navy px-5 py-3 text-sm font-semibold text-navy"
              >
                Liên hệ hợp tác
              </a>
            </div>
          </div>
          <img
            src={images.interior}
            alt="Không gian Matrix Holding"
            className="h-[340px] w-full rounded-card object-cover"
          />
        </div>
      </section>

      <section id="he-sinh-thai" className="bg-[#001a3b] py-20 text-white">
        <div className="mx-auto max-w-[1220px] px-6">
          <div className="text-center">
            <p className="text-xs text-[#bfe5ff]">LĨNH VỰC HOẠT ĐỘNG</p>
            <h2 className="mt-3 text-3xl font-extrabold">
              HỆ SINH THÁI CỦA MATRIX HOLDING
            </h2>
            <p className="mt-4 text-sm text-white/75">
              Khám phá hệ sinh thái kinh doanh của Matrix Holding
            </p>
          </div>
          <div className="mt-10 grid gap-7 md:grid-cols-3">
            {ecosystems.map(([title, text, Icon]) => (
              <article
                key={title}
                className="overflow-hidden rounded-card bg-white text-navy shadow-card"
              >
                <img
                  src={images.documents}
                  alt="Tài liệu kinh doanh"
                  className="h-36 w-full object-cover"
                />
                <div className="p-5">
                  <Icon size={20} className="mb-3 text-blue-brand" />
                  <h3 className="font-extrabold">{title}</h3>
                  <p className="mt-3 min-h-12 text-sm leading-6 text-muted">
                    {text}
                  </p>
                  <a
                    href="#lien-he"
                    className="mt-4 inline-flex items-center gap-1 border-t border-navy pt-3 text-sm font-bold"
                  >
                    Khám phá ngay <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="tin-tuc" className="bg-white py-20">
        <div className="mx-auto max-w-[1220px] px-6">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-xs font-bold text-blue-brand">
                TIN TỨC - SỰ KIỆN
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-navy">
                TIN TỨC MỚI TỪ MATRIX HOLDING
              </h2>
            </div>
            <Link to="/tin-tuc" className="hidden items-center gap-3 rounded-btn bg-navy px-5 py-3 text-sm font-semibold text-white sm:inline-flex">
              Xem tất cả <ArrowRight size={17} />
            </Link>
          </div>
          {articles.length > 0 ? <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <Link to={`/tin-tuc/${articles[0].id}`} className="group relative min-h-[340px] overflow-hidden rounded-card bg-navy text-white">
              <img
                src={articles[0].image_url}
                alt={articles[0].title}
                className="absolute inset-0 h-full w-full object-cover opacity-65"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
              <div className="absolute bottom-0 p-7">
                <p className="text-xs">{new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(articles[0].published_at))}</p>
                <h3 className="mt-3 text-2xl font-bold">
                  {articles[0].title}
                </h3>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold">
                  Xem thêm <ArrowRight size={16} />
                </span>
              </div>
            </Link>
            <div className="divide-y divide-navy/30">
              {articles.slice(1).map((article) => (
                <Link key={article.id} to={`/tin-tuc/${article.id}`} className="flex gap-4 py-3 first:pt-0">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="h-24 w-32 rounded-btn object-cover"
                  />
                  <div>
                    <p className="text-xs text-muted">{new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(article.published_at))}</p>
                    <h3 className="mt-2 text-sm font-extrabold text-navy">
                      {article.title}
                    </h3>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-blue-brand">
                      Xem thêm <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div> : <div className="mt-8 rounded-card border border-navy/10 bg-[#f6f9fd] p-8 text-sm text-muted">Đang tải các bài viết mới nhất...</div>}
        </div>
      </section>

      <section id="tuyen-dung" className="bg-[#001a3b] py-20 text-white">
        <div className="mx-auto max-w-[1220px] px-6">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs text-[#bfe5ff]">THÔNG TIN TUYỂN DỤNG</p>
              <h2 className="mt-3 text-3xl font-extrabold">
                THÔNG TIN VIỆC LÀM NỔI BẬT
              </h2>
            </div>
            <Link
              to="/tuyen-dung"
              className="inline-flex items-center gap-4 rounded-btn bg-[#d7edff] px-5 py-3 text-sm font-bold text-navy"
            >
              Truy cập tìm việc làm <ArrowRight size={18} />
            </Link>
          </div>
          <div className="mt-7 overflow-hidden rounded-card bg-white text-navy">
            <img
              src={images.stones}
              alt="Cơ hội nghề nghiệp"
              className="h-40 w-full object-cover"
            />
            <div className="p-6">
              <div className="mb-5 flex flex-wrap gap-3">
                {[
                  "Xem tất cả",
                  "Hà Nội",
                  "Pháp chế",
                  "Hành chính",
                  "Nhân sự",
                  "Tuyển dụng",
                  "Truyền thông",
                  "Kinh doanh",
                ].map((filter) => (
                  <button
                    key={filter}
                    className="rounded-btn bg-navy px-4 py-2 text-xs font-semibold text-white"
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                  <article
                    key={job}
                    className="rounded-btn border border-navy bg-[#eaf5ff] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded bg-white text-blue-brand">
                        <BriefcaseBusiness size={17} />
                      </span>
                      <button className="rounded-btn bg-navy px-3 py-2 text-xs text-white">
                        Đăng ký ngay
                      </button>
                    </div>
                    <h3 className="mt-4 text-sm font-extrabold">
                      MATRIX HOLDING: {job}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-muted">
                      Thu nhập: 10 - 20 triệu
                      <br />
                      Ngoại hình: Ưa nhìn, chuyên nghiệp
                      <br />
                      Kỹ năng: Giao tiếp tốt
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
