import { useState } from "react";
import { FAQItem } from "@/components/ui/FAQItem";
import { Figure } from "@/components/ui/Figure";
import { FAQS } from "@/data/content";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  return (
    <section id="faq" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="container-page">
        <p className="text-xs text-slate-600">CÂU HỎI THƯỜNG GẶP</p>
        <h2 className="mt-4 text-2xl font-extrabold text-[#09172a] sm:text-3xl">GIẢI ĐÁP VỀ MATRIX HOLDING</h2>
        <div className="mt-9 grid items-start gap-8 lg:grid-cols-[.85fr_1.15fr]">
        <div className="flex flex-col gap-6">
          <Figure
            src="/images/matrix-interior-lounge.png"
            alt="Hỗ trợ doanh nghiệp"
            className="h-72 w-full rounded-lg"
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
      </div>
    </section>
  );
}
