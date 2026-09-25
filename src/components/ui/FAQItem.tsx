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
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <span className="flex w-7 shrink-0 items-center justify-center text-xs font-bold text-[#222222]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-sm font-medium text-[#222222]">{question}</span>
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
          <p className="px-5 pb-5 pl-[68px] text-justify text-sm leading-relaxed text-muted">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
