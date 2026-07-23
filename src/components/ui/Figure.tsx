import { cn } from "@/lib/cn";

interface Props {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

export function Figure({ src, alt, className, imgClassName }: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card bg-gradient-to-br from-navy to-blue-brand",
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}
