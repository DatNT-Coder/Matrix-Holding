import { Check } from "lucide-react";
import type { Feature } from "@/data/content";

export function FeatureCard({ icon: Icon, title, points }: Feature) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-card transition-transform duration-300 hover:-translate-y-1">
      <div className="mb-4 flex items-center gap-2">
        <h3 className="text-lg font-bold text-blue-brand">{title}</h3>
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-brand/20 text-yellow-brand">
          <Icon size={16} />
        </span>
      </div>
      <ul className="flex flex-col gap-2.5">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2 text-sm text-muted">
            <Check size={16} className="mt-0.5 shrink-0 text-yellow-brand" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
