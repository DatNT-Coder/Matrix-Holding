import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGetNewsArticle, type NewsArticle } from "@/lib/api";

export default function NewsDetail() {
  const { id = "" } = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { apiGetNewsArticle(id).then(setArticle).catch(() => setError("Không tìm thấy bài viết.")); }, [id]);
  if (error) return <div className="mx-auto max-w-[900px] px-6 py-24"><p className="text-lg text-red-600">{error}</p><Link to="/tin-tuc" className="mt-5 inline-block font-bold text-blue-brand">Quay lại tin tức</Link></div>;
  if (!article) return <div className="mx-auto max-w-[900px] px-6 py-24 text-muted">Đang tải bài viết...</div>;
  return <article className="bg-white pb-20"><div className="mx-auto max-w-[900px] px-6 pt-14"><Link to="/tin-tuc" className="inline-flex items-center gap-2 text-sm font-bold text-blue-brand"><ArrowLeft size={16} />Tất cả tin tức</Link><p className="mt-8 text-xs font-bold tracking-[.18em] text-blue-brand">TIN TỨC MATRIX HOLDING</p><h1 className="mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-5xl">{article.title}</h1><div className="mt-6 flex flex-wrap gap-5 text-sm text-muted"><span className="flex items-center gap-2"><CalendarDays size={16} />{new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(new Date(article.published_at))}</span><span className="flex items-center gap-2"><UserRound size={16} />{article.author_name}</span></div></div><img src={article.image_url} alt="" className="mx-auto mt-10 h-[260px] w-full max-w-[1120px] object-cover sm:h-[480px]" /><div className="mx-auto max-w-[760px] px-6 pt-10"><p className="text-xl font-semibold leading-8 text-navy">{article.excerpt}</p><div className="mt-7 whitespace-pre-line text-base leading-8 text-muted">{article.content}</div></div></article>;
}
