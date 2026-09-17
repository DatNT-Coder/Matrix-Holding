import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Heart,
  MapPin,
  Send,
  WalletCards,
  X,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiApplyJob, apiGetCandidateProfile, apiGetJob, apiUploadCV, getStoredUser, type Job } from "@/lib/api";

const initialForm = { full_name: "", email: "", phone: "", cv_url: "", experience: "", cover_letter: "" };
const formatDeadline = (value: string | null) => value ? new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(new Date(value)) : "Liên hệ để biết thêm";

export default function JobDetail() {
  const { id = "" } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState(initialForm);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [savedCvUrl, setSavedCvUrl] = useState("");
  const user = getStoredUser();

  useEffect(() => { apiGetJob(id).then(setJob).catch(() => setError("Không tìm thấy tin tuyển dụng.")); }, [id]);
  useEffect(() => {
    if (!user) return;
    apiGetCandidateProfile().then((profile) => {
      setSavedCvUrl(profile.cv_url);
      setForm((current) => ({ ...current, full_name: profile.full_name, email: profile.email, phone: profile.phone, experience: profile.experience ?? "", cover_letter: profile.profile_summary ?? current.cover_letter }));
    }).catch(() => undefined);
  }, [user?.id]);
  if (error && !job) return <div className="mx-auto max-w-[1120px] px-6 py-20 text-red-600">{error}</div>;
  if (!job) return <div className="px-6 py-20 text-center text-muted">Đang tải thông tin việc làm...</div>;

  const apply = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (!cvFile && !savedCvUrl) { setError("Vui lòng chọn file CV hoặc lưu CV mặc định trong hồ sơ ứng viên."); return; }
    setSubmitting(true);
    try {
      const cvUrl = cvFile ? (await apiUploadCV(cvFile)).url : savedCvUrl;
      await apiApplyJob(id, { ...form, cv_url: cvUrl });
      setSuccess("Hồ sơ đã được gửi. HR sẽ liên hệ trực tiếp nếu hồ sơ phù hợp.");
      setFormOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể nộp hồ sơ.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7fb] py-8 sm:py-10">
      <div className="mx-auto max-w-[1120px] px-6">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted" aria-label="Điều hướng">
          <Link to="/" className="hover:text-blue-brand">Trang chủ</Link><span>/</span>
          <Link to="/tuyen-dung" className="hover:text-blue-brand">Việc làm</Link><span>/</span>
          <span className="max-w-[420px] truncate font-medium text-navy">{job.title}</span>
        </nav>

        <div className="job-detail-columns">
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-7">
            <p className="text-[11px] font-extrabold tracking-[.14em] text-blue-brand">VỊ TRÍ ĐANG TUYỂN</p>
            <h1 className="mt-3 text-2xl font-extrabold leading-tight text-navy sm:text-3xl">{job.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-xl font-extrabold text-[#b77914]">{job.salary}</p>
              <span className="hidden h-5 w-px bg-slate-200 sm:block" />
              <span className="text-sm text-muted">Thu nhập thỏa thuận theo năng lực</span>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <JobOverview icon={<MapPin size={22} />} label="Địa điểm" value={job.location} />
              <JobOverview icon={<BriefcaseBusiness size={22} />} label="Phòng ban" value={job.department} />
              <JobOverview icon={<WalletCards size={22} />} label="Hình thức" value={job.employment_type} />
              <JobOverview icon={<CalendarDays size={22} />} label="Hạn ứng tuyển" value={formatDeadline(job.expires_at)} />
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => { setError(""); setFormOpen(true); }} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-brand px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-navy">
                <Send size={17} /> Ứng tuyển ngay
              </button>
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-brand px-5 py-3.5 text-sm font-bold text-blue-brand transition hover:bg-blue-brand hover:text-white">
                <Heart size={18} /> Lưu tin
              </button>
            </div>
            {success && <><p className="mt-5 flex gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-semibold leading-6 text-emerald-700"><CheckCircle2 className="mt-0.5 shrink-0" size={18} />{success}</p>{!user && <Link to="/dang-ky" className="mt-4 inline-flex text-sm font-bold text-blue-brand hover:underline">Tạo tài khoản để lưu CV và ứng tuyển nhanh lần sau</Link>}</>}
          </section>

          <aside className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-[#f7faff] text-blue-brand">
                {job.company_logo ? <img src={job.company_logo} alt="" className="h-full w-full object-contain p-2" /> : <Building2 size={32} />}
              </div>
              <div>
                <p className="text-lg font-extrabold leading-6 text-navy">{job.company_name}</p>
                <p className="mt-2 text-sm leading-5 text-muted">{job.company_summary || "Doanh nghiệp đang tuyển dụng trên Matrix Careers."}</p>
              </div>
            </div>
            <div className="mt-6 space-y-4 border-t border-slate-100 pt-5 text-sm text-slate-700">
              <p className="flex gap-3"><Building2 className="mt-0.5 shrink-0 text-blue-brand" size={18} /><span><b className="block text-navy">Lĩnh vực tuyển dụng</b>{job.department}</span></p>
              <p className="flex gap-3"><MapPin className="mt-0.5 shrink-0 text-blue-brand" size={18} /><span><b className="block text-navy">Địa điểm làm việc</b>{job.location}</span></p>
            </div>
            <button type="button" className="mt-6 w-full rounded-xl border border-blue-brand py-3 text-sm font-bold text-blue-brand transition hover:bg-[#f3f8ff]">Xem thông tin công ty</button>
          </aside>
        </div>

        <div className="job-detail-columns mt-6">
          <div className="space-y-6">
            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-7">
              <h2 className="flex items-center gap-3 text-2xl font-extrabold text-navy"><span className="h-8 w-1 rounded-full bg-[#f6b73c]" />Tổng quan</h2>
              <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 text-sm sm:grid-cols-[112px_1fr]">
                <span className="font-bold text-navy">Vị trí</span><span className="text-muted">{job.title}</span>
                <span className="font-bold text-navy">Phòng ban</span><span className="text-muted">{job.department}</span>
                <span className="font-bold text-navy">Hình thức</span><span className="text-muted">{job.employment_type}</span>
              </div>
            </section>
            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-7">
              <h2 className="flex items-center gap-3 text-2xl font-extrabold text-navy"><span className="h-8 w-1 rounded-full bg-blue-brand" />Mô tả công việc</h2>
              <p className="mt-6 whitespace-pre-line leading-8 text-muted">{job.description}</p>
            </section>
            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-7">
              <h2 className="flex items-center gap-3 text-2xl font-extrabold text-navy"><span className="h-8 w-1 rounded-full bg-[#f6b73c]" />Yêu cầu ứng viên</h2>
              <p className="mt-6 whitespace-pre-line leading-8 text-muted">{job.requirements}</p>
              <button onClick={() => { setError(""); setFormOpen(true); }} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-brand px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-navy sm:w-auto sm:min-w-64">
                <Send size={17} /> Ứng tuyển ngay
              </button>
            </section>
          </div>

          <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:sticky lg:top-28 sm:p-7">
            <h2 className="text-xl font-extrabold text-navy">Thông tin chung</h2>
            <div className="mt-5 space-y-5 border-t border-slate-100 pt-5">
              <InfoRow label="Mức lương" value={job.salary} />
              <InfoRow label="Địa điểm" value={job.location} />
              <InfoRow label="Hình thức" value={job.employment_type} />
              <InfoRow label="Phòng ban" value={job.department} />
              <InfoRow label="Hạn ứng tuyển" value={formatDeadline(job.expires_at)} />
            </div>
          </aside>
        </div>
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#071f43]/60 px-4 py-6" role="dialog" aria-modal="true" aria-labelledby="application-title">
          <div className="max-h-full w-full max-w-[560px] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div><p className="text-[11px] font-extrabold tracking-[.14em] text-blue-brand">ỨNG TUYỂN VỊ TRÍ</p><h2 id="application-title" className="mt-2 text-2xl font-extrabold text-navy">{job.title}</h2></div>
              <button type="button" onClick={() => setFormOpen(false)} aria-label="Đóng biểu mẫu" className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-navy"><X size={20} /></button>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">Điền thông tin và tải CV để gửi hồ sơ trực tiếp đến bộ phận tuyển dụng.</p>
            <form onSubmit={apply} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Họ và tên" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
                <input required placeholder="Số điện thoại" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
              </div>
              <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
              <label className="block rounded-xl border border-dashed border-blue-brand/40 bg-[#f7fbff] px-4 py-3 text-sm font-bold text-navy">
                {savedCvUrl ? "CV mặc định đang được chọn" : "Tải CV lên"} <span className="font-normal text-muted">(PDF, DOC, DOCX · tối đa 5 MB)</span>
                <input required={!savedCvUrl} type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => setCvFile(e.target.files?.[0] ?? null)} className="mt-2 block w-full text-xs font-normal text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-navy file:px-3 file:py-2 file:text-xs file:font-bold file:text-white" />
                {cvFile && <span className="mt-2 block text-xs font-normal text-blue-brand">Đã chọn: {cvFile.name}</span>}
                {savedCvUrl && !cvFile && <span className="mt-2 block text-xs font-normal text-blue-brand">Bạn có thể tải tệp khác để thay thế CV này cho riêng vị trí đang ứng tuyển.</span>}
              </label>
              {user ? <Link to="/ho-so-ung-vien" className="block text-xs font-bold text-blue-brand hover:underline">Quản lý CV và hồ sơ ứng viên của tôi</Link> : <Link to="/dang-ky" className="block text-xs font-bold text-blue-brand hover:underline">Tạo tài khoản để lưu CV và ứng tuyển nhanh lần sau</Link>}
              <textarea placeholder="Kinh nghiệm nổi bật (không bắt buộc)" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="min-h-20 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
              <textarea required minLength={20} placeholder="Giới thiệu ngắn về bạn" value={form.cover_letter} onChange={(e) => setForm({ ...form, cover_letter: e.target.value })} className="min-h-28 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
              {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}
              <button disabled={submitting} className="w-full rounded-xl bg-blue-brand py-3.5 text-sm font-extrabold text-white transition hover:bg-navy disabled:opacity-60">{submitting ? "Đang gửi hồ sơ..." : "Gửi hồ sơ ứng tuyển"}</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

function JobOverview({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="flex gap-3 text-sm"><span className="mt-0.5 text-blue-brand">{icon}</span><span><b className="block text-slate-500">{label}</b><span className="mt-1 block font-semibold text-navy">{value}</span></span></div>;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div><p className="text-sm text-slate-500">{label}</p><p className="mt-1 font-semibold leading-6 text-navy">{value}</p></div>;
}
