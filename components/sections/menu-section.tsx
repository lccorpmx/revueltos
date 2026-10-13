import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { FriedEggDoodle, Sparks } from "@/components/decor/doodles";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice, menu, type MenuItem } from "@/lib/menu";
import { linkProps, siteConfig } from "@/lib/site";

export function MenuSection() {
  return (
    <section id="menu" aria-labelledby="menu-title" className="relative overflow-hidden bg-cream pt-20 pb-28 sm:pt-24 sm:pb-36">
      <FriedEggDoodle className="absolute top-2 left-[3%] w-16 -rotate-12 animate-float sm:w-24" />
      <FriedEggDoodle className="absolute top-16 right-[4%] hidden w-16 rotate-12 animate-float [animation-delay:1.2s] sm:block" />
      <FriedEggDoodle className="absolute right-[12%] bottom-6 w-14 rotate-[30deg] animate-float [animation-delay:2.1s]" />

      <div className="container-page relative">
        <Reveal className="text-center">
          <h2
            id="menu-title"
            className="display-heavy inline-flex items-center gap-2 text-[clamp(2.3rem,5vw,3.6rem)] text-ink sm:gap-4"
          >
            <Sparks className="size-8 shrink-0 -scale-x-100 sm:size-10" />
            Nuestro menú
            <Sparks className="size-8 shrink-0 sm:size-10" />
          </h2>
          <p className="mt-4 text-lg text-ink-soft">Desayunos que siempre caen bien.</p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-6 md:grid-cols-3 xl:grid-cols-6 xl:gap-5">
          {menu.map((item, i) => (
            <li key={item.slug} className="h-full">
              <Reveal delay={i * 70} className="h-full">
                <MenuCard item={item} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-14 text-center sm:mt-16">
          <Button asChild variant="sun" size="pill">
            <a {...linkProps(siteConfig.links.order)}>
              Ver menú completo
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  const price = formatPrice(item.price);
  return (
    <Card className="group relative h-full gap-0 rounded-[1.75rem] bg-linear-to-b from-butter to-butter-soft py-0 text-center ring-0 shadow-[0_6px_0_0_rgb(27_25_21/0.05)] transition-[translate,box-shadow] duration-300 ease-(--ease-out-soft) hover:-translate-y-1.5 hover:shadow-[0_12px_0_0_rgb(27_25_21/0.06)]">
      {item.tag && (
        <span className="absolute top-3 left-3 z-10 -rotate-6 rounded-full border-2 border-ink bg-sun px-2.5 py-0.5 font-display text-xs font-extrabold text-ink">
          {item.tag}
        </span>
      )}
      <div className="relative mx-auto mt-4 aspect-[408/330] w-[94%]">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 190px, (min-width: 768px) 30vw, 45vw"
          className="object-contain transition-transform duration-500 ease-(--ease-squish) group-hover:scale-[1.07] group-hover:-rotate-3"
        />
      </div>
      <CardHeader className="flex-1 content-start gap-2 px-4 pt-3 sm:px-5">
        <CardTitle className="font-display text-[1.12rem] leading-tight font-extrabold text-ink sm:text-[1.2rem]">
          {item.name}
        </CardTitle>
        <CardDescription className="text-[0.85rem] leading-snug text-ink-soft">{item.description}</CardDescription>
      </CardHeader>
      <CardFooter className="justify-center border-t-0 bg-transparent pt-4 pb-6">
        <Badge className="h-8 rounded-full bg-tangerine px-4 font-display text-[1.05rem] font-extrabold text-ink tabular-nums">
          {price}
        </Badge>
      </CardFooter>
      <a
        {...linkProps(siteConfig.links.order)}
        className="absolute inset-0 rounded-[inherit] focus-visible:outline-offset-4"
        aria-label={`Ordenar ${item.name}, ${price}`}
      />
    </Card>
  );
}
