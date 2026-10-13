import { ArrowRight } from "lucide-react";
import { PinIcon, ScooterIcon } from "@/components/brand/icons";
import { FriedEgg, HandArrow, HeartDoodle, Shine, Slashes, Sparks, Underline, Wave } from "@/components/decor/doodles";
import { HeroSandwich } from "@/components/hero/hero-sandwich";
import { HeroScene } from "@/components/mascot/hero-scene";
import { AnimatedScene } from "@/components/motion/animated-scene";
import { Button } from "@/components/ui/button";
import { linkProps, siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden bg-sun">
      {/* cream band behind the header with the mockup's wavy edge */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 text-cream">
        <div className="h-(--header-h) bg-cream" />
        <Wave variant="a" flip className="-mt-px h-8 sm:h-10 lg:h-12" />
      </div>

      <div className="container-page relative grid items-center gap-16 pt-[calc(var(--header-h)+4.5rem)] pb-28 sm:pb-32 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:gap-6 lg:pt-[calc(var(--header-h)+5.5rem)] lg:pb-40">
        <div className="relative z-10 max-w-2xl">
          <Sparks className="absolute -top-9 -left-3 size-11 -scale-x-100 sm:-left-8" />
          <h1 id="hero-title" className="display-heavy text-[clamp(2.6rem,5.4vw,4.6rem)] text-ink">
            <span className="block animate-rise-soft">Desayunos</span>
            <span className="block animate-rise-soft [animation-delay:90ms] sm:whitespace-nowrap">que te ponen</span>
            <span className="relative inline-block animate-rise-soft [animation-delay:180ms]">
              de buenas
              <Underline className="absolute -bottom-[0.32em] left-[-2%] h-[0.32em] w-[104%] [--draw-delay:750ms]" />
            </span>
          </h1>
          <Shine className="absolute top-[42%] -left-6 hidden size-10 -rotate-12 sm:block" />
          <p className="mt-10 max-w-md animate-rise text-lg leading-relaxed text-ink-soft [animation-delay:260ms] sm:text-xl">
            Huevos, sándwiches y más, con ingredientes frescos y mucho sabor mexicano.
          </p>
          <div className="mt-10 flex animate-rise flex-wrap items-center gap-4 [animation-delay:340ms]">
            <Button asChild variant="ink" size="pill">
              <a {...linkProps(siteConfig.links.order)}>
                <ScooterIcon className="text-sun" />
                Ordena en línea
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="paper" size="pill">
              <a {...linkProps(siteConfig.links.maps)}>
                <PinIcon />
                Encuentra nuestra ubicación
              </a>
            </Button>
          </div>
        </div>

        <HeroVisual />
      </div>

      <Wave variant="b" className="absolute inset-x-0 -bottom-px text-cream" />
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
      <div className="relative aspect-[10/9.4]">
        <div className="absolute top-[9%] right-[-14%] w-[60%] rotate-[9deg] sm:right-[-6%] lg:right-[-15%]">
          <HeroSandwich className="w-full animate-pop-soft" />
        </div>

        <Slashes className="absolute top-[-2%] left-[42%] w-[12%] rotate-6" />
        <FriedEgg className="absolute bottom-[30%] left-[2%] w-[11%] -rotate-12 animate-float lg:left-[-12%]" />

        <AnimatedScene className="absolute bottom-[-6%] left-[-4%] w-[94%] lg:left-[-21%] lg:w-[104%]">
          <HeroScene className="h-auto w-full" />
        </AnimatedScene>

        <div className="absolute top-[-7%] right-[-4%] hidden rotate-[8deg] items-start gap-1 text-ink sm:flex lg:top-[-8%] lg:right-[-11%]">
          <HandArrow className="mt-6 h-12 w-9 shrink-0 -scale-x-100 rotate-[30deg]" />
          <p className="font-hand text-[clamp(1.4rem,2.3vw,2rem)] leading-[0.95] uppercase">
            Aquí sí
            <br />
            hay huevos
            <HeartDoodle className="mt-1 ml-6 inline-block size-7 -rotate-12" />
          </p>
        </div>
      </div>
    </div>
  );
}
