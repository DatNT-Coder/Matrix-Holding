import { useState } from "react";
import { FAQItem } from "@/components/ui/FAQItem";
import { Figure } from "@/components/ui/Figure";
import { FAQS, IMG } from "@/data/content";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  return (
    <section id="faq" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="container-page grid items-start gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <h2 className="bg-[#cbe7fb] px-1 text-2xl font-extrabold text-navy sm:text-3xl lg:text-[34px]">
              Câu Hỏi Thường Gặp
            </h2>
            <span className="h-[3px] w-8 rounded-full bg-blue-brand" />
          </div>
          <p className="-mt-2 text-[15px] leading-relaxed text-muted">
            Giải đáp nhanh những thắc mắc phổ biến nhất để giúp bạn tiến hành và
            cách thức vận hành và các câu quyết trong hệ sinh thái của chúng tôi.
          </p>
          <Figure
            src={IMG.faq}
            alt="Hỗ trợ doanh nghiệp"
            className="mt-2 h-64 w-full rounded-none"
          />
        </div>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={faq.question}
              index={i}
              question={faq.question}
              answer={faq.answer}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
