import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGetNews, apiGetNewsArticle, type NewsArticle } from "@/lib/api";
import { demoNews, findDemoNews } from "@/data/demoNews";
import { ArticleImage } from "@/components/ui/ArticleImage";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(
    new Date(value),
  );

export default function NewsDetail() {
  const { id = "" } = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(
    () => findDemoNews(id) ?? null,
  );
  const [related, setRelated] = useState<NewsArticle[]>([]);
  const [error, setError] = useState("");
  const isDemo = Number(id) < 0;

  useEffect(() => {
    const previewArticle = findDemoNews(id);
    if (previewArticle) {
      setArticle(previewArticle);
      setError("");
      return;
    }

    setArticle(null);
    setError("");
    apiGetNewsArticle(id)
      .then(setArticle)
      .catch(() =>
        setError("Không tìm thấy bài viết hoặc bài viết đã được lưu trữ."),
      );
  }, [id]);

  useEffect(() => {
    if (!article) return;

    const fallback = demoNews
      .filter((item) => item.id !== article.id)
      .slice(0, 3);
    apiGetNews(8, article.category)
      .then((items) => {
        const matches = items
          .filter((item) => item.id !== article.id)
          .slice(0, 3);
        setRelated(matches.length ? matches : fallback);
      })
      .catch(() => setRelated(fallback));
  }, [article?.id, article?.category]);

  if (error) {
    return (
      <main className="min-h-[55vh] bg-[#f5f8fc] px-6 py-24">
        <div className="mx-auto max-w-[760px] rounded-2xl border border-slate-200 bg-white p-9 shadow-sm">
          <p className="text-lg font-semibold text-navy">{error}</p>
          <Link
            to="/tin-tuc"
            className="mt-5 inline-flex items-center gap-2 font-bold text-blue-brand"
          >
            <ArrowLeft size={17} /> Quay lại trang tin tức
          </Link>
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[55vh] bg-[#f5f8fc] px-6 py-24 text-center text-muted">
        Đang tải bài viết...
      </div>
    );
  }

  return (
    <main className="bg-[#f5f8fc] pb-20">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1100px] px-6 pb-11 pt-10 sm:pb-14 sm:pt-14">
          <Link
            to="/tin-tuc"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-brand transition hover:text-navy"
          >
            <ArrowLeft size={16} /> Tất cả tin tức
          </Link>

          {isDemo && (
            <p className="mt-8 text-[11px] font-extrabold tracking-[.16em] text-[#a36b08]">
              NỘI DUNG MINH HỌA
            </p>
          )}
          <p
            className={`${isDemo ? "mt-2" : "mt-9"} text-xs font-extrabold tracking-[.16em] text-blue-brand`}
          >
            {article.category}
          </p>
          <h1 className="mt-4 max-w-[850px] text-3xl font-extrabold leading-[1.15] tracking-[-.025em] text-navy sm:text-5xl">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
            <span className="flex items-center gap-2">
              <CalendarDays size={16} />
              {formatDate(article.published_at)}
            </span>
            <span className="flex items-center gap-2">
              <UserRound size={16} />
              {article.author_name}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1100px] gap-10 px-6 pt-10 lg:grid-cols-[minmax(0,1fr)_285px] lg:gap-14">
        <article className="min-w-0 rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10">
          <p className="border-l-4 border-[#f6b73c] pl-5 text-lg font-semibold leading-8 text-navy sm:text-xl">
            {article.excerpt}
          </p>
          <figure className="mt-8 overflow-hidden rounded-xl border border-slate-100 bg-slate-100">
            <ArticleImage
              src={article.image_url}
              alt={article.title}
              className="aspect-[16/9] w-full object-cover"
            />
            <figcaption className="bg-white px-4 py-2.5 text-xs text-slate-500">
              Hình ảnh minh họa cho bài viết của Matrix Holding
            </figcaption>
          </figure>
          <div className="mt-8 whitespace-pre-line text-[16px] leading-8 text-slate-700 sm:text-[17px]">
            {article.content}
          </div>
          <div className="mt-10 border-t border-slate-100 pt-6">
            <Link
              to="/tin-tuc"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-brand hover:text-navy"
            >
              <ArrowLeft size={16} /> Xem thêm tin tức của Matrix Holding
            </Link>
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-lg font-extrabold text-navy">
                Tin liên quan
              </h2>
              <Link to="/tin-tuc" className="text-xs font-bold text-blue-brand">
                Xem tất cả
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={`/tin-tuc/${item.id}`}
                  className="group flex gap-3 py-4 first:pt-4 last:pb-0"
                >
                  <ArticleImage
                    src={item.image_url}
                    alt=""
                    className="h-16 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold tracking-[.1em] text-blue-brand">
                      {item.category}
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-navy transition group-hover:text-blue-brand">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[11px] text-slate-500">
                      {formatDate(item.published_at)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
