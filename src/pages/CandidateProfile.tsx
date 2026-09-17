import { BriefcaseBusiness, FileText, Loader2, Save, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { apiGetCandidateProfile, apiGetMyCandidateApplications, apiSaveCandidateProfile, apiUploadCV, getStoredUser, type CandidateApplication } from "@/lib/api";

const empty = { full_name: "", phone: "", cv_url: "", experience: "", profile_summary: "" };
const statusLabel: Record<string, string> = { NEW: "Mới nhận", REVIEWING: "Đang xem", CONTACTED: "Đã liên hệ", INTERVIEW: "Phỏng vấn", OFFERED: "Đề nghị", REJECTED: "Không phù hợp" };

export default function CandidateProfile() {
  const user = getStoredUser();
  const [form, setForm] = useState(empty);
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    Promise.all([apiGetCandidateProfile().catch(() => null), apiGetMyCandidateApplications().catch(() => [])])
      .then(([profile, history]) => {
        if (profile) setForm({ full_name: profile.full_name, phone: profile.phone, cv_url: profile.cv_url, experience: profile.experience ?? "", profile_summary: profile.profile_summary ?? "" });
        setApplications(history);
      }).finally(() => setLoading(false));
  }, [user?.id]);

  if (!user) return <Navigate to="/dang-nhap" replace />;
  const update = (key: keyof typeof form, value: string) => setForm({ ...form, [key]: value });
  const upload = async (file: File | undefined) => {
    if (!file) return; setUploading(true); setError("");
    try { const uploaded = await apiUploadCV(file); update("cv_url", uploaded.url); setMessage("CV đã được tải lên và sẵn sàng dùng cho các lần ứng tuyển tiếp theo."); }
    catch (err) { setError(err instanceof Error ? err.message : "Không thể tải CV lên."); }
    finally { setUploading(false); }
  };
  const save = async (event: React.FormEvent) => {
    event.preventDefault(); setSaving(true); setError(""); setMessage("");
    try { await apiSaveCandidateProfile({ ...form, experience: form.experience || null, profile_summary: form.profile_summary || null }); setMessage("Hồ sơ ứng viên đã được lưu. Các lần ứng tuyển tiếp theo sẽ tự điền thông tin này."); }
    catch (err) { setError(err instanceof Error ? err.message : "Không thể lưu hồ sơ."); }
    finally { setSaving(false); }
  };

  return <main className="min-h-screen bg-[#f4f7fb] py-10"><div className="mx-auto max-w-[1080px] px-6"><header className="rounded-3xl bg-gradient-to-br from-navy-dark to-blue-brand px-7 py-8 text-white shadow-card sm:px-9"><p className="text-xs font-bold tracking-[.16em] text-[#bfe5ff]">ỨNG VIÊN MATRIX CAREERS</p><h1 className="mt-3 text-3xl font-extrabold">Hồ sơ ứng viên của tôi</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">Lưu CV và thông tin một lần để ứng tuyển nhanh, đồng thời theo dõi những vị trí bạn đã nộp.</p></header>
    <div className="mt-7 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
      <form onSubmit={save} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#edf6ff] text-blue-brand"><UserRound size={20} /></span><div><h2 className="font-extrabold text-navy">Thông tin dùng để ứng tuyển</h2><p className="mt-1 text-sm text-slate-500">Được tự điền khi bạn nộp CV trong tương lai.</p></div></div>{loading ? <div className="py-16 text-center text-slate-400"><Loader2 className="mx-auto animate-spin" /></div> : <><div className="mt-7 grid gap-5 sm:grid-cols-2"><Field label="Họ và tên *"><input required value={form.full_name} onChange={(e) => update("full_name", e.target.value)} /></Field><Field label="Số điện thoại *"><input required value={form.phone} onChange={(e) => update("phone", e.target.value)} /></Field></div><Field label="CV mặc định *"><div className="mt-2 rounded-xl border border-dashed border-blue-brand/40 bg-[#f7fbff] p-4"><p className="text-sm text-slate-600">{form.cv_url ? "Bạn đã có CV mặc định. Tải tệp khác để thay thế." : "Tải CV PDF, DOC hoặc DOCX để dùng cho các lần ứng tuyển sau."}</p><input required={!form.cv_url} type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => upload(e.target.files?.[0])} className="mt-3 block w-full text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-navy file:px-3 file:py-2 file:font-bold file:text-white" />{uploading && <p className="mt-2 text-xs text-blue-brand">Đang tải CV...</p>}{form.cv_url && <a className="mt-3 inline-flex text-xs font-bold text-blue-brand underline" href={form.cv_url} target="_blank" rel="noreferrer">Xem CV đang lưu</a>}</div></Field><Field label="Kinh nghiệm nổi bật"><textarea value={form.experience} onChange={(e) => update("experience", e.target.value)} placeholder="Tóm tắt kinh nghiệm, kỹ năng hoặc chuyên môn của bạn." /></Field><Field label="Giới thiệu ngắn"><textarea value={form.profile_summary} onChange={(e) => update("profile_summary", e.target.value)} placeholder="Nội dung này có thể dùng làm lời giới thiệu khi ứng tuyển." /></Field>{error && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}{message && <p className="mt-5 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}<button disabled={saving || uploading} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-brand px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{saving ? <Loader2 size={17} className="animate-spin" /> : <Save size={17} />}{saving ? "Đang lưu..." : "Lưu hồ sơ ứng viên"}</button></>}</form>
      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff6df] text-[#b77914]"><BriefcaseBusiness size={20} /></span><div><h2 className="font-extrabold text-navy">Việc đã ứng tuyển</h2><p className="mt-1 text-sm text-slate-500">{applications.length} vị trí trong hồ sơ.</p></div></div><div className="mt-5 divide-y divide-slate-100">{applications.length ? applications.map((item) => <Link key={item.id} to={`/tuyen-dung/${item.job_id}`} className="block py-4 first:pt-0"><p className="font-bold text-navy hover:text-blue-brand">{item.job_title}</p><p className="mt-1 text-sm text-slate-500">{item.company_name}</p><span className="mt-3 inline-flex rounded-full bg-[#edf6ff] px-2.5 py-1 text-xs font-bold text-blue-brand">{statusLabel[item.status] ?? item.status}</span></Link>) : <div className="py-8 text-center"><FileText className="mx-auto text-slate-300" size={30} /><p className="mt-3 text-sm text-slate-500">Bạn chưa ứng tuyển vị trí nào.</p><Link to="/tuyen-dung" className="mt-4 inline-flex font-bold text-blue-brand">Khám phá việc làm</Link></div>}</div></aside>
    </div></div></main>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="mt-5 block text-sm font-bold text-navy">{label}<span className="mt-2 block [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-slate-200 [&_input]:px-4 [&_input]:py-3 [&_input]:font-normal [&_textarea]:min-h-24 [&_textarea]:w-full [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-slate-200 [&_textarea]:px-4 [&_textarea]:py-3 [&_textarea]:font-normal">{children}</span></label>; }
