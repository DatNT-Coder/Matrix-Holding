import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGetJobs, apiGetNews, type Job, type NewsArticle } from "@/lib/api";
import { ArticleImage } from "@/components/ui/ArticleImage";

const images = {
  house: "/images/matrix-hero-villa.png",
  interior: "/images/matrix-interior-lounge.png",
  documents: "/images/matrix-interior-lounge.png",
  stones: "/images/matrix-hero-villa.png",
};

const ecosystems = [
  {
    title: "MATRIX NETWORK",
    member: "Thương hiệu thành viên thuộc MATRIX HOLDING",
    description:
      "Đảm nhiệm vai trò xây dựng, quản lý và điều phối các đơn vị cung cấp dịch vụ cho doanh nghiệp.",
    image: "/images/matrix-network.png",
    alt: "Hệ sinh thái dịch vụ Matrix Network",
    Icon: Building2,
  },
  {
    title: "MATRIX COMMUNITY",
    member: "Thương hiệu thành viên thuộc MATRIX HOLDING",
    description:
      "Đảm nhiệm vai trò xây dựng, quản lý và điều phối các cộng đồng kết nối kinh doanh cho doanh nghiệp.",
    image: "/images/matrix-community.png",
    alt: "Hệ sinh thái cộng đồng Matrix Community",
    Icon: UsersRound,
  },
  {
    title: "MATRIX CAPITAL",
    member: "Thương hiệu thành viên thuộc MATRIX HOLDING",
    description:
      "Đảm nhiệm vai trò xây dựng, quản lý và điều phối các cộng đồng kết nối đầu tư cho doanh nghiệp.",
    image: "/images/matrix-capital.png",
    alt: "Hệ sinh thái đầu tư Matrix Capital",
    Icon: BriefcaseBusiness,
  },
] as const;

const recruitmentFilters = [
  "Tất cả",
  "Kinh doanh",
  "Nhân sự",
  "Truyền thông",
  "Hành chính",
  "Pháp chế",
];

