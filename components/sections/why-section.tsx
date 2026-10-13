import type { ComponentType, SVGProps } from "react";
import { Shine, Sparks, Underline } from "@/components/decor/doodles";
import { CrackedEggIcon, HappyHeartIcon, TacoIcon, ThumbsUpIcon } from "@/components/decor/feature-icons";
import { HatchScene } from "@/components/mascot/hatch-scene";
import { AnimatedScene } from "@/components/motion/animated-scene";
import { Reveal } from "@/components/motion/reveal";

const FEATURES: { title: string; text: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { title: "Ingredientes frescos", text: "Huevos de calidad y sabores auténticos.", Icon: CrackedEggIcon },
  { title: "Sabor mexicano", text: "Recetas que saben a casa.", Icon: TacoIcon },
  { title: "Porciones que llenan", text: "Desayunos completos para empezar el día.", Icon: HappyHeartIcon },
  { title: "Buen ambiente", text: "Comida rica, gente linda y mucha buena vibra.", Icon: ThumbsUpIcon },
];

const SIGN = ["DESAYUNOS", "QUE HACEN", "LOS DÍAS", "MÁS CHIDOS"];

export function WhySection() {
  return (
    <section aria-labelledby="why-title" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      {/* soft butter blobs like the mockup background */}
      <div aria-hidden="true" className="absolute -top-24 -left-24 size-[28rem] rounded-full bg-butter/70 blur-2xl" />
      <div aria-hidden="true" className="absolute -right-32 bottom-0 size-[30rem] rounded-full bg-butter blur-2xl" />

      <div className="container-page relative grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <Reveal className="flex flex-wrap items-end gap-x-6 gap-y-3">
            <h2 id="why-title" className="display-heavy relative -rotate-3 text-[clamp(2.3rem,4.8vw,3.6rem)] text-ink">
              <Sparks className="absolute -top-5 -left-10 size-10 -scale-x-100" />
              ¿Por qué
              <br />
              <span className="relative inline-block">
                Revueltos?
                <Underline className="absolute -bottom-[0.28em] left-0 h-[0.3em] w-full" />
              </span>
            </h2>
            <p className="max-w-[16rem] -rotate-3 pb-3 text-lg leading-snug text-ink-soft">
              Más que un desayuno, una buena actitud.
            </p>
          </Reveal>

          <div className="relative mt-16 rounded-[2.5rem] bg-butter-soft/80 px-5 py-12 shadow-[inset_0_0_0_2px_rgb(253_240_203)] sm:px-10 sm:py-14">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
              {FEATURES.map(({ title, text, Icon }, i) => (
                <li key={title}>
                  <Reveal delay={i * 90} className="group flex flex-col items-center text-center">
                    <Icon className="h-20 w-auto transition-transform duration-300 ease-(--ease-squish) group-hover:-translate-y-1 group-hover:-rotate-6 sm:h-24" />
                    <h3 className="mt-5 font-display text-[1.08rem] leading-tight font-extrabold text-ink sm:text-xl">{title}</h3>
                    <p className="mt-2 max-w-[14rem] text-[0.95rem] leading-relaxed text-ink-soft">{text}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal className="relative mx-auto w-[min(320px,78%)] lg:w-full">
          <div aria-hidden="true" className="absolute inset-x-[-10%] bottom-[-4%] h-[46%] rounded-[50%] bg-sun/80 blur-[2px]" />
          <Shine className="absolute top-[20%] -left-2 size-10 text-sun-deep" />
          <AnimatedScene className="relative">
            <HatchScene signLines={SIGN} className="h-auto w-full" />
          </AnimatedScene>
        </Reveal>
      </div>
    </section>
  );
}
