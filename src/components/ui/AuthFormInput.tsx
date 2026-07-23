import { forwardRef, useState } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  label?: string;
  error?: string;
  password?: boolean;
}

export const AuthFormInput = forwardRef<HTMLInputElement, Props>(
  ({ icon: Icon, label, error, password = false, className, type, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const inputType = password ? (show ? "text" : "password") : type ?? "text";

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-semibold text-navy" htmlFor={props.id}>
            {label}
          </label>
        )}
        <div
          className={cn(
            "flex items-center gap-3 rounded-btn border bg-white px-4 transition-colors focus-within:border-blue-brand focus-within:ring-2 focus-within:ring-blue-brand/20",
            error ? "border-red-400" : "border-navy/15",
            className
          )}
        >
          <Icon size={18} className="shrink-0 text-muted-light" />
          <input
            ref={ref}
            type={inputType}
            className="h-12 w-full bg-transparent text-[15px] text-navy outline-none placeholder:text-muted-light"
            {...props}
          />
          {password && (
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="shrink-0 text-muted-light transition-colors hover:text-navy"
              aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              tabIndex={-1}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
      </div>
    );
  }
);

AuthFormInput.displayName = "AuthFormInput";
