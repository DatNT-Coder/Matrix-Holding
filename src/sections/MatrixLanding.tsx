import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGetJobs, apiGetNews, type Job, type NewsArticle } from "@/lib/api";

const images = {
  house: "/images/matrix-hero-villa.png",
  interior: "/images/matrix-interior-lounge.png",
  documents: "/images/matrix-interior-lounge.png",
  stones: "/images/matrix-hero-villa.png",
};

const ecosystems = [
  {
    title: "MATRIX NETWORK",
    description: "Đảm nhiệm vai trò xây dựng, quản lý và điều phối các đơn vị cung cấp dịch vụ toàn diện cho doanh nghiệp. ",
    image: "/images/matrix-network.png",
    alt: "Hệ sinh thái dịch vụ Matrix Network",
    Icon: Building2,
  },
  {
    title: "MATRIX COMMUNITY",
    description: "Đảm nhiệm vai trò xây dựng, quản lý và điều phối các cộng đồng kết nối kinh doanh cho doanh nghiệp.",
    image: "/images/matrix-community.png",
    alt: "Hệ sinh thái cộng đồng Matrix Community",
    Icon: UsersRound,
  },
  {
    title: "MATRIX CAPITAL",
    description: "Đảm nhiệm vai trò xây dựng, quản lý và điều phối các cộng đồng kết nối đầu tư cho doanh nghiệp.",
    image: "/images/matrix-capital.png",
    alt: "Hệ sinh thái đầu tư Matrix Capital",
    Icon: BriefcaseBusiness,
  },
] as const;

export function MatrixLanding() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [newsLoaded, setNewsLoaded] = useState(false);
  const [jobsLoaded, setJobsLoaded] = useState(false);
  useEffect(() => {
    apiGetNews(4).then(setArticles).catch(() => setArticles([])).finally(() => setNewsLoaded(true));
    apiGetJobs().then((jobs) => setFeaturedJobs(jobs.slice(0, 3))).catch(() => setFeaturedJobs([])).finally(() => setJobsLoaded(true));
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
        <div className="relative mx-auto flex h-full max-w-[1220px] flex-col justify-end px-6 pb-10 pt-16 sm:px-8 sm:pb-14 lg:pb-16">
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-12 bg-[#bfe5ff]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c6eaff]">
                Matrix Holding · Vietnam
              </p>
            </div>
            <h1 className="max-w-[1100px] text-3xl font-bold leading-[1.16] tracking-[-0.025em] sm:text-[2.65rem] lg:text-[3rem] xl:text-[3.2rem]">
              <span className="block lg:whitespace-nowrap">DOANH NGHIỆP ĐẦU TƯ VÀ PHÁT TRIỂN</span>
              <span className="block text-[#bfe5ff] lg:whitespace-nowrap">HỆ SINH THÁI KINH DOANH ĐA NGÀNH</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/82 sm:text-lg">
              Matrix Holding tự hào là thương hiệu tiên phong, giúp doanh nghiệp tiếp cận hệ sinh thái dịch vụ toàn diện,  mở rộng quan hệ hợp tác và tạo ra cơ hội phát triển.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#gioi-thieu"
                className="inline-flex items-center gap-3 rounded-btn bg-white px-6 py-4 text-sm font-bold text-navy transition hover:bg-[#bfe5ff]"
              >
                Khám phá Matrix Holding <ArrowRight size={18} />
              </a>
              <a
                href="#lien-he"
                className="inline-flex items-center gap-3 rounded-btn border border-white/70 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Liên hệ với chúng tôi
              </a>
            </div>
          </div>
          <div className="mt-12 grid max-w-3xl grid-cols-3 border-t border-white/30 pt-6 text-white/95">
            <div>
              <p className="text-2xl font-extrabold sm:text-3xl">06+</p>
              <p className="mt-1 text-xs leading-5 text-white/70">
                Doanh nghiệp
                <br />
                Thành viên
              </p>
            </div>
            <div className="border-x border-white/30 px-5">
              <p className="text-2xl font-extrabold sm:text-3xl">10+</p>
              <p className="mt-1 text-xs leading-5 text-white/70">
                Năm
                <br />
                Kinh nghiệm
              </p>
            </div>
            <div className="pl-5">
              <p className="text-2xl font-extrabold sm:text-3xl">1250+</p>
              <p className="mt-1 text-xs leading-5 text-white/70">
                Dự án
                <br />
                Thành công
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
              GIỚI THIỆU DOANH NGHIỆP
            </h2>
            <h2 className="mt-3 text-3xl font-extrabold text-navy">
              MATRIX HOLDING
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
              Matrix Holding là một doanh nghiệp hoạt động trong lĩnh vực đầu tư và phát triển hệ sinh thái kinh doanh đa ngành tại Việt Nam. 

              <br /><br />
              Chúng tôi tập trung xây dựng, quản lý và vận hành các nền tảng thuộc hệ sinh thái Matrix, từng bước tạo ra một môi trường kinh doanh hiệu quả, minh bạch và bền vững.
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
                Xem Hồ sơ năng lực
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
              Khám phá Hệ sinh thái kinh doanh đa ngành của chúng tôi
            </p>
          </div>
          <div className="mt-10 grid gap-7 md:grid-cols-3">
            {ecosystems.map(({ title, description, image, alt, Icon }) => (
              <article
                key={title}
                className="overflow-hidden rounded-card bg-white text-navy shadow-card"
              >
                <img
                  src={image}
                  alt={alt}
                  className="h-36 w-full object-cover"
                />
                <div className="p-5">
                  <Icon size={20} className="mb-3 text-blue-brand" />
                  <h3 className="font-extrabold">{title}</h3>
                  <p className="mt-3 text-justify text-sm leading-6 text-muted">
                    {description}
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
          </div> : <div className="mt-8 rounded-card border border-navy/10 bg-[#f6f9fd] p-8 text-sm text-muted">{newsLoaded ? "Hiện chưa có bài viết nào." : "Đang tải các bài viết mới nhất..."}</div>}
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
              <p className="mb-5 text-sm text-muted">Các vị trí dưới đây được cập nhật trực tiếp từ trang tuyển dụng.</p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {featuredJobs.map((job) => (
                  <Link key={job.id} to={`/tuyen-dung/${job.id}`} className="rounded-btn border border-navy bg-[#eaf5ff] p-4 transition hover:-translate-y-0.5 hover:bg-white">
                    <div className="flex items-start justify-between gap-3"><span className="flex h-9 w-9 items-center justify-center rounded bg-white text-blue-brand"><BriefcaseBusiness size={17} /></span><span className="rounded-btn bg-navy px-3 py-2 text-xs text-white">Xem việc làm</span></div>
                    <h3 className="mt-4 text-sm font-extrabold">MATRIX HOLDING: {job.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-muted">Phòng ban: {job.department}<br />Thu nhập: {job.salary}<br />Địa điểm: {job.location}</p>
                  </Link>
                ))}
              </div>
              {featuredJobs.length === 0 && <p className="rounded-btn bg-[#eaf5ff] p-4 text-sm text-muted">{jobsLoaded ? "Hiện chưa có vị trí tuyển dụng nào." : "Đang tải thông tin tuyển dụng..."}</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
