import { Link } from "react-router-dom";

export function CTA() {
  return <section className="relative overflow-hidden bg-[#001a3b] px-6 py-24 text-center text-white"><div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85')] bg-cover bg-center opacity-25" /><div className="absolute inset-0 bg-[#001a3b]/70" /><div className="relative mx-auto max-w-3xl"><h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">BẠN ĐÃ SẴN SÀNG<br />TRỞ THÀNH ĐỐI TÁC CỦA CHÚNG TÔI?</h2><div className="mt-7 flex flex-wrap justify-center gap-4"><Link to="/dang-ky" className="rounded-btn bg-[#d7edff] px-6 py-3 text-sm font-bold text-navy">Đăng ký miễn phí</Link><a href="#he-sinh-thai" className="rounded-btn border border-white px-6 py-3 text-sm font-bold">Xem cơ hội hợp tác</a></div></div></section>;
}
