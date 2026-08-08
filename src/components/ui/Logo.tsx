import { cn } from "@/lib/cn";

interface Props {
  light?: boolean;
  className?: string;
}

export function Logo({ light = false, className }: Props) {
  return (
    <span className={cn("flex items-center", className)}>
      <img
        src="/images/logo-business-transparent.png"
        alt="Matrix Holding"
        className={cn(
          "h-12 w-auto object-contain md:h-14",
          light && "brightness-0 invert"
        )}
      />
    </span>
  );
}
