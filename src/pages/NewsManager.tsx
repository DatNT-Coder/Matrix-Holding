import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  apiCreateNews,
  getStoredUser,
  type NewsArticlePayload,
} from "@/lib/api";

const empty: NewsArticlePayload = {
  title: "",
  excerpt: "",
  content: "",
  image_url: "/images/matrix-interior-lounge.png",
  category: "MATRIX NETWORK",
};

export default function NewsManager() {
  const user = getStoredUser();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  if (!user) return <Navigate to="/dang-nhap" replace />;
  if (!["DIRECTOR", "HR"].includes(user.role))
    return <Navigate to="/" replace />;
  const update = (key: keyof NewsArticlePayload, value: string) =>
    setForm({ ...form, [key]: value });
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const article = await apiCreateNews(form);
      navigate(`/tin-tuc/${article.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể đăng bài.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#f6f9fd] py-12">
      <form
        onSubmit={submit}
        className="mx-auto max-w-[860px] rounded-3xl bg-white p-6 shadow-card sm:p-10"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-brand"
        >
          <ArrowLeft size={16} />
          Quay lại
        </button>
        <p className="mt-8 text-xs font-bold tracking-[.18em] text-blue-brand">
          QUẢN TRỊ NỘI DUNG
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-navy">
          Tạo bài viết mới
        </h1>
        <p className="mt-3 text-sm text-muted">
          Bài viết sẽ hiển thị ngay trong mục Tin tức sau khi đăng.
        </p>
        {error && (
          <p className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </p>
        )}
        <div className="mt-8 space-y-5">
          <label className="block text-sm font-bold text-navy">
            Tiêu đề
            <input
              required
              minLength={8}
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-brand"
            />
          </label>
          <label className="block text-sm font-bold text-navy">
            Category
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-brand"
            >
              <option>MATRIX NETWORK</option>
              <option>MATRIX COMMUNITY</option>
              <option>MATRIX CAPITAL</option>
            </select>
          </label>
          <label className="block text-sm font-bold text-navy">
            Tóm tắt
            <textarea
              required
              minLength={20}
              value={form.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              className="mt-2 min-h-24 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-brand"
            />
          </label>
          <label className="block text-sm font-bold text-navy">
            Nội dung
            <textarea
              required
              minLength={50}
              value={form.content}
              onChange={(e) => update("content", e.target.value)}
              className="mt-2 min-h-56 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-brand"
            />
          </label>
          <label className="block text-sm font-bold text-navy">
            Đường dẫn ảnh
            <input
              value={form.image_url}
              onChange={(e) => update("image_url", e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-brand"
            />
          </label>
        </div>
        <button
          disabled={saving}
          className="mt-8 inline-flex items-center gap-2 rounded-btn bg-navy px-6 py-3.5 text-sm font-bold text-white disabled:opacity-60"
        >
          {saving && <Loader2 size={17} className="animate-spin" />}
          {saving ? "Đang đăng..." : "Đăng bài viết"}
        </button>
      </form>
    </div>
  );
}
