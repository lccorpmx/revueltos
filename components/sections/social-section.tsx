import { ArrowUpRight } from "lucide-react";
import { SOCIAL_ICONS } from "@/components/brand/icons";
import { FriedEggDoodle, HeartDoodle, Sparks, Underline } from "@/components/decor/doodles";
import { PolaroidScene } from "@/components/mascot/polaroid-scene";
import { AnimatedScene } from "@/components/motion/animated-scene";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site";

export function SocialSection() {
  return (
    <section id="redes" aria-labelledby="social-title" className="relative bg-cream py-24 sm:py-32">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2.75rem] bg-sun px-6 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <FriedEggDoodle className="absolute -top-6 -right-6 w-28 rotate-12 text-white/70 sm:w-36" />
          <FriedEggDoodle className="absolute -bottom-10 left-[38%] hidden w-24 -rotate-12 text-white/60 lg:block" />

          <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <Reveal className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <AnimatedScene className="w-40 sm:w-48">
                <PolaroidScene className="h-auto w-full" />
              </AnimatedScene>
              <p className="mt-6 flex items-center gap-2 font-display text-sm font-extrabold tracking-[0.16em] text-ink uppercase">
                <Sparks className="size-6 -scale-x-100" />
                Síguenos en redes
              </p>
              <h2 id="social-title" className="display-heavy mt-3 text-[clamp(2.2rem,4.6vw,3.5rem)] text-ink">
                Antójate{" "}
                <span className="relative inline-block whitespace-nowrap">
                  todos los días
                  <Underline className="absolute -bottom-[0.3em] left-0 h-[0.3em] w-full" />
                </span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
                Promos, desayunos nuevos y mucha buena vibra. Etiquétanos en tus fotos y salúdanos por mensaje.
                <HeartDoodle className="ml-2 inline-block size-5 -rotate-12 text-ink" />
              </p>
            </Reveal>

            <ul className="grid gap-5">
              {siteConfig.socials.map(({ network, handle, href }, i) => {
                const Icon = SOCIAL_ICONS[network];
                return (
                  <li key={network}>
                    <Reveal delay={i * 90}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-5 rounded-[1.75rem] border-[3px] border-ink bg-white p-5 shadow-[0_6px_0_0_var(--ink)] transition-[translate,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_10px_0_0_var(--ink)] active:translate-y-0 active:shadow-[0_3px_0_0_var(--ink)] sm:p-6"
                      >
                        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-ink text-sun transition-transform duration-300 ease-(--ease-squish) group-hover:-rotate-8 sm:size-16">
                          <Icon className="size-7 sm:size-8" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-display text-xl font-extrabold text-ink sm:text-2xl">{network}</span>
                          <span className="block truncate text-base text-muted-foreground">{handle}</span>
                        </span>
                        <span className="ml-auto flex items-center gap-1 font-bold text-ink">
                          <span className="hidden sm:inline">Seguir</span>
                          <ArrowUpRight
                            className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="sr-only">(se abre en una pestaña nueva)</span>
                      </a>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
