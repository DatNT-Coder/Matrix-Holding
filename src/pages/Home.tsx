import { MatrixLanding } from "@/sections/MatrixLanding";
import { FAQ } from "@/sections/FAQ";
import { CTA } from "@/sections/CTA";
import { Partners } from "@/sections/Partners";

export default function Home() {
  return (
    <>
      <MatrixLanding />
      <FAQ />
      <Partners />
      <CTA />
    </>
  );
}
