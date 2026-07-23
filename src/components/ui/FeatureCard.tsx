import { Check } from "lucide-react";
import type { Feature } from "@/data/content";

export function FeatureCard({ icon: Icon, title, subtitle, points }: Feature) {
  const [prefix, ...rest] = title.split(": ");
  const suffix = rest.join(": ");
  const isMatrixCaresTitle = title === "Matrix Cares";
  const isMatrixNetworkTitle = title === "Matrix Network";

  return (
    <div className="rounded-2xl border border-blue-brand/10 bg-blue-brand/10 p-6 shadow-card transition-transform duration-300 hover:-translate-y-1">
      <div className="mb-4">
        <div className="flex items-start gap-1">
          <h3 className="text-lg text-blue-brand">
            {suffix ? (
              <>
                <span className="font-bold">{prefix}:</span>{" "}
                <span className="font-normal">{suffix}</span>
              </>
            ) : (
              <span className={isMatrixCaresTitle || isMatrixNetworkTitle ? "font-bold" : "font-normal"}>{title}</span>
            )}
          </h3>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-yellow-brand/20 text-yellow-brand">
            <Icon size={16} />
          </span>
        </div>
        {subtitle ? (
          <p className="mt-1 text-justify text-[13px] font-medium leading-relaxed text-navy">{subtitle}</p>
        ) : null}
      </div>
      <ul className="flex flex-col gap-2.5">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2 text-sm text-muted">
            <Check size={16} className="mt-0.5 shrink-0 text-blue-brand" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
