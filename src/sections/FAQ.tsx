import { useState } from "react";
import { FAQItem } from "@/components/ui/FAQItem";
import { Figure } from "@/components/ui/Figure";
import { FAQS } from "@/data/content";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  return (
    <section id="faq" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="container-page">
        <p className="text-xs font-extrabold text-slate-600">CÂU HỎI THƯỜNG GẶP</p>
        <h2 className="mt-4 text-2xl font-extrabold text-[#09172a] sm:text-3xl">GIẢI ĐÁP VỀ MATRIX HOLDING</h2>
        <div className="mt-9 grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <Figure
            src="/images/home-lounge-v2.png"
            alt="Hỗ trợ doanh nghiệp"
            className="h-72 w-full rounded-lg lg:h-auto"
          />

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
