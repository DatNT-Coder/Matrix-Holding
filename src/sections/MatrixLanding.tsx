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
import { JOB_CATEGORY_FILTERS } from "@/data/jobCategories";

const images = {
  house: "/images/home-villa-v2.png",
  interior: "/images/home-about-v2.png",
  documents: "/images/matrix-interior-lounge.png",
  stones: "/images/matrix-hero-villa.png",
};

const ecosystems = [
  {
    title: "MATRIX NETWORK",
    member: "— Thành viên của Matrix Holding",
    description:
      "Đảm nhiệm vai trò xây dựng, quản lý và điều phối các đơn vị cung cấp dịch vụ cho doanh nghiệp.",
    image: "/images/home-cafe-v2.png",
    alt: "Hệ sinh thái dịch vụ Matrix Network",
    Icon: Building2,
  },
  {
    title: "MATRIX COMMUNITY",
    member: "— Thành viên của Matrix Holding",
    description:
      "Đảm nhiệm vai trò xây dựng, quản lý và điều phối các cộng đồng kết nối kinh doanh cho doanh nghiệp.",
    image: "/images/home-cafe-v2.png",
    alt: "Hệ sinh thái cộng đồng Matrix Community",
    Icon: UsersRound,
  },
  {
    title: "MATRIX CAPITAL",
    member: "— Thành viên của Matrix Holding",
    description:
      "Đảm nhiệm vai trò xây dựng, quản lý và điều phối các cộng đồng kết nối đầu tư cho doanh nghiệp.",
    image: "/images/home-cafe-v2.png",
    alt: "Hệ sinh thái đầu tư Matrix Capital",
    Icon: BriefcaseBusiness,
  },
] as const;

