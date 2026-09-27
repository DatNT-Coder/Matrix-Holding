import { ArrowLeft, ArrowRight, BriefcaseBusiness, MapPin, WalletCards } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { canonicalCompanyName, findCompanyBySlug } from "@/data/companies";
import { apiGetJobs, type Job } from "@/lib/api";

export default function CompanyJobs() {
  const { slug } = useParams();
  const company = findCompanyBySlug(slug);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!company) return;
    setLoading(true);
    apiGetJobs()
      .then((items) => setJobs(items.filter((job) => canonicalCompanyName(job.company_name) === company.name)))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, [company?.name]);

  if (!company) return <Navigate to="/tuyen-dung" replace />;

  return (
    <main className="min-h-screen bg-[#f4f7fb] pb-20">
      <section className="relative overflow-hidden bg-[#061d3d] py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(66,154,219,.3),transparent_32%),radial-gradient(circle_at_0%_100%,rgba(26,76,140,.5),transparent_38%)]" />
        <div className="relative mx-auto max-w-[1220px] px-5 sm:px-7">
          <Link to="/tuyen-dung" className="inline-flex items-center gap-2 text-sm font-bold text-[#bfe5ff] hover:text-white"><ArrowLeft size={17} /> Quay lại trang tuyển dụng</Link>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            <span className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white p-3 shadow-xl"><img src={company.logo} alt={company.name} className="h-full w-full object-contain" /></span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#bfe5ff]">{company.field}</p>
              <h1 className="mt-3 text-3xl font-extrabold uppercase sm:text-5xl">{company.name}</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75 sm:text-base">{company.summary}</p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold"><BriefcaseBusiness size={17} /> {jobs.length} việc làm đang tuyển</span>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1000px] px-5 py-12 sm:px-7">
        <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#003b73]">CƠ HỘI NGHỀ NGHIỆP</p>
        <h2 className="mt-2 text-2xl font-extrabold text-navy sm:text-3xl">Việc làm tại {company.name}</h2>
        <div className="mt-7">
          {loading ? <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-muted">Đang tải danh sách việc làm...</div> : jobs.length === 0 ? <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center"><BriefcaseBusiness className="mx-auto text-slate-300" size={38} /><h3 className="mt-4 text-lg font-extrabold text-navy">Chưa có vị trí đang tuyển</h3><p className="mt-2 text-sm text-muted">Các cơ hội mới của {company.name} sẽ được cập nhật tại đây.</p></div> : <div className="space-y-5">{jobs.map((job) => <Link key={job.id} to={`/tuyen-dung/${job.id}`} className="group block rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#8bbdde] hover:shadow-lg sm:p-6"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div><h3 className="text-lg font-extrabold uppercase text-navy group-hover:text-blue-brand">{job.title}</h3><p className="mt-2 text-sm font-bold text-blue-brand">{job.department}</p></div><span className="w-fit rounded-full bg-[#edf6ff] px-3 py-1.5 text-xs font-bold text-[#397aaa]">{job.employment_type}</span></div><div className="mt-5 flex flex-wrap gap-3 text-sm text-[#61758b]"><span className="inline-flex items-center gap-1.5"><MapPin size={16} />{job.location}</span><span className="inline-flex items-center gap-1.5"><WalletCards size={16} />{job.salary}</span></div><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><p className="line-clamp-1 pr-5 text-sm text-muted">{job.summary}</p><span className="inline-flex shrink-0 items-center gap-1 text-sm font-extrabold text-blue-brand">Xem chi tiết <ArrowRight size={16} /></span></div></Link>)}</div>}
        </div>
      </section>
    </main>
  );
}
