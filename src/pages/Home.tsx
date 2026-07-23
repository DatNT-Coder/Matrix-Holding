import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Pricing } from "@/sections/Pricing";
import { WhyUs } from "@/sections/WhyUs";
import { Security } from "@/sections/Security";
import { FAQ } from "@/sections/FAQ";
import { CTA } from "@/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Pricing />
      <WhyUs />
      <Security />
      <FAQ />
      <CTA />
    </>
  );
}
