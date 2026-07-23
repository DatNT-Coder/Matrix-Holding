import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Features } from "@/sections/Features";
import { Milestone } from "@/sections/Milestone";
import { Pricing } from "@/sections/Pricing";
import { WhyUs } from "@/sections/WhyUs";
import { Security } from "@/sections/Security";
import { Process } from "@/sections/Process";
import { FAQ } from "@/sections/FAQ";
import { CTA } from "@/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <Milestone />
      <Pricing />
      <Process />
      <WhyUs />
      <Security />
      <FAQ />
      <CTA />
    </>
  );
}
