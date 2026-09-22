import { useState } from "react";
import { Link } from "react-router-dom";

const members = [
  { name: "Network", role: "Giải pháp doanh nghiệp", text: "Đảm nhiệm vai trò xây dựng, quản lý và điều phối các đơn vị cung cấp dịch vụ cho doanh nghiệp.", color: "#087fa6", x: 400, y: 130 },
  { name: "Community", role: "Cộng đồng kết nối", text: "Đảm nhiệm vai trò xây dựng, quản lý và điều phối các cộng đồng kết nối kinh doanh cho doanh nghiệp.", color: "#6654ae", x: 634, y: 535 },
  { name: "Capital", role: "Kết nối đầu tư", text: "Đảm nhiệm vai trò xây dựng, quản lý và điều phối các cộng đồng kết nối đầu tư cho doanh nghiệp.", color: "#a26b16", x: 166, y: 535 },
];

export default function EcosystemOrbit() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected === null ? null : members[selected];
  return <main className="bg-[#f3f7fb] text-navy">
    <section className="bg-[linear-gradient(120deg,#001a3b,#12587f)] py-14 text-white lg:py-20">
      <div className="container-page">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#bfe5ff]">Hệ sinh thái Matrix Holding</p>
        <h1 className="mt-5 text-4xl font-bold leading-tight lg:text-5xl">Kết nối nguồn lực.<br />Cùng nhau phát triển.</h1>
        <p className="mt-5 max-w-2xl leading-7 text-blue-100">Một trung tâm định hướng, ba thương hiệu thành viên cùng kết nối dịch vụ, cộng đồng và cơ hội đầu tư.</p>
      </div>
    </section>
    <section className="py-10 lg:py-16"><div className="container-page">
      <div className="overflow-hidden rounded-[28px] border border-[#d7e4ef] bg-white shadow-[0_16px_60px_rgba(7,35,65,.06)]">
        <div className="grid lg:grid-cols-[1.6fr_1fr]">
          <div className="bg-[radial-gradient(ellipse_at_center,#e4f1fb,white_70%)] p-2 sm:p-5">
            <svg viewBox="0 0 800 750" className="block w-full" role="group" aria-labelledby="orbit-title orbit-description">
              <title id="orbit-title">Hệ sinh thái Matrix Holding</title>
              <desc id="orbit-description">Holding ở trung tâm nối tới ba thành viên. Vòng tròn nối Network với Community, Community với Capital, Capital với Network.</desc>
              <defs>
                <linearGradient id="orbit-holding" x2="1" y2="1"><stop stopColor="#052342" /><stop offset="1" stopColor="#135c8b" /></linearGradient>
                <linearGradient id="orbit-line"><stop stopColor="#cfaa62" /><stop offset=".5" stopColor="#55acd0" /><stop offset="1" stopColor="#9387c6" /></linearGradient>
              </defs>
              <circle cx="400" cy="400" r="294" fill="none" stroke="#eaf0f6" />
              <circle cx="400" cy="400" r="270" fill="none" stroke="url(#orbit-line)" strokeWidth="3" />
              <circle cx="400" cy="400" r="246" fill="none" stroke="#dce8f1" strokeDasharray="3 9" />
              {members.map((m, i) => <path key={m.name} d={`M400 400 L${m.x} ${m.y}`} stroke={m.color} strokeWidth={selected === i ? 4 : 2} opacity={selected === null || selected === i ? .8 : .2} />)}
              <circle cx="400" cy="400" r="123" fill="#dcebf6" />
              <circle cx="400" cy="400" r="111" fill="url(#orbit-holding)" />
              <image href="/images/logo-mark.png" x="377" y="321" width="46" height="48" style={{ filter: "brightness(0) invert(1)" }} />
              <text x="400" y="401" textAnchor="middle" fill="white" fontSize="24" fontWeight="800">MATRIX HOLDING</text>
              <text x="400" y="430" textAnchor="middle" fill="#c1e3f8" fontSize="16">Định hướng · Điều phối</text>
              <text x="400" y="453" textAnchor="middle" fill="#c1e3f8" fontSize="16">Kết nối nguồn lực</text>
              {members.map((m, i) => <g key={m.name} role="button" tabIndex={0} aria-label={`Xem Matrix ${m.name}`} aria-pressed={selected === i} onClick={() => setSelected(i)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(i); } }} className="cursor-pointer focus-visible:outline focus-visible:outline-2">
                <circle cx={m.x} cy={m.y} r="96" fill="white" stroke={m.color} strokeWidth="5" strokeOpacity={selected === i ? .3 : .08} />
                <circle cx={m.x} cy={m.y} r="89" fill="white" stroke={m.color} strokeWidth={selected === i ? 3 : 1.5} />
                <text x={m.x} y={m.y - 19} textAnchor="middle" fill="#64748b" fontSize="15" letterSpacing="3">MATRIX</text>
                <text x={m.x} y={m.y + 10} textAnchor="middle" fill={m.color} fontSize="22" fontWeight="800">{m.name.toUpperCase()}</text>
                <text x={m.x} y={m.y + 36} textAnchor="middle" fill="#475569" fontSize="13">{m.role}</text>
              </g>)}
              <text x="400" y="723" textAnchor="middle" fill="#64748b" fontSize="15">Chọn một thương hiệu để tìm hiểu vai trò</text>
            </svg>
          </div>
          <div className="flex flex-col justify-center border-t border-slate-100 p-6 sm:p-9 lg:border-l lg:border-t-0">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-blue-brand">Mô hình liên kết</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight">Một hệ sinh thái,<br />kết nối đa chiều.</h2>
            <p className="mt-5 text-[15px] leading-7 text-slate-600">Matrix Holding giữ vai trò trung tâm định hướng và điều phối. Các thương hiệu thành viên đồng thời kết nối với nhau, chia sẻ nguồn lực và mở rộng cơ hội hợp tác.</p>
            <div className="mt-6 space-y-3 border-b border-slate-200 pb-6 text-sm text-slate-600">
              <p className="flex items-center gap-3"><span className="h-0.5 w-7 shrink-0 bg-[#367a9d]" />Đường nối tâm: liên kết với Holding</p>
              <p className="flex items-center gap-3"><span className="h-5 w-7 shrink-0 rounded-full border-2 border-[#9987ba]" />Vòng tròn: liên kết giữa các thành viên</p>
            </div>
            <div className="mt-6 rounded-2xl bg-[#f0f6fb] p-5" aria-live="polite">
              <h3 className="text-lg font-bold" style={{ color: active?.color }}>Matrix {active?.name ?? "Holding"}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{active?.text ?? "Kiến tạo chiến lược, kết nối nguồn lực và thúc đẩy sự phát triển của toàn hệ sinh thái."}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {members.map((m, i) => <button key={m.name} onClick={() => setSelected(i)} aria-pressed={selected === i} className="rounded-2xl border bg-white p-6 text-left transition hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" style={{ borderColor: selected === i ? m.color : "#dbe5ef" }}>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: m.color }}>{m.role}</p>
          <h3 className="mt-3 text-xl font-bold">Matrix {m.name}</h3>
          <p className="mt-2 text-xs text-slate-500">Thành viên của Matrix Holding</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">{m.text}</p>
        </button>)}
      </div>
    </div></section>
    <section className="bg-[#e2f0fa] py-12"><div className="container-page flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
      <div><p className="text-xs font-bold uppercase tracking-widest text-blue-brand">Đồng hành cùng Matrix</p><h2 className="mt-3 text-2xl font-bold">Kết nối hôm nay, mở rộng cơ hội ngày mai.</h2></div>
      <Link to="/lien-he" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-navy px-6 py-4 text-sm font-bold text-white">Trao đổi hợp tác →</Link>
    </div></section>
  </main>;
}
