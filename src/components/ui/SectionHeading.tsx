import { cn } from "@/lib/cn";

interface Props {
  title: string;
  subtitle?: string;
  tone?: "gold" | "navy" | "white";
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  tone = "navy",
  align = "center",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" ? "justify-center" : "justify-start"
        )}
      >
        {align === "center" && (
          <span className="h-[3px] w-8 rounded-full bg-yellow-brand" />
        )}
        <h2
          className={cn(
            "text-2xl font-extrabold leading-tight sm:text-3xl lg:text-[34px]",
            tone === "gold" ? "text-yellow-brand" : tone === "white" ? "text-white" : "text-navy"
          )}
        >
          {title}
        </h2>
        <span className="h-[3px] w-8 rounded-full bg-yellow-brand" />
      </div>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-[15px] leading-relaxed",
            tone === "gold" ? "text-white/70" : tone === "white" ? "text-white/80" : "text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
