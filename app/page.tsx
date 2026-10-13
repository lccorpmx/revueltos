import { CtaSection } from "@/components/sections/cta-section";
import { Hero } from "@/components/sections/hero";
import { MenuSection } from "@/components/sections/menu-section";
import { SandwichBuilder } from "@/components/sections/sandwich-builder";
import { StorySection } from "@/components/sections/story-section";
import { WhySection } from "@/components/sections/why-section";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="contenido" className="flex-1">
        <Hero />
        <MenuSection />
        <SandwichBuilder />
        <WhySection />
        <StorySection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
