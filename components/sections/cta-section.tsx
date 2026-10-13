import { ArrowRight } from "lucide-react";
import { PinIcon, ScooterIcon } from "@/components/brand/icons";
import { FriedEgg, HandArrow, HeartDoodle, Shine, Sparks, Underline, Wave } from "@/components/decor/doodles";
import { BalanceScene } from "@/components/mascot/balance-scene";
import { AnimatedScene } from "@/components/motion/animated-scene";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { linkProps, siteConfig } from "@/lib/site";

export function CtaSection() {
  return (
    <section id="ubicacion" aria-labelledby="cta-title" className="relative bg-cream">
      <Wave variant="c" className="text-sun" />
      <div className="relative bg-sun">
        <div className="container-page grid items-center gap-12 pt-12 pb-20 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)_minmax(0,0.75fr)] lg:gap-6 lg:pt-10 lg:pb-24">
          <Reveal className="relative order-2 mx-auto w-[min(15rem,62%)] lg:order-none lg:w-full lg:max-w-[16rem]">
            <Shine className="absolute top-[38%] -left-4 size-10 rotate-180" />
            <AnimatedScene>
              <BalanceScene className="h-auto w-full" />
            </AnimatedScene>
          </Reveal>

          <Reveal className="order-1 text-center lg:order-none">
            <p className="font-display text-sm font-extrabold tracking-[0.14em] text-ink uppercase sm:text-base">
              Visítanos u ordena en línea
            </p>
            <h2 id="cta-title" className="display-heavy mt-5 text-[clamp(2.2rem,5vw,3.9rem)] text-ink">
              Tu desayuno
              <br />
              te está{" "}
              <span className="relative inline-block">
                esperando
                <Underline className="absolute -bottom-[0.3em] left-0 h-[0.3em] w-full" />
              </span>
            </h2>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
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
          </Reveal>

          <Reveal className="relative order-3 hidden items-center justify-center gap-2 lg:flex" delay={150}>
            <div className="relative -rotate-12">
              <Sparks className="absolute top-6 -left-8 size-8 -scale-x-100" />
              <p className="font-hand text-[1.7rem] leading-[0.95] text-ink uppercase">
                Mismo sabor,
                <br />
                más días
                <br />
                chidos
              </p>
              <HeartDoodle className="mt-1 ml-10 size-8" />
              <HandArrow className="absolute -bottom-2 -left-10 h-12 w-9 rotate-[60deg] text-white" />
            </div>
            <FriedEgg className="w-24 shrink-0 animate-float xl:w-28" />
          </Reveal>
        </div>
      </div>
      <Wave variant="a" className="-mt-px bg-sun text-night" />
    </section>
  );
}
