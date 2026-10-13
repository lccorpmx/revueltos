import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { HandArrow, HeartDoodle, Sparks, Underline } from "@/components/decor/doodles";
import { PolaroidScene } from "@/components/mascot/polaroid-scene";
import { AnimatedScene } from "@/components/motion/animated-scene";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { linkProps, siteConfig } from "@/lib/site";

export function StorySection() {
  return (
    <section id="historia" aria-labelledby="story-title" className="relative overflow-hidden bg-cream">
      <div className="grid items-center lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)_minmax(0,0.62fr)]">
        <Reveal className="relative">
          <div className="mask-wave-bottom lg:mask-wave-right relative aspect-[1272/762] w-full lg:aspect-auto lg:h-[min(36rem,52vw)]">
            <Image
              src="/images/historia/manos-revueltos.webp"
              alt="Dos manos sostienen sándwiches Revueltos en su empaque amarillo, en la calle."
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[50%_60%]"
            />
            <p className="absolute top-[7%] left-[5%] -rotate-12 font-hand text-[clamp(1.5rem,3vw,2.4rem)] leading-[0.95] text-white uppercase drop-shadow-[0_2px_6px_rgb(0_0_0/0.35)]">
              Simple,
              <br />
              rico,
              <br />
              real
              <HeartDoodle filled className="ml-2 inline-block size-6 rotate-12 text-sun" />
            </p>
            <HandArrow className="absolute top-[13%] left-[23%] h-14 w-10 -rotate-12 text-white" />
            <Sparks className="absolute top-[6%] right-[12%] size-14 rotate-90 text-orange lg:right-[16%]" />
          </div>
        </Reveal>

        <Reveal className="container-page py-14 lg:max-w-none lg:px-10 lg:py-20 xl:px-14">
          <p className="font-display text-sm font-extrabold tracking-[0.16em] text-orange-ink uppercase">Nuestra historia</p>
          <h2 id="story-title" className="display-heavy mt-3 text-[clamp(2rem,3.6vw,3rem)] text-ink">
            Aquí todo comienza con un buen{" "}
            <span className="relative inline-block whitespace-nowrap">
              huevo
              <Underline className="absolute -bottom-[0.3em] left-0 h-[0.3em] w-full" />
              <Sparks className="absolute top-0 -right-10 size-8 rotate-90" />
            </span>
          </h2>
          <div className="mt-6 space-y-3 text-[1.05rem] leading-relaxed text-ink-soft">
            <p>
              Revueltos nació del amor por los desayunos mexicanos, los buenos ingredientes y esos momentos simples que
              saben increíble.
            </p>
            <p>Queremos que cada bocado te recuerde que un buen día sí empieza con un buen desayuno.</p>
          </div>
          <Button asChild variant="sun" size="pill" className="mt-8">
            <a {...linkProps(siteConfig.links.instagram)}>
              Conoce más de nuestra historia
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </Reveal>

        <Reveal className="pb-16 lg:py-16 lg:pr-6" delay={120}>
          <Polaroid />
        </Reveal>
      </div>
    </section>
  );
}

function Polaroid() {
  return (
    <figure className="relative mx-auto w-[min(17rem,72%)] rotate-[4deg] bg-white p-3 pb-4 shadow-[0_22px_40px_-18px_rgb(27_25_21/0.45)] transition-transform duration-500 ease-(--ease-squish) hover:rotate-[1deg] lg:w-full lg:max-w-[16rem]">
      <span aria-hidden="true" className="absolute -top-4 left-1/2 h-8 w-24 -translate-x-1/2 rotate-[-5deg] bg-sun/75 shadow-sm" />
      <div className="relative aspect-[4/5] overflow-hidden bg-[#6f5a47]">
        <div aria-hidden="true" className="bokeh-cafe absolute -inset-4" />
        <AnimatedScene className="absolute inset-x-[4%] bottom-[2%]">
          <PolaroidScene className="h-auto w-full" />
        </AnimatedScene>
      </div>
      <figcaption className="mt-3 -rotate-3 text-center font-hand text-[1.6rem] leading-[0.95] text-ink uppercase">
        Más huevos,
        <br />
        más historias
        <HeartDoodle className="ml-2 inline-block size-6 -rotate-12" />
      </figcaption>
    </figure>
  );
}
