import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline-white" | "outline-navy" | "outline-blue";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-btn font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-brand disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-yellow-brand text-navy hover:brightness-105 shadow-sm",
  "outline-white": "border border-white/70 text-white hover:bg-white/10",
  "outline-navy": "border border-navy text-navy hover:bg-navy hover:text-white",
  "outline-blue":
    "border border-blue-brand text-blue-brand hover:bg-blue-brand hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[15px]",
  lg: "h-12 px-8 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined };

type ButtonAsLink = CommonProps & { to: string };

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonAsButton | ButtonAsLink
>(({ variant = "primary", size = "md", className, children, ...props }, ref) => {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("to" in props && props.to) {
    const { to } = props as ButtonAsLink;
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
