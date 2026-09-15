import { ArrowRight, CalendarDays, ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { apiGetNews, type NewsArticle } from "@/lib/api";
import { demoNews } from "@/data/demoNews";

const categories = ["Tất cả", "MATRIX NETWORK", "MATRIX COMMUNITY", "MATRIX CAPITAL"] as const;
const categoryLabel = (category: NewsArticle["category"]) => category.replace("MATRIX ", "");
const formatDate = (value: string) => new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(value));

function ArticleMeta({ article }: { article: NewsArticle }) {
  return <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold tracking-[.08em] text-[#54708d]"><span className="text-blue-brand">{categoryLabel(article.category)}</span><span className="h-1 w-1 rounded-full bg-slate-300" /><span className="inline-flex items-center gap-1"><CalendarDays size={13} />{formatDate(article.published_at)}</span></p>;
}

export default function NewsList() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("Tất cả");
  const [query, setQuery] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { apiGetNews(30).then((items) => setArticles(items.length ? items : demoNews)).catch(() => setArticles(demoNews)).finally(() => setLoaded(true)); }, []);
  const usingDemoData = articles.some((article) => article.id < 0);
  const visibleArticles = useMemo(() => articles.filter((article) => {
    const matchesCategory = activeCategory === "Tất cả" || article.category === activeCategory;
    const searchable = `${article.title} ${article.excerpt} ${article.category}`.toLocaleLowerCase("vi-VN");
    return matchesCategory && searchable.includes(query.trim().toLocaleLowerCase("vi-VN"));
  }), [articles, activeCategory, query]);
  const featured = visibleArticles[0];
  const latest = visibleArticles.slice(1, 4);
  const moreArticles = visibleArticles.slice(4);

  return <main className="bg-[#f5f8fc] pb-20 pt-12 sm:pt-16"><div className="mx-auto max-w-[1240px] px-5 sm:px-7">
    <div className="border-b border-[#dbe5ef] pb-9 sm:flex sm:items-end sm:justify-between sm:gap-8"><div><p className="text-xs font-extrabold tracking-[.2em] text-blue-brand">MATRIX HOLDING · INSIGHTS</p><h1 className="mt-3 text-4xl font-extrabold tracking-[-.035em] text-navy sm:text-5xl">Tin tức & góc nhìn</h1><p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">Những câu chuyện, hoạt động và góc nhìn phát triển từ hệ sinh thái Matrix Holding.</p></div><Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-navy transition hover:text-blue-brand sm:mt-0">Trang chủ <ChevronRight size={17} /></Link></div>
    <div className="mt-7 flex flex-col gap-4 border-y border-[#dbe5ef] py-4 lg:flex-row lg:items-center lg:justify-between"><nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Danh mục tin tức">{categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`border-b-2 py-2 text-xs font-extrabold tracking-[.03em] transition ${activeCategory === category ? "border-blue-brand text-navy" : "border-transparent text-[#708298] hover:text-navy"}`}>{category}</button>)}</nav><label className="flex h-10 w-full items-center gap-2 border-b border-[#bbc9d8] text-[#60738a] lg:w-72"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm trong chuyên mục" className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-[#8c9aac]" /></label></div>
    {usingDemoData && <div className="mt-5 flex items-center gap-2 text-xs text-[#61758e]"><span className="h-2 w-2 rounded-full bg-[#d7a831]" />Đang hiển thị nội dung minh họa; bài viết thật từ quản trị sẽ thay thế tự động.</div>}
    {!loaded && <div className="py-20 text-center text-muted">Đang tải tin tức...</div>}
    {loaded && visibleArticles.length === 0 && <div className="py-20 text-center"><p className="text-lg font-bold text-navy">Không tìm thấy bài viết phù hợp</p><p className="mt-2 text-sm text-muted">Thử một từ khóa hoặc chuyên mục khác.</p></div>}
    {featured && <><section className="mt-9 grid gap-7 lg:grid-cols-[minmax(0,1.55fr)_minmax(290px,.75fr)] lg:gap-10"><Link to={`/tin-tuc/${featured.id}`} className="group relative min-h-[430px] overflow-hidden rounded-[2px] bg-navy sm:min-h-[500px]"><img src={featured.image_url} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#041b36] via-[#082443]/55 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 sm:p-10"><ArticleMeta article={featured} /><h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-[1.13] tracking-[-.03em] text-white sm:text-4xl">{featured.title}</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-[#e2edf8] sm:text-[15px]">{featured.excerpt}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-white">Đọc bài viết <ArrowRight size={17} /></span></div></Link><aside className="border-t-2 border-navy lg:border-t-0 lg:border-l lg:border-[#cfdae6] lg:pl-7"><div className="flex items-center justify-between pt-4 lg:pt-1"><h2 className="text-xl font-extrabold text-navy">Mới nhất</h2><span className="text-xs font-bold text-[#718297]">CẬP NHẬT</span></div><div className="mt-3 divide-y divide-[#dbe4ed]">{latest.map((article) => <Link key={article.id} to={`/tin-tuc/${article.id}`} className="group block py-5 first:pt-4"><ArticleMeta article={article} /><h3 className="mt-2 text-[17px] font-bold leading-snug text-navy transition group-hover:text-blue-brand">{article.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{article.excerpt}</p></Link>)}</div></aside></section>
      <section className="mt-14"><div className="flex items-end justify-between border-b border-[#d6e0e9] pb-4"><div><p className="text-xs font-extrabold tracking-[.16em] text-blue-brand">TIN ĐỌC TIẾP</p><h2 className="mt-2 text-2xl font-extrabold tracking-[-.02em] text-navy">Câu chuyện từ Matrix</h2></div><span className="hidden text-xs font-bold text-[#718297] sm:block">{visibleArticles.length} BÀI VIẾT</span></div>{moreArticles.length > 0 ? <div className="grid gap-x-7 gap-y-10 pt-7 sm:grid-cols-2 lg:grid-cols-3">{moreArticles.map((article) => <Link key={article.id} to={`/tin-tuc/${article.id}`} className="group"><div className="aspect-[1.55] overflow-hidden bg-[#dae5ef]"><img src={article.image_url} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><div className="pt-4"><ArticleMeta article={article} /><h3 className="mt-2 text-xl font-extrabold leading-snug text-navy transition group-hover:text-blue-brand">{article.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{article.excerpt}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-brand">Xem chi tiết <ArrowRight size={16} /></span></div></Link>)}</div> : <p className="py-10 text-sm text-muted">Chuyên mục này hiện chưa có thêm bài viết.</p>}</section></>}
  </div></main>;
}
