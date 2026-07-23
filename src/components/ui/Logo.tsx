import { cn } from "@/lib/cn";

interface Props {
  light?: boolean;
  className?: string;
}

export function Logo({ light = false, className }: Props) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <img
        src="/logo.png"
        alt="Matrix Holding"
        className={cn("h-7 w-7 object-contain", light && "brightness-0 invert")}
      />
      <span
        className={cn(
          "text-base font-bold leading-tight",
          light ? "text-white" : "text-navy"
        )}
      >
        Matrix Holding
      </span>
    </span>
  );
}
