import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import type { Pricing } from "@/data/content";

export function PricingCard({
  icon: Icon,
  name,
  desc,
  features,
  highlight,
  cta,
}: Pricing) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl bg-white p-8 text-center transition-all duration-300",
        highlight
          ? "border-2 border-blue-brand shadow-card-lg lg:-translate-y-3"
          : "border border-navy/10 shadow-card hover:-translate-y-1"
      )}
    >
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-brand/15 text-yellow-brand">
        <Icon size={30} />
      </div>
      <h3 className="text-xl font-bold text-navy sm:text-2xl">{name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>

      <ul className="mt-6 flex flex-1 flex-col gap-3 text-left">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check size={18} className="mt-0.5 shrink-0 text-blue-brand" />
            <span className="text-muted">{f}</span>
          </li>
        ))}
      </ul>

      <Button
        to="/dang-ky"
        variant={highlight ? "outline-blue" : "outline-navy"}
        className="mt-8 w-full rounded-full"
      >
        {cta}
      </Button>
    </div>
  );
}
