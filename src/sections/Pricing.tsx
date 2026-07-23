import { SectionHeading } from "@/components/ui/SectionHeading";
import { PricingCard } from "@/components/ui/PricingCard";
import { PRICING } from "@/data/content";

export function Pricing() {
  return (
    <section id="mang-luoi" className="relative overflow-hidden bg-cream py-20 lg:py-28">
      <span
        aria-hidden
        className="absolute left-0 top-40 h-20 w-20 rounded-2xl bg-blue-brand/20"
      />
      <div className="container-page flex flex-col gap-14">
        <SectionHeading
          title="Mạng lưới dành cho bạn"
          subtitle="Lựa chọn gói dịch vụ phù hợp với quy mô và mục tiêu phát triển của doanh nghiệp để tối ưu chi phí và hiệu quả."
        />
        <div className="grid gap-6 pt-4 md:grid-cols-3">
          {PRICING.map((p) => (
            <PricingCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
