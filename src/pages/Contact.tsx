import { useState } from "react";
import { ArrowUpRight, Building2, Mail, MapPin, Phone, Send, ShieldCheck } from "lucide-react";

const contactEmail = "matrixholding.support@gmail.com";

export default function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const body = [
      `Họ và tên: ${form.name}`,
      `Doanh nghiệp: ${form.company || "Chưa cung cấp"}`,
      `Email: ${form.email}`,
      `Số điện thoại: ${form.phone || "Chưa cung cấp"}`,
      "",
      "Nội dung trao đổi:",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(`Liên hệ hợp tác từ ${form.name}`)}&body=${encodeURIComponent(body)}`;
  };

  return <main className="bg-[#f5f9fc] text-navy">
    <section className="relative isolate overflow-hidden bg-[#001a3b] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_25%,rgba(55,145,210,.42),transparent_28%),linear-gradient(115deg,#00142f,#063664)]" />
      <div className="container-page grid gap-10 py-16 lg:grid-cols-[1.15fr_.85fr] lg:py-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#bfe5ff]">Liên hệ Matrix Holding</p>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">Cùng kiến tạo những cơ hội hợp tác giá trị.</h1>
          <p className="mt-6 max-w-xl text-[16px] leading-8 text-white/80">Hãy để lại thông tin hoặc liên hệ trực tiếp. Đội ngũ Matrix Holding sẵn sàng trao đổi về nhu cầu, nguồn lực và phương án hợp tác phù hợp.</p>
        </div>
        <div className="self-end rounded-3xl border border-white/15 bg-white/[.08] p-6 backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#bfe5ff]">Kết nối nhanh</p>
          <a href={`mailto:${contactEmail}`} className="mt-5 flex items-center gap-4 text-lg font-bold transition hover:text-[#bfe5ff]"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-navy"><Mail size={20} /></span>{contactEmail}</a>
          <a href="tel:+84964243026" className="mt-4 flex items-center gap-4 text-lg font-bold transition hover:text-[#bfe5ff]"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-navy"><Phone size={20} /></span>(+84) 964 243 026</a>
        </div>
      </div>
    </section>

    <section className="py-14 lg:py-20">
      <div className="container-page grid gap-8 lg:grid-cols-[.78fr_1.22fr]">
        <aside className="space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-blue-brand">Thông tin liên hệ</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-navy">Gặp gỡ và kết nối cùng chúng tôi.</h2>
            <p className="mt-5 text-justify text-[15px] leading-7 text-muted">Thông tin được tiếp nhận để phục vụ việc trao đổi hợp tác. Chúng tôi tôn trọng và bảo mật thông tin của bạn.</p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-[0_12px_28px_rgba(5,31,69,.06)]">
            <div className="border-b border-navy/10 p-6"><div className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#eaf5ff] text-blue-brand"><Building2 size={21} /></span><div><p className="font-bold text-navy">Văn phòng Matrix Holding</p><p className="mt-2 text-sm leading-6 text-muted">KĐT Bắc Linh Đàm, Phường Hoàng Liệt, Hà Nội</p></div></div></div>
            <iframe
              title="Bản đồ văn phòng Matrix Holding"
              src="https://www.google.com/maps?q=KDT%20Bac%20Linh%20Dam%2C%20Phuong%20Hoang%20Liet%2C%20Ha%20Noi&z=15&output=embed"
              className="block h-56 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a href="https://maps.google.com/?q=KDT+Bac+Linh+Dam+Phuong+Hoang+Liet+Ha+Noi" target="_blank" rel="noreferrer" className="flex items-center justify-between p-5 text-sm font-bold text-blue-brand transition hover:bg-[#f5f9fc]"><span className="flex items-center gap-2"><MapPin size={17} />Mở Google Maps để chỉ đường</span><ArrowUpRight size={17} /></a>
          </div>
          <div className="flex gap-3 rounded-2xl border border-[#d7eaf7] bg-[#eaf5ff] p-5 text-sm leading-6 text-[#315b7c]"><ShieldCheck className="mt-0.5 shrink-0 text-blue-brand" size={20} />Thông tin bạn gửi chỉ được sử dụng để phản hồi yêu cầu liên hệ và xây dựng phương án hợp tác.</div>
        </aside>

        <form onSubmit={submit} className="rounded-3xl bg-white p-6 shadow-[0_16px_36px_rgba(5,31,69,.09)] sm:p-9">
          <div className="flex items-start justify-between gap-5 border-b border-navy/10 pb-6"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-blue-brand">Trao đổi hợp tác</p><h2 className="mt-3 text-2xl font-bold text-navy">Gửi thông tin cho Matrix Holding</h2></div><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-yellow-brand text-navy"><Send size={19} /></span></div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Field label="Họ và tên *"><input required value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Nguyễn Văn A" /></Field>
            <Field label="Doanh nghiệp"><input value={form.company} onChange={(event) => update("company", event.target.value)} placeholder="Tên doanh nghiệp của bạn" /></Field>
            <Field label="Email *"><input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="email@company.com" /></Field>
            <Field label="Số điện thoại"><input type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="09xx xxx xxx" /></Field>
          </div>
          <Field label="Nội dung cần trao đổi *" className="mt-5"><textarea required rows={6} value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="Chia sẻ ngắn về nhu cầu hoặc đề xuất hợp tác của bạn." /></Field>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4"><p className="max-w-sm text-xs leading-5 text-slate-500">Sau khi bấm gửi, ứng dụng email của bạn sẽ mở sẵn với thông tin liên hệ đã điền.</p><button className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-brand"><Send size={17} />Gửi yêu cầu liên hệ</button></div>
        </form>
      </div>
    </section>
  </main>;
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return <label className={`block ${className}`}><span className="text-sm font-bold text-navy">{label}</span><div className="mt-2 [&_input]:h-12 [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-slate-200 [&_input]:bg-white [&_input]:px-4 [&_input]:text-sm [&_input]:outline-none [&_input:focus]:border-blue-brand [&_input:focus]:ring-4 [&_input:focus]:ring-blue-brand/10 [&_textarea]:w-full [&_textarea]:resize-none [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-slate-200 [&_textarea]:bg-white [&_textarea]:p-4 [&_textarea]:text-sm [&_textarea]:outline-none [&_textarea:focus]:border-blue-brand [&_textarea:focus]:ring-4 [&_textarea:focus]:ring-blue-brand/10">{children}</div></label>;
}
