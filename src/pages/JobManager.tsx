import {
  BriefcaseBusiness,
  CalendarDays,
  FilePlus2,
  Loader2,
  MapPin,
  RefreshCw,
  Star,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  apiCreateJob,
  apiFeatureJob,
  apiGetRecruitmentJobs,
  apiRenewJob,
  getStoredUser,
  type JobPayload,
  type RecruitmentJob,
} from "@/lib/api";

const dateInputValue = (date: Date) => date.toISOString().slice(0, 10);
const defaultExpiry = () =>
  dateInputValue(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
const initial = (): JobPayload => ({
  title: "",
  company_name: "Matrix Holding",
  company_logo: "",
  company_summary: "",
  department: "Kinh doanh",
  location: "Hà Nội",
  salary: "",
  employment_type: "Toàn thời gian",
  summary: "",
  description: "",
  requirements: "",
  expires_at: `${defaultExpiry()}T23:59:59.000Z`,
});
const formatDate = (value: string | null) =>
  value
    ? new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(value))
    : "Chưa đặt hạn";
const isExpired = (job: RecruitmentJob) =>
  Boolean(job.expires_at && new Date(job.expires_at).getTime() <= Date.now());

export default function JobManager() {
  const user = getStoredUser();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<RecruitmentJob[]>([]);
  const [form, setForm] = useState<JobPayload>(initial);
  const [showForm, setShowForm] = useState(false);
  const [renewingJob, setRenewingJob] = useState<RecruitmentJob | null>(null);
  const [featuringJob, setFeaturingJob] = useState<RecruitmentJob | null>(null);
  const [renewDate, setRenewDate] = useState(defaultExpiry());
  const [featureDate, setFeatureDate] = useState(defaultExpiry());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    apiGetRecruitmentJobs()
      .then(setJobs)
      .catch((err) =>
        setError(
          err instanceof Error && err.message === "Not Found"
            ? "Dịch vụ tuyển dụng đang cần được khởi động lại để cập nhật dữ liệu."
            : err instanceof Error
              ? err.message
              : "Không thể tải danh sách tin tuyển dụng.",
        ),
      )
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    load();
  }, []);
  if (!user) return <Navigate to="/dang-nhap" replace />;
  if (!["DIRECTOR", "HR"].includes(user.role))
    return <Navigate to="/" replace />;

  const stats = useMemo(
    () => ({
      active: jobs.filter((job) => !isExpired(job)).length,
      applications: jobs.reduce((sum, job) => sum + job.application_count, 0),
      newApplications: jobs.reduce(
        (sum, job) => sum + job.new_application_count,
        0,
      ),
    }),
    [jobs],
  );

  const update = (key: keyof JobPayload, value: string) =>
    setForm({ ...form, [key]: value });
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await apiCreateJob(form);
      setForm(initial());
      setShowForm(false);
      load();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Không thể đăng tin tuyển dụng.",
      );
    } finally {
      setSaving(false);
    }
  };
  const renew = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!renewingJob) return;
    setSaving(true);
    setError("");
    try {
      await apiRenewJob(renewingJob.id, `${renewDate}T23:59:59.000Z`);
      setRenewingJob(null);
      load();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Không thể gia hạn tin tuyển dụng.",
      );
    } finally {
      setSaving(false);
    }
  };
  const openRenew = (job: RecruitmentJob) => {
    setError("");
    setRenewDate(
      job.expires_at
        ? dateInputValue(new Date(job.expires_at))
        : defaultExpiry(),
    );
    setRenewingJob(job);
  };
  const openFeature = (job: RecruitmentJob) => {
    setError("");
    setFeatureDate(
      job.featured_until
        ? dateInputValue(new Date(job.featured_until))
        : defaultExpiry(),
    );
    setFeaturingJob(job);
  };
  const feature = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!featuringJob) return;
    setSaving(true);
    setError("");
    try {
      await apiFeatureJob(featuringJob.id, `${featureDate}T23:59:59.000Z`);
      setFeaturingJob(null);
      load();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Không thể cập nhật đối tác nổi bật.",
      );
    } finally {
      setSaving(false);
    }
  };
  const statCards = [
    {
      label: "Tin đang hiển thị",
      value: stats.active,
      note: "Chưa hết hạn",
      icon: BriefcaseBusiness,
      tone: "bg-blue-50 text-blue-brand",
    },
    {
      label: "Tổng lượt ứng tuyển",
      value: stats.applications,
      note: "Trên tất cả vị trí",
      icon: UsersRound,
      tone: "bg-violet-50 text-violet-700",
    },
    {
      label: "Hồ sơ mới nhận",
      value: stats.newApplications,
      note: "Cần được xử lý",
      icon: FilePlus2,
      tone: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <div className="bg-[#f6f8fb] py-7 sm:py-10">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-7">
        <header className="mb-7 flex flex-col gap-5 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-blue-brand">
              Nhân sự & tuyển dụng
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-navy">
              Tin tuyển dụng
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Quản lý vị trí, thời hạn hiển thị và hồ sơ ứng viên.
            </p>
          </div>
          <button
            onClick={() => {
              setError("");
              setForm(initial());
              setShowForm(true);
            }}
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-brand"
          >
            <FilePlus2 size={18} />
            Tạo tin tuyển dụng
          </button>
        </header>
        <section className="grid gap-4 md:grid-cols-3">
          {statCards.map(({ label, value, note, icon: Icon, tone }) => (
            <article
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    {label}
                  </p>
                  <p className="mt-3 text-3xl font-bold tracking-tight text-navy">
                    {value}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{note}</p>
                </div>
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl ${tone}`}
                >
                  <Icon size={21} />
                </span>
              </div>
            </article>
          ))}
        </section>
        {error && (
          <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
        <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,36,63,.05)]">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
            <div>
              <h2 className="font-bold text-navy">
                Danh sách vị trí tuyển dụng
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Tin hết hạn sẽ tự ẩn khỏi trang ứng viên nhưng vẫn giữ ở đây để
                gia hạn và đăng lại.
              </p>
            </div>
            <span className="rounded-full bg-[#edf6ff] px-3 py-1.5 text-xs font-bold text-blue-brand">
              {jobs.length} tin
            </span>
          </div>
          {loading ? (
            <div className="py-20 text-center text-sm text-slate-500">
              Đang tải tin tuyển dụng...
            </div>
          ) : jobs.length === 0 ? (
            <EmptyState open={() => setShowForm(true)} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1160px] text-left">
                <thead>
                  <tr className="bg-[#fbfcfe] text-[11px] font-bold uppercase tracking-[.1em] text-slate-500">
                    <th className="px-6 py-4">Vị trí & doanh nghiệp</th>
                    <th className="px-5 py-4">Phòng ban</th>
                    <th className="px-5 py-4">Hạn ứng tuyển</th>
                    {user.role === "DIRECTOR" && (
                      <th className="px-5 py-4">Đối tác nổi bật</th>
                    )}
                    <th className="px-5 py-4 text-center">Ứng tuyển</th>
                    <th className="px-5 py-4 text-center">Hồ sơ mới</th>
                    <th className="px-6 py-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => {
                    const expired = isExpired(job);
                    return (
                      <tr
                        key={job.id}
                        className="border-t border-slate-100 transition hover:bg-[#f7fbff]"
                      >
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              navigate(`/quan-tri/tuyen-dung/${job.id}`)
                            }
                            className="text-left"
                          >
                            <p className="font-bold text-navy hover:text-blue-brand">
                              {job.title}
                            </p>
                            <p className="mt-1 text-xs font-semibold text-blue-brand">
                              {job.company_name}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              {job.employment_type} · {job.salary}
                            </p>
                          </button>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-slate-600">
                            {job.department}
                          </p>
                          <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-400">
                            <MapPin size={13} />
                            {job.location}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-bold ${expired ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"}`}
                          >
                            <CalendarDays size={15} />
                            {formatDate(job.expires_at)}
                          </span>
                          <p
                            className={`mt-1 text-xs ${expired ? "text-rose-600" : "text-slate-400"}`}
                          >
                            {expired ? "Đã hết hạn · đang ẩn" : "Đang hiển thị"}
                          </p>
                        </td>
                        {user.role === "DIRECTOR" && (
                          <td className="px-5 py-4">
                            {job.is_featured ? (
                              <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs font-bold text-amber-700">
                                <Star size={14} fill="currentColor" />
                                Đến {formatDate(job.featured_until)}
                              </span>
                            ) : (
                              <button
                                disabled={expired}
                                onClick={() => openFeature(job)}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 px-3 py-2 text-xs font-bold text-amber-700 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
                              >
                                <Star size={14} />
                                Chọn nổi bật
                              </button>
                            )}
                          </td>
                        )}
                        <td className="px-5 py-4 text-center">
                          <span className="inline-flex min-w-9 justify-center rounded-lg bg-[#edf6ff] px-2.5 py-1.5 text-sm font-bold text-blue-brand">
                            {job.application_count}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          {job.new_application_count > 0 ? (
                            <span className="inline-flex min-w-9 justify-center rounded-lg bg-amber-50 px-2.5 py-1.5 text-sm font-bold text-amber-700">
                              {job.new_application_count}
                            </span>
                          ) : (
                            <span className="text-sm text-slate-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => openRenew(job)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-blue-brand px-3 py-2 text-xs font-bold text-blue-brand transition hover:bg-[#edf6ff]"
                          >
                            <RefreshCw size={14} />
                            {expired ? "Đăng lại" : "Gia hạn"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
        {showForm && (
          <JobForm
            form={form}
            update={update}
            saving={saving}
            submit={submit}
            close={() => setShowForm(false)}
          />
        )}
        {renewingJob && (
          <RenewForm
            job={renewingJob}
            date={renewDate}
            setDate={setRenewDate}
            saving={saving}
            submit={renew}
            close={() => setRenewingJob(null)}
          />
        )}
        {featuringJob && (
          <FeatureForm
            job={featuringJob}
            date={featureDate}
            setDate={setFeatureDate}
            saving={saving}
            submit={feature}
            close={() => setFeaturingJob(null)}
          />
        )}
      </div>
    </div>
  );
}

function EmptyState({ open }: { open: () => void }) {
  return (
    <div className="py-20 text-center">
      <BriefcaseBusiness className="mx-auto text-slate-300" size={32} />
      <p className="mt-4 font-bold text-navy">Chưa có tin tuyển dụng</p>
      <p className="mt-2 text-sm text-slate-500">
        Tạo tin đầu tiên để bắt đầu nhận hồ sơ ứng viên.
      </p>
      <button
        onClick={open}
        className="mt-5 rounded-lg bg-navy px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-brand"
      >
        Tạo tin đầu tiên
      </button>
    </div>
  );
}

function JobForm({
  form,
  update,
  saving,
  submit,
  close,
}: {
  form: JobPayload;
  update: (key: keyof JobPayload, value: string) => void;
  saving: boolean;
  submit: (event: React.FormEvent) => void;
  close: () => void;
}) {
  return (
    <Modal
      title="Tạo tin tuyển dụng mới"
      subtitle="Các trường có dấu * là thông tin bắt buộc."
      close={close}
    >
      <form onSubmit={submit} className="mt-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Vị trí *">
            <input
              required
              placeholder="Ví dụ: Chuyên viên Kinh doanh"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </Field>
          <Field label="Tên doanh nghiệp *">
            <input
              required
              value={form.company_name}
              onChange={(e) => update("company_name", e.target.value)}
            />
          </Field>
          <Field label="Phòng ban *">
            <select
              value={form.department}
              onChange={(e) => update("department", e.target.value)}
            >
              <option>Kinh doanh</option>
              <option>Nhân sự</option>
              <option>Truyền thông</option>
              <option>Hành chính</option>
              <option>Pháp chế</option>
            </select>
          </Field>
          <Field label="Địa điểm *">
            <input
              required
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
            />
          </Field>
          <Field label="Mức lương *">
            <input
              required
              placeholder="Ví dụ: 12–18 triệu"
              value={form.salary}
              onChange={(e) => update("salary", e.target.value)}
            />
          </Field>
          <Field label="Hạn ứng tuyển *">
            <input
              required
              type="date"
              min={dateInputValue(new Date())}
              value={dateInputValue(new Date(form.expires_at ?? Date.now()))}
              onChange={(e) =>
                update("expires_at", `${e.target.value}T23:59:59.000Z`)
              }
            />
          </Field>
          <Field label="Link logo (không bắt buộc)">
            <input
              placeholder="https://..."
              value={form.company_logo ?? ""}
              onChange={(e) => update("company_logo", e.target.value)}
            />
          </Field>
          <Field label="Hình thức">
            <select
              value={form.employment_type}
              onChange={(e) => update("employment_type", e.target.value)}
            >
              <option>Toàn thời gian</option>
              <option>Bán thời gian</option>
              <option>Hybrid</option>
              <option>Từ xa</option>
            </select>
          </Field>
        </div>
        <div className="mt-5 space-y-5">
          <Field label="Giới thiệu doanh nghiệp">
            <textarea
              value={form.company_summary ?? ""}
              onChange={(e) => update("company_summary", e.target.value)}
            />
          </Field>
          <Field label="Tóm tắt *">
            <textarea
              required
              value={form.summary}
              onChange={(e) => update("summary", e.target.value)}
            />
          </Field>
          <Field label="Mô tả công việc *">
            <textarea
              required
              className="min-h-40"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </Field>
          <Field label="Yêu cầu ứng viên *">
            <textarea
              required
              className="min-h-32"
              value={form.requirements}
              onChange={(e) => update("requirements", e.target.value)}
            />
          </Field>
        </div>
        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={close}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-navy"
          >
            Hủy
          </button>
          <button
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-bold text-white hover:bg-blue-brand disabled:opacity-60"
          >
            {saving && <Loader2 size={17} className="animate-spin" />}
            {saving ? "Đang đăng..." : "Đăng tin tuyển dụng"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function RenewForm({
  job,
  date,
  setDate,
  saving,
  submit,
  close,
}: {
  job: RecruitmentJob;
  date: string;
  setDate: (date: string) => void;
  saving: boolean;
  submit: (event: React.FormEvent) => void;
  close: () => void;
}) {
  return (
    <Modal
      title={
        isExpired(job) ? "Đăng lại tin tuyển dụng" : "Gia hạn tin tuyển dụng"
      }
      subtitle={`Chọn hạn hiển thị mới cho vị trí “${job.title}”.`}
      close={close}
    >
      <form onSubmit={submit} className="mt-7">
        <Field label="Hạn ứng tuyển mới *">
          <input
            required
            type="date"
            min={dateInputValue(new Date())}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Field>
        <p className="mt-4 rounded-xl bg-[#f3f8ff] p-4 text-sm leading-6 text-slate-600">
          Sau khi lưu, tin sẽ hiển thị lại ngay cho ứng viên đến hết ngày bạn
          chọn.
        </p>
        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={close}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-navy"
          >
            Hủy
          </button>
          <button
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-bold text-white hover:bg-blue-brand disabled:opacity-60"
          >
            {saving && <Loader2 size={17} className="animate-spin" />}
            {saving ? "Đang lưu..." : "Lưu thời hạn mới"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function FeatureForm({
  job,
  date,
  setDate,
  saving,
  submit,
  close,
}: {
  job: RecruitmentJob;
  date: string;
  setDate: (date: string) => void;
  saving: boolean;
  submit: (event: React.FormEvent) => void;
  close: () => void;
}) {
  return (
    <Modal
      title="Chọn đối tác nổi bật"
      subtitle={`“${job.company_name}” sẽ xuất hiện trong khu vực Đối tác nổi bật trên trang chủ.`}
      close={close}
    >
      <form onSubmit={submit} className="mt-7">
        <Field label="Hiển thị nổi bật đến hết ngày *">
          <input
            required
            type="date"
            min={dateInputValue(new Date())}
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </Field>
        <p className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          Chỉ có một đối tác nổi bật tại một thời điểm. Khi lưu, đối tác đang
          hiển thị sẽ được thay thế; sau ngày này, tin tự trở về danh sách thông
          thường.
        </p>
        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={close}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-navy"
          >
            Hủy
          </button>
          <button
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-navy hover:bg-amber-300 disabled:opacity-60"
          >
            <Star size={17} fill="currentColor" />
            {saving ? "Đang lưu..." : "Đặt làm đối tác nổi bật"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function Modal({
  title,
  subtitle,
  close,
  children,
}: {
  title: string;
  subtitle: string;
  close: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy/55 p-0 backdrop-blur-[2px] sm:items-center sm:p-6">
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-5 border-b border-slate-100 pb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.15em] text-blue-brand">
              Tuyển dụng
            </p>
            <h2 className="mt-2 text-xl font-bold text-navy">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-bold text-navy">
      {label}
      <span className="mt-2 block [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-slate-200 [&_input]:p-3 [&_input]:font-normal [&_input]:outline-none [&_input]:focus:border-blue-brand [&_select]:w-full [&_select]:rounded-xl [&_select]:border [&_select]:border-slate-200 [&_select]:p-3 [&_select]:font-normal [&_select]:outline-none [&_select]:focus:border-blue-brand [&_textarea]:min-h-24 [&_textarea]:w-full [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-slate-200 [&_textarea]:p-3 [&_textarea]:font-normal [&_textarea]:outline-none [&_textarea]:focus:border-blue-brand">
        {children}
      </span>
    </label>
  );
}
