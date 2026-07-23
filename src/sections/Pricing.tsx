import { SectionHeading } from "@/components/ui/SectionHeading";
import { PricingCard } from "@/components/ui/PricingCard";
import { PRICING } from "@/data/content";

export function Pricing() {
  return (
    <section id="mang-luoi" className="relative overflow-hidden bg-navy-dark py-20 lg:py-28">
      <span
        aria-hidden
        className="absolute -left-6 top-16 h-56 w-56 rounded-full bg-blue-brand/10 blur-3xl"
      />
      <span
        aria-hidden
        className="absolute -right-10 bottom-12 h-44 w-44 rounded-full bg-blue-brand/10 blur-3xl"
      />
      <div className="container-page flex flex-col gap-14">
        <SectionHeading
          tone="white"
          title="Hệ sinh thái toàn diện"
          subtitle="Hệ sinh thái toàn diện thuộc Matrix Holding:"
        />
        <div className="grid gap-6 pt-4 md:grid-cols-2 xl:grid-cols-4">
          {PRICING.map((p) => (
            <PricingCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