export function MatrixLanding() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [recruitmentFilter, setRecruitmentFilter] = useState("Tất cả");
  const [newsLoaded, setNewsLoaded] = useState(false);
  const [jobsLoaded, setJobsLoaded] = useState(false);
  useEffect(() => {
    apiGetNews(4)
      .then(setArticles)
      .catch(() => setArticles([]))
      .finally(() => setNewsLoaded(true));
    apiGetJobs()
      .then((jobs) => setFeaturedJobs(jobs.slice(0, 7)))
      .catch(() => setFeaturedJobs([]))
      .finally(() => setJobsLoaded(true));
  }, []);

  const visibleFeaturedJobs =
    recruitmentFilter === "Tất cả"
      ? featuredJobs
      : featuredJobs.filter((job) => job.department === recruitmentFilter);
  const featuredCompanyJob = visibleFeaturedJobs[0];

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
              <span className="block lg:whitespace-nowrap">
                KIẾN TẠO HỆ SINH THÁI
              </span>
              <span className="block text-[#bfe5ff] lg:whitespace-nowrap">
                KINH DOANH ĐA NGÀNH.
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/82 sm:text-lg">
              Chúng tôi tập trung xây dựng một môi trường kinh doanh hiệu quả,
              nơi các doanh nghiệp có thể tiếp cận với nhiều nguồn lực và mở ra
              cơ hội tiếp cận thị trường bền vững.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#gioi-thieu"
                className="inline-flex items-center gap-3 rounded-btn bg-white px-6 py-4 text-sm font-bold text-navy transition hover:bg-[#bfe5ff]"
              >
                Khám phá Matrix Holding <ArrowRight size={18} />
              </a>
              <Link
                to="/lien-he"
                className="inline-flex items-center gap-3 rounded-btn border border-white/70 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Liên hệ với chúng tôi
              </Link>
            </div>
          </div>
          <div className="mt-12 grid max-w-3xl grid-cols-3 border-t border-white/30 pt-6 text-white/95">
            <div>
              <p className="text-2xl font-extrabold sm:text-3xl">06 +</p>
              <p className="mt-1 text-xs leading-5 text-white/70">
                Doanh nghiệp
                <br />
                Thành viên
              </p>
            </div>
            <div className="border-x border-white/30 px-5">
              <p className="text-2xl font-extrabold sm:text-3xl">10 +</p>
              <p className="mt-1 text-xs leading-5 text-white/70">
                Năm
                <br />
                Kinh nghiệm
              </p>
            </div>
            <div className="pl-5">
              <p className="text-2xl font-extrabold sm:text-3xl">1250 +</p>
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
            <p className="mt-5 max-w-xl text-justify text-sm leading-7 text-muted">
              Matrix Holding là doanh nghiệp hoạt động trong lĩnh vực đầu tư và phát triển hệ sinh thái kinh doanh đa ngành tại Việt Nam. Với khát vọng đưa các doanh nghiệp tiềm năng trở thành kỳ lân trong lĩnh vực, chúng tôi cam kết sẽ không ngừng nỗ lực, phát huy sự sáng tạo và kiến tạo những giải pháp phù hợp với nhu cầu của từng doanh nghiệp.
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
            className="h-[420px] w-full rounded-card object-cover lg:h-[460px]"
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
              Khám phá hệ sinh thái kinh doanh đa ngành của chúng tôi
            </p>
          </div>
          <div className="mt-10 grid gap-7 md:grid-cols-3">
            {ecosystems.map(
              ({ title, member, description, image, alt, Icon }) => (
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
                    <p className="mt-3 inline-flex rounded-full bg-[#eaf5ff] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-blue-brand">
                      {member}
                    </p>
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
              ),
            )}
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
            <Link
              to="/tin-tuc"
              className="hidden items-center gap-3 rounded-btn bg-navy px-5 py-3 text-sm font-semibold text-white sm:inline-flex"
            >
              Xem tất cả <ArrowRight size={17} />
            </Link>
          </div>
          {articles.length > 0 ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
              <Link
                to={`/tin-tuc/${articles[0].id}`}
                className="group relative min-h-[340px] overflow-hidden rounded-card bg-navy text-white"
              >
                <ArticleImage
                  src={articles[0].image_url}
                  alt={articles[0].title}
                  className="absolute inset-0 h-full w-full object-cover opacity-65"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                <div className="absolute bottom-0 p-7">
                  <p className="text-xs">
                    {new Intl.DateTimeFormat("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }).format(new Date(articles[0].published_at))}
                  </p>
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
                  <Link
                    key={article.id}
                    to={`/tin-tuc/${article.id}`}
                    className="flex gap-4 py-3 first:pt-0"
                  >
                    <ArticleImage
                      src={article.image_url}
                      alt={article.title}
                      className="h-24 w-32 rounded-btn object-cover"
                    />
                    <div>
                      <p className="text-xs text-muted">
                        {new Intl.DateTimeFormat("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }).format(new Date(article.published_at))}
                      </p>
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
            </div>
          ) : (
            <div className="mt-8 rounded-card border border-navy/10 bg-[#f6f9fd] p-8 text-sm text-muted">
              {newsLoaded
                ? "Hiện chưa có bài viết nào."
                : "Đang tải các bài viết mới nhất..."}
            </div>
          )}
        </div>
      </section>

      <section id="tuyen-dung" className="bg-[#f4f8fc] py-20">
        <div className="mx-auto max-w-[1220px] px-6">
          <div className="overflow-hidden rounded-[1.75rem] bg-[#082d57] text-white shadow-[0_18px_45px_rgba(6,39,75,.16)]">
            <div className="relative min-h-[150px] overflow-hidden px-7 py-8 sm:px-10">
              <img
                src={images.stones}
                alt="Cơ hội nghề nghiệp tại Matrix Holding"
                className="absolute inset-0 h-full w-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#082d57_0%,rgba(8,45,87,.92)_43%,rgba(8,45,87,.3)_100%)]" />
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.18em] text-[#bfe5ff]">
                    THÔNG TIN TUYỂN DỤNG
                  </p>
                  <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                    THÔNG TIN VIỆC LÀM NỔI BẬT
                  </h2>
                  <p className="mt-2 text-sm text-white/75">
                    Khám phá cơ hội nghề nghiệp tại các doanh nghiệp trong hệ
                    sinh thái Matrix.
                  </p>
                </div>
                <Link
                  to="/tuyen-dung"
                  className="inline-flex w-fit items-center gap-2 rounded-xl bg-yellow-brand px-5 py-3 text-sm font-bold text-navy transition hover:bg-[#ffe07c]"
                >
                  Xem tất cả việc làm <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            <div className="border-t border-white/10 bg-white px-4 py-4 sm:px-6">
              <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {recruitmentFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setRecruitmentFilter(filter)}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${recruitmentFilter === filter ? "bg-navy text-white shadow-sm" : "bg-[#eef4fa] text-[#3e5975] hover:bg-[#dcebf8]"}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 text-navy sm:p-6">
              {featuredCompanyJob ? (
                <div className="grid gap-4 lg:grid-cols-[.78fr_1.22fr]">
                  <Link
                    to={`/tuyen-dung/${featuredCompanyJob.id}`}
                    className="group relative min-h-[290px] overflow-hidden rounded-2xl bg-[#092e56] p-6 text-white"
                  >
                    <img
                      src={featuredCompanyJob.company_logo || images.interior}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-20 transition duration-500 group-hover:scale-105 group-hover:opacity-30"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(2,27,55,.96),rgba(6,61,105,.74))]" />
                    <div className="relative flex h-full flex-col items-start">
                      <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-white p-2 shadow-lg">
                        <img
                          src={
                            featuredCompanyJob.company_logo ||
                            "/images/logo-mark.png"
                          }
                          alt=""
                          className="h-full w-full object-contain"
                        />
                      </span>
                      <p className="mt-5 text-xs font-bold uppercase tracking-[.16em] text-[#bfe5ff]">
                        DOANH NGHIỆP NỔI BẬT
                      </p>
                      <h3 className="mt-2 text-xl font-extrabold">
                        {featuredCompanyJob.company_name || "Matrix Holding"}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/75">
                        {featuredCompanyJob.company_summary ||
                          "Cơ hội phát triển cùng hệ sinh thái doanh nghiệp Matrix Holding."}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-yellow-brand">
                        Xem vị trí đang tuyển <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {visibleFeaturedJobs.slice(1, 7).map((job) => (
                      <Link
                        key={job.id}
                        to={`/tuyen-dung/${job.id}`}
                        className="group rounded-2xl border border-[#d8e5f0] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#6daddd] hover:shadow-[0_10px_24px_rgba(15,67,112,.1)]"
                      >
                        <div className="flex items-start gap-3">
                          <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-[#e1eaf2] bg-white p-1.5">
                            <img
                              src={job.company_logo || "/images/logo-mark.png"}
                              alt=""
                              className="h-full w-full object-contain"
                            />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-bold uppercase tracking-[.04em] text-blue-brand">
                              {job.company_name || "Matrix Holding"}
                            </p>
                            <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-[#60758b]">
                              {job.department}
                            </p>
                          </div>
                        </div>
                        <h3 className="mt-4 line-clamp-2 text-[15px] font-extrabold leading-5 text-navy transition group-hover:text-blue-brand">
                          {job.title}
                        </h3>
                        <div className="mt-3 flex items-center justify-between gap-2 text-xs text-[#657a8f]">
                          <span className="truncate">{job.location}</span>
                          <span className="inline-flex shrink-0 items-center gap-1 font-bold text-[#3f6586]">
                            <BriefcaseBusiness size={13} />
                            Xem việc
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-[#f4f8fc] px-6 py-12 text-center">
                  <BriefcaseBusiness
                    className="mx-auto text-[#9ab2c8]"
                    size={34}
                  />
                  <p className="mt-4 font-bold text-navy">
                    {jobsLoaded
                      ? "Hiện chưa có vị trí tuyển dụng nào."
                      : "Đang tải thông tin tuyển dụng..."}
                  </p>
                  <Link
                    to="/tuyen-dung"
                    className="mt-4 inline-flex text-sm font-bold text-blue-brand hover:text-navy"
                  >
                    Xem trang tuyển dụng{" "}
                    <ArrowRight className="ml-1" size={16} />
                  </Link>
                </div>
              )}
              {featuredCompanyJob && (
                <div className="mt-5 flex items-center justify-between border-t border-[#e5edf4] pt-4">
                  <p className="text-xs text-[#687d91]">
                    Các tin tuyển dụng được cập nhật trực tiếp từ hệ thống tuyển
                    dụng.
                  </p>
                  <Link
                    to="/tuyen-dung"
                    className="hidden items-center gap-1 text-sm font-bold text-blue-brand hover:text-navy sm:inline-flex"
                  >
                    Khám phá tất cả <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
