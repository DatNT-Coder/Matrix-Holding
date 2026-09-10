import { ArrowLeft, BriefcaseBusiness, CheckCircle2, MapPin, WalletCards } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiApplyJob, apiGetJob, apiUploadCV, type Job } from "@/lib/api";

const initialForm = { full_name: "", email: "", phone: "", cv_url: "", experience: "", cover_letter: "" };

export default function JobDetail() {
  const { id = "" } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState(initialForm);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { apiGetJob(id).then(setJob).catch(() => setError("Không tìm thấy tin tuyển dụng.")); }, [id]);
  if (error && !job) return <div className="mx-auto max-w-[1000px] px-6 py-20 text-red-600">{error}</div>;
  if (!job) return <div className="px-6 py-20 text-center text-muted">Đang tải thông tin việc làm...</div>;

  const apply = async (event: React.FormEvent) => {
    event.preventDefault(); setError("");
    if (!cvFile) { setError("Vui lòng chọn file CV PDF, DOC hoặc DOCX."); return; }
    setSubmitting(true);
    try { const cv = await apiUploadCV(cvFile); await apiApplyJob(id, { ...form, cv_url: cv.url }); setSuccess("Hồ sơ đã được gửi đến Matrix Holding. HR sẽ liên hệ với bạn nếu hồ sơ phù hợp."); }
    catch (err) { setError(err instanceof Error ? err.message : "Không thể nộp hồ sơ."); }
    finally { setSubmitting(false); }
  };

  return <div className="bg-[#f4f7fb] py-10 sm:py-14"><div className="mx-auto grid max-w-[1120px] gap-7 px-6 lg:grid-cols-[1.3fr_.7fr]"><main><Link to="/tuyen-dung" className="inline-flex items-center gap-2 text-sm font-bold text-blue-brand"><ArrowLeft size={16} />Tất cả việc làm</Link><article className="mt-5 rounded-2xl bg-white p-6 shadow-sm sm:p-9"><span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#eaf5ff] text-blue-brand"><BriefcaseBusiness size={27} /></span><h1 className="mt-6 text-3xl font-extrabold text-navy">{job.title}</h1><p className="mt-2 font-bold text-blue-brand">MATRIX HOLDING · {job.department}</p><div className="mt-6 flex flex-wrap gap-5 text-sm text-muted"><span className="flex items-center gap-2"><MapPin size={17} />{job.location}</span><span className="flex items-center gap-2"><WalletCards size={17} />{job.salary}</span><span>{job.employment_type}</span></div><section className="mt-10"><h2 className="text-xl font-extrabold text-navy">Mô tả công việc</h2><p className="mt-4 whitespace-pre-line leading-8 text-muted">{job.description}</p></section><section className="mt-8"><h2 className="text-xl font-extrabold text-navy">Yêu cầu ứng viên</h2><p className="mt-4 whitespace-pre-line leading-8 text-muted">{job.requirements}</p></section></article></main><aside className="h-fit rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-xl font-extrabold text-navy">Ứng tuyển ngay</h2><p className="mt-2 text-sm leading-6 text-muted">Không cần tạo tài khoản. HR sẽ xem hồ sơ và liên hệ trực tiếp khi phù hợp.</p>{success ? <p className="mt-5 flex gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700"><CheckCircle2 size={18} />{success}</p> : <form onSubmit={apply} className="mt-5 space-y-4"><input required placeholder="Họ và tên" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" /><input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" /><input required placeholder="Số điện thoại" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" /><label className="block rounded-xl border border-dashed border-blue-brand/40 bg-[#f7fbff] px-4 py-3 text-sm font-bold text-navy">Tải CV lên <span className="font-normal text-muted">(PDF, DOC, DOCX · tối đa 5 MB)</span><input required type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => setCvFile(e.target.files?.[0] ?? null)} className="mt-2 block w-full text-xs font-normal text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-navy file:px-3 file:py-2 file:text-xs file:font-bold file:text-white" />{cvFile && <span className="mt-2 block text-xs font-normal text-blue-brand">Đã chọn: {cvFile.name}</span>}</label><textarea placeholder="Kinh nghiệm nổi bật (không bắt buộc)" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="min-h-20 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" /><textarea required minLength={20} placeholder="Giới thiệu ngắn về bạn" value={form.cover_letter} onChange={(e) => setForm({ ...form, cover_letter: e.target.value })} className="min-h-28 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />{error && <p className="text-sm text-red-600">{error}</p>}<button disabled={submitting} className="w-full rounded-btn bg-blue-brand py-3.5 text-sm font-extrabold text-white disabled:opacity-60">{submitting ? "Đang gửi hồ sơ..." : "Gửi hồ sơ ứng tuyển"}</button></form>}</aside></div></div>;
}
