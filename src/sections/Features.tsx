import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { FEATURES } from "@/data/content";

export function Features() {
  return (
    <section id="tinh-nang" className="bg-blue-brand py-20 lg:py-28">
      <div className="container-page flex flex-col gap-12">
        <SectionHeading
          tone="gold"
          title="Hệ sinh thái toàn diện"
          subtitle="Hệ sinh thái toàn diện thuộc Matrix Holding: "
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