const hasNoRequirement = (value?: string | null) => {
  const normalized = value?.trim().toLocaleLowerCase("vi") ?? "";
  return !normalized || normalized.startsWith("không yêu cầu");
};

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
      <section className="relative h-[100svh] min-h-[650px] overflow-hidden bg-[#001a3b] text-white">
        <img
          src={images.house}
          alt="Không gian hiện đại của Matrix Holding"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/35 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-[1220px] items-center justify-center px-6 pb-8 pt-28 sm:px-8">
          <div className="mx-auto w-full max-w-5xl text-center">
            <div className="mb-7 flex items-center justify-center gap-5">
              <span className="h-px w-12 bg-white/80 sm:w-16" />
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/90 sm:text-sm">
                Matrix Holding · Vietnam
              </p>
              <span className="h-px w-12 bg-white/80 sm:w-16" />
            </div>
            <h1 className="text-4xl font-bold leading-[1.12] tracking-[-0.035em] sm:text-5xl lg:text-6xl xl:text-[4.5rem]">
              <span className="block lg:whitespace-nowrap">
                KIẾN TẠO HỆ SINH THÁI
              </span>
              <span className="mt-2 block text-white lg:whitespace-nowrap">
                KINH DOANH ĐA NGÀNH
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
              Chúng tôi tập trung xây dựng một môi trường kinh doanh hiệu quả,
              nơi các doanh nghiệp có thể tiếp cận với nhiều nguồn lực và mở ra
              cơ hội tiếp cận thị trường bền vững.
            </p>
            <div className="mt-10 flex justify-center">
              <a
                href="#gioi-thieu"
                className="inline-flex min-w-56 items-center justify-center gap-3 rounded-btn bg-white px-7 py-4 text-sm font-bold text-navy shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:bg-[#bfe5ff]"
              >
                Khám phá Matrix Holding
              </a>
            </div>
          </div>
        </div>
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
              Matrix Holding là doanh nghiệp hoạt động trong lĩnh vực đầu tư và phát triển hệ sinh thái kinh doanh đa ngành tại Việt Nam. Hướng đến mục tiêu đưa các doanh nghiệp tiềm năng trở thành kỳ lân trong lĩnh vực, chúng tôi cam kết sẽ không ngừng nỗ lực, phát huy sự sáng tạo nhằm đưa ra giải pháp phù hợp với nhu cầu của từng doanh nghiệp.
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

      <section id="he-sinh-thai" className="bg-[#efefef] py-20 text-[#111111]">
        <div className="mx-auto max-w-[1220px] px-6">
          <div className="text-center">
            <p className="text-sm font-extrabold text-[#444444]">LĨNH VỰC HOẠT ĐỘNG</p>
            <h2 className="mt-3 text-3xl font-extrabold">
              HỆ SINH THÁI CỦA MATRIX HOLDING
            </h2>
            <p className="mt-4 text-sm text-[#444444]">
              Khám phá hệ sinh thái kinh doanh của Matrix Holding
            </p>
          </div>
          <div className="mt-10 grid gap-7 md:grid-cols-3">
            {ecosystems.map(
              ({ title, member, description, image, alt }) => (
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
                    <h3 className="font-extrabold">{title}</h3>
                    <p className="mt-3 text-sm font-medium text-slate-600">
                      {member}
                    </p>
                    <p className="mt-3 text-justify text-sm leading-6 text-muted">
                      {description}
                    </p>
                    <a
                      href="/he-sinh-thai"
                      className="mt-4 flex items-center gap-1 border-t border-navy/40 pt-3 text-sm font-bold uppercase"
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
              <p className="text-sm font-extrabold text-blue-brand">
                TIN TỨC VÀ SỰ KIỆN
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-navy">
                TIN TỨC MỚI NHẤT TỪ MATRIX HOLDING
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
                    XEM BÀI VIẾT <ArrowRight size={16} />
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
                        Xem bài viết <ArrowRight size={13} />
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

      <section id="tuyen-dung" className="bg-[#efefef] py-20">
        <div className="mx-auto max-w-[1220px] px-6">
            <div className="mb-9 text-[#111111]">
              <div>
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[.08em] text-[#444444]">
                    THÔNG TIN TUYỂN DỤNG
                  </p>
                  <h2 className="mt-3 text-2xl font-extrabold text-[#111111] sm:text-3xl">
                    VIỆC LÀM MỚI NHẤT TỪ MATRIX HOLDING
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Khám phá cơ hội nghề nghiệp tại các doanh nghiệp trong hệ
                    sinh thái Matrix.
                  </p>
                </div>
              </div>
            </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="relative flex min-h-[140px] items-center overflow-hidden bg-[#03172e] px-6 py-7 sm:px-9">
              <img src="/images/home-office-v2.png" alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#03172e] via-[#03172e]/70 to-transparent" />
              <img src="/images/logo-mark.png" alt="Matrix Holding" className="relative ml-auto h-14 w-14 object-contain brightness-0 invert sm:h-20 sm:w-20" />
            </div>
            <div className="border-b border-slate-100 bg-white px-4 py-4 sm:px-6">
              <div className="flex flex-wrap gap-2">
                {JOB_CATEGORY_FILTERS.map((filter) => (
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
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                  <Link
                    to={`/tuyen-dung/${featuredCompanyJob.id}`}
                    className="group relative min-h-[320px] overflow-hidden rounded-xl bg-[#092e56] p-6 text-white sm:row-span-2"
                  >
                    <img
                      src="/images/home-office-v2.png"
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(2,15,30,.38),rgba(2,15,30,.84))]" />
                    <div className="relative flex h-full flex-col items-center justify-center text-center">
                      <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-xl bg-white p-2 shadow-lg">
                        <img
                          src={
                            featuredCompanyJob.company_logo ||
                            "/images/logo-mark.png"
                          }
                          alt=""
                          className="h-full w-full object-contain"
                        />
                      </span>
                      <h3 className="mt-5 max-w-[240px] text-base font-extrabold uppercase leading-6 text-white">
                        CÔNG TY TNHH MATRIX HOLDING
                      </h3>
                      <p className="text-sm font-extrabold uppercase text-white">THÔNG BÁO TUYỂN DỤNG</p>
                      <span className="mt-5 inline-flex items-center gap-2 rounded-lg bg-black/75 px-4 py-2 text-xs font-bold text-white shadow-sm">
                        <BriefcaseBusiness size={14} /> {visibleFeaturedJobs.length} việc làm
                      </span>
                      <span className="mt-3 rounded-lg bg-[#ffe600] px-5 py-2 text-xs font-extrabold text-[#17213a] shadow-sm">Pro Company</span>
                      <span className="mt-3 inline-flex items-center justify-center rounded-lg bg-white px-5 py-2 text-xs font-extrabold text-navy shadow-sm transition group-hover:bg-[#eef6ff]">
                        Đăng ký ngay
                      </span>
                    </div>
                  </Link>

                  <div className="contents">
                    {visibleFeaturedJobs.slice(0, 7).map((job) => (
                      <Link
                        key={job.id}
                        to={`/tuyen-dung/${job.id}`}
                        className="group rounded-xl border border-[#dedfe1] bg-[#eeeef0] p-4 transition hover:-translate-y-0.5 hover:border-[#9baabd] hover:bg-[#e4e8ee] hover:shadow-lg"
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
                            <p className="line-clamp-2 text-xs font-extrabold uppercase tracking-[.02em] text-navy">
                              {job.company_name || "Matrix Holding"}
                            </p>
                            <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-[#60758b]">
                              {job.department}
                            </p>
                          </div>
                        </div>
                        <h3 className="mt-3 line-clamp-2 text-[13px] font-extrabold uppercase leading-5 text-navy transition group-hover:text-blue-brand">
                          {job.title}
                        </h3>
                        <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] leading-4 text-[#465569]">
                          {[
                            { label: "Hình thức", value: job.employment_type },
                            { label: "Lương", value: job.salary },
                            { label: "Khu vực", value: job.location },
                            {
                              label: "Kinh nghiệm",
                              value: job.experience_required,
                              emptyText: "Không yêu cầu kinh nghiệm",
                            },
                            {
                              label: "Bằng cấp",
                              value: job.education_required,
                              emptyText: "Không yêu cầu bằng cấp",
                            },
                          ].map(({ label, value, emptyText }) => (
                            <span key={label} className="rounded-full bg-white px-2.5 py-1">
                              {emptyText && hasNoRequirement(value) ? (
                                emptyText
                              ) : (
                                <>
                                  <strong className="font-extrabold text-navy">{label}:</strong>{" "}
                                  {value}
                                </>
                              )}
                            </span>
                          ))}
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
