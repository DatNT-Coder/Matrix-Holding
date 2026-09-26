import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

interface Props {
  index: number;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}

export function FAQItem({ index, question, answer, open, onToggle }: Props) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-card-sm border transition-colors",
        open ? "border-[#bfc4ca] bg-[#eeeeee]" : "border-transparent bg-[#dedede]"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center gap-4 px-4 text-left",
          open ? "pb-1.5 pt-4" : "py-3",
        )}
      >
        <span className="flex h-9 w-11 shrink-0 items-center justify-center rounded-lg border border-navy/10 bg-white/55 text-base font-extrabold leading-snug tracking-[0.01em] text-navy shadow-sm lg:text-[17px]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-base font-extrabold uppercase leading-snug tracking-[0.01em] text-[#222222] lg:text-[17px] xl:whitespace-nowrap">{question}</span>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
            open ? "bg-blue-brand text-white" : "bg-navy/5 text-navy"
          )}
        >
          {open ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pl-[76px] pr-5 text-justify text-sm leading-relaxed text-muted">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
